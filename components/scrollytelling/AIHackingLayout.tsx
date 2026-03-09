"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { HackerAvatar } from "./ai-hacking/HackerAvatar";
import { LLMBrain } from "./ai-hacking/LLMBrain";
import { AIChatBox } from "./ai-hacking/AIChatBox";

gsap.registerPlugin(ScrollTrigger);

type AIHackingLayoutProps = {
    children?: React.ReactNode;
};

// ── Incident Timeline nodes (Thematic placeholder) ─────────────────────────────
const TIMELINE = [
    { label: "Recon", threshold: 0.08 },
    { label: "Infiltration", threshold: 0.30 },
    { label: "Exploitation", threshold: 0.57 },
    { label: "Persistence", threshold: 0.78 },
    { label: "Exfiltration", threshold: 0.85 },
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
    const scrollSectionRef = useRef<HTMLDivElement | null>(null);
    const pinnedViewportRef = useRef<HTMLDivElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);
    const introRef = useRef<HTMLDivElement | null>(null);
    const workspaceRef = useRef<HTMLDivElement | null>(null);

    const [progress, setProgress] = useState(0);

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

            // 0.02 - 0.05: Intro text stays for a bit, then fades out and blurs
            tl.to(introRef.current, { autoAlpha: 0, filter: "blur(20px)", scale: 1.1, duration: 0.03, ease: "power2.in" }, 0.02);

            // 0.05: Workspace fades in
            tl.to(workspaceRef.current, { autoAlpha: 1, scale: 1, filter: "blur(0px)", duration: 0.04, ease: "power3.out" }, 0.05);

            // Simple timeline block for pure scroll mapping to reach the end
            tl.to({}, { duration: 1 });

        }, scrollSectionRef);

        return () => { ctx.revert(); gsap.ticker.remove(update); lenis.destroy(); };
    }, []);

    return (
        <section ref={scrollSectionRef} className="relative h-[800vh] w-screen bg-ra-bg">
            <div ref={pinnedViewportRef} className="sticky top-0 flex h-screen min-h-[600px] w-screen items-center justify-center overflow-hidden">

                {/* ── Background grid + data packets (Red Theme) ──────────────────────── */}
                <div
                    ref={backgroundRef}
                    className="pointer-events-none absolute inset-0 z-0 bg-[#0a0000]"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle at center, transparent 0%, rgba(40, 5, 5, 0.95) 100%), linear-gradient(to right, rgba(220, 38, 38, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(220, 38, 38, 0.1) 1px, transparent 1px)",
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

                {/* ── Intro Overlay (0% - 5%) ─────────────────────────────────────────── */}
                <div ref={introRef} className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0000]/60 backdrop-blur-sm px-6">
                    <div className="flex flex-col items-center justify-center text-center">
                        <h1 className="mb-4 font-mono text-3xl md:text-5xl font-bold tracking-tighter text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
                            ROOTACCESS.TECH: AI-HACKING PATHWAY
                        </h1>
                        <p className="mt-4 font-mono text-lg md:text-xl tracking-widest text-red-300">
                            Ever thought how LLMs are hacked?
                        </p>
                    </div>
                </div>

                {/* ── Main Workspace ──────────────────────────────────────────────────── */}
                <div ref={workspaceRef} className="relative z-10 flex h-full w-full max-w-7xl flex-col items-center justify-center px-4 md:px-12 py-16">
                    <div className="flex w-full flex-col items-center justify-between gap-8 md:flex-row md:gap-12 lg:gap-24 h-[90%] md:h-auto">
                        {/* LHS: Hacker Avatar */}
                        <div className="flex-shrink-0 md:order-1 order-1">
                            <HackerAvatar />
                        </div>

                        {/* Center: Chat Window */}
                        <div className="flex-grow w-full max-w-3xl flex justify-center md:order-2 order-3 max-h-full">
                            <AIChatBox />
                        </div>

                        {/* RHS: Target LLM Brain */}
                        <div className="flex-shrink-0 md:order-3 order-2">
                            <LLMBrain />
                        </div>
                    </div>
                    {children}
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

            </div>
        </section>
    );
};
