"use client";

import React from "react";

/** 1.5x workstation size (450×330) → 675×495 glass surface */
const SCREEN_WIDTH = 675;
const SCREEN_HEIGHT = 495;

/** Large trapezoidal table: SVG path, fill rgba(30,41,59,0.8), stroke white/10 */
const ConferenceTable: React.FC = () => (
  <svg
    className="absolute left-1/2 top-[57%] z-[15] -translate-x-1/2 -translate-y-1/2"
    width="520"
    height="200"
    viewBox="0 0 520 200"
    aria-hidden
  >
    {/* Trapezoid: narrower at top (board end), wider at bottom (viewer side) */}
    <path
      d="M 120 40 L 400 40 L 460 180 L 60 180 Z"
      fill="rgba(30, 41, 59, 0.8)"
      stroke="rgba(255, 255, 255, 0.1)"
      strokeWidth="1"
    />
  </svg>
);

/** Single stakeholder: minimalist head + shoulders + chair from behind */
const StakeholderSilhouette: React.FC<{
  cx: number;
  cy: number;
  scale?: number;
}> = ({ cx, cy, scale = 1 }) => (
  <g transform={`translate(${cx}, ${cy}) scale(${scale})`}>
    <path
      d="M -18 28 L -18 8 L -8 0 L 8 0 L 18 8 L 18 28 L 12 28 L 12 12 L -12 12 L -12 28 Z"
      fill="#1e293b"
    />
    <ellipse cx="0" cy="-2" rx="10" ry="12" fill="#0f172a" />
    <path
      d="M -14 10 L -14 22 L 14 22 L 14 10 L 6 14 L 0 12 L -6 14 Z"
      fill="#0f172a"
    />
  </g>
);

/** Standing manager at head of table: 2D silhouette (focal point) */
const ManagerSilhouette: React.FC = () => (
  <g transform="translate(260, 75)">
    {/* Standing figure: head, neck, shoulders, torso */}
    <ellipse cx="0" cy="-28" rx="14" ry="16" fill="#0f172a" />
    <path
      d="M -6 -12 L -6 2 L 6 2 L 6 -12 L 0 -8 Z"
      fill="#0f172a"
    />
    <path
      d="M -22 2 L -22 55 L 22 55 L 22 2 L 8 12 L 0 8 L -8 12 Z"
      fill="#0f172a"
    />
  </g>
);

/** Centralized 675×495 glass surface: abstract bars/lines only; header "LESSONS LEARNT" (Inter) */
const PresentationScreen: React.FC = () => (
  <div
    className="flex flex-col items-center justify-start rounded-xl border border-white/10 bg-slate-950/40 shadow-[0_0_32px_rgba(15,23,42,0.8)]"
    style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT }}
    aria-hidden
  >
    <div className="mt-5 font-sans font-semibold uppercase tracking-[0.2em] text-slate-200">
      LESSONS LEARNT
    </div>
    <div className="mt-4 flex flex-1 w-full flex-col items-center justify-center gap-3 px-8 pb-6">
      {/* Abstract data: minimalist geometric lines and blocks */}
      <div className="flex gap-4">
        {[40, 56, 48].map((h, i) => (
          <div
            key={i}
            className="rounded-sm bg-slate-600/50"
            style={{ width: 24, height: h }}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <div className="h-px w-16 bg-slate-500/60" />
        <div className="h-px w-24 bg-slate-500/40" />
        <div className="h-px w-12 bg-slate-500/60" />
      </div>
      <div className="flex gap-3">
        <div className="h-8 w-20 rounded border border-slate-500/40 bg-slate-700/30" />
        <div className="h-8 w-14 rounded border border-slate-500/40 bg-slate-700/30" />
        <div className="h-8 w-16 rounded border border-slate-500/40 bg-slate-700/30" />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-2 w-full rounded-sm bg-slate-600/40"
            style={{ width: 32 }}
          />
        ))}
      </div>
    </div>
  </div>
);

/** Deep POV: camera behind stakeholders. Layering back→front: Background → Screen → Manager → Table → Stakeholders */
export const BoardroomMeeting: React.FC = () => {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-xl"
      style={{
        boxShadow: "inset 0 0 120px rgba(15, 23, 42, 0.4)"
      }}
      aria-hidden
    >
      <div className="relative flex h-full w-full max-w-4xl items-center justify-center">
        {/* 1. Back: centralized 675×495 glass screen */}
        <div className="absolute left-1/2 top-[25%] z-0 -translate-x-1/2">
          <PresentationScreen />
        </div>

        {/* 2. Manager: standing at head of table, facing board members */}
        <svg
          className="absolute left-1/2 top-[37%] z-10 -translate-x-1/2"
          width="520"
          height="200"
          viewBox="0 0 520 200"
          aria-hidden
        >
          <ManagerSilhouette />
        </svg>

        {/* 3. Table: large SVG trapezoid in perspective */}
        <ConferenceTable />

        {/* 4. Front: four back-view stakeholders closest to camera */}
        <svg
          className="absolute left-1/2 top-[57%] z-20 -translate-x-1/2 -translate-y-1/2"
          width="520"
          height="200"
          viewBox="0 0 520 200"
          aria-hidden
        >
          <StakeholderSilhouette cx={80} cy={140} scale={1.1} />
          <StakeholderSilhouette cx={180} cy={150} scale={0.95} />
          <StakeholderSilhouette cx={340} cy={150} scale={0.95} />
          <StakeholderSilhouette cx={440} cy={140} scale={1.1} />
        </svg>
      </div>
    </div>
  );
};
