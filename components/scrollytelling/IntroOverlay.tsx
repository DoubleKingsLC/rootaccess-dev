"use client";

import React from "react";

type IntroOverlayProps = {
  progress: number;
  onPlay: () => void;
  isAutoScrolling: boolean;
};

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ progress, onPlay, isAutoScrolling }) => {
  const fadeOut = progress >= 0.08;
  const opacity = fadeOut ? Math.max(0, 1 - (progress - 0.08) / 0.02) : 1;

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center border border-white/10 bg-slate-950/40 backdrop-blur-xl"
      style={{
        opacity,
        pointerEvents: progress >= 0.10 ? "none" : "auto"
      }}
      aria-hidden={progress >= 0.10}
    >
      <h1 className="font-sans text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl uppercase">
        SOC PATHWAY
      </h1>
      <p className="mt-6 font-mono text-sm tracking-[0.3em] text-slate-400 md:text-base status-flicker uppercase">
        WORKING OF SOC with An Example Incident
      </p>

      {/* Play / Scroll controls */}
      <div className="mt-12 flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-slate-400 uppercase font-bold">
            Scroll to Begin
          </p>
          <div className="text-slate-400 animate-bounce">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* Separator */}
        <div className="flex items-center gap-6 w-full max-w-[240px]">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-slate-200 font-black">OR</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
        </div>

        <div className="relative flex flex-col items-center gap-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            disabled={isAutoScrolling}
            className={`group relative flex h-20 w-20 items-center justify-center rounded-full border border-white/20 bg-slate-900/60 text-white shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-cyan-500/50 hover:bg-slate-900/80 disabled:opacity-50 disabled:pointer-events-none`}
            style={{
              boxShadow: isAutoScrolling ? "0 0 40px rgba(34,211,238,0.2)" : "0 20px 40px rgba(0,0,0,0.4)"
            }}
          >
            {isAutoScrolling ? (
              <div className="flex gap-1.5">
                <div className="h-5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
                <div className="h-5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <svg className="ml-1 h-8 w-8 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                {/* Subtle outer glow on hover */}
                <div className="absolute inset-0 -m-4 bg-cyan-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}
            
            {/* Animated Ring */}
            {!isAutoScrolling && (
              <div className="absolute -inset-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            )}
          </button>
          
          <div className="flex flex-col items-center gap-1">
            <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.3em] text-white font-black drop-shadow-sm">
              {isAutoScrolling ? "Experience Active" : "Auto-Play Experience"}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-400">
              {isAutoScrolling ? "Guided Mode Enabled" : "Sit Back and Watch"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
