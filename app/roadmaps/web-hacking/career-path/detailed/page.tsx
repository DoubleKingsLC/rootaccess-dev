import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Hacking Career Path — Deep Dive | RootAccess.tech",
  description:
    "A long-form breakdown of every certification, skill, and resource in the web hacking career path — from total beginner to pentest lead.",
  openGraph: {
    title: "Web Hacking Career Path — Deep Dive | RootAccess.tech",
    description:
      "Why we recommend each certification, what it actually teaches, and how to sequence your learning at every stage of a web security career.",
    url: "https://rootaccess.tech/roadmaps/web-hacking/career-path/detailed",
  },
};

import DetailedWebHackingClient from "./DetailedWebHackingClient";

export default function WebHackingDetailedPage() {
  return <DetailedWebHackingClient />;
}
