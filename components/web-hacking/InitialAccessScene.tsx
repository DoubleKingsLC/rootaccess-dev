"use client";

import React from "react";
import { MockAdminLogin } from "./MockAdminLogin";

type InitialAccessSceneProps = {
  progress: number; // global 0–1
};

// ── Scene window: 0.48–0.60 ───────────────────────────────────────────────────
// Fade in  0.480–0.510 (3% = 240vh!)
// Full     0.510–0.620  (no fade-out — SQLiScene continues on the same login page)
const sceneOpacity = (p: number): number => {
  if (p < 0.480) return 0;
  if (p < 0.510) return (p - 0.480) / 0.030;
  if (p <= 0.620) return 1;
  return 0;
};

// Local 0–1 across 0.480–0.610
const local = (p: number): number =>
  Math.max(0, Math.min(1, (p - 0.480) / 0.130));

// Caption: in at 0.520, out at 0.590
const captionOpacity = (p: number): number => {
  if (p < 0.520) return 0;
  if (p < 0.540) return (p - 0.520) / 0.020;
  if (p <= 0.575) return 1;
  if (p < 0.595) return 1 - (p - 0.575) / 0.020;
  return 0;
};

export const InitialAccessScene: React.FC<InitialAccessSceneProps> = ({ progress }) => {
  const op = sceneOpacity(progress);
  if (op === 0) return null;

  const lp = local(progress);

  return (
    <>
      {/* ── Main scene ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: op, zIndex: 15 }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.05) 0%, transparent 60%)",
          }}
        />

        {/* Top label */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.45em]"
          style={{
            color: "rgba(244,63,94,0.4)",
            opacity: lp > 0.05 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          Target acquired — admin.nexuspay.io · 188.166.92.14
        </div>

        <MockAdminLogin localProgress={lp} />
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-[72px] left-1/2 z-[35] -translate-x-1/2"
        style={{ opacity: captionOpacity(progress) }}
        aria-hidden
      >
        <div className="rounded-xl border border-white/10 bg-slate-950/85 px-5 py-2.5 backdrop-blur-md max-w-[90vw]">
          <p className="font-mono text-xs font-medium tracking-wide text-slate-100 text-center md:text-sm">
            The admin portal. No MFA. No lockout. Just a door.
          </p>
        </div>
      </div>
    </>
  );
};
