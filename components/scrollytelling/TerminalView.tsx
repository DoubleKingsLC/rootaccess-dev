"use client";

import React from "react";

type TerminalViewProps = {
  /** 0–1 scroll progress; used to fade in between 0.15 and 0.18 */
  progress: number;
};

/** Full-viewport terminal overlay for L1 portal (0.15–0.30). JetBrains Mono, CRT scanline, L1_Analyst header. */
export const TerminalView: React.FC<TerminalViewProps> = ({ progress }) => {
  const fadeIn = progress <= 0.15 ? 0 : Math.min(1, (progress - 0.15) / 0.05);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-20 flex flex-col bg-slate-950/95 backdrop-blur-sm"
      style={{ opacity: fadeIn }}
      aria-hidden
    >
      {/* Subtle CRT scanline overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.5) 2px, rgba(0,0,0,0.5) 4px)"
        }}
        aria-hidden
      />
      <div className="relative z-0 flex flex-1 flex-col p-6 font-mono text-slate-300">
        <header className="border-b border-slate-600/50 pb-2 text-[11px] tracking-wider text-slate-500">
          Logged in as: L1_Analyst
        </header>
        <div className="mt-4 flex-1 overflow-auto text-sm">
          <div className="text-emerald-400/90">$</div>
        </div>
      </div>
    </div>
  );
};
