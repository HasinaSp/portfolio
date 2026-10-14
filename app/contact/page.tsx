import type { Metadata } from "next";

import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import ContactForm from "@/components/contact/ContactForm";
import { contact } from "@/lib/contact";

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
            {/* Informations */}
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">
                Démarrer
              </p>

              <h2 className="mt-6 text-3xl font-medium tracking-[-0.04em] sm:text-5xl">
                Construisons quelque chose
                <span className="text-neutral-500"> d'utile.</span>
              </h2>

              <p className="mt-8 max-w-md text-base leading-8 text-neutral-500">
                Quelques informations suffisent pour commencer.
                Choisissez le moyen de contact qui vous convient
                ou décrivez directement votre projet dans le formulaire.
              </p>

              {/* Coordonnées */}
              <div className="mt-12 border-t border-[#1f1f1f]">
                {/* Email */}
                <a
                  href={`mailto:${contact.email.address}?subject=${encodeURIComponent(contact.email.subject)}`}
                  className="group flex items-center justify-between gap-4 border-b border-[#1f1f1f] py-5"
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#252525] text-neutral-400 transition-colors group-hover:border-[#d00018]/50 group-hover:text-[#d00018]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        aria-hidden="true"
                      >
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="m3 7 9 6 9-6" />
                      </svg>
                    </span>

                    <span className="flex min-w-0 flex-col gap-1.5">
                      <span className="text-sm font-medium text-white">
                        E-mail
                      </span>
                      <span className="break-all text-sm text-neutral-500 transition-colors group-hover:text-neutral-300">
                        {contact.email.address}
                      </span>
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-neutral-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#d00018]"
                  >
                    ↗
                  </span>
                </a>

                {/* WhatsApp */}
                <a
                  href={contact.whatsapp.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Me contacter sur WhatsApp (nouvel onglet)"
                  className="group flex items-center justify-between gap-4 border-b border-[#1f1f1f] py-5"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#252525] text-[#25D366] transition-colors group-hover:border-[#25D366]/50 group-hover:bg-[#25D366]/5">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.52 3.48A11.87 11.87 0 0 0 12.07 0C5.48 0 .12 5.36.12 11.95c0 2.11.55 4.17 1.6 5.99L0 24l6.22-1.63a11.94 11.94 0 0 0 5.85 1.49h.01c6.59 0 11.95-5.36 11.95-11.95a11.87 11.87 0 0 0-3.51-8.43ZM12.08 21.85h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.97.98-3.6-.23-.37a9.88 9.88 0 0 1-1.52-5.31c0-5.45 4.43-9.88 9.89-9.88a9.81 9.81 0 0 1 6.99 2.9 9.81 9.81 0 0 1 2.89 6.99c0 5.45-4.43 9.89-9.9 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                      </svg>
                    </span>

                    <span className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-white">
                        WhatsApp
                      </span>
                      <span className="text-sm text-neutral-500 transition-colors group-hover:text-neutral-300">
                        +261 34 13 00 895
                      </span>
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-neutral-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#25D366]"
                  >
                    ↗
                  </span>
                </a>

                {/* LinkedIn */}
                <a
                  href={contact.linkedin.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Voir mon profil LinkedIn (nouvel onglet)"
                  className="group flex items-center justify-between gap-4 border-b border-[#1f1f1f] py-5"
                >
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#252525] text-neutral-400 transition-colors group-hover:border-[#0A66C2]/50 group-hover:text-[#0A66C2]">
                      <svg
                        viewBox="0 0 24 24"
                        className="h-5 w-5"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.5H4.98V9h2.95v9.5ZM6.45 7.7a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19 18.5h-2.94v-4.62c0-1.1-.02-2.52-1.54-2.52-1.55 0-1.79 1.2-1.79 2.44v4.7H9.8V9h2.82v1.3h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.56 1.95 3.56 4.49v5.23Z" />
                      </svg>
                    </span>

                    <span className="flex flex-col gap-1.5">
                      <span className="text-sm font-medium text-white">
                        LinkedIn
                      </span>
                      <span className="text-sm text-neutral-500 transition-colors group-hover:text-neutral-300">
                        Profil professionnel
                      </span>
                    </span>
                  </div>

                  <span
                    aria-hidden="true"
                    className="shrink-0 text-neutral-600 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#0A66C2]"
                  >
                    ↗
                  </span>
                </a>
              </div>

              {/* Délai de réponse */}
              <div className="mt-8 flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#d00018]"
                />
                <p className="text-sm leading-6 text-neutral-500">
                  <span className="text-neutral-300">
                    Délai de réponse estimé :
                  </span>{" "}
                  généralement sous 24 à 48 heures.
                </p>
              </div>
            </div>

            {/* Formulaire */}
            <div className="relative border border-[#1f1f1f] bg-[#050505] p-6 sm:p-10 lg:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-0 top-0 h-px w-24 bg-[#d00018]"
              />

              <div className="mb-8">
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Votre projet
                </p>

                <h3 className="mt-3 text-2xl font-medium tracking-[-0.04em] text-white sm:text-3xl">
                  Parlez-moi de votre idée.
                </h3>

                <p className="mt-3 text-sm leading-6 text-neutral-500">
                  Remplissez le formulaire ci-dessous. Les informations
                  fournies me permettront de mieux comprendre votre demande.
                </p>
              </div>

              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}