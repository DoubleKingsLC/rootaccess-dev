"use client";

import React, { useId } from "react";

type WorkstationPOVProps = {
  label: string;
  left: number;
  top: number;
  screens: 1 | 3;
  isAlerted: boolean;
  stationRef?: React.RefObject<HTMLDivElement | null>;
  /** Boardroom variant: show manager + presentation instead of analyst + monitors */
  variant?: "analyst" | "boardroom";
  /** For boardroom: presentation screen active glow at 90%+ */
  presentationActive?: boolean;
};

const STATION_WIDTH = 300;
const STATION_HEIGHT = 220;

export const WorkstationPOV: React.FC<WorkstationPOVProps> = ({
  label,
  left,
  top,
  screens,
  isAlerted,
  stationRef,
  variant = "analyst",
  presentationActive = false
}) => {
  const id = useId().replace(/:/g, "");
  const monitorFill = isAlerted ? "#ef4444" : "#0ea5e9";

  return (
    <div
      ref={stationRef as React.LegacyRef<HTMLDivElement>}
      className="absolute rounded-xl border border-white/10 bg-slate-950/40 backdrop-blur-xl"
      style={{
        left,
        top,
        width: STATION_WIDTH,
        height: STATION_HEIGHT
      }}
    >
      <span
        className="pointer-events-none absolute -top-5 left-0 right-0 text-center font-mono text-[10px] font-medium uppercase tracking-widest text-slate-400"
        aria-hidden
      >
        {label}
      </span>

      {variant === "boardroom" ? (
        <>
          {/* Manager silhouette + conference table */}
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center gap-0">
            <div className="h-2 w-32 rounded-full bg-slate-700/80" />
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-500/70 bg-slate-900/90">
                <div className="h-3 w-3 rounded-full bg-slate-200" />
              </div>
            </div>
          </div>
          {/* Presentation screen */}
          <div
            className="absolute left-4 right-4 top-10 bottom-12 rounded-lg border border-cyan-400/40 bg-slate-950/70"
            style={
              presentationActive
                ? { boxShadow: "0 0 24px rgba(34,211,238,0.35)" }
                : undefined
            }
          >
            <div className="flex h-full w-full items-center justify-center gap-3">
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="text-cyan-300">
                <path d="M6 13h8a3 3 0 0 0 0-6 3.5 3.5 0 0 0-6.8-1.1A3 3 0 0 0 6 13Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="text-emerald-300">
                <rect x="3" y="4" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M7 7h4M7 10h3M7 13h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
              </svg>
              <svg width="24" height="24" viewBox="0 0 20 20" fill="none" className="text-amber-300">
                <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Desk bar (behind-view) */}
          <div
            className="absolute bottom-14 left-4 right-4 h-3 rounded-full bg-slate-700/80"
            aria-hidden
          />
          {/* Monitors: 1 or 3 rects in SVG */}
          <svg
            className="absolute left-6 top-10 h-[72px] w-[180px]"
            viewBox="0 0 180 72"
            aria-hidden
          >
            <defs>
              <filter id={`red-${id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.9" />
              </filter>
              <filter id={`sky-${id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#0ea5e9" floodOpacity="0.5" />
              </filter>
            </defs>
            {screens === 1 ? (
              <rect
                x={2}
                y={2}
                width={176}
                height={68}
                rx={4}
                fill={monitorFill}
                filter={isAlerted ? `url(#red-${id})` : `url(#sky-${id})`}
              />
            ) : (
              [0, 1, 2].map((i) => (
                <rect
                  key={i}
                  x={4 + i * 58}
                  y={2}
                  width={52}
                  height={68}
                  rx={4}
                  fill={monitorFill}
                  filter={isAlerted ? `url(#red-${id})` : `url(#sky-${id})`}
                />
              ))
            )}
          </svg>
          {/* Analyst silhouette (back of head + shoulders) */}
          <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center">
            <div className="h-8 w-8 rounded-full border border-slate-500/70 bg-slate-800/90" />
            <div className="mt-0 h-2 w-14 rounded-sm bg-slate-700/90" />
          </div>
        </>
      )}
    </div>
  );
};
