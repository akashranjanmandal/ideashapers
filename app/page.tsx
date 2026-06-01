"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const P = {
  cream:   "#f7f3ee",
  cream2:  "#f0ebe2",
  cream3:  "#e5ddd2",
  dark:    "#2c1008",
  dark2:   "#4a1e0e",
  dark3:   "#6b2d14",
  accent:  "#c4622a",
  accent2: "#d97b3f",
  gold:    "#c9963a",
  text:    "#1c1208",
  muted:   "#8a7060",
  border:  "rgba(44,16,8,0.1)",
};

const WORK = [
  { title:"VisionCraft Labs",  tag:"Brand + Web",        year:"2025", result:"Closed 2 enterprise deals within 60 days", color:"#1a0e06", accent:"#c9963a" },
  { title:"Pulse Creative",    tag:"Strategy + Design",  year:"2025", result:"Conversion rate doubled in 30 days",       color:"#0d0818", accent:"#c4622a" },
  { title:"Meridian Studio",   tag:"Full Website",        year:"2026", result:"3× organic traffic in first quarter",      color:"#060d10", accent:"#8ab4c2" },
  { title:"NorthStar",         tag:"Growth + One-Pager", year:"2025", result:"Raised seed round 2 weeks post-launch",    color:"#0e0804", accent:"#c9963a" },
  { title:"Flux Agency",       tag:"Website + Growth",   year:"2025", result:"40% revenue growth quarter after launch",  color:"#060810", accent:"#c4622a" },
  { title:"Sable & Co.",       tag:"Brand + Web",        year:"2025", result:"Brand recognition up 65% in 6 months",     color:"#0c0a04", accent:"#d97b3f" },
];

const SERVICES = [
  { n:"01", title:"Brand Strategy",   desc:"We uncover what makes you unmissable — positioning, messaging, and a voice that cuts through the noise.",                     items:["Brand Audit","Positioning Framework","Messaging System","Voice & Tone"] },
  { n:"02", title:"Web Design",       desc:"Conversion-focused websites built for humans. Every screen, every interaction, designed to make people act.",                 items:["UX Research","Visual Design","Interaction Design","Design Systems"] },
  { n:"03", title:"Development",      desc:"Clean Next.js code — every animation pixel-perfect, every page under 2 seconds. Built to last.",                             items:["Next.js / React","GSAP Animations","CMS Integration","Core Web Vitals"] },
  { n:"04", title:"Content Creation", desc:"Copy and creative that earns attention, builds trust, and gives people a genuine reason to care.",                           items:["Copywriting","Art Direction","Campaign Concepts","Brand Storytelling"] },
  { n:"05", title:"Growth Marketing", desc:"Systematic, data-driven strategies to put your offer in front of the right people at the exact right moment.",               items:["Launch Strategy","SEO","Paid Advertising","Analytics"] },
];

const PROCESS = [
  { n:"01", title:"Discovery",       time:"Week 1",   desc:"Deep-dive into your brand, goals, audience, and competitive landscape. We leave knowing the exact story that needs to be told." },
  { n:"02", title:"Strategy",        time:"Week 1–2", desc:"Sitemap, messaging, information architecture, and conversion strategy. The blueprint governing every design decision." },
  { n:"03", title:"Design",          time:"Week 2–4", desc:"Visual systems that capture your brand's full weight. Desktop and mobile designed simultaneously, iterated until exactly right." },
  { n:"04", title:"Development",     time:"Week 4–6", desc:"Clean, fast, accessible Next.js code. Every animation and interaction built to spec and optimised for performance." },
  { n:"05", title:"Launch + Growth", time:"Ongoing",  desc:"30 days post-launch support. We're with you through the critical first month — and beyond if you want us." },
];

const TESTIMONIALS = [
  { name:"James Kim",    role:"Founder, VisionCraft Labs",   initials:"JK", color:"#c9963a", quote:"IdeaShapers turned our brand into a deal-closing machine." },
  { name:"Sara Okafor",  role:"CEO, Pulse Creative",         initials:"SO", color:"#c4622a", quote:"Our conversion rate doubled in the first month after launch." },
  { name:"Marcus Reid",  role:"Co-founder, Meridian Studio",  initials:"MR", color:"#8ab4c2", quote:"Beyond what we imagined. Delivered in 5 weeks, no compromises." },
  { name:"Priya Nair",   role:"Founder, NorthStar",          initials:"PN", color:"#c9963a", quote:"Raised our seed round two weeks after going live. Coincidence? No." },
  { name:"Tom Ellsworth",role:"Director, Flux Agency",       initials:"TE", color:"#d97b3f", quote:"Revenue up 40% the quarter after launch. They build businesses." },
  { name:"Ana Souza",    role:"CEO, Bloom Studio",           initials:"AS", color:"#a8c5b5", quote:"Finally a studio that listens first and designs second." },
];

const TEAM = [
  { name:"Aryan Mehta",  role:"Creative Director", bio:"10 years crafting brand identities for startups and Fortune 500s. Obsessed with the gap between good and iconic.", initials:"AM", color:"#c4622a" },
  { name:"Zara Patel",   role:"Head of Strategy",  bio:"Ex-McKinsey. Spent 8 years helping companies find their unfair advantage. Now she does it through design.",       initials:"ZP", color:"#c9963a" },
  { name:"Leo Fontaine", role:"Lead Developer",    bio:"Built products used by millions. Believes great code is invisible — you only notice it when it's gone.",         initials:"LF", color:"#8ab4c2" },
  { name:"Maya Osei",    role:"UX & Content Lead", bio:"Former journalist turned UX researcher. Writes copy that converts and designs flows that delight.",               initials:"MO", color:"#d97b3f" },
];

const FAQS = [
  { q:"How long does a typical project take?",  a:"Most brand + web projects run 5–8 weeks from kickoff to launch. Smaller engagements like one-pagers or brand-only work typically land in 2–4 weeks. We'll give you a precise timeline in your discovery call." },
  { q:"What does the process look like?",        a:"We work in five phases: Discovery, Strategy, Design, Development, and Launch + Growth. You're involved at each stage — we don't disappear for weeks and surprise you with a finished product." },
  { q:"Do you work with early-stage founders?",  a:"Absolutely. Many of our best projects started with founders who had a vision but no brand yet. We love helping you build from the ground up — it's where we have the most creative impact." },
  { q:"What's included after launch?",           a:"Every project includes 30 days of post-launch support. We're with you through the critical first month to iron out anything unexpected. Extended retainer support is available if you want us ongoing." },
  { q:"Can you work with our existing brand?",   a:"Yes. We can work within your existing brand guidelines, evolve them, or start fresh — whatever your goals demand. We'll advise on what makes the most strategic sense after our discovery session." },
  { q:"How do we get started?",                  a:"Hit 'Start a Project' and fill in the contact form. We'll get back to you within 24 hours to schedule a free 30-minute discovery call. No commitment, no pressure — just a conversation." },
];

const WA_PRESETS = [
  "Hi IdeaShapers! I'd like to start a new project.",
  "I need a brand strategy and website — can we talk?",
  "I want to know more about your services.",
  "Can I book a free discovery call?",
];

/* ── helpers ── */
function isMobile() { return typeof window !== "undefined" && window.innerWidth <= 900; }

/* ── MAGNETIC BUTTON ── */
function Mag({ children, strength=0.28 }: { children: React.ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    if (isMobile()) return;
    const el = ref.current!; const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*strength}px,${(e.clientY-r.top-r.height/2)*strength}px)`;
  };
  const onLeave = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} style={{ display:"inline-block", transition:"transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)" }}>{children}</div>;
}

/* ── PILL BUTTON ── */
function PillBtn({ children, onClick, dark=false, white=false, style:extra={} }: { children:React.ReactNode; onClick?:()=>void; dark?:boolean; white?:boolean; style?:React.CSSProperties }) {
  const [hov,setHov]=useState(false);
  const base: React.CSSProperties = { display:"inline-flex",alignItems:"center",gap:8,padding:"12px 28px",borderRadius:999,cursor:"pointer",fontSize:"0.8rem",fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",border:"1.5px solid",position:"relative",overflow:"hidden",transition:"color 0.38s,border-color 0.38s",fontFamily:"inherit",background:"transparent",...extra };
  let bc=P.text, col=hov?P.cream:P.text, fill=P.dark;
  if(dark)  { bc=P.dark; col=hov?P.dark:P.cream; fill="rgba(255,255,255,0.9)"; }
  if(white) { bc="rgba(255,255,255,0.35)"; col=hov?P.dark:"#fff"; fill="#fff"; }
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{...base,borderColor:bc,color:col}}>
      <span style={{ position:"absolute",inset:0,background:fill,borderRadius:999,transform:hov?"translateY(0)":"translateY(105%)",transition:"transform 0.38s cubic-bezier(0.76,0,0.24,1)" }}/>
      <span style={{ position:"relative",zIndex:1 }}>{children}</span>
    </button>
  );
}

/* ── ARROW BUTTON ── */
function ArrowBtn({ children, onClick, light=false }: { children:React.ReactNode; onClick?:()=>void; light?:boolean }) {
  const [hov,setHov]=useState(false);
  return (
    <button onClick={onClick} onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{ display:"inline-flex",alignItems:"center",gap:8,background:"none",border:"none",cursor:"pointer",fontSize:"0.78rem",fontWeight:600,letterSpacing:"0.05em",textTransform:"uppercase",fontFamily:"inherit" }}>
      <span style={{ color:light?(hov?"#fff":"rgba(255,255,255,0.6)"):(hov?P.text:P.muted) }}>{children}</span>
      <span style={{ width:28,height:28,borderRadius:"50%",border:`1.5px solid ${light?"rgba(255,255,255,0.35)":P.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.85rem",background:hov?(light?"#fff":P.dark):"transparent",color:hov?(light?P.dark:"#fff"):(light?"rgba(255,255,255,0.6)":P.muted),transform:hov?"rotate(45deg)":"rotate(0deg)",transition:"all 0.25s" }}>→</span>
    </button>
  );
}

/* ── DIAMOND LOGO ── */
function DiamondLogo({ size=28, accent=P.accent }: { size?:number; accent?:string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" fill="none">
      <path d="M14 2L26 14L14 26L2 14L14 2Z" fill={accent} opacity="0.15"/>
      <path d="M14 2L26 14L14 26L2 14L14 2Z" stroke={accent} strokeWidth="1.5"/>
      <path d="M14 7L21 14L14 21L7 14L14 7Z" fill={accent} opacity="0.25"/>
      <circle cx="14" cy="14" r="3" fill={accent}/>
    </svg>
  );
}

/* ── WHATSAPP WIDGET ── */
function WAWidget() {
  const [open,setOpen]=useState(false);
  const [msg,setMsg]=useState("");
  const send=(text:string)=>window.open(`https://wa.me/+1234567890?text=${encodeURIComponent(text)}`,"_blank");
  const WaIcon=()=><svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>;
  return (
    <div className="wa-float">
      {open && (
        <div style={{ background:"#fff",borderRadius:16,boxShadow:"0 8px 48px rgba(0,0,0,0.16)",width:300,overflow:"hidden",border:"1px solid rgba(0,0,0,0.06)",animation:"waSlide 0.25s ease" }}>
          <div style={{ background:"#075E54",padding:"1rem 1.25rem",display:"flex",alignItems:"center",gap:"0.85rem" }}>
            <div style={{ width:38,height:38,borderRadius:"50%",background:"#25d366",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}><WaIcon/></div>
            <div style={{ flex:1 }}><p style={{ color:"#fff",fontWeight:700,fontSize:"0.88rem",margin:0 }}>IdeaShapers</p><p style={{ color:"rgba(255,255,255,0.6)",fontSize:"0.7rem",margin:0 }}>Typically replies in minutes</p></div>
            <button onClick={()=>setOpen(false)} style={{ background:"none",border:"none",color:"rgba(255,255,255,0.6)",cursor:"pointer",fontSize:"1rem",lineHeight:1,padding:4 }}>✕</button>
          </div>
          <div style={{ padding:"1rem" }}>
            <p style={{ fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:P.muted,marginBottom:"0.5rem" }}>Quick messages</p>
            {WA_PRESETS.map(p=>(
              <button key={p} onClick={()=>send(p)} style={{ display:"block",width:"100%",textAlign:"left",background:P.cream2,border:`1px solid ${P.border}`,borderRadius:8,padding:"0.55rem 0.8rem",fontSize:"0.78rem",color:P.text,cursor:"pointer",marginBottom:"0.4rem",fontFamily:"inherit",transition:"background 0.15s" }}
                onMouseEnter={e=>{e.currentTarget.style.background=P.cream3;e.currentTarget.style.borderColor=P.accent;}}
                onMouseLeave={e=>{e.currentTarget.style.background=P.cream2;e.currentTarget.style.borderColor=P.border;}}
              >{p}</button>
            ))}
            <textarea value={msg} onChange={e=>setMsg(e.target.value)} placeholder="Or type your own…" rows={2} style={{ width:"100%",border:`1px solid ${P.border}`,borderRadius:8,padding:"0.6rem 0.85rem",fontSize:"0.78rem",fontFamily:"inherit",color:P.text,background:"#fff",resize:"none",outline:"none",marginTop:"0.5rem",transition:"border-color 0.2s" }} onFocus={e=>(e.target.style.borderColor="#25d366")} onBlur={e=>(e.target.style.borderColor=P.border)}/>
            <button onClick={()=>{if(msg.trim())send(msg);}} style={{ display:"flex",alignItems:"center",justifyContent:"center",gap:6,width:"100%",background:"#25d366",color:"#fff",border:"none",borderRadius:8,padding:"0.65rem",fontSize:"0.78rem",fontWeight:700,cursor:"pointer",marginTop:"0.5rem",fontFamily:"inherit",transition:"background 0.2s" }} onMouseEnter={e=>(e.currentTarget.style.background="#1ebe5d")} onMouseLeave={e=>(e.currentTarget.style.background="#25d366")}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>Send via WhatsApp
            </button>
          </div>
        </div>
      )}
      <button onClick={()=>setOpen(!open)} className="wa-btn" aria-label="Chat on WhatsApp"><WaIcon/></button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════ */
export default function Home() {
  const heroRef   = useRef<HTMLElement>(null);
  const blob1Ref  = useRef<HTMLDivElement>(null);
  const blob2Ref  = useRef<HTMLDivElement>(null);
  const blob3Ref  = useRef<HTMLDivElement>(null);
  const svcOuter  = useRef<HTMLDivElement>(null);
  const svcTrack  = useRef<HTMLDivElement>(null);
  const workOuter = useRef<HTMLDivElement>(null);
  const workTrack = useRef<HTMLDivElement>(null);
  const [active,   setActive]   = useState("hero");
  const [mobileMenu, setMobileMenu] = useState(false);

  /* hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay:0.1 })
        .from(".hero-line",  { y:80,opacity:0,duration:1.2,stagger:0.12,ease:"power3.out" })
        .from(".hero-sub",   { y:20,opacity:0,duration:1.0,ease:"power2.out" }, "-=0.6")
        .from(".hero-btns",  { y:20,opacity:0,duration:1.0,ease:"power2.out" }, "-=0.7")
        .from(".hero-stats", { y:16,opacity:0,duration:0.9,ease:"power2.out" }, "-=0.6");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* blob parallax — desktop only */
  useEffect(() => {
    if (isMobile()) return;
    const ctx = gsap.context(() => {
      const st=(ref:React.RefObject<HTMLDivElement|null>,y:number,x:number,s:number)=>ref.current&&gsap.to(ref.current,{y,x,ease:"none",scrollTrigger:{trigger:heroRef.current,start:"top top",end:"bottom top",scrub:s}});
      st(blob1Ref,-120,30,2.5); st(blob2Ref,-80,-40,1.8); st(blob3Ref,-60,20,3);
    });
    return () => ctx.revert();
  }, []);

  /* WORK horizontal scroll — DESKTOP only, mobile uses native scroll */
  useEffect(() => {
    if (isMobile()) return;
    if (!workOuter.current || !workTrack.current) return;
    const track = workTrack.current;
    const outer = workOuter.current;
    const ctx = gsap.context(() => {
      /* recalculate every time ScrollTrigger refreshes */
      ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: () => `+=${track.scrollWidth - outer.clientWidth}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.4,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -(track.scrollWidth - outer.clientWidth),
          ease: "none",
        }),
      });
    });
    return () => ctx.revert();
  }, []);

  /* SERVICES horizontal scroll — DESKTOP only */
  useEffect(() => {
    if (isMobile()) return;
    if (!svcOuter.current || !svcTrack.current) return;
    const track = svcTrack.current;
    const outer = svcOuter.current;
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outer,
        start: "top top",
        end: () => `+=${track.scrollWidth - outer.clientWidth}`,
        pin: true,
        anticipatePin: 1,
        scrub: 1.2,
        invalidateOnRefresh: true,
        animation: gsap.to(track, {
          x: () => -(track.scrollWidth - outer.clientWidth),
          ease: "none",
        }),
      });
    });
    return () => ctx.revert();
  }, []);

  /* generic fade-up */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".gsap-up").forEach(el => {
        gsap.from(el,{y:44,opacity:0,duration:0.9,ease:"power2.out",scrollTrigger:{trigger:el,start:"top 84%"}});
      });
    });
    return () => ctx.revert();
  }, []);

  /* section nav highlight */
  useEffect(() => {
    const ids=["hero","work","services","about","process","contact"];
    const obs=ids.map(id=>{
      const el=document.getElementById(id); if(!el)return null;
      const o=new IntersectionObserver(([e])=>{if(e.isIntersecting)setActive(id);},{threshold:0.2});
      o.observe(el); return o;
    });
    return ()=>obs.forEach(o=>o?.disconnect());
  }, []);

  /* lock body scroll when mobile menu open */
  useEffect(()=>{
    document.body.style.overflow = mobileMenu ? "hidden" : "";
    return ()=>{ document.body.style.overflow=""; };
  },[mobileMenu]);

  const go=(id:string)=>{
    setMobileMenu(false);
    setTimeout(()=>document.getElementById(id)?.scrollIntoView({behavior:"smooth"}),mobileMenu?320:0);
  };

  return (
    <>
      {/* ═══════════════════════════════════════
          MOBILE MENU OVERLAY
      ═══════════════════════════════════════ */}
      <div style={{
        position:"fixed", inset:0, background:P.dark, zIndex:1100,
        display:"flex", flexDirection:"column", justifyContent:"center",
        padding:"3rem 2rem",
        clipPath: mobileMenu?"inset(0 0 0% 0)":"inset(0 0 100% 0)",
        transition:"clip-path 0.5s cubic-bezier(0.77,0,0.175,1)",
        pointerEvents: mobileMenu?"all":"none",
      }}>
        <button onClick={()=>setMobileMenu(false)} style={{ position:"absolute",top:"1.5rem",right:"1.5rem",background:"none",border:"none",cursor:"pointer",color:"rgba(255,255,255,0.5)",fontSize:"1.4rem",lineHeight:1 }}>✕</button>
        <div style={{ display:"flex",alignItems:"center",gap:10,marginBottom:"3rem" }}>
          <DiamondLogo size={26} accent={P.accent}/>
          <span style={{ fontSize:"1rem",fontWeight:800,color:"#fff" }}>Idea<span style={{ color:P.gold }}>Shapers</span></span>
        </div>
        {["Work","Services","About","Process","Contact"].map((item,i)=>(
          <button key={item} onClick={()=>go(item.toLowerCase())} style={{
            background:"none", border:"none", cursor:"pointer", fontFamily:"'Playfair Display',Georgia,serif",
            fontSize:"clamp(2rem,7vw,2.8rem)", fontWeight:400, color: i===0?"#fff":"rgba(255,255,255,0.65)",
            textAlign:"left", padding:"0.6rem 0", borderBottom:"1px solid rgba(255,255,255,0.07)",
            letterSpacing:"-0.01em",
            opacity:mobileMenu?1:0, transform:mobileMenu?"translateY(0)":"translateY(20px)",
            transition:`opacity 0.4s ease ${i*0.06+0.1}s, transform 0.4s ease ${i*0.06+0.1}s`,
          }}>{item}</button>
        ))}
        <div style={{ marginTop:"2.5rem" }}>
          <a href="mailto:hello@ideashapers.org" style={{ fontSize:"0.8rem",color:"rgba(255,255,255,0.35)",textDecoration:"none" }}>hello@ideashapers.org</a>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          BOTTOM NAV
          Desktop: logo + links + CTA
          Mobile:  logo + burger only
      ═══════════════════════════════════════ */}
      <nav className="bnav-tube">
        {/* Logo */}
        <button onClick={()=>go("hero")} className="bnav-logo">
          <DiamondLogo size={22} accent={P.accent}/>
          <span className="bnav-logo-text">Idea<span style={{color:P.gold}}>Shapers</span></span>
        </button>

        {/* Desktop nav links */}
        <span className="bnav-divider desktop-only"/>
        <span className="bnav-links desktop-only">
          {["Work","Services","About","Process"].map(item=>{
            const id=item.toLowerCase(), isAct=active===id;
            return <button key={item} onClick={()=>go(id)} className={`bnav-item${isAct?" act":""}`}>{item}</button>;
          })}
        </span>
        <button onClick={()=>go("contact")} className="bnav-cta-btn desktop-only">Start a Project</button>

        {/* Mobile burger */}
        <button className="bnav-burger mobile-only" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Menu">
          <span style={{ display:"block",width:18,height:1.5,background:"#fff",borderRadius:1,transition:"all 0.25s",transform:mobileMenu?"rotate(45deg) translateY(3px)":"none" }}/>
          <span style={{ display:"block",width:18,height:1.5,background:"#fff",borderRadius:1,transition:"all 0.25s",opacity:mobileMenu?0:1 }}/>
          <span style={{ display:"block",width:18,height:1.5,background:"#fff",borderRadius:1,transition:"all 0.25s",transform:mobileMenu?"rotate(-45deg) translateY(-3px)":"none" }}/>
        </button>
      </nav>

      <WAWidget/>

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section id="hero" ref={heroRef} style={{ background:P.cream, position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"4rem clamp(1.25rem,5vw,3rem) 8rem", overflow:"hidden", textAlign:"center" }}>
        <div ref={blob1Ref} style={{ position:"absolute",width:620,height:620,borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(circle,rgba(196,98,42,0.14) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",willChange:"transform" }}/>
        <div ref={blob2Ref} style={{ position:"absolute",width:340,height:340,borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(circle,rgba(201,150,58,0.12) 0%,transparent 70%)",top:"18%",right:"10%",willChange:"transform" }}/>
        <div ref={blob3Ref} style={{ position:"absolute",width:260,height:260,borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(circle,rgba(44,16,8,0.07) 0%,transparent 70%)",bottom:"18%",left:"7%",willChange:"transform" }}/>

        <div className="hero-sub" style={{ marginBottom:"1.75rem" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:10,background:"rgba(44,16,8,0.06)",padding:"8px 18px 8px 10px",borderRadius:999,border:`1px solid ${P.border}` }}>
            <DiamondLogo size={18} accent={P.accent}/>
            <span style={{ fontSize:"0.7rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:P.dark3 }}>IdeaShapers Digital Studio</span>
          </div>
        </div>

        <h1 style={{ fontSize:"clamp(2.2rem,5.5vw,6.2rem)",fontWeight:400,lineHeight:1.07,color:P.text,maxWidth:960,marginBottom:"1.75rem" }}>
          <span className="hero-line" style={{ display:"block" }}>We build <em style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",color:P.dark }}>brands</em> and</span>
          <span className="hero-line" style={{ display:"block" }}><em style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",color:P.accent }}>digital experiences</em></span>
          <span className="hero-line" style={{ display:"block" }}>the world can&apos;t ignore.</span>
        </h1>

        <p className="hero-sub" style={{ fontSize:"1rem",color:P.muted,lineHeight:1.75,maxWidth:480,marginBottom:"2.5rem" }}>
          Strategy-first studio for founders, creators, and innovators. We turn your vision into a digital presence that makes people stop and act.
        </p>

        <div className="hero-btns" style={{ display:"flex",gap:"0.85rem",alignItems:"center",justifyContent:"center",flexWrap:"wrap" }}>
          <Mag><PillBtn onClick={()=>go("work")}>View Our Work</PillBtn></Mag>
          <Mag><ArrowBtn onClick={()=>go("services")}>Our Services</ArrowBtn></Mag>
        </div>

        <div className="hero-stats" style={{ display:"flex",gap:"2.5rem",marginTop:"4rem",paddingTop:"2.5rem",borderTop:`1px solid ${P.border}`,flexWrap:"wrap",justifyContent:"center" }}>
          {[["150+","Projects"],["98%","Satisfaction"],["6 yrs","Experience"],["40+","Industries"]].map(([n,l])=>(
            <div key={l} style={{ textAlign:"center" }}>
              <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"2.2rem",color:P.accent,letterSpacing:"-0.02em",lineHeight:1 }}>{n}</div>
              <div style={{ fontSize:"0.6rem",letterSpacing:"0.16em",textTransform:"uppercase",color:P.muted,marginTop:6 }}>{l}</div>
            </div>
          ))}
        </div>

        <div style={{ position:"absolute",bottom:"5rem",left:"50%",transform:"translateX(-50%)",display:"flex",flexDirection:"column",alignItems:"center",gap:6,opacity:0.28 }}>
          <div style={{ width:1,height:48,background:P.text }}/>
          <span style={{ fontSize:"0.55rem",letterSpacing:"0.2em",textTransform:"uppercase",color:P.text }}>scroll</span>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          WORK
          Desktop: GSAP pinned horizontal scroll
          Mobile:  normal vertical stack
      ═══════════════════════════════════════ */}
      <div id="work" ref={workOuter} className="hscroll-outer" style={{ background:P.cream2 }}>
        <div className="hscroll-inner">
          <div className="hscroll-header">
            <div>
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"0.75rem" }}>Selected Work</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:P.text,lineHeight:1.1 }}>
                Projects that moved <em style={{ color:P.accent }}>the needle</em>
              </h2>
            </div>
            <p className="desktop-only" style={{ fontSize:"0.75rem",color:P.muted,letterSpacing:"0.06em",flexShrink:0 }}>← Scroll to explore →</p>
          </div>
          <div ref={workTrack} className="hscroll-track">
            {WORK.map((w,i)=><WorkCard key={w.title} w={w} i={i}/>)}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════ */}
      <div id="services" ref={svcOuter} className="hscroll-outer" style={{ background:P.cream }}>
        <div className="hscroll-inner">
          <div className="hscroll-header">
            <div>
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"0.75rem" }}>What We Do</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:P.text,lineHeight:1.1 }}>
                Services built for <em style={{ color:P.accent }}>your ambition</em>
              </h2>
            </div>
            <p className="desktop-only" style={{ fontSize:"0.75rem",color:P.muted,letterSpacing:"0.06em",flexShrink:0 }}>← Scroll to explore →</p>
          </div>
          <div ref={svcTrack} className="hscroll-track">
            {SERVICES.map(svc=>(
              <div key={svc.n} className="svc-card-item"
                onMouseEnter={e=>{e.currentTarget.style.borderColor=P.accent;e.currentTarget.style.boxShadow="0 12px 40px rgba(44,16,8,0.1)";e.currentTarget.style.transform="translateY(-4px)";}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=P.border;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="translateY(0)";}}
              >
                <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start" }}>
                  <span style={{ fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.18em",color:P.muted }}>{svc.n}</span>
                  <DiamondLogo size={28} accent={P.accent}/>
                </div>
                <div>
                  <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.3rem",fontWeight:400,color:P.text,marginBottom:"0.65rem" }}>{svc.title}</h3>
                  <p style={{ fontSize:"0.82rem",color:P.muted,lineHeight:1.75 }}>{svc.desc}</p>
                </div>
                <div style={{ marginTop:"auto" }}>
                  <p style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:P.text,marginBottom:"0.55rem" }}>Includes</p>
                  <ul style={{ listStyle:"none",display:"flex",flexDirection:"column",gap:5 }}>
                    {svc.items.map(it=>(
                      <li key={it} style={{ display:"flex",alignItems:"center",gap:8,fontSize:"0.8rem",color:P.muted }}>
                        <span style={{ width:4,height:4,borderRadius:"50%",background:P.accent,flexShrink:0 }}/>{it}
                      </li>
                    ))}
                  </ul>
                </div>
                <Mag><PillBtn onClick={()=>go("contact")} style={{ fontSize:"0.7rem",padding:"9px 18px" }}>Get started →</PillBtn></Mag>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ABOUT US
      ═══════════════════════════════════════ */}
      <section id="about" style={{ background:P.dark, position:"relative", overflow:"hidden" }}>
        <div style={{ padding:"clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem) clamp(3rem,5vw,5rem)", maxWidth:1440, margin:"0 auto" }}>
          <div className="about-grid">
            <div className="gsap-up">
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"1.25rem" }}>Our Story</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(2rem,4vw,4rem)",fontWeight:400,color:"#fff",lineHeight:1.1,marginBottom:"2rem" }}>
                We shape ideas for founders who <em style={{ color:P.gold }}>refuse to be invisible.</em>
              </h2>
              <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.55)",lineHeight:1.9,marginBottom:"1.25rem",maxWidth:460 }}>
                IdeaShapers was founded in 2018 by designers and strategists who were tired of watching brilliant founders go unnoticed because of weak branding and forgettable websites.
              </p>
              <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.55)",lineHeight:1.9,marginBottom:"2.5rem",maxWidth:460 }}>
                The gap between a founder&apos;s vision and their audience&apos;s understanding is almost always a design problem. We close that gap — with strategy, craft, and an obsessive attention to what actually moves people.
              </p>
              <Mag><PillBtn white onClick={()=>go("process")}>How We Work →</PillBtn></Mag>
            </div>
            <div className="gsap-up" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1px",background:"rgba(255,255,255,0.05)",alignSelf:"start" }}>
              {[
                { n:"01",h:"Strategy First",  b:"Every decision traces back to your goals. No guesswork — deliberate, purposeful design." },
                { n:"02",h:"Radical Honesty", b:"We tell you what you need to hear. That's how we build things that actually work." },
                { n:"03",h:"Obsessive Craft", b:"The 1px detail. The perfect micro-animation. The headline that makes someone feel something." },
                { n:"04",h:"Founders First",  b:"We've worked with 150+ founders. We understand the stakes and treat your project like our own." },
              ].map(v=>(
                <div key={v.n} style={{ padding:"1.75rem",background:P.dark }}>
                  <span style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.18em",color:P.gold,display:"block",marginBottom:"0.75rem" }}>{v.n}</span>
                  <h3 style={{ fontSize:"0.85rem",fontWeight:700,color:"#fff",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:"0.5rem" }}>{v.h}</h3>
                  <p style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",lineHeight:1.7 }}>{v.b}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="gsap-up" style={{ maxWidth:1440,margin:"0 auto",padding:"0 clamp(1.25rem,5vw,3rem) clamp(3rem,5vw,4rem)" }}>
          <div className="about-stats">
            {[["150+","Projects Delivered"],["98%","Client Satisfaction"],["6 yrs","Studio Experience"],["40+","Industries Served"]].map(([n,l],i)=>(
              <div key={l} style={{ textAlign:"center",borderRight:i<3?"1px solid rgba(255,255,255,0.06)":"none",padding:"2rem 1rem" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"2.5rem",color:P.gold,letterSpacing:"-0.02em",lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:"0.6rem",letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginTop:8 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)",padding:"clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem) clamp(4rem,8vw,7rem)" }}>
          <div style={{ maxWidth:1440,margin:"0 auto" }}>
            <div className="gsap-up" style={{ marginBottom:"3rem" }}>
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"0.75rem" }}>The People</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,3.5vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.1 }}>
                Meet the team <em style={{ color:P.gold }}>behind the work</em>
              </h2>
            </div>
            <div className="team-grid">
              {TEAM.map(member=>(
                <div key={member.name} className="gsap-up team-card">
                  <div style={{ position:"relative",marginBottom:"1.5rem" }}>
                    <div style={{ width:68,height:68,borderRadius:"50%",background:`${member.color}22`,border:`2px solid ${member.color}44`,display:"flex",alignItems:"center",justifyContent:"center" }}>
                      <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.3rem",fontWeight:400,color:member.color }}>{member.initials}</span>
                    </div>
                    <div style={{ position:"absolute",top:2,right:"calc(100% - 68px - 2px)",width:8,height:8,borderRadius:"50%",background:member.color }}/>
                  </div>
                  <span style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:member.color,display:"block",marginBottom:"0.4rem" }}>{member.role}</span>
                  <h3 style={{ fontSize:"1.1rem",fontWeight:600,color:"#fff",marginBottom:"0.65rem",letterSpacing:"-0.01em" }}>{member.name}</h3>
                  <p style={{ fontSize:"0.8rem",color:"rgba(255,255,255,0.42)",lineHeight:1.75 }}>{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PROCESS
      ═══════════════════════════════════════ */}
      <section id="process" style={{ background:P.cream, position:"relative", padding:"clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ maxWidth:1440,margin:"0 auto" }} className="process-grid">
          <div className="gsap-up" style={{ position:"sticky",top:"8rem" }}>
            <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"1rem" }}>How We Work</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,3.5vw,3rem)",fontWeight:400,color:P.text,lineHeight:1.15,marginBottom:"1.5rem" }}>
              The IdeaShapers <em style={{ color:P.accent }}>Way</em>
            </h2>
            <p style={{ fontSize:"0.88rem",color:P.muted,lineHeight:1.8,marginBottom:"2rem" }}>
              A proven 5-step framework refined across 150+ projects. Clear, thorough, and built entirely around your goals.
            </p>
            <Mag><PillBtn onClick={()=>go("contact")}>Work With Us</PillBtn></Mag>
          </div>
          <div>
            {PROCESS.map(p=>(
              <div key={p.n} className="gsap-up process-row">
                <div style={{ width:40,height:40,borderRadius:"50%",background:`${P.accent}15`,border:`1.5px solid ${P.accent}35`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <span style={{ fontSize:"0.6rem",fontWeight:800,letterSpacing:"0.1em",color:P.accent }}>{p.n}</span>
                </div>
                <div>
                  <h3 style={{ fontSize:"1.1rem",fontWeight:500,color:P.text,marginBottom:"0.5rem" }}>{p.title}</h3>
                  <p style={{ fontSize:"0.83rem",color:P.muted,lineHeight:1.75 }}>{p.desc}</p>
                </div>
                <span className="process-time">{p.time}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MARQUEE
      ═══════════════════════════════════════ */}
      <div style={{ background:P.dark,padding:"1rem 0",overflow:"hidden" }}>
        <div style={{ overflow:"hidden",whiteSpace:"nowrap" }}>
          <div style={{ display:"inline-flex",animation:"mq 26s linear infinite" }}>
            {[...Array(2)].flatMap((_,gi)=>
              ["Brand Strategy","Web Design","Development","Content","Growth Marketing","Visual Identity","UX Research","Copywriting","Conversion"].map((t,i)=>(
                <span key={`${gi}-${t}`} style={{ fontSize:"0.65rem",fontWeight:600,letterSpacing:"0.2em",textTransform:"uppercase",color:i%4===0?P.gold:"rgba(255,255,255,0.22)",padding:"0 2.5rem",borderRight:"1px solid rgba(255,255,255,0.05)",whiteSpace:"nowrap" }}>{t}</span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          TESTIMONIALS — minimal person card
          Big name, photo circle, role, short quote
      ═══════════════════════════════════════ */}
      <section style={{ background:P.cream3, padding:"clamp(4rem,8vw,8rem) 0", overflow:"hidden" }}>
        <div style={{ maxWidth:1440,margin:"0 auto clamp(2.5rem,4vw,4rem)",padding:"0 clamp(1.25rem,5vw,3rem)" }}>
          <p className="gsap-up" style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"0.75rem" }}>What Clients Say</p>
          <h2 className="gsap-up" style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:P.text,lineHeight:1.1 }}>
            Real results, <em style={{ color:P.accent }}>real people</em>
          </h2>
        </div>
        <div
          style={{ overflow:"hidden" }}
          onMouseEnter={e=>{const t=e.currentTarget.querySelector<HTMLElement>(".testi-track");if(t)t.style.animationPlayState="paused";}}
          onMouseLeave={e=>{const t=e.currentTarget.querySelector<HTMLElement>(".testi-track");if(t)t.style.animationPlayState="running";}}
        >
          <div className="testi-track" style={{ display:"inline-flex",gap:"1.5rem",animation:"testiScroll 38s linear infinite",willChange:"transform",padding:"0.5rem 0 1rem clamp(1.25rem,5vw,3rem)" }}>
            {[...TESTIMONIALS,...TESTIMONIALS].map((t,i)=><TestiCard key={i} t={t}/>)}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section id="faq" style={{ background:P.cream2, position:"relative", padding:"clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div className="gsap-up faq-header">
            <div>
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"0.75rem" }}>Frequently Asked</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:P.text,lineHeight:1.1 }}>
                Questions we <em style={{ color:P.accent }}>hear often</em>
              </h2>
            </div>
            <Mag><PillBtn onClick={()=>go("contact")}>Still have questions?</PillBtn></Mag>
          </div>
          {FAQS.map((faq,i)=><FAQItem key={i} q={faq.q} a={faq.a}/>)}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════ */}
      <section id="contact" style={{ background:P.dark2, position:"relative", padding:"clamp(4rem,8vw,8rem) clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ maxWidth:1440,margin:"0 auto" }} className="contact-grid">
          <div className="gsap-up">
            <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"1.5rem" }}>Let&apos;s Build Together</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.2rem,5vw,5rem)",fontWeight:400,color:"#fff",lineHeight:1.0,marginBottom:"1.5rem" }}>
              <span style={{ color:P.gold }}>Start</span> your<br/>project today
            </h2>
            <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.5)",lineHeight:1.85,maxWidth:360,marginBottom:"2.5rem" }}>
              We take on a limited number of projects each quarter. Q3 2026 slots are open — reach out now before they fill.
            </p>
            {[["Email","hello@ideashapers.org"],["WhatsApp","Chat with us instantly"],["Response Time","Within 24 hours"],["Availability","Q3 2026 — slots open"]].map(([l,v])=>(
              <div key={l} style={{ marginBottom:"1.25rem" }}>
                <p style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:4 }}>{l}</p>
                <p style={{ fontSize:"0.88rem",color:"#fff" }}>{v}</p>
              </div>
            ))}
          </div>
          <ContactForm/>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer style={{ background:P.dark }}>
        <div style={{ borderBottom:"1px solid rgba(255,255,255,0.06)",padding:"clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ maxWidth:1440,margin:"0 auto" }} className="footer-nl-grid">
            <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"clamp(1.8rem,4vw,4rem)",color:P.gold,lineHeight:1.05 }}>News from<br/>IdeaShapers</h3>
            <div>
              <p style={{ fontSize:"0.85rem",color:"rgba(255,255,255,0.4)",marginBottom:"1.5rem",lineHeight:1.75 }}>Strategy tips, design insights, and studio updates — 4 or 5 times a year. No spam, ever.</p>
              <NLForm/>
              <div style={{ display:"flex",gap:"1.5rem",marginTop:"1.5rem",flexWrap:"wrap" }}>
                {["Instagram","LinkedIn","Twitter","Behance"].map(s=>(
                  <a key={s} href="#" style={{ fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.12em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",textDecoration:"none",transition:"color 0.2s" }}
                    onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                    onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.28)")}
                  >{s}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div style={{ maxWidth:1440,margin:"0 auto",padding:"clamp(2.5rem,5vw,3.5rem) clamp(1.25rem,5vw,3rem)" }} className="footer-links-grid">
          <div>
            <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:"1rem" }}>
              <DiamondLogo size={20} accent={P.accent}/>
              <span style={{ fontSize:"0.85rem",fontWeight:800,color:"#fff",letterSpacing:"-0.01em" }}>Idea<span style={{ color:P.gold }}>Shapers</span></span>
            </div>
            <p style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.28)",lineHeight:1.75,maxWidth:200 }}>Strategy-first digital studio for founders and creators worldwide.</p>
          </div>
          {[
            { h:"Services", ls:["Brand Strategy","Web Design","Development","Content","Growth"] },
            { h:"Work",     ls:["Case Studies","Brand Projects","Web Projects","One-Pagers"] },
            { h:"Studio",   ls:["About Us","Process","Values","Team"] },
            { h:"Info",     ls:["FAQs","Start a Project","Refer a Friend","Privacy"] },
          ].map(col=>(
            <div key={col.h}>
              <p style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"#fff",marginBottom:"1rem" }}>{col.h}</p>
              {col.ls.map(l=>(
                <a key={l} href="#" style={{ display:"block",fontSize:"0.78rem",color:"rgba(255,255,255,0.32)",textDecoration:"none",marginBottom:"0.5rem",transition:"color 0.2s" }}
                  onMouseEnter={e=>(e.currentTarget.style.color="#fff")}
                  onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,0.32)")}
                >{l}</a>
              ))}
            </div>
          ))}
        </div>
        <div style={{ maxWidth:1440,margin:"0 auto",padding:"1.25rem clamp(1.25rem,5vw,3rem)",borderTop:"1px solid rgba(255,255,255,0.05)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:"0.75rem" }}>
          <p style={{ fontSize:"0.65rem",color:"rgba(255,255,255,0.18)" }}>© 2026 IdeaShapers. All rights reserved.</p>
          <div style={{ display:"flex",gap:"1.5rem" }}>
            {["Privacy","Terms","Imprint"].map(l=>(
              <a key={l} href="#" style={{ fontSize:"0.65rem",color:"rgba(255,255,255,0.18)",textDecoration:"none" }}>{l}</a>
            ))}
          </div>
        </div>
      </footer>

      {/* ════════════════════════════════════════
          GLOBAL CSS
      ════════════════════════════════════════ */}
      <style>{`
        /* ── keyframes ── */
        @keyframes mq          { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes waPulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.2)} }
        @keyframes waSlide     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes testiScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }

        /* ── bottom nav ── */
        .bnav-tube       { position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:999;display:flex;align-items:center;gap:2px;background:${P.dark};border-radius:999px;padding:4px 4px 4px 6px;box-shadow:0 12px 48px rgba(44,16,8,0.55),0 4px 12px rgba(0,0,0,0.25);white-space:nowrap; }
        .bnav-logo       { display:flex;align-items:center;gap:8px;background:none;border:none;cursor:pointer;padding:5px 12px 5px 6px;border-radius:999px;transition:background 0.2s;font-size:0.82rem;font-weight:800;letter-spacing:-0.01em;color:#fff;font-family:inherit; }
        .bnav-logo:hover { background:rgba(255,255,255,0.07); }
        .bnav-divider    { display:block;width:1px;height:18px;background:rgba(255,255,255,0.08);margin:0 2px;flex-shrink:0; }
        .bnav-links      { display:flex;align-items:center;gap:2px; }
        .bnav-item       { padding:8px 14px;border-radius:999px;border:none;cursor:pointer;font-family:inherit;background:transparent;color:rgba(255,255,255,0.5);font-size:0.78rem;font-weight:500;transition:all 0.2s; }
        .bnav-item:hover,.bnav-item.act { color:#fff; }
        .bnav-item.act   { background:rgba(255,255,255,0.12); }
        .bnav-cta-btn    { padding:8px 18px;border-radius:999px;border:none;cursor:pointer;font-family:inherit;margin-left:2px;background:${P.accent};color:#fff;font-size:0.78rem;font-weight:700;letter-spacing:0.02em;transition:background 0.2s;box-shadow:0 2px 10px rgba(196,98,42,0.4); }
        .bnav-cta-btn:hover { background:${P.accent2}; }
        .bnav-burger     { display:none;flex-direction:column;gap:4px;background:none;border:none;cursor:pointer;padding:8px 10px;border-radius:999px;transition:background 0.2s; }
        .bnav-burger:hover { background:rgba(255,255,255,0.08); }

        /* ── wa ── */
        .wa-float { position:fixed;right:1.5rem;bottom:5.5rem;z-index:998;display:flex;flex-direction:column;align-items:flex-end;gap:0.75rem; }
        .wa-btn   { width:52px;height:52px;border-radius:50%;background:#25d366;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.5);transition:transform 0.2s,box-shadow 0.2s;position:relative; }
        .wa-btn:hover { transform:scale(1.1);box-shadow:0 6px 28px rgba(37,211,102,0.65); }
        .wa-btn::after { content:'';position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(37,211,102,0.4);animation:waPulse 2s ease-in-out infinite; }

        /* ── horizontal scroll sections (desktop) ── */
        .hscroll-outer  { height:100vh;overflow:hidden; }
        .hscroll-inner  { height:100vh;display:flex;flex-direction:column;justify-content:center;padding:0 clamp(1.25rem,5vw,3rem); }
        .hscroll-header { display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:2.5rem;flex-shrink:0;gap:1rem; }
        .hscroll-track  { display:flex;gap:1.25rem;width:max-content;padding-right:3rem; }

        /* ── service card ── */
        .svc-card-item { width:340px;flex-shrink:0;background:#fff;border-radius:16px;padding:2rem;border:1px solid ${P.border};display:flex;flex-direction:column;gap:1.1rem;min-height:370px;transition:border-color 0.25s,box-shadow 0.25s,transform 0.25s; }

        /* ── layout grids ── */
        .about-grid        { display:grid;grid-template-columns:1fr 1fr;gap:clamp(3rem,7vw,7rem);align-items:start; }
        .about-stats       { display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid rgba(255,255,255,0.08); }
        .team-grid         { display:grid;grid-template-columns:repeat(4,1fr);gap:1.5rem; }
        .process-grid      { display:grid;grid-template-columns:320px 1fr;gap:5rem;align-items:start; }
        .process-row       { display:grid;grid-template-columns:52px 1fr auto;gap:1.5rem;padding:2rem 0;border-bottom:1px solid ${P.border};align-items:start; }
        .process-time      { font-size:0.58rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${P.muted};background:${P.dark}08;padding:5px 10px;border-radius:999px;white-space:nowrap;margin-top:3px; }
        .contact-grid      { display:grid;grid-template-columns:1fr 1fr;gap:6rem;align-items:start; }
        .footer-nl-grid    { display:grid;grid-template-columns:1fr 1fr;gap:4rem;align-items:center; }
        .footer-links-grid { display:grid;grid-template-columns:1.8fr repeat(4,1fr);gap:2.5rem; }
        .faq-header        { display:flex;justify-content:space-between;align-items:flex-end;flex-wrap:wrap;gap:1.5rem;margin-bottom:3.5rem; }
        .team-card         { background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:1.75rem;transition:border-color 0.25s,background 0.25s,transform 0.25s; }
        .team-card:hover   { border-color:rgba(255,255,255,0.14);background:rgba(255,255,255,0.05);transform:translateY(-4px); }
        .form-row          { display:grid;grid-template-columns:1fr 1fr;gap:1rem; }
        .desktop-only      { display:flex; }
        .mobile-only       { display:none; }

        /* ═══════════════════════════════
           MOBILE ≤ 900px
        ═══════════════════════════════ */
        @media (max-width: 900px) {
          .desktop-only { display:none !important; }
          .mobile-only  { display:flex !important; }

          /* bottom nav — logo + burger only */
          .bnav-tube    { bottom:1rem;left:50%;transform:translateX(-50%);padding:5px 5px 5px 8px;gap:4px; }
          .bnav-logo-text { display:none; }
          .bnav-burger  { display:flex; }

          /* wa — move above bottom nav */
          .wa-float { bottom:4.5rem;right:1rem; }
          .wa-btn   { width:44px;height:44px; }

          /* horizontal scroll → native touch scroll */
          .hscroll-outer  { height:auto !important;overflow:visible !important; }
          .hscroll-inner  { height:auto !important;padding:3rem 0 !important; }
          .hscroll-header { padding:0 1.25rem;margin-bottom:1.5rem !important; }
          .hscroll-track  { width:100% !important;overflow-x:auto;padding:0 1.25rem 1rem !important;
                            scroll-snap-type:x mandatory;-webkit-overflow-scrolling:touch;
                            scrollbar-width:none;gap:1rem; }
          .hscroll-track::-webkit-scrollbar { display:none; }
          /* work cards fill most of screen width on mobile */
          .hscroll-track > * { scroll-snap-align:start; }

          /* grids → single col */
          .about-grid        { grid-template-columns:1fr !important;gap:2.5rem !important; }
          .about-stats       { grid-template-columns:repeat(2,1fr) !important; }
          .team-grid         { grid-template-columns:1fr 1fr !important;gap:1rem !important; }
          .process-grid      { grid-template-columns:1fr !important;gap:1.5rem !important; }
          .process-grid > div:first-child { position:static !important; }
          .process-row       { grid-template-columns:44px 1fr;gap:1rem; }
          .process-time      { display:none; }
          .contact-grid      { grid-template-columns:1fr !important;gap:2.5rem !important; }
          .footer-nl-grid    { grid-template-columns:1fr !important;gap:2rem !important; }
          .footer-links-grid { grid-template-columns:1fr 1fr !important;gap:1.5rem !important; }
          .form-row          { grid-template-columns:1fr !important; }
          .team-card         { padding:1.25rem; }
          .svc-card-item     { width:min(84vw,320px) !important; }

          /* work cards on mobile */
          #work .hscroll-track > div,
          #work .hscroll-track > * { width:min(84vw,340px) !important;height:400px !important; }
        }

        @media (max-width: 560px) {
          .team-grid         { grid-template-columns:1fr !important; }
          .about-stats       { grid-template-columns:1fr 1fr !important; }
          .footer-links-grid { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   WORK CARD
───────────────────────────────────────────── */
function WorkCard({ w, i }: { w: typeof WORK[number]; i: number }) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      width:380, flexShrink:0, height:480, borderRadius:20, overflow:"hidden",
      position:"relative", cursor:"pointer", background:w.color,
      border:"1px solid rgba(255,255,255,0.06)",
      transition:"transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94),box-shadow 0.4s",
      transform:hov?"translateY(-8px) scale(1.01)":"translateY(0) scale(1)",
      boxShadow:hov?`0 32px 64px rgba(0,0,0,0.4),0 0 0 1px ${w.accent}33`:"0 8px 32px rgba(0,0,0,0.2)",
    }}>
      {/* accent top bar */}
      <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${w.accent},transparent)` }}/>
      {/* ghost number */}
      <div style={{ position:"absolute",top:"0.75rem",right:"1.25rem",fontFamily:"'Playfair Display',Georgia,serif",fontSize:"6rem",fontWeight:700,lineHeight:1,color:"rgba(255,255,255,0.04)",pointerEvents:"none",userSelect:"none",letterSpacing:"-0.04em" }}>0{i+1}</div>
      {/* tag */}
      <div style={{ position:"absolute",top:"1.5rem",left:"1.5rem",zIndex:2 }}>
        <span style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:w.accent,background:`${w.accent}18`,border:`1px solid ${w.accent}44`,padding:"5px 12px",borderRadius:999 }}>{w.tag}</span>
      </div>
      {/* arrow */}
      <div style={{ position:"absolute",top:"1.5rem",right:"1.5rem",width:34,height:34,borderRadius:"50%",background:hov?w.accent:"rgba(255,255,255,0.08)",border:`1px solid ${hov?w.accent:"rgba(255,255,255,0.12)"}`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:"0.88rem",transform:hov?"rotate(45deg)":"rotate(0deg)",transition:"all 0.3s",zIndex:2 }}>→</div>
      {/* diagonal lines */}
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",opacity:0.04 }}>
        {[...Array(8)].map((_,li)=><div key={li} style={{ position:"absolute",top:`${li*14-10}%`,left:"-20%",width:"140%",height:"1px",background:"#fff",transform:"rotate(-12deg)" }}/>)}
      </div>
      {/* content */}
      <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"2rem",zIndex:2 }}>
        <span style={{ fontSize:"0.56rem",fontWeight:600,letterSpacing:"0.14em",color:"rgba(255,255,255,0.3)",display:"block",marginBottom:"0.5rem" }}>{w.year}</span>
        <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.7rem",fontWeight:400,color:"#fff",lineHeight:1.15,marginBottom:"1.25rem",letterSpacing:"-0.01em" }}>{w.title}</h3>
        <div style={{ display:"flex",alignItems:"center",gap:"0.65rem",padding:"0.75rem 1rem",background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,transform:hov?"translateY(0)":"translateY(6px)",opacity:hov?1:0,transition:"transform 0.35s,opacity 0.35s" }}>
          <span style={{ width:5,height:5,borderRadius:"50%",background:w.accent,flexShrink:0 }}/>
          <span style={{ fontSize:"0.76rem",color:"rgba(255,255,255,0.75)",lineHeight:1.4 }}>{w.result}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   TESTIMONIAL CARD — minimal: avatar + name + role + short quote
───────────────────────────────────────────── */
function TestiCard({ t }: { t: typeof TESTIMONIALS[number] }) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} style={{
      width:280, flexShrink:0,
      background:"#fff",
      borderRadius:20,
      padding:"2rem 1.75rem",
      display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center",
      gap:"1rem",
      border:`1px solid ${hov?t.color+"55":P.border}`,
      boxShadow:hov?`0 20px 48px rgba(44,16,8,0.1)`:"0 2px 12px rgba(44,16,8,0.05)",
      transition:"border-color 0.3s,box-shadow 0.3s,transform 0.3s",
      transform:hov?"translateY(-6px)":"translateY(0)",
      cursor:"default",
    }}>
      {/* Avatar circle with initials */}
      <div style={{ position:"relative" }}>
        <div style={{
          width:72, height:72, borderRadius:"50%",
          background:`linear-gradient(135deg, ${t.color}33, ${t.color}11)`,
          border:`2.5px solid ${t.color}`,
          display:"flex", alignItems:"center", justifyContent:"center",
          transition:"transform 0.3s",
          transform:hov?"scale(1.06)":"scale(1)",
        }}>
          <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.5rem",fontWeight:400,color:t.color,letterSpacing:"-0.02em" }}>{t.initials}</span>
        </div>
        {/* online dot */}
        <div style={{ position:"absolute",bottom:2,right:2,width:12,height:12,borderRadius:"50%",background:t.color,border:"2px solid #fff" }}/>
      </div>

      {/* Name */}
      <div>
        <p style={{ fontSize:"1rem",fontWeight:700,color:P.text,marginBottom:"0.2rem",letterSpacing:"-0.01em" }}>{t.name}</p>
        <p style={{ fontSize:"0.7rem",color:P.muted,letterSpacing:"0.02em" }}>{t.role}</p>
      </div>

      {/* Accent divider */}
      <div style={{ width:32,height:2,borderRadius:999,background:t.color,opacity:0.6 }}/>

      {/* Short quote */}
      <p style={{ fontSize:"0.85rem",color:P.text,lineHeight:1.65,fontStyle:"italic",fontFamily:"'Playfair Display',Georgia,serif" }}>
        &ldquo;{t.quote}&rdquo;
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   FAQ ACCORDION
───────────────────────────────────────────── */
function FAQItem({ q, a }: { q:string; a:string }) {
  const [open,setOpen]=useState(false);
  return (
    <div style={{ borderBottom:`1px solid ${P.border}`,overflow:"hidden" }}>
      <button onClick={()=>setOpen(!open)} style={{ width:"100%",display:"flex",alignItems:"center",justifyContent:"space-between",padding:"1.75rem 0",background:"none",border:"none",cursor:"pointer",fontFamily:"inherit",textAlign:"left",gap:"1rem" }}>
        <span style={{ fontSize:"1rem",fontWeight:500,color:P.text,lineHeight:1.4 }}>{q}</span>
        <span style={{ width:34,height:34,borderRadius:"50%",flexShrink:0,background:open?P.dark:"rgba(44,16,8,0.06)",border:`1.5px solid ${open?P.dark:P.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:open?"#fff":P.muted,fontSize:"1.1rem",lineHeight:1,transition:"all 0.3s",transform:open?"rotate(45deg)":"rotate(0deg)" }}>+</span>
      </button>
      <div style={{ maxHeight:open?300:0,overflow:"hidden",transition:"max-height 0.45s cubic-bezier(0.4,0,0.2,1)" }}>
        <p style={{ fontSize:"0.9rem",color:P.muted,lineHeight:1.85,paddingBottom:"1.75rem",maxWidth:780 }}>{a}</p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
function ContactForm() {
  const [form,setForm]=useState({name:"",email:"",service:"",msg:""});
  const [sent,setSent]=useState(false);
  const inp:React.CSSProperties={ width:"100%",padding:"0.95rem 1.15rem",background:"rgba(255,255,255,0.05)",border:"1px solid rgba(255,255,255,0.1)",borderRadius:10,color:"#fff",fontSize:"0.9rem",outline:"none",transition:"border-color 0.2s,background 0.2s",fontFamily:"inherit" };
  if(sent)return(
    <div style={{ padding:"3.5rem",border:"1px solid rgba(201,150,58,0.3)",borderRadius:20,textAlign:"center",background:"rgba(255,255,255,0.03)" }}>
      <DiamondLogo size={44} accent={P.gold}/>
      <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"1.7rem",color:P.gold,margin:"1.25rem 0 0.75rem" }}>We&apos;ve got it.</p>
      <p style={{ fontSize:"0.83rem",color:"rgba(255,255,255,0.4)",lineHeight:1.75 }}>Expect a reply within 24 hours. We&apos;re already thinking about your project.</p>
    </div>
  );
  return(
    <form className="gsap-up" onSubmit={e=>{e.preventDefault();setSent(true);}} style={{ background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.08)",borderRadius:20,padding:"2.5rem",display:"flex",flexDirection:"column",gap:"1.4rem" }}>
      <div className="form-row">
        <div>
          <label style={{ display:"block",fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.32)",marginBottom:"0.5rem" }}>Full Name *</label>
          <input type="text" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required placeholder="Jane Smith" style={inp} onFocus={e=>{e.target.style.borderColor=P.gold;e.target.style.background="rgba(255,255,255,0.08)";}} onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";e.target.style.background="rgba(255,255,255,0.05)";}}/>
        </div>
        <div>
          <label style={{ display:"block",fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.32)",marginBottom:"0.5rem" }}>Email Address *</label>
          <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required placeholder="jane@company.com" style={inp} onFocus={e=>{e.target.style.borderColor=P.gold;e.target.style.background="rgba(255,255,255,0.08)";}} onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";e.target.style.background="rgba(255,255,255,0.05)";}}/>
        </div>
      </div>
      <div>
        <label style={{ display:"block",fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.32)",marginBottom:"0.6rem" }}>What do you need?</label>
        <div style={{ display:"flex",gap:"0.5rem",flexWrap:"wrap" }}>
          {["Brand Strategy","Web Design","Full Project","Not Sure Yet"].map(s=>(
            <button key={s} type="button" onClick={()=>setForm({...form,service:s})} style={{ padding:"7px 16px",borderRadius:999,fontFamily:"inherit",fontSize:"0.75rem",fontWeight:600,cursor:"pointer",background:form.service===s?P.gold:"rgba(255,255,255,0.06)",color:form.service===s?P.dark:"rgba(255,255,255,0.5)",border:`1px solid ${form.service===s?P.gold:"rgba(255,255,255,0.1)"}`,transition:"all 0.2s" }}>{s}</button>
          ))}
        </div>
      </div>
      <div>
        <label style={{ display:"block",fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.32)",marginBottom:"0.5rem" }}>Tell us about your project *</label>
        <textarea value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} required rows={5} placeholder="What are you building? What's the goal? What's not working right now?" style={{...inp,resize:"vertical",lineHeight:1.7}} onFocus={e=>{e.target.style.borderColor=P.gold;e.target.style.background="rgba(255,255,255,0.08)";}} onBlur={e=>{e.target.style.borderColor="rgba(255,255,255,0.1)";e.target.style.background="rgba(255,255,255,0.05)";}}/>
      </div>
      <Mag><PillBtn white>Send It →</PillBtn></Mag>
    </form>
  );
}

/* ─────────────────────────────────────────────
   NEWSLETTER FORM
───────────────────────────────────────────── */
function NLForm() {
  const [em,setEm]=useState(""), [done,setDone]=useState(false);
  if(done)return<div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",border:"1px solid rgba(201,150,58,0.4)",borderRadius:999,color:P.gold,fontSize:"0.82rem",fontWeight:600 }}>✓ You&apos;re in — thanks!</div>;
  return(
    <form onSubmit={e=>{e.preventDefault();setDone(true);}} style={{ display:"flex",maxWidth:400 }}>
      <input type="email" value={em} onChange={e=>setEm(e.target.value)} placeholder="your@email.com" required style={{ flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRight:"none",outline:"none",padding:"11px 16px",color:"#fff",fontSize:"0.83rem",borderRadius:"999px 0 0 999px",fontFamily:"inherit" }}/>
      <button type="submit" style={{ background:P.accent,color:"#fff",border:"none",padding:"11px 22px",fontWeight:700,fontSize:"0.76rem",cursor:"pointer",borderRadius:"0 999px 999px 0",whiteSpace:"nowrap",fontFamily:"inherit",transition:"background 0.2s" }} onMouseEnter={e=>(e.currentTarget.style.background=P.accent2)} onMouseLeave={e=>(e.currentTarget.style.background=P.accent)}>Subscribe</button>
    </form>
  );
}
