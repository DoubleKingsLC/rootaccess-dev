"use client";

import React, { useId } from "react";

type AnalystPOVProps = {
  label: string;
  screens: 1 | 3;
  isAlerted: boolean;
  stationRef?: React.RefObject<HTMLDivElement | null>;
};

// 1.5x scaled workstation footprint for SOC stations
const STATION_WIDTH = 450;
const STATION_HEIGHT = 330;

/** 2D minimalist back-view: chair (#1e293b), head/shoulders (#0f172a), desk + trapezoidal monitors */
export const AnalystPOV: React.FC<AnalystPOVProps> = ({
  label,
  screens,
  isAlerted,
  stationRef
}) => {
  const id = useId().replace(/:/g, "");
  const monitorFill = isAlerted ? "#ef4444" : "#0ea5e9";

  return (
    <div
      ref={stationRef as React.LegacyRef<HTMLDivElement>}
      className="relative rounded-xl border border-white/10 bg-slate-950/40 backdrop-blur-xl"
      style={{
        width: STATION_WIDTH,
        height: STATION_HEIGHT
      }}
    >
      <span
        className="pointer-events-none absolute -top-14 left-0 right-0 text-center font-mono text-sm font-bold uppercase tracking-[0.4em] text-sky-400/70 holographic-label"
        aria-hidden
      >
        {label}
      </span>

      <svg
        className="absolute inset-0 h-full w-full"
        // Keep original 300×220 coordinate system so existing paths scale proportionally
        viewBox="0 0 300 220"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden
      >
        <defs>
          <filter id={`aglow-red-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#ef4444" floodOpacity="0.9" />
          </filter>
          <filter id={`aglow-sky-${id}`} x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#0ea5e9" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Bottom: high-back office chair (back-view) – base and back rest */}
        <path
          d="M 58 200 L 58 168 L 72 158 L 228 158 L 242 168 L 242 200 L 218 200 L 218 172 L 82 172 L 82 200 Z"
          fill="#1e293b"
        />
        <path
          d="M 72 158 L 62 128 L 88 118 L 212 118 L 238 128 L 228 158 Z"
          fill="#1e293b"
          opacity={0.95}
        />

        {/* Person from behind: head (ellipse), short neck, shoulders/torso – distinct from monitors */}
        <ellipse cx="150" cy="105" rx="16" ry="18" fill="#0f172a" />
        <path
          d="M 142 123 L 158 123 L 156 130 L 144 130 Z"
          fill="#0f172a"
        />
        <path
          d="M 118 130 L 118 158 L 182 158 L 182 130 L 160 138 L 150 134 L 140 138 Z"
          fill="#0f172a"
        />

        {/* Top: desk surface + trapezoidal monitors (1 or 3) */}
        <path
          d="M 30 75 L 270 75 L 265 85 L 35 85 Z"
          fill="#334155"
          opacity={0.9}
        />
        {screens === 1 ? (
          <path
            d="M 70 30 L 230 30 L 235 70 L 65 70 Z"
            fill={monitorFill}
            filter={isAlerted ? `url(#aglow-red-${id})` : `url(#aglow-sky-${id})`}
          />
        ) : (
          [
            { x: 55, w: 58 },
            { x: 121, w: 58 },
            { x: 187, w: 58 }
          ].map(({ x, w }, i) => (
            <path
              key={i}
              d={`M ${x} 35 L ${x + w} 35 L ${x + w + 3} 68 L ${x - 2} 68 Z`}
              fill={monitorFill}
              filter={isAlerted ? `url(#aglow-red-${id})` : `url(#aglow-sky-${id})`}
            />
          ))
        )}
      </svg>
      <style jsx>{`
        .holographic-label {
          filter: drop-shadow(0 0 12px rgba(56, 189, 248, 0.5));
        }
      `}</style>
    </div>
  );
};
