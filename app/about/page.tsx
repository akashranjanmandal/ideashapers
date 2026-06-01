"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis] as const;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.75s ease ${delay}s, transform 0.75s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const VALUES = [
  { num: "01", title: "Strategy First", body: "Every pixel we place has a reason behind it. We start with your business goals and work backwards to the design." },
  { num: "02", title: "Radical Honesty", body: "We'll tell you what you need to hear, not what sounds nice. That's how we build things that actually work." },
  { num: "03", title: "Obsessive Craft", body: "We care about the 1px detail, the micro-animation, the copy that makes someone feel something. All of it matters." },
  { num: "04", title: "Founders First", body: "We work exclusively with founders and creators because we understand the stakes. This isn't just a website — it's your livelihood." },
];

export default function AboutPage() {
  return (
    <main>

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          background: "linear-gradient(160deg, #0d4455 0%, #082830 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 30% 60%, rgba(201,150,58,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, #0b3540 0%, transparent 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 3rem 5rem", maxWidth: 860 }}>
          <Reveal>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", fontWeight: 600 }}>
              02 / About Us
            </p>
            <h1 className="script" style={{ fontSize: "clamp(3rem,7vw,7rem)", color: "#ffffff", lineHeight: 1.05, marginBottom: "1.5rem" }}>
              We Shape Ideas.
            </h1>
            <p style={{ fontSize: "1.05rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, maxWidth: 480 }}>
              For founders who refuse to be invisible.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Mission — 2 col ── */}
      <section style={{ background: "#0b3540", padding: "6rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "start" }}>
          <Reveal>
            <blockquote className="script" style={{ fontSize: "clamp(1.6rem,2.5vw,2.4rem)", color: "#ffffff", lineHeight: 1.4 }}>
              "IdeaShapers exists because great ideas deserve to be seen. The gap between a founder's vision and their audience's understanding is almost always a design problem."
            </blockquote>
          </Reveal>
          <Reveal delay={0.15}>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
              We're a boutique studio working at the intersection of strategy, design, and technology. We partner with founders, creators, and innovators who have something real to say — and help them say it in a way the world can't ignore.
            </p>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8 }}>
              Our process is thorough, our standards are high, and our commitment to your project is total. We take on a limited number of clients each month to ensure every project gets our full attention.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Values — 2×2 grid ── */}
      <section style={{ background: "#0d4455", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", padding: "5rem 3rem 0" }}>
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>What We Stand For</p>
            <h2 className="script" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#ffffff", marginBottom: "3rem" }}>Our Values</h2>
          </Reveal>
        </div>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          {VALUES.map((v, i) => (
            <Reveal key={v.num} delay={i * 0.08}>
              <div style={{
                padding: "3rem",
                borderBottom: "1px solid rgba(255,255,255,0.12)",
                borderRight: i % 2 === 0 ? "1px solid rgba(255,255,255,0.12)" : "none",
              }}>
                <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.15em", color: "var(--gold)", display: "block", marginBottom: "1rem" }}>{v.num}</span>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.04em", color: "#ffffff", marginBottom: "1rem" }}>{v.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Process ── */}
      <section style={{ background: "#0b3540", padding: "5rem 3rem", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto" }}>
          <Reveal>
            <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>Process</p>
            <h2 className="script" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#ffffff", marginBottom: "3rem" }}>The IdeaShapers Way</h2>
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { step: "Discovery", duration: "Week 1", desc: "A deep-dive into your brand, goals, audience, and competitive landscape. We leave this knowing exactly what story needs to be told." },
              { step: "Strategy", duration: "Week 1–2", desc: "Sitemap, information architecture, messaging framework, and conversion strategy. The blueprint for everything that follows." },
              { step: "Design", duration: "Week 2–4", desc: "Visual design that captures your brand's full weight. We design desktop and mobile simultaneously, iterating until exactly right." },
              { step: "Development", duration: "Week 4–6", desc: "Clean, fast, accessible code built in Next.js. Animated, optimised, and ready for launch." },
              { step: "Launch + Support", duration: "Post-launch", desc: "We don't disappear at handoff. 30 days of post-launch support to make sure everything runs perfectly." },
            ].map((p, i) => (
              <Reveal key={p.step} delay={i * 0.06}>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "60px 1fr 120px 2fr",
                  gap: "2rem",
                  padding: "2rem 0",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                  alignItems: "center",
                }}>
                  <span style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.1em", color: "var(--gold)" }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 400, color: "#ffffff" }}>{p.step}</h3>
                  <span style={{
                    fontSize: "0.6rem", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase",
                    color: "rgba(255,255,255,0.55)", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)",
                    padding: "0.3rem 0.75rem", borderRadius: 999, whiteSpace: "nowrap",
                  }}>{p.duration}</span>
                  <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#0d4455", padding: "6rem 3rem", textAlign: "center", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <Reveal>
          <h2 className="script" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#ffffff", marginBottom: "1.5rem" }}>
            Ready to shape your idea?
          </h2>
          <Link href="/contact" className="btn-primary">Let's Talk →</Link>
        </Reveal>
      </section>

    </main>
  );
}
