"use client";

import React from "react";

type SQLDiscoveryChipProps = {
  localProgress: number; // 0–1 within SQLiScene
};

const ROSE = "#f43f5e";

export const SQLDiscoveryChip: React.FC<SQLDiscoveryChipProps> = ({ localProgress }) => {
  // Trigger at lp 0.14. Fade out by 0.30 (before payload finishes)
  const threshold = 0.14;
  const exitThreshold = 0.26;
  if (localProgress < threshold || localProgress >= 0.35) return null;

  // Animation progress
  const t = Math.min((localProgress - threshold) / 0.08, 1);
  const anim = 1 - Math.pow(1 - t, 3);
  
  let opacity = t < 0.2 ? t / 0.2 : 1;
  if (localProgress > exitThreshold) {
    opacity = Math.max(0, 1 - (localProgress - exitThreshold) / 0.06);
  }

  // Animation path:
  // Starts near the error box (bottom of the portal)
  // Moves to the LHS of the portal
  const startX = 44; // % from left (near center initially)
  const startY = 70; // % from top (bottom of portal)
  const endX   = 12; // Adjusted target % from left
  const endY   = 42; // % from top (settles on side)

  const x = startX + (endX - startX) * anim;
  const y = startY + (endY - startY) * anim;
  const scale = 0.5 + 0.5 * anim;

  return (
    <div
      className="pointer-events-none absolute z-[60] flex flex-col items-start gap-6"
      style={{
        left: anim > 0.9 ? "calc((50% - clamp(240px, 26vw, 360px)) / 2)" : `${x}vw`,
        top: `${y}vh`,
        opacity,
        transform: `translate(-50%, -50%) scale(${scale})`,
        width: "min(380px, 25vw)"
      }}
    >
      <div className="flex items-center gap-4 rounded-2xl border border-rose-500/40 bg-slate-950/95 px-6 py-5 backdrop-blur-3xl shadow-[0_0_50px_rgba(244,63,94,0.2)] w-full">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/10 border border-rose-500/20 text-2xl">
          🗄️
        </div>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-rose-500/80">
              Tech Stack Discovery
            </p>
          </div>
          <p className="font-mono text-lg font-black tracking-[0.1em] text-white leading-none">
            MYSQL / MARIA DB
          </p>
          <p className="mt-1.5 font-mono text-[10px] uppercase tracking-widest text-rose-400/50">
            Detected via Syntax Leak
          </p>
        </div>
      </div>

      {/* Simplified, Large Responsive Narrative */}
      <div 
        className="ml-8 flex flex-col gap-6 border-l-2 border-rose-500/20 pl-8 py-2"
        style={{ 
          opacity: t > 0.8 ? (t - 0.8) / 0.2 : 0,
          transform: `translateX(${t > 0.8 ? 0 : -20}px)`,
          transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <div className="space-y-4">
           <h3 className="font-mono text-sm font-black uppercase tracking-[0.5em] text-rose-500">
             RECON IS CYCLIC
           </h3>
           <p className="font-sans text-lg font-medium leading-normal text-slate-100/90 tracking-tight">
             Every exploit reveals new data. <br/>
             Every error discloses new targets. <br/>
             <span className="text-rose-400/60">Discovery never ends.</span>
           </p>
        </div>
      </div>
    </div>
  );
};
