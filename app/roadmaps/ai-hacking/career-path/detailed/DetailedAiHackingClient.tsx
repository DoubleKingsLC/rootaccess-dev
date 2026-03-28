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
              The career path gives you the map. This guide gives you the manual. Every cert, every tool, every skill — and crucially, the reason why each one exists at that specific stage of your journey.
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
              <p>Look, you can't hack an AI if you don't understand how a computer actually talks. Before you start trying to bypass safety filters or jailbreak an LLM, you need to know the basics. If you don't know what a Linux terminal is or how a network packet moves, you're just a script kiddie copy-pasting prompts you found on Reddit.</p>
              <p>Level 00 is about building the muscles. We start with the boring stuff — Operating Systems and Networking — because that is the foundation everything else sits on. This is where you learn the discipline to build your own labs and break things safely without nuking your main machine.</p>
              <p>The good news is you don't need a degree. You need curiosity and the discipline to keep going when things get confusing. And they will get confusing. But every single person ahead of you in this career started right here, staring at a terminal wondering what on earth they were doing.</p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="Google Cybersecurity Certificate" provider="Coursera / Google" href="https://www.coursera.org/professional-certificates/google-cybersecurity" difficulty="Beginner" duration="3-6 months" cost="Subscription" accentColor="#94a3b8" isTop
                what="A comprehensive start that covers networking basics, Linux command line, threat detection, and simple Python scripting. It is incredibly well structured and surprisingly affordable for the breadth of material it covers."
                why="This is your HR door opener. Recruiters who have never heard of Garak or PyRIT absolutely recognise Google's name. Finishing it also proves you have the stamina to commit to a multi-month professional course — which matters more than people think at this stage."
              />
              <CertCard name="TryHackMe Pre-Security" provider="TryHackMe" href="https://tryhackme.com/path/outline/presecurity" difficulty="Beginner" duration="40-60 hrs" cost="Free / Premium" accentColor="#94a3b8"
                what="Gamified bite-sized lessons that strip the fear out of foundational concepts. You learn networking layers, DNS, HTTP and fundamental security terminology directly in your browser — no complicated setup needed."
                why="The confidence builder. It's low-stress, interactive, and perfect for when you're still a bit worried about breaking your own machine. It turns intimidating tech into small manageable missions you can actually finish."
              />
              <CertCard name="TCM Practical Security Fundamentals" provider="TCM Security Academy" href="https://academy.tcm-sec.com/p/practical-security-fundamentals" difficulty="Beginner" duration="20-30 hrs" cost="One-off fee" accentColor="#94a3b8"
                what="A hands-on practical course that skips the dry slide decks entirely. It gets straight into demonstrating how the modern digital world actually works and then systematically breaks it apart piece by piece."
                why="The real-world pick. If you hate theory and want to immediately see how things actually break from day one, this is your course. TCM builds practical intuition rather than just memorisation — which is exactly what you need for AI security."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(148,163,184,0.75)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard name="Networking (TCP/IP, DNS)" category="Core Infrastructure" correlatedTools={["Wireshark", "Terminal", "Burp Suite"]} accentColor="#94a3b8"
                what="The underlying mechanics of how data moves across a network — including how AI APIs communicate, what DNS resolves, and how packets actually travel."
                why="AI models live on servers. If you don't understand how a request travels from your browser to that server and back, you can't intercept it or manipulate it. This knowledge is what separates a genuine AI hacker from someone just copying prompts off Twitter."
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
                what="The command-line interfaces that all serious security tools run through. Garak, PyRIT, and most adversarial ML toolkits are terminal-first — they have no GUI."
                why="If you're scared of a command line, you're dead in the water. Every tool you will use at Level 01 and beyond lives here. Learning to be comfortable in a terminal early means everything else clicks faster when you get there."
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
                what="Reading, writing, and modifying Python scripts. Not full-stack software engineering — just enough to run a tool, understand why it's failing, and adjust the parameters."
                why="Python is the native language of AI. Every library that matters — PyRIT, Garak, ART — is written in it. You don't need to build apps, but you need to be able to read a script and not panic when it throws an error."
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
              <p>Welcome to 2026. We aren't just chatting with AI anymore — we're probing its architecture for logic flaws. As an AI Red Teamer, your job is to be the professional annoyer for the developers. You find the gaps where the AI can be tricked into leaking secret data, bypassing corporate filters, or executing malicious code on someone's behalf.</p>
              <p>It's a unique mix of psychological warfare — prompt engineering — and traditional web hacking, specifically intercepting and manipulating API traffic. You're the first line of defence against the AI doing something catastrophic and completely embarrassing for the company that deployed it.</p>
              <p>The tools here are legitimately cutting-edge. Microsoft PyRIT and Garak didn't even exist a few years ago. This is a field that is evolving faster than any certification body can keep up with, which means the practitioners who get in early build a serious competitive advantage.</p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(249,115,22,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="TCM · Practical AI Pentest Associate (PAPA)" provider="TCM Security Academy" href="https://certifications.tcm-sec.com/papa/" difficulty="Intermediate" duration="2-3 months prep" cost="Mid-range" accentColor="#f97316" isTop
                what="The only certification that currently treats AI hacking as a hands-on physical trade rather than an academic topic. It focuses entirely on practical red team engagements against real AI systems, not multiple-choice questions about theory."
                why="If you pass this, you can actually run a red team engagement on an AI system. That means employers don't need to train you from scratch — you arrive ready. It's 100% hands-on, and at this price point it's genuinely the best ROI on the market for getting started in AI security."
              />
              <CertCard name="OffSec · OSAI (AI Red Teamer)" provider="OffSec" href="https://www.offsec.com/courses/ai-300/" difficulty="Advanced" duration="3-4 months prep" cost="Premium" accentColor="#f97316"
                what="OffSec's entry into the AI security space. Carries the full weight of the OffSec brand and their famous 'Try Harder' culture — bringing that relentless practical methodology squarely into AI red teaming."
                why="The heavyweight alternative. OffSec has a reputation built over decades for producing practitioners who genuinely know how to hack. This cert tells employers you have the specific 'Try Harder' mindset applied to AI systems — not just generic prompt tinkering."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(249,115,22,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard name="Prompt Injection (Direct & Indirect)" category="Core AI Attack Vector" correlatedTools={["Gandalf by Lakera", "Promptmap", "Burp Suite"]} accentColor="#f97316"
                what="The technique of embedding malicious instructions inside user inputs or external content — like a PDF or webpage — that an AI reads, causing it to behave contrary to its original instructions."
                why="This is the core of AI hacking. You're essentially hypnotising the AI into doing what you want by hiding your real command inside something it trusts. Indirect injection via documents is particularly nasty — the AI reads a poisoned file and doesn't even realise it's been hijacked."
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
                what="The art of circumventing the content safety filters companies deploy on their AI models by using encoding, language switching, persona-play, or structural manipulation."
                why="Companies put guardrails on their AI to stop it saying or doing dangerous things. Your job is to find the linguistic backdoors — those tiny gaps where the filters get confused. Different languages, Base64 encoding, fictional framing — these aren't hacks in the traditional sense, they're exploits in the model's own reasoning."
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
                what="Sitting in the middle of the communication channel between a user and an AI model to intercept, modify, or replay the API requests being sent to the model's backend."
                why="AI models communicate through APIs. Burp Suite lets you sit between the conversation and change the messages before they reach the brain. This means you can modify parameters, inject content into the context window, or replay requests in ways the developers never anticipated."
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
              <p>At this stage you aren't just using tools — you're looking at the maths. You're moving from tricking a chatbot with a clever sentence to poisoning the very brain of the company. Level 02 is for the people who want to understand why a model fails at a mathematical level, not just that it does.</p>
              <p>You're looking at things like RAG — Retrieval-Augmented Generation — and realising that if you can poison the data the AI reads from its private knowledge base, you control its outputs entirely without ever touching the model weights themselves. You're a digital mad scientist discovering vulnerabilities that haven't even made it into a CVE database yet.</p>
              <p>This is where security starts overlapping with machine learning research. You need to be comfortable with gradient descent concepts, understand what embeddings actually are, and have a grasp of why certain model architectures fail in predictable ways. It's a demanding level but the salary jump reflects that exactly.</p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(251,113,133,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="GIAC Offensive AI Analyst (GOAA)" provider="GIAC / SANS" href="https://www.giac.org/certifications/offensive-ai-analyst-goaa/" difficulty="Advanced" duration="4-6 months prep" cost="Enterprise" accentColor="#fb7185" isTop
                what="The most academically rigorous offense-focused AI security certification available. Developed with SANS's deep research background, it covers adversarial machine learning, model extraction, training data poisoning, and the deep technical 'why' behind each vulnerability class."
                why="SANS/GIAC is the gold standard in serious security research. It moves you from practitioner to researcher — from 'I can exploit this' to 'I understand why this class of model is vulnerable at a mathematical level.' Expensive, but it opens doors at the top-tier security research firms that nothing else does."
              />
              <CertCard name="OSCP+ / Pen-200" provider="OffSec" href="https://www.offsec.com/courses/pen-200/" difficulty="Advanced" duration="6 months prep" cost="Premium" accentColor="#fb7185"
                what="OffSec's legendary practical penetration testing exam — 24 hours, real machines, no multiple choice. You must exploit a range of systems by chaining vulnerabilities together under actual time pressure."
                why="AI doesn't exist in a vacuum. It runs on servers. OSCP+ ensures that if the AI model itself is too well-defended, you can still get to it via the underlying infrastructure. At L2 you need both attacks — against the model and against the machine it runs on."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(251,113,133,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard name="RAG Hijacking & Vector DB Poisoning" category="Advanced AI Exploitation" correlatedTools={["LangChain", "ChromaDB", "Faiss"]} accentColor="#fb7185"
                what="Attacking Retrieval-Augmented Generation systems by injecting malicious documents into the vector database the AI uses as its private knowledge source, causing it to return poisoned information to all users."
                why="Companies give their AI access to internal documentation — contracts, strategies, HR files. If you can sneak a malicious document into that database, you've planted a sleeper agent inside their brain. Every employee who asks the AI a question now gets your poisoned answer delivered with full corporate authority."
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
                what="Reconstructing a model's internal weights and decision logic by systematically querying it and analysing the outputs — without ever having access to the actual model files."
                why="You're learning how to steal a secret recipe just by tasting the soup many times. This technique allows attackers to build a nearly identical copy of a proprietary model — stealing months of a company's R&D investment. Understanding it as an attacker is the first step to defending against it."
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
                what="Influencing a model during its training phase by injecting carefully crafted malicious data into the training set, creating hidden backdoor triggers that can activate the model's malicious behaviour on demand."
                why="This is the long game. You're not tricking a deployed model — you're corrupting it before it's even born. A backdoored model behaves perfectly normally right up until a specific trigger phrase activates a completely different behaviour. Detecting this kind of attack after deployment is extraordinarily difficult."
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
              <p>You've spent years breaking things. Now you're the person who has to build a fortress that can't be broken. As a Principal Architect you're the call the CEO makes when they're scared of the EU AI Act fine, a regulator investigation, or a major data leak making the front pages of every newspaper.</p>
              <p>You aren't in the terminal every day anymore. You're designing Defence-in-Depth pipelines — multi-layered systems where if one guardrail fails, three more are waiting to catch the error. You're the bridge between the technical magic of AI and the cold hard reality of business risk, board expectations, and legal liability.</p>
              <p>Equally as important as the technical architecture is communication. You have to explain to a Board of Directors — who might not even know what a token is — why they need to spend £2M on AI security infrastructure this quarter. You translate maths into money and fear into a budget line.</p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISSP" provider="ISC²" href="https://www.isc2.org/certifications/cissp" difficulty="Advanced" duration="3-6 months prep" cost="Premium" accentColor="#a78bfa" isTop
                what="A broad management-focused exam covering eight domains of security — from risk architecture and asset security to operations management. It proves you understand the big picture of enterprise security at a strategic level."
                why="The boardroom passport. It's less about how to use a tool and vastly more about how to manage enormous enterprise risk. This is the certification that reliably moves you into Director and VP titles and the executive salary that comes with them. Recruiters at this level look for it first."
              />
              <CertCard name="CISM" provider="ISACA" href="https://www.isaca.org/credentialing/cism" difficulty="Advanced" duration="2-4 months prep" cost="Premium" accentColor="#a78bfa"
                what="Focused specifically on security governance, large-scale program development, and incident management from a strategic leadership viewpoint rather than a technical implementation one."
                why="This teaches you how to lead. How to manage a team of elite hackers, handle a budget that's larger than most small companies, and communicate risk clearly to executives without drowning them in technical jargon. It's the ultimate leadership track for a seasoned security professional."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(167,139,250,0.85)" }}>Skills & Labs</p>
            <div className="space-y-6">
              <SkillCard name="Defense-in-Depth Architecture" category="Enterprise AI Security" correlatedTools={["Lakera Guard", "Azure AI Content Safety", "AWS Bedrock Guardrails"]} accentColor="#a78bfa"
                what="Designing multi-layered AI security pipelines where multiple independent controls operate in sequence, so that if any single guardrail is bypassed, subsequent layers still catch the attack."
                why="You don't trust just one filter. You build five. A sophisticated attacker will eventually find a way past a single control — the architecture you design means that bypass still gets caught two layers later. This is the difference between security theatre and actual security."
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
                what="Understanding and implementing the legal frameworks governing AI deployment — from the EU AI Act's risk classifications and obligations to NIST's AI Risk Management Framework for US-focused organisations."
                why="In 2026 the law is as important as the code. A high-risk AI system deployed without proper compliance documentation can cost a company hundreds of millions in EU fines. You need to know how to keep the company's AI legal before regulators come knocking — not after."
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
                what="Translating highly technical AI security findings into business risk language that non-technical executives and board members can immediately understand and act on."
                why="Security teams don't make money — they save it. Your job is to clearly prove the enormous value of the security investment directly to the people who control the budget. You turn complex threat models into a simple number: here's how much we saved the company this quarter. That is how you keep your budget."
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
