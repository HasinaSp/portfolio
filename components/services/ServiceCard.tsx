import Link from "next/link";

import type { Service } from "@/data/services";

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article className="group relative flex h-full flex-col border border-[#1f1f1f] bg-[#050505] p-8 transition-all duration-500 hover:border-[#333333] sm:p-10">
      {service.popular && (
        <span className="absolute right-6 top-6 rounded-full border border-[#d00018]/40 bg-[#190003] px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-[#d00018]">
          Populaire
        </span>
      )}

      <div className="flex items-start justify-between">
        <span className="text-xs text-[#d00018]">
          {service.number}
        </span>

        <span className="text-xs text-neutral-600">
          Service
        </span>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-medium tracking-[-0.03em] sm:text-3xl">
          {service.title}
        </h2>

        <p className="mt-4 max-w-md text-sm leading-7 text-neutral-500">
          {service.shortDescription}
        </p>
      </div>

      <div className="mt-8 border-t border-[#1f1f1f] pt-8">
        <p className="text-xs uppercase tracking-[0.15em] text-neutral-600">
          Inclus
        </p>

        <ul className="mt-5 space-y-3">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm text-neutral-400"
            >
              <span className="h-1 w-1 rounded-full bg-[#d00018]" />
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto pt-10">
        <div className="flex items-end justify-between gap-6 border-t border-[#1f1f1f] pt-6">
          <div>
            <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-600">
              Tarif
            </p>

            <p className="mt-2 text-lg font-medium">
              {service.priceLabel}
            </p>
          </div>

          <Link
            href={`/services/${service.slug}`}
            className="group/link inline-flex items-center gap-2 text-sm font-medium text-white transition-colors duration-300 hover:text-[#d00018]"
          >
            <span>Découvrir</span>

            <span className="transition-transform duration-300 group-hover/link:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </article>
  );
}