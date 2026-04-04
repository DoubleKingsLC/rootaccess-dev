/** Below this width, show recorded workflow video (interactive layouts target `lg+`). */
export const ROADMAP_WORKFLOW_VIDEO_MAX_WIDTH = 1024;

/** Below this height, show recorded workflow (pinned canvas / controls need vertical room). */
export const ROADMAP_WORKFLOW_VIDEO_MIN_HEIGHT = 700;

export type RoadmapWorkflowSlug =
  | "soc"
  | "web-hacking"
  | "ai-hacking"
  | "network-pentesting"
  | "grc";

/** Static root: maps to `public/roadmaps/workflow-walkthroughs/` */
const BASE = "/roadmaps/workflow-walkthroughs";

/**
 * Public URLs for walkthrough encodings. Place files at:
 * - `public/roadmaps/workflow-walkthroughs/webm/{basename}.webm`
 * - `public/roadmaps/workflow-walkthroughs/mp4/{basename}.mp4`
 */
export function workflowWalkthroughVideoUrls(basename: string): {
  webm: string;
  mp4: string;
} {
  return {
    webm: `${BASE}/webm/${basename}.webm`,
    mp4: `${BASE}/mp4/${basename}.mp4`,
  };
}

export type RoadmapWorkflowMobileConfig = {
  slug: RoadmapWorkflowSlug;
  title: string;
  accentColor: string;
  careerPathHref: string;
  /** Same stem for both `webm/{basename}.webm` and `mp4/{basename}.mp4` under `public/.../workflow-walkthroughs/`. */
  videoBasename: string;
  /** Middle segment in the top breadcrumb (e.g. "SOC", "Web Hacking"). */
  breadcrumbLabel: string;
};

export const ROADMAP_WORKFLOW_MOBILE: Record<
  RoadmapWorkflowSlug,
  RoadmapWorkflowMobileConfig
> = {
  soc: {
    slug: "soc",
    title: "SOC workflow",
    accentColor: "#22d3ee",
    careerPathHref: "/roadmaps/soc/career-path",
    videoBasename: "SOC_Mobile",
    breadcrumbLabel: "SOC",
  },
  "web-hacking": {
    slug: "web-hacking",
    title: "Web hacking workflow",
    accentColor: "#f43f5e",
    careerPathHref: "/roadmaps/web-hacking/career-path",
    videoBasename: "WebHacking_Mobile",
    breadcrumbLabel: "Web Hacking",
  },
  "ai-hacking": {
    slug: "ai-hacking",
    title: "AI hacking workflow",
    accentColor: "#ef4444",
    careerPathHref: "/roadmaps/ai-hacking/career-path",
    videoBasename: "AIhacking_Mobile",
    breadcrumbLabel: "AI Hacking",
  },
  "network-pentesting": {
    slug: "network-pentesting",
    title: "Network pentesting workflow",
    accentColor: "#dc2626",
    careerPathHref: "/roadmaps/network-pentesting/career-path",
    videoBasename: "NetworkPentesting_Mobile",
    breadcrumbLabel: "Network",
  },
  grc: {
    slug: "grc",
    title: "GRC workflow",
    accentColor: "#14b8a6",
    careerPathHref: "/roadmaps/grc/career-path",
    videoBasename: "GRC_Mobile",
    breadcrumbLabel: "GRC",
  },
};
