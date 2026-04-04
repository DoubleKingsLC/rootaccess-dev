"use client";

import React from "react";

type MockDNSDumpsterProps = {
  localProgress: number; // 0–1 within OsintToolScene (0.10–0.125 globally)
};

// ── Helpers ───────────────────────────────────────────────────────────────────
// URL typing: 0.25–0.32 (faster)
const URL_TEXT = "dnsdumpster.com";
const urlTyped = (lp: number): string => {
  if (lp < 0.25) return "";
  const chars = Math.round((Math.min(lp - 0.25, 0.07) / 0.07) * URL_TEXT.length);
  return URL_TEXT.slice(0, chars);
};

// Search field typing: 0.32–0.42 (faster)
const QUERY_TEXT = "nexuspay.io";
const queryTyped = (lp: number): string => {
  if (lp < 0.32) return "";
  const chars = Math.round((Math.min(lp - 0.32, 0.10) / 0.10) * QUERY_TEXT.length);
  return QUERY_TEXT.slice(0, chars);
};

// Loading bar: 0.42–0.52 (faster sweep)
const loadingWidth = (lp: number): number => {
  if (lp < 0.42) return 0;
  if (lp > 0.52) return 100;
  return ((lp - 0.42) / 0.10) * 100;
};

// DNS results rows — appear one by one after 0.58
const DNS_ROWS = [
  { host: "nexuspay.io",         type: "A",     value: "104.21.47.82",   flag: false },
  { host: "api.nexuspay.io",     type: "A",     value: "104.21.47.83",   flag: false },
  { host: "mail.nexuspay.io",    type: "MX",    value: "aspmx.l.google.com", flag: false },
  { host: "staging.nexuspay.io", type: "A",     value: "178.62.14.201",  flag: true  },
  { host: "admin.nexuspay.io",   type: "A",     value: "188.166.92.14",  flag: true  },
];

const rowsVisible = (lp: number): number => {
  if (lp < 0.52) return 0;
  return Math.floor(((lp - 0.52) / 0.33) * (DNS_ROWS.length + 1));
};

const ROSE = "#f43f5e";

export const MockDNSDumpster: React.FC<MockDNSDumpsterProps> = ({ localProgress }) => {
  const typed    = urlTyped(localProgress);
  const query    = queryTyped(localProgress);
  const loading  = loadingWidth(localProgress);
  const visible  = rowsVisible(localProgress);
  const showRows = localProgress >= 0.52;

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl"
      style={{
        width: "clamp(560px, 74vw, 900px)",
        background: "#0f1117",
        border: "1px solid rgba(244,63,94,0.25)",
        boxShadow: "0 0 60px rgba(244,63,94,0.10), 0 32px 64px rgba(0,0,0,0.6)",
        fontFamily: "monospace",
      }}
    >
      {/* ── Chrome bar ─────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-3"
        style={{ background: "#1a1d27", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
            <div key={i} className="h-3 w-3 rounded-full" style={{ background: c }} />
          ))}
        </div>

        {/* URL bar */}
        <div
          className="mx-4 flex flex-1 items-center gap-2 rounded-lg px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {/* Lock icon */}
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(34,197,94,0.8)" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-mono text-[11px]" style={{ color: "rgba(226,232,240,0.7)" }}>
            {typed}
            {typed.length < URL_TEXT.length && (
              <span className="ml-0.5 inline-block w-px animate-pulse" style={{ background: ROSE, height: "12px", verticalAlign: "middle" }} />
            )}
          </span>
        </div>

        {/* Tab label */}
        <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.5)" }}>
          OSINT
        </span>
      </div>

      {/* ── Page content ───────────────────────────────────────────────────── */}
      <div className="flex flex-col px-6 pt-5 pb-5 gap-4">
        {/* Site header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded"
              style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)" }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ROSE} strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <div>
              <p className="font-mono text-sm font-bold text-white">DNSDumpster</p>
              <p className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.5)" }}>
                DNS Recon & Research
              </p>
            </div>
          </div>
          <div className="font-mono text-[9px]" style={{ color: "rgba(148,163,184,0.4)" }}>
            free dns lookup tool
          </div>
        </div>

        {/* Search field */}
        <div
          className="flex items-center gap-3 rounded-xl px-4 py-3"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: `1px solid ${localProgress >= 0.42 ? "rgba(244,63,94,0.4)" : "rgba(255,255,255,0.1)"}`,
            transition: "border-color 0.3s",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="rgba(148,163,184,0.5)" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <span className="flex-1 font-mono text-sm" style={{ color: "rgba(226,232,240,0.85)" }}>
            {query}
            {query.length > 0 && query.length < QUERY_TEXT.length && (
              <span className="ml-0.5 inline-block w-px" style={{ background: ROSE, height: "14px", verticalAlign: "middle", animation: "pulse 1s infinite" }} />
            )}
            {query.length === 0 && (
              <span className="font-mono text-[12px]" style={{ color: "rgba(148,163,184,0.3)" }}>
                Enter domain to enumerate...
              </span>
            )}
          </span>
          <div
            className="rounded px-3 py-1 font-mono text-[10px] font-bold uppercase"
            style={{
              background: localProgress >= 0.42 ? ROSE : "rgba(244,63,94,0.15)",
              color: localProgress >= 0.42 ? "white" : "rgba(244,63,94,0.5)",
              transition: "all 0.3s",
            }}
          >
            Search
          </div>
        </div>

        {/* Loading bar */}
        {loading > 0 && loading < 100 && (
          <div className="rounded-full overflow-hidden" style={{ height: 3, background: "rgba(255,255,255,0.05)" }}>
            <div
              className="h-full rounded-full transition-all"
              style={{
                width: `${loading}%`,
                background: `linear-gradient(90deg, ${ROSE}, rgba(251,113,133,0.8))`,
                boxShadow: `0 0 8px rgba(244,63,94,0.6)`,
                transition: "width 0.1s linear",
              }}
            />
          </div>
        )}

        {/* Scanning label */}
        {loading > 0 && loading < 100 && (
          <div className="flex items-center gap-2">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: ROSE, boxShadow: `0 0 6px ${ROSE}`, animation: "pulse 0.8s infinite" }}
            />
            <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.6)" }}>
              Enumerating DNS records for nexuspay.io...
            </span>
          </div>
        )}

        {/* Results table */}
        {showRows && visible > 0 && (
          <div
            className="overflow-hidden rounded-xl"
            style={{ border: "1px solid rgba(244,63,94,0.15)" }}
          >
            {/* Table header */}
            <div
              className="grid grid-cols-3 gap-0 px-4 py-2"
              style={{ background: "rgba(15,20,35,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              {["Host", "Type", "Value"].map((h) => (
                <span key={h} className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.5)" }}>
                  {h}
                </span>
              ))}
            </div>

            {/* Rows */}
            {DNS_ROWS.slice(0, Math.min(visible, DNS_ROWS.length)).map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-3 gap-0 px-4 py-2.5"
                style={{
                  background: row.flag ? "rgba(244,63,94,0.06)" : i % 2 === 0 ? "rgba(255,255,255,0.01)" : "transparent",
                  borderBottom: i < DNS_ROWS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
                }}
              >
                <span
                  className="font-mono text-[11px] font-medium"
                  style={{ color: row.flag ? "#f87171" : "rgba(226,232,240,0.85)" }}
                >
                  {row.host}
                  {row.flag && (
                    <span className="ml-2 font-mono text-[8px] font-bold uppercase tracking-widest" style={{ color: ROSE }}>
                      ⚠
                    </span>
                  )}
                </span>
                <span
                  className="font-mono text-[10px]"
                  style={{ color: row.type === "A" ? "rgba(96,165,250,0.8)" : "rgba(167,139,250,0.8)" }}
                >
                  {row.type}
                </span>
                <span className="font-mono text-[10px]" style={{ color: "rgba(148,163,184,0.6)" }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Result summary */}
        {visible >= DNS_ROWS.length && (
          <div className="flex items-center justify-between">
            <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.4)" }}>
              {DNS_ROWS.length} records found
            </span>
            <span className="font-mono text-[9px]" style={{ color: "rgba(244,63,94,0.5)" }}>
              2 flagged — no auth detected
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
