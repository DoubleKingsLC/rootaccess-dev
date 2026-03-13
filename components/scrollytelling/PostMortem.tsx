"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type PostMortemProps = { opacity: number };

const TIMELINE_STAGES = [
  { label: "Initial Access", sub: "Phishing email", icon: "📧", color: "#f87171" },
  { label: "Priv. Escalation", sub: "API token abuse", icon: "🔑", color: "#fb923c" },
  { label: "Lateral Movement", sub: "Internal pivot", icon: "🔀", color: "#facc15" },
  { label: "Detection", sub: "SIEM alert fired", icon: "🔔", color: "#38bdf8" },
  { label: "Containment", sub: "Endpoint isolated", icon: "🛡", color: "#818cf8" },
  { label: "Recovery", sub: "Systems restored", icon: "♻️", color: "#34d399" },
  { label: "Post-Incident", sub: "Incident closed", icon: "✅", color: "#4ade80", isLast: true },
];

const REPORT_FIELDS = [
  { label: "Incident ID",       value: "INC-2024-047" },
  { label: "Threat Vector",     value: "Internal API Brute Force" },
  { label: "Detection Method",  value: "SIEM Correlation Rule" },
  { label: "Time to Detect",    value: "8 minutes" },
  { label: "Time to Contain",   value: "21 minutes" },
  { label: "Systems Impacted",  value: "3" },
  { label: "Data Exfiltration", value: "None" },
];

const IMPROVEMENTS = [
  "MFA enforcement on all privileged accounts",
  "API rate limiting deployed enterprise-wide",
  "New SIEM detection rule — lateral brute force",
  "EDR anomaly monitoring enabled",
  "Credential rotation for affected service accounts",
];

export const PostMortem: React.FC<PostMortemProps> = ({ opacity }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);
  const hasEntered  = useRef(false);

  useGSAP(() => {
    if (opacity > 0.1) {
      if (!hasEntered.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 24, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: "power3.out", overwrite: true }
        );
        gsap.fromTo(
          ".pm-col",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.65, stagger: 0.15, ease: "power2.out", delay: 0.4, overwrite: true }
        );
        gsap.fromTo(
          ".pm-row",
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, duration: 0.4, stagger: 0.07, ease: "power1.out", delay: 0.75, overwrite: true }
        );
        gsap.fromTo(
          ".pm-node",
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.4, stagger: 0.1, ease: "back.out(1.4)", delay: 0.55, overwrite: true }
        );
        hasEntered.current = true;
      }
    } else if (opacity < 0.9 && hasEntered.current) {
      gsap.to(contentRef.current, { opacity: 0, y: -30, scale: 0.96, duration: 0.9, ease: "power2.inOut", overwrite: true });
      hasEntered.current = false;
    }
  }, [opacity]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center bg-[#050c1a] transition-all duration-500 pointer-events-none overflow-hidden"
      style={{ opacity }}
      aria-hidden
    >
      {/* ── Grid background ── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.035]"
        style={{
          backgroundImage: "linear-gradient(rgba(56,189,248,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.5) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      {/* ── Scanline ── */}
      <div className="absolute inset-0 z-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.9) 3px, rgba(0,0,0,0.9) 4px)" }} />
      {/* ── Ambient glow ── */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 40%, rgba(14,165,233,0.06) 0%, transparent 65%)" }} />

      <div ref={contentRef} className="relative z-10 w-full max-w-[1100px] px-6 opacity-0 flex flex-col gap-5">

        {/* ── Title ── */}
        <div className="text-center">
          <p className="font-mono text-[10px] uppercase tracking-[0.6em] text-sky-400/60 mb-1">Final Phase · SOC Operations</p>
          <h2 className="font-mono text-2xl md:text-3xl font-black uppercase tracking-widest text-white" style={{ textShadow: "0 0 40px rgba(56,189,248,0.35)" }}>
            Post-Incident Review & Lessons Learned
          </h2>
          <div className="mx-auto mt-2 h-px w-72 bg-gradient-to-r from-transparent via-sky-500/50 to-transparent" />
        </div>

        {/* ── Attack Lifecycle Timeline ── */}
        <div className="pm-col opacity-0 rounded-xl border border-sky-500/15 bg-slate-950/50 px-6 py-4 backdrop-blur-sm relative overflow-hidden" style={{ boxShadow: "0 0 50px rgba(14,165,233,0.04)" }}>
          <p className="font-mono text-[9px] uppercase tracking-[0.45em] text-sky-400/60 mb-4">Attack Lifecycle</p>
          <div className="flex items-center justify-between relative overflow-x-auto">
            {/* connector line */}
            <div className="absolute top-4 left-0 right-0 h-px bg-gradient-to-r from-red-500/40 via-yellow-500/40 via-sky-500/40 to-green-500/50" />
            {TIMELINE_STAGES.map((stage, i) => (
              <div key={i} className="pm-node opacity-0 flex flex-col items-center gap-2 relative z-10" style={{ minWidth: "clamp(56px, 7.5vw, 80px)" }}>
                <div
                  className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm"
                  style={{
                    borderColor: stage.color,
                    background: stage.isLast ? `${stage.color}22` : "#050c1a",
                    boxShadow: stage.isLast ? `0 0 16px ${stage.color}80` : `0 0 8px ${stage.color}40`,
                  }}
                >
                  {stage.icon}
                </div>
                <span className="font-mono text-[9px] font-bold text-center leading-tight" style={{ color: stage.color }}>{stage.label}</span>
                <span className="font-mono text-[8px] text-slate-500 text-center leading-tight">{stage.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── 3-Column Panels ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 lg:gap-4">

          {/* BLANK LEFT spacer replaced by spanning timeline above. Left panel = Report */}
          {/* LEFT: Incident Report */}
          <div className="pm-col opacity-0 col-span-1 rounded-xl border border-sky-500/20 bg-slate-950/60 p-5 backdrop-blur-md relative" style={{ boxShadow: "0 0 40px rgba(14,165,233,0.05)" }}>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-sky-400/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-sky-400/50" />
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
              <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-sky-400/70">📋 Incident Summary</p>
              <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">NEUTRALIZED</span>
            </div>
            <div className="space-y-2.5">
              {REPORT_FIELDS.map((row, i) => (
                <div key={i} className="pm-row opacity-0 flex justify-between items-baseline gap-2">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 shrink-0">{row.label}</span>
                  <span className="font-mono text-[11px] font-bold text-sky-200 text-right">{row.value}</span>
                </div>
              ))}
            </div>
            <p className="font-mono text-[9px] uppercase text-slate-600 tracking-widest text-center mt-4">INC-2024-047 · Closed</p>
          </div>

          {/* CENTER: Lessons Learned text */}
          <div className="pm-col opacity-0 col-span-1 rounded-xl border border-amber-500/20 bg-slate-950/60 p-5 backdrop-blur-md relative flex flex-col" style={{ boxShadow: "0 0 40px rgba(245,158,11,0.04)" }}>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-amber-400/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-amber-400/50" />
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-amber-400/70 mb-4 pb-2 border-b border-white/5">📖 Lessons Learned</p>
          <div className="flex-1 space-y-2.5">
              {[
                "Internal API endpoints were unmonitored — perimeter defences did not apply.",
                "Detection in 8 min was driven entirely by pre-built SIEM correlation rules.",
                "EDR remote isolation made 21-minute containment possible.",
                "Privileged account access was not gated by MFA — key failure point.",
                "East-west lateral traffic carries the same risk as external threats.",
                "Log everything. Baseline everything. Alert on deviation.",
              ].map((point, i) => (
                <div key={i} className="pm-row opacity-0 flex items-start gap-2.5">
                  <span className="mt-0.5 text-amber-400 text-xs leading-none shrink-0">▸</span>
                  <p className="font-sans text-xs text-slate-300 leading-snug">{point}</p>
                </div>
              ))}
          </div>
          </div>

          {/* RIGHT: Security Improvements */}
          <div className="pm-col opacity-0 col-span-1 rounded-xl border border-emerald-500/20 bg-slate-950/60 p-5 backdrop-blur-md relative" style={{ boxShadow: "0 0 40px rgba(52,211,153,0.05)" }}>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-emerald-400/50" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-emerald-400/50" />
            <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-emerald-400/70 mb-4 pb-2 border-b border-white/5">🛡 Security Controls Implemented</p>
            <ul className="space-y-3">
              {IMPROVEMENTS.map((item, i) => (
                <li key={i} className="pm-row opacity-0 flex items-start gap-2.5">
                  <span className="mt-0.5 text-emerald-400 text-xs leading-none" style={{ textShadow: "0 0 8px rgba(52,211,153,0.8)" }}>✓</span>
                  <p className="font-sans text-xs text-slate-300 leading-snug">{item}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 rounded-sm border border-emerald-500/15 bg-emerald-500/5 px-3 py-2 text-center">
              <p className="font-mono text-[9px] uppercase tracking-widest text-emerald-400/60">All Controls Verified Active</p>
            </div>
          </div>

        </div>

        {/* ── Footer ── */}
        <div className="flex items-center gap-3 opacity-25">
          <div className="h-px flex-1 bg-slate-800" />
          <p className="font-mono text-[10px] text-slate-500 whitespace-nowrap tracking-widest">SECURE LOG // SOC COMMAND CENTER // BOARDROOM MODE</p>
          <div className="h-px flex-1 bg-slate-800" />
        </div>

      </div>
    </div>
  );
};
