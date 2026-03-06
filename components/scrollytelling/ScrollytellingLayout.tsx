"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorldStage } from "./WorldStage";
import { IntroOverlay } from "./IntroOverlay";
import { CareerRoadmap } from "./CareerRoadmap";
import { IntelTicker } from "./IntelTicker";
import { MonitorPortal } from "./MonitorPortal";
import Lenis from "lenis";

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
  const l1DeskRef = useRef<HTMLDivElement | null>(null);
  const l2DeskRef = useRef<HTMLDivElement | null>(null);
  const l3DeskRef = useRef<HTMLDivElement | null>(null);
  const l3DiskRef = useRef<HTMLDivElement | null>(null);
  const l1MonitorRef = useRef<HTMLDivElement | null>(null);
  const l2MonitorRef = useRef<HTMLDivElement | null>(null);
  const l3MonitorRef = useRef<HTMLDivElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const zoomWrapperRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [stageScaleFactor, setStageScaleFactor] = useState(1);
  const [orientation, setOrientation] = useState<Orientation>("horizontal");

  const ZOOM_SCALE = 4.5;

  const getCameraOffset = (targetRef: React.RefObject<HTMLDivElement | null>) => {
    if (!targetRef.current || !pinnedViewportRef.current) return { x: 0, y: 0 };
    const target = targetRef.current.getBoundingClientRect();
    const viewport = pinnedViewportRef.current.getBoundingClientRect();

    const targetCenterX = target.left + target.width / 2;
    const targetCenterY = target.top + target.height / 2;
    const viewportCenterX = viewport.left + viewport.width / 2;
    const viewportCenterY = viewport.top + viewport.height / 2;

    // Multiply by ZOOM_SCALE because the GSAP x/y translations are applied 
    // independently of the scale in the transform matrix visually, but we need
    // the translational distance to proportionally scale with the wrapper size to stay centered.
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
          const scale = Math.min(1, window.innerWidth / baseWidth);
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
    if (!scrollSectionRef.current || !pinnedViewportRef.current || !worldStageRef.current) {
      return;
    }

    // Initialize high-inertia smooth scrolling
    const lenis = new Lenis({
      lerp: 0.05,
      wheelMultiplier: 0.7,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function update(time: number) {
      lenis.raf(time * 1000);
    }

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

      // 0–5%: Intro fade (only timeline animation)
      tl.fromTo(stageEl, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: "power1.out" }, 0);

      // We animate the workstations fading out for Cull Sync
      const workstations = [l1DeskRef.current, l2DeskRef.current, l3DeskRef.current];

      // L1 Portal: Dive 0.12-0.17 | Hold 0.17-0.26 | Fade-out 0.26-0.30 | Return 0.30-0.35
      // Dive
      tl.to(
        zoomWrapperRef.current,
        { scale: ZOOM_SCALE, x: () => getCameraOffset(l1DeskRef).x, y: () => getCameraOffset(l1DeskRef).y, duration: 0.05, ease: "power4.out" },
        0.12
      );
      tl.to(workstations, { autoAlpha: 0, duration: 0.05, ease: "power4.out" }, 0.12);

      // Monitor GUI appears
      tl.fromTo(
        l1MonitorRef.current,
        { autoAlpha: 0, scale: 0.8, filter: "blur(10px)" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "expo.out" },
        0.13
      );

      // Wait, is Fade-out meant for workstations to reappear? Yes! portal fades out, workstation re-appears.
      tl.to(workstations, { autoAlpha: 1, duration: 0.04, ease: "power2.inOut", immediateRender: false }, 0.26);

      // Monitor GUI exits
      tl.to(
        l1MonitorRef.current,
        { autoAlpha: 0, scale: 1.5, filter: "blur(20px)", duration: 0.05 },
        0.30
      );

      // Return
      tl.to(zoomWrapperRef.current, { scale: 1, x: 0, y: 0, duration: 0.05, ease: "power2.in" }, 0.30);

      // L2 Portal: Dive 0.38-0.43 | Hold 0.43-0.48 | Fade-out 0.48-0.52 | Return 0.52-0.57
      tl.to(
        zoomWrapperRef.current,
        { scale: ZOOM_SCALE, x: () => getCameraOffset(l2DeskRef).x, y: () => getCameraOffset(l2DeskRef).y, duration: 0.05, ease: "power4.out" },
        0.38
      );
      tl.to(workstations, { autoAlpha: 0, duration: 0.05, ease: "power4.out" }, 0.38);

      // L2 Monitor appears
      tl.fromTo(
        l2MonitorRef.current,
        { autoAlpha: 0, scale: 0.8, filter: "blur(10px)" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "expo.out" },
        0.39
      );

      tl.to(workstations, { autoAlpha: 1, duration: 0.04, ease: "power2.inOut", immediateRender: false }, 0.48);

      // L2 Monitor exits
      tl.to(
        l2MonitorRef.current,
        { autoAlpha: 0, scale: 1.5, filter: "blur(20px)", duration: 0.05 },
        0.52
      );

      tl.to(zoomWrapperRef.current, { scale: 1, x: 0, y: 0, duration: 0.05, ease: "power2.in" }, 0.52);

      // L3 Portal: Dive 0.58-0.63 | Hold 0.63-0.68 | Fade-out 0.68-0.72 | Return 0.72-0.77
      tl.to(
        zoomWrapperRef.current,
        { scale: ZOOM_SCALE, x: () => getCameraOffset(l3DeskRef).x, y: () => getCameraOffset(l3DeskRef).y, duration: 0.05, ease: "power4.out" },
        0.58
      );
      tl.to(workstations, { autoAlpha: 0, duration: 0.05, ease: "power4.out" }, 0.58);

      // L3 Monitor appears
      tl.fromTo(
        l3MonitorRef.current,
        { autoAlpha: 0, scale: 0.8, filter: "blur(10px)" },
        { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "expo.out" },
        0.59
      );

      tl.to(workstations, { autoAlpha: 1, duration: 0.04, ease: "power2.inOut", immediateRender: false }, 0.68);

      // L3 Monitor exits
      tl.to(
        l3MonitorRef.current,
        { autoAlpha: 0, scale: 1.5, filter: "blur(20px)", duration: 0.05 },
        0.72
      );

      tl.to(zoomWrapperRef.current, { scale: 1, x: 0, y: 0, duration: 0.05, ease: "power2.in" }, 0.72);

      // Operational Hold: Keep camera stable and full floor visible from 0.75 -> 0.85
      tl.to(
        zoomWrapperRef.current,
        { scale: 1, x: 0, y: 0, duration: 0.1, ease: "none" },
        0.75
      );

      // Global initial state: workstations + packets fully visible
      tl.add(() => {
        const allStations = [l1DeskRef.current, l2DeskRef.current, l3DeskRef.current].filter(Boolean);
        gsap.set(allStations, { autoAlpha: 1, y: 0 });
        gsap.set(".data-packet", { opacity: 1 });
      }, 0);

      // 0.80: Master Exit - cinematic vacuum out of the entire stage
      tl.to(
        socStageRef.current,
        {
          autoAlpha: 0,
          y: 300,
          filter: "blur(30px)",
          duration: 0.03, // Accelerated for momentum via scrub: 3
          ease: "power3.in"
        },
        0.80
      );

      // Data packets GSAP cut-off
      tl.set(".data-packet", { autoAlpha: 0 }, 0.80);

      // 0.85: Hard-Kill off-screen workstations early to prevent DOM collision
      tl.set(
        () => [socStageRef.current, worldStageRef.current, l1DeskRef.current, l2DeskRef.current, l3DeskRef.current].filter(Boolean),
        { display: "none", pointerEvents: "none" },
        0.85
      );

      // 1.0: End-of-timeline dead-end clamp to ensure zero scrubbing reappearance
      tl.set(
        () => [socStageRef.current, worldStageRef.current, l1DeskRef.current, l2DeskRef.current, l3DeskRef.current].filter(Boolean),
        { autoAlpha: 0, display: "none", pointerEvents: "none" },
        1.0
      );

      // L3 Forensic Disk: slide out at 55% relative to L3 desk
      const l3DiskEl = l3DiskRef.current;
      const l3DeskEl = l3DeskRef.current;
      if (l3DiskEl && l3DeskEl) {
        gsap.set(l3DiskEl, { opacity: 0 });
        const parent = l3DiskEl.parentElement;
        if (parent) {
          tl.to(l3DiskEl, {
            opacity: 1,
            x: () => {
              const disk = l3DiskRef.current;
              const desk = l3DeskRef.current;
              if (!disk || !desk || !disk.parentElement) return 0;
              const pr = disk.parentElement.getBoundingClientRect();
              const dr = desk.getBoundingClientRect();
              return dr.left - pr.left + dr.width / 2 - (disk.offsetWidth || 0) / 2;
            },
            y: () => {
              const disk = l3DiskRef.current;
              const desk = l3DeskRef.current;
              if (!disk || !desk || !disk.parentElement) return 0;
              const pr = disk.parentElement.getBoundingClientRect();
              const dr = desk.getBoundingClientRect();
              return dr.top - pr.top + dr.height / 2 + 80 - (disk.offsetHeight || 0) / 2;
            },
            duration: 0.05,
            ease: "power2.out"
          }, 0.55);
        }
      }

      // Removed the `.to(".data-packet", ...)` here because it was moved into phase-sync above
    }, scrollSectionRef);

    return () => {
      ctx.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [orientation, stageScaleFactor]);

  const progressPercent = Math.round(progress * 100);
  // Re-map the roadmap fade correctly: fade in from 0.90 to 1.00 (distance: 0.10)
  const roadmapOpacity = progress > 0.90 ? Math.min(1, (progress - 0.90) / 0.10) : 0;

  return (
    <section ref={scrollSectionRef} className="relative h-[1000vh] w-screen bg-ra-bg">
      <div ref={pinnedViewportRef} className="sticky top-0 flex h-screen min-h-[600px] w-screen items-center justify-center overflow-hidden">
        <div
          ref={backgroundRef}
          className="pointer-events-none absolute inset-0 z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, transparent 0%, rgba(15, 23, 42, 0.9) 100%), linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
            backgroundSize: "100% 100%, 40px 40px, 40px 40px",
            backgroundRepeat: "no-repeat, repeat, repeat",
            backgroundPosition: "0 0, 0 0, 0 0"
          }}
          aria-hidden
        >
          {PACKETS.map((packet, i) => (
            <div
              key={i}
              className="data-packet"
              style={{
                left: packet.left,
                top: packet.top,
                animation: `${packet.anim} ${packet.dur}s linear infinite`,
                animationDelay: `${packet.delay}s`
              }}
            />
          ))}
        </div>

        <div className="relative flex h-[140vh] w-[140vw] items-center justify-center">
          <div
            ref={socStageRef}
            className="absolute flex origin-center items-center justify-center z-10"
          >
            <div
              ref={zoomWrapperRef}
              className="flex origin-center items-center justify-center w-full h-full z-10"
              style={{ transformOrigin: "center center" }}
            >
              <div
                className="flex origin-center items-center justify-center"
                style={{ transform: `scale(${stageScaleFactor})`, transformOrigin: "center center" }}
              >
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

        <div
          className="fixed inset-0 z-[100]"
          style={{
            opacity: roadmapOpacity,
            pointerEvents: roadmapOpacity > 0.9 ? "auto" : "none"
          }}
        >
          <CareerRoadmap opacity={roadmapOpacity} />
        </div>

        <MonitorPortal type="L1" ref={l1MonitorRef} />
        <MonitorPortal type="L2" ref={l2MonitorRef} />
        <MonitorPortal type="L3" ref={l3MonitorRef} />

        <IntelTicker />

        <div className="pointer-events-none absolute inset-0 z-50">
          <IntroOverlay progress={progress} />
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-white/10 bg-slate-950/20 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="font-sans text-[10px] text-slate-500">Scroll Progress</span>
            <span className="font-mono tabular-nums text-[10px] text-slate-400">{progressPercent}%</span>
          </div>
          <div className="mt-1.5 h-px w-full bg-white/10">
            <div className="h-full bg-ra-accent/80 transition-[width] duration-75" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
};