import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import type { Locale } from "@/lib/i18n";
import { uiText } from "@/lib/ui-text";
import type { CaseStudy } from "@/types/project";

/*
 * Étude de cas : défi → solution → résultats. Chaque partie n'est affichée
 * que si elle est renseignée dans data/projects.ts.
 */
export default function CaseStudySections({
  caseStudy,
  lang,
}: {
  caseStudy?: CaseStudy;
  lang: Locale;
}) {
  if (!caseStudy) return null;
  const t = uiText[lang].project;

  const { challenge, solution = [], results = [] } = caseStudy;
  if (!challenge && solution.length === 0 && results.length === 0) return null;

  return (
    <Section className="border-t border-[#1f1f1f]">
      <Container>
        <div className="grid gap-20">
          {challenge && (
            <Reveal className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                {t.challenge}
              </p>
              <p className="text-balance text-2xl font-medium leading-snug tracking-[-0.03em] text-white sm:text-3xl lg:text-4xl">
                {challenge}
              </p>
            </Reveal>
          )}

          {solution.length > 0 && (
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                  {t.solution}
                </p>
              </Reveal>
              <RevealGroup as="ul" className="divide-y divide-[#1f1f1f] border-y border-[#1f1f1f]">
                {solution.map((step, index) => (
                  <RevealItem key={step} as="li" className="grid grid-cols-[48px_1fr] gap-4 py-6">
                    <span className="text-xs tabular-nums text-neutral-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-base leading-7 text-neutral-300">{step}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}

          {results.length > 0 && (
            <div className="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
                  {t.results}
                </p>
              </Reveal>
              <RevealGroup as="ul" className="grid gap-px overflow-hidden rounded-2xl border border-[#1f1f1f] bg-[#1f1f1f] sm:grid-cols-2">
                {results.map((result) => (
                  <RevealItem key={result.label} as="li" className="bg-[#050505] p-7">
                    <p className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                      {result.value}
                    </p>
                    <p className="mt-3 text-sm leading-6 text-neutral-500">{result.label}</p>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
