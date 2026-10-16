/*
 * Témoignages clients. Uniquement de vrais retours, avec l'accord de la
 * personne citée. Tant que la liste est vide, la section n'est pas affichée.
 *
 * Exemple de format :
 * {
 *   quote: "Le texte du témoignage, tel que la personne l'a écrit.",
 *   name: "Prénom Nom",
 *   role: "Gérant",
 *   company: "Nom de l'entreprise",
 *   projectSlug: "couverture-vasseur", // facultatif : aussi affiché sur la page du projet
 * },
 */
export interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  projectSlug?: string;
}

export const testimonials: Testimonial[] = [];
