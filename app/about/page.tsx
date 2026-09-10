import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Prisma",
];

const principles = [
  {
    number: "01",
    title: "Comprendre",
    description:
      "Avant de construire, je cherche à comprendre le problème, les utilisateurs et l'objectif réel du projet.",
  },
  {
    number: "02",
    title: "Concevoir",
    description:
      "Je transforme les besoins identifiés en interfaces claires, cohérentes et agréables à utiliser.",
  },
  {
    number: "03",
    title: "Développer",
    description:
      "Je construis des solutions modernes, performantes et pensées pour pouvoir évoluer dans le temps.",
  },
];

export default function AboutPage() {
  return (
    <div className="overflow-hidden">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative border-b border-[#1f1f1f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d00018]/10 blur-[140px]"
        />

        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40">
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-[#d00018]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                À propos
              </p>
            </div>

            <h1 className="mt-10 max-w-6xl text-balance text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              La personne
              <br />
              <span className="text-neutral-500">
                derrière les projets.
              </span>
            </h1>

            <p className="mt-12 max-w-2xl text-pretty text-lg leading-8 text-neutral-400 sm:text-xl">
              Je suis Andriamahandry Hasiniavo, créateur digital et
              développeur web. Je conçois des produits et expériences
              digitales avec une attention particulière portée à la
              simplicité, au design et à la performance.
            </p>
          </div>
        </Container>
      </section>

      {/* =====================================================
          PROFILE
      ===================================================== */}

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-24">
            {/* PHOTO */}

            <div>
              <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a] lg:mx-0">
                <Image
                  src="/about/profile.jpeg"
                  alt="Andriamahandry Hasiniavo"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 450px"
                />

                <div className="absolute inset-0 border border-white/5" />

                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full border border-white/15 bg-black/60 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                    Digital creator
                  </span>
                </div>
              </div>
            </div>

            {/* INTRODUCTION */}

            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Mon approche
              </p>

              <h2 className="mt-6 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                Créer avec intention,
                <span className="text-neutral-500">
                  {" "}
                  pas simplement avec de la technologie.
                </span>
              </h2>

              <div className="mt-8 max-w-2xl space-y-6 text-base leading-8 text-neutral-500">
                <p>
                  Pour moi, un bon produit digital ne se résume pas à son
                  apparence ou à la technologie utilisée pour le construire.
                  Il doit avant tout répondre clairement à un besoin.
                </p>

                <p>
                  J'aime partir d'une idée parfois simple ou encore
                  incomplète, la structurer, imaginer son expérience puis
                  la transformer en une solution concrète.
                </p>

                <p>
                  Cette approche se retrouve notamment dans LUMI, un
                  micro-SaaS que je développe pour répondre à des
                  problématiques réelles rencontrées par les restaurateurs.
                </p>
              </div>

              <div className="mt-10">
                <Link
                  href="/projects/lumi"
                  className="group inline-flex items-center gap-3 text-sm font-medium text-white transition-colors duration-300 hover:text-[#d00018]"
                >
                  <span>Découvrir LUMI</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}

      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Ma manière de travailler
              </p>

              <h2 className="mt-6 text-balance text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Trois étapes pour passer
                <span className="text-neutral-500">
                  {" "}
                  de l'idée au produit.
                </span>
              </h2>
            </div>

            <div className="mt-16 grid border-l border-t border-[#1f1f1f] md:grid-cols-3">
              {principles.map((principle) => (
                <article
                  key={principle.number}
                  className="border-b border-r border-[#1f1f1f] p-8 sm:p-10"
                >
                  <span className="text-xs text-[#d00018]">
                    {principle.number}
                  </span>

                  <h3 className="mt-16 text-2xl font-medium">
                    {principle.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-500">
                    {principle.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          SKILLS
      ===================================================== */}

      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Technologies
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Les outils derrière
                <span className="text-neutral-500">
                  {" "}
                  mes projets.
                </span>
              </h2>
            </div>

            <div>
              <p className="max-w-2xl text-base leading-8 text-neutral-500 sm:text-lg">
                J'utilise des technologies modernes pour concevoir des
                expériences rapides, maintenables et adaptées aux besoins
                de chaque projet.
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border border-[#292929] px-5 py-2.5 text-sm text-neutral-400 transition-colors duration-300 hover:border-[#d00018] hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* =====================================================
          LUMI FEATURE
      ===================================================== */}

      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="grid gap-12 py-24 lg:grid-cols-[1fr_0.8fr] lg:items-center lg:py-32">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Projet personnel
              </p>

              <h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
                LUMI
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-neutral-500 sm:text-lg">
                Un micro-SaaS imaginé pour aider les restaurateurs à mieux
                comprendre leur présence digitale, identifier leurs
                opportunités et prendre des décisions plus pertinentes.
              </p>

              <div className="mt-10">
                <Link
                  href="/projects/lumi"
                  className="group inline-flex items-center gap-3 rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
                >
                  <span>Voir l'étude de cas</span>

                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>

            <div className="relative aspect-[16/10] overflow-hidden border border-[#1f1f1f] bg-[#0a0a0a]">
              <Image
                src="/projects/lumi/hero.png"
                alt="Projet LUMI"
                fill
                className="object-cover transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 600px"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* =====================================================
          CTA
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
                Parlons de votre projet
              </p>

              <h2 className="mt-6 text-balance text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Une idée à transformer
                <span className="text-neutral-500">
                  {" "}
                  en réalité ?
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500">
                Découvrez mes services ou contactez-moi pour discuter de
                votre projet.
              </p>

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
                >
                  Découvrir mes services
                </Link>

                <Link
                  href="/projects"
                  className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#d00018] hover:bg-[#190003]"
                >
                  Voir mes projets
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}