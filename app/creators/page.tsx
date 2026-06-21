"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { CREATORS } from "./creators-data";

const P = {
  navy: "#1e2f6e",
  text: "#141414",
  muted: "#6b7280",
  border: "rgba(30,47,110,0.1)",
};

const AVATAR_PALETTE = ["#1e2f6e", "#2d3d8a", "#3d52a8", "#7a1f2b", "#9c2c3a", "#c4622a", "#d97b3f"];

function hashStr(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function avatarColor(name: string) {
  return AVATAR_PALETTE[hashStr(name) % AVATAR_PALETTE.length];
}

function initials(name: string) {
  return name.split(" ").filter(Boolean).slice(0, 2).map(w => w[0]).join("").toUpperCase();
}

function dummyFollowers(handle: string) {
  const thousands = 4 + (hashStr(handle) % 250); // 4K – 253K
  return `${thousands}K`;
}

export default function CreatorsPage() {
  const [query, setQuery] = useState("");
  const [letter, setLetter] = useState<string | null>(null);

  const letters = useMemo(() => {
    const s = new Set(CREATORS.map(c => c.name[0].toUpperCase()));
    return Array.from(s).sort();
  }, []);

  const filtered = useMemo(() => {
    let list = CREATORS;
    if (letter) list = list.filter(c => c.name[0].toUpperCase() === letter);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(c => c.name.toLowerCase().includes(q) || c.handle.toLowerCase().includes(q));
    }
    return list;
  }, [query, letter]);

  const grouped = useMemo(() => {
    const map = new Map<string, typeof CREATORS>();
    for (const c of filtered) {
      const key = c.name[0].toUpperCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    }
    return Array.from(map.entries()).sort(([a], [b]) => a.localeCompare(b));
  }, [filtered]);

  return (
    <main style={{ background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "clamp(1.5rem,4vw,3rem) clamp(1.25rem,5vw,2rem) 6rem" }}>

        {/* Back button */}
        <Link href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontSize: "0.82rem", fontWeight: 600, color: P.muted,
          textDecoration: "none", marginBottom: "2rem",
        }}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Back to Home
        </Link>

        <h1 style={{ fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 700, color: P.text, marginBottom: "1.75rem", letterSpacing: "-0.01em" }}>
          Creators ({CREATORS.length})
        </h1>

        {/* Search */}
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search name or handle…"
          style={{
            width: "100%", padding: "0.65rem 1rem", borderRadius: 10,
            border: `1.5px solid ${P.border}`, fontSize: "0.88rem",
            color: P.text, outline: "none", fontFamily: "inherit",
            marginBottom: "1rem", transition: "border-color 0.2s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = P.navy)}
          onBlur={e => (e.currentTarget.style.borderColor = P.border)}
        />

        {/* A-Z sort row */}
        <div style={{ display: "flex", gap: "0.35rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <button onClick={() => setLetter(null)} style={{
            padding: "0.3rem 0.7rem", borderRadius: 999, fontSize: "0.72rem", fontWeight: 700,
            border: `1px solid ${letter === null ? P.navy : P.border}`,
            background: letter === null ? P.navy : "transparent",
            color: letter === null ? "#fff" : P.muted, cursor: "pointer", fontFamily: "inherit",
          }}>All</button>
          {letters.map(l => (
            <button key={l} onClick={() => setLetter(l === letter ? null : l)} style={{
              width: 26, height: 26, borderRadius: "50%", fontSize: "0.72rem", fontWeight: 700,
              border: `1px solid ${letter === l ? P.navy : P.border}`,
              background: letter === l ? P.navy : "transparent",
              color: letter === l ? "#fff" : P.muted, cursor: "pointer", fontFamily: "inherit",
            }}>{l}</button>
          ))}
        </div>

        {/* List */}
        {grouped.length === 0 ? (
          <p style={{ color: P.muted, fontSize: "0.9rem" }}>No creators found.</p>
        ) : (
          grouped.map(([letterKey, group]) => (
            <div key={letterKey} style={{ marginBottom: "1.75rem" }}>
              <p style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", color: P.navy, marginBottom: "0.6rem" }}>{letterKey}</p>
              <div style={{ borderTop: `1px solid ${P.border}` }}>
                {group.map(c => (
                  <a
                    key={c.handle + c.name}
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      padding: "0.7rem 0", borderBottom: `1px solid ${P.border}`,
                      textDecoration: "none", color: P.text, fontSize: "0.92rem",
                    }}
                  >
                    <span style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
                      <span style={{
                        width: 38, height: 38, borderRadius: "50%", flexShrink: 0,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        background: avatarColor(c.name), color: "#fff",
                        fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.02em",
                      }}>{initials(c.name)}</span>
                      <span style={{ fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{c.name}</span>
                    </span>
                    <span style={{ display: "flex", alignItems: "center", gap: 14, color: P.muted, fontSize: "0.84rem", flexShrink: 0 }}>
                      <span style={{ fontWeight: 700, color: P.navy }}>{dummyFollowers(c.handle)}</span>
                      <span>@{c.handle}</span>
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
