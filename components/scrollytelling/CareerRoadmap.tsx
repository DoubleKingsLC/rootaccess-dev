"use client";

import React from "react";
import { useRouter } from "next/navigation";

type CareerRoadmapProps = {
  opacity: number;
};

export const CareerRoadmap: React.FC<CareerRoadmapProps> = ({ opacity }) => {
  const router = useRouter();

  return (
    <div
      className="pointer-events-none flex h-full w-full items-center justify-center font-sans"
      style={{ opacity }}
    >
      <div
        className="pointer-events-auto w-[min(540px,92vw)] rounded-2xl border border-sky-500/20 bg-slate-950/10 px-8 py-10 backdrop-blur-3xl shadow-[0_0_80px_rgba(14,165,233,0.05)] text-center relative overflow-hidden"
        role="banner"
      >
        {/* Subtle holographic scanline */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(14,165,233,0.03)_1px,transparent_1px)] bg-[size:100%_4px] opacity-20" />

        {/* 15m Incident Status Badge */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-lg border border-sky-400/30 bg-sky-950/40 px-3 py-1 shadow-[0_0_12px_rgba(34,211,238,0.3)]">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
              INCIDENT STATUS: 15m MTTC
            </span>
          </div>
        </div>

        <h2 className="mb-4 font-sans text-3xl md:text-4xl font-semibold tracking-wide text-white uppercase leading-tight">
          Ever wondered where to start?
        </h2>

        <p className="mb-8 text-base md:text-lg leading-relaxed text-slate-300 font-medium px-4">
          Behind every expert response is a structured journey.
          Go through the roadmap we&apos;ve created to follow the path from entry-level to SOC Lead.
        </p>

        <button
          type="button"
          onClick={() => router.push("/roadmaps/soc/career-path")}
          className="group relative inline-flex items-center gap-4 rounded-xl border border-sky-500/40 bg-sky-500/10 px-8 py-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-sky-300 transition-all hover:border-sky-300 hover:bg-sky-500/20 hover:shadow-[0_0_30px_rgba(14,165,233,0.2)]"
        >
          GO THROUGH THE ROADMAP -&gt;
        </button>
      </div>
    </div>
  );
};
