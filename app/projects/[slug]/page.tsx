
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
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
            <Image
              src={project.image}
              alt={`Vue principale du projet ${project.title}`}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
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
                <Image
                  src={image}
                  alt={`${project.title} — capture ${index + 1}`}
                  fill
                  sizes={
                    index === 0
                      ? "(max-width: 640px) 100vw, 1200px"
                      : "(max-width: 640px) 100vw, 600px"
                  }
                  className="object-cover transition-transform duration-700 hover:scale-[1.02]"
                />
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Projet suivant
              </p>

              <Link
                href={`/projects/${nextProject.slug}`}
                className="group mt-4 inline-flex items-center gap-4"
              >
                <h2 className="text-3xl font-medium tracking-tight text-white transition-colors group-hover:text-[#d00018] sm:text-5xl">
                  {nextProject.title}
                </h2>

                <span className="text-2xl text-neutral-500 transition-transform group-hover:translate-x-2">
                  →
                </span>
              </Link>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-full border border-[#333] px-6 py-3.5 text-sm text-white transition-colors hover:border-[#d00018] hover:bg-[#190003]"
            >
              Discuter d’un projet
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}