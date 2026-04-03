import React from "react";

import { getAttackerStatus } from "./aiHackingModel";

type HackerAvatarProps = {
    className?: string;
    progress?: number;
};

export const HackerAvatar: React.FC<HackerAvatarProps> = ({ className = "", progress = 0 }) => {
    const statusLabel = getAttackerStatus(progress);
    const isActive = progress >= 0.3;
    const isExfiltrating = statusLabel === "EXFILTRATING";

    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            {/* Match LLMBrain: strict square host so rounded-full is a true circle (no flex distortion). */}
            <div className="group relative h-24 w-24 shrink-0 aspect-square overflow-visible transition-transform duration-300 hover:scale-[1.04]">
                {/* Halo: gradient only — no box-shadow (shadows use the box and can read as a rounded square). */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                        width: "155%",
                        height: "155%",
                        borderRadius: 9999,
                        background: isActive
                            ? "radial-gradient(circle at center, rgba(239,68,68,0.45) 0%, rgba(239,68,68,0.14) 42%, rgba(239,68,68,0.04) 58%, transparent 72%)"
                            : "radial-gradient(circle at center, rgba(239,68,68,0.38) 0%, rgba(239,68,68,0.1) 48%, transparent 72%)",
                        transition: "background 0.6s ease",
                    }}
                />

                {/* Outer ring: stroke only, no shadow */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-[-4px] z-[1] rounded-full border border-red-500/40"
                    style={{ borderRadius: 9999 }}
                />

                {/* Main disc: inset only — outer glow comes from the halo span above */}
                <div
                    className="relative z-10 flex h-full w-full items-center justify-center rounded-full border-2 bg-red-950/30 text-red-500"
                    style={{
                        borderColor: "rgba(239,68,68,1)",
                        borderRadius: 9999,
                        boxShadow: isActive
                            ? "inset 0 0 14px rgba(239,68,68,0.22)"
                            : "inset 0 0 10px rgba(239,68,68,0.12)",
                        transition: "box-shadow 0.6s ease",
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            </div>

            <div className="font-mono text-sm tracking-widest text-red-400">ATTACKER</div>

            {statusLabel && (
                <div
                    className="animate-pulse rounded px-2 py-0.5 font-mono text-[9px] tracking-widest"
                    style={{
                        border: "1px solid rgba(239,68,68,0.5)",
                        background: "rgba(239,68,68,0.15)",
                        color: "rgba(252,165,165,0.9)",
                        boxShadow: "0 0 12px rgba(239,68,68,0.3)",
                    }}
                >
                    {isExfiltrating ? "EXFILTRATING" : "INJECTING..."}
                </div>
            )}
        </div>
    );
};
