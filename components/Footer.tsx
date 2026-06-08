"use client";
import { useState } from "react";
import Link from "next/link";

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Brand Strategy", href: "/contact" },
      { label: "Web Design", href: "/contact" },
      { label: "Content Creation", href: "/contact" },
      { label: "Growth Marketing", href: "/contact" },
      { label: "Launch Packages", href: "/contact" },
    ],
  },
  {
    title: "Work",
    links: [
      { label: "Case Studies", href: "/work" },
      { label: "Brand Projects", href: "/work" },
      { label: "Web Projects", href: "/work" },
      { label: "One Pagers", href: "/work" },
      { label: "Client Survey", href: "/contact" },
    ],
  },
  {
    title: "About Us",
    links: [
      { label: "Our Story", href: "/about" },
      { label: "Team", href: "/about" },
      { label: "Values", href: "/about" },
      { label: "Process", href: "/about" },
    ],
  },
  {
    title: "Info Centre",
    links: [
      { label: "FAQs", href: "/contact" },
      { label: "Start a Project", href: "/contact" },
      { label: "Refer a Friend", href: "/contact" },
      { label: "Partnership", href: "/contact" },
    ],
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <footer style={{ background: "#0b3540" }}>

      {/* ── Newsletter banner ── */}
      <div
        style={{
          background: "#0d4455",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          borderBottom: "1px solid rgba(255,255,255,0.12)",
          padding: "4rem 3rem",
        }}
      >
        <div
          style={{
            maxWidth: 1440,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          {/* Left: script heading */}
          <h2
            className="script"
            style={{
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              color: "var(--gold)",
              lineHeight: 1.05,
            }}
          >
            News from<br />IdeaShapers
          </h2>

          {/* Right: description + form + socials */}
          <div>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7, marginBottom: "2rem", maxWidth: 420 }}>
              Sign up now for strategy tips, design insights and studio updates — just 4 or 5 times a year, at your leisure.
            </p>

            {done ? (
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  background: "rgba(201,150,58,0.15)",
                  border: "1px solid var(--gold)",
                  borderRadius: 999,
                  padding: "0.75rem 1.5rem",
                  color: "var(--gold)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                }}
              >
                ✓ You're subscribed — thanks!
              </div>
            ) : (
              <form
                onSubmit={(e) => { e.preventDefault(); setDone(true); }}
                style={{
                  display: "flex",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: 999,
                  overflow: "hidden",
                  maxWidth: 420,
                  marginBottom: "1.75rem",
                }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  style={{
                    flex: 1, background: "transparent", border: "none", outline: "none",
                    color: "#fff", fontSize: "0.85rem", padding: "0.75rem 1.25rem",
                  }}
                />
                <button type="submit" className="btn-tickets" style={{ borderRadius: 0, borderTopRightRadius: 999, borderBottomRightRadius: 999, margin: 0 }}>
                  Subscribe
                </button>
              </form>
            )}

            {/* Social icons */}
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {[
                { label: "Instagram", icon: "IG" },
                { label: "Facebook", icon: "FB" },
                { label: "LinkedIn", icon: "IN" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "rgba(255,255,255,0.55)",
                    textDecoration: "none",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.color = "var(--gold)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                    e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main footer columns ── */}
      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "4rem 3rem",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr 1fr",
          gap: "3rem",
          background: "#0b3540",
          color: "#fff",
        }}
      >
        {/* Contact column */}
        <div>
          <p className="footer-col-title">Contact Us</p>
          <a href="mailto:hello@ideashapers.org" className="footer-link">hello@ideashapers.org</a>
          <a href="tel:+1234567890" className="footer-link">+1 (234) 567-890</a>
          <Link href="/contact" className="footer-link">Contact form</Link>

          <div style={{ marginTop: "1.5rem", fontSize: "0.8rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.7 }}>
            IdeaShapers Studio<br />
            Digital-first, worldwide<br />
            ideashapers.org
          </div>

          <Link
            href="/contact"
            className="btn-outline-white"
            style={{ marginTop: "1.75rem", fontSize: "0.72rem", padding: "0.6rem 1.25rem" }}
          >
            Plan your project
          </Link>
        </div>

        {/* 4 link columns */}
        {COLS.map((col) => (
          <div key={col.title}>
            <p className="footer-col-title">{col.title}</p>
            {col.links.map((lk) => (
              <Link key={lk.label} href={lk.href} className="footer-link">
                {lk.label}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.12)",
          padding: "1.5rem 3rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          maxWidth: 1440,
          margin: "0 auto",
        }}
      >
        <p style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", letterSpacing: "0.04em" }}>
          © 2026 IdeaShapers. All rights reserved.
        </p>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["Imprint", "Privacy Policy", "Terms & Conditions"].map((l) => (
            <a
              key={l}
              href="#"
              style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
