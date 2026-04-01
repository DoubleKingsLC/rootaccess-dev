"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LEVELS } from "./data";
import { ProviderFavicon } from "./ProviderFavicon";

type MobileSocCareerPathProps = {
  showScrollTop: boolean;
};

function SectionHeader({ num, label, color, time, salary, subtitle }: {
  num: string; label: string; color: string; time: string; salary: string; subtitle: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap items-baseline gap-4 mb-4">
        <span
          className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] px-3 py-1.5 rounded"
          style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}
        >
          Level {num}
        </span>
        <span className="font-mono text-[13px] font-medium" style={{ color: "rgba(148,163,184,0.7)" }}>
          {time} • {salary}
        </span>
      </div>
      <h2
        className="text-4xl font-bold text-white mb-3 leading-tight"
        style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}
      >
        {label}
      </h2>
      <p className="font-mono text-[14px] leading-relaxed" style={{ color: `${color}dd` }}>{subtitle}</p>
      
      <Link
        href={`/roadmaps/soc/career-path/detailed#level-${num}`}
        className="mt-6 flex items-center justify-between p-4 rounded-xl border transition-all duration-300 active:scale-[0.98]"
        style={{
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          borderColor: `${color}30`,
          textDecoration: "none"
        }}
      >
        <div className="flex items-center gap-2.5">
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color }}>Deep Dive</span>
          <span className="flex h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: color }} />
        </div>
        <div className="flex items-center gap-3">
          <span className="font-mono text-[9px] uppercase tracking-wider opacity-40 shrink-0" style={{ color: "white" }}>Full breakdown</span>
          <svg className="w-4 h-4" style={{ color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </Link>

      <div className="mt-8 h-px" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />
    </div>
  );
}

export function MobileSocCareerPath({ showScrollTop }: MobileSocCareerPathProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ background: "#090d14", color: "rgba(226,232,240,0.9)" }}>
      {/* ── Sticky Header ────────────────────────────────────────────────── */}
      <div
        className="sticky top-0 z-50 flex items-center gap-3 px-6 py-3"
        style={{
          background: "rgba(9,13,20,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          height: "48px",
        }}
      >
        <Link
          href="/"
          className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(148,163,184,0.75)" }}
        >
          Home
        </Link>
        <span style={{ color: "rgba(148,163,184,0.45)", fontSize: "10px" }}>/</span>
        <Link
          href="/roadmaps/soc"
          className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(148,163,184,0.75)" }}
        >
          SOC
        </Link>
        <span style={{ color: "rgba(148,163,184,0.45)", fontSize: "10px" }}>/</span>
        <span className="font-mono text-[10px] uppercase tracking-widest font-semibold" style={{ color: "rgba(148,163,184,0.6)" }}>
          Path
        </span>
        <div className="flex-1" />
        <div className="flex items-center gap-2">
          {LEVELS.map((l) => (
            <a
              key={l.num}
              href={`#level-${l.num}`}
              className="font-mono text-[9px] font-bold w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-150"
              style={{ borderColor: `${l.color}44`, color: l.color, background: `${l.color}10`, textDecoration: "none" }}
            >
              {l.num}
            </a>
          ))}
        </div>
      </div>

      {/* ── Hero section ────────────────────────────────────────────────── */}
      <div className="px-6 pt-16 pb-14 border-b border-white/5">
        <p className="font-mono text-[11px] uppercase tracking-[0.5em] mb-6 font-bold" style={{ color: "rgba(34,211,238,0.7)" }}>
          Defensive Operations
        </p>
        <h1
          className="text-5xl font-bold text-white mb-8 leading-[0.95] tracking-tight"
          style={{ fontFamily: "var(--font-heading, system-ui)" }}
        >
          SOC Analyst:<br />
          <span style={{ color: "rgba(34,211,238,0.95)" }}>The Career Path</span>
        </h1>
        <p className="text-lg leading-relaxed max-w-xl" style={{ color: "rgba(226,232,240,0.8)" }}>
          Protecting the enterprise requires more than just tools. It requires a mindset of vigilance, correlation, and rapid response. This roadmap tracks your journey from entry-level triage to SOC operational command.
        </p>
        
        <div className="mt-10 flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <a
              key={l.num}
              href={`#level-${l.num}`}
              className="flex items-center gap-3 px-4 py-2 rounded-full font-mono text-[11px] font-bold uppercase tracking-widest transition-all duration-300"
              style={{
                background: `${l.color}10`,
                border: `1px solid ${l.color}25`,
                color: `${l.color}`,
                textDecoration: "none",
              }}
            >
              <span style={{ opacity: 0.6 }}>{l.num}</span>
              <span>{l.label}</span>
            </a>
          ))}
        </div>
      </div>

      <main className="px-6">
        {LEVELS.map((level) => (
          <section key={level.num} id={`level-${level.num}`} className="py-20 border-b border-white/5 last:border-0">
            <SectionHeader
              num={level.num}
              label={level.label}
              color={level.color}
              time={level.time}
              salary={level.salary}
              subtitle={level.subtitle}
            />

            <div className="space-y-6 text-lg leading-relaxed mb-12" style={{ color: "rgba(203,213,225,0.75)" }}>
              <div className="relative pl-6 border-l-2" style={{ borderColor: `${level.color}40` }}>
                <p className="italic text-slate-300">
                  &ldquo;{level.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="mb-14">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: `${level.color}aa` }}>
                Certifications
              </p>
              <div className="space-y-4">
                {level.certs.map((cert, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl p-5 border border-white/5"
                    style={{ background: "rgba(255,255,255,0.02)" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <ProviderFavicon provider={cert.provider || null} />
                        <h4 className="font-mono text-[15px] font-bold text-white">{cert.label}</h4>
                      </div>
                    </div>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest mt-2 hover:text-white transition-colors"
                        style={{ color: `${level.color}cc`, textDecoration: "underline" }}
                      >
                        Official Page
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Tools */}
            <div className="mb-14">
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: `${level.color}aa` }}>
                Skills & Monitoring Focus
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div className="rounded-2xl p-6 border border-white/5 bg-white/[0.01]">
                  <ul className="space-y-4">
                    {level.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: level.color }} />
                        <span className="text-[15px] leading-relaxed text-slate-300">{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="w-full font-mono text-[10px] uppercase tracking-widest mb-1 opacity-50">Tools of Trace:</span>
                {level.tools.map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1 rounded-full text-[11px] font-mono font-medium border border-white/5 bg-white/[0.03] text-slate-400"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: `${level.color}aa` }}>
                Labs & Analyst Training
              </p>
              <div className="grid grid-cols-1 gap-3">
                {level.labs.map((lab, idx) => (
                  <a
                    key={idx}
                    href={lab.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <ProviderFavicon provider={lab.provider || null} />
                      <span className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{lab.label}</span>
                    </div>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="opacity-20 group-hover:opacity-100 transition-opacity">
                      <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

          </section>
        ))}
      </main>

      {/* ── Footer ────────────────────────────────────────────────────────── */}
      <footer className="py-20 px-6 text-center border-t border-white/5">
         <button
          onClick={() => router.push("/roadmaps/soc")}
          className="w-full max-w-xs py-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all flex items-center justify-center gap-2 mx-auto"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Roadmap
        </button>
      </footer>

      {/* ── Scroll to Top ────────────────────────────────────────────────── */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-8 right-6 z-[100] w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 shadow-2xl border border-white/10 text-white transition-all duration-500 ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

    </div>
  );
}
