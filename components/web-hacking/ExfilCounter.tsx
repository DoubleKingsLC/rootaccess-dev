"use client";

import React from "react";

type ExfilCounterProps = {
  localProgress: number;
};

const ROSE  = "#f43f5e";
const TOTAL = 14_200_000;

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const countValue = (lp: number): number => {
  if (lp < 0.20) return 0;
  const t = Math.min((lp - 0.20) / 0.65, 1);
  return Math.floor(ease(t) * TOTAL);
};

const PII_BADGES = [
  { label: "Email Address", delay: 0.22 },
  { label: "Full Name",     delay: 0.30 },
  { label: "Card Number",   delay: 0.38 },
  { label: "Balance",       delay: 0.46 },
  { label: "Home Address",  delay: 0.54 },
];

const fmt = (n: number): string =>
  n.toLocaleString("en-GB");

export const ExfilCounter: React.FC<ExfilCounterProps> = ({ localProgress }) => {
  const lp    = localProgress;
  const count = countValue(lp);
  const pct   = count / TOTAL;

  return (
    <div
      className="flex flex-col items-center gap-3.5 rounded-xl px-5 py-4"
      style={{
        background: "rgba(8,12,24,0.97)",
        border: "1px solid rgba(244,63,94,0.18)",
        boxShadow: "0 0 32px rgba(0,0,0,0.5)",
        minWidth: 220,
        fontFamily: "monospace",
      }}
    >
      {/* Label */}
      <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.4)" }}>
        Records Exfiltrated
      </span>

      {/* Big counter */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="font-mono font-bold tabular-nums"
          style={{
            color: ROSE,
            fontSize: "clamp(26px, 2.8vw, 38px)",
            lineHeight: 1,
            textShadow: "0 0 28px rgba(244,63,94,0.28)",
          }}
        >
          {fmt(count)}
        </span>
        <span className="font-mono text-[8px]" style={{ color: "rgba(148,163,184,0.35)" }}>
          of {fmt(TOTAL)} total users
        </span>
      </div>

      {/* Progress bar */}
      <div
        className="w-full overflow-hidden rounded-full"
        style={{ height: 3, background: "rgba(244,63,94,0.08)" }}
      >
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct * 100}%`,
            background: ROSE,
            boxShadow: "0 0 8px rgba(244,63,94,0.4)",
          }}
        />
      </div>

      {/* PII type badges */}
      <div className="flex flex-col gap-1.5 w-full">
        {PII_BADGES.map((badge) =>
          lp >= badge.delay ? (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-md px-3 py-1.5"
              style={{
                background: "rgba(244,63,94,0.05)",
                border: "1px solid rgba(244,63,94,0.13)",
              }}
            >
              <div
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: ROSE, boxShadow: `0 0 5px ${ROSE}` }}
              />
              <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.6)" }}>
                {badge.label}
              </span>
            </div>
          ) : null
        )}
      </div>

      {/* Footer */}
      {lp >= 0.35 && (
        <span
          className="font-mono text-[8px] uppercase tracking-wider text-center"
          style={{ color: "rgba(148,163,184,0.22)" }}
        >
          No auth audit logged · no rate limit
        </span>
      )}
    </div>
  );
};
