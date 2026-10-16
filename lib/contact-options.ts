import type { Locale, Localized } from "@/lib/i18n";

// Fourchettes de budget du formulaire de contact (valeur enregistrée → libellés).
const budgetSources = [
  { value: "under-500", label: { fr: "Moins de 500 €", en: "Under €500" } },
  { value: "500-1000", label: { fr: "500 € – 1 000 €", en: "€500 – €1,000" } },
  { value: "1000-2500", label: { fr: "1 000 € – 2 500 €", en: "€1,000 – €2,500" } },
  { value: "2500-5000", label: { fr: "2 500 € – 5 000 €", en: "€2,500 – €5,000" } },
  { value: "5000-plus", label: { fr: "Plus de 5 000 €", en: "Over €5,000" } },
  { value: "not-defined", label: { fr: "Je ne sais pas encore", en: "Not sure yet" } },
] as const satisfies readonly { value: string; label: Localized<string> }[];

export type BudgetValue = (typeof budgetSources)[number]["value"];

export function getBudgetOptions(lang: Locale) {
  return budgetSources.map((option) => ({ value: option.value, label: option.label[lang] }));
}

// Libellés français (admin, validation).
export const budgetOptions = getBudgetOptions("fr");

// Champ invisible : un humain le laisse vide, un robot le remplit.
export const HONEYPOT_FIELD = "website";
