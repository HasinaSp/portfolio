"use client";

import { useMemo, useState } from "react";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/projects/ProjectCard";

import { projects } from "@/data/projects";
import type { ProjectType } from "@/types/project";

type ProjectFilter = "all" | ProjectType;

const filters: {
  label: string;
  value: ProjectFilter;
}[] = [
  { label: "Tous les projets", value: "all" },
  { label: "Projets personnels", value: "personal" },
  { label: "Contributions", value: "contribution" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] =
    useState<ProjectFilter>("all");

  const filteredProjects = useMemo(() => {
    if (activeFilter === "all") {
      return projects;
    }

    return projects.filter(
      (project) => project.type === activeFilter
    );
  }, [activeFilter]);

  return (
    <>
      <Section className="pb-12 pt-24 sm:pt-32">
        <Container>
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.22em] text-neutral-400">
              <span className="h-px w-8 bg-[#d00018]" />
              Portfolio sélectionné
            </p>

            <h1 className="mt-8 text-5xl font-medium leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Des idées.
              <br />
              <span className="text-neutral-500">
                Des projets concrets.
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-400 sm:text-lg">
              Une sélection de produits digitaux, de sites web
              et de projets professionnels auxquels j’ai contribué.
              Chaque projet répond à un besoin et poursuit un objectif
              précis.
            </p>
          </div>

          <div className="mt-14 flex flex-wrap gap-3 border-b border-[#1f1f1f] pb-6">
            {filters.map((filter) => {
              const isActive = activeFilter === filter.value;

              return (
                <button
                  key={filter.value}
                  type="button"
                  onClick={() => setActiveFilter(filter.value)}
                  aria-pressed={isActive}
                  className={`rounded-full border px-5 py-3 text-sm transition-all duration-300 ${
                    isActive
                      ? "border-[#d00018] bg-[#d00018] text-white"
                      : "border-[#292929] text-neutral-400 hover:border-neutral-500 hover:text-white"
                  }`}
                >
                  {filter.label}
                </button>
              );
            })}

            <span className="ml-auto self-center text-sm text-neutral-600">
              {filteredProjects.length} projet
              {filteredProjects.length > 1 ? "s" : ""}
            </span>
          </div>
        </Container>
      </Section>

      <Section className="pt-10">
        <Container>
          {filteredProjects.length > 0 ? (
            <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:gap-x-10 lg:gap-y-20">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                />
              ))}
            </div>
          ) : (
            <p className="py-20 text-center text-neutral-400">
              Aucun projet dans cette catégorie.
            </p>
          )}
        </Container>
      </Section>

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

            <a
              href="/contact"
              className="inline-flex w-fit items-center justify-center rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#b60015]"
            >
              Discutons de votre projet
            </a>
          </div>
        </Container>
      </Section>
    </>
  );
}
