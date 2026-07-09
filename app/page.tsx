"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const P = {
  /* backgrounds — white replacing beige */
  cream:   "#ffffff",
  cream2:  "#f8f9fc",
  cream3:  "#eef0f7",
  /* maroon darks — unchanged */
  dark:    "#2c1008",
  dark2:   "#4a1e0e",
  dark3:   "#6b2d14",
  accent:  "#c4622a",
  accent2: "#d97b3f",
  /* navy blue — from logo "I" */
  navy:    "#1e2f6e",
  navy2:   "#2d3d8a",
  navyL:   "#3d52a8",
  /* maroon — replaces gold accent on light backgrounds */
  maroon:  "#7a1f2b",
  maroon2: "#9c2c3a",
  /* text / ui */
  text:    "#141414",
  muted:   "#6b7280",
  border:  "rgba(30,47,110,0.1)",
};

const WORK_DOMAINS = ["All","Brand & Identity","Web Development","Growth & Strategy","Influencer & Events"];

const WORK = [
  { title:"VisionCraft Labs",  domain:"Brand & Identity",    tag:"Brand + Web",         year:"2025", result:"Closed 2 enterprise deals within 60 days", accent:P.navy,
    desc:"A full identity overhaul and conversion-ready website for an early-stage SaaS founder." },
  { title:"Pulse Creative",    domain:"Growth & Strategy",   tag:"Strategy + Design",   year:"2025", result:"Conversion rate doubled in 30 days",       accent:P.accent,
    desc:"A sharper story and clearer funnel for a boutique creative agency going global." },
  { title:"Meridian Studio",   domain:"Web Development",     tag:"Full Website",        year:"2026", result:"3× organic traffic in first quarter",      accent:P.navyL,
    desc:"A fast, considered digital home for an architectural photography studio." },
  { title:"NorthStar",         domain:"Growth & Strategy",   tag:"Growth + One Pager",  year:"2025", result:"Raised seed round 2 weeks post launch",    accent:P.maroon,
    desc:"One focused one-pager and growth plan that won a freelance educator collective its funding." },
  { title:"Flux Agency",       domain:"Web Development",     tag:"Website + Growth",    year:"2025", result:"40% revenue growth quarter after launch",  accent:P.accent2,
    desc:"A rebuilt site, content engine, and growth loop for a fast-scaling digital agency." },
  { title:"Sable & Co.",       domain:"Brand & Identity",    tag:"Brand + Web",         year:"2025", result:"Brand recognition up 65% in 6 months",     accent:P.maroon2,
    desc:"Premium brand, site, and social positioning for a luxury styling service entering a new market." },
  { title:"Lumen & Co",        domain:"Influencer & Events", tag:"Influencer + Events", year:"2025", result:"12M reach across 3 launch activations",    accent:P.navyL,
    desc:"Creator casting and on-ground event production for a D2C beauty brand's market entry." },
];

const SERVICES = [
  { n:"01", title:"Brand Strategy",            desc:"We uncover what makes you unmissable — positioning, messaging, and a voice that cuts through the noise.",                                     items:["Brand Audit","Positioning Framework","Messaging System","Voice & Tone"] },
  { n:"02", title:"Web / App Development",     desc:"Conversion-focused websites and apps built for humans. Pixel-perfect design, clean Next.js code — every screen, every interaction, built to last.", items:["UX Research","Visual Design","Next.js / React","GSAP Animations","CMS Integration","Core Web Vitals"] },
  { n:"03", title:"Content Creation",          desc:"Copy and creative that earns attention, builds trust, and gives people a genuine reason to care.",                                           items:["Copywriting","Art Direction","Campaign Concepts","Brand Storytelling"] },
  { n:"04", title:"Growth Marketing",          desc:"Systematic, data-driven strategies to put your offer in front of the right people at the exact right moment.",                              items:["Launch Strategy","SEO","Paid Advertising","Analytics"] },
  { n:"05", title:"Influencer Management",     desc:"End-to-end influencer campaigns — from creator matchmaking to performance analytics — engineered to drive real reach and real results.",     items:["Campaign Strategy","Creator Matchmaking","Content Production","Performance Analytics","Brand Promotions","Paid Amplification"] },
];

const PROCESS = [
  { n:"01", title:"Discovery",       time:"Week 1",   desc:"Deep dive into your brand, goals, audience, and competitive landscape. We leave knowing the exact story that needs to be told." },
  { n:"02", title:"Strategy",        time:"Week 1–2", desc:"Sitemap, messaging, information architecture, and conversion strategy. The blueprint governing every design decision." },
  { n:"03", title:"Design",          time:"Week 2–4", desc:"Visual systems that capture your brand's full weight. Desktop and mobile designed simultaneously, iterated until exactly right." },
  { n:"04", title:"Development",     time:"Week 4–6", desc:"Clean, fast, accessible Next.js code. Every animation and interaction built to spec and optimised for performance." },
  { n:"05", title:"Launch + Growth", time:"Ongoing",  desc:"30 days post launch support. We're with you through the critical first month — and beyond if you want us." },
];

const TESTIMONIALS = [
  { name:"James Kim",    role:"Founder, VisionCraft Labs",   initials:"JK", color:"#ffffff", quote:"IdeaShapers turned our brand into a deal closing machine." },
  { name:"Sara Okafor",  role:"CEO, Pulse Creative",         initials:"SO", color:"#c4622a", quote:"Our conversion rate doubled in the first month after launch." },
  { name:"Marcus Reid",  role:"Co founder, Meridian Studio",  initials:"MR", color:"#8ab4c2", quote:"Beyond what we imagined. Delivered in 5 weeks, no compromises." },
  { name:"Priya Nair",   role:"Founder, NorthStar",          initials:"PN", color:"#ffffff", quote:"Raised our seed round two weeks after going live. Coincidence? No." },
  { name:"Tom Ellsworth",role:"Director, Flux Agency",       initials:"TE", color:"#d97b3f", quote:"Revenue up 40% the quarter after launch. They build businesses." },
  { name:"Ana Souza",    role:"CEO, Bloom Studio",           initials:"AS", color:"#a8c5b5", quote:"Finally a studio that listens first and designs second." },
];

const TEAM = [
  { name:"Aryan Mehta",  role:"Creative Director", bio:"10 years crafting brand identities for startups and Fortune 500s. Obsessed with the gap between good and iconic.", initials:"AM", color:"#c4622a" },
  { name:"Zara Patel",   role:"Head of Strategy",  bio:"Ex-McKinsey. Spent 8 years helping companies find their unfair advantage. Now she does it through design.",       initials:"ZP", color:"#ffffff" },
  { name:"Leo Fontaine", role:"Lead Developer",    bio:"Built products used by millions. Believes great code is invisible — you only notice it when it's gone.",         initials:"LF", color:"#8ab4c2" },
  { name:"Maya Osei",    role:"UX & Content Lead", bio:"Former journalist turned UX researcher. Writes copy that converts and designs flows that delight.",               initials:"MO", color:"#d97b3f" },
];

const FAQS = [
  { q:"How long does a typical project take?",  a:"Most brand + web projects run 5–8 weeks from kickoff to launch. Smaller engagements like one pagers or brand only work typically land in 2–4 weeks. We'll give you a precise timeline in your discovery call." },
  { q:"What does the process look like?",        a:"We work in five phases: Discovery, Strategy, Design, Development, and Launch + Growth. You're involved at each stage — we don't disappear for weeks and surprise you with a finished product." },
  { q:"Do you work with early stage founders?",  a:"Absolutely. Many of our best projects started with founders who had a vision but no brand yet. We love helping you build from the ground up — it's where we have the most creative impact." },
  { q:"What's included after launch?",           a:"Every project includes 30 days of post launch support. We're with you through the critical first month to iron out anything unexpected. Extended retainer support is available if you want us ongoing." },
  { q:"Can you work with our existing brand?",   a:"Yes. We can work within your existing brand guidelines, evolve them, or start fresh — whatever your goals demand. We'll advise on what makes the most strategic sense after our discovery session." },
  { q:"How do we get started?",                  a:"Hit 'Start a Project' and fill in the contact form. We'll get back to you within 24 hours to schedule a free 30 minute discovery call. No commitment, no pressure — just a conversation." },
];

const WA_PRESETS = [
  "Hi IdeaShapers! I'd like to start a new project.",
  "I need a brand strategy and website — can we talk?",
  "I want to know more about your services.",
  "Can I book a free discovery call?",
];

/* ── clients ── */
const CLIENTS = [
  { name:"Vedanta Group",         cat:"Mining & Resources"   },
  { name:"Emami Limited",         cat:"FMCG"                 },
  { name:"ITC Hotels",            cat:"Hospitality"          },
  { name:"Surya Nepal",           cat:"Consumer Goods"       },
  { name:"Kolkata Knight Riders", cat:"Sports & Entertainment"},
  { name:"Haldiram's",            cat:"Food & Beverage"      },
  { name:"WB Tourism",            cat:"Government"           },
  { name:"Bikano Snacks",         cat:"FMCG"                 },
  { name:"ATK Mohun Bagan",       cat:"Football Club"        },
  { name:"Inox Group",            cat:"Entertainment"        },
  { name:"Apeejay Group",         cat:"Hospitality"          },
  { name:"Merlin Group",          cat:"Real Estate"          },
];

const CLIENT_LOGOS = [
  { src:"/777restro.jpg",        name:"777 Restro & Bar"   },
  { src:"/bluesky.jpg",          name:"Bluesky Education"  },
  { src:"/dentlife.png",         name:"Dent Life"          },
  { src:"/premiumliqour.png",    name:"Premium Liquor"     },
  { src:"/silvermoon.jpg",       name:"Silver Moon"        },
  { src:"/thesmileclinic.png",   name:"The Smile Clinique" },
  { src:"/umafoods.png",         name:"Uma Foods"          },
  { src:"/urbanplatters.png",    name:"Urban Platter"      },
];

/* ── influencer services ── */
const INFL_SERVICES = [
  { n:"01", title:"Campaign Strategy",     desc:"End to end campaign planning aligned with your brand goals, KPIs, and timeline." },
  { n:"02", title:"Creator Matchmaking",   desc:"Nano to celebrity — we connect you with creators whose audiences trust them." },
  { n:"03", title:"Content Production",    desc:"Platform native content that stops the scroll and drives real action." },
  { n:"04", title:"Performance Analytics", desc:"Live dashboards tracking reach, engagement, conversions, and brand sentiment." },
  { n:"05", title:"Brand Promotions",      desc:"Product launches and activations engineered to create cultural moments." },
  { n:"06", title:"Paid Amplification",    desc:"Boost winning organic content with precision targeted paid strategies." },
];

/* ── event gallery ── */
const EVENTS_DATA = [
  { title:"Fashion Week",      type:"Fashion & Lifestyle",   year:"2024", bg:"linear-gradient(145deg,#1a0a18 0%,#2d1040 100%)", accent:"#ffffff" },
  { title:"TEDx Kolkata",      type:"Conference & Summit",   year:"2024", bg:"linear-gradient(145deg,#060d18 0%,#0d1a30 100%)", accent:"#3d52a8" },
  { title:"Music Festival",    type:"Entertainment",         year:"2025", bg:"linear-gradient(145deg,#180408 0%,#2c0810 100%)", accent:"#c4622a" },
  { title:"Corporate Summit",  type:"Business",              year:"2025", bg:"linear-gradient(145deg,#040a08 0%,#081814 100%)", accent:"#2d8a6a" },
  { title:"Gala Award Night",  type:"Gala & Ceremony",       year:"2024", bg:"linear-gradient(145deg,#100a00 0%,#201800 100%)", accent:"#ffffff" },
  { title:"Product Launch",    type:"Brand Activation",      year:"2025", bg:"linear-gradient(145deg,#020618 0%,#040c28 100%)", accent:"#3d52a8" },
];

/* ── real contact data ── */
const CONTACT = {
  email:     "info@ideashapers.org",
  phone1:    "+91 70771 02829",
  phone2:    "+91 99037 37067",
  whatsapp:  "+919903737067",
  location:  "Kolkata, India",
  instagram: "https://www.instagram.com/idea.shapers",
  linkedin:  "https://www.linkedin.com/in/ideashapers",
  facebook:  "https://www.facebook.com/ideashapers.official",
};

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
      <span style={{ width:28,height:28,borderRadius:"50%",border:`1.5px solid ${light?"rgba(255,255,255,0.35)":P.border}`,display:"flex",alignItems:"center",justifyContent:"center",background:hov?(light?"#fff":P.dark):"transparent",color:hov?(light?P.dark:"#fff"):(light?"rgba(255,255,255,0.6)":P.muted),transform:hov?"rotate(45deg)":"rotate(0deg)",transition:"all 0.25s" }}><svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden><path d="M3 10L10 3M10 3H5M10 3V8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
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
  const send=(text:string)=>window.open(`https://wa.me/919903737067?text=${encodeURIComponent(text)}`,"_blank");
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
                onMouseEnter={e=>{e.currentTarget.style.background=P.cream3;e.currentTarget.style.borderColor=P.navy;}}
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
  const [active,   setActive]   = useState("hero");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [workFilter, setWorkFilter] = useState("All");
  const [activeProject, setActiveProject] = useState<typeof WORK[number] | null>(null);

  /* hero entrance */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ delay:0.1 })
        .from(".hero-line",  { y:80,opacity:0,duration:1.2,stagger:0.12,ease:"power3.out" })
        .from(".hero-sub",   { y:20,opacity:0,duration:1.0,ease:"power2.out" }, "-=0.6")
        .from(".hero-btns",  { y:20,opacity:0,duration:1.0,ease:"power2.out" }, "-=0.7");
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
    const ids=["hero","work","services","about","process","influencer","faq","contact"];
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
    const doScroll=()=>{
      const el=document.getElementById(id);
      if(!el)return;
      /* offsetTop traversal gives absolute doc position regardless of
         scroll state or GSAP pin transforms */
      let top=0;
      let cur:HTMLElement|null=el;
      while(cur&&cur!==document.body){top+=cur.offsetTop;cur=cur.offsetParent as HTMLElement|null;}
      window.scrollTo({top:Math.max(0,top),behavior:"smooth"});
    };
    if(mobileMenu){setTimeout(doScroll,320);}else{doScroll();}
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
        <div style={{ marginBottom:"3rem" }}>
          <Image src="/logo.png" alt="IdeaShapers" width={72} height={72} style={{ objectFit:"contain", filter:"brightness(0) invert(1)" }}/>
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
          <a href="mailto:info@ideashapers.org" style={{ fontSize:"0.8rem",color:"rgba(255,255,255,0.35)",textDecoration:"none" }}>info@ideashapers.org</a>
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
          <Image src="/logo.png" alt="IdeaShapers" width={52} height={52} style={{ objectFit:"contain" }}/>
        </button>

        {/* Desktop nav links */}
        <span className="bnav-divider desktop-only"/>
        <span className="bnav-links desktop-only">
          {["Work","Services","About","FAQ","Contact"].map(item=>{
            const id=item.toLowerCase(), isAct=active===id;
            return <button key={item} onClick={()=>go(id)} className={`bnav-item${isAct?" act":""}`}>{item}</button>;
          })}
        </span>
        <button onClick={()=>go("contact")} className="bnav-cta-btn desktop-only">Start a Project</button>

        {/* Mobile burger */}
        <button className="bnav-burger mobile-only" onClick={()=>setMobileMenu(!mobileMenu)} aria-label="Menu">
          <span style={{ display:"block",width:18,height:1.5,background:P.navy,borderRadius:1,transition:"all 0.25s",transform:mobileMenu?"rotate(45deg) translateY(3px)":"none" }}/>
          <span style={{ display:"block",width:18,height:1.5,background:P.navy,borderRadius:1,transition:"all 0.25s",opacity:mobileMenu?0:1 }}/>
          <span style={{ display:"block",width:18,height:1.5,background:P.navy,borderRadius:1,transition:"all 0.25s",transform:mobileMenu?"rotate(-45deg) translateY(-3px)":"none" }}/>
        </button>
      </nav>

      <WAWidget/>

      {activeProject && <ProjectModal project={activeProject} onClose={()=>setActiveProject(null)} go={go}/>}

      {/* ═══════════════════════════════════════
          HERO
      ═══════════════════════════════════════ */}
      <section id="hero" ref={heroRef} style={{ background:P.cream, position:"relative", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"clamp(30px,7vw,100px) clamp(1.25rem,5vw,3rem) 0", overflow:"hidden", textAlign:"center" }}>
        <div ref={blob1Ref} style={{ position:"absolute",width:620,height:620,borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(circle,rgba(196,98,42,0.14) 0%,transparent 70%)",top:"50%",left:"50%",transform:"translate(-50%,-50%)",willChange:"transform" }}/>
        <div ref={blob2Ref} style={{ position:"absolute",width:340,height:340,borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(circle,rgba(122,31,43,0.12) 0%,transparent 70%)",top:"18%",right:"10%",willChange:"transform" }}/>
        <div ref={blob3Ref} style={{ position:"absolute",width:260,height:260,borderRadius:"50%",pointerEvents:"none",background:"radial-gradient(circle,rgba(44,16,8,0.07) 0%,transparent 70%)",bottom:"18%",left:"7%",willChange:"transform" }}/>

        {/* Logo — brand anchor, centred and prominent */}
        <div className="hero-sub" style={{ marginBottom:"2.5rem" }}>
          <Image src="/logo.png" alt="IdeaShapers" width={150} height={150} style={{ objectFit:"contain" }}/>
        </div>

        {/* Headline — the brand statement */}
        <h1 style={{ fontSize:"clamp(2.2rem,4.6vw,5.4rem)",fontWeight:400,lineHeight:1.1,color:P.text,maxWidth:960,marginBottom:"1.75rem" }}>
          <span className="hero-line" style={{ display:"block" }}>
            We build{" "}<em style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",color:P.dark }}>Brands</em>{" "}and
          </span>
          <span className="hero-line" style={{ display:"block" }}>
            <em style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",color:P.navy }}>Digital Experiences</em>
          </span>
          <span className="hero-line" style={{ display:"block" }}>
            the world can&apos;t ignore.
          </span>
        </h1>

        <p className="hero-sub" style={{ fontSize:"1rem",color:P.muted,lineHeight:1.75,maxWidth:480,marginBottom:"2.5rem" }}>
          Strategy first studio for founders, creators, and innovators. We turn your vision into a digital presence that makes people stop and act.
        </p>

        <div className="hero-btns" style={{ display:"flex",gap:"0.85rem",alignItems:"center",justifyContent:"center",flexWrap:"wrap" }}>
          <Mag><PillBtn onClick={()=>go("work")}>View Our Work</PillBtn></Mag>
          <Mag><ArrowBtn onClick={()=>go("services")}>Our Services</ArrowBtn></Mag>
        </div>

        {/* Clients marquee — below buttons, clears fixed nav with paddingBottom */}
        <div className="hero-marquee-wrap" style={{ width:"100%", marginTop:"1.5rem", paddingBottom:"calc(1.5rem + 88px)" }}>
          <p style={{ textAlign:"center",fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.28em",textTransform:"uppercase",color:P.muted,marginBottom:"1rem",opacity:0.6 }}>Trusted by leading brands</p>
          <HeroClientsMarquee/>
        </div>

      </section>

      {/* ═══════════════════════════════════════
          INFLUENCER MANAGEMENT — big wow section
      ═══════════════════════════════════════ */}
      <InfluencerSection go={go}/>

      {/* ═══════════════════════════════════════
          WORK — domain-filtered project carousel
          steps one card at a time via edge arrows
      ═══════════════════════════════════════ */}
      <section id="work" style={{ background:P.cream2, padding:"clamp(4rem,9vw,7rem) 0" }}>
        <div style={{ maxWidth:1440, margin:"0 auto", padding:"0 clamp(1.25rem,5vw,3rem)" }}>

          <div className="gsap-up" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1rem",marginBottom:"2rem" }}>
            <div>
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"0.75rem" }}>Selected Work</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:P.text,lineHeight:1.1 }}>
                Projects that moved <em style={{ color:P.navy }}>the needle</em>
              </h2>
            </div>
          </div>

          {/* Domain filter tabs */}
          <div className="gsap-up" style={{ display:"flex",gap:"0.5rem",flexWrap:"wrap",marginBottom:"2.5rem" }}>
            {WORK_DOMAINS.map(d=>{
              const isAct = workFilter===d;
              return (
                <button key={d} onClick={()=>setWorkFilter(d)} style={{
                  padding:"0.5rem 1.1rem",borderRadius:999,fontFamily:"inherit",fontSize:"0.72rem",fontWeight:600,letterSpacing:"0.04em",
                  cursor:"pointer",transition:"all 0.2s",
                  background:isAct?P.navy:"transparent",
                  color:isAct?"#ffffff":P.muted,
                  border:`1px solid ${isAct?P.navy:P.border}`,
                }}>{d}</button>
              );
            })}
          </div>

          <WorkCarousel projects={WORK.filter(w=>workFilter==="All"||w.domain===workFilter)} onOpen={setActiveProject}/>

        </div>
      </section>

      {/* ═══════════════════════════════════════
          SERVICES
      ═══════════════════════════════════════ */}
      <section id="services" style={{ background:P.cream, padding:"clamp(4rem,9vw,7rem) clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ maxWidth:1320, margin:"0 auto" }}>
          <div style={{ marginBottom:"clamp(2.5rem,6vw,4rem)" }}>
            <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"0.75rem" }}>What We Do</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:P.text,lineHeight:1.1 }}>
              Services built for <em style={{ color:P.navy }}>your ambition</em>
            </h2>
          </div>
          <ServicesList services={SERVICES} onOpen={()=>go("contact")} />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT US
      ═══════════════════════════════════════ */}
      <section id="about" style={{ background:P.dark, position:"relative", overflow:"hidden" }}>
        <div style={{ padding:"clamp(30px,7vw,100px) clamp(1.25rem,5vw,3rem)", maxWidth:1440, margin:"0 auto" }}>
          <div className="about-grid">
            <div className="gsap-up">
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"1.25rem" }}>Our Story</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(2rem,4vw,4rem)",fontWeight:400,color:"#fff",lineHeight:1.1,marginBottom:"2rem" }}>
                We shape ideas for founders who <em style={{ color:"#ffffff" }}>refuse to be invisible.</em>
              </h2>
              <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.55)",lineHeight:1.9,marginBottom:"1.25rem",maxWidth:560 }}>
                IdeaShapers was founded in 2018 by designers and strategists who were tired of watching brilliant founders go unnoticed because of weak branding and forgettable websites.
              </p>
              <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.55)",lineHeight:1.9,marginBottom:"2.5rem",maxWidth:560 }}>
                The gap between a founder&apos;s vision and their audience&apos;s understanding is almost always a design problem. We close that gap — with strategy, craft, and an obsessive attention to what actually moves people.
              </p>
              <Mag><PillBtn white onClick={()=>go("process")}>How We Work →</PillBtn></Mag>
            </div>
            <div style={{ display:"flex",flexDirection:"column",gap:"1px" }}>
              <div className="gsap-up" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1px",background:"rgba(255,255,255,0.05)",alignSelf:"start" }}>
                {[
                  { n:"01",h:"Client-Centric Approach",     b:"We put your business goals first. Every decision is driven by what genuinely serves your clients and moves your brand forward." },
                  { n:"02",h:"Creative Excellence",         b:"We don't settle for good — we push for exceptional. Bold ideas, refined execution, and work that makes people stop and notice." },
                  { n:"03",h:"Data-Driven Strategy",        b:"Every move we make is backed by insights. We combine creative instinct with real data so your brand decisions are always informed." },
                  { n:"04",h:"End-to-End Execution",        b:"From the first idea to final launch — and beyond. We handle every phase so you never have to stitch together a fragmented team." },
                  { n:"05",h:"Transparent Collaboration",   b:"You're always in the loop. Clear timelines, honest feedback, and open communication from kickoff to delivery." },
                  { n:"06",h:"Results That Matter",         b:"Vanity metrics don't interest us. We're obsessed with outcomes — leads, conversions, reach — the numbers that actually grow your business." },
                ].map(v=>(
                  <div key={v.n} style={{ padding:"1.75rem",background:P.dark }}>
                    <span style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.18em",color:"#ffffff",display:"block",marginBottom:"0.75rem" }}>{v.n}</span>
                    <h3 style={{ fontSize:"0.85rem",fontWeight:700,color:"#fff",textTransform:"uppercase",letterSpacing:"0.04em",marginBottom:"0.5rem" }}>{v.h}</h3>
                    <p style={{ fontSize:"0.78rem",color:"rgba(255,255,255,0.4)",lineHeight:1.7 }}>{v.b}</p>
                  </div>
                ))}
              </div>
              <div className="gsap-up about-stats">
                {[["20+","Projects Delivered"],["98%","Client Satisfaction"],["40+","Industries Served"]].map(([n,l],i)=>(
                  <div key={l} style={{ textAlign:"center",borderRight:i<2?"1px solid rgba(255,255,255,0.06)":"none",padding:"1.5rem 1rem",background:P.dark }}>
                    <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"2rem",color:"#ffffff",letterSpacing:"-0.02em",lineHeight:1 }}>{n}</div>
                    <div style={{ fontSize:"0.58rem",letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginTop:8 }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", padding:"clamp(30px,7vw,100px) clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ maxWidth:1440,margin:"0 auto" }}>
            <div className="gsap-up" style={{ marginBottom:"3rem" }}>
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"0.75rem" }}>The People</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,3.5vw,3rem)",fontWeight:400,color:"#fff",lineHeight:1.1 }}>
                Meet the team <em style={{ color:"#ffffff" }}>behind the work</em>
              </h2>
            </div>
            <div className="team-grid">
              {TEAM.map(member=>(
                <div key={member.name} className="gsap-up team-card">
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
      <section id="process" style={{ background:P.cream, position:"relative", padding:"clamp(30px,7vw,100px) clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ maxWidth:1440,margin:"0 auto" }} className="process-grid">
          <div className="gsap-up" style={{ position:"sticky",top:"8rem" }}>
            <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"1rem" }}>How We Work</p>
            <h2 style={{ fontSize:"clamp(1.8rem,3.5vw,3rem)",fontWeight:400,color:P.text,lineHeight:1.15,marginBottom:"1.5rem" }}>
              <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",letterSpacing:"-0.01em" }}>The IdeaShapers</span>{" "}
              <em style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",color:P.navy }}>Way</em>
            </h2>
            <p style={{ fontSize:"0.88rem",color:P.muted,lineHeight:1.8,marginBottom:"2rem" }}>
              A proven 5-step framework refined across 150+ projects. Clear, thorough, and built entirely around your goals.
            </p>
            <Mag><PillBtn onClick={()=>go("contact")}>Work With Us</PillBtn></Mag>
          </div>
          <div>
            {PROCESS.map(p=>(
              <div key={p.n} className="gsap-up process-row">
                <div style={{ width:40,height:40,borderRadius:"50%",background:`${P.navy}15`,border:`1.5px solid ${P.navy}44`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
                  <span style={{ fontSize:"0.6rem",fontWeight:800,letterSpacing:"0.1em",color:P.navy }}>{p.n}</span>
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
      <div style={{ background:P.dark,padding:"1.25rem 0",overflow:"hidden" }}>
        <div style={{ overflow:"hidden",whiteSpace:"nowrap" }}>
          <div style={{ display:"inline-flex",animation:"mq 26s linear infinite" }}>
            {[...Array(2)].flatMap((_,gi)=>
              ["Brand Strategy","Web / App Development","Content Creation","Growth Marketing","Visual Identity","UX Research","Influencer Management","Brand Storytelling","Conversion","Brand Activities","Product Launch"].map((t,i)=>(
                <span key={`${gi}-${t}`} style={{ fontSize:"0.85rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#ffffff",padding:"0 2.5rem",borderRight:"1px solid rgba(255,255,255,0.08)",whiteSpace:"nowrap" }}>{t}</span>
              ))
            )}
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          TESTIMONIALS — minimal person card
          Big name, photo circle, role, short quote
      ═══════════════════════════════════════ */}
      <section style={{ background:P.cream3, padding:"clamp(30px,7vw,100px) 0", overflow:"hidden" }}>
        <div style={{ maxWidth:1440,margin:"0 auto clamp(2.5rem,4vw,4rem)",padding:"0 clamp(1.25rem,5vw,3rem)" }}>
          <p className="gsap-up" style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"0.75rem" }}>What Clients Say</p>
          <h2 className="gsap-up" style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:P.text,lineHeight:1.1 }}>
            Real results, <em style={{ color:P.navy }}>real people</em>
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
          EVENT GALLERY — card game fan
      ═══════════════════════════════════════ */}
      <EventGallery/>

      {/* ═══════════════════════════════════════
          FAQ
      ═══════════════════════════════════════ */}
      <section id="faq" style={{ background:P.cream2, position:"relative", padding:"clamp(30px,7vw,100px) clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ maxWidth:1100,margin:"0 auto" }}>
          <div className="gsap-up faq-header">
            <div>
              <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:P.muted,marginBottom:"0.75rem" }}>Frequently Asked</p>
              <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:P.text,lineHeight:1.1 }}>
                Questions we <em style={{ color:P.navy }}>hear often</em>
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
      <section id="contact" style={{ background:P.dark2, position:"relative", padding:"clamp(30px,7vw,100px) clamp(1.25rem,5vw,3rem)" }}>
        <div style={{ maxWidth:1440,margin:"0 auto" }} className="contact-grid">
          <div className="gsap-up">
            <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"1.5rem" }}>Let&apos;s Build Together</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"clamp(2.2rem,5vw,5rem)",fontWeight:400,color:"#fff",lineHeight:1.0,marginBottom:"1.5rem" }}>
              <span style={{ color:"#ffffff" }}>Start</span> your<br/>project today
            </h2>
            <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.5)",lineHeight:1.85,maxWidth:360,marginBottom:"2.5rem" }}>
              We take on a limited number of projects each quarter. Q3 2026 slots are open — reach out now before they fill.
            </p>
            <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.5rem 2.5rem" }}>
              {[
                ["Email",    "info@ideashapers.org"],
                ["Phone",    "+91 70771 02829, +91 75968 10148"],
                ["WhatsApp", "+91 99037 37067"],
                ["Location", "Kolkata, India"],
              ].map(([l,v])=>(
                <div key={l}>
                  <p style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:4 }}>{l}</p>
                  <p style={{ fontSize:"0.88rem",color:"#fff" }}>{v}</p>
                </div>
              ))}
            </div>
          </div>
          <ContactForm/>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      {/* ── Floating social icons — desktop right side ── */}
      <SocialFloat/>

      <footer style={{ background:P.dark }}>
        {/* ── Social bar ── */}
        <div style={{ borderBottom:"1px solid rgba(255,255,255,0.06)", padding:"2rem clamp(1.25rem,5vw,3rem)" }}>
          <div style={{ maxWidth:1440,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",gap:"1.5rem",flexWrap:"wrap" }}>
            <p style={{ fontSize:"0.72rem",fontWeight:600,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)" }}>Follow us</p>
            <div style={{ display:"flex",gap:"1rem",alignItems:"center" }}>
              {[
                { label:"Instagram", href:"https://www.instagram.com/idea.shapers?igsh=eXVtdTBrejR0YW44&utm_source=qr", icon:<IGIcon/>, color:"#ffffff" },
                { label:"LinkedIn",  href:"https://www.linkedin.com/company/ideashapers-india", icon:<LIIcon/>, color:P.navyL },
                { label:"Facebook",  href:CONTACT.facebook, icon:<FBIcon/>, color:P.navy2 },
              ].map(s=>(
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{
                  width:40,height:40,borderRadius:"50%",
                  background:"rgba(255,255,255,0.06)",
                  border:"1px solid rgba(255,255,255,0.1)",
                  display:"flex",alignItems:"center",justifyContent:"center",
                  color:"rgba(255,255,255,0.55)",
                  textDecoration:"none",transition:"all 0.25s",
                }}
                  onMouseEnter={e=>{ e.currentTarget.style.background=s.color; e.currentTarget.style.borderColor=s.color; e.currentTarget.style.color="#fff"; e.currentTarget.style.boxShadow=`0 4px 16px ${s.color}55`; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.55)"; e.currentTarget.style.boxShadow="none"; }}
                >{s.icon}</a>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth:1440,margin:"0 auto",padding:"clamp(3rem,6vw,5rem) clamp(1.25rem,5vw,3rem)" }} className="footer-links-grid">
          <div>
            <Image src="/logo.png" alt="IdeaShapers" width={100} height={100} style={{ objectFit:"contain", filter:"brightness(0) invert(1)", marginBottom:"1rem" }}/>
            <p style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.28)",lineHeight:1.75,maxWidth:220,marginBottom:"1rem" }}>Full-service marketing agency in Kolkata — brand building, creative marketing, and digital experiences.</p>
            <a href={`mailto:${CONTACT.email}`} style={{ fontSize:"0.75rem",color:`${P.navyL}`,display:"block",marginBottom:"0.35rem",textDecoration:"none" }}>{CONTACT.email}</a>
            <a href={`tel:${CONTACT.phone1.replace(/\s/g,"")}`} style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.38)",display:"block",textDecoration:"none" }}>{CONTACT.phone1}</a>
            <a href="tel:+917596810148" style={{ fontSize:"0.75rem",color:"rgba(255,255,255,0.38)",display:"block",textDecoration:"none" }}>+91 75968 10148</a>
          </div>
          {[
            { h:"Services", ls:["Brand Strategy","Web Design","Development","Content","Growth"] },
            { h:"Work",     ls:["Brand Projects","Web Projects","One Pagers"] },
            { h:"Studio",   ls:["About Us"] },
            { h:"Info",     ls:["FAQs","Start a Project"] },
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
        @keyframes mqRev       { 0%{transform:translateX(-50%)} 100%{transform:translateX(0)} }
        @keyframes waPulse     { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.35;transform:scale(1.2)} }
        @keyframes waSlide     { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes testiScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes evtMq       { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes rippleRing  { 0%{transform:scale(1);opacity:0.6} 100%{transform:scale(2.4);opacity:0} }
        @keyframes inflFloat   { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes inflPulse   { 0%,100%{opacity:0.06} 50%{opacity:0.1} }
        @keyframes spin        { 0%{transform:rotate(0deg)} 100%{transform:rotate(360deg)} }
        @keyframes svcPreviewIn { from{opacity:0;transform:translateY(calc(-50% + 10px)) scale(0.96)} to{opacity:1;transform:translateY(-50%) scale(1)} }
        @keyframes modalFade   { from{opacity:0} to{opacity:1} }
        @keyframes modalRise   { from{opacity:0;transform:translateY(28px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }
        @keyframes modalSlide  { from{opacity:0;transform:translateY(20px) scale(0.97)} to{opacity:1;transform:translateY(0) scale(1)} }

        /* ── social float (right side, desktop) ── */
        .social-float { position:fixed;right:1.25rem;top:50%;transform:translateY(-50%);z-index:997;display:flex;flex-direction:column;gap:0.6rem; }
        .social-icon  { width:42px;height:42px;border-radius:10px;display:flex;align-items:center;justify-content:center;text-decoration:none;transition:color 0.32s;position:relative;overflow:hidden; }
        .social-icon-fill { position:absolute;inset:0;border-radius:10px;transform:translateY(105%);transition:transform 0.36s cubic-bezier(0.76,0,0.24,1); }
        .social-icon:hover .social-icon-fill { transform:translateY(0); }
        .social-icon svg { position:relative;z-index:1; }

        /* ── influencer section ── */
        .infl-grid         { display:grid;grid-template-columns:1fr 1fr;gap:5rem;align-items:start;max-width:1440;margin:0 auto; }
        .infl-services     { display:grid;grid-template-columns:1fr 1fr;gap:1px;background:rgba(255,255,255,0.06); }
        .infl-stat         { text-align:center;padding:1.75rem 0.75rem;border-right:1px solid rgba(255,255,255,0.08); }
        .infl-stat:last-child { border-right:none; }
        .infl-stats-row    { display:grid;grid-template-columns:repeat(4,1fr); }
        .infl-profile-grid { display:grid;grid-template-columns:repeat(4,1fr);gap:1.25rem; }

        /* ── event gallery ── */
        .event-fan-outer   { position:relative;height:500px;display:flex;justify-content:center;align-items:flex-end;margin:3rem 0; }
        .event-card-fan    { position:absolute;bottom:0;width:240px;height:360px;border-radius:18px;overflow:hidden;cursor:pointer;transform-origin:50% 100%;transition:transform 0.65s cubic-bezier(0.34,1.2,0.64,1),box-shadow 0.3s,z-index 0s; }
        .event-mq-inner    { display:inline-flex;animation:evtMq 22s linear infinite; }

        @media (max-width:900px) {
          .social-float      { display:none; }
          .infl-grid         { grid-template-columns:1fr!important;gap:2.5rem!important; }
          .infl-stats-row    { grid-template-columns:1fr 1fr!important; }
          .infl-services     { grid-template-columns:1fr!important; }
          .infl-profile-grid { grid-template-columns:1fr 1fr!important;gap:1rem!important; }
          .event-fan-outer   { display:none!important; }
          .event-mobile      { display:flex!important; }
        }
        @media (max-width:560px) {
          .infl-profile-grid { grid-template-columns:1fr!important; }
        }
        @media (min-width:901px) {
          .event-mobile { display:none!important; }
        }

        /* ── bottom nav ── */
        .bnav-tube       { position:fixed;bottom:1.5rem;left:50%;transform:translateX(-50%);z-index:999;display:flex;align-items:center;gap:4px;background:rgba(255,255,255,0.92);border:1px solid ${P.border};border-radius:999px;padding:6px 8px;box-shadow:0 16px 56px rgba(30,47,110,0.16),0 4px 14px rgba(20,20,20,0.08);white-space:nowrap;backdrop-filter:blur(12px); }
        /* logo button */
        .bnav-logo       { display:flex;align-items:center;background:none;border:none;cursor:pointer;padding:4px 10px 4px 6px;border-radius:999px;transition:background 0.25s; }
        .bnav-logo:hover { background:${P.navy}0d; }
        /* vertical divider */
        .bnav-divider    { display:block;width:1px;height:22px;background:${P.border};margin:0 4px;flex-shrink:0; }
        /* nav links container */
        .bnav-links      { display:flex;align-items:center;gap:2px;padding:0 4px; }
        /* individual link — underline grows on hover */
        .bnav-item       { position:relative;padding:9px 18px;border-radius:8px;border:none;cursor:pointer;font-family:inherit;background:transparent;color:${P.muted};font-size:0.8rem;font-weight:500;letter-spacing:0.02em;transition:color 0.22s,background 0.22s; }
        .bnav-item::after {
          content:'';position:absolute;bottom:5px;left:18px;right:18px;height:8px;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 12' preserveAspectRatio='none'%3E%3Cpath d='M0,6 C10,0 20,12 30,6 C40,0 50,12 60,6 C70,0 80,12 90,6 C95,3 98,4 100,6' stroke='%231e2f6e' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E");
          background-repeat:no-repeat;background-position:center;background-size:100% 100%;
          transform:scaleX(0);transform-origin:right;
          opacity:0;transition:transform 0.45s cubic-bezier(.25,1,.5,1),opacity 0.3s;
        }
        .bnav-item:hover { color:${P.navy}; }
        .bnav-item:hover::after { transform:scaleX(1);transform-origin:left;opacity:1; }
        .bnav-item.act   { color:${P.navy}; }
        .bnav-item.act::after { transform:scaleX(1);transform-origin:left;opacity:1; }
        /* CTA button — pill with gradient & shimmer */
        .bnav-cta-btn    { position:relative;overflow:hidden;padding:9px 22px;border-radius:999px;border:none;cursor:pointer;font-family:inherit;margin-left:4px;background:linear-gradient(135deg,${P.navy} 0%,${P.navy2} 100%);color:#fff;font-size:0.8rem;font-weight:700;letter-spacing:0.04em;transition:transform 0.2s,box-shadow 0.2s;box-shadow:0 4px 18px rgba(30,47,110,0.35); }
        .bnav-cta-btn::before { content:'';position:absolute;top:0;left:-100%;width:60%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent);transition:left 0.45s ease; }
        .bnav-cta-btn:hover { transform:translateY(-1px);box-shadow:0 8px 26px rgba(30,47,110,0.45); }
        .bnav-cta-btn:hover::before { left:160%; }
        /* burger */
        .bnav-burger     { display:none;flex-direction:column;gap:4.5px;background:none;border:none;cursor:pointer;padding:9px 11px;border-radius:8px;transition:background 0.2s; }
        .bnav-burger:hover { background:${P.navy}0d; }

        /* ── wa ── */
        .wa-float { position:fixed;right:1.5rem;bottom:5.5rem;z-index:998;display:flex;flex-direction:column;align-items:flex-end;gap:0.75rem; }
        .wa-btn   { width:52px;height:52px;border-radius:50%;background:#25d366;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 20px rgba(37,211,102,0.5);transition:transform 0.2s,box-shadow 0.2s;position:relative; }
        .wa-btn:hover { transform:scale(1.1);box-shadow:0 6px 28px rgba(37,211,102,0.65); }
        .wa-btn::after { content:'';position:absolute;inset:-6px;border-radius:50%;border:2px solid rgba(37,211,102,0.4);animation:waPulse 2s ease-in-out infinite; }

        /* ── project card (Work carousel) ── */
        .proj-card   { width:330px;flex-shrink:0;border-radius:20px;display:flex;flex-direction:column;overflow:hidden;cursor:pointer;transition:border-color 0.3s,box-shadow 0.3s,transform 0.3s; }

        /* ── layout grids ── */
        .about-grid        { display:grid;grid-template-columns:1fr 1fr;gap:clamp(3rem,7vw,7rem);align-items:start; }
        .about-stats       { display:grid;grid-template-columns:repeat(3,1fr);border-top:1px solid rgba(255,255,255,0.08); }
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

          /* carousel nav arrows — tuck inward so they stay fully tappable
             on narrow screens (the desktop offset of -28px slightly
             overflows the viewport edge below ~420px) */
          .carousel-arrow-l { left:6px !important; }
          .carousel-arrow-r { right:6px !important; }

          /* bottom nav — logo + burger only */
          .bnav-tube    { bottom:1rem;left:50%;transform:translateX(-50%);padding:5px 5px 5px 8px;gap:4px; }
          .bnav-logo-text { display:none; }
          .bnav-burger  { display:flex; }

          /* wa — move above bottom nav */
          .wa-float { bottom:4.5rem;right:1rem; }
          .wa-btn   { width:44px;height:44px; }

          /* hero — marquee flows in-line below CTAs instead of sitting
             absolutely over the centred content (was overlapping on
             short / narrow viewports) */
          #hero { padding-bottom:clamp(2.5rem,8vw,4rem) !important; }
          .hero-marquee-wrap { position:static !important;margin-top:2rem;padding-bottom:1.5rem !important; }

          /* services rows — stack number/title/arrow, drop the
             right-hand description (shown instead inside the
             tap-to-reveal preview card) and shrink paddings */
          .svc-row {
            grid-template-columns: auto 1fr auto !important;
            gap: 1rem !important;
            padding: 1.25rem !important;
          }
          .svc-row-title { font-size: clamp(1.35rem,6vw,2rem) !important; transform:none !important; }

          /* grids → single col */
          .about-grid        { grid-template-columns:1fr !important;gap:2.5rem !important; }
          .about-stats       { grid-template-columns:repeat(3,1fr) !important; }
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

          /* work carousel — one full card fills the viewport per step
             (no neighbour peek, so "next" always lands on a whole card) */
          .proj-card    { width:100% !important; }
        }

        /* ═══════════════════════════════
           TABLET 561px – 900px
           (between phone-sized and desktop:
           keep the description column, just
           tighten spacing/type-scale)
        ═══════════════════════════════ */
        @media (min-width:561px) and (max-width:900px) {
          .svc-row {
            grid-template-columns: auto 1fr auto auto !important;
            gap: 1.5rem !important;
          }
          .svc-row-desc { display:block !important; max-width:200px !important; font-size:0.78rem !important; }
        }

        @media (max-width: 560px) {
          .team-grid         { grid-template-columns:1fr !important; }
          .about-stats       { grid-template-columns:1fr !important; }
          .footer-links-grid { grid-template-columns:1fr 1fr !important; }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────
   WORK CAROUSEL
   Steps exactly one card at a time (same idx /
   STEP / translateX mechanism as CreatorCarousel),
   with the same nav-arrow design adapted to a
   light surface.
───────────────────────────────────────────── */
function WorkCarousel({ projects, onOpen }: { projects: typeof WORK; onOpen:(p:typeof WORK[number])=>void }) {
  const GAP = 24; // matches track's flex `gap`

  const containerRef  = useRef<HTMLDivElement>(null);
  const trackRef      = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(354);     // measured card width + gap — recalculated for the live breakpoint
  const [maxTrans, setMaxTrans] = useState(0);

  useEffect(()=>{
    const calc=()=>{
      requestAnimationFrame(()=>{
        if(!containerRef.current || !trackRef.current) return;
        const cw = containerRef.current.clientWidth;
        const firstCard = trackRef.current.children[0] as HTMLElement | undefined;
        const cardW = firstCard ? firstCard.getBoundingClientRect().width : 330;
        const s = cardW + GAP;
        setStep(s);
        const tw = projects.length * cardW + Math.max(0,projects.length-1) * GAP;
        setMaxTrans(Math.max(0, tw - cw));
      });
    };
    calc();
    window.addEventListener("resize",calc,{passive:true});
    return ()=>window.removeEventListener("resize",calc);
  },[projects.length]);

  // clamp idx whenever the filtered list (and thus maxIdx) changes
  const maxIdx = maxTrans > 0 ? Math.ceil(maxTrans / step) : 0;
  useEffect(()=>{ setIdx(i=>Math.min(i,maxIdx)); },[maxIdx]);

  const tx = Math.min(idx * step, maxTrans);
  const prev = () => setIdx(i=>Math.max(0,i-1));
  const next = () => setIdx(i=>Math.min(maxIdx,i+1));

  return (
    <div style={{ position:"relative" }}>
      <CarouselArrow dir="l" dis={idx===0}     onClick={prev} light/>
      <CarouselArrow dir="r" dis={idx>=maxIdx} onClick={next} light/>

      {/* overflow hidden wrapper — padding trick so hover lift isn't clipped */}
      <div ref={containerRef} style={{ overflow:"hidden", padding:"18px 0", margin:"-18px 0" }}>
        <div ref={trackRef} style={{ display:"flex", gap:GAP, transform:`translateX(-${tx}px)`, transition:"transform 0.5s cubic-bezier(0.4,0,0.2,1)", willChange:"transform" }}>
          {projects.map(w=><WorkCard key={w.title} w={w} onOpen={()=>onOpen(w)}/>)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WORK CARD
───────────────────────────────────────────── */
function WorkCard({ w, onOpen }: { w: typeof WORK[number]; onOpen?: () => void }) {
  const [hov,setHov]=useState(false);
  return (
    <div onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)} onClick={onOpen} className="proj-card" style={{
      background:"#fff",
      border:`1px solid ${hov?w.accent+"40":P.border}`,
      boxShadow:hov
        ? `0 4px 12px rgba(20,20,20,0.04), 0 28px 64px -12px rgba(20,20,20,0.16), 0 0 0 1px ${w.accent}14`
        : "0 1px 3px rgba(20,20,20,0.04)",
      transform:hov?"translateY(-6px)":"translateY(0)",
    }}>
      {/* accent header strip — domain tag sits on a tinted band */}
      <div style={{ background:`${w.accent}0d`, borderBottom:`1px solid ${w.accent}26`, padding:"1.1rem 1.75rem" }}>
        <span style={{ display:"inline-block",fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:w.accent }}>{w.domain}</span>
      </div>

      <div style={{ padding:"1.75rem", display:"flex", flexDirection:"column", flex:1 }}>
        {/* title */}
        <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.5rem",fontWeight:400,color:P.text,lineHeight:1.22,marginBottom:"0.6rem",letterSpacing:"-0.01em" }}>{w.title}</h3>

        {/* tag line */}
        <p style={{ fontSize:"0.78rem",color:P.muted,letterSpacing:"0.02em",marginBottom:"1.25rem" }}>{w.tag}</p>

        {/* result — outcome highlight in its own framed line */}
        <div style={{ display:"flex", alignItems:"flex-start", gap:"0.65rem", flex:1, marginBottom:"1.5rem" }}>
          <span aria-hidden style={{ flexShrink:0,width:22,height:22,borderRadius:7,background:`${w.accent}16`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.65rem",color:w.accent,marginTop:2 }}>↑</span>
          <p style={{ fontSize:"0.88rem",color:P.text,lineHeight:1.6,fontWeight:500 }}>{w.result}</p>
        </div>

        {/* CTA */}
        <div style={{ display:"flex",alignItems:"center",gap:"0.5rem",paddingTop:"1.25rem",borderTop:`1px solid ${P.border}` }}>
          <span style={{ fontSize:"0.76rem",fontWeight:600,letterSpacing:"0.03em",color:hov?w.accent:P.text,transition:"color 0.25s" }}>More details</span>
          <span style={{ display:"inline-flex",alignItems:"center",justifyContent:"center",width:24,height:24,borderRadius:"50%",background:hov?w.accent:`${w.accent}14`,color:hov?"#fff":w.accent,fontSize:"0.75rem",transform:hov?"translateX(4px)":"translateX(0)",transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)" }}>→</span>
        </div>
      </div>
    </div>
  );
}

/* ── SERVICES — numbered row list with hover-reveal preview card ── */
function ServiceRow({ svc, idx, total, active, onEnter, onLeave, onMove }: {
  svc: typeof SERVICES[number]; idx:number; total:number; active:boolean;
  onEnter:()=>void; onLeave:()=>void; onMove:(e:React.MouseEvent)=>void;
}) {
  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
      className="svc-row"
      style={{
        display:"grid",
        gridTemplateColumns:"auto 1fr auto auto",
        alignItems:"center",
        gap:"clamp(1.25rem,4vw,3rem)",
        padding:"clamp(1.5rem,3.5vw,2.6rem) clamp(1.25rem,4vw,2rem)",
        borderBottom: idx<total-1 ? `1px solid ${P.border}` : "none",
        cursor:"pointer",
        position:"relative",
        transition:"background 0.35s ease",
        background: active ? `${P.navy}06` : "transparent",
      }}
    >
      <span style={{
        fontFamily:"'Playfair Display',Georgia,serif",
        fontSize:"clamp(1rem,2vw,1.3rem)",
        fontWeight:400,
        color: active ? P.navy : P.muted,
        letterSpacing:"0.02em",
        transition:"color 0.3s",
        minWidth:"2.4ch",
      }}>{svc.n}</span>

      <h3 className="svc-row-title" style={{
        fontFamily:"'Playfair Display',Georgia,serif",
        fontSize:"clamp(1.6rem,4.4vw,3rem)",
        fontWeight:400,
        lineHeight:1.08,
        letterSpacing:"-0.01em",
        color: active ? P.navy : P.text,
        transition:"color 0.35s ease, transform 0.35s ease",
        transform: active ? "translateX(10px)" : "translateX(0)",
      }}>{svc.title}</h3>

      <p className="svc-row-desc desktop-only" style={{
        fontSize:"0.85rem",
        color:P.muted,
        lineHeight:1.7,
        maxWidth:280,
        textAlign:"right",
        opacity: active ? 0 : 0.7,
        transition:"opacity 0.25s ease",
      }}>{svc.desc}</p>

      <span aria-hidden style={{
        flexShrink:0,
        width:46,
        height:46,
        borderRadius:"50%",
        border:`1.5px solid ${active ? P.navy : P.border}`,
        background: active ? P.navy : "transparent",
        color: active ? "#fff" : P.text,
        display:"flex",alignItems:"center",justifyContent:"center",
        transform: active ? "rotate(45deg)" : "rotate(0deg)",
        transition:"all 0.35s cubic-bezier(0.4,0,0.2,1)",
      }}><svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
    </div>
  );
}

function ServiceModal({ svc, onClose }: { svc: typeof SERVICES[number]; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);
  return (
    <div onClick={onClose} style={{ position:"fixed",inset:0,zIndex:1100,background:"rgba(20,20,20,0.6)",backdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(1rem,4vw,2.5rem)",animation:"modalFade 0.22s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ background:P.navy,borderRadius:20,maxWidth:500,width:"100%",padding:"clamp(1.75rem,5vw,2.75rem)",boxShadow:`0 32px 80px rgba(0,0,0,0.35)`,animation:"modalSlide 0.28s cubic-bezier(0.4,0,0.2,1)" }}>
        <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:"1.25rem" }}>
          <div>
            <span style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(255,255,255,0.4)",display:"block",marginBottom:"0.4rem" }}>{svc.n}</span>
            <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.4rem,4vw,2rem)",fontWeight:400,color:"#fff",lineHeight:1.1 }}>{svc.title}</h3>
          </div>
          <button onClick={onClose} aria-label="Close" style={{ background:"rgba(255,255,255,0.1)",border:"none",borderRadius:"50%",width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",color:"rgba(255,255,255,0.7)",flexShrink:0,marginLeft:"1rem",marginTop:2 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden><path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </button>
        </div>
        <p style={{ fontSize:"0.88rem",color:"rgba(255,255,255,0.6)",lineHeight:1.75,marginBottom:"1.5rem" }}>{svc.desc}</p>
        <p style={{ fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.35)",marginBottom:"0.75rem" }}>What&apos;s Included</p>
        <ul style={{ listStyle:"none",display:"flex",flexWrap:"wrap",gap:"7px 10px" }}>
          {svc.items.map(it=>(
            <li key={it} style={{ display:"flex",alignItems:"center",gap:6,fontSize:"0.76rem",color:"#fff",fontWeight:500,background:"rgba(255,255,255,0.1)",borderRadius:999,padding:"6px 14px" }}>
              <span style={{ width:5,height:5,borderRadius:"50%",background:P.accent2,flexShrink:0 }}/>{it}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function ServicesList({ services, onOpen }: { services: typeof SERVICES; onOpen:(svc:typeof SERVICES[number])=>void }) {
  const [activeIdx, setActiveIdx] = useState<number|null>(null);
  const [modalSvc, setModalSvc] = useState<typeof SERVICES[number]|null>(null);
  const [rowTop, setRowTop] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<Array<HTMLDivElement|null>>([]);

  const activate = (i:number) => {
    setActiveIdx(i);
    const row = rowRefs.current[i];
    if (row) setRowTop(row.offsetTop + row.offsetHeight/2);
  };

  const handleClick = (svc: typeof SERVICES[number]) => {
    setModalSvc(svc);
  };

  const active = activeIdx!==null ? services[activeIdx] : null;

  return (
    <>
      <div ref={wrapRef} style={{ position:"relative" }}>
        {services.map((svc,i)=>(
          <div key={svc.n} ref={el=>{rowRefs.current[i]=el;}} onClick={()=>handleClick(svc)}>
            <ServiceRow
              svc={svc} idx={i} total={services.length}
              active={activeIdx===i}
              onEnter={()=>{ if(!isMobile()) activate(i); }}
              onLeave={()=>setActiveIdx(null)}
              onMove={()=>{}}
            />
          </div>
        ))}

        {/* floating hover-preview card — desktop only, anchored to the active row */}
        {active && (
          <div className="svc-preview desktop-only" style={{
            position:"absolute",
            right: "clamp(5.5rem,11vw,8rem)",
            top: rowTop,
            transform:"translateY(-50%)",
            pointerEvents:"none",
            zIndex:5,
            width:"min(46vw,420px)",
            background:P.navy,
            borderRadius:16,
            overflow:"hidden",
            padding:"1.1rem 1.4rem",
            display:"flex",
            alignItems:"center",
            gap:"1.25rem",
            boxShadow:`0 24px 56px -14px ${P.navy}66, 0 6px 20px rgba(20,20,20,0.16)`,
            opacity:1,
            animation:"svcPreviewIn 0.3s cubic-bezier(0.4,0,0.2,1)",
          }}>
            <p style={{ flexShrink:0,fontSize:"0.56rem",fontWeight:700,letterSpacing:"0.16em",textTransform:"uppercase",color:"rgba(255,255,255,0.5)",lineHeight:1.6,maxWidth:"6.5ch",borderRight:"1px solid rgba(255,255,255,0.14)",paddingRight:"1.1rem" }}>What&apos;s included</p>
            <ul style={{ listStyle:"none",display:"flex",flexWrap:"wrap",gap:"7px 10px",flex:1,alignContent:"center" }}>
              {active.items.map(it=>(
                <li key={it} style={{ display:"flex",alignItems:"center",gap:6,fontSize:"0.74rem",color:"#fff",fontWeight:500,whiteSpace:"nowrap",background:"rgba(255,255,255,0.08)",borderRadius:999,padding:"5px 11px" }}>
                  <span style={{ width:5,height:5,borderRadius:"50%",background:P.accent2,flexShrink:0 }}/>{it}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {modalSvc && <ServiceModal svc={modalSvc} onClose={()=>setModalSvc(null)} />}
    </>
  );
}

/* ─────────────────────────────────────────────
   PROJECT DETAIL MODAL — opens on work-card click
───────────────────────────────────────────── */
function ProjectModal({ project, onClose, go }: { project: typeof WORK[number]; onClose: () => void; go:(id:string)=>void }) {
  const p = project;
  const initials = p.title.split(" ").map(s=>s[0]).join("").slice(0,2).toUpperCase();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  return (
    <div onClick={onClose} className="proj-modal-overlay" style={{ position:"fixed",inset:0,zIndex:1050,background:"rgba(20,20,20,0.55)",backdropFilter:"blur(6px)",display:"flex",alignItems:"center",justifyContent:"center",padding:"clamp(1rem,4vw,3rem)",animation:"modalFade 0.25s ease" }}>
      <div onClick={e=>e.stopPropagation()} style={{ position:"relative",width:"min(440px,100%)",maxHeight:"88vh",overflowY:"auto",background:"#fff",borderRadius:24,border:`1px solid ${P.border}`,boxShadow:"0 48px 120px rgba(30,47,110,0.22)",animation:"modalRise 0.3s cubic-bezier(0.25,0.46,0.45,0.94)",textAlign:"center" }}>
        {/* close */}
        <button onClick={onClose} aria-label="Close project details" style={{ position:"absolute",top:"1.25rem",right:"1.25rem",width:36,height:36,borderRadius:"50%",background:"rgba(30,47,110,0.06)",border:`1px solid ${P.border}`,display:"flex",alignItems:"center",justifyContent:"center",color:P.muted,fontSize:"0.95rem",cursor:"pointer",zIndex:3,transition:"all 0.2s" }}
          onMouseEnter={e=>{e.currentTarget.style.background=p.accent;e.currentTarget.style.color="#fff";e.currentTarget.style.borderColor=p.accent;}}
          onMouseLeave={e=>{e.currentTarget.style.background="rgba(30,47,110,0.06)";e.currentTarget.style.color=P.muted;e.currentTarget.style.borderColor=P.border;}}
        >✕</button>

        <div style={{ padding:"clamp(2.25rem,6vw,3rem) clamp(1.75rem,5vw,2.5rem) clamp(2rem,5vw,2.5rem)", display:"flex", flexDirection:"column", alignItems:"center" }}>
          {/* logo / brand mark */}
          <span style={{ width:72,height:72,borderRadius:20,background:`${p.accent}14`,border:`1px solid ${p.accent}33`,display:"flex",alignItems:"center",justifyContent:"center",marginBottom:"1.25rem",flexShrink:0 }}>
            <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontWeight:700,fontSize:"1.5rem",color:p.accent }}>{initials}</span>
          </span>

          {/* event type / domain */}
          <span style={{ fontSize:"0.6rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:p.accent,background:`${p.accent}14`,border:`1px solid ${p.accent}33`,padding:"5px 14px",borderRadius:999,display:"inline-block",marginBottom:"1rem" }}>{p.domain}</span>

          {/* brand name */}
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.5rem,5vw,1.9rem)",fontWeight:400,color:P.text,lineHeight:1.18,marginBottom:"0.6rem" }}>{p.title}</h2>

          {/* short description */}
          <p style={{ fontSize:"0.88rem",color:P.muted,lineHeight:1.75,maxWidth:340,marginBottom:"1.75rem" }}>{p.desc}</p>

          {/* contact us — solid accent pill, built for this card's light surface */}
          <button onClick={()=>{ onClose(); go("contact"); }} style={{
            display:"inline-flex",alignItems:"center",gap:8,padding:"12px 30px",borderRadius:999,
            border:"none",cursor:"pointer",fontSize:"0.8rem",fontWeight:700,letterSpacing:"0.05em",
            textTransform:"uppercase",fontFamily:"inherit",color:"#fff",background:p.accent,
            boxShadow:`0 12px 32px ${p.accent}40`,transition:"transform 0.25s,box-shadow 0.25s,background 0.25s",
          }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow=`0 16px 40px ${p.accent}55`;}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow=`0 12px 32px ${p.accent}40`;}}
          >Contact Us →</button>
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
  const [focusField,setFocusField]=useState("");
  const [sent,setSent]=useState(false);
  const [sending,setSending]=useState(false);
  const [error,setError]=useState("");

  /* underline-only field style */
  const lineInp=(field:string):React.CSSProperties=>({
    width:"100%", background:"transparent", border:"none",
    borderBottom:`1.5px solid ${focusField===field ? "#ffffff" : "rgba(255,255,255,0.15)"}`,
    color:"#fff", fontSize:"1rem", outline:"none", padding:"0.6rem 0",
    fontFamily:"inherit", transition:"border-color 0.25s",
  });

  if(sent)return(
    <div style={{ display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem",padding:"4rem 2rem",textAlign:"center" }}>
      <div style={{ width:56,height:56,borderRadius:16,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.27)",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={"#ffffff"} strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
      </div>
      <p style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"1.6rem",color:"#fff" }}>We&apos;ve got it.</p>
      <p style={{ fontSize:"0.82rem",color:"rgba(255,255,255,0.38)",lineHeight:1.75,maxWidth:300 }}>Expect a reply within 24 hours.</p>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to send");
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

  return(
    <form className="gsap-up" onSubmit={handleSubmit}>

      {/* Two underline fields side by side */}
      <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:"0 2.5rem",marginBottom:"2.5rem" }}>
        <div>
          <label style={{ display:"block",fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:focusField==="name"?"#ffffff":"rgba(255,255,255,0.25)",marginBottom:"0.35rem",transition:"color 0.25s" }}>Your Name</label>
          <input type="text" value={form.name} required placeholder="Jane Smith"
            style={lineInp("name")}
            onFocus={()=>setFocusField("name")} onBlur={()=>setFocusField("")}
            onChange={e=>setForm({...form,name:e.target.value})}
          />
        </div>
        <div>
          <label style={{ display:"block",fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:focusField==="email"?"#ffffff":"rgba(255,255,255,0.25)",marginBottom:"0.35rem",transition:"color 0.25s" }}>Email</label>
          <input type="email" value={form.email} required placeholder="you@company.com"
            style={lineInp("email")}
            onFocus={()=>setFocusField("email")} onBlur={()=>setFocusField("")}
            onChange={e=>setForm({...form,email:e.target.value})}
          />
        </div>
      </div>

      {/* Service — minimal toggle row */}
      <div style={{ marginBottom:"2.5rem" }}>
        <p style={{ fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:"rgba(255,255,255,0.25)",marginBottom:"1rem" }}>I need</p>
        <div style={{ display:"flex",gap:"0.5rem",flexWrap:"wrap" }}>
          {["Brand Strategy","Web Design","Event / Influencer","Full Project"].map(s=>{
            const active = form.service===s;
            return (
              <button key={s} type="button" onClick={()=>setForm({...form,service:s})}
                style={{ padding:"6px 14px",borderRadius:8,fontFamily:"inherit",fontSize:"0.75rem",fontWeight:600,cursor:"pointer",
                  background:active?"#ffffff":"transparent",
                  color:active?P.dark:"rgba(255,255,255,0.45)",
                  border:`1px solid ${active?"#ffffff":"rgba(255,255,255,0.12)"}`,
                  transition:"all 0.2s",
                }}>{s}</button>
            );
          })}
        </div>
      </div>

      {/* Message — underline textarea */}
      <div style={{ marginBottom:"2.5rem" }}>
        <label style={{ display:"block",fontSize:"0.55rem",fontWeight:700,letterSpacing:"0.2em",textTransform:"uppercase",color:focusField==="msg"?"#ffffff":"rgba(255,255,255,0.25)",marginBottom:"0.35rem",transition:"color 0.25s" }}>Tell us about your project</label>
        <textarea value={form.msg} required rows={3} placeholder="What's the goal? What's the timeline?"
          style={{ ...lineInp("msg"), resize:"none", lineHeight:1.8 }}
          onFocus={()=>setFocusField("msg")} onBlur={()=>setFocusField("")}
          onChange={e=>setForm({...form,msg:e.target.value})}
        />
      </div>

      {/* Submit — full width accent button */}
      <button type="submit" disabled={sending} style={{
        width:"100%", padding:"1rem", border:"none", borderRadius:12, cursor:sending?"default":"pointer",
        background:`linear-gradient(135deg, ${P.navy} 0%, ${P.navy2} 100%)`,
        color:"#fff", fontSize:"0.85rem", fontWeight:700, letterSpacing:"0.05em",
        textTransform:"uppercase", fontFamily:"inherit",
        opacity: sending ? 0.7 : 1,
        transition:"opacity 0.2s, transform 0.2s",
        boxShadow:`0 8px 28px ${P.navy}44`,
      }}
        onMouseEnter={e=>{if(!sending){e.currentTarget.style.opacity="0.88";e.currentTarget.style.transform="translateY(-1px)";}}}
        onMouseLeave={e=>{e.currentTarget.style.opacity=sending?"0.7":"1";e.currentTarget.style.transform="none";}}
      >{sending ? "Sending…" : "Send Message →"}</button>

      {error && <p style={{ color:"#ff8a8a", fontSize:"0.8rem", marginTop:"1rem" }}>{error}</p>}

      <style>{`.form-row{display:grid;grid-template-columns:1fr 1fr;gap:1rem;}@media(max-width:600px){.form-row{grid-template-columns:1fr;}}`}</style>
    </form>
  );
}

/* ─────────────────────────────────────────────
   NEWSLETTER FORM
───────────────────────────────────────────── */
function NLForm() {
  const [em,setEm]=useState(""), [done,setDone]=useState(false);
  if(done)return<div style={{ display:"inline-flex",alignItems:"center",gap:8,padding:"10px 20px",border:"1px solid rgba(255,255,255,0.4)",borderRadius:999,color:"#ffffff",fontSize:"0.82rem",fontWeight:600 }}>✓ You&apos;re in — thanks!</div>;
  return(
    <form onSubmit={e=>{e.preventDefault();setDone(true);}} style={{ display:"flex",maxWidth:400 }}>
      <input type="email" value={em} onChange={e=>setEm(e.target.value)} placeholder="your@email.com" required style={{ flex:1,background:"rgba(255,255,255,0.06)",border:"1px solid rgba(255,255,255,0.1)",borderRight:"none",outline:"none",padding:"11px 16px",color:"#fff",fontSize:"0.83rem",borderRadius:"999px 0 0 999px",fontFamily:"inherit" }}/>
      <button type="submit" style={{ background:P.navy,color:"#fff",border:"none",padding:"11px 22px",fontWeight:700,fontSize:"0.76rem",cursor:"pointer",borderRadius:"0 999px 999px 0",whiteSpace:"nowrap",fontFamily:"inherit",transition:"background 0.2s" }} onMouseEnter={e=>(e.currentTarget.style.background=P.navy2)} onMouseLeave={e=>(e.currentTarget.style.background=P.navy)}>Subscribe</button>
    </form>
  );
}

/* ─────────────────────────────────────────────
   SOCIAL FLOAT — fixed right side, desktop only
   SVG icons, ripple on hover, no WhatsApp
───────────────────────────────────────────── */
const IGIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);
const LIIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);
const FBIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

function SocialIcon({ icon, href, color }: { icon:React.ReactNode; href:string; color:string }) {
  const [hov,setHov]=useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={()=>setHov(true)} onMouseLeave={()=>setHov(false)}
      className="social-icon"
      style={{
        background: "#fff",
        border: `1.5px solid ${hov ? color : "rgba(30,47,110,0.13)"}`,
        color: hov ? "#fff" : color,
        boxShadow: hov ? `0 6px 22px ${color}44, 0 2px 6px rgba(0,0,0,0.06)` : "0 2px 8px rgba(30,47,110,0.07)",
        transform: hov ? "translateX(-3px)" : "translateX(0)",
        transition: "border-color 0.28s, box-shadow 0.28s, color 0.28s, transform 0.28s",
      }}
    >
      {/* slide-fill layer */}
      <span className="social-icon-fill" style={{ background: color }}/>
      {icon}
    </a>
  );
}
function SocialFloat() {
  return (
    <div className="social-float">
      <SocialIcon icon={<IGIcon/>} href="https://www.instagram.com/idea.shapers?igsh=eXVtdTBrejR0YW44&utm_source=qr" color={P.navyL}/>
      <SocialIcon icon={<LIIcon/>} href="https://www.linkedin.com/company/ideashapers-india" color={P.navy}/>
      <SocialIcon icon={<FBIcon/>} href={CONTACT.facebook} color={P.navy2}/>
    </div>
  );
}

/* ─────────────────────────────────────────────
   HERO CLIENTS MARQUEE — single row inside hero
───────────────────────────────────────────── */
function HeroClientsMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <div
      style={{ overflow:"hidden", position:"relative", paddingBottom:"0.5rem" }}
      onMouseEnter={()=>setPaused(true)}
      onMouseLeave={()=>setPaused(false)}
    >
      {/* edge fades */}
      <div style={{ position:"absolute",inset:0,background:`linear-gradient(90deg,${P.cream} 0%,transparent 8%,transparent 92%,${P.cream} 100%)`,pointerEvents:"none",zIndex:2 }}/>
      <div style={{
        display:"inline-flex", gap:0,
        animation:"mq 36s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}>
        {[...CLIENT_LOGOS,...CLIENT_LOGOS].map((cl,i)=>(
          <span key={i} style={{
            display:"inline-flex", alignItems:"center", gap:"0.9rem",
            padding:"0.35rem 1.2rem 0.35rem 0.35rem",
            whiteSpace:"nowrap",
            background:"rgba(255,255,255,0.72)",
            border:`1px solid ${P.border}`,
            borderRadius:999,
            margin:"0 0.6rem",
            backdropFilter:"blur(4px)",
            flexShrink:0,
            boxShadow:"0 2px 12px rgba(30,47,110,0.08)",
          }}>
            {/* logo thumbnail */}
            <span style={{
              width:44, height:44, borderRadius:"50%",
              background:"#fff",
              border:`1px solid rgba(30,47,110,0.1)`,
              display:"inline-flex", alignItems:"center", justifyContent:"center",
              flexShrink:0, overflow:"hidden",
              boxShadow:"0 1px 6px rgba(0,0,0,0.1)",
              position:"relative",
            }}>
              <Image
                src={cl.src}
                alt={cl.name}
                fill
                style={{ objectFit:"cover" }}
              />
            </span>
            {/* brand name */}
            <span style={{ fontSize:"0.88rem", fontWeight:600, color:P.text, letterSpacing:"-0.01em" }}>
              {cl.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   CLIENTS MARQUEE
   Logo circle (initials) + brand name + category
   Two rows, opposite directions, pause on hover
───────────────────────────────────────────── */
const CLIENT_COLORS = [P.navy, P.navyL, P.maroon, P.navy2, P.dark3, "#2d8a6a", "#8ab4c2", P.dark, P.navy, "#ffffff", P.maroon2, P.navy];

function ClientsMarquee() {
  const [p1,setP1]=useState(false);
  const [p2,setP2]=useState(false);
  const bg = P.cream2;

  const ClientChip = ({ c, i }: { c: typeof CLIENTS[number]; i: number }) => {
    const col = CLIENT_COLORS[i % CLIENT_COLORS.length];
    const initials = c.name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
    return (
      <span style={{ display:"inline-flex",alignItems:"center",gap:"0.85rem",padding:"0.4rem 1.75rem 0.4rem 0.4rem",whiteSpace:"nowrap",
        background:"rgba(255,255,255,0.7)",border:`1px solid ${P.border}`,borderRadius:999,margin:"0 0.6rem",
        boxShadow:"0 2px 8px rgba(30,47,110,0.06)",backdropFilter:"blur(4px)",
      }}>
        {/* Logo circle */}
        <span style={{ width:36,height:36,borderRadius:"50%",background:`${col}18`,border:`1.5px solid ${col}44`,display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0 }}>
          <span style={{ fontSize:"0.62rem",fontWeight:800,color:col,letterSpacing:"0.02em" }}>{initials}</span>
        </span>
        {/* Name + cat */}
        <span style={{ display:"flex",flexDirection:"column",gap:"0.1rem" }}>
          <span style={{ fontSize:"0.85rem",fontWeight:600,color:P.text,letterSpacing:"-0.01em" }}>{c.name}</span>
          <span style={{ fontSize:"0.55rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:P.muted }}>{c.cat}</span>
        </span>
      </span>
    );
  };

  return (
    <div style={{ background:bg, padding:"2.5rem 0", overflow:"hidden", position:"relative" }}>
      {/* label */}
      <p style={{ textAlign:"center",fontSize:"0.58rem",fontWeight:700,letterSpacing:"0.28em",textTransform:"uppercase",color:P.muted,marginBottom:"1.5rem" }}>Trusted by leading brands</p>

      {/* edge fades */}
      <div style={{ position:"absolute",inset:0,pointerEvents:"none",background:`linear-gradient(90deg,${bg} 0%,transparent 6%,transparent 94%,${bg} 100%)`,zIndex:3 }}/>

      {/* Row 1 — left */}
      <div style={{ overflow:"hidden",marginBottom:"0.85rem" }}
        onMouseEnter={()=>setP1(true)} onMouseLeave={()=>setP1(false)}
      >
        <div style={{ display:"inline-flex",animation:`mq 34s linear infinite`,animationPlayState:p1?"paused":"running" }}>
          {[...CLIENTS,...CLIENTS].map((c,i)=><ClientChip key={i} c={c} i={i}/>)}
        </div>
      </div>

      {/* Row 2 — right */}
      <div style={{ overflow:"hidden" }}
        onMouseEnter={()=>setP2(true)} onMouseLeave={()=>setP2(false)}
      >
        <div style={{ display:"inline-flex",animation:`mqRev 40s linear infinite`,animationPlayState:p2?"paused":"running" }}>
          {[...[...CLIENTS].reverse(),...[...CLIENTS].reverse()].map((c,i)=><ClientChip key={i} c={c} i={i+6}/>)}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   INFLUENCER MANAGEMENT SECTION
   Left: headline + stats + carousel of proof cards
   Right: service grid
───────────────────────────────────────────── */
/* Real creators from our roster — subset shown on homepage, full list at /creators */
const INFL_PROOF = [
  { name:"Abhinandan Sarkar",  handle:"abhinandan__sarkar",  link:"https://www.instagram.com/abhinandan__sarkar",  color:"#1e2f6e", img:"/Influencers/1.png",  imgType:"avatar" as const },
  { name:"Abhishek Ghosh",     handle:"thefoodgambler",      link:"https://www.instagram.com/thefoodgambler",      color:"#2d3d8a", img:"/Influencers/2.png",  imgType:"avatar" as const },
  { name:"Adrija Ghoshal",     handle:"adrija.gal",          link:"https://www.instagram.com/adrija.gal",          color:"#3d52a8", img:"/Influencers/4.png",  imgType:"avatar" as const },
  { name:"Ahana Roy",          handle:"ahana8243",           link:"https://www.instagram.com/ahana8243",           color:"#7a1f2b", img:"/Influencers/6.png",  imgType:"avatar" as const },
  { name:"Chef Neha Dipak Shah",handle:"nehadeepakshah",     link:"https://www.instagram.com/nehadeepakshah",      color:"#9c2c3a", img:"/Influencers/20.png", imgType:"avatar" as const },
  { name:"Garima Banka",       handle:"garima_banka",        link:"https://www.instagram.com/garima_banka",        color:"#c4622a", img:"/Influencers/29.png", imgType:"photo"  as const },
  { name:"Manpreet Singh",     handle:"manpreetverse",       link:"https://www.instagram.com/manpreetverse",       color:"#d97b3f", img:"/Influencers/36.png", imgType:"photo"  as const },
  { name:"Sandipta Sen",       handle:"sandiptasen",         link:"https://www.instagram.com/sandiptasen",         color:"#1e2f6e", img:"/Influencers/72.jpg", imgType:"photo"  as const },
  { name:"Soham Sinha",        handle:"kolkatadelites",      link:"https://www.instagram.com/kolkatadelites",      color:"#2d3d8a", img:"/Influencers/77.jpg", imgType:"photo"  as const },
  { name:"Trisha Ganguly",     handle:"trisha_gunja_ganguly",link:"https://www.instagram.com/trisha_gunja_ganguly",color:"#3d52a8", img:"/Influencers/99.png", imgType:"photo"  as const },
];

function InfluencerSection({ go }: { go:(id:string)=>void }) {
  return (
    <section id="influencer" style={{
      background:`linear-gradient(150deg, #060d1f 0%, #0f1d4a 40%, #0a1540 100%)`,
      position:"relative", overflow:"hidden",
      padding:"clamp(30px,7vw,100px) clamp(1.25rem,5vw,3rem)",
    }}>
      {/* Ghost text */}
      <div aria-hidden style={{ position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",fontSize:"clamp(5rem,18vw,20rem)",fontWeight:900,color:"rgba(255,255,255,0.025)",letterSpacing:"-0.05em",whiteSpace:"nowrap",userSelect:"none",pointerEvents:"none",fontFamily:"'Playfair Display',Georgia,serif",animation:"inflPulse 6s ease-in-out infinite" }}>INFLUENCE</div>
      {[300,520].map((s,i)=>(
        <div key={i} aria-hidden style={{ position:"absolute",top:"50%",right:"-12%",width:s,height:s,borderRadius:"50%",border:"1px solid rgba(255,255,255,0.06)",transform:"translateY(-50%)",pointerEvents:"none" }}/>
      ))}

      <div style={{ maxWidth:1100,margin:"0 auto",position:"relative",zIndex:1 }}>
        {/* Header — centered, compact */}
        <div className="gsap-up" style={{ textAlign:"center",marginBottom:"3rem" }}>
          <div style={{ display:"inline-flex",alignItems:"center",gap:8,background:"rgba(255,255,255,0.1)",border:"1px solid rgba(255,255,255,0.27)",borderRadius:999,padding:"6px 16px 6px 10px",marginBottom:"1.5rem" }}>
            <span style={{ width:6,height:6,borderRadius:"50%",background:"#ffffff" }}/>
            <span style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.18em",textTransform:"uppercase",color:"#ffffff" }}>Influencer Management & Promotion</span>
          </div>
          <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(2.2rem,5vw,4rem)",fontWeight:400,color:"#fff",lineHeight:1.1,marginBottom:"1rem" }}>
            3 million+ minds. <em style={{ color:"#ffffff" }}>One strategy.</em>
          </h2>
          <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.45)",maxWidth:520,margin:"0 auto 2rem" }}>
            End to end influencer management, from sourcing and contracting to campaign execution and reporting.
          </p>

          {/* Stats row */}
          <div className="infl-stats-row" style={{ maxWidth:640,margin:"0 auto 2rem",borderTop:"1px solid rgba(255,255,255,0.08)",borderBottom:"1px solid rgba(255,255,255,0.08)",padding:"1.5rem 0" }}>
            {[["3 million+","Reach"],["2000+","Creators"],["1000+","Campaigns"],["100%","Success"]].map(([n,l],i)=>(
              <div key={l} className="infl-stat" style={{ borderRight:i<3?"1px solid rgba(255,255,255,0.08)":"none" }}>
                <div style={{ fontFamily:"'Playfair Display',Georgia,serif",fontStyle:"italic",fontSize:"1.7rem",color:"#ffffff",lineHeight:1 }}>{n}</div>
                <div style={{ fontSize:"0.55rem",letterSpacing:"0.14em",textTransform:"uppercase",color:"rgba(255,255,255,0.28)",marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>

          <Mag><PillBtn white onClick={()=>go("contact")}>Start a Campaign →</PillBtn></Mag>
        </div>

        {/* Creator carousel */}
        <CreatorCarousel/>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────
   CAROUSEL NAV ARROW — shared design
   Used by both the Creator Network carousel (dark
   surface) and the Work / Projects carousel (light
   surface). Same shape, size, position — colour
   inverts to suit the background it sits on.
───────────────────────────────────────────── */
function CarouselArrow({ dir, dis, onClick, light=false, offset=-28 }:{
  dir:"l"|"r"; dis:boolean; onClick:()=>void; light?:boolean; offset?:number;
}) {
  const idleBg     = light ? "#fff"                  : "rgba(255,255,255,0.09)";
  const idleColor  = light ? P.navy                  : "#fff";
  const disBg      = light ? "rgba(30,47,110,0.04)"  : "rgba(255,255,255,0.03)";
  const disColor   = light ? "rgba(30,47,110,0.18)"  : "rgba(255,255,255,0.15)";
  const hovBg      = light ? P.navy                  : "#ffffff";
  const hovColor   = light ? "#fff"                  : P.dark;
  const border     = light ? `1px solid ${P.border}` : "none";
  const shadow     = light ? "0 8px 28px rgba(30,47,110,0.12)" : "none";

  return (
    <button onClick={onClick} disabled={dis} aria-label={dir==="l"?"Previous":"Next"}
      className={`carousel-arrow carousel-arrow-${dir}`} style={{
      position:"absolute", [dir==="l"?"left":"right"]:offset, top:"50%", transform:"translateY(-50%)",
      zIndex:10, width:40, height:40, borderRadius:10, border,
      cursor:dis?"default":"pointer",
      background:dis?disBg:idleBg,
      color:dis?disColor:idleColor,
      boxShadow:dis?"none":shadow,
      fontSize:"1rem", display:"flex", alignItems:"center", justifyContent:"center",
      transition:"background 0.2s,color 0.2s,transform 0.2s,box-shadow 0.2s",
    }}
      onMouseEnter={e=>{if(!dis){e.currentTarget.style.background=hovBg;e.currentTarget.style.color=hovColor;e.currentTarget.style.transform="translateY(-50%) scale(1.06)";}}}
      onMouseLeave={e=>{e.currentTarget.style.background=dis?disBg:idleBg;e.currentTarget.style.color=dis?disColor:idleColor;e.currentTarget.style.transform="translateY(-50%)";}}
    >
      {dir==="l"
        ? <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M10 3L5 8L10 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
        : <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M6 3L11 8L6 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
      }
    </button>
  );
}

/* ─────────────────────────────────────────────
   CREATOR CAROUSEL
   4 cards visible, absolute left/right nav buttons,
   overflow padding trick so hover lift isn't clipped
───────────────────────────────────────────── */
function CreatorCarousel() {
  const CARD_W = 155;
  const GAP    = 14;
  const STEP   = CARD_W + GAP;

  const containerRef  = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const [maxTrans, setMaxTrans] = useState(0); // hard cap in px

  useEffect(()=>{
    const calc=()=>{
      requestAnimationFrame(()=>{
        if(!containerRef.current)return;
        const cw  = containerRef.current.clientWidth;
        const tw  = INFL_PROOF.length * CARD_W + (INFL_PROOF.length-1) * GAP;
        setMaxTrans(Math.max(0, tw - cw));
      });
    };
    calc();
    window.addEventListener("resize",calc,{passive:true});
    return ()=>window.removeEventListener("resize",calc);
  },[]);

  const maxIdx = maxTrans > 0 ? Math.ceil(maxTrans / STEP) : 0;
  // translation never exceeds maxTrans → no empty space at end
  const tx = Math.min(idx * STEP, maxTrans);

  const prev = () => setIdx(i=>Math.max(0,i-1));
  const next = () => setIdx(i=>Math.min(maxIdx,i+1));

  return (
    <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:"2.5rem" }}>
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1.5rem",flexWrap:"wrap",gap:"0.75rem" }}>
        <div>
          <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.2rem,2.5vw,1.6rem)",fontWeight:400,color:"#fff" }}>
            Our <em style={{ color:"#ffffff" }}>Creator Network</em>
          </h3>
        </div>
        {/* Inline dots */}
        <div style={{ display:"flex",gap:5 }}>
          {Array.from({length:Math.min(maxIdx+1,8)}).map((_,i)=>(
            <button key={i} onClick={()=>setIdx(i)} style={{ width:i===idx?20:6,height:6,borderRadius:999,border:"none",cursor:"pointer",background:i===idx?"#ffffff":"rgba(255,255,255,0.14)",transition:"width 0.3s,background 0.3s",padding:0 }}/>
          ))}
        </div>
      </div>

      <div style={{ position:"relative" }}>
        <CarouselArrow dir="l" dis={idx===0} onClick={prev}/>
        <CarouselArrow dir="r" dis={idx>=maxIdx} onClick={next}/>

        {/* overflow hidden wrapper — padding trick for hover lift */}
        <div ref={containerRef} style={{ overflow:"hidden", padding:"16px 0", margin:"-16px 0" }}>
          <div style={{ display:"flex", gap:GAP, transform:`translateX(-${tx}px)`, transition:"transform 0.42s cubic-bezier(0.4,0,0.2,1)", willChange:"transform" }}>
            {INFL_PROOF.map((inf,i)=>(
              <CreatorAvatarCard key={i} inf={inf} cardW={CARD_W}/>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign:"center", marginTop:"2.5rem" }}>
        <a href="/creators" style={{
          display:"inline-flex", alignItems:"center", gap:8,
          padding:"11px 26px", borderRadius:999,
          border:"1.5px solid rgba(255,255,255,0.3)",
          color:"#fff", fontSize:"0.8rem", fontWeight:700,
          letterSpacing:"0.04em", textTransform:"uppercase",
          textDecoration:"none", transition:"background 0.25s, border-color 0.25s",
        }}
          onMouseEnter={e=>{ e.currentTarget.style.background="rgba(255,255,255,0.1)"; e.currentTarget.style.borderColor="rgba(255,255,255,0.5)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.background="transparent"; e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; }}
        >Show More Creators →</a>
      </div>
    </div>
  );
}

/* ── Minimal creator chip: real photo (or initials fallback) + name + handle — click opens full directory ── */
function CreatorAvatarCard({ inf, cardW }: { inf: typeof INFL_PROOF[number]; cardW:number }) {
  const [hov,setHov]=useState(false);
  const [imgOk,setImgOk]=useState(true);
  const initials = inf.name.split(" ").filter(Boolean).slice(0,2).map(w=>w[0]).join("").toUpperCase();
  const SZ       = 72; // avatar diameter
  const showImg  = "img" in inf && inf.img && imgOk;

  return (
    <a
      href={inf.link}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        width:cardW, flexShrink:0,
        display:"flex", flexDirection:"column", alignItems:"center", gap:"0.55rem",
        padding:"1rem 0.5rem",
        borderRadius:14,
        background: hov ? `${inf.color}10` : "transparent",
        border:`1px solid ${hov ? inf.color+"44" : "transparent"}`,
        transition:"background 0.25s,border-color 0.25s,transform 0.3s",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        textDecoration:"none", cursor:"pointer",
      }}
    >
      {/* Avatar — real photo when available, initials fallback otherwise */}
      <div style={{
        width:SZ, height:SZ, borderRadius:"50%", overflow:"hidden", flexShrink:0,
        border:`2px solid ${hov ? inf.color : inf.color+"44"}`,
        background:`linear-gradient(135deg, ${inf.color}, ${inf.color}cc)`,
        display:"flex",alignItems:"center",justifyContent:"center",
        transition:"border-color 0.25s, box-shadow 0.25s",
        boxShadow: hov ? `0 0 0 4px ${inf.color}22` : "none",
        padding: showImg ? 3 : 0,
      }}>
        {showImg
          ? (
            <div style={{ width:"100%", height:"100%", borderRadius:"50%", overflow:"hidden", border:"2px solid #fff" }}>
              <img src={inf.img} alt={inf.name} onError={()=>setImgOk(false)} style={{ width:"100%",height:"100%",objectFit:"cover",objectPosition:"center top" }}/>
            </div>
          )
          : <span style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1.3rem",color:"#fff" }}>{initials}</span>
        }
      </div>

      {/* Name */}
      <p style={{ fontSize:"0.78rem",fontWeight:600,color: hov?"#fff":"rgba(255,255,255,0.72)",
        letterSpacing:"-0.01em",textAlign:"center",
        overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:cardW-8,
        transition:"color 0.25s",
      }}>{inf.name}</p>

      {/* Handle */}
      <p style={{ fontSize:"0.65rem",fontWeight:700,color:inf.color,letterSpacing:"0.02em" }}>
        @{inf.handle}
      </p>
    </a>
  );
}

/* ─────────────────────────────────────────────
   EVENT GALLERY — horizontal image marquee
   Auto-plays, hover pauses. "Images" are rich
   gradient cards that feel like editorial photography.
   Includes an auto-play video-style card.
───────────────────────────────────────────── */

/* Extended event data — more cards for a fuller marquee */
const GALLERY_ITEMS = [
  { title:"Lakme Fashion Week",    type:"Fashion",    year:"2024", w:320, h:240, r:-2,  bg:"linear-gradient(135deg,#1a0818,#2d1040)", accent:"#ffffff", img:"https://picsum.photos/seed/fashion2024/640/480" },
  { title:"TEDx Kolkata 2024",     type:"Conference", year:"2024", w:280, h:260, r:1.5, bg:"linear-gradient(135deg,#060d18,#0d1a30)", accent:"#3d52a8", img:"https://picsum.photos/seed/tedxstage/560/520"  },
  { title:"Sunburn Kolkata",       type:"Music Fest", year:"2025", w:360, h:240, r:-1,  bg:"linear-gradient(135deg,#180408,#2c0810)", accent:"#c4622a", img:"https://picsum.photos/seed/concert2025/720/480" },
  { title:"Brand Equity Summit",   type:"Corporate",  year:"2025", w:280, h:280, r:2,   bg:"linear-gradient(135deg,#040a08,#081814)", accent:"#2d8a6a", img:"https://picsum.photos/seed/corporatesum/560/560"},
  { title:"Film Awards Gala",      type:"Gala Night", year:"2024", w:340, h:240, r:-1.5,bg:"linear-gradient(135deg,#100a00,#201800)", accent:"#ffffff", img:"https://picsum.photos/seed/galanight/680/480"   },
  { title:"StartupIndia Expo",     type:"Exhibition", year:"2025", w:260, h:260, r:1,   bg:"linear-gradient(135deg,#020818,#040e28)", accent:"#3d52a8", img:"https://picsum.photos/seed/startupexpo/520/520" },
  { title:"Art & Culture Festival",type:"Cultural",   year:"2024", w:340, h:240, r:-2,  bg:"linear-gradient(135deg,#0d0020,#1a0038)", accent:"#d97b3f", img:"https://picsum.photos/seed/cultfest24/680/480"   },
  { title:"Corporate Diwali Bash", type:"Corporate",  year:"2024", w:280, h:260, r:1.5, bg:"linear-gradient(135deg,#140800,#281000)", accent:"#ffffff", img:"https://picsum.photos/seed/diwaliparty/560/520" },
];

function EventGallery() {
  const [paused, setPaused] = useState(false);

  return (
    <section style={{ background:P.dark2, padding:"clamp(30px,7vw,100px) 0", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ maxWidth:1440,margin:"0 auto",padding:"0 clamp(1.25rem,5vw,3rem)",marginBottom:"3rem" }}>
        <div className="gsap-up" style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-end",flexWrap:"wrap",gap:"1.5rem" }}>
          <div>
            <p style={{ fontSize:"0.62rem",fontWeight:700,letterSpacing:"0.22em",textTransform:"uppercase",color:"rgba(255,255,255,0.3)",marginBottom:"0.75rem" }}>Event Management</p>
            <h2 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"clamp(1.8rem,4vw,3.2rem)",fontWeight:400,color:"#fff",lineHeight:1.1 }}>
              Events that <em style={{ color:"#ffffff" }}>leave a mark</em>
            </h2>
            <p style={{ fontSize:"0.9rem",color:"rgba(255,255,255,0.4)",lineHeight:1.8,maxWidth:480,marginTop:"0.75rem" }}>
              From intimate brand activations to 10,000-seat spectaculars — we design, produce, and deliver events people talk about long after.
            </p>
          </div>
          <Mag><PillBtn white onClick={()=>{ const el=document.getElementById("contact"); if(!el)return; let t=0,c:HTMLElement|null=el; while(c&&c!==document.body){t+=c.offsetTop;c=c.offsetParent as HTMLElement|null;} window.scrollTo({top:t,behavior:"smooth"}); }}>Plan Your Event →</PillBtn></Mag>
        </div>
      </div>

      {/* IMAGE MARQUEE — row 1 (→ left) */}
      <div style={{ marginBottom:"1rem",position:"relative" }}>
        <div style={{ position:"absolute",inset:0,background:`linear-gradient(90deg,${P.dark2} 0%,transparent 5%,transparent 95%,${P.dark2} 100%)`,pointerEvents:"none",zIndex:2 }}/>
        <div
          style={{ overflow:"hidden" }}
          onMouseEnter={e=>{const t=e.currentTarget.querySelector<HTMLElement>(".gal-row1");if(t)t.style.animationPlayState="paused";}}
          onMouseLeave={e=>{const t=e.currentTarget.querySelector<HTMLElement>(".gal-row1");if(t)t.style.animationPlayState="running";}}
        >
          <div className="gal-row1" style={{ display:"inline-flex",gap:"1rem",animation:"mq 35s linear infinite",padding:"0.5rem 0" }}>
            {[...GALLERY_ITEMS,...GALLERY_ITEMS].map((item,i)=>(
              <GalleryCard key={i} item={item}/>
            ))}
          </div>
        </div>
      </div>

      {/* IMAGE MARQUEE — row 2 (→ right, reversed) */}
      <div style={{ marginBottom:"3rem",position:"relative" }}>
        <div style={{ position:"absolute",inset:0,background:`linear-gradient(90deg,${P.dark2} 0%,transparent 5%,transparent 95%,${P.dark2} 100%)`,pointerEvents:"none",zIndex:2 }}/>
        <div
          style={{ overflow:"hidden" }}
          onMouseEnter={e=>{const t=e.currentTarget.querySelector<HTMLElement>(".gal-row2");if(t)t.style.animationPlayState="paused";}}
          onMouseLeave={e=>{const t=e.currentTarget.querySelector<HTMLElement>(".gal-row2");if(t)t.style.animationPlayState="running";}}
        >
          <div className="gal-row2" style={{ display:"inline-flex",gap:"1rem",animation:"mqRev 40s linear infinite",padding:"0.5rem 0" }}>
            {[...[...GALLERY_ITEMS].reverse(),...[...GALLERY_ITEMS].reverse()].map((item,i)=>(
              <GalleryCard key={i} item={item} variant="tall"/>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Gallery card — real photo, unstructured rotation + mixed sizing */
function GalleryCard({ item, variant="normal" }: { item:typeof GALLERY_ITEMS[number]; variant?:"normal"|"tall" }) {
  const [hov,setHov]=useState(false);
  const [imgErr,setImgErr]=useState(false);
  const h = variant==="tall" ? item.h + 40 : item.h;
  /* row 2 gets a vertical offset for the "scattered" look */
  const yOffset = variant==="tall" ? `${Math.abs(item.r) * 8}px` : "0px";
  return (
    <div
      onMouseEnter={()=>setHov(true)}
      onMouseLeave={()=>setHov(false)}
      style={{
        width:item.w, height:h, flexShrink:0,
        borderRadius: item.r > 0 ? "14px 20px 14px 20px" : "20px 14px 20px 14px",
        overflow:"hidden", position:"relative", cursor:"pointer",
        background: item.bg,
        boxShadow: "none",
        transition:"box-shadow 0.35s, transform 0.45s cubic-bezier(0.34,1.1,0.64,1)",
        transform: hov
          ? `rotate(0deg) translateY(-8px) scale(1.04)`
          : `rotate(${item.r}deg) translateY(${yOffset})`,
        marginTop: variant==="tall" ? yOffset : "0",
      }}
    >
      {/* Real photo — fills card, zooms on hover */}
      {!imgErr && (
        <img
          src={item.img}
          alt={item.title}
          onError={()=>setImgErr(true)}
          style={{
            position:"absolute", inset:0,
            width:"100%", height:"100%",
            objectFit:"cover", display:"block",
            transition:"transform 0.55s ease",
            transform: hov?"scale(1.08)":"scale(1)",
          }}
        />
      )}

      {/* Accent top bar */}
      <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:`linear-gradient(90deg,${item.accent},transparent)`,zIndex:3 }}/>

      {/* Dark gradient overlay — deepens on hover */}
      <div style={{ position:"absolute",inset:0,background:"linear-gradient(to top,rgba(0,0,0,0.88) 0%,rgba(0,0,0,0.25) 55%,transparent 100%)",opacity:hov?1:0.78,transition:"opacity 0.35s",zIndex:2 }}/>

      {/* Content */}
      <div style={{ position:"absolute",bottom:0,left:0,right:0,padding:"1.25rem",transform:hov?"translateY(0)":"translateY(6px)",transition:"transform 0.32s",zIndex:4 }}>
        <span style={{ fontSize:"0.52rem",fontWeight:700,letterSpacing:"0.14em",textTransform:"uppercase",color:item.accent,display:"block",marginBottom:"0.3rem" }}>{item.type} · {item.year}</span>
        <h3 style={{ fontFamily:"'Playfair Display',Georgia,serif",fontSize:"1rem",fontWeight:400,color:"#fff",lineHeight:1.25 }}>{item.title}</h3>
      </div>
    </div>
  );
}
