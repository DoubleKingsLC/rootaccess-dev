"use client";

import React from "react";
import { ramp, CloudKeyframes, S3_GREEN, S3_RED } from "./cloudShared";

const IN = 0.57, OUT = 0.73;
const sceneOp = (p: number) => {
  if (p < IN)          return 0;
  if (p < IN + 0.015)  return (p - IN) / 0.015;
  if (p < OUT - 0.015) return 1;
  if (p < OUT)         return 1 - (p - (OUT - 0.015)) / 0.015;
  return 0;
};

const SETTINGS = [
  "Block public access granted through new ACLs",
  "Block public access granted through any ACLs",
  "Block public access granted through new public bucket policies",
  "Restrict access to buckets with public policies",
];

// ── Cursor helpers ─────────────────────────────────────────────────────────────
function easeIO(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
type WP = { at: number; x: number; y: number };
function cursorPos(lp: number, pts: WP[]) {
  if (lp <= pts[0].at) return { x: pts[0].x, y: pts[0].y };
  for (let i = 0; i < pts.length - 1; i++) {
    if (lp <= pts[i + 1].at) {
      const t = easeIO((lp - pts[i].at) / (pts[i + 1].at - pts[i].at));
      return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * t, y: pts[i].y + (pts[i + 1].y - pts[i].y) * t };
    }
  }
  return { x: pts[pts.length - 1].x, y: pts[pts.length - 1].y };
}
function clickRipple(lp: number, at: number) {
  const d = lp - at;
  if (d < 0 || d > 0.026) return null;
  const t = d / 0.026;
  return { scale: 0.15 + t * 2.85, opacity: 1 - t };
}

// Cursor waypoints — coordinates relative to the page-content div (background #f4f5f7)
// Panel header center-y ≈ 76, status badge x ≈ 1013
// Toggle rows: y ≈ 129, 173, 217, 261 | toggle switch x ≈ 992
// Save button ≈ (990, 309)
const FIX_WAYPOINTS: WP[] = [
  { at: 0.36, x: 600, y: 140 },    // appears in content area after browser zooms in
  { at: 0.41, x: 1013, y: 76  },   // moves toward the OFF status badge (as if clicking Edit)
  { at: 0.52, x: 992,  y: 129 },   // moves to toggle 1
  { at: 0.60, x: 992,  y: 173 },   // moves to toggle 2
  { at: 0.68, x: 992,  y: 217 },   // moves to toggle 3
  { at: 0.76, x: 992,  y: 261 },   // moves to toggle 4
  { at: 0.84, x: 990,  y: 309 },   // moves to Save button
  { at: 0.95, x: 990,  y: 309 },   // holds
];

// Click triggers: editClick, t1–t4, saveClick
const FIX_CLICKS = [0.44, 0.50, 0.58, 0.66, 0.74, 0.82] as const;

export const FixScene: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = sceneOp(progress);
  if (opacity === 0) return null;

  const lp = ramp(progress, IN, OUT - IN);

  // Transition quote — fully done before browser appears
  const quoteIn   = ramp(lp, 0.00, 0.12);
  const quoteOut  = ramp(lp, 0.16, 0.10);
  const quoteOp   = quoteIn * (1 - quoteOut);

  // Browser only starts after quote is fully gone (lp > 0.26)
  const browserIn = ramp(lp, 0.28, 0.18);
  const editClick = ramp(lp, 0.42, 0.10);  // Edit button highlighted
  const t1        = ramp(lp, 0.50, 0.10);  // toggle 1 flips
  const t2        = ramp(lp, 0.58, 0.10);  // toggle 2
  const t3        = ramp(lp, 0.66, 0.10);  // toggle 3
  const t4        = ramp(lp, 0.74, 0.10);  // toggle 4
  const saveClick = ramp(lp, 0.82, 0.08);  // Save button
  const successOp = ramp(lp, 0.88, 0.10);  // Success banner
  const captionOp = ramp(lp, 0.92, 0.08);

  const toggles  = [t1, t2, t3, t4];
  const allOn    = t4 > 0.5;
  const browserScale = 0.1 + browserIn * 0.9;

  const headerStatus = allOn ? "ON" : editClick > 0.5 ? "EDITING..." : "OFF";
  const headerColor  = allOn ? S3_GREEN : editClick > 0.5 ? "#f59e0b" : S3_RED;

  // ── Cursor ────────────────────────────────────────────────────────────────────
  const cp       = cursorPos(lp, FIX_WAYPOINTS);
  const ripples  = FIX_CLICKS.map(at => clickRipple(lp, at));
  const cursorOp = Math.min(1, Math.max(0, (lp - 0.36) / 0.07));

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ opacity }}>
      <CloudKeyframes />

      {/* ── Transition quote ── */}
      {quoteOp > 0.01 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: quoteOp }}>
          <div className="flex flex-col items-center gap-5 text-center px-8">
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, rgba(34,197,94,0.5), transparent)" }} />
            <p className="font-sans text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-snug"
              style={{ color: "rgba(255,255,255,0.92)" }}>
              So how do we <span style={{ color: "#22c55e" }}>fix it?</span>
            </p>
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, rgba(34,197,94,0.5), transparent)" }} />
          </div>
        </div>
      )}

      <div style={{
        transform: `scale(${browserScale})`,
        transformOrigin: "center center",
        opacity: browserIn,
        width: "min(1080px, 96vw)",
        borderRadius: 10, overflow: "hidden",
        boxShadow: `0 28px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06), 0 0 0 2px ${allOn ? `${S3_GREEN}30` : "transparent"}`,
        fontFamily: "'Segoe UI', Arial, sans-serif",
        transition: "box-shadow 0.4s",
      }}>

        {/* Tab bar */}
        <div style={{ background: "#1e1e1e", padding: "8px 14px 0", display: "flex", alignItems: "flex-end", gap: 2 }}>
          <div style={{ background: "white", borderRadius: "7px 7px 0 0", padding: "7px 16px", fontSize: 11, color: "#333", display: "flex", alignItems: "center", gap: 8 }}>
            <span>🪣</span>
            <span>prod-company-assets — Permissions</span>
            <span style={{ color: "#aaa", marginLeft: 4 }}>×</span>
          </div>
        </div>

        {/* Address bar */}
        <div style={{ background: "#292929", padding: "7px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <span style={{ color: "#555", fontSize: 17 }}>‹</span>
            <span style={{ color: "#444", fontSize: 17 }}>›</span>
          </div>
          <div style={{ flex: 1, background: "#3a3a3a", borderRadius: 20, padding: "5px 14px", display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ color: allOn ? "#4ade80" : "#fbbf24", fontSize: 10 }}>🔒</span>
            <span style={{ color: "#d0d0d0", fontSize: 10.5, fontFamily: "monospace" }}>
              s3.console.aws.amazon.com/s3/buckets/prod-company-assets?tab=permissions
            </span>
          </div>
        </div>

        {/* Page content — position:relative so cursor overlay is scoped to this */}
        <div style={{ background: "#f4f5f7", position: "relative" }}>
          {/* AWS sidebar + content */}
          <div style={{ display: "flex" }}>
            <div style={{ width: 188, background: "#1a2332", padding: "14px 0", flexShrink: 0, minHeight: 460 }}>
              <div style={{ padding: "0 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
                <span style={{ color: "#f59e0b", fontWeight: 900, fontSize: 18, letterSpacing: "-1px" }}>aws</span>
              </div>
              {["Overview", "Properties", "Permissions", "Metrics"].map(item => (
                <div key={item} style={{
                  padding: "9px 16px", fontSize: 12,
                  color: item === "Permissions" ? "white" : "rgba(255,255,255,0.5)",
                  background: item === "Permissions" ? "rgba(255,255,255,0.1)" : "transparent",
                }}>{item}</div>
              ))}
            </div>

            <div style={{ flex: 1, padding: "18px 22px", overflowY: "auto" }}>
              <div style={{ fontSize: 11, color: "#0073bb", marginBottom: 12 }}>
                S3 <span style={{ color: "#999", margin: "0 4px" }}>›</span>
                prod-company-assets <span style={{ color: "#999", margin: "0 4px" }}>›</span>
                Permissions
              </div>

              {/* Success banner */}
              {successOp > 0.1 && (
                <div style={{
                  background: "#f0fdf4", border: "1px solid #86efac", borderRadius: 5,
                  padding: "10px 14px", marginBottom: 14, display: "flex", gap: 8,
                  alignItems: "center", opacity: successOp, transition: "opacity 0.3s",
                }}>
                  <span style={{ color: S3_GREEN, fontSize: 16 }}>✓</span>
                  <span style={{ fontSize: 11.5, color: "#14532d", fontWeight: 600 }}>
                    Block all public access settings have been saved successfully.
                  </span>
                </div>
              )}

              {/* Block Public Access panel */}
              <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ padding: "12px 18px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Block public access (bucket settings)</div>
                    <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>prod-company-assets</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    {editClick > 0.4 && editClick < 0.95 && !allOn && (
                      <div style={{
                        background: "#0073bb", color: "white", borderRadius: 4,
                        padding: "5px 14px", fontSize: 11, fontWeight: 600,
                        opacity: Math.min(1, editClick * 2),
                      }}>Editing…</div>
                    )}
                    <div style={{
                      background: allOn ? "#f0fdf4" : "#fef2f2",
                      border: `1px solid ${allOn ? "#86efac" : "#fca5a5"}`,
                      borderRadius: 4, padding: "5px 16px",
                      fontSize: 13, color: headerColor, fontWeight: 800,
                      transition: "all 0.4s",
                    }}>
                      {headerStatus}
                    </div>
                  </div>
                </div>

                {/* Toggle rows */}
                <div style={{ padding: "0 18px" }}>
                  {SETTINGS.map((label, i) => {
                    const t = toggles[i];
                    const isOn = t > 0.5;
                    return (
                      <div key={i} style={{
                        padding: "11px 0",
                        borderBottom: i < 3 ? "1px solid #f3f4f6" : "none",
                        display: "flex", justifyContent: "space-between", alignItems: "center",
                      }}>
                        <span style={{ fontSize: 11.5, color: "#374151" }}>{label}</span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{
                            width: 36, height: 20, borderRadius: 10,
                            background: isOn ? S3_GREEN : "#e5e7eb",
                            position: "relative", transition: "background 0.3s",
                            flexShrink: 0,
                          }}>
                            <div style={{
                              position: "absolute", top: 3,
                              left: isOn ? 17 : 3,
                              width: 14, height: 14, borderRadius: "50%",
                              background: "white",
                              boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                              transition: "left 0.25s cubic-bezier(0.4,0,0.2,1)",
                            }} />
                          </div>
                          <span style={{
                            fontSize: 11, fontWeight: 600, minWidth: 22,
                            color: isOn ? S3_GREEN : "#9ca3af",
                            transition: "color 0.3s",
                          }}>
                            {isOn ? "On" : "Off"}
                          </span>
                          {isOn && (
                            <span style={{ color: S3_GREEN, fontSize: 13, animation: "cs-pulse 1.4s ease-in-out 1" }}>✓</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Save button row */}
                {editClick > 0.5 && !successOp && (
                  <div style={{ padding: "12px 18px", borderTop: "1px solid #f3f4f6", display: "flex", gap: 8, justifyContent: "flex-end" }}>
                    <button style={{ background: "white", border: "1px solid #d1d5db", borderRadius: 4, padding: "6px 16px", fontSize: 11.5, color: "#374151", cursor: "pointer" }}>
                      Cancel
                    </button>
                    <button style={{
                      background: saveClick > 0.3 ? S3_GREEN : "#0073bb",
                      border: "none", borderRadius: 4, padding: "6px 16px",
                      fontSize: 11.5, color: "white", fontWeight: 600, cursor: "pointer",
                      transition: "background 0.3s",
                      boxShadow: saveClick > 0.3 ? `0 0 12px ${S3_GREEN}60` : "none",
                    }}>
                      {saveClick > 0.3 ? "✓ Saved" : "Save changes"}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Cursor overlay — always opacity 1 on its own GPU layer */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 200 }}>
            <div style={{
              position: "absolute", left: 0, top: 0,
              transform: `translate3d(${cp.x}px, ${cp.y}px, 0)`,
              willChange: "transform",
            }}>
              {/* Ripples for each click event */}
              {ripples.map((r, i) => r && (
                <div key={i} style={{
                  position: "absolute", left: -20, top: -20, width: 40, height: 40,
                  borderRadius: "50%",
                  border: "2px solid rgba(79,70,229,0.75)",
                  background: "rgba(79,70,229,0.10)",
                  transform: `scale(${r.scale})`,
                  opacity: r.opacity,
                }} />
              ))}
              {/* Cursor arrow — opacity lives here, not on the container */}
              <svg width="14" height="18" viewBox="0 0 14 18"
                style={{ display: "block", opacity: cursorOp, filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.75))" }}>
                <path d="M1 1L1 14L4.5 11L7 17L9.5 16L7 10.5L11.5 10.5Z"
                  fill="white" stroke="#1a1a1a" strokeWidth="1.5"
                  strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-8 font-mono text-[9px] uppercase tracking-widest"
        style={{ color: "rgba(148,163,184,0.4)", opacity: captionOp }}>
        SCENE 04 · REMEDIATION
      </div>
    </div>
  );
};
