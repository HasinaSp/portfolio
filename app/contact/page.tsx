import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",

  description:
    "Parlons de votre projet digital. Décrivez votre besoin et recevez une réponse adaptée.",

  alternates: {
    canonical: "/contact",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
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
                Contact
              </p>
            </div>

            <h1 className="mt-10 max-w-5xl text-balance text-[clamp(3.5rem,8vw,8rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              Parlons de votre
              <br />
              <span className="text-neutral-500">
                prochain projet.
              </span>
            </h1>

            <p className="mt-12 max-w-2xl text-pretty text-lg leading-8 text-neutral-400 sm:text-xl">
              Une idée, un besoin ou un projet déjà bien défini ?
              Décrivez-moi ce que vous souhaitez construire.
            </p>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <Section>
        <Container>
          <div className="grid gap-16 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Démarrer
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Construisons quelque chose
                <span className="text-neutral-500">
                  {" "}
                  d'utile.
                </span>
              </h2>

              <p className="mt-8 max-w-md text-base leading-8 text-neutral-500">
                Quelques informations suffisent pour commencer.
                Je pourrai ensuite mieux comprendre votre besoin
                et revenir vers vous avec une réponse adaptée.
              </p>

              <div className="mt-12 space-y-6 border-t border-[#1f1f1f] pt-8">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-600">
                    Email
                  </p>

                  <a
                    href="mailto:speyerhasina@gmail.com"
                    className="mt-2 inline-block text-sm text-neutral-300 transition-colors hover:text-[#d00018]"
                  >
                    speyerhasina@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-neutral-600">
                    Réponse
                  </p>

                  <p className="mt-2 text-sm text-neutral-400">
                    Généralement sous 24 à 48 heures.
                  </p>
                </div>
              </div>
            </div>

            <div className="border border-[#1f1f1f] bg-[#050505] p-6 sm:p-10 lg:p-12">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}