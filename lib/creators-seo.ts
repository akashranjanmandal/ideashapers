import { CREATORS, slugify, type Creator } from "@/app/creators/creators-data";
import { abs, formatFollowers, parseFollowers } from "@/lib/site";

export const TOTAL_FOLLOWERS = CREATORS.reduce((sum, c) => sum + (parseFollowers(c.followers) ?? 0), 0);

export const ROSTER_SUMMARY = `${CREATORS.length} creators · ${formatFollowers(TOTAL_FOLLOWERS)}+ combined followers`;

export function findCreator(slug: string) {
  return CREATORS.find(c => slugify(c.name) === slug);
}

export function creatorPersonJsonLd(c: Creator) {
  const followers = parseFollowers(c.followers);
  return {
    "@type": "Person",
    "@id": abs(`/creators/${slugify(c.name)}#person`),
    name: c.name,
    alternateName: `@${c.handle}`,
    url: abs(`/creators/${slugify(c.name)}`),
    ...(c.img ? { image: abs(c.img) } : {}),
    sameAs: [c.link],
    ...(c.location ? { homeLocation: { "@type": "Place", name: c.location } } : {}),
    jobTitle: "Content creator",
    memberOf: { "@id": abs("/#organization") },
    ...(followers
      ? {
          interactionStatistic: {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/FollowAction",
            userInteractionCount: followers,
          },
        }
      : {}),
  };
}
