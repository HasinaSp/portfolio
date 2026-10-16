import Link from "next/link";
import { lang as rootLang } from "next/root-params";

import Container from "@/components/ui/Container";
import { hasLocale, localePath, type Localized } from "@/lib/i18n";

const text: Localized<{ eyebrow: string; title: string; body: string; home: string; projects: string }> = {
  fr: {
    eyebrow: "Erreur 404",
    title: "Cette page n’existe pas.",
    body: "Le lien est peut-être erroné, ou la page a été déplacée.",
    home: "Retour à l’accueil",
    projects: "Voir les projets",
  },
  en: {
    eyebrow: "Error 404",
    title: "This page doesn’t exist.",
    body: "The link may be wrong, or the page may have moved.",
    home: "Back to home",
    projects: "View projects",
  },
};

// 404 dans la langue de l'URL (lue depuis le segment racine [lang]).
export default async function NotFound() {
  const value = await rootLang();
  const lang = hasLocale(value) ? value : "fr";
  const t = text[lang];

  return (
    <Container>
      <div className="flex min-h-[60vh] flex-col justify-center py-24">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-[#d00018]">{t.eyebrow}</p>
        <h1 className="mt-6 text-balance text-5xl font-semibold tracking-[-0.05em] sm:text-7xl">
          {t.title}
        </h1>
        <p className="mt-6 max-w-xl text-base leading-8 text-neutral-400">{t.body}</p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href={localePath(lang, "/")}
            className="inline-flex items-center justify-center rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
          >
            {t.home}
          </Link>
          <Link
            href={localePath(lang, "/projects")}
            className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-[#d00018]"
          >
            {t.projects}
          </Link>
        </div>
      </div>
    </Container>
  );
}
