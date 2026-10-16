"use client";

import { useMemo, useState, type ReactNode } from "react";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ProjectCard from "@/components/projects/ProjectCard";
import type { Project, ProjectType } from "@/types/project";

type ProjectFilter = "all" | ProjectType;

const filters: { label: string; value: ProjectFilter }[] = [
  { label: "Tous les projets", value: "all" },
  { label: "Projets personnels", value: "personal" },
  { label: "Contributions", value: "contribution" },
];

// Filtre et grille des projets : seule partie interactive de /projects.
export default function ProjectsExplorer({
  projects,
  intro,
}: {
  projects: Project[];
  intro: ReactNode;
}) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const filteredProjects = useMemo(
    () =>
      activeFilter === "all"
        ? projects
        : projects.filter((project) => project.type === activeFilter),
    [activeFilter, projects],
  );

  return (
    <>
      <Section className="pb-12 pt-24 sm:pt-32">
        <Container>
          {intro}

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

            <span
              aria-live="polite"
              className="ml-auto self-center text-sm text-neutral-600"
            >
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
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          ) : (
            <p className="py-20 text-center text-neutral-400">
              Aucun projet dans cette catégorie.
            </p>
          )}
        </Container>
      </Section>
    </>
  );
}
