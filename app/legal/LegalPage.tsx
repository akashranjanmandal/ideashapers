"use client";
import Link from "next/link";

const P = {
  navy: "#1e2f6e",
  text: "#141414",
  muted: "#6b7280",
  border: "rgba(30,47,110,0.1)",
};

export type LegalSection = {
  heading: string;
  body?: string;
  bullets?: string[];
  afterBullets?: string;
  subsections?: { heading: string; body: string }[];
};

export default function LegalPage({
  title, effectiveDate, lastUpdated, intro, sections,
}: {
  title: string;
  effectiveDate: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
}) {
  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 780, margin: "0 auto", padding: "clamp(1.5rem,4vw,3rem) clamp(1.25rem,5vw,2rem) 6rem" }}>

        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: "0.82rem", fontWeight: 600, color: P.muted,
          textDecoration: "none", marginBottom: "2rem",
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Home
        </Link>

        <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(2rem,5vw,3rem)", fontWeight: 400, color: P.text, marginBottom: "1rem", letterSpacing: "-0.01em" }}>
          {title}
        </h1>

        <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginBottom: "2.5rem", paddingBottom: "1.5rem", borderBottom: `1px solid ${P.border}` }}>
          <p style={{ fontSize: "0.8rem", color: P.muted }}><strong style={{ color: P.text }}>Effective Date:</strong> {effectiveDate}</p>
          <p style={{ fontSize: "0.8rem", color: P.muted }}><strong style={{ color: P.text }}>Last Updated:</strong> {lastUpdated}</p>
        </div>

        {intro && (
          <p style={{ fontSize: "0.95rem", color: P.muted, lineHeight: 1.8, marginBottom: "2.5rem", whiteSpace: "pre-line" }}>{intro}</p>
        )}

        {sections.map((s, i) => (
          <section key={i} style={{ marginBottom: "2.25rem" }}>
            {s.heading && (
              <h2 style={{ fontSize: "1.15rem", fontWeight: 700, color: P.text, marginBottom: "0.85rem", letterSpacing: "-0.01em" }}>
                {s.heading}
              </h2>
            )}
            {s.body && (
              <p style={{ fontSize: "0.92rem", color: P.muted, lineHeight: 1.85, marginBottom: s.bullets || s.subsections ? "0.75rem" : 0, whiteSpace: "pre-line" }}>
                {s.body}
              </p>
            )}
            {s.bullets && (
              <ul style={{ margin: 0, paddingLeft: "1.25rem" }}>
                {s.bullets.map((b, j) => (
                  <li key={j} style={{ fontSize: "0.92rem", color: P.muted, lineHeight: 1.85, marginBottom: "0.3rem" }}>{b}</li>
                ))}
              </ul>
            )}
            {s.afterBullets && (
              <p style={{ fontSize: "0.92rem", color: P.muted, lineHeight: 1.85, marginTop: "0.75rem", whiteSpace: "pre-line" }}>
                {s.afterBullets}
              </p>
            )}
            {s.subsections && s.subsections.map((sub, j) => (
              <div key={j} style={{ marginTop: "1rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: P.text, marginBottom: "0.4rem" }}>{sub.heading}</h3>
                <p style={{ fontSize: "0.92rem", color: P.muted, lineHeight: 1.85 }}>{sub.body}</p>
              </div>
            ))}
          </section>
        ))}

      </div>
    </main>
  );
}
