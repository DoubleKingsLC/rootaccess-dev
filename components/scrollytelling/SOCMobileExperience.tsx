"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MonitorPortal } from "./MonitorPortal";
import { CareerRoadmap } from "./CareerRoadmap";
import { IntelTicker } from "./IntelTicker";

gsap.registerPlugin(ScrollTrigger);

type TacticalItem = {
    name: string;
    tip: string;
};

type LevelData = {
    num: string;
    label: string;
    subtitle: string;
    color: string;
    quote: string;
    skills: TacticalItem[];
    certs: TacticalItem[];
    labs: TacticalItem[];
};

// ── Career level data (Expanded with Pro Tips) ──────────────────────
const LEVELS: LevelData[] = [
    {
        num: "01",
        label: "L1 Triage Analyst",
        subtitle: "First Line of Detection",
        color: "#22d3ee",
        quote: "07:45. You open the SIEM dashboard. 4,200 alerts overnight. Your job is to find the three that matter.",
        skills: [
            { name: "Log Analysis", tip: "Master KQL/SPL to filter noise from actual threats." },
            { name: "Alert Triage", tip: "Identify true positives vs false positives at scale." },
            { name: "IOC Lookup", tip: "Cross-reference hashes and IPs with VT and AlienVault." }
        ],
        certs: [
            { name: "BTL1", tip: "Practical 24h exam simulating real SOC incidents." },
            { name: "PSAA", tip: "Focuses on SIEM operations and incident response." },
            { name: "CompTIA Security+", tip: "Foundational knowledge for all entry-level roles." }
        ],
        labs: [
            { name: "LetsDefend", tip: "Real SOC tickets with SIEM and EDR tools." },
            { name: "THM SOC L1", tip: "Guided path for beginners starting with basics." },
            { name: "HTB Defender", tip: "Advanced scenarios focused on detection engineering." }
        ],
    },
    {
        num: "02",
        label: "L2 Advanced Analyst",
        subtitle: "Pattern Recognition & Correlation",
        color: "#8b5cf6",
        quote: "Three events. Each harmless alone. But you see them together — and you see the attacker's hand.",
        skills: [
            { name: "Threat Mapping", tip: "Align attacker TTPs with the MITRE ATT&CK framework." },
            { name: "Malware Triage", tip: "Static/dynamic analysis to extract local IOCs." },
            { name: "SOAR Automation", tip: "Build playbooks to automate repeatable IR tasks." }
        ],
        certs: [
            { name: "HTB CDSA", tip: "Focuses on deep traffic and memory analysis." },
            { name: "CCDL2", tip: "Advanced defense tactics against modern APTs." }
        ],
        labs: [
            { name: "CyberDefenders", tip: "Blue Team CTFs with real-world artifacts." },
            { name: "DFIR Scenario", tip: "Investigate compromised systems from start to finish." },
            { name: "Packet Analysis", tip: "Become an expert at Wireshark and network flows." }
        ],
    },
    {
        num: "03",
        label: "L3 Forensic Analyst",
        subtitle: "Deep Forensics & Incident Lead",
        color: "#f59e0b",
        quote: "You pull the disk. You find the malware. You trace it to its first byte. This is where the story ends.",
        skills: [
            { name: "Deep Forensics", tip: "Recover deleted files and examine registry hives." },
            { name: "Reverse Eng", tip: "Decompile binaries to find C2 beacons and logic." },
            { name: "APT Tracking", tip: "Profile specific threat actors and their infrastructure." }
        ],
        certs: [
            { name: "BTL2", tip: "Expert-level practical IR and forensic examination." },
            { name: "GCFA", tip: "Industry standard for advanced forensic analysis." },
            { name: "GCIH", tip: "Focuses on tactical response and attack techniques." }
        ],
        labs: [
            { name: "Homelab SOC", tip: "Build a Proxmox/ELK stack for safe IR practice." },
            { name: "REMnux DFIR", tip: "Master Linux-based malware analysis tools." },
            { name: "SANS FOR508", tip: "High-end training for APT hunt and IR." }
        ],
    },
];

const TIMELINE = [
    { label: "Detection", threshold: 0 },
    { label: "Triage", threshold: 1 },
    { label: "Analysis", threshold: 2 },
    { label: "Containment", threshold: 3 },
    { label: "Recovery", threshold: 4 },
] as const;

export const SOCMobileExperience: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const spineRef = useRef<SVGLineElement>(null);
    const [activeSection, setActiveSection] = useState(0);
    const [activeCard, setActiveCard] = useState<{ levelIdx: number; category: 'skills' | 'certs' | 'labs' } | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const sectionHeight = window.innerHeight;
            const scrollPos = container.scrollTop;
            const index = Math.round(scrollPos / sectionHeight);
            if (index !== activeSection) {
                setActiveSection(index);
            }
        };

        container.addEventListener("scroll", handleScroll);

        const ctx = gsap.context(() => {
            gsap.to(spineRef.current, {
                strokeDashoffset: 0,
                ease: "none",
                scrollTrigger: {
                    trigger: container,
                    scroller: container,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: true,
                }
            });
        }, containerRef);

        return () => {
            container.removeEventListener("scroll", handleScroll);
            ctx.revert();
        };
    }, [activeSection]);

    const Section: React.FC<{ children: React.ReactNode; id?: string }> = ({ children, id }) => (
        <section
            id={id}
            className="relative h-screen min-h-screen w-full snap-start overflow-hidden flex flex-col items-center justify-center px-6"
        >
            {children}
        </section>
    );

    const TacticalCard: React.FC<{ title: string; items: TacticalItem[]; onClick: () => void }> = ({ title, items, onClick }) => (
        <div
            onClick={onClick}
            className="flex-1 bg-slate-900/10 border border-white/5 rounded-lg p-3 backdrop-blur-sm cursor-pointer active:bg-slate-900/40 transition-colors"
        >
            <p className="font-mono text-[8px] uppercase tracking-wider text-slate-500 mb-2">{title}</p>
            <div className="space-y-1">
                {items.slice(0, 3).map((item, idx) => (
                    <p key={idx} className="text-[9px] font-sans text-slate-300 truncate">• {item.name}</p>
                ))}
            </div>
        </div>
    );

    const Modal = () => {
        if (!activeCard) return null;
        const level = LEVELS[activeCard.levelIdx];
        const items = level[activeCard.category];
        const categoryTitle = activeCard.category.charAt(0).toUpperCase() + activeCard.category.slice(1);

        return (
            <div
                className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-xl"
                onClick={() => setActiveCard(null)}
            >
                <div
                    className="w-full max-w-sm max-h-[70vh] flex flex-col bg-slate-950 border border-cyan-500/20 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.1)]"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Modal Header */}
                    <div className="border-b border-white/5 bg-slate-900/30 px-5 py-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-black"
                                style={{ borderColor: level.color, color: level.color }}
                            >
                                {level.num}
                            </div>
                            <div>
                                <p className="font-mono text-[8px] uppercase tracking-widest text-slate-500">{level.label}</p>
                                <h3 className="font-sans text-sm font-bold text-white uppercase">{categoryTitle}</h3>
                            </div>
                        </div>
                        <button
                            onClick={() => setActiveCard(null)}
                            className="p-1 hover:text-cyan-400 text-slate-500 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Modal Content */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                        {items.map((item, idx) => (
                            <div key={idx} className="space-y-1.5 border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                    <p className="font-sans text-sm font-bold text-slate-100">{item.name}</p>
                                </div>
                                <div className="bg-cyan-400/5 border-l-2 border-cyan-400/20 p-2.5 rounded-r-md">
                                    <p className="font-sans text-xs text-slate-400 leading-relaxed italic">
                                        <span className="text-cyan-400 font-mono text-[9px] uppercase tracking-widest block mb-1 not-italic">Pro Tip:</span>
                                        {item.tip}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal Footer */}
                    <div className="p-4 bg-slate-900/20">
                        <button
                            onClick={() => setActiveCard(null)}
                            className="w-full bg-slate-900 border border-white/10 rounded-xl py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-cyan-300 hover:border-cyan-400/50 hover:bg-cyan-950/20 transition-all"
                        >
                            Close Terminal
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div
            ref={containerRef}
            className="relative h-screen w-full overflow-y-auto snap-y snap-mandatory bg-slate-950 scroll-smooth"
        >
            {/* ── Background Grid & Spine ── */}
            <div className="pointer-events-none fixed inset-0 z-0">
                <div
                    className="absolute inset-0 opacity-[0.03]"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(34, 211, 238, 0.4) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(34, 211, 238, 0.4) 1px, transparent 1px)
                        `,
                        backgroundSize: "40px 40px",
                    }}
                />

                <svg className="absolute inset-0 h-full w-full">
                    <defs>
                        <filter id="spine-glow">
                            <feGaussianBlur stdDeviation="2.5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <line
                        ref={spineRef}
                        x1="40"
                        y1="10vh"
                        x2="40"
                        y2="490vh"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        strokeDasharray="480vh"
                        strokeDashoffset="480vh"
                        filter="url(#spine-glow)"
                        className="transition-all duration-300 ease-out"
                        style={{ opacity: 0.6 }}
                    />
                </svg>
            </div>

            {/* ── Section 1: Intro ── */}
            <Section id="intro">
                <div className="z-10 text-center space-y-6 max-w-sm holographic-scan p-8 rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-xl">
                    <h1 className="font-sans text-2xl font-semibold tracking-wide text-white">
                        ROOTACCESS.TECH<br />SOC PATHWAY
                    </h1>
                    <div className="h-px w-24 mx-auto bg-cyan-500/50" />
                    <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-400 status-flicker">
                        INITIALIZING MOBILE PROTOCOLS...
                    </p>
                    <p className="text-xs text-slate-400 font-sans leading-relaxed">
                        Scroll to explore the incident lifecycle from detector to responder.
                    </p>
                    <div className="animate-bounce mt-8 text-cyan-400">
                        <svg className="w-6 h-6 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </Section>

            {/* ── Stations Mapping (L1, L2, L3) ── */}
            {LEVELS.map((level, idx) => (
                <Section key={level.num} id={`level-${level.num}`}>
                    <div className="z-10 w-full flex flex-col gap-4 pl-12 pr-4">
                        <div
                            className="absolute left-[40px] -translate-x-1/2 flex items-center justify-center rounded-full border bg-slate-950 transition-all duration-700"
                            style={{
                                width: 42,
                                height: 42,
                                borderColor: level.color,
                                boxShadow: activeSection === (idx + 1) ? `0 0 20px ${level.color}44` : 'none',
                                top: '10%'
                            }}
                        >
                            <span className="font-mono text-sm font-black" style={{ color: level.color }}>{level.num}</span>
                        </div>

                        <div className="space-y-1">
                            <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{level.subtitle}</p>
                            <h2 className="font-sans text-xl font-bold text-white uppercase">{level.label}</h2>
                        </div>

                        <p className="font-sans text-xs italic text-slate-400 leading-relaxed border-l-2 border-white/10 pl-4 py-1">
                            "{level.quote}"
                        </p>

                        <div className="w-full aspect-video rounded-xl border border-white/10 bg-slate-900/50 overflow-hidden relative group">
                            <div className="absolute inset-0 scale-[0.5] origin-top flex items-center justify-center">
                                <MonitorPortal type={level.num === "01" ? "L1" : level.num === "02" ? "L2" : "L3"} progress={level.num === "01" ? 0.15 : level.num === "02" ? 0.45 : 0.75} />
                            </div>
                            <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />
                        </div>

                        {/* ── Tactical Data Row ── */}
                        <div className="flex gap-2 w-full">
                            <TacticalCard title="Skills" items={level.skills} onClick={() => setActiveCard({ levelIdx: idx, category: 'skills' })} />
                            <TacticalCard title="Certs" items={level.certs} onClick={() => setActiveCard({ levelIdx: idx, category: 'certs' })} />
                            <TacticalCard title="Labs" items={level.labs} onClick={() => setActiveCard({ levelIdx: idx, category: 'labs' })} />
                        </div>
                    </div>
                </Section>
            ))}

            {/* ── Section 5: Roadmap Exit ── */}
            <Section id="exit">
                <div
                    className="absolute left-[40px] -translate-x-1/2 flex items-center justify-center rounded-full border-2 border-emerald-400 bg-slate-950 z-10"
                    style={{ width: 42, height: 42, top: '10%', boxShadow: '0 0 20px rgba(52,211,153,0.3)' }}
                >
                    <span className="text-lg">✔</span>
                </div>
                <div className="z-10 w-full scale-[0.9] pl-8">
                    <CareerRoadmap opacity={1} />
                </div>
            </Section>

            {/* ── Modal System ── */}
            <Modal />

            {/* ── Persistent Mobile HUD ── */}
            <div className="fixed inset-x-0 bottom-0 z-[60] pointer-events-none">
                <IntelTicker />
                <div className="border-t border-white/8 bg-slate-950/60 px-6 py-4 backdrop-blur-md pointer-events-auto">
                    <div className="flex items-center justify-between gap-1 max-w-sm mx-auto">
                        {TIMELINE.map((phase, i) => {
                            const isActive = activeSection >= i;
                            return (
                                <React.Fragment key={phase.label}>
                                    <div className="flex flex-col items-center gap-1.5 focus:outline-none" onClick={() => {
                                        containerRef.current?.scrollTo({ top: i * window.innerHeight, behavior: 'smooth' });
                                    }}>
                                        <div
                                            className={`h-2.5 w-2.5 rounded-full border transition-all duration-500 ${isActive ? "border-cyan-400 bg-cyan-400" : "border-slate-600 bg-transparent"
                                                }`}
                                            style={isActive ? { boxShadow: "0 0 10px rgba(34,211,238,0.8)" } : undefined}
                                        />
                                        <p className={`font-mono text-[7px] uppercase tracking-widest transition-colors duration-500 ${isActive ? "text-cyan-400" : "text-slate-600"
                                            }`}>
                                            {phase.label}
                                        </p>
                                    </div>
                                    {i < TIMELINE.length - 1 && (
                                        <div className="mb-4 flex-1 h-px bg-slate-800">
                                            <div
                                                className="h-full bg-cyan-400 transition-all duration-700"
                                                style={{ width: activeSection > i ? "100%" : "0%" }}
                                            />
                                        </div>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .holographic-scan {
                    position: relative;
                    overflow: hidden;
                }
                .holographic-scan::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(0deg, transparent 45%, rgba(34, 211, 238, 0.05) 50%, transparent 55%);
                    background-size: 100% 20px;
                    animation: scan 4s linear infinite;
                    pointer-events: none;
                }
                @keyframes scan {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(15, 23, 42, 0.8);
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #22d3ee;
                    border-radius: 10px;
                }
            `}</style>
        </div>
    );
};
