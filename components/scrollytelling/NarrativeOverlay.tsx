"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type NarrativeOverlayProps = {
  progress: number;
};

const BOX_CLASS =
  "rounded border border-white/10 bg-slate-950/40 p-4 text-white backdrop-blur-xl";

export const NarrativeOverlay: React.FC<NarrativeOverlayProps> = ({
  progress
}) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const prevMessageRef = useRef<string | null>(null);

  const p = progress;

  const at25 = p >= 0.22 && p < 0.55;
  const at60 = p >= 0.55 && p < 0.68;
  const at68 = p >= 0.68 && p < 0.75;
  const at75 = p >= 0.75 && p < 0.85;
  const at85 = p >= 0.85;

  const message = at85
    ? "Threat Neutralized. Restoring affected machines to their last known-good state. The system is back to normal."
    : at75
      ? "L3 Lead: Containment successful. Resetting compromised user credentials and killing the malicious background processes."
      : at68
        ? "L2 Analyst: Analyzing memory dumps and network traffic to identify the malware family."
        : at60
          ? "Incident Escalated: L1 filters the noise and confirms a true positive. Sending the ticket to L2 for deep forensics."
          : at25
            ? "L1 Analyst: Monitoring the SIEM. A suspicious beacon is detected from an internal workstation."
            : null;

  useEffect(() => {
    if (!message || !textRef.current) return;
    const isNewMessage = prevMessageRef.current !== message;
    prevMessageRef.current = message;

    if (isNewMessage) {
      gsap.fromTo(
        textRef.current,
        { y: 14, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
      );
    }
  }, [message]);

  if (!message) return null;

  return (
    <div className="pointer-events-none absolute right-6 top-6 max-w-sm">
      <div className={BOX_CLASS}>
        <p ref={textRef} className="font-sans text-sm leading-relaxed">
          {message}
          <span className="blink-cursor">_</span>
        </p>
      </div>
    </div>
  );
};
