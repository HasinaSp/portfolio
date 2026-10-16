import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import { getService, getServices } from "@/data/services";
import {
  defaultLocale,
  hasLocale,
  languageAlternates,
  localePath,
  ogLocale,
  type Localized,
} from "@/lib/i18n";

interface ServicePageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

interface ServiceContent {
  eyebrow: string;
  startProject: string;
  allServices: string;
  intro: {
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
    paragraphs: string[];
  };
  features: {
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
  };
  process: {
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
    steps: { number: string; title: string; text: string }[];
  };
  price: {
    eyebrow: string;
    text: string;
    request: string;
  };
  finalCta: {
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
  };
}

const content: Localized<ServiceContent> = {
  fr: {
    eyebrow: "Service",
    startProject: "Démarrer un projet",
    allServices: "Tous les services",
    intro: {
      eyebrow: "La prestation",
      titleStart: "Une solution pensée",
      titleEnd: "pour votre projet.",
      paragraphs: [
        "Chaque projet commence par la compréhension du besoin. L’objectif est de construire une solution claire, cohérente et adaptée à votre contexte.",
        "La prestation est ensuite structurée autour des fonctionnalités et livrables réellement nécessaires à votre projet.",
      ],
    },
    features: {
      eyebrow: "Ce qui est inclus",
      titleStart: "Les éléments essentiels",
      titleEnd: "du projet.",
    },
    process: {
      eyebrow: "Processus",
      titleStart: "Comment le projet",
      titleEnd: "se déroule.",
      steps: [
        {
          number: "01",
          title: "Échange",
          text: "Nous échangeons sur votre projet, vos objectifs et vos besoins.",
        },
        {
          number: "02",
          title: "Cadrage",
          text: "Nous définissons le périmètre, les fonctionnalités et les livrables.",
        },
        {
          number: "03",
          title: "Conception",
          text: "La solution est structurée avant le développement ou la production.",
        },
        {
          number: "04",
          title: "Réalisation",
          text: "Le projet est développé, testé puis préparé pour sa mise en ligne.",
        },
      ],
    },
    price: {
      eyebrow: "Tarif",
      text: "Chaque projet possède ses propres contraintes et objectifs. Contactez-moi afin de définir précisément le périmètre de votre projet et obtenir une proposition adaptée.",
      request: "Demander cette prestation",
    },
    finalCta: {
      eyebrow: "Prêt à commencer ?",
      titleStart: "Parlons de votre",
      titleEnd: "projet.",
    },
  },
  en: {
    eyebrow: "Service",
    startProject: "Start a project",
    allServices: "All services",
    intro: {
      eyebrow: "The service",
      titleStart: "A solution designed",
      titleEnd: "around your project.",
      paragraphs: [
        "Every project starts with understanding the need. The goal is to build a clear, consistent solution that fits your context.",
        "The work is then organised around the features and deliverables your project actually needs.",
      ],
    },
    features: {
      eyebrow: "What’s included",
      titleStart: "The key building blocks",
      titleEnd: "of the project.",
    },
    process: {
      eyebrow: "Process",
      titleStart: "How the project",
      titleEnd: "unfolds.",
      steps: [
        {
          number: "01",
          title: "Discovery",
          text: "We discuss your project, your goals and your needs.",
        },
        {
          number: "02",
          title: "Scoping",
          text: "We define the scope, the features and the deliverables.",
        },
        {
          number: "03",
          title: "Design",
          text: "The solution is structured before development or production begins.",
        },
        {
          number: "04",
          title: "Delivery",
          text: "The project is built, tested and prepared for launch.",
        },
      ],
    },
    price: {
      eyebrow: "Pricing",
      text: "Every project has its own constraints and goals. Get in touch so we can define your project’s scope precisely and I can send you a tailored proposal.",
      request: "Request this service",
    },
    finalCta: {
      eyebrow: "Ready to get started?",
      titleStart: "Let’s talk about your",
      titleEnd: "project.",
    },
  },
};

export function generateStaticParams() {
  return getServices(defaultLocale).map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const service = getService(lang, slug);

  if (!service) {
    return {};
  }

  const path = `/services/${service.slug}`;

  return {
    title: service.title,

    description: service.description,

    alternates: languageAlternates(lang, path),

    openGraph: {
      title: `${service.title} — Andriamahandry Hasiniavo`,
      description: service.description,
      url: localePath(lang, path),
      type: "website",
      locale: ogLocale[lang],
    },
  };
}

export default async function ServicePage({
  params,
}: ServicePageProps) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) notFound();

  const service = getService(lang, slug);

  if (!service) {
    notFound();
  }

  const t = content[lang];

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative border-b border-[#1f1f1f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d00018]/10 blur-[140px]"
        />

        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40">
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#d00018]">
                {service.number}
              </span>

              <span className="h-px w-8 bg-[#d00018]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                {t.eyebrow}
              </p>
            </div>

            <h1 className="mt-10 max-w-5xl text-balance text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              {service.title}
            </h1>

            <p className="mt-10 max-w-2xl text-pretty text-lg leading-8 text-neutral-400 sm:text-xl">
              {service.description}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href={localePath(lang, "/contact")}
                className="inline-flex items-center justify-center rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
              >
                {t.startProject}
              </Link>

              <Link
                href={localePath(lang, "/services")}
                className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#d00018] hover:bg-[#190003]"
              >
                {t.allServices}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* INTRO */}
      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                {t.intro.eyebrow}
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                {t.intro.titleStart}
                <span className="text-neutral-500">
                  {" "}
                  {t.intro.titleEnd}
                </span>
              </h2>
            </div>

            <div>
              <p className="text-base leading-8 text-neutral-500 sm:text-lg">
                {t.intro.paragraphs[0]}
              </p>

              <p className="mt-6 text-base leading-8 text-neutral-500 sm:text-lg">
                {t.intro.paragraphs[1]}
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FEATURES */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                {t.features.eyebrow}
              </p>

              <h2 className="mt-6 text-balance text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                {t.features.titleStart}
                <span className="text-neutral-500">
                  {" "}
                  {t.features.titleEnd}
                </span>
              </h2>
            </div>

            <div className="mt-16 grid border-l border-t border-[#1f1f1f] md:grid-cols-2">
              {service.features.map((feature, index) => (
                <article
                  key={feature}
                  className="border-b border-r border-[#1f1f1f] p-8 sm:p-10"
                >
                  <span className="text-xs text-[#d00018]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-12 text-xl font-medium sm:text-2xl">
                    {feature}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
              {t.process.eyebrow}
            </p>

            <h2 className="mt-6 text-balance text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
              {t.process.titleStart}
              <span className="text-neutral-500">
                {" "}
                {t.process.titleEnd}
              </span>
            </h2>
          </div>

          <div className="mt-16 space-y-0 border-t border-[#1f1f1f]">
            {t.process.steps.map((step) => (
              <div
                key={step.number}
                className="grid gap-6 border-b border-[#1f1f1f] py-8 sm:grid-cols-[80px_220px_1fr] sm:items-center sm:py-10"
              >
                <span className="text-xs text-[#d00018]">
                  {step.number}
                </span>

                <h3 className="text-xl font-medium">
                  {step.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-neutral-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICE */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="grid gap-12 py-24 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:py-32">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                {t.price.eyebrow}
              </p>

              <h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
                {service.priceLabel}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-neutral-500">
                {t.price.text}
              </p>
            </div>

            <div className="border border-[#292929] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                {service.title}
              </p>

              <p className="mt-8 text-2xl font-medium">
                {service.priceLabel}
              </p>

              <div className="mt-8 border-t border-[#1f1f1f] pt-8">
                <ul className="space-y-4">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-neutral-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#d00018]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={localePath(lang, "/contact")}
                className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015]"
              >
                {t.price.request}
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <Section>
        <Container>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
              {t.finalCta.eyebrow}
            </p>

            <h2 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-6xl">
              {t.finalCta.titleStart}
              <span className="text-neutral-500">
                {" "}
                {t.finalCta.titleEnd}
              </span>
            </h2>

            <Link
              href={localePath(lang, "/contact")}
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#d00018] px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
            >
              {t.startProject}
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}
