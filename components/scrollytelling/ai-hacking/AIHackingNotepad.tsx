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
}: {
  progress: number;
  className?: string;
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

  // Cinematic Focus Zoom Calculation (scroll-scrubbed)
  const { focusScale, focusTranslate } = useMemo(() => {
    const PADDING = 0.02; // duration of the "pop" in progress units
    let scale = 1;
    let translateX = 0;
    let translateY = 0;

    if (initialPos.x === 0) return { focusScale: 1, focusTranslate: { x: 0, y: 0 } };

    for (let i = 0; i < AI_HACKING_PHASES.length; i++) {
        const phase = AI_HACKING_PHASES[i];
        if (progress >= phase.startAt && progress <= phase.startAt + PADDING) {
            const halfway = phase.startAt + PADDING / 2;
            
            // Calculate progress 0 -> 1 -> 0
            let t = 0;
            if (progress <= halfway) {
                t = (progress - phase.startAt) / (PADDING / 2);
            } else {
                t = 1 - (progress - halfway) / (PADDING / 2);
            }

            // Target center of viewport
            const targetX = window.innerWidth / 2;
            const targetY = window.innerHeight / 2;

            const deltaX = targetX - initialPos.x;
            const deltaY = targetY - initialPos.y;

            scale = 1 + (0.9 * t); // Up to 1.9x scale
            translateX = deltaX * t;
            translateY = deltaY * t;
            break;
        }
    }
    return { focusScale: scale, focusTranslate: { x: translateX, y: translateY } };
  }, [progress, initialPos]);

  // For the barcode at the bottom
  const barcodeBars = useMemo(() => [1.2, 3.4, 2.1, 1.8, 4.0, 1.5, 2.8, 3.1, 1.1, 2.5, 3.6, 1.9], []);

  return (
    <aside
      ref={containerRef}
      className={className}
      style={{
        width: 300,
        minWidth: 280,
      }}
    >
      <div
        className="relative overflow-hidden rounded-xl border bg-[#080000]/95 backdrop-blur-3xl p-6"
        style={{
          transform: `translate(${focusTranslate.x}px, ${focusTranslate.y}px) scale(${focusScale})`,
          transition: focusScale > 1.01 ? "none" : "transform 600ms ease, box-shadow 600ms ease, border-color 600ms ease",
          boxShadow: focusScale > 1.01
            ? "0 40px 100px rgba(0,0,0,0.95), 0 0 150px rgba(239,68,68,0.4)"
            : "0 20px 40px rgba(0,0,0,0.6), 0 0 40px rgba(239,68,68,0.05)",
          borderColor: focusScale > 1.01 ? "rgba(239,68,68,0.8)" : "rgba(239,68,68,0.25)",
          zIndex: focusScale > 1.01 ? 100 : 10,
        }}
      >
        {/* Spiral Binding Aesthetic */}
        <div className="absolute -top-1 left-0 right-0 flex justify-evenly px-4 opacity-70">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1.5 h-3.5 rounded-b-sm" style={{ background: "rgba(239,68,68,0.4)" }} />
          ))}
        </div>

        {/* Notepad Header */}
        <div className="mt-3 mb-5 flex items-end justify-between border-b-2 pb-3" style={{ borderColor: "rgba(239,68,68,0.2)" }}>
          <div>
            <p className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] text-red-100" style={{ textShadow: "0 0 10px rgba(239,68,68,0.5)" }}>
              Field_Notes
            </p>
            <p className="mt-1.5 font-mono text-[9px] uppercase tracking-widest text-red-500/70">
              Session // Data Capture
            </p>
          </div>
          <div className="flex h-2 w-2 items-center justify-center">
             <div className="h-1.5 w-1.5 rounded-sm animate-pulse bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
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
                className="group relative flex items-center gap-4 py-3.5 transition-all duration-400"
                style={{
                  borderBottom: "1px solid rgba(239,68,68,0.15)",
                  transform: zoomKey === phase.key ? "scale(1.02) translateX(4px)" : "none",
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
                  className="relative z-10 flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] transition-all duration-500"
                  style={{
                    border: `1px solid ${done ? "rgba(239,68,68,0.7)" : active ? "rgba(239,68,68,0.6)" : "rgba(148,163,184,0.3)"}`,
                    background: done ? "rgba(239,68,68,0.15)" : "rgba(0,0,0,0.5)",
                    boxShadow: done ? "0 0 15px rgba(239,68,68,0.3)" : active ? "inset 0 0 5px rgba(239,68,68,0.2)" : "none",
                  }}
                >
                  {done && <CheckIcon />}
                </div>

                <div className="relative z-10 flex-1 min-w-0 flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span 
                        className="font-mono text-[10px] uppercase tracking-widest transition-colors duration-500"
                        style={{ color: active ? "rgba(248,113,113,1)" : "rgba(239,68,68,0.5)" }}
                    >
                        [{String(idx).padStart(2, "0")}]
                    </span>
                    <span
                      className="font-mono text-[11px] uppercase tracking-[0.2em] whitespace-nowrap overflow-hidden text-ellipsis transition-all duration-500"
                      style={{ color: accent, fontWeight: active ? 600 : 400, textShadow: active ? "0 0 10px rgba(239,68,68,0.4)" : "none" }}
                    >
                      {phase.label}
                    </span>
                  </div>
                  {/* Subtle Sub-line */}
                  {(active || done) && (
                      <div 
                        className="mt-1 font-mono text-[8.5px] tracking-[0.25em] uppercase transition-all duration-500" 
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
        <div className="mt-6 flex items-center justify-between pt-2">
           <div className="flex items-end space-x-[2px] opacity-40">
               {barcodeBars.map((width, i) => (
                   <div key={i} className="h-3 bg-red-400" style={{ width }} />
               ))}
           </div>
           <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-red-500/40">
               // END OF RECORD
           </p>
        </div>
      </div>
    </aside>
  );
}
