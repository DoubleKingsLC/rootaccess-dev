"use client";

import React from "react";

const TEAL = "#14b8a6";

type GRCIntroOverlayProps = {
  progress: number;
  onPlay: () => void;
  isAutoScrolling: boolean;
};

export const GRCIntroOverlay: React.FC<GRCIntroOverlayProps> = ({
  progress,
  onPlay,
  isAutoScrolling,
}) => {
  const fadeOut = progress >= 0.01;
  const opacity = fadeOut ? Math.max(0, 1 - (progress - 0.01) / 0.02) : 1;

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center"
      style={{
        opacity,
        pointerEvents: progress >= 0.04 ? "none" : "auto",
        background: "rgba(2,15,18,0.55)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(20,184,166,0.08)",
      }}
      aria-hidden={progress >= 0.05}
    >
      {/* Eyebrow */}
      <p
        className="mb-4 font-mono text-[10px] uppercase tracking-[0.45em]"
        style={{ color: "rgba(20,184,166,0.55)" }}
      >
        GRC
      </p>

      {/* Title */}
      <h1
        className="text-center font-sans text-3xl font-bold uppercase tracking-tight text-white sm:text-4xl md:text-6xl lg:text-7xl"
        style={{ textShadow: "0 0 60px rgba(20,184,166,0.18)" }}
      >
        A Day In The Life:<br/>
        <span className="text-teal-400">GRC Analyst</span>
      </h1>

      {/* Subtitle & Description */}
      <div className="mt-6 flex flex-col items-center gap-3 text-center md:mt-8 md:gap-4">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-slate-300 md:text-base md:tracking-[0.3em]">
          The Silent Guardian of Innovation.
        </p>
        <p className="max-w-3xl px-4 font-sans text-xs leading-relaxed tracking-wide text-teal-100/90 drop-shadow-sm sm:text-sm md:text-base">
          Join us on a journey through the life of a GRC analyst—ensuring that the wheels of 
          development keep turning smoothly while adhering to the highest standards of safety and risk mitigation.
        </p>
      </div>

      <div className="h-6 md:h-10" />

      {/* Scroll + autoplay controls */}
      <div className="flex flex-col items-center gap-6 md:gap-8">
        {/* Scroll CTA */}
        <div className="flex flex-col items-center gap-3">
          <p
            className="font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase font-bold"
            style={{ color: "rgba(148,163,184,0.7)" }}
          >
            Scroll to Begin
          </p>
          <div className="animate-scroll-indicator" style={{ color: "rgba(20,184,166,0.6)" }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* OR separator */}
        <div className="flex items-center gap-6 w-full max-w-[240px]">
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(to right, transparent, rgba(20,184,166,0.4), transparent)" }}
          />
          <span
            className="font-mono text-[10px] uppercase tracking-[0.5em] font-black"
            style={{ color: "rgba(20,184,166,0.7)" }}
          >
            OR
          </span>
          <div
            className="h-px flex-1"
            style={{ background: "linear-gradient(to right, transparent, rgba(20,184,166,0.4), transparent)" }}
          />
        </div>

        {/* Play button */}
        <div className="relative flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPlay();
            }}
            disabled={isAutoScrolling}
            className="scrolly-control-btn group relative flex h-16 w-16 shrink-0 items-center justify-center overflow-visible rounded-full text-white shadow-none outline-none transition-all duration-300 hover:scale-105 md:h-20 md:w-20 focus-visible:ring-2 focus-visible:ring-teal-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[rgb(2,15,18)] disabled:pointer-events-none disabled:opacity-50"
            style={{
              border: "1px solid rgba(20,184,166,0.3)",
              background: "rgba(2,15,18,0.7)",
              boxShadow: isAutoScrolling
                ? "0 0 40px rgba(20,184,166,0.25)"
                : "0 0 24px rgba(0,0,0,0.55)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.6)";
              (e.currentTarget as HTMLElement).style.background = "rgba(2,28,26,0.9)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(20,184,166,0.3)";
              (e.currentTarget as HTMLElement).style.background = "rgba(2,15,18,0.7)";
            }}
          >
            {isAutoScrolling ? (
              <div className="flex gap-1.5">
                <div
                  className="h-5 w-1.5 rounded-full animate-pulse"
                  style={{ background: TEAL }}
                />
                <div
                  className="h-5 w-1.5 rounded-full animate-pulse"
                  style={{ background: TEAL, animationDelay: "0.15s" }}
                />
              </div>
            ) : (
              <>
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[min(7.5rem,28vw)] w-[min(7.5rem,28vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at center, rgba(20,184,166,0.38) 0%, rgba(20,184,166,0.12) 42%, transparent 72%)",
                  }}
                />
                <div className="relative z-10 flex items-center justify-center">
                  <svg
                    className="ml-1 h-7 w-7 transition-transform duration-200 group-hover:scale-105 md:h-8 md:w-8"
                    viewBox="0 0 24 24"
                    fill={TEAL}
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </>
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
