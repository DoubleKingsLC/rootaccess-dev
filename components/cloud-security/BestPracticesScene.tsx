"use client";

import React from "react";
import {
  WAF_C, ALB_C, GD_C, CT_C,
  CF_C, S3_GREEN, S3_GREEN_GL, BLUE, BG, VIOLET,
  T, ramp, UserIcon, S3Icon, CloudKeyframes,
  WafIcon, AlbIcon, ServerIcon, CloudTrailIcon, GuardDutyIcon,
} from "./cloudShared";

const IN = 0.83, OUT = 0.95;
const sceneOp = (p: number) => {
  if (p < IN)          return 0;
  if (p < IN + 0.015)  return (p - IN) / 0.015;
  if (p < OUT - 0.015) return 1;
  if (p < OUT)         return 1 - (p - (OUT - 0.015)) / 0.015;
  return 0;
};

// ── Node positions ─────────────────────────────────────────────────────────────
const U   = { x: 80,  y: 280 };
const W   = { x: 215, y: 280 };
const LB  = { x: 370, y: 280 };
const SV1 = { x: 555, y: 155 };
const SV2 = { x: 555, y: 280 };
const SV3 = { x: 555, y: 405 };
const BK  = { x: 750, y: 280 };
const CT  = { x: 810, y: 510 };
const GD  = { x: 960, y: 510 };

const OBS_JUNCTION_Y = 453;
const L1 = W.x  - T - (U.x  + T);
const L2 = LB.x - T - (W.x  + T);

const FAN1  = `M${LB.x+T},${LB.y} C${LB.x+85},${LB.y} ${SV1.x-75},${SV1.y} ${SV1.x-T},${SV1.y}`;
const FAN2  = `M${LB.x+T},${LB.y} L${SV2.x-T},${SV2.y}`;
const FAN3  = `M${LB.x+T},${LB.y} C${LB.x+85},${LB.y} ${SV1.x-75},${SV3.y} ${SV3.x-T},${SV3.y}`;
const CONV1 = `M${SV1.x+T},${SV1.y} C${SV1.x+80},${SV1.y} ${BK.x-80},${BK.y} ${BK.x-T},${BK.y}`;
const CONV2 = `M${SV2.x+T},${SV2.y} L${BK.x-T},${BK.y}`;
const CONV3 = `M${SV3.x+T},${SV3.y} C${SV3.x+80},${SV3.y} ${BK.x-80},${BK.y} ${BK.x-T},${BK.y}`;
const OBS_STEM_LEN = OBS_JUNCTION_Y - (BK.y + T);
const OBS_CT_PATH  = `M${BK.x},${OBS_JUNCTION_Y} C${BK.x},${OBS_JUNCTION_Y+22} ${CT.x},${CT.y-T-12} ${CT.x},${CT.y-T}`;
const OBS_GD_PATH  = `M${BK.x},${OBS_JUNCTION_Y} C${BK.x},${OBS_JUNCTION_Y+22} ${GD.x},${GD.y-T-12} ${GD.x},${GD.y-T}`;
const VPE_MID_X    = (SV2.x + T + BK.x - T) / 2;

// ── Card component ─────────────────────────────────────────────────────────────
// Cards are 240×96 SVG units, centered at (cardCX, cardCY).
// They slide+scale from (nodeX,nodeY) to (cardCX,cardCY) using easeOut.

function easeOut(t: number) { return 1 - (1 - t) * (1 - t); }

interface CardDef {
  nodeX: number;
  nodeY: number;
  node2X?: number;  // second source node (optional — for two-icon cards)
  node2Y?: number;
  node2Color?: string;
  cardCX: number;
  cardCY: number;
  color: string;
  title: string;
  lines: [string, string, string];
}

function ExplainCard({
  def, cardInRamp, cardOp,
}: { def: CardDef; cardInRamp: number; cardOp: number }) {
  if (cardOp < 0.005) return null;
  const ease = easeOut(Math.min(1, cardInRamp));
  const cx   = def.nodeX + (def.cardCX - def.nodeX) * ease;
  const cy   = def.nodeY + (def.cardCY - def.nodeY) * ease;
  // If there's a second node, card animates from the midpoint between both
  const cx2  = def.node2X != null ? def.node2X + (def.cardCX - def.node2X) * ease : cx;
  const cy2  = def.node2Y != null ? def.node2Y + (def.cardCY - def.node2Y) * ease : cy;
  const cardX = def.node2X != null ? (cx + cx2) / 2 : cx;
  const cardY = def.node2Y != null ? (cy + cy2) / 2 : cy;
  const sc   = 0.35 + 0.65 * ease;

  return (
    <>
      {/* Connector from node 1 to card */}
      <line
        x1={def.nodeX} y1={def.nodeY} x2={cardX} y2={cardY}
        stroke={def.color} strokeWidth={0.9}
        strokeDasharray="4 3" opacity={cardOp * 0.55}
      />
      {/* Connector from node 2 to card (if present) */}
      {def.node2X != null && def.node2Y != null && (
        <line
          x1={def.node2X} y1={def.node2Y} x2={cardX} y2={cardY}
          stroke={def.node2Color ?? def.color} strokeWidth={0.9}
          strokeDasharray="4 3" opacity={cardOp * 0.55}
        />
      )}
      {/* Card group — scales up from anchor position */}
      <g transform={`translate(${cardX},${cardY}) scale(${sc})`} style={{ opacity: cardOp }}>
        {/* Drop shadow */}
        <rect x={-118} y={-46} width={240} height={96} rx={8} fill="rgba(0,0,0,0.55)" />
        {/* Card body */}
        <rect x={-120} y={-48} width={240} height={96} rx={7}
          fill="rgba(6,9,16,0.97)"
          stroke={def.color} strokeWidth={1.3} strokeOpacity={0.65} />
        {/* Top highlight stripe */}
        <rect x={-120} y={-48} width={240} height={22} rx={7}
          fill={`${def.color}0d`} />
        {/* Left accent bar */}
        <rect x={-120} y={-48} width={5} height={96} rx={4}
          fill={def.color} opacity={0.9} />
        {/* Title */}
        <text x={-105} y={-26}
          fontSize={10.5} fontFamily="monospace" fontWeight="bold" fill={def.color}>
          {def.title}
        </text>
        {/* Separator */}
        <line x1={-105} y1={-16} x2={108} y2={-16}
          stroke={def.color} strokeWidth={0.5} strokeOpacity={0.2} />
        {/* Description lines */}
        {def.lines.map((line, i) => (
          <text key={i}
            x={-105} y={-4 + i * 13}
            fontSize={9} fontFamily="Arial, sans-serif"
            fill="rgba(148,163,184,0.88)">
            {line}
          </text>
        ))}
      </g>
    </>
  );
}

export const BestPracticesScene: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = sceneOp(progress);
  if (opacity === 0) return null;

  const lp = ramp(progress, IN, OUT - IN);

  // Quote
  const quoteIn  = ramp(lp, 0.00, 0.10);
  const quoteOut = ramp(lp, 0.14, 0.10);
  const quoteOp  = quoteIn * (1 - quoteOut);

  // ── Node appearance times ────────────────────────────────────────────────────
  const userOp   = ramp(lp, 0.17, 0.08);
  const wafOp    = ramp(lp, 0.20, 0.05);
  const vpcOp    = ramp(lp, 0.30, 0.06);
  const albOp    = ramp(lp, 0.30, 0.05);
  const asgOp    = ramp(lp, 0.38, 0.06);
  const srvOp    = ramp(lp, 0.43, 0.05);
  const vpeOp    = ramp(lp, 0.50, 0.05);
  const bktOp    = ramp(lp, 0.55, 0.05);
  const obsLineP = ramp(lp, 0.62, 0.06);
  const ctOp     = ramp(lp, 0.65, 0.05);
  const gdOp     = ramp(lp, 0.68, 0.05);

  // Connection lines
  const line1P = ramp(lp, 0.21, 0.05);
  const line2P = ramp(lp, 0.31, 0.05);
  const fanP   = ramp(lp, 0.44, 0.06);
  const convP  = ramp(lp, 0.56, 0.06);

  const captionOp = ramp(lp, 0.91, 0.06);
  const packetsOn = convP > 0.9;

  // ── 3 explanation cards ──────────────────────────────────────────────────────
  // WAF: visible lp 0.23 → 0.44 (~0.17 lp hold at full)
  const wafCardIn  = ramp(lp, 0.23, 0.04);
  const wafCardOut = ramp(lp, 0.44, 0.03);
  const wafCardOp  = wafCardIn * (1 - wafCardOut);

  // ALB: visible lp 0.47 → 0.64 (~0.13 lp hold at full)
  const albCardIn  = ramp(lp, 0.47, 0.04);
  const albCardOut = ramp(lp, 0.64, 0.03);
  const albCardOp  = albCardIn * (1 - albCardOut);

  // Log Monitoring (CloudTrail + GuardDuty): visible lp 0.71 → stays
  const logCardIn  = ramp(lp, 0.71, 0.04);
  const logCardOp  = logCardIn;

  const cardData: { cardInRamp: number; cardOp: number; def: CardDef }[] = [
    {
      cardInRamp: wafCardIn, cardOp: wafCardOp,
      def: {
        nodeX: W.x, nodeY: W.y,
        cardCX: 128, cardCY: 165,
        color: WAF_C,
        title: "WAF — Web App Firewall",
        lines: [
          "Sits at the edge — blocks SQLi, XSS",
          "and bot traffic before requests ever",
          "reach your VPC or servers.",
        ],
      },
    },
    {
      cardInRamp: albCardIn, cardOp: albCardOp,
      def: {
        nodeX: LB.x, nodeY: LB.y,
        cardCX: 350, cardCY: 152,
        color: ALB_C,
        title: "Load Balancer (ALB)",
        lines: [
          "The only public entry point into the VPC.",
          "Terminates TLS, routes to private servers,",
          "and health-checks each one continuously.",
        ],
      },
    },
    {
      cardInRamp: logCardIn, cardOp: logCardOp,
      def: {
        nodeX: CT.x, nodeY: CT.y,
        node2X: GD.x, node2Y: GD.y, node2Color: GD_C,
        cardCX: 875, cardCY: 390,
        color: CT_C,
        title: "Log Monitoring",
        lines: [
          "CloudTrail: every API call, logged forever.",
          "GuardDuty: ML flags credential abuse,",
          "port scans & anomalous access in real time.",
        ],
      },
    },
  ];

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      <CloudKeyframes />

      {/* Transition quote */}
      {quoteOp > 0.01 && (
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          style={{ opacity: quoteOp }}>
          <div className="flex flex-col items-center gap-5 text-center px-8">
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)" }} />
            <p className="font-sans text-3xl md:text-4xl font-semibold tracking-tight max-w-2xl leading-snug"
              style={{ color: "rgba(255,255,255,0.92)" }}>
              How do we make it <span style={{ color: ALB_C }}>even better?</span>
            </p>
            <div className="h-px w-20" style={{ background: "linear-gradient(to right, transparent, rgba(168,85,247,0.5), transparent)" }} />
          </div>
        </div>
      )}

      <svg viewBox="0 0 1100 600" className="absolute inset-0 w-full h-full">

        {/* VPC outer boundary */}
        {vpcOp > 0.05 && (
          <g opacity={vpcOp}>
            <rect x={316} y={90} width={326} height={378} rx={8}
              fill={`${S3_GREEN}04`} stroke={S3_GREEN} strokeWidth={1.3}
              strokeDasharray="10 6" opacity={0.45} />
            <rect x={320} y={81} width={108} height={16} rx={3}
              fill={BG} stroke={S3_GREEN} strokeWidth={0.8} strokeOpacity={0.45} />
            <text x={328} y={92} fontFamily="monospace" fontSize={8.5}
              fill={S3_GREEN} opacity={0.8}>VPC · us-east-1</text>
          </g>
        )}

        {/* Public subnet */}
        {vpcOp > 0.05 && (
          <g opacity={vpcOp * 0.85}>
            <rect x={330} y={228} width={88} height={108} rx={5}
              fill={`${VIOLET}05`} stroke={VIOLET} strokeWidth={0.9}
              strokeDasharray="6 4" opacity={0.55} />
            <rect x={334} y={220} width={74} height={14} rx={3}
              fill={BG} stroke={BLUE} strokeWidth={0.7} strokeOpacity={0.4} />
            <text x={341} y={230} fontFamily="monospace" fontSize={7.5}
              fill={VIOLET} opacity={0.72}>Public Subnet</text>
          </g>
        )}

        {/* Private subnet */}
        {asgOp > 0.05 && (
          <g opacity={asgOp}>
            <rect x={502} y={106} width={112} height={352} rx={6}
              fill={`${CF_C}05`} stroke={CF_C} strokeWidth={1.1}
              strokeDasharray="8 5" opacity={0.5} />
            <rect x={506} y={97} width={102} height={16} rx={3}
              fill={BG} stroke={CF_C} strokeWidth={0.8} strokeOpacity={0.4} />
            <text x={514} y={108} fontFamily="monospace" fontSize={8.5}
              fill={CF_C} opacity={0.78}>Private Subnet</text>
          </g>
        )}

        {/* Lines */}
        <line x1={U.x+T} y1={U.y} x2={W.x-T} y2={W.y}
          stroke={WAF_C} strokeWidth={2} opacity={0.55}
          strokeDasharray={L1} strokeDashoffset={L1*(1-line1P)} />
        <line x1={W.x+T} y1={W.y} x2={LB.x-T} y2={LB.y}
          stroke={ALB_C} strokeWidth={2} opacity={0.55}
          strokeDasharray={L2} strokeDashoffset={L2*(1-line2P)} />
        {([FAN1, FAN2, FAN3] as const).map((d, i) => (
          <path key={i} d={d} pathLength="1"
            stroke={ALB_C} strokeWidth={1.8} fill="none" opacity={0.5}
            strokeDasharray="1" strokeDashoffset={1-fanP} />
        ))}
        {([CONV1, CONV2, CONV3] as const).map((d, i) => (
          <path key={i} d={d} pathLength="1"
            stroke={S3_GREEN} strokeWidth={1.8} fill="none" opacity={0.5}
            strokeDasharray="1" strokeDashoffset={1-convP} />
        ))}

        {/* VPC Gateway Endpoint marker */}
        {vpeOp > 0.05 && (
          <g opacity={vpeOp}>
            <polygon
              points={`${VPE_MID_X},${BK.y-20} ${VPE_MID_X+8},${BK.y-12} ${VPE_MID_X},${BK.y-4} ${VPE_MID_X-8},${BK.y-12}`}
              fill={`${S3_GREEN}20`} stroke={S3_GREEN} strokeWidth={0.9} opacity={0.8} />
          </g>
        )}

        {/* Observability lines */}
        {obsLineP > 0.05 && (
          <>
            <line x1={BK.x} y1={BK.y+T} x2={BK.x} y2={OBS_JUNCTION_Y}
              stroke={CT_C} strokeWidth={1.2} opacity={0.4*obsLineP}
              strokeDasharray={OBS_STEM_LEN} strokeDashoffset={OBS_STEM_LEN*(1-obsLineP)} />
            <path d={OBS_CT_PATH} pathLength="1"
              stroke={CT_C} strokeWidth={1.2} fill="none" opacity={0.38*obsLineP}
              strokeDasharray="1" strokeDashoffset={1-obsLineP} />
            <path d={OBS_GD_PATH} pathLength="1"
              stroke={GD_C} strokeWidth={1.2} fill="none" opacity={0.38*obsLineP}
              strokeDasharray="1" strokeDashoffset={1-obsLineP} />
          </>
        )}

        {/* Packets */}
        {packetsOn && [0, 1, 2].map(i => (
          <circle key={i} r={3.5} fill={S3_GREEN}
            style={{ filter: `drop-shadow(0 0 5px ${S3_GREEN_GL})` }}>
            <animateMotion
              path={`M${U.x+T},${U.y} L${W.x-T},${W.y} L${W.x+T},${W.y} L${LB.x-T},${LB.y} L${LB.x+T},${LB.y} L${SV2.x-T},${SV2.y} L${SV2.x+T},${SV2.y} L${BK.x-T},${BK.y}`}
              dur="3.6s" repeatCount="indefinite" begin={`${i*1.2}s`} />
          </circle>
        ))}

        {/* ── Nodes ── */}
        <g transform={`translate(${U.x},${U.y}) scale(${0.55+0.45*userOp})`} style={{ opacity: userOp }}>
          <UserIcon color={BLUE} />
        </g>
        {userOp > 0.3 && (
          <text x={U.x} y={U.y+T+17} textAnchor="middle" fontSize={9.5}
            fontFamily="monospace" fill={VIOLET} opacity={0.75*userOp}>User</text>
        )}

        <g transform={`translate(${W.x},${W.y}) scale(${0.55+0.45*wafOp})`} style={{ opacity: wafOp }}>
          <WafIcon />
        </g>
        {wafOp > 0.3 && (
          <>
            <text x={W.x} y={W.y+T+17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={WAF_C} opacity={0.82*wafOp}>WAF</text>
            <text x={W.x} y={W.y+T+29} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={WAF_C} opacity={0.42*wafOp}>Rule Groups</text>
          </>
        )}

        <g transform={`translate(${LB.x},${LB.y}) scale(${0.55+0.45*albOp})`} style={{ opacity: albOp }}>
          <AlbIcon />
        </g>
        {albOp > 0.3 && (
          <>
            <text x={LB.x} y={LB.y+T+17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={ALB_C} opacity={0.82*albOp}>Load Balancer</text>
            <text x={LB.x} y={LB.y+T+29} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={ALB_C} opacity={0.42*albOp}>ALB</text>
          </>
        )}

        {([SV1, SV2, SV3] as const).map((sv, i) => (
          <React.Fragment key={i}>
            <g transform={`translate(${sv.x},${sv.y}) scale(${0.55+0.45*srvOp})`} style={{ opacity: srvOp }}>
              <ServerIcon />
            </g>
            {srvOp > 0.3 && (
              <text x={sv.x} y={sv.y+T+15} textAnchor="middle" fontSize={8.5}
                fontFamily="monospace" fill={CF_C} opacity={0.72*srvOp}>webapp-{i+1}</text>
            )}
          </React.Fragment>
        ))}

        <g transform={`translate(${BK.x},${BK.y}) scale(${0.55+0.45*bktOp})`} style={{ opacity: bktOp }}>
          <S3Icon color={S3_GREEN} lockP={1} />
        </g>
        {bktOp > 0.3 && (
          <>
            <text x={BK.x} y={BK.y+T+17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={S3_GREEN} opacity={0.82*bktOp}>S3 Bucket</text>
            <text x={BK.x} y={BK.y+T+29} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={S3_GREEN} opacity={0.42*bktOp}>Private · Encrypted</text>
          </>
        )}
        {bktOp > 0.7 && (
          <circle cx={BK.x} cy={BK.y} r={36} stroke={S3_GREEN} strokeWidth={1}
            fill="none" opacity={0.18}
            style={{ animation: "cs-pulse 3s ease-in-out infinite" }} />
        )}

        <g transform={`translate(${CT.x},${CT.y}) scale(${0.55+0.45*ctOp})`} style={{ opacity: ctOp }}>
          <CloudTrailIcon />
        </g>
        {ctOp > 0.3 && (
          <>
            <text x={CT.x} y={CT.y+T+17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={CT_C} opacity={0.82*ctOp}>CloudTrail</text>
            <text x={CT.x} y={CT.y+T+29} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={CT_C} opacity={0.42*ctOp}>Audit Logs</text>
          </>
        )}

        <g transform={`translate(${GD.x},${GD.y}) scale(${0.55+0.45*gdOp})`} style={{ opacity: gdOp }}>
          <GuardDutyIcon />
        </g>
        {gdOp > 0.3 && (
          <>
            <text x={GD.x} y={GD.y+T+17} textAnchor="middle" fontSize={9.5}
              fontFamily="monospace" fill={GD_C} opacity={0.82*gdOp}>GuardDuty</text>
            <text x={GD.x} y={GD.y+T+29} textAnchor="middle" fontSize={7.5}
              fontFamily="monospace" fill={GD_C} opacity={0.42*gdOp}>Threat Detection</text>
          </>
        )}

        {/* ── Explanation cards — rendered last so they sit above everything ── */}
        {cardData.map((c, i) => (
          <ExplainCard key={i} def={c.def}
            cardInRamp={c.cardInRamp} cardOp={c.cardOp} />
        ))}

        <text x={22} y={592} fontFamily="monospace" fontSize={9}
          fill="rgba(148,163,184,0.85)" opacity={captionOp}>SCENE 06 · BEST PRACTICES</text>
      </svg>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-center z-10 pointer-events-none"
        style={{ opacity: captionOp }}>
        <p className="font-mono text-xs uppercase tracking-[0.32em]" style={{ color: ALB_C }}>
          Defense in Depth
        </p>
        <p className="max-w-lg font-sans text-sm leading-relaxed" style={{ color: "rgba(148,163,184,0.85)" }}>
          WAF at the edge. ALB in the public subnet. Servers isolated in private. S3 via VPC endpoint only.
        </p>
      </div>
    </div>
  );
};
