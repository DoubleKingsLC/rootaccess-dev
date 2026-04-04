"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const LEVELS = [
  { num: "00", label: "Entry Point",         color: "#94a3b8", time: "0-6 months" },
  { num: "01", label: "L1 Triage",           color: "#3b82f6", time: "0-2 years"  },
  { num: "02", label: "L2 Advanced",         color: "#8b5cf6", time: "2-5 years"  },
  { num: "03", label: "L3 Forensic",         color: "#ec4899", time: "5-8 years"  },
  { num: "04", label: "SOC Lead",            color: "#f59e0b", time: "8+ years"   },
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
  href?: string;
  accentColor: string;
  what: string;
  why: string;
  isTop?: boolean;
}

function CertCard({ name, provider, href, accentColor, what, why, isTop }: CertCardProps) {
  let domain = "example.com";
  try {
    if (href) domain = new URL(href).hostname;
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
            {href && (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
                alt=""
                width={28}
                height={28}
                className="rounded flex-shrink-0"
                style={{ objectFit: "contain" }}
              />
            )}
            <h4 className="font-mono text-lg font-bold text-white leading-tight">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium" style={{ color: `${accentColor}cc` }}>{provider}</p>
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

      {href && (
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
      )}
    </div>
  );
}

interface SkillResource {
  label: string;
  url: string;
  why: string;
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

      <div className="px-6 py-5" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${accentColor}15` }}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>
          What it is
        </p>
        <p className="text-[15px] leading-relaxed" style={{ color: "rgba(203,213,225,0.85)" }}>{what}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0" style={{ borderColor: `${accentColor}18` }}>
        <div className="px-6 py-6 border-b xl:border-b-0" style={{ borderColor: `${accentColor}15` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: `${accentColor}ee` }}>
            Why you need it here
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: "rgba(226,232,240,0.88)" }}>{why}</p>
        </div>

        <div className="px-6 py-6 flex flex-col gap-5 border-t xl:border-t-0 xl:border-l" style={{ borderColor: `${accentColor}18` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: `${accentColor}ee` }}>
            Resources to Learn
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3 font-semibold" style={{ color: "rgba(96,165,250,0.9)" }}>Free Options</p>
              <div className="flex flex-col gap-4">
                {resources.free.map((res) => (
                  <div key={res.label}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-[12px] font-bold hover:text-white transition-colors"
                      style={{ color: "rgba(203,213,225,0.95)", textDecoration: "underline" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:bg-blue-400" style={{ background: "rgba(96,165,250,0.6)" }} />
                      {res.label}
                    </a>
                    <p className="text-[11px] mt-1 ml-3.5 leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>{res.why}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3 font-semibold" style={{ color: "rgba(251,191,36,0.9)" }}>Paid Options</p>
              <div className="flex flex-col gap-4">
                {resources.paid.map((res) => (
                  <div key={res.label}>
                    <a
                      href={res.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 text-[12px] font-bold hover:text-white transition-colors"
                      style={{ color: "rgba(203,213,225,0.95)", textDecoration: "underline" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 group-hover:bg-amber-400" style={{ background: "rgba(251,191,36,0.6)" }} />
                      {res.label}
                    </a>
                    <p className="text-[11px] mt-1 ml-3.5 leading-relaxed" style={{ color: "rgba(148,163,184,0.7)" }}>{res.why}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ num, label, color, time, subtitle }: {
  num: string; label: string; color: string; time: string; subtitle: string;
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
          {time}
        </span>
      </div>
      <h2
        className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white mb-3 leading-tight"
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
    const t1 = setTimeout(() => setPhase(1), 2000);
    const t2 = setTimeout(() => setPhase(2), 3500);
    const t3 = setTimeout(() => setPhase(3), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative w-full max-w-[500px] h-[380px] rounded-2xl overflow-hidden bg-[#090d14] border border-blue-500/20 font-mono text-[11px] p-6 flex flex-col shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4 flex-shrink-0 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        <span className="ml-3 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">soc@rootaccess:~# tail -f /var/log/syslog</span>
      </div>
      <div className="flex-1 overflow-hidden relative z-10 flex flex-col justify-end gap-1.5">
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
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent z-0 pointer-events-none"
      />
    </div>
  );
}

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
              The standard career track page gives you the big picture. This guide dives much deeper into the specific tools, certifications, and underlying skills you actually need to build a life in cyber defense. We cover everything from early triage to leading the entire team without the confusing corporate fluff.
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
              time="0-6 months"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                In security, you will inevitably break things, and you need to understand exactly how they broke. Before you can ever spot a real attacker, you must learn the basic ground you stand on. This starts with the hardware, the operating system, and the networks that connect them.
              </p>
              <p>
                The entire internet essentially runs on Linux. If you cannot navigate a terminal comfortably, you are effectively operating with a blindfold on in a Security Operations Center. It is the clear difference between clicking a shiny button on a dashboard and genuinely understanding the command that just executed across your entire fleet of endpoints.
              </p>
              <p>
                You also cannot defend what you do not understand. Networking is effectively the physics of the digital world. If you do not know how a normal packet moves from point A to point B, you will never be able to spot the packet that shouldn't be there. This level slowly turns scary technical jargon into concepts you can actually explain to a friend over coffee.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Google Cybersecurity Certificate" provider="Coursera / Google" href="https://www.coursera.org/professional-certificates/google-cybersecurity" accentColor="#94a3b8" isTop
                what="A broad and accessible start to security. It guides you from the absolute basics of networking and the Linux command line through to fundamental threat detection and simple Python scripting."
                why="This is the best generalist starting point because it doesn't bog you down with overly dense engineering details. More importantly, finishing it proves to employers that you have the discipline to finish a multi-month course. HR departments universally recognize the Google brand, which helps with your initial resume screening."
              />
              <CertCard name="TCM Practical Security Fundamentals" provider="TCM Security Academy" href="https://academy.tcm-sec.com/p/practical-security-fundamentals" accentColor="#94a3b8"
                what="A hands-on course that focuses on real-world demonstrations rather than dry slide decks. It shows you exactly how the modern digital world works and then logically takes it apart."
                why="This is for learners who prefer doing over watching. If you want to see how networks and operating systems actually break from day one, this is your best choice. It focuses on the fundamental 'how' of security rather than just the academic theory."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Networking (TCP/IP)"
                category="Core Knowledge"
                correlatedTools={["VirtualBox", "Terminal", "PowerShell"]}
                accentColor="#94a3b8"
                what="The fundamental language of how data moves across a network, including DNS, DHCP, and Subnetting."
                why="You can't defend what you don't understand. If you don't know how a DNS request is supposed to look, you'll never spot a malicious server hiding in plain sight. This is the physics of the digital world."
                resources={{
                  free: [
                    { label: "Professor Messer Net+", url: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/", why: "The gold standard for clear, free networking education with zero fluff." },
                    { label: "NetworkChuck", url: "https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P", why: "An high-energy, visual way to learn complex networking concepts." },
                  ],
                  paid: [
                    { label: "Jason Dion Net+", url: "https://www.udemy.com/course/comptia-network-cert-n10-008-the-total-course/", why: "The best exam prep if you plan on actually taking the Network+ certification." }
                  ]
                }}
              />
              <SkillCard
                name="OS Fundamentals"
                category="Operating Systems"
                correlatedTools={["Linux", "Windows", "VirtualBox"]}
                accentColor="#94a3b8"
                what="Deep knowledge of how operating systems manage files, processes, and users across Windows and Linux environments."
                why="You need to know what 'Normal' looks like to identify 'Abnormal.' Attackers hide in system folders or create hidden users. If you don't know your way around the Linux filesystem, you are a blind defender."
                resources={{
                  free: [
                    { label: "The Linux Command Line", url: "https://linuxcommand.org/tlcl.php", why: "A free book that is widely considered the bible for terminal beginners." },
                    { label: "THM Linux Fundamentals", url: "https://tryhackme.com/module/linux-fundamentals", why: "Hands-on labs to get you over the fear of the black command prompt." },
                  ],
                  paid: [
                    { label: "TCM Academy Linux 101", url: "https://academy.tcm-sec.com/p/linux-101", why: "Practical, video-led instructions from people who use Linux every day." }
                  ]
                }}
              />
              <SkillCard
                name="Scripting Basics"
                category="Automation"
                correlatedTools={["Python", "Bash", "Terminal"]}
                accentColor="#94a3b8"
                what="Using code like Python or Bash to automate repetitive tasks and process large datasets."
                why="Speed is your greatest weapon. You don't want to manually check 500 logs. You want to write a 10-line script to do it in 5 seconds. Automating the boring stuff leaves you time for actual hunting."
                resources={{
                  free: [
                    { label: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/", why: "The most practical Python guide ever written for non-programmers." },
                    { label: "CS50P — Python", url: "https://cs50.harvard.edu/python/2022/", why: "A world-class introduction to Python from Harvard University." }
                  ],
                  paid: [
                    { label: "TCM Python 101", url: "https://academy.tcm-sec.com/p/python-101-for-hackers", why: "Python explained specifically through the lens of a security professional." }
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
              subtitle="The Front Lines of Defense"
              time="0-2 years"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                Welcome to the front lines. The L1 SOC analyst lives and breathes logs, alerts, and constant daily triage. Your core job is to quickly cut through the noise and identify the high-risk events that actually require an expert investigation.
              </p>
              <p>
                You will need to quickly get used to looking at massive dashboards that aggregate millions of logs. It can be overwhelming at first, but you eventually learn to spot the needle in the haystack. You must also learn how to dig deeper when a dashboard lies to you or gives a false positive.
              </p>
              <p>
                The single most underrated skill you will develop here is raw human judgment. You have to distinguish between an overworked developer making a mistake at 3 AM and an external threat actor running a network scan. Context is absolutely everything in this career.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(59,130,246,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Practical SOC Analyst (PSAA)" provider="TCM Security" href="https://academy.tcm-sec.com/p/practical-soc-analyst-associate" accentColor="#3b82f6" isTop
                what="A purely lab-based exam that tests if you can actually perform triage. It forces you to dive into logs, handle SIEM alerts, and verify genuine attacks in a live-fire simulation."
                why="This is excellent value for proving you can handle Day 1 tasks in a SOC. It doesn't just teach theory; it forces you to investigate real-world scenarios. It is one of the best ways to prove your practical worth to a hiring manager."
              />
              <CertCard name="Blue Team Level 1 (BTL1)" provider="Security Blue Team" href="https://securityblue.team/blue-team-level-1/" accentColor="#3b82f6"
                what="A respected, narrative-driven 24-hour incident response exam. You are thrown into a simulated incident using industry tools to track down an attacker."
                why="BTL1 is the current industry darling for junior analysts. It carries massive brand recognition and has an engaging lab environment. If you have the budget, this is the gold standard badge that recruiters look for."
              />
              <CertCard name="Security+" provider="CompTIA" href="https://www.comptia.org/certifications/security" accentColor="#3b82f6"
                what="A broad foundational certification covering the entirety of basic security concepts, from risk management to basic cryptography."
                why="While purely theoretical, Security+ is the ultimate 'HR Filter.' Many recruiters use it as a mandatory requirement to ensure you understand the basic vocabulary of the industry. It ensures your resume actually makes it to a human desk."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(59,130,246,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="SIEM Log Analysis"
                category="Log Management"
                correlatedTools={["Splunk", "Wazuh", "ELK"]}
                accentColor="#3b82f6"
                what="Searching and filtering massive datasets to identify specific security events using professional tools."
                why="In a real SOC, you'll be staring at dashboards with thousands of events. Learning to write precise queries is the difference between finding the breach and missing it entirely."
                resources={{
                  free: [
                    { label: "Splunk Fundamentals", url: "https://www.splunk.com/en_us/training/free-courses/splunk-fundamentals-1.html", why: "The official, free starting point for the industry's most powerful log tool." },
                    { label: "LetsDefend SIEM 101", url: "https://app.letsdefend.io/training/lessons/siem-101", why: "A high-quality interactive module for learning SIEM basics." },
                  ],
                  paid: [
                    { label: "TCM PSAA Exam Prep", url: "https://academy.tcm-sec.com/p/practical-soc-analyst-associate", why: "The most practical focused training for the price." }
                  ]
                }}
              />
              <SkillCard
                name="Alert Handling"
                category="Incident Response"
                correlatedTools={["VirusTotal", "Wireshark"]}
                accentColor="#3b82f6"
                what="Analyzing incoming security alerts and rapidly deciding if they represent genuine threats or false alarms."
                why="You can't chase every rabbit. L1 is about 'Cyber Triage.' If you prioritize a harmless scan over a ransomware beacon, the company loses. You are the filter for the entire team."
                resources={{
                  free: [
                    { label: "CyberDefenders Labs", url: "https://cyberdefenders.org/labs/", why: "The best place to practice real-world investigation scenarios without a cost." },
                    { label: "NIST Incident Handling", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-61r2.pdf", why: "The formal global standard for how incidents should be handled." },
                  ],
                  paid: [
                    { label: "Security Blue Team BTL1", url: "https://securityblue.team/blue-team-level-1/", why: "Premium training with high-quality simulations of actual attacks." }
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
              subtitle="The Pattern Matcher & Hunter"
              time="2-5 years"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                As an L2 Analyst, you stop waiting for alerts to ring and start hunting for them. You become the active investigator, looking for the silent anomalies in the system that automated platforms missed. This requires a much deeper contextual understanding of the environment.
              </p>
              <p>
                You need tools that let you cut through obfuscation and look directly at endpoints. Modern attackers rarely leave things in plain text. They encode and bury their payloads deeply to hide from filters. You have to be able to peel back those layers in seconds.
              </p>
              <p>
                You also begin using unified technical languages like MITRE ATT&CK. This framework allows you to describe exactly what the attacker is doing, tactic by tactic, which is critical for communicating with other security teams during a crisis.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(139,92,246,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CCDL2 / CyberDefenders L2" provider="CyberDefenders" href="https://cyberdefenders.org/blue-team-certification/ccdl2/" accentColor="#8b5cf6" isTop
                what="A focus on Threat Hunting and deep investigations. You pivot away from passive monitoring toward actively hunting through raw logs and network flows."
                why="At L2, you must understand the deep 'why' behind an attacker's behavior. This certification teaches you exactly how to hunt for advanced threats that easily evade standard SIEM rules."
              />
              <CertCard name="HTB CDSA" provider="Hack The Box" href="https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst" accentColor="#8b5cf6"
                what="A grueling, intensely practical 7-day exam emphasizing realistic incident response and threat hunting scenarios against advanced adversaries."
                why="Hack The Box is famously known for high difficulty. This certification carries that reputation into the blue team side, proving you can handle complex scenarios and write high-level reports."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(139,92,246,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Pattern Mapping"
                category="Advanced Analysis"
                correlatedTools={["MITRE ATT&CK", "TheHive"]}
                accentColor="#8b5cf6"
                what="Connecting multiple, seemingly unrelated security events to identify the complete lifecycle of a cyber attack."
                why="Attackers are quiet. They don't just kick the door down; they pick the lock and move slowly. L2 is where you stop looking at single logs and start seeing the lifecycle of the threat."
                resources={{
                  free: [
                    { label: "MITRE ATT&CK Training", url: "https://attack.mitre.org/resources/training/", why: "The official guide for mastering the industry's most important defensive framework." },
                    { label: "AttackIQ Academy", url: "https://www.academy.attackiq.com/", why: "A high-quality interactive school for learning adversarial behavior." },
                  ],
                  paid: [
                    { label: "Hack The Box CDSA Path", url: "https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst", why: "Comprehensive, difficult labs that prepare you for the highest seniority analyst roles." }
                  ]
                }}
              />
              <SkillCard
                name="Malware Triage"
                category="Malware Analysis"
                correlatedTools={["CyberChef", "ANY.RUN"]}
                accentColor="#8b5cf6"
                what="Analyzing suspicious files in isolated environments to determine their functionality and intent without system infection."
                why="When a user clicks a suspicious link, the team needs to know exactly what it's trying to do. Is it stealing passwords or encrypting the drive? You provide that critical intelligence."
                resources={{
                  free: [
                    { label: "Malware Unicorn RE101", url: "https://malwareunicorn.org/workshops/re101.html", why: "The community-favorite introduction to reverse engineering." },
                    { label: "ANY.RUN Sandbox", url: "https://any.run/", why: "A visual, interactive tool for seeing malware execute in real-time." },
                  ],
                  paid: [
                    { label: "TCM PMAT Course", url: "https://academy.tcm-sec.com/p/practical-malware-analysis-triage", why: "The absolute best value for learning to analyze malware without a degree in mathematics." }
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
              subtitle="The Narrative Storyteller"
              time="5-8 years"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                At this stage, you are no longer just stopping an incident. You are a digital coroner, accurately piecing together the timeline of how a system was compromised months ago. The L3 role is about telling the entire, undeniable story of an attack based entirely on digital evidence.
              </p>
              <p>
                Your primary tools are designed for the digital autopsy. You need to extract highly volatile memory and safely process hard drives. When a hospital is offline because of ransomware, you do not have days to process evidence. Speed and forensic integrity become your most valuable assets.
              </p>
              <p>
                To be a top-tier defender at this level, you really have to learn to think like a predator. You need to understand exploits from the inside out to make your own forensic analysis truly sharp. Knowing how a hacker breaks in makes it much easier to see where they hid.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(236,72,153,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Blue Team Level 2 (BTL2)" provider="Security Blue Team" href="https://securityblue.team/blue-team-level-2/" accentColor="#ec4899" isTop
                what="An intense multi-day exam focused on digital forensics, malware analysis, and deep threat hunting. You must analyze compromised endpoints and malicious binaries."
                why="This is effectively the PhD stage of blue teaming. It proves without any doubt that you can personally handle the technical demands of a catastrophic incident, from detection to a legally sound final report."
              />
              <CertCard name="GCFA - Forensic Analyst" provider="GIAC / SANS" href="https://www.giac.org/certifications/certified-forensic-analyst-gcfa/" accentColor="#ec4899"
                what="The enterprise gold standard for incident response, covering complex Windows forensics and advanced memory analysis."
                why="This is the industry heavyweight. It is expensive and usually paid for by a corporation, but it is the exact certification that top-tier Incident Response firms search for when hiring seniors."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(236,72,153,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Digital Forensics"
                category="Digital Evidence"
                correlatedTools={["Volatility", "KAPE"]}
                accentColor="#ec4899"
                what="The technical process of recovering deleted or hidden digital evidence from physical hard drives and volatile RAM."
                why="This is the digital autopsy. Sometimes an attacker deletes their logs, but they can't delete footprints from the memory. This skill is the only way to find modern, fileless malware."
                resources={{
                  free: [
                    { label: "13Cubed YouTube", url: "https://www.youtube.com/@13Cubed", why: "The single best free channel for learning advanced forensics techniques." },
                    { label: "DFIR Science", url: "https://dfir.science/", why: "A high-quality resource for understanding the formal science of digital investigation." },
                  ],
                  paid: [
                    { label: "SANS FOR508", url: "https://www.sans.org/cyber-security-courses/advanced-incident-response-threat-hunting-memory-forensics/", why: "The world-class heavyweight course for advanced incident response." }
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
              subtitle="Defensive Architecture & Strategy"
              time="8+ years"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                You are definitely no longer looking at individual alerts. You are fully engaged with building and scaling the entire defensive machine. A great SOC Lead's core job is to automate the repetitive tasks so the elite handlers can focus on genuine, sophisticated threats.
              </p>
              <p>
                This rely on massive automation platforms (SOAR). You become responsible for engineering intelligent playbooks that handle the initial triage work automatically. You basically create a self-managing defense mechanism that allows your team to stay effective without burning out.
              </p>
              <p>
                Equally as important is communication. Security teams do not make money; they save money. You need to clearly prove the value of the SOC to executives by turning massive logs into clear, digestible reports that show exactly how many millions you saved the company.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(245,158,11,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISSP" provider="ISC²" href="https://www.isc2.org/certifications/cissp" accentColor="#f59e0b" isTop
                what="A management-focused exam covering eight massive domains of security, focusing on risk management and asset security."
                why="This is the corporate golden ticket. It is less about specific tools and vastly more about how to manage enormous enterprise risk. This is the certification that reliably secures you the Director title."
              />
              <CertCard name="CISM" provider="ISACA" href="https://www.isaca.org/credentialing/cism" accentColor="#f59e0b"
                what="A focus on security governance, program development, and incident management from an overarching strategic viewpoint."
                why="This certification sharply focuses on strategic leadership. It teaches you how to handle a massive budget and, crucially, how to talk to a CEO without relying on technical jargon."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(245,158,11,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Defensive Strategy"
                category="Executive Leadership"
                correlatedTools={["XSOAR", "PowerBI"]}
                accentColor="#f59e0b"
                what="Designing the overarching systems, automated workflows, and tool stacks that the entire operations team relies upon."
                why="A bad tool choice can blind your team for years. You aren't just using the tools; you are building the 'Machine.' You decide where to spend the budget to get the most visibility with the least amount of noise."
                resources={{
                  free: [
                    { label: "MITRE 11 Strategies of a World-Class SOC", url: "https://www.mitre.org/news-insights/publication/11-strategies-world-class-cybersecurity-operations-center", why: "The definitive guide for building a high-level security defense force." },
                    { label: "NIST Cybersecurity Framework", url: "https://www.nist.gov/cyberframework", why: "The global gold standard for organizing a mature security organization." },
                  ],
                  paid: [
                    { label: "ISACA CISM Track", url: "https://www.isaca.org/credentialing/cism", why: "Specialized training for those moving into high-level security management." }
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
                    className="font-mono text-[9px] uppercase tracking-widest hover:text-white transition-colors"
                    style={{ color: `${l.color}88`, textDecoration: "underline" }}
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
