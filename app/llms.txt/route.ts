import { CREATORS, slugify } from "../creators/creators-data";
import { FAQS } from "@/lib/faqs";
import { SERVICES, SITE, abs } from "@/lib/site";
import { ROSTER_SUMMARY } from "@/lib/creators-seo";

export const dynamic = "force-static";

/* llms.txt — plain-language summary for AI assistants (https://llmstxt.org). */
export function GET() {
  const body = `# ${SITE.name}

> ${SITE.description}

${SITE.name} is a strategy-first creative studio and influencer marketing agency based in ${SITE.city}, India. We work with founders, brands and businesses across India on brand strategy, websites and apps, content, growth marketing, influencer campaigns and on-ground events.

## Key facts

- Location: ${SITE.city}, ${SITE.region}, India (serving clients across India)
- Influencer network: ${ROSTER_SUMMARY} — Instagram creators from Kolkata and across India
- Email: ${SITE.email}
- Phone / WhatsApp: ${SITE.phones.join(", ")}
- Website: ${SITE.url}
- Social: ${SITE.socials.join(", ")}

## Services

${SERVICES.map(s => `- **${s.name}**: ${s.description}`).join("\n")}

## Pages

- [Home](${abs("/")}): services, process, team, FAQ and contact form
- [Creator network](${abs("/creators")}): full directory of ${CREATORS.length} creators with Instagram handles and follower counts
- [Privacy Policy](${abs("/privacy-policy")})
- [Terms & Conditions](${abs("/terms-and-conditions")})

## FAQ

${FAQS.map(f => `### ${f.q}\n${f.a}`).join("\n\n")}

## Creator roster

${CREATORS.map(c => `- [${c.name}](${abs(`/creators/${slugify(c.name)}`)}) — @${c.handle}${c.followers ? `, ${c.followers.replace(/\s+/g, "")} followers` : ""}${c.location ? `, ${c.location}` : ""}`).join("\n")}

## Contact

To hire ${SITE.name} or book creators, email ${SITE.email}, WhatsApp ${SITE.phones[2]}, or use the contact form at ${abs("/#contact")}.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
