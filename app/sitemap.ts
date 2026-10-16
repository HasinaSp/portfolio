import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { services } from "@/data/services";
import { localePath, locales } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type Entry = MetadataRoute.Sitemap[number];

/*
 * Chaque page existe en français (racine) et en anglais (/en) : une entrée
 * par langue, avec les versions alternatives (hreflang) pour Google.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number, Entry["changeFrequency"]][] = [
    ["/", 1, "monthly"],
    ["/projects", 0.9, "monthly"],
    ...projects.map((project): [string, number, Entry["changeFrequency"]] => [
      `/projects/${project.slug}`,
      0.8,
      "monthly",
    ]),
    ["/services", 0.9, "monthly"],
    ...services.map((service): [string, number, Entry["changeFrequency"]] => [
      `/services/${service.slug}`,
      0.7,
      "monthly",
    ]),
    ["/about", 0.8, "monthly"],
    ["/contact", 0.7, "monthly"],
  ];

  return pages.flatMap(([path, priority, changeFrequency]) =>
    locales.map((lang) => ({
      url: `${siteUrl}${localePath(lang, path)}`,
      priority,
      changeFrequency,
      alternates: {
        languages: Object.fromEntries(
          locales.map((other) => [other, `${siteUrl}${localePath(other, path)}`]),
        ),
      },
    })),
  );
}
