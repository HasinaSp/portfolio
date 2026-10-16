import type { Locale, Localized } from "@/lib/i18n";
import type { CaseStudy, Project } from "@/types/project";

/*
 * Projets du portfolio. Les textes sont écrits dans les deux langues
 * ({ fr, en }) ; getProjects(lang) renvoie les projets dans une langue.
 */

type ProjectSource = Omit<
  Project,
  "category" | "description" | "role" | "contribution" | "caseStudy"
> & {
  category: Localized<string>;
  description: Localized<string>;
  role: Localized<string>;
  contribution: Localized<string>;
  caseStudy?: Localized<CaseStudy>;
};

const sources: ProjectSource[] = [
  {
    slug: "lumi",
    number: "01",
    title: "LUMI",
    category: { fr: "SaaS · Produit digital", en: "SaaS · Digital product" },
    type: "personal",
    description: {
      fr: "Une plateforme digitale pensée pour aider les restaurateurs à améliorer leur présence en ligne, optimiser leurs menus et développer leur activité.",
      en: "A digital platform designed to help restaurant owners improve their online presence, optimise their menus and grow their business.",
    },
    year: "2026",
    role: { fr: "Conception & développement", en: "Design & development" },
    contribution: {
      fr: "Conception du produit, réflexion UX/UI, développement frontend et conception de l'architecture applicative.",
      en: "Product design, UX/UI thinking, frontend development and application architecture.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "NestJS", "Prisma", "PostgreSQL"],
    image: "/projects/lumi/hero.png",
    gallery: [
      "/projects/lumi/image-1.png",
      "/projects/lumi/image-2.png",
      "/projects/lumi/image-3.png",
      "/projects/lumi/image-4.png",
      "/projects/lumi/image-5.png",
    ],
    url: "https://lumi-hikari.vercel.app/",
    featured: true,
  },

  {
    slug: "couverture-vasseur",
    number: "02",
    title: "Couverture Vasseur",
    category: { fr: "Web · Site métier", en: "Web · Business website" },
    type: "personal",
    description: {
      fr: "Un site web professionnel conçu pour présenter l'activité, les prestations et les réalisations de Couverture Vasseur.",
      en: "A professional website built to showcase Couverture Vasseur's business, services and past work.",
    },
    year: "2026",
    role: { fr: "Conception & développement", en: "Design & development" },
    contribution: {
      fr: "Conception de l'expérience utilisateur, structuration des pages, interface et développement du site.",
      en: "User experience design, page structure, interface and website development.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    image: "/projects/couverture-vasseur/image-1.png",
    gallery: [
      "/projects/couverture-vasseur/image-1.png",
      "/projects/couverture-vasseur/image-2.png",
      "/projects/couverture-vasseur/image-3.png",
      "/projects/couverture-vasseur/image-4.png",
      "/projects/couverture-vasseur/image-5.png",
    ],
    url: "https://couverture-vasseur-prod.vercel.app/",
    featured: true,
    caseStudy: {
      fr: {
        challenge:
          "Un artisan couvreur doit être trouvé par les habitants de sa zone au moment où ils en ont besoin, souvent dans l'urgence, puis inspirer confiance assez vite pour qu'ils appellent ou demandent un devis.",
        solution: [
          "Des pages dédiées à chaque ville de la zone d'intervention, pour répondre aux recherches locales.",
          "Les actions clés toujours à portée de main : appel direct, demande de devis gratuit et mention de l'urgence fuite 24h/24.",
          "Les avis clients et les réalisations mis en avant pour rassurer dès les premières secondes.",
          "Une structure claire des prestations : couverture, rénovation, réparation, zinguerie.",
          "Un site rapide et responsive, pensé d'abord pour le mobile, là où se font les recherches urgentes.",
        ],
      },
      en: {
        challenge:
          "A roofing contractor needs to be found by local residents the moment they need one, often in an emergency, and then earn their trust quickly enough for them to call or request a quote.",
        solution: [
          "Dedicated pages for each town in the service area, to answer local searches.",
          "Key actions always within reach: direct call, free quote request and a 24/7 leak emergency mention.",
          "Customer reviews and past work highlighted to build trust from the first seconds.",
          "A clear structure for the services: roofing, renovation, repairs, zinc work.",
          "A fast, responsive, mobile-first website, where urgent searches happen.",
        ],
      },
    },
  },

  {
    slug: "build-on",
    number: "03",
    title: "build-ON",
    category: { fr: "Web · B2B · Construction", en: "Web · B2B · Construction" },
    type: "contribution",
    description: {
      fr: "Une plateforme corporate dédiée aux services BIM & CAD, aux dossiers réglementaires et à la construction clé en main.",
      en: "A corporate platform for BIM & CAD services, regulatory filings and turnkey construction.",
    },
    year: "2023 - 2024",
    role: { fr: "Contribution au projet", en: "Project contributor" },
    contribution: {
      fr: "Participation à la conception et au développement de la plateforme digitale.",
      en: "Contributed to the design and development of the digital platform.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "DevOps"],
    image: "/projects/build-on/image-1.png",
    gallery: [
      "/projects/build-on/image-1.png",
      "/projects/build-on/image-2.png",
      "/projects/build-on/image-3.png",
      "/projects/build-on/image-4.png",
      "/projects/build-on/image-5.png",
    ],
    url: "https://fr.buildongroup.com/",
    caseStudy: {
      fr: {
        challenge:
          "Présenter clairement une offre B2B large et technique (services BIM & CAD, dossiers réglementaires, construction clé en main) à des professionnels qui doivent comprendre rapidement ce que le groupe peut prendre en charge.",
        solution: [
          "Participation au développement des pages et des composants de la plateforme avec Next.js et TypeScript.",
          "Intégration responsive des interfaces avec Tailwind CSS, pour une lecture fluide sur tous les écrans.",
          "Contribution à la mise en ligne et au flux de déploiement de la plateforme.",
        ],
      },
      en: {
        challenge:
          "Clearly presenting a broad, technical B2B offer (BIM & CAD services, regulatory filings, turnkey construction) to professionals who need to understand quickly what the group can handle.",
        solution: [
          "Contributed to building the platform's pages and components with Next.js and TypeScript.",
          "Responsive interface integration with Tailwind CSS, for comfortable reading on every screen.",
          "Contributed to the platform's release and deployment workflow.",
        ],
      },
    },
  },

  {
    slug: "danapay",
    number: "04",
    title: "DanaPay",
    category: { fr: "Application web · Fintech", en: "Web application · Fintech" },
    type: "contribution",
    description: {
      fr: "Une application web destinée à accompagner des usages financiers et des opérations digitales.",
      en: "A web application supporting financial use cases and digital operations.",
    },
    year: "2024 - 2025",
    role: { fr: "Contribution au projet", en: "Project contributor" },
    contribution: {
      fr: "Participation au développement de l'application et à la réalisation de certaines interfaces.",
      en: "Contributed to the application's development and built some of its interfaces.",
    },
    technologies: ["Vue.js", "TypeScript", "JSX", "Laravel", "Redis", "Postman", "Automation"],
    image: "/projects/danapay/image-1.png",
    gallery: [
      "/projects/danapay/image-1.png",
      "/projects/danapay/image-2.png",
      "/projects/danapay/image-3.png",
      "/projects/danapay/image-4.png",
      "/projects/danapay/image-5.png",
    ],
    url: "https://app.danapay.io/login",
    caseStudy: {
      fr: {
        challenge:
          "Dans une application financière, chaque écran doit être clair et fiable : l'utilisateur doit comprendre ce qu'il fait et avoir confiance dans chaque opération.",
        solution: [
          "Développement d'interfaces de l'application avec Vue.js et TypeScript.",
          "Travail avec l'API Laravel, testée et documentée avec Postman.",
          "Participation à l'automatisation de tâches pour fiabiliser certains traitements.",
        ],
      },
      en: {
        challenge:
          "In a financial application, every screen must be clear and reliable: users need to understand what they are doing and trust every operation.",
        solution: [
          "Built application interfaces with Vue.js and TypeScript.",
          "Worked with the Laravel API, tested and documented with Postman.",
          "Contributed to task automation to make some processes more reliable.",
        ],
      },
    },
  },

  {
    slug: "cci-var",
    number: "05",
    title: "CCI VAR",
    category: { fr: "Web · Projet professionnel", en: "Web · Professional project" },
    type: "contribution",
    description: {
      fr: "Un projet digital réalisé dans un contexte professionnel, présenté ici à travers plusieurs vues de l'interface.",
      en: "A digital project built in a professional context, shown here through several views of the interface.",
    },
    year: "2025 - 2026",
    role: { fr: "Contribution au projet", en: "Project contributor" },
    contribution: {
      fr: "Participation au développement et à la réalisation de différentes parties du projet.",
      en: "Contributed to the development and delivery of several parts of the project.",
    },
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Wordpress", "Docker", "Gotenberg", "MySQL"],
    image: "/projects/cci-var/image-1.webp",
    gallery: [
      "/projects/cci-var/image-1.webp",
      "/projects/cci-var/image-2.jpeg",
      "/projects/cci-var/image-3.jpeg",
      "/projects/cci-var/image-4.jpeg",
      "/projects/cci-var/image-5.jpeg",
    ],
    caseStudy: {
      fr: {
        challenge:
          "Faire évoluer un projet digital dans un contexte institutionnel, où plusieurs outils doivent fonctionner ensemble de façon fiable : gestion de contenu, interface web et production de documents.",
        solution: [
          "Développement de parties de l'interface avec Next.js, TypeScript et Tailwind CSS.",
          "Intégration avec WordPress pour la gestion du contenu.",
          "Génération de documents PDF avec Gotenberg.",
          "Environnement conteneurisé avec Docker et base de données MySQL.",
        ],
      },
      en: {
        challenge:
          "Evolving a digital project in an institutional context, where several tools must work together reliably: content management, web interface and document generation.",
        solution: [
          "Built parts of the interface with Next.js, TypeScript and Tailwind CSS.",
          "Integration with WordPress for content management.",
          "PDF document generation with Gotenberg.",
          "Containerised environment with Docker and a MySQL database.",
        ],
      },
    },
  },
];

export function getProjects(lang: Locale): Project[] {
  return sources.map((source) => ({
    ...source,
    category: source.category[lang],
    description: source.description[lang],
    role: source.role[lang],
    contribution: source.contribution[lang],
    caseStudy: source.caseStudy?.[lang],
  }));
}

export function getProject(lang: Locale, slug: string): Project | undefined {
  return getProjects(lang).find((project) => project.slug === slug);
}

// Version française (sitemap, admin et usages sans langue).
export const projects = getProjects("fr");
