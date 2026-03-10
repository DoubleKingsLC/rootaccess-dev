"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const SOCMobileExperience: React.FC = () => {
    const router = useRouter();
    const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");

    useEffect(() => {
        const checkOrientation = () => {
            if (typeof window !== "undefined") {
                setOrientation(window.innerHeight > window.innerWidth ? "portrait" : "landscape");
            }
        };

        checkOrientation();
        window.addEventListener("resize", checkOrientation);
        return () => window.removeEventListener("resize", checkOrientation);
    }, []);

    return (
        <div className="relative h-screen w-full bg-slate-950 flex items-center justify-center overflow-hidden">
            {/* ── Orientation Blocker ── */}
            {orientation === "portrait" && (
                <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 px-8 text-center">
                    <div className="mb-6 flex flex-col items-center gap-4">
                        <div className="flex h-20 w-12 items-center justify-center rounded-2xl border border-slate-700 bg-slate-900/80 shadow-[0_0_40px_rgba(15,23,42,0.9)]">
                            <div className="h-14 w-8 rounded-xl border border-slate-600/70 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.4),_transparent_60%),linear-gradient(to_bottom,_#020617,_#020617)] flex items-center justify-center">
                                <svg
                                    className="h-6 w-6 text-cyan-400 animate-bounce"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <rect x="4" y="8" width="16" height="8" rx="2" stroke="currentColor" strokeWidth="1.5" />
                                    <path d="M9 16L7 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                    <path d="M15 8L17 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                            </div>
                        </div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-cyan-400">
                            Rotate Your Device
                        </p>
                    </div>
                </div>
            )}

            {/* ── World Grid Background ── */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(to right, rgba(34, 211, 238, 0.15) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(34, 211, 238, 0.15) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
            </div>

            {/* ── Tactical Gateway Container ── */}
            <div className="relative z-10 w-full max-w-lg px-8">
                <div className="p-8 md:p-12 rounded-3xl border border-sky-500/20 bg-slate-950/10 backdrop-blur-2xl shadow-[0_0_80px_rgba(14,165,233,0.1)] text-center space-y-8 holographic-scan">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-500/30 bg-sky-500/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400">Tactical Status</span>
                        </div>
                        <h1 className="font-sans text-2xl md:text-3xl font-black text-white tracking-tight leading-tight uppercase">
                            Tactical Workflow Simulator:<br />
                            <span className="text-sky-400">Mobile Access Pending</span>
                        </h1>
                    </div>

                    <div className="space-y-4 text-slate-400">
                        <p className="text-sm md:text-base leading-relaxed">
                            The high-fidelity &lsquo;Day in the Life&rsquo; SOC simulation is currently optimized for desktop workstations.
                        </p>
                        <p className="text-xs font-medium border-l-2 border-sky-500/30 pl-4 py-1 italic">
                            To experience the full interactive scrollytelling, please log in via a Laptop or PC.
                        </p>
                    </div>

                    <div className="pt-4">
                        <button
                            onClick={() => router.push("/roadmaps/soc/career-path")}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl border border-sky-500/30 bg-sky-500/10 transition-all hover:bg-sky-500/20 hover:border-sky-400/50 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]"
                        >
                            <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-sky-300">
                                Access Career Pathway
                            </span>
                            <svg className="w-4 h-4 text-sky-400 transform transition-transform group-hover:translateX-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </button>
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
                    background: linear-gradient(0deg, transparent 45%, rgba(14, 165, 233, 0.05) 50%, transparent 55%);
                    background-size: 100% 20px;
                    animation: scan 6s linear infinite;
                    pointer-events: none;
                }
                @keyframes scan {
                    from { transform: translateY(-100%); }
                    to { transform: translateY(100%); }
                }
            `}</style>
        </div>
    );
};
