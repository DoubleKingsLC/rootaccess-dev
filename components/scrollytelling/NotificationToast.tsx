"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

type NotificationToastProps = {
  message: string;
  variant?: "default" | "success";
  onDismiss: () => void;
};

const TOAST_CLASS =
  "rounded-lg border border-white/10 bg-slate-950/60 px-3 py-2 shadow-lg backdrop-blur-xl";

export const NotificationToast: React.FC<NotificationToastProps> = ({
  message,
  variant = "default",
  onDismiss
}) => {
  const toastRef = useRef<HTMLDivElement>(null);
  const onDismissRef = useRef(onDismiss);
  onDismissRef.current = onDismiss;

  useEffect(() => {
    const el = toastRef.current;
    if (!el) return;

    const inTween = gsap.fromTo(
      el,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
    );

    const timeout = window.setTimeout(() => {
      gsap.to(el, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => onDismissRef.current()
      });
    }, 2200);

    return () => {
      window.clearTimeout(timeout);
      inTween.kill();
    };
  }, [message]);

  const borderSuccess = variant === "success" ? "border-emerald-500/30" : "";

  return (
    <div
      ref={toastRef}
      className={`${TOAST_CLASS} ${borderSuccess} max-w-[200px]`}
      role="status"
      aria-live="polite"
    >
      <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">
        Incident Status Update
      </p>
      <p
        className={`mt-1 font-sans text-xs ${variant === "success" ? "text-emerald-300/90" : "text-slate-200"}`}
      >
        {message}
      </p>
    </div>
  );
};
