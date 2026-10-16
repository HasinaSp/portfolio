import type { Metadata } from "next";

import Header from "@/components/layout/Header";
import { geistMono, geistSans } from "@/lib/fonts";

import "../globals.css";

/*
 * Layout racine de l'espace privé (connexion et administration), en
 * français uniquement et jamais indexé.
 */
export const metadata: Metadata = {
  title: "Administration — Andriamahandry Hasiniavo",
  robots: { index: false, follow: false },
};

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div className="flex min-h-screen flex-col">
          <Header lang="fr" />
          <main id="contenu" className="flex-1">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
