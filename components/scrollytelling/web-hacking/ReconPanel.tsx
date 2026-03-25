"use client";

import React from "react";

type ReconItem = {
  text: string;
  sub?: string;
  ip?: string;   // right-aligned IP address (subdomains panel)
  flag?: boolean; // rose highlight for high-value finds
};

type ReconPanelProps = {
  title: string;
  source: string;      // e.g. "SHODAN", "GOOGLE"
  icon: string;
  items: ReconItem[];
  localProgress: number;  // 0–1 within this phase
  appearAt: number;       // local progress threshold to start sliding in
  itemsStartAt: number;   // local progress threshold to start revealing items
  slideFrom: "left" | "right" | "bottom";
  count: string;          // e.g. "5 hosts"
};

const ease = (t: number) => 1 - Math.pow(1 - t, 3); // cubic ease-out

export const ReconPanel: React.FC<ReconPanelProps> = ({
  title, source, icon, items, localProgress,
  appearAt, itemsStartAt, slideFrom, count,
}) => {
  // Panel slide-in
  const panelT = localProgress < appearAt ? 0
    : localProgress < appearAt + 0.18 ? ease((localProgress - appearAt) / 0.18)
    : 1;

  const tx = slideFrom === "left"   ? `${(1 - panelT) * -48}px`
           : slideFrom === "right"  ? `${(1 - panelT) * 48}px`
           : "0px";
  const ty = slideFrom === "bottom" ? `${(1 - panelT) * 48}px` : "0px";

  if (panelT === 0) return null;

  // Items reveal one by one after itemsStartAt
  const itemRange = 1 - itemsStartAt;
  const itemsVisible = localProgress < itemsStartAt ? 0
    : Math.floor(((localProgress - itemsStartAt) / itemRange) * (items.length + 1));

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl backdrop-blur-md"
      style={{
        opacity: panelT,
        transform: `translate(${tx}, ${ty})`,
        background: "rgba(8,12,24,0.95)",
        border: "1px solid rgba(244,63,94,0.28)",
        boxShadow: "0 0 60px rgba(244,63,94,0.12), 0 32px 64px rgba(0,0,0,0.6)",
        minWidth: 480,
        maxWidth: 620,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b px-6 py-5"
        style={{ borderColor: "rgba(244,63,94,0.15)", background: "rgba(15,20,35,0.98)" }}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl leading-none">{icon}</span>
          <div>
            <p className="font-mono text-base font-bold text-white">{title}</p>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.65)" }}>
              via {source}
            </p>
          </div>
        </div>
        {/* Live count badge */}
        <div
          className="rounded-md px-3 py-1.5"
          style={{ background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.3)" }}
        >
          <span className="font-mono text-xs font-bold" style={{ color: "#f43f5e" }}>
            {Math.min(itemsVisible, items.length)}/{items.length} {count}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="flex flex-col"
        style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}
      >
        {items.map((item, i) => {
          const visible = i < itemsVisible;
          if (!visible) return null;
          return (
            <div
              key={i}
              className="flex items-center justify-between gap-4 px-6 py-4"
              style={{
                background: item.flag ? "rgba(244,63,94,0.08)" : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
              }}
            >
              <div className="flex items-center gap-3 min-w-0">
                {/* Status dot */}
                <div
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{
                    background: item.flag ? "#f43f5e" : "rgba(34,197,94,0.9)",
                    boxShadow: item.flag ? "0 0 8px rgba(244,63,94,0.9)" : "0 0 8px rgba(34,197,94,0.7)",
                  }}
                />
                <div className="min-w-0">
                  <p
                    className="truncate font-mono text-[15px] font-semibold"
                    style={{ color: item.flag ? "#fca5a5" : "rgba(241,245,249,0.95)" }}
                  >
                    {item.text}
                  </p>
                  {item.sub && (
                    <p className="font-mono text-[11px] mt-0.5" style={{ color: "rgba(148,163,184,0.6)" }}>
                      {item.sub}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {item.ip && (
                  <span
                    className="font-mono text-xs tabular-nums"
                    style={{ color: item.flag ? "rgba(251,113,133,0.7)" : "rgba(148,163,184,0.5)" }}
                  >
                    {item.ip}
                  </span>
                )}
                {item.flag && (
                  <span className="font-mono text-sm font-bold" style={{ color: "#f43f5e" }}>
                    ⚠
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
