import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SOC Career Path | RootAccess.tech",
  description:
    "A structured roadmap from entry-level to SOC Lead — certifications, skills, tools, and resources mapped across every tier of the Security Operations career path.",
  openGraph: {
    title: "SOC Career Path | RootAccess.tech",
    description:
      "Step-by-step progression from Tier 1 analyst to SOC Lead, with curated certifications, labs, and resources at every level.",
    url: "https://rootaccess.tech/roadmaps/soc/career-path",
  },
};

export default function CareerPathLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
