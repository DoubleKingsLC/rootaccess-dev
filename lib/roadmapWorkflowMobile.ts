/** Below this width, show recorded workflow video (interactive layouts target `lg+`). */
export const ROADMAP_WORKFLOW_VIDEO_MAX_WIDTH = 1024;

/** Below this height, show recorded workflow (pinned canvas / controls need vertical room). */
export const ROADMAP_WORKFLOW_VIDEO_MIN_HEIGHT = 700;

export type RoadmapWorkflowSlug =
  | "soc"
  | "web-hacking"
  | "ai-hacking"
  | "network-pentesting";

export type RoadmapWorkflowMobileConfig = {
  slug: RoadmapWorkflowSlug;
  title: string;
  accentColor: string;
  careerPathHref: string;
  /** Public URL to MP4 in public/roadmaps/workflow-walkthroughs/ */
  videoMp4: string;
  /** Optional WebM (same basename + .webm) for browsers that support it. */
  videoWebm?: string;
};

const BASE = "/roadmaps/workflow-walkthroughs";

export const ROADMAP_WORKFLOW_MOBILE: Record<
  RoadmapWorkflowSlug,
  RoadmapWorkflowMobileConfig
> = {
  soc: {
    slug: "soc",
    title: "SOC workflow",
    accentColor: "#22d3ee",
    careerPathHref: "/roadmaps/soc/career-path",
    videoMp4: `${BASE}/SOC_Mobile.mp4`,
  },
  "web-hacking": {
    slug: "web-hacking",
    title: "Web hacking workflow",
    accentColor: "#f43f5e",
    careerPathHref: "/roadmaps/web-hacking/career-path",
    videoMp4: `${BASE}/WebHacking_Mobile.mp4`,
  },
  "ai-hacking": {
    slug: "ai-hacking",
    title: "AI hacking workflow",
    accentColor: "#ef4444",
    careerPathHref: "/roadmaps/ai-hacking/career-path",
    videoMp4: `${BASE}/AIhacking_Mobile.mp4`,
  },
  "network-pentesting": {
    slug: "network-pentesting",
    title: "Network pentesting workflow",
    accentColor: "#dc2626",
    careerPathHref: "/roadmaps/network-pentesting/career-path",
    videoMp4: `${BASE}/NetworkPentesting_Mobile.mp4`,
  },
};
