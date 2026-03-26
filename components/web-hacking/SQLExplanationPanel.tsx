"use client";

import React from "react";

type SQLExplanationPanelProps = {
  localProgress: number;
};

const ROSE = "#f43f5e";

export const SQLExplanationPanel: React.FC<SQLExplanationPanelProps> = ({ localProgress }) => {
  // Visible during the SQL zoom phase (lp 0.47 – 0.76)
  if (localProgress < 0.47 || localProgress >= 0.76) return null;

  // Fade in over 0.47–0.52, fade out over 0.72–0.76
  let opacity = 1;
  if (localProgress < 0.52) opacity = (localProgress - 0.47) / 0.05;
  if (localProgress > 0.72) opacity = 1 - (localProgress - 0.72) / 0.04;

  const slideIn = localProgress < 0.52
    ? -20 + 20 * ((localProgress - 0.47) / 0.05)
    : 0;

  return (
    <div
      className="pointer-events-none absolute z-[60] flex flex-col gap-6"
      style={{
        left: "calc((50% - clamp(240px, 27.5vw, 360px)) / 2)",
        top: "50%",
        transform: `translate(-50%, -50%) translateX(${slideIn}px)`,
        opacity,
        width: "min(400px, 26vw)",
        transition: "opacity 0.4s ease-out",
      }}
    >
      {/* Title */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-emerald-400/80">
            Why It Worked
          </p>
        </div>
        <h3 className="font-mono text-lg font-black uppercase tracking-[0.15em] text-white leading-tight">
          SQL INJECTION<br />
          <span style={{ color: ROSE }}>AUTH BYPASS</span>
        </h3>
      </div>

      {/* Explanation steps */}
      <div className="flex flex-col gap-5 border-l-2 border-emerald-500/20 pl-6">
        <div className="space-y-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            1. The Input
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-slate-300">
            The password field received{" "}
            <span className="font-mono font-bold" style={{ color: ROSE }}>
              &apos; OR 1=1 --
            </span>
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            2. The Query
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-slate-300">
            The server built an SQL query with <em>unsanitized</em> user input,
            breaking out of the password string.
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            3. The Bypass
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-slate-300">
            <span className="font-mono font-bold text-white">1=1</span> is always true.
            The <span className="font-mono font-bold" style={{ color: ROSE }}>--</span>{" "}
            comments out the rest. <em>Every row matches.</em>
          </p>
        </div>

        <div className="space-y-2">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-emerald-400">
            4. The Result
          </p>
          <p className="font-sans text-[15px] leading-relaxed text-slate-300">
            The first row returned was <span className="font-mono font-bold text-white">admin</span>.
            Full access granted — no password needed.
          </p>
        </div>
      </div>
    </div>
  );
};
