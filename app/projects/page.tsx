import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectsExplorer from "@/components/projects/ProjectsExplorer";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projets",
  description:
    "Sélection de produits digitaux, de sites web et de projets professionnels conçus ou développés par Andriamahandry Hasiniavo.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <ProjectsExplorer
        projects={projects}
        intro={
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
              <span className="h-px w-8 bg-[#d00018]" />
              Portfolio sélectionné
            </p>

            <h1 className="mt-8 text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Des idées.
              <br />
              <span className="text-neutral-500">Des projets concrets.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              Une sélection de produits digitaux, de sites web
              et de projets professionnels auxquels j’ai contribué.
              Chaque projet répond à un besoin et poursuit un objectif
              précis.
            </p>
          </div>
        }
      />

      <Section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                Une idée en tête ?
              </p>

              <h2 className="mt-5 max-w-2xl text-3xl font-medium tracking-tight text-white sm:text-5xl">
                Construisons quelque chose d’utile.
              </h2>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#b60015]"
            >
              Discutons de votre projet
            </Link>
          </div>
        </Container>
      </Section>
    </>
  );
}
