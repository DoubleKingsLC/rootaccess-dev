"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { useRouter } from "next/navigation";
import { HackerAvatar } from "./ai-hacking/HackerAvatar";
import { LLMBrain } from "./ai-hacking/LLMBrain";
import { AIChatBox } from "./ai-hacking/AIChatBox";
import { AI_CHAT_MESSAGES, AI_LLM_COMPROMISED_AT, AI_HACKING_PHASES } from "./ai-hacking/aiHackingModel";
import { AIHackingNotepad } from "./ai-hacking/AIHackingNotepad";
import { AIHackingNotesCard } from "./ai-hacking/AIHackingNotesCard";
import { DataFlightOverlay } from "./ai-hacking/DataFlightOverlay";
import { AIIntroOverlay } from "./AIIntroOverlay";

gsap.registerPlugin(ScrollTrigger);

type AIHackingLayoutProps = {
    children?: React.ReactNode;
};

// ── Incident Timeline nodes (Thematic placeholder) ─────────────────────────────
const TIMELINE = [
    { label: "Recon", threshold: 0.05 },
    { label: "Injections", threshold: 0.35 },
    { label: "Poisoning", threshold: 0.55 },
    { label: "Exfiltration", threshold: 0.75 },
    { label: "Reporting / Aftermath", threshold: 0.95 },
] as const;

const PACKETS = [
    { left: "0%", top: "15%", anim: "packet-h", dur: 14, delay: 0 },
    { left: "0%", top: "40%", anim: "packet-h", dur: 11, delay: 2 },
    { left: "100%", top: "25%", anim: "packet-h-rev", dur: 12, delay: 3 },
    { left: "20%", top: "0%", anim: "packet-v", dur: 13, delay: 1 },
    { left: "80%", top: "0%", anim: "packet-v", dur: 15, delay: 2 },
    { left: "35%", top: "100%", anim: "packet-v-rev", dur: 11, delay: 0 },
    { left: "65%", top: "100%", anim: "packet-v-rev", dur: 12, delay: 2.5 }
];

export const AIHackingLayout: React.FC<AIHackingLayoutProps> = ({ children }) => {
    const router = useRouter();
    const scrollSectionRef = useRef<HTMLDivElement | null>(null);
    const pinnedViewportRef = useRef<HTMLDivElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const workspaceRef = useRef<HTMLDivElement | null>(null);

    const [progress, setProgress] = useState(0);
    const [isAutoScrolling, setIsAutoScrolling] = useState(false);
    const [isRedoHovered, setIsRedoHovered] = useState(false);

    // Outro card opacity — mirrors CareerRoadmap in SOC
    // 0.95–1.0 is the career roadmap card.
    const outroOpacity = progress > 0.95 ? Math.min(1, (progress - 0.95) / 0.05) : 0;

    useEffect(() => {
        if (!scrollSectionRef.current || !pinnedViewportRef.current) return;

        const lenis = new Lenis({ lerp: 0.05, wheelMultiplier: 0.7 });
        lenis.on("scroll", ScrollTrigger.update);
        function update(time: number) { lenis.raf(time * 1000); }
        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                defaults: { ease: "none" },
                scrollTrigger: {
                    trigger: scrollSectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 3,
                    pin: pinnedViewportRef.current,
                    anticipatePin: 1,
                    onUpdate: (self) => setProgress(self.progress)
                }
            });

            // ── Intro Sequence ───────────────────────────────────────────────────
            // Initially, intro is visible, workspace is hidden
            gsap.set(workspaceRef.current, { autoAlpha: 0, scale: 0.95, filter: "blur(10px)" });

            // 0.05: Workspace fades in
            tl.to(workspaceRef.current, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "power3.out" }, 0.05);

            // Simple timeline block for pure scroll mapping to reach the end
            tl.to({}, { duration: 1 });

        }, scrollSectionRef);

        return () => { ctx.revert(); gsap.ticker.remove(update); lenis.destroy(); };
    }, []);

    // ── Auto-scrolling logic (mirrors SOC ScrollytellingLayout) ─────────────
    useEffect(() => {
        if (!isAutoScrolling) return;

        let lastScrollY = window.scrollY;
        let rafId: number;

        const scrollStep = () => {
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - lastScrollY) > 5) {
                setIsAutoScrolling(false);
                return;
            }

            window.scrollBy(0, 2.25); // Smooth automated scroll (speed increased by 50%)
            lastScrollY = window.scrollY;

            if (window.scrollY + window.innerHeight < document.documentElement.scrollHeight - 10) {
                rafId = requestAnimationFrame(scrollStep);
            } else {
                setIsAutoScrolling(false);
            }
        };

        rafId = requestAnimationFrame(scrollStep);
        return () => cancelAnimationFrame(rafId);
    }, [isAutoScrolling]);

    return (
        <section
            ref={scrollSectionRef}
            className="relative h-[2400vh] w-screen bg-[#0a0000]"
            style={{
                // Ensure the *entire* scroll region is the red grid (no `bg-ra-bg` blue bleed-through).
                backgroundImage:
                    "radial-gradient(circle at center, transparent 0%, rgba(60, 5, 5, 0.9) 100%), linear-gradient(to right, rgba(239, 68, 68, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.18) 1px, transparent 1px)",
                backgroundSize: "100% 100%, 40px 40px, 40px 40px",
                backgroundRepeat: "no-repeat, repeat, repeat",
            }}
        >
            <div ref={pinnedViewportRef} className="relative sticky top-0 flex h-screen min-h-[600px] w-screen items-center justify-center overflow-hidden">

                {/* ── Background grid + data packets (Red Theme) ──────────────────────── */}
                <div
                    ref={backgroundRef}
                    className="pointer-events-none absolute inset-0 z-0 bg-[#0a0000]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at center, transparent 0%, rgba(60, 5, 5, 0.9) 100%), linear-gradient(to right, rgba(239, 68, 68, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, 0.18) 1px, transparent 1px)",
                        backgroundSize: "100% 100%, 40px 40px, 40px 40px",
                        backgroundRepeat: "no-repeat, repeat, repeat",
                    }}
                    aria-hidden
                >
                    {PACKETS.map((packet, i) => (
                        <div
                            key={i}
                            className="data-packet"
                            style={{
                                left: packet.left,
                                top: packet.top,
                                animation: `${packet.anim} ${packet.dur}s linear infinite`,
                                animationDelay: `${packet.delay}s`,
                                background: "#ef4444",
                                boxShadow: "0 0 10px rgba(239, 68, 68, 0.8)"
                            }}
                        />
                    ))}
                </div>

                {/* ── Cinematic Dim Overlay ────────────────────────────────────────── */}
                <div 
                    className="pointer-events-none absolute inset-0 z-[5] bg-[#050000] transition-opacity duration-700" 
                    style={{ 
                        opacity: AI_HACKING_PHASES.some(p => progress >= p.startAt && progress <= p.startAt + 0.02) ? 0.75 : 0 
                    }}
                />

                {/* ── Intro Overlay (SOC-matching fonts + controls) ──────────────── */}
                <DataFlightOverlay progress={progress} />
                <AIIntroOverlay
                    progress={progress}
                    isAutoScrolling={isAutoScrolling}
                    onPlay={() => setIsAutoScrolling(true)}
                />

                {/* ── Main Workspace ──────────────────────────────────────────────────── */}
                <div ref={workspaceRef} className="relative z-10 flex h-full w-full max-w-[1600px] flex-col lg:flex-row items-center justify-between px-4 md:px-10 lg:px-16 py-16 gap-8 lg:gap-12">
                    
                    {/* Far Left: Notepad & Scratchcard */}
                    <div className="flex-shrink-0 flex flex-col gap-10 self-start lg:self-center lg:-ml-4 xl:-ml-8 lg:-mt-12">
                        <AIHackingNotepad progress={progress} />
                        <div id="hacking-scratchpad">
                            <AIHackingNotesCard progress={progress} />
                        </div>
                    </div>

                    {/* Right side group: Avatar -> Chat -> Brain */}
                    <div className="flex flex-1 w-full items-center justify-end gap-6 md:gap-8 lg:gap-12 xl:gap-20">
                        <div className="flex-shrink-0">
                            <HackerAvatar progress={progress} />
                        </div>

                        <div id="hacking-chatbox" className="w-full max-w-2xl flex-shrink">
                            <AIChatBox progress={progress} />
                        </div>

                        <div className="flex-shrink-0">
                            <LLMBrain compromised={progress >= AI_LLM_COMPROMISED_AT} />
                        </div>
                    </div>
                    {children}
                </div>

                {/* ── Outro Card (progress >= 0.92) ───────────────────────────────────── */}
                <div
                    className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6"
                    style={{ opacity: outroOpacity }}
                >
                    <div
                        className={`w-[min(560px,92vw)] rounded-2xl px-7 py-6 backdrop-blur-2xl ${
                            outroOpacity > 0.1 ? "pointer-events-auto" : "pointer-events-none"
                        }`}
                        style={{
                            border: "1px solid rgba(239,68,68,0.45)",
                            background: "rgba(10,0,0,0.82)",
                            boxShadow: "0 0 60px rgba(239,68,68,0.2), 0 0 120px rgba(239,68,68,0.08)",
                        }}
                    >
                        <div className="mb-4 flex items-center gap-3">
                            <div
                                className="h-2.5 w-2.5 animate-pulse rounded-full bg-red-500"
                                style={{ boxShadow: "0 0 10px rgba(239,68,68,0.9)" }}
                            />
                            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-400">
                                Breach Complete · What&apos;s Next?
                            </p>
                        </div>

                        <div className="mb-4 flex items-baseline gap-3">
                            <p
                                className="font-mono text-5xl font-black text-red-400"
                                style={{ textShadow: "0 0 30px rgba(239,68,68,0.6)" }}
                            >
                                3 attempts
                            </p>
                            <p className="font-mono text-xs uppercase tracking-widest text-red-900/80">
                                recon → full exfiltration
                            </p>
                        </div>

                        <p className="mb-2 font-sans text-base leading-relaxed text-slate-100">
                            That&apos;s all it took to break the model. Behind every successful attack
                            are five career levels — each building a deeper understanding of how AI systems fail.
                        </p>
                        <p className="mb-6 font-sans text-sm leading-relaxed text-slate-400">
                            Explore exactly what each role does, the tools that top researchers use,
                            and the challenges you can start breaking today.
                        </p>

                        <button
                            type="button"
                            onClick={() => router.push("/roadmaps/ai-hacking/career-path")}
                            className="inline-flex items-center gap-3 rounded-xl px-5 py-3 font-mono text-xs uppercase tracking-widest text-red-300 transition-all hover:text-red-200"
                            style={{
                                border: "1px solid rgba(239,68,68,0.45)",
                                background: "rgba(239,68,68,0.08)",
                            }}
                            onMouseEnter={e => (e.currentTarget.style.background = "rgba(239,68,68,0.18)")}
                            onMouseLeave={e => (e.currentTarget.style.background = "rgba(239,68,68,0.08)")}
                        >
                            Explore the AI Hacking Career Path
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 6h6M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Incident Timeline ──────────────────────────────────────────────── */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 border-t border-red-900/30 bg-black/40 px-8 py-3 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-0">
                        {TIMELINE.map((phase, i) => {
                            const isActive = progress >= phase.threshold;
                            const nextActive = i < TIMELINE.length - 1 && progress >= TIMELINE[i + 1].threshold;
                            return (
                                <React.Fragment key={phase.label}>
                                    <div className="flex flex-col items-center gap-1.5">
                                        <div
                                            className={`h-3 w-3 rounded-full border-2 transition-all duration-500 ${isActive
                                                    ? "border-red-500 bg-red-500"
                                                    : "border-red-950 bg-transparent"
                                                }`}
                                            style={isActive ? { boxShadow: "0 0 10px rgba(239,68,68,0.8)" } : undefined}
                                        />
                                        <p className={`whitespace-nowrap font-mono text-[8px] uppercase tracking-widest transition-colors duration-500 ${isActive ? "text-red-400" : "text-red-900"
                                            }`}>
                                            {phase.label}
                                        </p>
                                    </div>

                                    {i < TIMELINE.length - 1 && (
                                        <div
                                            className="mb-5 mx-3 h-px w-16 transition-all duration-700"
                                            style={{
                                                background: nextActive
                                                    ? "rgba(239,68,68,0.6)"
                                                    : "rgba(69,10,10,0.4)",
                                                boxShadow: nextActive ? "0 0 6px rgba(239,68,68,0.4)" : "none"
                                            }}
                                        />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>

                {/* ── Redo / Rewatch Button ───────────────────────────────────── */}
                <div
                    style={{
                        position: "fixed",
                        bottom: "100px",
                        right: "40px",
                        zIndex: 500,
                        opacity: progress > 0.96 ? 1 : 0,
                        visibility: progress > 0.96 ? "visible" : "hidden",
                        transform: progress > 0.96 ? "scale(1)" : "scale(0.8)",
                        transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    }}
                >
                    <div style={{ position: "relative" }}>
                        <div
                            style={{
                                position: "absolute",
                                right: "110%",
                                top: "50%",
                                transform: "translateY(-50%)",
                                background: "rgba(15,23,42,0.9)",
                                backdropFilter: "blur(8px)",
                                border: "1px solid rgba(255,255,255,0.1)",
                                padding: "8px 16px",
                                borderRadius: "8px",
                                whiteSpace: "nowrap",
                                fontSize: "10px",
                                fontFamily: "var(--font-mono, monospace)",
                                color: "#f87171",
                                letterSpacing: "0.1em",
                                textTransform: "uppercase",
                                opacity: isRedoHovered ? 1 : 0,
                                pointerEvents: "none",
                                transition: "all 0.3s ease",
                            }}
                        >
                            Rewatch the workflow
                        </div>

                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            onMouseEnter={() => setIsRedoHovered(true)}
                            onMouseLeave={() => setIsRedoHovered(false)}
                            style={{
                                width: "56px",
                                height: "56px",
                                borderRadius: "50%",
                                background: "rgba(2,6,23,0.85)",
                                backdropFilter: "blur(12px)",
                                border: "1px solid rgba(239,68,68,0.35)",
                                color: "#f87171",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor: "pointer",
                                boxShadow: "0 0 20px rgba(239,68,68,0.2)",
                                transition: "all 0.3s ease",
                            }}
                        >
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
                                <path d="M21 3v5h-5" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* ── Persistent Play/Pause Toggle ───────────────────────────── */}
                <div
                    className="fixed top-10 right-10 z-[1000] transition-all duration-700"
                    style={{
                        opacity: progress > 0.01 ? 1 : 0,
                        transform: progress > 0.01 ? "translateY(0)" : "translateY(-20px)",
                        pointerEvents: progress > 0.01 ? "auto" : "none",
                    }}
                >
                    <button
                        onClick={() => setIsAutoScrolling(!isAutoScrolling)}
                        className={`group relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 ${
                            isAutoScrolling
                                ? "border-red-500/50 bg-slate-900/80 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                                : "border-white/10 bg-slate-950/40 hover:border-white/30 hover:bg-slate-900/60"
                        } text-white backdrop-blur-md`}
                    >
                        {isAutoScrolling ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                        ) : (
                            <svg
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="ml-0.5"
                            >
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}

                        <div className="absolute right-full mr-4 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 opacity-0 transition-opacity group-hover:opacity-100 border border-white/10 backdrop-blur-sm pointer-events-none">
                            {isAutoScrolling ? "Pause Auto-Player" : "Resume Auto-Player"}
                        </div>
                    </button>
                </div>

                {/* ── Persistent Home Button ─────────────────────────────────── */}
                <div
                    className="fixed top-10 left-10 z-[1000] transition-all duration-700"
                    style={{
                        opacity: progress > 0.01 ? 1 : 0,
                        transform: progress > 0.01 ? "translateY(0)" : "translateY(-20px)",
                        pointerEvents: progress > 0.01 ? "auto" : "none",
                    }}
                >
                    <button
                        onClick={() => router.push("/")}
                        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-slate-950/40 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-110 hover:border-red-400/30 hover:bg-slate-900/60"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>

                        <div className="absolute left-full ml-4 whitespace-nowrap rounded-lg bg-slate-900/90 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-red-400 opacity-0 transition-opacity group-hover:opacity-100 border border-white/10 backdrop-blur-sm pointer-events-none">
                            Return Home
                        </div>
                    </button>
                </div>

            </div>
        </section>
    );
};
