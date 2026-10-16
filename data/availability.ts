/*
 * Disponibilité affichée dans le hero et sur la page contact.
 * Passe `available` à false quand ton planning est complet.
 */
export const availability = {
  available: true,
  label: "Disponible pour de nouveaux projets",
  // Facultatif, par ex. « Démarrage possible en novembre ». null = masqué.
  detail: null as string | null,
  // Affiché quand available vaut false.
  unavailableLabel: "Planning complet pour le moment",
};
