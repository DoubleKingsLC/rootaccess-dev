"use client";

import React from "react";

type WebHackingIntroOverlayProps = {
  progress: number;
  onPlay: () => void;
  isAutoScrolling: boolean;
};

// Mirrors AIIntroOverlay structure — themed rose/red for Web Hacking.
export const WebHackingIntroOverlay: React.FC<WebHackingIntroOverlayProps> = ({
  progress,
  onPlay,
  isAutoScrolling,
}) => {
  const fadeOut = progress >= 0.02;
  const opacity = fadeOut ? Math.max(0, 1 - (progress - 0.02) / 0.02) : 1;

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center border border-rose-400/10 bg-rose-950/40 backdrop-blur-xl"
      style={{
        opacity,
        pointerEvents: progress >= 0.05 ? "none" : "auto",
      }}
      aria-hidden={progress >= 0.07}
    >
      {/* Eyebrow */}
      <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.45em]" style={{ color: "rgba(251,113,133,0.6)" }}>
        Web Hacking
      </p>

      <h1 className="font-sans text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl uppercase">
        WEB HACKING
      </h1>
      <div className="mt-5 flex flex-col items-center gap-4 text-center">
        <p className="font-mono text-sm tracking-[0.3em] text-slate-300 md:text-base uppercase">
          Breaking apps. Understanding the web.
        </p>
        <p className="max-w-3xl px-4 font-sans text-sm md:text-base leading-relaxed tracking-wide text-rose-100/90 drop-shadow-sm">
          Follow along as we explore a web hacking scenario, a SQL Injection flaw in a real web application.
        </p>
      </div>

      {/* Scroll + autoplay controls */}
      <div className="mt-12 flex flex-col items-center gap-8">
        {/* Scroll CTA */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-[10px] md:text-xs tracking-[0.4em] text-slate-300 uppercase font-bold text-center">
            Scroll to Begin
          </p>
          <div className="text-slate-300 animate-scroll-indicator">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* OR separator */}
        <div className="flex items-center gap-6 w-full max-w-[240px]">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] text-rose-100 font-black">OR</span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
        </div>

        {/* Play button */}
        <div className="relative flex flex-col items-center gap-5">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            disabled={isAutoScrolling}
            className="group relative flex h-20 w-20 items-center justify-center rounded-full border border-rose-300/30 bg-rose-950/60 text-white shadow-2xl backdrop-blur-md transition-all duration-500 hover:scale-110 hover:border-rose-400/60 hover:bg-rose-950/80 disabled:opacity-50 disabled:pointer-events-none"
            style={{
              boxShadow: isAutoScrolling
                ? "0 0 40px rgba(244,63,94,0.25)"
                : "0 20px 40px rgba(0,0,0,0.4)",
            }}
          >
            {isAutoScrolling ? (
              <div className="flex gap-1.5">
                <div className="h-5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                <div className="h-5 w-1.5 rounded-full bg-rose-400 animate-pulse" style={{ animationDelay: "0.15s" }} />
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                <svg className="ml-1 h-8 w-8 transition-transform group-hover:scale-110" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <div className="absolute inset-0 -m-4 bg-rose-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )}

            {/* Animated ring on hover */}
            {!isAutoScrolling && (
              <div className="absolute -inset-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-ping" />
            )}
          </button>

          <div className="flex flex-col items-center gap-1">
            <span className="font-sans text-[11px] md:text-xs uppercase tracking-[0.3em] text-white font-black drop-shadow-sm">
              {isAutoScrolling ? "Experience Active" : "Auto-Play Experience"}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-300">
              {isAutoScrolling ? "Guided Mode Enabled" : "Sit Back and Watch"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
