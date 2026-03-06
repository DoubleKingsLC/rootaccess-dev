"use client";

import React from "react";

type ExecutivePOVProps = {
  stationRef?: React.RefObject<HTMLDivElement | null>;
};

/** Station 4: Executive Boardroom glass card with post-mortem metrics */
export const ExecutivePOV: React.FC<ExecutivePOVProps> = ({ stationRef }) => {
  return (
    <div
      ref={stationRef as React.LegacyRef<HTMLDivElement>}
      className="relative flex h-[330px] w-[450px] flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-slate-950/50 px-6 py-8 shadow-[0_0_40px_rgba(15,23,42,0.9)] backdrop-blur-xl"
    >
      <span className="pointer-events-none absolute -top-5 left-0 right-0 text-center font-mono text-[10px] font-medium uppercase tracking-widest text-slate-400">
        STATION 4 / EXECUTIVE
      </span>

      <div className="relative z-[1] flex w-full flex-col items-center justify-center">
        <div className="mb-5 rounded-xl border border-white/15 bg-white/5 px-6 py-4 shadow-[0_0_30px_rgba(15,23,42,0.9)]">
          <h3 className="text-center font-sans text-xs font-semibold tracking-[0.25em] text-slate-200">
            EXECUTIVE POST-MORTEM
          </h3>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 text-center md:grid-cols-3">
          <div className="rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3">
            <span className="mb-1 block text-[9px] font-medium tracking-wider text-slate-400 uppercase">
              Response Time
            </span>
            <span className="font-mono text-2xl font-bold text-sky-400">15m</span>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3">
            <span className="mb-1 block text-[9px] font-medium tracking-wider text-slate-400 uppercase">
              Root Cause
            </span>
            <span className="text-[11px] font-sans font-semibold text-rose-400">
              VPC NAT IP Exhaustion
            </span>
          </div>

          <div className="rounded-lg border border-white/10 bg-slate-900/60 px-4 py-3">
            <span className="mb-1 block text-[9px] font-medium tracking-wider text-slate-400 uppercase">
              Resolution
            </span>
            <span className="text-[11px] font-sans font-medium text-emerald-400">
              Elastic IP Rotation &amp;
              <br />
              NAT Gateway Scaling
            </span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-3 left-1/2 z-0 -translate-x-1/2">
        <svg
          width="260"
          height="60"
          viewBox="0 0 260 60"
          className="opacity-80 drop-shadow-[0_0_12px_rgba(14,165,233,0.4)]"
          aria-hidden
        >
          <ellipse
            cx="130"
            cy="30"
            rx="118"
            ry="20"
            fill="none"
            stroke="url(#execRingGradient)"
            strokeWidth="1.5"
          />
          <defs>
            <linearGradient id="execRingGradient" x1="0" y1="0" x2="260" y2="0" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(14,165,233,0)" />
              <stop offset="50%" stopColor="rgba(14,165,233,0.7)" />
              <stop offset="100%" stopColor="rgba(14,165,233,0)" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};

