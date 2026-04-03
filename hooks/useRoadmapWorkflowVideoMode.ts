"use client";

import { useState, useEffect } from "react";
import {
  ROADMAP_WORKFLOW_VIDEO_MAX_WIDTH,
  ROADMAP_WORKFLOW_VIDEO_MIN_HEIGHT,
} from "@/lib/roadmapWorkflowMobile";

/**
 * True when the viewport is too narrow or too short for the interactive
 * workflow — use the recorded walkthrough instead (same as former `useIsMobile(768)` but stricter).
 */
export function useRoadmapWorkflowVideoMode() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const check = () => {
      setActive(
        window.innerWidth < ROADMAP_WORKFLOW_VIDEO_MAX_WIDTH ||
          window.innerHeight < ROADMAP_WORKFLOW_VIDEO_MIN_HEIGHT
      );
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return active;
}
