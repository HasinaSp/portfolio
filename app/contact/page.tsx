import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",

  description:
    "Contactez Andriamahandry Hasiniavo pour discuter d'un projet digital.",

  alternates: {
    canonical: "/contact",
  },

  openGraph: {
    title: "Contact — Andriamahandry Hasiniavo",
    description:
      "Discutons de votre prochain projet digital.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="w-full max-w-3xl">
        <p className="text-xs uppercase tracking-[0.25em] text-[#d00018]">
          Contact
        </p>

        <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-6xl">
          Parlons de votre projet.
        </h1>

        <p className="mt-6 max-w-xl text-base leading-7 text-neutral-500">
          Une idée, un projet ou un besoin particulier ?
          Je serai ravi d'en discuter avec vous.
        </p>
      </div>
    </main>
  );
}