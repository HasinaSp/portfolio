import Link from "next/link";
import Container from "@/components/ui/Container";

export default function Footer() {
  return (
    <footer className="border-t border-[#1f1f1f]">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-3"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-[#d00018]" />

              <span className="text-sm font-semibold uppercase tracking-[0.18em]">
                Andriamahandry Hasiniavo
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-neutral-500">
              Création de solutions digitales modernes,
              élégantes et pensées pour répondre à des besoins
              réels.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Navigation
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/projects"
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                Projets
              </Link>

              <Link
                href="/services"
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                Services
              </Link>

              <Link
                href="/about"
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                À propos
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Contact
            </p>

            <div className="mt-5 flex flex-col gap-3">
              <Link
                href="/services"
                className="text-sm text-neutral-400 transition-colors hover:text-[#d00018]"
              >
                Démarrer un projet
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-[#1f1f1f] py-8 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Andriamahandry Hasiniavo. Tous droits
            réservés.
          </p>

          <p>
            Conçu & développé avec Next.js.
          </p>
        </div>
      </Container>
    </footer>
  );
}