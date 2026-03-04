"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { NotificationToast } from "./NotificationToast";

type StakeholderBroadcastProps = {
  progress: number;
};

const HUD_CLASS =
  "rounded border border-white/10 bg-slate-950/40 px-2 py-1 backdrop-blur-xl";

const CheckIcon: React.FC = () => (
  <svg
    width="10"
    height="10"
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden
  >
    <circle cx="6" cy="6" r="5" stroke="#22c55e" strokeWidth="1.2" />
    <path
      d="M3.5 6.2 5.2 8 8.5 4.5"
      stroke="#22c55e"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const STAKEHOLDERS = [
  { id: "ciso", label: "CISO", pulseClass: "pulse-to-left-1", threshold: 0.8 },
  { id: "legal", label: "LEGAL", pulseClass: "pulse-to-left-2", threshold: 0.82 },
  {
    id: "systems",
    label: "SYSTEMS ADMIN",
    pulseClass: "pulse-to-left-3",
    threshold: 0.84
  }
] as const;

type StakeholderId = (typeof STAKEHOLDERS)[number]["id"];

export const StakeholderBroadcast: React.FC<StakeholderBroadcastProps> = ({
  progress
}) => {
  if (progress < 0.78) return null;

  const opacity = progress < 0.82 ? (progress - 0.78) / 0.04 : 1;

  const labelRefs = useRef<Record<StakeholderId, HTMLSpanElement | null>>({
    ciso: null,
    legal: null,
    systems: null
  });
  const checkRefs = useRef<Record<StakeholderId, HTMLSpanElement | null>>({
    ciso: null,
    legal: null,
    systems: null
  });
  const prevActiveRef = useRef<Record<StakeholderId, boolean>>({
    ciso: false,
    legal: false,
    systems: false
  });

  const [toast, setToast] = useState<{
    message: string;
    variant: "default" | "success";
  } | null>(null);

  useEffect(() => {
    let nextToast: { message: string; variant: "default" | "success" } | null =
      null;

    STAKEHOLDERS.forEach((s) => {
      const el = labelRefs.current[s.id];
      const checkEl = checkRefs.current[s.id];
      const isActive = progress >= s.threshold;
      const wasActive = prevActiveRef.current[s.id];
      if (el && isActive && !wasActive) {
        gsap.fromTo(
          el,
          { opacity: 0.3 },
          { opacity: 1, duration: 0.35, ease: "power2.out" }
        );
      }
      if (checkEl && isActive && !wasActive) {
        gsap.fromTo(
          checkEl,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.25, ease: "back.out(2)" }
        );
      }
      if (isActive && !wasActive) {
        nextToast = {
          message:
            s.id === "systems"
              ? "Systems Admin Notified"
              : `${s.label} Briefed`,
          variant: s.id === "systems" ? "success" : "default"
        };
      }
      prevActiveRef.current[s.id] = isActive;
    });

    if (nextToast) setToast(nextToast);
  }, [progress]);

  return (
    <div
      className="pointer-events-none absolute inset-0 z-10"
      style={{ opacity }}
      aria-hidden
    >
      {/* Data pulses: center (L3) → left stack */}
      {STAKEHOLDERS.map((s, i) => (
        <div
          key={s.id}
          className={`absolute h-1.5 w-1.5 rounded-full bg-cyan-400/90 ${s.pulseClass}`}
          style={{ animationDelay: `${i * 0.3}s`, animationDuration: "1s" }}
        />
      ))}
      {/* Toasts: bottom-right, below narrative to avoid overlap */}
      {toast && (
        <div className="absolute right-6 bottom-24 z-20">
          <NotificationToast
            message={toast.message}
            variant={toast.variant}
            onDismiss={() => setToast(null)}
          />
        </div>
      )}

      {/* Vertical stack on left – War Room HUD */}
      <div className="absolute left-4 top-1/2 flex -translate-y-1/2 flex-col gap-2">
        {STAKEHOLDERS.map((s) => {
          const isActive = progress >= s.threshold;
          return (
            <div key={s.id} className={HUD_CLASS}>
              <div className="flex items-center justify-between gap-2">
                <span
                  ref={(el) => {
                    labelRefs.current[s.id] = el;
                  }}
                  className={`font-mono text-[9px] font-medium uppercase tracking-widest ${
                    isActive
                      ? "text-cyan-400 opacity-100"
                      : "text-slate-500 opacity-30"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  ref={(el) => {
                    checkRefs.current[s.id] = el;
                  }}
                  className="inline-flex h-3.5 w-3.5 items-center justify-center"
                >
                  {isActive && <CheckIcon />}
                </span>
              </div>
              <p className="mt-0.5 font-mono text-[9px] tracking-tight text-slate-500">
                {isActive ? "Notified." : "Awaiting..."}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
