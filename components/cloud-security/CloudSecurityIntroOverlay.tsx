"use client";

import React from "react";
import { S3_GREEN, CF_C, AMBER } from "./cloudShared";

type Props = { progress: number; onPlay: () => void; isAutoScrolling: boolean };

export const CloudSecurityIntroOverlay: React.FC<Props> = ({ progress, onPlay, isAutoScrolling }) => {
  const fadeOut = progress >= 0.01;
  const opacity = fadeOut ? Math.max(0, 1 - (progress - 0.01) / 0.025) : 1;

  return (
    <div
      className="absolute inset-0 z-20 flex flex-col items-center justify-center"
      style={{
        opacity,
        pointerEvents: progress >= 0.045 ? "none" : "auto",
        background: "rgba(7,9,15,0.72)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(59,130,246,0.06)",
      }}
      aria-hidden={progress >= 0.05}
    >
      {/* Eyebrow */}
      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.45em]"
        style={{ color: "rgba(148,163,184,0.5)" }}>
        Cloud Security · S3 Misconfiguration
      </p>

      {/* Title */}
      <h1 className="font-sans text-5xl font-black tracking-tight text-white md:text-7xl uppercase"
        style={{ textShadow: "0 0 60px rgba(34,197,94,0.18)" }}>
        The Public Bucket
      </h1>

      {/* S3 bucket decoration */}
      <div className="mt-5 flex items-center gap-4">
        <div className="h-px w-16" style={{ background: `linear-gradient(to right, transparent, ${S3_GREEN}50)` }} />
        <svg width="32" height="32" viewBox="-27 -27 54 54">
          {/* Simplified bucket */}
          <rect x={-27} y={-27} width={54} height={54} rx={8} fill="#16a34a" opacity={0.9} />
          <ellipse cx={0} cy={-7} rx={14} ry={3.5} fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.75)" strokeWidth={1.1} />
          <path d="M-14,-7 L-11,14 L11,14 L14,-7" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.75)" strokeWidth={1.1} />
          <rect x={-4} y={1} width={8} height={7} rx={1.5} fill="rgba(255,255,255,0.9)" />
          <path d="M-2.5,-9 A2.5,2.5 0 0,1 2.5,-9 L2.5,1 L-2.5,1 Z" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.2} />
        </svg>
        <div className="h-px w-16" style={{ background: `linear-gradient(to left, transparent, ${S3_GREEN}50)` }} />
      </div>

      {/* Subtitle */}
      <div className="mt-5 flex flex-col items-center gap-2 text-center max-w-xl px-4">
        <p className="font-mono text-sm tracking-[0.2em] uppercase" style={{ color: "rgba(255,255,255,0.45)" }}>
          One setting. One misconfiguration. Everything exposed.
        </p>
      </div>

      <div className="h-10" />

      {/* Controls */}
      <div className="flex flex-col items-center gap-7">
        {/* Scroll CTA */}
        <div className="flex flex-col items-center gap-3">
          <p className="font-mono text-[10px] tracking-[0.4em] uppercase font-bold"
            style={{ color: "rgba(148,163,184,0.6)" }}>
            Scroll to Begin
          </p>
          <div style={{ color: `${S3_GREEN}90`, animation: "scroll-bounce 1.8s ease-in-out infinite" }}>
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>

        {/* OR divider */}
        <div className="flex items-center gap-6 w-full max-w-[240px]">
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${S3_GREEN}40, transparent)` }} />
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] font-black" style={{ color: `${S3_GREEN}80` }}>OR</span>
          <div className="h-px flex-1" style={{ background: `linear-gradient(to right, transparent, ${S3_GREEN}40, transparent)` }} />
        </div>

        {/* Play button */}
        <div className="relative flex flex-col items-center gap-5">
          <button
            type="button"
            onClick={e => { e.stopPropagation(); onPlay(); }}
            disabled={isAutoScrolling}
            className="scrolly-control-btn group relative flex h-20 w-20 items-center justify-center overflow-visible rounded-full text-white outline-none transition-all duration-500 hover:scale-110 disabled:opacity-50 disabled:pointer-events-none"
            style={{
              border: `1px solid ${S3_GREEN}50`,
              background: "rgba(7,9,15,0.75)",
              boxShadow: isAutoScrolling ? `0 0 40px ${S3_GREEN}50` : "0 0 24px rgba(0,0,0,0.55)",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${S3_GREEN}90`;
              (e.currentTarget as HTMLElement).style.background  = "rgba(7,14,10,0.9)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.borderColor = `${S3_GREEN}50`;
              (e.currentTarget as HTMLElement).style.background  = "rgba(7,9,15,0.75)";
            }}
          >
            {isAutoScrolling ? (
              <div className="flex gap-1.5">
                <div className="h-5 w-1.5 rounded-full animate-pulse" style={{ background: S3_GREEN }} />
                <div className="h-5 w-1.5 rounded-full animate-pulse" style={{ background: S3_GREEN, animationDelay: "0.15s" }} />
              </div>
            ) : (
              <>
                <span className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[7.5rem] w-[7.5rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${S3_GREEN}35 0%, ${S3_GREEN}10 42%, transparent 72%)` }} />
                <svg className="relative z-10 ml-1 h-8 w-8" viewBox="0 0 24 24" fill={S3_GREEN}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              </>
            )}
          </button>

          <div className="flex flex-col items-center gap-1">
            <span className="font-sans text-[11px] uppercase tracking-[0.3em] text-white font-black">
              {isAutoScrolling ? "Experience Active" : "Auto-Play Experience"}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-slate-500">
              {isAutoScrolling ? "Guided Mode Enabled" : "Sit Back and Watch"}
            </span>
          </div>
        </div>
      </div>

      <style>{`@keyframes scroll-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }`}</style>
    </div>
  );
};
