"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const STEPS = [
  { icon: "🔔", label: "Initial Alert", time: "14:22:31", color: "#fbbf24" },
  { icon: "🔍", label: "L1 Triage", time: "14:26:00", color: "#22d3ee" },
  { icon: "🔗", label: "Event Correlation", time: "14:30:00", color: "#22d3ee" },
  { icon: "💾", label: "Forensic Imaging", time: "14:34:00", color: "#f59e0b" },
  { icon: "✅", label: "Containment Confirmed", time: "14:37:31", color: "#34d399" },
] as const;

const CHANGES = [
  { icon: "🔐", title: "MFA Enforcement", sub: "Global Policy Update" },
  { icon: "🎛", title: "SIEM Ruleset Tuning", sub: "Anomalous Auth Thresholds" },
  { icon: "📋", title: "Playbook Revision", sub: "Rapid Quarantine Automation" },
] as const;

type PostMortemProps = { opacity: number };

export const PostMortem: React.FC<PostMortemProps> = ({ opacity }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const execRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (opacity > 0.8) {
      gsap.fromTo(
        [execRef.current, metricsRef.current, actionsRef.current],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out", overwrite: true }
      );
    } else {
      gsap.set([execRef.current, metricsRef.current, actionsRef.current], { opacity: 0, y: 30 });
    }
  }, [opacity]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-xl transition-all duration-300 pointer-events-none"
      style={{ opacity }}
      aria-hidden
    >
      {/* ── Global CRT overlay ────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)" }}
      />

      <div className="relative z-10 flex w-full max-w-6xl flex-col px-8">
        {/* ── Header ──────────────────────────────────────────────────────────── */}
        <div className="mb-8 flex items-end justify-between border-b border-emerald-900/40 pb-4">
          <div>
            <div className="mb-2 flex items-center gap-3">
              <div
                className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
                style={{ boxShadow: "0 0 12px rgba(52,211,153,0.8)" }}
              />
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-400">
                Post-Incident Review (PIR)
              </p>
            </div>
            <h2 className="font-mono text-2xl font-black uppercase text-slate-100" style={{ textShadow: "0 0 20px rgba(52,211,153,0.2)" }}>
              After-Action Report: INC-2024-047
            </h2>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">Status</p>
            <p className="font-mono text-sm font-bold text-emerald-400">RESOLVED / CONTAINED</p>
          </div>
        </div>

        <div className="flex w-full items-stretch gap-6">
          {/* LEFT: Executive Summary ────────────────────────────────────────────── */}
          <div className="flex w-[45%] flex-col gap-4">
            <div
              ref={execRef}
              className="flex-1 rounded-xl border border-slate-800/60 bg-slate-900/40 p-6 shadow-[inset_0_0_40px_rgba(34,211,238,0.02)] opacity-0"
            >
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500">
                Executive Summary
              </p>

              <ul className="space-y-3 font-mono text-xs leading-relaxed text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="shrink-0 text-cyan-500">▸</span>
                  <span><strong className="text-cyan-400">Origin:</strong> 185.220.101.47 (RU). Target: `j.chen`.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 text-cyan-500">▸</span>
                  <span><strong className="text-cyan-400">Vector:</strong> Brute force authentication leading to lateral pivot to Finance WS-04.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="shrink-0 text-cyan-500">▸</span>
                  <span><strong className="text-cyan-400">Action:</strong> Outbound C2 beaconing confirmed via encrypted TOR tunnels.</span>
                </li>
              </ul>

              <div className="mt-8 rounded-lg border-l-2 border-emerald-500/50 bg-emerald-950/20 px-4 py-3">
                <p className="font-mono text-xs text-slate-200">
                  <span className="font-bold text-emerald-400">Verdict:</span> Attack thwarted pre-exfiltration via rapid L3 containment.
                </p>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-slate-800/60 pt-6">
                <div>
                  <p className="font-mono text-[9px] uppercase text-slate-500">Threat Actor</p>
                  <p className="font-mono text-sm font-bold text-red-400">Unattributed (Pending)</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] uppercase text-slate-500">Data Loss</p>
                  <p className="font-mono text-sm font-bold text-emerald-400">0 Bytes Confirmed</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Timeline, Metrics, Actions ─────────────────────────────────── */}
          <div className="flex flex-1 flex-col gap-4">
            <div ref={metricsRef} className="flex flex-col gap-4 opacity-0">
              {/* Reaction time metric */}
              <div
                className="flex items-center gap-6 rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-5"
                style={{ boxShadow: "0 0 30px rgba(52,211,153,0.04)" }}
              >
                <div className="shrink-0">
                  <p
                    className="font-mono text-5xl font-black text-emerald-400 leading-none"
                    style={{ textShadow: "0 0 40px rgba(52,211,153,0.4)" }}
                  >
                    15m
                  </p>
                </div>
                <div className="flex-1 border-l border-emerald-900/40 pl-5">
                  <p className="font-mono text-[9px] uppercase tracking-widest text-emerald-500 mb-1">
                    Mean Time To Contain (MTTC)
                  </p>
                  <p className="font-sans text-sm text-slate-300">
                    L1 triage to physical isolation under 60-min SLA.
                  </p>
                </div>
              </div>

              {/* Incident timeline replay */}
              <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-5">
                <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-cyan-500">
                  Response Timeline
                </p>
                <div className="flex items-center justify-between">
                  {STEPS.map((step, i) => (
                    <React.Fragment key={i}>
                      <div className="flex flex-col items-center gap-1.5 relative group">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg border bg-slate-800 text-lg transition-colors"
                          style={{
                            borderColor: `${step.color}40`,
                            boxShadow: `0 0 15px ${step.color}15`
                          }}
                        >
                          {step.icon}
                        </div>
                        <p className="font-mono text-[9px] font-medium text-slate-300 mt-1 whitespace-nowrap">{step.label}</p>
                        <p className="font-mono text-[8px] text-slate-500">{step.time}</p>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="flex-1 mx-2 mb-6 h-px bg-gradient-to-r from-slate-700/60 to-slate-700/30" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div ref={actionsRef} className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-5 opacity-0">
              <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-amber-500">
                Mandated Architecture Updates
              </p>
              <div className="grid grid-cols-3 gap-4">
                {CHANGES.map((c, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-start gap-2 rounded-lg bg-black/20 p-3 border border-slate-800/40"
                  >
                    <span className="text-xl mb-1">{c.icon}</span>
                    <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-200">
                      {c.title}
                    </p>
                    <p className="font-mono text-[9px] text-slate-500">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Closing line ─────────────────────────────────────────────────────── */}
        <div className="mt-8 text-center border-t border-slate-800/40 pt-4 opacity-50">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-500">
            This is what a SOC team does —{" "}
            <span className="text-slate-300">every incident hardens the perimeter.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
