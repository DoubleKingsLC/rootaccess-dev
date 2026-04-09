import type { Metadata } from "next";
import DetailedGRCClient from "./DetailedGRCClient";

export const metadata: Metadata = {
  title: "GRC Career Path — Deep Dive | RootAccess.tech",
  description:
    "A long-form breakdown of every certification, framework, and resource in the GRC career path — from audit trainee to CISO.",
  openGraph: {
    title: "GRC Career Path — Deep Dive | RootAccess.tech",
    description:
      "Why we recommend each certification, what it actually teaches, and how to sequence your learning at every stage of a GRC career.",
    url: "https://rootaccess.tech/roadmaps/grc/career-path/detailed",
  },
};

export default function GRCDetailedPage() {
  return <DetailedGRCClient />;
}
