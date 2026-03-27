"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useRouter } from "next/navigation";
import { WebHackingIntroOverlay } from "./WebHackingIntroOverlay";
import { TargetAppearsScene }    from "./TargetAppearsScene";
import { OsintToolScene }       from "./OsintToolScene";
import { PassiveReconScene }    from "./PassiveReconScene";
import { ActiveReconScene }     from "./ActiveReconScene";
import { InitialAccessScene }   from "./InitialAccessScene";
import { SQLiScene }            from "./SQLiScene";
import { ExfilScene }          from "./ExfilScene";
import { ReportScene }         from "./ReportScene";

gsap.registerPlugin(ScrollTrigger);

// ── Phase timeline ─────────────────────────────────────────────────────────────
// Thresholds use raw scroll progress (0–1 of total 1600vh).
// Early phases (0–0.75 raw) map to 0–0.60 of old scene scale (2× more scroll).
// Late phases (0.75–1.0 raw) map to 0.60–1.0 unchanged (same abs distance as before).
const TIMELINE = [
  { label: "Recon",        threshold: 0.12 },
  { label: "Scanning",     threshold: 0.32 },
  { label: "Exploit",      threshold: 0.52 },
  { label: "Post-Exploit", threshold: 0.72 },
  { label: "Report",       threshold: 0.89 },
] as const;

// Theme accent
const ROSE = "#f43f5e";
const ROSE_GLOW = "rgba(244,63,94,0.35)";
const ROSE_DIM  = "rgba(244,63,94,0.22)";

// Background data packets — same pattern as SOC/AI layouts
const PACKETS = [
  { left: "0%",   top: "15%", anim: "packet-h",     dur: 14, delay: 0   },
  { left: "0%",   top: "40%", anim: "packet-h",     dur: 11, delay: 2   },
  { left: "100%", top: "25%", anim: "packet-h-rev", dur: 12, delay: 3   },
  { left: "20%",  top: "0%",  anim: "packet-v",     dur: 13, delay: 1   },
  { left: "80%",  top: "0%",  anim: "packet-v",     dur: 15, delay: 2   },
  { left: "35%",  top: "100%",anim: "packet-v-rev", dur: 11, delay: 0   },
  { left: "65%",  top: "100%",anim: "packet-v-rev", dur: 12, delay: 2.5 },
];

export const WebHackingLayout: React.FC = () => {
  const router = useRouter();

  // DOM refs
  const scrollSectionRef  = useRef<HTMLDivElement | null>(null);
  const pinnedViewportRef = useRef<HTMLDivElement | null>(null);
  const stageRef          = useRef<HTMLDivElement | null>(null);

  // Lenis ref — lets auto-scroll drive it directly (avoids window.scrollBy / lerp desync)
  const lenisRef = useRef<Lenis | null>(null);

  const [progress, setProgress]           = useState(0);

  // Linear progress across 8000vh for a calm, premium reading experience
  const sceneProgress = progress;
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(1.0);
  const scrollSpeedRef = useRef(1.0);
  const [isSpeedControlOpen, setIsSpeedControlOpen] = useState(false);
  const speedTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isRedoHovered, setIsRedoHovered] = useState(false);

  // Sync state to ref for animation loop
  useEffect(() => {
    scrollSpeedRef.current = scrollSpeed;
  }, [scrollSpeed]);

  const handleSpeedInteraction = () => {
    if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current);
    speedTimeoutRef.current = setTimeout(() => {
      setIsSpeedControlOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (isSpeedControlOpen) {
      handleSpeedInteraction();
    }
    return () => {
      if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current);
    };
  }, [isSpeedControlOpen, scrollSpeed]);

  // ── Auto-scroll via Lenis ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isAutoScrolling) return;

    let userInterrupted = false;
    let rafId: number;
    let currentVirtualScroll = window.scrollY; // Accumulator for fractional pixel scrolls

    const onWheel     = () => { userInterrupted = true; setIsAutoScrolling(false); };
    const onTouchMove = () => { userInterrupted = true; setIsAutoScrolling(false); };
    window.addEventListener("wheel",      onWheel,     { passive: true });
    window.addEventListener("touchmove",  onTouchMove, { passive: true });

    const scrollStep = () => {
      if (userInterrupted) return;
      const lenis    = lenisRef.current;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (!lenis || window.scrollY >= maxScroll - 10) {
        setIsAutoScrolling(false);
        return;
      }
      
      currentVirtualScroll += (0.6 * scrollSpeedRef.current);
      lenis.scrollTo(currentVirtualScroll, { immediate: true });
      
      rafId = requestAnimationFrame(scrollStep);
    };

    rafId = requestAnimationFrame(scrollStep);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("wheel",     onWheel);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isAutoScrolling]);

  // ── GSAP + Lenis ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!scrollSectionRef.current || !pinnedViewportRef.current) return;

    const lenis = new Lenis({ lerp: 0.05, wheelMultiplier: 0.5 });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    function update(time: number) { lenis.raf(time * 1000); }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top top",
          end:   "bottom bottom",
          scrub: 3,
          pin:   pinnedViewportRef.current,
          anticipatePin: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      });
      // Minimal tween so ScrollTrigger fires onUpdate reliably
      tl.to({}, { duration: 1 });
    }, scrollSectionRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <section ref={scrollSectionRef} className="relative h-[2000vh] w-screen bg-slate-950">
      <div
        ref={pinnedViewportRef}
        className="sticky top-0 flex h-screen min-h-[600px] w-screen items-center justify-center overflow-hidden"
      >
        {/* ── Background: dark grid + rose tint + packets ────────────────── */}
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage: [
              "radial-gradient(ellipse at 50% 40%, rgba(244,63,94,0.06) 0%, transparent 65%)",
              "radial-gradient(circle at center, transparent 0%, rgba(2,6,23,0.92) 100%)",
              "linear-gradient(to right, rgba(30,15,20,0.6) 1px, transparent 1px)",
              "linear-gradient(to bottom, rgba(30,15,20,0.6) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "100% 100%, 100% 100%, 40px 40px, 40px 40px",
          }}
          aria-hidden
        >
          {PACKETS.map((p, i) => (
            <div
              key={i}
              className="data-packet"
              style={{
                left: p.left,
                top: p.top,
                animation: `${p.anim} ${p.dur}s linear infinite`,
                animationDelay: `${p.delay}s`,
                background: ROSE,
                boxShadow: `0 0 8px ${ROSE_GLOW}`,
              }}
            />
          ))}
        </div>

        {/* ── Main stage ────────────────────────────────────────────────── */}
        <div ref={stageRef} className="absolute inset-0 z-10">
          {/* Phase 1.1 — The Target Appears (5–10%) */}
          <TargetAppearsScene progress={sceneProgress} />
          {/* Phase 1.2a — OSINT Tool Flash: DNSDumpster (10–12.5%) */}
          <OsintToolScene progress={sceneProgress} />
          {/* Phase 1.2b — Passive Recon Panels (12.5–20%) */}
          <PassiveReconScene progress={sceneProgress} />
          {/* Phase 1.3 — Active Recon: nmap + dirbusting (20–30%) */}
          <ActiveReconScene progress={sceneProgress} />
          {/* Phase 2.1 — Initial Access: admin portal (30–40%) */}
          <InitialAccessScene progress={sceneProgress} />
          {/* Phase 2.2 — SQL Injection + admin dashboard (40–60%) */}
          <SQLiScene progress={sceneProgress} />
          {/* Phase 2.3 — Data Exfiltration (60–78%) */}
          <ExfilScene progress={sceneProgress} />
          {/* Phase 3 — Report + Career Card (78–100%) */}
          <ReportScene progress={sceneProgress} />
        </div>

        {/* ── Intro overlay (0 – 5%) ─────────────────────────────────────── */}
        {/* pointer-events-none on wrapper so career card button (z-10) isn't blocked */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <WebHackingIntroOverlay
            progress={sceneProgress}
            onPlay={() => setIsAutoScrolling(true)}
            isAutoScrolling={isAutoScrolling}
          />
        </div>

        {/* ── Timeline nav — bottom bar ──────────────────────────────────── */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 border-t px-8 py-3 backdrop-blur-sm transition-opacity duration-500"
          style={{
            borderColor: "rgba(244,63,94,0.12)",
            background: "rgba(2,6,23,0.45)",
            opacity: progress >= 0.05 ? 1 : 0,
          }}
        >
          <div className="flex items-center justify-center gap-0">
            {TIMELINE.map((phase, i) => {
              const isActive  = progress >= phase.threshold;
              const nextActive = i < TIMELINE.length - 1 && progress >= TIMELINE[i + 1].threshold;
              return (
                <React.Fragment key={phase.label}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className="h-3 w-3 rounded-full border-2 transition-all duration-500"
                      style={{
                        borderColor: isActive ? ROSE        : "rgba(71,85,105,0.5)",
                        background:  isActive ? ROSE        : "transparent",
                        boxShadow:   isActive ? `0 0 10px ${ROSE_GLOW}` : "none",
                      }}
                    />
                    <p
                      className="whitespace-nowrap font-mono text-[8px] uppercase tracking-widest transition-colors duration-500"
                      style={{ color: isActive ? ROSE : "rgba(71,85,105,0.5)" }}
                    >
                      {phase.label}
                    </p>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div
                      className="mb-5 mx-3 h-px w-16 transition-all duration-700"
                      style={{
                        background:  nextActive ? ROSE_DIM  : "rgba(71,85,105,0.3)",
                        boxShadow:   nextActive ? `0 0 6px ${ROSE_DIM}` : "none",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ── Persistent play / pause toggle + Speed Control — top right ────────────── */}
        <div
          className="fixed top-10 right-10 z-[1000] flex items-center gap-4 transition-all duration-700"
          style={{
            opacity:       progress > 0.01 ? 1 : 0,
            transform:     progress > 0.01 ? "translateY(0)" : "translateY(-20px)",
            pointerEvents: progress > 0.01 ? "auto" : "none",
          }}
        >
          {/* Speed Control Wrapper */}
          <div className="relative flex items-center" onMouseMove={handleSpeedInteraction} onTouchMove={handleSpeedInteraction}>
            {/* Expanded Slider Panel */}
            <div
              className="absolute right-6 flex items-center justify-between rounded-l-full border-y border-l pl-5 pr-8 h-12 backdrop-blur-md transition-all duration-300 overflow-hidden"
              style={{
                borderColor: "rgba(255,255,255,0.1)",
                background: "rgba(2,6,23,0.75)",
                opacity: isSpeedControlOpen ? 1 : 0,
                pointerEvents: isSpeedControlOpen ? "auto" : "none",
                transform: isSpeedControlOpen ? "translateX(0)" : "translateX(20px)",
                width: isSpeedControlOpen ? "180px" : "0px",
              }}
            >
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={scrollSpeed}
                onChange={(e) => {
                  setScrollSpeed(parseFloat(e.target.value));
                  handleSpeedInteraction();
                }}
                className="w-full accent-rose-500 cursor-pointer"
                style={{
                  height: "2px",
                  background: "rgba(255,255,255,0.2)",
                  appearance: "none",
                  outline: "none",
                  borderRadius: "2px",
                }}
              />
              <button 
                onClick={() => setIsSpeedControlOpen(false)}
                className="ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => {
                setIsSpeedControlOpen(!isSpeedControlOpen);
                if (!isSpeedControlOpen) handleSpeedInteraction();
              }}
              className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300"
              style={{
                borderColor: isSpeedControlOpen ? "rgba(244,63,94,0.5)" : "rgba(255,255,255,0.1)",
                background: isSpeedControlOpen ? "rgba(15,3,7,0.8)" : "rgba(2,6,23,0.4)",
                boxShadow: isSpeedControlOpen ? `0 0 15px ${ROSE_GLOW}` : "none",
              }}
            >
              <span className="font-mono text-[10px] font-bold" style={{ color: ROSE }}>
                {scrollSpeed.toFixed(1)}x
              </span>
            </button>

            <style>{`
              input[type=range]::-webkit-slider-thumb {
                appearance: none;
                width: 12px;
                height: 12px;
                background: ${ROSE};
                border-radius: 50%;
                cursor: pointer;
                box-shadow: 0 0 10px ${ROSE_GLOW};
                transition: transform 0.1s;
              }
              input[type=range]::-webkit-slider-thumb:hover {
                transform: scale(1.2);
              }
            `}</style>
          </div>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-white backdrop-blur-md transition-all duration-300"
            style={{
              borderColor: isAutoScrolling ? "rgba(244,63,94,0.5)" : "rgba(255,255,255,0.1)",
              background:  isAutoScrolling ? "rgba(15,3,7,0.8)"    : "rgba(2,6,23,0.4)",
              boxShadow:   isAutoScrolling ? `0 0 20px ${ROSE_GLOW}` : "none",
            }}
          >
            {isAutoScrolling ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
            <div className="absolute top-[120%] mr-0 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none backdrop-blur-sm"
              style={{ color: ROSE }}>
              {isAutoScrolling ? "Pause" : "Resume"}
            </div>
          </button>
        </div>

        {/* ── Home button — top left ───────────────────── */}
        <div
          className="fixed top-10 left-10 z-[1000] flex items-center gap-3 transition-all duration-700"
          style={{
            opacity:       progress > 0.01 ? 1 : 0,
            transform:     progress > 0.01 ? "translateY(0)" : "translateY(-20px)",
            pointerEvents: progress > 0.01 ? "auto" : "none",
          }}
        >
          {/* Home */}
          <button
            onClick={() => router.push("/")}
            className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-white/30 hover:bg-slate-900/60"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            <div className="absolute left-full ml-4 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none backdrop-blur-sm"
              style={{ color: ROSE }}>
              Return Home
            </div>
          </button>
        </div>

        {/* ── Rewatch button — appears at end ────────────────────────────── */}
        <div
          style={{
            position:   "fixed",
            bottom:     "100px",
            right:      "40px",
            zIndex:     500,
            opacity:    progress > 0.955 ? 1 : 0,
            visibility: progress > 0.955 ? "visible" : "hidden",
            transform:  progress > 0.955 ? "scale(1)" : "scale(0.8)",
            transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseEnter={() => setIsRedoHovered(true)}
            onMouseLeave={() => setIsRedoHovered(false)}
            style={{
              width: 56, height: 56, borderRadius: "50%",
              background:     "rgba(2,6,23,0.85)",
              backdropFilter: "blur(12px)",
              border:         `1px solid rgba(244,63,94,0.3)`,
              color:          ROSE,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              boxShadow: `0 0 20px ${ROSE_GLOW}`,
              transition: "all 0.3s ease",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
              <path d="M21 3v5h-5" />
            </svg>
            {isRedoHovered && (
              <div style={{
                position: "absolute", right: "110%", top: "50%", transform: "translateY(-50%)",
                background: "rgba(15,3,7,0.9)", backdropFilter: "blur(8px)",
                border: "1px solid rgba(244,63,94,0.2)", borderRadius: 8,
                padding: "8px 16px", whiteSpace: "nowrap",
                fontSize: 10, fontFamily: "monospace", color: ROSE,
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>
                Rewatch the workflow
              </div>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
