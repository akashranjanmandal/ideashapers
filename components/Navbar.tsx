"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const P = {
  cream:  "#f7f3ee",
  dark:   "#2c1008",
  dark2:  "#4a1e0e",
  accent: "#c4622a",
  accent2:"#d97b3f",
  gold:   "#c9963a",
  muted:  "#8a7060",
  border: "rgba(44,16,8,0.09)",
};

const NAV = [
  {
    label: "Services",
    href: "#services",
    children: ["Brand Strategy", "Web Design", "Content Creation", "Growth Marketing"],
  },
  {
    label: "Work",
    href: "/work",
    children: ["Case Studies", "Brand Projects", "Web Projects"],
  },
  { label: "About", href: "/about", children: [] },
  { label: "Contact", href: "/contact", children: [] },
];

function DiamondLogo({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 2L26 14L14 26L2 14L14 2Z" fill={P.accent} opacity="0.15"/>
      <path d="M14 2L26 14L14 26L2 14L14 2Z" stroke={P.accent} strokeWidth="1.5"/>
      <path d="M14 7L21 14L14 21L7 14L14 7Z" fill={P.accent} opacity="0.25"/>
      <circle cx="14" cy="14" r="3" fill={P.accent}/>
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  const openDropdown = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };
  const closeDropdown = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      {/* ── Announcement bar ── */}
      <div className="announce-bar" style={{
        background: P.dark,
        padding: "9px 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        fontSize: "0.72rem",
        fontWeight: 500,
        color: "rgba(255,255,255,0.55)",
        letterSpacing: "0.02em",
        position: "relative",
        zIndex: 1001,
        flexWrap: "wrap",
      }}>
        <span style={{ color: P.gold, marginRight: 4 }}>✦</span>
        IdeaShapers is accepting projects for Q3 2026 —&nbsp;
        <Link href="/contact" style={{
          color: P.accent2,
          fontWeight: 700,
          textDecoration: "none",
          borderBottom: "1px solid rgba(217,123,63,0.35)",
          transition: "color 0.2s",
        }}>
          Get in touch →
        </Link>
      </div>

      {/* ── Main nav ── */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: scrolled ? "rgba(247,243,238,0.92)" : P.cream,
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: `1px solid ${scrolled ? P.border : "transparent"}`,
        transition: "background 0.4s, border-color 0.4s, backdrop-filter 0.4s",
      }}>
        <div style={{
          maxWidth: 1440,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2.5rem",
          height: 66,
        }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: "none", flexShrink: 0, display: "flex", alignItems: "center", gap: 10 }}>
            <DiamondLogo size={26} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
              <span style={{
                fontFamily: "inherit",
                fontSize: "1rem",
                fontWeight: 800,
                letterSpacing: "-0.02em",
                color: P.dark,
              }}>
                Idea<span style={{ color: P.accent }}>Shapers</span>
              </span>
              <span style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "0.62rem",
                color: P.muted,
                letterSpacing: "0.06em",
              }}>
                digital studio
              </span>
            </div>
          </Link>

          {/* Center nav — desktop */}
          <nav style={{ display: "flex", alignItems: "center", gap: 2 }} className="hide-mobile">
            {NAV.map((item) => (
              <div
                key={item.label}
                style={{ position: "relative" }}
                onMouseEnter={() => item.children.length > 0 && openDropdown(item.label)}
                onMouseLeave={() => item.children.length > 0 && closeDropdown()}
              >
                <Link
                  href={item.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "8px 16px",
                    borderRadius: 999,
                    fontSize: "0.82rem",
                    fontWeight: 500,
                    color: P.dark,
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                    transition: "background 0.2s, color 0.2s",
                    background: activeDropdown === item.label ? `${P.border}` : "transparent",
                  }}
                  onMouseEnter={e => { if (!item.children.length) e.currentTarget.style.background = P.border; }}
                  onMouseLeave={e => { if (!item.children.length) e.currentTarget.style.background = "transparent"; }}
                >
                  {item.label}
                  {item.children.length > 0 && (
                    <svg
                      width="9" height="9" viewBox="0 0 10 10" fill="none"
                      style={{ transition: "transform 0.25s", transform: activeDropdown === item.label ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.45 }}
                    >
                      <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </Link>

                {/* Dropdown */}
                {item.children.length > 0 && (
                  <div
                    onMouseEnter={() => openDropdown(item.label)}
                    onMouseLeave={() => closeDropdown()}
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "50%",
                      background: "#fff",
                      borderRadius: 14,
                      border: `1px solid ${P.border}`,
                      boxShadow: "0 12px 40px rgba(44,16,8,0.12), 0 2px 8px rgba(0,0,0,0.06)",
                      padding: "0.5rem",
                      minWidth: 210,
                      zIndex: 100,
                      opacity: activeDropdown === item.label ? 1 : 0,
                      pointerEvents: activeDropdown === item.label ? "all" : "none",
                      transform: activeDropdown === item.label
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(-6px)",
                      transition: "opacity 0.22s, transform 0.22s",
                    } as React.CSSProperties}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child}
                        href={item.href}
                        style={{
                          display: "block",
                          padding: "9px 14px",
                          borderRadius: 9,
                          fontSize: "0.82rem",
                          fontWeight: 400,
                          color: P.dark,
                          textDecoration: "none",
                          transition: "background 0.15s, color 0.15s",
                          letterSpacing: "0.01em",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = P.cream; e.currentTarget.style.color = P.accent; }}
                        onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = P.dark; }}
                      >
                        {child}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right CTA — desktop */}
          <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexShrink: 0 }}>
            <a
              href="mailto:hello@ideashapers.org"
              style={{
                fontSize: "0.78rem",
                fontWeight: 500,
                color: P.muted,
                textDecoration: "none",
                transition: "color 0.2s",
                letterSpacing: "0.01em",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = P.dark)}
              onMouseLeave={e => (e.currentTarget.style.color = P.muted)}
            >
              hello@ideashapers.org
            </a>
            <div style={{ width: 1, height: 18, background: P.border }} />
            <Link
              href="/contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                padding: "9px 22px",
                borderRadius: 999,
                background: P.dark,
                color: "#fff",
                fontSize: "0.78rem",
                fontWeight: 700,
                textDecoration: "none",
                letterSpacing: "0.02em",
                transition: "background 0.2s, transform 0.2s",
                boxShadow: "0 2px 12px rgba(44,16,8,0.25)",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = P.accent; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = P.dark; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Start a Project
              <span style={{ fontSize: "0.9rem", opacity: 0.7 }}>→</span>
            </Link>
          </div>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "6px",
              flexDirection: "column",
              gap: 5,
              borderRadius: 8,
            }}
            className="mobile-toggle"
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: "block",
                width: i === 1 ? (mobileOpen ? 22 : 16) : 22,
                height: 2,
                background: P.dark,
                borderRadius: 1,
                transition: "all 0.3s",
                transform:
                  i === 0 && mobileOpen ? "rotate(45deg) translateY(7px)" :
                  i === 2 && mobileOpen ? "rotate(-45deg) translateY(-7px)" : "none",
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }}/>
            ))}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <div style={{
        position: "fixed",
        inset: 0,
        background: P.dark,
        zIndex: 950,
        display: "flex",
        flexDirection: "column",
        padding: "8rem 2.5rem 3rem",
        clipPath: mobileOpen ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
        transition: "clip-path 0.55s cubic-bezier(0.77,0,0.175,1)",
      }}>
        {NAV.map((item, i) => (
          <Link
            key={item.label}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize: "2.5rem",
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 400,
              color: i === 0 ? P.gold : "#fff",
              textDecoration: "none",
              padding: "0.85rem 0",
              borderBottom: "1px solid rgba(255,255,255,0.07)",
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? "translateY(0)" : "translateY(24px)",
              transition: `opacity 0.45s ease ${i * 0.08 + 0.15}s, transform 0.45s ease ${i * 0.08 + 0.15}s`,
              display: "block",
            }}
          >
            {item.label}
          </Link>
        ))}
        <div style={{ marginTop: "auto", paddingTop: "2.5rem" }}>
          <Link
            href="/contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "14px 28px",
              borderRadius: 999,
              background: P.accent,
              color: "#fff",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >Start a Project →</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .mobile-toggle { display: flex !important; }
          .hide-mobile   { display: none   !important; }
        }
        /* announcement bar wraps on small screens */
        @media (max-width: 560px) {
          .announce-bar { font-size: 0.65rem !important; padding: 7px 1rem !important; text-align: center; }
        }
      `}</style>
    </>
  );
}
