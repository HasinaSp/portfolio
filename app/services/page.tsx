import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",

  description:
    "Découvrez mes services de développement web, conception d'interfaces et création de solutions digitales.",

  alternates: {
    canonical: "/services",
  },

  openGraph: {
    title: "Services — Andriamahandry Hasiniavo",
    description:
      "Développement web, conception digitale et création de solutions adaptées à vos besoins.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <main className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <p className="text-xs uppercase tracking-[0.25em] text-[#d00018]">
          Services
        </p>

        <h1 className="mt-5 text-5xl font-semibold tracking-tight">
          Mes services
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-500">
          Des solutions digitales conçues pour transformer vos idées
          en produits concrets.
        </p>
      </div>
    </main>
  );
}