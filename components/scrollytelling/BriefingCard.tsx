"use client";

import React from "react";

type BriefingCardProps = {
  roleName: string;
  body: string;
  cardRef?: React.RefObject<HTMLDivElement>;
};

export const BriefingCard: React.FC<BriefingCardProps> = ({
  roleName,
  body,
  cardRef
}) => {
  return (
    <div
      ref={cardRef}
      className="pointer-events-auto w-[400px] max-w-[80vw] rounded-xl border-2 border-white/5 bg-slate-950/90 px-4 py-4 backdrop-blur-2xl"
    >
      <p className="font-mono text-[11px] uppercase tracking-widest text-cyan-400">
        Stakeholder Briefing: {roleName}
      </p>
      <p className="mt-3 font-sans text-xs leading-relaxed text-slate-100">
        {body}
      </p>
    </div>
  );
};

