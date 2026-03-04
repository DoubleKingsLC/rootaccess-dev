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
        className="pointer-events-auto w-[min(420px,90vw)] rounded-2xl border border-cyan-500/50 bg-slate-950/60 px-6 py-5 backdrop-blur-2xl holographic-scan"
        role="banner"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300">
          Phase 4 · Soc Growth
        </p>
        <p className="mt-3 font-sans text-sm leading-relaxed text-slate-100">
          You&apos;ve walked through the SOC floor. Now step into the full career
          path and see how the roles connect.
        </p>
        <button
          type="button"
          onClick={() => router.push("/roadmaps/soc/career-path")}
          className="mt-5 inline-flex items-center gap-2 rounded-lg border border-cyan-400/60 bg-slate-950/70 px-4 py-2 font-mono text-xs uppercase tracking-widest text-cyan-300 transition-colors hover:border-cyan-300 hover:text-cyan-200"
        >
          Access Detailed SOC Career Path
        </button>
      </div>
    </div>
  );
};

