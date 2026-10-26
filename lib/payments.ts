import { randomBytes } from "node:crypto";

import type { PaymentStatus } from "@prisma/client";

import { intlLocale, localePath, type Locale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";

// Statuts d'un paiement, libellés de l'admin (même style que les demandes).
export const paymentStatusMeta: Record<PaymentStatus, { label: string; className: string }> = {
  PENDING: {
    label: "En attente",
    className: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
  PAID: {
    label: "Payé",
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
  FAILED: {
    label: "Échec",
    className: "border-[#d00018]/50 bg-[#d00018]/10 text-[#ff4d5e]",
  },
  REFUNDED: {
    label: "Remboursé",
    className: "border-neutral-600 bg-neutral-800/60 text-neutral-400",
  },
  PARTIAL_REFUND: {
    label: "Remboursé en partie",
    className: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  },
};

// Jeton du lien public : 32 caractères aléatoires, impossible à deviner.
export function newPaymentToken() {
  return randomBytes(24).toString("base64url");
}

export function formatMoney(cents: number, currency: string, lang: Locale = "fr") {
  return new Intl.NumberFormat(intlLocale[lang], { style: "currency", currency }).format(
    cents / 100,
  );
}

// "750", "750,5" ou "1 250.00" → centimes ; null si le montant est invalide.
export function parseAmountToCents(value: string): number | null {
  const normalized = value.replace(/[\s  ]/g, "").replace(",", ".");
  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) return null;
  return Math.round(Number(normalized) * 100);
}

// Lien public envoyé au client, dans sa langue.
export function paymentUrl(token: string, lang: Locale) {
  return `${getSiteUrl()}${localePath(lang, `/pay/${token}`)}`;
}
