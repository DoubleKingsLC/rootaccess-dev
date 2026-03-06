"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorldStage } from "./WorldStage";
import { BoardroomMeeting } from "./BoardroomMeeting";
import { IntroOverlay } from "./IntroOverlay";
import { CareerRoadmap } from "./CareerRoadmap";
import { IntelTicker } from "./IntelTicker";

gsap.registerPlugin(ScrollTrigger);

type ScrollytellingLayoutProps = {
  children?: React.ReactNode;
};

type Orientation = "horizontal" | "vertical";

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
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const boardroomRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [stageScaleFactor, setStageScaleFactor] = useState(1);
  const [orientation, setOrientation] = useState<Orientation>("horizontal");

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

    const ctx = gsap.context(() => {
      const stageEl = worldStageRef.current!;

      gsap.set(stageEl, { opacity: 0, filter: "blur(0px)" });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinnedViewportRef.current,
          anticipatePin: 1,
          onUpdate: (self) => setProgress(self.progress)
        }
      });

      // 0–5%: Intro fade (only timeline animation)
      tl.fromTo(stageEl, { opacity: 0 }, { opacity: 1, duration: 0.05, ease: "power1.out" }, 0);

      // SOC exit (0.75–0.80): blur + slide down + fade out
      const socStageEl = socStageRef.current;
      if (socStageEl) {
        gsap.set(socStageEl, { y: 0, filter: "blur(0px)", opacity: 1 });
        tl.to(socStageEl, {
          y: 100,
          filter: "blur(10px)",
          opacity: 0,
          duration: 0.05,
          ease: "power2.inOut"
        }, 0.75);
      }

      // Boardroom: hidden until 0.80, then glass-slide in (mount from 0.75 so ref exists)
      tl.add(() => {
        if (boardroomRef.current) gsap.set(boardroomRef.current, { y: 100, opacity: 0 });
      }, 0.75);
      tl.fromTo(
        () => boardroomRef.current,
        { y: 100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.05, ease: "power2.out" },
        0.80
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

      tl.to(".data-packet", { animationDuration: "2s" }, 0.80);
    }, scrollSectionRef);

    return () => ctx.revert();
  }, [orientation, stageScaleFactor]);

  const progressPercent = Math.round(progress * 100);
  const roadmapOpacity = progress > 0.98 ? Math.min(1, (progress - 0.98) / 0.02) : 0;

  return (
    <section ref={scrollSectionRef} className="relative h-[500vh] w-screen bg-ra-bg">
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
          {progress < 0.8 && PACKETS.map((packet, i) => (
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
          {progress < 0.8 && (
            <div
              ref={socStageRef}
              className="absolute z-10 flex origin-center items-center justify-center"
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
          )}

          {progress >= 0.75 && progress <= 0.85 && (
            <div ref={boardroomRef} className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
              <BoardroomMeeting />
            </div>
          )}

          {progress > 0.98 && (
            <div className="pointer-events-none absolute inset-0">
              <CareerRoadmap opacity={roadmapOpacity} />
            </div>
          )}
        </div>

        <IntelTicker />

        {progress < 0.05 && <IntroOverlay progress={progress} />}

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