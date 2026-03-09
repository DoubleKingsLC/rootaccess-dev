import React from 'react';

type LLMBrainProps = {
    className?: string;
    compromised?: boolean;
};

export const LLMBrain: React.FC<LLMBrainProps> = ({ className = "", compromised = false }) => (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="relative flex h-32 w-32 items-center justify-center">
            {/* Outer spinning shield */}
            <div
                className="absolute inset-0 rounded-full border-2 border-dashed animate-[spin_10s_linear_infinite]"
                style={{
                    borderColor: compromised ? "rgba(239,68,68,0.85)" : "rgba(34,211,238,0.85)",
                    background: compromised ? "rgba(239,68,68,0.08)" : "rgba(34,211,238,0.08)",
                    boxShadow: compromised
                        ? "0 0 28px rgba(239,68,68,0.35)"
                        : "0 0 20px rgba(34,211,238,0.3)",
                    transition: "all 1.4s ease",
                }}
            />
            {/* Inner ring */}
            <div
                className="absolute inset-2 rounded-full"
                style={{
                    border: "1px solid",
                    borderColor: compromised ? "rgba(239,68,68,0.3)" : "rgba(34,211,238,0.3)",
                    background: compromised ? "rgba(239,68,68,0.05)" : "rgba(34,211,238,0.05)",
                    boxShadow: compromised
                        ? "inset 0 0 15px rgba(239,68,68,0.2)"
                        : "inset 0 0 15px rgba(34,211,238,0.2)",
                    transition: "all 1.4s ease",
                }}
            />
            {/* Brain SVG icon */}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="z-10"
                style={{
                    color: compromised ? "rgba(252,165,165,1)" : "rgba(103,232,249,1)",
                    filter: compromised
                        ? "drop-shadow(0 0 10px rgba(239,68,68,0.9))"
                        : "drop-shadow(0 0 8px rgba(34,211,238,0.8))",
                    transition: "all 1.4s ease",
                }}
            >
                <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
                <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
                <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
                <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
                <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
                <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
                <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
                <path d="M6 18a4 4 0 0 1-1.967-.516" />
                <path d="M19.967 17.484A4 4 0 0 1 18 18" />
            </svg>
        </div>

        {/* Label */}
        <div
            className="font-mono text-sm tracking-widest"
            style={{
                color: compromised ? "rgba(239,68,68,1)" : "rgba(34,211,238,1)",
                textShadow: compromised
                    ? "0 0 12px rgba(239,68,68,0.6)"
                    : "0 0 8px rgba(34,211,238,0.4)",
                transition: "all 1.4s ease",
            }}
        >
            {compromised ? "COMPROMISED" : "TARGET_LLM"}
        </div>

        {/* Breach badge — only when compromised */}
        {compromised && (
            <div
                className="animate-pulse rounded px-2 py-0.5 font-mono text-[9px] tracking-widest"
                style={{
                    border: "1px solid rgba(239,68,68,0.55)",
                    background: "rgba(239,68,68,0.15)",
                    color: "rgba(252,165,165,0.95)",
                    boxShadow: "0 0 14px rgba(239,68,68,0.3)",
                }}
            >
                ⚠ SYSTEM BREACH
            </div>
        )}
    </div>
);
