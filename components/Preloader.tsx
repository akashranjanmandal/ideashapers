"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  /** Controls visibility. Pass `false` once your page is ready to unmount. */
  show?: boolean;
  /** Milliseconds to auto-hide if `show` is never set to false. Default: 2800 */
  autoHideMs?: number;
}

export default function Preloader({ show, autoHideMs = 2800 }: PreloaderProps) {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (show === false) {
      triggerFadeOut();
      return;
    }
    const timer = setTimeout(() => triggerFadeOut(), autoHideMs);
    return () => clearTimeout(timer);
  }, [show, autoHideMs]);

  function triggerFadeOut() {
    setFadeOut(true);
    setTimeout(() => setVisible(false), 700);
  }

  if (!visible) return null;

  return (
    <>
      <style>{`
        .is-preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          transition: opacity 0.7s ease, visibility 0.7s ease;
        }
        .is-preloader.fade-out {
          opacity: 0;
          visibility: hidden;
        }

        /* ── sky ── */
        .is-pl-sky {
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 50% 30%, #eef4fb 0%, #ffffff 60%);
        }
        .is-pl-glow {
          position: absolute;
          width: 380px;
          height: 380px;
          top: -100px;
          right: -80px;
          background: radial-gradient(circle, rgba(30,47,110,0.06) 0%, transparent 68%);
          border-radius: 50%;
          pointer-events: none;
        }

        /* ── rain drops ── */
        .is-wind {
          position: absolute;
          width: 1.5px;
          background: rgba(30,47,110,0.55);
          border-radius: 2px;
          bottom: -60px;
          animation: isPLwind 0.8s linear infinite;
        }
        .is-w1 { left: 12%; height: 40px; animation-duration: 0.55s; animation-delay: 0s; }
        .is-w2 { left: 28%; height: 28px; animation-duration: 0.45s; animation-delay: 0.35s; }
        .is-w3 { left: 45%; height: 55px; animation-duration: 0.7s;  animation-delay: 0.18s; }
        .is-w4 { left: 62%; height: 34px; animation-duration: 0.62s; animation-delay: 0.52s; }
        .is-w5 { left: 78%; height: 48px; animation-duration: 0.82s; animation-delay: 0.08s; }
        .is-w6 { left: 88%; height: 22px; animation-duration: 0.5s;  animation-delay: 0.67s; }
        .is-w7 { left: 6%;  height: 32px; animation-duration: 0.6s;  animation-delay: 0.4s; }

        /* ── clouds ── */
        .is-cloud {
          position: absolute;
          background: rgba(30,47,110,0.08);
          border-radius: 50%;
          bottom: -110px;
          animation: isPLcloud 3.5s linear infinite;
        }
        .is-cloud::after, .is-cloud::before {
          content: '';
          position: absolute;
          background: inherit;
          border-radius: 50%;
        }
        .is-c1 { width: 70px; height: 70px; left: 8%; animation-duration: 3s; }
        .is-c1::after  { width: 42px; height: 42px; top: -22px; left: 12px; }
        .is-c1::before { width: 54px; height: 54px; top: -12px; left: 28px; }
        .is-c2 { width: 90px; height: 90px; right: 10%; animation-duration: 3.8s; animation-delay: 1.2s; opacity: 0.7; }
        .is-c2::after  { width: 56px; height: 56px; top: -28px; left: 16px; }
        .is-c2::before { width: 66px; height: 66px; top: -16px; left: 40px; }
        .is-c3 { width: 55px; height: 55px; left: 40%; animation-duration: 4.2s; animation-delay: 0.7s; opacity: 0.5; }
        .is-c3::after  { width: 34px; height: 34px; top: -16px; left: 8px; }
        .is-c3::before { width: 44px; height: 44px; top: -9px; left: 20px; }

        /* ── parachutist ── */
        .is-pl-figure {
          position: absolute;
          top: 46%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 110px;
          height: 132px;
          animation: isPLsway 3.2s ease-in-out infinite;
          z-index: 10;
          filter: drop-shadow(0 16px 20px rgba(30,47,110,0.18));
        }
        .is-pl-figure svg { width: 100%; height: 100%; display: block; }


        /* ── keyframes ── */
        @keyframes isPLsway {
          0%, 100% { transform: translate(-50%, -50%) rotate(-4deg); }
          50%       { transform: translate(-50%, -43%) rotate(4deg); }
        }
        @keyframes isPLcloud {
          0%   { bottom: -110px; opacity: 0; }
          15%  { opacity: 0.9; }
          85%  { opacity: 0.85; }
          100% { bottom: 110vh; opacity: 0; }
        }
        @keyframes isPLwind {
          0%   { bottom: -60px; opacity: 0; }
          40%  { opacity: 0.9; }
          100% { bottom: 110vh; opacity: 0; }
        }
      `}</style>

      <div className={`is-preloader${fadeOut ? " fade-out" : ""}`} aria-label="Loading IdeaShapers" role="status">
        {/* Sky */}
        <div className="is-pl-sky" />
        <div className="is-pl-glow" />

        {/* Wind lines */}
        <div className="is-wind is-w1" />
        <div className="is-wind is-w2" />
        <div className="is-wind is-w3" />
        <div className="is-wind is-w4" />
        <div className="is-wind is-w5" />
        <div className="is-wind is-w6" />
        <div className="is-wind is-w7" />

        {/* Clouds */}
        <div className="is-cloud is-c1" />
        <div className="is-cloud is-c2" />
        <div className="is-cloud is-c3" />

        {/* Parachutist */}
        <div className="is-pl-figure">
          <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Ropes — navy tint */}
            <line x1="10" y1="40" x2="45" y2="80" stroke="rgba(30,47,110,0.55)" strokeWidth="1.5" />
            <line x1="90" y1="40" x2="55" y2="80" stroke="rgba(30,47,110,0.55)" strokeWidth="1.5" />
            <line x1="50" y1="35" x2="50"  y2="80" stroke="rgba(30,47,110,0.55)" strokeWidth="1.5" />

            {/* Canopy — brand accent */}
            <path d="M 10 40 Q 50 -10 90 40 Z" fill="#c4622a" />
            <path d="M 30 28 Q 50 0 70 28 L 50 35 Z" fill="#d97b3f" opacity="0.55" />
            {/* Canopy seam highlight */}
            <path d="M 10 40 Q 30 18 50 35 Q 70 18 90 40" fill="none" stroke="rgba(30,47,110,0.2)" strokeWidth="1" />

            {/* Figure — head */}
            <circle cx="50" cy="85" r="7.5" fill="#f8f9fc" stroke="#e0e4f0" strokeWidth="1" />
            {/* Body — navy */}
            <rect x="43" y="93" width="14" height="18" rx="5" fill="#1e2f6e" />
            {/* Arms */}
            <path d="M 43 95 L 32 86" stroke="#1e2f6e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 57 95 L 68 86" stroke="#1e2f6e" strokeWidth="2.5" strokeLinecap="round" />
            {/* Legs */}
            <path d="M 46 111 L 42 119" stroke="#1e2f6e" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M 54 111 L 58 119" stroke="#1e2f6e" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>


      </div>
    </>
  );
}
