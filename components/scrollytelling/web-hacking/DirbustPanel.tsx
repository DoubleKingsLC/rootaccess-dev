"use client";

import React from "react";

type DirbustPanelProps = {
  localProgress: number; // 0–1 within ActiveReconScene
};

// Panel slides in from right at local 0.72, items stream after 0.78
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const panelSlide = (lp: number): number => {
  if (lp < 0.72) return 0;
  if (lp < 0.84) return ease((lp - 0.72) / 0.12);
  return 1;
};

const ROUTES: { path: string; status: number; note: string; flag: boolean; next?: boolean }[] = [
  { path: "/api/v1/users",        status: 200, note: "no rate limit",      flag: false },
  { path: "/api/v2/admin",        status: 401, note: "unauthorized",       flag: false },
  { path: "/swagger/index.html",  status: 200, note: "API docs · public",  flag: true  },
  { path: "/.env.backup",         status: 200, note: "plaintext creds",    flag: true  },
  { path: "/login",               status: 200, note: "admin login portal", flag: true,  next: true },
];

const routesVisible = (lp: number): number => {
  if (lp < 0.78) return 0;
  return Math.floor(((lp - 0.78) / 0.20) * (ROUTES.length + 1));
};

const ROSE = "#f43f5e";

const statusColor = (code: number, flag: boolean) => {
  if (flag) return ROSE;
  if (code === 200) return "rgba(34,197,94,0.8)";
  return "rgba(148,163,184,0.5)";
};

export const DirbustPanel: React.FC<DirbustPanelProps> = ({ localProgress }) => {
  const panelT  = panelSlide(localProgress);
  const visible = routesVisible(localProgress);

  if (panelT === 0) return null;

  const tx = `${(1 - panelT) * 52}px`;

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl backdrop-blur-md"
      style={{
        opacity: panelT,
        transform: `translateX(${tx})`,
        background: "rgba(8,12,24,0.94)",
        border: "1px solid rgba(244,63,94,0.2)",
        boxShadow: "0 0 40px rgba(244,63,94,0.08), 0 24px 48px rgba(0,0,0,0.5)",
        minWidth: 300,
        maxWidth: 380,
        fontFamily: "monospace",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ background: "rgba(15,20,35,0.98)", borderBottom: "1px solid rgba(244,63,94,0.10)" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base leading-none">📂</span>
          <div>
            <p className="font-mono text-[11px] font-bold text-white">Dir Enumeration</p>
            <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.6)" }}>
              via gobuster · ffuf
            </p>
          </div>
        </div>
        <div
          className="rounded-md px-2 py-1"
          style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)" }}
        >
          <span className="font-mono text-[9px] font-bold" style={{ color: ROSE }}>
            {Math.min(visible, ROUTES.length)}/{ROUTES.length} routes
          </span>
        </div>
      </div>

      {/* Column headers */}
      <div
        className="grid px-4 py-1.5"
        style={{ gridTemplateColumns: "1fr 3rem 1fr", background: "rgba(10,14,24,0.6)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
      >
        {["Path", "Status", "Note"].map((h) => (
          <span key={h} className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.35)" }}>
            {h}
          </span>
        ))}
      </div>

      {/* Route rows */}
      <div className="flex flex-col">
        {ROUTES.slice(0, Math.min(visible, ROUTES.length)).map((row, i) => (
          <div
            key={i}
            className="grid items-center px-4 py-2"
            style={{
              gridTemplateColumns: "1fr 3rem 1fr",
              background: row.next
                ? "rgba(244,63,94,0.10)"
                : row.flag
                  ? "rgba(244,63,94,0.05)"
                  : "transparent",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
              outline: row.next ? "1px solid rgba(244,63,94,0.35)" : "none",
              outlineOffset: "-1px",
            }}
          >
            <span
              className="truncate font-mono text-[10px] font-medium"
              style={{ color: row.next ? "#f43f5e" : row.flag ? "#f87171" : "rgba(226,232,240,0.8)" }}
            >
              {row.path}
              {row.next && (
                <span
                  className="ml-2 inline-block font-mono text-[8px] uppercase tracking-widest"
                  style={{ color: ROSE, animation: "pulse 1.2s ease-in-out infinite" }}
                >
                  → target
                </span>
              )}
            </span>
            <span
              className="font-mono text-[10px] tabular-nums font-bold"
              style={{ color: statusColor(row.status, row.flag) }}
            >
              {row.status}
            </span>
            <span className="font-mono text-[9px]" style={{ color: row.next ? "rgba(244,63,94,0.75)" : row.flag ? "rgba(251,113,133,0.65)" : "rgba(148,163,184,0.45)" }}>
              {row.note}
              {row.flag && <span className="ml-1" style={{ color: ROSE }}>⚠</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
