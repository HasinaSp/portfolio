"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/db";
import { getStoreCurrency, lemonSqueezyConfigured } from "@/lib/lemonsqueezy";
import { sendPaymentLink } from "@/lib/notify-payment";
import { newPaymentToken, parseAmountToCents } from "@/lib/payments";
import { rateLimit } from "@/lib/rate-limit";

const DAY_MS = 24 * 60 * 60 * 1000;

export type PaymentFormState = {
  error?: string;
  fieldErrors?: Partial<Record<"clientName" | "clientEmail" | "description" | "amount", string>>;
};

const paymentSchema = z.object({
  clientName: z.string().trim().min(2, "Nom trop court.").max(100, "Nom trop long."),
  clientEmail: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "Adresse trop longue.")
    .pipe(z.email("Adresse email invalide.")),
  description: z
    .string()
    .trim()
    .min(3, "Décrivez la prestation.")
    .max(200, "200 caractères maximum."),
  amount: z
    .string()
    .transform((value) => parseAmountToCents(value))
    .pipe(
      z
        .number("Montant invalide (ex. 750 ou 750,50).")
        .min(100, "Montant minimum : 1.")
        .max(100_000_000, "Montant trop élevé."),
    ),
  lang: z.enum(["fr", "en"]),
  contactRequestId: z.preprocess((value) => (value ? value : undefined), z.string().optional()),
  // Case cochée : "on" ; décochée : champ absent.
  sendEmail: z.preprocess((value) => value === "on", z.boolean()),
});

export async function createPayment(
  _state: PaymentFormState,
  formData: FormData,
): Promise<PaymentFormState> {
  await requireAdmin();

  if (!lemonSqueezyConfigured()) {
    return { error: "Lemon Squeezy n'est pas configuré (variables LEMONSQUEEZY_* manquantes)." };
  }

  const result = paymentSchema.safeParse(Object.fromEntries(formData));
  if (!result.success) {
    const fieldErrors: PaymentFormState["fieldErrors"] = {};
    for (const issue of result.error.issues) {
      const field = issue.path[0] as keyof NonNullable<PaymentFormState["fieldErrors"]>;
      fieldErrors[field] ??= issue.message;
    }
    return { fieldErrors };
  }

  const data = result.data;

  let currency: string;
  try {
    // Le montant est exprimé dans la devise de la boutique Lemon Squeezy.
    currency = await getStoreCurrency();
  } catch (error) {
    console.error(error instanceof Error ? error.message : error);
    return { error: "Impossible de joindre Lemon Squeezy. Vérifiez la clé API et l'identifiant de boutique." };
  }

  const contactRequestId =
    data.contactRequestId &&
    (await prisma.contactRequest.findUnique({
      where: { id: data.contactRequestId },
      select: { id: true },
    }))
      ? data.contactRequestId
      : null;

  const payment = await prisma.payment.create({
    data: {
      token: newPaymentToken(),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      description: data.description,
      amount: data.amount,
      currency,
      lang: data.lang,
      contactRequestId,
    },
  });

  // Un email qui échoue n'annule pas le paiement : le lien reste copiable.
  const email = data.sendEmail ? ((await sendPaymentLink(payment)) ? "&email=ok" : "&email=echec") : "";

  revalidatePath("/admin/paiements");
  redirect(`/admin/paiements/${payment.id}?cree=1${email}`);
}

// « Envoyer par email » depuis la fiche : seulement tant que rien n'est payé,
// et au plus 5 envois par jour pour un même paiement.
export async function resendPaymentLink(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const payment = await prisma.payment.findUnique({ where: { id } });
  if (!payment || (payment.status !== "PENDING" && payment.status !== "FAILED")) {
    redirect(`/admin/paiements/${id}`);
  }

  const sent =
    (await rateLimit(`mail:payment-link:${payment.id}`, 5, DAY_MS)) &&
    (await sendPaymentLink(payment));

  redirect(`/admin/paiements/${payment.id}?email=${sent ? "ok" : "echec"}`);
}

// Seul un paiement jamais réglé peut être supprimé (lien envoyé par erreur…).
export async function deletePayment(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const { count } = await prisma.payment.deleteMany({
    where: { id, status: { in: ["PENDING", "FAILED"] }, orderId: null },
  });
  if (count === 0) throw new Error("Ce paiement ne peut pas être supprimé.");

  revalidatePath("/admin/paiements");
  redirect("/admin/paiements?supprime=1");
}
