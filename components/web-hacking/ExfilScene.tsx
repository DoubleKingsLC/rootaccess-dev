"use client";

import React from "react";
import { DataFlowViz }   from "./DataFlowViz";
import { ExfilTerminal } from "./ExfilTerminal";
import { ExfilCounter }  from "./ExfilCounter";
import { NarrativeCaption } from "./NarrativeCaption";

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
          className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.35em]"
          style={{
            color: "rgba(226,232,240,0.65)",
            opacity: lp > 0.05 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          Data exfiltration — harvesting PII · target: db.nexuspay.io
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
      <NarrativeCaption opacity={captionOpacity(progress)}>
        No rate limit. No logging. 14 million records in under 3 seconds.
      </NarrativeCaption>
    </>
  );
};
