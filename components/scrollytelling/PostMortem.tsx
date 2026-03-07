"use client";

import React from "react";

// ── Incident replay steps ─────────────────────────────────────────────────────
const STEPS = [
  { icon: "🔔", label: "Alert",      time: "14:22:31", color: "#fbbf24" },
  { icon: "🔍", label: "L1 Triage",  time: "14:26:00", color: "#22d3ee" },
  { icon: "🔗", label: "L2 Pattern", time: "14:30:00", color: "#22d3ee" },
  { icon: "💾", label: "L3 Forensic",time: "14:34:00", color: "#f59e0b" },
  { icon: "✅", label: "Contained",  time: "14:37:31", color: "#34d399" },
] as const;

// ── What changes after the debrief ───────────────────────────────────────────
const CHANGES = [
  { icon: "🔐", title: "MFA Enforced",    sub: "All accounts" },
  { icon: "👁",  title: "Alert Tuning",    sub: "Auth anomalies" },
  { icon: "📋", title: "Playbook v2.1",   sub: "Ransomware path" },
] as const;

// ── Boardroom attendees — top-down SVG, placed outside oval table ─────────────
// Table: ellipse cx=130 cy=115 rx=72 ry=50  (viewBox 0 0 260 205)
const ATTENDEES = [
  { cx: 130, cy: 52,  label: "CISO",     color: "#22d3ee", dur: 2.4, delay: 0    },
  { cx: 196, cy: 76,  label: "Legal",    color: "#8b5cf6", dur: 2.7, delay: 0.4  },
  { cx: 214, cy: 115, label: "L3",       color: "#f59e0b", dur: 2.2, delay: 0.7  },
  { cx: 196, cy: 154, label: "L2",       color: "#ef4444", dur: 2.6, delay: 0.5  },
  { cx: 130, cy: 168, label: "L1",       color: "#ef4444", dur: 2.3, delay: 0.9  },
  { cx: 64,  cy: 154, label: "Sys Admin",color: "#34d399", dur: 2.5, delay: 0.3  },
  { cx: 46,  cy: 115, label: "SOC Lead", color: "#22d3ee", dur: 2.8, delay: 0.6  },
] as const;

type PostMortemProps = { opacity: number };

export const PostMortem: React.FC<PostMortemProps> = ({ opacity }) => (
  <div
    className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/75 backdrop-blur-xl"
    style={{ opacity }}
    aria-hidden
  >
    {/* ── Header ──────────────────────────────────────────────────────────── */}
    <div className="mb-5 flex flex-col items-center gap-2">
      <div
        className="flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-emerald-950/30 px-5 py-2.5"
        style={{ boxShadow: "0 0 30px rgba(52,211,153,0.18)" }}
      >
        <div
          className="h-2.5 w-2.5 rounded-full bg-emerald-400"
          style={{ boxShadow: "0 0 10px rgba(52,211,153,0.9)" }}
        />
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em] text-emerald-300">
          Incident Debrief — Lessons Learned
        </p>
      </div>
      <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">
        Every incident ends here — the whole team in one room
      </p>
    </div>

    {/* ── Two-panel body ───────────────────────────────────────────────────── */}
    <div className="flex w-full max-w-5xl items-stretch gap-7 px-8">

      {/* LEFT: Boardroom SVG ────────────────────────────────────────────── */}
      <div className="flex w-[42%] flex-col gap-3">
        <div
          className="relative overflow-hidden rounded-2xl border border-slate-700/40 bg-slate-900/70"
          style={{ height: 290 }}
        >
          <svg
            viewBox="0 0 260 205"
            className="h-full w-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ── Presentation screen ── */}
            <rect x="90" y="7" width="80" height="30" rx="3"
              fill="#060d1a" stroke="#22d3ee" strokeWidth="0.9" />

            {/* Screen label */}
            <text x="130" y="15" fill="#22d3ee" fontSize="4.5"
              textAnchor="middle" fontFamily="monospace" fontWeight="600">
              INCIDENT-2024-047
            </text>

            {/* Animated trend line on screen — improving trajectory */}
            <polyline
              points="97,27 107,23 116,25 126,20 136,21 146,17 158,15"
              fill="none" stroke="#34d399" strokeWidth="1.6"
              strokeLinecap="round" strokeLinejoin="round"
            />
            {/* Dot at end of trend */}
            <circle cx="158" cy="15" r="2" fill="#34d399"
              style={{ filter: "drop-shadow(0 0 3px #34d399)" }} />

            {/* Screen stand legs */}
            <line x1="112" y1="37" x2="107" y2="53"
              stroke="#1e3a5f" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="148" y1="37" x2="153" y2="53"
              stroke="#1e3a5f" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="106" y1="53" x2="154" y2="53"
              stroke="#1e3a5f" strokeWidth="1" />

            {/* ── Oval conference table ── */}
            {/* Outer shadow/glow */}
            <ellipse cx="130" cy="115" rx="74" ry="51"
              fill="none" stroke="#1e3a5f" strokeWidth="4" opacity="0.4" />
            {/* Table surface */}
            <ellipse cx="130" cy="115" rx="72" ry="50"
              fill="#0a1628" stroke="#1e3a5f" strokeWidth="1.5" />
            {/* Inner reflection */}
            <ellipse cx="130" cy="115" rx="60" ry="40"
              fill="#060e1c" stroke="#0f2040" strokeWidth="0.6" />

            {/* "15 min" on table surface */}
            <text x="130" y="110" fill="#22d3ee" fontSize="20"
              textAnchor="middle" fontFamily="monospace" fontWeight="700"
              style={{ filter: "drop-shadow(0 0 8px rgba(34,211,238,0.5))" }}>
              15m
            </text>
            <text x="130" y="122" fill="#334155" fontSize="5"
              textAnchor="middle" fontFamily="monospace">
              ALERT → CONTAINED
            </text>

            {/* ── Attendees around table ── */}
            {ATTENDEES.map((a, i) => (
              <g key={i}>
                {/* Pulsing attention ring */}
                <circle cx={a.cx} cy={a.cy} r="8" fill="none" stroke={a.color} strokeWidth="0.6">
                  <animate attributeName="r"       values="8;15;8"     dur={`${a.dur}s`} begin={`${a.delay}s`} repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.5;0;0.5"  dur={`${a.dur}s`} begin={`${a.delay}s`} repeatCount="indefinite" />
                </circle>
                {/* Seat / person circle */}
                <circle cx={a.cx} cy={a.cy} r="10"
                  fill="#0b1a2e" stroke={a.color} strokeWidth="1.4" />
                {/* Head */}
                <circle cx={a.cx} cy={a.cy - 3} r="3.5"
                  fill={a.color} opacity="0.85" />
                {/* Shoulders */}
                <ellipse cx={a.cx} cy={a.cy + 5} rx="4.5" ry="2.5"
                  fill={a.color} opacity="0.4" />
                {/* Role label */}
                <text x={a.cx} y={a.cy + 19} fill={a.color} fontSize="4.5"
                  textAnchor="middle" fontFamily="monospace" fontWeight="600" opacity="0.9">
                  {a.label}
                </text>
              </g>
            ))}

            {/* Subtle dashed lines from CISO/Legal/SOC Lead toward screen */}
            {[ATTENDEES[0], ATTENDEES[6]].map((a, i) => (
              <line key={i}
                x1={a.cx} y1={a.cy + 10}
                x2="130" y2="53"
                stroke={a.color} strokeWidth="0.4"
                strokeDasharray="3 3" opacity="0.2"
              />
            ))}
          </svg>
        </div>

        <p className="text-center font-sans text-xs leading-relaxed text-slate-400">
          Technical and non-technical teams sit together — same incident, different perspectives.
        </p>
      </div>

      {/* RIGHT: Review content ───────────────────────────────────────────── */}
      <div className="flex flex-1 flex-col gap-4">

        {/* Incident timeline replay */}
        <div className="rounded-2xl border border-slate-700/40 bg-slate-900/60 px-5 py-4">
          <p className="mb-4 font-mono text-[9px] uppercase tracking-widest text-slate-500">
            The incident — step by step
          </p>
          <div className="flex items-center">
            {STEPS.map((step, i) => (
              <React.Fragment key={i}>
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl border bg-slate-800 text-2xl"
                    style={{
                      borderColor: `${step.color}55`,
                      boxShadow: `0 0 14px ${step.color}25`
                    }}
                  >
                    {step.icon}
                  </div>
                  <p className="font-mono text-[8px] font-semibold text-slate-300">{step.label}</p>
                  <p className="font-mono text-[7px] text-slate-600">{step.time}</p>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="mx-2 mb-7 h-px flex-1 bg-gradient-to-r from-slate-700/60 to-slate-700/30" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Key outcome metric */}
        <div
          className="flex items-center gap-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/15 px-6 py-4"
          style={{ boxShadow: "0 0 30px rgba(52,211,153,0.08)" }}
        >
          <div className="shrink-0 text-center">
            <p
              className="font-mono text-5xl font-black text-emerald-400"
              style={{ textShadow: "0 0 30px rgba(52,211,153,0.55)" }}
            >
              15m
            </p>
            <p className="mt-1 font-mono text-[8px] uppercase tracking-widest text-slate-500">
              First alert → contained
            </p>
          </div>
          <div className="flex-1 border-l border-slate-700/40 pl-6">
            <p className="font-sans text-sm leading-relaxed text-slate-300">
              No data left the network. The attack was detected, traced to its source,
              and cut off — entirely within the SOC's response window.
            </p>
          </div>
        </div>

        {/* What changes — three action cards */}
        <div>
          <p className="mb-2 font-mono text-[9px] uppercase tracking-widest text-slate-500">
            Agreed in this room — before anyone leaves
          </p>
          <div className="grid grid-cols-3 gap-3">
            {CHANGES.map((c, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 rounded-xl border border-slate-700/30 bg-slate-900/60 px-3 py-4 text-center"
              >
                <span className="text-3xl">{c.icon}</span>
                <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-slate-200">
                  {c.title}
                </p>
                <p className="font-mono text-[8px] text-slate-500">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>

    {/* ── Closing line ─────────────────────────────────────────────────────── */}
    <p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-slate-500">
      This is what a SOC team does —{" "}
      <span className="text-slate-300">every incident becomes a stronger defence.</span>
    </p>
  </div>
);
