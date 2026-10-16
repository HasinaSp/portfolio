"use client";

import Image from "next/image";
import { useState } from "react";

import type { Locale } from "@/lib/i18n";
import { uiText } from "@/lib/ui-text";

interface ProjectImageProps {
  src: string;
  alt: string;
  title: string;
  lang: Locale;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export default function ProjectImage({
  src,
  alt,
  title,
  lang,
  className = "",
  sizes = "100vw",
  priority = false,
}: ProjectImageProps) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {!hasError ? (
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#090909] p-6 sm:p-10">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(208,0,24,0.18),transparent_45%)]"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full border border-[#d00018]/20 sm:h-96 sm:w-96"
          />

          <div
            aria-hidden="true"
            className="absolute -bottom-10 -right-2 h-48 w-48 rounded-full border border-[#d00018]/10 sm:h-72 sm:w-72"
          />

          <div className="relative flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#d00018]" />
            <span className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
              {uiText[lang].project.fallbackEyebrow}
            </span>
          </div>

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">
              {uiText[lang].project.fallbackLabel}
            </p>

            <p className="mt-3 max-w-full break-words text-3xl font-medium tracking-tight text-white sm:text-5xl">
              {title}
              <span className="text-[#d00018]">.</span>
            </p>

            <div className="mt-5 h-px w-16 bg-[#d00018]" />
          </div>
        </div>
      )}
    </div>
  );
}