"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import presentationData from "@/public/assets/Presentation.json";

type PostMortemProps = { opacity: number };

export const PostMortem: React.FC<PostMortemProps> = ({ opacity }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const hasEntered = useRef(false);

  useGSAP(() => {
    if (opacity > 0.95) {
      if (!hasEntered.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", overwrite: true }
        );
        hasEntered.current = true;
      }
      lottieRef.current?.play();
    } else if (opacity < 0.9 && hasEntered.current) {
      // Proactive exit as soon as parent starts fading
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -40,
        scale: 0.95,
        duration: 1,
        ease: "power2.inOut",
        overwrite: true
      });
      lottieRef.current?.pause();
      hasEntered.current = false;
    }
  }, [opacity]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-center justify-center bg-slate-950/90 backdrop-blur-2xl transition-all duration-500 pointer-events-none"
      style={{ opacity }}
      aria-hidden
    >
      {/* ── Global CRT overlay ────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)" }}
      />

      <div ref={contentRef} className="relative z-10 flex w-full max-w-5xl items-center gap-12 px-10 opacity-0">

        {/* LEFT: Boardroom Presentation Lottie ───────────────────────────────── */}
        <div className="relative w-[540px] aspect-video overflow-hidden rounded-2xl border border-sky-500/30 bg-black shadow-[0_0_80px_rgba(14,165,233,0.1)] flex items-center justify-center">
          <Lottie
            lottieRef={lottieRef}
            animationData={presentationData}
            loop={true}
            autoplay={false}
            renderer="svg"
            className="w-full h-full scale-110"
          />

          <style jsx>{`
            .video-crisp {
              image-rendering: -webkit-optimize-contrast;
              image-rendering: crisp-edges;
            }
          `}</style>

          {/* Holographic Overlays */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_60px_rgba(14,165,233,0.15)]" />
          <div className="absolute top-0 left-0 h-10 w-10 border-t-2 border-l-2 border-sky-400/40 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-sky-400/40 rounded-br-2xl" />
        </div>

        {/* RIGHT: Executive Summary Panel ─────────────────────────────────── */}
        <div className="w-80 shrink-0 space-y-8">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-400/60">
                Case Report
              </p>
            </div>
            <h2 className="font-mono text-2xl font-black text-white uppercase italic tracking-tight">
              INC-2024-047
            </h2>
          </div>

          <div className="rounded-xl border border-sky-500/20 bg-slate-950/20 p-6 backdrop-blur-xl">
            <p className="mb-4 font-mono text-[9px] uppercase tracking-[0.2em] text-sky-500/70">
              Executive Summary
            </p>

            <ul className="space-y-4 font-mono text-[11px] leading-relaxed text-slate-300">
              <li className="flex gap-2">
                <span className="text-sky-500">◈</span>
                <span><strong className="text-sky-400">STATUS:</strong> Thwarted Pre-Exfil</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sky-500">◈</span>
                <span><strong className="text-sky-400">VECTOR:</strong> Brute Force Pivot</span>
              </li>
              <li className="flex gap-2">
                <span className="text-sky-500">◈</span>
                <span><strong className="text-sky-400">IMPACT:</strong> 0 Bytes Compromised</span>
              </li>
            </ul>

            <div className="mt-8 border-t border-sky-500/10 pt-6">
              <p className="font-mono text-[9px] uppercase text-slate-500 mb-1">Response Tier</p>
              <p className="font-mono text-sm font-bold text-sky-300">L3 FORENSIC OPS</p>
            </div>
          </div>

          <div className="opacity-40 italic">
            <p className="font-mono text-[9px] text-slate-400">
              Boardroom Presentation Mode // Authorized Personnel Only
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
