import type { Metadata } from "next";
import Link from "next/link";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ServiceCard from "@/components/services/ServiceCard";

import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Services",

  description:
    "Découvrez mes services de développement web, conception d'interfaces et création de solutions digitales.",

  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
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
              <span className="h-px w-10 bg-[#d00018]" />

              <p className="text-xs font-medium uppercase tracking-[0.25em] text-neutral-500">
                Services
              </p>
            </div>

            <h1 className="mt-10 max-w-5xl text-balance text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              Construire quelque chose
              <br />
              <span className="text-neutral-500">
                qui a vraiment du sens.
              </span>
            </h1>

            <p className="mt-12 max-w-2xl text-pretty text-lg leading-8 text-neutral-400 sm:text-xl">
              De la conception au développement, je transforme des
              idées et des besoins concrets en expériences digitales
              modernes, utiles et performantes.
            </p>
          </div>
        </Container>
      </section>

      {/* SERVICES */}
      <Section>
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((service) => (
              <ServiceCard
                key={service.slug}
                service={service}
              />
            ))}
          </div>
        </Container>
      </Section>

      {/* PROCESS */}
      <section className="border-y border-[#1f1f1f] bg-[#050505]">
        <Container>
          <div className="py-24 sm:py-32">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Processus
              </p>

              <h2 className="mt-6 text-balance text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Une méthode simple,
                <span className="text-neutral-500">
                  {" "}
                  du premier échange à la livraison.
                </span>
              </h2>
            </div>

            <div className="mt-16 grid border-l border-t border-[#1f1f1f] md:grid-cols-3">
              {[
                {
                  number: "01",
                  title: "Échanger",
                  text: "Comprendre votre besoin, votre contexte et vos objectifs.",
                },
                {
                  number: "02",
                  title: "Concevoir",
                  text: "Structurer la solution et définir une expérience claire.",
                },
                {
                  number: "03",
                  title: "Construire",
                  text: "Développer, tester et mettre en ligne une solution fiable.",
                },
              ].map((step) => (
                <article
                  key={step.number}
                  className="border-b border-r border-[#1f1f1f] p-8 sm:p-10"
                >
                  <span className="text-xs text-[#d00018]">
                    {step.number}
                  </span>

                  <h3 className="mt-16 text-2xl font-medium">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-neutral-500">
                    {step.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
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
                Parlons de ce que vous
                <span className="text-neutral-500">
                  {" "}
                  souhaitez construire.
                </span>
              </h2>

              <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500">
                Décrivez-moi votre projet et nous pourrons
                déterminer ensemble la meilleure façon de le
                concrétiser.
              </p>

              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_35px_rgba(208,0,24,0.18)]"
                >
                  Démarrer un projet
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}