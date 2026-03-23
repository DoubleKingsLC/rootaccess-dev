"use client";

import React from "react";

type MetadataChipsProps = {
  localProgress: number; // 0–1 within this phase
};

const CHIPS = [
  { label: "nexuspay.io",   sub: "Domain",    icon: "🌐", threshold: 0.45, pos: { top: "8%",  left: "-18%" } },
  { label: "Nginx/1.18",   sub: "Server",    icon: "⚡", threshold: 0.55, pos: { top: "28%", right: "-20%" } },
  { label: "React 18",     sub: "Framework", icon: "⚛", threshold: 0.63, pos: { top: "8%",  right: "-18%" } },
  { label: "Cloudflare",   sub: "CDN / WAF", icon: "☁", threshold: 0.70, pos: { bottom: "22%", left: "-20%" } },
  { label: "PostgreSQL",   sub: "Database fingerprint", icon: "🗄", threshold: 0.77, pos: { bottom: "10%", right: "-19%" } },
] as const;

const chipFade = (local: number, threshold: number): number => {
  if (local < threshold) return 0;
  if (local < threshold + 0.08) return (local - threshold) / 0.08;
  return 1;
};

export const MetadataChips: React.FC<MetadataChipsProps> = ({ localProgress }) => (
  <>
    {CHIPS.map((chip) => {
      const op = chipFade(localProgress, chip.threshold);
      if (op === 0) return null;
      return (
        <div
          key={chip.label}
          className="absolute flex items-center gap-2 rounded-xl px-3 py-2 backdrop-blur-md"
          style={{
            ...chip.pos,
            opacity: op,
            transform: `translateX(${(1 - op) * (chip.pos.left !== undefined ? -8 : 8)}px)`,
            transition: "opacity 0.2s ease, transform 0.2s ease",
            background: "rgba(8,12,24,0.88)",
            border: "1px solid rgba(244,63,94,0.25)",
            boxShadow: "0 0 20px rgba(244,63,94,0.1)",
            whiteSpace: "nowrap",
          }}
        >
          <span className="text-base leading-none">{chip.icon}</span>
          <div>
            <p className="font-mono text-[11px] font-bold text-white">{chip.label}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.65)" }}>
              {chip.sub}
            </p>
          </div>
          {/* Connecting dot */}
          <div
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{
              background: "#f43f5e",
              boxShadow: "0 0 8px rgba(244,63,94,0.8)",
              ...(chip.pos.left !== undefined ? { right: "-14px" } : { left: "-14px" }),
              top: "50%",
              transform: "translateY(-50%)",
            }}
          />
        </div>
      );
    })}
  </>
);
