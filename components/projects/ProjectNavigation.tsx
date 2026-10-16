import Link from "next/link";

import ProjectImage from "@/components/projects/ProjectImage";
import { localePath, type Locale } from "@/lib/i18n";
import { uiText } from "@/lib/ui-text";
import type { Project } from "@/types/project";

interface ProjectNavigationProps {
  previousProject: Project;
  nextProject: Project;
  lang: Locale;
}

export default function ProjectNavigation({
  previousProject,
  nextProject,
  lang,
}: ProjectNavigationProps) {
  const t = uiText[lang].project;

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {[previousProject, nextProject].map((project, index) => (
        <Link
          key={project.slug}
          href={localePath(lang, `/projects/${project.slug}`)}
          className="group relative overflow-hidden rounded-2xl border border-[#242424] bg-[#0a0a0a] p-5 transition-colors duration-300 hover:border-[#d00018]/60 sm:p-7"
        >
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs uppercase tracking-[0.18em] text-neutral-500">
              {index === 0 ? t.previous : t.next}
            </span>

            <span className="text-lg text-neutral-500 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d00018]">
              {index === 0 ? "↗" : "→"}
            </span>
          </div>

          <div className="relative mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-[#111]">
            <ProjectImage
              src={project.image}
              alt={`${t.previewAlt} ${project.title}`}
              title={project.title}
              lang={lang}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <p className="mt-5 text-xs uppercase tracking-[0.15em] text-neutral-500">
            {project.category}
          </p>

          <h3 className="mt-2 text-2xl font-medium tracking-tight text-white transition-colors duration-300 group-hover:text-[#d00018]">
            {project.title}
          </h3>
        </Link>
      ))}
    </div>
  );
}
