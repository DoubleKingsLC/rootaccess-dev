"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type PlaybookHUDProps = {
  progress: number;
};

const STEPS = [
  { id: "triage", label: "Triage", threshold: 0.4 },
  { id: "legal", label: "Legal Review", threshold: 0.6 },
  { id: "analysis", label: "Analysis", threshold: 0.75 },
  { id: "remediation", label: "Remediation", threshold: 0.85 }
] as const;

type StepId = (typeof STEPS)[number]["id"];

export const PlaybookHUD: React.FC<PlaybookHUDProps> = ({ progress }) => {
  const stepRefs = useRef<Record<StepId, HTMLDivElement | null>>({
    triage: null,
    legal: null,
    analysis: null,
    remediation: null
  });

  useEffect(() => {
    STEPS.forEach((s) => {
      const el = stepRefs.current[s.id];
      if (!el) return;
      const isActive = progress >= s.threshold;
      if (isActive) {
        gsap.to(el, {
          opacity: 1,
          x: 0,
          duration: 0.35,
          ease: "power2.out"
        });
      }
    });
  }, [progress]);

  return (
    <div className="pointer-events-none absolute right-4 top-1/2 z-15 flex -translate-y-1/2 flex-col gap-2">
      <div className="rounded border border-white/10 bg-slate-950/40 px-3 py-2 backdrop-blur-xl">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-cyan-400">
          SOAR_PLAYBOOK_094
        </p>
        <div className="mt-2 flex flex-col gap-1.5">
          {STEPS.map((s) => {
            const isDone = progress >= s.threshold;
            return (
              <div
                key={s.id}
                ref={(el) => {
                  stepRefs.current[s.id] = el;
                }}
                className="flex translate-x-2 items-center gap-2 opacity-40"
              >
                <span
                  className={`inline-flex h-3 w-3 items-center justify-center rounded-sm border border-white/15 ${
                    isDone ? "bg-emerald-400/70" : "bg-transparent"
                  }`}
                >
                  {isDone && (
                    <span className="block h-1.5 w-1.5 rounded-[2px] bg-slate-950" />
                  )}
                </span>
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.18em] ${
                    isDone ? "text-slate-100" : "text-slate-500"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

