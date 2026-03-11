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
    if (opacity > 0.1) {
      if (!hasEntered.current) {
        gsap.fromTo(
          contentRef.current,
          { opacity: 0, y: 30, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", overwrite: true }
        );
        gsap.fromTo(
          ".hud-data-item",
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, duration: 0.6, stagger: 0.15, ease: "power2.out", delay: 0.4, overwrite: true }
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


          {/* Holographic Overlays */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl shadow-[inset_0_0_60px_rgba(14,165,233,0.15)]" />
          <div className="absolute top-0 left-0 h-10 w-10 border-t-2 border-l-2 border-sky-400/40 rounded-tl-2xl" />
          <div className="absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-sky-400/40 rounded-br-2xl" />
        </div>

        {/* RIGHT: Professional Executive Summary HUD ─────────────────────────── */}
        <div className="w-[420px] shrink-0 space-y-6">
          <div className="flex items-end justify-between border-b border-sky-500/20 pb-4">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
                <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-sky-400/60">
                  Incident Report
                </p>
              </div>
              <h2 className="font-mono text-3xl font-black text-white uppercase italic tracking-tighter">
                INC-2024-047
              </h2>
            </div>
            <div className="text-right">
              <p className="font-mono text-[8px] uppercase text-sky-500/40">Classification</p>
              <p className="font-mono text-[10px] font-bold text-red-400">CLASS-4 // CRITICAL</p>
            </div>
          </div>

          <div className="relative group">
            {/* HUD Corner Brackets */}
            <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-sky-400/50" />
            <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-sky-400/50" />
            <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-sky-400/50" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-sky-400/50" />

            <div className="rounded-sm border border-sky-500/10 bg-slate-950/40 p-6 backdrop-blur-2xl relative overflow-hidden">
              {/* Scanline Effect */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-sky-500/[0.03] to-transparent h-1/2 w-full animate-scanline" />
              
              <div className="flex justify-between items-center mb-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-sky-500/70">
                  Analysis Summary
                </p>
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1 h-3 bg-sky-500/20 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-sky-400 animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                {[
                  { label: "STATUS", value: "DEFEATED", sub: "Pre-Exfiltration phase reached", color: "text-sky-400" },
                  { label: "VECTOR", value: "LATERAL PIVOT", sub: "Brute force against internal API", color: "text-amber-400" },
                  { label: "IMPACT", value: "ZERO BYTES", sub: "Encryption routines neutralized", color: "text-emerald-400" }
                ].map((item, idx) => (
                  <div key={idx} className="hud-data-item group/item">
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="font-mono text-[9px] text-slate-500 tracking-widest">{item.label}</span>
                      <span className={`font-mono text-xs font-bold ${item.color}`}>{item.value}</span>
                    </div>
                    <div className="h-0.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-current opacity-30 w-full" />
                    </div>
                    <p className="font-mono text-[8px] text-slate-500 mt-1 uppercase tracking-wider">{item.sub}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4 border-t border-sky-500/10 pt-6">
                <div>
                  <p className="font-mono text-[8px] uppercase text-slate-500 mb-1">Response Tier</p>
                  <p className="font-mono text-xs font-bold text-sky-300">L3 FORENSIC OPS</p>
                </div>
                <div>
                  <p className="font-mono text-[8px] uppercase text-slate-500 mb-1">Incident Hash</p>
                  <p className="font-mono text-[10px] text-slate-400">0x8F2...EE1B</p>
                </div>
              </div>
            </div>
          </div>

          <div className="opacity-40 italic flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-800" />
            <p className="font-mono text-[9px] text-slate-400 whitespace-nowrap">
              SECURE LOG // BOARDROOM MODE
            </p>
            <div className="h-px flex-1 bg-slate-800" />
          </div>
        </div>

        <style jsx>{`
          .video-crisp {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
          }
          @keyframes scanline {
            0% { transform: translateY(-100%); }
            100% { transform: translateY(200%); }
          }
          .animate-scanline {
            animation: scanline 4s linear infinite;
          }
        `}</style>

      </div>
    </div>
  );
};
