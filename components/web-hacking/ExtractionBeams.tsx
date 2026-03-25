"use client";

import React from "react";

type Props = { localProgress: number };

const BEAMS = [
  // Nginx: from bottom-center of browser (network tab) to Nginx chip — matches NetworkHeaders peak
  { srcX: 42, srcY: 84, dstX: 42, dstY: 3.5, color: "#f43f5e", startLp: 0.44, peakLp: 0.49, endLp: 0.54 },
  // React: from Wappalyzer popup (top-right browser) to React chip — after React row appears
  { srcX: 80, srcY: 16, dstX: 58, dstY: 3.5, color: "#61dafb", startLp: 0.64, peakLp: 0.68, endLp: 0.72 },
  // Cloudflare: from Wappalyzer popup to Cloudflare chip — after Cloudflare row appears
  { srcX: 80, srcY: 20, dstX: 68, dstY: 3.5, color: "#f48120", startLp: 0.71, peakLp: 0.75, endLp: 0.79 },
] as const;

type Beam = typeof BEAMS[number];

// beamProgress: 0 at start, rises to 1 at peak, falls back to 0 at end
const beamProgress = (lp: number, beam: Beam): number => {
  if (lp < beam.startLp) return 0;
  if (lp < beam.peakLp) return (lp - beam.startLp) / (beam.peakLp - beam.startLp);
  if (lp <= beam.endLp) return 1 - (lp - beam.peakLp) / (beam.endLp - beam.peakLp);
  return 0;
};

// Particle dot traveling from src to dst along the beam
const dotPos = (
  lp: number,
  beam: Beam
): { x: number; y: number; opacity: number } => {
  if (lp < beam.startLp || lp > beam.endLp) return { x: 0, y: 0, opacity: 0 };
  const t = (lp - beam.startLp) / (beam.endLp - beam.startLp);
  return {
    x: beam.srcX + (beam.dstX - beam.srcX) * t,
    y: beam.srcY + (beam.dstY - beam.srcY) * t,
    opacity: t < 0.15 ? t / 0.15 : t > 0.85 ? 1 - (t - 0.85) / 0.15 : 1,
  };
};

export const ExtractionBeams: React.FC<Props> = ({ localProgress }) => {
  // Check if any beam is active
  const anyActive = BEAMS.some((b) => localProgress >= b.startLp && localProgress <= b.endLp);
  if (!anyActive) return null;

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 45 }}
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {BEAMS.map((beam, i) => {
        const bProg = beamProgress(localProgress, beam);
        const dot = dotPos(localProgress, beam);
        return (
          <g key={i}>
            <line
              x1={beam.srcX}
              y1={beam.srcY}
              x2={beam.dstX}
              y2={beam.dstY}
              stroke={beam.color}
              strokeWidth="0.3"
              strokeDasharray="1 1"
              opacity={bProg * 0.6}
            />
            {dot.opacity > 0 && (
              <circle
                cx={dot.x}
                cy={dot.y}
                r="0.8"
                fill={beam.color}
                opacity={dot.opacity}
                filter={`drop-shadow(0 0 2px ${beam.color})`}
              />
            )}
          </g>
        );
      })}
    </svg>
  );
};
