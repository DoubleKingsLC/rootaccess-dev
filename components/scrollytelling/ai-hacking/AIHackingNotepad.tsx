"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  AI_HACKING_PHASES,
  type AIHackingPhaseKey,
} from "./aiHackingModel";

function CheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M1.5 6.2l2.5 2.4 6.5-7"
        stroke="rgba(239,68,68,1)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function AIHackingNotepad({
  progress,
  className,
  layoutScale = 1,
}: {
  progress: number;
  className?: string;
  layoutScale?: number;
}) {
  const phaseByKey = useMemo(() => {
    return AI_HACKING_PHASES.reduce((acc, p) => {
      acc[p.key] = p;
      return acc;
    }, {} as Record<AIHackingPhaseKey, (typeof AI_HACKING_PHASES)[number]>);
  }, []);

  const [zoomKey, setZoomKey] = useState<AIHackingPhaseKey | null>(null);
  const activeIdx = AI_HACKING_PHASES.findIndex(
    (p) => progress >= p.startAt && progress < p.endAt
  );
  const [lastActiveIdx, setLastActiveIdx] = useState<number>(-1);

  useEffect(() => {
    // Trigger zoom whenever we enter a NEW phase (active or done)
    // We calculate a transitionIdx that incorporates both active and previous done states
    const transitionIdx = AI_HACKING_PHASES.findIndex(p => progress < p.endAt);
    
    if (transitionIdx !== -1 && transitionIdx !== lastActiveIdx) {
      const phase = AI_HACKING_PHASES[transitionIdx];
      setZoomKey(phase.key);
      setLastActiveIdx(transitionIdx);

      const t = window.setTimeout(() => setZoomKey(null), 800);
      return () => window.clearTimeout(t);
    }
  }, [progress, lastActiveIdx]);

  const containerRef = useRef<HTMLDivElement>(null);
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const update = () => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setInitialPos({
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });
        }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Hi-Res Quality Hack: We double the base size in CSS and scale down to 0.5 normally.
  // When we zoom to 1.0, we are at native resolution (100% sharp).
  const { focusScale, focusTranslate } = useMemo(() => {
    const PADDING = 0.024;
    const baseScale = 0.5;
    let scale = baseScale;
    let translateX = 0;
    let translateY = 0;

    if (initialPos.x === 0) return { focusScale: baseScale, focusTranslate: { x: 0, y: 0 } };

    for (let i = 0; i < AI_HACKING_PHASES.length; i++) {
        const phase = AI_HACKING_PHASES[i];
        if (progress >= phase.startAt && progress <= phase.startAt + PADDING) {
            const halfway = phase.startAt + PADDING / 2;
            
            let rawT = 0;
            if (progress <= halfway) {
                rawT = (progress - phase.startAt) / (PADDING / 2);
            } else {
                rawT = 1 - (progress - halfway) / (PADDING / 2);
            }

            const t = 1 - Math.pow(1 - rawT, 3); 

            const targetX = typeof window !== "undefined" ? window.innerWidth / 2 : 500;
            const targetY = typeof window !== "undefined" ? window.innerHeight / 2 : 500;

            const deltaX = targetX - initialPos.x;
            const deltaY = targetY - initialPos.y;

            // Zoom from baseScale up to 1.0 (native res) 
            scale = baseScale + ((1.0 - baseScale) * t); 
            translateX = (deltaX / layoutScale) * t;
            translateY = (deltaY / layoutScale) * t;
            
            break;
        }
    }
    return { 
        focusScale: scale, 
        focusTranslate: { x: translateX, y: translateY }
    };
  }, [progress, initialPos, layoutScale]);

  // For the barcode at the bottom
  const barcodeBars = useMemo(() => [1.2, 3.4, 2.1, 1.8, 4.0, 1.5, 2.8, 3.1, 1.1, 2.5, 3.6, 1.9], []);

  return (
    <aside
      ref={containerRef}
      className={className}
      style={{
        width: 700, // Increased base width for better horizontal space
        minWidth: 600,
        zIndex: focusScale > 0.51 ? 50 : 10,
        margin: -175, // Scaled compensation for 0.5 scale offset
        transform: "scale(1)", // Neutralize parent side scale
      }}
    >
      <div
        className="relative overflow-hidden rounded-[2rem] border-[2px] bg-[#080000]/95 backdrop-blur-3xl p-12 antialiased"
        style={{
          transformOrigin: "center center",
          transform: `translate3d(${focusTranslate.x}px, ${focusTranslate.y}px, 0) scale(${focusScale})`,
          transition: focusScale > 0.51 ? "none" : "transform 800ms cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 800ms ease, border-color 800ms ease",
          boxShadow: focusScale > 0.51
            ? "0 80px 200px rgba(0,0,0,0.95), 0 0 150px rgba(239,68,68,0.3)"
            : "0 20px 40px rgba(0,0,0,0.6), 0 0 40px rgba(239,68,68,0.05)",
          borderColor: focusScale > 0.51 ? "rgba(239,68,68,1)" : "rgba(239,68,68,0.25)",
          zIndex: focusScale > 0.51 ? 300 : 10,
          backfaceVisibility: "hidden",
        }}
      >
        {/* Premium Cinematic Glint */}
        <div 
            className="pointer-events-none absolute -inset-full z-[1] rotate-[35deg] transition-all duration-1000"
            style={{
                background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.05) 45%, rgba(239,68,68,0.2) 50%, rgba(239,68,68,0.05) 55%, transparent)",
                transform: `translateX(${focusScale > 1.05 ? "100%" : "-100%"})`,
                opacity: focusScale > 1.05 ? 1 : 0,
            }}
        />

        {/* Spiral Binding Aesthetic */}
        <div className="absolute -top-2 left-0 right-0 flex justify-evenly px-8 opacity-70">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-3 h-7 rounded-b-sm" style={{ background: "rgba(239,68,68,0.4)" }} />
          ))}
        </div>

        {/* Notepad Header */}
        <div className="mt-8 mb-10 flex items-end justify-between border-b-[3px] pb-6" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
          <div>
            <p className="font-mono text-[30px] font-bold uppercase tracking-[0.3em] text-red-100" style={{ textShadow: "0 0 20px rgba(239,68,68,0.5)" }}>
              Field_Notes
            </p>
            <p className="mt-3 font-mono text-[20px] uppercase tracking-widest text-red-500/70">
              Session // Data Capture
            </p>
          </div>
          <div className="flex h-4 w-4 items-center justify-center">
             <div className="h-3 w-3 rounded-sm animate-pulse bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.9)]" />
          </div>
        </div>

        {/* Noted Items */}
        <div className="flex flex-col">
          {AI_HACKING_PHASES.map((phase, idx) => {
            const done = progress >= phase.endAt;
            const active = progress >= phase.startAt && progress < phase.endAt;

            const accent = done ? "rgba(252,165,165,0.7)" : active ? "rgba(254,226,226,1)" : "rgba(148,163,184,0.4)";

            return (
              <div
                key={phase.key}
                className="group relative flex items-center gap-8 py-7 transition-all duration-400"
                style={{
                  borderBottom: "2px solid rgba(239,68,68,0.15)",
                  transform: zoomKey === phase.key ? "scale(1.02) translateX(8px)" : "none",
                }}
              >
                {/* Fluid Background Highlight */}
                <div 
                    className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                    style={{ 
                        opacity: active ? 1 : 0,
                        background: "linear-gradient(90deg, rgba(239,68,68,0.12) 0%, transparent 85%)",
                    }}
                />
 
                {/* Manual Checkbox */}
                <div
                  className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-[6px] transition-all duration-500"
                  style={{
                    border: `2px solid ${done ? "rgba(239,68,68,0.7)" : active ? "rgba(239,68,68,0.6)" : "rgba(148,163,184,0.3)"}`,
                    background: done ? "rgba(239,68,68,0.15)" : "rgba(0,0,0,0.5)",
                    boxShadow: done ? "0 0 30px rgba(239,68,68,0.3)" : active ? "inset 0 0 10px rgba(239,68,68,0.2)" : "none",
                  }}
                >
                  {done && <CheckIcon />}
                </div>
 
                <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-4">
                    <span 
                        className="font-mono text-[22px] uppercase tracking-widest transition-colors duration-500"
                        style={{ color: active ? "rgba(248,113,113,1)" : "rgba(239,68,68,0.5)" }}
                    >
                        [{String(idx).padStart(2, "0")}]
                    </span>
                    <span
                      className="font-mono text-[26px] uppercase tracking-[0.2em] whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-500"
                      style={{ color: accent, fontWeight: active ? 600 : 400, textShadow: active ? "0 0 20px rgba(239,68,68,0.4)" : "none" }}
                    >
                      {phase.label}
                    </span>
                  </div>
                  {/* Subtle Sub-line */}
                  {(active || done) && (
                      <div 
                        className="mt-3 font-mono text-[19px] tracking-[0.25em] uppercase transition-all duration-500" 
                        style={{ 
                            color: active ? "rgba(239,68,68,0.8)" : "rgba(239,68,68,0.4)",
                            opacity: (active || done) ? 1 : 0
                        }}
                      >
                          {active ? "// IN PROGRESS ..." : "// COMPLETED"}
                      </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Barcode Line */}
        <div className="mt-12 flex items-center justify-between pt-4">
           <div className="flex items-end space-x-[4px] opacity-40">
               {barcodeBars.map((width, i) => (
                   <div key={i} className="h-6 bg-red-400" style={{ width: width * 2 }} />
               ))}
           </div>
           <p className="font-mono text-[20px] uppercase tracking-[0.3em] text-red-500/40">
               // END OF RECORD
           </p>
        </div>
      </div>
    </aside>
  );
}
