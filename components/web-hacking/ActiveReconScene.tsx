"use client";

import React from "react";
import { MockTerminal } from "./MockTerminal";
import { DirbustPanel } from "./DirbustPanel";

type ActiveReconSceneProps = {
  progress: number; // global 0–1
};

// ── Scene window: 0.407–0.550 ──────────────────────────────────────────────────
// Fade in  0.407–0.427
// Full     0.427–0.535
// Fade out 0.535–0.550 (Snappy)
const sceneOpacity = (p: number): number => {
  if (p < 0.407) return 0;
  if (p < 0.427) return (p - 0.407) / 0.020;
  if (p <= 0.535) return 1;
  if (p < 0.550) return 1 - (p - 0.535) / 0.015;
  return 0;
};

// Local 0–1 across 0.407–0.540
const local = (p: number): number =>
  Math.max(0, Math.min(1, (p - 0.407) / 0.133));

// Caption fades in at 0.427, out at 0.540
const captionOpacity = (p: number): number => {
  if (p < 0.427) return 0;
  if (p < 0.447) return (p - 0.427) / 0.020;
  if (p <= 0.535) return 1;
  if (p < 0.545) return 1 - (p - 0.535) / 0.010;
  return 0;
};

export const ActiveReconScene: React.FC<ActiveReconSceneProps> = ({ progress }) => {
  const op = sceneOpacity(progress);
  if (op === 0) return null;

  const lp = local(progress);

  return (
    <>
      {/* ── Main scene ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-6 px-12"
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
          Active scan — packets in flight · target: 188.166.92.14
        </div>

        {/* Terminal — left/centre */}
        <MockTerminal localProgress={lp} />

        {/* Dirbusting panel — slides in from right */}
        <DirbustPanel localProgress={lp} />
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-[72px] left-1/2 z-[35] -translate-x-1/2"
        style={{ opacity: captionOpacity(progress) }}
        aria-hidden
      >
        <div className="rounded-xl border border-white/10 bg-slate-950/85 px-5 py-2.5 backdrop-blur-md max-w-[90vw]">
          <p className="font-mono text-xs font-medium tracking-wide text-slate-100 text-center md:text-sm">
            Port 3306 wide open. A <span style={{ color: "#f87171" }}>.env</span> file serving itself. The server is practically waving.
          </p>
        </div>
      </div>
    </>
  );
};
