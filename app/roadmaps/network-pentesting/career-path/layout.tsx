import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Hacking Career Path | RootAccess.tech",
  description:
    "A structured roadmap from entry-level to Pentest Lead — certifications, skills, tools, and resources mapped across every tier of the web penetration testing career path.",
  openGraph: {
    title: "Web Hacking Career Path | RootAccess.tech",
    description:
      "Step-by-step progression from foundation to red team lead, with curated certifications, labs, and resources at every level.",
    url: "https://rootaccess.tech/roadmaps/web-hacking/career-path",
  },
};

export default function CareerPathLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
