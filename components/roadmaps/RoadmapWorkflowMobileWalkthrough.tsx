"use client";

import React from "react";
import Link from "next/link";
import {
  ROADMAP_WORKFLOW_MOBILE,
  type RoadmapWorkflowSlug,
} from "@/lib/roadmapWorkflowMobile";

type Props = {
  slug: RoadmapWorkflowSlug;
};

export const RoadmapWorkflowMobileWalkthrough: React.FC<Props> = ({
  slug,
}) => {
  const cfg = ROADMAP_WORKFLOW_MOBILE[slug];

  return (
    <div className="min-h-[100dvh] w-full bg-[#060a0f] px-4 py-8 pb-12">
      <div className="mx-auto flex max-w-lg flex-col gap-6">
        <header className="space-y-2 text-center">
          <p
            className="font-mono text-[10px] uppercase tracking-[0.35em]"
            style={{ color: cfg.accentColor }}
          >
            Recorded walkthrough
          </p>
          <h1 className="text-balance font-sans text-xl font-bold tracking-tight text-white">
            {cfg.title}
          </h1>
          <p className="text-sm leading-relaxed text-slate-400">
            The full experience is interactive on larger screens. On mobile,
            watch this capture to see the flow end to end.
          </p>
        </header>

        <div
          className="overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_0_60px_rgba(0,0,0,0.45)]"
          style={{
            boxShadow: `0 0 40px ${cfg.accentColor}12`,
          }}
        >
          <video
            className="block w-full"
            controls
            playsInline
            preload="metadata"
            aria-label={`${cfg.title} screen recording`}
          >
            {cfg.videoWebm ? (
              <source src={cfg.videoWebm} type="video/webm" />
            ) : null}
            <source src={cfg.videoMp4} type="video/mp4" />
            Your browser does not support embedded video.
          </video>
        </div>

        <div className="flex justify-center pt-2">
          <Link
            href={cfg.careerPathHref}
            className="group inline-flex items-center gap-2 rounded-xl border px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-[0.15em] transition-colors"
            style={{
              borderColor: `${cfg.accentColor}44`,
              backgroundColor: `${cfg.accentColor}10`,
              color: cfg.accentColor,
            }}
          >
            <span>Open career path</span>
            <span
              className="transition-transform group-hover:translate-x-0.5"
              aria-hidden
            >
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};
