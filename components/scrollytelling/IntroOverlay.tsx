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
      <h1 className="font-sans text-2xl font-semibold tracking-wide text-white md:text-3xl">
        ROOTACCESS.TECH: SOC PATHWAY
      </h1>
      <p className="mt-4 font-mono text-[10px] tracking-widest text-slate-400 status-flicker">
        INITIALIZING SEC-OPS PROTOCOLS...
      </p>
    </div>
  );
};
