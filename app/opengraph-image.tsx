import { ImageResponse } from "next/og";

// Image de partage par défaut (réseaux sociaux, messageries), générée au build.
export const alt = "Andriamahandry Hasiniavo — Développeur & Créateur digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
              maxWidth: 980,
            }}
          >
            Je conçois des expériences digitales utiles et durables.
          </div>
          <div style={{ marginTop: 32, fontSize: 28, color: "#a3a3a3" }}>
            Développement web · Création digitale · Produits SaaS
          </div>
        </div>
      </div>
    ),
    size,
  );
}
