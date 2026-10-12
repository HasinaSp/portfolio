export type ProjectType = "personal" | "contribution";

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
}