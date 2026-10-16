import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { getProjects } from "@/data/projects";
import {
  hasLocale,
  languageAlternates,
  localePath,
  ogLocale,
  type Localized,
} from "@/lib/i18n";

const content: Localized<{
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  titleStart: string;
  titleEnd: string;
  intro: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaButton: string;
}> = {
  fr: {
    metaTitle: "Projets",
    metaDescription:
      "Sélection de produits digitaux, de sites web et de projets professionnels conçus ou développés par Andriamahandry Hasiniavo.",
    eyebrow: "Portfolio sélectionné",
    titleStart: "Des idées.",
    titleEnd: "Des projets concrets.",
    intro:
      "Une sélection de produits digitaux, de sites web et de projets professionnels auxquels j’ai contribué. Chaque projet répond à un besoin et poursuit un objectif précis.",
    ctaEyebrow: "Une idée en tête ?",
    ctaTitle: "Construisons quelque chose d’utile.",
    ctaButton: "Discutons de votre projet",
  },
  en: {
    metaTitle: "Projects",
    metaDescription:
      "A selection of digital products, websites and professional projects designed or built by Andriamahandry Hasiniavo.",
    eyebrow: "Selected work",
    titleStart: "Ideas.",
    titleEnd: "Real projects.",
    intro:
      "A selection of digital products, websites and professional projects I have worked on. Each one answers a need and pursues a clear goal.",
    ctaEyebrow: "Got an idea in mind?",
    ctaTitle: "Let’s build something useful.",
    ctaButton: "Let’s talk about your project",
  },
};

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = content[lang];

  return {
    title: t.metaTitle,
    description: t.metaDescription,
    alternates: languageAlternates(lang, "/projects"),
    openGraph: { title: t.metaTitle, description: t.metaDescription, locale: ogLocale[lang] },
  };
}

export default async function ProjectsPage({ params }: PageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = content[lang];

  return (
    <>
      <ProjectsExplorer
        lang={lang}
        projects={getProjects(lang)}
        intro={
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
              <span className="h-px w-8 bg-[#d00018]" />
              {t.eyebrow}
            </p>

            <h1 className="mt-8 text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
              {t.titleStart}
              <br />
              <span className="text-neutral-500">{t.titleEnd}</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              {t.intro}
            </p>
          </div>
        }
      />

      <Section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                {t.ctaEyebrow}
              </p>

              <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-5xl">
                {t.ctaTitle}
              </h2>
            </div>

            <Link
              href={localePath(lang, "/contact")}
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#b60015]"
            >
              {t.ctaButton}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
