// Fourchettes de budget du formulaire de contact (valeur enregistrée → libellé).
export const budgetOptions = [
  { value: "under-500", label: "Moins de 500 €" },
  { value: "500-1000", label: "500 € – 1 000 €" },
  { value: "1000-2500", label: "1 000 € – 2 500 €" },
  { value: "2500-5000", label: "2 500 € – 5 000 €" },
  { value: "5000-plus", label: "Plus de 5 000 €" },
  { value: "not-defined", label: "Je ne sais pas encore" },
] as const;

export type BudgetValue = (typeof budgetOptions)[number]["value"];

// Champ invisible : un humain le laisse vide, un robot le remplit.
export const HONEYPOT_FIELD = "website";
