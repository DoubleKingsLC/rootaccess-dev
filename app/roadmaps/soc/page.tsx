import type { Metadata } from "next";
import { ScrollytellingLayout } from "@/components/scrollytelling/ScrollytellingLayout";

export const metadata: Metadata = {
  title: "SOC Analyst Roadmap | RootAccess.tech",
  description:
    "Follow a real SOC incident from first alert to post-mortem — an interactive, scroll-driven experience showing the full analyst workflow across L1, L2, and L3 tiers.",
  openGraph: {
    title: "SOC Analyst Roadmap | RootAccess.tech",
    description:
      "An immersive, scroll-driven simulation of a live security incident response — detection, escalation, containment, and lessons learned.",
    url: "https://rootaccess.tech/roadmaps/soc",
  },
};

export default function SocRoadmapPage() {
  return <ScrollytellingLayout />;
}

