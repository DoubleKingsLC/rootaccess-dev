"use client";

import React from "react";
import { DataFlowViz }   from "./DataFlowViz";
import { ExfilTerminal } from "./ExfilTerminal";
import { ExfilCounter }  from "./ExfilCounter";

type ExfilSceneProps = {
  progress: number; // global 0–1
};

// ── Scene window: 0.870–0.950 ──────────────────────────────────────────────────
// Fade in  0.870–0.875
// Full     0.875–0.945
// Fade out 0.945–0.950
const sceneOpacity = (p: number): number => {
  if (p < 0.870) return 0;
  if (p < 0.875) return (p - 0.870) / 0.005;
  if (p <= 0.945) return 1;
  if (p < 0.950) return 1 - (p - 0.945) / 0.005;
  return 0;
};

// Local 0–1 across 0.870 – 0.950
const local = (p: number): number =>
  Math.max(0, Math.min(1, (p - 0.870) / 0.080));

// Caption: 0.877–0.940
const captionOpacity = (p: number): number => {
  if (p < 0.877) return 0;
  if (p < 0.897) return (p - 0.877) / 0.020;
  if (p <= 0.935) return 1;
  if (p < 0.945) return 1 - (p - 0.935) / 0.010;
  return 0;
};

export const ExfilScene: React.FC<ExfilSceneProps> = ({ progress }) => {
  const op = sceneOpacity(progress);
  if (op === 0) return null;

  const lp = local(progress);

  return (
    <>
      {/* ── Main scene ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-8"
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
          style={{ color: "rgba(244,63,94,0.4)" }}
        >
          Data exfiltration · /api/v1/users · no rate limit
        </div>

        {/* ── Content stack ────────────────────────────────────────────────── */}
        <div
          className="flex flex-col gap-3"
          style={{ width: "clamp(660px, 82vw, 920px)" }}
        >
          {/* Database → packets → terminal SVG */}
          <DataFlowViz localProgress={lp} />

          {/* Terminal + counter row */}
          <div className="flex items-start gap-4">
            <ExfilTerminal localProgress={lp} />
            <ExfilCounter  localProgress={lp} />
          </div>
        </div>
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-[72px] left-1/2 z-[35] -translate-x-1/2"
        style={{ opacity: captionOpacity(progress) }}
        aria-hidden
      >
        <div className="rounded-xl border border-white/10 bg-slate-950/85 px-5 py-2.5 backdrop-blur-md max-w-[90vw]">
          <p className="font-mono text-xs font-medium tracking-wide text-slate-100 text-center md:text-sm">
            No rate limit. No logging. 14 million records in under 3 seconds.
          </p>
        </div>
      </div>
    </>
  );
};
