/* Single source of truth for business details used in metadata,
   structured data (JSON-LD), sitemap and llms.txt. */

export const SITE = {
  url: "https://ideashapers.org",
  name: "IdeaShapers",
  tagline: "Transform Ideas Into Impact",
  description:
    "IdeaShapers is a Kolkata-based strategy-first creative studio and influencer marketing agency. We build brands, websites and growth campaigns, and run influencer campaigns with a network of 80+ creators across India.",
  email: "info@ideashapers.org",
  phones: ["+91 70771 02829", "+91 75968 10148", "+91 99037 37067"],
  whatsapp: "+919903737067",
  city: "Kolkata",
  region: "West Bengal",
  country: "IN",
  logo: "/logo.png",
  socials: [
    "https://www.instagram.com/idea.shapers",
    "https://www.linkedin.com/company/ideashapers-india",
    "https://www.facebook.com/ideashapers.official",
  ],
};

export const SERVICES = [
  { name: "Brand Strategy", description: "Positioning, messaging, brand audits and voice & tone." },
  { name: "Web & App Development", description: "Conversion-focused websites and apps built with Next.js and React." },
  { name: "Content Creation", description: "Copywriting, art direction, campaign concepts and brand storytelling." },
  { name: "Growth Marketing", description: "Launch strategy, SEO, paid advertising and analytics." },
  { name: "Influencer Marketing", description: "End-to-end influencer campaigns: strategy, creator matchmaking, content production and performance analytics." },
  { name: "Events & Brand Activations", description: "On-ground events, product launches and creator-led activations." },
];

export const abs = (path: string) => new URL(path, SITE.url).toString();

/* Serialise JSON-LD safely for a <script> tag (see Next.js JSON-LD guide). */
export const jsonLd = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");

/* "169k" → 169000, "2.3m" → 2300000, "28 .8k" → 28800 */
export function parseFollowers(s?: string) {
  if (!s) return undefined;
  const m = s.replace(/\s+/g, "").toLowerCase().match(/^([\d.]+)([km]?)$/);
  if (!m) return undefined;
  const n = parseFloat(m[1]) * (m[2] === "m" ? 1e6 : m[2] === "k" ? 1e3 : 1);
  return Number.isFinite(n) ? Math.round(n) : undefined;
}

export function formatFollowers(n: number) {
  return n >= 1e6 ? `${(n / 1e6).toFixed(1).replace(/\.0$/, "")}M` : `${Math.round(n / 1e3)}K`;
}

const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "IdeaShapers — Kolkata creative studio and influencer agency" };

/* Page-level openGraph/twitter replace the layout's (no deep merge), so
   every page builds the full set from here. */
export function socialMeta(title: string, description: string, path: string, type: "website" | "profile" = "website") {
  return {
    openGraph: { type, siteName: SITE.name, locale: "en_IN", url: path, title, description, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image" as const, title, description, images: [OG_IMAGE.url] },
  };
}
