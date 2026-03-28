import type { Metadata } from "next";
import DetailedAiHackingClient from "./DetailedAiHackingClient";

export const metadata: Metadata = {
  title: "AI Hacking Deep Dive | Root Access",
  description:
    "The granular breakdown of the AI Hacking career path. Every cert, every tool, and the why behind them — from prompt injection to principal AI security architect.",
};

export default function DetailedAiHackingPage() {
  return <DetailedAiHackingClient />;
}
