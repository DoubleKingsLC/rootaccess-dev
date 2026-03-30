"use client";

import React from "react";
import { MockAdminLogin } from "./MockAdminLogin";
import { NarrativeCaption } from "./NarrativeCaption";

type InitialAccessSceneProps = {
  progress: number; // global 0–1
};

// ── Scene window: 0.547–0.670 ───────────────────────────────────────────────────
// Fade in  0.547–0.567 
// Full     0.567–0.670 (Persistent Plateau)
const sceneOpacity = (p: number): number => {
  if (p < 0.547) return 0;
  if (p < 0.567) return (p - 0.547) / 0.020;
  if (p <= 0.670) return 1;
  return 0;
};

// Local 0–1 across 0.547–0.670
const local = (p: number): number =>
  Math.max(0, Math.min(1, (p - 0.547) / 0.123));

// Caption: in at 0.567, out at 0.660
const captionOpacity = (p: number): number => {
  if (p < 0.567) return 0;
  if (p < 0.587) return (p - 0.567) / 0.020;
  if (p <= 0.640) return 1;
  if (p < 0.660) return 1 - (p - 0.640) / 0.020;
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
          className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.35em]"
          style={{
            color: "rgba(226,232,240,0.65)",
            opacity: lp > 0.05 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          Initial access — bypassing login · target: nexuspay.io/admin
        </div>

        <MockAdminLogin localProgress={lp} />
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <NarrativeCaption opacity={captionOpacity(progress)}>
        The admin portal. No MFA. No lockout. Just a door.
      </NarrativeCaption>
    </>
  );
};
