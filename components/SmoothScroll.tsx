"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ──────────────────────────────────────────────────────────
   Buttery lerp scroll — desktop only (≤900px uses native).
   Works by:
   1. Setting body height so the page scrolls normally
   2. Fixing the viewport, intercepting wheel events
   3. Lerping toward the target scroll position on each
      GSAP ticker frame using a configurable ease factor
   4. Keeping ScrollTrigger in sync via scrollY proxy
──────────────────────────────────────────────────────────  */

const LERP  = 0.072;   // lower = slower / more buttery (0.05–0.12)
const BREAK = 900;     // px — mobile breakpoint

export default function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.innerWidth <= BREAK) return;

    let current  = window.scrollY;
    let target   = window.scrollY;
    let rafId    = 0;
    let running  = true;

    /* proxy: ScrollTrigger reads from this object */
    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(v) {
        if (arguments.length && v !== undefined) {
          current = v as number;
          target  = v as number;
        }
        return current;
      },
      getBoundingClientRect() {
        return { top:0, left:0, width:window.innerWidth, height:window.innerHeight };
      },
      pinType: "transform",
    });

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      target += e.deltaY * 0.9;
      target  = Math.max(0, Math.min(target, document.body.scrollHeight - window.innerHeight));
    }

    function tick() {
      if (!running) return;
      const diff = target - current;
      if (Math.abs(diff) > 0.1) {
        current += diff * LERP;
        window.scrollTo(0, current);
        ScrollTrigger.update();
      }
      rafId = requestAnimationFrame(tick);
    }

    window.addEventListener("wheel", onWheel, { passive: false });
    rafId = requestAnimationFrame(tick);

    /* refresh ScrollTrigger when layout settles */
    setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      running = false;
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel", onWheel);
      ScrollTrigger.scrollerProxy(document.documentElement, undefined as never);
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}
