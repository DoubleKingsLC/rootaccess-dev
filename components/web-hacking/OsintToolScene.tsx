"use client";

import React from "react";
import { MockDNSDumpster } from "./MockDNSDumpster";

type OsintToolSceneProps = {
  progress: number; // global 0–1
};

// ── Scene window: 0.155–0.245 ──────────────────────────────────────────────────
// Fade in  0.155–0.180
// Full     0.180–0.220
// Fade out 0.220–0.245
const sceneOpacity = (p: number): number => {
  if (p < 0.155) return 0;
  if (p < 0.180) return (p - 0.155) / 0.025;
  if (p <= 0.220) return 1;
  if (p < 0.245) return 1 - (p - 0.220) / 0.025;
  return 0;
};

// Local 0–1 across 0.155–0.245
const local = (p: number): number =>
  Math.max(0, Math.min(1, (p - 0.155) / 0.090));

// Caption fades in at 0.180, out at 0.235
const captionOpacity = (p: number): number => {
  if (p < 0.180) return 0;
  if (p < 0.200) return (p - 0.180) / 0.020;
  if (p <= 0.225) return 1;
  if (p < 0.245) return 1 - (p - 0.225) / 0.020;
  return 0;
};

export const OsintToolScene: React.FC<OsintToolSceneProps> = ({ progress }) => {
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
        {/* Ambient rose glow behind the tool */}
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
          Passive OSINT — no direct contact with target
        </div>

        <MockDNSDumpster localProgress={lp} />
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-[72px] left-1/2 z-[35] -translate-x-1/2"
        style={{ opacity: captionOpacity(progress) }}
        aria-hidden
      >
        <div className="rounded-xl border border-white/10 bg-slate-950/85 px-5 py-2.5 backdrop-blur-md max-w-[90vw]">
          <p className="font-mono text-xs font-medium tracking-wide text-slate-100 text-center md:text-sm">
            DNS records don&apos;t lie. Two subdomains with no authentication.
          </p>
        </div>
      </div>
    </>
  );
};
