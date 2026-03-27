"use client";

import React from "react";

type InspectFlickerProps = {
  localProgress: number; // 0–1 within this phase
};

// Slides up at 0.80, fully visible 0.86–1.0
const panelSlide = (local: number): { opacity: number; translateY: number } => {
  if (local < 0.80) return { opacity: 0, translateY: 100 };
  if (local < 0.88) {
    const t = (local - 0.80) / 0.08;
    const eased = 1 - Math.pow(1 - t, 3);
    return { opacity: eased, translateY: 100 * (1 - eased) };
  }
  return { opacity: 1, translateY: 0 };
};

export const InspectFlicker: React.FC<InspectFlickerProps> = ({ localProgress }) => {
  const { opacity, translateY } = panelSlide(localProgress);
  if (opacity === 0) return null;

  return (
    <div
      className="absolute inset-x-0 bottom-0 overflow-hidden rounded-b-2xl"
      style={{
        height: "38%",
        opacity,
        transform: `translateY(${translateY}%)`,
        background: "rgba(10,14,24,0.97)",
        borderTop: "1px solid rgba(244,63,94,0.18)",
        boxShadow: "0 -8px 40px rgba(0,0,0,0.5)",
        zIndex: 20,
      }}
    >
      {/* DevTools tab bar */}
      <div
        className="flex items-center gap-1 border-b px-3 py-1.5"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(15,20,35,0.98)" }}
      >
        {["Elements", "Console", "Network", "Sources"].map((tab, i) => (
          <div
            key={tab}
            className="rounded px-3 py-1 font-mono text-[10px]"
            style={{
              color: i === 0 ? "#f43f5e" : "rgba(148,163,184,0.5)",
              background: i === 0 ? "rgba(244,63,94,0.08)" : "transparent",
              borderBottom: i === 0 ? "1px solid #f43f5e" : "none",
            }}
          >
            {tab}
          </div>
        ))}
        <div className="ml-auto font-mono text-[9px] text-slate-600">DevTools</div>
      </div>

      {/* HTML tree */}
      <div className="overflow-hidden px-4 pt-2 font-mono text-[11px] leading-relaxed">
        <div className="text-slate-500">&lt;<span className="text-blue-400">html</span> <span className="text-yellow-400/70">lang</span>=<span className="text-emerald-400/70">&quot;en&quot;</span>&gt;</div>
        <div className="pl-4 text-slate-500">&lt;<span className="text-blue-400">head</span>&gt;</div>
        <div className="pl-8 text-slate-500">
          &lt;<span className="text-blue-400">meta</span> <span className="text-yellow-400/70">name</span>=<span className="text-emerald-400/70">&quot;generator&quot;</span> <span className="text-yellow-400/70">content</span>=<span className="text-emerald-400/70">&quot;<span style={{ color: "#f43f5e", fontWeight: 700 }}>React 18.2.0</span>&quot;</span>/&gt;
        </div>
        <div className="pl-8 text-slate-500">
          &lt;<span className="text-blue-400">meta</span> <span className="text-yellow-400/70">name</span>=<span className="text-emerald-400/70">&quot;description&quot;</span> <span className="text-yellow-400/70">content</span>=<span className="text-emerald-400/70">&quot;NexusPay — secure payments&quot;</span>/&gt;
        </div>

        {/* Response headers strip */}
        <div
          className="mt-2 rounded-lg px-3 py-2"
          style={{ background: "rgba(244,63,94,0.05)", border: "1px solid rgba(244,63,94,0.12)" }}
        >
          <p className="mb-1 font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.55)" }}>
            Response Headers
          </p>
          <div className="space-y-0.5">
            {[
              ["Server",         "nginx/1.18.0 (Ubuntu)"],
              ["X-Powered-By",   "Express"],
              ["X-Frame-Options","SAMEORIGIN"],
              ["Content-Type",   "text/html; charset=utf-8"],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <span className="shrink-0 text-slate-500">{k}:</span>
                <span style={{ color: k === "Server" || k === "X-Powered-By" ? "#f43f5e" : "rgba(148,163,184,0.7)" }}>
                  {v}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
