"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const P = {
  white:  "#ffffff",
  dark:   "#2c1008",
  navy:   "#1e2f6e",
  navy2:  "#2d3d8a",
  gold:   "#c9963a",
  muted:  "#6b7280",
  border: "rgba(30,47,110,0.1)",
};

const NAV = [
  { label:"Services",    href:"/#services",    children:["Brand Strategy","Web Design","Content Creation","Growth Marketing"] },
  { label:"Work",        href:"/#work",        children:["Case Studies","Brand Projects","Web Projects"] },
  { label:"About",       href:"/#about",       children:[] },
  { label:"Process",     href:"/#process",     children:[] },
  { label:"FAQ",         href:"/#faq",         children:[] },
  { label:"Influencers", href:"/#influencer",  children:[] },
  { label:"Contact",     href:"/#contact",     children:[] },
];

export default function Navbar() {
  const [mobileOpen,     setMobileOpen]     = useState(false);
  const [visible,        setVisible]        = useState(true);   // hide/show on scroll
  const [atTop,          setAtTop]          = useState(true);   // scrolled past top
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const lastY   = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseHide = useRef(false); // pause hide while mobile menu is open

  /* ── hide on scroll-down, show on scroll-up / stop ── */
  useEffect(() => {
    let scrollTimer: ReturnType<typeof setTimeout>;

    const onScroll = () => {
      if (pauseHide.current) return;
      const y = window.scrollY;
      setAtTop(y < 10);

      if (y > lastY.current && y > 80) {
        // scrolling down
        setVisible(false);
      } else {
        // scrolling up
        setVisible(true);
      }
      lastY.current = y;

      // reappear when scroll stops
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => setVisible(true), 180);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  useEffect(() => {
    pauseHide.current = mobileOpen;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    if (mobileOpen) setVisible(true);
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const openD = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(label);
  };
  const closeD = () => {
    timeoutRef.current = setTimeout(() => setActiveDropdown(null), 120);
  };

  return (
    <>
      {/* ── Announcement bar — hides with nav ── */}
      <div className="announce-bar" style={{
        background: P.navy,
        padding: "9px 2rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        gap: "0.5rem", fontSize: "0.72rem", fontWeight: 500,
        color: "rgba(255,255,255,0.65)", letterSpacing: "0.02em",
        zIndex: 1001, flexWrap: "wrap",
        position: "sticky", top: 0,
        transform: visible ? "translateY(0)" : "translateY(-100%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}>
        <span style={{ color: P.gold, marginRight: 4 }}>✦</span>
        IdeaShapers is accepting projects for Q3 2026 —&nbsp;
        <a href="/#contact" style={{ color:"#fff", fontWeight:700, textDecoration:"none", borderBottom:"1px solid rgba(255,255,255,0.35)" }}>
          Get in touch →
        </a>
      </div>

      {/* ── Main nav ── */}
      <header style={{
        position: "sticky",
        top: 0,        /* sits right at top; announcement bar pushes it down */
        zIndex: 1000,
        background: "#ffffff",
        borderBottom: `1px solid ${atTop ? "rgba(30,47,110,0.07)" : "rgba(30,47,110,0.12)"}`,
        boxShadow: atTop ? "none" : "0 2px 20px rgba(30,47,110,0.07)",
        transform: visible ? "translateY(0)" : "translateY(-110%)",
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s, border-color 0.3s",
      }}>
        <div style={{
          maxWidth: 1440, margin: "0 auto",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 clamp(1.25rem,4vw,2.5rem)", height: 72,
        }}>

          {/* ── Logo only — no wordmark ── */}
          <a href="/" style={{ textDecoration:"none", flexShrink:0, display:"flex", alignItems:"center" }}>
            <Image
              src="/logo.png"
              alt="IdeaShapers"
              width={72}
              height={60}
              style={{ objectFit:"contain", display:"block" }}
              priority
            />
          </a>

          {/* ── Desktop nav links ── */}
          <nav style={{ display:"flex", alignItems:"center", gap:2 }} className="hide-mobile">
            {NAV.map(item => (
              <div key={item.label} style={{ position:"relative" }}
                onMouseEnter={() => item.children.length > 0 && openD(item.label)}
                onMouseLeave={() => item.children.length > 0 && closeD()}
              >
                <a href={item.href} className="nav-link" style={{
                  display:"flex", alignItems:"center", gap:5,
                  padding:"8px 15px", borderRadius:999,
                  fontSize:"0.85rem", fontWeight:500, color:"#111827",
                  textDecoration:"none", letterSpacing:"0.01em",
                  transition:"background 0.2s, color 0.2s",
                  background: activeDropdown===item.label ? `${P.navy}0e` : "transparent",
                }}
                  onMouseEnter={e => { if(!item.children.length) e.currentTarget.style.background=`${P.navy}0e`; }}
                  onMouseLeave={e => { if(!item.children.length) e.currentTarget.style.background="transparent"; }}
                >
                  {item.label}
                  {item.children.length > 0 && (
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="none"
                      style={{ transition:"transform 0.25s", transform:activeDropdown===item.label?"rotate(180deg)":"rotate(0deg)", opacity:0.4 }}>
                      <path d="M2.5 4L5 6.5L7.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  )}
                </a>

                {item.children.length > 0 && (
                  <div onMouseEnter={()=>openD(item.label)} onMouseLeave={()=>closeD()} style={{
                    position:"absolute", top:"calc(100% + 8px)", left:"50%",
                    background:"#fff", borderRadius:14,
                    border:`1px solid ${P.border}`,
                    boxShadow:"0 12px 40px rgba(30,47,110,0.1), 0 2px 8px rgba(0,0,0,0.05)",
                    padding:"0.5rem", minWidth:200, zIndex:100,
                    opacity: activeDropdown===item.label ? 1 : 0,
                    pointerEvents: activeDropdown===item.label ? "all" : "none",
                    transform: activeDropdown===item.label ? "translateX(-50%) translateY(0)" : "translateX(-50%) translateY(-6px)",
                    transition:"opacity 0.22s, transform 0.22s",
                  } as React.CSSProperties}>
                    {item.children.map(child => (
                      <a key={child} href={item.href} style={{ display:"block", padding:"9px 14px", borderRadius:9, fontSize:"0.82rem", fontWeight:400, color:"#111827", textDecoration:"none", transition:"background 0.15s, color 0.15s" }}
                        onMouseEnter={e => { e.currentTarget.style.background=`${P.navy}0e`; e.currentTarget.style.color=P.navy; }}
                        onMouseLeave={e => { e.currentTarget.style.background="transparent"; e.currentTarget.style.color="#111827"; }}
                      >{child}</a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* ── Desktop right: email + CTA ── */}
          <div className="hide-mobile" style={{ display:"flex", alignItems:"center", gap:"0.85rem", flexShrink:0 }}>
            <a href="mailto:info@ideashapers.org" style={{ fontSize:"0.8rem", fontWeight:500, color:P.muted, textDecoration:"none", transition:"color 0.2s" }}
              onMouseEnter={e=>(e.currentTarget.style.color=P.navy)}
              onMouseLeave={e=>(e.currentTarget.style.color=P.muted)}
            >info@ideashapers.org</a>
            <div style={{ width:1, height:18, background:P.border }}/>
            <a href="/#contact" className="nav-cta" style={{
              display:"inline-flex", alignItems:"center", gap:7,
              padding:"9px 22px", borderRadius:999,
              background:P.navy, color:"#fff",
              fontSize:"0.8rem", fontWeight:700,
              textDecoration:"none", letterSpacing:"0.02em",
              transition:"background 0.2s, transform 0.2s",
              boxShadow:"0 2px 14px rgba(30,47,110,0.3)",
            }}
              onMouseEnter={e=>{ e.currentTarget.style.background=P.navy2; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=P.navy; e.currentTarget.style.transform="translateY(0)"; }}
            >Start a Project <span style={{ opacity:0.7 }}>→</span></a>
          </div>

          {/* ── Mobile hamburger ── */}
          <button onClick={()=>setMobileOpen(!mobileOpen)}
            style={{ display:"none", background:"none", border:"none", cursor:"pointer", padding:"6px", flexDirection:"column", gap:5, borderRadius:8 }}
            className="mobile-toggle" aria-label="Menu"
          >
            {[0,1,2].map(i=>(
              <span key={i} style={{
                display:"block", width: i===1?(mobileOpen?22:16):22, height:2,
                background:P.navy, borderRadius:1, transition:"all 0.3s",
                transform: i===0&&mobileOpen?"rotate(45deg) translateY(7px)": i===2&&mobileOpen?"rotate(-45deg) translateY(-7px)":"none",
                opacity: i===1&&mobileOpen?0:1,
              }}/>
            ))}
          </button>
        </div>
      </header>

      {/* ── Mobile menu overlay ── */}
      <div style={{
        position:"fixed", inset:0, background:P.navy, zIndex:950,
        display:"flex", flexDirection:"column",
        padding:"7rem 2.5rem 3rem",
        clipPath: mobileOpen?"inset(0 0 0% 0)":"inset(0 0 100% 0)",
        transition:"clip-path 0.55s cubic-bezier(0.77,0,0.175,1)",
      }}>
        {/* large logo in mobile menu */}
        <div style={{ position:"absolute", top:"1.5rem", left:"2rem" }}>
          <Image src="/logo.png" alt="IdeaShapers" width={68} height={68} style={{ objectFit:"contain", filter:"brightness(0) invert(1)" }}/>
        </div>

        {NAV.map((item,i)=>(
          <a key={item.label} href={item.href} onClick={()=>setMobileOpen(false)} style={{
            fontSize:"2.5rem", fontFamily:"'Playfair Display',Georgia,serif", fontWeight:400,
            color: i===0 ? P.gold : "#fff",
            textDecoration:"none", padding:"0.85rem 0",
            borderBottom:"1px solid rgba(255,255,255,0.07)",
            opacity:mobileOpen?1:0, transform:mobileOpen?"translateY(0)":"translateY(24px)",
            transition:`opacity 0.45s ease ${i*0.08+0.15}s, transform 0.45s ease ${i*0.08+0.15}s`,
            display:"block",
          }}>{item.label}</a>
        ))}

        <div style={{ marginTop:"auto", paddingTop:"2.5rem", display:"flex", flexDirection:"column", gap:"0.75rem" }}>
          <a href="mailto:info@ideashapers.org" style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", textDecoration:"none" }}>info@ideashapers.org</a>
          <a href="tel:+917077102829" style={{ fontSize:"0.82rem", color:"rgba(255,255,255,0.45)", textDecoration:"none" }}>+91 70771 02829</a>
          <a href="/#contact" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", borderRadius:999, background:P.gold, color:P.dark, textDecoration:"none", fontSize:"0.85rem", fontWeight:700, letterSpacing:"0.03em", width:"fit-content", marginTop:"0.5rem" }}>
            Start a Project →
          </a>
        </div>
      </div>

      <style>{`
        /* unique nav link hover — sliding underline from left */
        .nav-link {
          position: relative;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 3px;
          left: 15px;
          right: 15px;
          height: 1.5px;
          background: #c9963a;
          border-radius: 999px;
          transform: scaleX(0);
          transform-origin: left center;
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-link:hover { color: #1e2f6e !important; }

        /* CTA button shimmer on hover */
        .nav-cta {
          position: relative;
          overflow: hidden;
        }
        .nav-cta::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.45s ease;
        }
        .nav-cta:hover::before { left: 150%; }

        @media (max-width: 900px) {
          .mobile-toggle { display: flex !important; }
          .hide-mobile   { display: none   !important; }
        }
        @media (max-width: 560px) {
          .announce-bar { font-size:0.65rem !important; padding:7px 1rem !important; text-align:center; }
        }
      `}</style>
    </>
  );
}
