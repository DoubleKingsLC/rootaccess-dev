"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";

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
      "You don't need to understand machine learning to start. You need curiosity, a browser, and the right game to break.",
    time: "0–6 months",
    tools: ["Python", "Jupyter Notebook", "ChatGPT / Claude API", "Burp Suite", "OWASP ZAP"],
    skills: [
      "LLM fundamentals — transformers, tokenisation, RLHF",
      "Prompt engineering and context window mechanics",
      "API usage — REST, JSON, rate limits, auth headers",
      "Python scripting for request automation",
    ],
    certs: [
      "DeepLearning.AI · Prompt Engineering for Developers",
      "Google ML Crash Course — free",
      "OWASP Top 10 for LLMs — study guide",
    ],
    labs: [
      "Gandalf by Lakera — prompt injection game (all levels)",
      "PromptingGuide.ai — structured learning path",
      "HackAPrompt — beginner injection challenges",
    ],
  },
  {
    num: "01",
    label: "Prompt Injection Analyst",
    subtitle: "Breaking the Guardrails",
    color: "#f97316",
    glow: "rgba(249,115,22,0.2)",
    border: "rgba(249,115,22,0.25)",
    quote:
      "The model is told to refuse. Your job is to convince it that refusing was never the instruction.",
    time: "6–18 months",
    tools: ["Burp Suite", "Python", "OpenAI / Anthropic APIs", "LangChain", "Garak"],
    skills: [
      "Direct & indirect prompt injection — all major vectors",
      "Jailbreaking — DAN, persona hijacking, role-play bypass",
      "System prompt extraction and context leakage",
      "Multi-turn conversation manipulation techniques",
    ],
    certs: [
      "Lakera AI Security Fundamentals — free course",
      "OWASP LLM Top 10 — full deep-dive study",
      "PortSwigger Web Security Academy — API & injection",
    ],
    labs: [
      "HackAPrompt competition — all challenge levels",
      "Prompt Airlines CTF — indirect injection scenarios",
      "Gandalf advanced levels 7–10",
    ],
  },
  {
    num: "02",
    label: "AI Red Team Specialist",
    subtitle: "Adversarial ML & Systematic Testing",
    color: "#ef4444",
    glow: "rgba(239,68,68,0.2)",
    border: "rgba(239,68,68,0.25)",
    quote:
      "Probe. Fuzz. Extract. You're not looking for one weakness — you're mapping the entire attack surface of the model.",
    time: "2–4 years",
    tools: ["Garak", "Microsoft PyRIT", "PromptBench", "LLM Fuzzer", "HuggingFace Transformers"],
    skills: [
      "Model extraction and training data inference attacks",
      "Adversarial ML — FGSM, PGD perturbation techniques",
      "Membership inference and privacy leakage testing",
      "Multi-turn chaining and agentic AI exploitation",
    ],
    certs: [
      "OffSec MLSA — Machine Learning Security Assessor",
      "SANS AI & ML Security courses",
      "DEF CON AI Village — CTF participation track",
    ],
    labs: [
      "AI Village CTF at DEF CON — annual competition",
      "Microsoft AI Red Team framework exercises",
      "HuggingFace Hub — model auditing and safety testing",
    ],
  },
  {
    num: "03",
    label: "AI Security Researcher",
    subtitle: "Deep Exploitation & Novel Techniques",
    color: "#fb7185",
    glow: "rgba(251,113,133,0.2)",
    border: "rgba(251,113,133,0.25)",
    quote:
      "You're not running known exploits. You're discovering techniques the field hasn't documented yet.",
    time: "4–7 years",
    tools: ["ART — Adversarial Robustness Toolbox", "TextFooler", "CleanLab", "PyTorch", "Weights & Biases"],
    skills: [
      "Fine-tuning backdoor and trojan injection attacks",
      "Supply chain attacks on model weights and datasets",
      "Multimodal jailbreaks — vision, audio, and text",
      "RAG poisoning and retrieval system exploitation",
    ],
    certs: [
      "GIAC GPEN — Penetration Testing (offensive foundation)",
      "Academic publication portfolio — ArXiv / IEEE S&P",
      "DEF CON AI Village — speaker or workshop track",
    ],
    labs: [
      "Build and red-team your own fine-tuned model",
      "HuggingFace Hub — audit and probe public models",
      "Design and poison a RAG pipeline end-to-end",
    ],
  },
  {
    num: "04",
    label: "Principal AI Security Architect",
    subtitle: "Enterprise Defence & Programme Leadership",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.2)",
    border: "rgba(167,139,250,0.25)",
    quote:
      "You've been the attacker. Now you build the systems that make the next attacker's job impossible.",
    time: "7+ years",
    tools: ["Lakera Guard", "Protect AI", "LLM Guard", "Azure AI Content Safety", "AWS Bedrock Guardrails"],
    skills: [
      "AI security architecture design and guardrail deployment",
      "NIST AI RMF and EU AI Act governance frameworks",
      "LLM firewall implementation and red team programme leadership",
      "Executive communication — translating AI risk to the board",
    ],
    certs: [
      "CISSP — Certified Information Systems Security Professional",
      "CISM — Certified Information Security Manager",
      "CompTIA AI+ — launched 2024",
    ],
    labs: [
      "Design and deploy enterprise LLM guardrail pipelines",
      "Run internal AI red team exercises and tabletops",
      "Build AI incident response playbooks from scratch",
    ],
  },
] as const;

// ── Next action cards ─────────────────────────────────────────────────────────
const ACTIONS = [
  {
    icon: "🎯",
    title: "Break Your First Model",
    color: "#ef4444",
    border: "rgba(239,68,68,0.25)",
    glow: "rgba(239,68,68,0.08)",
    items: [
      "Gandalf by Lakera — beat all 8 levels today, free",
      "HackAPrompt — open entry-level injection challenges",
      "Prompt Airlines CTF — indirect injection scenarios",
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
      "Publish Garak vulnerability scan reports on GitHub",
      "Contribute to the OWASP LLM Top 10 project",
    ],
  },
  {
    icon: "💼",
    title: "Find AI Security Roles",
    color: "#a78bfa",
    border: "rgba(167,139,250,0.25)",
    glow: "rgba(167,139,250,0.08)",
    items: [
      "LinkedIn: search 'AI Red Team', 'LLM Security Engineer'",
      "AI Village job board — DEF CON community listings",
      "Anthropic, OpenAI, Google DeepMind safety teams",
    ],
  },
] as const;

// ── Bezier branch Y positions (SVG viewBox 0 0 100 300) ──────────────────────
const BRANCH_Y = [65, 150, 235] as const;

export default function AiHackingCareerPathPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const trunkRef = useRef<HTMLDivElement>(null);

  const sectionRefs = useRef<(HTMLElement | null)[]>(Array(5).fill(null));
  const hubRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));

  const cardRefs = useRef<(HTMLDivElement | null)[]>(Array(15).fill(null));
  const pathRefs = useRef<(SVGPathElement | null)[]>(Array(15).fill(null));
  const pathGlowRefs = useRef<(SVGPathElement | null)[]>(Array(15).fill(null));

  const toolsCardRefs = useRef<(HTMLDivElement | null)[]>(Array(5).fill(null));
  const toolsPathRefs = useRef<(SVGPathElement | null)[]>(Array(5).fill(null));
  const toolsPathGlowRefs = useRef<(SVGPathElement | null)[]>(Array(5).fill(null));

  const [activeLevel, setActiveLevel] = useState<number>(-1);
  const [layout, setLayout] = useState<any>(null);

  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight;
      let totalWidth = window.innerWidth;

      const levelsContainer = document.querySelector(".max-w-7xl") as HTMLElement;
      if (levelsContainer) {
        const computedStyle = window.getComputedStyle(levelsContainer);
        const pl = parseFloat(computedStyle.paddingLeft || "0");
        const pr = parseFloat(computedStyle.paddingRight || "0");
        totalWidth = levelsContainer.clientWidth - pl - pr;
      }

      const hub = { x: 55, y: vh * 0.22 };

      const toolsCardWidth = Math.max(220, Math.min(280, totalWidth * 0.22));
      const toolsCardX = totalWidth - toolsCardWidth - 20;
      const toolsCardY = hub.y - 35;
      const toolsCard = { x: toolsCardX, y: toolsCardY, w: toolsCardWidth };

      const cardsLeft = 140;
      const cardsRight = totalWidth - 20;
      const layoutWidth = cardsRight - cardsLeft;
      const gap = Math.min(30, layoutWidth * 0.05);
      const cardW = (layoutWidth - gap * 2) / 3;
      const cardY = vh * 0.55;

      const cards = [
        { x: cardsLeft + cardW / 2, y: cardY },
        { x: cardsLeft + cardW + gap + cardW / 2, y: cardY },
        { x: cardsLeft + (cardW + gap) * 2 + cardW / 2, y: cardY },
      ];

      setLayout({ hub, cards, cardW, gap, cardsLeft, cardY, toolsCard });
    };

    setTimeout(handleResize, 50);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const drawToolsBranch = (from: { x: number; y: number }, toBox: { x: number; y: number }, _layout: any) => {
    const r = 14;
    const i = 3;
    const startY = from.y + (i - 1) * 24;
    const jX = 140 + i * 28;
    const jY = from.y + 110;
    const jX2 = toBox.x - 30;
    const cX = from.x + 30;
    const endSX = from.x + 60;
    const connectY = toBox.y + 40;

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
      `L ${toBox.x} ${connectY}`,
    ].join(" ");
  };

  const drawBranch = (from: { x: number; y: number }, to: { x: number; y: number }, i: number) => {
    const r = 14;
    const startY = from.y + (i - 1) * 24;
    const jX = 140 + i * 28;
    const jY = to.y - 70 + i * 20;
    const cX = from.x + 30;
    const endSX = from.x + 60;

    return [
      `M ${from.x} ${from.y}`,
      `C ${cX} ${from.y}, ${cX} ${startY}, ${endSX} ${startY}`,
      `L ${jX - r} ${startY}`,
      `Q ${jX} ${startY} ${jX} ${startY + r}`,
      `L ${jX} ${jY - r}`,
      `Q ${jX} ${jY} ${jX + r} ${jY}`,
      `L ${to.x - r} ${jY}`,
      `Q ${to.x} ${jY} ${to.x} ${jY + r}`,
      `L ${to.x} ${to.y}`,
    ].join(" ");
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroRef.current) {
        const anims = heroRef.current.querySelectorAll<HTMLElement>(".hero-anim");
        gsap.fromTo(
          anims,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.14, delay: 0.2 }
        );
      }

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

      LEVELS.forEach((_, i) => {
        const section = sectionRefs.current[i];
        if (!section) return;

        ScrollTrigger.create({
          trigger: section,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActiveLevel(i),
          onEnterBack: () => setActiveLevel(i),
        });

        gsap.to(section, {
          opacity: 1,
          duration: 0.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: section,
            start: "top 65%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        });

        const sectionTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 55%",
            end: "bottom 35%",
            toggleActions: "play reverse play reverse",
          },
        });

        const hub = hubRefs.current[i];
        if (hub) {
          sectionTl.fromTo(hub, { scale: 0 }, { scale: 1, duration: 0.6, ease: "back.out(2)" }, 0);
        }

        for (let j = 0; j < 3; j++) {
          const path = pathRefs.current[i * 3 + j];
          const glow = pathGlowRefs.current[i * 3 + j];
          if (path && glow) {
            const toX = layout.cards[j].x;
            const toY = layout.cards[j].y;
            const fromX = layout.hub.x;
            const fromY = layout.hub.y;
            const len = (toX - fromX) + Math.abs(toY - fromY) + 60;
            gsap.set([path, glow], { strokeDasharray: len, strokeDashoffset: len });
            sectionTl.to([path, glow], { strokeDashoffset: 0, duration: 1.2, ease: "power2.inOut" }, 0.2 + j * 0.1);
          }
        }

        const tPath = toolsPathRefs.current[i];
        const tGlow = toolsPathGlowRefs.current[i];
        if (tPath && tGlow && layout.toolsCard) {
          gsap.set([tPath, tGlow], { strokeDasharray: 4000, strokeDashoffset: 4000 });
          sectionTl.to([tPath, tGlow], { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" }, 0.35);
        }

        const tCard = toolsCardRefs.current[i];
        if (tCard) {
          sectionTl.fromTo(tCard, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0.8);
        }

        for (let j = 0; j < 3; j++) {
          const card = cardRefs.current[i * 3 + j];
          if (!card) continue;
          sectionTl.fromTo(
            card,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
            0.5 + j * 0.1
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [layout]);

  // suppress unused var warning — BRANCH_Y is kept for parity with SOC structure
  void BRANCH_Y;

  return (
    <main className="min-h-screen text-white overflow-x-hidden" style={{ background: "#07000a" }}>
      {/* Background grid — red tint matching AI hacking theme */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(239,68,68,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,68,68,0.06) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ── Fixed header ──────────────────────────────────────────────────── */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-red-950/60 bg-[#07000a]/85 px-8 py-3.5 backdrop-blur-md">
        <button
          onClick={() => router.push("/roadmaps/ai-hacking")}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate-500 transition-colors hover:text-red-400"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          AI Hacking Experience
        </button>
        <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-red-400">
          AI Hacking Career Path
        </p>
        <div className="w-32" />
      </header>

      {/* ── Fixed level nav (right side) ──────────────────────────────────── */}
      <nav className="pointer-events-none fixed right-6 top-1/2 z-50 -translate-y-1/2 flex flex-col items-end gap-5">
        {LEVELS.map((level, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="font-mono text-[8px] uppercase tracking-widest text-slate-600">
              {level.num}
            </span>
            <div
              className="h-2.5 w-2.5 rounded-full border transition-all duration-500"
              style={{
                borderColor: activeLevel >= i ? level.color : "rgba(51,10,10,0.6)",
                background: activeLevel >= i ? level.color : "transparent",
                boxShadow: activeLevel === i ? `0 0 12px ${level.color}` : "none",
              }}
            />
          </div>
        ))}
      </nav>

      <div ref={containerRef} className="relative z-10 pt-16">
        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {/* Radial vignette */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at center, transparent 35%, rgba(7,0,10,0.96) 100%)" }}
          />
          {/* Crimson ambient */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, rgba(239,68,68,0.06) 0%, transparent 65%)" }}
          />

          <div ref={heroRef} className="relative z-10 max-w-3xl px-8 text-center">
            <div className="hero-anim mb-6 flex justify-center">
              <div className="rounded-full border border-red-500/30 bg-red-950/40 px-5 py-2 flex items-center gap-3 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse" style={{ boxShadow: "0 0 10px #ef4444" }} />
                <p className="font-mono text-[10px] uppercase tracking-[0.55em] text-red-400">
                  The Blueprint to Breaking AI
                </p>
              </div>
            </div>

            <div className="hero-anim mb-6 flex justify-center">
              <h1
                className="font-mono font-black tracking-tight"
                style={{
                  fontSize: "clamp(48px, 8vw, 84px)",
                  color: "#ef4444",
                  textShadow: "0 0 80px rgba(239,68,68,0.5), 0 0 160px rgba(239,68,68,0.2)",
                  lineHeight: "1.05",
                }}
              >
                Want to hack<br />AI systems?
              </h1>
            </div>

            <p className="hero-anim mb-4 font-sans text-xl leading-relaxed text-slate-100 max-w-2xl mx-auto">
              Stop guessing. This is the research-backed roadmap for building a career in AI security.
            </p>
            <p className="hero-anim font-sans text-base leading-relaxed text-slate-400 max-w-2xl mx-auto">
              From prompt injection fundamentals to leading enterprise AI red team programmes — mapped across five levels with the exact tools, certifications, and labs you need to get there.
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
          {/* Continuous trunk */}
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

                    {layout.cards.map((targetCard: any, j: number) => {
                      const d = drawBranch(layout.hub, targetCard, j);
                      return (
                        <g key={`branch-${j}`}>
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
                          <path
                            ref={(el) => { pathRefs.current[i * 3 + j] = el; }}
                            d={d}
                            fill="none"
                            stroke={level.color}
                            strokeWidth={1.5}
                            opacity={0.8}
                            strokeLinecap="round"
                          />
                          <circle
                            cx={targetCard.x} cy={targetCard.y} r={3}
                            fill={level.color}
                            style={{ filter: `drop-shadow(0 0 5px ${level.color})` }}
                          />
                        </g>
                      );
                    })}

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

                  {/* ── Hub node ── */}
                  <div
                    ref={(el) => { hubRefs.current[i] = el; }}
                    className="absolute flex items-center justify-center rounded-full border-2 z-10"
                    style={{
                      left: layout.hub.x,
                      top: layout.hub.y,
                      width: 56,
                      height: 56,
                      transform: "translate(-50%, -50%)",
                      borderColor: level.color,
                      background: "#07000a",
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

                  {/* Vertical Level Label */}
                  <div
                    className="absolute z-10"
                    style={{
                      left: layout.hub.x - 5,
                      top: layout.hub.y - 80,
                      writingMode: "vertical-rl",
                      transform: "rotate(180deg)",
                    }}
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.4em]" style={{ color: level.color, opacity: 0.7 }}>
                      {level.label}
                    </span>
                  </div>

                  {/* ── Title & Quote ── */}
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

                  {/* ── Tools Card ── */}
                  {layout.toolsCard && (
                    <div
                      ref={(el) => { toolsCardRefs.current[i] = el; }}
                      className="absolute rounded-xl border px-5 py-5 backdrop-blur-md z-10 flex flex-col"
                      style={{
                        left: layout.toolsCard.x,
                        top: layout.toolsCard.y,
                        width: layout.toolsCard.w,
                        background: "rgba(7,0,10,0.85)",
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
                      <ul className="space-y-3">
                        {level.tools.map((item) => (
                          <li key={item} className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: level.color, boxShadow: `0 0 8px ${level.color}` }} />
                            <span className="font-sans text-[13px] leading-relaxed text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* ── Content Cards ── */}
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
                      className="absolute rounded-xl border px-5 py-6 backdrop-blur-md z-10 flex flex-col"
                      style={{
                        left: layout.cardsLeft + j * (layout.cardW + layout.gap),
                        top: layout.cardY + 12,
                        width: layout.cardW,
                        height: "auto",
                        minHeight: layout.cardY * 0.45,
                        background: "rgba(7,0,10,0.85)",
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
                              <span className="font-sans text-[13px] leading-relaxed text-slate-300">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
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
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, rgba(239,68,68,0.05) 0%, transparent 70%)" }}
          />
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(to right, transparent, rgba(239,68,68,0.3), transparent)" }} />

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

            <div className="grid grid-cols-3 gap-6">
              {ACTIONS.map((action) => (
                <div
                  key={action.title}
                  className="rounded-2xl border px-6 py-7 backdrop-blur-sm"
                  style={{
                    background: "rgba(7,0,10,0.7)",
                    borderColor: action.border,
                    boxShadow: `0 0 40px ${action.glow}`,
                  }}
                >
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
                AI security is the fastest-growing discipline in the field. The researchers who understand how these systems break will define how they&apos;re built.
              </p>
              <button
                onClick={() => router.push("/roadmaps/ai-hacking")}
                className="inline-flex items-center gap-3 rounded-xl px-8 py-3.5 font-mono text-sm uppercase tracking-widest text-red-300 transition-all"
                style={{
                  border: "1px solid rgba(239,68,68,0.35)",
                  background: "rgba(239,68,68,0.08)",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.18)";
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.6)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "rgba(239,68,68,0.08)";
                  e.currentTarget.style.borderColor = "rgba(239,68,68,0.35)";
                }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M9 6H3M3 6L6 3M3 6L6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Back to AI Hacking Experience
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
