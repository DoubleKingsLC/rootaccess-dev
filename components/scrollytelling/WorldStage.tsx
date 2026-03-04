"use client";

import React, { useEffect, useRef, useState } from "react";

type WorldStageProps = {
  className?: string;
  l1Ref?: React.RefObject<HTMLDivElement>;
  l2Ref?: React.RefObject<HTMLDivElement>;
  l3Ref?: React.RefObject<HTMLDivElement>;
  ticketRef?: React.RefObject<HTMLDivElement>;
  tracePathRef?: React.RefObject<SVGPathElement>;
  tracePathL2L3Ref?: React.RefObject<SVGPathElement>;
  backgroundRef?: React.RefObject<HTMLDivElement>;
  scrollProgress?: number;
};

const AlertIcon: React.FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="text-white"
  >
    <path
      d="M12 7v6M12 16v1"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
  </svg>
);

const FileIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="32"
    height="40"
    viewBox="0 0 32 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <path
      d="M6 2h14l6 6v30H6V2z"
      stroke="currentColor"
      strokeWidth="2"
      fill="rgba(15,23,42,0.9)"
    />
    <path d="M20 2v6h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PACKETS = [
  { left: "0%", top: "15%", anim: "packet-h", dur: 14, delay: 0 },
  { left: "0%", top: "40%", anim: "packet-h", dur: 11, delay: 2 },
  { left: "0%", top: "70%", anim: "packet-h", dur: 16, delay: 1 },
  { left: "100%", top: "25%", anim: "packet-h-rev", dur: 12, delay: 3 },
  { left: "100%", top: "55%", anim: "packet-h-rev", dur: 10, delay: 0.5 },
  { left: "20%", top: "0%", anim: "packet-v", dur: 13, delay: 1 },
  { left: "50%", top: "0%", anim: "packet-v", dur: 9, delay: 4 },
  { left: "80%", top: "0%", anim: "packet-v", dur: 15, delay: 2 },
  { left: "35%", top: "100%", anim: "packet-v-rev", dur: 11, delay: 0 },
  { left: "65%", top: "100%", anim: "packet-v-rev", dur: 12, delay: 2.5 }
];

const TRACE_PATH_D = "M 550 450 L 550 350 L 1050 350 L 1050 450";
const TRACE_PATH_L2_L3_D = "M 1050 450 L 1050 350 L 1550 350 L 1550 450";

/** System Restore / Remediation (circle-arrow + check) */
const SystemRestoreIcon: React.FC = () => (
  <svg
    width="44"
    height="44"
    viewBox="0 0 44 44"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
    className="text-amber-400/80"
  >
    <circle
      cx="22"
      cy="22"
      r="18"
      stroke="currentColor"
      strokeWidth="1.8"
      fill="rgba(15,23,42,0.92)"
    />
    <path
      d="M22 14v8l5 5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 28l4 4 8-8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const WorldStageComponent: React.FC<WorldStageProps> = ({
  className = "",
  l1Ref,
  l2Ref,
  l3Ref,
  ticketRef,
  tracePathRef,
  tracePathL2L3Ref,
  backgroundRef,
  scrollProgress = 0
}) => {
  const showAlertPulse = scrollProgress >= 0.25;
  const showShield = scrollProgress >= 0.75;
  const [glitchActive, setGlitchActive] = useState(false);
  const [flashActive, setFlashActive] = useState(false);
  const prevProgressRef = useRef(0);

  useEffect(() => {
    let glitchTimeout: number | undefined;
    let flashTimeout: number | undefined;

    if (scrollProgress >= 0.25 && prevProgressRef.current < 0.25) {
      setGlitchActive(true);
      glitchTimeout = window.setTimeout(() => setGlitchActive(false), 500);
    }

    if (scrollProgress >= 0.75 && prevProgressRef.current < 0.75) {
      setFlashActive(true);
      flashTimeout = window.setTimeout(() => setFlashActive(false), 180);
    }

    prevProgressRef.current = scrollProgress;

    return () => {
      if (glitchTimeout !== undefined) {
        window.clearTimeout(glitchTimeout);
      }
      if (flashTimeout !== undefined) {
        window.clearTimeout(flashTimeout);
      }
    };
  }, [scrollProgress]);

  return (
    <div
      className={`relative mx-auto rounded-3xl border border-slate-700/60 shadow-[0_0_80px_rgba(15,23,42,0.9)] ${className}`}
    >
      {/* Background (grid + packets) – opacity twitched by layout for spotlight */}
      <div
        ref={backgroundRef}
        className="world-grid pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-3xl"
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

      {/* Room container – expanded for L3 */}
      <div className="relative z-[1] mx-auto h-[900px] w-[2100px]">
        {/* Trace routes: L1→L2 and L2→L3, stroke-dashoffset animated in layout */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 2100 900"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            ref={tracePathRef}
            id="trace-route"
            d={TRACE_PATH_D}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          <path
            ref={tracePathL2L3Ref}
            id="trace-route-l2-l3"
            d={TRACE_PATH_L2_L3_D}
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
            strokeDasharray="8 6"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
        </svg>

        {/* L1 Desk – center-left */}
        <div
          ref={l1Ref}
          className={`absolute rounded-xl border border-blue-300/80 bg-blue-500/90 shadow-xl ${glitchActive ? "desk-glitch" : ""}`}
          style={{ width: 300, height: 200, left: 400, top: 350 }}
        >
          <span
            id="L1-Station"
            className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] font-medium uppercase tracking-widest text-sky-200"
            style={{ transform: "translateX(-50%) skew(0deg, -20deg)" }}
          >
            L1 STATION
          </span>
          {showAlertPulse && (
            <span
              className="pointer-events-none absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white alert-pulse"
              aria-label="Alert"
            >
              <AlertIcon />
            </span>
          )}

          <div className="relative flex h-full w-full items-center justify-center">
            <div className="pointer-events-none relative h-[70%] w-[70%] rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="absolute inset-x-4 top-4 h-7 rounded-md border border-slate-800/80 bg-slate-900/90" />
              <div className="absolute inset-x-6 bottom-4 h-3 rounded-full bg-slate-800/80" />
            </div>
            <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-500/70 bg-slate-900/90">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="mt-0.5 h-1.5 w-6 rounded-full bg-slate-700/80" />
            </div>
          </div>
        </div>

        {/* L2 Desk – center */}
        <div
          ref={l2Ref}
          className="absolute rounded-xl border border-emerald-300/80 bg-emerald-500/90 shadow-xl"
          style={{ width: 300, height: 200, left: 900, top: 350 }}
        >
          <span
            id="L2-Station"
            className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] font-medium uppercase tracking-widest text-emerald-100"
            style={{ transform: "translateX(-50%) skew(0deg, -20deg)" }}
          >
            L2 STATION
          </span>

          <div className="relative flex h-full w-full items-center justify-center">
            <div className="pointer-events-none relative h-[70%] w-[70%] rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="absolute inset-x-4 top-4 h-7 rounded-md border border-slate-800/80 bg-slate-900/90" />
              <div className="absolute inset-x-6 bottom-4 h-3 rounded-full bg-slate-800/80" />
            </div>
            <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-500/70 bg-slate-900/90">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="mt-0.5 h-1.5 w-6 rounded-full bg-slate-700/80" />
            </div>
          </div>
        </div>

        {/* L3 Desk – Incident Response, center-right */}
        <div
          ref={l3Ref}
          id="L3-Desk"
          className="absolute rounded-xl border-2 border-amber-400/80 bg-amber-600/20 shadow-xl"
          style={{ width: 300, height: 200, left: 1400, top: 350 }}
        >
          <span
            id="L3-Station"
            className="pointer-events-none absolute -top-6 left-1/2 -translate-x-1/2 font-mono text-[10px] font-medium uppercase tracking-widest text-amber-100"
            style={{ transform: "translateX(-50%) skew(0deg, -20deg)" }}
          >
            L3 / INCIDENT RESPONSE
          </span>

          <div className="relative flex h-full w-full items-center justify-center">
            <div className="pointer-events-none relative h-[70%] w-[70%] rounded-2xl border border-slate-800/80 bg-slate-950/80">
              <div className="absolute inset-x-4 top-4 h-7 rounded-md border border-slate-800/80 bg-slate-900/90" />
              <div className="absolute inset-x-6 bottom-4 h-3 rounded-full bg-slate-800/80" />
            </div>
            <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center">
              <div className="flex h-7 w-7 items-center justify-center rounded-full border border-slate-500/70 bg-slate-900/90">
                <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              </div>
              <div className="mt-0.5 h-1.5 w-6 rounded-full bg-slate-700/80" />
            </div>
          </div>

          {/* System Restore – visible from 75% */}
          {showShield && (
            <span
              className="pointer-events-none absolute -right-4 -top-4 z-20 flex items-center justify-center"
              aria-hidden
            >
              <SystemRestoreIcon />
            </span>
          )}

          {/* Kill switch flash – brief white overlay at remediation */}
          {flashActive && (
            <div className="pointer-events-none absolute inset-0 rounded-xl bg-white/70" />
          )}
        </div>

        {/* Incident ticket – position animated by GSAP in layout */}
        <div
          id="incident-ticket"
          ref={ticketRef}
          className="absolute z-10 flex items-center justify-center text-cyan-400"
          style={{ left: 784, top: 430 }}
          aria-hidden
        >
          <FileIcon />
        </div>
      </div>
    </div>
  );
};

export const WorldStage = React.memo(WorldStageComponent);
