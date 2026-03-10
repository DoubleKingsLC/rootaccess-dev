"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";


gsap.registerPlugin(ScrollTrigger);

// ── Career level data ─────────────────────────────────────────────────────────
const LEVELS = [
  {
    num: "00",
    label: "Entry Point",
    subtitle: "No Experience Required",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.2)",
    border: "rgba(148,163,184,0.25)",
    quote:
      "You don't need a degree. You need curiosity and the discipline to build it. Everyone starts here.",
    time: "0–6 months",
    salary: "£25K–£35K",
    tools: ["VirtualBox", "Linux", "Terminal / PowerShell", "Python"],
    skills: [
      "Networking — TCP/IP, DNS, DHCP, subnetting",
      "OS fundamentals — Windows & Linux",
      "Security concepts — CIA triad, common threats",
      "Scripting basics — Python or Bash",
    ],
    certs: [
      "Google Cybersecurity Certificate",
      "THM · Security+ Pre-Security (SEC1)",
      "TCM · Practical Security Fundamentals",
    ],
    labs: [
      "TryHackMe · Pre-Security learning path",
      "Cybrary · Intro to IT & Cybersecurity",
      "Professor Messer · Security+ free course",
    ],
  },
  {
    num: "01",
    label: "L1 Triage Analyst",
    subtitle: "First Line of Detection",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.2)",
    border: "rgba(34,211,238,0.25)",
    quote:
      "07:45. You open the SIEM dashboard. 4,200 alerts overnight. Your job is to find the three that matter.",
    time: "6–18 months",
    salary: "£30K–£45K",
    tools: ["Splunk / ELK / Wazuh", "Wireshark / tcpdump", "VirusTotal", "grep / awk"],
    skills: [
      "SIEM log analysis and search query writing",
      "Alert triage, classification, and prioritisation",
      "IOC lookup and contextual enrichment",
      "Incident ticketing and escalation procedures",
    ],
    certs: [
      "BTL1 — Blue Team Level 1",
      "Practical SOC Analyst (PSAA)",
      "CompTIA Security+",
    ],
    labs: [
      "LetsDefend · SOC Analyst learning path",
      "TryHackMe · SOC Level 1 complete track",
      "HTB · SOC Defender career path",
    ],
  },
  {
    num: "02",
    label: "L2 Advanced Analyst",
    subtitle: "Pattern Recognition & Correlation",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.2)",
    border: "rgba(139,92,246,0.25)",
    quote:
      "Three events. Each harmless alone. But you see them together — and you see the attacker's hand.",
    time: "2–4 years",
    salary: "£45K–£65K",
    tools: ["CyberChef", "Velociraptor", "MISP", "TheHive", "MITRE ATT&CK"],
    skills: [
      "Threat correlation and attack pattern mapping",
      "Malware triage — static and dynamic analysis",
      "MITRE ATT&CK framework and TTP identification",
      "SOAR automation and playbook development",
    ],
    certs: [
      "CCDL2 — HTB Certified Cybersecurity Defense Level 2",
      "HTB CDSA — Certified Defensive Security Analyst",
    ],
    labs: [
      "CyberDefenders · Blue Team challenge labs",
      "DFIR.training · forensic scenario exercises",
      "Malware-traffic-analysis.net pcap analysis",
    ],
  },
  {
    num: "03",
    label: "L3 Forensic Analyst",
    subtitle: "Deep Forensics & Incident Lead",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
    border: "rgba(245,158,11,0.25)",
    quote:
      "You pull the disk. You find the malware. You trace it to its first byte. This is where the story ends.",
    time: "4–7 years",
    salary: "£65K–£90K",
    tools: ["Volatility", "KAPE", "EZTools", "x64dbg", "FTK Imager"],
    skills: [
      "Disk and memory forensics — full acquisition",
      "Malware reverse engineering and binary analysis",
      "C2 infrastructure profiling and attribution",
      "APT tracking and threat intelligence production",
    ],
    certs: [
      "BTL2 — Blue Team Level 2",
      "GCFA — GIAC Certified Forensic Analyst",
      "GCIH — GIAC Certified Incident Handler",
    ],
    labs: [
      "Proxmox + Wazuh — build your own SOC homelab",
      "REMnux malware analysis environments",
      "SANS FOR508 courseware — advanced DFIR",
    ],
  },
  {
    num: "04",
    label: "SOC Lead",
    subtitle: "Operations Command",
    color: "#34d399",
    glow: "rgba(52,211,153,0.2)",
    border: "rgba(52,211,153,0.25)",
    quote:
      "The team responds as fast as the system you built for them. Your job: make the next incident take 10 minutes, not 15.",
    time: "7+ years",
    salary: "£90K–£130K+",
    tools: ["Palo Alto XSOAR", "PowerBI", "ServiceNow SecOps", "Confluence / Jira"],
    skills: [
      "SOC architecture design and tool strategy",
      "MTTD / MTTR KPI definition and reporting",
      "Analyst mentoring and career development",
      "Executive stakeholder communication",
    ],
    certs: [
      "CISSP — Certified Information Systems Security Professional",
      "CSOM — Certified SOC Manager",
      "CISM — Certified Information Security Manager",
    ],
    labs: [
      "Lead tabletop incident response exercises",
      "Build detection engineering pipelines",
      "Design and run purple team engagements",
    ],
  },
] as const;

// ── Next action cards ─────────────────────────────────────────────────────────
const ACTIONS = [
  {
    icon: "🧪",
    title: "Start in a Lab Today",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.25)",
    glow: "rgba(34,211,238,0.08)",
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
    border: "rgba(139,92,246,0.25)",
    glow: "rgba(139,92,246,0.08)",
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
    border: "rgba(52,211,153,0.25)",
    glow: "rgba(52,211,153,0.08)",
    items: [
      "CyberSecJobs.com and ClearanceJobs.com",
      "LinkedIn: search 'SOC Analyst' + set alerts",
      "NCSC Cyber First — UK government pathways",
    ],
  },
] as const;

// ── Bezier branch Y positions (SVG viewBox 0 0 100 300) ──────────────────────
const BRANCH_Y = [65, 150, 235] as const;

export default function SocCareerPathPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const trunkRef = useRef<HTMLDivElement>(null);

  // Per-level refs (5 levels)
  const sectionRefs = useRef<(HTMLElement | null)[]>(Array(5).fill(null));
  const hubRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));

  // 5 levels × 3 cards each = 15
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(15).fill(null));
  // 5 levels × 3 SVG paths each = 15
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(15).fill(null));
  const pathGlowRefs = useRef<(SVGPathElement | null)[]>(Array(15).fill(null));

  // Tools branch (5 levels × 1)
  const toolsCardRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const toolsPathRefs = useRef<(SVGPathElement | null)[]>(Array(5).fill(null));
  const toolsPathGlowRefs = useRef<(SVGPathElement | null)[]>(Array(5).fill(null));

  const [activeLevel, setActiveLevel] = useState<number>(-1);
  const [layout, setLayout] = useState<any>(null);

  // ── Orientation & Device Detection ──────────────────────────────────
  const isMobile = useIsMobile(768);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const checkOrientation = () => {
      if (typeof window !== "undefined") {
        setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape");

        // Calculate scale factor for smaller landscape screens
        if (window.innerWidth < 1100 && window.innerWidth > window.innerHeight) {
          const s = Math.min(1, window.innerWidth / 1200);
          setScaleFactor(s);
        } else {
          setScaleFactor(1);
        }
      }
    };

    checkOrientation();
    window.addEventListener("resize", checkOrientation);
    return () => window.removeEventListener("resize", checkOrientation);
  }, []);




  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      let totalWidth = window.innerWidth;

      const levelsContainer = document.querySelector(".max-w-7xl") as HTMLElement;
      if (levelsContainer) {
        // Measure exact available width
        const computedStyle = window.getComputedStyle(levelsContainer);
        const pl = parseFloat(computedStyle.paddingLeft || "0");
        const pr = parseFloat(computedStyle.paddingRight || "0");
        totalWidth = levelsContainer.clientWidth - pl - pr;
      }

      const hub = { x: 55, y: vh * 0.22 }; // Moved up to give branches and cards more room

      const toolsCardWidth = Math.max(220, Math.min(280, totalWidth * 0.22));
      const toolsCardX = totalWidth - toolsCardWidth - 20;
      const toolsCardY = hub.y - 35;
      const toolsCard = { x: toolsCardX, y: toolsCardY, w: toolsCardWidth };

      const cardsLeft = 140;
      const cardsRight = totalWidth - 20; // Reverted back to full width for wide, readable cards
      const layoutWidth = cardsRight - cardsLeft;

      // Calculate gap and card width responsively
      const gap = Math.max(16, Math.min(30, layoutWidth * 0.03));

      // Cards should take up available space but have max/min bounds for readability
      const calculatedCardW = (layoutWidth - gap * 2) / 3;
      const cardW = Math.max(260, Math.min(360, calculatedCardW));

      // Ensure cards fit within screen if calculatedWidth is less than min width
      const finalCardW = (cardW * 3 + gap * 2 > layoutWidth) ? (layoutWidth - gap * 2) / 3 : cardW;

      const cardY = vh * 0.55; // Pushed down just slightly more to ensure absolute vertical clearance from Tools card

      const cards = [
        { x: cardsLeft + finalCardW / 2, y: cardY },
        { x: cardsLeft + finalCardW + gap + finalCardW / 2, y: cardY },
        { x: cardsLeft + (finalCardW + gap) * 2 + finalCardW / 2, y: cardY },
      ];

      setLayout({ hub, cards, cardW: finalCardW, gap, cardsLeft, cardY, toolsCard });
    };

    // Slight delay on first mount to ensure the document is fully laid out
    setTimeout(handleResize, 50);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawToolsBranch = (from: { x: number, y: number }, toBox: { x: number, y: number }, layout: any) => {
    const r = 14;
    const i = 3;
    const startY = from.y + (i - 1) * 24;
    const jX = 140 + i * 28; // Outer drop lane (approx 224)
    const jY = from.y + 110; // Horizontal run immediately under the title, above bottom cards
    const jX2 = toBox.x - 30; // Vertical run specifically for tools card

    const cX = from.x + 30;
    const endSX = from.x + 60;
    const connectY = toBox.y + 40; // Enter the middle-left of the tools box

    return [
      `M ${from.x} ${from.y}`,
      `C ${cX} ${from.y}, ${cX} ${startY}, ${endSX} ${startY}`,
      `L ${jX - r} ${startY}`,
      `Q ${jX} ${startY} ${jX} ${startY + r}`,
      `L ${jX} ${jY - r}`,
      `Q ${jX} ${jY} ${jX + r} ${jY}`,
      `L ${jX2 - r} ${jY}`,
      `Q ${jX2} ${jY} ${jX2} ${jY - r}`,
      `L ${jX2} ${connectY + r}`,
      `Q ${jX2} ${connectY} ${jX2 + r} ${connectY}`,
      `L ${toBox.x} ${connectY}`
    ].join(" ");
  };

  // Helper for orthogonal branching with beautiful S-curve fanning out the hub
  const drawBranch = (from: { x: number, y: number }, to: { x: number, y: number }, i: number) => {
    const r = 14;

    // Spread the three lines out immediately vertically before dropping
    const startY = from.y + (i - 1) * 24;
    const jX = 140 + i * 28; // Staggered drop X coords
    const jY = to.y - 70 + i * 20; // Staggered horizontal approach above cards

    const cX = from.x + 30;
    const endSX = from.x + 60; // S-curve resolves at X=115

    return [
      `M ${from.x} ${from.y}`,
      `C ${cX} ${from.y}, ${cX} ${startY}, ${endSX} ${startY}`,
      `L ${jX - r} ${startY}`,
      `Q ${jX} ${startY} ${jX} ${startY + r}`,
      `L ${jX} ${jY - r}`,
      `Q ${jX} ${jY} ${jX + r} ${jY}`,
      `L ${to.x - r} ${jY}`,
      `Q ${to.x} ${jY} ${to.x} ${jY + r}`,
      `L ${to.x} ${to.y}`
    ].join(" ");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Hero entrance ──────────────────────────────────────────────────
      if (heroRef.current) {
        const anims = heroRef.current.querySelectorAll<HTMLElement>(".hero-anim");
        gsap.fromTo(
          anims,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.14, delay: 0.2 }
        );
      }

      // ── Trunk grows as levels scroll in ───────────────────────────────
      if (trunkRef.current) {
        gsap.set(trunkRef.current, { scaleY: 0, transformOrigin: "top center" });
        const lastSection = sectionRefs.current[4];
        gsap.to(trunkRef.current, {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRefs.current[0],
            start: "top 80%",
            end: lastSection ? `bottom 50%` : "+=4000",
            scrub: 1.2,
          },
        });
      }

      // ── Per-level animations ───────────────────────────────────────────
      LEVELS.forEach((_, i) => {
        const section = sectionRefs.current[i];
        if (!section) return;

        // Active level tracking
        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveLevel(i),
          onEnterBack: () => setActiveLevel(i),
        });

        // Main fade in/out for the section
        gsap.to(section, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          }
        });

        // Use a Timeline to guarantee robust synchronized playback without trigger bugs
        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          }
        });

        // Hub node scale-in
        const hub = hubRefs.current[i];
        if (hub) {
          sectionTl.fromTo(hub, { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0);
        }

        // SVG branch paths
        for (let j = 0; j < 3; j++) {
          const path = pathRefs.current[i * 3 + j];
          const glow = pathGlowRefs.current[i * 3 + j];

          if (path && glow) {
            // Approximate line length (Manhattan distance) works beautifully because paths are strictly right/down
            const toX = layout.cards[j].x;
            const toY = layout.cards[j].y;
            const fromX = layout.hub.x;
            const fromY = layout.hub.y;
            // Adding a small padding factor to absolute Manhattan to account for the S-curves
            const len = (toX - fromX) + Math.abs(toY - fromY) + 60;

            gsap.set([path, glow], { strokeDasharray: len, strokeDashoffset: len });
            sectionTl.to([path, glow], {
              strokeDashoffset: 0,
              duration: 1.2,
              ease: "power2.inOut",
            }, 0.2 + (j * 0.1));
          }
        }

        // Tools branch path
        const tPath = toolsPathRefs.current[i];
        const tGlow = toolsPathGlowRefs.current[i];
        if (tPath && tGlow && layout.toolsCard) {
          const len = 4000; // Manhattan approximation
          gsap.set([tPath, tGlow], { strokeDasharray: len, strokeDashoffset: len });
          sectionTl.to([tPath, tGlow], {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut",
          }, 0.35); // Stagger slightly behind main branches
        }

        // Tools Card
        const tCard = toolsCardRefs.current[i];
        if (tCard) {
          sectionTl.fromTo(
            tCard,
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" },
            0.8
          );
        }

        // Content cards slide-up
        for (let j = 0; j < 3; j++) {
          const card = cardRefs.current[i * 3 + j];
          if (!card) continue;
          sectionTl.fromTo(
            card,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            }, 0.5 + (j * 0.1)
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [layout]);

  // ── Mobile Components ───────────────────────────────────────────────


  const MobileSocCareerPath = () => (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans">
      <div className="relative">
        {LEVELS.map((level, i) => (
          <section key={level.num} className="relative min-h-screen pt-20 pb-32 px-6 border-b border-white/5 last:border-0">
            {/* Level Indicator Hub */}
            <div
              className="mb-10 flex items-center justify-center rounded-full border-2 bg-slate-950 shadow-2xl"
              style={{
                width: 64,
                height: 64,
                borderColor: level.color,
                boxShadow: `0 0 30px ${level.glow}`,
              }}
            >
              <span className="font-mono text-xl font-black" style={{ color: level.color }}>
                {level.num}
              </span>
            </div>

            {/* Header Content */}
            <div className="mb-10 space-y-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-400/80">
                {level.subtitle}
              </span>
              <h2 className="text-5xl font-bold tracking-tight leading-[1.1]">
                {level.label}
              </h2>
              <div className="relative pl-6 py-1">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10" />
                <p className="text-slate-400 italic text-lg leading-relaxed max-w-lg">
                  &ldquo;{level.quote}&rdquo;
                </p>
              </div>
            </div>


            {/* Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: "SKILLS", items: level.skills },
                { title: "CERTS", items: level.certs },
                { title: "LABS", items: level.labs },
              ].map((cat) => (
                <div key={cat.title} className="space-y-4">
                  <h3 className="font-mono text-xs font-bold tracking-widest text-slate-500">
                    {cat.title}
                  </h3>
                  <ul className="space-y-3">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
                        <span className="text-sm font-medium text-slate-300">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Persistent Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 h-16 bg-slate-950/80 backdrop-blur-xl border-t border-white/5 flex items-center px-6 z-50">
        <div className="flex-1 flex justify-between items-center max-w-lg mx-auto overflow-x-auto no-scrollbar gap-8">
          {[
            { label: "DETECTION", active: true },
            { label: "TRIAGE", active: true },
            { label: "ANALYSIS", active: false },
            { label: "CONTAINMENT", active: false },
            { label: "RECOVERY", active: false },
          ].map((step, idx) => (
            <div key={step.label} className="flex-shrink-0 flex items-center gap-3">
              <div className={`w-2.5 h-2.5 rounded-full ${step.active ? 'bg-cyan-400' : 'border border-white/20'}`}
                style={step.active ? { boxShadow: '0 0 10px #22d3ee' } : {}} />
              <span className={`font-mono text-[9px] tracking-widest ${step.active ? 'text-cyan-400' : 'text-slate-600'}`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  if (isMobile) {
    return <MobileSocCareerPath />;
  }



  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div style={{ transform: `scale(${scaleFactor})`, transformOrigin: "top left", width: scaleFactor !== 1 ? `${100 / scaleFactor}%` : "100%", height: scaleFactor !== 1 ? `${100 / scaleFactor}%` : "100%" }}>

        <header
          className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-slate-950/85 px-8 py-3.5 backdrop-blur-md"
        >
          <button
            onClick={() => router.push("/roadmaps/soc")}
            className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-cyan-300"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            SOC Experience
          </button>
          <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-cyan-400">
            SOC Career Path
          </p>
          <div className="w-32" />
        </header>

        {/* ── Fixed level nav (right side) ──────────────────────────────────── */}
        <nav
          className="pointer-events-none fixed right-6 top-1/2 z-50 -translate-y-1/2 flex flex-col items-end gap-5"
        >
          {LEVELS.map((level, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <span className="font-mono text-[8px] uppercase tracking-widest text-slate-600">
                {level.num}
              </span>
              <div
                className="h-2.5 w-2.5 rounded-full border transition-all duration-500"
                style={{
                  borderColor: activeLevel >= i ? level.color : "rgba(51,65,85,0.6)",
                  background: activeLevel >= i ? level.color : "transparent",
                  boxShadow: activeLevel === i ? `0 0 12px ${level.color}` : "none",
                }}
              />
            </div>
          ))}
        </nav>

        <div
          ref={containerRef}
          className="pt-16"
        >
          {/* ── Hero ────────────────────────────────────────────────────────── */}
          <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
            {/* Grid */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(30,41,59,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(30,41,59,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
            {/* Radial vignette */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(circle at center, transparent 35%, rgba(2,6,23,0.96) 100%)" }}
            />
            {/* Emerald ambient */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at center, rgba(52,211,153,0.04) 0%, transparent 65%)" }}
            />

            <div ref={heroRef} className="relative z-10 max-w-3xl px-8 text-center">
              <div className="hero-anim mb-6 flex justify-center">
                <div className="rounded-full border border-cyan-500/30 bg-cyan-950/40 px-5 py-2 flex items-center gap-3 backdrop-blur-md">
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" style={{ boxShadow: "0 0 10px #22d3ee" }}></span>
                  <p className="font-mono text-[10px] uppercase tracking-[0.55em] text-cyan-400">
                    The Blueprint to Perfection
                  </p>
                </div>
              </div>

              {/* Big Question Hook */}
              <div className="hero-anim mb-6 flex justify-center">
                <h1
                  className="font-mono font-black text-emerald-400 tracking-tight"
                  style={{
                    fontSize: "clamp(48px, 8vw, 84px)",
                    textShadow: "0 0 80px rgba(52,211,153,0.5), 0 0 160px rgba(52,211,153,0.2)",
                    lineHeight: "1.05"
                  }}
                >
                  Wondering where<br />to begin?
                </h1>
              </div>

              <p className="hero-anim mb-4 font-sans text-xl leading-relaxed text-slate-100 max-w-2xl mx-auto">
                Stop guessing. This is the ultimate, battle-tested roadmap for your cybersecurity career.
              </p>
              <p className="hero-anim font-sans text-base leading-relaxed text-slate-400 max-w-2xl mx-auto">
                Distilled from thousands of community discussions, industry standards, and frontline experience. We&apos;ve mapped out the precise skills, tools, and certifications you need—from your first lab to leading the SOC.
              </p>

              <div className="hero-anim mt-10 flex justify-center">
                <div className="flex animate-bounce flex-col items-center gap-1.5 text-slate-600">
                  <span className="font-mono text-[9px] uppercase tracking-widest">Scroll to explore</span>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 2 L7 12 M2 7 L7 12 L12 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* ── Career Levels ────────────────────────────────────────────────── */}
          <div className="relative mx-auto max-w-7xl px-8">
            {/* Continuous trunk — spans all level sections */}
            <div
              className="pointer-events-none absolute"
              style={{ left: 55, top: 0, bottom: 0, width: 2 }}
            >
              <div ref={trunkRef} className="tech-tree-trunk h-full w-full" />
            </div>

            {LEVELS.map((level, i) => (
              <section
                key={level.num}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className="relative flex h-screen w-full items-center opacity-0 overflow-hidden"
              >
                {layout && (
                  <>
                    {/* ── Background SVG Branches ── */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                      <defs>
                        <filter id={`glow-${i}`} x="-120%" y="-120%" width="340%" height="340%">
                          <feGaussianBlur stdDeviation="3.5" result="blur" />
                          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                        </filter>
                      </defs>

                      {/* Trunk dot at hub */}
                      <circle
                        cx={layout.hub.x}
                        cy={layout.hub.y}
                        r="4"
                        fill="none"
                        stroke={level.color}
                        strokeWidth="6"
                        opacity="0.15"
                        filter={`url(#glow-${i})`}
                      />

                      {/* Branches */}
                      {layout.cards.map((targetCard: any, j: number) => {
                        const d = drawBranch(layout.hub, targetCard, j);
                        return (
                          <g key={`branch-${j}`}>
                            {/* Glow path */}
                            <path
                              ref={(el) => { pathGlowRefs.current[i * 3 + j] = el; }}
                              d={d}
                              fill="none"
                              stroke={level.color}
                              strokeWidth={6}
                              opacity={0.25}
                              filter={`url(#glow-${i})`}
                              strokeLinecap="round"
                            />
                            {/* Solid path */}
                            <path
                              ref={(el) => { pathRefs.current[i * 3 + j] = el; }}
                              d={d}
                              fill="none"
                              stroke={level.color}
                              strokeWidth={1.5}
                              opacity={0.8}
                              strokeLinecap="round"
                            />
                            {/* Terminal dot */}
                            <circle
                              cx={targetCard.x} cy={targetCard.y} r={3}
                              fill={level.color}
                              style={{ filter: `drop-shadow(0 0 5px ${level.color})` }}
                            />
                          </g>
                        );
                      })}

                      {/* Tools Branch */}
                      {layout.toolsCard && (
                        <g>
                          <path
                            ref={(el) => { toolsPathGlowRefs.current[i] = el; }}
                            d={drawToolsBranch(layout.hub, layout.toolsCard, layout)}
                            fill="none"
                            stroke={level.color}
                            strokeWidth={6}
                            opacity={0.25}
                            filter={`url(#glow-${i})`}
                            strokeLinecap="round"
                          />
                          <path
                            ref={(el) => { toolsPathRefs.current[i] = el; }}
                            d={drawToolsBranch(layout.hub, layout.toolsCard, layout)}
                            fill="none"
                            stroke={level.color}
                            strokeWidth={1.5}
                            opacity={0.8}
                            strokeLinecap="round"
                          />
                          <circle
                            cx={layout.toolsCard.x} cy={layout.toolsCard.y + 40} r={3}
                            fill={level.color}
                            style={{ filter: `drop-shadow(0 0 5px ${level.color})` }}
                          />
                        </g>
                      )}
                    </svg>

                    {/* ── Left: hub node ── */}
                    <div
                      ref={(el) => { hubRefs.current[i] = el; }}
                      className="absolute flex items-center justify-center rounded-full border-2 bg-slate-950 z-10"
                      style={{
                        left: layout.hub.x,
                        top: layout.hub.y,
                        width: 56,
                        height: 56,
                        transform: 'translate(-50%, -50%)',
                        borderColor: level.color,
                        boxShadow: `0 0 24px ${level.glow}, 0 0 60px ${level.glow}`,
                      }}
                    >
                      <span className="font-mono text-base font-black" style={{ color: level.color }}>
                        {level.num}
                      </span>
                      <div
                        className="absolute -inset-3 animate-pulse rounded-full border opacity-30"
                        style={{ borderColor: level.color }}
                      />
                    </div>


                    {/* ── Title & Quote (Top Area) ── */}
                    <div className="absolute z-10 pointer-events-none" style={{ top: layout.hub.y - 20, left: layout.hub.x + 220, right: layout.toolsCard.w + 64 }}>
                      <span className="font-mono text-[10px] uppercase tracking-[0.45em]" style={{ color: level.color }}>
                        {level.subtitle}
                      </span>
                      <h2 className="mt-2 text-5xl font-heading font-bold text-white mb-4 drop-shadow-lg">
                        {level.label}
                      </h2>
                      <p className="font-sans text-xl italic leading-relaxed text-slate-300 max-w-3xl" style={{ textShadow: `0 0 50px ${level.glow}` }}>
                        &ldquo;{level.quote}&rdquo;
                      </p>
                    </div>

                    {/* ── Tools Card (Top Right) ── */}
                    {layout.toolsCard && (
                      <div
                        ref={(el) => { toolsCardRefs.current[i] = el; }}
                        className="absolute rounded-xl border bg-slate-950/80 px-5 py-5 backdrop-blur-md z-10 flex flex-col"
                        style={{
                          left: layout.toolsCard.x,
                          top: layout.toolsCard.y,
                          width: layout.toolsCard.w,
                          borderColor: level.border,
                          boxShadow: `0 0 30px ${level.glow}, inset 0 0 20px rgba(0,0,0,0.5)`,
                        }}
                      >
                        <div className="mb-4 flex items-center gap-3 border-b border-white/5 pb-3">
                          <span className="text-xl" style={{ textShadow: `0 0 10px ${level.color}` }}>🔧</span>
                          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color: level.color }}>
                            Tools & Stack
                          </p>
                        </div>
                        <div className="flex-1">
                          <ul className="space-y-3">
                            {level.tools.map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: level.color, boxShadow: `0 0 8px ${level.color}` }} />
                                <span className="font-sans text-[13px] leading-relaxed text-slate-300">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    )}

                    {/* ── Cards (Bottom Area) ── */}
                    {(
                      [
                        { title: "Core Skills", icon: "⚡", items: level.skills },
                        { title: "Certifications", icon: "🎯", items: level.certs },
                        { title: "Practice Labs", icon: "🧪", items: level.labs },
                      ] as const
                    ).map((cat, j) => (
                      <div
                        key={cat.title}
                        ref={(el) => { cardRefs.current[i * 3 + j] = el; }}
                        className="absolute rounded-xl border bg-slate-950/80 px-5 py-6 backdrop-blur-md z-10 flex flex-col"
                        style={{
                          left: layout.cardsLeft + j * (layout.cardW + layout.gap),
                          top: layout.cardY + 12,
                          width: layout.cardW,
                          height: "auto",
                          minHeight: layout.cardY * 0.45,
                          borderColor: level.border,
                          boxShadow: `0 0 30px ${level.glow}, inset 0 0 20px rgba(0,0,0,0.5)`,
                        }}
                      >
                        <div className="mb-4 flex items-center gap-3 border-b border-white/5 pb-3">
                          <span className="text-xl" style={{ textShadow: `0 0 10px ${level.color}` }}>{cat.icon}</span>
                          <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color: level.color }}>
                            {cat.title}
                          </p>
                        </div>
                        <div className="flex-1 pb-16">
                          <ul className="space-y-4">
                            {cat.items.map((item) => (
                              <li key={item} className="flex items-start gap-3">
                                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: level.color, boxShadow: `0 0 8px ${level.color}` }} />
                                <span className="font-sans text-[13px] leading-relaxed text-slate-300">
                                  {item}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Sub-bg ambient glow inside card */}
                        <div className="absolute inset-x-0 bottom-0 h-24 pointer-events-none rounded-b-xl" style={{ background: `linear-gradient(to top, ${level.glow}, transparent)` }} />
                      </div>
                    ))}
                  </>
                )}
              </section>
            ))}
          </div>

          {/* ── Next Actions ────────────────────────────────────────────────── */}
          <section className="relative overflow-hidden py-28 px-8">
            {/* Ambient */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{ background: "radial-gradient(ellipse at center, rgba(34,211,238,0.04) 0%, transparent 70%)" }}
            />
            {/* Top border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />

            <div className="relative z-10 mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.55em] text-cyan-400">
                  Begin
                </p>
                <h2 className="font-mono text-3xl font-black uppercase tracking-widest text-white">
                  Next Actions
                </h2>
                <p className="mt-3 font-sans text-slate-400">
                  Every SOC analyst started somewhere. Here&apos;s your first move.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-6">
                {ACTIONS.map((action) => (
                  <div
                    key={action.title}
                    className="rounded-2xl border bg-slate-900/60 px-6 py-7 backdrop-blur-sm"
                    style={{
                      borderColor: action.border,
                      boxShadow: `0 0 40px ${action.glow}`,
                    }}
                  >
                    <div className="mb-5 flex items-center gap-3">
                      <span className="text-3xl">{action.icon}</span>
                      <p
                        className="font-mono text-sm font-bold uppercase tracking-wider"
                        style={{ color: action.color }}
                      >
                        {action.title}
                      </p>
                    </div>
                    <ul className="space-y-3">
                      {action.items.map((item) => (
                        <li key={item} className="flex items-start gap-2.5">
                          <span
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                            style={{ background: action.color }}
                          />
                          <span className="font-sans text-sm leading-relaxed text-slate-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Footer CTA */}
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
      </div>
    </main>
  );
}


