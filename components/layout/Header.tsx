"use client";

import Link from "next/link";
import { useState } from "react";
import Container from "@/components/ui/Container";

const navigation = [
  {
    label: "Accueil",
    href: "/",
  },
  {
    label: "Projets",
    href: "/projects",
  },
  {
    label: "Services",
    href: "/services",
  },
  {
    label: "À propos",
    href: "/about",
  },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#1f1f1f] bg-black/85 backdrop-blur-xl">
      <Container>
        <div className="flex h-20 items-center justify-between">
          {/* ==================================================
              LOGO
              ================================================== */}

          <Link
            href="/"
            onClick={closeMenu}
            className="group relative z-50 flex items-center gap-3"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-[#d00018] transition-transform duration-300 group-hover:scale-125" />

            <span className="text-sm font-semibold uppercase tracking-[0.18em]">
              Portfolio
            </span>
          </Link>

          {/* ==================================================
              DESKTOP NAVIGATION
              ================================================== */}

          <nav className="hidden items-center gap-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative py-2 text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
              >
                {item.label}

                <span className="absolute bottom-0 left-0 h-px w-0 bg-[#d00018] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* ==================================================
              DESKTOP CTA
              ================================================== */}

          <Link
            href="/services"
            className="hidden rounded-full bg-[#d00018] px-5 py-2.5 text-sm font-medium text-white transition-all duration-300 hover:bg-[#b60015] hover:shadow-[0_0_30px_rgba(208,0,24,0.15)] sm:inline-flex"
          >
            Travailler ensemble
          </Link>

          {/* ==================================================
              MOBILE MENU BUTTON
              ================================================== */}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isOpen}
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-[#242424] md:hidden"
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-px w-5 bg-white transition-all duration-300 ${
                  isOpen
                    ? "top-2 rotate-45"
                    : ""
                }`}
              />

              <span
                className={`absolute left-0 top-2 h-px w-5 bg-white transition-all duration-300 ${
                  isOpen
                    ? "opacity-0"
                    : "opacity-100"
                }`}
              />

              <span
                className={`absolute left-0 top-4 h-px w-5 bg-white transition-all duration-300 ${
                  isOpen
                    ? "top-2 -rotate-45"
                    : ""
                }`}
              />
            </span>
          </button>
        </div>

        {/* ==================================================
            MOBILE NAVIGATION
            ================================================== */}

        <div
          className={`overflow-hidden transition-all duration-500 md:hidden ${
            isOpen
              ? "max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <nav className="border-t border-[#1f1f1f] py-8">
            <div className="flex flex-col">
              {navigation.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between border-b border-[#1f1f1f] py-5 text-lg font-medium transition-colors duration-300 hover:text-[#d00018]"
                >
                  <span>{item.label}</span>

                  <span className="text-sm text-neutral-600">
                    0{index + 1}
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/services"
              onClick={closeMenu}
              className="mt-8 flex items-center justify-center rounded-full bg-[#d00018] px-6 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:bg-[#b60015]"
            >
              Travailler ensemble
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}