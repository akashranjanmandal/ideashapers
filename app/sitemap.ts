import type { MetadataRoute } from "next";
import { CREATORS, slugify } from "./creators/creators-data";
import { abs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: abs("/creators"), lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    ...CREATORS.map(c => ({
      url: abs(`/creators/${slugify(c.name)}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: abs("/privacy-policy"), changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/terms-and-conditions"), changeFrequency: "yearly", priority: 0.2 },
    { url: abs("/cookie-policy"), changeFrequency: "yearly", priority: 0.2 },
  ];
}
