"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileSocCareerPath } from "@/components/soc/career-path/MobileSocCareerPath";
import { LEVELS, ACTIONS } from "@/components/soc/career-path/data";
import { ProviderFavicon } from "@/components/soc/career-path/ProviderFavicon";

// ── Components ────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col gap-1 w-[240px] xl:w-[260px] flex-shrink-0 sticky self-start overflow-y-auto px-5 py-8"
      style={{ top: "64px", maxHeight: "calc(100vh - 64px)", borderRight: "1px solid rgba(255,255,255,0.04)" }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] mb-5" style={{ color: "rgba(148,163,184,0.55)" }}>
        Levels
      </p>
      {LEVELS.map((level) => (
        <a
          key={level.num}
          href={`#level-${level.num}`}
          className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-all duration-150"
          style={{ textDecoration: "none" }}
        >
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold border mt-0.5 transition-all duration-200 group-hover:scale-110"
            style={{ borderColor: `${level.color}55`, color: level.color, background: `${level.color}12` }}
          >
            {level.num}
          </span>
          <div>
            <p
              className="font-mono text-[12px] font-semibold uppercase tracking-wider leading-tight transition-colors duration-150 group-hover:text-white"
              style={{ color: "rgba(226,232,240,0.75)" }}
            >
              {level.label}
            </p>
          </div>
        </a>
      ))}
    </aside>
  );
}

function SectionHeader({
  num, label, color, subtitle, slug,
}: {
  num: string; label: string; color: string; subtitle: string; slug: string;
}) {
  const router = useRouter();

  return (
    <div className="mb-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-4 mb-4">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.35em] px-2.5 py-1.5 rounded"
            style={{ color, background: `${color}12`, border: `1px solid ${color}28` }}
          >
            Level {num}
          </span>
        </div>
        <h2
          className="text-4xl xl:text-5xl font-bold text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}
        >
          {label}
        </h2>
        <p className="font-mono text-sm" style={{ color: `${color}aa` }}>{subtitle}</p>
        <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${color}28, transparent)` }} />
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={() => router.push(`/roadmaps/${slug}/career-path/detailed#level-${num}`)}
          className="group relative flex flex-col items-start p-5 rounded-2xl transition-all duration-300 hover:scale-[1.02] text-left lg:w-[320px]"
          style={{
            background: "rgba(15,22,35,0.4)",
            border: "1px solid rgba(255,255,255,0.05)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="flex items-center justify-between w-full mb-2">
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.35em]" style={{ color }}>
              Deep Dive
            </span>
            <div 
              className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
              style={{ background: `${color}12`, border: `1px solid ${color}28` }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color }}
              >
                <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
          <p className="text-[12px] leading-relaxed text-slate-400 group-hover:text-slate-300 transition-colors pr-4">
            Full breakdown of every certification, tool, and the &quot;why&quot; behind them.
          </p>
          <div 
            className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{ 
              boxShadow: `0 0 40px -10px ${color}30`,
              border: `1px solid ${color}40`,
              zIndex: -1
            }}
          />
        </button>
      </div>
    </div>
  );
}

function ContentCard({
  title, icon, color, items, isCerts, levelNum,
}: {
  title: string;
  icon: string;
  color: string;
  items: any[];
  isCerts?: boolean;
  levelNum?: string;
}) {
  const renderItem = (item: any, idx: number) => {
    const isObj = typeof item === "object";
    const label = isObj ? item.label : item;
    const link = isObj ? item.link : null;
    const provider = isObj ? item.provider : null;

    return (
      <li key={idx} className="flex items-start gap-3 group/li">
        {provider ? (
            <div className="mt-0.5 flex-shrink-0">
                <ProviderFavicon provider={provider} size={16} />
            </div>
        ) : (
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm flex-shrink-0" style={{ background: color }} />
        )}
        <div className="flex-1 min-w-0">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[14px] leading-relaxed text-slate-300 hover:text-white transition-all flex items-center justify-between gap-2 group/link"
            >
              <span className="relative">
                {label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-current transition-all duration-300 group-hover/link:w-full opacity-25" />
              </span>
              <svg className="w-3 h-3 opacity-0 group-hover/link:opacity-50 flex-shrink-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          ) : (
            <span className="font-sans text-[14px] leading-relaxed text-slate-300">{label}</span>
          )}
        </div>
      </li>
    );
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,20,30,0.7)",
        border: `1px solid ${color}20`,
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}
      >
        <span className="text-lg">{icon}</span>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>{title}</p>
      </div>

      <div className="px-5 py-5">
        {isCerts && items.length > 1 ? (
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em]" style={{ color, opacity: 0.65 }}>
                Recommended
              </p>
              <ul className="space-y-3">
                {[items[0]].map((item, idx) => renderItem(item, idx))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">
                {levelNum === "04" ? "Additional" : "Alternatives"}
              </p>
              <ul className="space-y-3">
                {items.slice(1).map((item, idx) => renderItem(item, idx))}
              </ul>
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item, idx) => renderItem(item, idx))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ToolsCard({ tools, color }: { tools: string[]; color: string }) {
  return (
    <div
      className="inline-flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,20,30,0.7)",
        border: `1px solid ${color}20`,
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}
      >
        <span className="text-lg">🔧</span>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>Tools &amp; Stack</p>
      </div>
      <div className="px-5 py-5">
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="font-mono text-[11px] px-3 py-1.5 rounded-full"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}28`,
                color: `${color}cc`,
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SocCareerPathPage() {
  const router = useRouter();
  const isMobile = useIsMobile(768);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.pageYOffset > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (isMobile) {
    return <MobileSocCareerPath showScrollTop={showScrollTop} />;
  }

  return (
    <div className="min-h-screen" style={{ background: "#090d14", color: "rgba(226,232,240,0.9)" }}>
      {/* ── Top nav ── */}
      <div
        className="sticky top-0 z-30 flex items-center gap-3 px-6 py-0"
        style={{
          background: "rgba(9,13,20,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          height: "64px",
        }}
      >
        <button
          onClick={() => router.push("/")}
          className="font-mono text-[12px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(226,232,240,0.85)", background: "none", border: "none", cursor: "pointer" }}
        >
          Home
        </button>
        <span style={{ color: "rgba(148,163,184,0.9)", fontSize: "12px" }}>/</span>
        <button
          onClick={() => router.push("/roadmaps/soc")}
          className="font-mono text-[12px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(226,232,240,0.75)", background: "none", border: "none", cursor: "pointer" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          SOC Roadmap
        </button>
        <span style={{ color: "rgba(148,163,184,0.9)", fontSize: "12px" }}>/</span>
        <span className="font-mono text-[12px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.6)" }}>
          Career Path
        </span>

        <div className="flex-1" />

        <div className="flex lg:hidden items-center gap-2">
          {LEVELS.map((l) => (
            <a key={l.num} href={`#level-${l.num}`} className="font-mono text-[9px] font-bold w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-150" style={{ borderColor: `${l.color}44`, color: l.color, background: `${l.color}10`, textDecoration: "none" }}>{l.num}</a>
          ))}
        </div>

        <p className="hidden lg:block font-mono text-sm font-black uppercase tracking-[0.4em] text-cyan-400">
          SOC Analyst Career Path
        </p>
      </div>

      {/* ── Hero ── */}
      <div className="px-8 lg:px-16 xl:px-20 pt-16 pb-14 flex items-center gap-12 xl:gap-20">
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-5" style={{ color: "rgba(34,211,238,0.55)" }}>
            Defend the Frontline
          </p>
          <h1
            className="font-mono font-black text-cyan-400 mb-7 leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(42px, 5.5vw, 72px)",
              textShadow: "0 0 80px rgba(34,211,238,0.5), 0 0 160px rgba(34,211,238,0.2)",
            }}
          >
            Detect.<br />Analyze.<br />Respond.
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mb-3" style={{ color: "rgba(203,213,225,0.85)" }}>
            The definitive guide to becoming a world-class Blue Team analyst.
          </p>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "rgba(148,163,184,0.65)" }}>
            From entry-level triage to mastering digital forensics and incidence response. We&apos;ve distilled the essential tools, certifications, and operational workflows required to secure an enterprise.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {LEVELS.map((l) => (
              <a
                key={l.num}
                href={`#level-${l.num}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-200 hover:scale-105"
                style={{ background: `${l.color}0f`, border: `1px solid ${l.color}25`, color: `${l.color}cc`, textDecoration: "none" }}
              >
                <span style={{ opacity: 0.6 }}>{l.num}</span>
                <span>{l.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Hero Animation - Hidden on mobile by parent flex layout + hidden xl:flex but let's be explicit */}
        <div className="hidden xl:flex flex-col w-[440px] flex-shrink-0">
          <div
            className="rounded-3xl overflow-hidden"
            style={{
              background: "rgba(5,10,15,0.95)",
              border: "1px solid rgba(34,211,238,0.2)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* SIEM Header */}
            <div className="px-6 py-4 flex items-center justify-between border-b border-cyan-500/10" style={{ background: "rgba(34,211,238,0.05)" }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                  <span className="text-cyan-400 text-[10px] font-bold">SOC</span>
                </div>
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-cyan-400/80 font-bold">Sentinel SIEM v2</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-mono text-[8px] text-emerald-400/80 tracking-tighter uppercase">Systems Normal</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] text-cyan-500/40 uppercase tracking-widest leading-none">EPS Rate</p>
                <p className="font-mono text-[10px] text-cyan-400 font-bold">4.2K</p>
              </div>
            </div>

            {/* SIEM Body */}
            <div className="p-6 space-y-5 min-h-[380px] relative overflow-hidden">
              <style>{`
                @keyframes siem-log { from { opacity: 0; transform: translateX(-10px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes siem-alert { 0% { background: rgba(34,211,238,0.05); } 50% { background: rgba(239,68,68,0.2); } 100% { background: rgba(34,211,238,0.05); } }
                .siem-log { animation: siem-log 0.4s ease forwards; opacity: 0; }
                .alert-active { animation: siem-alert 2s infinite; }
              `}</style>

              {/* Log Feed */}
              <div className="space-y-3 font-mono text-[9px]">
                <div className="siem-log text-slate-500" style={{ animationDelay: "0.1s" }}>[09:42:11] AUTH_SUCCESS: user="admin" src="10.0.4.22"</div>
                <div className="siem-log text-slate-500" style={{ animationDelay: "0.4s" }}>[09:42:12] SQL_QUERY: database="prod_kb" duration="14ms"</div>
                <div className="siem-log text-slate-500" style={{ animationDelay: "0.7s" }}>[09:42:15] FW_ALLOW: src="10.0.5.11" dst="8.8.8.8" port="53"</div>

                {/* The Incident */}
                <div className="siem-log space-y-2 pt-4" style={{ animationDelay: "1.5s" }}>
                  <div className="flex items-center gap-2">
                    <div className="h-px flex-1 bg-red-500/30"></div>
                    <span className="text-red-500 uppercase font-black tracking-[0.2em] text-[8px]">Critical Alert</span>
                    <div className="h-px flex-1 bg-red-500/30"></div>
                  </div>
                  <div className="bg-red-500/10 border border-red-500/40 p-3 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                    <div className="relative z-10">
                      <p className="text-red-400 font-bold mb-1">UNUSUAL_OUTBOUND_TRAFFIC</p>
                      <p className="text-slate-400 text-[8px] leading-tight mb-2">Host: 10.0.12.88 (HR-WKST-04)<br/>Target: 194.22.11.4 (Suspected C2)</p>
                      <div className="flex gap-2">
                        <span className="px-1.5 py-0.5 bg-red-500 text-white rounded text-[7px] font-bold uppercase transition-transform hover:scale-105 cursor-default">Isolate Host</span>
                        <span className="px-1.5 py-0.5 bg-slate-800 text-slate-400 rounded text-[7px] font-bold uppercase transition-transform hover:scale-105 cursor-default">Investigate</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="siem-log text-slate-500 pt-2" style={{ animationDelay: "2.5s" }}>[09:42:18] VPC_FLOW: rule="default-deny" action="REJECT"</div>
              </div>

              {/* Grid Background */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#22d3ee 1px, transparent 1px)", backgroundSize: "16px 16px" }}></div>
            </div>

            {/* SIEM Footer */}
            <div className="px-6 py-4 border-t border-cyan-500/10 flex items-center justify-between text-[8px] font-mono uppercase tracking-widest text-cyan-500/40">
              <span>Operational Dashboard</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"></span> Triage Mode</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px mx-8 lg:mx-16 xl:mx-20" style={{ background: "rgba(255,255,255,0.05)" }} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-6 lg:px-12 xl:px-16">
          {LEVELS.map((level, i) => (
            <React.Fragment key={level.num}>
              <section id={`level-${level.num}`} className="py-16 xl:py-20">
                 <SectionHeader
                   num={level.num}
                   label={level.label}
                   color={level.color}
                   subtitle={level.subtitle}
                   slug="soc"
                 />

                <p
                  className="font-sans text-lg italic leading-relaxed mb-10 pl-4"
                  style={{
                    color: "rgba(203,213,225,0.6)",
                    borderLeft: `2px solid ${level.color}40`,
                  }}
                >
                  &ldquo;{level.quote}&rdquo;
                </p>

                <div className="mb-6">
                  <ToolsCard
                    tools={level.tools}
                    color={level.color}
                  />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                  <ContentCard
                    title="Core Skills"
                    icon="⚡"
                    color={level.color}
                    items={level.skills}
                  />
                  <ContentCard
                    title="Certifications"
                    icon="🎯"
                    color={level.color}
                    items={level.certs}
                    isCerts
                    levelNum={level.num}
                  />
                  <ContentCard
                    title="Resources"
                    icon="🧪"
                    color={level.color}
                    items={level.labs}
                  />
                </div>
              </section>

              {i < LEVELS.length - 1 && (
                <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
              )}
            </React.Fragment>
          ))}

          {/* ── Next Actions ──────────────────────────────────────────────────── */}
          <section className="py-16 xl:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: "rgba(34,211,238,0.55)" }}>
                Begin
              </p>
              <h2
                className="text-4xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}
              >
                Next Actions
              </h2>
              <p className="font-sans text-base" style={{ color: "rgba(148,163,184,0.55)" }}>
                Start building your detection workflow today.
              </p>
              <div className="mt-6 h-px" style={{ background: "linear-gradient(to right, rgba(34,211,238,0.2), transparent)" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              {ACTIONS.map((action) => (
                <div
                  key={action.title}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(15,20,30,0.7)",
                    border: `1px solid ${action.border}`,
                  }}
                >
                  <div
                    className="flex items-center gap-3 px-5 py-4"
                    style={{ background: `${action.color}08`, borderBottom: `1px solid ${action.color}15` }}
                  >
                    <span className="text-lg">{action.icon}</span>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color: action.color }}>
                      {action.title}
                    </p>
                  </div>
                  <div className="px-5 py-5">
                    <ul className="space-y-3">
                      {action.items.map((item: any, idx: number) => {
                        const label = typeof item === "object" ? item.label : item;
                        const link = typeof item === "object" ? item.link : null;
                        return (
                          <li key={idx} className="flex items-start gap-3">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: action.color }}
                            />
                            {link ? (
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-[13px] leading-relaxed text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group/link"
                              >
                                <span>{label}</span>
                                <svg className="w-3 h-3 opacity-0 group-hover/link:opacity-50 transition-opacity flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                              </a>
                            ) : (
                              <span className="font-sans text-[13px] leading-relaxed text-slate-300">{label}</span>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col items-start gap-4">
              <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.4)" }}>
                The SOC is the heart of security operations. Your vigilance keeps the business alive.
              </p>
              <button
                onClick={() => router.push("/roadmaps/soc")}
                className="inline-flex items-center gap-2 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
                style={{
                  border: "1px solid rgba(34,211,238,0.3)",
                  background: "rgba(34,211,238,0.08)",
                  color: "rgba(34,211,238,0.75)",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to SOC Roadmap Experience
              </button>
            </div>
          </section>
        </main>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: 100,
          width: "52px",
          height: "52px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
          background: "rgba(9,13,20,0.9)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          color: "#f8fafc",
          cursor: "pointer",
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? "visible" : "hidden",
          transform: showScrollTop ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.5)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}
