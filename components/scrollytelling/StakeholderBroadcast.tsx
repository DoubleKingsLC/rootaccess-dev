"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NotificationToast } from "./NotificationToast";

type StakeholderBroadcastProps = {
  progress: number;
};

const STAKEHOLDERS = [
  {
    id: "ciso" as const,
    label: "CISO",
    subtitle: "Security Authority",
    icon: "🛡",
    threshold: 0.80,
    statusLabel: "BRIEFED",
    action: "P1 declared — all hands on deck",
    c: {
      border: "border-cyan-500/55",
      glow: "0 0 40px rgba(34,211,238,0.22)",
      badge: "bg-cyan-500/20 border border-cyan-500/40 text-cyan-300",
      iconRing: "border-cyan-500/50",
      iconGlow: "0 0 24px rgba(34,211,238,0.4)",
      dot: "rgba(34,211,238,1)",
      label: "text-cyan-400",
    },
  },
  {
    id: "legal" as const,
    label: "LEGAL",
    subtitle: "Compliance & Risk",
    icon: "⚖",
    threshold: 0.82,
    statusLabel: "NOTIFIED",
    action: "72-hour GDPR disclosure clock started",
    c: {
      border: "border-violet-500/55",
      glow: "0 0 40px rgba(139,92,246,0.22)",
      badge: "bg-violet-500/20 border border-violet-500/40 text-violet-300",
      iconRing: "border-violet-500/50",
      iconGlow: "0 0 24px rgba(139,92,246,0.4)",
      dot: "rgba(139,92,246,1)",
      label: "text-violet-400",
    },
  },
  {
    id: "systems" as const,
    label: "SYS ADMIN",
    subtitle: "System Recovery",
    icon: "⚙",
    threshold: 0.84,
    statusLabel: "RESPONDING",
    action: "WS-04 isolated · j.chen credentials reset",
    c: {
      border: "border-emerald-500/55",
      glow: "0 0 40px rgba(52,211,153,0.22)",
      badge: "bg-emerald-500/20 border border-emerald-500/40 text-emerald-300",
      iconRing: "border-emerald-500/50",
      iconGlow: "0 0 24px rgba(52,211,153,0.4)",
      dot: "rgba(52,211,153,1)",
      label: "text-emerald-400",
    },
  },
] as const;

type StakeholderId = (typeof STAKEHOLDERS)[number]["id"];

export const StakeholderBroadcast: React.FC<StakeholderBroadcastProps> = ({ progress }) => {
  // ── Hooks first — no early returns before this ─────────────────────────────
  const cardRefs = useRef<Record<StakeholderId, HTMLDivElement | null>>({
    ciso: null, legal: null, systems: null,
  });
  const prevActiveRef = useRef<Record<StakeholderId, boolean>>({
    ciso: false, legal: false, systems: false,
  });
  const [toast, setToast] = useState<{ message: string; variant: "default" | "success" } | null>(null);

  useEffect(() => {
    let nextToast: { message: string; variant: "default" | "success" } | null = null;
    STAKEHOLDERS.forEach((s) => {
      const el = cardRefs.current[s.id];
      const isActive = progress >= s.threshold;
      const wasActive = prevActiveRef.current[s.id];
      if (el && isActive && !wasActive) {
        gsap.fromTo(el,
          { opacity: 0, y: 20, scale: 0.93 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, ease: "back.out(1.5)" }
        );
        nextToast = {
          message: s.id === "systems" ? "Systems Admin Notified" : `${s.label} Briefed`,
          variant: s.id === "systems" ? "success" : "default",
        };
      }
      prevActiveRef.current[s.id] = isActive;
    });
    if (nextToast) setToast(nextToast);
  }, [progress]);

  // ── Safe early return ──────────────────────────────────────────────────────
  if (progress < 0.78) return null;

  const opacity =
    progress < 0.82 ? (progress - 0.78) / 0.04
    : progress > 0.87 ? Math.max(0, 1 - (progress - 0.87) / 0.03)
    : 1;

  const allNotified = progress >= 0.84;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 px-10 py-8"
      style={{ opacity }}
      aria-hidden
    >
      {/* ── Top: story context ─────────────────────────────────────────────── */}
      <div className="flex flex-col items-center gap-2">
        <div
          className="flex items-center gap-3 rounded-xl border-2 border-red-500/50 bg-red-950/30 px-5 py-2.5"
          style={{ boxShadow: "0 0 40px rgba(239,68,68,0.2)" }}
        >
          <div className="h-2.5 w-2.5 rounded-full bg-red-500 alert-pulse" style={{ boxShadow: "0 0 10px rgba(239,68,68,0.9)" }} />
          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-red-300">
            INCIDENT ESCALATED — WAR ROOM ACTIVATED
          </p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
          SOC  →  Detection  →  Triage  →  Forensics  →  <span className="text-red-400">Escalation ●</span>
        </p>
      </div>

      {/* ── Three stakeholder cards ────────────────────────────────────────── */}
      <div className="grid w-full max-w-4xl grid-cols-3 gap-6">
        {STAKEHOLDERS.map((s) => {
          const isActive = progress >= s.threshold;
          const c = s.c;

          return (
            <div
              key={s.id}
              ref={(el) => { cardRefs.current[s.id] = el; }}
              className={`flex flex-col items-center gap-4 rounded-2xl border-2 bg-slate-900/90 px-5 py-7 opacity-0 backdrop-blur-xl ${
                isActive ? c.border : "border-slate-800/50"
              }`}
              style={isActive ? { boxShadow: c.glow } : undefined}
            >
              {/* Live dot */}
              <div className="flex w-full items-center justify-between">
                <span className={`font-mono text-[8px] uppercase tracking-[0.4em] ${isActive ? c.label : "text-slate-700"}`}>
                  {isActive ? s.statusLabel : "Standby"}
                </span>
                <div
                  className={`h-2.5 w-2.5 rounded-full ${isActive ? "animate-pulse" : "bg-slate-800"}`}
                  style={isActive ? { background: c.dot, boxShadow: `0 0 10px ${c.dot}` } : undefined}
                />
              </div>

              {/* Icon */}
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-2xl border-2 bg-slate-800 text-6xl transition-all duration-500 ${
                  isActive ? c.iconRing : "border-slate-700/30"
                }`}
                style={isActive ? { boxShadow: c.iconGlow } : undefined}
              >
                {s.icon}
              </div>

              {/* Role */}
              <div className="text-center">
                <p className={`font-mono text-xl font-black uppercase tracking-wider ${isActive ? "text-white" : "text-slate-700"}`}>
                  {s.label}
                </p>
                <p className={`font-mono text-[9px] uppercase tracking-widest mt-0.5 ${isActive ? "text-slate-400" : "text-slate-700"}`}>
                  {s.subtitle}
                </p>
              </div>

              {/* Action — only when active */}
              <div className={`w-full rounded-xl border px-4 py-2.5 text-center transition-all duration-500 ${
                isActive ? c.badge : "border-slate-800/30 bg-slate-800/20"
              }`}>
                <p className={`font-sans text-xs leading-snug ${isActive ? "text-slate-200" : "text-slate-700"}`}>
                  {isActive ? s.action : "—"}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom: resolution strip ───────────────────────────────────────── */}
      <div
        className={`flex items-center gap-4 rounded-xl border px-6 py-3 transition-all duration-700 ${
          allNotified
            ? "border-emerald-500/30 bg-emerald-950/20"
            : "border-slate-800/30 bg-slate-900/20"
        }`}
        style={allNotified ? { boxShadow: "0 0 30px rgba(52,211,153,0.1)" } : undefined}
      >
        <div className={`h-2 w-2 rounded-full shrink-0 ${allNotified ? "bg-emerald-400 animate-pulse" : "bg-slate-700"}`} />
        <p className={`font-mono text-xs ${allNotified ? "text-emerald-300" : "text-slate-600"}`}>
          {allNotified
            ? "INCIDENT CONTAINED — 15 min detection to containment · All teams responding"
            : "Notifying response teams..."}
        </p>
      </div>

      {/* ── Toast ─────────────────────────────────────────────────────────── */}
      {toast && (
        <div className="pointer-events-auto absolute bottom-24 right-6 z-30">
          <NotificationToast
            message={toast.message}
            variant={toast.variant}
            onDismiss={() => setToast(null)}
          />
        </div>
      )}
    </div>
  );
};
