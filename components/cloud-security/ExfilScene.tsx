"use client";

import React from "react";
import {
  CF_C, S3_RED, S3_RED_GL, BLUE, VIOLET,
  USER, CF, BUCKET, T,
  ramp, VpcBoundary, UserIcon, CloudFrontIcon, S3Icon, CloudKeyframes,
} from "./cloudShared";

const IN = 0.38, OUT = 0.57;
const sceneOp = (p: number) => {
  if (p < IN)          return 0;
  if (p < IN + 0.015)  return (p - IN) / 0.015;
  if (p < OUT - 0.015) return 1;
  if (p < OUT)         return 1 - (p - (OUT - 0.015)) / 0.015;
  return 0;
};

const FILES = [
  { name: "api_keys.env" },
  { name: "db_passwords.txt" },
  { name: "employees.csv" },
  { name: "config.json" },
  { name: "secrets.yaml" },
];

const U_RIGHT  = USER.x + T;
const WA_LEFT  = CF.x   - T;
const WA_RIGHT = CF.x   + T;
const BK_LEFT  = BUCKET.x - T;

// The direct bypass arc: User → S3, curving above WebApp
const BYPASS_PATH = `M${U_RIGHT},${USER.y} C${USER.x + 180},${USER.y - 160} ${BUCKET.x - 180},${BUCKET.y - 160} ${BK_LEFT},${BUCKET.y}`;

export const ExfilScene: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = sceneOp(progress);
  if (opacity === 0) return null;

  const lp = ramp(progress, IN, OUT - IN);

  const userRedP   = ramp(lp, 0.00, 0.28);   // user turns red
  const bypassP    = ramp(lp, 0.18, 0.22);   // bypass arc draws in
  const labelOp    = ramp(lp, 0.30, 0.16);   // "Unfiltered Requests" label
  const crackP     = ramp(lp, 0.28, 0.24);   // bucket cracks
  const streamP    = ramp(lp, 0.36, 0.22);   // heavy data stream
  const particlesP = ramp(lp, 0.46, 0.20);   // file particles
  const counterP   = ramp(lp, 0.48, 0.45);   // counter ticks
  const logP       = ramp(lp, 0.55, 0.28);
  const captionOp  = ramp(lp, 0.74, 0.16);

  const filesCount  = Math.floor(counterP * FILES.length);
  const currentFile = FILES[Math.min(filesCount, FILES.length - 1)];

  // Interpolated user color: violet → red
  const userR = Math.round(139 + (239 - 139) * userRedP);
  const userG = Math.round(92  + (68  - 92)  * userRedP);
  const userB = Math.round(246 + (68  - 246) * userRedP);
  const userColor = `rgb(${userR},${userG},${userB})`;

  const bucketColor = crackP > 0.5 ? S3_RED : `rgb(${Math.round(34 + (239 - 34) * crackP)},${Math.round(197 - 197 * crackP * 1.2)},${Math.round(94 - 94 * crackP * 1.2)})`;

  // URL being typed
  const urlFull  = `https://prod-company-assets.s3.amazonaws.com/${currentFile.name}`;
  const urlTyped = urlFull.slice(0, Math.floor(counterP * urlFull.length));

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <CloudKeyframes />
      <style>{`@keyframes exfil-pulse { 0%,100%{opacity:0.22} 50%{opacity:0.6} }`}</style>

      <svg viewBox="0 0 1100 600" className="absolute inset-0 w-full h-full">

        {/* VPC — cracking */}
        <VpcBoundary
          color={crackP > 0.5 ? S3_RED : "#f59e0b"} opacity={0.5}
          x1={BUCKET.x - 108} y1={BUCKET.y - 112}
          x2={BUCKET.x + 108} y2={BUCKET.y + 112}
          label={crackP > 0.55 ? "⚠ BREACHED" : "VPC · Private"}
        />

        {/* ── Ghost normal path lines (dimmed) ── */}
        <line x1={U_RIGHT} y1={USER.y} x2={WA_LEFT} y2={CF.y}
          stroke="rgba(148,163,184,0.15)" strokeWidth={1.5} strokeDasharray="6 5" />
        <line x1={WA_RIGHT} y1={CF.y} x2={BK_LEFT} y2={BUCKET.y}
          stroke="rgba(148,163,184,0.15)" strokeWidth={1.5} strokeDasharray="6 5" />

        {/* Ghost "Input Filtering" label — struck through */}
        <g style={{ opacity: 0.22 }}>
          <rect x={(WA_RIGHT + BK_LEFT) / 2 - 40} y={CF.y - 28} width={80} height={15} rx={4}
            fill="rgba(7,9,15,0.7)" stroke="rgba(148,163,184,0.2)" strokeWidth={0.7} />
          <text x={(WA_RIGHT + BK_LEFT) / 2} y={CF.y - 18} textAnchor="middle" fontSize={8}
            fontFamily="monospace" fill="rgba(148,163,184,0.5)">Input Filtering</text>
          {/* Strike-through */}
          <line x1={(WA_RIGHT + BK_LEFT) / 2 - 38} y1={CF.y - 20}
                x2={(WA_RIGHT + BK_LEFT) / 2 + 38} y2={CF.y - 20}
                stroke={S3_RED} strokeWidth={1.5} opacity={0.6} />
        </g>

        {/* ── Bypass arc: User → S3 directly ── */}
        {bypassP > 0.02 && (
          <>
            {/* Glow halo */}
            <path d={BYPASS_PATH} stroke={S3_RED} strokeWidth={14} fill="none"
              opacity={0.07 * bypassP} />
            {/* Main stream */}
            <path d={BYPASS_PATH} stroke={S3_RED} strokeWidth={3.5} fill="none"
              opacity={0.88 * bypassP}
              style={{ filter: `drop-shadow(0 0 8px ${S3_RED_GL})` }}
              strokeDasharray={800} strokeDashoffset={800 * (1 - bypassP)}
            />
            {/* Animated dashes on stream */}
            {bypassP > 0.7 && (
              <path d={BYPASS_PATH} stroke="#fbbf24" strokeWidth={1.5} fill="none"
                opacity={0.5} strokeDasharray="14 18"
                style={{ animation: "cs-flow 0.85s linear infinite" }} />
            )}
          </>
        )}

        {/* "Unfiltered Requests" label on bypass arc */}
        {labelOp > 0.1 && (
          <g style={{ opacity: labelOp }}>
            <rect x={(U_RIGHT + BK_LEFT) / 2 - 62} y={USER.y - 175} width={124} height={16} rx={4}
              fill="rgba(7,9,15,0.94)" stroke={`${S3_RED}55`} strokeWidth={0.9} />
            <text x={(U_RIGHT + BK_LEFT) / 2} y={USER.y - 164}
              textAnchor="middle" fontSize={8} fontFamily="monospace" fill={S3_RED} opacity={0.95}>
              ⚠ Unfiltered Requests · No Auth
            </text>
          </g>
        )}

        {/* ── Flying file particles along bypass arc ── */}
        {particlesP > 0.1 && FILES.map((f, i) => (
          <g key={f.name} style={{ opacity: Math.min(1, particlesP * 2.5) }}>
            <rect x={-24} y={-11} width={48} height={22} rx={3}
              fill="rgba(239,68,68,0.15)" stroke={S3_RED} strokeWidth={0.8} strokeOpacity={0.7}>
              <animateMotion path={BYPASS_PATH} dur={`${1.5 + i * 0.22}s`}
                repeatCount="indefinite" begin={`${i * 0.3}s`} />
            </rect>
            <text textAnchor="middle" y={4} fontSize={6} fontFamily="monospace"
              fill={S3_RED} opacity={0.9}>
              <animateMotion path={BYPASS_PATH} dur={`${1.5 + i * 0.22}s`}
                repeatCount="indefinite" begin={`${i * 0.3}s`} />
              {f.name}
            </text>
          </g>
        ))}

        {/* ── User — turns red ── */}
        <g transform={`translate(${USER.x},${USER.y})`} style={{ opacity: 0.96 }}>
          <UserIcon color={userColor} />
        </g>
        <text x={USER.x} y={USER.y + T + 17} textAnchor="middle" fontSize={9.5}
          fontFamily="monospace"
          fill={userRedP > 0.6 ? S3_RED : VIOLET} opacity={0.85}>
          {userRedP > 0.6 ? "Attacker" : "User"}
        </text>
        {/* Red pulse ring when user turns red */}
        {userRedP > 0.5 && (
          <circle cx={USER.x} cy={USER.y} r={36}
            stroke={S3_RED} strokeWidth={1.2} fill="none"
            opacity={0.3 * userRedP}
            style={{ animation: "exfil-pulse 1.4s ease-in-out infinite" }} />
        )}

        {/* ── WebApp — ghosted (bypassed) ── */}
        <g transform={`translate(${CF.x},${CF.y})`} style={{ opacity: 0.22 }}>
          <CloudFrontIcon />
        </g>
        <text x={CF.x} y={CF.y + T + 17} textAnchor="middle" fontSize={9}
          fontFamily="monospace" fill={CF_C} opacity={0.22}>Web Application</text>
        {/* "Bypassed" label */}
        {bypassP > 0.5 && (
          <g style={{ opacity: Math.min(1, (bypassP - 0.5) * 4) }}>
            <rect x={CF.x - 28} y={CF.y + T + 22} width={56} height={13} rx={3}
              fill="rgba(239,68,68,0.12)" stroke={`${S3_RED}40`} strokeWidth={0.7} />
            <text x={CF.x} y={CF.y + T + 31} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={S3_RED} opacity={0.75}>Bypassed</text>
          </g>
        )}

        {/* ── S3 Bucket — cracking red ── */}
        <g transform={`translate(${BUCKET.x},${BUCKET.y})`} style={{ opacity: 0.96 }}>
          <S3Icon color={bucketColor} lockP={0} shackleRise={Math.min(1, crackP * 2)} />
          {crackP > 0.3 && (
            <>
              <path d="M-4,-27 L-8,-10 L-2,-6 L-6,10" stroke={S3_RED} strokeWidth={2}
                fill="none" strokeLinecap="round" opacity={Math.min(1, (crackP - 0.3) * 3)} />
              <path d="M6,-25 L10,-8 L4,-2 L8,12" stroke={S3_RED} strokeWidth={1.5}
                fill="none" strokeLinecap="round" opacity={Math.min(1, (crackP - 0.4) * 2.5)} />
            </>
          )}
        </g>
        <text x={BUCKET.x} y={BUCKET.y + T + 17} textAnchor="middle" fontSize={9.5}
          fontFamily="monospace" fill={crackP > 0.6 ? S3_RED : "#f59e0b"} opacity={0.9}>
          {crackP > 0.6 ? "S3 · BREACHED" : "S3 Bucket"}
        </text>
        {crackP > 0.4 && (
          <circle cx={BUCKET.x} cy={BUCKET.y} r={42} stroke={S3_RED} strokeWidth={1.5}
            fill="none" opacity={0.3}
            style={{ animation: "exfil-pulse 1.2s ease-in-out infinite" }} />
        )}

        {/* CloudTrail log */}
        {logP > 0.1 && (
          <foreignObject x={800} y={360} width={270} height={148} style={{ opacity: logP }}>
            <div style={{
              background: "rgba(7,9,15,0.95)", border: "1px solid rgba(239,68,68,0.22)",
              borderRadius: 7, padding: "9px 13px", fontFamily: "monospace",
              backdropFilter: "blur(8px)",
            }}>
              <div style={{ fontSize: 8, color: "rgba(239,68,68,0.55)", marginBottom: 6, letterSpacing: "0.08em" }}>
                ACCESS LOG · GetObject · No Auth
              </div>
              {FILES.slice(0, Math.ceil(logP * 5)).map((f, i) => (
                <div key={i} style={{ fontSize: 8, color: "#fca5a5", lineHeight: 1.7 }}>
                  <span style={{ color: "rgba(148,163,184,0.4)" }}>09:4{i + 2}:{i * 3 < 10 ? `0${i * 3}` : i * 3} </span>
                  <span style={{ color: "#fbbf24" }}>{f.name}</span>
                  <span style={{ color: "rgba(239,68,68,0.5)", marginLeft: 8 }}>200 OK</span>
                </div>
              ))}
            </div>
          </foreignObject>
        )}

        <text x={22} y={592} fontFamily="monospace" fontSize={9}
          fill="rgba(148,163,184,0.85)" opacity={captionOp}>SCENE 03 · THE BREACH</text>
      </svg>

      {/* File counter */}
      {counterP > 0.05 && (
        <div className="absolute z-10 flex flex-col items-center pointer-events-none"
          style={{ top: "12%", left: "50%", transform: "translateX(-50%)", opacity: Math.min(1, counterP * 3) }}>
          <div className="font-mono font-black text-4xl md:text-5xl tabular-nums"
            style={{ color: S3_RED, textShadow: `0 0 30px ${S3_RED_GL}, 0 0 60px ${S3_RED_GL}` }}>
            {filesCount} / {FILES.length}
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.38em] mt-1"
            style={{ color: "rgba(239,68,68,0.7)" }}>Files Exfiltrated</div>
        </div>
      )}

      {/* URL bar */}
      {counterP > 0.18 && (
        <div className="absolute z-10 pointer-events-none"
          style={{ top: "5%", left: "50%", transform: "translateX(-50%)", opacity: Math.min(1, (counterP - 0.18) * 4) }}>
          <div style={{
            background: "rgba(7,9,15,0.95)", border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 20, padding: "5px 16px", display: "flex", alignItems: "center", gap: 8,
            minWidth: 480, backdropFilter: "blur(8px)",
          }}>
            <span style={{ color: "#fbbf24", fontSize: 11 }}>⚠</span>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#fca5a5", whiteSpace: "nowrap" }}>
              {urlTyped}
              <span style={{ animation: "cs-blink 0.7s step-end infinite", color: S3_RED }}>|</span>
            </span>
            <span style={{ color: "rgba(239,68,68,0.4)", fontSize: 10, marginLeft: "auto", whiteSpace: "nowrap" }}>200 OK</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-center z-10"
        style={{ opacity: captionOp }}>
        <p className="font-mono text-xs uppercase tracking-[0.32em]" style={{ color: S3_RED }}>
          No Credentials Required
        </p>
        <p className="max-w-md font-sans text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.85)" }}>
          An attacker exploits the open bucket to exfiltrate private internal data without triggering application logs.
        </p>
      </div>
    </div>
  );
};
