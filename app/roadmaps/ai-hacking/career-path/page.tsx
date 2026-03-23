"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";


gsap.registerPlugin(ScrollTrigger);

const PROVIDER_DOMAINS: Record<string, string> = {
    tryhackme: "tryhackme.com",
    hackthebox: "hackthebox.com",
    htb: "hackthebox.com",
    google: "google.com",
    tcm: "tcm-sec.com",
    offsec: "offsec.com",
    blueteam: "securityblue.team",
    cyberdefenders: "cyberdefenders.org",
    elearnsecurity: "elearnsecurity.com",
    giac: "giac.org",
    isc2: "isc2.org",
    comptia: "comptia.org",
    youtube: "youtube.com",
    sans: "sans.org",
    crest: "crest-approved.org",
    pentesteracademy: "pentesteracademy.com",
    coursera: "coursera.org",
    lakera: "lakera.ai",
    wiz: "wiz.io",
    owasp: "owasp.org",
    defcon: "aivillage.org",
    github: "github.com",
    huggingface: "huggingface.co",
};

function ProviderFavicon({ provider, size = 18 }: { provider: string | null; size?: number }) {
    const domain = provider ? PROVIDER_DOMAINS[provider] : null;
    if (!domain) return null;
    return (
        <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
            alt={provider ?? ""}
            width={size}
            height={size}
            className="rounded-sm flex-shrink-0"
            style={{ objectFit: "contain" }}
        />
    );
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface ResourceItem {
  label: string;
  link: string;
  provider?: string;
}

interface Level {
  num: string;
  label: string;
  subtitle: string;
  color: string;
  glow: string;
  border: string;
  quote: string;
  time: string;
  salary: string;
  tools: string[];
  skills: string[];
  certs: ResourceItem[];
  labs: ResourceItem[];
}

interface ActionItem {
  label: string;
  link?: string;
}

interface Action {
  icon: string;
  title: string;
  color: string;
  border: string;
  glow: string;
  items: Array<ActionItem | string>;
}

// ── Career level data ─────────────────────────────────────────────────────────
const LEVELS: Level[] = [
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
      { label: "Google Cybersecurity Certificate", link: "https://www.coursera.org/professional-certificates/google-cybersecurity", provider: "google" },
      { label: "THM · Security+ Pre-Security (SEC1)", link: "https://tryhackme.com/certification/pre-security", provider: "tryhackme" },
      { label: "TCM · Practical Security Fundamentals", link: "https://academy.tcm-sec.com/p/practical-security-fundamentals", provider: "tcm" },
    ],
    labs: [
      { label: "Hacking AI is TOO EASY (this should be illegal)", link: "https://youtu.be/Qvx2sVgQ-u0", provider: "youtube" },
      { label: "TryHackMe · Pre-Security learning path", link: "https://tryhackme.com/path/outline/presecurity", provider: "tryhackme" },
      { label: "Learn Virtual Machines RIGHT NOW!! (Kali, Ubuntu, Windows)", link: "https://youtu.be/wX75Z-4MEoM", provider: "youtube" },
      { label: "40 Windows Commands you NEED to know", link: "https://youtu.be/Jfvg3CS1X3A", provider: "youtube" }
    ],
  },
  {
    num: "01",
    label: "AI Red Team Operator",
    subtitle: "Adversarial Prompting & Model Exploitation",
    color: "#f97316",
    glow: "rgba(249,115,22,0.2)",
    border: "rgba(249,115,22,0.25)",
    quote: "In 2026, we don't just 'chat' with the AI. We probe its architecture, intercept its traffic, and automate its failure.",
    time: "6–18 months",
    salary: "£30K–£50K",
    tools: [
      "Microsoft PyRIT",
      "Garak",
      "Promptmap",
      "Promptfoo",
      "Burp Suite"
    ],
    skills: [
      "Direct Prompt Injection — DAN, Persona-play",
      "Indirect Injection — webpages, uploaded PDFs",
      "System Prompt Extraction — leakage techniques",
      "Filter Evasion — Base64, Rot13, multi-lingual",
      "Agentic Loop Hijacking — Tool Use exploitation"
    ],
    certs: [
      { label: "TCM · Practical AI Pentest Associate (PAPA)", link: "https://certifications.tcm-sec.com/papa/", provider: "tcm" },
      { label: "OffSec · OSAI (OffSec AI Red Teamer)", link: "https://www.offsec.com/courses/ai-300/", provider: "offsec" }
    ],
    labs: [
      { label: "The AI Attack Blueprint (Interview with Jason Haddix)", link: "https://youtu.be/2Z-9EOyb6HE", provider: "youtube" },
      { label: "Gandalf by Lakera", link: "https://gandalf.lakera.ai/gandalf-the-white", provider: "lakera" },
      { label: "Prompt Airlines (by Wiz.io)", link: "https://promptairlines.com/", provider: "wiz" },
      { label: "OWASP Top 10 for LLM Applications", link: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", provider: "owasp" }
    ]
  },
  {
    num: "02",
    label: "AI Security Researcher",
    subtitle: "Deep Exploitation & Adversarial ML",
    color: "#fb7185",
    glow: "rgba(251,113,133,0.2)",
    border: "rgba(251,113,133,0.25)",
    quote:
      "You're not running known exploits. You're discovering techniques the field hasn't documented yet.",
    time: "4–7 years",
    salary: "£75K–£110K",
    tools: [
      "ART (Adversarial Robustness Toolbox)",
      "HiddenLayer Model Scanner",
      "Counterfit",
      "Impacket Suite"
    ],
    skills: [
      "RAG Hijacking & Vector DB Poisoning",
      "Model Extraction — internal weights/logic",
      "Adversarial Perturbations — FGSM, PGD attacks",
      "Training Data Poisoning — backdoors, triggers",
      "Supply Chain Security — auditing model hubs"
    ],
    certs: [
      { label: "GIAC Offensive AI Analyst (GOAA)", link: "https://www.giac.org/certifications/offensive-ai-analyst-goaa/", provider: "giac" },
      { label: "OSCP+ (OffSec Certified Professional Plus)", link: "https://www.offsec.com/products/oscp-plus/", provider: "offsec" }
    ],
    labs: [
      { label: "AI Village (DEF CON / Black Hat)", link: "https://aivillage.org/", provider: "defcon" },
      { label: "OffSec Proving Grounds (PG) Practice", link: "https://www.offsec.com/ads/pg-practice/", provider: "offsec" },
      { label: "RobustBench", link: "https://robustbench.github.io/", provider: "github" },
      { label: "Hugging Face Security", link: "https://huggingface.co/docs/hub/security", provider: "huggingface" }
    ],
  },
  {
    num: "03",
    label: "Principal AI Security Architect",
    subtitle: "Enterprise Defense, Governance & Leadership",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.2)",
    border: "rgba(167,139,250,0.25)",
    quote:
      "You've been the attacker. Now you build the systems that make the next attacker's job impossible.",
    time: "7+ years",
    salary: "£110K–£160K+",
    tools: [
      "Lakera Guard",
      "Azure AI Content Safety",
      "AWS Bedrock Guardrails",
      "Protect AI (Guardian)"
    ],
    skills: [
      "Defense-in-Depth Architecture — multi-layered pipelines",
      "AI Governance & Compliance — EU AI Act, NIST AI RMF",
      "Adversarial Tabletop Exercises — simulation leadership",
      "Executive Risk Communication — metrics & translation",
      "AI Red Team Management — automated portfolio testing"
    ],
    certs: [
      { label: "CISSP — Certified Information Systems Security Professional", link: "https://www.isc2.org/certifications/cissp", provider: "isc2" },
      { label: "CISM — Certified Information Security Manager", link: "https://www.isaca.org/credentialing/cism", provider: "isaca" }
    ],
    labs: [
      { label: "NIST AI RMF Playbook", link: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf", provider: "nist" },
      { label: "EU AI Act 2026 Compliance Guide", link: "https://artificialintelligenceact.eu/", provider: "eu" },
      { label: "eSecurity Planet: AI Threats Playbook", link: "https://www.esecurityplanet.com/", provider: "esecurityplanet" },
      { label: "Lakera AI Security Hub", link: "https://www.lakera.ai/blog", provider: "lakera" }
    ],
  },
] as const;

// ── Next action cards ─────────────────────────────────────────────────────────
const ACTIONS: Action[] = [
  {
    icon: "🎯",
    title: "Break Your First Model",
    color: "#ef4444",
    border: "rgba(239,68,68,0.25)",
    glow: "rgba(239,68,68,0.08)",
    items: [
      { label: "Gandalf by Lakera — Beat all 8 levels", link: "https://gandalf.lakera.ai/" },
      { label: "HackAPrompt — Injection challenges", link: "https://www.hackaprompt.com/" },
      { label: "Prompt Airlines CTF — Indirect injection", link: "https://wiz.io/blog/prompt-airlines-ctf-writeup" },
    ],
  },
  {
    icon: "📁",
    title: "Build a Portfolio",
    color: "#f97316",
    border: "rgba(249,115,22,0.25)",
    glow: "rgba(249,115,22,0.08)",
    items: [
      "Write injection technique writeups with examples",
      "Publish Garak vulnerability scans on GitHub",
      "Contribute to the OWASP LLM Top 10 project",
    ],
  },
] as const;

// ── Bezier branch Y positions (SVG viewBox 0 0 100 300) ──────────────────────
const BRANCH_Y = [65, 150, 235] as const;

export default function AiHackingCareerPathPage() {
  const router = useRouter();
  const scrollToLevel = (index: number) => {
    const section = sectionRefs.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const trunkRef = useRef<HTMLDivElement>(null);

  // Per-level refs (4 levels)
  const sectionRefs = useRef<(HTMLElement | null)[]>(Array(4).fill(null));
  const hubRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));

  // 4 levels × 3 cards each = 12
  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(12).fill(null));
  // 4 levels × 3 SVG paths each = 12
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(12).fill(null));
  const pathGlowRefs = useRef<(SVGPathElement | null)[]>(Array(12).fill(null));

  // Tools branch (4 levels × 1)
  const toolsCardRefs = useRef<(HTMLDivElement | null)[]>(Array(4).fill(null));
  const toolsPathRefs = useRef<(SVGPathElement | null)[]>(Array(4).fill(null));
  const toolsPathGlowRefs = useRef<(SVGPathElement | null)[]>(Array(4).fill(null));

  const [activeLevel, setActiveLevel] = useState<number>(-1);
  const [layout, setLayout] = useState<any>(null);

  // ── Orientation & Device Detection ──────────────────────────────────
  const isMobile = useIsMobile(768);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");
  const [scaleFactor, setScaleFactor] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // ── Ensure page starts at the top ──────────────────────────────────
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Force scroll to top on mount
      window.scrollTo(0, 0);
      
      // Prevent browser from restoring scroll position
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

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
      if (typeof window === "undefined" || typeof document === "undefined") {
        return;
      }

      const vh = window.innerHeight;
      let totalWidth = window.innerWidth;

      const levelsContainer = document.querySelector(".max-w-7xl") as HTMLElement | null;
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
        const lastSection = sectionRefs.current[3];
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


  const MobileAiHackingCareerPath = () => (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans pb-20 pt-14">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-slate-950/90 px-4 py-3 backdrop-blur-md">
        <button
          onClick={() => router.push("/")}
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400"
        >
          Home
        </button>
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-red-400">
          AI Hacking Career Path
        </p>
        <button
          onClick={() => router.push("/roadmaps/ai-hacking")}
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500"
        >
          Back
        </button>
      </header>
      <div className="relative">
        {LEVELS.map((level, i) => (
          <section key={level.num} className="relative pt-16 pb-20 px-6 border-b border-white/5 last:border-0 overflow-hidden">
            {/* Level Indicator Hub */}
            <div
              className="mb-8 flex items-center justify-center rounded-full border-2 bg-slate-950 shadow-2xl"
              style={{
                width: 48,
                height: 48,
                borderColor: level.color,
                boxShadow: `0 0 20px ${level.glow}`,
              }}
            >
              <span className="font-mono text-base font-black" style={{ color: level.color }}>
                {level.num}
              </span>
            </div>

            {/* Header Content */}
            <div className="mb-10 space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-red-400/60">
                {level.subtitle}
              </span>
              <h2 className="text-3xl font-bold tracking-tight leading-tight">
                {level.label}
              </h2>
              <div className="relative pl-5 py-1 mt-4">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />
                <p className="text-slate-400 italic text-sm leading-relaxed max-w-md">
                  &ldquo;{level.quote}&rdquo;
                </p>
              </div>
            </div>

            {/* Info Cards Grid */}
            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "SKILLS", items: level.skills, icon: "⚡" },
                { title: "CERTS", items: level.certs, icon: "🎯" },
                { title: "RESOURCES", items: level.labs, icon: "🧪" },
                { title: "TOOLS", items: level.tools, icon: "🔧" },
              ].map((cat: any) => (
                <div
                  key={cat.title}
                  className="rounded-2xl border border-white/5 bg-slate-900/30 p-5 backdrop-blur-sm relative overflow-hidden group shadow-lg"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-2xl">
                    {cat.icon}
                  </div>
                  <h3 className="font-mono text-[10px] font-bold tracking-[0.3em] text-slate-500 mb-4 border-b border-white/5 pb-2">
                    {cat.title}
                  </h3>
                  {cat.title === "CERTS" && cat.items.length > 1 ? (
                    /* ── Certifications: Recommended + Additional ── */
                    <div className="flex flex-col gap-5 pt-1">
                      <div>
                        <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-red-500/60">Recommended</p>
                        <ul>
                          {[cat.items[0]].map((item: any, idx: number) => {
                            const isObj = typeof item === "object";
                            const label = isObj ? item.label : item;
                            const link = isObj ? item.link : null;
                            const provider = isObj ? item.provider : null;
                            return (
                              <li key={idx} className="flex items-start gap-4">
                                {!provider || (provider !== "youtube" && provider !== "google") ? (
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500/40" />
                                ) : (
                                  <div className="mt-0.5 shrink-0">
                                    {provider === "google" && (
                                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                      </svg>
                                    )}
                                  </div>
                                )}
                                <div className="flex flex-col gap-1 w-full">
                                  {link ? (
                                    <a href={link} target="_blank" rel="noopener noreferrer"
                                      className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link">
                                      <span>{label}</span>
                                      <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                      </svg>
                                    </a>
                                  ) : (
                                    <span className="text-xs font-medium text-slate-300 leading-normal">{label}</span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">{level.num === "03" ? "Additional" : "Alternatives"}</p>
                        <ul className="space-y-4">
                          {cat.items.slice(1).map((item: any, idx: number) => {
                            const isObj = typeof item === "object";
                            const label = isObj ? item.label : item;
                            const link = isObj ? item.link : null;
                            const provider = isObj ? item.provider : null;
                            return (
                              <li key={idx} className="flex items-start gap-4 mb-2 last:mb-0">
                                {!provider || (provider !== "youtube" && provider !== "google") ? (
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500/40" />
                                ) : (
                                  <div className="mt-0.5 shrink-0">
                                    {provider === "google" && (
                                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                      </svg>
                                    )}
                                  </div>
                                )}
                                <div className="flex flex-col gap-1 w-full">
                                  {link ? (
                                    <a href={link} target="_blank" rel="noopener noreferrer"
                                      className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link">
                                      <span>{label}</span>
                                      <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                      </svg>
                                    </a>
                                  ) : (
                                    <span className="text-xs font-medium text-slate-300 leading-normal">{label}</span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    /* ── All other categories (or single-cert): flat list ── */
                    <ul className="space-y-4 pt-1">
                      {cat.items.map((item: any, idx: number) => {
                        const isObj = typeof item === "object";
                        const label = isObj ? item.label : item;
                        const link = isObj ? item.link : null;
                        const provider = isObj ? item.provider : null;

                        return (
                          <li key={idx} className="flex items-start gap-4 mb-2 last:mb-0">
                            {!provider || (provider !== "youtube" && provider !== "google") ? (
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-red-500/40" />
                            ) : (
                              <div className="mt-0.5 shrink-0">
                                {provider === "youtube" && (
                                  <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                  </svg>
                                )}
                                {provider === "google" && (
                                  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                  </svg>
                                )}
                              </div>
                            )}
                            <div className="flex flex-col gap-1 w-full">
                              {link ? (
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link"
                                >
                                  <span>{label}</span>
                                  <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                  </svg>
                                </a>
                              ) : (
                                <span className="text-xs font-medium text-slate-300 leading-normal">
                                  {label}
                                </span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Simple Footer */}
      <div className="mt-12 mb-20 flex flex-col items-center gap-4 px-6">
        <button
          onClick={() => router.push("/roadmaps/ai-hacking")}
          className="w-full max-w-xs py-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to AI Experience
        </button>
        <button
          onClick={() => router.push("/")}
          className="w-full max-w-xs py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600 active:text-slate-300 transition-all"
        >
          Go to Homepage
        </button>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "24px",
          zIndex: 100,
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "rgba(15,23,42,0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#f8fafc",
          cursor: "pointer",
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? "visible" : "hidden",
          transform: showScrollTop ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );


  if (isMobile) {
    return <MobileAiHackingCareerPath />;
  }



  return (
    <main className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
      <div style={{ transform: `scale(${scaleFactor})`, transformOrigin: "top left", width: scaleFactor !== 1 ? `${100 / scaleFactor}%` : "100%", height: scaleFactor !== 1 ? `${100 / scaleFactor}%` : "100%" }}>

        <header
          className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-slate-950/85 px-8 py-4 backdrop-blur-md"
        >
          <div className="flex items-center gap-6">
            <button
              onClick={() => router.push("/")}
              className="font-mono text-sm font-bold uppercase tracking-widest text-slate-400 transition-colors hover:text-white"
            >
              Home
            </button>
            <div className="h-4 w-px bg-white/10" />
            <button
              onClick={() => router.push("/roadmaps/ai-hacking")}
              className="flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-widest text-slate-500 transition-colors hover:text-red-300"
            >
              <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              AI Experience
            </button>
          </div>

          <p className="font-mono text-base font-black uppercase tracking-[0.45em] text-red-400">
            AI Hacking Career Path
          </p>
          <div className="w-64" /> {/* Balanced spacer */}
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
          <section className="relative flex min-h-[85vh] items-start justify-center overflow-hidden pt-24 pb-32 lg:pt-32">
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
              style={{ background: "radial-gradient(ellipse at center, rgba(239,68,68,0.04) 0%, transparent 65%)" }}
            />

            <div className="relative z-10 flex w-full max-w-7xl items-start px-8 lg:px-12">
              {/* Index - LHS (Desktop only) */}
              <div className="hero-anim hidden w-80 flex-col gap-8 rounded-2xl border border-white/5 bg-slate-900/10 p-8 backdrop-blur-sm lg:flex shadow-2xl">
                <div className="space-y-2">
                  <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-slate-400 font-bold">
                    Phase Index
                  </p>
                  <div className="h-0.5 w-12 bg-red-500/50" />
                </div>
                
                <nav className="flex flex-col gap-7">
                  {LEVELS.map((level, i) => (
                    <button
                      key={level.num}
                      onClick={() => scrollToLevel(i)}
                      className="group flex flex-col items-start gap-1 text-left transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-sm font-black text-slate-700 transition-colors group-hover:text-white" style={{ color: activeLevel === i ? level.color : undefined }}>
                          {level.num}
                        </span>
                        <span 
                          className="font-mono text-base font-bold tracking-widest text-slate-400 transition-all group-hover:translate-x-1 uppercase"
                          style={{ color: level.color }}
                        >
                          {level.label}
                        </span>
                      </div>
                      <div className="ml-9 h-px w-0 bg-red-500/40 transition-all duration-500 group-hover:w-16" />
                    </button>
                  ))}
                </nav>

                <div className="mt-4">
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-slate-600 leading-relaxed">
                    Select a role to view detailed<br />roadmap & requirements.
                  </p>
                </div>
              </div>

              {/* Hero Content - Shifted Right */}
              <div ref={heroRef} className="flex-1 px-8 text-center lg:pl-24 lg:text-left">
                <div className="hero-anim mb-6 flex justify-center lg:justify-start">
                  <div className="rounded-full border border-red-500/30 bg-red-950/40 px-5 py-2 flex items-center gap-3 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" style={{ boxShadow: "0 0 10px #ef4444" }}></span>
                    <p className="font-mono text-[10px] uppercase tracking-[0.55em] text-red-400">
                      The Path to Dominance
                    </p>
                  </div>
                </div>

                {/* Big Question Hook */}
                <div className="hero-anim mb-6 flex justify-center lg:justify-start">
                  <h1
                    className="font-mono font-black text-red-500 tracking-tight"
                    style={{
                      fontSize: "clamp(42px, 6vw, 76px)",
                      textShadow: "0 0 80px rgba(239,68,68,0.5), 0 0 160px rgba(239,68,68,0.2)",
                      lineHeight: "1.05"
                    }}
                  >
                    Want to hack<br />AI systems?
                  </h1>
                </div>

                <p className="hero-anim mb-6 font-sans text-xl leading-relaxed text-slate-100 max-w-2xl mx-auto lg:mx-0">
                  Stop guessing. This is the ultimate, research-backed roadmap for your AI security career.
                </p>
                <p className="hero-anim mb-10 font-sans text-base leading-relaxed text-slate-400 max-w-xl mx-auto lg:mx-0">
                  Distilled from community discussions and industry standards. We&apos;ve mapped out the precise skills, tools, and certifications you need—from your first lab to leading the SOC.
                </p>
              </div>
            </div>

            {/* Centered Scroll Hint (Independent of flex shift) */}
            <div className="hero-anim absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4 text-slate-300">
              <span
                className="font-mono font-bold uppercase tracking-[0.6em]"
                style={{
                  fontSize: 11,
                }}
              >
                Scroll to explore
              </span>
              <div className="animate-bounce">
                <svg width="22" height="22" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M7 2 L7 12 M2 7 L7 12 L12 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </section>

          {/* ── Career Levels ────────────────────────────────────────────────── */}
          <div className="relative mx-auto max-w-7xl px-8">
            {/* Continuous trunk — spans all level sections */}
            <div
              className="pointer-events-none absolute"
              style={{ left: 55, top: 120, bottom: 0, width: 2 }}
            >
              <div ref={trunkRef} className="tech-tree-trunk h-full w-full" />
            </div>

            {LEVELS.map((level, i) => (
              <section
                key={level.num}
                ref={(el) => { sectionRefs.current[i] = el; }}
                className="relative flex h-screen w-full items-center opacity-0"
                style={{ zIndex: 10 - i }}
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
                        { title: "Resources", icon: "🧪", items: level.labs },
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
                        <div className="flex-1 pb-16 relative">
                          {cat.title === "Certifications" && cat.items.length > 1 ? (
                            /* ── Certifications: Recommended + Additional sections ── */
                            <div className="flex flex-col gap-5 pt-1 pr-2">
                              {/* RECOMMENDED */}
                              <div>
                                <p className="mb-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.35em]" style={{ color: level.color, opacity: 0.7 }}>
                                  Recommended
                                </p>
                                <ul>
                                  {[cat.items[0]].map((item: any, idx: number) => {
                                    const isObj = typeof item === "object";
                                    const label = isObj ? item.label : item;
                                    const link = isObj ? item.link : null;
                                    const provider = isObj ? item.provider : null;
                                    return (
                                      <li key={idx} className="flex items-start gap-4 group/li transition-all duration-300">
                                        {!provider ? (
                                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm transition-transform group-hover/li:scale-125" style={{ background: level.color, boxShadow: `0 0 8px ${level.color}` }} />
                                        ) : (
                                          <div className="mt-1 shrink-0 transition-transform group-hover/li:scale-110">
                                            <ProviderFavicon provider={provider} size={18} />
                                          </div>
                                        )}
                                        <div className="flex flex-col gap-1 w-full">
                                          {link ? (
                                            <a href={link} target="_blank" rel="noopener noreferrer"
                                              className="font-sans text-[13px] leading-relaxed text-slate-300 hover:text-white transition-all flex items-center justify-between group/link">
                                              <span className="relative">
                                                {label}
                                                <span className="absolute left-0 -bottom-1 w-0 h-px bg-current transition-all group-hover/link:w-2/3 opacity-30" />
                                              </span>
                                              <svg className="w-3.5 h-3.5 opacity-10 group-hover/link:opacity-60 group-hover/link:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                              </svg>
                                            </a>
                                          ) : (
                                            <span className="font-sans text-[13px] leading-relaxed text-slate-300">{label}</span>
                                          )}
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>

                              {/* ADDITIONAL */}
                              <div>
                                <p className="mb-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">
                                  {level.num === "03" ? "Additional" : "Alternatives"}
                                </p>
                                <ul className="space-y-4">
                                  {cat.items.slice(1).map((item: any, idx: number) => {
                                    const isObj = typeof item === "object";
                                    const label = isObj ? item.label : item;
                                    const link = isObj ? item.link : null;
                                    const provider = isObj ? item.provider : null;
                                    return (
                                      <li key={idx} className="flex items-start gap-4 group/li transition-all duration-300">
                                        {!provider ? (
                                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm transition-transform group-hover/li:scale-125" style={{ background: level.color, boxShadow: `0 0 8px ${level.color}` }} />
                                        ) : (
                                          <div className="mt-1 shrink-0 transition-transform group-hover/li:scale-110">
                                            <ProviderFavicon provider={provider} size={18} />
                                          </div>
                                        )}
                                        <div className="flex flex-col gap-1 w-full">
                                          {link ? (
                                            <a href={link} target="_blank" rel="noopener noreferrer"
                                              className="font-sans text-[13px] leading-relaxed text-slate-300 hover:text-white transition-all flex items-center justify-between group/link">
                                              <span className="relative">
                                                {label}
                                                <span className="absolute left-0 -bottom-1 w-0 h-px bg-current transition-all group-hover/link:w-2/3 opacity-30" />
                                              </span>
                                              <svg className="w-3.5 h-3.5 opacity-10 group-hover/link:opacity-60 group-hover/link:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                              </svg>
                                            </a>
                                          ) : (
                                            <span className="font-sans text-[13px] leading-relaxed text-slate-300">{label}</span>
                                          )}
                                        </div>
                                      </li>
                                    );
                                  })}
                                </ul>
                              </div>
                            </div>
                          ) : (
                            /* ── All other categories (or single-cert): flat list ── */
                            <ul className="space-y-4 pt-1 pr-2">
                              {cat.items.map((item: any, idx: number) => {
                                const isObj = typeof item === "object";
                                const label = isObj ? item.label : item;
                                const link = isObj ? item.link : null;
                                const provider = isObj ? item.provider : null;

                                return (
                                  <li key={idx} className="flex items-start gap-4 group/li transition-all duration-300">
                                    {!provider ? (
                                      <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm transition-transform group-hover/li:scale-125" style={{ background: level.color, boxShadow: `0 0 8px ${level.color}` }} />
                                    ) : (
                                      <div className="mt-1 shrink-0 transition-transform group-hover/li:scale-110">
                                        <ProviderFavicon provider={provider} size={18} />
                                      </div>
                                    )}

                                    <div className="flex flex-col gap-1 w-full">
                                      {link ? (
                                        <a
                                          href={link}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="font-sans text-[13px] leading-relaxed text-slate-300 hover:text-white transition-all flex items-center justify-between group/link"
                                        >
                                          <span className="relative">
                                            {label}
                                            <span className="absolute left-0 -bottom-1 w-0 h-px bg-current transition-all group-hover/link:w-2/3 opacity-30" />
                                          </span>
                                          <svg className="w-3.5 h-3.5 opacity-10 group-hover/link:opacity-60 group-hover/link:translate-x-0.5 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                          </svg>
                                        </a>
                                      ) : (
                                        <span className="font-sans text-[13px] leading-relaxed text-slate-300">
                                          {label}
                                        </span>
                                      )}
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                          )}
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
              style={{ background: "radial-gradient(ellipse at center, rgba(239,68,68,0.04) 0%, transparent 70%)" }}
            />
            {/* Top border */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

            <div className="relative z-10 mx-auto max-w-5xl">
              <div className="mb-12 text-center">
                <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.55em] text-red-400">
                  Begin
                </p>
                <h2 className="font-mono text-3xl font-black uppercase tracking-widest text-white">
                  Next Actions
                </h2>
                <p className="mt-3 font-sans text-slate-400">
                  Every AI hacker started with one broken prompt. Here&apos;s your first move.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
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
                      {action.items.map((item: any, idx: number) => {
                        const isObj = typeof item === "object";
                        const label = isObj ? item.label : item;
                        const link = isObj ? item.link : null;

                        return (
                          <li key={idx} className="flex items-start gap-2.5">
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                              style={{ background: action.color }}
                            />
                            {link ? (
                              <a
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-sm leading-relaxed text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group/link"
                              >
                                <span>{label}</span>
                                <svg className="w-3.5 h-3.5 opacity-0 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                </svg>
                              </a>
                            ) : (
                              <span className="font-sans text-sm leading-relaxed text-slate-300">
                                {label}
                              </span>
                            )}
                          </li>
                        );
                      })}
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
                  onClick={() => router.push("/roadmaps/ai-hacking")}
                  className="inline-flex items-center gap-3 rounded-xl border border-red-500/35 bg-red-950/20 px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-red-300 transition-all hover:border-red-400/60 hover:bg-red-950/40"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Back to AI Experience
                </button>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "40px",
          right: "40px",
          zIndex: 100,
          width: "56px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "14px",
          background: "rgba(2,6,23,0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#f8fafc",
          cursor: "pointer",
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? "visible" : "hidden",
          transform: showScrollTop ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 15px 40px rgba(0,0,0,0.5)",
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLElement).style.background = "rgba(15,23,42,0.95)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(239,68,68,0.3)";
          (e.currentTarget as HTMLElement).style.color = "#ef4444";
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLElement).style.background = "rgba(2,6,23,0.85)";
          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
          (e.currentTarget as HTMLElement).style.color = "#f8fafc";
        }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </main>
  );
}


