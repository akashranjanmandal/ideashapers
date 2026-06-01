"use client";
import { useState } from "react";
import Link from "next/link";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", budget: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.9rem 0",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(255,255,255,0.12)",
    color: "#ffffff",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <main>

      {/* ── Hero ── */}
      <section
        style={{
          position: "relative",
          minHeight: "55vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          background: "linear-gradient(160deg,#0d4455 0%,#082830 100%)",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 50% at 25% 60%, rgba(201,150,58,0.15) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "30%", background: "linear-gradient(to top, #0b3540 0%, transparent 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, padding: "0 3rem 5rem" }}>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "1.25rem", fontWeight: 600 }}>
            04 / Contact
          </p>
          <h1 className="script" style={{ fontSize: "clamp(3rem,7vw,7rem)", color: "#ffffff", lineHeight: 1.05 }}>
            Let's Talk.
          </h1>
        </div>
      </section>

      {/* ── Form section ── */}
      <section style={{ background: "#0b3540", padding: "5rem 3rem 7rem", borderBottom: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ maxWidth: 1440, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "8rem", alignItems: "start" }}>

          {/* Left — sticky info */}
          <div style={{ position: "sticky", top: "6rem" }}>
            <p style={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.8, marginBottom: "3rem" }}>
              We're selective about who we work with — not because we're precious about it, but because the best work comes from real partnership. Tell us what you're building and we'll tell you if we're the right fit.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
              <div>
                <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>Email</p>
                <a href="mailto:hello@ideashapers.org" style={{ color: "#ffffff", textDecoration: "none", fontSize: "0.9rem" }}>
                  hello@ideashapers.org
                </a>
              </div>
              <div>
                <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>Response Time</p>
                <p style={{ color: "#ffffff", fontSize: "0.9rem" }}>Within 24 hours</p>
              </div>
              <div>
                <p className="eyebrow" style={{ marginBottom: "0.6rem" }}>Current Availability</p>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", display: "inline-block" }} />
                  <p style={{ color: "var(--gold)", fontSize: "0.85rem", fontWeight: 700 }}>Slots open — Q3 2026</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — form */}
          <div>
            {submitted ? (
              <div style={{ padding: "4rem", border: "1px solid var(--gold)", borderRadius: 12, textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✦</div>
                <h2 className="script" style={{ fontSize: "2rem", color: "var(--gold)", marginBottom: "1rem" }}>
                  We've got it.
                </h2>
                <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.75 }}>
                  Expect to hear from us within 24 hours. We're already excited about what we're going to build together.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[
                  { key: "name", label: "Full Name *", placeholder: "Your full name", type: "text", required: true },
                  { key: "email", label: "Email *", placeholder: "your@email.com", type: "email", required: true },
                  { key: "company", label: "Company / Brand", placeholder: "What's your brand called?", type: "text", required: false },
                ].map((field) => (
                  <div key={field.key} style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem" }}>
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      value={form[field.key as keyof typeof form]}
                      onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                      placeholder={field.placeholder}
                      required={field.required}
                      style={inputStyle}
                      onFocus={e => (e.target.style.borderBottomColor = "var(--gold)")}
                      onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                    />
                  </div>
                ))}

                {/* Service selector */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>
                    Service Needed
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {["One-Pager Site", "Full Website", "Website + Growth", "Not Sure Yet"].map(s => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, service: s })}
                        style={{
                          padding: "0.5rem 1.1rem",
                          borderRadius: 999,
                          background: form.service === s ? "var(--gold)" : "transparent",
                          color: form.service === s ? "#0b3540" : "rgba(255,255,255,0.55)",
                          border: `1px solid ${form.service === s ? "var(--gold)" : "rgba(255,255,255,0.12)"}`,
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Budget selector */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "0.75rem" }}>
                    Budget Range
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                    {["Under $3k", "$3k–$6k", "$6k–$10k", "$10k+"].map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setForm({ ...form, budget: b })}
                        style={{
                          padding: "0.5rem 1.1rem",
                          borderRadius: 999,
                          background: form.budget === b ? "var(--gold)" : "transparent",
                          color: form.budget === b ? "#0b3540" : "rgba(255,255,255,0.55)",
                          border: `1px solid ${form.budget === b ? "var(--gold)" : "rgba(255,255,255,0.12)"}`,
                          fontSize: "0.72rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "3rem" }}>
                  <label style={{ display: "block", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.55)", marginBottom: "0.5rem" }}>
                    Tell Us About Your Project *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="What are you building? What's the goal? What's not working right now?"
                    required
                    rows={5}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.7 }}
                    onFocus={e => (e.target.style.borderBottomColor = "var(--gold)")}
                    onBlur={e => (e.target.style.borderBottomColor = "rgba(255,255,255,0.12)")}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ alignSelf: "flex-start" }}>
                  Send It →
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

    </main>
  );
}
