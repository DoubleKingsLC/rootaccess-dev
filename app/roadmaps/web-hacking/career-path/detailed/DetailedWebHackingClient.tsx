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
    const t1 = setTimeout(() => setPhase(1), 800);
    const t2 = setTimeout(() => setPhase(2), 2200);
    const t3 = setTimeout(() => setPhase(3), 3500);
    const t4 = setTimeout(() => setPhase(4), 5500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="relative w-full max-w-[500px] h-[460px] rounded-2xl overflow-hidden bg-[#090d14] border border-rose-500/20 font-mono text-[11px] p-6 flex flex-col shadow-2xl">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4 flex-shrink-0 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        <span className="ml-3 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">attacker@kali:~#</span>
      </div>
      <div className="flex-1 relative z-10 flex flex-col gap-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-200">
          <span className="text-white font-bold">$</span> sqlmap -u "https://rootaccess.tech/api/user?id=1" --dbs
        </motion.div>
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-200/60 leading-relaxed mt-1">
            <span className="text-blue-400 font-bold">[INFO]</span> testing connection to the target URL<br/>
            <span className="text-blue-400 font-bold">[INFO]</span> checking if the target is protected by a WAF<br/>
          </motion.div>
        )}
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-white bg-white/5 border-l-2 border-rose-500/40 pl-3 py-1.5 mt-1">
            <span className="text-rose-400 font-bold">[CRITICAL]</span> parameter 'id' is injectable (DBMS: 'PostgreSQL')
          </motion.div>
        )}
        {phase >= 3 && (
          <motion.div layout initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-4 p-3 border border-red-500/50 bg-red-500/10 rounded-lg flex gap-3 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
             <div className="w-2.5 h-2.5 rounded-full bg-red-500 mt-0.5 flex-shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
             <div>
               <div className="font-bold tracking-widest text-[10px] uppercase mb-1 text-red-500">Active Defense Triggered</div>
               <div className="text-red-200/90 text-[11px] leading-relaxed">
                 FATAL ERROR: Automated payload detected.<br/>This is a controlled environment. Please follow the roadmap.
               </div>
             </div>
          </motion.div>
        )}
        {phase >= 4 && (
          <motion.div layout initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-4 p-4 border border-rose-400/30 bg-rose-400/10 rounded-xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/10 to-rose-400/0 opacity-50" />
            <div className="text-[10px] font-bold tracking-[0.25em] text-rose-300 mb-2 relative z-10">
              [SYSTEM_GUIDANCE]
            </div>
            <div className="tracking-wide text-[12px] text-rose-100 relative z-10 leading-relaxed">
              Build your skills properly.<br/>
              Explore the <span className="font-bold text-white bg-rose-500/30 px-2 py-0.5 rounded border border-rose-500/40 shadow-sm mx-1">curated learning paths</span> below.
            </div>
          </motion.div>
        )}
      </div>
      <motion.div animate={{ top: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent z-0 pointer-events-none" />
    </div>
  );
}

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
              <span style={{ color: "rgba(244,63,94,0.95)" }}>The Path, Explained</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-xl" style={{ color: "rgba(226,232,240,0.8)" }}>
              Most people assume hacking is about typing fast in a dark room. In reality, it is about understanding a system so deeply that you can make it do things the original developer never intended. This is the grounded roadmap for moving from a curious beginner to a Pentest Lead, outlining the tools, scars, and skills required to survive as a professional.
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
              subtitle="Foundational Theory & Basic Logic"
              time="0-6 months" salary="£25K-£35K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                In the world of security, you will inevitably break things, and you need to understand exactly how they broke. Before you can ever spot a real attacker, you must learn the basic ground you stand on. This starts with the physics of the internet and the mechanics of operating systems.
              </p>
              <p>
                The entire internet essentially runs on Linux. If you cannot navigate a terminal comfortably, you are effectively operating with a blindfold on. It is the clear difference between clicking a shiny button on a dashboard and genuinely understanding the command that just executed across your entire fleet of endpoints.
              </p>
              <p>
                You also cannot defend or exploit what you do not understand. If you do not know how a normal packet moves from point A to point B, you will never be able to spot the packet that shouldn't be there. This level turns scary technical jargon into concepts you can actually explain to a friend over coffee.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Google Cybersecurity Certificate" provider="Coursera / Google" href="https://www.coursera.org/professional-certificates/google-cybersecurity" accentColor="#94a3b8" isTop
                what="A broad and accessible start to security. It guides you from the absolute basics of networking and the Linux command line through to fundamental threat detection and simple Python scripting."
                why="This is the best generalist starting point because it doesn't bog you down with overly dense engineering details. More importantly, finishing it proves to employers that you have the discipline to finish a multi-month course. HR departments universally recognize the Google brand, which helps with your initial resume screening."
              />
              <CertCard name="TryHackMe Pre-Security" provider="TryHackMe" href="https://tryhackme.com/certification/pre-security" accentColor="#94a3b8"
                what="Bite-sized, gamified lessons that remove the fear from technical concepts. You learn about networking layers, HTTP, DNS, and fundamental security terminology right in your browser."
                why="We recommend this because it has the lowest barrier to entry. It turns intimidating tech into small, manageable missions. It helps build your confidence and gives you a chance to spin up a lab environment safely before you spend money on more expensive training."
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
                why="You can't exploit what you don't understand. If you don't know how a DNS request is supposed to look, you'll never spot a malicious server hiding in plain sight. This is the physics of the digital world."
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
                why="You need to know what 'Normal' looks like to identify 'Abnormal.' Attackers hide in system folders or create hidden users. If you don't know your way around the Linux filesystem, you are a blind hacker."
                resources={{
                  free: [
                    { label: "The Linux Command Line", url: "https://linuxcommand.org/tlcl.php", why: "A free book that is widely considered the bible for terminal beginners." },
                    { label: "THM Linux Fundamentals", url: "https://tryhackme.com/module/linux-fundamentals", why: "Hands-on labs to get you over the fear of the black command prompt." },
                  ],
                  paid: [
                    { label: "TCM Academy Linux 101", url: "https://academy.tcm-sec.com/p/linux-101", why: "Practical, video-led instructions from people who use Linux for hacking every day." }
                  ]
                }}
              />
              <SkillCard
                name="Scripting Basics"
                category="Automation"
                correlatedTools={["Python", "Bash", "Terminal"]}
                accentColor="#94a3b8"
                what="Using code like Python or Bash to automate repetitive tasks and process large datasets."
                why="Speed is your greatest weapon. You don't want to manually check 500 logs. You want to write a 10-line script to do it in 5 seconds. Automating the boring stuff leaves you time for actual hacking."
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
              num="01" label="Junior Pentester" color="#f43f5e"
              subtitle="Breaking the Logic & Writing Proofs"
              time="0–2 years" salary="£35K–£55K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                As a Junior Pentester, you move from reading about vulnerabilities to proving they exist. You will begin and end your day in Burp Suite, catching web requests in mid-air and changing them before they reach the server.
              </p>
              <p>
                However, finding the bug is only half the battle. The other half is writing a report that is so clear a stressed-out developer can fix it in ten minutes. If you can't explain the risk, the bug doesn't matter to the business. You are developing 'The Eye' — the instinct to look at a login screen and know exactly which technique to try first.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(244,63,94,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="PWPA — Practical Web Pentest Associate" provider="TCM Security" href="https://certifications.tcm-sec.com/pwpa/" accentColor="#f43f5e" isTop
                what="A purely lab-based exam that tests if you can actually perform a web assessment. There are no multiple-choice questions; you are given a target and must find and document vulnerabilities."
                why="This is excellent value for proving you can sit down on Day 1 and start worked. Employers want to know if you can find a bug and write a professional report explaining it. PWPA proves exactly that without the high cost of traditional certs."
              />
              <CertCard name="eWPT — eLearnSecurity Web Pentester" provider="INE" href="https://ine.com/security/certifications/ewpt-certification" accentColor="#f43f5e"
                what="A respected practical exam covering advanced web exploitation, from authentication bypass to exploiting blind SQL injections."
                why="This serves as a massive confidence builder. Passing it requires you to not just exploit a network, but to professionally document every finding. It teaches you that a hacked server means nothing if you can't communicate the threat clearly."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(244,63,94,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="OWASP Top 10"
                category="Core Vulnerabilities"
                correlatedTools={["Browser", "Burp Suite", "SQLMap"]}
                accentColor="#f43f5e"
                what="Mastering the common vulnerabilities like SQL Injection, Cross-Site Scripting (XSS), and Broken Access Control."
                why="Almost every web vulnerability found in real life falls into these categories. You cannot be a pentester without mastering them inside and out."
                resources={{
                  free: [
                    { label: "PortSwigger Academy", url: "https://portswigger.net/web-security", why: "The single best web security training resource in existence, for free." },
                    { label: "OWASP Guides", url: "https://owasp.org/www-project-top-ten/", why: "The formal definitions used by every security company on the planet." },
                  ],
                  paid: [
                    { label: "TCM Practical Bug Bounty", url: "https://academy.tcm-sec.com/p/practical-bug-bounty", why: "Shows you the 'messy' reality of finding bugs that aren't in a clean lab environment." }
                  ]
                }}
              />
              <SkillCard
                name="Request Interception"
                category="Dynamic Testing"
                correlatedTools={["Burp Suite", "Caido", "FoxyProxy"]}
                accentColor="#f43f5e"
                what="Using local proxies to catch, modify, and replay HTTP/S requests in mid-air."
                why="Modern web apps rely on complex client-side interactions. If you only look at the buttons on the screen, you miss 80% of the attack surface. Interception lets you talk directly to the server's brain."
                resources={{
                  free: [
                    { label: "Rana Khalil (YouTube)", url: "https://www.youtube.com/c/RanaKhalil101", why: "Incredibly detailed walkthroughs of PortSwigger labs." },
                  ],
                  paid: [
                    { label: "Burp Suite Practitioner", url: "https://portswigger.net/web-security/certification", why: "The official path to becoming a certified master of our industry's most important tool." }
                  ]
                }}
              />
              <SkillCard
                name="Documentation"
                category="Reporting"
                correlatedTools={["Markdown", "SysReptor", "Ghostwriter"]}
                accentColor="#f43f5e"
                what="Learning to write concise Proof-of-Concepts (PoCs) that prove a business risk is real."
                why="Finding the bug is fun, but writing the report is what actually gets you paid. Clear documentation separates the hobbyists from the professionals."
                resources={{
                  free: [
                    { label: "PentesterLand Writeups", url: "https://pentester.land/writeups/", why: "Read actual reports from the world's most successful bug hunters to see how the pros write." },
                  ],
                  paid: [
                    { label: "TCM Reporting Course", url: "https://academy.tcm-sec.com/p/practical-bug-bounty", why: "Teaches you the corporate side of reporting that most courses skip." }
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
              subtitle="Complex Chaining & Cloud Infrastructures"
              time="2–5 years" salary="£55K–£80K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                At this stage, you stop looking for single bugs and start looking for chains. An attacker doesn't stop at an information leak; they use that leak to steal a session, which they use to bypass an IDOR, which leads to a full data breach.
              </p>
              <p>
                You are also moving into the Cloud. Most modern companies rent their servers from AWS or Azure. If you don't know how to find a misconfigured S3 bucket or a leaky identity policy, you're missing half of the modern attack surface. You are now a specialist, acting as a trusted advisor to the client.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(251,146,60,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="HTB Certified Web Specialist (CWES)" provider="Hack The Box" href="https://academy.hackthebox.com/preview/certifications/htb-certified-web-exploitation-specialist" accentColor="#fb923c" isTop
                what="An intensely difficult, scenario-based exam that puts you in the shoes of a real attacker. It tests your ability to read complex source code and leverage advanced techniques."
                why="At this level, generic scanners won't find the bugs anymore. You have to manually bend the logic of the application. CWES proves you can handle high-pressure scenarios and creatively engineer an exploit when the easy tools fail."
              />
              <CertCard name="Burp Suite Practitioner (BSCP)" provider="PortSwigger" href="https://portswigger.net/web-security/certification" accentColor="#fb923c"
                what="The official pro badge from the creators of Burp Suite. This exam is a pure sprint, testing your ability to rapidly identify and chain complex vulnerabilities under a strict time limit."
                why="Burp Suite is the definitive weapon for web hackers. Having the BSCP tells any manager in the world that you are a power-user of the tool, capable of bypassing modern firewalls and writing custom extensions."
              />
              <CertCard name="OSCP — OffSec Certified Professional" provider="OffSec" href="https://www.offsec.com/courses/pen-200/" accentColor="#fb923c"
                what="The infamous 24-hour exam where you must compromise a network with zero hints. It forces you to enumerate services, drop shells, and escalate privileges."
                why="It is the undisputed gold standard of the industry. While it is broader than just web hacking, passing the OSCP proves you have the technical stamina and the 'Try Harder' mindset needed to survive professional hacking."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(251,146,60,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Cloud Pentesting"
                category="Infrastructure Attack"
                correlatedTools={["AWS CLI", "Pacu", "BloodHound"]}
                accentColor="#fb923c"
                what="Hunting for misconfigurations in AWS, Azure, and GCP, targeting identity policies and leaky storage."
                why="Most modern companies live in the cloud. If you can't exploit an S3 bucket or move laterally in Azure, you're missing the big picture of modern security."
                resources={{
                  free: [
                    { label: "Wiz Academy", url: "https://www.wiz.io/academy", why: "Excellent training from the leaders in cloud security posture management." },
                    { label: "CloudHack", url: "https://cloudhack.thecloud.coach/", why: "A high-quality playground specifically for learning cloud attack vectors." },
                  ],
                  paid: [
                    { label: "AppSecEngineer Cloud", url: "https://www.appsecengineer.com/", why: "Deep, technical training for the engineer who needs to secure cloud workloads." }
                  ]
                }}
              />
              <SkillCard
                name="Vulnerability Chaining"
                category="Exploitation"
                correlatedTools={["Burp Suite", "Custom Scripts"]}
                accentColor="#fb923c"
                what="Connecting small, visually insignificant flaws together to create a massive security impact."
                why="Real attackers don't use one bug. They chain three or four together. Proving catastrophic impact is what separates a specialist from a junior."
                resources={{
                  free: [
                    { label: "IppSec (YouTube)", url: "https://www.youtube.com/@ippsec", why: "The absolute best resource for learning how a professional hacker thinks and chains attacks." },
                  ],
                  paid: [
                    { label: "HTB Advanced Web Attacks", url: "https://academy.hackthebox.com/path/preview/advanced-web-attacks-and-exploitation", why: "A grueling course for those who want to master high-level exploit development." }
                  ]
                }}
              />
              <SkillCard
                name="Client Scoping"
                category="Engagement Management"
                correlatedTools={["Notion", "Legal Frameworks"]}
                accentColor="#fb923c"
                what="Learning to manage the business side of an engagement, defining boundaries and rules of engagement."
                why="As a specialist, you are a consultant. Understanding exactly what is out-of-bounds technically prevents legal disasters and ensures the client gets the value they paid for."
                resources={{
                  free: [
                    { label: "Compliance Guides", url: "https://tcm-sec.com/", why: "Great summaries of the legal and administrative side of pentesting." },
                  ],
                  paid: [
                    { label: "SANS Consulting", url: "https://www.sans.org/cyber-security-courses/security-consulting/", why: "The premier course for turning your technical skills into a high-end consulting business." }
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
              subtitle="Red Teaming & Advanced Adversary Simulation"
              time="5–8 years" salary="£80K–£110K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                You are no longer just testing a product; you are simulating a real-world predator. As a Senior, you conduct Red Team engagements where you must stay hidden inside a network for weeks without being caught.
              </p>
              <p>
                You use Command and Control (C2) frameworks to manage your infected machines and move laterally through complex environments. You are also exploring the new frontier of AI security, finding ways to poison models or trick LLMs into leaking company secrets. You think in Tactics and Techniques, not just individual bugs.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="OSWE — OffSec Web Expert" provider="OffSec" href="https://www.offsec.com/courses/web-300/" accentColor="#a78bfa" isTop
                what="A grueling 'White Box' assessment where you are handed the source code of an application and must find deeply hidden logic flaws."
                why="As a Senior, you can't rely on guessing anymore. OSWE elevates your game by forcing you to understand backend code in Java, PHP, and Python. It proves you can find zero-day vulnerabilities in custom software."
              />
              <CertCard name="CRTP — Certified Red Team Professional" provider="Altered Security" href="https://www.alteredsecurity.com/redteamlab" accentColor="#a78bfa"
                what="A hands-on certification focused entirely on attacking enterprise Active Directory environments."
                why="Web hacking doesn't exist in a vacuum. Once you exploit a web server, you are usually dropped into a massive corporate network. CRTP shows you how to pivot from a web app to owning the entire Domain Controller."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Red Team TTPs"
                category="Adversary Simulation"
                correlatedTools={["Cobalt Strike", "Sliver", "Mythic"]}
                accentColor="#a78bfa"
                what="Simulating Advanced Persistent Threats by establishing stealthy footholds and moving laterally undetected."
                why="Finding a hole is easy; executing an entire invasion silently for two weeks is an art. Seniors test the defenders' ability to catch a real threat."
                resources={{
                  free: [
                    { label: "Orange Tsai Blog", url: "https://blog.orange.tw/", why: "The world's leader in finding complex, high-impact logic chains in enterprise software." },
                  ],
                  paid: [
                    { label: "Zero-Point Security", url: "https://www.zero-point-security.co.uk/red-team-ops", why: "The most practical training available for learning modern red team operations." }
                  ]
                }}
              />
              <SkillCard
                name="Threat Modeling"
                category="Offensive Architecture"
                correlatedTools={["STRIDE", "MITRE ATT&CK"]}
                accentColor="#a78bfa"
                what="Predicting and mapping out how an attacker will strike a complex architecture before they even attempt it."
                why="Seniors must think steps ahead of the defenders. Identifying the weak links in trust boundaries allows you to focus your exploitation where it truly hurts."
                resources={{
                  free: [
                    { label: "OWASP Playbook", url: "https://owasp.org/www-project-threat-modeling-playbook/", why: "The industry standard for formalizing threat modeling workflows." },
                  ],
                  paid: [
                    { label: "SANS SEC530", url: "https://www.sans.org/cyber-security-courses/defensible-security-architecture-and-engineering/", why: "Teaches you how to build architectures that are designed to fail safely." }
                  ]
                }}
              />
              <SkillCard
                name="Emerging Threat Vectors"
                category="Social Eng / AI"
                correlatedTools={["Garak", "Phishing Frameworks"]}
                accentColor="#a78bfa"
                what="Exploiting cutting-edge technologies like poisoning AI models to leak secrets, combined with human-element Social Engineering."
                why="The boundaries of hacking evolve daily. Tricking a human or a high-permission AI instance bypasses millions of dollars in conventional security."
                resources={{
                  free: [
                    { label: "Anmol Sachan AI Hub", url: "https://anmolksachan.medium.com/", why: "One of the few researchers documenting practical AI hacking techniques." },
                  ],
                  paid: [
                    { label: "OffSec AWAE/OSWE", url: "https://www.offsec.com/courses/web-300/", why: "The definitive course for those who want to reach the absolute apex of web exploitation." }
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
              subtitle="Enterprise Security Ownership & Strategy"
              time="8+ years" salary="£110K–£160K+"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                You've survived the trenches, and now you're the one who must build them. As a Lead, you aren't just hacking one app; you're designing the entire program that secures a thousand applications simultaneously across a global enterprise.
              </p>
              <p>
                Your success is no longer measured by how many bugs you find, but by how many bugs your system prevents. You are the bridge between the technical wizardry of the security team and the cold reality of the boardroom. You take a catastrophic vulnerability and translate it into a business risk report that a CEO can prioritize. You are the architect of the company’s digital defense.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(52,211,153,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISSP" provider="ISC²" href="https://www.isc2.org/certifications/cissp" accentColor="#34d399" isTop
                what="The management 'Golden Ticket' — a mammoth exam covering eight massive domains of security, from risk management to software development security."
                why="At the Lead level, nobody asks you to pop a shell anymore. They ask you how much it costs to mitigate a risk across a thousand servers. CISSP is the passport that gets you the Director title and proves you speak the language of business."
              />
              <CertCard name="GXPN — GIAC Exploit Researcher" provider="GIAC" href="https://www.giac.org/certifications/exploit-researcher-advanced-penetration-tester-gxpn/" accentColor="#34d399"
                what="A prestigious technical certification focused on advanced exploit development, memory corruption, and network evasion."
                why="Just because you are managing the program doesn't mean you should lose your technical edge. The GXPN commands massive respect from engineers. It proves you still have the lethal skills needed to guide your team through complex engagements."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(52,211,153,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Security Program Design"
                category="Strategy"
                correlatedTools={["Jira", "Risk Matrices"]}
                accentColor="#34d399"
                what="Designing the entire framework and operational workflows for securing a thousand interconnected applications."
                why="Success at this level is about systemic prevention. You need to plan scaling strategies and define what an internal security team focuses on annually."
                resources={{
                  free: [
                    { label: "NIST AI RMF", url: "https://www.nist.gov/itl/ai-risk-management-framework", why: "The definitive guide for managing the emerging risks of artificial intelligence." },
                  ],
                  paid: [
                    { label: "ISACA CISM", url: "https://www.isaca.org/credentialing/cism/cism-exam-planning-guide", why: "The gold standard for becoming a high-level Information Security Manager." }
                  ]
                }}
              />
              <SkillCard
                name="Executive Communication"
                category="Leadership"
                correlatedTools={["Executive Summaries"]}
                accentColor="#34d399"
                what="Translating catastrophic technical vulnerabilities into clear, actionable business risk reports for the C-Suite."
                why="To get the budget to fix the flaws, the Board needs to understand the financial impact. You are the critical bridge between the technical team and the boardroom."
                resources={{
                  free: [
                    { label: "CXOTALK (YouTube)", url: "https://www.youtube.com/@cxotalk", why: "A great channel for seeing how tech leaders talk about business problems." },
                  ],
                  paid: [
                    { label: "SANS Security Leadership", url: "https://www.sans.org/cyber-security-courses/security-leadership-essentials-managers/", why: "Teaches you the exact management skills required to lead a global security organization." }
                  ]
                }}
              />
              <SkillCard
                name="Governance & Compliance"
                category="Legal Frameworks"
                correlatedTools={["CREST", "NIST", "OWASP SAMM"]}
                accentColor="#34d399"
                what="Navigating international compliance standards to ensure testing is legal and meeting all regulatory thresholds."
                why="When operating at an enterprise scale, the law catches up with technical risk. Ensuring your internal program maps to legal requirements is mandatory at this seniority."
                resources={{
                  free: [
                    { label: "Andrej Karpathy AI Guide", url: "https://www.youtube.com/watch?v=zjkBMFhNj_g", why: "The best explanation of the technical reality of AI, which is mandatory for modern governance." },
                  ],
                  paid: [
                    { label: "CISSP Official Guide", url: "https://www.isc2.org/certifications/cissp", why: "The most comprehensive source for learning high-level security governance." }
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
