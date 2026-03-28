import type { Metadata } from "next";
import DetailedSOCPageClient from "./DetailedSOCPageClient";

export const metadata: Metadata = {
  title: "SOC Career Path Deep Dive | RootAccess.tech",
  description:
    "A long-form breakdown of every certification, skill, and resource in the SOC analyst career path from total beginner to SOC Lead.",
  openGraph: {
    title: "SOC Career Path Deep Dive | RootAccess.tech",
    description:
      "Why we recommend each certification, what it actually teaches, and how to sequence your learning at every stage of a blue team career.",
    url: "https://rootaccess.tech/roadmaps/soc/career-path/detailed",
  },
};

export default function SOCDetailedPage() {
  return <DetailedSOCPageClient />;
}
