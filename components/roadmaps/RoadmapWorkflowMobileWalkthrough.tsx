"use client";

import React from "react";
import Link from "next/link";
import {
  ROADMAP_WORKFLOW_MOBILE,
  workflowWalkthroughVideoUrls,
  type RoadmapWorkflowSlug,
} from "@/lib/roadmapWorkflowMobile";

type Props = {
  slug: RoadmapWorkflowSlug;
};

export const RoadmapWorkflowMobileWalkthrough: React.FC<Props> = ({
  slug,
}) => {
  const cfg = ROADMAP_WORKFLOW_MOBILE[slug];
  const { webm, mp4 } = workflowWalkthroughVideoUrls(cfg.videoBasename);
  const workflowHref = `/roadmaps/${cfg.slug}`;

  return (
    <div className="flex min-h-[100dvh] w-full flex-col bg-[#060a0f]">
      {/* Top bar — aligned with mobile career path; higher-contrast text for readability */}
      <header
        className="sticky top-0 z-50 flex min-h-12 shrink-0 flex-wrap items-center gap-x-2 gap-y-1 px-4 py-2 sm:gap-x-3 sm:px-6"
        style={{
          background: "rgba(9,13,20,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(12px)",
        }}
      >
        <nav
          className="flex flex-wrap items-center gap-x-2 gap-y-1"
          aria-label="Breadcrumb"
        >
          <Link
            href="/"
            className="font-mono text-[10px] uppercase tracking-widest text-slate-200 transition-colors hover:text-white sm:text-[11px]"
          >
            Home
          </Link>
          <span
            className="font-mono text-[10px] text-slate-500 sm:text-[11px]"
            aria-hidden
          >
            /
          </span>
          <Link
            href={workflowHref}
            className="font-mono text-[10px] uppercase tracking-widest text-slate-200 transition-colors hover:text-white sm:text-[11px]"
          >
            {cfg.breadcrumbLabel}
          </Link>
          <span
            className="font-mono text-[10px] text-slate-500 sm:text-[11px]"
            aria-hidden
          >
            /
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-widest text-slate-400 sm:text-[11px]">
            Walkthrough
          </span>
        </nav>
      </header>

      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col gap-6 px-4 py-8 pb-12">
        <div className="space-y-2 text-center">
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
            The full experience is interactive on larger viewports. On this screen
            size, watch this capture to see the flow end to end.
          </p>
        </div>

        <div
          className="overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-[0_0_60px_rgba(0,0,0,0.45)]"
          style={{
            boxShadow: `0 0 40px ${cfg.accentColor}12`,
          }}
        >
          <video
            key={slug}
            className="block w-full"
            controls
            playsInline
            preload="metadata"
            aria-label={`${cfg.title} screen recording`}
          >
            <source src={webm} type="video/webm" />
            <source src={mp4} type="video/mp4" />
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
