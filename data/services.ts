import type { Locale, Localized } from "@/lib/i18n";

/*
 * Services proposés. Les textes sont écrits dans les deux langues
 * ({ fr, en }) ; getServices(lang) renvoie les services dans une langue.
 */

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

type ServiceSource = Pick<Service, "slug" | "number" | "price" | "popular"> & {
  title: Localized<string>;
  shortDescription: Localized<string>;
  description: Localized<string>;
  priceLabel: Localized<string>;
  features: Localized<string[]>;
};

const onQuote = { fr: "Sur devis", en: "Custom quote" };

const sources: ServiceSource[] = [
  {
    slug: "web-development",
    number: "01",
    title: { fr: "Développement web", en: "Web development" },
    shortDescription: {
      fr: "Des sites modernes, rapides et pensés pour convertir.",
      en: "Modern, fast websites built to convert.",
    },
    description: {
      fr: "Je conçois et développe des sites web professionnels adaptés à votre activité, votre image et vos objectifs.",
      en: "I design and build professional websites tailored to your business, your brand and your goals.",
    },
    price: null,
    priceLabel: onQuote,
    features: {
      fr: ["Site responsive", "Interface moderne", "Développement Next.js", "Optimisation des performances", "Mise en ligne"],
      en: ["Responsive website", "Modern interface", "Next.js development", "Performance optimisation", "Launch & hosting setup"],
    },
  },

  {
    slug: "ui-ux-design",
    number: "02",
    title: { fr: "UI / UX Design", en: "UI / UX Design" },
    shortDescription: {
      fr: "Des interfaces claires, élégantes et pensées pour l'utilisateur.",
      en: "Clear, elegant, user-centred interfaces.",
    },
    description: {
      fr: "Je transforme vos besoins en interfaces cohérentes et expériences digitales simples à comprendre et agréables à utiliser.",
      en: "I turn your needs into consistent interfaces and digital experiences that are easy to understand and pleasant to use.",
    },
    price: null,
    priceLabel: onQuote,
    features: {
      fr: ["Architecture des pages", "Wireframes", "Direction visuelle", "Design responsive", "Prototype d'interface"],
      en: ["Page architecture", "Wireframes", "Visual direction", "Responsive design", "Interface prototype"],
    },
    popular: true,
  },

  {
    slug: "saas-development",
    number: "03",
    title: { fr: "Application SaaS", en: "SaaS application" },
    shortDescription: {
      fr: "Transformer une idée en véritable produit digital.",
      en: "Turning an idea into a real digital product.",
    },
    description: {
      fr: "Je développe des applications web et plateformes SaaS avec une architecture pensée pour évoluer.",
      en: "I build web applications and SaaS platforms with an architecture designed to grow.",
    },
    price: null,
    priceLabel: onQuote,
    features: {
      fr: ["Architecture applicative", "Frontend moderne", "Backend", "Base de données", "Authentification"],
      en: ["Application architecture", "Modern frontend", "Backend", "Database", "Authentication"],
    },
  },

  {
    slug: "automation",
    number: "04",
    title: { fr: "Automatisation", en: "Automation" },
    shortDescription: {
      fr: "Automatiser les tâches répétitives pour gagner du temps.",
      en: "Automating repetitive tasks to save time.",
    },
    description: {
      fr: "Je crée des solutions permettant d'automatiser certaines tâches et de simplifier les processus digitaux.",
      en: "I build solutions that automate tasks and simplify digital processes.",
    },
    price: null,
    priceLabel: onQuote,
    features: {
      fr: ["Analyse du processus", "Automatisation", "Intégration d'API", "Notifications", "Suivi des résultats"],
      en: ["Process analysis", "Automation", "API integration", "Notifications", "Results tracking"],
    },
  },

  {
    slug: "custom-solution",
    number: "05",
    title: { fr: "Solution personnalisée", en: "Custom solution" },
    shortDescription: {
      fr: "Une solution conçue spécifiquement pour votre besoin.",
      en: "A solution designed specifically for your needs.",
    },
    description: {
      fr: "Lorsqu'un besoin ne rentre pas dans une prestation standard, nous pouvons concevoir une solution adaptée à votre projet.",
      en: "When a need doesn't fit a standard service, we can design a solution tailored to your project.",
    },
    price: null,
    priceLabel: { fr: "Parlons-en", en: "Let's talk" },
    features: {
      fr: ["Analyse du besoin", "Architecture personnalisée", "Développement", "Intégrations", "Accompagnement"],
      en: ["Needs analysis", "Custom architecture", "Development", "Integrations", "Ongoing support"],
    },
  },
];

export function getServices(lang: Locale): Service[] {
  return sources.map((source) => ({
    ...source,
    title: source.title[lang],
    shortDescription: source.shortDescription[lang],
    description: source.description[lang],
    priceLabel: source.priceLabel[lang],
    features: source.features[lang],
  }));
}

export function getService(lang: Locale, slug: string): Service | undefined {
  return getServices(lang).find((service) => service.slug === slug);
}

// Version française (admin, validation et usages sans langue).
export const services = getServices("fr");
