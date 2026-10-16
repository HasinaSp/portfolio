import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import ProjectCard from "@/components/projects/ProjectCard";
import { getProjects } from "@/data/projects";
import { contact } from "@/lib/contact";
import {
  hasLocale,
  languageAlternates,
  localePath,
  type Localized,
} from "@/lib/i18n";
import { uiText } from "@/lib/ui-text";
import Magnetic from "@/components/motion/Magnetic";
import ParallaxMedia from "@/components/motion/ParallaxMedia";
import Marquee from "@/components/motion/Marquee";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";
import AvailabilityBadge from "@/components/ui/AvailabilityBadge";
import Testimonials from "@/components/testimonials/Testimonials";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const content: Localized<{
  eyebrow: string;
  titleStart: string;
  titleEnd: string;
  intro: string;
  primaryCta: string;
  secondaryCta: string;
  tagline: [string, string];
  philosophy: { eyebrow: string; titleStart: string; titleEnd: string; text: string };
  about: {
    portraitAlt: string;
    portraitCaption: string;
    eyebrow: string;
    title: string;
    paragraphs: [string, string];
    link: string;
  };
  projects: { eyebrow: string; title: string; text: string; link: string };
  services: {
    eyebrow: string;
    title: string;
    link: string;
    items: { number: string; title: string; description: string }[];
  };
  contact: { eyebrow: string; title: string; text: string; primary: string; secondary: string };
  jobTitle: string;
  knowsAbout: string;
}> = {
  fr: {
    eyebrow: "Développement web · Création digitale",
    titleStart: "Je conçois des expériences digitales",
    titleEnd: "utiles et durables.",
    intro:
      "Je suis Andriamahandry Hasiniavo. J’accompagne les idées de leur conception jusqu’à leur réalisation, en associant réflexion, design et développement web.",
    primaryCta: "Explorer mes projets",
    secondaryCta: "Discutons de votre projet",
    tagline: ["De l’idée", "au produit digital."],
    philosophy: {
      eyebrow: "Ma philosophie",
      titleStart: "La technologie doit servir une idée,",
      titleEnd: "pas la compliquer.",
      text: "Chaque projet mérite une approche adaptée à ses objectifs : comprendre le besoin, définir une direction claire et construire une expérience simple à utiliser, solide et évolutive.",
    },
    about: {
      portraitAlt: "Portrait d’Andriamahandry Hasiniavo",
      portraitCaption: "Développement · Création digitale",
      eyebrow: "À propos",
      title: "Donner forme aux idées et les rendre concrètes.",
      paragraphs: [
        "Je suis Andriamahandry Hasiniavo, créateur digital et développeur web. Je m’intéresse à la conception d’interfaces et au développement de produits qui répondent à de vrais besoins.",
        "Mon objectif : allier réflexion, simplicité et qualité technique pour créer des expériences utiles et cohérentes.",
      ],
      link: "En savoir plus sur mon parcours",
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Projets sélectionnés",
      text: "Des projets personnels et des contributions à des produits et plateformes numériques.",
      link: "Tous les projets",
    },
    services: {
      eyebrow: "Expertise",
      title: "Comment je peux vous aider.",
      link: "Découvrir les services ↗",
      items: [
        {
          number: "01",
          title: "Web design",
          description:
            "Des interfaces soignées, lisibles et pensées pour offrir une expérience utilisateur cohérente.",
        },
        {
          number: "02",
          title: "Développement web",
          description:
            "Des sites et applications web performants, conçus avec des technologies modernes.",
        },
        {
          number: "03",
          title: "Solutions digitales",
          description:
            "Des outils adaptés à des besoins concrets pour transformer une idée en solution utile.",
        },
      ],
    },
    contact: {
      eyebrow: "Une idée à concrétiser ?",
      title: "Parlons de votre prochain projet.",
      text: "Présentez-moi votre besoin et voyons ensemble comment lui donner forme.",
      primary: "Demander une collaboration",
      secondary: "Consulter les services",
    },
    jobTitle: "Développeur web & créateur digital",
    knowsAbout: "Développement web",
  },
  en: {
    eyebrow: "Web development · Digital creation",
    titleStart: "I design digital experiences that are",
    titleEnd: "useful and built to last.",
    intro:
      "I’m Andriamahandry Hasiniavo. I help ideas go from concept to launch, combining strategic thinking, design and web development.",
    primaryCta: "Explore my projects",
    secondaryCta: "Let’s talk about your project",
    tagline: ["From idea", "to digital product."],
    philosophy: {
      eyebrow: "My philosophy",
      titleStart: "Technology should serve an idea,",
      titleEnd: "not complicate it.",
      text: "Every project deserves an approach shaped by its goals: understanding the need, setting a clear direction and building an experience that is simple to use, robust and ready to evolve.",
    },
    about: {
      portraitAlt: "Portrait of Andriamahandry Hasiniavo",
      portraitCaption: "Development · Digital creation",
      eyebrow: "About",
      title: "Giving shape to ideas and making them real.",
      paragraphs: [
        "I’m Andriamahandry Hasiniavo, a digital creator and web developer. I focus on interface design and on building products that answer real needs.",
        "My goal: combining clear thinking, simplicity and technical quality to create useful, consistent experiences.",
      ],
      link: "More about my background",
    },
    projects: {
      eyebrow: "Portfolio",
      title: "Selected projects",
      text: "Personal projects and contributions to digital products and platforms.",
      link: "All projects",
    },
    services: {
      eyebrow: "Expertise",
      title: "How I can help you.",
      link: "Explore my services ↗",
      items: [
        {
          number: "01",
          title: "Web design",
          description:
            "Polished, readable interfaces designed to deliver a consistent user experience.",
        },
        {
          number: "02",
          title: "Web development",
          description: "Fast, reliable websites and web apps built with modern technologies.",
        },
        {
          number: "03",
          title: "Digital solutions",
          description: "Tools tailored to concrete needs, turning an idea into something useful.",
        },
      ],
    },
    contact: {
      eyebrow: "An idea to bring to life?",
      title: "Let’s talk about your next project.",
      text: "Tell me what you need and let’s shape it together.",
      primary: "Start a collaboration",
      secondary: "View my services",
    },
    jobTitle: "Web developer & digital creator",
    knowsAbout: "Web development",
  },
};

type PageProps = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  return { alternates: languageAlternates(lang, "/") };
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const t = content[lang];
  const href = (path: string) => localePath(lang, path);
  const projects = getProjects(lang);
  const featuredProjects = projects.filter((project) => project.featured);
  // Bandeau défilant : technologies de tous les projets, sans doublon.
  const technologies = [...new Set(projects.flatMap((project) => project.technologies))];

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Andriamahandry Hasiniavo",
    alternateName: "Hasina",
    url: `${siteUrl}${localePath(lang, "/")}`,
    image: `${siteUrl}/about/profile.jpeg`,
    jobTitle: t.jobTitle,
    sameAs: [contact.linkedin.url],
    knowsAbout: [t.knowsAbout, "Next.js", "TypeScript", "UI/UX design", "SaaS"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Données structurées (Google) : identité et compétences.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#1f1f1f]">
        <div
          aria-hidden="true"
          className="glow-breathe pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#d00018]/10 blur-[140px]"
        />

        <Container>
          <div className="relative flex min-h-[calc(100svh-80px)] flex-col justify-center py-24 sm:py-32">
            <div
              className="enter-up mb-10"
              style={{ "--delay": "0s" } as React.CSSProperties}
            >
              <AvailabilityBadge lang={lang} />
            </div>

            <div className="mb-8 flex items-center gap-4">
              <span
                className="draw-x h-px w-10 bg-[#d00018]"
                style={{ "--delay": "0.05s" } as React.CSSProperties}
              />
              <p
                className="enter-up text-xs font-medium uppercase tracking-[0.22em] text-neutral-500"
                style={{ "--delay": "0.15s" } as React.CSSProperties}
              >
                {t.eyebrow}
              </p>
            </div>

            <h1 className="max-w-6xl text-balance text-[clamp(3.2rem,8vw,7.5rem)] font-semibold leading-[0.94] tracking-[-0.055em]">
              <SplitWords
                delay={0.2}
                segments={[
                  { text: t.titleStart },
                  { text: t.titleEnd, className: "text-neutral-500" },
                ]}
              />
            </h1>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
              <div className="max-w-2xl">
                <p
                  className="enter-up text-pretty text-base leading-8 text-neutral-400 sm:text-lg"
                  style={{ "--delay": "0.75s" } as React.CSSProperties}
                >
                  {t.intro}
                </p>

                <div
                  className="enter-up mt-8 flex flex-col gap-3 sm:flex-row"
                  style={{ "--delay": "0.9s" } as React.CSSProperties}
                >
                  <Magnetic className="flex">
                    <Link
                      href={href("/projects")}
                      className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-[background-color,box-shadow] duration-300 hover:bg-[#b60015] hover:shadow-[0_0_30px_rgba(208,0,24,0.18)]"
                    >
                      {t.primaryCta} <span aria-hidden="true">↗</span>
                    </Link>
                  </Magnetic>

                  <Magnetic className="flex">
                    <Link
                      href={href("/contact")}
                      className="inline-flex w-full items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-colors duration-300 hover:border-[#d00018]"
                    >
                      {t.secondaryCta}
                    </Link>
                  </Magnetic>
                </div>
              </div>

              <p
                className="enter-up hidden text-right text-xs leading-6 text-neutral-600 lg:block"
                style={{ "--delay": "1.1s" } as React.CSSProperties}
              >
                {t.tagline[0]}<br />
                {t.tagline[1]}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* TECHNOLOGIES */}
      <section
        aria-label={uiText[lang].technologies}
        className="border-b border-[#1f1f1f] py-7 text-sm uppercase tracking-[0.2em] text-neutral-500 sm:py-9 sm:text-base"
      >
        <Marquee label={uiText[lang].technologies} items={technologies} />
      </section>

      {/* APPROCHE */}
      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="grid gap-8 py-20 sm:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                {t.philosophy.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {t.philosophy.titleStart}
                <span className="text-neutral-500">
                  {" "}{t.philosophy.titleEnd}
                </span>
              </h2>

              <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-500">
                {t.philosophy.text}
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* À PROPOS */}
      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-20">
            <Reveal className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-md border border-[#1f1f1f] bg-[#0a0a0a] lg:mx-0">
              <ParallaxMedia distance={5}>
                <Image
                  src="/about/profile.jpeg"
                  alt={t.about.portraitAlt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
              </ParallaxMedia>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-5 pt-16">
                <p className="text-xs uppercase tracking-[0.18em] text-white/70">
                  {t.about.portraitCaption}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                {t.about.eyebrow}
              </p>

              <h2 className="mt-5 text-balance text-3xl font-medium leading-tight tracking-[-0.04em] sm:text-4xl lg:text-5xl">
                {t.about.title}
              </h2>

              <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-neutral-500">
                {t.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>

              <Link
                href={href("/about")}
                className="group mt-8 inline-flex items-center gap-3 text-sm font-medium text-white transition-colors hover:text-[#d00018]"
              >
                {t.about.link}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PROJETS */}
      <section id="projects" className="border-b border-[#1f1f1f]">
        <Container>
          <div className="py-20 sm:py-28">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                  {t.projects.eyebrow}
                </p>
                <h2 className="mt-4 text-4xl font-medium tracking-[-0.045em] sm:text-5xl">
                  {t.projects.title}<span className="text-neutral-500">.</span>
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-7 text-neutral-500">
                  {t.projects.text}
                </p>
              </div>

              <Link
                href={href("/projects")}
                className="inline-flex items-center gap-3 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {t.projects.link} <span aria-hidden="true">↗</span>
              </Link>
            </div>

            <RevealGroup className="mt-12 grid gap-8 md:grid-cols-2" stagger={0.12}>
              {featuredProjects.map((project) => (
                <RevealItem key={project.slug}>
                  <ProjectCard project={project} lang={lang} />
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* TÉMOIGNAGES (masqués tant que data/testimonials.ts est vide) */}
      <Testimonials lang={lang} />

      {/* SERVICES */}
      <section className="border-b border-[#1f1f1f]">
        <Container>
          <div className="py-20 sm:py-28">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                  {t.services.eyebrow}
                </p>
                <h2 className="mt-4 text-3xl font-medium tracking-[-0.04em] sm:text-4xl">
                  {t.services.title}
                </h2>
              </div>

              <Link
                href={href("/services")}
                className="text-sm text-neutral-400 transition-colors hover:text-white"
              >
                {t.services.link}
              </Link>
            </div>

            <RevealGroup className="mt-12 divide-y divide-[#1f1f1f] border-y border-[#1f1f1f]">
              {t.services.items.map((service) => (
                <RevealItem key={service.number}>
                <Link
                  href={href("/services")}
                  className="group grid gap-4 py-7 transition-colors sm:grid-cols-[64px_1fr_auto] sm:items-center sm:gap-8"
                >
                  <span className="text-xs text-neutral-600">
                    {service.number}
                  </span>

                  <div>
                    <h3 className="text-xl font-medium transition-colors group-hover:text-[#d00018] sm:text-2xl">
                      {service.title}
                    </h3>
                    <p className="mt-2 max-w-2xl text-sm leading-7 text-neutral-500">
                      {service.description}
                    </p>
                  </div>

                  <span
                    aria-hidden="true"
                    className="text-xl text-neutral-600 transition-all group-hover:translate-x-1 group-hover:text-[#d00018]"
                  >
                    ↗
                  </span>
                </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Container>
      </section>

      {/* CONTACT */}
      <section className="py-20 sm:py-28">
        <Container>
          <Reveal className="relative overflow-hidden rounded-md border border-[#1f1f1f] px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
            <div
              aria-hidden="true"
              className="glow-breathe pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-[#d00018]/10 blur-[100px]"
            />

            <div className="relative max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                {t.contact.eyebrow}
              </p>

              <h2 className="mt-5 text-balance text-4xl font-medium leading-tight tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                {t.contact.title}
              </h2>

              <p className="mt-5 max-w-xl text-base leading-8 text-neutral-500">
                {t.contact.text}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Magnetic className="flex">
                  <Link
                    href={href("/contact")}
                    className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#d00018] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#b60015]"
                  >
                    {t.contact.primary}
                    <span aria-hidden="true">↗</span>
                  </Link>
                </Magnetic>

                <Link
                  href={href("/services")}
                  className="inline-flex items-center justify-center rounded-full border border-[#2a2a2a] px-7 py-3.5 text-sm font-medium text-white transition-colors hover:border-[#d00018]"
                >
                  {t.contact.secondary}
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}