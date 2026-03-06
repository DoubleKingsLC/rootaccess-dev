"use client";

import React from "react";
import { AnalystPOV } from "./AnalystPOV";

type WorldStageProps = {
  className?: string;
  l1Ref?: React.RefObject<HTMLDivElement | null>;
  l2Ref?: React.RefObject<HTMLDivElement | null>;
  l3Ref?: React.RefObject<HTMLDivElement | null>;
  l3DiskRef?: React.RefObject<HTMLDivElement | null>;
  scrollProgress?: number;
};

/** Hard disk SVG for L3 forensic removal */
const HardDiskNode: React.FC = () => (
  <svg
    width="40"
    height="24"
    viewBox="0 0 40 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-slate-200"
    aria-hidden
  >
    <rect x="2" y="4" width="36" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" fill="rgba(15,23,42,0.95)" />
    <circle cx="12" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
    <rect x="24" y="9" width="8" height="4" rx="1" fill="currentColor" />
  </svg>
);

const WorldStageComponent: React.FC<WorldStageProps> = ({
  className = "",
  l1Ref,
  l2Ref,
  l3Ref,
  l3DiskRef,
  scrollProgress = 0
}) => {
  const p = scrollProgress;

  return (
    <div className={`relative mx-auto w-full h-full ${className}`}>
      <div className="relative z-[1] mx-auto h-[900px] w-full">
        <div className="flex h-full w-full flex-col items-center justify-center gap-20 px-10 md:flex-row md:justify-center md:gap-[clamp(2rem,8vw,12rem)]">
          <AnalystPOV
            label="L1 / MONITORING"
            screens={1}
            isAlerted={p >= 0.15 && p < 0.35}
            stationRef={l1Ref}
          />
          <AnalystPOV
            label="L2 STATION"
            screens={3}
            isAlerted={p >= 0.35 && p < 0.55}
            stationRef={l2Ref}
          />
          <AnalystPOV
            label="L3 STATION"
            screens={1}
            isAlerted={p >= 0.55 && p < 0.80}
            stationRef={l3Ref}
          />
        </div>

        <div
          ref={l3DiskRef as React.LegacyRef<HTMLDivElement> | undefined}
          className="pointer-events-none absolute flex items-center justify-center opacity-0"
          aria-hidden
        >
          <HardDiskNode />
        </div>
      </div>
    </div>
  );
};

export const WorldStage = React.memo(WorldStageComponent);
