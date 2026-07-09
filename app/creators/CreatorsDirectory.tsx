"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CREATORS, slugify, type Creator } from "./creators-data";

const P = {
  navy: "#1e2f6e",
  navy2: "#2d3d8a",
  navyL: "#3d52a8",
  text: "#141414",
  muted: "#6b7280",
  border: "rgba(30,47,110,0.1)",
  cream: "#ffffff",
  cream2: "#f8f9fc",
};

const AVATAR_PALETTE = [P.navy, P.navy2, P.navyL, "#7a1f2b", "#9c2c3a", "#c4622a", "#d97b3f"];

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function avatarColor(name: string) {
  return AVATAR_PALETTE[hashStr(name) % AVATAR_PALETTE.length];
}

export default function CreatorsDirectory({ initialSlug }: { initialSlug?: string }) {
  const initialIdx = initialSlug ? CREATORS.findIndex(c => slugify(c.name) === initialSlug) : 0;
  const [activeIdx, setActiveIdx] = useState(initialIdx >= 0 ? initialIdx : 0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const hasJumped = useRef(false);

  const goTo = (i: number) => {
    const el = sectionRefs.current[i];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Jump to the requested creator on first load (no smooth-scroll animation, land instantly)
  useEffect(() => {
    if (hasJumped.current) return;
    hasJumped.current = true;
    if (initialIdx > 0) {
      const el = sectionRefs.current[initialIdx];
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
    }
  }, [initialIdx]);

  // Track which profile is in view to drive the sidebar highlight + URL
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.idx);
            setActiveIdx(idx);
            const slug = slugify(CREATORS[idx].name);
            const url = `/creators/${slug}`;
            if (window.location.pathname !== url) {
              window.history.replaceState(null, "", url);
            }
          }
        });
      },
      { threshold: 0.6 }
    );
    sectionRefs.current.forEach(el => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ background: P.cream }}>
      {/* Top bar — logo + back to home + progress counter */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.1rem clamp(1.25rem,4vw,2.5rem)",
        pointerEvents: "none",
      }}>
        <Link href="/" style={{
          pointerEvents: "all",
          display: "flex", alignItems: "center", gap: "0.6rem",
          textDecoration: "none",
          background: "rgba(255,255,255,0.9)", backdropFilter: "blur(6px)",
          padding: "0.4rem 1rem 0.4rem 0.5rem", borderRadius: 999,
          border: `1px solid ${P.border}`, boxShadow: "0 4px 16px rgba(30,47,110,0.08)",
        }}>
          <Image src="/logo.png" alt="IdeaShapers" width={30} height={30} style={{ objectFit: "contain" }} />
          <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.78rem", fontWeight: 600, color: P.text }}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M10 3L5 8L10 13" stroke={P.navy} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back to Home
          </span>
        </Link>
      </div>

      {/* Desktop sidebar — jump list of all creators */}
      <aside className="creators-sidebar">
        <p style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "1.05rem", color: P.text, marginBottom: "1rem" }}>creators</p>
        <div style={{ height: 1, background: P.border, marginBottom: "0.9rem" }} />
        <div className="creators-sidebar-list">
          {CREATORS.map((c, i) => (
            <button
              key={c.handle + i}
              onClick={() => goTo(i)}
              className="creators-sidebar-item"
              style={{ color: i === activeIdx ? P.navy : P.muted, fontWeight: i === activeIdx ? 700 : 500 }}
            >
              {c.name.split(" ")[0].toLowerCase()}
            </button>
          ))}
        </div>
      </aside>

      {/* One full-screen profile section per creator */}
      {CREATORS.map((c, i) => (
        <ProfileSection
          key={c.handle + i}
          creator={c}
          index={i}
          total={CREATORS.length}
          onNext={() => goTo(Math.min(i + 1, CREATORS.length - 1))}
          onPrev={() => goTo(Math.max(i - 1, 0))}
          setRef={(el) => { sectionRefs.current[i] = el; }}
        />
      ))}
    </main>
  );
}

function ProfileSection({
  creator, index, total, onNext, onPrev, setRef,
}: {
  creator: Creator; index: number; total: number;
  onNext: () => void; onPrev: () => void;
  setRef: (el: HTMLDivElement | null) => void;
}) {
  const color = avatarColor(creator.name);
  const [imgOk, setImgOk] = useState(true);
  const hasPhoto = creator.img && creator.imgType === "photo" && imgOk;
  const hasAvatar = creator.img && creator.imgType === "avatar" && imgOk;

  const [first, ...rest] = creator.name.split(" ");
  const last = rest.join(" ");
  const slug = slugify(creator.name);

  const shareUrl = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/creators/${slug}`;
  };

  const [copied, setCopied] = useState(false);
  const handleShare = async () => {
    const url = shareUrl();
    try {
      if (navigator.share) {
        await navigator.share({ title: creator.name, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* user cancelled share sheet or clipboard denied — no-op */
    }
  };

  return (
    <section ref={setRef} data-idx={index} className="creator-section">
      <div className="creator-section-inner">
        {/* Left column — identity */}
        <div className="creator-info">
          <h1 className="creator-name">
            <span>{first.toLowerCase()}</span>
            {last && <span>{last.toLowerCase()}</span>}
          </h1>

          <div className="creator-meta">
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M8 1.5c-2.4 0-4.3 1.9-4.3 4.3 0 3.2 4.3 8.7 4.3 8.7s4.3-5.5 4.3-8.7c0-2.4-1.9-4.3-4.3-4.3z" stroke={P.navy} strokeWidth="1.3"/>
              <circle cx="8" cy="5.8" r="1.5" stroke={P.navy} strokeWidth="1.3"/>
            </svg>
            <span>kolkata, india</span>
          </div>

          <div className="creator-social">
            <span className="creator-ig-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="2" y="2" width="20" height="20" rx="6" stroke="#fff" strokeWidth="1.8"/>
                <circle cx="12" cy="12" r="4.2" stroke="#fff" strokeWidth="1.8"/>
                <circle cx="17.2" cy="6.8" r="1.1" fill="#fff"/>
              </svg>
            </span>
            <a href={creator.link} target="_blank" rel="noopener noreferrer" className="creator-handle-link">
              @{creator.handle}
            </a>
            {creator.followers && (
              <span className="creator-followers">{creator.followers} followers</span>
            )}
          </div>

          <div className="creator-actions">
            <a href={creator.link} target="_blank" rel="noopener noreferrer" className="creator-connect-btn">connect</a>

            <button
              aria-label="Share this creator's profile"
              onClick={handleShare}
              className={`creator-share-btn${copied ? " is-copied" : ""}`}
            >
              {copied ? (
                <>
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Copied
                </>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="12.5" cy="3.5" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="12.5" cy="12.5" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
                  <circle cx="3.5" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M5.1 7.1L11 4.2M5.1 8.9L11 11.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
              )}
            </button>
          </div>

          <div className="creator-nav-row">
            <div className="creator-nav-arrows">
              <button aria-label="Previous creator" onClick={onPrev} disabled={index === 0}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 10L8 5L13 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <button aria-label="Next creator" onClick={onNext} disabled={index === total - 1}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 6L8 11L13 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
            </div>
          </div>
        </div>

        {/* Right column — portrait */}
        <div className="creator-photo-wrap">
          {hasPhoto && (
            <img
              src={creator.img}
              alt={creator.name}
              onError={() => setImgOk(false)}
              className="creator-photo"
            />
          )}

          {hasAvatar && (
            <div className="creator-avatar-frame">
              <img src={creator.img} alt={creator.name} onError={() => setImgOk(false)} className="creator-avatar-img" />
            </div>
          )}

          {!hasPhoto && !hasAvatar && (
            <div className="creator-placeholder" style={{ background: `linear-gradient(150deg, ${color}, ${color}cc)` }}>
              <span>{initials(creator.name)}</span>
            </div>
          )}

          {/* Little floating dot accent, echoes reference design */}
          <span className="creator-photo-dot" style={{ background: color }} />
        </div>
      </div>
    </section>
  );
}
