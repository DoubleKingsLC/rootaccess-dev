"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorldStage } from "./WorldStage";
import { IntroOverlay } from "./IntroOverlay";
import { CareerRoadmap } from "./CareerRoadmap";
import { IntelTicker } from "./IntelTicker";
import { MonitorPortal } from "./MonitorPortal";
import { NarrativeOverlay } from "./NarrativeOverlay";
import { PostMortem } from "./PostMortem";
import { SOCMobileExperience } from "./SOCMobileExperience";
import { TacticalBriefing } from "./TacticalBriefing";
import { useIsMobile } from "../../hooks/useIsMobile";
import Lenis from "lenis";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

type ScrollytellingLayoutProps = {
  children?: React.ReactNode;
};

type Orientation = "horizontal" | "vertical";

export const PHASES = {
  INTRO: [0.0, 0.05],
  SOC_OPERATIONS: [0.05, 0.85],
  EXIT_TO_ROADMAP: [0.85, 1.0]
};

// ── Incident Timeline nodes ───────────────────────────────────────────────────
const TIMELINE = [
  { label: "Detection", threshold: 0.08 },
  { label: "Triage", threshold: 0.30 },
  { label: "Analysis", threshold: 0.57 },
  { label: "Containment", threshold: 0.78 },
  { label: "Recovery", threshold: 0.85 },
] as const;

const PACKETS = [
  { left: "0%", top: "15%", anim: "packet-h", dur: 14, delay: 0 },
  { left: "0%", top: "40%", anim: "packet-h", dur: 11, delay: 2 },
  { left: "100%", top: "25%", anim: "packet-h-rev", dur: 12, delay: 3 },
  { left: "20%", top: "0%", anim: "packet-v", dur: 13, delay: 1 },
  { left: "80%", top: "0%", anim: "packet-v", dur: 15, delay: 2 },
  { left: "35%", top: "100%", anim: "packet-v-rev", dur: 11, delay: 0 },
  { left: "65%", top: "100%", anim: "packet-v-rev", dur: 12, delay: 2.5 }
];

export const ScrollytellingLayout: React.FC<ScrollytellingLayoutProps> = () => {
  const scrollSectionRef = useRef<HTMLDivElement | null>(null);
  const pinnedViewportRef = useRef<HTMLDivElement | null>(null);
  const socStageRef = useRef<HTMLDivElement | null>(null);
  const worldStageRef = useRef<HTMLDivElement | null>(null);
  const baseStageWidthRef = useRef<number | null>(null);
  const router = useRouter();
  const l1DeskRef = useRef<HTMLDivElement | null>(null);
  const l2DeskRef = useRef<HTMLDivElement | null>(null);
  const l3DeskRef = useRef<HTMLDivElement | null>(null);
  const l3DiskRef = useRef<HTMLDivElement | null>(null);
  const l1MonitorRef = useRef<HTMLDivElement | null>(null);
  const l2MonitorRef = useRef<HTMLDivElement | null>(null);
  const l3MonitorRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const zoomWrapperRef = useRef<HTMLDivElement | null>(null);
  const briefingL1Ref = useRef<HTMLDivElement | null>(null);
  const briefingL2Ref = useRef<HTMLDivElement | null>(null);
  const briefingL3Ref = useRef<HTMLDivElement | null>(null);
  const briefingPostMortemRef = useRef<HTMLDivElement | null>(null);


  const [progress, setProgress] = useState(0);
  const [stageScaleFactor, setStageScaleFactor] = useState(1);
  const isMobile = useIsMobile(768);
  const [orientation, setOrientation] = useState<Orientation>("horizontal");
  const [isRedoHovered, setIsRedoHovered] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);

  // ── Auto-scrolling logic ───────────────────────────────────────────
  useEffect(() => {
    if (!isAutoScrolling) return;

    let lastScrollY = window.scrollY;
    let rafId: number;

    const scrollStep = () => {
      // Small tolerance to allow for pixel precision differences
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 5) {
        setIsAutoScrolling(false);
        return;
      }

      window.scrollBy(0, 2.25); // Smooth automated scroll (speed increased by 50%)
      lastScrollY = window.scrollY;

      if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 10) {
        rafId = requestAnimationFrame(scrollStep);
      } else {
        setIsAutoScrolling(false);
      }
    };

    rafId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(rafId);
  }, [isAutoScrolling]);

  const ZOOM_SCALE = 4.5;

  const getCameraOffset = (targetRef: React.RefObject<HTMLDivElement | null>) => {
    if (!targetRef.current || !pinnedViewportRef.current) return { x: 0, y: 0 };
    const target = targetRef.current.getBoundingClientRect();
    const viewport = pinnedViewportRef.current.getBoundingClientRect();
    const targetCenterX = target.left + target.width / 2;
    const targetCenterY = target.top + target.height / 2;
    const viewportCenterX = viewport.left + viewport.width / 2;
    const viewportCenterY = viewport.top + viewport.height / 2;
    return {
      x: (viewportCenterX - targetCenterX) * ZOOM_SCALE,
      y: (viewportCenterY - targetCenterY) * ZOOM_SCALE
    };
  };

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        if (worldStageRef.current) {
          const stageRect = worldStageRef.current.getBoundingClientRect();
          if (!baseStageWidthRef.current) {
            baseStageWidthRef.current = stageRect.width || window.innerWidth || 1;
          }
          const baseWidth = baseStageWidthRef.current || 1;
          const scaleX = window.innerWidth / baseWidth;
          const scaleY = window.innerHeight / 900;
          const scale = Math.min(1, scaleX, scaleY);
          setStageScaleFactor(scale || 1);
        }
        setOrientation(window.innerWidth < 768 ? "vertical" : "horizontal");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!scrollSectionRef.current || !pinnedViewportRef.current || !worldStageRef.current) return;

    const lenis = new Lenis({ lerp: 0.05, wheelMultiplier: 0.7 });
    lenis.on("scroll", ScrollTrigger.update);
    function update(time: number) { lenis.raf(time * 1000); }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      const stageEl = worldStageRef.current!;
      gsap.set(stageEl, { opacity: 0, filter: "blur(0px)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 3,
          pin: pinnedViewportRef.current,
          anticipatePin: 1,
          onUpdate: (self) => setProgress(self.progress)
        }
      });

      tl.fromTo(stageEl, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: "power1.out" }, 0);

      const workstations = [l1DeskRef.current, l2DeskRef.current, l3DeskRef.current];

      // ── L1 Portal ─────────────────────────────────────────────────────────
      tl.to(zoomWrapperRef.current, { scale: ZOOM_SCALE, x: () => getCameraOffset(l1DeskRef).x, y: () => getCameraOffset(l1DeskRef).y, duration: 0.05, ease: "power4.out" }, 0.12);
      tl.to(workstations, { autoAlpha: 0, duration: 0.05, ease: "power4.out" }, 0.12);

      // L1 Briefing Animation
      tl.fromTo(briefingL1Ref.current, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1.0, duration: 0.02, ease: "power2.out" }, 0.11);
      tl.to(briefingL1Ref.current, { autoAlpha: 0, scale: 1.1, duration: 0.02, ease: "power2.in" }, 0.13);

      tl.fromTo(l1MonitorRef.current, { autoAlpha: 0, scale: 0.8, filter: "blur(10px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "expo.out" }, 0.13);
      tl.to(workstations, { autoAlpha: 1, duration: 0.04, ease: "power2.inOut", immediateRender: false }, 0.30);
      tl.to(l1MonitorRef.current, { autoAlpha: 0, scale: 0.8, filter: "blur(10px)", duration: 0.05 }, 0.30);
      tl.to(zoomWrapperRef.current, { scale: 1, x: 0, y: 0, duration: 0.05, ease: "power2.in" }, 0.30);

      // ── L2 Portal ─────────────────────────────────────────────────────────
      tl.to(zoomWrapperRef.current, { scale: ZOOM_SCALE, x: () => getCameraOffset(l2DeskRef).x, y: () => getCameraOffset(l2DeskRef).y, duration: 0.05, ease: "power4.out" }, 0.38);
      tl.to(workstations, { autoAlpha: 0, duration: 0.05, ease: "power4.out" }, 0.38);

      // L2 Briefing Animation
      tl.fromTo(briefingL2Ref.current, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1.0, duration: 0.015, ease: "power2.out" }, 0.37);
      tl.to(briefingL2Ref.current, { autoAlpha: 0, scale: 1.1, duration: 0.015, ease: "power2.in" }, 0.385);

      tl.fromTo(l2MonitorRef.current, { autoAlpha: 0, scale: 0.8, filter: "blur(10px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "expo.out" }, 0.39);
      tl.to(workstations, { autoAlpha: 1, duration: 0.04, ease: "power2.inOut", immediateRender: false }, 0.52);
      tl.to(l2MonitorRef.current, { autoAlpha: 0, scale: 0.8, filter: "blur(10px)", duration: 0.05 }, 0.52);
      tl.to(zoomWrapperRef.current, { scale: 1, x: 0, y: 0, duration: 0.05, ease: "power2.in" }, 0.52);

      // ── L3 Portal ─────────────────────────────────────────────────────────
      tl.to(zoomWrapperRef.current, { scale: ZOOM_SCALE, x: () => getCameraOffset(l3DeskRef).x, y: () => getCameraOffset(l3DeskRef).y, duration: 0.05, ease: "power4.out" }, 0.58);
      tl.to(workstations, { autoAlpha: 0, duration: 0.05, ease: "power4.out" }, 0.58);

      // L3 Briefing Animation
      tl.fromTo(briefingL3Ref.current, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1.0, duration: 0.015, ease: "power2.out" }, 0.57);
      tl.to(briefingL3Ref.current, { autoAlpha: 0, scale: 1.1, duration: 0.015, ease: "power2.in" }, 0.585);

      tl.fromTo(l3MonitorRef.current, { autoAlpha: 0, scale: 0.8, filter: "blur(10px)" }, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "expo.out" }, 0.59);
      tl.to(workstations, { autoAlpha: 1, duration: 0.04, ease: "power2.inOut", immediateRender: false }, 0.72);
      tl.to(l3MonitorRef.current, { autoAlpha: 0, scale: 0.8, filter: "blur(10px)", duration: 0.05 }, 0.72);
      tl.to(zoomWrapperRef.current, { scale: 1, x: 0, y: 0, duration: 0.05, ease: "power2.in" }, 0.72);

      // ── Post-Mortem Transition Card ───────────────────────────────────────
      tl.fromTo(briefingPostMortemRef.current, { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1.0, duration: 0.015, ease: "power2.out" }, 0.81);
      tl.to(briefingPostMortemRef.current, { autoAlpha: 0, scale: 1.1, duration: 0.015, ease: "power2.in" }, 0.835);

      tl.to(zoomWrapperRef.current, { scale: 1, x: 0, y: 0, duration: 0.1, ease: "none" }, 0.75);

      tl.add(() => {
        const allStations = [l1DeskRef.current, l2DeskRef.current, l3DeskRef.current].filter(Boolean);
        gsap.set(allStations, { autoAlpha: 1, y: 0 });
        gsap.set(".data-packet", { opacity: 1 });
      }, 0);

      // ── Exit sequence ──────────────────────────────────────────────────────
      tl.to(socStageRef.current, { autoAlpha: 0, y: 300, filter: "blur(30px)", duration: 0.03, ease: "power3.in" }, 0.80);
      tl.set(".data-packet", { autoAlpha: 0 }, 0.80);
      tl.set(() => [socStageRef.current, worldStageRef.current, l1DeskRef.current, l2DeskRef.current, l3DeskRef.current].filter(Boolean), { display: "none", pointerEvents: "none" }, 0.85);
      tl.set(() => [socStageRef.current, worldStageRef.current, l1DeskRef.current, l2DeskRef.current, l3DeskRef.current].filter(Boolean), { autoAlpha: 0, display: "none", pointerEvents: "none" }, 1.0);

      // ── L3 disk slide ──────────────────────────────────────────────────────
      const l3DiskEl = l3DiskRef.current;
      if (l3DiskEl && l3DeskRef.current) {
        gsap.set(l3DiskEl, { opacity: 0 });
        if (l3DiskEl.parentElement) {
          tl.to(l3DiskEl, {
            opacity: 1,
            x: () => { const d = l3DiskRef.current, ds = l3DeskRef.current; if (!d || !ds || !d.parentElement) return 0; const pr = d.parentElement.getBoundingClientRect(), dr = ds.getBoundingClientRect(); return dr.left - pr.left + dr.width / 2 - (d.offsetWidth || 0) / 2; },
            y: () => { const d = l3DiskRef.current, ds = l3DeskRef.current; if (!d || !ds || !d.parentElement) return 0; const pr = d.parentElement.getBoundingClientRect(), dr = ds.getBoundingClientRect(); return dr.top - pr.top + dr.height / 2 + 80 - (d.offsetHeight || 0) / 2; },
            duration: 0.05,
            ease: "power2.out"
          }, 0.55);
        }
      }
    }, scrollSectionRef);

    return () => { ctx.revert(); gsap.ticker.remove(update); lenis.destroy(); };
  }, [orientation, stageScaleFactor, isMobile]);

  // ── Derived opacity values ─────────────────────────────────────────────────
  const roadmapOpacity = progress > 0.90 ? Math.min(1, (progress - 0.90) / 0.10) : 0;
  const postMortemOpacity = progress < 0.84 ? 0
    : progress < 0.87 ? (progress - 0.84) / 0.03
      : progress > 0.89 ? Math.max(0, 1 - (progress - 0.89) / 0.03) // End at 0.92
        : 1;

  return (
    <>
      {isMobile ? (
        <SOCMobileExperience />
      ) : (
        <>
          {/* ── Orientation Blocker (Applies to all devices, including mobile) ── */}
          {orientation === "vertical" && (
            <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-slate-950 px-8 text-center" style={{ width: '100vw', height: '100vh' }}>
              <div className="mb-6 flex flex-col items-center gap-4">
                <div className="flex h-20 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
                  <div className="h-14 w-8 rounded-xl border border-slate-600/70 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.4),_transparent_60%),linear-gradient(to_bottom,_#020617,_#020617)] flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-cyan-400 animate-bounce"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                      <path d="M9 16L7 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M15 8L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M7 10L5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="M17 14L19 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                </div>
                <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-cyan-400">
                  Rotate Your Device
                </p>
              </div>
              <div className="max-w-sm space-y-3">
                <p className="font-sans text-sm text-slate-100">
                  The SOC simulator is designed for landscape view.
                </p>
                <p className="font-sans text-xs text-slate-400">
                  Turn your phone horizontally to unlock the full interactive layout. Once you&apos;re in
                  landscape mode, the simulator will appear automatically.
                </p>
              </div>
            </div>
          )}

          <section ref={scrollSectionRef} className="relative h-[1000vh] w-screen bg-ra-bg">
            <div ref={pinnedViewportRef} className="sticky top-0 flex h-screen min-h-[600px] w-screen items-center justify-center overflow-hidden">

              {/* ── Background grid + data packets ─────────────────────────────── */}
              <div
                ref={backgroundRef}
                className="pointer-events-none absolute inset-0 z-0"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.9) 100%), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
                  backgroundSize: "100% 100%, 40px 40px, 40px 40px",
                  backgroundRepeat: "no-repeat, repeat, repeat",
                }}
                aria-hidden
              >
                {PACKETS.map((packet, i) => (
                  <div
                    key={i}
                    className="data-packet"
                    style={{ left: packet.left, top: packet.top, animation: `${packet.anim} ${packet.dur}s linear infinite`, animationDelay: `${packet.delay}s` }}
                  />
                ))}
              </div>

              {/* ── SOC world stage ─────────────────────────────────────────────── */}
              <div className="relative flex h-[140vh] w-[140vw] items-center justify-center">
                <div ref={socStageRef} className="absolute flex origin-center items-center justify-center z-10">
                  <div ref={zoomWrapperRef} className="flex origin-center items-center justify-center w-full h-full z-10" style={{ transformOrigin: "center center" }}>
                    <div className="flex origin-center items-center justify-center" style={{ transform: `scale(${stageScaleFactor})`, transformOrigin: "center center" }}>
                      <div ref={worldStageRef} className="world-stage flex h-full w-full items-center justify-center">
                        <WorldStage
                          className="flex h-full w-full items-center justify-center"
                          l1Ref={l1DeskRef}
                          l2Ref={l2DeskRef}
                          l3Ref={l3DeskRef}
                          l3DiskRef={l3DiskRef}
                          scrollProgress={progress}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Post-mortem (0.85–0.91) ─────────────────────────────────────── */}
              {postMortemOpacity > 0 && (
                <PostMortem opacity={postMortemOpacity} />
              )}

              {/* ── Career roadmap ───────────────────────────────────────────────── */}
              <div
                className="fixed inset-0 z-[100]"
                style={{ opacity: roadmapOpacity, pointerEvents: roadmapOpacity > 0.9 ? "auto" : "none" }}
              >
                <CareerRoadmap opacity={roadmapOpacity} />
              </div>

              {/* ── Monitor portals ──────────────────────────────────────────────── */}
              <MonitorPortal type="L1" ref={l1MonitorRef} progress={progress} />
              <MonitorPortal type="L2" ref={l2MonitorRef} progress={progress} />
              <MonitorPortal type="L3" ref={l3MonitorRef} progress={progress} />

              {/* ── Tactical Briefing Overlays ─────────────────────────────────── */}
              <TacticalBriefing
                ref={briefingL1Ref}
                text="ALERT: Unusual activity detected in the network."
              />
              <TacticalBriefing
                ref={briefingL2Ref}
                text="HUNTING: Finding the source of the threat."
              />
              <TacticalBriefing
                ref={briefingL3Ref}
                text="FORENSICS: Investigating the hidden malware."
              />
              <TacticalBriefing
                ref={briefingPostMortemRef}
                text="POST-INCIDENT: DISTILLING LESSONS LEARNED."
              />


              {/* ── Intel ticker ─────────────────────────────────────────────────── */}
              <IntelTicker />

              {/* ── Intro overlay ────────────────────────────────────────────────── */}
              <div className="pointer-events-none absolute inset-0 z-50">
                <IntroOverlay 
                  progress={progress} 
                  onPlay={() => setIsAutoScrolling(true)}
                  isAutoScrolling={isAutoScrolling}
                />
              </div>

              {/* ── Narrative captions + broadcast notifications ─────────────────── */}
              <div className="pointer-events-none absolute inset-0 z-[45]">
                <NarrativeOverlay progress={progress} />
              </div>

              {/* ── Incident Timeline — replaces raw progress bar ────────────────── */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 border-t border-white/8 bg-slate-950/30 px-8 py-3 backdrop-blur-sm">
                <div className="flex items-center justify-center gap-0">
                  {TIMELINE.map((phase, i) => {
                    const isActive = progress >= phase.threshold;
                    const nextActive = i < TIMELINE.length - 1 && progress >= TIMELINE[i + 1].threshold;
                    return (
                      <React.Fragment key={phase.label}>
                        {/* Phase node */}
                        <div className="flex flex-col items-center gap-1.5">
                          <div
                            className={`h-3 w-3 rounded-full border-2 transition-all duration-500 ${isActive
                              ? "border-cyan-400 bg-cyan-400"
                              : "border-slate-600 bg-transparent"
                              }`}
                            style={isActive ? { boxShadow: "0 0 10px rgba(34,211,238,0.8)" } : undefined}
                          />
                          <p className={`whitespace-nowrap font-mono text-[8px] uppercase tracking-widest transition-colors duration-500 ${isActive ? "text-cyan-400" : "text-slate-600"
                            }`}>
                            {phase.label}
                          </p>
                        </div>

                        {/* Connector line */}
                        {i < TIMELINE.length - 1 && (
                          <div
                            className="mb-5 mx-3 h-px w-16 transition-all duration-700"
                            style={{
                              background: nextActive
                                ? "rgba(34,211,238,0.6)"
                                : "rgba(71,85,105,0.4)",
                              boxShadow: nextActive ? "0 0 6px rgba(34,211,238,0.4)" : "none"
                            }}
                          />
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </div>

              {/* Redo / Rewatch Button */}
              <div
                style={{
                  position: "fixed",
                  bottom: "100px",
                  right: "40px",
                  zIndex: 500,
                  opacity: progress > 0.96 ? 1 : 0,
                  visibility: progress > 0.96 ? "visible" : "hidden",
                  transform: progress > 0.96 ? "scale(1)" : "scale(0.8)",
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div style={{ position: "relative" }}>
                  {/* Label on hover */}
                  <div style={{
                    position: "absolute",
                    right: "110%",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "rgba(15,23,42,0.9)",
                    backdropFilter: "blur(8px)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    padding: "8px 16px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                    fontSize: "10px",
                    fontFamily: "var(--font-mono, monospace)",
                    color: "#22d3ee",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    opacity: isRedoHovered ? 1 : 0,
                    pointerEvents: "none",
                    transition: "all 0.3s ease",
                  }}>
                    Rewatch the workflow
                  </div>

                  <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    onMouseEnter={() => setIsRedoHovered(true)}
                    onMouseLeave={() => setIsRedoHovered(false)}
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      background: "rgba(2,6,23,0.85)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(34,211,238,0.3)",
                      color: "#22d3ee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 0 20px rgba(34,211,238,0.2)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                      <path d="M21 3v5h-5" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Persistent Play/Pause Toggle */}
              <div 
                className="fixed top-10 right-10 z-[1000] transition-all duration-700"
                style={{ 
                  opacity: progress > 0.01 ? 1 : 0,
                  transform: progress > 0.01 ? "translateY(0)" : "translateY(-20px)",
                  pointerEvents: progress > 0.01 ? "auto" : "none"
                }}
              >
                <button
                  onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                  className={`group relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                    isAutoScrolling 
                      ? "border-cyan-500/50 bg-slate-900/80 shadow-[0_0_20px_rgba(34,211,238,0.3)]" 
                      : "border-white/10 bg-slate-950/40 hover:border-white/30 hover:bg-slate-900/60"
                  } text-white backdrop-blur-md`}
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
                  
                  {/* Tooltip-style label */}
                  <div className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100 border border-white/10 backdrop-blur-sm pointer-events-none">
                    {isAutoScrolling ? "Pause Auto-Player" : "Resume Auto-Player"}
                  </div>
                </button>
              </div>

              {/* Persistent Home Button */}
              <div 
                className="fixed top-10 left-10 z-[1000] transition-all duration-700"
                style={{ 
                  opacity: progress > 0.01 ? 1 : 0,
                  transform: progress > 0.01 ? "translateY(0)" : "translateY(-20px)",
                  pointerEvents: progress > 0.01 ? "auto" : "none"
                }}
              >
                <button
                  onClick={() => router.push("/")}
                  className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-white/30 hover:bg-slate-900/60"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    <polyline points="9 22 9 12 15 12 15 22" />
                  </svg>
                  
                  {/* Tooltip-style label */}
                  <div className="absolute left-full ml-4 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100 border border-white/10 backdrop-blur-sm pointer-events-none">
                    Return Home
                  </div>
                </button>
              </div>

            </div>
          </section>
        </>
      )}
    </>
  );
};
