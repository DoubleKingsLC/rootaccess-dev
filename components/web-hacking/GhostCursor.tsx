"use client";

import React from "react";

type GhostCursorProps = {
  localProgress: number; // 0–1 within this phase
};

// Waypoints as % of the browser container (top/left)
// The cursor drifts between these, pausing on interesting elements
const WAYPOINTS = [
  { x: 72, y: 14  }, // "Security" nav link
  { x: 55, y: 14  }, // "Pricing" nav link
  { x: 83, y: 14  }, // "Sign in" button
  { x: 79, y: 18  }, // "Get Started" button — pauses here
  { x: 50, y: 48  }, // Hero CTA
] as const;

// Appears at localProgress 0.76, fully visible by 0.84
// ─ After WappalyzerPopup fully shows (0.74) ─
const cursorOpacity = (local: number): number => {
  if (local < 0.76) return 0;
  if (local < 0.84) return (local - 0.76) / 0.08;
  return 1;
};

// Map localProgress 0.76–1.0 → waypoint interpolation
const getCursorPos = (local: number): { x: number; y: number } => {
  if (local < 0.76) return WAYPOINTS[0];
  const t = (local - 0.76) / 0.24; // 0–1 over the visible range
  const segCount = WAYPOINTS.length - 1;
  const seg = Math.min(Math.floor(t * segCount), segCount - 1);
  const segT = (t * segCount) - seg;
  // Ease in/out within segment
  const eased = segT < 0.5 ? 2 * segT * segT : 1 - Math.pow(-2 * segT + 2, 2) / 2;
  const a = WAYPOINTS[seg];
  const b = WAYPOINTS[seg + 1];
  return {
    x: a.x + (b.x - a.x) * eased,
    y: a.y + (b.y - a.y) * eased,
  };
};

export const GhostCursor: React.FC<GhostCursorProps> = ({ localProgress }) => {
  const op  = cursorOpacity(localProgress);
  if (op === 0) return null;

  const pos = getCursorPos(localProgress);
  // Is cursor near the Get Started button? Add a hover glow ring
  const nearCTA = localProgress > 0.90 && localProgress < 0.98;

  return (
    <div
      className="pointer-events-none absolute inset-0"
      style={{ zIndex: 30 }}
    >
      <div
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          opacity: op * 0.75,
          transition: "left 0.6s cubic-bezier(0.25,0.1,0.25,1), top 0.6s cubic-bezier(0.25,0.1,0.25,1)",
        }}
      >
        {/* Hover ring when near CTA */}
        {nearCTA && (
          <div
            className="absolute rounded-full"
            style={{
              inset: "-14px",
              border: "1.5px solid rgba(244,63,94,0.5)",
              boxShadow: "0 0 18px rgba(244,63,94,0.25)",
              animation: "alert-pulse 1.4s ease-in-out infinite",
            }}
          />
        )}
        {/* Cursor SVG */}
        <svg width="22" height="26" viewBox="0 0 22 26" fill="none">
          <path
            d="M1 1l6.5 20.5 3.5-7 7-3.5L1 1z"
            fill="rgba(244,63,94,0.18)"
            stroke="rgba(244,63,94,0.8)"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M11 15l5 6"
            stroke="rgba(244,63,94,0.8)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
};
