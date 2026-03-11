"use client";

import React, { forwardRef } from "react";

type TacticalBriefingProps = {
    text: string;
};

/**
 * TacticalBriefing Component
 * Designed for high-impact, simplistic narrative context during transitions.
 * Aesthetic: Deep Sea Ghost (Minimalist, transparent, sky-blue accents)
 */
export const TacticalBriefing = forwardRef<HTMLDivElement, TacticalBriefingProps>(
    ({ text }, ref) => {
        return (
            <div
                ref={ref}
                className="pointer-events-none absolute left-1/2 top-1/2 z-[45] -translate-x-1/2 -translate-y-1/2"
                style={{ opacity: 0, visibility: "hidden" }}
            >
                <div className="relative flex items-center justify-center">
                    {/* Deep Sea Ghost Card */}
                    <div className="rounded-2xl border border-sky-500/30 bg-slate-950/20 px-10 py-8 backdrop-blur-xl shadow-[0_0_80px_rgba(14,165,233,0.1)] text-center max-w-[90vw] md:max-w-2xl min-w-[280px]">
                        <p className="font-mono text-sky-400 text-sm sm:text-lg md:text-xl lg:text-3xl font-black tracking-tight uppercase leading-tight text-glow">
                            {text}
                        </p>
                    </div>

                    {/* Subtle accent corner marks */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-sky-400/50" />
                    <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-sky-400/50" />
                    <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-sky-400/50" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-sky-400/50" />
                </div>

                <style jsx>{`
          .text-glow {
            text-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
          }
        `}</style>
            </div>
        );
    }
);

TacticalBriefing.displayName = "TacticalBriefing";
