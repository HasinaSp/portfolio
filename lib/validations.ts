import { z } from "zod";

import { services } from "@/data/services";
import { budgetOptions } from "@/lib/contact-options";

const serviceSlugs = services.map((service) => service.slug) as [string, ...string[]];
const budgetValues = budgetOptions.map((option) => option.value) as [string, ...string[]];

// Champ facultatif : une chaîne vide devient undefined.
const optional = <T extends z.ZodType>(schema: T) =>
  z.preprocess((value) => (value === "" || value === null ? undefined : value), schema.optional());

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom est trop long."),

  email: z
    .string()
    .trim()
    .toLowerCase()
    .max(254, "L'adresse email est trop longue.")
    .pipe(z.email("Adresse email invalide.")),

  company: optional(
    z.string().trim().max(150, "Le nom de l'entreprise est trop long."),
  ),

  service: z.enum(serviceSlugs, "Veuillez sélectionner un service."),

  budget: optional(z.enum(budgetValues, "Budget invalide.")),

  message: z
    .string()
    .trim()
    .min(20, "Le message doit contenir au moins 20 caractères.")
    .max(5000, "Le message est trop long."),
});

export type ContactInput = z.infer<typeof contactSchema>;
