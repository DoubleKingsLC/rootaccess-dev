"use client";

import React from "react";

type MetadataChipsProps = {
  localProgress: number; // 0–1 within this phase
};

const CHIPS = [
  { label: "nexuspay.io",  sub: "DNS lookup",        icon: "🌐", threshold: 0.18 }, // After URL typing
  { label: "Nginx/1.18",  sub: "HTTP Server header", icon: "⚡", threshold: 0.40 }, // NetworkHeaders fully open
  { label: "React 18",    sub: "Wappalyzer",         icon: "⚛", threshold: 0.65 }, // Wappalyzer React reveal
  { label: "Cloudflare",  sub: "Response headers",   icon: "☁", threshold: 0.75 }, // Wappalyzer Cloudflare reveal
] as const;

const chipFade = (local: number, threshold: number): number => {
  if (local < threshold) return 0;
  if (local < threshold + 0.07) return (local - threshold) / 0.07;
  return 1;
};

// Brief scale pulse: at threshold grows to 1.08 then snaps back to 1.0 over 0.03 lp
const chipPop = (local: number, threshold: number): number => {
  const t = local - threshold;
  if (t < 0) return 1;
  if (t < 0.010) return 1 + 0.08 * (t / 0.010);
  if (t < 0.025) return 1.08 - 0.08 * ((t - 0.010) / 0.015);
  return 1;
};

// Border glow that peaks at threshold+0.01 and fades by threshold+0.06
const chipGlow = (local: number, threshold: number): number => {
  const t = local - threshold;
  if (t < 0) return 0;
  if (t < 0.01) return t / 0.01;
  if (t < 0.04) return 1;
  if (t < 0.07) return 1 - (t - 0.04) / 0.03;
  return 0;
};

export const MetadataChips: React.FC<MetadataChipsProps> = ({ localProgress }) => {
  // Row fades in when first chip starts appearing
const rowOpacity = chipFade(localProgress, 0.15);
  if (rowOpacity === 0) return null;

  return (
    <div
      className="flex items-center justify-center gap-3"
      style={{ opacity: rowOpacity }}
    >
      {/* Label */}
      <div className="shrink-0 mr-2 text-right">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em]" style={{ color: "rgba(244,63,94,0.55)" }}>
          Fingerprinted
        </p>
        <p className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: "rgba(148,163,184,0.3)" }}>
          no packets sent
        </p>
      </div>

      {CHIPS.map((chip) => {
        const op = chipFade(localProgress, chip.threshold);
        const pop = chipPop(localProgress, chip.threshold);
        const glow = chipGlow(localProgress, chip.threshold);
        return (
          <div
            key={chip.label}
            className="flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-md"
            style={{
              opacity: op,
              transform: `translateY(${(1 - op) * 14}px) scale(${pop})`,
              transition: "none",
              background: "rgba(8,12,24,0.90)",
              border: "1px solid rgba(244,63,94,0.28)",
              boxShadow: glow > 0
                ? `0 0 ${24 * glow}px rgba(244,63,94,${glow * 0.7}), 0 0 8px rgba(244,63,94,0.12)`
                : "0 0 18px rgba(244,63,94,0.10)",
              whiteSpace: "nowrap",
            }}
          >
            <span className="text-sm leading-none">{chip.icon}</span>
            <div>
              <p className="font-mono text-[12px] font-bold text-white leading-tight">{chip.label}</p>
              <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.6)" }}>
                {chip.sub}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
