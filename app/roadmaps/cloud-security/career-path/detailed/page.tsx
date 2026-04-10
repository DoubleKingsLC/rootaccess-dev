import type { Metadata } from "next";
import DetailedCloudSecurityClient from "./DetailedCloudSecurityClient";

export const metadata: Metadata = {
  title: "Cloud Security Career Path — Deep Dive | RootAccess.tech",
  description:
    "A long-form breakdown of every certification, skill, and resource in the cloud security career path — from total beginner to cloud security architect.",
  openGraph: {
    title: "Cloud Security Career Path — Deep Dive | RootAccess.tech",
    description:
      "Why we recommend each certification, what it actually teaches, and how to sequence your cloud security learning at every stage of your career.",
    url: "https://rootaccess.tech/roadmaps/cloud-security/career-path/detailed",
  },
};

export default function CloudSecurityDetailedPage() {
  return <DetailedCloudSecurityClient />;
}
