"use client";

import React from "react";

type MockTerminalProps = {
  localProgress: number; // 0–1 within ActiveReconScene
};

// ── Timing (local) ────────────────────────────────────────────────────────────
// 0.00–0.12  prompt appears
// 0.12–0.38  command types
// 0.38–0.55  scan loading bar sweeps
// 0.55–0.95  ports stream one by one

const COMMAND = "nmap -sV -p- --open 188.166.92.14";

const cmdTyped = (lp: number): string => {
  if (lp < 0.12) return "";
  const t = Math.min((lp - 0.12) / 0.26, 1);
  return COMMAND.slice(0, Math.round(t * COMMAND.length));
};

const scanProgress = (lp: number): number => {
  if (lp < 0.38) return 0;
  if (lp > 0.55) return 100;
  return ((lp - 0.38) / 0.17) * 100;
};

const PORTS = [
  { port: "22/tcp",   svc: "ssh",   version: "OpenSSH 8.9p1",       flag: false },
  { port: "80/tcp",   svc: "http",  version: "nginx/1.18.0",         flag: false },
  { port: "443/tcp",  svc: "https", version: "TLS 1.2 · nginx",      flag: false },
  { port: "8080/tcp", svc: "http",  version: "Dev server (no auth)",  flag: true  },
  { port: "3306/tcp", svc: "mysql", version: "MySQL 8.0 · no FW rule",flag: true  },
];

const portsVisible = (lp: number): number => {
  if (lp < 0.55) return 0;
  return Math.floor(((lp - 0.55) / 0.40) * (PORTS.length + 1));
};

const ROSE   = "#f43f5e";
const GREEN  = "rgba(34,197,94,0.85)";

export const MockTerminal: React.FC<MockTerminalProps> = ({ localProgress }) => {
  const cmd      = cmdTyped(localProgress);
  const scanPct  = scanProgress(localProgress);
  const visible  = portsVisible(localProgress);
  const scanning = scanPct > 0 && scanPct < 100;

  return (
    <div
      className="flex flex-col overflow-hidden rounded-2xl"
      style={{
        width: "clamp(480px, 56vw, 720px)",
        background: "rgba(6,9,18,0.97)",
        border: "1px solid rgba(244,63,94,0.22)",
        boxShadow: "0 0 60px rgba(244,63,94,0.10), 0 32px 64px rgba(0,0,0,0.65)",
        fontFamily: "monospace",
      }}
    >
      {/* ── Title bar ───────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2 px-4 py-2.5"
        style={{ background: "rgba(15,20,35,0.98)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex gap-1.5">
          {["#ff5f57","#febc2e","#28c840"].map((c, i) => (
            <div key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <span className="ml-2 font-mono text-[10px]" style={{ color: "rgba(148,163,184,0.5)" }}>
          kali@attacker — bash
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          {scanning && (
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: ROSE, boxShadow: `0 0 6px ${ROSE}`, animation: "pulse 0.8s infinite" }}
            />
          )}
          <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.45)" }}>
            {scanning ? "scanning" : visible >= PORTS.length ? "complete" : "ready"}
          </span>
        </div>
      </div>

      {/* ── Terminal body ────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-1 px-5 py-4">

        {/* Prompt + command */}
        <div className="flex items-baseline gap-2">
          <span style={{ color: GREEN }} className="font-mono text-[11px] shrink-0">
            ┌──(kali㉿kali)-[~]<br />
            └─$
          </span>
          <span className="font-mono text-[12px]" style={{ color: "rgba(226,232,240,0.9)" }}>
            {cmd}
            {cmd.length < COMMAND.length && localProgress >= 0.12 && (
              <span
                className="inline-block w-[7px] h-[13px] ml-0.5 align-middle"
                style={{ background: ROSE, animation: "pulse 1s steps(1) infinite" }}
              />
            )}
          </span>
        </div>

        {/* Scan progress bar */}
        {scanPct > 0 && (
          <div className="mt-2 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.4)" }}>
                {scanPct < 100 ? `Scanning ports… ${Math.round(scanPct)}%` : "Scan complete — open ports:"}
              </span>
              {scanPct < 100 && (
                <span className="font-mono text-[9px]" style={{ color: "rgba(244,63,94,0.5)" }}>
                  ETA {Math.round((100 - scanPct) / 20)}s
                </span>
              )}
            </div>
            <div className="overflow-hidden rounded-full" style={{ height: 2, background: "rgba(255,255,255,0.05)" }}>
              <div
                style={{
                  width: `${scanPct}%`,
                  height: "100%",
                  background: `linear-gradient(90deg, ${ROSE}, rgba(251,113,133,0.7))`,
                  boxShadow: `0 0 8px rgba(244,63,94,0.5)`,
                  transition: "width 0.12s linear",
                  borderRadius: 9999,
                }}
              />
            </div>
          </div>
        )}

        {/* Column headers */}
        {visible > 0 && (
          <div
            className="mt-3 grid grid-cols-3 gap-2 px-2 py-1.5 rounded-md"
            style={{ background: "rgba(15,20,35,0.8)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}
          >
            {["PORT", "SERVICE", "VERSION"].map((h) => (
              <span key={h} className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.4)" }}>
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Port rows */}
        {PORTS.slice(0, Math.min(visible, PORTS.length)).map((row, i) => (
          <div
            key={i}
            className="grid grid-cols-3 gap-2 rounded px-2 py-1.5"
            style={{ background: row.flag ? "rgba(244,63,94,0.06)" : "transparent" }}
          >
            <span
              className="font-mono text-[11px] font-medium tabular-nums"
              style={{ color: row.flag ? ROSE : "rgba(96,165,250,0.85)" }}
            >
              {row.port}
            </span>
            <span className="font-mono text-[11px]" style={{ color: "rgba(167,139,250,0.75)" }}>
              {row.svc}
            </span>
            <span className="font-mono text-[10px]" style={{ color: row.flag ? "rgba(251,113,133,0.75)" : "rgba(148,163,184,0.55)" }}>
              {row.version}
              {row.flag && (
                <span className="ml-1.5 font-bold" style={{ color: ROSE }}>⚠</span>
              )}
            </span>
          </div>
        ))}

        {/* Done line */}
        {visible >= PORTS.length && (
          <div className="mt-2 flex items-center gap-2">
            <span style={{ color: GREEN }} className="font-mono text-[10px]">✓</span>
            <span className="font-mono text-[10px]" style={{ color: "rgba(148,163,184,0.45)" }}>
              Nmap done — 5 open ports on 188.166.92.14 · 2 flagged
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
