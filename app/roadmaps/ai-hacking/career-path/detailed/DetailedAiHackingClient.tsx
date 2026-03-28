"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LEVELS = [
  { num: "00", label: "Entry Point",                    color: "#94a3b8", time: "0–6 months",  salary: "£25K–£35K" },
  { num: "01", label: "AI Red Team Operator",           color: "#f97316", time: "6–18 months", salary: "£30K–£50K" },
  { num: "02", label: "AI Security Researcher",         color: "#fb7185", time: "4–7 years",   salary: "£75K–£110K" },
  { num: "03", label: "Principal AI Security Architect",color: "#a78bfa", time: "7+ years",    salary: "£110K–£160K+" },
] as const;

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
            <p className="font-mono text-[13px] font-bold uppercase tracking-widest leading-tight transition-colors duration-200 group-hover:text-white" style={{ color: "rgba(226,232,240,0.95)" }}>
              {l.label}
            </p>
            <p className="font-mono text-[11px] mt-1 font-medium" style={{ color: "rgba(148,163,184,0.7)" }}>{l.time}</p>
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

interface CertCardProps {
  name: string; provider: string; href: string; difficulty: string; duration: string; cost: string;
  accentColor: string; what: string; why: string; isTop?: boolean;
}

function CertCard({ name, provider, href, difficulty, duration, cost, accentColor, what, why, isTop }: CertCardProps) {
  let domain = "example.com";
  try { domain = new URL(href).hostname; } catch {}
  return (
    <div className="rounded-2xl overflow-hidden" style={{ background: "rgba(15,20,30,0.7)", border: `1px solid ${accentColor}35` }}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-5" style={{ background: `${accentColor}10`, borderBottom: `1px solid ${accentColor}25` }}>
        <div className="flex-1 min-w-0">
          {isTop && (
            <span className="inline-block font-mono text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 rounded mb-3 font-semibold" style={{ background: `${accentColor}28`, color: accentColor, border: `1px solid ${accentColor}55` }}>
              ★ Recommended
            </span>
          )}
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" width={28} height={28} className="rounded flex-shrink-0" style={{ objectFit: "contain" }} />
            <h4 className="font-mono text-lg font-bold text-white leading-tight">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium" style={{ color: `${accentColor}cc` }}>{provider}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono flex-shrink-0 sm:text-right">
          {[difficulty, duration, cost].map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full whitespace-nowrap font-medium" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(203,213,225,0.85)", border: "1px solid rgba(148,163,184,0.2)" }}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:divide-x" style={{ borderColor: `${accentColor}18` }}>
        <div className="px-6 py-6">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>What it teaches</p>
          <p className="text-[15px] leading-relaxed" style={{ color: "rgba(226,232,240,0.88)" }}>{what}</p>
        </div>
        <div className="px-6 py-6" style={{ borderLeft: `1px solid ${accentColor}18` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>Why at this level</p>
          <p className="text-[15px] leading-relaxed" style={{ color: "rgba(226,232,240,0.88)" }}>{why}</p>
        </div>
      </div>
      <div className="px-6 pb-5">
        <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-150 hover:opacity-100" style={{ color: `${accentColor}cc`, textDecoration: "underline" }}>
          Official page
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </div>
    </div>
  );
}

interface SkillResource { label: string; url: string; }
interface SkillCardProps {
  name: string; category: string; correlatedTools: string[]; accentColor: string; what: string; why: string;
  resources: { free: SkillResource[]; paid: SkillResource[]; };
}

function SkillCard({ name, category, correlatedTools, accentColor, what, why, resources }: SkillCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden mt-6" style={{ background: "rgba(15,20,30,0.6)", border: `1px solid ${accentColor}35` }}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-5" style={{ background: `${accentColor}10`, borderBottom: `1px solid ${accentColor}25` }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold" style={{ background: `${accentColor}28`, color: accentColor }}>{name.charAt(0)}</span>
            <h4 className="font-mono text-lg font-bold text-white leading-tight">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium" style={{ color: `${accentColor}cc` }}>{category}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono flex-shrink-0 sm:text-right">
          <span className="w-full text-[10px] uppercase tracking-widest mb-1" style={{ color: "rgba(148,163,184,0.55)" }}>Tools</span>
          {correlatedTools.map((tag) => (
            <span key={tag} className="px-3 py-1 rounded-full whitespace-nowrap font-medium" style={{ background: "rgba(255,255,255,0.07)", color: "rgba(203,213,225,0.85)", border: "1px solid rgba(148,163,184,0.2)" }}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="px-6 py-5" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${accentColor}15` }}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>What it is</p>
        <p className="text-[15px] leading-relaxed" style={{ color: "rgba(203,213,225,0.85)" }}>{what}</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0" style={{ borderColor: `${accentColor}18` }}>
        <div className="px-6 py-6" style={{ borderBottom: `1px solid ${accentColor}15` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: `${accentColor}ee` }}>Why you need it here</p>
          <p className="text-[15px] leading-relaxed" style={{ color: "rgba(226,232,240,0.88)" }}>{why}</p>
        </div>
        <div className="px-6 py-6 flex flex-col gap-5" style={{ borderLeft: `1px solid ${accentColor}18`, borderBottom: `1px solid ${accentColor}15` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em]" style={{ color: `${accentColor}ee` }}>Resources to Learn</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest mb-3 font-semibold" style={{ color: "rgba(96,165,250,0.9)" }}>Free Options</p>
              <div className="flex flex-col gap-2">
                {resources.free.map((res) => (
                  <a key={res.label} href={res.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[12px] hover:text-white transition-colors py-1" style={{ color: "rgba(203,213,225,0.8)", textDecoration: "underline" }}>
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
                  <a key={res.label} href={res.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2 text-[12px] hover:text-white transition-colors py-1" style={{ color: "rgba(203,213,225,0.8)", textDecoration: "underline" }}>
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
        <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.35em] px-3 py-1.5 rounded" style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}>
          Level {num}
        </span>
        <span className="font-mono text-[13px] font-medium" style={{ color: "rgba(148,163,184,0.7)" }}>{time} • {salary}</span>
      </div>
      <h2 className="text-5xl xl:text-6xl font-bold text-white mb-3 leading-tight" style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}>{label}</h2>
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

      {/* ── Top Nav ── */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-6 py-3" style={{ background: "rgba(13,9,9,0.96)", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", height: "48px" }}>
        <Link href="/roadmaps/ai-hacking/career-path" className="font-mono text-[11px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white" style={{ color: "rgba(148,163,184,0.75)", textDecoration: "underline" }}>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Career Path
        </Link>
        <span style={{ color: "rgba(148,163,184,0.45)", fontSize: "11px" }}>/</span>
        <span className="font-mono text-[11px] uppercase tracking-widest font-semibold" style={{ color: "rgba(148,163,184,0.6)" }}>Deep Dive</span>
        <div className="flex-1" />
        <div className="flex lg:hidden items-center gap-2">
          {LEVELS.map((l) => (
            <a key={l.num} href={`#level-${l.num}`} className="font-mono text-[9px] font-bold w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-150"
              style={{ borderColor: `${l.color}44`, color: l.color, background: `${l.color}10`, textDecoration: "none" }}>
              {l.num}
            </a>
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="px-6 lg:px-16 xl:px-20 pt-16 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] mb-6 font-bold" style={{ color: "rgba(249,115,22,0.7)" }}>AI Hacking Deep Dive</p>
            <h1 className="text-6xl sm:text-7xl xl:text-8xl font-bold text-white mb-8 leading-[0.95] tracking-tight" style={{ fontFamily: "var(--font-heading, system-ui)" }}>
              The AI Hacking Path,<br />
              <span style={{ color: "rgba(249,115,22,0.95)" }}>Explained</span>
            </h1>
            <p className="text-xl leading-relaxed max-w-xl" style={{ color: "rgba(226,232,240,0.8)" }}>
              The career path gives you the map. This is the manual. Every cert, every tool, every skill explained properly — not just listed, but actually justified so you know whether it's worth your time and money.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {LEVELS.map((l) => (
                <a key={l.num} href={`#level-${l.num}`}
                  className="flex items-center gap-3 px-5 py-2.5 rounded-full font-mono text-[12px] font-bold uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:bg-white/[0.05]"
                  style={{ background: `${l.color}15`, border: `1px solid ${l.color}35`, color: `${l.color}`, textDecoration: "none" }}>
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

          {/* ══ LEVEL 00 ══ */}
          <section id="level-00" className="py-16 xl:py-20">
            <SectionHeader num="00" label="The Entry Point" color="#94a3b8" subtitle="No Experience Required" time="0–6 months" salary="£25K–£35K" />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>You can't hack an AI if you don't understand how a computer actually talks. It sounds obvious, but a lot of people skip this and then wonder why they're stuck six months in. Before you even think about bypassing safety filters or jailbreaking an LLM, you need the basics down. What a Linux terminal is. How a network packet moves. What DNS actually does. Without that, you're just copy-pasting prompts you found on Reddit and calling yourself a hacker.</p>
              <p>Level 00 is about building the foundation. Yes, that means starting with networking and operating systems. Yes, it's not as exciting as the stuff higher up the page. But every single person who looks effortless at Level 02 built this deliberately. Nobody skipped it and succeeded.</p>
              <p>The good news? You genuinely don't need a degree for this career. What you need is the discipline to keep going when things stop making sense. And they will stop making sense, probably quite often at first. Push through it. Every person ahead of you in this industry was in exactly the same spot at some point.</p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Google Cybersecurity Certificate" provider="Coursera / Google" href="https://www.coursera.org/professional-certificates/google-cybersecurity" difficulty="Beginner" duration="3-6 months" cost="Subscription" accentColor="#94a3b8" isTop
                what="An eight-course sequence covering networking basics, Linux command line, threat detection, and introductory Python scripting. It is structured well and surprisingly broad for what you pay. You end up with a solid picture of the whole threat landscape, not just one area."
                why="Recruiters who have never heard of Garak or PyRIT absolutely know what Google is. That name on your CV gets past the CV screening stage when more technical certs would get filtered out. It also proves you have the attention span to actually finish a multi-month professional course, which, honestly, matters more than people expect at this stage."
              />
              <CertCard name="TryHackMe Pre-Security" provider="TryHackMe" href="https://tryhackme.com/path/outline/presecurity" difficulty="Beginner" duration="40-60 hrs" cost="Free / Premium" accentColor="#94a3b8"
                what="Gamified, browser-based lessons that make foundational concepts feel manageable. You learn networking layers, DNS, HTTP, and basic security terminology without setting up a single virtual machine. Everything runs in the browser."
                why="The single biggest problem at this level is environment setup fear. People spend their first weekend trying to install Kali Linux, breaking their machine, and giving up. TryHackMe removes that entirely. You just open a browser and start. It's low-stress and interactive, and you actually finish things rather than abandoning them halfway through a setup guide."
              />
              <CertCard name="TCM Practical Security Fundamentals" provider="TCM Security Academy" href="https://academy.tcm-sec.com/p/practical-security-fundamentals" difficulty="Beginner" duration="20-30 hrs" cost="One-off fee" accentColor="#94a3b8"
                what="A practical, no-fluff course that skips the death-by-PowerPoint approach entirely. It gets straight into showing how the digital world actually works and then takes it apart systematically. Concise, affordable, and built by practitioners."
                why="If you already hate theory and want to see things break from day one, this is the one to start with. TCM builds practical intuition rather than just getting you to memorise definitions for a quiz. That instinct is what you actually need when you're facing a real AI system with no documentation and no hints."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard name="Networking (TCP/IP, DNS)" category="Core Infrastructure" correlatedTools={["Wireshark", "Terminal", "Burp Suite"]} accentColor="#94a3b8"
                what="The mechanics of how data moves across a network. That includes how AI APIs communicate, what DNS resolves, and how packets travel from point A to point B. Not the exciting stuff, but the stuff everything else depends on."
                why="AI models live on servers. If you have no idea how a request travels from your browser to that server and back, you cannot intercept it, modify it, or replay it. This is what separates someone who actually understands AI hacking from someone who is just copy-pasting prompts off Reddit and hoping for the best."
                resources={{
                  free: [
                    { label: "Professor Messer Net+ (N10-009)", url: "https://www.professormesser.com/network-plus/n10-009/n10-009-video/" },
                    { label: "NetworkChuck — Full Networking", url: "https://www.youtube.com/playlist?list=PLIhvC56v63IJVXv0GJcl9vO5Z6znCVb1P" },
                    { label: "Cisco NetAcad: Intro to Networks", url: "https://www.netacad.com/courses/networking/ccna-introduction-networks" },
                  ],
                  paid: [
                    { label: "Jason Dion Net+ on Udemy", url: "https://www.udemy.com/course/comptia-network-cert-n10-008-the-total-course/" },
                    { label: "Jeremy's IT Lab (CCNA)", url: "https://www.jeremysitlab.com/" },
                  ]
                }}
              />
              <SkillCard name="Linux & PowerShell" category="Operating Systems" correlatedTools={["Linux Terminal", "PowerShell", "VirtualBox"]} accentColor="#94a3b8"
                what="The command-line environments that all serious security tools run inside. Garak, PyRIT, and almost every adversarial ML toolkit is terminal-first. There is no pretty graphical interface. You type commands, you get results."
                why="If you are scared of a command line right now, that is completely fine. Most people are at first. But you have to get past it because every tool you will use from Level 01 onwards lives here. The sooner you get comfortable in a terminal, the faster everything else starts to make sense."
                resources={{
                  free: [
                    { label: "The Linux Command Line (Free Book)", url: "https://linuxcommand.org/tlcl.php" },
                    { label: "THM Linux Fundamentals", url: "https://tryhackme.com/module/linux-fundamentals" },
                    { label: "Microsoft Learn: PowerShell", url: "https://learn.microsoft.com/en-us/training/modules/introduction-to-powershell/" },
                  ],
                  paid: [
                    { label: "TCM Academy Linux 101", url: "https://academy.tcm-sec.com/p/linux-101" },
                    { label: "Google IT Support — Coursera", url: "https://www.coursera.org/professional-certificates/google-it-support" },
                  ]
                }}
              />
              <SkillCard name="Python Scripting" category="Automation & AI Tooling" correlatedTools={["Python", "Jupyter", "pip"]} accentColor="#94a3b8"
                what="Reading, modifying, and running Python scripts. Not building software from scratch. Just enough to run a tool, understand why it crashed, and change the parameters to fix it. That is genuinely all you need at this stage."
                why="Python is the language of AI. PyRIT, Garak, ART, and every other tool you will use is written in it. You do not need to build apps. But you do need to read a script without panicking when it throws an error at line 47. That skill alone unblocks most of the things beginners get stuck on."
                resources={{
                  free: [
                    { label: "Automate the Boring Stuff (Free Book)", url: "https://automatetheboringstuff.com/" },
                    { label: "CS50P — Python (Harvard, Free)", url: "https://cs50.harvard.edu/python/2022/" },
                  ],
                  paid: [
                    { label: "TCM Python 101 for Hackers", url: "https://academy.tcm-sec.com/p/python-101-for-hackers" },
                    { label: "Jose Portilla Python — Udemy", url: "https://www.udemy.com/course/complete-python-bootcamp/" },
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 01 ══ */}
          <section id="level-01" className="py-16 xl:py-20">
            <SectionHeader num="01" label="AI Red Team Operator" color="#f97316" subtitle="Adversarial Prompting & Model Exploitation" time="6–18 months" salary="£30K–£50K" />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>We are no longer just chatting with AI. In 2026, companies are deploying AI agents that read internal emails, execute code, browse the internet, and take actions on behalf of real people. That creates an entirely new class of security problem, and someone needs to find those problems before attackers do. That someone is you.</p>
              <p>As an AI Red Teamer, your job is to be the professional nightmare for developers. You find the gaps where the AI can be tricked into leaking confidential data, ignoring its own safety rules, or doing something that ends up on the front page of a newspaper. It is a genuinely unusual mix of skills: some of it is psychological (understanding how language models reason), and some of it is classic web hacking (intercepting and tampering with API traffic).</p>
              <p>The tools at this level are cutting-edge in the most literal sense. Microsoft PyRIT and Garak barely existed a couple of years ago. This field moves faster than any certification body can track, which means the people who get in early and build real experience right now are going to be extremely difficult to catch up with later.</p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(249,115,22,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="TCM · Practical AI Pentest Associate (PAPA)" provider="TCM Security Academy" href="https://certifications.tcm-sec.com/papa/" difficulty="Intermediate" duration="2-3 months prep" cost="Mid-range" accentColor="#f97316" isTop
                what="The only certification right now that treats AI hacking as a hands-on trade rather than an academic subject. No multiple choice. No theory essays. It focuses entirely on running practical red team engagements against real AI systems."
                why="If you pass this, you can actually run an AI red team engagement without being handed a manual first. That is a real skill employers are prepared to pay for right now because almost nobody has it. The price point is reasonable, the content is fresh, and the ROI for getting into AI security is about as high as it gets at this stage."
              />
              <CertCard name="OffSec · OSAI (AI Red Teamer)" provider="OffSec" href="https://www.offsec.com/courses/ai-300/" difficulty="Advanced" duration="3-4 months prep" cost="Premium" accentColor="#f97316"
                what="OffSec stepping into AI security, which means their full 'Try Harder' methodology applied to AI red teaming. The course is harder and more expensive than PAPA, but it carries the full weight of the OffSec brand behind it."
                why="OffSec built their reputation over decades on producing people who can actually hack, not just people who can talk about hacking. That reputation transfers to AI. If you hold this, employers already know what it means: you did not take shortcuts, and you will not need to be hand-held through an engagement."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(249,115,22,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard name="Prompt Injection (Direct & Indirect)" category="Core AI Attack Vector" correlatedTools={["Gandalf by Lakera", "Promptmap", "Burp Suite"]} accentColor="#f97316"
                what="Embedding malicious instructions inside user inputs or external content that an AI reads (like a PDF or webpage), causing it to behave in ways its developers never intended. Direct injection goes straight into the chat. Indirect injection hides the attack somewhere the AI reads on your behalf."
                why="This is the core skill of AI hacking. You are essentially convincing the AI to swap its original instructions for yours by hiding your real command inside something it already trusts. Indirect injection is particularly effective because the AI reads a poisoned document and follows your instructions without ever realising the switch happened."
                resources={{
                  free: [
                    { label: "OWASP LLM Top 10 — Prompt Injection", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
                    { label: "Gandalf by Lakera — Practice Lab", url: "https://gandalf.lakera.ai/" },
                    { label: "Prompt Airlines CTF (Wiz.io)", url: "https://promptairlines.com/" },
                  ],
                  paid: [
                    { label: "TCM PAPA — Full Attack Modules", url: "https://certifications.tcm-sec.com/papa/" },
                    { label: "OffSec OSAI Training", url: "https://www.offsec.com/courses/ai-300/" },
                  ]
                }}
              />
              <SkillCard name="Filter Evasion & Guardrail Bypass" category="Adversarial Prompting" correlatedTools={["Promptfoo", "Garak", "CyberChef"]} accentColor="#f97316"
                what="Finding the gaps in a model's content safety filters by using encoding, language switching, persona-play, or structural tricks. The filter says no. You find the version of the request it says yes to."
                why="Every company puts guardrails on their AI to stop it doing embarrassing or dangerous things. Your job is to find the linguistic backdoor where the filter gets confused. A different language, a fictional framing, a Base64-encoded instruction. These are not hacks in the traditional sense. They are exploits in the model's own reasoning patterns."
                resources={{
                  free: [
                    { label: "HackAPrompt Competition Writeups", url: "https://www.hackaprompt.com/" },
                    { label: "Garak — LLM Vulnerability Scanner (GitHub)", url: "https://github.com/NVIDIA/garak" },
                    { label: "Promptfoo Docs — Red Teaming Guide", url: "https://www.promptfoo.dev/docs/red-teaming/" },
                  ],
                  paid: [
                    { label: "TCM PAPA", url: "https://certifications.tcm-sec.com/papa/" },
                    { label: "OffSec OSAI", url: "https://www.offsec.com/courses/ai-300/" },
                  ]
                }}
              />
              <SkillCard name="API Interception (AI Traffic)" category="Web & API Hacking" correlatedTools={["Burp Suite", "Caido", "Postman"]} accentColor="#f97316"
                what="Placing yourself in the middle of the connection between a user and an AI model, so you can read, modify, and replay the API requests going to the model's backend. Classic man-in-the-middle, applied to AI traffic."
                why="AI models talk through APIs. Burp Suite lets you sit in between that conversation and change the messages before they reach the model. That means you can modify system parameters, inject malicious content into the context window, or replay historical requests with altered payloads. Most developers do not account for an attacker having this level of access to their traffic."
                resources={{
                  free: [
                    { label: "PortSwigger Web Security Academy (Free)", url: "https://portswigger.net/web-security" },
                    { label: "TCM Practical Ethical Hacking (PEH) — API Modules", url: "https://academy.tcm-sec.com/p/practical-ethical-hacking-the-complete-course" },
                    { label: "Burp Suite Community Edition (Free)", url: "https://portswigger.net/burp/communitydownload" },
                  ],
                  paid: [
                    { label: "TCM API Security Fundamentals", url: "https://academy.tcm-sec.com/p/api-security-fundamentals" },
                    { label: "TCM PAPA", url: "https://certifications.tcm-sec.com/papa/" },
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 02 ══ */}
          <section id="level-02" className="py-16 xl:py-20">
            <SectionHeader num="02" label="AI Security Researcher" color="#fb7185" subtitle="Deep Exploitation & Adversarial ML" time="4–7 years" salary="£75K–£110K" />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>At this level you are no longer just running clever prompts. You start looking at the actual mechanics of why models fail. Not just that they do, but the mathematical reason they do. That shift in perspective is what separates a Red Team Operator from a Security Researcher, and it is a significant step up.</p>
              <p>One of the biggest attack surfaces here is RAG, which stands for Retrieval-Augmented Generation. Companies give their AI access to private internal documents so it can answer questions about their business. If you can get a poisoned document into that database, the AI will distribute your content with full corporate authority to every employee who asks it a question. No model weights touched. No traditional exploit. Just a carefully crafted document that the AI trusts completely.</p>
              <p>This is the point where security genuinely overlaps with machine learning research. You need to understand what embeddings are, have a rough grasp of gradient descent, and know why certain model architectures fail in predictable ways. That's a real commitment. The salary jump to this level exists because it reflects that commitment accurately.</p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(251,113,133,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="GIAC Offensive AI Analyst (GOAA)" provider="GIAC / SANS" href="https://www.giac.org/certifications/offensive-ai-analyst-goaa/" difficulty="Advanced" duration="4-6 months prep" cost="Enterprise" accentColor="#fb7185" isTop
                what="The most academically rigorous offensive AI security certification on the market. Developed with SANS research backing, it covers adversarial machine learning, model extraction, training data poisoning, and the deep technical reasoning behind each vulnerability class. Not a quick win."
                why="SANS/GIAC is where the serious researchers go. This certification moves you from practitioner to researcher status. The shift is from 'I can exploit this model' to 'I understand why this entire class of architecture is vulnerable at a mathematical level.' It is expensive and it is earned. It opens doors at security research firms that genuinely do not care about most other certifications."
              />
              <CertCard name="OSCP+ / Pen-200" provider="OffSec" href="https://www.offsec.com/courses/pen-200/" difficulty="Advanced" duration="6 months prep" cost="Premium" accentColor="#fb7185"
                what="OffSec's legendary 24-hour practical exam. Real machines, no multiple choice, no hints. You are given a network and an objective, and you have to work through it yourself. Passing this tells employers something very specific about what you can do."
                why="AI systems do not float in the cloud. They run on real servers with real infrastructure. If the AI model itself is thoroughly locked down, the server it runs on might not be. OSCP+ makes sure you can approach an AI security engagement from both directions: against the model and against the machine underneath it."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(251,113,133,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard name="RAG Hijacking & Vector DB Poisoning" category="Advanced AI Exploitation" correlatedTools={["LangChain", "ChromaDB", "Faiss"]} accentColor="#fb7185"
                what="Injecting malicious documents into the vector database a RAG system uses as its private knowledge store, causing the AI to pull and recite your poisoned content as if it were legitimate company information."
                why="Companies load their AI with internal documents: contracts, HR policies, strategic plans. If you can get a poisoned document into that database, you have effectively planted a sleeper agent inside the company's brain. From that point on, every employee who asks the AI a business question gets your crafted answer, delivered with full corporate authority. No model hacking required."
                resources={{
                  free: [
                    { label: "OWASP LLM Top 10 — RAG Poisoning", url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/" },
                    { label: "LangChain Security Docs", url: "https://python.langchain.com/docs/security" },
                    { label: "Hugging Face — Vector DB Security", url: "https://huggingface.co/docs/hub/security" },
                  ],
                  paid: [
                    { label: "GIAC GOAA — Full Research Track", url: "https://www.giac.org/certifications/offensive-ai-analyst-goaa/" },
                    { label: "SANS SEC595 — Applied Data Science for Security", url: "https://www.sans.org/cyber-security-courses/applied-data-science-machine-learning/" },
                  ]
                }}
              />
              <SkillCard name="Model Extraction" category="Adversarial ML" correlatedTools={["ART (IBM)", "Counterfit", "Python"]} accentColor="#fb7185"
                what="Reconstructing a model's internal decision logic by querying it thousands of times and analysing the outputs. You never see the actual model files. You build a functional copy by watching how it behaves."
                why="Think of it as stealing a secret recipe by tasting the dish repeatedly until you can replicate it. This allows attackers to clone a proprietary model, effectively stealing months of costly R&D without a single breach of the company's infrastructure. Understanding the method is the first step to protecting against it."
                resources={{
                  free: [
                    { label: "Adversarial Robustness Toolbox (ART) — IBM", url: "https://github.com/Trusted-AI/adversarial-robustness-toolbox" },
                    { label: "RobustBench — Adversarial ML Benchmarks", url: "https://robustbench.github.io/" },
                    { label: "Counterfit by Microsoft (GitHub)", url: "https://github.com/Azure/counterfit" },
                  ],
                  paid: [
                    { label: "GIAC GOAA", url: "https://www.giac.org/certifications/offensive-ai-analyst-goaa/" },
                    { label: "SANS FOR526 — Advanced ML Forensics", url: "https://www.sans.org/cyber-security-courses/advanced-memory-forensics-threat-detection/" },
                  ]
                }}
              />
              <SkillCard name="Training Data Poisoning" category="Long-Game Attacks" correlatedTools={["HiddenLayer Model Scanner", "ART", "Python"]} accentColor="#fb7185"
                what="Corrupting a model during the training phase by injecting malicious examples into the training data. The result is a backdoored model that behaves perfectly normally under normal conditions but switches behaviour when a specific trigger is present."
                why="This is the long game. You are not tricking a deployed model. You are corrupting it before it even exists. A well-crafted backdoor is virtually invisible to anyone who is not actively looking for it. The model passes all its safety evaluations, ships to production, and then sits dormant until someone types the trigger phrase. Detecting this after deployment is enormously difficult, which is exactly why understanding how it is built matters so much."
                resources={{
                  free: [
                    { label: "AI Village (DEF CON) — Research Papers", url: "https://aivillage.org/" },
                    { label: "HiddenLayer Model Scanner (Community)", url: "https://hiddenlayer.com/" },
                    { label: "Malware Unicorn AI Security Workshops", url: "https://malwareunicorn.org/" },
                  ],
                  paid: [
                    { label: "GIAC GOAA", url: "https://www.giac.org/certifications/offensive-ai-analyst-goaa/" },
                    { label: "SANS SEC595", url: "https://www.sans.org/cyber-security-courses/applied-data-science-machine-learning/" },
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />

          {/* ══ LEVEL 03 ══ */}
          <section id="level-03" className="py-16 xl:py-20">
            <SectionHeader num="03" label="Principal AI Security Architect" color="#a78bfa" subtitle="Enterprise Defense, Governance & Leadership" time="7+ years" salary="£110K–£160K+" />
            <div className="space-y-6 text-lg leading-relaxed mb-14" style={{ color: "rgba(203,213,225,0.75)" }}>
              <p>You have spent years breaking things. Now you are the person who builds the system that makes the next attacker's job genuinely miserable. At Principal Architect level, you are the phone call the CEO makes when a regulator is asking questions, when the EU AI Act compliance deadline is approaching, or when a major data leak is about to appear on the front page of every national newspaper.</p>
              <p>Your day is not mostly spent in a terminal anymore. You are designing layered defence systems where if one guardrail fails, two more catch the attack before it causes damage. You are the bridge between the technical reality of AI systems and the business reality of risk, legal liability, and board expectations. Both sides need you to translate for them.</p>
              <p>Communication is just as important as the architecture itself at this level. You have to explain to a Board of Directors, some of whom may not know what a token is, why they need to approve a seven-figure security infrastructure budget this quarter. The core skill is turning complex threat models into simple, honest conversations about money and risk. That is harder than it sounds, and it is worth every penny of the salary that comes with it.</p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISSP" provider="ISC²" href="https://www.isc2.org/certifications/cissp" difficulty="Advanced" duration="3-6 months prep" cost="Premium" accentColor="#a78bfa" isTop
                what="A management-focused exam covering eight core security domains, from risk architecture and asset security to operations management. It is broad by design: the point is proving you understand enterprise security at a strategic level, not just a technical one."
                why="This is the boardroom passport. Senior security leadership roles at serious organisations look for CISSP first. It is less about tools and much more about managing enormous enterprise risk at a programme level. It is the certification most reliably linked to Director and VP titles, and the salary that comes with those titles."
              />
              <CertCard name="CISM" provider="ISACA" href="https://www.isaca.org/credentialing/cism" difficulty="Advanced" duration="2-4 months prep" cost="Premium" accentColor="#a78bfa"
                what="Focused on security governance, large-scale programme development, and incident management from a strategic leadership perspective. It is not about technical implementation. It is about how you run the whole thing."
                why="This one teaches you how to lead people and programmes, not just systems. How to manage a team of senior practitioners, handle a budget larger than most small companies, and communicate security risk to people who do not speak the language. Pair it with CISSP and you have a very clear signal to the market that you are operating at executive level."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard name="Defense-in-Depth Architecture" category="Enterprise AI Security" correlatedTools={["Lakera Guard", "Azure AI Content Safety", "AWS Bedrock Guardrails"]} accentColor="#a78bfa"
                what="Designing layered AI security pipelines where multiple independent controls operate in sequence. If any single guardrail is bypassed, the next layer catches the attack before it causes damage. No single point of failure."
                why="You do not trust one filter. You build five. Any determined attacker will eventually find a gap in a single control. The architecture you design means that gap is not the end of the story. It gets caught two layers later by something entirely different. That is the gap between security that looks good in a demo and security that actually works in production."
                resources={{
                  free: [
                    { label: "MITRE ATLAS — AI Threats Framework", url: "https://atlas.mitre.org/" },
                    { label: "NIST AI RMF Playbook", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" },
                    { label: "Lakera AI Security Hub (Blog)", url: "https://www.lakera.ai/blog" },
                  ],
                  paid: [
                    { label: "CISSP — (ISC)² Gold Standard", url: "https://www.isc2.org/certifications/cissp" },
                    { label: "CISM — ISACA Leadership Track", url: "https://www.isaca.org/credentialing/cism" },
                  ]
                }}
              />
              <SkillCard name="AI Governance & Compliance (EU AI Act)" category="Regulatory & Legal" correlatedTools={["EU AI Act Toolkit", "NIST AI RMF", "ISO 42001"]} accentColor="#a78bfa"
                what="Understanding and implementing the legal frameworks that govern AI deployment. The EU AI Act, NIST's AI Risk Management Framework, and ISO 42001 all have real obligations attached to them. This is about making sure the company's AI is actually compliant, not just approximately compliant."
                why="In 2026, the law is just as important as the code. A high-risk AI system deployed without proper compliance documentation can attract fines that run into the hundreds of millions. You need to know what the regulations actually require and how to build systems that satisfy them before the regulator arrives, not scramble to figure it out afterwards."
                resources={{
                  free: [
                    { label: "EU AI Act Official Text", url: "https://artificialintelligenceact.eu/" },
                    { label: "NIST AI RMF (Free PDF)", url: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" },
                    { label: "Future of Life Institute — AI Act Guide", url: "https://futureoflife.org/ai-policy/eu-ai-act/" },
                  ],
                  paid: [
                    { label: "CISSP — Risk Management Domain", url: "https://www.isc2.org/certifications/cissp" },
                    { label: "ISACA CISM", url: "https://www.isaca.org/credentialing/cism" },
                  ]
                }}
              />
              <SkillCard name="Executive Risk Communication" category="Leadership & Strategy" correlatedTools={["PowerBI", "Tableau", "ServiceNow"]} accentColor="#a78bfa"
                what="Translating technical AI security findings into business risk language that non-technical executives can understand and act on immediately. Dashboards, risk ratings, financial impact estimates. The goal is a decision, not a technical briefing."
                why="Security teams do not generate revenue. They prevent losses. Your job is to make that value visible to the people who control the budget, in a language they actually speak. You turn complex threat models into honest, simple numbers: here is what this risk costs us if it materialises, and here is what we are spending to prevent it. That is how you protect your budget every year."
                resources={{
                  free: [
                    { label: "FAIR Institute — Risk Quantification", url: "https://www.fairinstitute.org/" },
                    { label: "CISO Mind Map — Daniel Miessler", url: "https://danielmiessler.com/p/ciso-mindmap/" },
                    { label: "NIST Cybersecurity Framework (CSF)", url: "https://www.nist.gov/cyberframework" },
                  ],
                  paid: [
                    { label: "CISSP — (ISC)²", url: "https://www.isc2.org/certifications/cissp" },
                    { label: "CISM — ISACA", url: "https://www.isaca.org/credentialing/cism" },
                  ]
                }}
              />
            </div>
          </section>

          {/* ── Footer ── */}
          <div className="py-12" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <Link href="/roadmaps/ai-hacking/career-path" className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-white" style={{ color: "rgba(249,115,22,0.85)", textDecoration: "underline" }}>
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                  <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to Career Path
              </Link>
              <div className="flex flex-wrap gap-3">
                {LEVELS.map((l) => (
                  <a key={l.num} href={`#level-${l.num}`} className="font-mono text-[9px] uppercase tracking-widest" style={{ color: `${l.color}44`, textDecoration: "underline" }}>
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
