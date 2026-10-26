import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/api/",
        "/login/",
        "/pay/",
        "/en/pay/",
      ],
    },

    sitemap: `${siteUrl}/sitemap.xml`,
  };
}