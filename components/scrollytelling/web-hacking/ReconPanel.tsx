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
        background: "rgba(8,12,24,0.92)",
        border: "1px solid rgba(244,63,94,0.2)",
        boxShadow: "0 0 40px rgba(244,63,94,0.08), 0 24px 48px rgba(0,0,0,0.5)",
        minWidth: 300,
        maxWidth: 400,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b px-4 py-3"
        style={{ borderColor: "rgba(244,63,94,0.12)", background: "rgba(15,20,35,0.98)" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base leading-none">{icon}</span>
          <div>
            <p className="font-mono text-[11px] font-bold text-white">{title}</p>
            <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.6)" }}>
              via {source}
            </p>
          </div>
        </div>
        {/* Live count badge */}
        <div
          className="rounded-md px-2 py-1"
          style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)" }}
        >
          <span className="font-mono text-[9px] font-bold" style={{ color: "#f43f5e" }}>
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
              className="flex items-center justify-between gap-3 px-4 py-2.5"
              style={{
                background: item.flag ? "rgba(244,63,94,0.06)" : "transparent",
                borderBottom: "1px solid rgba(255,255,255,0.03)",
              }}
            >
              <div className="flex items-center gap-2 min-w-0">
                {/* Status dot */}
                <div
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    background: item.flag ? "#f43f5e" : "rgba(34,197,94,0.8)",
                    boxShadow: item.flag ? "0 0 6px rgba(244,63,94,0.8)" : "0 0 6px rgba(34,197,94,0.6)",
                  }}
                />
                <div className="min-w-0">
                  <p
                    className="truncate font-mono text-[11px] font-medium"
                    style={{ color: item.flag ? "#f87171" : "rgba(226,232,240,0.85)" }}
                  >
                    {item.text}
                  </p>
                  {item.sub && (
                    <p className="font-mono text-[9px]" style={{ color: "rgba(148,163,184,0.45)" }}>
                      {item.sub}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {item.ip && (
                  <span
                    className="font-mono text-[9px] tabular-nums"
                    style={{ color: item.flag ? "rgba(251,113,133,0.6)" : "rgba(148,163,184,0.4)" }}
                  >
                    {item.ip}
                  </span>
                )}
                {item.flag && (
                  <span className="font-mono text-[8px] font-bold uppercase tracking-widest" style={{ color: "#f43f5e" }}>
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
