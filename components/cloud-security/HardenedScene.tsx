"use client";

import React from "react";
import {
  CF_C, CF_GLOW, S3_GREEN, S3_GREEN_GL, BLUE, S3_RED,
  USER, CF, BUCKET, T,
  ramp, VpcBoundary, UserIcon, CloudFrontIcon, S3Icon, CloudKeyframes,
} from "./cloudShared";

const IN = 0.73, OUT = 0.83;
const sceneOp = (p: number) => {
  if (p < IN)          return 0;
  if (p < IN + 0.015)  return (p - IN) / 0.015;
  if (p < OUT - 0.015) return 1;
  if (p < OUT)         return 1 - (p - (OUT - 0.015)) / 0.015;
  return 0;
};

const U_RIGHT  = USER.x + T;
const WA_LEFT  = CF.x   - T;
const WA_RIGHT = CF.x   + T;
const BK_LEFT  = BUCKET.x - T;

const LINE1_LEN = WA_LEFT  - U_RIGHT;
const LINE2_LEN = BK_LEFT  - WA_RIGHT;
const MID_Y     = USER.y;
const MID1_X    = (U_RIGHT + WA_LEFT)  / 2;
const MID2_X    = (WA_RIGHT + BK_LEFT) / 2;

// Bypass arc — shown as blocked
const BYPASS_PATH = `M${U_RIGHT},${USER.y} C${USER.x + 180},${USER.y - 160} ${BUCKET.x - 180},${BUCKET.y - 160} ${BK_LEFT},${BUCKET.y}`;
const BYPASS_MID_X = (U_RIGHT + BK_LEFT) / 2;
const BYPASS_MID_Y = USER.y - 160;

export const HardenedScene: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = sceneOp(progress);
  if (opacity === 0) return null;

  const lp = ramp(progress, IN, OUT - IN);

  const userOp     = ramp(lp, 0.00, 0.18);
  const webappOp   = ramp(lp, 0.10, 0.18);
  const line1P     = ramp(lp, 0.18, 0.16);
  const bucketOp   = ramp(lp, 0.24, 0.18);
  const vpcOp      = ramp(lp, 0.24, 0.18);
  const line2P     = ramp(lp, 0.32, 0.16);
  const filterOp   = ramp(lp, 0.40, 0.16);
  const bypassOp   = ramp(lp, 0.52, 0.18);   // faded bypass arc appears
  const blockOp    = ramp(lp, 0.62, 0.18);   // block shield on bypass
  const badgesOp   = ramp(lp, 0.70, 0.18);
  const captionOp  = ramp(lp, 0.78, 0.16);

  const packetsOn  = line2P > 0.85;

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <CloudKeyframes />

      <svg viewBox="0 0 1100 600" className="absolute inset-0 w-full h-full">

        {/* VPC — green, private */}
        <VpcBoundary color={S3_GREEN} opacity={vpcOp}
          x1={BUCKET.x - 108} y1={BUCKET.y - 112}
          x2={BUCKET.x + 108} y2={BUCKET.y + 112}
          label="VPC · Private" />

        {/* ── Line 1: User → WebApp (green) ── */}
        <line
          x1={U_RIGHT} y1={MID_Y} x2={WA_LEFT} y2={MID_Y}
          stroke={S3_GREEN} strokeWidth={2.2} opacity={0.6}
          strokeDasharray={LINE1_LEN} strokeDashoffset={LINE1_LEN * (1 - line1P)}
          style={line1P > 0.9 ? { filter: `drop-shadow(0 0 5px ${S3_GREEN_GL})` } : undefined}
        />

        {/* ── Line 2: WebApp → S3 (green) ── */}
        <line
          x1={WA_RIGHT} y1={MID_Y} x2={BK_LEFT} y2={MID_Y}
          stroke={S3_GREEN} strokeWidth={2.2} opacity={0.6}
          strokeDasharray={LINE2_LEN} strokeDashoffset={LINE2_LEN * (1 - line2P)}
          style={line2P > 0.9 ? { filter: `drop-shadow(0 0 5px ${S3_GREEN_GL})` } : undefined}
        />

        {/* ── Input Filtering badge (restored) ── */}
        {filterOp > 0.1 && (
          <g style={{ opacity: filterOp }}>
            {/* Filter funnel */}
            <polygon
              points={`${MID2_X - 8},${MID_Y - 18} ${MID2_X + 8},${MID_Y - 18} ${MID2_X + 3},${MID_Y - 10} ${MID2_X + 3},${MID_Y - 5} ${MID2_X - 3},${MID_Y - 5} ${MID2_X - 3},${MID_Y - 10}`}
              fill={S3_GREEN} fillOpacity={0.85}
            />
            <rect x={MID2_X - 44} y={MID_Y - 36} width={88} height={15} rx={4}
              fill="rgba(7,9,15,0.92)" stroke={`${S3_GREEN}50`} strokeWidth={0.8} />
            <text x={MID2_X} y={MID_Y - 26} textAnchor="middle" fontSize={8}
              fontFamily="monospace" fill={S3_GREEN} opacity={0.95}>✓ Input Filtering</text>
          </g>
        )}

        {/* ── Green packets along normal path ── */}
        {packetsOn && [0, 1, 2].map(i => (
          <circle key={i} r={3.5} fill={S3_GREEN}
            style={{ filter: `drop-shadow(0 0 5px ${S3_GREEN_GL})` }}>
            <animateMotion
              path={`M${U_RIGHT},${MID_Y} L${WA_LEFT},${MID_Y} L${WA_RIGHT},${MID_Y} L${BK_LEFT},${MID_Y}`}
              dur="3s" repeatCount="indefinite" begin={`${i * 1.0}s`} />
          </circle>
        ))}

        {/* ── Bypass arc — faded, struck out ── */}
        {bypassOp > 0.05 && (
          <path d={BYPASS_PATH} stroke={S3_RED} strokeWidth={2} fill="none"
            strokeDasharray="8 6" opacity={0.2 * bypassOp} />
        )}

        {/* Block shield on bypass midpoint */}
        {blockOp > 0.1 && (
          <g transform={`translate(${BYPASS_MID_X},${BYPASS_MID_Y})`} style={{ opacity: blockOp }}>
            <path d="M0,-20 L14,-13 L14,3 L0,16 L-14,3 L-14,-13 Z"
              fill="rgba(7,9,15,0.92)" stroke={S3_RED} strokeWidth={1.4}
              style={{ filter: `drop-shadow(0 0 8px ${S3_RED}50)` }} />
            <line x1={-6} y1={-6} x2={6} y2={6} stroke={S3_RED} strokeWidth={2} strokeLinecap="round" />
            <line x1={6}  y1={-6} x2={-6} y2={6} stroke={S3_RED} strokeWidth={2} strokeLinecap="round" />
            <text y={30} textAnchor="middle" fontSize={7.5} fontFamily="monospace"
              fill={S3_RED} opacity={0.7}>Direct Access Blocked</text>
          </g>
        )}

        {/* ── User node (healthy blue) ── */}
        <g transform={`translate(${USER.x},${USER.y}) scale(${0.55 + 0.45 * userOp})`}
          style={{ opacity: userOp }}>
          <UserIcon color={BLUE} />
        </g>
        {userOp > 0.3 && (
          <text x={USER.x} y={USER.y + T + 17} textAnchor="middle" fontSize={9.5}
            fontFamily="monospace" fill={BLUE} opacity={0.78 * userOp}>User</text>
        )}

        {/* ── WebApp node ── */}
        <g transform={`translate(${CF.x},${CF.y}) scale(${0.55 + 0.45 * webappOp})`}
          style={{ opacity: webappOp }}>
          <CloudFrontIcon />
        </g>
        {webappOp > 0.3 && (
          <>
            <text x={CF.x} y={CF.y + T + 17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={CF_C} opacity={0.85 * webappOp}>Web Application</text>
            <text x={CF.x} y={CF.y + T + 29} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={CF_C} opacity={0.45 * webappOp}>Controlled Access</text>
          </>
        )}

        {/* ── S3 Bucket — locked, green ── */}
        <g transform={`translate(${BUCKET.x},${BUCKET.y}) scale(${0.55 + 0.45 * bucketOp})`}
          style={{ opacity: bucketOp }}>
          <S3Icon color={S3_GREEN} lockP={1} shackleRise={0} />
        </g>
        {bucketOp > 0.3 && (
          <>
            <text x={BUCKET.x} y={BUCKET.y + T + 17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={S3_GREEN} opacity={0.85 * bucketOp}>S3 Bucket</text>
            <text x={BUCKET.x} y={BUCKET.y + T + 29} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={S3_GREEN} opacity={0.45 * bucketOp}>Private · Encrypted</text>
          </>
        )}
        {bucketOp > 0.7 && (
          <circle cx={BUCKET.x} cy={BUCKET.y} r={36} stroke={S3_GREEN} strokeWidth={1}
            fill="none" opacity={0.2}
            style={{ animation: "cs-pulse 3s ease-in-out infinite" }} />
        )}

        {/* Status badges */}
        {badgesOp > 0.1 && (
          <g style={{ opacity: badgesOp }}>
            {[
              { y: 80,  label: "✓ Block Public Access: ON",    color: S3_GREEN },
              { y: 96,  label: "✓ App-Only Access Enforced",   color: S3_GREEN },
              { y: 112, label: "✓ Input Filtering Active",     color: S3_GREEN },
              { y: 128, label: "✓ Direct Access: Denied",      color: S3_GREEN },
            ].map(({ y, label, color }) => (
              <React.Fragment key={label}>
                <rect x={24} y={y - 8} width={218} height={14} rx={3}
                  fill={`${color}10`} stroke={`${color}30`} strokeWidth={0.7} />
                <text x={32} y={y + 2.5} fontSize={8.5} fontFamily="monospace"
                  fill={color} opacity={0.9}>{label}</text>
              </React.Fragment>
            ))}
          </g>
        )}

        <text x={22} y={592} fontFamily="monospace" fontSize={9}
          fill={`${S3_GREEN}55`} opacity={captionOp}>SCENE 05 · HARDENED ARCHITECTURE</text>
      </svg>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-center z-10"
        style={{ opacity: captionOp }}>
        <p className="font-mono text-xs uppercase tracking-[0.32em]" style={{ color: S3_GREEN }}>
          Secure by Design
        </p>
        <p className="max-w-md font-sans text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.65)" }}>
          Every request flows through the Web Application. Direct access is blocked. Filtering is back.
        </p>
      </div>
    </div>
  );
};
