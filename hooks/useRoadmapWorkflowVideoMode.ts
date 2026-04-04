"use client";

import { useState, useLayoutEffect } from "react";
import {
  ROADMAP_WORKFLOW_VIDEO_MAX_WIDTH,
  ROADMAP_WORKFLOW_VIDEO_MIN_HEIGHT,
} from "@/lib/roadmapWorkflowMobile";

/**
 * CSS media query aligned with `width < ROADMAP_WORKFLOW_VIDEO_MAX_WIDTH` OR
 * `height < ROADMAP_WORKFLOW_VIDEO_MIN_HEIGHT`.
 */
function workflowVideoMediaQuery(): string {
  const w = ROADMAP_WORKFLOW_VIDEO_MAX_WIDTH - 1;
  const h = ROADMAP_WORKFLOW_VIDEO_MIN_HEIGHT - 1;
  return `(max-width: ${w}px), (max-height: ${h}px)`;
}

/**
 * True when the viewport is too narrow or too short for the interactive
 * workflow — use the recorded walkthrough instead.
 *
 * Uses `matchMedia` + `useLayoutEffect` so the value updates before the browser
 * paints (avoids a visible flash of the desktop experience on small viewports
 * after hydration). Server render stays `false` to match hydration.
 */
export function useRoadmapWorkflowVideoMode(): boolean {
  const [active, setActive] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia(workflowVideoMediaQuery());
    const sync = () => setActive(mq.matches);
    sync();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", sync);
      return () => mq.removeEventListener("change", sync);
    }
    mq.addListener(sync);
    return () => mq.removeListener(sync);
  }, []);

  return active;
}
