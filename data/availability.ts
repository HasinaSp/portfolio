/*
 * Disponibilité affichée dans le hero et sur la page contact.
 * L'état (disponible / planning complet) se change depuis l'admin ;
 * ici, seulement les textes.
 */
export const availability = {
  label: {
    fr: "Disponible pour de nouveaux projets",
    en: "Available for new projects",
  },
  // Facultatif, par ex. { fr: "Démarrage possible en novembre", en: "Can start in November" }.
  // null = masqué.
  detail: null as { fr: string; en: string } | null,
  // Affiché quand l'admin indique que le planning est complet.
  unavailableLabel: {
    fr: "Planning complet pour le moment",
    en: "Fully booked for now",
  },
};
