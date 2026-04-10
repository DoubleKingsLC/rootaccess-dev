"use client";

import React from "react";
import { S3_GREEN, CF_C, BLUE, AMBER, S3_RED, ramp, CloudKeyframes } from "./cloudShared";

const IN = 0.93, OUT = 1.00;

const sceneOp = (p: number) => {
  if (p < IN)          return 0;
  if (p < IN + 0.012)  return (p - IN) / 0.012;
  return 1;
};

const LESSONS = [
  {
    num: "01",
    icon: "🔒",
    title: "Block Public Access at Account Level",
    body: "One toggle protects every bucket you'll ever create. If it's off, one misconfigured bucket is all an attacker needs.",
    color: S3_GREEN,
  },
  {
    num: "02",
    icon: "🛡️",
    title: "App-Only Bucket Access",
    body: "Your web application is the only valid path to S3. Use bucket policies to deny any request that doesn't come from your app role.",
    color: CF_C,
  },
  {
    num: "03",
    icon: "⚙️",
    title: "Automate Compliance Checks",
    body: "AWS Config rules scan your environment continuously — catching a public bucket before an attacker does, 24 hours a day.",
    color: AMBER,
  },
  {
    num: "04",
    icon: "📋",
    title: "Log Everything with CloudTrail",
    body: "Every GetObject, every assume-role, every config change — logged forever. In any incident, CloudTrail tells you the whole story.",
    color: BLUE,
  },
  {
    num: "05",
    icon: "🚨",
    title: "Alert and Respond in Minutes",
    body: "GuardDuty + SNS means you know about anomalous access before the attacker finishes. Minutes, not days.",
    color: S3_RED,
  },
] as const;

// ── Sub-scene 1: Incident Debrief ──────────────────────────────────────────────
function IncidentDebrief({ op }: { op: number }) {
  if (op < 0.01) return null;
  return (
    <div className="absolute inset-0 flex items-center justify-center px-8"
      style={{ opacity: op }}>

      <div className="flex items-start gap-8 w-full max-w-5xl">

        {/* ── Left: Incident report card ── */}
        <div className="flex-shrink-0 relative font-mono"
          style={{
            width: 280,
            background: "rgba(7,9,15,0.98)",
            border: "1px solid rgba(71,85,105,0.45)",
            borderTop: `3px solid ${S3_RED}`,
            borderRadius: 6,
            padding: "24px 22px",
            boxShadow: `0 24px 64px rgba(0,0,0,0.7), 0 0 40px rgba(239,68,68,0.07)`,
          }}>

          {/* Traffic light dots */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ef4444" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#f59e0b" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#22c55e" }} />
          </div>

          <div className="text-[9px] tracking-widest uppercase mb-1" style={{ color: "#475569" }}>
            Security Incident Report
          </div>
          <div className="font-bold text-sm mb-1" style={{ color: "#f1f5f9" }}>
            prod-company-assets
          </div>
          <div className="text-[10px] mb-5" style={{ color: "#475569" }}>
            AWS S3 Bucket · us-east-1
          </div>

          <div className="mb-4" style={{ borderTop: "1px solid rgba(51,65,85,0.5)" }} />

          <div className="space-y-2.5 text-[10px] mb-5">
            {[
              { label: "Violation",   value: "Public Access Enabled", color: S3_RED   },
              { label: "Accounts",    value: "2.1M exposed",          color: "#f97316" },
              { label: "Records",     value: "47,000 customer files",  color: "#f97316" },
              { label: "Undetected",  value: "14 months",             color: S3_RED   },
              { label: "Detection",   value: "AWS Config (auto)",      color: AMBER     },
            ].map(row => (
              <div key={row.label} className="flex justify-between items-center gap-2">
                <span style={{ color: "#64748b" }}>{row.label}</span>
                <span className="font-bold text-right" style={{ color: row.color }}>{row.value}</span>
              </div>
            ))}
          </div>

          <div className="pt-3" style={{ borderTop: "1px solid rgba(51,65,85,0.5)" }}>
            <div className="text-[9px] mb-1" style={{ color: "#475569" }}>Root Cause</div>
            <div className="font-bold text-xs flex items-center gap-2" style={{ color: S3_RED }}>
              <span className="w-2 h-2 rounded-full flex-shrink-0"
                style={{ background: S3_RED, boxShadow: `0 0 8px ${S3_RED}`, animation: "cs-pulse 1.5s ease-in-out infinite" }} />
              Misconfiguration
            </div>
          </div>

          {/* Remediated stamp */}
          <div className="absolute" style={{ top: -12, right: -14, transform: "rotate(-12deg)" }}>
            <div className="font-bold text-[9px] px-2.5 py-1 font-mono tracking-widest"
              style={{
                border: `2px solid ${S3_GREEN}`,
                color: S3_GREEN,
                background: "rgba(7,9,15,0.95)",
                borderRadius: 3,
                boxShadow: `0 0 16px rgba(34,197,94,0.4)`,
              }}>
              REMEDIATED ✓
            </div>
          </div>
        </div>

        {/* ── Right: Lessons ── */}
        <div className="flex-1 flex flex-col gap-3">
          <div className="mb-1">
            <p className="font-mono text-[9px] uppercase tracking-[0.5em] mb-2" style={{ color: "rgba(148,163,184,0.4)" }}>
              What this breach teaches us
            </p>
            <h2 className="font-sans text-2xl font-bold tracking-tight" style={{ color: "rgba(255,255,255,0.95)" }}>
              Five rules every cloud practitioner must know
            </h2>
            <div className="h-px w-16 mt-3" style={{ background: `linear-gradient(to right, ${S3_GREEN}, transparent)` }} />
          </div>

          {LESSONS.map((lesson) => (
            <div key={lesson.num} className="flex gap-3 items-start py-2.5 px-3 rounded-lg"
              style={{
                background: `${lesson.color}06`,
                border: `1px solid ${lesson.color}20`,
              }}>
              <div className="flex-shrink-0 flex flex-col items-center gap-0.5 pt-0.5">
                <span style={{ fontSize: 16, lineHeight: 1 }}>{lesson.icon}</span>
                <span className="font-mono text-[8px]" style={{ color: `${lesson.color}50` }}>{lesson.num}</span>
              </div>
              <div>
                <div className="font-mono text-[10px] font-bold uppercase tracking-wider mb-1"
                  style={{ color: lesson.color }}>{lesson.title}</div>
                <div className="font-sans text-[11px] leading-relaxed"
                  style={{ color: "rgba(148,163,184,0.78)" }}>{lesson.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Sub-scene 2: Career Path CTA ──────────────────────────────────────────────
function CareerPathCTA({ op }: { op: number }) {
  if (op < 0.01) return null;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 gap-6"
      style={{ opacity: op }}>

      {/* Heading block */}
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="font-mono text-[9px] uppercase tracking-[0.55em]"
          style={{ color: "rgba(148,163,184,0.4)" }}>
          Your next step
        </div>
        <h2 className="font-sans font-bold tracking-tight leading-tight"
          style={{ fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "rgba(255,255,255,0.95)" }}>
          Want to{" "}
          <span style={{ color: S3_GREEN }}>secure cloud environments</span>
          <br />for a living?
        </h2>
        <p className="font-sans text-sm max-w-lg leading-relaxed"
          style={{ color: "rgba(148,163,184,0.6)" }}>
          This scenario is real. Companies need people who understand how cloud misconfigurations happen —
          and how to prevent them before they become headlines.
        </p>
        <div className="h-px w-32" style={{ background: `linear-gradient(to right, transparent, ${S3_GREEN}60, transparent)` }} />
      </div>

      {/* Featured card */}
      <a href="/roadmaps/cloud-security/career-path"
        className="group block w-full max-w-lg no-underline"
        style={{ textDecoration: "none" }}>
        <div className="relative rounded-lg overflow-hidden transition-all duration-300"
          style={{
            background: "rgba(7,9,15,0.97)",
            border: `1px solid rgba(34,197,94,0.35)`,
            borderTop: `3px solid ${S3_GREEN}`,
            padding: "26px 28px",
            boxShadow: `0 0 48px rgba(34,197,94,0.12), 0 24px 64px rgba(0,0,0,0.6)`,
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 72px rgba(34,197,94,0.25), 0 24px 64px rgba(0,0,0,0.6)`;
            (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(34,197,94,0.65)`;
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 48px rgba(34,197,94,0.12), 0 24px 64px rgba(0,0,0,0.6)`;
            (e.currentTarget as HTMLDivElement).style.borderColor = `rgba(34,197,94,0.35)`;
          }}>

          {/* Glow pulse ring */}
          <div className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              border: `1px solid ${S3_GREEN}`,
              opacity: 0.08,
              animation: "cs-pulse 3s ease-in-out infinite",
            }} />

          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="font-mono text-[9px] uppercase tracking-widest mb-2"
                style={{ color: `${S3_GREEN}70` }}>
                Career Roadmap
              </div>
              <div className="font-sans text-xl font-bold mb-1" style={{ color: "#ffffff" }}>
                Cloud Security Engineer
              </div>
              <div className="font-sans text-xs leading-relaxed mb-4"
                style={{ color: "rgba(148,163,184,0.65)", maxWidth: 320 }}>
                From IAM privilege escalation to incident response — the complete path to
                securing AWS, Azure and GCP environments professionally.
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {["AWS Security", "IAM & Policies", "CloudTrail", "GuardDuty", "Threat Detection"].map(tag => (
                  <span key={tag} className="font-mono text-[8px] px-2 py-0.5 rounded"
                    style={{ background: `${S3_GREEN}10`, border: `1px solid ${S3_GREEN}25`, color: `${S3_GREEN}90` }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-2 font-mono text-xs font-bold"
                style={{ color: S3_GREEN }}>
                Explore the roadmap
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>

            {/* Right: shield icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-xl flex items-center justify-center"
              style={{ background: `${S3_GREEN}10`, border: `1px solid ${S3_GREEN}20` }}>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <path d="M16 2 L28 7 L28 16 C28 23 22 29 16 31 C10 29 4 23 4 16 L4 7 Z"
                  fill={`${S3_GREEN}18`} stroke={S3_GREEN} strokeWidth="1.5" />
                <path d="M11 16 L14.5 19.5 L21 13"
                  stroke={S3_GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </a>

      {/* Secondary cards row */}
      <div className="flex gap-3 w-full max-w-lg">
        {[
          { title: "Cloud Penetration Tester", sub: "Find misconfigs before attackers do", color: S3_RED,   href: "/roadmaps/cloud-security/career-path" },
          { title: "DevSecOps Engineer",        sub: "Shift security left in CI/CD",       color: CF_C, href: "/roadmaps/cloud-security/career-path" },
        ].map(card => (
          <a key={card.title} href={card.href}
            className="flex-1 block no-underline rounded-lg p-4 transition-all duration-300"
            style={{
              background: `${card.color}06`,
              border: `1px solid ${card.color}25`,
              textDecoration: "none",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${card.color}12`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = `${card.color}06`; }}>
            <div className="font-mono text-[10px] font-bold uppercase tracking-wider mb-1"
              style={{ color: card.color }}>{card.title}</div>
            <div className="font-sans text-[10px] leading-relaxed"
              style={{ color: "rgba(148,163,184,0.6)" }}>{card.sub}</div>
            <div className="font-mono text-[9px] mt-2" style={{ color: `${card.color}70` }}>→ Explore</div>
          </a>
        ))}
      </div>

      <div className="font-mono text-[8px] uppercase tracking-[0.5em]"
        style={{ color: "rgba(148,163,184,0.2)" }}>
        SCENE 07 · END
      </div>
    </div>
  );
}

// ── Main scene ─────────────────────────────────────────────────────────────────
export const LessonsScene: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = sceneOp(progress);
  if (opacity === 0) return null;

  const lp = ramp(progress, IN, OUT - IN);

  // Sub-scene 1: incident debrief — fades in, then out
  const debriefIn  = ramp(lp, 0.00, 0.12);
  const debriefOut = ramp(lp, 0.50, 0.10);
  const debriefOp  = debriefIn * (1 - debriefOut);

  // Sub-scene 2: CTA — fades in after debrief, stays
  const ctaOp = ramp(lp, 0.55, 0.14);

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <CloudKeyframes />
      <IncidentDebrief op={debriefOp} />
      <CareerPathCTA   op={ctaOp} />
    </div>
  );
};
