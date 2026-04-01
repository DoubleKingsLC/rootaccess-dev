"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const LEVELS = [
  { num: "00", label: "Entry Point",         color: "#94a3b8", time: "0-6 months",  salary: "£25K-£35K" },
  { num: "01", label: "Junior Pentester",    color: "#f43f5e", time: "0-2 years",   salary: "£35K-£55K" },
  { num: "02", label: "Exploitation Specialist", color: "#fb923c", time: "2-5 years",   salary: "£55K-£80K" },
  { num: "03", label: "Senior Pentester",    color: "#a78bfa", time: "5-8 years",   salary: "£80K-£110K" },
  { num: "04", label: "Pentest Lead",        color: "#34d399", time: "8+ years",    salary: "£110K-£160K+" },
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
          href="/roadmaps/web-hacking/career-path"
          className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(244,63,94,0.85)", textDecoration: "underline" }}
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

// Full SkillCard specifically for Level 00 (matches SOC)
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

      <div className="px-6 py-5" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${accentColor}15` }}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>
          What it is
        </p>
        <p className="text-[15px] leading-relaxed" style={{ color: "rgba(203,213,225,0.85)" }}>{what}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0" style={{ borderColor: `${accentColor}18` }}>
        {/* Why - Left Column */}
        <div className="px-6 py-6 border-b xl:border-b-0" style={{ borderColor: `${accentColor}15` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: `${accentColor}ee` }}>
            Why you need it here
          </p>
          <p className="text-[15px] leading-relaxed" style={{ color: "rgba(226,232,240,0.88)" }}>{why}</p>
        </div>

        {/* Resources - Right Column */}
        <div className="px-6 py-6 flex flex-col gap-5 border-t xl:border-t-0 xl:border-l" style={{ borderColor: `${accentColor}18` }}>
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

function WebHackingHeroAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);  // sqlmap initializing
    const t2 = setTimeout(() => setPhase(2), 2200); // payload found
    const t3 = setTimeout(() => setPhase(3), 3500); // WAF Block kicks in
    const t4 = setTimeout(() => setPhase(4), 5500); // Friendly advice
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="relative w-full max-w-[500px] h-[460px] rounded-2xl overflow-hidden bg-[#090d14] border border-rose-500/20 font-mono text-[11px] p-6 flex flex-col shadow-2xl">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />
      
      {/* Window Controls */}
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4 flex-shrink-0 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        <span className="ml-3 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">attacker@kali:~#</span>
      </div>

      <div className="flex-1 relative z-10 flex flex-col gap-2">
        {/* Phase 0 & 1: The Attack */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-200">
          <span className="text-white font-bold">$</span> sqlmap -u "https://rootaccess.tech/api/auth?id=1" --dbs
        </motion.div>

        {phase >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-200/60 leading-relaxed mt-1">
            <span className="text-blue-400 font-bold">[INFO]</span> testing connection to the target URL<br/>
            <span className="text-blue-400 font-bold">[INFO]</span> checking if the target is protected by some kind of WAF/IPS<br/>
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-white bg-white/5 border-l-2 border-rose-500/40 pl-3 py-1.5 mt-1">
            <span className="text-rose-400 font-bold">[CRITICAL]</span> heuristic test shows that GET parameter 'id' might be injectable (possible DBMS: 'PostgreSQL')
          </motion.div>
        )}

        {/* Phase 3: The WAF Block / Smackdown */}
        {phase >= 3 && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-4 p-3 border border-red-500/50 bg-red-500/10 rounded-lg flex gap-3 shadow-[0_0_15px_rgba(239,68,68,0.15)]"
          >
             <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-0.5 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
             <div>
               <div className="font-bold tracking-widest text-[10px] uppercase mb-1 text-red-500">Active Defense Triggered</div>
               <div className="text-red-200/90 text-[11px] leading-relaxed">
                 FATAL ERROR: You can't do that here.<br/>This is for information only. Stop breaking our site.
               </div>
             </div>
          </motion.div>
        )}

        {/* Phase 4: The Redirect */}
        {phase >= 4 && (
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="mt-4 p-4 border border-rose-400/30 bg-rose-400/10 rounded-xl text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/10 to-rose-400/0 opacity-50" />
            <div className="text-[10px] font-bold tracking-[0.25em] text-rose-300 mb-2 relative z-10">
              [SYSTEM_GUIDANCE]
            </div>
            <div className="tracking-wide text-[12px] text-rose-100 relative z-10 leading-relaxed">
              Start actually practicing.<br/>
              Look for <span className="font-bold text-white bg-rose-500/30 px-2 py-0.5 rounded border border-rose-500/40 shadow-sm mx-1">actual labs to practice on</span> using our pathway.
            </div>
          </motion.div>
        )}
      </div>

      {/* Decorative scanning line */}
      <motion.div
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent z-0 pointer-events-none"
      />
    </div>
  );
}

// ── Page Content ──────────────────────────────────────────────────────────────

export default function DetailedWebHackingClient() {
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
          href="/roadmaps/web-hacking/career-path"
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
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] mb-6 font-bold" style={{ color: "rgba(244,63,94,0.7)" }}>
              Web Hacking Deep Dive
            </p>
            <h1
              className="text-6xl sm:text-7xl xl:text-8xl font-bold text-white mb-8 leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-heading, system-ui)" }}
            >
              Web Hacking:<br />
              <span style={{ color: "rgba(244,63,94,0.95)" }}>The Career Path, Explained</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-xl" style={{ color: "rgba(226,232,240,0.8)" }}>
              Most people think hacking is about typing fast in a dark room. It's not. It's about understanding a system so deeply that you can make it do things the original developer never intended. This guide is the "No-BS" roadmap for moving from curious beginner to a Pentest Lead, covering the specific tools, scars, and skills you actually need to survive in the field.
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
            <WebHackingHeroAnimation />
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
              <CertCard name="Google Cybersecurity Certificate" provider="Coursera / Google" href="https://www.coursera.org/professional-certificates/google-cybersecurity" accentColor="#94a3b8" isTop
                what="An overarching start to security. It guides you from the absolute basics of networking and Linux command line straight through to fundamental threat detection and simple Python scripting. It is incredibly comprehensive and quite affordable."
                why="This is the absolute best generalist start. It doesn't bog you down with overly dense engineering details. More importantly finishing it proves to employers you can actually commit to a multi-month learning discipline while showing them you understand the broad strokes of a blue team role. It carries heavy weight because HR departments recognize the brand name."
              />
              <CertCard name="TryHackMe Pre-Security" provider="TryHackMe" href="https://tryhackme.com/certification/pre-security" accentColor="#94a3b8"
                what="Bite-sized gamified lessons focusing heavily on removing fear from foundational concepts. You get to interactively learn networking layers HTTP DNS and fundamental security terminology right in your normal browser."
                why="We put this here because it has the absolute lowest barrier to entry. It turns intimidating tech into small manageable missions. It's about building your vital confidence and allowing you to spin up an interactive lab safely before you spend your hard-earned cash or get totally overwhelmed."
              />
              <CertCard name="TCM Practical Security Fundamentals" provider="TCM Security Academy" href="https://academy.tcm-sec.com/p/practical-security-fundamentals" accentColor="#94a3b8"
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
                    { label: "Professor Messer Net+", url: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/" },
                    { label: "NetworkChuck", url: "https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P" },
                  ],
                  paid: [
                    { label: "Jason Dion Net+", url: "https://www.udemy.com/course/comptia-network-cert-n10-008-the-total-course/" }
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
                    { label: "The Linux Command Line", url: "https://linuxcommand.org/tlcl.php" },
                    { label: "THM Linux Fundamentals", url: "https://tryhackme.com/module/linux-fundamentals" },
                  ],
                  paid: [
                    { label: "TCM Academy Linux 101", url: "https://academy.tcm-sec.com/p/linux-101" }
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
                    { label: "Automate the Boring Stuff", url: "https://automatetheboringstuff.com/" },
                    { label: "CS50P — Python", url: "https://cs50.harvard.edu/python/2022/" }
                  ],
                  paid: [
                    { label: "TCM Python 101", url: "https://academy.tcm-sec.com/p/python-101-for-hackers" }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 01 ══════════════════════════════════════════════════════ */}
          <section id="level-01" className="py-16 xl:py-20">
            <SectionHeader
              num="01" label="Junior Pentester" color="#f43f5e"
              subtitle="First Exploits, First Reports"
              time="0–2 years" salary="£35K–£55K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                Welcome to the middle of the fight. As a Junior Pentester, you’ve stopped just reading about bugs and started finding them. You’re learning to use Burp Suite to 'catch' web requests in mid-air and change them before they reach the server.
              </p>
              <p>
                But here is the secret: Finding the bug is only 50% of the job. The other 50% is writing a report that is so clear a stressed-out developer can fix it in ten minutes. If you can’t explain the risk, the bug doesn't matter. You are developing 'The Eye'—the ability to look at a login screen and instinctively know three different ways to try and break it.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(244,63,94,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="PWPA — Practical Web Pentest Associate" provider="TCM Security" href="https://certifications.tcm-sec.com/pwpa/" accentColor="#f43f5e" isTop
                what="A brutal, 100% lab-based exam that strips away the multiple-choice fluff and tests if you can actually hack. It forces you to enumerate services, find realistic web vulnerabilities, and chain them together in a live, sandboxed environment without having your hand held."
                why="This is the best value in the industry right now for proving you can sit down on Day 1 and perform a real web assessment. Employers don't care if you memorized port numbers; they want to know if you can find the bug and write a professional report explaining it. PWPA proves exactly that."
              />
              <CertCard name="eWPT — eLearnSecurity Web Penetration Tester" provider="INE" href="https://ine.com/security/certifications/ewpt-certification" accentColor="#f43f5e"
                what="A highly respected practical exam that dives deep into advanced web application exploitation. It covers everything from bypassing complex authentication mechanisms to exploiting blind SQL injections and chaining XSS attacks to steal admin cookies."
                why="It serves as a massive confidence builder and a great 'middle ground' certification. Passing it requires you to not just exploit a network, but to professionally document every single finding. It teaches you that a hacked server means nothing if you can't articulate the business risk."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(244,63,94,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="OWASP Top 10"
                category="Core Vulnerabilities"
                correlatedTools={["Browser", "Burp Suite", "SQLMap"]}
                accentColor="#f43f5e"
                what="Mastering the most common 'death blows' like SQL Injection, XSS, and Broken Access Control."
                why="The vast majority of web vulnerabilities encountered in real assessments fall into these core categories. You cannot be a pentester without deeply understanding them."
                resources={{
                  free: [
                    { label: "PortSwigger Web Security Academy", url: "https://portswigger.net/web-security" },
                    { label: "OWASP Foundation Guides", url: "https://owasp.org/www-project-top-ten/" },
                  ],
                  paid: [
                    { label: "TCM Practical Bug Bounty", url: "https://academy.tcm-sec.com/p/practical-bug-bounty" }
                  ]
                }}
              />
              <SkillCard
                name="Request Interception"
                category="Dynamic Testing"
                correlatedTools={["Burp Suite", "Caido", "FoxyProxy"]}
                accentColor="#f43f5e"
                what="Using local proxies to catch, modify, and replay HTTP/S requests in mid-air before they reach the server."
                why="Modern web apps rely on complex client-side interactions. If you only look at the UI, you miss 80% of the attack surface. Interception lets you talk directly to the backend."
                resources={{
                  free: [
                    { label: "Rana Khalil (YouTube)", url: "https://www.youtube.com/c/RanaKhalil101" },
                  ],
                  paid: [
                    { label: "Burp Suite Certified Practitioner Training", url: "https://portswigger.net/web-security/certification" }
                  ]
                }}
              />
              <SkillCard
                name="Vulnerability Documentation"
                category="Reporting"
                correlatedTools={["Markdown", "SysReptor", "Ghostwriter"]}
                accentColor="#f43f5e"
                what="Learning to write concise, reproducible Proof-of-Concepts (PoCs) that clearly prove the business risk is real."
                why="Finding the bug is only 50% of the job. Writing a report that is so clear a stressed-out developer can fix it in ten minutes is what actually gets you paid and rehired."
                resources={{
                  free: [
                    { label: "PentesterLand Writeups", url: "https://pentester.land/writeups/" },
                  ],
                  paid: [
                    { label: "TCM Practical Bug Bounty", url: "https://academy.tcm-sec.com/p/practical-bug-bounty" }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 02 ══════════════════════════════════════════════════════ */}
          <section id="level-02" className="py-16 xl:py-20">
            <SectionHeader
              num="02" label="Exploitation Specialist" color="#fb923c"
              subtitle="Full Engagements, Cloud & Chaining"
              time="2–5 years" salary="£55K–£80K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                At this stage, you stop looking for 'single' bugs and start looking for 'chains.' An attacker doesn't just stop at a small information leak; they use that leak to steal a session, which they use to bypass an IDOR, which leads to a full data breach.
              </p>
              <p>
                You’re also moving into the Cloud. Most modern companies don't own their servers anymore—they rent them from AWS or Azure. If you don't know how to find a misconfigured S3 bucket or a leaky IAM policy, you're missing half the attack surface. You are now an Exploitation Specialist, which means you aren't just a hacker; you’re a trusted advisor for the client.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(251,146,60,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CWES — HTB Certified Web Exploitation Specialist" provider="Hack The Box" href="https://academy.hackthebox.com/preview/certifications/htb-certified-web-exploitation-specialist" accentColor="#fb923c" isTop
                what="An intensely difficult, scenario-based practical exam from Hack The Box that puts you in the shoes of a real-world attacker. It tests your ability to read thick, complex source code (Whitebox testing) and leverage advanced techniques like Server-Side Template Injections (SSTI) and insecure deserialization."
                why="At this level, generic automated scanners won't find the bugs anymore—you have to manually bend the logic of the application. The CWES proves you can handle high-pressure, complex defensive layers and actually creatively engineer an exploit when the easy tools fail."
              />
              <CertCard name="BSCP — Burp Suite Certified Practitioner" provider="PortSwigger" href="https://portswigger.net/web-security/certification" accentColor="#fb923c"
                what="The official 'Pro' badge from PortSwigger, the actual creators of Burp Suite. This exam is a pure sprint—testing your ability to rapidly identify, exploit, and chain complex vulnerabilities within strict time limits using the industry's most essential tool."
                why="Burp Suite is the definitive weapon of choice for web hackers. Having the BSCP tells any hiring manager in the world that you aren't just clicking 'Scan'; you are a certified power-user of the tool, capable of writing custom extensions and bypassing modern Web Application Firewalls (WAFs)."
              />
              <CertCard name="OSCP — OffSec Certified Professional" provider="OffSec" href="https://www.offsec.com/courses/pen-200/" accentColor="#fb923c"
                what="The infamous 24-hour exam where you are dropped into a hostile network with strict rules and zero hints. It forces you to enumerate web services, drop shells, and ultimately escalate privileges to gain full Administrator control across multiple machines."
                why="It is the undisputed 'Gold Standard' of the offensive industry. While it's broader than just web hacking, passing the OSCP proves to employers that you have the raw technical stamina, frustration tolerance, and the 'Try Harder' mindset required to survive as a professional hacker."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(251,146,60,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Cloud Pentesting"
                category="Infrastructure Attack"
                correlatedTools={["AWS CLI", "Pacu", "BloodHound"]}
                accentColor="#fb923c"
                what="Hunting for misconfigurations in AWS, Azure, and GCP infrastructures, specifically targeting IAM policies and leaky buckets."
                why="Most modern companies don't own their servers anymore. If you don't know how to exploit a misconfigured S3 bucket or lateral movement in Azure, you're missing half the attack surface."
                resources={{
                  free: [
                    { label: "Wiz Academy", url: "https://www.wiz.io/academy" },
                    { label: "CloudHack", url: "https://cloudhack.thecloud.coach/" },
                  ],
                  paid: [
                    { label: "AppSecEngineer Cloud Pentesting", url: "https://www.appsecengineer.com/" }
                  ]
                }}
              />
              <SkillCard
                name="Vulnerability Chaining"
                category="Exploitation"
                correlatedTools={["Burp Suite", "Custom Scripts"]}
                accentColor="#fb923c"
                what="Connecting visually insignificant small flaws together to escalate an attack into a massive impact."
                why="An attacker doesn't stop at an information leak; they use it to steal a session, bypass an IDOR, and achieve full data breach. Exploitation Specialists need to prove catastrophic impact."
                resources={{
                  free: [
                    { label: "IppSec (YouTube)", url: "https://www.youtube.com/@ippsec" },
                  ],
                  paid: [
                    { label: "HTB Academy Advanced Web Attacks", url: "https://academy.hackthebox.com/path/preview/advanced-web-attacks-and-exploitation" }
                  ]
                }}
              />
              <SkillCard
                name="Client Scoping"
                category="Engagement Management"
                correlatedTools={["Notion", "Legal Frameworks"]}
                accentColor="#fb923c"
                what="Learning to manage the business side of a hacking engagement, defining boundaries, Rules of Engagement (RoE), and managing client expectations."
                why="As an Exploitation Specialist, you are a trusted advisor. Understanding exactly what is out-of-bounds technically prevents legal disasters and ensures the client gets the targeted value they paid for."
                resources={{
                  free: [
                    { label: "TCM Security Compliance Guides", url: "https://tcm-sec.com/" },
                  ],
                  paid: [
                    { label: "SANS Security Consulting", url: "https://www.sans.org/cyber-security-courses/security-consulting/" }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 03 ══════════════════════════════════════════════════════ */}
          <section id="level-03" className="py-16 xl:py-20">
            <SectionHeader
              num="03" label="Senior Pentester" color="#a78bfa"
              subtitle="Red Teaming & Adversary Simulation"
              time="5–8 years" salary="£80K–£110K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                You are no longer just 'testing' a product; you are simulating a real-world predator. As a Senior, you conduct Red Team engagements where you try to stay hidden inside a network for weeks without being caught.
              </p>
              <p>
                You’re using C2 (Command & Control) frameworks to manage your 'infected' machines and moving laterally through Active Directory. You’re also looking at the new frontier: AI. You’re finding ways to 'poison' an AI's brain or trick it into leaking company secrets. You think in Tactic, Techniques, and Procedures (TTPs). You don't just find a hole; you simulate an entire invasion.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="OSWE — OffSec Web Expert" provider="OffSec" href="https://www.offsec.com/courses/web-300/" accentColor="#a78bfa" isTop
                what="A grueling 'White Box' assessment where you are handed the actual source code of a web application and tasked with finding deeply hidden logic flaws. You must write a custom script that chains multiple vulnerabilities together to completely compromise the application with a single command."
                why="As a Senior, you can't rely strictly on black-box guessing anymore. The OSWE completely elevates your game by forcing you to understand PHP, Java, and Python backend code. It proves you can find 0-days in custom, proprietary software and write the exploits from scratch yourself."
              />
              <CertCard name="CRTP — Certified Red Team Professional" provider="Altered Security" href="https://www.alteredsecurity.com/redteamlab" accentColor="#a78bfa"
                what="A purely hands-on certification entirely focused on attacking enterprise Active Directory environments. You learn how to abuse built-in Windows protocols, forge Kerberos tickets, and establish persistent footholds without ever needing to rely on third-party patched exploits."
                why="Web hacking doesn't exist in a vacuum. Once you successfully exploit a web server, you are usually dropped into a massive internal corporate network. The CRTP is the essential badge that shows you know exactly how to pivot from a compromised web app to owning the entire Domain Controller."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Red Team TTPs"
                category="Adversary Simulation"
                correlatedTools={["Cobalt Strike", "Sliver", "Mythic"]}
                accentColor="#a78bfa"
                what="Simulating Advanced Persistent Threats (APTs) by establishing stealthy footholds, utilizing memory injection, and moving laterally undetected."
                why="You are no longer just 'testing' a product; you are testing the SOC's ability to catch a real-world predator. Finding a hole is easy; executing an entire invasion silently is an art."
                resources={{
                  free: [
                    { label: "Orange Tsai (Blog)", url: "https://blog.orange.tw/" },
                  ],
                  paid: [
                    { label: "Zero-Point Security (CRTO)", url: "https://www.zero-point-security.co.uk/red-team-ops" }
                  ]
                }}
              />
              <SkillCard
                name="Threat Modeling"
                category="Offensive Architecture"
                correlatedTools={["STRIDE", "MITRE ATT&CK"]}
                accentColor="#a78bfa"
                what="Predicting and mapping out how an attacker will strike a complex architecture before they even attempt it."
                why="Seniors must think steps ahead of the defenders. By modeling the threat landscape, you identify the exact weak links in trust boundaries and focus your exploitation where it hurts most."
                resources={{
                  free: [
                    { label: "OWASP Threat Modeling Playbook", url: "https://owasp.org/www-project-threat-modeling-playbook/" },
                  ],
                  paid: [
                    { label: "SANS SEC530", url: "https://www.sans.org/cyber-security-courses/defensible-security-architecture-and-engineering/" }
                  ]
                }}
              />
              <SkillCard
                name="Emerging Threat Vectors"
                category="Social Eng / AI"
                correlatedTools={["Garak", "Custom Phishing Frameworks"]}
                accentColor="#a78bfa"
                what="Exploiting cutting-edge technologies like poisoning AI models to leak secrets, combined with human-element Social Engineering."
                why="The boundaries of hacking constantly evolve. Tricking a human or a high-permission LLM instance bypasses millions of dollars in conventional network security infrastructure."
                resources={{
                  free: [
                    { label: "LLM PenTest Hub", url: "https://anmolksachan.medium.com/" },
                  ],
                  paid: [
                    { label: "OffSec AWAE", url: "https://www.offsec.com/courses/web-300/" }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 04 ══════════════════════════════════════════════════════ */}
          <section id="level-04" className="py-16 xl:py-20">
            <SectionHeader
              num="04" label="Pentest Lead" color="#34d399"
              subtitle="Program Ownership & Strategy"
              time="8+ years" salary="£110K–£160K+"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                You’ve survived the trenches, and now you’re the one who has to build them. As a Lead, you aren't just hacking one app; you're designing the entire program that secures a thousand apps.
              </p>
              <p>
                Your success is no longer measured by how many bugs you find, but by how many bugs your system prevents. You are the bridge between the technical 'wizardry' of the Red Team and the cold reality of the Boardroom. You take a catastrophic vulnerability and translate it into a business risk report that a CEO can understand. You’re the architect of the company’s defense.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(52,211,153,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISSP" provider="ISC²" href="https://www.isc2.org/certifications/cissp" accentColor="#34d399" isTop
                what="The management 'Golden Ticket'—a mammoth, mile-wide exam covering eight massive domains of security. It covers everything from cryptography and secure software development lifecycles (SDLC) to physical security and broad risk management architecture."
                why="At the Lead level, nobody asks you to pop a reverse shell anymore. They ask you how much it financially costs to mitigate a risk across a thousand AWS instances. The CISSP is the exact vocabulary test that gets you the Director title and proves you can actually speak the language of the Boardroom."
              />
              <CertCard name="GXPN — GIAC Exploit Researcher" provider="GIAC" href="https://www.giac.org/certifications/exploit-researcher-advanced-penetration-tester-gxpn/" accentColor="#34d399"
                what="A highly prestigious technical certification focusing heavily on advanced exploit development, memory corruption, network evasion, and the deep, low-level mechanics of exactly how operating systems manage memory."
                why="Just because you are managing the program doesn't mean you should lose your technical teeth. The GXPN commands massive respect in the Red Team community. It proves to your most senior engineers that you still have the lethal, technical edge needed to guide them through complex engagements."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(52,211,153,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Program Design"
                category="Strategy"
                correlatedTools={["Jira", "Risk Matrices"]}
                accentColor="#34d399"
                what="Designing the entire framework and operational workflows for securing a thousand interconnected applications simultaneously."
                why="Your success is no longer measured by bugs found, but by bugs prevented systemically. You need to identify tool limitations, plan scaling strategies, and define what an internal security team focuses on."
                resources={{
                  free: [
                    { label: "NIST AI RMF", url: "https://www.nist.gov/itl/ai-risk-management-framework" },
                  ],
                  paid: [
                    { label: "ISACA CISM Curriculum", url: "https://www.isaca.org/credentialing/cism/cism-exam-planning-guide" }
                  ]
                }}
              />
              <SkillCard
                name="Executive Communication"
                category="Leadership"
                correlatedTools={["PowerPoint", "Executive Summaries"]}
                accentColor="#34d399"
                what="Translating catastrophic technical vulnerabilities into clear, actionable business risk reports that the C-Suite can economically understand."
                why="To get the budget to fix the flaws, the Board needs to understand the financial impact. You are the critical bridge between Red Team wizardry and the cold reality of the boardroom."
                resources={{
                  free: [
                    { label: "CXOTALK (YouTube)", url: "https://www.youtube.com/@cxotalk" },
                  ],
                  paid: [
                    { label: "SANS MGT512", url: "https://www.sans.org/cyber-security-courses/security-leadership-essentials-managers/" }
                  ]
                }}
              />
              <SkillCard
                name="Compliance & Governance"
                category="Legal Frameworks"
                correlatedTools={["CREST", "NIST", "OWASP SAMM"]}
                accentColor="#34d399"
                what="Navigating international compliance standards to ensure testing is strictly legal, audited properly, and meets regulatory thresholds."
                why="When operating at an enterprise scale, the law catches up with technical risk. Managing external audits and ensuring your internal program maps to legal requirements is mandatory."
                resources={{
                  free: [
                    { label: "Andrej Karpathy (YouTube)", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g" },
                  ],
                  paid: [
                    { label: "ISC2 CISSP Official Guide", url: "https://www.isc2.org/certifications/cissp" }
                  ]
                }}
              />
            </div>
          </section>

          {/* ── Footer ── */}
          <div className="py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/roadmaps/web-hacking/career-path"
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-colors duration-150 hover:text-white"
                style={{ color: "rgba(244,63,94,0.75)", textDecoration: "underline" }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
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
