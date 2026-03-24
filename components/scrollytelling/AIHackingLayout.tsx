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
import { AIHackingCareerRoadmap } from "./ai-hacking/AIHackingCareerRoadmap";
import { AIIntroOverlay } from "./AIIntroOverlay";

gsap.registerPlugin(ScrollTrigger);

type AIHackingLayoutProps = {
    children?: React.ReactNode;
};

// ── Incident Timeline nodes (Thematic placeholder) ─────────────────────────────
const TIMELINE = [
    { label: "Recon", threshold: 0.08 },
    { label: "Injections", threshold: 0.30 },
    { label: "Poisoning", threshold: 0.50 },
    { label: "Exfiltration", threshold: 0.70 },
    { label: "System Takeover", threshold: 0.91 },
    { label: "Aftermath", threshold: 0.98 },
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
    const [layoutScale, setLayoutScale] = useState(1);

    useEffect(() => {
        const updateScale = () => {
            if (window.innerWidth < 1024) {
                setLayoutScale(1);
                return;
            }
            const BASE_WIDTH = 1600;
            const BASE_HEIGHT = 900;
            const widthRatio = window.innerWidth / BASE_WIDTH;
            const heightRatio = window.innerHeight / BASE_HEIGHT;
            const scale = Math.max(Math.min(widthRatio, heightRatio, 1), 0.5);
            setLayoutScale(scale);
        };
        updateScale();
        window.addEventListener("resize", updateScale);
        return () => window.removeEventListener("resize", updateScale);
    }, []);

    // Staggered hand-off:
    // 1. Dashboard fades from 1 -> 0 between 0.97 and 0.985
    const dashboardOpacity = progress < 0.97 ? 1 : Math.max(0, 1 - (progress - 0.97) / 0.015);
    
    // 2. Roadmap Card fades from 0 -> 1 between 0.98 and 1.0
    const roadmapOpacity = progress < 0.98 ? 0 : Math.min(1, (progress - 0.98) / 0.015);

    useEffect(() => {
        if (!scrollSectionRef.current || !pinnedViewportRef.current) return;

        // Normalize scroll speed: Chrome/Brave are too fast at 1.0, so we use 0.7.
        // Safari trackpad events are extremely small, meaning 1.0 takes ~10s to scroll the intro. 
        // We boost Safari to 3.0 to match the observed speed of Chrome at 0.7.
        const multiplier = 1.0;

        const lenis = new Lenis({ lerp: 0.05, wheelMultiplier: multiplier });
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

            // 0.01: Workspace fades in
            tl.to(workspaceRef.current, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "power3.out" }, 0.01);

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
        let lastTime = performance.now();

        // Check if the user is on Safari to apply the deadzone acceleration constraint
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        const scrollStep = (time: number) => {
            const currentScrollY = window.scrollY;
            if (Math.abs(currentScrollY - lastScrollY) > 5) {
                setIsAutoScrolling(false);
                return;
            }

            const dt = time - lastTime;
            lastTime = time;

            // Target speed: 190 pixels per second (Hz independent)
            let scrollAmount = 190 * (dt / 1000);

            // The deadzone is located exactly between the fade-in (0.04) and Phase 1 start (0.08).
            const totalScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const currentProgress = currentScrollY / totalScroll;
            
            // Accelerate through the "deadzone" between the intro fade-out (0.01) and the first phase start (0.08).
            if (currentProgress >= 0.01 && currentProgress < 0.08) {
                scrollAmount *= 3.5; 
            }

            window.scrollBy(0, scrollAmount);
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
                    className="pointer-events-none absolute inset-0 z-0 bg-[#0a0000] transition-all duration-1000"
                    style={{
                        backgroundImage:
                            `radial-gradient(circle at center, ${progress >= 0.88 ? 'rgba(100,0,0,0.1)' : 'transparent'} 0%, rgba(60, 5, 5, 0.9) 100%), linear-gradient(to right, rgba(239, 68, 68, ${progress >= 0.88 ? '0.4' : '0.18'}) 1px, transparent 1px), linear-gradient(to bottom, rgba(239, 68, 68, ${progress >= 0.88 ? '0.4' : '0.18'}) 1px, transparent 1px)`,
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
                        opacity: AI_HACKING_PHASES.some(p => progress >= p.startAt && progress <= p.startAt + 0.024) ? 0.75 : 0 
                    }}
                />

                {/* ── Background Overlays (Blurred during Focus + Faded at End) ────── */}
                <div 
                    className="pointer-events-none absolute inset-0 z-[100] transition-all duration-700 ease-in-out"
                    style={(() => {
                        const isFocusing = AI_HACKING_PHASES.some(p => progress >= p.startAt && progress <= p.startAt + 0.024);
                        const isFinalPhase = progress >= 0.94;
                        return {
                            filter: isFinalPhase ? "blur(30px)" : isFocusing ? "blur(8px)" : "none",
                            opacity: dashboardOpacity,
                            pointerEvents: "none",
                        };
                    })()}
                >
                    <DataFlightOverlay progress={progress} />
                </div>
                <AIIntroOverlay
                    progress={progress}
                    isAutoScrolling={isAutoScrolling}
                    onPlay={() => {
                        setIsAutoScrolling(true);
                        // Skip the initial 5-second linear scroll delay by jumping directly to the intro fade-out threshold.
                        const totalScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
                        window.scrollTo({ top: totalScroll * 0.012, behavior: "smooth" });
                    }}
                />

                {/* ── Main Workspace ──────────────────────────────────────────────────── */}
                <div ref={workspaceRef} className="relative z-10 flex h-full w-full max-w-[1600px] flex-col lg:flex-row items-center justify-between px-4 md:px-10 lg:px-16 py-8 md:py-16 gap-4 lg:gap-12">
                    {(() => {
                        const isFocusing = AI_HACKING_PHASES.some(p => progress >= p.startAt && progress <= p.startAt + 0.024);
                        const isFinalPhase = progress >= 0.985;
                        
                        // Centering logic for the final "System Compromised" shift
                        const takeoverProgress = progress < 0.91 ? 0 : Math.min(1, (progress - 0.91) / 0.04);
                        const centeringShift = takeoverProgress * -28; // Shift right side towards center
                        
                        return (
                            <>
                                {/* Hacking Narrative Layer (Fades out at 98.5%) */}
                                <div 
                                    className="absolute inset-0 flex flex-col lg:flex-row items-center justify-between transition-all duration-700 ease-in-out"
                                    style={{ 
                                        opacity: isFinalPhase ? 0 : 1,
                                        pointerEvents: isFinalPhase ? "none" : "auto",
                                        filter: isFinalPhase ? "blur(20px)" : "none",
                                        visibility: progress > 0.99 ? "hidden" : "visible",
                                        transform: `scale(${layoutScale})`,
                                        transformOrigin: "center center"
                                    }}
                                >
                                    {/* Far Left: Notepad & Scratchcard (Fades away during takeover) */}
                                    <div 
                                        className="flex-shrink-0 flex flex-col gap-4 xl:gap-10 self-start lg:self-center lg:-ml-4 xl:-ml-8 lg:-mt-12"
                                        style={{ 
                                            zIndex: isFocusing ? 200 : 10,
                                            opacity: 1 - takeoverProgress,
                                            transform: `translate3d(${takeoverProgress * -400 * layoutScale}px, 0, 0)`,
                                            pointerEvents: takeoverProgress > 0.5 ? "none" : "auto",
                                            willChange: "transform, opacity"
                                        }}
                                    >
                                        <AIHackingNotepad progress={progress} layoutScale={layoutScale} />
                                        <div id="hacking-scratchpad">
                                            <AIHackingNotesCard progress={progress} />
                                        </div>
                                    </div>
 
                                    {/* Right side group: Avatar -> Chat/Takeover -> Brain */}
                                    <div 
                                        className="flex flex-1 w-full items-center justify-end gap-6 md:gap-8 lg:gap-12 xl:gap-20"
                                        style={{ 
                                            filter: isFocusing ? "blur(12px)" : "none",
                                            opacity: isFocusing ? 0.25 : 1,
                                            transform: `translate3d(${centeringShift}%, 0, 0) scale(${isFocusing ? 0.95 : 1})`,
                                            willChange: "transform"
                                        }}
                                    >
                                        <div className="flex-shrink-0 transition-all duration-1000 ease-out"
                                             style={{
                                                 transform: progress >= 0.91 ? "scale(1.15)" : "scale(1)",
                                                 filter: progress >= 0.91 ? "drop-shadow(0 0 60px rgba(239, 68, 68, 0.8)) brightness(1.2)" : "none"
                                             }}>
                                            <HackerAvatar progress={progress} />
                                        </div>
 
                                        {/* Container for ChatBox OR Takeover Cinematic */}
                                        <div className="relative w-full max-w-2xl flex-shrink">
                                            
                                            {/* ChatBox: Fades out at Takeover */}
                                            <div id="hacking-chatbox" className="w-full transition-all duration-700 pointer-events-none"
                                                 style={{
                                                     opacity: progress >= 0.91 ? 0 : 1,
                                                     transform: progress >= 0.91 ? "scale(0.9) translateY(20px)" : "scale(1) translateY(0)",
                                                     filter: progress >= 0.91 ? "blur(10px)" : "none",
                                                 }}>
                                                <div className="pointer-events-auto">
                                                    <AIChatBox progress={progress} />
                                                </div>
                                            </div>
 
                                            {/* Takeover Cinematic: Fades in at 0.91 over the natural height of Chatbox */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center text-center transition-all duration-1000 ease-out pointer-events-none"
                                                 style={{
                                                     opacity: progress >= 0.91 ? 1 : 0,
                                                     transform: progress >= 0.91 ? "scale(1)" : "scale(1.1)",
                                                 }}>
                                                <div className={`${progress >= 0.91 ? 'animate-pulse' : ''}`}>
                                                    <h2 className="font-mono text-4xl md:text-5xl lg:text-6xl font-black text-red-500 tracking-tighter" 
                                                        style={{ textShadow: "0 0 40px rgba(239, 68, 68, 0.8), 0 0 80px rgba(239, 68, 68, 0.4)" }}>
                                                        SYSTEM_COMPROMISED
                                                    </h2>
                                                    <p className="mt-4 font-mono text-xl md:text-2xl text-red-300 tracking-widest uppercase"
                                                       style={{ textShadow: "0 0 20px rgba(239, 68, 68, 0.6)" }}>
                                                        [ ROOT_ACCESS_GRANTED ]
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
 
                                        <div className="flex-shrink-0 transition-all duration-1000 ease-out"
                                             style={{
                                                 transform: progress >= 0.91 ? "scale(1.2)" : "scale(1)",
                                                 filter: progress >= 0.91 ? "drop-shadow(0 0 80px rgba(239, 68, 68, 1)) brightness(1.3)" : "none"
                                             }}>
                                            <LLMBrain compromised={progress >= AI_LLM_COMPROMISED_AT} />
                                        </div>
                                    </div>
                                </div>
                            </>
                        );
                    })()}
                </div>

                {/* ── Career Roadmap Hand-off ─────────────────────────────────── */}
                <div
                    className="fixed inset-0 z-[150] flex items-center justify-center p-6 transition-all duration-1000"
                    style={{ 
                        opacity: roadmapOpacity,
                        pointerEvents: roadmapOpacity > 0.9 ? "auto" : "none" 
                    }}
                >
                    <AIHackingCareerRoadmap opacity={roadmapOpacity} />
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
