export interface Service {
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  description: string;
  price: number | null;
  priceLabel: string;
  features: string[];
  popular?: boolean;
}

export const services: Service[] = [
  {
    slug: "web-development",
    number: "01",
    title: "Développement web",
    shortDescription:
      "Des sites modernes, rapides et pensés pour convertir.",
    description:
      "Je conçois et développe des sites web professionnels adaptés à votre activité, votre image et vos objectifs.",
    price: null,
    priceLabel: "Sur devis",
    features: [
      "Site responsive",
      "Interface moderne",
      "Développement Next.js",
      "Optimisation des performances",
      "Mise en ligne",
    ],
  },

  {
    slug: "ui-ux-design",
    number: "02",
    title: "UI / UX Design",
    shortDescription:
      "Des interfaces claires, élégantes et pensées pour l'utilisateur.",
    description:
      "Je transforme vos besoins en interfaces cohérentes et expériences digitales simples à comprendre et agréables à utiliser.",
    price: null,
    priceLabel: "Sur devis",
    features: [
      "Architecture des pages",
      "Wireframes",
      "Direction visuelle",
      "Design responsive",
      "Prototype d'interface",
    ],
    popular: true,
  },

  {
    slug: "saas-development",
    number: "03",
    title: "Application SaaS",
    shortDescription:
      "Transformer une idée en véritable produit digital.",
    description:
      "Je développe des applications web et plateformes SaaS avec une architecture pensée pour évoluer.",
    price: null,
    priceLabel: "Sur devis",
    features: [
      "Architecture applicative",
      "Frontend moderne",
      "Backend",
      "Base de données",
      "Authentification",
    ],
  },

  {
    slug: "automation",
    number: "04",
    title: "Automatisation",
    shortDescription:
      "Automatiser les tâches répétitives pour gagner du temps.",
    description:
      "Je crée des solutions permettant d'automatiser certaines tâches et de simplifier les processus digitaux.",
    price: null,
    priceLabel: "Sur devis",
    features: [
      "Analyse du processus",
      "Automatisation",
      "Intégration d'API",
      "Notifications",
      "Suivi des résultats",
    ],
  },

  {
    slug: "custom-solution",
    number: "05",
    title: "Solution personnalisée",
    shortDescription:
      "Une solution conçue spécifiquement pour votre besoin.",
    description:
      "Lorsqu'un besoin ne rentre pas dans une prestation standard, nous pouvons concevoir une solution adaptée à votre projet.",
    price: null,
    priceLabel: "Parlons-en",
    features: [
      "Analyse du besoin",
      "Architecture personnalisée",
      "Développement",
      "Intégrations",
      "Accompagnement",
    ],
  },
];