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
  },

  {
    slug: "build-on",
    number: "03",

    title: "build-ON",
    category: "Web · B2B · Construction",
    type: "contribution",

    description:
      "Une plateforme corporate dédiée aux services BIM & CAD, aux dossiers réglementaires et à la construction clé en main.",

    year: "2026",

    role: "Contribution au projet",

    contribution:
      "Participation à la conception et au développement de la plateforme digitale.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
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
  },

  {
    slug: "danapay",
    number: "04",

    title: "DanaPay",
    category: "Application web · Fintech",
    type: "contribution",

    description:
      "Une application web destinée à accompagner des usages financiers et des opérations digitales.",

    year: "2026",

    role: "Contribution au projet",

    contribution:
      "Participation au développement de l'application et à la réalisation de certaines interfaces.",

    technologies: [
      "Next.js",
      "TypeScript",
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
  },

  {
    slug: "cci-var",
    number: "05",

    title: "CCI VAR",
    category: "Web · Projet professionnel",
    type: "contribution",

    description:
      "Un projet digital réalisé dans un contexte professionnel, présenté ici à travers plusieurs vues de l'interface.",

    year: "2026",

    role: "Contribution au projet",

    contribution:
      "Participation au développement et à la réalisation de différentes parties du projet.",

    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
    ],

    image: "/projects/cci-var/image-1.png",

    gallery: [
      "/projects/cci-var/image-1.png",
      "/projects/cci-var/image-2.png",
      "/projects/cci-var/image-3.png",
      "/projects/cci-var/image-4.png",
      "/projects/cci-var/image-5.png",
    ],
  },
];