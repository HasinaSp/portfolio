import type { ContactStatus } from "@prisma/client";

import { services } from "@/data/services";
import { budgetOptions } from "@/lib/contact-options";

// Statuts d'une demande, dans l'ordre du suivi.
export const CONTACT_STATUSES = [
  "NEW",
  "CONTACTED",
  "IN_PROGRESS",
  "ACCEPTED",
  "REJECTED",
] as const satisfies readonly ContactStatus[];

export const statusMeta: Record<
  ContactStatus,
  { label: string; plural: string; className: string }
> = {
  NEW: {
    label: "Nouvelle",
    plural: "Nouvelles",
    className: "border-[#d00018]/50 bg-[#d00018]/10 text-[#ff4d5e]",
  },
  CONTACTED: {
    label: "Contacté",
    plural: "Contactés",
    className: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  },
  IN_PROGRESS: {
    label: "En cours",
    plural: "En cours",
    className: "border-amber-500/40 bg-amber-500/10 text-amber-300",
  },
  ACCEPTED: {
    label: "Acceptée",
    plural: "Acceptées",
    className: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
  REJECTED: {
    label: "Refusée",
    plural: "Refusées",
    className: "border-neutral-600 bg-neutral-800/60 text-neutral-400",
  },
};

export function isContactStatus(value: unknown): value is ContactStatus {
  return (CONTACT_STATUSES as readonly unknown[]).includes(value);
}

export function serviceLabel(slug: string) {
  return services.find((service) => service.slug === slug)?.title ?? slug;
}

export function budgetLabel(value: string | null) {
  if (!value) return "Non précisé";
  return budgetOptions.find((option) => option.value === value)?.label ?? value;
}

const dateFormat = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Europe/Paris",
});

export function formatRequestDate(date: Date) {
  return dateFormat.format(date);
}
