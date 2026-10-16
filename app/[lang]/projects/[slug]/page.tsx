import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import ScrollProgress from "@/components/motion/ScrollProgress";
import CaseStudySections from "@/components/projects/CaseStudySections";
import Testimonials from "@/components/testimonials/Testimonials";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectImage from "@/components/projects/ProjectImage";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import { getProject, getProjects, projects } from "@/data/projects";
import {
  hasLocale,
  languageAlternates,
  localePath,
  ogLocale,
  type Localized,
} from "@/lib/i18n";
import { uiText } from "@/lib/ui-text";

const content: Localized<{
  notFound: string;
  metaSuffix: string;
  back: string;
  visit: string;
  heroAlt: string;
  overview: string;
  overviewTitle: string;
  role: string;
  contribution: string;
  details: string;
  type: string;
  year: string;
  technologies: string;
  galleryEyebrow: string;
  galleryTitle: string;
  galleryText: string;
  screenshot: string;
  moreEyebrow: string;
  moreTitle: string;
  allProjects: string;
  ctaText: string;
  ctaButton: string;
}> = {
  fr: {
    notFound: "Projet introuvable",
    metaSuffix: "Projet",
    back: "Retour aux projets",
    visit: "Visiter le projet",
    heroAlt: "Vue principale du projet",
    overview: "Présentation",
    overviewTitle: "Un projet conçu autour d’un besoin concret.",
    role: "Mon rôle",
    contribution: "Contribution au projet",
    details: "Informations",
    type: "Type de projet",
    year: "Année",
    technologies: "Technologies",
    galleryEyebrow: "Galerie du projet",
    galleryTitle: "Le projet en images.",
    galleryText: "Quelques vues pour découvrir l’interface et les différentes parties du projet.",
    screenshot: "capture",
    moreEyebrow: "Continuer l’exploration",
    moreTitle: "Découvrir d’autres projets.",
    allProjects: "Tous les projets",
    ctaText:
      "Vous avez un projet en tête ? Échangeons sur vos besoins et les solutions digitales que nous pouvons construire.",
    ctaButton: "Discuter d’un projet",
  },
  en: {
    notFound: "Project not found",
    metaSuffix: "Project",
    back: "Back to projects",
    visit: "Visit the project",
    heroAlt: "Main view of the project",
    overview: "Overview",
    overviewTitle: "A project built around a real need.",
    role: "My role",
    contribution: "Contribution",
    details: "Details",
    type: "Project type",
    year: "Year",
    technologies: "Technologies",
    galleryEyebrow: "Project gallery",
    galleryTitle: "The project in pictures.",
    galleryText: "A few views of the interface and the different parts of the project.",
    screenshot: "screenshot",
    moreEyebrow: "Keep exploring",
    moreTitle: "Discover more projects.",
    allProjects: "All projects",
    ctaText:
      "Have a project in mind? Let’s talk about your needs and the digital solutions we can build together.",
    ctaButton: "Discuss a project",
  },
};

interface ProjectPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

// Les langues sont générées par le layout ; ici, un chemin par projet
// (LUMI a sa propre page, app/[lang]/projects/lumi).
export function generateStaticParams() {
  return projects
    .filter((project) => project.slug !== "lumi")
    .map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) return {};
  const project = getProject(lang, slug);

  if (!project) {
    return { title: content[lang].notFound };
  }

  return {
    title: `${project.title} — ${content[lang].metaSuffix}`,
    description: project.description,
    alternates: languageAlternates(lang, `/projects/${project.slug}`),
    openGraph: {
      title: `${project.title} — Portfolio`,
      description: project.description,
      images: [project.image],
      locale: ogLocale[lang],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();

  const project = getProject(lang, slug);
  if (!project) notFound();

  const t = content[lang];
  const labels = uiText[lang].project;
  const href = (path: string) => localePath(lang, path);

  const localizedProjects = getProjects(lang);
  const currentIndex = localizedProjects.findIndex((item) => item.slug === project.slug);
  const previousProject =
    localizedProjects[(currentIndex - 1 + localizedProjects.length) % localizedProjects.length];
  const nextProject = localizedProjects[(currentIndex + 1) % localizedProjects.length];

  return (
    <>
      <ScrollProgress />

      <Section className="pb-12 pt-20 sm:pt-28">
        <Container>
          <Link
            href={href("/projects")}
            className="inline-flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span>
            {t.back}
          </Link>

          <div className="mt-14 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#333] px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-300">
                {project.type === "personal" ? labels.personal : labels.contribution}
              </span>

              <span className="text-xs uppercase tracking-wider text-neutral-500">
                {project.category}
              </span>

              <span className="text-xs text-neutral-600">{project.year}</span>
            </div>

            <h1 className="mt-7 text-5xl font-medium tracking-tight text-white sm:text-7xl lg:text-8xl">
              {project.title}
              <span className="text-[#d00018]">.</span>
            </h1>

            <p className="mt-7 max-w-3xl text-lg leading-8 text-neutral-400 sm:text-xl">
              {project.description}
            </p>

            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
              >
                {t.visit}
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#242424] bg-[#0a0a0a] sm:aspect-[16/9]">
            <ViewTransition name={`project-${project.slug}`} share="morph" default="none">
              <div className="absolute inset-0">
                <ProjectImage
                  src={project.image}
                  alt={`${t.heroAlt} ${project.title}`}
                  title={project.title}
                  lang={lang}
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                />
              </div>
            </ViewTransition>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_320px] lg:gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{t.overview}</p>

              <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
                {t.overviewTitle}
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400">
                {project.description}
              </p>

              <div className="mt-12 border-t border-[#242424] pt-8">
                <h3 className="text-lg font-medium text-white">{t.role}</h3>

                <p className="mt-4 text-sm leading-7 text-neutral-400">{project.role}</p>
              </div>

              <div className="mt-8 border-t border-[#242424] pt-8">
                <h3 className="text-lg font-medium text-white">{t.contribution}</h3>

                <p className="mt-4 text-sm leading-7 text-neutral-400">{project.contribution}</p>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-[#242424] bg-[#0a0a0a] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{t.details}</p>

              <div className="mt-7 border-b border-[#242424] pb-5">
                <p className="text-xs text-neutral-500">{t.type}</p>
                <p className="mt-2 text-sm text-white">
                  {project.type === "personal" ? labels.personal : labels.contributionLong}
                </p>
              </div>

              <div className="border-b border-[#242424] py-5">
                <p className="text-xs text-neutral-500">{t.year}</p>
                <p className="mt-2 text-sm text-white">{project.year}</p>
              </div>

              <div className="pt-5">
                <p className="text-xs text-neutral-500">{t.technologies}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-[#292929] px-3 py-2 text-xs text-neutral-300"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Container>
      </Section>

      <CaseStudySections caseStudy={project.caseStudy} lang={lang} />

      <Testimonials
        lang={lang}
        projectSlug={project.slug}
        title={uiText[lang].testimonials.projectTitle(project.title)}
      />

      <Section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {t.galleryEyebrow}
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              {t.galleryTitle}
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-400">{t.galleryText}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {project.gallery.map((image, index) => (
              <div
                key={image}
                className={`relative overflow-hidden rounded-xl border border-[#242424] bg-[#0a0a0a] ${
                  index === 0 ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/3]"
                }`}
              >
                <ProjectImage
                  src={image}
                  alt={`${project.title} — ${t.screenshot} ${index + 1}`}
                  title={project.title}
                  lang={lang}
                  sizes={
                    index === 0
                      ? "(max-width: 640px) 100vw, 1200px"
                      : "(max-width: 640px) 100vw, 600px"
                  }
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="mb-10 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">{t.moreEyebrow}</p>

              <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl">
                {t.moreTitle}
              </h2>
            </div>

            <Link
              href={href("/projects")}
              className="text-sm text-neutral-400 transition-colors hover:text-[#d00018]"
            >
              {t.allProjects} <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <ProjectNavigation
            lang={lang}
            previousProject={previousProject}
            nextProject={nextProject}
          />

          <div className="mt-16 flex flex-col justify-between gap-6 border-t border-[#242424] pt-10 sm:flex-row sm:items-center">
            <p className="max-w-xl text-sm leading-7 text-neutral-400">{t.ctaText}</p>

            <Link
              href={href("/contact")}
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
            >
              {t.ctaButton}
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
