"use client";

import React from "react";

type IntroOverlayProps = {
  progress: number;
};

export const IntroOverlay: React.FC<IntroOverlayProps> = ({ progress }) => {
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
      <h1 className="font-sans text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
        ROOTACCESS.TECH: SOC PATHWAY
      </h1>
      <p className="mt-6 font-mono text-sm tracking-[0.3em] text-slate-400 md:text-base status-flicker uppercase">
        INITIALIZING SEC-OPS PROTOCOLS...
      </p>

      {/* Scroll hint */}
      <div className="mt-10 flex flex-col items-center gap-4">
        <p className="font-mono text-lg md:text-xl tracking-[0.4em] text-slate-100 uppercase font-bold">
          Scroll to Begin
        </p>
        <div className="mt-2 text-cyan-400 animate-bounce">
          <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};
