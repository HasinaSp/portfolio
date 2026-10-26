"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { prisma } from "@/lib/db";
import { hasLocale, localePath } from "@/lib/i18n";
import { createCheckout } from "@/lib/lemonsqueezy";
import { paymentUrl } from "@/lib/payments";
import { rateLimit } from "@/lib/rate-limit";
import { clientIp } from "@/lib/request";

const receiptButton = { fr: "Retour au reçu", en: "Back to receipt" };

// « Payer » : crée une page de paiement Lemon Squeezy au montant du devis et
// y envoie le client. Action publique : seul le jeton (secret) du lien permet
// d'atteindre un paiement, et le nombre de checkouts par IP est limité.
export async function startCheckout(formData: FormData) {
  const token = String(formData.get("token") ?? "").slice(0, 64);
  const rawLang = String(formData.get("lang") ?? "");
  const lang = hasLocale(rawLang) ? rawLang : "fr";
  const pagePath = localePath(lang, `/pay/${encodeURIComponent(token)}`);

  if (!(await rateLimit(`checkout:${clientIp(await headers())}`, 10, 60 * 60 * 1000))) {
    redirect(`${pagePath}?erreur=1`);
  }

  const payment = await prisma.payment.findUnique({ where: { token } });
  if (!payment || (payment.status !== "PENDING" && payment.status !== "FAILED")) {
    redirect(pagePath);
  }

  let checkoutUrl: string;
  try {
    const returnUrl = paymentUrl(payment.token, lang);
    checkoutUrl = await createCheckout({
      paymentId: payment.id,
      amount: payment.amount,
      description: payment.description,
      clientName: payment.clientName,
      clientEmail: payment.clientEmail,
      // ?retour=1 : la page affiche « confirmation en cours » le temps du webhook.
      returnUrl: `${returnUrl}?retour=1`,
      receiptButtonText: receiptButton[lang],
    });
  } catch (error) {
    console.error(
      "Création du checkout impossible :",
      error instanceof Error ? error.message : error,
    );
    redirect(`${pagePath}?erreur=1`);
  }

  // Hors du try : redirect() fonctionne en levant une exception.
  redirect(checkoutUrl);
}
