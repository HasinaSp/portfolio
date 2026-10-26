import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ViewTransition } from "react";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MotionProvider from "@/components/motion/MotionProvider";
import { geistMono, geistSans } from "@/lib/fonts";
import { hasLocale, languageAlternates, locales, ogLocale } from "@/lib/i18n";
import { getSiteUrl } from "@/lib/site-url";
import { uiText } from "@/lib/ui-text";

import "../globals.css";

const siteUrl = getSiteUrl();

type LayoutParams = { params: Promise<{ lang: string }> };

// Seules les langues connues existent ; le reste est une 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutParams): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = uiText[lang].site;

  return {
    metadataBase: new URL(siteUrl),
    title: { default: t.title, template: t.titleTemplate },
    description: t.description,
    keywords: [
      "Andriamahandry Hasiniavo",
      lang === "fr" ? "développeur web" : "web developer",
      lang === "fr" ? "développeur full-stack" : "full-stack developer",
      lang === "fr" ? "créateur digital" : "digital creator",
      "Next.js",
      "TypeScript",
      "SaaS",
      "UI UX",
    ],
    authors: [{ name: t.name }],
    creator: t.name,
    alternates: languageAlternates(lang, "/"),
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
      locale: ogLocale[lang],
      alternateLocale: locales.filter((other) => other !== lang).map((other) => ogLocale[other]),
      siteName: t.name,
      title: t.title,
      description: t.shareDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.shareDescription,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutParams & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  return (
    <html lang={lang}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-white focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-black"
        >
          {uiText[lang].skipLink}
        </a>

        <MotionProvider>
          <div className="flex min-h-screen flex-col">
            <Header lang={lang} />

            <main id="contenu" className="flex-1">
              {/* Fondu enchaîné entre les pages (navigations Next.js). */}
              <ViewTransition default="page-fade">{children}</ViewTransition>
            </main>

            <Footer lang={lang} />
          </div>
        </MotionProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
