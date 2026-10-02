import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CreatorsDirectory from "../CreatorsDirectory";
import { CREATORS, slugify } from "../creators-data";
import { abs, jsonLd, socialMeta } from "@/lib/site";
import { creatorPersonJsonLd, findCreator } from "@/lib/creators-seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CREATORS.map(c => ({ slug: slugify(c.name) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const c = findCreator(slug);
  if (!c) return {};
  const reach = c.followers ? ` with ${c.followers.replace(/\s+/g, "")} followers` : "";
  const where = c.location ? ` from ${c.location}` : "";
  const title = `${c.name} (@${c.handle}) — Instagram Creator`;
  const description = `${c.name} (@${c.handle}) is an Instagram creator${where}${reach}, part of the IdeaShapers influencer network. Collaborate with ${c.name} on your next brand campaign.`;
  return {
    title,
    description,
    alternates: { canonical: `/creators/${slug}` },
    ...socialMeta(`${title} | IdeaShapers`, description, `/creators/${slug}`, "profile"),
  };
}

export default async function CreatorSlugPage({ params }: Props) {
  const { slug } = await params;
  const c = findCreator(slug);
  if (!c) notFound();

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url: abs(`/creators/${slug}`),
    isPartOf: { "@id": abs("/#website") },
    mainEntity: creatorPersonJsonLd(c),
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: abs("/") },
        { "@type": "ListItem", position: 2, name: "Creators", item: abs("/creators") },
        { "@type": "ListItem", position: 3, name: c.name, item: abs(`/creators/${slug}`) },
      ],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(pageJsonLd) }} />
      <CreatorsDirectory initialSlug={slug} />
    </>
  );
}
