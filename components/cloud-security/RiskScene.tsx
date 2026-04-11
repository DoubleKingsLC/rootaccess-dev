"use client";

import React from "react";
import {
  CF_C, CF_GLOW, S3_GREEN, S3_GREEN_GL, BLUE, AMBER, AMBER_GLOW,
  USER, CF, BUCKET, T,
  ramp, VpcBoundary, UserIcon, CloudFrontIcon, S3Icon, CloudKeyframes,
} from "./cloudShared";

const IN = 0.20, OUT = 0.38;
const sceneOp = (p: number) => {
  if (p < IN)          return 0;
  if (p < IN + 0.015)  return (p - IN) / 0.015;
  if (p < OUT - 0.015) return 1;
  if (p < OUT)         return 1 - (p - (OUT - 0.015)) / 0.015;
  return 0;
};

// ── Key geometry ──────────────────────────────────────────────────────────────
// Horizontal positions — all nodes at y=300
const U_RIGHT  = USER.x + T;
const WA_LEFT  = CF.x   - T;
const WA_RIGHT = CF.x   + T;
const BK_LEFT  = BUCKET.x - T;

const LINE1_LEN = WA_LEFT  - U_RIGHT;   // User → WebApp
const LINE2_LEN = BK_LEFT  - WA_RIGHT;  // WebApp → Bucket

// Mid x of each connection
const MID1_X = (U_RIGHT + WA_LEFT)  / 2;
const MID2_X = (WA_RIGHT + BK_LEFT) / 2;
const MID_Y  = USER.y; // all on same y

// Bypass arc: User curves ABOVE to reach Bucket directly (the dangerous path)
const BYPASS_PATH = `M${U_RIGHT},${USER.y} C${USER.x + 180},${USER.y - 160} ${BUCKET.x - 180},${BUCKET.y - 160} ${BK_LEFT},${BUCKET.y}`;

// Small file doc icon floating above bucket
function FileIcon({ x, y, name, opacity }: { x: number; y: number; name: string; opacity: number }) {
  return (
    <g transform={`translate(${x},${y})`} style={{ opacity }}>
      <rect x={-19} y={-15} width={38} height={30} rx={3}
        fill="rgba(34,197,94,0.1)" stroke={S3_GREEN} strokeWidth={0.8} strokeOpacity={0.5} />
      <path d="M11,-15 L19,-7 L19,-15 Z" fill={S3_GREEN} fillOpacity={0.28} />
      <path d="M11,-15 L11,-7 L19,-7" fill="none" stroke={S3_GREEN} strokeWidth={0.7} strokeOpacity={0.4} />
      <text x={0} y={7} textAnchor="middle" fontSize={5.5} fontFamily="monospace"
        fill={S3_GREEN} opacity={0.82}>{name}</text>
    </g>
  );
}

export const RiskScene: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = sceneOp(progress);
  if (opacity === 0) return null;

  const lp = ramp(progress, IN, OUT - IN);

  // ── Scene text cards ──────────────────────────────────────────────────────────
  // 1. "What happens when public access is allowed on a bucket?"
  const quoteIn    = ramp(lp, 0.00, 0.08);
  const quoteOut   = ramp(lp, 0.08, 0.10);
  const quoteOp    = quoteIn * (1 - quoteOut);

  // 2. "Normal User Interaction" — appears briefly before infra builds
  const normalLabelIn  = ramp(lp, 0.16, 0.08);
  const normalLabelOut = ramp(lp, 0.28, 0.10);
  const normalLabelOp  = normalLabelIn * (1 - normalLabelOut);

  // ── Normal-path infrastructure ─────────────────────────────────────────────
  const userOp   = ramp(lp, 0.20, 0.14);
  const line1P   = ramp(lp, 0.26, 0.12);
  const webappOp = ramp(lp, 0.30, 0.14);
  const line2P   = ramp(lp, 0.38, 0.12);
  const filterOp = ramp(lp, 0.45, 0.12);
  const bucketOp = ramp(lp, 0.36, 0.14);
  const filesOp  = ramp(lp, 0.49, 0.12);
  const vpcOp    = ramp(lp, 0.34, 0.12);

  // Context pill: normal users — fades before infra clears
  const normalCtxIn  = ramp(lp, 0.48, 0.08);
  const normalCtxOut = ramp(lp, 0.55, 0.07);
  const normalCtxOp  = normalCtxIn * (1 - normalCtxOut);

  // Infra fades out to clear the screen before attacker label
  const infraOut = ramp(lp, 0.55, 0.08);   // fully gone by lp 0.63
  const infraVis = 1 - infraOut;

  // Packet flow along normal path — stop before fade-out
  const packetsOn = line2P > 0.85 && infraVis > 0.05;

  // 3. "Attacker Notices the Bug" — appears on empty screen after infra clears
  const attackLabelIn  = ramp(lp, 0.65, 0.08);
  const attackLabelOut = ramp(lp, 0.76, 0.08);
  const attackLabelOp  = attackLabelIn * (1 - attackLabelOut);

  // ── Attacker path — starts only after label has faded ─────────────────────
  const bypassP   = ramp(lp, 0.82, 0.14);
  const warnOp    = ramp(lp, 0.88, 0.10);
  const captionOp = ramp(lp, 0.91, 0.08);
  const attackCtxOp = ramp(lp, 0.84, 0.10);

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <CloudKeyframes />

      {/* ── Context pill: normal user phase ── */}
      {normalCtxOp > 0.01 && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2.5 px-5 py-2"
          style={{
            opacity: normalCtxOp,
            background: "rgba(139,92,246,0.08)",
            border: "1px solid rgba(139,92,246,0.25)",
            borderRadius: 999,
            backdropFilter: "blur(8px)",
          }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#8b5cf6", display: "inline-block" }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "rgba(196,181,253,0.9)" }}>
            Normal users access files through the web application
          </span>
        </div>
      )}

      {/* ── Context pill: attacker phase ── */}
      {attackCtxOp > 0.01 && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2.5 px-5 py-2"
          style={{
            opacity: attackCtxOp,
            background: "rgba(245,158,11,0.08)",
            border: "1px solid rgba(245,158,11,0.3)",
            borderRadius: 999,
            backdropFilter: "blur(8px)",
          }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f59e0b", display: "inline-block", animation: "cs-pulse 1.2s ease-in-out infinite" }} />
          <span className="font-mono text-xs tracking-widest uppercase" style={{ color: "rgba(252,211,77,0.9)" }}>
            An attacker can skip the web app — S3 is publicly reachable
          </span>
        </div>
      )}

      {/* ── Text 1: Opening question ── */}
      {quoteOp > 0.01 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: quoteOp }}>
          <div className="flex flex-col items-center gap-5 text-center px-8">
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)" }} />
            <p className="font-sans text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-snug"
              style={{ color: "rgba(255,255,255,0.92)" }}>
              What happens when public access<br />
              <span style={{ color: "#f59e0b" }}>is allowed on a bucket?</span>
            </p>
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)" }} />
          </div>
        </div>
      )}

      {/* ── Text 2: Normal User Interaction ── */}
      {normalLabelOp > 0.01 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: normalLabelOp }}>
          <div className="flex flex-col items-center gap-4 text-center px-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)" }} />
            <p className="font-mono text-[10px] uppercase tracking-[0.55em]"
              style={{ color: "rgba(168,85,247,0.65)" }}>Part 01</p>
            <p className="font-sans text-3xl font-semibold tracking-tight"
              style={{ color: "rgba(255,255,255,0.92)" }}>
              Normal User Interaction
            </p>
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)" }} />
          </div>
        </div>
      )}

      {/* ── Text 3: Attacker Notices the Bug ── */}
      {attackLabelOp > 0.01 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: attackLabelOp }}>
          <div className="flex flex-col items-center gap-4 text-center px-8">
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)" }} />
            <p className="font-mono text-[10px] uppercase tracking-[0.55em]"
              style={{ color: "rgba(245,158,11,0.65)" }}>Part 02</p>
            <p className="font-sans text-3xl font-semibold tracking-tight"
              style={{ color: "rgba(255,255,255,0.92)" }}>
              Attacker Notices the Bug
            </p>
            <div className="h-px w-16" style={{ background: "linear-gradient(to right, transparent, rgba(245,158,11,0.5), transparent)" }} />
          </div>
        </div>
      )}

      <svg viewBox="0 0 1100 600" className="absolute inset-0 w-full h-full">

        {/* ── Normal-path elements — fades out before attacker label ── */}
        <g style={{ opacity: infraVis }}>
          <VpcBoundary color={S3_GREEN} opacity={vpcOp}
            x1={BUCKET.x - 108} y1={BUCKET.y - 112}
            x2={BUCKET.x + 108} y2={BUCKET.y + 112}
            label="VPC · Private" />

          <line
            x1={U_RIGHT} y1={MID_Y} x2={WA_LEFT} y2={MID_Y}
            stroke={BLUE} strokeWidth={2} opacity={0.55}
            strokeDasharray={LINE1_LEN} strokeDashoffset={LINE1_LEN * (1 - line1P)}
          />
          <line
            x1={WA_RIGHT} y1={MID_Y} x2={BK_LEFT} y2={MID_Y}
            stroke={CF_C} strokeWidth={2} opacity={0.55}
            strokeDasharray={LINE2_LEN} strokeDashoffset={LINE2_LEN * (1 - line2P)}
          />

          {filterOp > 0.1 && (
            <g style={{ opacity: filterOp }}>
              <polygon
                points={`${MID2_X - 8},${MID_Y - 18} ${MID2_X + 8},${MID_Y - 18} ${MID2_X + 3},${MID_Y - 10} ${MID2_X + 3},${MID_Y - 5} ${MID2_X - 3},${MID_Y - 5} ${MID2_X - 3},${MID_Y - 10}`}
                fill={CF_C} fillOpacity={0.85}
              />
              <rect x={MID2_X - 40} y={MID_Y - 36} width={80} height={15} rx={4}
                fill="rgba(7,9,15,0.92)" stroke={`${CF_C}50`} strokeWidth={0.8} />
              <text x={MID2_X} y={MID_Y - 26} textAnchor="middle" fontSize={8}
                fontFamily="monospace" fill={CF_C} opacity={0.95}>Input Filtering</text>
              {[0, 1, 2].map(i => (
                <line key={i}
                  x1={WA_RIGHT + 28 + i * 28} y1={MID_Y - 6}
                  x2={WA_RIGHT + 28 + i * 28} y2={MID_Y + 6}
                  stroke={CF_C} strokeWidth={1} opacity={0.4} />
              ))}
            </g>
          )}

          {packetsOn && [0, 1, 2].map(i => (
            <circle key={i} r={3.5} fill={S3_GREEN}
              style={{ filter: `drop-shadow(0 0 5px ${S3_GREEN_GL})` }}>
              <animateMotion
                path={`M${U_RIGHT},${MID_Y} L${WA_LEFT},${MID_Y} L${WA_RIGHT},${MID_Y} L${BK_LEFT},${MID_Y}`}
                dur="3.2s" repeatCount="indefinite" begin={`${i * 1.06}s`} />
            </circle>
          ))}

          <g transform={`translate(${USER.x},${USER.y}) scale(${0.55 + 0.45 * userOp})`}
            style={{ opacity: userOp }}>
            <UserIcon color={BLUE} />
          </g>
          {userOp > 0.3 && (
            <text x={USER.x} y={USER.y + T + 17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={BLUE} opacity={0.75 * userOp}>User</text>
          )}

          <g transform={`translate(${CF.x},${CF.y}) scale(${0.55 + 0.45 * webappOp})`}
            style={{ opacity: webappOp }}>
            <CloudFrontIcon />
          </g>
          {webappOp > 0.3 && (
            <>
              <text x={CF.x} y={CF.y + T + 17} textAnchor="middle" fontSize={9.5}
                fontFamily="monospace" fill={CF_C} opacity={0.82 * webappOp}>Web Application</text>
              <text x={CF.x} y={CF.y + T + 29} textAnchor="middle" fontSize={7.5}
                fontFamily="monospace" fill={CF_C} opacity={0.42 * webappOp}>Controlled Access</text>
            </>
          )}

          <g transform={`translate(${BUCKET.x},${BUCKET.y}) scale(${0.55 + 0.45 * bucketOp})`}
            style={{ opacity: bucketOp }}>
            <S3Icon color={S3_GREEN} lockP={0} />
          </g>
          {bucketOp > 0.3 && (
            <>
              <text x={BUCKET.x} y={BUCKET.y + T + 17} textAnchor="middle" fontSize={9.5}
                fontFamily="monospace" fill={S3_GREEN} opacity={0.82 * bucketOp}>S3 Bucket</text>
              <text x={BUCKET.x} y={BUCKET.y + T + 29} textAnchor="middle" fontSize={7.5}
                fontFamily="monospace" fill={S3_GREEN} opacity={0.42 * bucketOp}>prod-company-assets</text>
            </>
          )}

          <FileIcon x={BUCKET.x - 72} y={BUCKET.y - 82} name="api_keys.env"  opacity={filesOp} />
          <FileIcon x={BUCKET.x}      y={BUCKET.y - 96} name="config.json"   opacity={filesOp * 0.9} />
          <FileIcon x={BUCKET.x + 72} y={BUCKET.y - 80} name="employees.csv" opacity={filesOp * 0.8} />
        </g>

        {/* ── Attacker path — only after label fades out ── */}
        {bypassP > 0.02 && (
          <>
            <path d={BYPASS_PATH} stroke={AMBER} strokeWidth={8} fill="none"
              opacity={0.07 * bypassP} />
            <path d={BYPASS_PATH} stroke={AMBER} strokeWidth={2} fill="none"
              strokeDasharray="10 7" opacity={0.7 * bypassP}
              style={{ animation: bypassP > 0.8 ? "cs-flow 2s linear infinite" : undefined }}
            />
          </>
        )}

        {warnOp > 0.1 && (
          <g style={{ opacity: warnOp }}>
            <rect x={(U_RIGHT + BK_LEFT) / 2 - 56} y={USER.y - 172} width={112} height={16} rx={4}
              fill="rgba(7,9,15,0.92)" stroke={`${AMBER}55`} strokeWidth={0.8} />
            <text x={(U_RIGHT + BK_LEFT) / 2} y={USER.y - 161}
              textAnchor="middle" fontSize={8} fontFamily="monospace" fill={AMBER} opacity={0.95}>
              ⚠ Direct Access · No Auth
            </text>
          </g>
        )}

        {/* Attacker-phase nodes (re-appear with new context) */}
        {bypassP > 0.02 && (
          <>
            <g transform={`translate(${USER.x},${USER.y})`} style={{ opacity: bypassP }}>
              <UserIcon color={AMBER} />
            </g>
            <text x={USER.x} y={USER.y + T + 17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={AMBER} opacity={0.75 * bypassP}>Attacker</text>

            <g transform={`translate(${BUCKET.x},${BUCKET.y})`} style={{ opacity: bypassP }}>
              <S3Icon color={S3_GREEN} lockP={0} />
            </g>
            <text x={BUCKET.x} y={BUCKET.y + T + 17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={S3_GREEN} opacity={0.82 * bypassP}>S3 Bucket</text>
            <text x={BUCKET.x} y={BUCKET.y + T + 29} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={S3_GREEN} opacity={0.42 * bypassP}>prod-company-assets</text>

            <circle cx={BUCKET.x} cy={BUCKET.y}
              r={42} stroke={AMBER} strokeWidth={1.2} fill="none"
              opacity={0.28 * bypassP}
              style={{ animation: "cs-pulse 1.8s ease-in-out infinite" }} />
          </>
        )}

        <text x={22} y={592} fontFamily="monospace" fontSize={9}
          fill="rgba(148,163,184,0.85)" opacity={captionOp}>SCENE 02 · EXPOSURE</text>
      </svg>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-center z-10"
        style={{ opacity: captionOp }}>
        <p className="font-mono text-xs uppercase tracking-[0.32em]" style={{ color: AMBER }}>
          Publicly Reachable
        </p>
        <p className="max-w-md font-sans text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.85)" }}>
          Normally requests go through the Web Application. With public access on, anyone can skip it entirely.
        </p>
      </div>
    </div>
  );
};
