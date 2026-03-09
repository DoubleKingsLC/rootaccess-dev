"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

// ── Level data ─────────────────────────────────────────────────────────────────
const LEVELS = [
  {
    num: "00",
    label: "Entry Point",
    subtitle: "No Experience Required",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.18)",
    border: "rgba(148,163,184,0.22)",
    quote: "You don't need a degree. You need curiosity and the discipline to build it. Everyone starts here.",
    time: "0–6 months",
    salary: "£25K–£35K",
    tools: ["TryHackMe", "Wireshark", "VirtualBox", "Kali Linux", "Python"],
    cards: [
      {
        title: "Core Skills",
        icon: "⚡",
        items: [
          "Networking — TCP/IP, DNS, DHCP, subnetting",
          "OS fundamentals — Windows & Linux",
          "Security concepts — CIA triad, common threats",
          "Scripting basics — Python or Bash",
        ],
      },
      {
        title: "Certifications",
        icon: "🎯",
        items: [
          "CompTIA Security+",
          "Google Cybersecurity Certificate",
          "ISC² CC — free and officially endorsed",
        ],
      },
      {
        title: "Practice Labs",
        icon: "🧪",
        items: [
          "TryHackMe · Pre-Security learning path",
          "Cybrary · Intro to IT & Cybersecurity",
          "Professor Messer · Security+ free course",
        ],
      },
    ],
  },
  {
    num: "01",
    label: "L1 Triage Analyst",
    subtitle: "First Line of Detection",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.18)",
    border: "rgba(34,211,238,0.22)",
    quote: "07:45. You open the SIEM dashboard. 4,200 alerts overnight. Your job is to find the three that matter.",
    time: "6–18 months",
    salary: "£30K–£45K",
    tools: ["Splunk", "Microsoft Sentinel", "CrowdStrike Falcon", "VirusTotal", "ServiceNow"],
    cards: [
      {
        title: "Core Skills",
        icon: "⚡",
        items: [
          "SIEM log analysis and search query writing",
          "Alert triage, classification, and prioritisation",
          "IOC lookup and contextual enrichment",
          "Incident ticketing and escalation procedures",
        ],
      },
      {
        title: "Certifications",
        icon: "🎯",
        items: [
          "BTL1 — Blue Team Level 1",
          "CompTIA CySA+ (Cybersecurity Analyst)",
          "SC-200 Microsoft Security Operations",
        ],
      },
      {
        title: "Practice Labs",
        icon: "🧪",
        items: [
          "LetsDefend · SOC Analyst learning path",
          "TryHackMe · SOC Level 1 complete track",
          "HTB · SOC Defender career path",
        ],
      },
    ],
  },
  {
    num: "02",
    label: "L2 Advanced Analyst",
    subtitle: "Pattern Recognition & Correlation",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.18)",
    border: "rgba(139,92,246,0.22)",
    quote: "Three events. Each harmless alone. But you see them together — and you see the attacker's hand.",
    time: "2–4 years",
    salary: "£45K–£65K",
    tools: ["Velociraptor", "MISP", "TheHive / Cortex", "Wireshark", "Elastic SIEM"],
    cards: [
      {
        title: "Core Skills",
        icon: "⚡",
        items: [
          "Threat correlation and attack pattern mapping",
          "Malware triage — static and dynamic analysis",
          "MITRE ATT&CK framework and TTP identification",
          "SOAR automation and playbook development",
        ],
      },
      {
        title: "Certifications",
        icon: "🎯",
        items: [
          "GCIH — GIAC Certified Incident Handler",
          "BTL2 — Blue Team Level 2",
          "PNPT — Practical Network Penetration Testing",
        ],
      },
      {
        title: "Practice Labs",
        icon: "🧪",
        items: [
          "CyberDefenders · Blue Team challenge labs",
          "DFIR.training · forensic scenario exercises",
          "Malware-traffic-analysis.net pcap analysis",
        ],
      },
    ],
  },
  {
    num: "03",
    label: "L3 Forensic Analyst",
    subtitle: "Deep Forensics & Incident Lead",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.18)",
    border: "rgba(245,158,11,0.22)",
    quote: "You pull the disk. You find the malware. You trace it to its first byte. This is where the story ends.",
    time: "4–7 years",
    salary: "£65K–£90K",
    tools: ["Autopsy", "Volatility", "Ghidra", "x64dbg", "FTK Imager", "REMnux"],
    cards: [
      {
        title: "Core Skills",
        icon: "⚡",
        items: [
          "Disk and memory forensics — full acquisition",
          "Malware reverse engineering and binary analysis",
          "C2 infrastructure profiling and attribution",
          "APT tracking and threat intelligence production",
        ],
      },
      {
        title: "Certifications",
        icon: "🎯",
        items: [
          "GCFE — GIAC Certified Forensic Examiner",
          "GREM — GIAC Reverse Engineering Malware",
          "CREST CPIA — Practitioner Intrusion Analyst",
        ],
      },
      {
        title: "Practice Labs",
        icon: "🧪",
        items: [
          "Proxmox + Wazuh — build your own SOC homelab",
          "REMnux malware analysis environments",
          "SANS FOR508 courseware — advanced DFIR",
        ],
      },
    ],
  },
  {
    num: "04",
    label: "SOC Lead",
    subtitle: "Operations Command",
    color: "#34d399",
    glow: "rgba(52,211,153,0.18)",
    border: "rgba(52,211,153,0.22)",
    quote: "The team responds as fast as the system you built for them. Your job: make the next incident take 10 minutes, not 15.",
    time: "7+ years",
    salary: "£90K–£130K+",
    tools: ["Palo Alto XSOAR", "PowerBI", "ServiceNow SecOps", "Confluence / Jira"],
    cards: [
      {
        title: "Core Skills",
        icon: "⚡",
        items: [
          "SOC architecture design and tool strategy",
          "MTTD / MTTR KPI definition and reporting",
          "Analyst mentoring and career development",
          "Executive stakeholder communication",
        ],
      },
      {
        title: "Certifications",
        icon: "🎯",
        items: [
          "CISM — Certified Information Security Manager",
          "CISSP — Certified Information Systems Security Professional",
          "SANS MGT551 · Building and Leading SOCs",
        ],
      },
      {
        title: "Practice Labs",
        icon: "🧪",
        items: [
          "Lead tabletop incident response exercises",
          "Build detection engineering pipelines",
          "Design and run purple team engagements",
        ],
      },
    ],
  },
] as const;

const ACTIONS = [
  {
    icon: "🧪",
    title: "Start in a Lab Today",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.22)",
    glow: "rgba(34,211,238,0.07)",
    items: [
      "TryHackMe SOC Level 1 path — free to start",
      "LetsDefend.io — real SOC scenario alerts",
      "CyberDefenders — blue team challenge labs",
    ],
  },
  {
    icon: "📁",
    title: "Build a Portfolio",
    color: "#8b5cf6",
    border: "rgba(139,92,246,0.22)",
    glow: "rgba(139,92,246,0.07)",
    items: [
      "Write lab walkthrough reports in PDF format",
      "Document your homelab with screenshots",
      "GitHub: scripts, tools, and detection rules",
    ],
  },
  {
    icon: "💼",
    title: "Find Entry-Level Roles",
    color: "#34d399",
    border: "rgba(52,211,153,0.22)",
    glow: "rgba(52,211,153,0.07)",
    items: [
      "CyberSecJobs.com and ClearanceJobs.com",
      "LinkedIn: search 'SOC Analyst' + set alerts",
      "NCSC Cyber First — UK government pathways",
    ],
  },
] as const;

export default function SocCareerPathPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef      = useRef<HTMLDivElement>(null);
  const trunkRef     = useRef<HTMLDivElement>(null);

  const sectionRefs = useRef<(HTMLElement | null)[]>(Array(5).fill(null));
  const hubRefs     = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const quoteRefs   = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const statsRefs   = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const cardRefs    = useRef<(HTMLDivElement | null)[]>(Array(15).fill(null));
  const branchRefs  = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const dotRefs     = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));

  const [activeLevel, setActiveLevel] = useState<number>(-1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ─────────────────────────────────────────────────────
      if (heroRef.current) {
        gsap.fromTo(
          heroRef.current.querySelectorAll<HTMLElement>(".hero-anim"),
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.13, delay: 0.2 }
        );
      }

      // ── Global trunk grows as you scroll ──────────────────────────────────
      if (trunkRef.current) {
        gsap.set(trunkRef.current, { scaleY: 0, transformOrigin: "top center" });
        gsap.to(trunkRef.current, {
          scaleY: 1, ease: "none",
          scrollTrigger: {
            trigger: sectionRefs.current[0],
            start: "top 80%",
            end: sectionRefs.current[4]
              ? () => `${(sectionRefs.current[4]!.offsetTop || 0) + (sectionRefs.current[4]!.offsetHeight || 0)}px top`
              : "+=8000",
            scrub: 1.2,
          },
        });
      }

      // ── Per-level animations ───────────────────────────────────────────────
      LEVELS.forEach((_, i) => {
        const section = sectionRefs.current[i];
        if (!section) return;

        const trigger = {
          trigger: section,
          start: "top 66%",
          toggleActions: "play none none reverse" as const,
        };

        ScrollTrigger.create({
          trigger: section, start: "top 55%", end: "bottom 45%",
          onEnter: () => setActiveLevel(i),
          onEnterBack: () => setActiveLevel(i),
        });

        // Hub scale in
        const hub = hubRefs.current[i];
        if (hub) {
          gsap.fromTo(hub,
            { scale: 0, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.9)", scrollTrigger: trigger }
          );
        }

        // Quote fade up
        const quote = quoteRefs.current[i];
        if (quote) {
          gsap.fromTo(quote,
            { opacity: 0, y: 22 },
            { opacity: 1, y: 0, duration: 0.65, ease: "power3.out", scrollTrigger: { ...trigger, start: "top 63%" } }
          );
        }

        // Stats strip
        const stats = statsRefs.current[i];
        if (stats) {
          gsap.fromTo(stats,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", delay: 0.1, scrollTrigger: trigger }
          );
        }

        // Single horizontal arm from hub
        const branch = branchRefs.current[i];
        if (branch) {
          gsap.set(branch, { scaleX: 0, transformOrigin: "left center" });
          gsap.to(branch, {
            scaleX: 1, duration: 0.5, ease: "power2.out",
            scrollTrigger: { ...trigger, start: "top 60%" },
          });
        }

        // Junction dot
        const dot = dotRefs.current[i];
        if (dot) {
          gsap.set(dot, { opacity: 0, scale: 0 });
          gsap.to(dot, {
            opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)",
            delay: 0.3,
            scrollTrigger: { ...trigger, start: "top 60%" },
          });
        }

        // Cards stagger fade-up
        for (let j = 0; j < 3; j++) {
          const card = cardRefs.current[i * 3 + j];
          if (card) {
            gsap.fromTo(card,
              { opacity: 0, y: 28 },
              {
                opacity: 1, y: 0, duration: 0.65, ease: "power2.out",
                delay: 0.3 + j * 0.15,
                scrollTrigger: { ...trigger, start: "top 62%" },
              }
            );
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">

      {/* ── Fixed header ─────────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-slate-950/85 px-8 py-3.5 backdrop-blur-md">
        <button
          onClick={() => router.push("/roadmaps/soc")}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-cyan-300"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          SOC Experience
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-cyan-400">SOC Career Path</p>
        <div className="w-32" />
      </header>

      {/* ── Fixed level nav (right) ─────────────────────────────────────────── */}
      <nav className="pointer-events-none fixed right-6 top-1/2 z-50 -translate-y-1/2 flex flex-col items-end gap-5">
        {LEVELS.map((level, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-600">{level.num}</span>
            <div
              className="h-2.5 w-2.5 rounded-full border transition-all duration-500"
              style={{
                borderColor: activeLevel >= i ? level.color : "rgba(51,65,85,0.5)",
                background: activeLevel >= i ? level.color : "transparent",
                boxShadow: activeLevel === i ? `0 0 14px ${level.color}` : "none",
              }}
            />
          </div>
        ))}
      </nav>

      <div ref={containerRef} className="pt-16">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0" style={{
            backgroundImage: "linear-gradient(to right, rgba(30,41,59,0.45) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.45) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(circle at center, transparent 35%, rgba(2,6,23,0.96) 100%)",
          }} />
          <div className="pointer-events-none absolute inset-0" style={{
            background: "radial-gradient(ellipse at center, rgba(52,211,153,0.04) 0%, transparent 60%)",
          }} />

          <div ref={heroRef} className="relative z-10 max-w-3xl px-8 text-center">
            <div className="hero-anim mb-4 flex justify-center">
              <div className="rounded border border-cyan-500/30 bg-cyan-950/20 px-4 py-1.5">
                <p className="font-mono text-[9px] uppercase tracking-[0.55em] text-cyan-400">Security Operations Centre</p>
              </div>
            </div>
            <div className="hero-anim mb-5 flex justify-center">
              <p className="font-mono font-black leading-none text-emerald-400"
                style={{ fontSize: "clamp(72px,14vw,128px)", textShadow: "0 0 80px rgba(52,211,153,0.65), 0 0 160px rgba(52,211,153,0.3)" }}>
                15m
              </p>
            </div>
            <p className="hero-anim mb-3 font-sans text-lg leading-relaxed text-slate-100">
              That&apos;s how long it took to detect, triage, escalate, and contain a live ransomware attempt.
            </p>
            <p className="hero-anim font-sans text-base leading-relaxed text-slate-400">
              Behind every response are five career levels — each a different set of skills, tools, and responsibility. Scroll to see exactly how you get there.
            </p>
            <div className="hero-anim mt-10 flex justify-center">
              <div className="flex animate-bounce flex-col items-center gap-1.5 text-slate-600">
                <span className="font-mono text-[9px] uppercase tracking-widest">Scroll to explore</span>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 2L7 12M2 7L7 12L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* ── Career Levels ─────────────────────────────────────────────────── */}
        <div className="relative mx-auto max-w-6xl px-8">

          {/* Global vertical trunk — spans all level sections */}
          <div className="pointer-events-none absolute" style={{ left: 55, top: 0, bottom: 0, width: 2 }}>
            <div ref={trunkRef} className="tech-tree-trunk h-full w-full" />
          </div>

          {LEVELS.map((level, i) => (
            <section
              key={level.num}
              ref={(el) => { sectionRefs.current[i] = el; }}
              className="relative flex min-h-screen flex-col py-20"
            >
              {/* Section separator line */}
              {i > 0 && (
                <div className="pointer-events-none absolute inset-x-0 top-0 h-px"
                  style={{ background: `linear-gradient(to right, transparent 5%, ${level.color}15 35%, ${level.color}15 65%, transparent 95%)` }} />
              )}

              {/* ── Zone 1: Header row ────────────────────────────────────── */}
              <div className="flex items-start gap-8">

                {/* Hub column */}
                <div className="relative flex w-[88px] shrink-0 flex-col items-center">
                  <div
                    ref={(el) => { hubRefs.current[i] = el; }}
                    className="relative flex h-14 w-14 items-center justify-center rounded-full border-2 bg-slate-950"
                    style={{ borderColor: level.color, boxShadow: `0 0 28px ${level.glow}, 0 0 56px ${level.glow}` }}
                  >
                    <span className="font-mono text-base font-black" style={{ color: level.color }}>{level.num}</span>
                    <div className="absolute -inset-3 animate-pulse rounded-full border opacity-20"
                      style={{ borderColor: level.color }} />
                  </div>

                  {/* Horizontal arm from hub right edge into content */}
                  <div
                    ref={(el) => { branchRefs.current[i] = el; }}
                    className="pointer-events-none absolute"
                    style={{
                      top: 27,
                      left: 72,
                      height: 1.5,
                      width: 56,
                      background: `linear-gradient(to right, ${level.color}55, ${level.color}cc)`,
                      boxShadow: `0 0 14px ${level.color}70, 0 0 28px ${level.color}35`,
                    }}
                  />

                  {/* Junction dot at arm end */}
                  <div
                    ref={(el) => { dotRefs.current[i] = el; }}
                    className="pointer-events-none absolute rounded-full"
                    style={{
                      top: 24,
                      left: 124,
                      width: 8,
                      height: 8,
                      background: level.color,
                      boxShadow: `0 0 10px ${level.color}, 0 0 20px ${level.color}60`,
                    }}
                  />

                  {/* Vertical label */}
                  <div className="mt-5" style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}>
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em]"
                      style={{ color: level.color, opacity: 0.6 }}>
                      {level.label}
                    </span>
                  </div>
                </div>

                {/* Quote */}
                <div ref={(el) => { quoteRefs.current[i] = el; }} className="flex-1 opacity-0">
                  <span className="font-mono text-[10px] uppercase tracking-[0.45em]"
                    style={{ color: level.color }}>
                    {level.subtitle}
                  </span>
                  <p className="mt-2 font-sans text-2xl italic leading-relaxed text-slate-100"
                    style={{ textShadow: `0 0 50px ${level.glow}` }}>
                    &ldquo;{level.quote}&rdquo;
                  </p>
                </div>
              </div>

              {/* ── Stats + tools strip ───────────────────────────────────── */}
              <div
                ref={(el) => { statsRefs.current[i] = el; }}
                className="mt-6 flex flex-wrap items-center gap-2 opacity-0"
                style={{ paddingLeft: 120 }}
              >
                <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5"
                  style={{ borderColor: level.border, background: level.glow }}>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">Time</span>
                  <span className="font-mono text-xs font-bold" style={{ color: level.color }}>{level.time}</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg border px-3 py-1.5"
                  style={{ borderColor: level.border, background: level.glow }}>
                  <span className="font-mono text-[8px] uppercase tracking-widest text-slate-500">Salary</span>
                  <span className="font-mono text-xs font-bold" style={{ color: level.color }}>{level.salary}</span>
                </div>
                <div className="mx-1 h-4 w-px bg-slate-700/50" />
                {level.tools.map((tool) => (
                  <div key={tool} className="rounded border px-2.5 py-1"
                    style={{ borderColor: level.border, background: "rgba(15,23,42,0.7)" }}>
                    <span className="font-mono text-[10px]" style={{ color: level.color, opacity: 0.8 }}>{tool}</span>
                  </div>
                ))}
              </div>

              {/* ── Zone 2: Cards — 3-column grid filling remaining space ── */}
              <div className="mt-10 min-h-0 flex-1" style={{ marginLeft: 120 }}>
                <div className="grid h-full auto-rows-fr grid-cols-3 gap-6">
                  {level.cards.map((cat, j) => (
                    <div
                      key={cat.title}
                      ref={(el) => { cardRefs.current[i * 3 + j] = el; }}
                      className="flex flex-col rounded-2xl border bg-slate-900/65 p-8 opacity-0 backdrop-blur-sm"
                      style={{ borderColor: level.border, boxShadow: `0 0 32px ${level.glow}` }}
                    >
                      {/* Card header */}
                      <div className="mb-5 flex items-center gap-3">
                        <span className="text-2xl">{cat.icon}</span>
                        <p className="font-mono text-base font-bold uppercase tracking-[0.18em]"
                          style={{ color: level.color }}>
                          {cat.title}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="mb-6 h-px w-full"
                        style={{ background: `linear-gradient(to right, ${level.color}30, transparent)` }} />

                      {/* Items */}
                      <ul className="flex-1 space-y-4">
                        {cat.items.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-[7px] h-2 w-2 shrink-0 rounded-full"
                              style={{ background: level.color, opacity: 0.75 }} />
                            <span className="font-sans text-sm leading-relaxed text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </section>
          ))}
        </div>

        {/* ── Next Actions ──────────────────────────────────────────────────── */}
        <section className="relative overflow-hidden px-8 py-28">
          <div className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 70%)" }} />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />

          <div className="relative z-10 mx-auto max-w-5xl">
            <div className="mb-12 text-center">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.55em] text-cyan-400">Begin</p>
              <h2 className="font-mono text-3xl font-black uppercase tracking-widest text-white">Next Actions</h2>
              <p className="mt-3 font-sans text-slate-400">Every SOC analyst started somewhere. Here&apos;s your first move.</p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {ACTIONS.map((action) => (
                <div key={action.title}
                  className="rounded-2xl border bg-slate-900/60 px-6 py-7 backdrop-blur-sm"
                  style={{ borderColor: action.border, boxShadow: `0 0 40px ${action.glow}` }}>
                  <div className="mb-5 flex items-center gap-3">
                    <span className="text-3xl">{action.icon}</span>
                    <p className="font-mono text-sm font-bold uppercase tracking-wider" style={{ color: action.color }}>
                      {action.title}
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {action.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: action.color }} />
                        <span className="font-sans text-sm leading-relaxed text-slate-300">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-16 flex flex-col items-center gap-5 text-center">
              <p className="max-w-lg font-sans text-sm leading-relaxed text-slate-500">
                The SOC isn&apos;t just a career — it&apos;s the team that keeps the rest of us safe.
              </p>
              <button
                onClick={() => router.push("/roadmaps/soc")}
                className="inline-flex items-center gap-3 rounded-xl border border-cyan-500/35 bg-cyan-950/20 px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-cyan-300 transition-all hover:border-cyan-400/60 hover:bg-cyan-950/40"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to SOC Experience
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
