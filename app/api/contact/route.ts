import { NextResponse, after } from "next/server";

import { notifyNewContactRequest } from "@/lib/notify-contact";

import { prisma } from "@/lib/db";
import { HONEYPOT_FIELD } from "@/lib/contact-options";
import { defaultLocale, hasLocale, splitLocale, type Locale, type Localized } from "@/lib/i18n";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";
import { getContactSchema } from "@/lib/validations";

const MAX_BODY_BYTES = 20_000;

const messages: Localized<{
  success: string;
  tooLong: string;
  invalidRequest: string;
  rateLimited: string;
  invalidData: string;
  serverError: string;
}> = {
  fr: {
    success: "Votre demande a bien été reçue.",
    tooLong: "Votre message est trop long.",
    invalidRequest: "Requête invalide.",
    rateLimited:
      "Trop de demandes envoyées. Réessayez plus tard ou contactez-moi directement par e-mail.",
    invalidData: "Les informations envoyées sont invalides.",
    serverError: "Une erreur est survenue lors de l'envoi de votre demande.",
  },
  en: {
    success: "Your request has been received.",
    tooLong: "Your message is too long.",
    invalidRequest: "Invalid request.",
    rateLimited:
      "Too many requests sent. Please try again later or contact me directly by email.",
    invalidData: "The information sent is invalid.",
    serverError: "An error occurred while sending your request.",
  },
};

function reply(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

// Langue de repli quand le corps est illisible : celle de la page d'origine.
function refererLocale(request: Request): Locale {
  const referer = request.headers.get("referer");
  if (!referer) return defaultLocale;
  try {
    return splitLocale(new URL(referer).pathname).lang;
  } catch {
    return defaultLocale;
  }
}

// Anti-CSRF : seuls les envois JSON du site lui-même sont acceptés. Un
// formulaire d'un autre site ne peut poster que du texte ou du form-urlencoded,
// et un fetch JSON depuis une autre origine est bloqué par le navigateur.
// Sans en-tête Origin (outil hors navigateur), la limite par IP s'applique.
function isSameOriginJson(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().startsWith("application/json")) return false;

  const origin = request.headers.get("origin");
  if (!origin) return true;

  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!isSameOriginJson(request)) {
    return reply(403, { success: false, message: messages[refererLocale(request)].invalidRequest });
  }

  const raw = await request.text().catch(() => "");

  if (raw.length > MAX_BODY_BYTES) {
    return reply(413, { success: false, message: messages[refererLocale(request)].tooLong });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400, { success: false, message: messages[refererLocale(request)].invalidRequest });
  }

  const lang: Locale =
    typeof body?.lang === "string" && hasLocale(body.lang) ? body.lang : defaultLocale;
  const t = messages[lang];

  // Robot : champ piège rempli. On répond comme un succès, sans rien enregistrer.
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD] !== "") {
    return reply(201, { success: true, message: t.success });
  }

  if (!(await rateLimit(`contact:${clientIp(request.headers)}`, 5, 60 * 60 * 1000))) {
    return reply(429, {
      success: false,
      message: t.rateLimited,
    });
  }

  const result = getContactSchema(lang).safeParse(body);

  if (!result.success) {
    return reply(400, {
      success: false,
      message: t.invalidData,
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const data = result.data;
    const created = await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        service: data.service,
        budget: data.budget ?? null,
        message: data.message,
      },
      select: { id: true },
    });

    // Emails (admin + accusé au visiteur) après la réponse : le visiteur n'attend pas l'envoi.
    after(() => notifyNewContactRequest(created.id, data, lang));

    return reply(201, { success: true, message: t.success });
  } catch (error) {
    // Pas de données personnelles dans les logs.
    console.error(
      "Erreur lors de l'enregistrement d'une demande de contact :",
      error instanceof Error ? error.message : error,
    );

    return reply(500, {
      success: false,
      message: t.serverError,
    });
  }
}
