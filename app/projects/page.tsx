import Link from "next/link";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const projects = [
  {
    number: "01",
    title: "LUMI",
    category: "SaaS · Digital",
    year: "2026",
    description:
      "Une plateforme SaaS destinée aux restaurateurs en début de phase pour améliorer leur présence digitale, optimiser leur menu et développer leur activité.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Prisma",
    ],
    href: "/projects/lumi",
    featured: true,
  },
  {
    number: "02",
    title: "Projet à venir",
    category: "Web · Application",
    year: "2026",
    description:
      "Une nouvelle réalisation sera bientôt présentée dans cette sélection.",
    technologies: ["Next.js", "TypeScript"],
    href: "#",
    featured: false,
  },
  {
    number: "03",
    title: "Projet à venir",
    category: "Digital · Web",
    year: "2026",
    description:
      "Une nouvelle expérience digitale sera bientôt disponible.",
    technologies: ["React", "TypeScript"],
    href: "#",
    featured: false,
  },
];

export default function ProjectsPage() {
  return (
    <main>
      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="py-24 sm:py-32 lg:py-40">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d00018]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                Portfolio
              </p>
            </div>

            <h1 className="mt-8 max-w-5xl text-balance text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              Des idées
              <br />
              <span className="text-neutral-500">
                devenues projets.
              </span>
            </h1>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <p className="max-w-xl text-lg leading-8 text-neutral-400">
                Une sélection de projets conçus, développés et
                pensés pour répondre à des problématiques concrètes.
              </p>

              <span className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                {projects.length} projets
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROJECT LIST
      ===================================================== */}

      <section>
        <Container>
          <div className="py-24 sm:py-32">
            <div className="space-y-24">
              {projects.map((project) => (
                <article key={project.number}>
                  <Link
                    href={project.href}
                    className={`group block ${
                      project.href === "#"
                        ? "pointer-events-none"
                        : ""
                    }`}
                  >
                    {/* Project visual */}

                    <div className="relative aspect-[16/9] overflow-hidden border border-[#1f1f1f] bg-[#080808]">
                      {/* Background grid */}

                      <div
                        aria-hidden="true"
                        className="absolute inset-0 opacity-40"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                          backgroundSize: "60px 60px",
                        }}
                      />

                      {/* Project name */}

                      <div className="absolute inset-0 flex items-center justify-center">
                        <span
                          className={`font-semibold tracking-[-0.08em] ${
                            project.featured
                              ? "text-[clamp(5rem,18vw,16rem)]"
                              : "text-[clamp(4rem,12vw,10rem)]"
                          } text-white/[0.035]`}
                        >
                          {project.title}
                        </span>
                      </div>

                      {/* Number */}

                      <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                        <span className="text-xs font-medium text-neutral-600">
                          {project.number}
                        </span>
                      </div>

                      {/* Year */}

                      <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
                        <span className="text-xs text-neutral-600">
                          {project.year}
                        </span>
                      </div>

                      {/* Category */}

                      <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                        <span className="rounded-full border border-[#292929] bg-black/50 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-neutral-400 backdrop-blur-md">
                          {project.category}
                        </span>
                      </div>

                      {/* Arrow */}

                      {project.href !== "#" && (
                        <div className="absolute bottom-6 right-6 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full border border-[#333] bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:border-[#d00018] group-hover:opacity-100 sm:bottom-8 sm:right-8">
                          ↗
                        </div>
                      )}

                      {/* Red edge */}

                      {project.href !== "#" && (
                        <div className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[#d00018] transition-transform duration-700 group-hover:scale-y-100" />
                      )}
                    </div>

                    {/* Project information */}

                    <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto]">
                      <div>
                        <div className="flex items-center gap-4">
                          <h2 className="text-3xl font-medium tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#d00018] sm:text-4xl">
                            {project.title}
                          </h2>

                          {project.featured && (
                            <span className="rounded-full border border-[#3a0007] bg-[#190003] px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-[#d00018]">
                              Featured
                            </span>
                          )}
                        </div>

                        <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-500">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap content-start gap-2 lg:max-w-xs lg:justify-end">
                        {project.technologies.map((technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-[#242424] px-3 py-1.5 text-[10px] uppercase tracking-[0.12em] text-neutral-500"
                          >
                            {technology}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="relative overflow-hidden border border-[#1f1f1f] px-6 py-16 sm:px-12 lg:px-20 lg:py-24">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#d00018]/10 blur-[120px]"
              />

              <div className="relative max-w-3xl">
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                  Un projet ?
                </p>

                <h2 className="mt-6 text-balance text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Votre prochain projet pourrait être
                  <span className="text-neutral-500">
                    {" "}
                    le prochain ici.
                  </span>
                </h2>

                <div className="mt-10">
                  <Link
                    href="/services"
                    className="inline-flex items-center rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
                  >
                    Travailler ensemble
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}