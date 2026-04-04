"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { NarrativeCaption } from "./NarrativeCaption";

type ReportSceneProps = {
  progress: number; // global 0–1
};

// ── Scene window: 0.937–1.000 ─────────────────────────────────────────────────
// Fade in  0.937–0.952
// Full     0.952–1.000
const sceneOpacity = (p: number): number => {
  if (p < 0.937) return 0;
  if (p < 0.952) return (p - 0.937) / 0.015;
  return 1;
};

// Local 0–1 across 0.937–1.000
const local = (p: number): number =>
  Math.max(0, Math.min(1, (p - 0.937) / 0.063));

// Career card opacity — pushed to the very end (0.985–1.000)
const careerOpacity = (p: number): number => {
  if (p < 0.985) return 0;
  if (p < 0.995) return (p - 0.985) / 0.010;
  return 1;
};

// ── Finding card reveal (local 0.08–0.35, ~0.06 each) — faster cascade ───────
const cardVisible = (lp: number, idx: number): boolean =>
  lp >= 0.08 + idx * 0.06;

// ── Impact chips (local 0.35–0.50) ───────────────────────────────────────────
const chipVisible = (lp: number, idx: number): boolean =>
  lp >= 0.35 + idx * 0.03;

// ── CVSS dial fill (local 0.50–0.70) ─────────────────────────────────────────
const dialFill = (lp: number): number => {
  if (lp < 0.50) return 0;
  return Math.min((lp - 0.50) / 0.18, 1);
};

// Caption local 0.60–0.90
const captionOpacity = (p: number): number => {
  if (p < 0.960) return 0;
  if (p < 0.970) return (p - 0.960) / 0.010;
  if (p <= 0.990) return 1;
  return 0;
};

const ROSE = "#f43f5e";

const FINDINGS = [
  {
    id: "F-01",
    severity: "CRITICAL",
    cvss: "9.8",
    title: "SQL Injection — Login Password Field",
  },
  {
    id: "F-02",
    severity: "CRITICAL",
    cvss: "9.1",
    title: "Unauthenticated Mass Data Endpoint",
  },
  {
    id: "F-03",
    severity: "HIGH",
    cvss: "7.5",
    title: "Admin Portal Publicly Accessible",
  },
  {
    id: "F-04",
    severity: "HIGH",
    cvss: "7.2",
    title: "No MFA · No Lockout on Admin Login",
  },
];

const IMPACT_CHIPS = [
  { label: "14.2M records at risk",          color: ROSE },
  { label: "£2.4B transaction data exposed", color: ROSE },
  { label: "Zero detection — no IDS alerts", color: "rgba(251,191,36,0.9)" },
];

// SVG arc helper — draws a filled arc from 0° to `fraction` of a full circle
const describeArc = (cx: number, cy: number, r: number, fraction: number): string => {
  if (fraction <= 0) return "";
  if (fraction >= 1) fraction = 0.9999;
  const startAngle = -90; // start at top
  const endAngle   = startAngle + fraction * 360;
  const rad = (deg: number) => (deg * Math.PI) / 180;
  const x1 = cx + r * Math.cos(rad(startAngle));
  const y1 = cy + r * Math.sin(rad(startAngle));
  const x2 = cx + r * Math.cos(rad(endAngle));
  const y2 = cy + r * Math.sin(rad(endAngle));
  const largeArc = fraction > 0.5 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
};

export const ReportScene: React.FC<ReportSceneProps> = ({ progress }) => {
  const op     = sceneOpacity(progress);
  if (op === 0) return null;

  const lp         = local(progress);
  const careerOp   = careerOpacity(progress);
  const dial       = dialFill(lp);
  const router     = useRouter();

  return (
    <>
      {/* ── Main report content ──────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6"
        style={{ opacity: op * (1 - careerOp), zIndex: 15 }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.05) 0%, transparent 60%)" }}
        />

        {/* Top label */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.35em]"
          style={{
            color: "rgba(226,232,240,0.65)",
            opacity: lp > 0.5 ? 1 : 0, // Appears after summary
            transition: "opacity 0.3s",
          }}
        >
          Penetration test report · NexusPay
        </div>

        {/* ── Content ───────────────────────────────────────────────────────── */}
        <div className="flex items-start gap-5" style={{ width: "clamp(660px, 82vw, 920px)" }}>

          {/* ── Left: findings list ─────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col gap-2.5 min-w-0">
            {/* Report header */}
            <div
              className="flex items-center justify-between rounded-xl px-4 py-3"
              style={{
                background: "rgba(8,12,24,0.97)",
                border: "1px solid rgba(244,63,94,0.22)",
                opacity: lp > 0.05 ? 1 : 0,
                transform: `translateY(${lp > 0.05 ? 0 : 12}px)`,
                transition: "opacity 0.4s, transform 0.4s",
              }}
            >
              <div>
                <p className="font-mono text-[11px] font-bold text-white">
                  NexusPay Security Assessment
                </p>
                <p className="font-mono text-[9px]" style={{ color: "rgba(148,163,184,0.45)" }}>
                  Engagement date: 2025-03-21 · rootaccess pentest
                </p>
              </div>
              <div
                className="flex items-center gap-1.5 rounded-md px-2.5 py-1"
                style={{ background: "rgba(244,63,94,0.12)", border: "1px solid rgba(244,63,94,0.35)" }}
              >
                <div
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: ROSE, boxShadow: `0 0 5px ${ROSE}`, animation: "pulse 1s infinite" }}
                />
                <span className="font-mono text-[8px] font-bold uppercase tracking-widest" style={{ color: ROSE }}>
                  Critical · 4 findings
                </span>
              </div>
            </div>

            {/* Finding cards */}
            {FINDINGS.map((f, i) => (
              <div
                key={f.id}
                className="flex items-center gap-3 rounded-xl px-4 py-3"
                style={{
                  background: "rgba(8,12,24,0.96)",
                  border: f.severity === "CRITICAL"
                    ? "1px solid rgba(244,63,94,0.22)"
                    : "1px solid rgba(251,113,133,0.14)",
                  opacity: cardVisible(lp, i) ? 1 : 0,
                  transform: `translateY(${cardVisible(lp, i) ? 0 : 14}px)`,
                  transition: "opacity 0.35s, transform 0.35s",
                }}
              >
                {/* Severity badge */}
                <span
                  className="shrink-0 rounded px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider"
                  style={{
                    background: f.severity === "CRITICAL" ? "rgba(244,63,94,0.14)" : "rgba(251,113,133,0.10)",
                    border: f.severity === "CRITICAL" ? "1px solid rgba(244,63,94,0.35)" : "1px solid rgba(251,113,133,0.25)",
                    color: f.severity === "CRITICAL" ? ROSE : "#f87171",
                  }}
                >
                  {f.severity}
                </span>
                {/* CVSS */}
                <span className="font-mono text-[10px] font-bold tabular-nums" style={{ color: "rgba(148,163,184,0.5)" }}>
                  CVSS {f.cvss}
                </span>
                {/* Title — large and readable */}
                <p className="font-mono text-[13px] font-bold" style={{ color: "rgba(226,232,240,0.9)" }}>
                  {f.title}
                </p>
              </div>
            ))}
          </div>

          {/* ── Right: impact + CVSS dial ───────────────────────────────────── */}
          <div className="flex shrink-0 flex-col items-center gap-3" style={{ width: 180 }}>
            {/* Impact chips */}
            <div className="flex w-full flex-col gap-2">
              {IMPACT_CHIPS.map((chip, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg px-3 py-2"
                  style={{
                    background: "rgba(8,12,24,0.97)",
                    border: "1px solid rgba(244,63,94,0.14)",
                    opacity: chipVisible(lp, i) ? 1 : 0,
                    transform: `translateX(${chipVisible(lp, i) ? 0 : 16}px)`,
                    transition: "opacity 0.35s, transform 0.35s",
                  }}
                >
                  <div className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: chip.color }} />
                  <span className="font-mono text-[8.5px] leading-tight" style={{ color: chip.color }}>
                    {chip.label}
                  </span>
                </div>
              ))}
            </div>

            {/* CVSS dial */}
            {dial > 0 && (
              <div
                className="flex flex-col items-center gap-1 rounded-xl px-4 py-4 w-full"
                style={{
                  background: "rgba(8,12,24,0.97)",
                  border: "1px solid rgba(244,63,94,0.18)",
                  opacity: dial > 0 ? Math.min(dial / 0.15, 1) : 0,
                }}
              >
                <span className="font-mono text-[8px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.4)" }}>
                  CVSS Score
                </span>
                {/* Dial SVG — square, score centred inside the ring */}
                <svg width="120" height="120" viewBox="0 0 120 120">
                  {/* Track — 92% of full circle, leaving a small gap at the bottom */}
                  <path
                    d={describeArc(60, 60, 46, 0.92)}
                    fill="none"
                    stroke="rgba(255,255,255,0.06)"
                    strokeWidth="7"
                    strokeLinecap="round"
                  />
                  {/* Fill — 9.8 / 10 × 92% ≈ 90% at full dial */}
                  <path
                    d={describeArc(60, 60, 46, dial * 0.92 * 0.98)}
                    fill="none"
                    stroke={ROSE}
                    strokeWidth="7"
                    strokeLinecap="round"
                    style={{ filter: "drop-shadow(0 0 5px rgba(244,63,94,0.55))" }}
                  />
                  {/* Score centred in ring */}
                  <text
                    x="60" y="65"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="26"
                    fontWeight="900"
                    fill={ROSE}
                    style={{ filter: "drop-shadow(0 0 12px rgba(244,63,94,0.4))" }}
                  >
                    9.8
                  </text>
                  <text
                    x="60" y="80"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontSize="8"
                    fontWeight="700"
                    fill="rgba(244,63,94,0.5)"
                    letterSpacing="2"
                  >
                    CRITICAL
                  </text>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Career path card (95–100%) ───────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6 transition-all duration-700"
        style={{ 
          opacity: careerOp, 
          transform: `scale(${0.9 + careerOp * 0.1}) translateY(${20 - careerOp * 20}px)`,
          filter: `blur(${(1 - careerOp) * 20}px)`
        }}
      >
        <div
          className={`w-[min(580px,94vw)] rounded-3xl border border-rose-500/30 bg-black/80 px-6 py-8 md:px-10 md:py-12 backdrop-blur-3xl shadow-[0_0_80px_rgba(244,63,94,0.15)] text-center relative overflow-hidden transition-all duration-300 ${
            careerOp > 0.1 ? "pointer-events-auto" : "pointer-events-none"
          }`}
          role="banner"
        >
          {/* Subtle rose holographic scanline */}
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(244,63,94,0.05)_1px,transparent_1px)] bg-[size:100%_4px] opacity-30" />
          
          {/* Core Glow Background */}
          <div className="absolute -inset-24 bg-rose-500/5 blur-[120px] rounded-full pointer-events-none" />

          {/* Breach Status Badge */}
          <div className="mb-6 md:mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-rose-400/40 bg-rose-950/60 px-4 py-1.5 shadow-[0_0_20px_rgba(244,63,94,0.4)]">
              <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse shadow-[0_0_8px_rgba(244,63,94,1)]" />
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.25em] text-rose-100">
                BREACH STATUS: 100% EXFILTRATED
              </span>
            </div>
          </div>

          <h2 className="mb-5 font-sans text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none"
              style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}>
            MISSION <span className="text-rose-500">ACCOMPLISHED</span>
          </h2>

          <p className="mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-slate-300 font-medium px-2 md:px-6">
            Behind every line of code is a vulnerability. 
            You&apos;ve seen the exploit — now master the defense. 
            Explore the professional path from Researcher to Lead security Architect.
          </p>

          <div className="flex flex-col items-center gap-6">
              <button
                type="button"
                onClick={() => router.push("/roadmaps/web-hacking/career-path")}
                className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-rose-500/50 bg-rose-500/10 px-8 py-5 font-mono text-sm font-black uppercase tracking-[0.3em] text-rose-400 transition-all hover:border-rose-400 hover:bg-rose-500/20 hover:text-white hover:shadow-[0_0_40px_rgba(244,63,94,0.3)]"
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  GO THROUGH THE ROADMAP
                  <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
              </button>
              
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-rose-900/60 font-bold">
                [ SECURE CONNECTION ESTABLISHED ]
              </p>
          </div>
        </div>
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <NarrativeCaption opacity={captionOpacity(progress)}>
        Every finding was present before the attacker arrived. The question was never if — it was when.
      </NarrativeCaption>
    </>
  );
};
