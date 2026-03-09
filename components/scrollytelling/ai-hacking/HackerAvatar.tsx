import React from 'react';

type HackerAvatarProps = {
    className?: string;
    progress?: number;
};

export const HackerAvatar: React.FC<HackerAvatarProps> = ({ className = "", progress = 0 }) => {
    const isAttacking = progress >= 0.30 && progress < 0.85;
    const isExfiltrating = progress >= 0.85;
    const isActive = progress >= 0.30;

    const statusLabel = isExfiltrating
        ? "EXFILTRATING"
        : isAttacking
            ? "INJECTING..."
            : null;

    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            <div
                className="relative flex h-24 w-24 items-center justify-center rounded-full border-2"
                style={{
                    borderColor: "rgba(239,68,68,1)",
                    background: "rgba(127,29,29,0.3)",
                    color: "rgba(239,68,68,1)",
                    boxShadow: isActive
                        ? "0 0 35px rgba(239,68,68,0.75), 0 0 70px rgba(239,68,68,0.25)"
                        : "0 0 15px rgba(239,68,68,0.5)",
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
                <div
                    className="absolute inset-0 rounded-full border border-red-500/50"
                    style={{
                        animation: isActive
                            ? "ping 1.2s ease-in-out infinite"
                            : "ping 3s ease-in-out infinite",
                    }}
                />
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
                    {statusLabel}
                </div>
            )}
        </div>
    );
};
