import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import {
  hasLocale,
  languageAlternates,
  localePath,
  ogLocale,
  type Localized,
} from "@/lib/i18n";

interface AboutPageProps {
  params: Promise<{ lang: string }>;
}

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Prisma",
];

interface AboutContent {
  meta: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
  };
  hero: {
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
    intro: string;
  };
  profile: {
    photoAlt: string;
    badge: string;
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
    paragraphs: string[];
    link: string;
  };
  principles: {
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
    items: { number: string; title: string; description: string }[];
  };
  skills: {
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
    text: string;
    items: string[];
  };
  lumi: {
    eyebrow: string;
    title: string;
    text: string;
    link: string;
    imageAlt: string;
  };
  cta: {
    eyebrow: string;
    titleStart: string;
    titleEnd: string;
    text: string;
    services: string;
    projects: string;
  };
}

const content: Localized<AboutContent> = {
  fr: {
    meta: {
      title: "À propos",
      description:
        "Découvrez le parcours, l'approche et les compétences d'Andriamahandry Hasiniavo, développeur web et créateur digital.",
      ogTitle: "À propos — Andriamahandry Hasiniavo",
      ogDescription:
        "Découvrez mon parcours, mon approche et ma manière de concevoir des produits digitaux.",
    },
    hero: {
      eyebrow: "À propos",
      titleStart: "La personne",
      titleEnd: "derrière les projets.",
      intro:
        "Je suis Andriamahandry Hasiniavo, créateur digital et développeur web. Je conçois des produits et expériences digitales avec une attention particulière portée à la simplicité, au design et à la performance.",
    },
    profile: {
      photoAlt: "Andriamahandry Hasiniavo",
      badge: "Digital creator",
      eyebrow: "Mon approche",
      titleStart: "Créer avec intention,",
      titleEnd: "pas simplement avec de la technologie.",
      paragraphs: [
        "Pour moi, un bon produit digital ne se résume pas à son apparence ou à la technologie utilisée pour le construire. Il doit avant tout répondre clairement à un besoin.",
        "J’aime partir d’une idée parfois simple ou encore incomplète, la structurer, imaginer son expérience puis la transformer en une solution concrète.",
        "Cette approche se retrouve notamment dans LUMI, un micro-SaaS que je développe pour répondre à des problématiques réelles rencontrées par les restaurateurs.",
      ],
      link: "Découvrir LUMI",
    },
    principles: {
      eyebrow: "Ma manière de travailler",
      titleStart: "Trois étapes pour passer",
      titleEnd: "de l’idée au produit.",
      items: [
        {
          number: "01",
          title: "Comprendre",
          description:
            "Avant de construire, je cherche à comprendre le problème, les utilisateurs et l'objectif réel du projet.",
        },
        {
          number: "02",
          title: "Concevoir",
          description:
            "Je transforme les besoins identifiés en interfaces claires, cohérentes et agréables à utiliser.",
        },
        {
          number: "03",
          title: "Développer",
          description:
            "Je construis des solutions modernes, performantes et pensées pour pouvoir évoluer dans le temps.",
        },
      ],
    },
    skills: {
      eyebrow: "Technologies",
      titleStart: "Les outils derrière",
      titleEnd: "mes projets.",
      text: "J’utilise des technologies modernes pour concevoir des expériences rapides, maintenables et adaptées aux besoins de chaque projet.",
      items: skills,
    },
    lumi: {
      eyebrow: "Projet personnel",
      title: "LUMI",
      text: "Un micro-SaaS imaginé pour aider les restaurateurs à mieux comprendre leur présence digitale, identifier leurs opportunités et prendre des décisions plus pertinentes.",
      link: "Voir l’étude de cas",
      imageAlt: "Projet LUMI",
    },
    cta: {
      eyebrow: "Parlons de votre projet",
      titleStart: "Une idée à transformer",
      titleEnd: "en réalité ?",
      text: "Découvrez mes services ou contactez-moi pour discuter de votre projet.",
      services: "Découvrir mes services",
      projects: "Voir mes projets",
    },
  },
  en: {
    meta: {
      title: "About",
      description:
        "Learn about the background, approach and skills of Andriamahandry Hasiniavo, web developer and digital creator.",
      ogTitle: "About — Andriamahandry Hasiniavo",
      ogDescription:
        "Learn about my background, my approach and how I design digital products.",
    },
    hero: {
      eyebrow: "About",
      titleStart: "The person",
      titleEnd: "behind the projects.",
      intro:
        "I’m Andriamahandry Hasiniavo, a digital creator and web developer. I design digital products and experiences with a strong focus on simplicity, design and performance.",
    },
    profile: {
      photoAlt: "Andriamahandry Hasiniavo",
      badge: "Digital creator",
      eyebrow: "My approach",
      titleStart: "Building with intent,",
      titleEnd: "not just with technology.",
      paragraphs: [
        "To me, a good digital product is more than how it looks or the technology behind it. Above all, it has to clearly meet a real need.",
        "I like starting from an idea — sometimes simple, sometimes still unfinished — then giving it structure, shaping the experience and turning it into a concrete solution.",
        "You can see this approach in LUMI, a micro-SaaS I’m building to solve real problems faced by restaurant owners.",
      ],
      link: "Discover LUMI",
    },
    principles: {
      eyebrow: "How I work",
      titleStart: "Three steps to go",
      titleEnd: "from idea to product.",
      items: [
        {
          number: "01",
          title: "Understand",
          description:
            "Before building anything, I make sure I understand the problem, the users and the real goal of the project.",
        },
        {
          number: "02",
          title: "Design",
          description:
            "I turn the needs I’ve identified into clear, consistent interfaces that are pleasant to use.",
        },
        {
          number: "03",
          title: "Build",
          description:
            "I build modern, high-performing solutions designed to evolve over time.",
        },
      ],
    },
    skills: {
      eyebrow: "Technologies",
      titleStart: "The tools behind",
      titleEnd: "my projects.",
      text: "I use modern technologies to create fast, maintainable experiences tailored to each project’s needs.",
      items: skills,
    },
    lumi: {
      eyebrow: "Personal project",
      title: "LUMI",
      text: "A micro-SaaS designed to help restaurant owners better understand their online presence, spot opportunities and make smarter decisions.",
      link: "View the case study",
      imageAlt: "LUMI project",
    },
    cta: {
      eyebrow: "Let’s talk about your project",
      titleStart: "Got an idea to turn",
      titleEnd: "into reality?",
      text: "Explore my services or get in touch to discuss your project.",
      services: "Explore my services",
      projects: "View my projects",
    },
  },
};

export async function generateMetadata({
  params,
}: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;

  if (!hasLocale(lang)) {
    return {};
  }

  const t = content[lang].meta;

  return {
    title: t.title,

    description: t.description,

    alternates: languageAlternates(lang, "/about"),

    openGraph: {
      title: t.ogTitle,
      description: t.ogDescription,
      url: localePath(lang, "/about"),
      type: "profile",
      locale: ogLocale[lang],
    },
  };
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const t = content[lang];

  return (
    <div className="overflow-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative border-b border-[#1f1f1f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d00018]/10 blur-[140px]"
        />

        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d00018]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                {t.hero.eyebrow}
              </p>
            </div>

            <h1 className="mt-10 max-w-6xl text-balance text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              {t.hero.titleStart}
              <br />
              <span className="text-neutral-500">
                {t.hero.titleEnd}
              </span>
            </h1>

            <p className="mt-12 max-w-2xl text-pretty text-lg leading-8 text-neutral-400 sm:text-xl">
              {t.hero.intro}
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROFILE
      ===================================================== */}

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
            {/* PHOTO */}

            <div>
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a] lg:mx-0">
                <Image
                  src="/about/profile.jpeg"
                  alt={t.profile.photoAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />

                <div className="absolute inset-0 border border-white/5" />

                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                    {t.profile.badge}
                  </span>
                </div>
              </div>
            </div>

            {/* INTRODUCTION */}

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                {t.profile.eyebrow}
              </p>

              <h2 className="mt-6 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {t.profile.titleStart}
                <span className="text-neutral-500">
                  {" "}
                  {t.profile.titleEnd}
                </span>
              </h2>

              <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-neutral-500">
                {t.profile.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href={localePath(lang, "/projects/lumi")}
                  className="group inline-flex items-center gap-3 text-sm font-medium text-white transition-colors duration-300 hover:text-[#d00018]"
                >
                  <span>{t.profile.link}</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}

      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                {t.principles.eyebrow}
              </p>

              <h2 className="mt-6 text-balance text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                {t.principles.titleStart}
                <span className="text-neutral-500">
                  {" "}
                  {t.principles.titleEnd}
                </span>
              </h2>
            </div>

            <div className="mt-16 grid border-l border-t border-[#1f1f1f] md:grid-cols-3">
              {t.principles.items.map((principle) => (
                <article
                  key={principle.number}
                  className="border-b border-r border-[#1f1f1f] p-8 sm:p-10"
                >
                  <span className="text-xs text-[#d00018]">
                    {principle.number}
                  </span>

                  <h3 className="mt-16 text-2xl font-medium">
                    {principle.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-500">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                {t.skills.eyebrow}
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                {t.skills.titleStart}
                <span className="text-neutral-500">
                  {" "}
                  {t.skills.titleEnd}
                </span>
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-8 text-neutral-500 sm:text-lg">
                {t.skills.text}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {t.skills.items.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#292929] px-5 py-2.5 text-sm text-neutral-400 transition-colors duration-300 hover:border-[#d00018] hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          LUMI FEATURE
      ===================================================== */}

      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="grid gap-12 py-24 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:py-32">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                {t.lumi.eyebrow}
              </p>

              <h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
                {t.lumi.title}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-neutral-500 sm:text-lg">
                {t.lumi.text}
              </p>

              <div className="mt-10">
                <Link
                  href={localePath(lang, "/projects/lumi")}
                  className="group inline-flex items-center gap-3 rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
                >
                  <span>{t.lumi.link}</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a]">
              <Image
                src="/projects/lumi/hero.png"
                alt={t.lumi.imageAlt}
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <Section>
        <Container>
          <div className="relative overflow-hidden border border-[#1f1f1f] px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d00018]/10 blur-[100px]"
            />

            <div className="relative max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                {t.cta.eyebrow}
              </p>

              <h2 className="mt-6 text-balance text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {t.cta.titleStart}
                <span className="text-neutral-500">
                  {" "}
                  {t.cta.titleEnd}
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500">
                {t.cta.text}
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={localePath(lang, "/services")}
                  className="inline-flex items-center justify-center rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
                >
                  {t.cta.services}
                </Link>

                <Link
                  href={localePath(lang, "/projects")}
                  className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#d00018] hover:bg-[#190003]"
                >
                  {t.cta.projects}
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
