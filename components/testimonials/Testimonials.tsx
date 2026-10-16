import Container from "@/components/ui/Container";
import { RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { testimonials, type Testimonial } from "@/data/testimonials";

/*
 * Témoignages clients. Rien n'est affiché tant que data/testimonials.ts
 * est vide (ou qu'aucun témoignage ne concerne le projet demandé).
 */
export default function Testimonials({
  projectSlug,
  title = "Ce qu’en disent mes clients.",
}: {
  projectSlug?: string;
  title?: string;
}) {
  const items: Testimonial[] = projectSlug
    ? testimonials.filter((testimonial) => testimonial.projectSlug === projectSlug)
    : testimonials;

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="temoignages" className="border-b border-[#1f1f1f]">
      <Container>
        <div className="py-20 sm:py-28">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#d00018]">
            Témoignages
          </p>
          <h2
            id="temoignages"
            className="mt-4 max-w-3xl text-3xl font-medium tracking-[-0.04em] sm:text-4xl lg:text-5xl"
          >
            {title}
          </h2>

          <RevealGroup
            className={`mt-12 grid gap-6 ${items.length > 1 ? "md:grid-cols-2" : ""}`}
            stagger={0.12}
          >
            {items.map((testimonial) => (
              <RevealItem key={`${testimonial.name}-${testimonial.quote.slice(0, 20)}`}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-[#1f1f1f] bg-[#050505] p-7 sm:p-9">
                  <blockquote className="text-lg leading-8 text-neutral-200 sm:text-xl sm:leading-9">
                    <span aria-hidden="true" className="mr-1 text-[#d00018]">
                      “
                    </span>
                    {testimonial.quote}
                    <span aria-hidden="true" className="ml-1 text-[#d00018]">
                      ”
                    </span>
                  </blockquote>
                  <figcaption className="mt-8 border-t border-[#1f1f1f] pt-5 text-sm">
                    <span className="font-medium text-white">{testimonial.name}</span>
                    {(testimonial.role || testimonial.company) && (
                      <span className="block text-neutral-500">
                        {[testimonial.role, testimonial.company].filter(Boolean).join(" · ")}
                      </span>
                    )}
                  </figcaption>
                </figure>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}
