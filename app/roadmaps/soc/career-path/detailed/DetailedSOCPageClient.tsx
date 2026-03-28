"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const LEVELS = [
  { num: "00", label: "Entry Point",         color: "#94a3b8", time: "0-6 months",  salary: "£25K-£35K" },
  { num: "01", label: "L1 Triage",           color: "#3b82f6", time: "0-2 years",   salary: "£35K-£50K" },
  { num: "02", label: "L2 Advanced",         color: "#8b5cf6", time: "2-5 years",   salary: "£50K-£75K" },
  { num: "03", label: "L3 Forensic",         color: "#ec4899", time: "5-8 years",   salary: "£75K-£100K" },
  { num: "04", label: "SOC Lead",            color: "#f59e0b", time: "8+ years",    salary: "£100K-£140K+" },
] as const;

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col gap-1 w-[240px] xl:w-[260px] flex-shrink-0 sticky self-start overflow-y-auto px-5 py-8"
      style={{ top: "48px", maxHeight: "calc(100vh - 48px)", borderRight: "1px solid rgba(255,255,255,0.04)" }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.4em] mb-6 font-bold" style={{ color: "rgba(148,163,184,0.8)" }}>
        Levels
      </p>
      {LEVELS.map((l) => (
        <a
          key={l.num}
          href={`#level-${l.num}`}
          className="group flex items-start gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 hover:bg-white/[0.03]"
          style={{ textDecoration: "none" }}
        >
          <span
            className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono text-[12px] font-bold border mt-0.5 transition-all duration-300 group-hover:scale-110"
            style={{ borderColor: `${l.color}88`, color: l.color, background: `${l.color}1a` }}
          >
            {l.num}
          </span>
          <div>
            <p
              className="font-mono text-[13px] font-bold uppercase tracking-widest leading-tight transition-colors duration-200 group-hover:text-white"
              style={{ color: "rgba(226,232,240,0.95)" }}
            >
              {l.label}
            </p>
            <p className="font-mono text-[11px] mt-1 font-medium" style={{ color: "rgba(148,163,184,0.7)" }}>
              {l.time}
            </p>
          </div>
        </a>
      ))}

      <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <Link
          href="/roadmaps/soc/career-path"
          className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(59,130,246,0.85)", textDecoration: "underline" }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Career Path
        </Link>
      </div>
    </aside>
  );
}

// ── Components ────────────────────────────────────────────────────────────────

interface CertCardProps {
  name: string;
  provider: string;
  href: string;
  difficulty: string;
  duration: string;
  cost: string;
  accentColor: string;
  what: string;
  why: string;
  isTop?: boolean;
}

function CertCard({ name, provider, href, difficulty, duration, cost, accentColor, what, why, isTop }: CertCardProps) {
  let domain = "example.com";
  try {
    domain = new URL(href).hostname;
  } catch (e) {
    // Ignore error
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,20,30,0.7)",
        border: `1px solid ${accentColor}35`,
      }}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-5"
        style={{
          background: `${accentColor}10`,
          borderBottom: `1px solid ${accentColor}25`,
        }}
      >
        <div className="flex-1 min-w-0">
          {isTop && (
            <span
              className="inline-block font-mono text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 rounded mb-3 font-semibold"
              style={{ background: `${accentColor}28`, color: accentColor, border: `1px solid ${accentColor}55` }}
            >
              ★ Recommended
            </span>
          )}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
              alt=""
              width={28}
              height={28}
              className="rounded flex-shrink-0"
              style={{ objectFit: "contain" }}
            />
            <h4 className="font-mono text-lg font-bold text-white leading-tight">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium" style={{ color: `${accentColor}cc` }}>{provider}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono flex-shrink-0 sm:text-right">
          {[difficulty, duration, cost].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full whitespace-nowrap font-medium"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(203,213,225,0.85)", border: "1px solid rgba(148,163,184,0.2)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:divide-x" style={{ borderColor: `${accentColor}18` }}>
        <div className="px-6 py-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>
            What it teaches
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: "rgba(226,232,240,0.88)" }}>{what}</p>
        </div>
        <div className="px-6 py-6" style={{ borderLeft: `1px solid ${accentColor}18` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>
            Why at this level
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: "rgba(226,232,240,0.88)" }}>{why}</p>
        </div>
      </div>

      <div className="px-6 pb-5">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-150 hover:opacity-100"
          style={{ color: `${accentColor}cc`, textDecoration: "underline" }}
        >
          Official page
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

interface SkillResource {
  label: string;
  url: string;
}

interface SkillCardProps {
  name: string;
  category: string;
  correlatedTools: string[];
  accentColor: string;
  what: string;
  why: string;
  resources: {
    free: SkillResource[];
    paid: SkillResource[];
  };
}

function SkillCard({ name, category, correlatedTools, accentColor, what, why, resources }: SkillCardProps) {
  return (
    <div
      className="rounded-2xl overflow-hidden mt-6"
      style={{
        background: "rgba(15,20,30,0.6)",
        border: `1px solid ${accentColor}35`
      }}
    >
      <div
        className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-5"
        style={{
          background: `${accentColor}10`,
          borderBottom: `1px solid ${accentColor}25`,
        }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span
              className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold"
              style={{ background: `${accentColor}28`, color: accentColor }}
            >
              {name.charAt(0)}
            </span>
            <h4 className="font-mono text-lg font-bold text-white leading-tight">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium" style={{ color: `${accentColor}cc` }}>{category}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono flex-shrink-0 sm:text-right">
          <span className="w-full text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(148,163,184,0.55)" }}>Tools</span>
          {correlatedTools.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full whitespace-nowrap font-medium"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(203,213,225,0.85)", border: "1px solid rgba(148,163,184,0.2)" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* What it is - Full Width */}
      <div className="px-6 py-5" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${accentColor}15` }}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>
          What it is
        </p>
        <p className="text-[15px] leading-relaxed" style={{ color: "rgba(203,213,225,0.85)" }}>{what}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0" style={{ borderColor: `${accentColor}18` }}>
        {/* Why - Left Column */}
        <div className="px-6 py-6" style={{ borderBottom: `1px solid ${accentColor}15` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: `${accentColor}ee` }}>
            Why you need it here
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: "rgba(226,232,240,0.88)" }}>{why}</p>
        </div>

        {/* Resources - Right Column */}
        <div className="px-6 py-6 flex flex-col gap-5" style={{ borderLeft: `1px solid ${accentColor}18`, borderBottom: `1px solid ${accentColor}15` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: `${accentColor}ee` }}>
            Resources to Learn
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3 font-semibold" style={{ color: "rgba(96,165,250,0.9)" }}>Free Options</p>
              <div className="flex flex-col gap-2">
                {resources.free.map((res) => (
                  <a
                    key={res.label}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[12px] hover:text-white transition-colors py-1"
                    style={{ color: "rgba(203,213,225,0.8)", textDecoration: "underline" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:bg-blue-400" style={{ background: "rgba(96,165,250,0.6)" }} />
                    {res.label}
                  </a>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3 font-semibold" style={{ color: "rgba(251,191,36,0.9)" }}>Paid Options</p>
              <div className="flex flex-col gap-2">
                {resources.paid.map((res) => (
                  <a
                    key={res.label}
                    href={res.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2 text-[12px] hover:text-white transition-colors py-1"
                    style={{ color: "rgba(203,213,225,0.8)", textDecoration: "underline" }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:bg-amber-400" style={{ background: "rgba(251,191,36,0.6)" }} />
                    {res.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        className="text-5xl xl:text-6xl font-bold text-white mb-3 leading-tight"
        style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}
      >
        {label}
      </h2>
      <p className="font-mono text-[14px]" style={{ color: `${color}dd` }}>{subtitle}</p>
      <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />
    </div>
  );
}

function SOCHeroAnimation() {
  const [phase, setPhase] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<{id: number, text: string}[]>([]);

  const bgLogs = [
    "192.168.1.10 - - [GET /api/v1/health] 200",
    "WARN: CPU usage exceeding 85% on db-04",
    "10.0.0.5 - - [POST /auth/login] 401 Unauthorized",
    "SYSLOG: Connection established from 192.168.1.22",
    "172.16.0.4 - - [GET /static/main.css] 200",
    "INFO: TLS handshake successful with peer",
    "10.0.0.8 - - [GET /admin/settings] 403 Forbidden",
    "SYSLOG: Service iptables restarted",
    "192.168.1.15 - - [GET /images/logo.png] 200",
  ];

  useEffect(() => {
    // Rapid background logs
    if (phase < 2) {
      const interval = setInterval(() => {
        setVisibleLogs(prev => {
          const newLog = { id: Date.now() + Math.random(), text: bgLogs[Math.floor(Math.random() * bgLogs.length)] };
          return [...prev.slice(-4), newLog];
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000); // User search appears
    const t2 = setTimeout(() => setPhase(2), 3500); // Alert pulse begins (logs stop)
    const t3 = setTimeout(() => setPhase(3), 5500); // System redirects
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative w-full max-w-[500px] h-[380px] rounded-2xl overflow-hidden bg-[#090d14] border border-blue-500/20 font-mono text-[11px] p-6 flex flex-col shadow-2xl">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
      
      {/* Window Controls */}
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4 flex-shrink-0 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        <span className="ml-3 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">soc@rootaccess:~# tail -f /var/log/syslog</span>
      </div>

      <div className="flex-1 overflow-hidden relative z-10 flex flex-col justify-end gap-1.5">
        {/* Background Logs */}
        <AnimatePresence mode="popLayout">
          {visibleLogs.slice(phase >= 2 ? -2 : -4).map((log) => (
            <motion.div
              layout
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 0.3, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-blue-200/50 whitespace-nowrap overflow-hidden text-ellipsis"
            >
              System Info: {log.text}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Phase 1: The query injection */}
        {phase >= 1 && (
          <motion.div
            layout
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-white bg-white/5 border-l-2 border-white/40 pl-3 py-1.5 mt-2 flex items-center gap-2"
          >
            <span className="text-blue-300 font-bold">[14:02:05]</span> 
            <span className="opacity-70">USER_QUERY:</span> 
            <span className="font-semibold">"What is cybersecurity"</span>
          </motion.div>
        )}

        {/* Phase 2: The Alert Pulse */}
        {phase >= 2 && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-3 p-3 border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 rounded-lg flex items-center gap-3 shadow-[0_0_15px_rgba(234,179,8,0.1)]"
          >
             <motion.div 
               animate={{ opacity: [1, 0.2, 1], scale: [1, 1.2, 1] }} 
               transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
               className="w-2.5 h-2.5 rounded-full bg-yellow-400 flex-shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.8)]"
             />
             <div>
               <div className="font-bold tracking-widest text-[10px] uppercase mb-0.5 text-yellow-300">Intent Match Initiated</div>
               <div className="text-yellow-200/70 text-[10px]">Processing curiosity vector... assessing path...</div>
             </div>
          </motion.div>
        )}

        {/* Phase 3: The Automated Response */}
        {phase >= 3 && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-3 p-4 border border-green-500/30 bg-green-500/10 rounded-xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-50" />
            <div className="text-[10px] font-bold tracking-[0.25em] text-green-400 mb-2 relative z-10">
              [SYSTEM_RESPONSE_GENERATED]
            </div>
            <div className="tracking-wide text-[12px] text-green-100 relative z-10 leading-relaxed">
              Training sequence approved.<br/>
              Action: <span className="font-bold text-white bg-green-500/20 px-2 py-0.5 rounded ml-1 border border-green-500/30">visit rootaccess.tech</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative scanning line */}
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent z-0 pointer-events-none"
      />
    </div>
  );
}

// ── Page Content ──────────────────────────────────────────────────────────────

export default function DetailedSOCPageClient() {
  return (
    <div className="min-h-screen" style={{ background: "#090d14", color: "rgba(226,232,240,0.9)" }}>

      <div
        className="sticky top-0 z-30 flex items-center gap-3 px-6 py-3"
        style={{
          background: "rgba(9,13,20,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          height: "48px",
        }}
      >
        <Link
          href="/roadmaps/soc/career-path"
          className="font-mono text-[11px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(148,163,184,0.75)", textDecoration: "underline" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Career Path
        </Link>
        <span style={{ color: "rgba(148,163,184,0.45)", fontSize: "11px" }}>/</span>
        <span className="font-mono text-[11px] uppercase tracking-widest font-semibold" style={{ color: "rgba(148,163,184,0.6)" }}>
          Deep Dive
        </span>
        <div className="flex-1" />
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
      </div>

      <div className="px-6 lg:px-16 xl:px-20 pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] mb-6 font-bold" style={{ color: "rgba(59,130,246,0.7)" }}>
              SOC & Blue Team Deep Dive
            </p>
            <h1
              className="text-6xl sm:text-7xl xl:text-8xl font-bold text-white mb-8 leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-heading, system-ui)" }}
            >
              The SOC Career Path,<br />
              <span style={{ color: "rgba(59,130,246,0.95)" }}>Explained</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-xl" style={{ color: "rgba(226,232,240,0.8)" }}>
              The standard career track page gives you the big picture. This guide dives much deeper into the specific tools certifications and underlying skills you actually need to build a life in cyber defence. We cover everything from early triage to leading the entire team without the confusing corporate fluff.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {LEVELS.map((l) => (
                <a
                  key={l.num}
                  href={`#level-${l.num}`}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full font-mono text-[12px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:bg-white/[0.05]"
                  style={{
                    background: `${l.color}15`,
                    border: `1px solid ${l.color}35`,
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
          
          <div className="hidden lg:flex justify-end">
            <SOCHeroAnimation />
          </div>
        </div>
      </div>

      <div className="h-px mx-6 lg:mx-16 xl:mx-20" style={{ background: "rgba(255,255,255,0.05)" }} />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 min-w-0 px-6 lg:px-12 xl:px-16">

          {/* ══ LEVEL 00 ══════════════════════════════════════════════════════ */}
          <section id="level-00" className="py-16 xl:py-20">
            <SectionHeader
              num="00" label="The Entry Point" color="#94a3b8"
              subtitle="Building the Foundation"
              time="0-6 months" salary="£25K-£35K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                In security you will inevitably break things and you will really need to understand exactly how they broke. Before you can ever spot a real attacker you must learn the basic ground you stand on. This starts right here.
              </p>
              <p>
                You have to start learning about operating systems and networks. The entire internet essentially runs on Linux. If you cannot navigate a terminal comfortably you are effectively blind in a Security Operations Centre. It is the clear difference between clicking a shiny button on a dashboard and genuinely understanding the command that just executed across your entire fleet of endpoints.
              </p>
              <p>
                You also cannot defend what you do not understand. Networking is basically the physics of the digital world. If you do not know how a normal packet moves from point A to point B you will never be able to spot the packet that shouldn't be there. This level slowly turns scary technical jargon into concepts you can actually explain to your friends over coffee.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Google Cybersecurity Certificate" provider="Coursera / Google" href="https://www.coursera.org/professional-certificates/google-cybersecurity" difficulty="Beginner" duration="3-6 months" cost="Subscription" accentColor="#94a3b8" isTop
                what="An overarching start to security. It guides you from the absolute basics of networking and Linux command line straight through to fundamental threat detection and simple Python scripting. It is incredibly comprehensive and quite affordable."
                why="This is the absolute best generalist start. It doesn't bog you down with overly dense engineering details. More importantly finishing it proves to employers you can actually commit to a multi-month learning discipline while showing them you understand the broad strokes of a blue team role. It carries heavy weight because HR departments recognize the brand name."
              />
              <CertCard name="TryHackMe Pre-Security" provider="TryHackMe" href="https://tryhackme.com/certification/pre-security" difficulty="Beginner" duration="40-60 hrs" cost="Free / Premium" accentColor="#94a3b8"
                what="Bite-sized gamified lessons focusing heavily on removing fear from foundational concepts. You get to interactively learn networking layers HTTP DNS and fundamental security terminology right in your normal browser."
                why="We put this here because it has the absolute lowest barrier to entry. It turns intimidating tech into small manageable missions. It's about building your vital confidence and allowing you to spin up an interactive lab safely before you spend your hard-earned cash or get totally overwhelmed."
              />
              <CertCard name="TCM Practical Security Fundamentals" provider="TCM Security Academy" href="https://academy.tcm-sec.com/p/practical-security-fundamentals" difficulty="Beginner" duration="20-30 hrs" cost="One-off fee" accentColor="#94a3b8"
                what="A hands-on practical course that avoids dry static slide decks in favour of real-world demonstrations of exactly how the modern digital world works and then quickly breaks it apart."
                why="TCM is strictly for the hands-on soul. If you hate reading text-heavy slides and genuinely want to see how networks and operating systems actually break from day one this is your top pick. It heavily focuses on the fundamental 'how' of security not just the boring theory."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Networking (TCP/IP)"
                category="Core Knowledge"
                correlatedTools={["VirtualBox", "Terminal", "PowerShell"]}
                accentColor="#94a3b8"
                what="The fundamental 'language' of how data moves across a network, including DNS, DHCP, and Subnetting."
                why="You can't defend what you don't understand. If you don't know how a DNS request is supposed to look, you'll never spot a C2 server 'hiding' in plain sight. This is the physics of the digital world—ignore it, and you're just guessing."
                resources={{
                  free: [
                    { label: "Professor Messer Net+ (N10-009)", url: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/" },
                    { label: "NetworkChuck — Full Networking", url: "https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P" },
                    { label: "Cisco NetAcad: Intro to Networks", url: "https://www.netacad.com/courses/networking/ccna-introduction-networks" }
                  ],
                  paid: [
                    { label: "Jason Dion Net+ on Udemy", url: "https://www.udemy.com/course/comptia-network-cert-n10-008-the-total-course/" },
                    { label: "Jeremy's IT Lab (CCNA)", url: "https://www.jeremysitlab.com/" }
                  ]
                }}
              />

              <SkillCard
                name="OS Fundamentals"
                category="Operating Systems"
                correlatedTools={["Linux", "Windows", "VirtualBox"]}
                accentColor="#94a3b8"
                what="Deep knowledge of how operating systems manage files, processes, and users across Windows and Linux environments."
                why="You need to know what 'Normal' looks like to identify 'Abnormal.' Attackers love to hide in system folders or create 'ghost' users. If you don't know your way around the Linux filesystem or the Windows Registry, you're a blind defender."
                resources={{
                  free: [
                    { label: "The Linux Command Line (Free Book)", url: "https://linuxcommand.org/tlcl.php" },
                    { label: "THM Linux Fundamentals", url: "https://tryhackme.com/module/linux-fundamentals" },
                    { label: "Microsoft Learn: Windows for IT", url: "https://learn.microsoft.com/en-us/training/browse/?products=windows" }
                  ],
                  paid: [
                    { label: "TCM Academy Linux 101", url: "https://academy.tcm-sec.com/p/linux-101" },
                    { label: "Google IT Support — Coursera", url: "https://www.coursera.org/professional-certificates/google-it-support" }
                  ]
                }}
              />

              <SkillCard
                name="Scripting Basics"
                category="Automation"
                correlatedTools={["Python", "Bash", "Terminal"]}
                accentColor="#94a3b8"
                what="Using code like Python or Bash to automate repetitive, manual tasks and process large datasets."
                why="Speed is your greatest weapon. You don't want to be the person manually checking 500 logs. You want to be the person who writes a 10-line script to do it in 5 seconds. Automating the boring stuff leaves you time for the actual hunting."
                resources={{
                  free: [
                    { label: "Automate the Boring Stuff (Free Book)", url: "https://automatetheboringstuff.com/" },
                    { label: "CS50P — Python (Harvard, Free)", url: "https://cs50.harvard.edu/python/2022/" }
                  ],
                  paid: [
                    { label: "TCM Python 101 for Hackers", url: "https://academy.tcm-sec.com/p/python-101-for-hackers" },
                    { label: "Jose Portilla Python — Udemy", url: "https://www.udemy.com/course/complete-python-bootcamp/" }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 01 ══════════════════════════════════════════════════════ */}
          <section id="level-01" className="py-16 xl:py-20">
            <SectionHeader
              num="01" label="L1 Triage" color="#3b82f6"
              subtitle="The Front Lines"
              time="0-2 years" salary="£35K-£50K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                Welcome to the very real front lines. The junior SOC analyst lives and breathes logs alerts and constant daily triage. Your entire toolkit changes significantly right here.
              </p>
              <p>
                You will need to quickly get used to looking at massive dashboards that aggregate millions of logs. It can definitely be overwhelming at first but you eventually learn to spot the needle in the haystack. You must also learn how to dig deeper when a dashboard lies to you or gives a false positive.
              </p>
              <p>
                But the single most underrated skill you will develop here is raw human judgement. You have to quickly distinguish between a stressed overworked developer making a bizarre configuration mistake at 3am and an actual external threat actor running a network scan. Context is absolutely everything in this career.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(59,130,246,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Practical SOC Analyst (PSAA)" provider="TCM Security Academy" href="https://academy.tcm-sec.com/p/practical-soc-analyst-associate" difficulty="Intermediate" duration="2-3 months prep" cost="Mid-range" accentColor="#3b82f6" isTop
                what="A fundamentally practical lab-based exam that does not care at all if you can memorise multiple-choice answers. It forces you to dive right into active security tools sift through logs handle SIEM alerts and verify genuine attacks in a live-fire simulation."
                why="It is significantly more affordable than its competitors while being brutally hands-on. It doesn't just teach you what a SIEM is conceptually but it forces you to investigate actual real-world scenarios. It is arguably the best value on the market for proving you can sit down in a SOC and confidently triage on day one."
              />
              <CertCard name="Blue Team Level 1 (BTL1)" provider="Security Blue Team" href="https://securityblue.team/blue-team-level-1/" difficulty="Intermediate" duration="3-4 months prep" cost="Premium" accentColor="#3b82f6"
                what="A fully practical narrative-driven 24-hour incident response exam. You are thrown into a simulated incident using leading industry tools like Splunk Autopsy and pfSense to quietly track down the threat actor and document your exact findings."
                why="The BTL1 is the current industry darling for junior analysts. It boasts massive brand recognition and an engaging incredibly well-built lab environment. If you have the budget this is your gold standard badge that hiring managers universally respect and look for."
              />
              <CertCard name="CompTIA Security+" provider="CompTIA" href="https://www.comptia.org/certifications/security" difficulty="Intermediate" duration="1-3 months prep" cost="Mid-range" accentColor="#3b82f6"
                what="A broad foundational certification that covers the entirety of basic security concepts. It is entirely theory and multiple-choice covering the what and why of security frameworks cryptography basics and risk management."
                why="Let's be brutally honest. Many recruiters do not know what PSAA is yet but every single one of them knows Security+. This is the big HR Filter. This is your completely safe bet to make sure your resume actually clears the automated algorithms and lands directly on the hiring manager's desk."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(59,130,246,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="SIEM Log Analysis & Query Writing"
                category="Log Management"
                correlatedTools={["Splunk", "Wazuh", "ELK"]}
                accentColor="#3b82f6"
                what="Searching, filtering, and visualizing massive datasets to identify specific security events and anomalies using query languages like SPL or KQL."
                why="This is your 'Main Weapon.' In a real SOC, you'll be staring at dashboards with 100k+ events. Learning to write precise queries is the difference between finding the breach in 5 min or missing it entirely."
                resources={{
                  free: [
                    { label: "Splunk Fundamentals 1 (Free)", url: "https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html" },
                    { label: "LetsDefend — SIEM 101", url: "https://app.letsdefend.io/training/lessons/siem-101" },
                    { label: "Microsoft Sentinel — Learn Path", url: "https://learn.microsoft.com/en-us/training/paths/sc-200-utilize-kql-for-azure-sentinel/" }
                  ],
                  paid: [
                    { label: "TCM Practical SOC Analyst (PSAA)", url: "https://academy.tcm-sec.com/p/practical-soc-analyst-associate" },
                    { label: "Blue Team Level 1 (BTL1)", url: "https://securityblue.team/blue-team-level-1/" }
                  ]
                }}
              />

              <SkillCard
                name="Alert Triage & Prioritization"
                category="Incident Response"
                correlatedTools={["Wazuh Dashboards", "VirusTotal", "Wireshark"]}
                accentColor="#3b82f6"
                what="The critical ability to analyze incoming security alerts and rapidly decide if they represent genuine threats or false alarms."
                why="You can't chase every rabbit. Tier 1 is about 'Cyber Triage.' If you prioritize a harmless scan over a ransomware beacon, the company loses. You are the filter that keeps the senior analysts from burning out."
                resources={{
                  free: [
                    { label: "NIST SP 800-61r2 — Incident Handling", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf" },
                    { label: "CyberDefenders — Free Blue Team Labs", url: "https://cyberdefenders.org/labs/" },
                    { label: "LetsDefend — Alert Handling", url: "https://app.letsdefend.io/training/lessons/detecting-web-attacks" }
                  ],
                  paid: [
                    { label: "TCM PSAA — Triage Modules", url: "https://academy.tcm-sec.com/p/practical-soc-analyst-associate" },
                    { label: "Blue Team Level 1 (BTL1)", url: "https://securityblue.team/blue-team-level-1/" }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 02 ══════════════════════════════════════════════════════ */}
          <section id="level-02" className="py-16 xl:py-20">
            <SectionHeader
              num="02" label="L2 Advanced" color="#8b5cf6"
              subtitle="The Pattern Matcher"
              time="2-5 years" salary="£50K-£75K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                As an L2 Analyst you stop waiting around for simple dashboard alerts to ring. You actually become the active hunter. You start actively looking for the silent anomalies in the system that your automated platforms completely missed. This requires a much deeper contextual understanding of environments.
              </p>
              <p>
                You need tools that let you cut through obfuscation and look directly at endpoints. Modern attackers rarely leave things in plain text. They encode and bury their payloads deeply to hide from basic security filters. You have to be able to peel back those technical layers in seconds.
              </p>
              <p>
                You also start speaking completely different languages. You move from random guessing to deeply structured intelligence. This becomes the common technical language you use to describe exactly what the attacker is actively doing tactic by tactic and technique by technique.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(139,92,246,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CCDL2 / CyberDefenders L2" provider="CyberDefenders" href="https://cyberdefenders.org/blue-team-certification/ccdl2/" difficulty="Advanced" duration="2-4 months prep" cost="Mid-range" accentColor="#8b5cf6" isTop
                what="This focuses heavily on Threat Hunting and deep investigations. You pivot away from passive monitoring towards actively hunting through raw logs network flows and endpoints using advanced querying to uncover stealthy adversaries."
                why="At L2 you must understand the deep 'why' behind an attacker's behavior not just the surface level 'what'. This certification teaches you exactly how to hunt for advanced persistent threats that easily evade standard SIEM rules."
              />
              <CertCard name="HTB CDSA" provider="Hack The Box" href="https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst" difficulty="Advanced" duration="4-6 months prep" cost="Mid-range" accentColor="#8b5cf6"
                what="A grueling intensely practical 7-day exam emphasizing realistic challenging incident response and threat hunting scenarios against advanced simulated adversaries. You must fully investigate and critically report exactly what happened."
                why="Hack The Box is famously known across the entire industry for being uncomfortably hard. This certification carries that brutal reputation squarely into the blue team side. It is specifically designed for the analyst who wants to definitively prove they can handle complex scenarios."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(139,92,246,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Threat Correlation & Pattern Mapping"
                category="Advanced Analysis"
                correlatedTools={["MITRE ATT&CK", "TheHive", "MISP"]}
                accentColor="#8b5cf6"
                what="The complex art of connecting multiple, seemingly unrelated security events to identify the complete lifecycle of a cyber attack."
                why="Attackers are quiet. They don't just kick the door down; they pick the lock, wait, and move slowly. Level 2 is where you stop looking at single logs and start seeing patterns. You are the detective connecting the clues."
                resources={{
                  free: [
                    { label: "MITRE ATT&CK — Official Trainings", url: "https://attack.mitre.org/resources/training/" },
                    { label: "AttackIQ Academy — Free ATT&CK", url: "https://www.academy.attackiq.com/" },
                    { label: "CyberDefenders — Threat Hunting Labs", url: "https://cyberdefenders.org/labs/?category=threat-hunting" }
                  ],
                  paid: [
                    { label: "HTB CDSA", url: "https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst" },
                    { label: "SANS FOR578 — Cyber Threat Intel", url: "https://www.sans.org/cyber-security-courses/cyber-threat-intelligence/" }
                  ]
                }}
              />

              <SkillCard
                name="Malware Triage (Static & Dynamic)"
                category="Malware Analysis"
                correlatedTools={["CyberChef", "VirusTotal", "ANY.RUN"]}
                accentColor="#8b5cf6"
                what="Analyzing suspicious files and binaries in isolated environments to determine their functionality and intent without system infection."
                why="When a user clicks a suspicious link, you need to know exactly what that file is trying to do. Is it stealing passwords? Is it encrypting the drive? You provide the critical intelligence the team needs to react."
                resources={{
                  free: [
                    { label: "Malware Unicorn RE101 (Workshop)", url: "https://malwareunicorn.org/workshops/re101.html" },
                    { label: "ANY.RUN — Interactive Sandbox", url: "https://any.run/" },
                    { label: "OALabs — YouTube Reversing", url: "https://www.youtube.com/@OALABS" }
                  ],
                  paid: [
                    { label: "TCM PMAT — Best ROI malware course", url: "https://academy.tcm-sec.com/p/practical-malware-analysis-triage" },
                    { label: "SANS FOR610 — RE Malware", url: "https://www.sans.org/cyber-security-courses/reverse-engineering-malware-malware-analysis/" }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 03 ══════════════════════════════════════════════════════ */}
          <section id="level-03" className="py-16 xl:py-20">
            <SectionHeader
              num="03" label="L3 Forensic" color="#ec4899"
              subtitle="The Storyteller"
              time="5-8 years" salary="£75K-£100K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                At this mature stage you are no longer just stopping an actively burning incident. You are a digital coroner accurately piecing together the timeline of exactly how an organisation was originally compromised months ago. The L3 role is purely about telling the entire undeniable story of an attack based entirely on digital evidence.
              </p>
              <p>
                Your primary tools are expertly designed for the digital autopsy. You need to be able to extract highly volatile memories and safely process hard drives. When an entire hospital is offline because of ransomware you do not have days to process evidence. Speed becomes your most valuable currency.
              </p>
              <p>
                Crucially at this high level the absolute best way to defend against a highly skilled attacker is to completely understand how they operate. To be a top tier defender you really have to learn to think like a predator. You need to understand exploits deeply from the inside out to make your own forensic analysis intensely sharp.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(236,72,153,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Blue Team Level 2 (BTL2)" provider="Security Blue Team" href="https://securityblue.team/blue-team-level-2/" difficulty="Expert" duration="6+ months prep" cost="Premium" accentColor="#ec4899" isTop
                what="An incredibly intense multi-day exam heavily focused on digital forensics malware analysis reverse engineering and deep threat hunting. You must thoroughly analyse compromised endpoints memory captures and malicious binaries."
                why="This is effectively the PhD stage of blue teaming. It's a grueling in-depth exam that proves without a single doubt that you can personally handle the technical demands of a catastrophic incident from detection to a legally sound final report."
              />
              <CertCard name="GCFA - GIAC Certified Forensic Analyst" provider="GIAC / SANS" href="https://www.giac.org/certifications/certified-forensic-analyst-gcfa/" difficulty="Expert" duration="3-4 months prep" cost="Enterprise" accentColor="#ec4899"
                what="The absolute gold standard for enterprise incident response. It extensively covers complex Windows forensics advanced memory analysis massive timeline generation and hunting deep-seated adversary activity."
                why="This is the undisputed industry heavyweight. It is obscenely expensive and typically paid for by a corporation but if you want to work for a top-tier Incident Response firm this is the exact thing they search for. It accelerates your career immensely."
              />
              <CertCard name="OSCP+ / Pen-200" provider="OffSec" href="https://www.offsec.com/courses/pen-200/" difficulty="Advanced" duration="6 months prep" cost="Premium" accentColor="#ec4899"
                what="An infamous entirely practical penetration testing exam where you must actually exploit a number of servers in a 24-hour window by finding vulnerabilities and chaining your attacks together."
                why="Why is a red team certification on the blue team path? Because to truly excel as a forensic investigator you must know exactly what an exploit looks and feels like when it runs. When you deeply know the attacker's tools spotting their tiny footprints becomes second nature."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(236,72,153,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Disk & Memory Forensics"
                category="Digital Forensics"
                correlatedTools={["Volatility", "KAPE", "FTK Imager"]}
                accentColor="#ec4899"
                what="The deep technical process of recovering 'deleted' or 'hidden' digital evidence from a system's physical hard drive and volatile RAM."
                why="This is the digital autopsy. Sometimes an attacker deletes their logs, but they can't delete footprints from the system's memory. Memory forensics is often the only way to find modern, 'fileless' malware."
                resources={{
                  free: [
                    { label: "13Cubed — DFIR YouTube Channel", url: "https://www.youtube.com/@13Cubed" },
                    { label: "Volatility Foundation Docs", url: "https://volatility3.readthedocs.io/en/latest/" },
                    { label: "DFIR.science — Free Guides", url: "https://dfir.science/" }
                  ],
                  paid: [
                    { label: "TCM PNPT — Forensics Modules", url: "https://academy.tcm-sec.com/p/practical-network-penetration-tester" },
                    { label: "SANS FOR508 (GCFA Gold Standard)", url: "https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-memory-forensics/" },
                    { label: "Blue Team Level 2 (BTL2)", url: "https://securityblue.team/blue-team-level-2/" }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 04 ══════════════════════════════════════════════════════ */}
          <section id="level-04" className="py-16 xl:py-20">
            <SectionHeader
              num="04" label="SOC Lead" color="#f59e0b"
              subtitle="The Architect"
              time="8+ years" salary="£100K-£140K+"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                You are definitely no longer looking at individual isolated alerts. You are fully engaged with building and intelligently scaling the entire defensive machine. A great SOC Lead's core job is actually to fire themselves from the boring repetitive tasks and fully focus the elite team on genuine highly sophisticated threats.
              </p>
              <p>
                This heavily relies on massive automation platforms. You become directly responsible for engineering intelligent playbooks that seamlessly handle the tedious initial triage work automatically. You basically create self-managing defense mechanisms allowing human analysts to fully focus on the complex work that really matters.
              </p>
              <p>
                Equally as important is data visualisation and firm communication. Security teams sadly do not make money they simply save money. You need to clearly and consistently prove the massive value of the SOC directly to busy executives. You turn massive boring data logs into beautiful easily digestible charts that quickly show the board exactly how many millions you just saved the company.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(245,158,11,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISSP" provider="ISC²" href="https://www.isc2.org/certifications/cissp" difficulty="Advanced" duration="3-6 months prep" cost="Premium" accentColor="#f59e0b" isTop
                what="A broad management-focused exam covering eight distinct domains of security focusing entirely on high-level risk management architecture asset security and smooth operations."
                why="This is the corporate golden ticket. It is less about how to use a specific technical tool and vastly more about how to manage enormous enterprise risk effectively. This is the exact certification that reliably secures you the Director title and the nice executive salary that comes straight along with it."
              />
              <CertCard name="CISM" provider="ISACA" href="https://www.isaca.org/credentialing/cism" difficulty="Advanced" duration="2-4 months prep" cost="Premium" accentColor="#f59e0b"
                what="Focused extensively on security governance large-scale program development and massive incident management from an overarching strategic viewpoint."
                why="While others are broad this focuses sharply and specifically on strategic leadership. It teaches you how to build a remarkably unified team how to effortlessly handle a massive budget and crucially how to cleanly talk to a CEO without relying on confusing technical jargon. It's the ultimate executive passport."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(245,158,11,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="SOC Architecture & Tool Strategy"
                category="Strategy & Leadership"
                correlatedTools={["Palo Alto XSOAR", "ServiceNow", "PowerBI"]}
                accentColor="#f59e0b"
                what="Designing the overarching systems, automated workflows, and tool stacks that the entire security operations team relies upon."
                why="A bad tool choice can blind your entire team for years. You aren't just using the tools; you are building the 'Machine.' You decide where to spend the budget to get the most visibility with the least amount of noise."
                resources={{
                  free: [
                    { label: "MITRE 11 Strategies of a World-Class SOC", url: "https://www.mitre.org/news-insights/publication/11-strategies-world-class-cybersecurity-operations-center" },
                    { label: "NIST Cybersecurity Framework (CSF)", url: "https://www.nist.gov/cyberframework" },
                    { label: "SOC-CMM Self Assessment", url: "https://www.soc-cmm.com/" }
                  ],
                  paid: [
                    { label: "CISSP — (ISC)² Gold Standard", url: "https://www.isc2.org/certifications/cissp" },
                    { label: "CISM — ISACA Leadership Track", url: "https://www.isaca.org/credentialing/cism" }
                  ]
                }}
              />
            </div>
          </section>

          {/* ── Footer ── */}
          <div className="py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/roadmaps/soc/career-path"
                className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-white"
                style={{ color: "rgba(59,130,246,0.85)", textDecoration: "underline" }}
              >
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Career Path
              </Link>
              <div className="flex flex-wrap gap-3">
                {LEVELS.map((l) => (
                  <a key={l.num} href={`#level-${l.num}`}
                    className="font-mono text-[9px] uppercase tracking-widest"
                    style={{ color: `${l.color}44`, textDecoration: "underline" }}
                  >
                    {l.num} {l.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
