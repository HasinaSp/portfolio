import { NextResponse } from "next/server";

import { auth } from "@/auth";
import { defaultLocale, locales } from "@/lib/i18n";

/*
 * 1. Espace admin : vérification rapide (JWT du cookie, sans base) avec
 *    redirection vers /login ; les pages et actions admin refont leur
 *    propre contrôle côté serveur (lib/admin.ts).
 * 2. Langues : les URL sans préfixe sont servies en français par
 *    app/[lang] (réécriture interne, l'URL affichée ne change pas) ;
 *    /en/... est servi tel quel.
 */

const PRIVATE_PATHS = ["/admin", "/login"];

const startsWithSegment = (pathname: string, segment: string) =>
  pathname === segment || pathname.startsWith(`${segment}/`);

export const proxy = auth((request) => {
  const { pathname } = request.nextUrl;

  if (startsWithSegment(pathname, "/admin")) {
    if (request.auth?.user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.nextUrl.origin));
    }
    return;
  }

  if (PRIVATE_PATHS.some((path) => startsWithSegment(pathname, path))) return;

  // Déjà préfixée par une langue (/en/…, ou /fr/… qui reste accessible
  // mais déclare l'URL sans préfixe comme canonique).
  if (locales.some((lang) => startsWithSegment(pathname, `/${lang}`))) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
});

export const config = {
  // Tout sauf l'API, les fichiers internes et les fichiers statiques
  // (robots.txt, sitemap.xml, icon.png, images…).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
