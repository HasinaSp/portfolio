import { NextResponse } from "next/server";

import { prisma } from "@/lib/db";
import { HONEYPOT_FIELD } from "@/lib/contact-options";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";
import { contactSchema } from "@/lib/validations";

const MAX_BODY_BYTES = 20_000;
const SUCCESS_MESSAGE = "Votre demande a bien été reçue.";

function reply(status: number, body: Record<string, unknown>) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function POST(request: Request) {
  const raw = await request.text().catch(() => "");

  if (raw.length > MAX_BODY_BYTES) {
    return reply(413, { success: false, message: "Votre message est trop long." });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return reply(400, { success: false, message: "Requête invalide." });
  }

  // Robot : champ piège rempli. On répond comme un succès, sans rien enregistrer.
  if (typeof body[HONEYPOT_FIELD] === "string" && body[HONEYPOT_FIELD] !== "") {
    return reply(201, { success: true, message: SUCCESS_MESSAGE });
  }

  if (!(await rateLimit(`contact:${clientIp(request.headers)}`, 5, 60 * 60 * 1000))) {
    return reply(429, {
      success: false,
      message:
        "Trop de demandes envoyées. Réessayez plus tard ou contactez-moi directement par e-mail.",
    });
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return reply(400, {
      success: false,
      message: "Les informations envoyées sont invalides.",
      errors: result.error.flatten().fieldErrors,
    });
  }

  try {
    const data = result.data;
    await prisma.contactRequest.create({
      data: {
        name: data.name,
        email: data.email,
        company: data.company ?? null,
        service: data.service,
        budget: data.budget ?? null,
        message: data.message,
      },
    });

    return reply(201, { success: true, message: SUCCESS_MESSAGE });
  } catch (error) {
    // Pas de données personnelles dans les logs.
    console.error(
      "Erreur lors de l'enregistrement d'une demande de contact :",
      error instanceof Error ? error.message : error,
    );

    return reply(500, {
      success: false,
      message: "Une erreur est survenue lors de l'envoi de votre demande.",
    });
  }
}
