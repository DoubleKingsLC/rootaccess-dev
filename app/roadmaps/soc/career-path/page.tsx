"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type LevelId = "roots" | "l1" | "l2" | "l3";

const LEVELS: Record<
  LevelId,
  {
    label: string;
    levelLabel: string;
    color: string;
    skills: string[];
    certs: string[];
    labs: string[];
  }
> = {
  roots: {
    label: "The Roots",
    levelLabel: "LEVEL 00: ROOTS",
    color: "#22d3ee",
    skills: ["Networking basics", "Operating system basics"],
    certs: ["CompTIA Security+"],
    labs: ["TryHackMe · Pre-Security path"]
  },
  l1: {
    label: "Level 1 · Triage Analyst",
    levelLabel: "LEVEL 01: TRIAGE ANALYST",
    color: "#22d3ee",
    skills: ["SIEM monitoring", "Alert triage"],
    certs: ["Blue Team Level 1 (BTL1)"],
    labs: ["LetsDefend · SOC analyst labs"]
  },
  l2: {
    label: "Level 2 · Advanced Analyst",
    levelLabel: "LEVEL 02: ADVANCED ANALYST",
    color: "#22d3ee",
    skills: ["Forensics", "Malware analysis"],
    certs: ["CCD", "Blue Team Level 2 (BTL2)"],
    labs: ["CyberDefenders · challenge labs"]
  },
  l3: {
    label: "Level 3 · IR Lead",
    levelLabel: "LEVEL 03: IR LEAD",
    color: "#fbbf24",
    skills: ["Cloud security", "Incident remediation"],
    certs: [
      "AWS Certified Security – Specialty",
      "PSAA Architecture (Practical Security Architecture & Automation)"
    ],
    labs: ["Proxmox/Wazuh homelab for SOC simulation"]
  }
};

const Avatar: React.FC = () => (
  <div className="flex flex-col items-center">
    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-500/70 bg-slate-900/90">
      <div className="h-3 w-3 rounded-full bg-slate-200" />
    </div>
    <div className="mt-1 h-1.5 w-7 rounded-full bg-slate-700/80" />
  </div>
);

type LeafNodeProps = {
  label: string;
  highlightExpert?: boolean;
};

const LeafNode: React.FC<LeafNodeProps> = ({ label, highlightExpert }) => (
  <div className="flex items-center justify-between gap-2">
    <span className="font-sans text-sm text-slate-100">{label}</span>
    {highlightExpert && (
      <span className="rounded-full border border-emerald-400/60 px-2 py-[1px] font-mono text-[9px] uppercase tracking-widest text-emerald-300">
        Earned
      </span>
    )}
  </div>
);

type CategoryCardProps = {
  title: string;
  cardRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  cardRef,
  children
}) => (
  <div
    ref={cardRef}
    className="w-full max-w-2xl rounded-lg border border-white/10 bg-slate-950/40 px-4 py-3 backdrop-blur-xl opacity-0 -translate-x-12"
  >
    <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate-300">
      {title}
    </p>
    <div className="mt-2 space-y-1">{children}</div>
  </div>
);

export default function SocCareerPathPage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trunkRef = useRef<HTMLDivElement | null>(null);

  const rootsSectionRef = useRef<HTMLDivElement | null>(null);
  const l1SectionRef = useRef<HTMLDivElement | null>(null);
  const l2SectionRef = useRef<HTMLDivElement | null>(null);
  const l3SectionRef = useRef<HTMLDivElement | null>(null);

  const rootsHubRef = useRef<HTMLDivElement | null>(null);
  const l1HubRef = useRef<HTMLDivElement | null>(null);
  const l2HubRef = useRef<HTMLDivElement | null>(null);
  const l3HubRef = useRef<HTMLDivElement | null>(null);

  // Primary branches: avatar -> hub dot -> 3 category stems
  const rootsPrimaryRefs = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null)
  ];
  const l1PrimaryRefs = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null)
  ];
  const l2PrimaryRefs = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null)
  ];
  const l3PrimaryRefs = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null)
  ];

  // Secondary branches: category card -> leaf group
  const rootsSecondaryRefs = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null)
  ];
  const l1SecondaryRefs = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null)
  ];
  const l2SecondaryRefs = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null)
  ];
  const l3SecondaryRefs = [
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null),
    useRef<SVGPathElement | null>(null)
  ];

  // Category cards
  const rootsCategoryRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null)
  ];
  const l1CategoryRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null)
  ];
  const l2CategoryRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null)
  ];
  const l3CategoryRefs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null)
  ];

  const [activeStage, setActiveStage] = useState<LevelId>("roots");

  useEffect(() => {
    const containerEl = containerRef.current;
    const trunkEl = trunkRef.current;
    if (!containerEl || !trunkEl) return;

    const ctx = gsap.context(() => {
      // Continuous trunk bridging all stages
      gsap.set(trunkEl, { scaleY: 0, transformOrigin: "top center" });
      gsap.to(trunkEl, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerEl,
          start: "top top",
          end: "+=4000",
          scrub: 1
        }
      });

      const sections: {
        id: LevelId;
        sectionRef: React.RefObject<HTMLDivElement>;
        hubRef: React.RefObject<HTMLDivElement>;
        primary: React.RefObject<SVGPathElement>[];
        secondary: React.RefObject<SVGPathElement>[];
        cards: React.RefObject<HTMLDivElement>[];
      }[] = [
        {
          id: "roots",
          sectionRef: rootsSectionRef,
          hubRef: rootsHubRef,
          primary: rootsPrimaryRefs,
          secondary: rootsSecondaryRefs,
          cards: rootsCategoryRefs
        },
        {
          id: "l1",
          sectionRef: l1SectionRef,
          hubRef: l1HubRef,
          primary: l1PrimaryRefs,
          secondary: l1SecondaryRefs,
          cards: l1CategoryRefs
        },
        {
          id: "l2",
          sectionRef: l2SectionRef,
          hubRef: l2HubRef,
          primary: l2PrimaryRefs,
          secondary: l2SecondaryRefs,
          cards: l2CategoryRefs
        },
        {
          id: "l3",
          sectionRef: l3SectionRef,
          hubRef: l3HubRef,
          primary: l3PrimaryRefs,
          secondary: l3SecondaryRefs,
          cards: l3CategoryRefs
        }
      ];

      // Prepare branch dasharrays
      sections.forEach(({ primary, secondary }) => {
        [...primary, ...secondary].forEach((ref) => {
          const p = ref.current;
          if (!p) return;
          const len = p.getTotalLength();
          p.style.strokeDasharray = String(len);
          p.style.strokeDashoffset = String(len);
        });
      });

      sections.forEach(({ id, sectionRef, hubRef, primary, secondary, cards }) => {
        const sec = sectionRef.current;
        const hub = hubRef.current;
        if (!sec || !hub) return;

        // Pin section and update ProgressNav
        ScrollTrigger.create({
          trigger: sec,
          start: "top top",
          end: "+=1000",
          pin: true,
          pinSpacing: true,
          scrub: true,
          onEnter: () => setActiveStage(id),
          onEnterBack: () => setActiveStage(id)
        });

        // Avatar / hub scale-in
        gsap.from(hub, {
          scale: 0,
          opacity: 0,
          duration: 0.4,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: sec,
            start: "center center",
            end: "+=300",
            scrub: true
          }
        });

        // Primary branch growth (push effect driver)
        primary.forEach((ref) => {
          const path = ref.current;
          if (!path) return;
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "center center",
              end: "+=300",
              scrub: true
            }
          });
        });

        // Category cards slide as branches grow
        cards.forEach((ref) => {
          const card = ref.current;
          if (!card) return;
          gsap.to(card, {
            opacity: 1,
            x: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "center center",
              end: "+=300",
              scrub: true,
              onEnter: () => card.classList.add("skill-pulse")
            }
          });
        });

        // Secondary branch growth to leaf area
        secondary.forEach((ref) => {
          const path = ref.current;
          if (!path) return;
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: sec,
              start: "center center",
              end: "+=300",
              scrub: true
            }
          });
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div
        ref={containerRef}
        className="relative mx-auto flex max-w-5xl flex-col px-6"
      >
        {/* Trunk */}
        <div className="pointer-events-none absolute inset-0 flex justify-center">
          <div
            ref={trunkRef}
            className="h-[400vh] w-px bg-slate-700/70"
          />
        </div>

        {/* Progress nav */}
        <div className="pointer-events-none fixed right-6 top-1/2 z-30 -translate-y-1/2 flex flex-col items-end gap-3">
          {(["roots", "l1", "l2", "l3"] as LevelId[]).map((id) => (
            <div key={id} className="flex items-center gap-2">
              <span
                className={`h-2.5 w-2.5 rounded-full border border-slate-500 ${
                  activeStage === id ? "bg-cyan-400" : "bg-slate-900"
                }`}
              />
              <span className="font-mono text-[10px] uppercase tracking-widest text-slate-400">
                {id === "roots" ? "R" : id.toUpperCase()}
              </span>
            </div>
          ))}
        </div>

        {/* ROOTS */}
        <section
          ref={rootsSectionRef}
          className="relative flex h-screen items-center"
        >
          <div className="relative flex h-full w-full items-center">
            {/* Avatar + vertical label */}
            <div className="absolute left-[10%] top-0 h-full w-px bg-slate-700/70" />
            <div
              ref={rootsHubRef}
              className="absolute left-[10%] top-1/2 -translate-y-1/2"
            >
              <Avatar />
              <div className="mt-3 origin-center -rotate-180">
                <span className="font-mono text-[10px] tracking-[0.5em] text-slate-500">
                  {LEVELS.roots.levelLabel}
                </span>
              </div>
            </div>

            {/* Flowchart body */}
            <div className="absolute left-[25%] right-[10%] top-1/2 -translate-y-1/2">
              <svg
                className="pointer-events-none absolute inset-0"
                width="400"
                height="300"
                viewBox="0 0 400 300"
              >
                {/* primary orthogonal branches */}
                <g stroke={LEVELS.roots.color} strokeWidth={2} fill="none">
                  {/* Skills */}
                  <path
                    ref={rootsPrimaryRefs[0]}
                    d="M 40 150 L 140 150 L 140 100 L 260 100"
                    strokeLinecap="round"
                  />
                  {/* Certs */}
                  <path
                    ref={rootsPrimaryRefs[1]}
                    d="M 40 150 L 260 150"
                    strokeLinecap="round"
                  />
                  {/* Labs */}
                  <path
                    ref={rootsPrimaryRefs[2]}
                    d="M 40 150 L 140 150 L 140 200 L 260 200"
                    strokeLinecap="round"
                  />
                </g>
                {/* secondary branches to leaf clusters + connection dots */}
                <g stroke={LEVELS.roots.color} strokeWidth={2} fill="none">
                  <path
                    ref={rootsSecondaryRefs[0]}
                    d="M 300 100 L 340 100"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="100" r="2" fill={LEVELS.roots.color} />
                  <path
                    ref={rootsSecondaryRefs[1]}
                    d="M 300 150 L 340 150"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="150" r="2" fill={LEVELS.roots.color} />
                  <path
                    ref={rootsSecondaryRefs[2]}
                    d="M 300 200 L 340 200"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="200" r="2" fill={LEVELS.roots.color} />
                </g>
              </svg>

              <div className="relative z-10 flex w-full max-w-3xl justify-end">
                <div className="flex w-full max-w-2xl flex-col gap-4">
                  <CategoryCard title="Skills" cardRef={rootsCategoryRefs[0]}>
                    {LEVELS.roots.skills.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                  <CategoryCard
                    title="Certifications"
                    cardRef={rootsCategoryRefs[1]}
                  >
                    {LEVELS.roots.certs.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                  <CategoryCard
                    title="Practice & Labs"
                    cardRef={rootsCategoryRefs[2]}
                  >
                    {LEVELS.roots.labs.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEVEL 1 */}
        <section
          ref={l1SectionRef}
          className="relative flex h-screen items-center"
        >
          <div className="relative flex h-full w-full items-center">
            <div className="absolute left-[10%] top-0 h-full w-px bg-slate-700/70" />
            <div
              ref={l1HubRef}
              className="absolute left-[10%] top-1/2 -translate-y-1/2"
            >
              <Avatar />
              <div className="mt-3 origin-center -rotate-180">
                <span className="font-mono text-[10px] tracking-[0.5em] text-slate-500">
                  {LEVELS.l1.levelLabel}
                </span>
              </div>
            </div>

            <div className="absolute left-[25%] right-[10%] top-1/2 -translate-y-1/2">
              <svg
                className="pointer-events-none absolute inset-0"
                width="400"
                height="300"
                viewBox="0 0 400 300"
              >
                <g stroke={LEVELS.l1.color} strokeWidth={2} fill="none">
                  <path
                    ref={l1PrimaryRefs[0]}
                    d="M 40 150 L 140 150 L 140 100 L 260 100"
                    strokeLinecap="round"
                  />
                  <path
                    ref={l1PrimaryRefs[1]}
                    d="M 40 150 L 260 150"
                    strokeLinecap="round"
                  />
                  <path
                    ref={l1PrimaryRefs[2]}
                    d="M 40 150 L 140 150 L 140 200 L 260 200"
                    strokeLinecap="round"
                  />
                </g>
                <g stroke={LEVELS.l1.color} strokeWidth={2} fill="none">
                  <path
                    ref={l1SecondaryRefs[0]}
                    d="M 300 100 L 340 100"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="100" r="2" fill={LEVELS.l1.color} />
                  <path
                    ref={l1SecondaryRefs[1]}
                    d="M 300 150 L 340 150"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="150" r="2" fill={LEVELS.l1.color} />
                  <path
                    ref={l1SecondaryRefs[2]}
                    d="M 300 200 L 340 200"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="200" r="2" fill={LEVELS.l1.color} />
                </g>
              </svg>

              <div className="relative z-10 flex w-full max-w-3xl justify-end">
                <div className="flex w-full max-w-2xl flex-col gap-4">
                  <CategoryCard title="Skills" cardRef={l1CategoryRefs[0]}>
                    {LEVELS.l1.skills.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                  <CategoryCard
                    title="Certifications"
                    cardRef={l1CategoryRefs[1]}
                  >
                    {LEVELS.l1.certs.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                  <CategoryCard
                    title="Practice & Labs"
                    cardRef={l1CategoryRefs[2]}
                  >
                    {LEVELS.l1.labs.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEVEL 2 */}
        <section
          ref={l2SectionRef}
          className="relative flex h-screen items-center"
        >
          <div className="relative flex h-full w-full items-center">
            <div className="absolute left-[10%] top-0 h-full w-px bg-slate-700/70" />
            <div
              ref={l2HubRef}
              className="absolute left-[10%] top-1/2 -translate-y-1/2"
            >
              <Avatar />
              <div className="mt-3 origin-center -rotate-180">
                <span className="font-mono text-[10px] tracking-[0.5em] text-slate-500">
                  {LEVELS.l2.levelLabel}
                </span>
              </div>
            </div>

            <div className="absolute left-[25%] right-[10%] top-1/2 -translate-y-1/2">
              <svg
                className="pointer-events-none absolute inset-0"
                width="400"
                height="300"
                viewBox="0 0 400 300"
              >
                <g stroke={LEVELS.l2.color} strokeWidth={2} fill="none">
                  <path
                    ref={l2PrimaryRefs[0]}
                    d="M 40 150 L 140 150 L 140 100 L 260 100"
                    strokeLinecap="round"
                  />
                  <path
                    ref={l2PrimaryRefs[1]}
                    d="M 40 150 L 260 150"
                    strokeLinecap="round"
                  />
                  <path
                    ref={l2PrimaryRefs[2]}
                    d="M 40 150 L 140 150 L 140 200 L 260 200"
                    strokeLinecap="round"
                  />
                </g>
                <g stroke={LEVELS.l2.color} strokeWidth={2} fill="none">
                  <path
                    ref={l2SecondaryRefs[0]}
                    d="M 300 100 L 340 100"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="100" r="2" fill={LEVELS.l2.color} />
                  <path
                    ref={l2SecondaryRefs[1]}
                    d="M 300 150 L 340 150"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="150" r="2" fill={LEVELS.l2.color} />
                  <path
                    ref={l2SecondaryRefs[2]}
                    d="M 300 200 L 340 200"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="200" r="2" fill={LEVELS.l2.color} />
                </g>
              </svg>

              <div className="relative z-10 flex w-full max-w-3xl justify-end">
                <div className="flex w-full max-w-2xl flex-col gap-4">
                  <CategoryCard title="Skills" cardRef={l2CategoryRefs[0]}>
                    {LEVELS.l2.skills.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                  <CategoryCard
                    title="Certifications"
                    cardRef={l2CategoryRefs[1]}
                  >
                    {LEVELS.l2.certs.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                  <CategoryCard
                    title="Practice & Labs"
                    cardRef={l2CategoryRefs[2]}
                  >
                    {LEVELS.l2.labs.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LEVEL 3 */}
        <section
          ref={l3SectionRef}
          className="relative flex h-screen items-center"
        >
          <div className="relative flex h-full w-full items-center">
            <div className="absolute left-[10%] top-0 h-full w-px bg-slate-700/70" />
            <div
              ref={l3HubRef}
              className="absolute left-[10%] top-1/2 -translate-y-1/2"
            >
              <Avatar />
              <div className="mt-3 origin-center -rotate-180">
                <span className="font-mono text-[10px] tracking-[0.5em] text-slate-500">
                  {LEVELS.l3.levelLabel}
                </span>
              </div>
            </div>

            <div className="absolute left-[25%] right-[10%] top-1/2 -translate-y-1/2">
              <svg
                className="pointer-events-none absolute inset-0"
                width="400"
                height="300"
                viewBox="0 0 400 300"
              >
                <g stroke={LEVELS.l3.color} strokeWidth={2} fill="none">
                  <path
                    ref={l3PrimaryRefs[0]}
                    d="M 40 150 L 140 150 L 140 100 L 260 100"
                    strokeLinecap="round"
                  />
                  <path
                    ref={l3PrimaryRefs[1]}
                    d="M 40 150 L 260 150"
                    strokeLinecap="round"
                  />
                  <path
                    ref={l3PrimaryRefs[2]}
                    d="M 40 150 L 140 150 L 140 200 L 260 200"
                    strokeLinecap="round"
                  />
                </g>
                <g stroke={LEVELS.l3.color} strokeWidth={2} fill="none">
                  <path
                    ref={l3SecondaryRefs[0]}
                    d="M 300 100 L 340 100"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="100" r="2" fill={LEVELS.l3.color} />
                  <path
                    ref={l3SecondaryRefs[1]}
                    d="M 300 150 L 340 150"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="150" r="2" fill={LEVELS.l3.color} />
                  <path
                    ref={l3SecondaryRefs[2]}
                    d="M 300 200 L 340 200"
                    strokeLinecap="round"
                  />
                  <circle cx="260" cy="200" r="2" fill={LEVELS.l3.color} />
                </g>
              </svg>

              <div className="relative z-10 flex w-full max-w-3xl justify-end">
                <div className="flex w-full max-w-2xl flex-col gap-4">
                  <CategoryCard title="Skills" cardRef={l3CategoryRefs[0]}>
                    {LEVELS.l3.skills.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                  <CategoryCard
                    title="Certifications"
                    cardRef={l3CategoryRefs[1]}
                  >
                    <LeafNode
                      label="AWS Certified Security – Specialty"
                      highlightExpert
                    />
                    <LeafNode
                      label="PSAA Architecture (Practical Security Architecture & Automation)"
                      highlightExpert
                    />
                  </CategoryCard>
                  <CategoryCard
                    title="Practice & Labs"
                    cardRef={l3CategoryRefs[2]}
                  >
                    {LEVELS.l3.labs.map((s) => (
                      <LeafNode key={s} label={s} />
                    ))}
                  </CategoryCard>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

