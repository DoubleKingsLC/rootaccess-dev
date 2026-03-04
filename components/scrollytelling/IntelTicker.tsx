"use client";

import React from "react";

const MESSAGES = [
  "CVE-2026-0041: HIGH EXPLOITABILITY",
  "IOC DETECTED: 3.122.239.15",
  "UNUSUAL AUTH PATTERN: REGION MISMATCH",
  "NEW SIGMA RULE DEPLOYED: LATERAL_MOVE_09",
  "THREAT FEED: RANSOMWARE FAMILY ACTIVITY INCREASE"
];

const joined = MESSAGES.join("   •   ");

export const IntelTicker: React.FC = () => {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex h-8 items-center overflow-hidden bg-transparent">
      <div className="relative w-full opacity-40">
        <div className="absolute animate-[ticker-scroll_40s_linear_infinite] whitespace-nowrap">
          <span className="px-8 font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400/80">
            {joined}   •   {joined}
          </span>
        </div>
      </div>
    </div>
  );
};

