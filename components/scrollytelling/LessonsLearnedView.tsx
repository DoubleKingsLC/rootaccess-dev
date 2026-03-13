"use client";

import React from "react";

type LessonsLearnedViewProps = {
  opacity: number;
};

/** Behind-view manager at boardroom table; 1.5x presentation screen with Cloud, Playbook, Monitoring as glowing nodes */
export const LessonsLearnedView: React.FC<LessonsLearnedViewProps> = ({
  opacity
}) => {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/40 backdrop-blur-xl"
      style={{ opacity }}
      aria-hidden
    >
      <p className="font-mono absolute left-1/2 top-8 -translate-x-1/2 text-[11px] font-medium uppercase tracking-[0.4em] text-slate-400">
        LESSONS LEARNT
      </p>

      {/* Manager silhouette (back-view) + boardroom table */}
      <div className="relative mt-12 flex flex-col items-center">
        {/* Presentation screen – 1.5x scale (e.g. 360px wide) */}
        <div
          className="flex h-[min(360px,52vh)] w-[min(540px,88vw)] flex-col items-center justify-center rounded-xl border border-cyan-400/50 bg-slate-950/80 shadow-[0_0_32px_rgba(34,211,238,0.3)]"
        >
          <div className="flex gap-8">
            {/* Cloud – glowing status node */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-cyan-400/60 bg-slate-900/90 shadow-[0_0_20px_rgba(34,211,238,0.5)]">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none" className="text-cyan-300">
                  <path
                    d="M6 13h8a3 3 0 0 0 0-6 3.5 3.5 0 0 0-6.8-1.1A3 3 0 0 0 6 13Z"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Cloud</span>
            </div>
            {/* Playbook */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-emerald-400/60 bg-slate-900/90 shadow-[0_0_20px_rgba(52,211,153,0.4)]">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none" className="text-emerald-300">
                  <rect x="3" y="4" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M7 7h4M7 10h3M7 13h2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Playbook</span>
            </div>
            {/* Monitoring */}
            <div className="flex flex-col items-center gap-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-amber-400/60 bg-slate-900/90 shadow-[0_0_20px_rgba(251,191,36,0.4)]">
                <svg width="28" height="28" viewBox="0 0 20 20" fill="none" className="text-amber-300">
                  <circle cx="10" cy="10" r="5" stroke="currentColor" strokeWidth="1.4" />
                  <path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Monitoring</span>
            </div>
          </div>
        </div>

        {/* Table bar */}
        <div className="mt-6 h-2 w-64 rounded-full bg-slate-700/80" />

        {/* Manager silhouette: head + shoulders (from behind) */}
        <div className="mt-2 flex flex-col items-center">
          <div className="h-10 w-10 rounded-full bg-[#0f172a]" />
          <div className="mt-0 h-2 w-16 rounded-sm bg-[#0f172a]" />
        </div>
      </div>
    </div>
  );
};
