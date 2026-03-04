"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WorldStage } from "./WorldStage";
import { NarrativeOverlay } from "./NarrativeOverlay";
import { IntroOverlay } from "./IntroOverlay";
import { StakeholderBroadcast } from "./StakeholderBroadcast";
import { CareerRoadmap } from "./CareerRoadmap";
import { BriefingOverlay, BriefingRole } from "./BriefingOverlay";
import { IntelTicker } from "./IntelTicker";
import { PlaybookHUD } from "./PlaybookHUD";
import { NotificationToast } from "./NotificationToast";

gsap.registerPlugin(ScrollTrigger);

const ROOM_WIDTH_PX = 2100;

type ScrollytellingLayoutProps = {
  children?: React.ReactNode;
};

const PACKET_POINTS = {
  l1: { x: 550, y: 450 },
  l1ToL2_up: { x: 550, y: 350 },
  l1ToL2_across: { x: 1050, y: 350 },
  l2: { x: 1050, y: 450 },
  l2ToL3_up: { x: 1050, y: 350 },
  l2ToL3_across: { x: 1550, y: 350 },
  l3: { x: 1550, y: 450 }
} as const;

function getStageScaleFactor(): number {
  if (typeof window === "undefined") return 1;
  return Math.min(1, window.innerWidth / ROOM_WIDTH_PX);
}

function getBriefingRole(progress: number): BriefingRole {
  // Updated timing:
  // Legal: 55%–60%, CISO: 68%–70%, Systems Admin: unchanged (72%–74%)
  if (progress >= 0.55 && progress < 0.6) return "legal";
  if (progress >= 0.68 && progress < 0.7) return "ciso";
  if (progress >= 0.72 && progress < 0.74) return "systems";
  return null;
}

export const ScrollytellingLayout: React.FC<ScrollytellingLayoutProps> = () => {
  const scrollSectionRef = useRef<HTMLDivElement | null>(null);
  const pinnedViewportRef = useRef<HTMLDivElement | null>(null);
  const worldStageRef = useRef<HTMLDivElement | null>(null);
  const l1DeskRef = useRef<HTMLDivElement | null>(null);
  const l2DeskRef = useRef<HTMLDivElement | null>(null);
  const l3DeskRef = useRef<HTMLDivElement | null>(null);
  const ticketRef = useRef<HTMLDivElement | null>(null);
  const tracePathRef = useRef<SVGPathElement | null>(null);
  const tracePathL2L3Ref = useRef<SVGPathElement | null>(null);
  const backgroundRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [stageScaleFactor, setStageScaleFactor] = useState(1);
  const [evidenceToastShown, setEvidenceToastShown] = useState(false);

  useEffect(() => {
    const onResize = () => setStageScaleFactor(getStageScaleFactor());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (
      !scrollSectionRef.current ||
      !pinnedViewportRef.current ||
      !worldStageRef.current
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const viewportEl = pinnedViewportRef.current!;
      const stageEl = worldStageRef.current!;
      const l1El = l1DeskRef.current;
      const l2El = l2DeskRef.current;
      const l3El = l3DeskRef.current;

      gsap.set(stageEl, {
        opacity: 0,
        filter: "blur(0px)"
      });

      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: scrollSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
          pin: pinnedViewportRef.current,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress;
            setProgress(p);

            // Briefing windows drive stage blur/dim
            const role = getBriefingRole(p);
            const active = role !== null;
            gsap.to(stageEl, {
              filter: active
                ? "blur(8px) brightness(0.5)"
                : "blur(0px) brightness(1)",
              duration: 0.3,
              ease: "power2.out"
            });

            const velocity =
              // @ts-expect-error velocity is available on ScrollTrigger
              typeof self.getVelocity === "function" ? self.getVelocity() : 0;
            if (typeof document !== "undefined") {
              document.body.style.cursor =
                velocity === 0 ? "grab" : "grabbing";
            }
          }
        }
      });

      // 0–10%: fade in world stage
      tl.fromTo(
        stageEl,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.1,
          ease: "power1.out"
        },
        0
      );

      // 45–55%: subtle motion blur while transitioning to L2
      tl.fromTo(
        stageEl,
        { filter: "blur(0px)" },
        {
          filter: "blur(2px)",
          duration: 0.1
        },
        0.45
      );

      tl.to(
        stageEl,
        {
          filter: "blur(0px)",
          duration: 0.1
        },
        0.55
      );

      // Spotlight: dim background at 25% and 65%, restore at 50% and 80%
      const bgEl = backgroundRef.current;
      if (bgEl) {
        gsap.set(bgEl, { opacity: 1 });
        tl.to(bgEl, { opacity: 0.4, duration: 0.05 }, 0.25);
        tl.to(bgEl, { opacity: 1, duration: 0.05 }, 0.5);
        tl.to(bgEl, { opacity: 0.4, duration: 0.05 }, 0.65);
        tl.to(bgEl, { opacity: 1, duration: 0.05 }, 0.8);
      }

      // 50–75%: ticket flies from L1 to L2
      const ticketEl = ticketRef.current;
      if (ticketEl) {
        gsap.set(ticketEl, {
          left: PACKET_POINTS.l1.x,
          top: PACKET_POINTS.l1.y,
          transformOrigin: "50% 50%",
          color: "#22d3ee"
        });

        // Color phases tied to conceptual segments
        // L1: 25–50% – cyan
        tl.to(
          ticketEl,
          { color: "#22d3ee", duration: 0.01 },
          0.25
        );
        // L2: 50–75% – emerald
        tl.to(
          ticketEl,
          { color: "#22c55e", duration: 0.01 },
          0.5
        );
        // L3: 75–85% – amber
        tl.to(
          ticketEl,
          { color: "#fbbf24", duration: 0.01 },
          0.75
        );

        // Data pulse when reaching each workstation
        tl.fromTo(
          ticketEl,
          { scale: 1 },
          { scale: 1.18, yoyo: true, repeat: 1, duration: 0.08, ease: "power2.out" },
          0.25
        );
        tl.fromTo(
          ticketEl,
          { scale: 1 },
          { scale: 1.18, yoyo: true, repeat: 1, duration: 0.08, ease: "power2.out" },
          0.5
        );
        tl.fromTo(
          ticketEl,
          { scale: 1 },
          { scale: 1.18, yoyo: true, repeat: 1, duration: 0.08, ease: "power2.out" },
          0.75
        );

        // Orthogonal L1 → L2 path (50–65%)
        tl.to(
          ticketEl,
          {
            left: PACKET_POINTS.l1ToL2_up.x,
            top: PACKET_POINTS.l1ToL2_up.y,
            duration: 0.05,
            ease: "power2.inOut"
          },
          0.5
        );
        tl.to(ticketEl, {
          left: PACKET_POINTS.l1ToL2_across.x,
          top: PACKET_POINTS.l1ToL2_across.y,
          duration: 0.05,
          ease: "power2.inOut"
        });
        tl.to(ticketEl, {
          left: PACKET_POINTS.l2.x,
          top: PACKET_POINTS.l2.y,
          duration: 0.05,
          ease: "power2.inOut"
        });

        // Orthogonal L2 → L3 path (75–85%)
        tl.to(
          ticketEl,
          {
            left: PACKET_POINTS.l2ToL3_up.x,
            top: PACKET_POINTS.l2ToL3_up.y,
            duration: 0.05,
            ease: "power2.inOut"
          },
          0.75
        );
        tl.to(ticketEl, {
          left: PACKET_POINTS.l2ToL3_across.x,
          top: PACKET_POINTS.l2ToL3_across.y,
          duration: 0.05,
          ease: "power2.inOut"
        });
        tl.to(ticketEl, {
          left: PACKET_POINTS.l3.x,
          top: PACKET_POINTS.l3.y,
          duration: 0.05,
          ease: "power2.inOut"
        });
      }

      // 50–75%: trace route L1→L2 draws itself
      const pathEl = tracePathRef.current;
      if (pathEl) {
        const pathLen = pathEl.getTotalLength();
        pathEl.style.strokeDasharray = String(pathLen);
        gsap.set(pathEl, { strokeDashoffset: pathLen });
        tl.to(
          pathEl,
          { strokeDashoffset: 0, duration: 0.25, ease: "power2.inOut" },
          0.5
        );
      }

      // 65–80%: trace route L2→L3 draws itself
      const pathL2L3El = tracePathL2L3Ref.current;
      if (pathL2L3El) {
        const pathLen2 = pathL2L3El.getTotalLength();
        pathL2L3El.style.strokeDasharray = String(pathLen2);
        gsap.set(pathL2L3El, { strokeDashoffset: pathLen2 });
        tl.to(
          pathL2L3El,
          { strokeDashoffset: 0, duration: 0.15, ease: "power2.inOut" },
          0.65
        );
      }

      // 85–100%: exit – scale up and fade out (zoom through floor)
      // Also speed up background packets to create a tunnel / warp effect
      tl.to(
        ".data-packet",
        {
          animationDuration: "2s"
        },
        0.85
      );

      tl.to(
        stageEl,
        {
          opacity: 0,
          duration: 0.15,
          ease: "power2.in"
        },
        0.85
      );
    }, scrollSectionRef);

    if (typeof document !== "undefined") {
      document.body.style.cursor = "grab";
    }

    return () => {
      if (typeof document !== "undefined") {
        document.body.style.cursor = "";
      }
      ctx.revert();
    };
  }, []);

  const progressPercent = Math.round(progress * 100);
  const briefingRole = getBriefingRole(progress);
  const roadmapOpacity =
    progress > 0.98 ? Math.min(1, (progress - 0.98) / 0.02) : 0;

  return (
    <section
      ref={scrollSectionRef}
      className="relative h-[500vh] w-screen bg-ra-bg"
    >
      <div
        ref={pinnedViewportRef}
        className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden"
      >
        <IntelTicker />

        <div className="relative flex h-[140vh] w-[140vw] items-center justify-center">
          <div
            className="flex origin-center items-center justify-center"
            style={{
              transform: `scale(${stageScaleFactor})`,
              transformOrigin: "center center"
            }}
          >
            <div
              ref={worldStageRef}
              className="world-stage h-[120vh] w-[120vw]"
            >
              <WorldStage
                className="flex h-full w-full items-center justify-center"
                l1Ref={l1DeskRef}
                l2Ref={l2DeskRef}
                l3Ref={l3DeskRef}
                ticketRef={ticketRef}
                tracePathRef={tracePathRef}
                tracePathL2L3Ref={tracePathL2L3Ref}
                backgroundRef={backgroundRef}
                scrollProgress={progress}
              />
            </div>
          </div>

          {progress > 0.98 && (
            <div className="pointer-events-none absolute inset-0">
              <CareerRoadmap opacity={roadmapOpacity} />
            </div>
          )}
        </div>

        <BriefingOverlay role={briefingRole} />

        {progress < 0.21 && <IntroOverlay progress={progress} />}

        <NarrativeOverlay progress={progress} />

        <StakeholderBroadcast progress={progress} />

        <PlaybookHUD progress={progress} />

        {progress >= 0.5 && !evidenceToastShown && (
          <div className="pointer-events-none absolute left-6 bottom-28 z-20">
            <NotificationToast
              message="Evidence Locked and handed to L2."
              variant="default"
              onDismiss={() => setEvidenceToastShown(true)}
            />
          </div>
        )}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-white/10 bg-slate-950/20 px-4 py-2 backdrop-blur-sm">
          <div className="flex items-center justify-between gap-3">
            <span className="font-sans text-[10px] text-slate-500">
              Scroll Progress
            </span>
            <span className="font-mono tabular-nums text-[10px] text-slate-400">
              {progressPercent}%
            </span>
          </div>
          <div className="mt-1.5 h-px w-full bg-white/10">
            <div
              className="h-full bg-ra-accent/80 transition-[width] duration-75"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

