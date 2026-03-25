"use client";

import React from "react";

type Props = { localProgress: number };

// Slides down from top-right at 0.54, visible 0.62–0.74, fades 0.74–0.80
// ─ Starts after NetworkHeadersFlash fully fades (0.55) ─
const popup = (lp: number): { opacity: number; ty: number } => {
  if (lp < 0.54) return { opacity: 0, ty: -16 };
  if (lp < 0.62) {
    const t = (lp - 0.54) / 0.08;
    const e = 1 - Math.pow(1 - t, 3);
    return { opacity: e, ty: -16 * (1 - e) };
  }
  if (lp <= 0.74) return { opacity: 1, ty: 0 };
  if (lp < 0.80) {
    const t = (lp - 0.74) / 0.06;
    return { opacity: 1 - t, ty: 0 };
  }
  return { opacity: 0, ty: 0 };
};

const itemOp = (lp: number, threshold: number) => {
  if (lp < threshold) return 0;
  if (lp < threshold + 0.04) return (lp - threshold) / 0.04;
  return 1;
};

// Underline sweep per tech label
const underlineProg = (lp: number, threshold: number): number => {
  const start = threshold + 0.02;
  if (lp < start) return 0;
  if (lp < start + 0.04) return (lp - start) / 0.04;
  return 1;
};

// Rising particle for React — lp 0.63–0.72
const reactParticle = (lp: number): number | null => {
  if (lp < 0.63 || lp >= 0.72) return null;
  return (lp - 0.63) / 0.09;
};

// Rising particle for Cloudflare — lp 0.70–0.79
const cloudflareParticle = (lp: number): number | null => {
  if (lp < 0.70 || lp >= 0.79) return null;
  return (lp - 0.70) / 0.09;
};

const TECHS = [
  { icon: "⚛", label: "React",      version: "18.2.0",   color: "#61dafb", threshold: 0.61 },
  { icon: "☁", label: "Cloudflare", version: "CDN / WAF", color: "#f48120", threshold: 0.67 },
];

export const WappalyzerPopup: React.FC<Props> = ({ localProgress }) => {
  const { opacity, ty } = popup(localProgress);
  if (opacity === 0) return null;

  return (
    <>
      <div
        className="absolute overflow-hidden rounded-xl"
        style={{
          top: 48,
          right: 12,
          width: 220,
          opacity,
          transform: `translateY(${ty}px)`,
          background: "rgba(10,14,24,0.97)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
          zIndex: 30,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 border-b"
          style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(15,20,35,0.99)" }}
        >
          {/* Wappalyzer logo approximation */}
          <div
            className="flex h-5 w-5 items-center justify-center rounded"
            style={{ background: "#4b5ef9" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <circle cx="6" cy="6" r="4" fill="white" opacity="0.9"/>
              <circle cx="6" cy="6" r="2" fill="#4b5ef9"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-mono text-[10px] font-bold text-white leading-tight">Wappalyzer</p>
            <p className="font-mono text-[8px]" style={{ color: "rgba(148,163,184,0.4)" }}>
              {TECHS.length} technologies detected
            </p>
          </div>
        </div>

        {/* Tech list */}
        <div className="px-2 py-2 space-y-1">
          {TECHS.map((tech) => {
            const op = itemOp(localProgress, tech.threshold);
            const ulProg = underlineProg(localProgress, tech.threshold);
            return (
              <div
                key={tech.label}
                className="flex items-center gap-2.5 rounded-lg px-2.5 py-2"
                style={{
                  opacity: op,
                  transform: `translateX(${(1 - op) * -8}px)`,
                  transition: "none",
                  background: `${tech.color}0a`,
                  border: `1px solid ${tech.color}22`,
                }}
              >
                <span className="text-base leading-none">{tech.icon}</span>
                <div className="flex-1 min-w-0">
                  <span className="relative inline-block">
                    <p className="font-mono text-[11px] font-bold text-white leading-tight">{tech.label}</p>
                    {/* Underline sweep */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: -1,
                        left: 0,
                        height: 2,
                        width: `${ulProg * 100}%`,
                        background: `linear-gradient(to right, ${tech.color}, ${tech.color}aa)`,
                        boxShadow: `0 0 6px ${tech.color}cc`,
                        borderRadius: 2,
                        transition: "none",
                      }}
                    />
                  </span>
                  <p className="font-mono text-[9px]" style={{ color: `${tech.color}88` }}>{tech.version}</p>
                </div>
                {/* Added ↑ badge */}
                <div
                  className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5"
                  style={{
                    opacity: op,
                    background: `${tech.color}18`,
                    border: `1px solid ${tech.color}44`,
                  }}
                >
                  <svg width="7" height="7" viewBox="0 0 7 7" fill="none">
                    <path d="M3.5 6V1M1 3.5l2.5-2.5 2.5 2.5" stroke={tech.color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="font-mono text-[7px] font-bold" style={{ color: tech.color }}>Added</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Rising React particle */}
      {(() => {
        const prog = reactParticle(localProgress);
        if (prog === null) return null;
        const translateY = -prog * 160;
        const opacity2 = prog < 0.15 ? prog / 0.15 : prog > 0.85 ? 1 - (prog - 0.85) / 0.15 : 1;
        return (
          <div
            style={{
              position: "absolute",
              bottom: "52%",
              left: "75%",
              transform: `translateX(-50%) translateY(${translateY}px)`,
              opacity: opacity2,
              zIndex: 40,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(97,218,251,0.12)",
              border: "1px solid rgba(97,218,251,0.4)",
              borderRadius: 8,
              padding: "3px 8px",
              backdropFilter: "blur(8px)",
              whiteSpace: "nowrap",
              boxShadow: "0 0 16px rgba(97,218,251,0.3)",
            }}
          >
            <span style={{ fontSize: 11 }}>⚛</span>
            <span style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#61dafb" }}>React 18</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M4 7V1M1 4l3-3 3 3" stroke="#61dafb" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      })()}

      {/* Rising Cloudflare particle */}
      {(() => {
        const prog = cloudflareParticle(localProgress);
        if (prog === null) return null;
        const translateY = -prog * 160;
        const opacity2 = prog < 0.15 ? prog / 0.15 : prog > 0.85 ? 1 - (prog - 0.85) / 0.15 : 1;
        return (
          <div
            style={{
              position: "absolute",
              bottom: "44%",
              left: "75%",
              transform: `translateX(-50%) translateY(${translateY}px)`,
              opacity: opacity2,
              zIndex: 40,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(244,129,32,0.12)",
              border: "1px solid rgba(244,129,32,0.4)",
              borderRadius: 8,
              padding: "3px 8px",
              backdropFilter: "blur(8px)",
              whiteSpace: "nowrap",
              boxShadow: "0 0 16px rgba(244,129,32,0.3)",
            }}
          >
            <span style={{ fontSize: 11 }}>☁</span>
            <span style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#f48120" }}>Cloudflare</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M4 7V1M1 4l3-3 3 3" stroke="#f48120" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      })()}
    </>
  );
};
