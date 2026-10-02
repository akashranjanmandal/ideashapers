import type { MetadataRoute } from "next";
import { SITE, abs } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search engines and AI assistants (GPTBot, ClaudeBot, PerplexityBot,
    // Google-Extended, …) are all welcome; only the API is off limits.
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: abs("/sitemap.xml"),
    host: SITE.url,
  };
}
