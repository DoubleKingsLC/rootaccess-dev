import React from "react";

// ── Colors ────────────────────────────────────────────────────────────────────
export const PURPLE      = "#a855f7";
export const PURPLE_GLOW = "rgba(168,85,247,0.30)";
export const VIOLET      = "#8b5cf6";   // Vivid cloud security theme
export const VIOLET_GLOW = "rgba(139,92,246,0.30)";
export const BLUE        = PURPLE;      // Alias for transition
export const BLUE_GLOW   = PURPLE_GLOW; // Alias for transition
export const CF_C        = "#8b5cf6";   // CloudFront violet
export const CF_GLOW     = "rgba(139,92,246,0.30)";
export const S3_GREEN    = "#22c55e";
export const S3_GREEN_GL = "rgba(34,197,94,0.30)";
export const S3_RED      = "#ef4444";
export const S3_RED_GL   = "rgba(239,68,68,0.35)";
export const AMBER       = "#f59e0b";
export const AMBER_GLOW  = "rgba(245,158,11,0.30)";
export const AMBER_DIM   = "rgba(245,158,11,0.22)";
export const GREEN       = "#22c55e";
export const GREEN_GLOW  = "rgba(34,197,94,0.30)";
export const RED_C       = "#ef4444";
export const RED_GLOW    = "rgba(239,68,68,0.35)";
export const SLATE       = "#94a3b8";
export const BG          = "#07090f";

// Tile half-size (54 × 54 px total)
export const T = 27;

// Best-practices palette
export const WAF_C    = "#C7131F";
export const WAF_GLOW = "rgba(199,19,31,0.30)";
export const ALB_C    = "#8b5cf6";   // Shifted from blue to violet
export const ALB_GLOW = "rgba(139,92,246,0.30)";
export const GD_C     = "#f97316";
export const GD_GLOW  = "rgba(249,115,22,0.30)";
export const CT_C     = "#a78bfa";   // Shifted from cyan to light violet
export const CT_GLOW  = "rgba(167,139,250,0.30)";

// ── Node positions (SVG viewBox 0 0 1100 600) ─────────────────────────────────
// Horizontal layout: USER → WEBAPP → BUCKET (left to right, all at y=300)
export const USER   = { x: 155,  y: 300 } as const;   // End user
export const CF     = { x: 440,  y: 300 } as const;   // Web Application (CloudFront)
export const BUCKET = { x: 730,  y: 300 } as const;   // S3 bucket
export const INET   = { x: 970,  y: 300 } as const;   // Internet (legacy / unused)

// ── Animation helper ──────────────────────────────────────────────────────────
export const ramp = (v: number, s: number, l: number) =>
  Math.max(0, Math.min(1, (v - s) / l));

// ── Tile (AWS-style square icon base) ─────────────────────────────────────────
function Tile({ color, children, glow = false }: {
  color: string; children: React.ReactNode; glow?: boolean;
}) {
  return (
    <g>
      {/* Drop shadow */}
      <rect x={-T} y={-T + 3} width={T * 2} height={T * 2} rx={8} fill="rgba(0,0,0,0.45)" />
      {/* Tile body */}
      <rect x={-T} y={-T} width={T * 2} height={T * 2} rx={8}
        fill={color} opacity={0.92}
        style={glow ? { filter: `drop-shadow(0 0 14px ${color}80)` } : undefined}
      />
      {/* Top highlight */}
      <rect x={-T} y={-T} width={T * 2} height={T * 0.52} rx={8}
        fill="rgba(255,255,255,0.11)" />
      {children}
    </g>
  );
}

// ── S3 Bucket icon ─────────────────────────────────────────────────────────────
export function S3Icon({
  color = S3_GREEN, lockP = 1, shackleRise = 0,
}: { color?: string; lockP?: number; shackleRise?: number }) {
  const so = -10 + shackleRise * 14;
  return (
    <Tile color={color} glow={color === S3_RED}>
      <ellipse cx={0} cy={-7} rx={14} ry={3.5}
        fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.75)" strokeWidth={1.1} />
      <path d="M-14,-7 L-11,14 L11,14 L14,-7"
        fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.75)" strokeWidth={1.1} />
      <path d="M-8,-7 A8,7 0 0,1 8,-7"
        fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth={1.2} />
      {lockP > 0.05 && (
        <g opacity={lockP}>
          <rect x={-4} y={1} width={8} height={7} rx={1.5} fill="rgba(255,255,255,0.9)" />
          <path d={`M-2.5,${so + 1} A2.5,2.5 0 0,1 2.5,${so + 1} L2.5,1 L-2.5,1 Z`}
            fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.2} />
        </g>
      )}
    </Tile>
  );
}

// ── CloudFront icon ────────────────────────────────────────────────────────────
export function CloudFrontIcon({ color = CF_C }: { color?: string }) {
  return (
    <Tile color={color}>
      {/* Distribution hub */}
      <circle cx={0} cy={-3} r={7} fill="rgba(255,255,255,0.18)"
        stroke="rgba(255,255,255,0.82)" strokeWidth={1.3} />
      {/* Outward spokes */}
      <line x1={0}  y1={-10} x2={0}   y2={-19} stroke="rgba(255,255,255,0.75)" strokeWidth={1.2} />
      <line x1={0}  y1={4}   x2={-13} y2={14}  stroke="rgba(255,255,255,0.75)" strokeWidth={1.2} />
      <line x1={0}  y1={4}   x2={13}  y2={14}  stroke="rgba(255,255,255,0.75)" strokeWidth={1.2} />
      {/* Edge nodes */}
      <circle cx={0}   cy={-20} r={3} fill="rgba(255,255,255,0.95)" />
      <circle cx={-14} cy={15}  r={3} fill="rgba(255,255,255,0.95)" />
      <circle cx={14}  cy={15}  r={3} fill="rgba(255,255,255,0.95)" />
    </Tile>
  );
}

// ── User / Person icon ────────────────────────────────────────────────────────
export function UserIcon({ color = PURPLE }: { color?: string }) {
  return (
    <Tile color={color} glow={color === S3_RED}>
      {/* Head */}
      <circle cx={0} cy={-10} r={7} fill="rgba(255,255,255,0.88)" />
      {/* Shoulders / body */}
      <path d="M-13,14 C-13,2 -7,-2 0,-2 C7,-2 13,2 13,14 Z"
        fill="rgba(255,255,255,0.75)" />
    </Tile>
  );
}

// ── Internet Globe icon ────────────────────────────────────────────────────────
export function GlobeIcon({ color = PURPLE }: { color?: string }) {
  return (
    <Tile color={color}>
      <circle cx={0} cy={0} r={16} stroke="rgba(255,255,255,0.82)" strokeWidth={1.3} fill="none" />
      <ellipse cx={0} cy={0} rx={7}  ry={16} stroke="rgba(255,255,255,0.45)" strokeWidth={1} fill="none" />
      <line x1={-16} y1={0}  x2={16} y2={0}  stroke="rgba(255,255,255,0.35)" strokeWidth={0.9} />
      <line x1={-14} y1={-9} x2={14} y2={-9} stroke="rgba(255,255,255,0.25)" strokeWidth={0.7} />
      <line x1={-14} y1={9}  x2={14} y2={9}  stroke="rgba(255,255,255,0.25)" strokeWidth={0.7} />
    </Tile>
  );
}

// ── VPC Boundary ──────────────────────────────────────────────────────────────
export function VpcBoundary({
  color = S3_GREEN, opacity = 1,
  x1 = 448, y1 = 170, x2 = 672, y2 = 430,
  label = "VPC · Private",
}: { color?: string; opacity?: number; x1?: number; y1?: number; x2?: number; y2?: number; label?: string }) {
  return (
    <g opacity={opacity}>
      <rect x={x1} y={y1} width={x2 - x1} height={y2 - y1} rx={6}
        fill={`${color}05`} stroke={color} strokeWidth={1.2}
        strokeDasharray="8 5" opacity={0.55} />
      <rect x={x1 + 4} y={y1 - 9} width={76} height={16} rx={3}
        fill={BG} stroke={color} strokeWidth={0.8} strokeOpacity={0.4} />
      <text x={x1 + 10} y={y1 + 4} fontFamily="monospace" fontSize={8.5}
        fill={color} opacity={0.75}>{label}</text>
    </g>
  );
}

// ── WAF icon (red shield + checkmark) ─────────────────────────────────────────
export function WafIcon({ color = WAF_C }: { color?: string }) {
  return (
    <Tile color={color}>
      <path d="M0,-20 L13,-12 L13,2 L0,16 L-13,2 L-13,-12 Z"
        fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.82)" strokeWidth={1.3} />
      <path d="M-5,0 L-2,4 L6,-5"
        fill="none" stroke="rgba(255,255,255,0.92)" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" />
    </Tile>
  );
}

// ── ALB icon (fan-out load balancer) ───────────────────────────────────────────
export function AlbIcon({ color = ALB_C }: { color?: string }) {
  return (
    <Tile color={color}>
      <rect x={-17} y={-4} width={10} height={8} rx={2} fill="rgba(255,255,255,0.85)" />
      <line x1={-7} y1={0}  x2={5}  y2={-13} stroke="rgba(255,255,255,0.72)" strokeWidth={1.3} />
      <line x1={-7} y1={0}  x2={5}  y2={0}   stroke="rgba(255,255,255,0.72)" strokeWidth={1.3} />
      <line x1={-7} y1={0}  x2={5}  y2={13}  stroke="rgba(255,255,255,0.72)" strokeWidth={1.3} />
      <circle cx={8}  cy={-13} r={3.5} fill="rgba(255,255,255,0.85)" />
      <circle cx={8}  cy={0}   r={3.5} fill="rgba(255,255,255,0.85)" />
      <circle cx={8}  cy={13}  r={3.5} fill="rgba(255,255,255,0.85)" />
    </Tile>
  );
}

// ── Server / EC2 icon (rack rows) ─────────────────────────────────────────────
export function ServerIcon({ color = CF_C }: { color?: string }) {
  const rows = [-11, -2, 7] as const;
  return (
    <Tile color={color}>
      {rows.map((y) => (
        <g key={y}>
          <rect x={-15} y={y} width={30} height={8} rx={1.5}
            fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.55)" strokeWidth={0.8} />
          <circle cx={11} cy={y + 4} r={2} fill="rgba(255,255,255,0.85)" />
          <rect x={-13} y={y + 2} width={14} height={4} rx={1}
            fill="rgba(255,255,255,0.30)" />
        </g>
      ))}
    </Tile>
  );
}

// ── CloudTrail icon (teal, log lines) ──────────────────────────────────────────
export function CloudTrailIcon({ color = CT_C }: { color?: string }) {
  const lines = [-11, -4, 3, 10] as const;
  return (
    <Tile color={color}>
      {lines.map((y) => (
        <g key={y}>
          <circle cx={-14} cy={y} r={2} fill="rgba(255,255,255,0.85)" />
          <line x1={-10} y1={y} x2={14} y2={y}
            stroke="rgba(255,255,255,0.55)" strokeWidth={1} />
        </g>
      ))}
    </Tile>
  );
}

// ── GuardDuty icon (orange, eye) ──────────────────────────────────────────────
export function GuardDutyIcon({ color = GD_C }: { color?: string }) {
  return (
    <Tile color={color}>
      <path d="M-15,0 Q0,-11 15,0 Q0,11 -15,0 Z"
        fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.82)" strokeWidth={1.3} />
      <circle cx={0} cy={0} r={5} fill="rgba(255,255,255,0.18)"
        stroke="rgba(255,255,255,0.65)" strokeWidth={1} />
      <circle cx={0} cy={0} r={2.5} fill="rgba(255,255,255,0.92)" />
    </Tile>
  );
}

// ── Shared CSS keyframes ───────────────────────────────────────────────────────
export function CloudKeyframes() {
  return (
    <style>{`
      @keyframes cs-pulse  { 0%,100%{opacity:0.45} 50%{opacity:1.0} }
      @keyframes cs-blink  { 0%,100%{opacity:1}    50%{opacity:0.15} }
      @keyframes cs-float  { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-6px)} }
      @keyframes cs-flow   { 0%{stroke-dashoffset:600} 100%{stroke-dashoffset:0} }
      @keyframes cs-spin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
      @keyframes cs-ring   { 0%{r:32;opacity:0.5} 100%{r:90;opacity:0} }
      @keyframes scroll-bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(6px)} }
      @keyframes packet-h     { from{transform:translateX(-40px)} to{transform:translateX(calc(100vw + 40px))} }
      @keyframes packet-h-rev { from{transform:translateX(calc(100vw + 40px))} to{transform:translateX(-40px)} }
      @keyframes packet-v     { from{transform:translateY(-40px)} to{transform:translateY(calc(100vh + 40px))} }
      @keyframes packet-v-rev { from{transform:translateY(calc(100vh + 40px))} to{transform:translateY(-40px)} }
    `}</style>
  );
}
