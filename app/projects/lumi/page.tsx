import Link from "next/link";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const technologies = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "NestJS",
  "PostgreSQL",
  "Prisma",
];

const features = [
  {
    number: "01",
    title: "Audit digital",
    description:
      "Analyser la présence digitale d'un restaurant et identifier les principales opportunités d'amélioration.",
  },
  {
    number: "02",
    title: "Optimisation du menu",
    description:
      "Aider les restaurateurs à améliorer la présentation, la structure et le positionnement de leurs menus.",
  },
  {
    number: "03",
    title: "Analyse concurrentielle",
    description:
      "Comparer les prix, l'offre et la visibilité afin de mieux comprendre son positionnement.",
  },
  {
    number: "04",
    title: "Rapports professionnels",
    description:
      "Transformer les données collectées en recommandations concrètes et facilement exploitables.",
  },
];

export default function LumiProjectPage() {
  return (
    <main>
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-[#1f1f1f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[550px] w-[550px] rounded-full bg-[#d00018]/10 blur-[150px]"
        />

        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40">
            {/* Breadcrumb */}

            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-600 transition-colors hover:text-white"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-1">
                ←
              </span>

              Tous les projets
            </Link>

            {/* Project identity */}

            <div className="mt-16">
              <div className="flex items-center gap-4">
                <span className="h-px w-10 bg-[#d00018]" />

                <span className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                  01 · SaaS · 2026
                </span>
              </div>

              <h1 className="mt-8 text-[clamp(5rem,15vw,12rem)] font-semibold leading-[0.8] tracking-[-0.08em]">
                LUMI
              </h1>

              <p className="mt-10 max-w-2xl text-xl leading-8 text-neutral-400 sm:text-2xl">
                Une plateforme SaaS conçue pour aider les
                restaurateurs à améliorer leur présence digitale,
                optimiser leur activité et prendre de meilleures
                décisions.
              </p>
            </div>

            {/* Meta */}

            <div className="mt-16 grid gap-8 border-t border-[#1f1f1f] pt-8 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                  Type
                </p>

                <p className="mt-2 text-sm text-neutral-300">
                  Produit SaaS
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                  Rôle
                </p>

                <p className="mt-2 text-sm text-neutral-300">
                  Conception · Développement
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-600">
                  Année
                </p>

                <p className="mt-2 text-sm text-neutral-300">
                  2026
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROJECT VISUAL
      ===================================================== */}

      <section>
        <Container>
          <div className="py-16 sm:py-24">
            <div className="relative aspect-[16/9] overflow-hidden border border-[#1f1f1f] bg-[#080808]">
              <div
                aria-hidden="true"
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                  backgroundSize: "60px 60px",
                }}
              />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[clamp(6rem,20vw,18rem)] font-semibold tracking-[-0.08em] text-white/[0.035]">
                  LUMI
                </span>
              </div>

              <div className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8">
                <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-700">
                  Project preview
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          OVERVIEW
      ===================================================== */}

      <Section>
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                01 · Le projet
              </p>
            </div>

            <div>
              <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                Simplifier l'analyse digitale
                <span className="text-neutral-500">
                  {" "}
                  pour les restaurateurs.
                </span>
              </h2>

              <div className="mt-8 space-y-6 text-base leading-8 text-neutral-500">
                <p>
                  Les restaurateurs disposent de nombreuses
                  informations sur leur activité digitale, mais
                  celles-ci sont souvent dispersées et difficiles à
                  interpréter.
                </p>

                <p>
                  LUMI a été imaginé comme un outil permettant de
                  centraliser ces informations, d'identifier les
                  points faibles et de transformer l'analyse en
                  recommandations concrètes.
                </p>

                <p>
                  L'objectif est de rendre une analyse normalement
                  complexe plus simple, plus visuelle et surtout
                  directement exploitable.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          PROBLEM / SOLUTION
      ===================================================== */}

      <section className="border-y border-[#1f1f1f]">
        <Container>
          <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-[#1f1f1f]">
            {/* Problem */}

            <div className="py-20 lg:pr-20 lg:py-28">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Le problème
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                Trop de données.
                <br />
                Pas assez de clarté.
              </h2>

              <p className="mt-8 text-base leading-8 text-neutral-500">
                Comprendre son positionnement digital demande du
                temps, des comparaisons et une capacité à interpréter
                plusieurs indicateurs différents.
              </p>
            </div>

            {/* Solution */}

            <div className="border-t border-[#1f1f1f] py-20 lg:border-t-0 lg:pl-20 lg:py-28">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                La solution
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                Transformer les données
                <br />
                en décisions.
              </h2>

              <p className="mt-8 text-base leading-8 text-neutral-500">
                LUMI structure les informations importantes et les
                transforme en scores, observations et recommandations
                permettant au restaurateur de savoir précisément
                quelles actions prioriser.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          FEATURES
      ===================================================== */}

      <Section>
        <Container>
          <div>
            <div className="flex items-center gap-4">
              <span className="h-px w-8 bg-[#d00018]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                Fonctionnalités
              </p>
            </div>

            <h2 className="mt-6 max-w-3xl text-balance text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
              Une plateforme pensée autour
              <span className="text-neutral-500">
                {" "}
                des besoins réels.
              </span>
            </h2>
          </div>

          <div className="mt-16 grid border-y border-[#1f1f1f] md:grid-cols-2">
            {features.map((feature, index) => (
              <div
                key={feature.number}
                className={`p-8 sm:p-10 ${
                  index % 2 === 0
                    ? "md:border-r md:border-[#1f1f1f]"
                    : ""
                } ${
                  index >= 2
                    ? "border-t border-[#1f1f1f]"
                    : ""
                }`}
              >
                <span className="text-xs text-neutral-600">
                  {feature.number}
                </span>

                <h3 className="mt-8 text-xl font-medium sm:text-2xl">
                  {feature.title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-7 text-neutral-500">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* =====================================================
          TECHNOLOGY
      ===================================================== */}

      <section className="border-y border-[#1f1f1f]">
        <Container>
          <div className="grid gap-12 py-24 sm:py-32 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Architecture
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                Une base technique
                <br />
                pensée pour évoluer.
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-8 text-neutral-500">
                LUMI est conçu avec une architecture moderne
                permettant de faire évoluer progressivement le produit,
                du MVP vers une plateforme SaaS complète.
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[#292929] px-4 py-2 text-xs text-neutral-400"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-12 border-t border-[#1f1f1f] pt-8">
                <p className="text-sm leading-7 text-neutral-600">
                  L'architecture backend sera développée autour de
                  NestJS afin de disposer d'une API structurée,
                  maintenable et adaptée aux futures fonctionnalités
                  métier de LUMI.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          NEXT PROJECT
      ===================================================== */}

      <section>
        <Container>
          <div className="py-24 sm:py-32">
            <div className="flex flex-col gap-8 border-t border-[#1f1f1f] pt-12 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Projet suivant
                </p>

                <p className="mt-3 text-2xl font-medium">
                  D'autres réalisations arrivent.
                </p>
              </div>

              <Link
                href="/projects"
                className="group inline-flex items-center gap-3 text-sm text-neutral-500 transition-colors hover:text-white"
              >
                Tous les projets

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}