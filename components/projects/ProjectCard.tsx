import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({
  project,
}: ProjectCardProps) {
  return (
    <article className="group">
      <Link
        href={`/projects/${project.slug}`}
        className="block"
        aria-label={`Découvrir le projet ${project.title}`}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#0a0a0a]">
          <Image
            src={project.image}
            alt={`Aperçu du projet ${project.title}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

          <span className="absolute left-5 top-5 rounded-full border border-white/15 bg-black/60 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-white backdrop-blur-md">
            {project.type === "personal"
              ? "Projet personnel"
              : "Contribution"}
          </span>

          <span className="absolute bottom-5 right-5 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition-all duration-300 group-hover:border-[#d00018] group-hover:bg-[#d00018]">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M7 7H17V17"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Link>

      <div className="mt-6">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
            {project.category}
          </p>

          <span className="text-xs tabular-nums text-neutral-600">
            {project.number}
          </span>
        </div>

        <Link href={`/projects/${project.slug}`}>
          <h2 className="mt-3 text-2xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-[#d00018] sm:text-3xl">
            {project.title}
          </h2>
        </Link>

        <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-400">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.slice(0, 4).map((technology) => (
            <span
              key={technology}
              className="rounded-full border border-[#242424] px-3 py-1.5 text-xs text-neutral-400"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
