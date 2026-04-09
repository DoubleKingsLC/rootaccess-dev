"use client";

import React from "react";

interface GRCBriefingCardProps {
  phaseNumber: number;
  title: string;
  description: string;
  opacity: number;
}

/**
 * GRC Briefing Card
 * Used to explicitly declare narrative context before a visual simulator loads.
 */
export const GRCBriefingCard: React.FC<GRCBriefingCardProps> = ({ 
  phaseNumber, 
  title, 
  description, 
  opacity 
}) => {
  // Always mount — avoid unmounting at ~0 opacity, which removed the backdrop in one frame before the scene finished fading in (visible "blank" flash).
  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center p-4 md:p-8 pointer-events-none bg-black/60 backdrop-blur-xl"
      style={{ opacity }}
      aria-hidden={opacity < 0.02}
    >
      <div 
        className="relative w-full max-w-[min(700px,94vw)] overflow-hidden rounded-3xl border border-teal-500/30 bg-[#0a0e14]/95 p-6 shadow-[0_0_80px_rgba(20,184,166,0.15)] ring-1 ring-white/10 sm:p-8 md:p-12"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -z-10" />
        
        <div className="flex items-center gap-4 mb-8">
          <div className="flex gap-2">
             <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
             <div className="w-2 h-2 rounded-full bg-slate-700" />
             <div className="w-2 h-2 rounded-full bg-slate-700" />
          </div>
          <span className="font-mono text-xs md:text-sm uppercase tracking-[0.3em] text-teal-500 font-bold">Phase {phaseNumber}</span>
        </div>
        
        <h3 className="mb-5 text-3xl font-black uppercase leading-[1.1] tracking-tight text-white sm:text-4xl md:mb-6 md:text-6xl">
          {title}
        </h3>
        
        <div className="h-1 w-24 bg-teal-500/40 mb-8 rounded-full" />
        
        <p className="text-base font-medium leading-relaxed text-slate-300 sm:text-lg md:text-xl">
          {description}
        </p>
        
        <div className="mt-10 flex justify-end">
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-slate-400 border border-slate-700/50 px-4 py-2 rounded-lg bg-white/5">
            Initialising Environment...
          </span>
        </div>
      </div>
    </div>
  );
};
