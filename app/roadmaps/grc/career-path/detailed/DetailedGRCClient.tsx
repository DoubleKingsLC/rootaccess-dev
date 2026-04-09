"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// ── Data ──────────────────────────────────────────────────────────────────────

const LEVELS = [
  { num: "00", label: "Entry Point",                 color: "#94a3b8", time: "0–6 months" },
  { num: "01", label: "Junior GRC Analyst",          color: "#14b8a6", time: "1–2 years"   },
  { num: "02", label: "GRC Analyst",                 color: "#3b82f6", time: "2–4 years"   },
  { num: "03", label: "GRC Lead",                    color: "#f59e0b", time: "5+ years"    },
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
          href="/roadmaps/grc/career-path"
          className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-white"
          style={{ color: "#14b8a6", textDecoration: "underline" }}
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
  let domain = "google.com";
  try {
     if (href && href !== "#") domain = new URL(href).hostname;
  } catch (e) {}

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(15,20,30,0.7)", border: `1px solid ${accentColor}35` }}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-5" style={{ background: `${accentColor}10`, borderBottom: `1px solid ${accentColor}25` }}>
        <div className="flex-1 min-w-0">
          {isTop && (
            <span className="inline-block font-mono text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 rounded mb-3 font-semibold" style={{ background: `${accentColor}28`, color: accentColor, border: `1px solid ${accentColor}55` }}>
              ★ Recommended
            </span>
          )}
          <div className="flex items-center gap-3">
            <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" width={28} height={28} className="rounded flex-shrink-0" />
            <h4 className="font-mono text-lg font-bold text-white leading-tight">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium" style={{ color: `${accentColor}cc` }}>{provider}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 xl:divide-x" style={{ borderColor: `${accentColor}18` }}>
        <div className="px-6 py-6 font-sans">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>What it teaches</p>
          <p className="text-[15px] leading-relaxed text-slate-300">{what}</p>
        </div>
        <div className="px-6 py-6 font-sans" style={{ borderLeft: `1px solid ${accentColor}18` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>Why at this level</p>
          <p className="text-[15px] leading-relaxed text-slate-300">{why}</p>
        </div>
      </div>
      {href && href !== "#" && (
        <div className="px-6 pb-5">
          <a href={href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors duration-150 hover:opacity-100 underline" style={{ color: `${accentColor}cc` }}>
            Official page
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>
      )}
    </div>
  );
}

interface SkillCardProps {
  name: string;
  category: string;
  correlatedTools: string[];
  accentColor: string;
  what: string;
  why: string;
  resources: {
    free: { label: string; url: string; why?: string }[];
    paid: { label: string; url: string; why?: string }[];
  };
}

function SkillCard({ name, category, correlatedTools, accentColor, what, why, resources }: SkillCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden mt-6" style={{ background: "rgba(15,20,30,0.6)", border: `1px solid ${accentColor}35` }}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-5" style={{ background: `${accentColor}10`, borderBottom: `1px solid ${accentColor}25` }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold" style={{ background: `${accentColor}28`, color: accentColor }}>{name.charAt(0)}</span>
            <h4 className="font-mono text-lg font-bold text-white">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium text-slate-400">{category}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono sm:justify-end">
          {correlatedTools.map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-white/[0.05] text-slate-400 border border-white/10">{t}</span>
          ))}
        </div>
      </div>
      <div className="px-6 py-5 font-sans" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${accentColor}15` }}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>What it is</p>
        <p className="text-[15px] leading-relaxed text-slate-300">{what}</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 font-sans" style={{ borderColor: `${accentColor}18` }}>
        <div className="px-6 py-6 border-b xl:border-b-0" style={{ borderColor: `${accentColor}15` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: `${accentColor}ee` }}>Why you need it here</p>
          <p className="text-[15px] leading-relaxed text-slate-300">{why}</p>
        </div>
        <div className="px-6 py-6 xl:border-l" style={{ borderColor: `${accentColor}18` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 text-slate-400">Resources</p>
          <div className="grid grid-cols-1 gap-6">
            {resources.free.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase text-teal-400/70 mb-3 tracking-widest">Free Resources</p>
                <div className="space-y-4">
                  {resources.free.map(r => (
                    <div key={r.label}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-slate-200 hover:text-white underline decoration-teal-500/30 hover:decoration-teal-500 transition-all block mb-1">
                        {r.label}
                      </a>
                      {r.why && <p className="text-[12px] leading-relaxed text-slate-500">{r.why}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resources.paid.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-bold uppercase text-amber-400/70 mb-3 tracking-widest">Paid / Professional</p>
                <div className="space-y-4">
                  {resources.paid.map(r => (
                    <div key={r.label}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-[13px] font-bold text-slate-200 hover:text-white underline decoration-amber-500/30 hover:decoration-amber-500 transition-all block mb-1">
                        {r.label}
                      </a>
                      {r.why && <p className="text-[12px] leading-relaxed text-slate-500">{r.why}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
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
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] px-3 py-1.5 rounded" style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}>Level {num}</span>
        <span className="font-mono text-[13px] font-medium text-slate-500">{time}</span>
      </div>
      <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white mb-3 tracking-tight">{label}</h2>
      <p className="font-mono text-[14px]" style={{ color: `${color}dd` }}>{subtitle}</p>
      <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />
    </div>
  );
}

function GRCHeroAnimation() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const sequence = [1000, 2500, 4000, 6000];
    const timers = sequence.map((ms, i) => setTimeout(() => setPhase(i + 1), ms));
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="relative w-full max-w-[500px] h-[460px] rounded-2xl bg-[#020f14] border border-teal-500/20 font-mono text-[11px] p-6 shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
      <div className="flex-1 relative z-10 space-y-3">
        <div className="text-teal-400"># verify_compliance --framework ISO27001 --target production</div>
        {phase >= 1 && <div className="text-slate-500">Scanning assets... mapping controls...</div>}
        {phase >= 2 && <div className="text-white border-l-2 border-teal-500 pl-3 py-1">ISO 27001 Annex A.5 identified<br/><span className="text-yellow-400">[GAP] Policy A.5.1 missing executive signature</span></div>}
        {phase >= 3 && <div className="text-teal-400"># generate_risk_report --level executive</div>}
        {phase >= 4 && <div className="mt-4 p-3 bg-teal-500/10 border border-teal-500/30 rounded text-teal-300">Report generated: Strategic Risk Assessment V1.pdf</div>}
      </div>
      <motion.div animate={{ top: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[1px] bg-teal-500/20 pointer-events-none" />
    </div>
  );
}

// ── Page Content ──────────────────────────────────────────────────────────────

export default function DetailedGRCClient() {
  return (
    <div className="min-h-screen bg-[#020f14] text-slate-300">
      <div className="sticky top-0 z-30 h-12 flex items-center px-6 bg-[#020f14]/90 border-b border-white/5 backdrop-blur-xl">
        <Link href="/roadmaps/grc/career-path" className="font-mono text-[11px] uppercase tracking-widest text-slate-500 hover:text-white underline">Career Path</Link>
        <span className="mx-2 text-slate-800">/</span>
        <span className="font-mono text-[11px] uppercase tracking-widest font-bold text-slate-400">Deep Dive</span>
        <div className="flex-1" />
        <div className="flex gap-2 lg:hidden">
          {LEVELS.map(l => <a key={l.num} href={`#level-${l.num}`} className="w-6 h-6 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-bold" style={{ color: l.color }}>{l.num}</a>)}
        </div>
      </div>

      <div className="px-6 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.5em] text-teal-400/70 mb-6 font-bold">GRC Deep Dive</p>
            <h1 className="text-6xl sm:text-7xl font-bold text-white mb-8 leading-[0.95] tracking-tight">The Strategic <span className="text-teal-400">Path</span></h1>
            <p className="text-xl leading-relaxed max-w-xl text-slate-400">From foundation audits to steering corporate strategy. This is the breakdown of the certs, the skills, and the honest reason behind each GRC milestone.</p>
          </div>
          <div className="hidden lg:flex justify-end"><GRCHeroAnimation /></div>
        </div>
      </div>

      <div className="flex">
        <Sidebar />
        <main className="flex-1 px-6 lg:px-16">

          {/* LEVEL 00 */}
          <section id="level-00" className="py-20">
            <SectionHeader
              num="00" label="The Entry Point" color="#94a3b8"
              subtitle="Building the Foundation"
              time="0-6 months"
            />
            <div className="space-y-6 text-lg leading-relaxed mb-14 text-slate-400 font-sans">
              <p>
                Security requires breaking things to see how they work. Before hunting attackers, you need a solid grasp of the basics. This means knowing hardware, operating systems, and networks.
              </p>
              <p>
                The internet relies on Linux. Navigating a terminal is mandatory. You need to understand what happens under the hood instead of just clicking buttons on a dashboard.
              </p>
              <p>
                Networking acts as the physics of the digital world. If you don't know normal traffic patterns, you can't spot the abnormal ones. This level turns complex technical jargon into simple concepts you can explain easily.
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

          <div className="h-px bg-white/5" />

          {/* LEVEL 01 */}
          <section id="level-01" className="py-20">
            <SectionHeader num="01" label="Junior GRC Analyst" color="#14b8a6" subtitle="Evidence & Documentation" time="1–2 years" />
            <div className="space-y-6 text-lg leading-relaxed mb-14 text-slate-400 font-sans">
              <p>
                Your first year in GRC involves a lot of documentation. You are building the institutional memory of your company. Expect to collect screenshots of access controls, pull audit logs, chase engineers for questionnaires, and organize evidence for SOC 2 reviews. This matters because missing evidence means an automatic audit finding.
              </p>
              <p>
                You are now executing GRC instead of just studying it. You must prove your organization follows specific frameworks. You will get a compliance platform, a control list, and a tight deadline. Your job is to translate compliance requirements into actual documented proof.
              </p>
              <p>
                Your biggest goal is learning to identify high quality evidence. Anyone can drop a log file in a folder. The best analysts know exactly what satisfies an auditor without inviting more questions. Master this instinct to move forward.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(20,184,166,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="GRC Mastery" provider="RootAccess" href="https://www.grcmastery.com/" accentColor="#14b8a6" isTop
                what="Technical GRC execution from the ground up. You learn to map frameworks (NIST, ISO) to real-world controls, automate evidence collection with Vanta/Drata, and draft policies that survive actual audit scrutiny."
                why="This is the 'Zero to One' for GRC. While generic certs focus on multiple choice theory, GRC Mastery focuses on the actual deliverables—gap analysis, audit defense, and control operationalization. This is what you put on your resume to prove you can do the job on Day 1."
              />
              <CertCard name="CompTIA Security+" provider="CompTIA" href="https://www.comptia.org/certifications/security" accentColor="#14b8a6"
                what="Covers threat detection, identity and access management, cryptography, network security, and risk management fundamentals. It is broad by design — this is a survey of the technical landscape GRC sits on top of."
                why="Most ATS systems filter for this cert before a human ever reads your resume. Beyond the filter, it gives you the technical vocabulary you need to have credible conversations with engineers when you are auditing their controls. It's a solid technical alternative if you need the HR checkmark."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(20,184,166,0.85)" }}>Skills & Resources</p>
            <div className="space-y-6">
              <SkillCard
                name="Evidence Collection"
                category="Audit Operations"
                correlatedTools={["Excel", "Vanta", "eramba"]}
                accentColor="#14b8a6"
                what="The process of gathering, organizing, and validating proof that a security control is operating as documented. This means pulling access logs, config exports, training records, and vendor contracts."
                why="At this level, evidence collection is literally the job description. You make sure the auditor's request doesn't turn into a fire drill. A missed or weak piece of evidence gets a finding. Enough findings and your organization fails the audit. It is that direct."
                resources={{
                  free: [
                    { label: "NIST SP 800-53A — Assessing Security Controls", url: "https://csrc.nist.gov/pubs/sp/800/53/a/r5/final", why: "The official guide to what 'assessing a control' actually means. Read this to understand exactly what auditors are looking for." },
                    { label: "eramba Community Edition", url: "https://www.eramba.org/community-edition", why: "Spin it up locally and build a mock compliance program. The fastest way to understand how controls map to evidence before doing it in production." },
                  ],
                  paid: [
                    { label: "Cybrary GRC Analyst Career Path", url: "https://www.cybrary.it/career-path/grc-analyst", why: "Structured hands-on labs that walk through real evidence collection and control assessment scenarios, not just theory." }
                  ]
                }}
              />
              <SkillCard
                name="Policy Writing"
                category="Governance"
                correlatedTools={["Confluence", "Notion"]}
                accentColor="#14b8a6"
                what="Drafting the internal documents that define how a company's employees and systems are supposed to behave (AUP, Data Classification, IR, etc.) written to survive external audit scrutiny."
                why="Every framework requires documented policies. No policy, automatic finding. More importantly, a badly written or out-of-date policy creates legal and audit exposure. Junior analysts who can write tight, auditable policies stand out immediately."
                resources={{
                  free: [
                    { label: "SANS Security Policy Templates", url: "https://www.sans.org/information-security-policy/", why: "SANS offers a full library of free, peer-reviewed policy templates. Use them to understand the structure and required components before adapting them." },
                    { label: "NIST CSF 2.0 Full Document", url: "https://www.nist.gov/cyberframework", why: "Read the Govern function. That section is essentially a checklist of every governance document your organization needs." },
                  ],
                  paid: [
                    { label: "Simply Cyber GRC Analyst Course", url: "https://simplycyber.teachable.com/", why: "Gerald Auger covers policy writing from a practitioner's perspective, including what auditors actually check versus what looks good on paper." }
                  ]
                }}
              />
              <SkillCard
                name="Framework Literacy"
                category="Compliance"
                correlatedTools={["Excel", "eramba"]}
                accentColor="#14b8a6"
                what="The ability to read a framework requirement (ISO 27001, NIST CSF) and translate it into a concrete question: 'What does this organization need to have in place, and how would we prove it?'"
                why="You will be mapping controls and identifying gaps from day one. If you cannot read a framework requirement and immediately understand what it is asking for, every task downstream is slower and more error-prone."
                resources={{
                  free: [
                    { label: "NIST CSF 2.0 Reference Tool", url: "https://csrc.nist.gov/projects/cybersecurity-framework/filters", why: "The interactive online version lets you browse functions and implementation examples. Spend an afternoon mapping a fictional company's controls against it." },
                    { label: "Simply Cyber YouTube Channel", url: "https://www.youtube.com/@SimplyCyber", why: "The most consistently practical free GRC content online. Start with any audit scenario or framework mapping exercise." },
                  ],
                  paid: [
                    { label: "ISO 27001 Foundation Course", url: "https://www.udemy.com/topic/iso-27001/", why: "A structured walkthrough of the standard before you try to work with it in a job context. Cheap and sufficient at this level." }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px bg-white/5" />

          {/* LEVEL 02 */}
          <section id="level-02" className="py-20">
            <SectionHeader num="02" label="GRC Analyst" color="#3b82f6" subtitle="Audit Ownership & Risk Lifecycle" time="2–4 years" />
            <div className="space-y-6 text-lg leading-relaxed mb-14 text-slate-400 font-sans">
              <p>
                By year two, something changes. You have survived a full audit cycle. You have felt the panic of missing evidence and seen findings issued over simple errors. Now, you understand the game well enough to spot gaps before an auditor does. This instinct separates junior analysts from seniors.
              </p>
              <p>
                At this level, you take ownership. You lead audit cycles, run vendor assessments, and build the gap analysis that tells leadership where they are exposed. You are the one explaining to engineering leads why they need a change management log. More importantly, you get them to actually do it. GRC at this stage is just as much about influence as it is about analysis.
              </p>
              <p>
                Before moving to Lead, you must master closing the loop. It is not enough to just find a gap. You must assign owners, track the fix, and produce a final report showing the difference. Finding a problem without driving the solution holds your career back. Own the problem from start to finish.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(59,130,246,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISA — Certified Information Systems Auditor" provider="ISACA" href="https://www.isaca.org/credentialing/cisa" accentColor="#3b82f6" isTop
                what="The industry gold standard for auditing information systems. Covers the full audit lifecycle — planning, fieldwork, reporting, and follow-up — across systems, controls, and governance."
                why="CISA is the credential that tells a hiring manager or client that you can own an audit, not just participate in one. It is on more mid-to-senior GRC job descriptions than any other single cert. Study now and sit it the moment you are eligible."
              />
              <CertCard name="ISO 27001 Lead Implementer" provider="ISO" href="https://www.iso.org/standard/27001" accentColor="#3b82f6"
                what="How to design, implement, and manage an ISMS from scratch. Covers scope definition, risk assessment methodology, Statement of Applicability, and internal audit process."
                why="CISA proves you can audit an existing program; Lead Implementer proves you can build one. If you are in consulting or helping organizations achieve certification, this is more immediately useful. Strong signal for international markets."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(59,130,246,0.85)" }}>Skills & Resources</p>
            <div className="space-y-6">
              <SkillCard
                name="Gap Analysis"
                category="Risk Strategy"
                correlatedTools={["Excel", "Vanta"]}
                accentColor="#3b82f6"
                what="A structured comparison of what a framework requires against what an organization has in place. The output is a prioritized list of control gaps — ranked by risk exposure and tied to remediation."
                why="Gap analysis is the deliverable that justifies GRC's seat at the table. It translates abstract requirements into a concrete list of decisions leadership needs to make. If an executive can read it in ten minutes and understand their exposure, you are valuable."
                resources={{
                  free: [
                    { label: "NIST SP 800-53 Rev 5 Control Catalog", url: "https://csrc.nist.gov/pubs/sp/800/53/r5/final", why: "The reference standard for control requirements. Build a mock gap analysis using this catalog against a fictional organization; it is the best way to understand assessment rigor." },
                    { label: "CISA Gap Analysis Templates", url: "https://www.cisa.gov/resources-tools/resources/gap-analysis-tool", why: "Government-published templates that show the output format auditors and regulators actually expect to see." }
                  ],
                  paid: [
                    { label: "ISACA CISA Review Manual", url: "https://www.isaca.org/bookstore/bookstore-review-manuals", why: "The control assessment methodology in this manual is the practical framework for conducting rigorous gap analysis." }
                  ]
                }}
              />
              <SkillCard
                name="Vendor Risk Management"
                category="Third-Party Risk"
                correlatedTools={["OneTrust", "Vanta"]}
                accentColor="#3b82f6"
                what="Evaluating the security posture of third-party vendors (questionnaires, reviewing SOC 2 reports, etc.) and making risk-based recommendations on vendor relationships."
                why="Most data breaches involve a third party. If your organization can't demonstrate it has reviewed its critical vendors, that is a significant finding. You need to know how to identify exceptions and missing controls in a SOC 2 report."
                resources={{
                  free: [
                    { label: "AICPA SOC 2 Overview", url: "https://us.aicpa.org/interestareas/frc/auditattest/soc-2", why: "The authoritative source on what a SOC 2 report is. Read this before reviewing a vendor's report or you will miss the Trust Service Criteria that matter." },
                    { label: "Shared Assessments SIG Questionnaire", url: "https://sharedassessments.org/sig/", why: "The industry-standard vendor security questionnaire. Understand its structure to build a mature third-party risk program." }
                  ],
                  paid: [
                    { label: "Cybrary Third-Party Risk Management Course", url: "https://www.cybrary.it/course/third-party-risk-management", why: "Practical walkthrough of the full vendor assessment lifecycle from intake to handling a vendor who fails your assessment." }
                  ]
                }}
              />
              <SkillCard
                name="Risk Lifecycle Management"
                category="Risk Operations"
                correlatedTools={["ServiceNow IRM", "eramba"]}
                accentColor="#3b82f6"
                what="Taking a risk from first identification to board-level reporting: logging it, assigning owners, tracking mitigation, and validating that remediation actually closed the gap."
                why="A lot of junior analysts identify risk and hand it off. At this level you are accountable for the full loop. The analysts who close the loop are the ones who get asked to run programs. This is how you build Lead credibility."
                resources={{
                  free: [
                    { label: "NIST Risk Management Framework (SP 800-37)", url: "https://csrc.nist.gov/pubs/sp/800/37/r2/final", why: "The definitive reference for how a risk lifecycle should be structured. The six-step process is the clearest articulation of end-to-end risk management." },
                    { label: "ServiceNow Developer Program", url: "https://developer.servicenow.com/", why: "Free personal developer instance. Build a mock risk register and dashboard; hands-on ServiceNow experience is a massive differentiator." }
                  ],
                  paid: [
                    { label: "ISACA CRISC Review Manual", url: "https://www.isaca.org/bookstore/bookstore-review-manuals", why: "The risk lifecycle content in this manual is the clearest practitioner-level explanation of how enterprise risk works in mature organizations." }
                  ]
                }}
              />
            </div>
          </section>

          <div className="h-px bg-white/5" />

          {/* LEVEL 03 */}
          <section id="level-03" className="py-20 pb-32">
            <SectionHeader num="03" label="GRC Lead" color="#f59e0b" subtitle="Program Design & Executive Influence" time="5+ years" />
            <div className="space-y-6 text-lg leading-relaxed mb-14 text-slate-400 font-sans">
              <p>
                The hardest transition in GRC is moving from analyst to lead. The methodical execution that got you here is no longer enough. Now, your job is deciding what the program prioritizes and convincing senior leadership to act. The CFO does not care about your spreadsheet. The board ignores NIST subcategories. You must translate technical details into clear business decisions.
              </p>
              <p>
                At this stage, you build the entire program architecture. You decide which frameworks to adopt. You work with the CISO and CFO to define exactly how much risk the organization will accept. You select the tooling, establish the standards, and build the reports. Every analyst on your team executes against the blueprint you designed.
              </p>
              <p>
                The defining skill of a Lead is moving from colors to numbers. Saying ransomware is a "high" risk means nothing. Saying it represents a three million dollar loss that can be mitigated for two hundred thousand dollars is actionable. Executives respond to numbers. Master quantitative risk analysis because it is the language of leadership.
              </p>
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mb-6" style={{ color: "rgba(245,158,11,0.85)" }}>Certifications</p>
            <div className="space-y-5">
              <CertCard name="CISSP — Certified Information Systems Security Professional" provider="ISC2" href="https://www.isc2.org/certifications/cissp" accentColor="#f59e0b" isTop
                what="Eight domains spanning the full security landscape. The broadest security credential available, globally recognized cross-industry and by executives who may not know specialized certs."
                why="CISSP is the credential that travels. If your Lead role spans both GRC and technical teams — or if you are in a market where brand recognition matters most — CISSP signals authority at a level others do not."
              />
              <CertCard name="CRISC — Certified in Risk and Information Systems Control" provider="ISACA" href="https://www.isaca.org/credentialing/crisc" accentColor="#f59e0b"
                what="Enterprise-level IT risk identification, response, and reporting. Covers risk appetite definition, control design, and how to produce metrics that drive board-level decisions."
                why="CRISC is the credential that signals you can run a risk program, not just work in one. It sits on Head of GRC or Senior Risk Manager job descriptions. It is the clearest signal to the CISO that you think at a program level."
              />
            </div>

            <p className="font-mono text-[12px] font-semibold uppercase tracking-[0.25em] mt-12 mb-6" style={{ color: "rgba(245,158,11,0.85)" }}>Skills & Resources</p>
            <div className="space-y-6">
              <SkillCard
                name="GRC Program Design"
                category="Program Architecture"
                correlatedTools={["ServiceNow IRM", "Vanta"]}
                accentColor="#f59e0b"
                what="Designing the end-to-end governance program from the ground up: selecting frameworks, establishing risk appetite, choosing tooling, and setting evidence standards."
                why="Every analyst-level skill exists within a program someone designed. At Lead, you are the one designing it. The first question is always: 'What are we actually trying to accomplish, and what is the simplest structure that gets us there?' Answering that is the entire job."
                resources={{
                  free: [
                    { label: "NIST Cybersecurity Framework 2.0 — Govern Function", url: "https://www.nist.gov/cyberframework", why: "The Govern function in CSF 2.0 is essentially a blueprint for a mature GRC program structure. Read it as a design checklist, not just a reference." },
                    { label: "ISACA COBIT Framework Overview", url: "https://www.isaca.org/resources/cobit", why: "COBIT is the governance framework that underpins how GRC connects to business objectives. Understanding it gives you the architecture for C-suite conversations." }
                  ],
                  paid: [
                    { label: "ServiceNow IRM Implementation Training", url: "https://nowlearning.servicenow.com/", why: "At Lead level you need to know how to configure and run a GRC platform at organizational scale. Covers IRM implementation from a program architect's perspective." }
                  ]
                }}
              />
              <SkillCard
                name="Quantitative Risk Analysis (FAIR)"
                category="Risk Strategy"
                correlatedTools={["FAIR Model", "Power BI"]}
                accentColor="#f59e0b"
                what="A methodology for quantifying risk in financial terms (Factor Analysis of Information Risk). It produces a range of probable financial loss outcomes that executives can weigh against mitigation costs."
                why="Qualitative ratings (color maps) get ignored in boardrooms. If you can say 'this risk represents $1.8M in annualized loss expectancy and we can reduce it by 70% with a $300K investment,' you are no longer a cost center. You are a business advisor."
                resources={{
                  free: [
                    { label: "FAIR Institute — Open FAIR Standard", url: "https://www.fairinstitute.org/", why: "The nonprofit that stewards the standard publishes free introductory material and case studies. Start here to see how practitioners apply FAIR to real scenarios." },
                    { label: "Open FAIR Body of Knowledge", url: "https://www.opengroup.org/certifications/open-fair", why: "The formal technical specification of the FAIR taxonomy and model. The authoritative reference for practitioners." }
                  ],
                  paid: [
                    { label: "RiskLens FAIR Training", url: "https://www.risklens.com/training", why: "The most direct path to practical FAIR fluency. Non-negotiable if your organization is considering a quantitative risk platform." }
                  ]
                }}
              />
              <SkillCard
                name="Executive & Board Reporting"
                category="Strategic Communication"
                correlatedTools={["Power BI", "ServiceNow"]}
                accentColor="#f59e0b"
                what="Translating program complexity into concise, decision-ready formats: risk posture scores, trend data, and prioritized residual risks requiring board decisions — without GRC jargon."
                why="Everything your team does is in service of this output. If the board cannot understand your report, they cannot make informed decisions. The ability to communicate risk in business language is the most career-defining skill at this level."
                resources={{
                  free: [
                    { label: "The CISO Playbook — Vanta On-Demand", url: "https://www.vanta.com/ciso-playbook", why: "Conversations from working CISOs on what executives actually want to hear versus what security teams tend to report." },
                    { label: "NACD Cyber-Risk Oversight Handbook", url: "https://www.nacdonline.org/insights/handbook.cfm?itemnumber=67298", why: "Written for board directors, this tells you exactly how boards think about cyber risk. Read the audience's own handbook to learn how to write for them." }
                  ],
                  paid: [
                    { label: "ISACA CRISC Review Manual — Reporting Sections", url: "https://www.isaca.org/bookstore/bookstore-review-manuals", why: "Covers executive risk metrics and board reporting formats in more practical depth than any standalone course." }
                  ]
                }}
              />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
