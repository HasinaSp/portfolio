import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Andriamahandry Hasiniavo — Développeur & Créateur digital",
    template: "%s — Andriamahandry Hasiniavo",
  },

  description:
    "Portfolio d'Andriamahandry Hasiniavo. Développeur web et créateur digital spécialisé dans la conception de produits, interfaces et solutions digitales modernes.",

  keywords: [
    "Andriamahandry Hasiniavo",
    "développeur web",
    "développeur full-stack",
    "créateur digital",
    "Next.js",
    "TypeScript",
    "NestJS",
    "SaaS",
    "UI UX",
    "portfolio développeur",
  ],

  authors: [
    {
      name: "Andriamahandry Hasiniavo",
    },
  ],

  creator: "Andriamahandry Hasiniavo",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Andriamahandry Hasiniavo",
    title: "Andriamahandry Hasiniavo — Développeur & Créateur digital",
    description:
      "Portfolio, projets et services digitaux d'Andriamahandry Hasiniavo.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Andriamahandry Hasiniavo — Développeur & Créateur digital",
    description:
      "Portfolio, projets et services digitaux d'Andriamahandry Hasiniavo.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
      >
        <div className="flex min-h-screen flex-col">
          <Header />

          <main className="flex-1">
            {children}
          </main>

          <Footer />
        </div>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}