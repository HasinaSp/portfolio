/*
 * Langues du site. Le français est servi à la racine (/projects), l'anglais
 * sous /en (/en/projects) ; proxy.ts réécrit les URL françaises vers
 * app/[lang] avec lang = "fr".
 */

export const locales = ["fr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

// Valeur traduite dans chaque langue.
export type Localized<T> = Record<Locale, T>;

export function hasLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Chemin public d'une page dans une langue : localePath("en", "/projects") → "/en/projects".
export function localePath(lang: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === defaultLocale) return clean;
  return clean === "/" ? `/${lang}` : `/${lang}${clean}`;
}

// Langue et chemin sans préfixe d'une URL publique : "/en/projects" → { en, "/projects" }.
export function splitLocale(pathname: string): { lang: Locale; path: string } {
  const [, first, ...rest] = pathname.split("/");
  if (first && first !== defaultLocale && hasLocale(first)) {
    return { lang: first, path: `/${rest.join("/")}` };
  }
  return { lang: defaultLocale, path: pathname || "/" };
}

// Balises canonical et hreflang d'une page (métadonnées Next.js).
export function languageAlternates(lang: Locale, path: string) {
  return {
    canonical: localePath(lang, path),
    languages: {
      fr: localePath("fr", path),
      en: localePath("en", path),
      "x-default": localePath(defaultLocale, path),
    },
  };
}

// Anglais britannique, cohérent avec l'orthographe des textes (optimisation, organised…).
export const ogLocale: Localized<string> = { fr: "fr_FR", en: "en_GB" };
export const intlLocale: Localized<string> = { fr: "fr-FR", en: "en-GB" };
