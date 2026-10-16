import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import ScrollProgress from "@/components/motion/ScrollProgress";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

import {
  hasLocale,
  languageAlternates,
  localePath,
  ogLocale,
  type Localized,
} from "@/lib/i18n";

type Content = {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
    ogImageAlt: string;
  };
  hero: {
    titleLine1: string;
    titleLine2: string;
    intro: string;
    roleLabel: string;
    role: string;
    typeLabel: string;
    type: string;
    viewLumi: string;
    workTogether: string;
  };
  visual: {
    alt: string;
    caption: string;
  };
  context: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  product: {
    eyebrow: string;
    title: string;
    intro: string;
    features: { number: string; title: string; description: string }[];
  };
  score: {
    eyebrow: string;
    title: string;
    intro: string;
    link: string;
    cardLabel: string;
    example: string;
    items: { label: string; score: string }[];
  };
  visualAnalysis: {
    eyebrow: string;
    title: string;
    intro: string;
    images: { src: string; label: string }[];
  };
  method: {
    eyebrow: string;
    title: string;
    steps: { number: string; title: string; text: string }[];
  };
  business: {
    eyebrow: string;
    title: string;
    intro: string;
    offers: {
      label: string;
      price: string;
      description: string;
      featured?: boolean;
    }[];
  };
  tech: {
    eyebrow: string;
    title: string;
    intro: string;
    details: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    viewProject: string;
    allProjects: string;
  };
};

const content: Localized<Content> = {
  fr: {
    meta: {
      title: "LUMI — Micro-SaaS pour restaurateurs",
      description:
        "Étude de cas de LUMI, un micro-SaaS conçu pour aider les restaurateurs à améliorer leur visibilité et leurs performances digitales.",
      ogDescription:
        "Découvrez la conception, l'expérience et l'architecture du projet LUMI.",
      ogImageAlt: "LUMI — Micro-SaaS pour restaurateurs",
    },
    hero: {
      titleLine1: "Révéler le potentiel",
      titleLine2: "des restaurants.",
      intro:
        "LUMI est un micro-SaaS conçu pour aider les restaurateurs à améliorer leur visibilité, leur image et leurs performances sur les plateformes de livraison.",
      roleLabel: "Rôle",
      role: "Conception · UX/UI · Développement",
      typeLabel: "Type",
      type: "SaaS · Product",
      viewLumi: "Voir LUMI",
      workTogether: "Travailler ensemble",
    },
    visual: {
      alt: "Interface principale de LUMI",
      caption: "Interface principale de LUMI",
    },
    context: {
      eyebrow: "Le contexte",
      title: "Transformer les données en décisions.",
      paragraphs: [
        "Pour de nombreux restaurateurs, être présent sur Uber Eats ou Deliveroo ne suffit pas. La qualité des photos, les prix, la structure du menu, les avis et le positionnement influencent directement la perception du restaurant.",
        "LUMI a été pensé pour rendre cette analyse plus simple, compréhensible et directement exploitable.",
        "L’objectif n’est pas simplement de produire des données, mais de transformer ces données en recommandations concrètes.",
      ],
    },
    product: {
      eyebrow: "Le produit",
      title: "Une analyse pensée pour être immédiatement utile.",
      intro:
        "LUMI rassemble plusieurs dimensions essentielles de la performance digitale d’un restaurant dans une expérience simple et structurée.",
      features: [
        {
          number: "01",
          title: "Audit Uber Eats & Deliveroo",
          description:
            "Une analyse complète de la présence digitale d'un restaurant afin d'identifier les points forts, les faiblesses et les opportunités d'amélioration.",
        },
        {
          number: "02",
          title: "Analyse du menu",
          description:
            "Analyse de la structure, de la lisibilité et de l'attractivité du menu pour améliorer l'expérience et favoriser la conversion.",
        },
        {
          number: "03",
          title: "Analyse des prix",
          description:
            "Comparaison des prix avec la concurrence locale afin d'identifier les écarts et proposer un positionnement plus pertinent.",
        },
        {
          number: "04",
          title: "Optimisation de la visibilité",
          description:
            "Analyse du positionnement et de la visibilité sur les plateformes de livraison avec des recommandations concrètes.",
        },
        {
          number: "05",
          title: "Analyse des photos",
          description:
            "Évaluation de la lumière, de la netteté, du cadrage, de l'appétence et du potentiel de conversion des photos.",
        },
        {
          number: "06",
          title: "Rapport LUMI™",
          description:
            "Un score global sur 100 accompagné d'un plan d'action clair permettant au restaurateur de savoir exactement quoi améliorer.",
        },
      ],
    },
    score: {
      eyebrow: "LUMI™ Score",
      title: "Un score simple pour comprendre la situation.",
      intro:
        "Chaque audit produit un score global sur 100 accompagné d’une analyse détaillée. Le restaurateur peut ainsi identifier rapidement ses priorités.",
      link: "Découvrir le système LUMI →",
      cardLabel: "Score LUMI™",
      example: "Exemple",
      items: [
        { label: "Photos", score: "22/25" },
        { label: "Menu", score: "18/20" },
        { label: "Prix", score: "13/15" },
        { label: "Visibilité", score: "12/15" },
        { label: "Avis clients", score: "9/15" },
        { label: "Concurrence", score: "10/10" },
      ],
    },
    visualAnalysis: {
      eyebrow: "Analyse visuelle",
      title: "Les photos vendent avant les descriptions.",
      intro:
        "LUMI analyse la lumière, la netteté, le cadrage, l’appétence, la cohérence et le potentiel de conversion des photos de plats.",
      images: [
        { src: "/projects/lumi/photo-1.png", label: "Analyse produit" },
        { src: "/projects/lumi/photo-2.png", label: "Analyse visuelle" },
        { src: "/projects/lumi/photo-3.png", label: "Qualité photo" },
        { src: "/projects/lumi/photo-4.png", label: "Potentiel de conversion" },
      ],
    },
    method: {
      eyebrow: "Méthode",
      title: "De l’analyse à l’action.",
      steps: [
        {
          number: "01",
          title: "Audit",
          text: "Analyse de la présence actuelle du restaurant.",
        },
        {
          number: "02",
          title: "Plan d'action",
          text: "Identification des priorités et des opportunités.",
        },
        {
          number: "03",
          title: "Optimisation",
          text: "Mise en place des améliorations recommandées.",
        },
      ],
    },
    business: {
      eyebrow: "Business model",
      title: "Un modèle pensé pour commencer simplement.",
      intro:
        "LUMI propose une entrée gratuite, une analyse approfondie et un accompagnement récurrent pour les restaurants souhaitant améliorer continuellement leur présence digitale.",
      offers: [
        {
          label: "Audit découverte",
          price: "Gratuit",
          description:
            "Une première analyse pour identifier les principales opportunités.",
        },
        {
          label: "Audit complet",
          price: "80 €",
          description:
            "Une analyse approfondie avec recommandations détaillées et rapport professionnel.",
          featured: true,
        },
        {
          label: "Accompagnement",
          price: "200 €/mois",
          description:
            "Un suivi continu avec optimisation, analyse concurrentielle et reporting.",
        },
      ],
    },
    tech: {
      eyebrow: "Architecture",
      title: "Une base technique pensée pour évoluer.",
      intro:
        "L’architecture de LUMI sépare clairement l’interface, la logique métier et la persistance des données afin de permettre au produit d’évoluer vers une véritable plateforme SaaS.",
      details:
        "Le frontend repose sur Next.js et TypeScript. Le backend NestJS est prévu pour centraliser la logique métier, les API et les traitements liés aux audits. PostgreSQL et Prisma assurent la gestion et l’accès aux données.",
    },
    cta: {
      eyebrow: "Projet suivant",
      title: "Construire des produits qui ont une vraie utilité.",
      text: "LUMI est un exemple de produit conçu autour d’un problème réel, avec une expérience simple et une architecture capable d’évoluer.",
      viewProject: "Voir le projet",
      allProjects: "Tous les projets",
    },
  },
  en: {
    meta: {
      title: "LUMI — Micro-SaaS for restaurants",
      description:
        "Case study of LUMI, a micro-SaaS that helps restaurant owners improve their visibility and digital performance.",
      ogDescription:
        "Explore the design, user experience and architecture behind LUMI.",
      ogImageAlt: "LUMI — Micro-SaaS for restaurants",
    },
    hero: {
      titleLine1: "Unlocking the potential",
      titleLine2: "of restaurants.",
      intro:
        "LUMI is a micro-SaaS that helps restaurant owners improve their visibility, brand image and performance on food delivery platforms.",
      roleLabel: "Role",
      role: "Product design · UX/UI · Development",
      typeLabel: "Type",
      type: "SaaS · Product",
      viewLumi: "View LUMI",
      workTogether: "Work together",
    },
    visual: {
      alt: "LUMI main interface",
      caption: "LUMI main interface",
    },
    context: {
      eyebrow: "Context",
      title: "Turning data into decisions.",
      paragraphs: [
        "For many restaurant owners, simply being on Uber Eats or Deliveroo isn't enough. Photo quality, pricing, menu structure, reviews and positioning all directly shape how a restaurant is perceived.",
        "LUMI was designed to make this analysis simpler, clearer and immediately actionable.",
        "The goal isn't just to produce data, but to turn that data into concrete recommendations.",
      ],
    },
    product: {
      eyebrow: "The product",
      title: "Analysis built to be useful from day one.",
      intro:
        "LUMI brings the key dimensions of a restaurant's digital performance together in one simple, structured experience.",
      features: [
        {
          number: "01",
          title: "Uber Eats & Deliveroo audit",
          description:
            "A complete review of a restaurant's digital presence to pinpoint strengths, weaknesses and opportunities for improvement.",
        },
        {
          number: "02",
          title: "Menu analysis",
          description:
            "Reviews the menu's structure, readability and appeal to improve the experience and drive conversions.",
        },
        {
          number: "03",
          title: "Pricing analysis",
          description:
            "Benchmarks prices against local competitors to spot gaps and suggest more relevant positioning.",
        },
        {
          number: "04",
          title: "Visibility optimisation",
          description:
            "Analyses ranking and visibility on delivery platforms, with concrete recommendations.",
        },
        {
          number: "05",
          title: "Photo analysis",
          description:
            "Assesses lighting, sharpness, framing, appetite appeal and the conversion potential of each photo.",
        },
        {
          number: "06",
          title: "LUMI™ report",
          description:
            "An overall score out of 100 with a clear action plan, so owners know exactly what to improve.",
        },
      ],
    },
    score: {
      eyebrow: "LUMI™ Score",
      title: "One simple score to understand where you stand.",
      intro:
        "Every audit produces an overall score out of 100 backed by a detailed analysis, so restaurant owners can quickly identify their priorities.",
      link: "Discover the LUMI system →",
      cardLabel: "LUMI™ Score",
      example: "Example",
      items: [
        { label: "Photos", score: "22/25" },
        { label: "Menu", score: "18/20" },
        { label: "Pricing", score: "13/15" },
        { label: "Visibility", score: "12/15" },
        { label: "Customer reviews", score: "9/15" },
        { label: "Competition", score: "10/10" },
      ],
    },
    visualAnalysis: {
      eyebrow: "Visual analysis",
      title: "Photos sell before descriptions do.",
      intro:
        "LUMI analyses the lighting, sharpness, framing, appetite appeal, consistency and conversion potential of dish photos.",
      images: [
        { src: "/projects/lumi/photo-1.png", label: "Product analysis" },
        { src: "/projects/lumi/photo-2.png", label: "Visual analysis" },
        { src: "/projects/lumi/photo-3.png", label: "Photo quality" },
        { src: "/projects/lumi/photo-4.png", label: "Conversion potential" },
      ],
    },
    method: {
      eyebrow: "Method",
      title: "From analysis to action.",
      steps: [
        {
          number: "01",
          title: "Audit",
          text: "Review of the restaurant's current presence.",
        },
        {
          number: "02",
          title: "Action plan",
          text: "Identifying priorities and opportunities.",
        },
        {
          number: "03",
          title: "Optimisation",
          text: "Rolling out the recommended improvements.",
        },
      ],
    },
    business: {
      eyebrow: "Business model",
      title: "A model designed for an easy start.",
      intro:
        "LUMI offers a free entry point, an in-depth analysis and ongoing support for restaurants that want to keep improving their digital presence.",
      offers: [
        {
          label: "Discovery audit",
          price: "Free",
          description: "A first analysis to identify the main opportunities.",
        },
        {
          label: "Full audit",
          price: "€80",
          description:
            "An in-depth analysis with detailed recommendations and a professional report.",
          featured: true,
        },
        {
          label: "Ongoing support",
          price: "€200/month",
          description:
            "Continuous follow-up with optimisation, competitor analysis and reporting.",
        },
      ],
    },
    tech: {
      eyebrow: "Architecture",
      title: "A technical foundation built to scale.",
      intro:
        "LUMI's architecture cleanly separates the interface, business logic and data persistence, so the product can grow into a full SaaS platform.",
      details:
        "The frontend is built with Next.js and TypeScript. A NestJS backend is planned to centralise business logic, APIs and audit processing. PostgreSQL and Prisma handle data management and access.",
    },
    cta: {
      eyebrow: "Next project",
      title: "Building products that truly matter.",
      text: "LUMI is an example of a product built around a real problem, with a simple experience and an architecture designed to evolve.",
      viewProject: "View the project",
      allProjects: "All projects",
    },
  },
};

const technologies = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "NestJS",
  "PostgreSQL",
  "Prisma",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = content[lang].meta;

  return {
    title: t.title,

    description: t.description,

    alternates: languageAlternates(lang, "/projects/lumi"),

    openGraph: {
      title: t.title,
      description: t.ogDescription,
      url: localePath(lang, "/projects/lumi"),
      type: "article",
      locale: ogLocale[lang],
      images: [
        {
          url: "/projects/lumi/hero.png",
          width: 1600,
          height: 900,
          alt: t.ogImageAlt,
        },
      ],
    },
  };
}

export default async function LumiProjectPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = content[lang];

  return (
    <div className="overflow-hidden">
      <ScrollProgress />

      {/* HERO */}
      <section className="relative border-b border-[#1f1f1f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#d00018]/10 blur-[140px]" />
        </div>

        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40">
            <div className="mb-10 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span>LUMI</span>
              <span className="text-[#d00018]">•</span>
              <span>Micro-SaaS</span>
              <span className="text-neutral-700">/</span>
              <span>2026</span>
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              {t.hero.titleLine1}
              <span className="block text-neutral-500">
                {t.hero.titleLine2}
              </span>
            </h1>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
              <p className="max-w-2xl text-lg leading-8 text-neutral-400 sm:text-xl">
                {t.hero.intro}
              </p>

              <div className="lg:border-l lg:border-[#1f1f1f] lg:pl-8">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  {t.hero.roleLabel}
                </p>
                <p className="mt-3 text-sm text-neutral-300">
                  {t.hero.role}
                </p>

                <p className="mt-7 text-xs uppercase tracking-[0.2em] text-neutral-600">
                  {t.hero.typeLabel}
                </p>
                <p className="mt-3 text-sm text-neutral-300">
                  {t.hero.type}
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="https://lumi-hikari.vercel.app/">
                {t.hero.viewLumi}
              </Button>

              <Button href={localePath(lang, "/services")} variant="secondary">
                {t.hero.workTogether}
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* PROJECT VISUAL */}
      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="py-16 sm:py-24">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#242424] bg-[#0a0a0a]">
              <ViewTransition name="project-lumi" share="morph" default="none">
                <div className="absolute inset-0">
                  <Image
                    src="/projects/lumi/hero.png"
                    alt={t.visual.alt}
                    fill
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover"
                    priority
                  />
                </div>
              </ViewTransition>
            </div>

            <p className="mt-4 text-xs text-neutral-600">
              {t.visual.caption}
            </p>
          </div>
        </Container>
      </section>

      {/* CONTEXT */}
      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                {t.context.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t.context.title}
              </h2>
            </div>

            <div className="max-w-2xl space-y-6 text-base leading-8 text-neutral-400 sm:text-lg">
              {t.context.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* PRODUCT */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                {t.product.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t.product.title}
              </h2>

              <p className="mt-6 text-base leading-7 text-neutral-500 sm:text-lg">
                {t.product.intro}
              </p>
            </div>

            <div className="mt-20 grid border-l border-t border-[#1f1f1f] sm:grid-cols-2 lg:grid-cols-3">
              {t.product.features.map((feature) => (
                <article
                  key={feature.number}
                  className="border-b border-r border-[#1f1f1f] p-8 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-10"
                >
                  <span className="text-xs text-[#d00018]">
                    {feature.number}
                  </span>

                  <h3 className="mt-12 text-xl font-medium">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-neutral-500">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SCORE */}
      <Section>
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                {t.score.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t.score.title}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
                {t.score.intro}
              </p>

              <div className="mt-10">
                <Link
                  href="https://lumi-hikari.vercel.app/"
                  className="text-sm font-medium text-white transition-colors hover:text-[#d00018]"
                >
                  {t.score.link}
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#242424] bg-[#080808] p-8 sm:p-10">
              <div className="flex items-end justify-between border-b border-[#242424] pb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                    {t.score.cardLabel}
                  </p>

                  <div className="mt-3 flex items-baseline">
                    <span className="text-7xl font-semibold tracking-[-0.06em]">
                      84
                    </span>
                    <span className="ml-2 text-neutral-600">/100</span>
                  </div>
                </div>

                <span className="rounded-full border border-[#303030] px-3 py-1 text-xs text-neutral-500">
                  {t.score.example}
                </span>
              </div>

              <div className="mt-8 space-y-5">
                {t.score.items.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-400">
                        {item.label}
                      </span>
                      <span className="text-neutral-200">
                        {item.score}
                      </span>
                    </div>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1c1c1c]">
                      <div
                        className="h-full bg-[#d00018]"
                        style={{
                          width: `${(Number(item.score.split("/")[0]) /
                            Number(item.score.split("/")[1])) *
                            100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* VISUAL ANALYSIS */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="grid gap-12 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:py-32">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                {t.visualAnalysis.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t.visualAnalysis.title}
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-neutral-500">
                {t.visualAnalysis.intro}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {t.visualAnalysis.images.map((image) => (
                <div key={image.src}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#242424] bg-[#0a0a0a]">
                    <Image
                      src={image.src}
                      alt={image.label}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <p className="mt-3 text-xs text-neutral-600">
                    {image.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* METHOD */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
              {t.method.eyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
              {t.method.title}
            </h2>
          </div>

          <div className="mt-16 grid border-l border-t border-[#1f1f1f] md:grid-cols-3">
            {t.method.steps.map((step) => (
              <div
                key={step.number}
                className="border-b border-r border-[#1f1f1f] p-8 sm:p-10"
              >
                <span className="text-xs text-[#d00018]">
                  {step.number}
                </span>

                <h3 className="mt-16 text-2xl font-medium">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-neutral-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* BUSINESS MODEL */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                {t.business.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t.business.title}
              </h2>

              <p className="mt-6 text-base leading-7 text-neutral-500 sm:text-lg">
                {t.business.intro}
              </p>
            </div>

            <div className="mt-16 grid gap-4 lg:grid-cols-3">
              {t.business.offers.map((offer) => (
                <article
                  key={offer.label}
                  className={`rounded-2xl border p-8 sm:p-10 ${
                    offer.featured
                      ? "border-[#d00018]/50 bg-[#190003]"
                      : "border-[#242424] bg-[#080808]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {offer.label}
                  </p>

                  <p className="mt-8 text-4xl font-semibold tracking-tight">
                    {offer.price}
                  </p>

                  <p className="mt-5 text-sm leading-6 text-neutral-500">
                    {offer.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* TECH */}
      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                {t.tech.eyebrow}
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                {t.tech.title}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
                {t.tech.intro}
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-3">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[#292929] px-4 py-2 text-sm text-neutral-400"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-10 border-t border-[#1f1f1f] pt-8">
                <p className="text-sm leading-7 text-neutral-500">
                  {t.tech.details}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="py-24 text-center sm:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
              {t.cta.eyebrow}
            </p>

            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              {t.cta.title}
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-500">
              {t.cta.text}
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Button href="https://lumi-hikari.vercel.app/">
                {t.cta.viewProject}
              </Button>

              <Button href={localePath(lang, "/projects")} variant="secondary">
                {t.cta.allProjects}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
