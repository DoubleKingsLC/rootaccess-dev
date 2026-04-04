"use client";

import React from "react";
import { MockBrowser }          from "./MockBrowser";
import { MetadataChips }        from "./MetadataChips";
import { NetworkHeadersFlash }  from "./NetworkHeadersFlash";
import { WappalyzerPopup }      from "./WappalyzerPopup";
import { NarrativeCaption }     from "./NarrativeCaption";

type TargetAppearsSceneProps = {
  progress: number; // global scroll progress 0–1
};

// ── Helpers ───────────────────────────────────────────────────────────────────
// Scene lives at 0.02–0.24 (fades in 0.02–0.045, full 0.045–0.225, fades out 0.225–0.240)
const sceneOpacity = (p: number): number => {
  if (p < 0.020) return 0;
  if (p < 0.045) return (p - 0.020) / 0.025;
  if (p <= 0.225) return 1;
  if (p < 0.240) return 1 - (p - 0.225) / 0.015;
  return 0;
};

// Local progress: 0–1 across 0.02–0.240
const local = (p: number): number => Math.max(0, Math.min(1, (p - 0.02) / 0.220));

// Browser scales/fades in 0.0–0.08 of local progress (faster entry)
const browserScale = (lp: number): number => {
  if (lp < 0.08) return 0.92 + 0.08 * (lp / 0.08);
  return 1;
};
const browserOpacity = (lp: number): number => {
  if (lp < 0.08) return lp / 0.08;
  return 1;
};

// URL types from local 0.05–0.12 (Snappier)
const urlProgress = (lp: number): number => {
  if (lp < 0.05) return 0;
  if (lp < 0.12) return (lp - 0.05) / 0.07;
  return 1;
};

// Narrative caption — two phases
const CAPTION_EARLY = "The target: a fintech platform. 14 million accounts. You start by watching.";
const CAPTION_CHIPS = "Nginx. React. Cloudflare WAF. The stack is already visible — you haven't sent a packet.";

// Narrative caption: 0.075–0.145 (huge window to read)
const captionOpacity = (p: number): number => {
  if (p < 0.075) return 0;
  if (p < 0.090) return (p - 0.075) / 0.015;
  if (p <= 0.250) return 1;
  if (p < 0.265) return 1 - (p - 0.250) / 0.015;
  return 0;
};

// At what local progress to switch caption text (matches DevTools entry)
const CAPTION_SWITCH_LP = 0.45;

export const TargetAppearsScene: React.FC<TargetAppearsSceneProps> = ({ progress }) => {
  const op = sceneOpacity(progress);
  if (op === 0) return null;

  const lp = local(progress);

  return (
    <>
      {/* ── Main scene ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center px-6 pb-[6vh] lg:pb-[10vh]"
        style={{ opacity: op, zIndex: 15 }}
      >
        {/* Relative canvas — chips + beams + browser all share same coordinate space */}
        <div
          className="relative flex flex-col items-center gap-5"
          style={{ width: "clamp(560px, 78vw, 1100px)" }}
        >
          {/* Chip row */}
          <MetadataChips localProgress={lp} />

          {/* Browser */}
          <div
            className="relative w-full"
            style={{
              height: "clamp(420px, 62vh, 720px)",
              transform: `scale(${browserScale(lp)})`,
              opacity: browserOpacity(lp),
              transition: "none",
            }}
          >
            <MockBrowser urlProgress={urlProgress(lp)} />
            <NetworkHeadersFlash localProgress={lp} />
            <WappalyzerPopup localProgress={lp} />
          </div>
        </div>
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <NarrativeCaption opacity={captionOpacity(progress)}>
        {lp >= CAPTION_SWITCH_LP ? CAPTION_CHIPS : CAPTION_EARLY}
      </NarrativeCaption>
    </>
  );
};
