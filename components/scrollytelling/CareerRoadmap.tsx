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
      className="pointer-events-none flex h-full w-full items-center justify-center"
      style={{ opacity }}
    >
      <div
        className="pointer-events-auto w-[min(540px,92vw)] rounded-2xl border border-cyan-500/40 bg-slate-950/70 px-7 py-6 backdrop-blur-2xl holographic-scan"
        role="banner"
      >
        {/* Emerald glow header */}
        <div className="mb-4 flex items-center gap-3">
          <div
            className="h-2.5 w-2.5 rounded-full bg-emerald-400"
            style={{ boxShadow: "0 0 10px rgba(52,211,153,0.9)" }}
          />
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-emerald-400">
            Incident Closed · What&apos;s Next?
          </p>
        </div>

        {/* Big stat */}
        <div className="mb-4 flex items-baseline gap-3">
          <p
            className="font-mono text-5xl font-black text-emerald-400"
            style={{ textShadow: "0 0 30px rgba(52,211,153,0.6)" }}
          >
            15m
          </p>
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            detection → containment
          </p>
        </div>

        <p className="mb-2 font-sans text-base leading-relaxed text-slate-100">
          That&apos;s how long it took this team. Behind every response are five career levels —
          each one a different set of skills, tools, and responsibility.
        </p>
        <p className="mb-6 font-sans text-sm leading-relaxed text-slate-400">
          Explore exactly what each role does, what certifications open each door,
          and the labs you can start today.
        </p>

        <button
          type="button"
          onClick={() => router.push("/roadmaps/soc/career-path")}
          className="inline-flex items-center gap-3 rounded-xl border border-cyan-400/50 bg-slate-950/60 px-5 py-3 font-mono text-xs uppercase tracking-widest text-cyan-300 transition-all hover:border-cyan-300 hover:bg-cyan-950/30 hover:text-cyan-200"
        >
          Explore the SOC Career Path
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M3 6h6M6 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
};
