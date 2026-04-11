"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useRouter } from "next/navigation";
import { CloudSecurityIntroOverlay } from "./CloudSecurityIntroOverlay";
import { AlertScene }    from "./AlertScene";
import { RiskScene }     from "./RiskScene";
import { ExfilScene }    from "./ExfilScene";
import { FixScene }      from "./FixScene";
import { HardenedScene }      from "./HardenedScene";
import { BestPracticesScene } from "./BestPracticesScene";
import { LessonsScene }       from "./LessonsScene";
import { useRoadmapWorkflowVideoMode } from "@/hooks/useRoadmapWorkflowVideoMode";
import { RoadmapWorkflowMobileWalkthrough } from "@/components/roadmaps/RoadmapWorkflowMobileWalkthrough";
import { S3_GREEN, CF_C, BLUE, AMBER, S3_RED, ALB_C, VIOLET, PURPLE } from "./cloudShared";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { label: "Alert",         threshold: 0.02, color: AMBER   },
  { label: "Exposure",      threshold: 0.20, color: S3_RED  },
  { label: "Breach",        threshold: 0.38, color: S3_RED  },
  { label: "Fix",           threshold: 0.57, color: AMBER   },
  { label: "Hardened",       threshold: 0.73, color: "#a855f7" },
  { label: "Best Practices", threshold: 0.83, color: "#8b5cf6" },
  { label: "Takeaways",      threshold: 0.93, color: "#a78bfa" },
] as const;

const PACKETS = [
  { left: "0%",   top: "18%",  anim: "packet-h",     dur: 18, delay: 0   },
  { left: "0%",   top: "62%",  anim: "packet-h",     dur: 14, delay: 3   },
  { left: "100%", top: "35%",  anim: "packet-h-rev", dur: 16, delay: 1.5 },
  { left: "100%", top: "74%",  anim: "packet-h-rev", dur: 12, delay: 4   },
  { left: "24%",  top: "0%",   anim: "packet-v",     dur: 15, delay: 0.5 },
  { left: "64%",  top: "0%",   anim: "packet-v",     dur: 18, delay: 2.5 },
  { left: "42%",  top: "100%", anim: "packet-v-rev", dur: 13, delay: 1   },
  { left: "82%",  top: "100%", anim: "packet-v-rev", dur: 15, delay: 3.5 },
];

const AUTOPLAY_BASE_PX_PER_SEC    = 180;
const INTRO_AUTOPLAY_END_PROGRESS = 0.04;
const INTRO_AUTOPLAY_SPEED_MULT   = 4;
const LENIS_WHEEL_MULT_SAFARI     = 2.65;
const LENIS_WHEEL_MULT_DEFAULT    = 0.7;

export const CloudSecurityLayout: React.FC = () => {
  const router = useRouter();
  const scrollSectionRef  = useRef<HTMLDivElement | null>(null);
  const pinnedViewportRef = useRef<HTMLDivElement | null>(null);
  const lenisRef          = useRef<Lenis | null>(null);

  const [progress, setProgress]                     = useState(0);
  const [isAutoScrolling, setIsAutoScrolling]       = useState(false);
  const [scrollSpeed, setScrollSpeed]               = useState(1.0);
  const scrollSpeedRef                              = useRef(1.0);
  const [isSpeedControlOpen, setIsSpeedControlOpen] = useState(false);
  const speedTimeoutRef                             = useRef<NodeJS.Timeout | null>(null);
  const [isRedoHovered, setIsRedoHovered]           = useState(false);
  const showRecordedWorkflow                        = useRoadmapWorkflowVideoMode();

  const readScrollY  = () => lenisRef.current?.scroll ?? window.scrollY;
  const applyScrollY = (y: number) => {
    const max     = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const clamped = Math.min(max, Math.max(0, y));
    const lenis   = lenisRef.current;
    if (lenis) lenis.scrollTo(clamped, { immediate: true, force: true });
    else window.scrollTo(0, clamped);
  };

  useEffect(() => { scrollSpeedRef.current = scrollSpeed; }, [scrollSpeed]);

  const handleSpeedInteraction = () => {
    if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current);
    speedTimeoutRef.current = setTimeout(() => setIsSpeedControlOpen(false), 3000);
  };

  useEffect(() => {
    if (isSpeedControlOpen) handleSpeedInteraction();
    return () => { if (speedTimeoutRef.current) clearTimeout(speedTimeoutRef.current); };
  }, [isSpeedControlOpen, scrollSpeed]);

  useEffect(() => {
    if (showRecordedWorkflow || !isAutoScrolling) return;
    let lastScrollY = readScrollY(), lastTime = performance.now(), virtualY = lastScrollY, stopped = false;
    const onTick = () => {
      if (stopped) return;
      const cur = readScrollY();
      if (Math.abs(cur - lastScrollY) > 5) { stopped = true; gsap.ticker.remove(onTick); setIsAutoScrolling(false); return; }
      const now = performance.now(), dt = now - lastTime; lastTime = now;
      let amt = AUTOPLAY_BASE_PX_PER_SEC * (dt / 1000) * scrollSpeedRef.current;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      if ((cur / max) < INTRO_AUTOPLAY_END_PROGRESS) amt *= INTRO_AUTOPLAY_SPEED_MULT;
      virtualY = Math.min(max, virtualY + amt);
      applyScrollY(virtualY);
      lastScrollY = readScrollY();
      if (readScrollY() >= max - 10) { stopped = true; gsap.ticker.remove(onTick); setIsAutoScrolling(false); }
    };
    gsap.ticker.add(onTick);
    return () => { stopped = true; gsap.ticker.remove(onTick); };
  }, [isAutoScrolling, showRecordedWorkflow]);

  useEffect(() => {
    if (showRecordedWorkflow || !scrollSectionRef.current || !pinnedViewportRef.current) return;
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    const lenis = new Lenis({ lerp: 0.05, wheelMultiplier: isSafari ? LENIS_WHEEL_MULT_SAFARI : LENIS_WHEEL_MULT_DEFAULT });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => { lenis.raf(time * 1000); };
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    const ctx = gsap.context(() => {
      gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollSectionRef.current, start: "top top", end: "bottom bottom",
          scrub: 3, pin: pinnedViewportRef.current, anticipatePin: 1,
          onUpdate: (self) => setProgress(self.progress),
        },
      }).to({}, { duration: 1 });
    }, scrollSectionRef);
    return () => { ctx.revert(); gsap.ticker.remove(update); lenis.destroy(); lenisRef.current = null; };
  }, [showRecordedWorkflow]);

  if (showRecordedWorkflow) {
    return <RoadmapWorkflowMobileWalkthrough slug="cloud-security" />;
  }

  return (
    <section ref={scrollSectionRef} className="relative h-[2400vh] w-screen" style={{ background: "#07090f" }}>
      <div ref={pinnedViewportRef} className="sticky top-0 flex h-screen min-h-[600px] w-screen items-center justify-center overflow-hidden">

        {/* Background — dark blue grid */}
        <div className="pointer-events-none absolute inset-0 z-0" aria-hidden>
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage: [
              "radial-gradient(ellipse at 50% 38%, rgba(168,85,247,0.03) 0%, transparent 58%)",
              "radial-gradient(circle at center, transparent 0%, rgba(7,9,15,0.88) 100%)",
              "linear-gradient(to right, rgba(139,92,246,0.06) 1px, transparent 1px)",
              "linear-gradient(to bottom, rgba(139,92,246,0.06) 1px, transparent 1px)",
            ].join(", "),
            backgroundSize: "100% 100%, 100% 100%, 44px 44px, 44px 44px",
          }} />
          {PACKETS.map((p, i) => (
            <div key={i} className="data-packet" style={{
              left: p.left, top: p.top,
              animation: `${p.anim} ${p.dur}s linear infinite`,
              animationDelay: `${p.delay}s`,
              background: "rgba(168,85,247,0.35)",
              boxShadow: "0 0 6px rgba(168,85,247,0.2)",
            }} />
          ))}
        </div>

        {/* Scenes */}
        <div className="absolute inset-0 z-10">
          <AlertScene    progress={progress} />
          <RiskScene     progress={progress} />
          <ExfilScene    progress={progress} />
          <FixScene      progress={progress} />
          <HardenedScene      progress={progress} />
          <BestPracticesScene progress={progress} />
          <LessonsScene       progress={progress} />
        </div>

        {/* Intro overlay */}
        <div className="pointer-events-none absolute inset-0 z-20">
          <CloudSecurityIntroOverlay
            progress={progress}
            onPlay={() => setIsAutoScrolling(true)}
            isAutoScrolling={isAutoScrolling}
          />
        </div>

        {/* Timeline bar */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-30 border-t px-4 py-2 backdrop-blur-sm"
          style={{
            borderColor: "rgba(168,85,247,0.08)",
            background: "rgba(7,9,15,0.6)",
            opacity: progress >= 0.04 ? 1 : 0,
            transition: "opacity 0.5s",
          }}
        >
          <div className="flex items-center justify-center gap-1">
            {TIMELINE.map((phase, i) => {
              const isActive   = progress >= phase.threshold;
              const nextActive = i < TIMELINE.length - 1 && progress >= TIMELINE[i + 1].threshold;
              const dc         = isActive ? phase.color : "rgba(148,163,184,0.15)";
              return (
                <React.Fragment key={phase.label}>
                  <div className="flex flex-col items-center gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full border-2 transition-all duration-500"
                      style={{
                        borderColor: isActive ? phase.color : "rgba(148,163,184,0.18)",
                        background:  isActive ? phase.color : "transparent",
                        boxShadow:   isActive ? `0 0 8px ${phase.color}80` : "none",
                      }} />
                    <p className="whitespace-nowrap font-mono text-[6.5px] uppercase tracking-widest transition-colors duration-500"
                      style={{ color: isActive ? phase.color : "rgba(148,163,184,0.22)" }}>
                      {phase.label}
                    </p>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div className="mb-4 mx-2 h-px transition-all duration-700"
                      style={{
                        width: "40px",
                        background: nextActive ? "rgba(148,163,184,0.25)" : "rgba(148,163,184,0.07)",
                      }} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* Speed + Play (top-right) */}
        <div className="fixed top-10 right-10 z-[1000] flex items-center gap-4 transition-all duration-700"
          style={{
            opacity:       progress > 0.01 ? 1 : 0,
            transform:     progress > 0.01 ? "translateY(0)" : "translateY(-20px)",
            pointerEvents: progress > 0.01 ? "auto" : "none",
          }}
        >
          <div className="relative flex items-center" onMouseMove={handleSpeedInteraction}>
            <div className="absolute right-6 flex items-center justify-between rounded-l-full border-y border-l pl-5 pr-8 h-12 backdrop-blur-md transition-all duration-300 overflow-hidden"
              style={{
                borderColor: "rgba(168,85,247,0.15)",
                background:  "rgba(7,9,15,0.8)",
                opacity:       isSpeedControlOpen ? 1 : 0,
                pointerEvents: isSpeedControlOpen ? "auto" : "none",
                transform:     isSpeedControlOpen ? "translateX(0)" : "translateX(20px)",
                width:         isSpeedControlOpen ? "180px" : "0px",
              }}
            >
              <input type="range" min="0.5" max="2" step="0.1" value={scrollSpeed}
                onChange={e => { setScrollSpeed(parseFloat(e.target.value)); handleSpeedInteraction(); }}
                className="w-full cursor-pointer"
                style={{ height: "2px", appearance: "none", outline: "none", borderRadius: "2px", background: "rgba(168,85,247,0.2)" }}
              />
              <button onClick={() => setIsSpeedControlOpen(false)}
                className="scrolly-control-btn ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full hover:bg-white/10 text-slate-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
            <button onClick={() => { setIsSpeedControlOpen(!isSpeedControlOpen); if (!isSpeedControlOpen) handleSpeedInteraction(); }}
              className="scrolly-control-btn relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300"
              style={{
                borderColor: isSpeedControlOpen ? "rgba(168,85,247,0.5)" : "rgba(255,255,255,0.1)",
                background:  isSpeedControlOpen ? "rgba(7,9,20,0.85)"    : "rgba(7,9,15,0.4)",
                boxShadow:   isSpeedControlOpen ? "0 0 14px rgba(168,85,247,0.3)" : "none",
              }}
            >
              <span className="font-mono text-[10px] font-bold" style={{ color: "white" }}>{scrollSpeed.toFixed(1)}x</span>
            </button>
            <style>{`input[type=range]::-webkit-slider-thumb{appearance:none;width:12px;height:12px;background:#8b5cf6;border-radius:50%;cursor:pointer;box-shadow:0 0 8px rgba(139,92,246,0.6);}`}</style>
          </div>

          <button onClick={() => setIsAutoScrolling(!isAutoScrolling)}
            className="scrolly-control-btn group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-white backdrop-blur-md transition-all duration-300"
            style={{
              borderColor: isAutoScrolling ? "rgba(168,85,247,0.5)"  : "rgba(255,255,255,0.1)",
              background:  isAutoScrolling ? "rgba(10,8,15,0.85)"   : "rgba(7,9,15,0.4)",
              boxShadow:   isAutoScrolling ? "0 0 18px rgba(168,85,247,0.3)" : "none",
            }}
          >
            {isAutoScrolling
              ? <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              : <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5"><path d="M8 5v14l11-7z"/></svg>
            }
          </button>
        </div>

        {/* Home (top-left) */}
        <div className="fixed top-10 left-10 z-[1000] transition-all duration-700"
          style={{
            opacity:       progress > 0.01 ? 1 : 0,
            transform:     progress > 0.01 ? "translateY(0)" : "translateY(-20px)",
            pointerEvents: progress > 0.01 ? "auto" : "none",
          }}
        >
          <button onClick={() => router.push("/")}
            className="scrolly-control-btn group relative flex h-12 w-12 items-center justify-center rounded-full border text-white backdrop-blur-md transition-all hover:scale-110"
            style={{ borderColor: "rgba(168,85,247,0.2)", background: "rgba(7,9,15,0.45)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>
        </div>

        {/* Rewatch */}
        <div style={{
          position: "fixed", bottom: 100, right: 40, zIndex: 500,
          opacity:    progress > 0.99 ? 1 : 0,
          visibility: progress > 0.99 ? "visible" : "hidden",
          transform:  progress > 0.99 ? "scale(1)" : "scale(0.8)",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}>
          <button
            className="scrolly-control-btn" type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            onMouseEnter={() => setIsRedoHovered(true)}
            onMouseLeave={() => setIsRedoHovered(false)}
            style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "rgba(7,9,15,0.9)", backdropFilter: "blur(12px)",
              border: `1px solid ${VIOLET}50`, color: VIOLET,
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", boxShadow: `0 0 18px ${VIOLET}30`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"/>
              <path d="M21 3v5h-5"/>
            </svg>
            {isRedoHovered && (
              <div style={{
                position: "absolute", right: "110%", top: "50%", transform: "translateY(-50%)",
                background: "rgba(7,9,15,0.92)", backdropFilter: "blur(8px)",
                border: `1px solid ${VIOLET}25`, borderRadius: 8,
                padding: "8px 16px", whiteSpace: "nowrap",
                fontSize: 10, fontFamily: "monospace", color: VIOLET,
                letterSpacing: "0.1em", textTransform: "uppercase",
              }}>Rewatch</div>
            )}
          </button>
        </div>

      </div>
    </section>
  );
};
