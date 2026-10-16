"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import Container from "@/components/ui/Container";
import { localePath, locales, splitLocale, type Locale } from "@/lib/i18n";
import { uiText } from "@/lib/ui-text";

const PRIVATE_PREFIXES = ["/admin", "/login"];

export default function Header({ lang }: { lang: Locale }) {
  const pathname = usePathname();
  const t = uiText[lang].nav;
  // Le menu est ouvert pour une page donnée : il se referme de lui-même
  // quand la page change, sans effet ni rendu supplémentaire.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const isOpen = openOn === pathname;

  const closeMenu = () => setOpenOn(null);

  const { path: currentPath } = splitLocale(pathname);
  const isPrivate = PRIVATE_PREFIXES.some(
    (prefix) => currentPath === prefix || currentPath.startsWith(`${prefix}/`),
  );

  const navigation = [
    { label: t.home, path: "/" },
    { label: t.projects, path: "/projects" },
    { label: t.services, path: "/services" },
    { label: t.about, path: "/about" },
  ];

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  // Même page dans l'autre langue (masqué dans l'espace privé, en français seulement).
  const otherLang = locales.find((locale) => locale !== lang) as Locale;
  const languageSwitch = isPrivate ? null : (
    <Link
      href={localePath(otherLang, currentPath)}
      hrefLang={otherLang}
      lang={otherLang}
      aria-label={t.switchTo}
      title={t.switchTo}
      className="inline-flex h-10 items-center justify-center rounded-full border border-[#242424] px-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-neutral-300 transition-colors hover:border-[#d00018] hover:text-white"
    >
      {otherLang}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-black/85 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between gap-4">
          {/* LOGO */}
          <Link
            href={localePath(lang, "/")}
            onClick={closeMenu}
            aria-label={t.homeLabel}
            className="group relative z-50 inline-flex items-center gap-3"
          >
            <span
              aria-hidden="true"
              className="h-2.5 w-2.5 rounded-full bg-[#d00018] transition-transform duration-300 group-hover:scale-125"
            />

            <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
              HASINIAVO<span className="text-[#d00018]">.</span>
            </span>
          </Link>

          {/* NAVIGATION DESKTOP */}
          <nav aria-label={t.main} className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => {
              const active = isActive(item.path);

              return (
                <Link
                  key={item.path}
                  href={localePath(lang, item.path)}
                  aria-current={active ? "page" : undefined}
                  className={`group relative py-2 text-sm transition-colors duration-300 ${
                    active ? "text-white" : "text-neutral-400 hover:text-white"
                  }`}
                >
                  {item.label}

                  <span
                    className={`absolute bottom-0 left-0 h-px bg-[#d00018] transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="relative z-50 flex items-center gap-3">
            {languageSwitch}

            {/* CTA DESKTOP */}
            <Link
              href={localePath(lang, "/contact")}
              className="hidden items-center gap-2 rounded-full bg-[#d00018] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_30px_rgba(208,0,24,0.15)] sm:inline-flex"
            >
              {t.cta}
              <span aria-hidden="true">↗</span>
            </Link>

            {/* BOUTON MOBILE */}
            <button
              type="button"
              onClick={() => setOpenOn(isOpen ? null : pathname)}
              aria-label={isOpen ? t.closeMenu : t.openMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#242424] transition-colors hover:border-[#d00018] md:hidden"
            >
              <span aria-hidden="true" className="relative block h-4 w-5">
                <span
                  className={`absolute left-0 h-px w-5 bg-white transition-all duration-300 ${
                    isOpen ? "top-2 rotate-45" : "top-0"
                  }`}
                />

                <span
                  className={`absolute left-0 top-2 h-px w-5 bg-white transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />

                <span
                  className={`absolute left-0 h-px w-5 bg-white transition-all duration-300 ${
                    isOpen ? "top-2 -rotate-45" : "top-4"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {/* NAVIGATION MOBILE */}
        <div
          id="mobile-navigation"
          aria-hidden={!isOpen}
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out md:hidden ${
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0"
          }`}
        >
          <nav aria-label={t.mobile} className="min-h-0 overflow-hidden" inert={!isOpen}>
            <div className="border-t border-[#1f1f1f] py-6">
              {navigation.map((item, index) => {
                const active = isActive(item.path);

                return (
                  <Link
                    key={item.path}
                    href={localePath(lang, item.path)}
                    onClick={closeMenu}
                    aria-current={active ? "page" : undefined}
                    tabIndex={isOpen ? 0 : -1}
                    className={`flex items-center justify-between border-b border-[#1f1f1f] py-4 text-base font-medium transition-colors duration-300 ${
                      active ? "text-white" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      {active && (
                        <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#d00018]" />
                      )}
                      {item.label}
                    </span>

                    <span className="text-xs text-neutral-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                );
              })}

              <Link
                href={localePath(lang, "/contact")}
                onClick={closeMenu}
                tabIndex={isOpen ? 0 : -1}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
              >
                {t.cta}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </nav>
        </div>
      </Container>
    </header>
  );
}
