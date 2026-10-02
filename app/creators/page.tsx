import type { Metadata } from "next";
import CreatorsDirectory from "./CreatorsDirectory";
import { CREATORS, slugify } from "./creators-data";
import { abs, jsonLd, socialMeta } from "@/lib/site";
import { ROSTER_SUMMARY, creatorPersonJsonLd } from "@/lib/creators-seo";

const description = `Browse IdeaShapers' influencer network: ${ROSTER_SUMMARY} from Kolkata and across India. Book creators for your next campaign.`;

export const metadata: Metadata = {
  title: "Creator Network — Influencers in Kolkata & India",
  description,
  alternates: { canonical: "/creators" },
  ...socialMeta("IdeaShapers Creator Network — Influencers in Kolkata & India", description, "/creators"),
};

const listJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": abs("/creators#page"),
  url: abs("/creators"),
  name: "IdeaShapers Creator Network",
  description,
  isPartOf: { "@id": abs("/#website") },
  about: { "@id": abs("/#organization") },
  mainEntity: {
    "@type": "ItemList",
    name: "IdeaShapers influencer roster",
    numberOfItems: CREATORS.length,
    itemListElement: CREATORS.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: abs(`/creators/${slugify(c.name)}`),
      item: creatorPersonJsonLd(c),
    })),
  },
};

export default function CreatorsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(listJsonLd) }} />
      <CreatorsDirectory />
    </>
  );
}
