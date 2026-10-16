import type { MetadataRoute } from "next";

import { projects } from "@/data/projects";
import { services } from "@/data/services";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

type Entry = MetadataRoute.Sitemap[number];

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (
    path: string,
    priority: number,
    changeFrequency: Entry["changeFrequency"] = "monthly",
  ): Entry => ({ url: `${siteUrl}${path}`, priority, changeFrequency });

  return [
    page("", 1),
    page("/projects", 0.9),
    ...projects.map((project) => page(`/projects/${project.slug}`, 0.8)),
    page("/services", 0.9),
    ...services.map((service) => page(`/services/${service.slug}`, 0.7)),
    page("/about", 0.8),
    page("/contact", 0.7),
  ];
}
