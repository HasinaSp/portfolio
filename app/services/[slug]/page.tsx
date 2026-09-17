import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";

import { services } from "@/data/services";

interface ServicePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    return {};
  }

  return {
    title: service.title,

    description: service.description,

    alternates: {
      canonical: `/services/${service.slug}`,
    },

    openGraph: {
      title: `${service.title} — Andriamahandry Hasiniavo`,
      description: service.description,
      url: `/services/${service.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: ServicePageProps) {
  const { slug } = await params;

  const service = services.find(
    (item) => item.slug === slug
  );

  if (!service) {
    notFound();
  }

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <section className="relative border-b border-[#1f1f1f]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d00018]/10 blur-[140px]"
        />

        <Container>
          <div className="relative py-24 sm:py-32 lg:py-40">
            <div className="flex items-center gap-4">
              <span className="text-xs text-[#d00018]">
                {service.number}
              </span>

              <span className="h-px w-8 bg-[#d00018]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                Service
              </p>
            </div>

            <h1 className="mt-10 max-w-5xl text-balance text-[clamp(3.5rem,8vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              {service.title}
            </h1>

            <p className="mt-10 max-w-2xl text-pretty text-lg leading-8 text-neutral-400 sm:text-xl">
              {service.description}
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
              >
                Démarrer un projet
              </Link>

              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:border-[#d00018] hover:bg-[#190003]"
              >
                Tous les services
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* INTRO */}
      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                La prestation
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Une solution pensée
                <span className="text-neutral-500">
                  {" "}
                  pour votre projet.
                </span>
              </h2>
            </div>

            <div>
              <p className="text-base leading-8 text-neutral-500 sm:text-lg">
                Chaque projet commence par la compréhension du
                besoin. L'objectif est de construire une solution
                claire, cohérente et adaptée à votre contexte.
              </p>

              <p className="mt-6 text-base leading-8 text-neutral-500 sm:text-lg">
                La prestation est ensuite structurée autour des
                fonctionnalités et livrables réellement nécessaires
                à votre projet.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* FEATURES */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Ce qui est inclus
              </p>

              <h2 className="mt-6 text-balance text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Les éléments essentiels
                <span className="text-neutral-500">
                  {" "}
                  du projet.
                </span>
              </h2>
            </div>

            <div className="mt-16 grid border-l border-t border-[#1f1f1f] md:grid-cols-2">
              {service.features.map((feature, index) => (
                <article
                  key={feature}
                  className="border-b border-r border-[#1f1f1f] p-8 sm:p-10"
                >
                  <span className="text-xs text-[#d00018]">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="mt-12 text-xl font-medium sm:text-2xl">
                    {feature}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <Section>
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
              Processus
            </p>

            <h2 className="mt-6 text-balance text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
              Comment le projet
              <span className="text-neutral-500">
                {" "}
                se déroule.
              </span>
            </h2>
          </div>

          <div className="mt-16 space-y-0 border-t border-[#1f1f1f]">
            {[
              {
                number: "01",
                title: "Échange",
                text: "Nous échangeons sur votre projet, vos objectifs et vos besoins.",
              },
              {
                number: "02",
                title: "Cadrage",
                text: "Nous définissons le périmètre, les fonctionnalités et les livrables.",
              },
              {
                number: "03",
                title: "Conception",
                text: "La solution est structurée avant le développement ou la production.",
              },
              {
                number: "04",
                title: "Réalisation",
                text: "Le projet est développé, testé puis préparé pour sa mise en ligne.",
              },
            ].map((step) => (
              <div
                key={step.number}
                className="grid gap-6 border-b border-[#1f1f1f] py-8 sm:grid-cols-[80px_220px_1fr] sm:items-center sm:py-10"
              >
                <span className="text-xs text-[#d00018]">
                  {step.number}
                </span>

                <h3 className="text-xl font-medium">
                  {step.title}
                </h3>

                <p className="max-w-xl text-sm leading-7 text-neutral-500">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* PRICE */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="grid gap-12 py-24 lg:grid-cols-[1fr_0.7fr] lg:items-center lg:py-32">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Tarif
              </p>

              <h2 className="mt-6 text-4xl font-medium tracking-[-0.045em] sm:text-6xl">
                {service.priceLabel}
              </h2>

              <p className="mt-6 max-w-xl text-base leading-8 text-neutral-500">
                Chaque projet possède ses propres contraintes et
                objectifs. Contactez-moi afin de définir précisément
                le périmètre de votre projet et obtenir une
                proposition adaptée.
              </p>
            </div>

            <div className="border border-[#292929] p-8 sm:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-600">
                {service.title}
              </p>

              <p className="mt-8 text-2xl font-medium">
                {service.priceLabel}
              </p>

              <div className="mt-8 border-t border-[#1f1f1f] pt-8">
                <ul className="space-y-4">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-neutral-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-[#d00018]" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href="/contact"
                className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015]"
              >
                Demander cette prestation
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* FINAL CTA */}
      <Section>
        <Container>
          <div className="text-center">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
              Prêt à commencer ?
            </p>

            <h2 className="mx-auto mt-6 max-w-4xl text-balance text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-6xl">
              Parlons de votre
              <span className="text-neutral-500">
                {" "}
                projet.
              </span>
            </h2>

            <Link
              href="/contact"
              className="mt-10 inline-flex items-center justify-center rounded-full bg-[#d00018] px-8 py-4 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
            >
              Démarrer un projet
            </Link>
          </div>
        </Container>
      </Section>
    </div>
  );
}