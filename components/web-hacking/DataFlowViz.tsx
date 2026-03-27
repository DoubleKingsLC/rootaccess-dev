"use client";

import React from "react";

type DataFlowVizProps = {
  localProgress: number;
};

const ROSE = "#f43f5e";

function cubicBezier(
  t: number,
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  p3: [number, number]
): [number, number] {
  const mt = 1 - t;
  const x = mt*mt*mt*p0[0] + 3*mt*mt*t*p1[0] + 3*mt*t*t*p2[0] + t*t*t*p3[0];
  const y = mt*mt*mt*p0[1] + 3*mt*mt*t*p1[1] + 3*mt*t*t*p2[1] + t*t*t*p3[1];
  return [x, y];
}

type PacketDef = {
  offset: number;
  label: string;
  color: string;
  path: [[number,number],[number,number],[number,number],[number,number]];
};

const PACKET_DEFS: PacketDef[] = [
  { offset: 0.00, label: "email",  color: ROSE,                    path: [[112,108],[350,42],[650,42],[888,108]] },
  { offset: 0.13, label: "card#",  color: "#f87171",               path: [[112,118],[350,178],[650,178],[888,118]] },
  { offset: 0.26, label: "PII",    color: ROSE,                    path: [[112,104],[400,48],[600,48],[888,104]] },
  { offset: 0.39, label: "£ bal",  color: "rgba(251,191,36,0.95)", path: [[112,120],[400,172],[600,172],[888,120]] },
  { offset: 0.52, label: "email",  color: ROSE,                    path: [[112,108],[300,62],[700,72],[888,108]] },
  { offset: 0.65, label: "card#",  color: "#f87171",               path: [[112,118],[300,152],[700,148],[888,118]] },
];

export const DataFlowViz: React.FC<DataFlowVizProps> = ({ localProgress }) => {
  const lp = localProgress;

  // DB glow pulses once packets are in flight
  const glowOpacity = lp > 0.12 ? Math.min((lp - 0.12) / 0.10, 1) * 0.08 : 0;

  return (
    <svg
      viewBox="0 0 1000 220"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: "100%", height: "auto", overflow: "visible" }}
    >
      {/* ── Faint guide paths ──────────────────────────────────────── */}
      {PACKET_DEFS.map((pkt, i) => {
        const [p0, p1, p2, p3] = pkt.path;
        return (
          <path
            key={`guide-${i}`}
            d={`M${p0[0]},${p0[1]} C${p1[0]},${p1[1]} ${p2[0]},${p2[1]} ${p3[0]},${p3[1]}`}
            fill="none"
            stroke="rgba(244,63,94,0.07)"
            strokeWidth="1"
            strokeDasharray="4 7"
          />
        );
      })}

      {/* ── Database cylinder (left) ───────────────────────────────── */}
      {/* Glow halo */}
      <ellipse cx="80" cy="113" rx="52" ry="46"
        fill={`rgba(244,63,94,${glowOpacity})`}
      />
      {/* Cylinder body fill */}
      <rect x="45" y="88" width="70" height="52" fill="rgba(12,18,34,0.96)" />
      {/* Side strokes */}
      <line x1="45" y1="88" x2="45" y2="140" stroke="rgba(244,63,94,0.32)" strokeWidth="1.5" />
      <line x1="115" y1="88" x2="115" y2="140" stroke="rgba(244,63,94,0.32)" strokeWidth="1.5" />
      {/* Bottom ellipse */}
      <ellipse cx="80" cy="140" rx="35" ry="13"
        fill="rgba(18,26,48,0.96)" stroke="rgba(244,63,94,0.32)" strokeWidth="1.5" />
      {/* Internal stripe lines */}
      <ellipse cx="80" cy="106" rx="22" ry="7"
        fill="none" stroke="rgba(244,63,94,0.15)" strokeWidth="1" />
      <ellipse cx="80" cy="120" rx="22" ry="7"
        fill="none" stroke="rgba(244,63,94,0.15)" strokeWidth="1" />
      {/* Top lid — slightly raised when exfil is active */}
      <ellipse
        cx="80"
        cy={lp > 0.12 ? 85 : 88}
        rx="35" ry="13"
        fill="rgba(18,26,48,0.97)"
        stroke={lp > 0.12 ? "rgba(244,63,94,0.65)" : "rgba(244,63,94,0.40)"}
        strokeWidth="1.5"
        style={{ transition: "cy 0.3s" }}
      />
      {/* Label */}
      <text x="80" y="170" textAnchor="middle" fontFamily="monospace" fontSize="9"
        fill="rgba(244,63,94,0.45)" letterSpacing="2">DB</text>
      <text x="80" y="181" textAnchor="middle" fontFamily="monospace" fontSize="8"
        fill="rgba(148,163,184,0.28)" letterSpacing="1">nexusdb</text>

      {/* ── Attacker server / destination (right) ─────────────────── */}
      <g transform="translate(866, 86)">
        {/* Monitor bezel */}
        <rect x="0" y="0" width="54" height="44" rx="4"
          fill="rgba(12,18,34,0.97)" stroke="rgba(96,165,250,0.28)" strokeWidth="1.5" />
        {/* Screen */}
        <rect x="5" y="5" width="44" height="28" rx="2" fill="rgba(6,9,18,0.92)" />
        {/* Terminal lines on screen */}
        <line x1="9" y1="13" x2="35" y2="13" stroke="rgba(34,197,94,0.4)" strokeWidth="1.2" />
        <line x1="9" y1="20" x2="28" y2="20" stroke="rgba(96,165,250,0.3)" strokeWidth="1.2" />
        <line x1="9" y1="27" x2="40" y2="27" stroke="rgba(96,165,250,0.25)" strokeWidth="1.2" />
        {/* Stand */}
        <line x1="27" y1="44" x2="27" y2="52" stroke="rgba(96,165,250,0.2)" strokeWidth="2" />
        <line x1="18" y1="52" x2="36" y2="52" stroke="rgba(96,165,250,0.2)" strokeWidth="1.5" />
        {/* Label */}
        <text x="27" y="66" textAnchor="middle" fontFamily="monospace" fontSize="8"
          fill="rgba(96,165,250,0.4)" letterSpacing="1">attacker</text>
      </g>

      {/* ── Animated data packets ─────────────────────────────────── */}
      {PACKET_DEFS.map((pkt, i) => {
        const t = Math.max(0, Math.min(1,
          (lp - 0.12 - pkt.offset * 0.55) / 0.30
        ));
        if (t === 0) return null;

        const [px, py] = cubicBezier(t, pkt.path[0], pkt.path[1], pkt.path[2], pkt.path[3]);
        const opacity = t < 0.08
          ? t / 0.08
          : t > 0.92
            ? (1 - t) / 0.08
            : 1;

        return (
          <g key={`pkt-${i}`} transform={`translate(${px}, ${py})`} style={{ opacity }}>
            {/* Outer glow */}
            <rect x="-21" y="-10" width="42" height="20" rx="4"
              fill="none" stroke={pkt.color} strokeWidth="5" strokeOpacity="0.07" />
            {/* Packet body */}
            <rect x="-19" y="-8" width="38" height="16" rx="3"
              fill="rgba(6,9,18,0.93)" stroke={pkt.color} strokeWidth="1" />
            {/* Label */}
            <text x="0" y="4.5" textAnchor="middle" fontFamily="monospace" fontSize="7.5"
              fill={pkt.color} fontWeight="700" letterSpacing="0.5">
              {pkt.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
