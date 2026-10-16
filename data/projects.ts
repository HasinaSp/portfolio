import type { Project } from "@/types/project";

export const projects: Project[] = [
  {
    slug: "lumi",
    number: "01",

    title: "LUMI",
    category: "SaaS · Produit digital",
    type: "personal",

    description:
      "Une plateforme digitale pensée pour aider les restaurateurs à améliorer leur présence en ligne, optimiser leurs menus et développer leur activité.",

    year: "2026",

    role: "Conception & développement",

    contribution:
      "Conception du produit, réflexion UX/UI, développement frontend et conception de l'architecture applicative.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "Prisma",
      "PostgreSQL",
    ],

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
    category: "Web · Site métier",
    type: "personal",

    description:
      "Un site web professionnel conçu pour présenter l'activité, les prestations et les réalisations de Couverture Vasseur.",

    year: "2026",

    role: "Conception & développement",

    contribution:
      "Conception de l'expérience utilisateur, structuration des pages, interface et développement du site.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
      "PostgreSQL",
    ],

    image:
      "/projects/couverture-vasseur/image-1.png",

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
  },

  {
    slug: "build-on",
    number: "03",

    title: "build-ON",
    category: "Web · B2B · Construction",
    type: "contribution",

    description:
      "Une plateforme corporate dédiée aux services BIM & CAD, aux dossiers réglementaires et à la construction clé en main.",

    year: "2023 - 2024",

    role: "Contribution au projet",

    contribution:
      "Participation à la conception et au développement de la plateforme digitale.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "DevOps",
    ],

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
      challenge:
        "Présenter clairement une offre B2B large et technique (services BIM & CAD, dossiers réglementaires, construction clé en main) à des professionnels qui doivent comprendre rapidement ce que le groupe peut prendre en charge.",
      solution: [
        "Participation au développement des pages et des composants de la plateforme avec Next.js et TypeScript.",
        "Intégration responsive des interfaces avec Tailwind CSS, pour une lecture fluide sur tous les écrans.",
        "Contribution à la mise en ligne et au flux de déploiement de la plateforme.",
      ],
    },
  },

  {
    slug: "danapay",
    number: "04",

    title: "DanaPay",
    category: "Application web · Fintech",
    type: "contribution",

    description:
      "Une application web destinée à accompagner des usages financiers et des opérations digitales.",

    year: "2024 - 2025",

    role: "Contribution au projet",

    contribution:
      "Participation au développement de l'application et à la réalisation de certaines interfaces.",

    technologies: [
      "Vue.js",
      "TypeScript",
      "JSX",
      "Laravel",
      "Redis",
      "Postman",
      "Automation",
    ],

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
      challenge:
        "Dans une application financière, chaque écran doit être clair et fiable : l'utilisateur doit comprendre ce qu'il fait et avoir confiance dans chaque opération.",
      solution: [
        "Développement d'interfaces de l'application avec Vue.js et TypeScript.",
        "Travail avec l'API Laravel, testée et documentée avec Postman.",
        "Participation à l'automatisation de tâches pour fiabiliser certains traitements.",
      ],
    },
  },

  {
    slug: "cci-var",
    number: "05",

    title: "CCI VAR",
    category: "Web · Projet professionnel",
    type: "contribution",

    description:
      "Un projet digital réalisé dans un contexte professionnel, présenté ici à travers plusieurs vues de l'interface.",

    year: "2025 - 2026",

    role: "Contribution au projet",

    contribution:
      "Participation au développement et à la réalisation de différentes parties du projet.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Wordpress",
      "Docker",
      "Gotenberg",
      "MySQL",
    ],

    image: "/projects/cci-var/image-1.webp",

    gallery: [
      "/projects/cci-var/image-1.webp",
      "/projects/cci-var/image-2.jpeg",
      "/projects/cci-var/image-3.jpeg",
      "/projects/cci-var/image-4.jpeg",
      "/projects/cci-var/image-5.jpeg",
    ],

    caseStudy: {
      challenge:
        "Faire évoluer un projet digital dans un contexte institutionnel, où plusieurs outils doivent fonctionner ensemble de façon fiable : gestion de contenu, interface web et production de documents.",
      solution: [
        "Développement de parties de l'interface avec Next.js, TypeScript et Tailwind CSS.",
        "Intégration avec WordPress pour la gestion du contenu.",
        "Génération de documents PDF avec Gotenberg.",
        "Environnement conteneurisé avec Docker et base de données MySQL.",
      ],
    },
  },
];