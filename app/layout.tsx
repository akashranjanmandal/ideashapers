import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Preloader from "@/components/Preloader";
import { SITE, SERVICES, abs, jsonLd } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "IdeaShapers — Branding, Web & Influencer Marketing Agency in Kolkata",
    template: "%s | IdeaShapers",
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "influencer marketing agency Kolkata",
    "influencer agency India",
    "branding agency Kolkata",
    "web design Kolkata",
    "creative studio Kolkata",
    "Bengali influencers",
    "event management Kolkata",
  ],
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    title: "IdeaShapers — Branding, Web & Influencer Marketing Agency in Kolkata",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "IdeaShapers — Branding, Web & Influencer Marketing Agency in Kolkata",
    description: SITE.description,
  },
};

const orgJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": abs("/#organization"),
      name: SITE.name,
      url: SITE.url,
      logo: abs(SITE.logo),
      image: abs("/opengraph-image"),
      description: SITE.description,
      slogan: SITE.tagline,
      email: SITE.email,
      telephone: SITE.phones[0],
      address: {
        "@type": "PostalAddress",
        addressLocality: SITE.city,
        addressRegion: SITE.region,
        addressCountry: SITE.country,
      },
      areaServed: [{ "@type": "City", name: "Kolkata" }, { "@type": "Country", name: "India" }],
      sameAs: SITE.socials,
      contactPoint: SITE.phones.map(telephone => ({
        "@type": "ContactPoint",
        telephone,
        email: SITE.email,
        contactType: "sales",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Bengali"],
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IdeaShapers services",
        itemListElement: SERVICES.map(s => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.description, areaServed: "IN" },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": abs("/#website"),
      url: SITE.url,
      name: SITE.name,
      publisher: { "@id": abs("/#organization") },
      inLanguage: "en-IN",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,700;1,400;1,500;1,700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="noise">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(orgJsonLd) }} />
        <Preloader />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
