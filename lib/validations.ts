import { z } from "zod";

import { services } from "@/data/services";
import { budgetOptions } from "@/lib/contact-options";
import type { Locale, Localized } from "@/lib/i18n";

// Slugs et valeurs de budget : identiques dans toutes les langues.
const serviceSlugs = services.map((service) => service.slug) as [string, ...string[]];
const budgetValues = budgetOptions.map((option) => option.value) as [string, ...string[]];

// Champ facultatif : une chaîne vide devient undefined.
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === "" || value === null ? undefined : value), schema.optional());

const messages: Localized<{
  nameMin: string;
  nameMax: string;
  emailMax: string;
  emailInvalid: string;
  companyMax: string;
  service: string;
  budget: string;
  messageMin: string;
  messageMax: string;
}> = {
  fr: {
    nameMin: "Le nom doit contenir au moins 2 caractères.",
    nameMax: "Le nom est trop long.",
    emailMax: "L'adresse email est trop longue.",
    emailInvalid: "Adresse email invalide.",
    companyMax: "Le nom de l'entreprise est trop long.",
    service: "Veuillez sélectionner un service.",
    budget: "Budget invalide.",
    messageMin: "Le message doit contenir au moins 20 caractères.",
    messageMax: "Le message est trop long.",
  },
  en: {
    nameMin: "Your name must be at least 2 characters long.",
    nameMax: "Your name is too long.",
    emailMax: "The email address is too long.",
    emailInvalid: "Invalid email address.",
    companyMax: "The company name is too long.",
    service: "Please select a service.",
    budget: "Invalid budget.",
    messageMin: "Your message must be at least 20 characters long.",
    messageMax: "Your message is too long.",
  },
};

export function getContactSchema(lang: Locale) {
  const m = messages[lang];

  return z.object({
    name: z
      .string()
      .trim()
      .min(2, m.nameMin)
      .max(100, m.nameMax),

    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254, m.emailMax)
      .pipe(z.email(m.emailInvalid)),

    company: optional(
      z.string().trim().max(150, m.companyMax),
    ),

    service: z.enum(serviceSlugs, m.service),

    budget: optional(z.enum(budgetValues, m.budget)),

    message: z
      .string()
      .trim()
      .min(20, m.messageMin)
      .max(5000, m.messageMax),
  });
}

export const contactSchema = getContactSchema("fr");

export type ContactInput = z.infer<typeof contactSchema>;
