/*
 * Disponibilité affichée dans le hero et sur la page contact.
 * Passe `available` à false quand ton planning est complet.
 */
export const availability = {
  available: true,
  label: {
    fr: "Disponible pour de nouveaux projets",
    en: "Available for new projects",
  },
  // Facultatif, par ex. { fr: "Démarrage possible en novembre", en: "Can start in November" }.
  // null = masqué.
  detail: null as { fr: string; en: string } | null,
  // Affiché quand available vaut false.
  unavailableLabel: {
    fr: "Planning complet pour le moment",
    en: "Fully booked for now",
  },
};
