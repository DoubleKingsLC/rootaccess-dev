"use client";

import React from "react";

type SQLQueryPanelProps = {
  localProgress: number; // 0–1 within SQLiScene
  payload: string;       // typed portion of the injection payload
};

// Panel slides up from bottom at local 0.54 (after payload is mostly typed)
const ease = (t: number) => 1 - Math.pow(1 - t, 3);
const panelSlide = (lp: number): number => {
  if (lp < 0.54) return 0;
  if (lp < 0.66) return ease((lp - 0.54) / 0.12);
  return 1;
};

// Comment-out effect: greys the AND password clause after 0.68
const commentOpacity = (lp: number): number => {
  if (lp < 0.68) return 0.75;
  if (lp < 0.78) return 0.75 - ((lp - 0.68) / 0.10) * 0.65;
  return 0.10;
};

const ROSE = "#f43f5e";

export const SQLQueryPanel: React.FC<SQLQueryPanelProps> = ({ localProgress, payload }) => {
  const panelT   = panelSlide(localProgress);
  const commentO = commentOpacity(localProgress);
  const injected = localProgress >= 0.68; // highlight once payload fully typed

  if (panelT === 0) return null;

  return (
    <div
      className="w-full overflow-hidden rounded-xl"
      style={{
        opacity: panelT,
        transform: `translateY(${(1 - panelT) * 24}px)`,
        background: "rgba(6,9,18,0.98)",
        border: "1px solid rgba(244,63,94,0.18)",
        boxShadow: "0 -8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: "rgba(15,20,35,0.98)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-2">
          <div
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: ROSE, boxShadow: `0 0 6px ${ROSE}` }}
          />
          <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.55)" }}>
            SQL query — server side
          </span>
        </div>
        <span className="font-mono text-[9px]" style={{ color: "rgba(148,163,184,0.35)" }}>
          mysql · nexusdb
        </span>
      </div>

      {/* Query */}
      <div className="px-5 py-3 font-mono text-[11px] leading-relaxed">
        {/* Line 1 */}
        <div>
          <span style={{ color: "rgba(167,139,250,0.8)" }}>SELECT</span>
          <span style={{ color: "rgba(226,232,240,0.6)" }}> * </span>
          <span style={{ color: "rgba(167,139,250,0.8)" }}>FROM</span>
          <span style={{ color: "rgba(96,165,250,0.75)" }}> users</span>
        </div>

        {/* Line 2 — WHERE username = 'admin' (fixed) */}
        <div className="mt-0.5">
          <span style={{ color: "rgba(167,139,250,0.8)" }}>WHERE</span>
          <span style={{ color: "rgba(226,232,240,0.6)" }}> username </span>
          <span style={{ color: "rgba(148,163,184,0.5)" }}>= </span>
          <span style={{ color: "rgba(34,197,94,0.7)" }}>&apos;admin&apos;</span>
        </div>

        {/* Line 3 — AND password = '<payload>' — injection lands here */}
        <div className="mt-0.5 flex flex-wrap items-center gap-x-1" style={{ opacity: commentO, transition: "opacity 0.3s" }}>
          <span style={{ color: "rgba(167,139,250,0.8)" }}>AND</span>
          <span style={{ color: "rgba(226,232,240,0.6)" }}> password </span>
          <span style={{ color: "rgba(148,163,184,0.5)" }}>= </span>
          <span style={{ color: "rgba(34,197,94,0.7)" }}>&apos;</span>
          {/* Injected payload */}
          {payload && (
            <span style={{ color: injected ? ROSE : "rgba(226,232,240,0.85)", fontWeight: injected ? 700 : 400 }}>
              {payload}
            </span>
          )}
          {/* Closing quote broken by -- */}
          {injected && (
            <span style={{ color: "rgba(148,163,184,0.25)", textDecoration: "line-through" }}>
              &apos;
            </span>
          )}
          {injected && (
            <span className="ml-2 font-mono text-[9px]" style={{ color: "rgba(148,163,184,0.3)" }}>
              ← rest commented out
            </span>
          )}
        </div>

        {/* Injection explanation badge */}
        {injected && (
          <div
            className="mt-3 flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              background: "rgba(244,63,94,0.07)",
              border: "1px solid rgba(244,63,94,0.15)",
              opacity: Math.min((localProgress - 0.52) / 0.08, 1),
            }}
          >
            <span className="font-mono text-[9px]" style={{ color: "rgba(244,63,94,0.7)" }}>
              <span style={{ color: ROSE, fontWeight: 700 }}>1=1</span> is always true → returns all rows ·{" "}
              <span style={{ color: ROSE, fontWeight: 700 }}>--</span> comments out password check
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
