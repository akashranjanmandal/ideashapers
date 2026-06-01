"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, vis] as const;
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` }}>
      {children}
    </div>
  );
}

const PROJECTS = [
  { title: "VisionCraft Labs", tag: "Brand + Web", date: "March 2025", desc: "Helping early-stage founders define their positioning and build product experiences that attract investors.", bg: "linear-gradient(160deg,#0f4f63 0%,#082830 100%)", size: "large" },
  { title: "Pulse Creative", tag: "Strategy + Design", date: "November 2025", desc: "A boutique creative agency that needed their website to reflect the bold work they were doing globally.", bg: "linear-gradient(160deg,#2d1a4a 0%,#1a0d32 100%)", size: "small" },
  { title: "Meridian Studio", tag: "Full Website", date: "January 2026", desc: "An architectural photography studio whose identity deserved a digital home as considered as their work.", bg: "linear-gradient(160deg,#1a5c3a 0%,#0d3d28 100%)", size: "small" },
  { title: "NorthStar Collective", tag: "One-Pager + Growth", date: "December 2025", desc: "A community-driven collective of freelance educators who needed one place to tell their collective story.", bg: "linear-gradient(160deg,#3d1a0d 0%,#2a0d0a 100%)", size: "large" },
  { title: "Flux Agency", tag: "Website + Growth", date: "October 2025", desc: "A full-service digital agency scaling fast and needing systems to match their ambition.", bg: "linear-gradient(160deg,#0d3d4a 0%,#082830 100%)", size: "small" },
  { title: "Sable & Co.", tag: "Brand + Web", date: "August 2025", desc: "A luxury personal styling service entering a new market and needing to communicate premium positioning.", bg: "linear-gradient(160deg,#2a2a1a 0%,#1a1a0d 100%)", size: "small" },
];

const FILTERS = ["All", "Brand + Web", "Full Website", "Website + Growth", "Strategy + Design"];

export default function WorkPage() {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? PROJECTS : PROJECTS.filter(p => p.tag === filter);

  return (
    <main>

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          background: "linear-gradient(160deg,#0d4455 0%,#082830 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 50% at 20% 60%, rgba(201,150,58,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, #0b3540 0%, transparent 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 3rem 5rem" }}>
          <Reveal>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", fontWeight: 600 }}>03 / Work</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "2rem" }}>
              <h1 className="script" style={{ fontSize: "clamp(3rem,7vw,7rem)", color: "#ffffff", lineHeight: 1.05 }}>
                Selected Work
              </h1>
              {/* Filter pills */}
              <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                {FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    style={{
                      padding: "0.5rem 1.1rem",
                      borderRadius: 999,
                      border: "1px solid",
                      borderColor: f === filter ? "var(--gold)" : "rgba(255,255,255,0.12)",
                      background: f === filter ? "var(--gold)" : "transparent",
                      color: f === filter ? "#0b3540" : "rgba(255,255,255,0.55)",
                      fontSize: "0.72rem",
                      fontWeight: 600,
                      letterSpacing: "0.06em",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Project grid ── */}
      <section style={{ background: "#0b3540", padding: "3rem 3rem 6rem" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(12,1fr)", gap: "1.5rem" }}>
          {filtered.map((p, i) => {
            const isLarge = p.size === "large";
            return (
              <Reveal key={p.title} delay={i * 0.07}>
                <div style={{ gridColumn: isLarge ? "span 7" : "span 5" }}>
                  <Link href="#" style={{ display: "block", textDecoration: "none" }}>
                    {/* Image area */}
                    <div
                      style={{
                        position: "relative",
                        aspectRatio: isLarge ? "16/10" : "4/5",
                        background: p.bg,
                        borderRadius: 12,
                        overflow: "hidden",
                        marginBottom: "1.25rem",
                      }}
                    >
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(11,53,64,0.7) 0%, transparent 60%)" }} />
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: "55%", height: "55%", border: "1px solid rgba(201,150,58,0.2)", transform: `rotate(${i * 9 - 18}deg)`, borderRadius: 4 }} />
                      </div>
                      {/* Arrow badge */}
                      <div style={{
                        position: "absolute", top: "1.25rem", right: "1.25rem",
                        width: 40, height: 40, borderRadius: "50%",
                        background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: "#ffffff", fontSize: "1rem",
                      }}>→</div>
                    </div>
                    {/* Meta */}
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <span style={{ fontSize: "0.65rem", fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--gold)" }}>{p.tag}</span>
                      <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}>{p.date}</span>
                    </div>
                    <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "0.5rem", textTransform: "uppercase", letterSpacing: "0.02em" }}>{p.title}</h2>
                    <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.65 }}>{p.desc}</p>
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#0d4455", borderTop: "1px solid rgba(255,255,255,0.12)", padding: "6rem 3rem", textAlign: "center" }}>
        <Reveal>
          <h2 className="script" style={{ fontSize: "clamp(2rem,4vw,3.5rem)", color: "#ffffff", marginBottom: "1.5rem" }}>
            Want to be next?
          </h2>
          <Link href="/contact" className="btn-primary">Start Your Project →</Link>
        </Reveal>
      </section>

    </main>
  );
}
