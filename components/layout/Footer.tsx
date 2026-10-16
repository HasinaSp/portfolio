import Link from "next/link";
import Container from "@/components/ui/Container";
import { contact } from "@/lib/contact";
import { localePath, type Locale } from "@/lib/i18n";
import { uiText } from "@/lib/ui-text";

export default function Footer({ lang }: { lang: Locale }) {
  const t = uiText[lang].footer;
  const nav = uiText[lang].nav;
  const href = (path: string) => localePath(lang, path);
  const links = [
    { label: nav.home, path: "/" },
    { label: nav.projects, path: "/projects" },
    { label: nav.services, path: "/services" },
    { label: nav.about, path: "/about" },
    { label: nav.contact, path: "/contact" },
  ];

  return (
    <footer className="border-t border-[#1f1f1f] bg-black">
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link
              href={href("/")}
              aria-label={`Andriamahandry Hasiniavo — ${nav.home}`}
              className="inline-flex items-center gap-3"
            >
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 rounded-full bg-[#d00018]"
              />

              <span className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                Andriamahandry Hasiniavo
              </span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-7 text-neutral-500">
              {t.tagline}
            </p>

            <Link
              href={href("/contact")}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-[#d00018]"
            >
              {t.talk}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav aria-label={nav.footer}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {t.navigation}
            </p>

            <div className="mt-5 flex flex-col items-start gap-4">
              {links.map((link) => (
                <Link
                  key={link.path}
                  href={href(link.path)}
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
              {t.stayInTouch}
            </p>

            <p className="mt-5 max-w-xs text-sm leading-6 text-neutral-500">
              {t.stayInTouchText}
            </p>

            <div className="mt-6 flex flex-col gap-4">
              {/* WhatsApp */}
              <a
                href={contact.whatsapp.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.whatsappLabel}
                className="group inline-flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#252525] text-[#25D366] transition-all group-hover:border-[#25D366]/50 group-hover:bg-[#25D366]/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.52 3.48A11.87 11.87 0 0 0 12.07 0C5.48 0 .12 5.36.12 11.95c0 2.11.55 4.17 1.6 5.99L0 24l6.22-1.63a11.94 11.94 0 0 0 5.85 1.49h.01c6.59 0 11.95-5.36 11.95-11.95a11.87 11.87 0 0 0-3.51-8.43ZM12.08 21.85h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.69.97.98-3.6-.23-.37a9.88 9.88 0 0 1-1.52-5.31c0-5.45 4.43-9.88 9.89-9.88a9.81 9.81 0 0 1 6.99 2.9 9.81 9.81 0 0 1 2.89 6.99c0 5.45-4.43 9.89-9.9 9.89Zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.23-.65.08-.3-.15-1.26-.46-2.4-1.47-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.08-.8.37-.27.3-1.04 1.02-1.04 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35Z" />
                  </svg>
                </span>

                <span className="flex flex-col gap-1">
                  <span className="font-medium">WhatsApp</span>
                  <span className="text-xs text-neutral-500">
                    +261 34 13 00 895
                  </span>
                </span>

                <span className="ml-auto text-neutral-600 transition-colors group-hover:text-[#25D366]">
                  ↗
                </span>
              </a>

              {/* Email */}
              <a
                href={`mailto:${contact.email.address}?subject=${encodeURIComponent(contact.email.subject)}`}
                aria-label={t.emailLabel}
                className="group inline-flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#252525] text-neutral-400 transition-all group-hover:border-[#d00018]/50 group-hover:text-[#d00018]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>

                <span className="flex min-w-0 flex-col gap-1">
                  <span className="font-medium">{t.email}</span>
                  <span className="break-all text-xs text-neutral-500">
                    {contact.email.address}
                  </span>
                </span>

                <span className="ml-auto text-neutral-600 transition-colors group-hover:text-[#d00018]">
                  ↗
                </span>
              </a>

              {/* LinkedIn */}
              <a
                href={contact.linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.linkedinLabel}
                className="group inline-flex items-center gap-3 text-sm text-neutral-300 transition-colors hover:text-white"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#252525] text-neutral-400 transition-all group-hover:border-[#0A66C2]/50 group-hover:text-[#0A66C2]">
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.5H4.98V9h2.95v9.5ZM6.45 7.7a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42ZM19 18.5h-2.94v-4.62c0-1.1-.02-2.52-1.54-2.52-1.55 0-1.79 1.2-1.79 2.44v4.7H9.8V9h2.82v1.3h.04c.39-.74 1.35-1.52 2.78-1.52 2.97 0 3.56 1.95 3.56 4.49v5.23Z" />
                  </svg>
                </span>

                <span className="flex flex-col gap-1">
                  <span className="font-medium">LinkedIn</span>
                  <span className="text-xs text-neutral-500">
                    {t.linkedinDetail}
                  </span>
                </span>

                <span className="ml-auto text-neutral-600 transition-colors group-hover:text-[#0A66C2]">
                  ↗
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-[#1f1f1f] py-8 text-xs text-neutral-600 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Andriamahandry Hasiniavo. {t.rights}
          </p>

          <p>{t.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}