
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectImage from "@/components/projects/ProjectImage";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import { projects } from "@/data/projects";

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    return {
      title: "Projet introuvable",
    };
  }

  return {
    title: `${project.title} — Projet`,
    description: project.description,
    openGraph: {
      title: `${project.title} — Portfolio`,
      description: project.description,
      images: [project.image],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find(
    (item) => item.slug === slug
  );

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex(
    (item) => item.slug === project.slug
  );

  const previousProject =
    projects[
        (currentIndex - 1 + projects.length) % projects.length
  ];

  const nextProject =
    projects[(currentIndex + 1) % projects.length];

  return (
    <>
      <Section className="pb-12 pt-20 sm:pt-28">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
          >
            <span aria-hidden="true">←</span>
            Retour aux projets
          </Link>

          <div className="mt-14 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#333] px-3 py-1.5 text-xs uppercase tracking-wider text-neutral-300">
                {project.type === "personal"
                  ? "Projet personnel"
                  : "Contribution"}
              </span>

              <span className="text-xs uppercase tracking-wider text-neutral-500">
                {project.category}
              </span>

              <span className="text-xs text-neutral-600">
                {project.year}
              </span>
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
                Visiter le projet
                <span aria-hidden="true">↗</span>
              </a>
            )}
          </div>
        </Container>
      </Section>

      <Section className="py-8">
        <Container>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-[#242424] bg-[#0a0a0a] sm:aspect-[16/9]">
            <ProjectImage
            src={project.image}
            alt={`Vue principale du projet ${project.title}`}
            title={project.title}
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_320px] lg:gap-20">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Présentation
              </p>

              <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-4xl">
                Un projet conçu autour d’un besoin concret.
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-400">
                {project.description}
              </p>

              <div className="mt-12 border-t border-[#242424] pt-8">
                <h3 className="text-lg font-medium text-white">
                  Mon rôle
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  {project.role}
                </p>
              </div>

              <div className="mt-8 border-t border-[#242424] pt-8">
                <h3 className="text-lg font-medium text-white">
                  Contribution au projet
                </h3>

                <p className="mt-4 text-sm leading-7 text-neutral-400">
                  {project.contribution}
                </p>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-[#242424] bg-[#0a0a0a] p-7">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Informations
              </p>

              <div className="mt-7 border-b border-[#242424] pb-5">
                <p className="text-xs text-neutral-500">
                  Type de projet
                </p>
                <p className="mt-2 text-sm text-white">
                  {project.type === "personal"
                    ? "Projet personnel"
                    : "Contribution professionnelle"}
                </p>
              </div>

              <div className="border-b border-[#242424] py-5">
                <p className="text-xs text-neutral-500">
                  Année
                </p>
                <p className="mt-2 text-sm text-white">
                  {project.year}
                </p>
              </div>

              <div className="pt-5">
                <p className="text-xs text-neutral-500">
                  Technologies
                </p>

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

      <Section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="mb-10 max-w-2xl">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              Galerie du projet
            </p>

            <h2 className="mt-5 text-3xl font-medium tracking-tight text-white sm:text-4xl">
              Le projet en images.
            </h2>

            <p className="mt-4 text-sm leading-7 text-neutral-400">
              Quelques vues pour découvrir l’interface et les
              différentes parties du projet.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {project.gallery.map((image, index) => (
              <div
                key={image}
                className={`relative overflow-hidden rounded-xl border border-[#242424] bg-[#0a0a0a] ${
                  index === 0
                    ? "aspect-[16/10] sm:col-span-2"
                    : "aspect-[4/3]"
                }`}
              >
                <ProjectImage
                src={image}
                alt={`${project.title} — capture ${index + 1}`}
                title={project.title}
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
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
            Continuer l’exploration
            </p>

            <h2 className="mt-4 text-3xl font-medium tracking-tight text-white sm:text-5xl">
            Découvrir d’autres projets.
            </h2>
        </div>

        <Link
            href="/projects"
            className="text-sm text-neutral-400 transition-colors hover:text-[#d00018]"
        >
            Tous les projets <span aria-hidden="true">↗</span>
        </Link>
        </div>

        <ProjectNavigation
        previousProject={previousProject}
        nextProject={nextProject}
        />

        <div className="mt-16 flex flex-col justify-between gap-6 border-t border-[#242424] pt-10 sm:flex-row sm:items-center">
        <p className="max-w-xl text-sm leading-7 text-neutral-400">
            Vous avez un projet en tête ? Échangeons sur vos besoins
            et les solutions digitales que nous pouvons construire.
        </p>

        <Link
            href="/contact"
            className="inline-flex w-fit items-center justify-center rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
        >
            Discuter d’un projet
        </Link>
        </div>
    </Container>
    </Section>
    </>
  );
}