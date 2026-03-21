"use client";

import React from "react";
import { useRouter } from "next/navigation";

type AIHackingCareerRoadmapProps = {
  opacity: number;
};

export const AIHackingCareerRoadmap: React.FC<AIHackingCareerRoadmapProps> = ({ opacity }) => {
  const router = useRouter();

  return (
    <div
      className="pointer-events-none flex h-full w-full items-center justify-center font-sans transition-all duration-700"
      style={{ 
          opacity, 
          transform: `scale(${0.9 + opacity * 0.1}) translateY(${20 - opacity * 20}px)`,
          filter: `blur(${(1 - opacity) * 20}px)`
      }}
    >
      <div
        className={`w-[min(580px,94vw)] rounded-3xl border border-red-500/30 bg-black/80 px-6 py-8 md:px-10 md:py-12 backdrop-blur-3xl shadow-[0_0_80px_rgba(239,68,68,0.15)] text-center relative overflow-hidden transition-all duration-300 ${
          opacity > 0.1 ? "pointer-events-auto" : "pointer-events-none"
        }`}
        role="banner"
      >
        {/* Subtle red holographic scanline */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(239,68,68,0.05)_1px,transparent_1px)] bg-[size:100%_4px] opacity-30" />
        
        {/* Core Glow Background */}
        <div className="absolute -inset-24 bg-red-500/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Breach Status Badge */}
        <div className="mb-6 md:mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-red-400/40 bg-red-950/60 px-4 py-1.5 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
            <span className="h-2 w-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_rgba(239,68,68,1)]" />
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.25em] text-red-100">
              BREACH STATUS: 100% EXFILTRATED
            </span>
          </div>
        </div>

        <h2 className="mb-5 font-sans text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none"
            style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}>
          MISSION <span className="text-red-500">ACCOMPLISHED</span>
        </h2>

        <p className="mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-slate-300 font-medium px-2 md:px-6">
          Behind every line of code is a vulnerability. 
          You've seen the exploit — now master the defense. 
          Explore the professional path from Researcher to Lead security Architect.
        </p>

        <div className="flex flex-col items-center gap-6">
            <button
              type="button"
              onClick={() => router.push("/roadmaps/ai-hacking/career-path")}
              className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-red-500/50 bg-red-500/10 px-8 py-5 font-mono text-sm font-black uppercase tracking-[0.3em] text-red-400 transition-all hover:border-red-400 hover:bg-red-500/20 hover:text-white hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                GO THROUGH THE ROADMAP
                <svg className="transition-transform group-hover:translate-x-1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            </button>
            
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-red-900/60 font-bold">
              [ SECURE CONNECTION ESTABLISHED ]
            </p>
        </div>
      </div>
    </div>
  );
};
