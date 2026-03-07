"use client";

import React from "react";

// ── Phase captions — one line, bottom-center, brief ──────────────────────────
const PHASES = [
  { message: "One anomaly in 14,847 events per minute.", showAt: 0.05, hideAt: 0.12 },
  { message: "L1 Analyst — real threat, or noise?",      showAt: 0.13, hideAt: 0.29 },
  { message: "Confirmed real. Escalating to L2.",         showAt: 0.30, hideAt: 0.37 },
  { message: "L2 — three events, one attack chain.",      showAt: 0.39, hideAt: 0.56 },
  { message: "L3 — pull the disk. Find the weapon.",      showAt: 0.58, hideAt: 0.71 },
  { message: "15 minutes. Attacker's access cut off.",    showAt: 0.72, hideAt: 0.77 },
  { message: "Incident closed. What do we learn?",        showAt: 0.86, hideAt: 0.93 },
] as const;

// ── Full-width broadcast banners ──────────────────────────────────────────────
// Each fires at a story-appropriate moment and spans the full viewport width
const NOTIFS = [
  {
    icon: "🛡",
    label: "CISO ALERTED",
    action: "P1 PROTOCOL ACTIVE — ALL HANDS ON DECK",
    showAt: 0.30,
    hideAt: 0.47,
    color: "#22d3ee",
    bg: "linear-gradient(90deg, rgba(4,18,30,0.98) 0%, rgba(6,25,42,0.98) 60%, rgba(4,18,30,0.98) 100%)",
    borderColor: "#22d3ee",
    glow: "rgba(34,211,238,0.4)",
    sweep: "rgba(34,211,238,0.12)",
  },
  {
    icon: "⚖",
    label: "LEGAL NOTIFIED",
    action: "DATA EXPOSURE REVIEW — 72-HOUR GDPR CLOCK STARTED",
    showAt: 0.62,
    hideAt: 0.74,
    color: "#a78bfa",
    bg: "linear-gradient(90deg, rgba(10,4,28,0.98) 0%, rgba(16,8,40,0.98) 60%, rgba(10,4,28,0.98) 100%)",
    borderColor: "#8b5cf6",
    glow: "rgba(139,92,246,0.4)",
    sweep: "rgba(139,92,246,0.12)",
  },
  {
    icon: "⚙",
    label: "SYS ADMIN RESPONDING",
    action: "WS-04 ISOLATED — j.chen CREDENTIALS RESET",
    showAt: 0.66,
    hideAt: 0.78,
    color: "#34d399",
    bg: "linear-gradient(90deg, rgba(2,14,10,0.98) 0%, rgba(4,20,14,0.98) 60%, rgba(2,14,10,0.98) 100%)",
    borderColor: "#34d399",
    glow: "rgba(52,211,153,0.4)",
    sweep: "rgba(52,211,153,0.12)",
  },
] as const;

// ── Opacity helper ────────────────────────────────────────────────────────────
const fade = (p: number, showAt: number, hideAt: number, len = 0.018): number => {
  if (p <= showAt || p >= hideAt) return 0;
  if (p < showAt + len) return (p - showAt) / len;
  if (p > hideAt - len) return (hideAt - p) / len;
  return 1;
};

// ── Component ─────────────────────────────────────────────────────────────────
export const NarrativeOverlay: React.FC<{ progress: number }> = ({ progress }) => {
  const activePhase = PHASES.find(ph => fade(progress, ph.showAt, ph.hideAt) > 0);
  // Show the most recently triggered notification if multiple overlap
  const activeNotif = [...NOTIFS].reverse().find(n => fade(progress, n.showAt, n.hideAt) > 0);

  return (
    <>
      {/* ── Full-width broadcast banner ──────────────────────────────────── */}
      {activeNotif && (() => {
        const op = fade(progress, activeNotif.showAt, activeNotif.hideAt);
        // Slide down from above: at op=0 fully hidden above, at op=1 fully visible
        const ty = `${(1 - op) * -100}%`;

        return (
          <div
            className="pointer-events-none absolute inset-x-0 top-0"
            style={{ opacity: op, transform: `translateY(${ty})` }}
            aria-hidden
          >
            {/* Outer glow halo */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                boxShadow: `0 12px 80px ${activeNotif.glow}`,
                pointerEvents: "none",
              }}
            />

            {/* Banner body */}
            <div
              style={{
                background: activeNotif.bg,
                borderBottom: `2px solid ${activeNotif.borderColor}`,
                boxShadow: `inset 0 0 60px ${activeNotif.sweep}, 0 0 40px ${activeNotif.glow}`,
                padding: "14px 32px",
                display: "flex",
                alignItems: "center",
                gap: 20,
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Ambient sweep gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(90deg, transparent 0%, ${activeNotif.sweep} 40%, transparent 80%)`,
                  pointerEvents: "none",
                }}
              />

              {/* Live pulse dot + ESCALATION label */}
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0, zIndex: 1 }}>
                <div
                  className="alert-pulse"
                  style={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    background: activeNotif.color,
                    boxShadow: `0 0 16px ${activeNotif.color}, 0 0 32px ${activeNotif.glow}`,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 10,
                    fontWeight: 800,
                    letterSpacing: "0.45em",
                    color: activeNotif.color,
                    textTransform: "uppercase",
                    whiteSpace: "nowrap",
                  }}
                >
                  ESCALATION
                </span>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 28, background: activeNotif.borderColor, opacity: 0.35, flexShrink: 0, zIndex: 1 }} />

              {/* Icon + Role name */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, flexShrink: 0, zIndex: 1 }}>
                <span style={{ fontSize: 22, lineHeight: 1 }}>{activeNotif.icon}</span>
                <span
                  style={{
                    fontFamily: "monospace",
                    fontSize: 14,
                    fontWeight: 900,
                    letterSpacing: "0.3em",
                    color: activeNotif.color,
                    textTransform: "uppercase",
                    textShadow: `0 0 24px ${activeNotif.color}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  {activeNotif.label}
                </span>
              </div>

              {/* Divider */}
              <div style={{ width: 1, height: 28, background: activeNotif.borderColor, opacity: 0.35, flexShrink: 0, zIndex: 1 }} />

              {/* Action text — fills remaining space */}
              <span
                style={{
                  fontFamily: "monospace",
                  fontSize: 11,
                  letterSpacing: "0.2em",
                  color: "#cbd5e1",
                  textTransform: "uppercase",
                  flex: 1,
                  zIndex: 1,
                }}
              >
                {activeNotif.action}
              </span>

              {/* LIVE badge */}
              <div
                style={{
                  marginLeft: "auto",
                  flexShrink: 0,
                  border: `1px solid ${activeNotif.borderColor}`,
                  borderRadius: 4,
                  padding: "4px 12px",
                  fontFamily: "monospace",
                  fontSize: 9,
                  letterSpacing: "0.4em",
                  color: activeNotif.color,
                  textTransform: "uppercase",
                  background: `${activeNotif.sweep}`,
                  zIndex: 1,
                }}
              >
                LIVE
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Bottom-center phase caption ──────────────────────────────────── */}
      {activePhase && (
        <div
          className="pointer-events-none absolute bottom-14 left-1/2 z-[35] -translate-x-1/2"
          style={{ opacity: fade(progress, activePhase.showAt, activePhase.hideAt) }}
          aria-hidden
        >
          <div className="rounded-xl border border-white/10 bg-slate-950/85 px-5 py-2.5 backdrop-blur-md">
            <p className="whitespace-nowrap font-mono text-sm font-medium tracking-wide text-slate-100">
              {activePhase.message}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
