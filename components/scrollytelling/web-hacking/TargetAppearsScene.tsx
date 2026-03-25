"use client";

import React from "react";
import { MockBrowser }          from "./MockBrowser";
import { MetadataChips }        from "./MetadataChips";
import { GhostCursor }          from "./GhostCursor";
import { InspectFlicker }       from "./InspectFlicker";
import { NetworkHeadersFlash }  from "./NetworkHeadersFlash";
import { WappalyzerPopup }      from "./WappalyzerPopup";
import { ExtractionBeams }      from "./ExtractionBeams";

type TargetAppearsSceneProps = {
  progress: number; // global scroll progress 0–1
};

// ── Helpers ───────────────────────────────────────────────────────────────────
// Scene lives at 0.05–0.12 (fades in 0.05–0.07, full 0.07–0.10, fades out 0.10–0.12)
const sceneOpacity = (p: number): number => {
  if (p < 0.05) return 0;
  if (p < 0.07) return (p - 0.05) / 0.02;
  if (p <= 0.10) return 1;
  if (p < 0.12) return 1 - (p - 0.10) / 0.02;
  return 0;
};

// Local progress: 0–1 across 0.05–0.10
const local = (p: number): number => Math.max(0, Math.min(1, (p - 0.05) / 0.05));

// Browser scales/fades in 0.0–0.35 of local progress
const browserScale = (lp: number): number => {
  if (lp < 0.35) return 0.92 + 0.08 * (lp / 0.35);
  return 1;
};
const browserOpacity = (lp: number): number => {
  if (lp < 0.35) return lp / 0.35;
  return 1;
};

// URL types from local 0.30–0.55
const urlProgress = (lp: number): number => {
  if (lp < 0.30) return 0;
  if (lp < 0.55) return (lp - 0.30) / 0.25;
  return 1;
};

// Narrative caption — two phases
const CAPTION_EARLY = "The target: a fintech platform. 14 million accounts. You start by watching.";
const CAPTION_CHIPS = "Nginx. React. Cloudflare WAF. The stack is already visible — you haven't sent a packet.";

const captionOpacity = (p: number): number => {
  if (p < 0.065) return 0;
  if (p < 0.08)  return (p - 0.065) / 0.015;
  if (p <= 0.10) return 1;
  if (p < 0.115) return 1 - (p - 0.10) / 0.015;
  return 0;
};

export const TargetAppearsScene: React.FC<TargetAppearsSceneProps> = ({ progress }) => {
  const op = sceneOpacity(progress);
  if (op === 0) return null;

  const lp = local(progress);

  return (
    <>
      {/* ── Main scene ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6"
        style={{ opacity: op, zIndex: 15 }}
      >
        {/* Relative canvas — chips + beams + browser all share same coordinate space */}
        <div
          className="relative flex flex-col items-center gap-5"
          style={{ width: "clamp(560px, 78vw, 1100px)" }}
        >
          {/* Chip row */}
          <MetadataChips localProgress={lp} />

          {/* Extraction beams — spans full canvas height */}
          <ExtractionBeams localProgress={lp} />

          {/* Browser */}
          <div
            className="relative w-full"
            style={{
              height: "clamp(340px, 56vh, 640px)",
              transform: `scale(${browserScale(lp)})`,
              opacity: browserOpacity(lp),
              transition: "none",
            }}
          >
            <MockBrowser urlProgress={urlProgress(lp)} />
            <GhostCursor localProgress={lp} />
            <NetworkHeadersFlash localProgress={lp} />
            <WappalyzerPopup localProgress={lp} />
            <InspectFlicker localProgress={lp} />
          </div>
        </div>
      </div>

      {/* ── Narrative caption — bottom center ───────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-[72px] left-1/2 z-[35] -translate-x-1/2"
        style={{ opacity: captionOpacity(progress) }}
        aria-hidden
      >
        <div className="rounded-xl border border-white/10 bg-slate-950/85 px-5 py-2.5 backdrop-blur-md max-w-[90vw]">
          <p className="font-mono text-xs font-medium tracking-wide text-slate-100 text-center md:text-sm">
            {lp >= 0.50 ? CAPTION_CHIPS : CAPTION_EARLY}
          </p>
        </div>
      </div>
    </>
  );
};
