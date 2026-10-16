import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import ProjectCard from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";
import { contact } from "@/lib/contact";

const featuredProjects = projects.filter((project) => project.featured);

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Andriamahandry Hasiniavo",
  alternateName: "Hasina",
  url: siteUrl,
  image: `${siteUrl}/about/profile.jpeg`,
  jobTitle: "Développeur web & créateur digital",
  sameAs: [contact.linkedin.url],
  knowsAbout: ["Développement web", "Next.js", "TypeScript", "UI/UX design", "SaaS"],
};

const services = [
  {
    number: "01",
    title: "Web design",
    description:
      "Des interfaces soignées, lisibles et pensées pour offrir une expérience utilisateur cohérente.",
  },
  {
    number: "02",
    title: "Développement web",
    description:
      "Des sites et applications web performants, conçus avec des technologies modernes.",
  },
  {
    number: "03",
    title: "Solutions digitales",
    description:
      "Des outils adaptés à des besoins concrets pour transformer une idée en solution utile.",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // Données structurées (Google) : identité et compétences.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d00018]/10 blur-[140px]"
        />

        <Container>
          <div className="relative flex min-h-[calc(100svh-80px)] flex-col justify-center py-24 sm:py-32">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-10 bg-[#d00018]" />
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-neutral-500">
                Développement web · Création digitale
              </p>
            </div>

            <h1 className="max-w-6xl text-balance text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
              Je conçois des expériences digitales
              <span className="text-neutral-500"> utiles et durables.</span>
            </h1>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p className="text-pretty text-base leading-8 text-neutral-400 sm:text-lg">
                  Je suis Andriamahandry Hasiniavo. J’accompagne les idées
                  de leur conception jusqu’à leur réalisation, en associant
                  réflexion, design et développement web.
                </p>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/projects"
                    className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_30px_rgba(208,0,24,0.18)]"
                  >
                    Explorer mes projets <span aria-hidden="true">↗</span>
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:border-[#d00018]"
                  >
                    Discutons de votre projet
                  </Link>
                </div>
              </div>

              <p className="hidden text-right text-xs leading-6 text-neutral-600 lg:block">
                De l’idée<br />
                au produit digital.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* APPROCHE */}
      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="grid gap-8 py-20 sm:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
              Ma philosophie
            </p>

            <div>
              <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                La technologie doit servir une idée,
                <span className="text-neutral-500">
                  {" "}pas la compliquer.
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-500">
                Chaque projet mérite une approche adaptée à ses objectifs :
                comprendre le besoin, définir une direction claire et construire
                une expérience simple à utiliser, solide et évolutive.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* À PROPOS */}
      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-md border border-[#1f1f1f] bg-[#0a0a0a] lg:mx-0">
              <Image
                src="/about/profile.jpeg"
                alt="Portrait d’Andriamahandry Hasiniavo"
                fill
                sizes="(max-width: 1024px) 100vw, 400px"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                  Développement · Création digitale
                </p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                À propos
              </p>

              <h2 className="mt-5 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                Donner forme aux idées et les rendre concrètes.
              </h2>

              <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-neutral-500">
                <p>
                  Je suis Andriamahandry Hasiniavo, créateur digital et
                  développeur web. Je m’intéresse à la conception d’interfaces
                  et au développement de produits qui répondent à de vrais besoins.
                </p>
                <p>
                  Mon objectif : allier réflexion, simplicité et qualité
                  technique pour créer des expériences utiles et cohérentes.
                </p>
              </div>

              <Link
                href="/about"
                className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-[#d00018]"
              >
                En savoir plus sur mon parcours
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* PROJETS */}
      <section id="projects" className="border-b border-[#1f1f1f]">
        <Container>
          <div className="py-20 sm:py-28">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                  Portfolio
                </p>
                <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
                  Projets sélectionnés<span className="text-neutral-500">.</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500">
                  Des projets personnels et des contributions à des produits
                  et plateformes numériques.
                </p>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                Tous les projets <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="py-20 sm:py-28">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                  Expertise
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  Comment je peux vous aider.
                </h2>
              </div>

              <Link
                href="/services"
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                Découvrir les services ↗
              </Link>
            </div>

            <div className="mt-12 divide-y divide-[#1f1f1f] border-y border-[#1f1f1f]">
              {services.map((service) => (
                <Link
                  key={service.number}
                  href="/services"
                  className="group grid gap-4 py-7 transition-colors sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-8"
                >
                  <span className="text-xs text-neutral-600">
                    {service.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-medium transition-colors group-hover:text-[#d00018] sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-500">
                      {service.description}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-xl text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-[#d00018]"
                  >
                    ↗
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="relative overflow-hidden rounded-md border border-[#1f1f1f] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d00018]/10 blur-[100px]"
            />

            <div className="relative max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                Une idée à concrétiser ?
              </p>

              <h2 className="mt-5 text-balance text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Parlons de votre prochain projet.
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-neutral-500">
                Présentez-moi votre besoin et voyons ensemble comment lui
                donner forme.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
                >
                  Demander une collaboration
                  <span aria-hidden="true">↗</span>
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-[#d00018]"
                >
                  Consulter les services
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}