"use client";

import React from "react";

interface NarrativeCaptionProps {
  opacity: number;
  children: React.ReactNode;
}

export const NarrativeCaption: React.FC<NarrativeCaptionProps> = ({ opacity, children }) => {
  return (
    <div
      className="pointer-events-none absolute bottom-[60px] md:bottom-[72px] left-1/2 z-[35] -translate-x-1/2 w-full max-w-[92vw] sm:max-w-[85vw] md:max-w-2xl lg:max-w-4xl flex justify-center"
      style={{ opacity }}
      aria-hidden
    >
      <div className="rounded-2xl border border-white/10 bg-slate-950/90 px-5 py-3 md:px-8 md:py-4 backdrop-blur-xl shadow-2xl inline-block max-w-full">
        <p className="font-mono text-[13px] sm:text-sm md:text-base font-bold tracking-tight text-white text-center leading-relaxed md:leading-relaxed">
          {children}
        </p>
      </div>
    </div>
  );
};
