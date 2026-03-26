"use client";

import React from "react";

type Props = { localProgress: number };

// Slides up at 0.20, fully visible 0.28–0.43, fades out 0.43–0.50
// ─ Expanded for longer showcase ─
const panel = (lp: number): { opacity: number; ty: number } => {
  if (lp < 0.20) return { opacity: 0, ty: 100 };
  if (lp < 0.28) {
    const t = (lp - 0.20) / 0.08;
    const e = 1 - Math.pow(1 - t, 3);
    return { opacity: e, ty: 100 * (1 - e) };
  }
  if (lp <= 0.43) return { opacity: 1, ty: 0 };
  if (lp < 0.50) {
    const t = (lp - 0.43) / 0.07;
    return { opacity: 1 - t, ty: 0 };
  }
  return { opacity: 0, ty: 0 };
};

// "Added ↑" badge pulses in at 0.43
const badgeOp = (lp: number) => {
  if (lp < 0.43) return 0;
  if (lp < 0.47) return (lp - 0.43) / 0.04;
  return 1;
};

// Underline sweep on nginx/1.18.0 row removed as requested.

// Rising particle for nginx — lp 0.35–0.48
const nginxParticle = (lp: number): number | null => {
  if (lp < 0.35 || lp >= 0.48) return null;
  return (lp - 0.35) / 0.13;
};

export const NetworkHeadersFlash: React.FC<Props> = ({ localProgress }) => {
  const { opacity, ty } = panel(localProgress);
  if (opacity === 0) return null;

  const badge = badgeOp(localProgress);

  return (
    <>
      <div
        className="absolute inset-x-0 bottom-0 rounded-b-2xl"
        style={{
          height: "36%",
          opacity,
          transform: `translateY(${ty}%)`,
          background: "rgba(10,14,24,0.97)",
          borderTop: "1px solid rgba(244,63,94,0.18)",
          zIndex: 25,
        }}
      >
        {/* Tab bar */}
        <div
          className="flex items-center gap-1 border-b px-3 py-1.5"
          style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(15,20,35,0.98)" }}
        >
          {["Elements", "Console", "Network", "Sources"].map((tab) => (
            <div
              key={tab}
              className="rounded px-3 py-1 font-mono text-[10px]"
              style={{
                color: tab === "Network" ? "#f43f5e" : "rgba(148,163,184,0.4)",
                background: tab === "Network" ? "rgba(244,63,94,0.08)" : "transparent",
                borderBottom: tab === "Network" ? "1px solid #f43f5e" : "none",
              }}
            >
              {tab}
            </div>
          ))}
          <div className="ml-auto font-mono text-[9px] text-slate-600">DevTools</div>
        </div>

        {/* Response headers */}
        <div className="px-4 pt-2.5">
          <div
            className="rounded-lg px-3 py-2.5"
            style={{ background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.14)" }}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.5)" }}>
                Response Headers · GET nexuspay.io
              </p>
              {/* Added ↑ badge */}
              <div
                className="flex items-center gap-1 rounded-full px-2 py-0.5"
                style={{
                  opacity: badge,
                  background: "rgba(244,63,94,0.15)",
                  border: "1px solid rgba(244,63,94,0.35)",
                  transform: `translateY(${(1 - badge) * 4}px)`,
                  transition: "none",
                }}
              >
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M4 7V1M1 4l3-3 3 3" stroke="#f43f5e" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-mono text-[8px] font-bold" style={{ color: "#f43f5e" }}>Added to fingerprint</span>
              </div>
            </div>
            <div className="space-y-1">
              {/* nginx/1.18.0 row — highlight with underline sweep */}
              <div key="Server" className="flex gap-3 font-mono text-[11px]">
                <span className="shrink-0" style={{ color: "rgba(244,63,94,0.8)" }}>Server:</span>
                <span className="relative" style={{ color: "#fca5a5", fontWeight: 600 }}>
                  nginx/1.18.0 (Ubuntu)
                </span>
              </div>
              {/* Other rows */}
              {[
                ["X-Powered-By",    "Express",               false],
                ["Content-Type",    "text/html; charset=utf-8", false],
                ["X-Frame-Options", "SAMEORIGIN",            false],
              ].map(([k, v]) => (
                <div key={String(k)} className="flex gap-3 font-mono text-[11px]">
                  <span className="shrink-0" style={{ color: "rgba(100,116,139,0.7)" }}>
                    {k}:
                  </span>
                  <span style={{ color: "rgba(148,163,184,0.6)" }}>
                    {String(v)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Rising nginx particle — rendered outside overflow-hidden panel */}
      {(() => {
        const prog = nginxParticle(localProgress);
        if (prog === null) return null;
        const translateY = -prog * 160;
        const opacity2 = prog < 0.55 ? 1 : 1 - (prog - 0.55) / 0.45;
        return (
          <div
            style={{
              position: "absolute",
              bottom: "40%",
              left: "42%",
              transform: `translateX(-50%) translateY(${translateY}px)`,
              opacity: opacity2,
              zIndex: 40,
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
              gap: 5,
              background: "rgba(244,63,94,0.18)",
              border: "1px solid rgba(244,63,94,0.5)",
              borderRadius: 8,
              padding: "3px 8px",
              backdropFilter: "blur(8px)",
              whiteSpace: "nowrap",
              boxShadow: "0 0 16px rgba(244,63,94,0.4)",
            }}
          >
            <span style={{ fontSize: 11 }}>⚡</span>
            <span style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, color: "#fca5a5" }}>nginx/1.18</span>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path d="M4 7V1M1 4l3-3 3 3" stroke="#f43f5e" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        );
      })()}
    </>
  );
};
