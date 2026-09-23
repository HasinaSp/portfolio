import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Le nom doit contenir au moins 2 caractères.")
    .max(100, "Le nom est trop long."),

  email: z
    .string()
    .email("Adresse email invalide.")
    .max(255, "L'adresse email est trop longue."),

  company: z
    .string()
    .max(150, "Le nom de l'entreprise est trop long.")
    .optional(),

  service: z
    .string()
    .min(1, "Veuillez sélectionner un service."),

  budget: z
    .string()
    .optional(),

  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères.")
    .max(5000, "Le message est trop long."),
});

export type ContactInput = z.infer<typeof contactSchema>;