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
// Scene lives at 0.05–0.16 (fades in 0.05–0.075, full 0.075–0.135, fades out 0.135–0.16)
const sceneOpacity = (p: number): number => {
  if (p < 0.050) return 0;
  if (p < 0.075) return (p - 0.050) / 0.025;
  if (p <= 0.135) return 1;
  if (p < 0.160) return 1 - (p - 0.135) / 0.025;
  return 0;
};

// Local progress: 0–1 across 0.05–0.155
const local = (p: number): number => Math.max(0, Math.min(1, (p - 0.05) / 0.105));

// Browser scales/fades in 0.0–0.22 of local progress — plenty of time to read the site
const browserScale = (lp: number): number => {
  if (lp < 0.22) return 0.92 + 0.08 * (lp / 0.22);
  return 1;
};
const browserOpacity = (lp: number): number => {
  if (lp < 0.22) return lp / 0.22;
  return 1;
};

// URL types from local 0.18–0.40
const urlProgress = (lp: number): number => {
  if (lp < 0.18) return 0;
  if (lp < 0.40) return (lp - 0.18) / 0.22;
  return 1;
};

// Narrative caption — two phases
const CAPTION_EARLY = "The target: a fintech platform. 14 million accounts. You start by watching.";
const CAPTION_CHIPS = "Nginx. React. Cloudflare WAF. The stack is already visible — you haven't sent a packet.";

// Narrative caption: 0.075–0.145 (huge window to read)
const captionOpacity = (p: number): number => {
  if (p < 0.075) return 0;
  if (p < 0.095) return (p - 0.075) / 0.020;
  if (p <= 0.130) return 1;
  if (p < 0.150) return 1 - (p - 0.130) / 0.020;
  return 0;
};

// At what local progress to switch caption text
const CAPTION_SWITCH_LP = 0.54;

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
            {lp >= CAPTION_SWITCH_LP ? CAPTION_CHIPS : CAPTION_EARLY}
          </p>
        </div>
      </div>
    </>
  );
};
