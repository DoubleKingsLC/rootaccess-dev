"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileWebHackingCareerPath } from "@/components/web-hacking/career-path/MobileWebHackingCareerPath";
import { ProviderFavicon } from "@/components/web-hacking/career-path/ProviderFavicon";
import { ACTIONS, LEVELS } from "@/components/web-hacking/career-path/data";
import type { ResourceItem } from "@/components/web-hacking/career-path/types";

// ── Types ──────────────────────────────────────────────────────────────────────
type LevelItem = string | ResourceItem;

// ── Sidebar ───────────────────────────────────────────────────────────────────

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

// ── SectionHeader ─────────────────────────────────────────────────────────────

function SectionHeader({
  num, label, color, subtitle,
}: {
  num: string; label: string; color: string; subtitle: string;
}) {
  return (
    <div className="mb-10">
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
  );
}

// ── ContentCard ───────────────────────────────────────────────────────────────

function ContentCard({
  title, icon, color, border, glow, items, isCerts, levelNum,
}: {
  title: string;
  icon: string;
  color: string;
  border: string;
  glow: string;
  items: LevelItem[];
  isCerts?: boolean;
  levelNum?: string;
}) {
  const renderItem = (item: LevelItem, idx: number) => {
    const isObj = typeof item === "object";
    const label = isObj ? item.label : item;
    const link = isObj ? item.link : null;
    const provider = isObj ? item.provider : null;

    const hasFavicon = provider && ["tryhackme","google","tcm","ine","comptia","ec-council","offsec","portswigger","isc2","giac","isaca","altered","hackerone","htb","bugcrowd","owasp","sans","crest","pentesteracademy"].includes(provider);

    return (
      <li key={idx} className="flex items-start gap-3 group/li">
        {hasFavicon ? (
          <div className="mt-0.5 flex-shrink-0">
            <ProviderFavicon provider={provider} size={16} />
          </div>
        ) : (
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
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
        boxShadow: `0 0 24px ${glow}`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}
      >
        <span className="text-lg" style={{ textShadow: `0 0 10px ${color}` }}>{icon}</span>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>{title}</p>
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        {isCerts && items.length > 1 ? (
          <div className="flex flex-col gap-5">
            {/* Recommended */}
            <div>
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em]" style={{ color, opacity: 0.65 }}>
                Recommended
              </p>
              <ul className="space-y-3">
                {[items[0]].map((item, idx) => renderItem(item, idx))}
              </ul>
            </div>
            {/* Alternatives / Additional */}
            <div>
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">
                {levelNum === "03" ? "Additional" : "Alternatives"}
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

// ── ToolsCard ─────────────────────────────────────────────────────────────────

function ToolsCard({ tools, color, border, glow }: { tools: string[]; color: string; border: string; glow: string }) {
  return (
    <div
      className="inline-flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,20,30,0.7)",
        border: `1px solid ${color}20`,
        boxShadow: `0 0 24px ${glow}`,
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}
      >
        <span className="text-lg" style={{ textShadow: `0 0 10px ${color}` }}>🔧</span>
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WebHackingCareerPathPage() {
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
    return <MobileWebHackingCareerPath showScrollTop={showScrollTop} />;
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
          onClick={() => router.push("/roadmaps/web-hacking")}
          className="font-mono text-[12px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(226,232,240,0.75)", background: "none", border: "none", cursor: "pointer" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Web Hacking
        </button>
        <span style={{ color: "rgba(148,163,184,0.9)", fontSize: "12px" }}>/</span>
        <span className="font-mono text-[12px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.6)" }}>
          Career Path
        </span>

        <div className="flex-1" />

        {/* Mobile level pills (shown up to lg) */}
        <div className="flex lg:hidden items-center gap-2">
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

        <p className="hidden lg:block font-mono text-sm font-black uppercase tracking-[0.4em] text-rose-400">
          Web Hacking Career Path
        </p>
      </div>

      {/* ── Hero ── */}
      <div className="px-8 lg:px-16 xl:px-20 pt-16 pb-14 flex items-center gap-12 xl:gap-20">
        {/* Left: text */}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-5" style={{ color: "rgba(244,63,94,0.55)" }}>
            The Blueprint to Exploitation
          </p>
          <h1
            className="font-mono font-black text-rose-400 mb-7 leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(42px, 5.5vw, 72px)",
              textShadow: "0 0 80px rgba(244,63,94,0.5), 0 0 160px rgba(244,63,94,0.2)",
            }}
          >
            From recon<br />to red team.
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mb-3" style={{ color: "rgba(203,213,225,0.85)" }}>
            Stop guessing. This is the ultimate, battle-tested roadmap for your web hacking career.
          </p>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "rgba(148,163,184,0.65)" }}>
            Distilled from the best offensive security resources available. We&apos;ve mapped the precise skills, tools, and certifications you need — from your first Burp Suite proxy to leading red team engagements.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {LEVELS.map((l) => (
              <a
                key={l.num}
                href={`#level-${l.num}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-200 hover:scale-105"
                style={{
                  background: `${l.color}0f`,
                  border: `1px solid ${l.color}25`,
                  color: `${l.color}cc`,
                  textDecoration: "none",
                }}
              >
                <span style={{ opacity: 0.6 }}>{l.num}</span>
                <span>{l.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: Burp-style HTTP request terminal */}
        <div className="hidden xl:flex flex-col w-[420px] flex-shrink-0">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,3,6,0.9)",
              border: "1px solid rgba(244,63,94,0.2)",
              boxShadow: "0 0 60px rgba(244,63,94,0.08), 0 24px 80px rgba(0,0,0,0.7)",
            }}
          >
            {/* Title bar tabs */}
            <div className="flex items-center gap-0" style={{ background: "rgba(244,63,94,0.05)", borderBottom: "1px solid rgba(244,63,94,0.1)" }}>
              <div className="flex gap-1.5 px-4 py-3 border-r" style={{ borderColor: "rgba(244,63,94,0.1)" }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <div className="flex">
                <div className="px-4 py-3 font-mono text-[10px]" style={{ color: "rgba(244,63,94,0.8)", borderBottom: "2px solid rgba(244,63,94,0.6)", background: "rgba(244,63,94,0.06)" }}>Repeater</div>
                <div className="px-4 py-3 font-mono text-[10px]" style={{ color: "rgba(148,163,184,0.35)" }}>Intruder</div>
                <div className="px-4 py-3 font-mono text-[10px]" style={{ color: "rgba(148,163,184,0.35)" }}>Scanner</div>
              </div>
              <div className="flex-1" />
              <span className="font-mono text-[9px] pr-4" style={{ color: "rgba(244,63,94,0.4)" }}>Burp Suite Pro</span>
            </div>

            {/* Request / Response split */}
            <div className="grid grid-cols-2 divide-x" style={{ borderColor: "rgba(244,63,94,0.08)", minHeight: "320px" }}>
              {/* Request */}
              <div className="px-4 py-4">
                <div className="font-mono text-[9px] uppercase tracking-widest mb-3" style={{ color: "rgba(244,63,94,0.45)" }}>Request</div>
                <div className="flex flex-col gap-1.5 font-mono text-[10px] leading-relaxed">
                  <div><span style={{ color: "#f43f5e" }}>POST</span><span style={{ color: "rgba(203,213,225,0.6)" }}> /api/login HTTP/1.1</span></div>
                  <div style={{ color: "rgba(148,163,184,0.45)" }}>Host: target.com</div>
                  <div style={{ color: "rgba(148,163,184,0.4)" }}>Content-Type: application/json</div>
                  <div style={{ color: "rgba(148,163,184,0.35)" }}>Cookie: session=eyJhbG...</div>
                  <div className="mt-2" style={{ color: "rgba(148,163,184,0.25)" }}>─────────────────</div>
                  <div className="mt-1">
                    <span style={{ color: "rgba(248,113,113,0.7)" }}>&#123;</span>
                    <div className="pl-3">
                      <div><span style={{ color: "rgba(244,63,94,0.8)" }}>&quot;username&quot;</span><span style={{ color: "rgba(203,213,225,0.5)" }}>: </span><span style={{ color: "rgba(74,222,128,0.75)" }}>&quot;admin&apos; OR 1=1--&quot;</span></div>
                      <div><span style={{ color: "rgba(244,63,94,0.8)" }}>&quot;password&quot;</span><span style={{ color: "rgba(203,213,225,0.5)" }}>: </span><span style={{ color: "rgba(74,222,128,0.75)" }}>&quot;anything&quot;</span></div>
                    </div>
                    <span style={{ color: "rgba(248,113,113,0.7)" }}>&#125;</span>
                  </div>
                </div>
              </div>

              {/* Response */}
              <div className="px-4 py-4">
                <div className="font-mono text-[9px] uppercase tracking-widest mb-3" style={{ color: "rgba(74,222,128,0.45)" }}>Response</div>
                <style>{`
                  @keyframes wh-blink{0%,100%{opacity:1}50%{opacity:0}}
                  @keyframes wh-fadein{from{opacity:0;transform:translateY(3px)}to{opacity:1;transform:translateY(0)}}
                  .wh-line{animation:wh-fadein 0.35s ease both}
                  .wh-line:nth-child(1){animation-delay:0.5s}.wh-line:nth-child(2){animation-delay:0.9s}
                  .wh-line:nth-child(3){animation-delay:1.3s}.wh-line:nth-child(4){animation-delay:1.8s}
                  .wh-line:nth-child(5){animation-delay:2.4s}.wh-line:nth-child(6){animation-delay:3.0s}
                  .wh-line:nth-child(7){animation-delay:3.5s}
                `}</style>
                <div className="flex flex-col gap-1.5 font-mono text-[10px] leading-relaxed">
                  <div className="wh-line"><span style={{ color: "#4ade80" }}>HTTP/1.1</span><span style={{ color: "rgba(203,213,225,0.6)" }}> 200 OK</span></div>
                  <div className="wh-line" style={{ color: "rgba(148,163,184,0.4)" }}>Content-Type: application/json</div>
                  <div className="wh-line" style={{ color: "rgba(148,163,184,0.25)" }}>─────────────────</div>
                  <div className="wh-line mt-1">
                    <span style={{ color: "rgba(74,222,128,0.6)" }}>&#123;</span>
                    <div className="pl-3">
                      <div className="wh-line"><span style={{ color: "rgba(74,222,128,0.8)" }}>&quot;status&quot;</span><span style={{ color: "rgba(203,213,225,0.5)" }}>: </span><span style={{ color: "#4ade80" }}>&quot;success&quot;</span></div>
                      <div className="wh-line"><span style={{ color: "rgba(74,222,128,0.8)" }}>&quot;token&quot;</span><span style={{ color: "rgba(203,213,225,0.5)" }}>: </span><span style={{ color: "rgba(203,213,225,0.5)" }}>&quot;eyJhbGci...&quot;</span></div>
                      <div className="wh-line"><span style={{ color: "rgba(74,222,128,0.8)" }}>&quot;role&quot;</span><span style={{ color: "rgba(203,213,225,0.5)" }}>: </span><span style={{ color: "#f43f5e" }}>&quot;administrator&quot;</span></div>
                    </div>
                    <span style={{ color: "rgba(74,222,128,0.6)" }}>&#125;</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom status bar */}
            <div className="flex items-center gap-4 px-4 py-2" style={{ background: "rgba(244,63,94,0.04)", borderTop: "1px solid rgba(244,63,94,0.08)" }}>
              <span className="font-mono text-[9px]" style={{ color: "#4ade80" }}>SQLi Auth Bypass — Confirmed</span>
              <div className="flex-1" />
              <span className="font-mono text-[9px]" style={{ color: "rgba(148,163,184,0.3)" }}>200 · 142ms · 380B</span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-px mx-8 lg:mx-16 xl:mx-20" style={{ background: "rgba(255,255,255,0.05)" }} />

      {/* ── Body: sidebar + article ── */}
      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-6 lg:px-12 xl:px-16">

          {LEVELS.map((level, i) => (
            <React.Fragment key={level.num}>
              <section id={`level-${level.num}`} className="py-16 xl:py-20">

                <div>
                  <SectionHeader
                    num={level.num}
                    label={level.label}
                    color={level.color}
                    subtitle={level.subtitle}
                  />
                </div>

                {/* Quote */}
                <p
                  className="font-sans text-lg italic leading-relaxed mb-10 pl-4"
                  style={{
                    color: "rgba(203,213,225,0.6)",
                    borderLeft: `2px solid ${level.color}40`,
                  }}
                >
                  &ldquo;{level.quote}&rdquo;
                </p>

                {/* Tools & Stack */}
                <div className="mb-6">
                  <ToolsCard
                    tools={level.tools}
                    color={level.color}
                    border={level.border}
                    glow={level.glow}
                  />
                </div>

                {/* Three content cards */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                  <ContentCard
                    title="Core Skills"
                    icon="⚡"
                    color={level.color}
                    border={level.border}
                    glow={level.glow}
                    items={level.skills}
                  />
                  <ContentCard
                    title="Certifications"
                    icon="🎯"
                    color={level.color}
                    border={level.border}
                    glow={level.glow}
                    items={level.certs}
                    isCerts
                    levelNum={level.num}
                  />
                  <ContentCard
                    title="Resources"
                    icon="🧪"
                    color={level.color}
                    border={level.border}
                    glow={level.glow}
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
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: "rgba(244,63,94,0.55)" }}>
                Begin
              </p>
              <h2
                className="text-4xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}
              >
                Next Actions
              </h2>
              <p className="font-sans text-base" style={{ color: "rgba(148,163,184,0.55)" }}>
                Every pentester started somewhere. Here&apos;s your first move.
              </p>
              <div className="mt-6 h-px" style={{ background: "linear-gradient(to right, rgba(244,63,94,0.2), transparent)" }} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              {ACTIONS.map((action) => (
                <div
                  key={action.title}
                  className="rounded-2xl overflow-hidden"
                  style={{
                    background: "rgba(15,20,30,0.7)",
                    border: `1px solid ${action.border}`,
                    boxShadow: `0 0 24px ${action.glow}`,
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
                        const isObj = typeof item === "object";
                        const label = isObj ? item.label : item;
                        const link = isObj ? item.link : null;
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

            {/* Footer CTA */}
            <div className="mt-16 flex flex-col items-start gap-4">
              <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.4)" }}>
                Web hacking isn&apos;t just a career — it&apos;s the discipline that keeps software honest.
              </p>
              <button
                onClick={() => router.push("/roadmaps/web-hacking")}
                className="inline-flex items-center gap-2 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
                style={{
                  border: "1px solid rgba(244,63,94,0.3)",
                  background: "rgba(244,63,94,0.08)",
                  color: "rgba(244,63,94,0.75)",
                  padding: "10px 20px",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,63,94,0.55)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(244,63,94,0.14)";
                  (e.currentTarget as HTMLElement).style.color = "#f43f5e";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,63,94,0.3)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(244,63,94,0.08)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(244,63,94,0.75)";
                }}
              >
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Web Hacking Experience
              </button>
            </div>
          </section>

          {/* Footer links */}
          <div className="py-10" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="flex flex-wrap gap-4">
              {LEVELS.map((l) => (
                <a
                  key={l.num}
                  href={`#level-${l.num}`}
                  className="font-mono text-[9px] uppercase tracking-widest transition-colors duration-150"
                  style={{ color: `${l.color}44`, textDecoration: "none" }}
                >
                  {l.num} {l.label}
                </a>
              ))}
            </div>
          </div>

        </main>
      </div>

      {/* ── Scroll to Top ── */}
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
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(244,63,94,0.3)";
          (e.currentTarget as HTMLElement).style.color = "#f43f5e";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
          (e.currentTarget as HTMLElement).style.color = "#f8fafc";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

    </div>
  );
}
