"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

export type BriefingRole = "ciso" | "legal" | "systems" | null;

type BriefingOverlayProps = {
  role: BriefingRole;
};

export const BriefingOverlay: React.FC<BriefingOverlayProps> = ({ role }) => {
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || !role) return;

    gsap.fromTo(
      el,
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.6)" }
    );
  }, [role]);

  if (!role) return null;

  let title = "";
  let body = "";
  let borderClass = "";

  if (role === "ciso") {
    title = "CISO BRIEFING";
    body =
      "The CISO is one of the bosses. They need a quick view of how big the risk is and what could break.";
    borderClass =
      "border-cyan-400/60 shadow-[0_0_24px_rgba(34,211,238,0.25)]";
  } else if (role === "legal") {
    title = "LEGAL BRIEFING";
    body =
      "Legal experts check if any laws or reporting rules apply and what we must tell other people.";
    borderClass =
      "border-cyan-400/60 shadow-[0_0_24px_rgba(34,211,238,0.25)]";
  } else if (role === "systems") {
    title = "SYSTEMS ADMIN BRIEFING";
    body =
      "Systems admins help reset passwords and bring affected machines back to a clean, safe state.";
    borderClass =
      "border-amber-400/60 shadow-[0_0_24px_rgba(251,191,36,0.25)]";
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
      <div
        ref={cardRef}
        className={`pointer-events-auto w-[min(480px,90vw)] max-h-[70vh] rounded-2xl border-2 bg-slate-950/80 px-6 py-6 backdrop-blur-2xl ${borderClass}`}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-400">
          {title}
        </p>
        <p className="mt-4 font-sans text-sm leading-relaxed text-slate-100">
          {body}
        </p>
      </div>
    </div>
  );
};

