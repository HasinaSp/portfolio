import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Button from "@/components/ui/Button";

const features = [
  {
    number: "01",
    title: "Audit Uber Eats & Deliveroo",
    description:
      "Une analyse complète de la présence digitale d'un restaurant afin d'identifier les points forts, les faiblesses et les opportunités d'amélioration.",
  },
  {
    number: "02",
    title: "Analyse du menu",
    description:
      "Analyse de la structure, de la lisibilité et de l'attractivité du menu pour améliorer l'expérience et favoriser la conversion.",
  },
  {
    number: "03",
    title: "Analyse des prix",
    description:
      "Comparaison des prix avec la concurrence locale afin d'identifier les écarts et proposer un positionnement plus pertinent.",
  },
  {
    number: "04",
    title: "Optimisation de la visibilité",
    description:
      "Analyse du positionnement et de la visibilité sur les plateformes de livraison avec des recommandations concrètes.",
  },
  {
    number: "05",
    title: "Analyse des photos",
    description:
      "Évaluation de la lumière, de la netteté, du cadrage, de l'appétence et du potentiel de conversion des photos.",
  },
  {
    number: "06",
    title: "Rapport LUMI™",
    description:
      "Un score global sur 100 accompagné d'un plan d'action clair permettant au restaurateur de savoir exactement quoi améliorer.",
  },
];

const scoreItems = [
  { label: "Photos", score: "22/25" },
  { label: "Menu", score: "18/20" },
  { label: "Prix", score: "13/15" },
  { label: "Visibilité", score: "12/15" },
  { label: "Avis clients", score: "9/15" },
  { label: "Concurrence", score: "10/10" },
];

const technologies = [
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "NestJS",
  "PostgreSQL",
  "Prisma",
];

export default function LumiProjectPage() {
  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative border-b border-[#1f1f1f]">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#d00018]/10 blur-[140px]" />
        </div>

        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40">
            <div className="mb-10 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.2em] text-neutral-500">
              <span>LUMI</span>
              <span className="text-[#d00018]">•</span>
              <span>Micro-SaaS</span>
              <span className="text-neutral-700">/</span>
              <span>2026</span>
            </div>

            <h1 className="max-w-5xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-8xl">
              Révéler le potentiel
              <span className="block text-neutral-500">
                des restaurants.
              </span>
            </h1>

            <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_320px]">
              <p className="max-w-2xl text-lg leading-8 text-neutral-400 sm:text-xl">
                LUMI est un micro-SaaS conçu pour aider les restaurateurs à
                améliorer leur visibilité, leur image et leurs performances
                sur les plateformes de livraison.
              </p>

              <div className="lg:border-l lg:border-[#1f1f1f] lg:pl-8">
                <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Rôle
                </p>
                <p className="mt-3 text-sm text-neutral-300">
                  Conception · UX/UI · Développement
                </p>

                <p className="mt-7 text-xs uppercase tracking-[0.2em] text-neutral-600">
                  Type
                </p>
                <p className="mt-3 text-sm text-neutral-300">
                  SaaS · Product
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap gap-4">
              <Button href="https://lumi-hikari.vercel.app/">
                Voir LUMI
              </Button>

              <Button href="/services" variant="secondary">
                Travailler ensemble
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* PROJECT VISUAL */}
      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="py-16 sm:py-24">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-[#242424] bg-[#0a0a0a]">
              <Image
                src="/projects/lumi/hero.png"
                alt="Interface principale de LUMI"
                fill
                className="object-cover"
                priority
              />
            </div>

            <p className="mt-4 text-xs text-neutral-600">
              Interface principale de LUMI
            </p>
          </div>
        </Container>
      </section>

      {/* CONTEXT */}
      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                Le contexte
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                Transformer les données en décisions.
              </h2>
            </div>

            <div className="max-w-2xl space-y-6 text-base leading-8 text-neutral-400 sm:text-lg">
              <p>
                Pour de nombreux restaurateurs, être présent sur Uber Eats ou
                Deliveroo ne suffit pas. La qualité des photos, les prix, la
                structure du menu, les avis et le positionnement influencent
                directement la perception du restaurant.
              </p>

              <p>
                LUMI a été pensé pour rendre cette analyse plus simple,
                compréhensible et directement exploitable.
              </p>

              <p>
                L'objectif n'est pas simplement de produire des données, mais
                de transformer ces données en recommandations concrètes.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* PRODUCT */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                Le produit
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                Une analyse pensée pour être immédiatement utile.
              </h2>

              <p className="mt-6 text-base leading-7 text-neutral-500 sm:text-lg">
                LUMI rassemble plusieurs dimensions essentielles de la
                performance digitale d'un restaurant dans une expérience
                simple et structurée.
              </p>
            </div>

            <div className="mt-20 grid border-l border-t border-[#1f1f1f] sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <article
                  key={feature.number}
                  className="border-b border-r border-[#1f1f1f] p-8 transition-colors duration-300 hover:bg-[#0a0a0a] sm:p-10"
                >
                  <span className="text-xs text-[#d00018]">
                    {feature.number}
                  </span>

                  <h3 className="mt-12 text-xl font-medium">
                    {feature.title}
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-neutral-500">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* SCORE */}
      <Section>
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                LUMI™ Score
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                Un score simple pour comprendre la situation.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
                Chaque audit produit un score global sur 100 accompagné d'une
                analyse détaillée. Le restaurateur peut ainsi identifier
                rapidement ses priorités.
              </p>

              <div className="mt-10">
                <Link
                  href="https://lumi-hikari.vercel.app/"
                  className="text-sm font-medium text-white transition-colors hover:text-[#d00018]"
                >
                  Découvrir le système LUMI →
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#242424] bg-[#080808] p-8 sm:p-10">
              <div className="flex items-end justify-between border-b border-[#242424] pb-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                    Score LUMI™
                  </p>

                  <div className="mt-3 flex items-baseline">
                    <span className="text-7xl font-semibold tracking-[-0.06em]">
                      84
                    </span>
                    <span className="ml-2 text-neutral-600">/100</span>
                  </div>
                </div>

                <span className="rounded-full border border-[#303030] px-3 py-1 text-xs text-neutral-500">
                  Exemple
                </span>
              </div>

              <div className="mt-8 space-y-5">
                {scoreItems.map((item) => (
                  <div key={item.label}>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-neutral-400">
                        {item.label}
                      </span>
                      <span className="text-neutral-200">
                        {item.score}
                      </span>
                    </div>

                    <div className="mt-2 h-1 overflow-hidden rounded-full bg-[#1c1c1c]">
                      <div
                        className="h-full bg-[#d00018]"
                        style={{
                          width: `${(Number(item.score.split("/")[0]) /
                            Number(item.score.split("/")[1])) *
                            100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* VISUAL ANALYSIS */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="grid gap-12 py-24 lg:grid-cols-[0.7fr_1.3fr] lg:py-32">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                Analyse visuelle
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                Les photos vendent avant les descriptions.
              </h2>

              <p className="mt-6 max-w-md text-base leading-7 text-neutral-500">
                LUMI analyse la lumière, la netteté, le cadrage, l'appétence,
                la cohérence et le potentiel de conversion des photos de plats.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  src: "/projects/lumi/photo-1.png",
                  label: "Analyse produit",
                },
                {
                  src: "/projects/lumi/photo-2.png",
                  label: "Analyse visuelle",
                },
                {
                  src: "/projects/lumi/photo-3.png",
                  label: "Qualité photo",
                },
                {
                  src: "/projects/lumi/photo-4.png",
                  label: "Potentiel de conversion",
                },
              ].map((image) => (
                <div key={image.src}>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-[#242424] bg-[#0a0a0a]">
                    <Image
                      src={image.src}
                      alt={image.label}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>

                  <p className="mt-3 text-xs text-neutral-600">
                    {image.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* METHOD */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
              Méthode
            </p>

            <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
              De l'analyse à l'action.
            </h2>
          </div>

          <div className="mt-16 grid border-l border-t border-[#1f1f1f] md:grid-cols-3">
            {[
              {
                number: "01",
                title: "Audit",
                text: "Analyse de la présence actuelle du restaurant.",
              },
              {
                number: "02",
                title: "Plan d'action",
                text: "Identification des priorités et des opportunités.",
              },
              {
                number: "03",
                title: "Optimisation",
                text: "Mise en place des améliorations recommandées.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="border-b border-r border-[#1f1f1f] p-8 sm:p-10"
              >
                <span className="text-xs text-[#d00018]">
                  {step.number}
                </span>

                <h3 className="mt-16 text-2xl font-medium">
                  {step.title}
                </h3>

                <p className="mt-4 text-sm leading-6 text-neutral-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* BUSINESS MODEL */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                Business model
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                Un modèle pensé pour commencer simplement.
              </h2>

              <p className="mt-6 text-base leading-7 text-neutral-500 sm:text-lg">
                LUMI propose une entrée gratuite, une analyse approfondie et
                un accompagnement récurrent pour les restaurants souhaitant
                améliorer continuellement leur présence digitale.
              </p>
            </div>

            <div className="mt-16 grid gap-4 lg:grid-cols-3">
              {[
                {
                  label: "Audit découverte",
                  price: "Gratuit",
                  description:
                    "Une première analyse pour identifier les principales opportunités.",
                },
                {
                  label: "Audit complet",
                  price: "80 €",
                  description:
                    "Une analyse approfondie avec recommandations détaillées et rapport professionnel.",
                  featured: true,
                },
                {
                  label: "Accompagnement",
                  price: "200 €/mois",
                  description:
                    "Un suivi continu avec optimisation, analyse concurrentielle et reporting.",
                },
              ].map((offer) => (
                <article
                  key={offer.label}
                  className={`rounded-2xl border p-8 sm:p-10 ${
                    offer.featured
                      ? "border-[#d00018]/50 bg-[#190003]"
                      : "border-[#242424] bg-[#080808]"
                  }`}
                >
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {offer.label}
                  </p>

                  <p className="mt-8 text-4xl font-semibold tracking-tight">
                    {offer.price}
                  </p>

                  <p className="mt-5 text-sm leading-6 text-neutral-500">
                    {offer.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* TECH */}
      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
                Architecture
              </p>

              <h2 className="mt-5 text-3xl font-semibold tracking-tight sm:text-5xl">
                Une base technique pensée pour évoluer.
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500 sm:text-lg">
                L'architecture de LUMI sépare clairement l'interface,
                la logique métier et la persistance des données afin de
                permettre au produit d'évoluer vers une véritable plateforme
                SaaS.
              </p>
            </div>

            <div>
              <div className="flex flex-wrap gap-3">
                {technologies.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-[#292929] px-4 py-2 text-sm text-neutral-400"
                  >
                    {technology}
                  </span>
                ))}
              </div>

              <div className="mt-10 border-t border-[#1f1f1f] pt-8">
                <p className="text-sm leading-7 text-neutral-500">
                  Le frontend repose sur Next.js et TypeScript. Le backend
                  NestJS est prévu pour centraliser la logique métier, les
                  API et les traitements liés aux audits. PostgreSQL et Prisma
                  assurent la gestion et l'accès aux données.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FINAL CTA */}
      <section className="border-t border-[#1f1f1f]">
        <Container>
          <div className="py-24 text-center sm:py-32">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#d00018]">
              Projet suivant
            </p>

            <h2 className="mx-auto mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
              Construire des produits qui ont une vraie utilité.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-neutral-500">
              LUMI est un exemple de produit conçu autour d'un problème réel,
              avec une expérience simple et une architecture capable
              d'évoluer.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <Button href="https://lumi-hikari.vercel.app/">
                Voir le projet
              </Button>

              <Button href="/projects" variant="secondary">
                Tous les projets
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}