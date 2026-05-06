import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      priority: 1.0,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE.url}/about`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
    {
      url: `${SITE.url}/what-i-build`,
      priority: 0.8,
      changeFrequency: "monthly",
    },
  ];
}
