export type ProjectType = "personal" | "contribution";

/*
 * Étude de cas d'un projet. Chaque partie est facultative : seules les
 * parties renseignées sont affichées sur la page du projet.
 */
export interface CaseStudy {
  // Le défi : le problème ou le besoin de départ.
  challenge?: string;
  // La solution : les étapes ou choix clés, une phrase par élément.
  solution?: string[];
  // Les résultats : uniquement des chiffres réels et vérifiables.
  results?: { value: string; label: string }[];
}

export interface Project {
  slug: string;
  number: string;

  title: string;
  category: string;
  type: ProjectType;

  description: string;
  year: string;

  role: string;
  contribution: string;

  technologies: string[];

  image: string;
  gallery: string[];

  url?: string;

  featured?: boolean;

  caseStudy?: CaseStudy;
}
