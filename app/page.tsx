import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const projects = [
  {
    number: "01",
    title: "LUMI",
    category: "SaaS · Digital",
    description:
      "Une plateforme pensée pour aider les restaurateurs à améliorer leur présence digitale, optimiser leurs menus et développer leur activité.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma"],
    image: "/projects/lumi.jpg",
    href: "/projects/lumi",
    featured: true,
  },
  {
    number: "02",
    title: "Projet à venir",
    category: "Web · Application",
    description:
      "Un nouveau projet sera bientôt présenté ici.",
    technologies: ["Next.js", "TypeScript"],
    image: "/projects/project-02.jpg",
    href: "/projects/project-02",
    featured: false,
  },
  {
    number: "03",
    title: "Projet à venir",
    category: "Digital · Web",
    description:
      "Une nouvelle réalisation sera bientôt disponible.",
    technologies: ["React", "TypeScript"],
    image: "/projects/project-03.jpg",
    href: "/projects/project-03",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#1f1f1f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d00018]/10 blur-[140px]"
        />

        <Container>
          <div className="relative flex min-h-[calc(100vh-80px)] flex-col justify-center py-24 sm:py-32 lg:py-40">
            <div className="mb-10 flex items-center gap-4">
              <span className="h-px w-10 bg-[#d00018]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                Andriamahandry Hasiniavo · Développement digital
              </p>
            </div>

            <h1 className="max-w-6xl text-balance text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              Créateur digital
              <br />
              <span className="text-neutral-500">
                & développeur web.
              </span>
            </h1>

            <div className="mt-16 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-xl">
                <p className="text-pretty text-lg leading-8 text-neutral-400 sm:text-xl">
                  Je conçois des expériences digitales élégantes,
                  performantes et pensées pour répondre à de vrais
                  besoins.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
                  >
                    Voir mes projets
                  </Link>

                  <Link
                    href="/services"
                    className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#d00018] hover:bg-[#190003]"
                  >
                    Découvrir mes services
                  </Link>
                </div>
              </div>

              <div className="hidden lg:flex lg:flex-col lg:items-center lg:gap-4">
                <span className="text-[10px] font-medium uppercase tracking-[0.3em] text-neutral-600 [writing-mode:vertical-rl]">
                  Scroll
                </span>

                <span className="h-16 w-px bg-gradient-to-b from-[#d00018] to-transparent" />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          INTRO
      ===================================================== */}

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Une approche simple
              </p>
            </div>

            <div>
              <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Transformer une idée en produit
                <span className="text-neutral-500">
                  {" "}
                  clair, utile et mémorable.
                </span>
              </h2>

              <p className="mt-8 max-w-2xl text-base leading-8 text-neutral-500">
                Chaque projet commence par comprendre le besoin,
                puis construire une expérience qui combine design,
                technologie et simplicité.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          PROJECTS
      ===================================================== */}

      <section
        id="projects"
        className="border-y border-[#1f1f1f]"
      >
        <Container>
          <div className="py-24 sm:py-32">
            {/* Section header */}

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <div className="flex items-center gap-4">
                  <span className="h-px w-8 bg-[#d00018]" />

                  <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                    Sélection
                  </p>
                </div>

                <h2 className="mt-6 text-balance text-4xl font-medium tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                  Projets
                  <span className="text-neutral-500">
                    {" "}
                    sélectionnés.
                  </span>
                </h2>
              </div>

              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 text-sm text-neutral-500 transition-colors hover:text-white"
              >
                <span>Voir tous les projets</span>

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>

            {/* Featured project */}

            <div className="mt-20">
              <Link
                href={projects[0].href}
                className="group block"
              >
                {/* Image */}

                <div className="relative aspect-[16/9] overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a]">
                  {/* Placeholder until the real image exists */}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-[clamp(4rem,12vw,10rem)] font-semibold tracking-[-0.08em] text-white/[0.035]">
                        LUMI
                      </span>

                      <p className="mt-2 text-xs uppercase tracking-[0.3em] text-neutral-700">
                        Aperçu du projet
                      </p>
                    </div>
                  </div>

                  {/* Red accent */}

                  <div className="absolute left-0 top-0 h-full w-px origin-top scale-y-0 bg-[#d00018] transition-transform duration-700 group-hover:scale-y-100" />

                  {/* Project number */}

                  <div className="absolute left-6 top-6 sm:left-8 sm:top-8">
                    <span className="text-xs font-medium text-neutral-600">
                      {projects[0].number}
                    </span>
                  </div>

                  {/* Category */}

                  <div className="absolute right-6 top-6 sm:right-8 sm:top-8">
                    <span className="rounded-full border border-[#292929] bg-black/50 px-4 py-2 text-[10px] uppercase tracking-[0.18em] text-neutral-400 backdrop-blur-md">
                      {projects[0].category}
                    </span>
                  </div>

                  {/* Hover arrow */}

                  <div className="absolute bottom-6 right-6 flex h-12 w-12 translate-y-3 items-center justify-center rounded-full border border-[#333] bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:translate-y-0 group-hover:border-[#d00018] group-hover:opacity-100 sm:bottom-8 sm:right-8">
                    ↗
                  </div>
                </div>

                {/* Content */}

                <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_auto]">
                  <div>
                    <h3 className="text-3xl font-medium tracking-[-0.04em] transition-colors duration-300 group-hover:text-[#d00018] sm:text-4xl">
                      {projects[0].title}
                    </h3>

                    <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-500">
                      {projects[0].description}
                    </p>
                  </div>

                  <div className="flex flex-wrap content-start gap-2 lg:max-w-xs lg:justify-end">
                    {projects[0].technologies.map((technology) => (
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
            </div>

            {/* Secondary projects */}

            <div className="mt-24 grid gap-0 border-y border-[#1f1f1f] md:grid-cols-2 md:divide-x md:divide-[#1f1f1f]">
              {projects.slice(1).map((project) => (
                <Link
                  key={project.number}
                  href={project.href}
                  className="group p-6 transition-colors duration-300 hover:bg-white/[0.015] sm:p-8 lg:p-10"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-600">
                      {project.number}
                    </span>

                    <span className="text-neutral-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d00018]">
                      ↗
                    </span>
                  </div>

                  <div className="relative mt-8 aspect-[16/10] overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a]">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-semibold tracking-[-0.05em] text-white/[0.035]">
                        {project.number}
                      </span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#d00018] transition-transform duration-500 group-hover:scale-x-100" />
                  </div>

                  <div className="mt-7">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                      {project.category}
                    </p>

                    <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] transition-colors duration-300 group-hover:text-[#d00018]">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-neutral-500">
                      {project.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          SERVICES
      ===================================================== */}

      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                  Services
                </p>

                <h2 className="mt-4 text-3xl font-medium tracking-[-0.035em] sm:text-4xl">
                  Ce que je construis.
                </h2>
              </div>

              <Link
                href="/services"
                className="text-sm text-neutral-500 transition-colors hover:text-white"
              >
                Voir tous les services →
              </Link>
            </div>

            <div className="mt-16 divide-y divide-[#1f1f1f] border-y border-[#1f1f1f]">
              {[
                {
                  number: "01",
                  title: "Web design",
                  description:
                    "Des interfaces modernes, élégantes et pensées pour offrir une expérience claire.",
                },
                {
                  number: "02",
                  title: "Développement",
                  description:
                    "Des applications web rapides, solides et construites avec des technologies modernes.",
                },
                {
                  number: "03",
                  title: "Solutions digitales",
                  description:
                    "Des outils conçus autour de problématiques concrètes et de vrais objectifs.",
                },
              ].map((service) => (
                <Link
                  key={service.number}
                  href="/services"
                  className="group grid gap-6 py-8 transition-colors duration-300 hover:bg-white/[0.015] sm:grid-cols-[80px_1fr_auto] sm:items-start"
                >
                  <span className="text-xs text-neutral-600">
                    {service.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-medium transition-colors duration-300 group-hover:text-[#d00018] sm:text-2xl">
                      {service.title}
                    </h3>

                    <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-500">
                      {service.description}
                    </p>
                  </div>

                  <span className="text-xl text-neutral-700 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#d00018]">
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <Section>
        <Container>
          <div className="relative overflow-hidden border border-[#1f1f1f] px-6 py-16 sm:px-12 sm:py-20 lg:px-20 lg:py-24">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d00018]/10 blur-[100px]"
            />

            <div className="relative max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Un projet en tête ?
              </p>

              <h2 className="mt-6 text-balance text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Construisons quelque chose
                <span className="text-neutral-500">
                  {" "}
                  qui mérite d'exister.
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
        </Container>
      </Section>
    </>
  );
}