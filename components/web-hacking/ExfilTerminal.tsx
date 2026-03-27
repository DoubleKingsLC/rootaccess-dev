"use client";

import React from "react";

type ExfilTerminalProps = {
  localProgress: number;
};

const ROSE = "#f43f5e";

// Command types from local 0.06 to 0.22
const CMD = `curl -sH "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9..." https://admin.nexuspay.io/api/v1/users`;
const cmdTyped = (lp: number): string => {
  if (lp < 0.06) return "";
  const t = Math.min((lp - 0.06) / 0.16, 1);
  return CMD.slice(0, Math.round(t * CMD.length));
};

// JSON records stream in from local 0.24
const RECORDS = [
  `{"id":1,"email":"admin@nexuspay.io","name":"System Admin","card":"4*** **** **** 0012","bal":"£94,210"}`,
  `{"id":2,"email":"ops@nexuspay.io","name":"Ops User","card":"5*** **** **** 4421","bal":"£12,050"}`,
  `{"id":3,"email":"j.harrison@nexuspay.io","name":"J. Harrison","card":"4*** **** **** 7731","bal":"£4,200"}`,
  `{"id":4,"email":"m.chen@nexuspay.io","name":"M. Chen","card":"4*** **** **** 9912","bal":"£6,800"}`,
  `{"id":5,"email":"a.silva@nexuspay.io","name":"A. Silva","card":"5*** **** **** 3301","bal":"£2,140"}`,
  `{"id":6,"email":"k.osei@nexuspay.io","name":"K. Osei","card":"4*** **** **** 5512","bal":"£8,900"}`,
  `{"id":7,...}  // +14,199,993 records`,
];

const linesVisible = (lp: number): number => {
  if (lp < 0.24) return 0;
  return Math.floor(((lp - 0.24) / 0.62) * (RECORDS.length + 1));
};

export const ExfilTerminal: React.FC<ExfilTerminalProps> = ({ localProgress }) => {
  const lp    = localProgress;
  const cmd   = cmdTyped(lp);
  const lines = linesVisible(lp);
  const streaming = lines > 0;

  return (
    <div
      className="flex flex-col overflow-hidden rounded-xl"
      style={{
        background: "rgba(6,9,18,0.97)",
        border: "1px solid rgba(244,63,94,0.18)",
        boxShadow: "0 0 32px rgba(0,0,0,0.5)",
        fontFamily: "monospace",
        flex: 1,
        minWidth: 0,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-2.5"
        style={{ background: "rgba(15,20,35,0.98)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <div key={i} className="h-2.5 w-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="ml-2 font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.5)" }}>
            bash · exfil session
          </span>
        </div>
        {streaming && (
          <div className="flex items-center gap-1.5">
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.8)", boxShadow: "0 0 5px rgba(34,197,94,0.5)", animation: "pulse 1s infinite" }}
            />
            <span className="font-mono text-[9px]" style={{ color: "rgba(34,197,94,0.7)" }}>
              200 OK · streaming
            </span>
          </div>
        )}
      </div>

      {/* Terminal body */}
      <div className="flex flex-col gap-1 px-4 py-3" style={{ minHeight: 190 }}>
        {/* Prompt + command */}
        <div className="flex items-start gap-2">
          <span className="mt-0.5 shrink-0 font-mono text-[10px]" style={{ color: "rgba(34,197,94,0.8)" }}>$</span>
          <span className="font-mono text-[10px] leading-relaxed break-all" style={{ color: "rgba(226,232,240,0.8)" }}>
            {cmd}
            {cmd.length > 0 && cmd.length < CMD.length && (
              <span
                className="ml-0.5 inline-block w-px"
                style={{ background: ROSE, height: "12px", verticalAlign: "middle", animation: "pulse 1s steps(1) infinite" }}
              />
            )}
          </span>
        </div>

        {/* JSON flood */}
        {RECORDS.slice(0, Math.min(lines, RECORDS.length)).map((rec, i) => (
          <div
            key={i}
            className="font-mono text-[9px] leading-snug truncate"
            style={{ color: i < 2 ? "rgba(244,63,94,0.75)" : "rgba(148,163,184,0.45)" }}
          >
            {rec}
          </div>
        ))}

        {/* Blinking cursor while streaming */}
        {streaming && lines <= RECORDS.length && (
          <span
            className="inline-block w-1.5"
            style={{ height: "11px", background: ROSE, verticalAlign: "middle", animation: "pulse 0.8s steps(1) infinite" }}
          />
        )}
      </div>
    </div>
  );
};
