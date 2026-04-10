"use client";

export const GRC_MOTION_MS = {
  micro: 180,
  fast: 220,
  standard: 300,
  medium: 360,
  emphasis: 420,
} as const;

export const GRC_MOTION_SEC = {
  fast: 0.22,
  quick: 0.3,
  standard: 0.4,
  hero: 0.48,
  ambient: 2.2,
} as const;

export const GRC_SCROLL_TUNING = {
  lenisLerp: 0.1,
  scrub: 1.4,
} as const;
