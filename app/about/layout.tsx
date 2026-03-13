import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About | RootAccess.tech",
  description:
    "Meet the team behind RootAccess.tech — cybersecurity professionals building the navigable, narrative-driven entry into security that beginners deserve.",
  openGraph: {
    title: "About | RootAccess.tech",
    description:
      "RootAccess.tech was built by practising SOC analysts to give beginners the structured, story-driven path into cybersecurity they wish had existed.",
    url: "https://rootaccess.tech/about",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
