"use client";

import React from "react";
import { useRouter } from "next/navigation";

type Props = { progress: number };

const careerOpacity = (p: number): number => {
  if (p < 0.99) return 0;
  if (p < 0.998) return (p - 0.99) / 0.008;
  return 1;
};

function OutroCareerCard({ op, onNavigate }: { op: number; onNavigate: () => void }) {
  if (op === 0) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center px-6 transition-all duration-700"
      style={{
        opacity: op,
        transform: `scale(${0.92 + op * 0.08}) translateY(${(1 - op) * 20}px)`,
        filter: `blur(${(1 - op) * 15}px)`,
      }}
    >
      <div
        className={`w-[min(580px,94vw)] rounded-3xl border border-teal-500/30 bg-black/85 px-6 py-8 md:px-10 md:py-12 backdrop-blur-3xl shadow-[0_0_80px_rgba(20,184,166,0.15)] text-center relative overflow-hidden transition-all duration-300 ${
          op > 0.1 ? "pointer-events-auto" : "pointer-events-none"
        }`}
        role="banner"
      >
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:100%_4px] opacity-30" />

        <div className="absolute -inset-24 bg-teal-500/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="mb-6 md:mb-10 flex justify-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-400/40 bg-teal-950/60 px-4 py-1.5 shadow-[0_0_20px_rgba(20,184,166,0.4)]">
            <span className="h-2 w-2 rounded-full bg-teal-500 animate-pulse shadow-[0_0_8px_rgba(20,184,166,1)]" />
            <span className="font-mono text-[11px] font-black uppercase tracking-[0.25em] text-teal-100">
              CONTROL POSTURE: REVIEW COMPLETE
            </span>
          </div>
        </div>

        <h2
          className="mb-5 font-sans text-3xl md:text-5xl font-black tracking-tight text-white uppercase leading-none"
          style={{ textShadow: "0 0 40px rgba(255,255,255,0.2)" }}
        >
          THE SILENT <span className="text-teal-500">GUARDIAN</span>
        </h2>

        <p className="mb-8 text-sm md:text-base lg:text-lg leading-relaxed text-slate-300 font-medium px-2 md:px-6">
          Being a GRC analyst is like trying to catch code bugs with a butterfly net. 
          You've seen the symphony of governance and risk—ensuring that innovation 
          and safety coexist harmoniously in the software world.
        </p>

        <div className="flex flex-col items-center gap-6">
          <button
            type="button"
            onClick={onNavigate}
            className="group relative w-full max-w-sm overflow-hidden rounded-2xl border border-teal-500/50 bg-teal-500/10 px-8 py-5 font-mono text-sm font-black uppercase tracking-[0.3em] text-teal-400 transition-all hover:border-teal-400 hover:bg-teal-500/20 hover:text-white hover:shadow-[0_0_40px_rgba(20,184,166,0.3)]"
          >
            <div className="relative z-10 flex items-center justify-center gap-3">
              GO THROUGH THE ROADMAP
              <svg
                className="transition-transform group-hover:translate-x-1"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </div>
            <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-teal-500 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
          </button>

          <p className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-900/60 font-bold">
            [ AUDIT TRAIL LOCKED ]
          </p>
        </div>
      </div>
    </div>
  );
}

export const GRCOutroScene: React.FC<Props> = ({ progress }) => {
  const router = useRouter();
  const careerOp = careerOpacity(progress);

  if (careerOp === 0) return null;

  return (
    <div className="absolute inset-0" style={{ zIndex: 21 }}>
      <OutroCareerCard op={careerOp} onNavigate={() => router.push("/roadmaps/grc/career-path")} />
    </div>
  );
};
