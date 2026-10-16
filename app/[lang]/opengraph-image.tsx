import { ImageResponse } from "next/og";

import { hasLocale, locales, type Localized } from "@/lib/i18n";

// Une image par langue, générée au build.
export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

// Image de partage par défaut (réseaux sociaux, messageries), générée au build.
export const alt = "Andriamahandry Hasiniavo — Web Developer & Digital Creator";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const text: Localized<{ title: string; subtitle: string }> = {
  fr: {
    title: "Je conçois des expériences digitales utiles et durables.",
    subtitle: "Développement web · Création digitale · Produits SaaS",
  },
  en: {
    title: "I design digital experiences that are useful and built to last.",
    subtitle: "Web development · Digital creation · SaaS products",
  },
};

export default async function OpengraphImage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const t = text[hasLocale(lang) ? lang : "fr"];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#000",
          backgroundImage:
            "radial-gradient(circle at 88% 12%, rgba(208,0,24,0.35), transparent 45%)",
          color: "#fff",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: "#d00018" }} />
          <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, fontWeight: 600 }}>
            <span>HASINIAVO</span>
            <span style={{ color: "#d00018" }}>.</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: -3,
              fontWeight: 600,
              maxWidth: 1000,
            }}
          >
            {t.title}
          </div>
          <div style={{ marginTop: 32, fontSize: 28, color: "#a3a3a3" }}>{t.subtitle}</div>
        </div>
      </div>
    ),
    size,
  );
}
