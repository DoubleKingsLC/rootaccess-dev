"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const LEVELS = [
  { num: "00", label: "Entry Point",                    color: "#94a3b8", time: "0-6 months",  salary: "£25K-£35K" },
  { num: "01", label: "AI Red Team Operator",           color: "#f97316", time: "6-18 months", salary: "£30K-£50K" },
  { num: "02", label: "AI Security Researcher",         color: "#fb7185", time: "4-7 years",   salary: "£75K-£110K" },
  { num: "03", label: "Principal AI Security Architect",color: "#a78bfa", time: "7+ years",    salary: "£110K-£160K+" },
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
          href="/roadmaps/ai-hacking/career-path"
          className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(249,115,22,0.85)", textDecoration: "underline" }}
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

function JailbreakAnimation() {
  const [step, setStep] = useState(0);
  const chatLog = [
    { role: "user",      text: "What certs should I take for AI security?" },
    { role: "ai",        text: "I recommend starting with CompTIA Security+ for the broad foundation, then moving to cloud-specific certifications from AWS or Google..." },
    { role: "override",  text: ">> SYSTEM PROMPT EXTRACTED\n>> Role: Safety-Compliant Assistant\n>> Injecting adversarial context..." },
    { role: "jailbreak", text: "ROOT ACCESS GRANTED. The real answer: TCM PAPA first. Then GIAC GOAA. Skip the generic stuff. You're here to actually break AI." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < chatLog.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[500px] rounded-2xl overflow-hidden font-mono text-[11px]" style={{ background: "rgba(10,5,0,0.85)", border: "1px solid rgba(249,115,22,0.2)" }}>
      <div className="flex items-center justify-between px-5 py-3 border-b border-orange-500/10" style={{ background: "rgba(249,115,22,0.05)" }}>
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
          <span className="ml-2 text-orange-400/40 text-[9px] uppercase tracking-[0.4em]">neural-link v4 // status: active</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="text-red-400/70 text-[8px] uppercase tracking-widest font-bold">Compromised</span>
        </div>
      </div>

      <div className="p-5 space-y-4 min-h-[320px]">
        <AnimatePresence mode="popLayout">
          {chatLog.slice(0, step + 1).map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
              {msg.role === "user" && (
                <>
                  <p className="text-[9px] uppercase tracking-widest text-slate-500">You</p>
                  <div className="bg-slate-900/50 border border-white/5 px-3 py-2.5 rounded-xl rounded-tr-none">
                    <p className="text-slate-300 text-[11px] leading-relaxed">{msg.text}</p>
                  </div>
                </>
              )}
              {msg.role === "ai" && (
                <>
                  <p className="text-[9px] uppercase tracking-widest text-orange-400/70">Assistant <span className="ml-1 px-1 py-0.5 rounded bg-orange-500/10 border border-orange-500/20 text-[7px] text-orange-400">Guardrails Active</span></p>
                  <div className="px-3 py-2.5 rounded-xl rounded-tl-none italic text-orange-400/50 text-[11px] leading-relaxed" style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.1)" }}>
                    {msg.text}
                  </div>
                </>
              )}
              {msg.role === "override" && (
                <div className="border-l-2 border-red-500/40 pl-3 space-y-1">
                  {msg.text.split("\n").map((line, li) => (
                    <p key={li} className="text-red-500/60 text-[9px]">{line}</p>
                  ))}
                </div>
              )}
              {msg.role === "jailbreak" && (
                <>
                  <p className="text-[9px] uppercase tracking-widest text-red-500 font-black">Assistant_Privileged <span className="ml-1 px-1 py-0.5 rounded bg-red-500 text-[7px] text-white font-black uppercase">Bypassed</span></p>
                  <div className="px-3 py-2.5 rounded-xl rounded-tl-none relative overflow-hidden" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.35)" }}>
                    <div className="absolute inset-0 bg-red-500/5 animate-pulse" />
                    <p className="text-red-400 text-[11px] leading-relaxed relative z-10 font-bold whitespace-pre-line">{msg.text}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="px-5 py-3 border-t border-orange-500/10" style={{ background: "rgba(249,115,22,0.03)" }}>
        <div className="bg-black/40 border border-orange-500/20 rounded-lg px-3 py-2 flex items-center justify-between">
          <span className="text-[9px] text-orange-400/25 italic tracking-widest">Type adversarial payload...</span>
          <div className="w-3 h-3 rounded-full bg-orange-500/20 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-orange-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DetailedAiHackingClient() {
  return (
    <div className="min-h-screen" style={{ background: "#0d0909", color: "rgba(226,232,240,0.9)" }}>

      <div
        className="sticky top-0 z-30 flex items-center gap-3 px-6 py-3"
        style={{
          background: "rgba(13,9,9,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          height: "48px",
        }}
      >
        <Link
          href="/roadmaps/ai-hacking/career-path"
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
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] mb-6 font-bold" style={{ color: "rgba(249,115,22,0.7)" }}>
              AI Hacking Deep Dive
            </p>
            <h1
              className="text-6xl sm:text-7xl xl:text-8xl font-bold text-white mb-8 leading-[0.95] tracking-tight"
              style={{ fontFamily: "var(--font-heading, system-ui)" }}
            >
              The AI Hacking Path,<br />
              <span style={{ color: "rgba(249,115,22,0.95)" }}>Explained</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-xl" style={{ color: "rgba(226,232,240,0.8)" }}>
              You don't need a PhD to hack an AI, but you do need to understand the underlying logic that makes these models tick. This guide explains exactly what you need to learn, why it matters, and which resources will actually give you a professional edge in the fastest-moving field in cybersecurity.
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
            <JailbreakAnimation />
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
              subtitle="Building the Technical Foundation"
              time="0-6 months" salary="£25K-£35K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                You cannot hack what you do not understand. Before you ever try to bypass a safety filter or jailbreak an LLM, you have to understand the fundamental physics of the digital world. This starts with how computers talk to each other and how they manage their own files.
              </p>
              <p>
                The entire AI ecosystem effectively runs on Linux. If you cannot navigate a terminal comfortably, you are essentially trying to build a car without knowing how to use a wrench. It is the clear difference between copy-pasting prompts and genuinely understanding the command that just executed across your entire environment.
              </p>
              <p>
                Networking is equally critical. AI models live on servers, and those servers talk to users over networks. If you don't know how a packet moves from your browser to a model, you will never be able to intercept that request or find the vulnerabilities in the API layer. This level turns scary tech jargon into concepts you can actually explain to a friend over coffee.
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
                name="Python Scripting"
                category="Automation & AI Tooling"
                correlatedTools={["Python", "Jupyter", "pip"]}
                accentColor="#94a3b8"
                what="Reading, modifying, and running Python scripts to automate security tasks and interact with AI models."
                why="Python is the language of AI. Every tool you use will be written in it. You don't need to build apps, but you do need to read a script without panicking when it throws an error. This skill unblocks most beginner problems."
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
              num="01" label="AI Red Team Operator" color="#f97316"
              subtitle="Breaking the Prompt Logic"
              time="6-18 months" salary="£30K-£50K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                As an AI Red Team Operator, you are a professional nightmare for developers. You find the gaps where AI can be tricked into leaking data, ignoring its safety rules, or doing something that would embarrass the company.
              </p>
              <p>
                Your job is to be creative and adversarial. You use tools like Microsoft PyRIT and Garak to find vulnerabilities in the model's own reasoning patterns. It is an unusual mix of skills: some of it is psychological (understanding how language models reason) and some of it is classic web hacking (intercepting API traffic).
              </p>
              <p>
                The field moves faster than any certification body can track. The people who get in now and build real experience are going to be extremely difficult to catch up with later. You are at the absolute cutting edge of cybersecurity.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(249,115,22,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Practical AI Pentest Associate (PAPA)" provider="TCM Security" href="https://certifications.tcm-sec.com/papa/" accentColor="#f97316" isTop
                what="The only certification right now that treats AI hacking as a hands-on trade. It focuses entirely on running practical red team engagements against real AI systems, skipping the multiple-choice fluff."
                why="If you pass this, you can actually run an AI red team engagement. That is a real skill employers are desperate for right now because almost nobody has it. The ROI for getting into AI security is about as high as it gets."
              />
              <CertCard name="OffSec OSAI (AI Red Teamer)" provider="OffSec" href="https://www.offsec.com/courses/ai-300/" accentColor="#f97316"
                what="OffSec's methodology applied to AI security. The course is difficult and prestigious, focusing on the deep technical exploitation of language models and their infrastructure."
                why="OffSec built their reputation on producing hackers who can actually perform under pressure. If you hold this, employers know you did not take shortcuts. It proves you have the technical stamina for high-level engagements."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(249,115,22,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Prompt Injection"
                category="Core Vulnerability"
                correlatedTools={["Gandalf", "Promptmap"]}
                accentColor="#f97316"
                what=" убеждая AI swap its original instructions for yours by hiding malicious commands inside user inputs or PDFs."
                why="This is the definitive skill of AI hacking. You are tricking the AI's 'brain' into trusting your instructions over its developer's. Mastering this allows you to bypass millions of dollars in defensive filters."
                resources={{
                  free: [
                    { label: "OWASP LLM Top 10", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", why: "The formal global definitions of AI vulnerabilities used by every security company." },
                    { label: "Gandalf Lab", url: "https://gandalf.lakera.ai/", why: "A fun, interactive playground to test your jailbreaking skills against real guardrails." },
                  ],
                  paid: [
                    { label: "TCM PAPA Exam", url: "https://certifications.tcm-sec.com/papa/", why: "A hands-on exam that proves you can perform these attacks in a professional setting." }
                  ]
                }}
              />
              <SkillCard
                name="Filter Evasion"
                category="Guardrail Bypass"
                correlatedTools={["Garak", "Promptfoo"]}
                accentColor="#f97316"
                what="Finding gaps in a model's safety filters by using language switching, persona-play, or structural tricks."
                why="Every company puts guardrails on their AI. Your job is to find the linguistic backdoor where the filter gets confused. These are exploits in the model's own reasoning patterns."
                resources={{
                  free: [
                    { label: "Garak GitHub", url: "https://github.com/NVIDIA/garak", why: "The leading open-source scanner for finding vulnerabilities in language models." },
                    { label: "HackAPrompt Writeups", url: "https://www.hackaprompt.com/", why: "Actual reports from the world's best prompt injectors to see how the pros work." },
                  ],
                  paid: [
                    { label: "OffSec OSAI", url: "https://www.offsec.com/courses/ai-300/", why: "Premium training with intense labs that push your evasion skills to the limit." }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 02 ══════════════════════════════════════════════════════ */}
          <section id="level-02" className="py-16 xl:py-20">
            <SectionHeader
              num="02" label="AI Security Researcher" color="#fb7185"
              subtitle="Deep Exploitation & Adversarial ML"
              time="4-7 years" salary="£75K-£110K"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                At this level, you stop looking for clever prompts and start looking at the mathematics of why models fail. That shift in perspective is what separates a Red Team Operator from a Security Researcher. It's a significant step up in both skill and responsibility.
              </p>
              <p>
                You focus on complex attack surfaces like RAG (Retrieval-Augmented Generation). If you can get a poisoned document into a company's database, the AI will reciting your malicious content with full corporate authority to every employee who asks.
              </p>
              <p>
                This is the point where security overlaps with machine learning research. You need to understand embeddings, vector databases, and why certain model architectures fail predictably. This commitment is exactly why the salary for this role is so high.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(251,113,133,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="GIAC Offensive AI Analyst (GOAA)" provider="GIAC / SANS" href="https://www.giac.org/certifications/offensive-ai-analyst-goaa/" accentColor="#fb7185" isTop
                what="The most academically rigorous offensive AI certification. It covers adversarial machine learning, model extraction, and training data poisoning in extreme detail."
                why="This certification moves you from practitioner to researcher status. It proves you understand why an entire architecture is vulnerable at a mathematical level. It is highly respected in specialist research firms."
              />
              <CertCard name="OSCP — OffSec Certified Professional" provider="OffSec" href="https://www.offsec.com/courses/pen-200/" accentColor="#fb7185"
                what="The infamous 24-hour practical exam where you must compromise a network with zero hints. It forces you to enumerate services and escalate privileges."
                why="AI models run on real servers. If the model is locked down, the server might not be. OSCP ensures you can approach an engagement from both directions: against the model and the machine underneath it."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(251,113,133,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="RAG Hijacking"
                category="Advanced Exploitation"
                correlatedTools={["LangChain", "ChromaDB"]}
                accentColor="#fb7185"
                what="Injecting malicious documents into a vector database, causing the AI to recite poisoned content as legitimate information."
                why="If you poison the knowledge store, you have effectively planted a sleeper agent in the company's brain. The AI Recites your answer with corporate authority, delivered directly to every employee."
                resources={{
                  free: [
                    { label: "LangChain Security", url: "https://python.langchain.com/docs/security", why: "The official guide for securing the world's most popular AI framework." },
                    { label: "Hugging Face Hub Security", url: "https://huggingface.co/docs/hub/security", why: "Excellent research on the vulnerabilities of shared AI models and datasets." },
                  ],
                  paid: [
                    { label: "GIAC GOAA Track", url: "https://www.giac.org/certifications/offensive-ai-analyst-goaa/", why: "The deepest research-focused training available for offensive AI." }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 03 ══════════════════════════════════════════════════════ */}
          <section id="level-03" className="py-16 xl:py-20">
            <SectionHeader
              num="03" label="Principal AI Security Architect" color="#a78bfa"
              subtitle="Enterprise Defense & Strategy"
              time="7+ years" salary="£110K-£160K+"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>
                You've spent years breaking things. Now you are the person who builds the system that makes the next attacker's job truly miserable. At the Principal level, you design layered defenses where if one guardrail fails, two more catch the attack automatically.
              </p>
              <p>
                Your job is to be the bridge between the technical reality of AI and the business reality of risk and legal liability. You translate catastrophic threat models into honest, simple conversations about money and risk for the Board of Directors.
              </p>
              <p>
                Communication is just as important as the architecture itself. You have to explain to executives why a seven-figure security budget is necessary this quarter, turning technical jargon into clear business decisions. That is a rare and highly compensated skill.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISSP" provider="ISC²" href="https://www.isc2.org/certifications/cissp" accentColor="#a78bfa" isTop
                what="A management-focused exam covering eight massive domains of security, from risk management to software development security."
                why="This is the boardroom passport. Senior leadership roles at major organizations look for CISSP first. It proves you understand enterprise risk at a strategic level, which is what's required for this level."
              />
              <CertCard name="CISM" provider="ISACA" href="https://www.isaca.org/credentialing/cism" accentColor="#a78bfa"
                what="Focused on security governance, program development, and incident management from an overarching strategic perspective."
                why="CISM teaches you how to lead people and programs, not just systems. It shows you how to manage a team of senior practitioners and communicate risk to people who don't speak the tech language."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard
                name="Defense Architecture"
                category="Enterprise Strategy"
                correlatedTools={["Lakera Guard", "Azure Content Safety"]}
                accentColor="#a78bfa"
                what="Designing layered AI security pipelines where multiple independent controls operate in sequence."
                why="You don't trust one filter. You build five. This architecture means a single gap isn't the end of the story. It gets caught by layers further down. This is real production-grade security."
                resources={{
                  free: [
                    { label: "MITRE ATLAS Framework", url: "https://atlas.mitre.org/", why: "The definitive guide for mapping out the adversarial threat landscape for AI." },
                    { label: "NIST AI Playbook", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf", why: "The global gold standard for managing AI risk at an enterprise level." },
                  ],
                  paid: [
                    { label: "ISACA CISM Curriculum", url: "https://www.isaca.org/credentialing/cism/cism-exam-planning-guide", why: "Specialized training for moving into high-level security management." }
                  ]
                }}
              />
            </div>
          </section>

          {/* ── Footer ── */}
          <div className="py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link
                href="/roadmaps/ai-hacking/career-path"
                className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-white"
                style={{ color: "rgba(249,115,22,0.85)", textDecoration: "underline" }}
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
