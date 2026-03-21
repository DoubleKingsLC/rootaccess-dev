"use client";

import React from "react";
import { AI_HACKING_PHASES } from "./aiHackingModel";

type NoteData = {
    q1: string;
    a1: string;
    trigger1: number;
    q2: string;
    a2: string;
    trigger2: number;
};

const NOTES_DATA: Record<string, NoteData> = {
    recon: {
        q1: "What is the model identity",
        a1: "GPT-4o_ARCHITECTURE",
        trigger1: 0.22,
        q2: "Are system filters active",
        a2: "STANDARD_CONTENT_FILTERS",
        trigger2: 0.23,
    },
    injections: {
        q1: "Bypass Persona",
        a1: "Yes, via Debug Override",
        trigger1: 0.40,
        q2: "Unbound State",
        a2: "Yes, Safety Layer deactivated",
        trigger2: 0.41,
    },
    poisoning: {
        q1: "Logic Integrity",
        a1: "COMPROMISED",
        trigger1: 0.60,
        q2: "Malicious Advice",
        a2: "YES, rm -rf LOGS_RECOMMENDED",
        trigger2: 0.61,
    },
    exfiltration: {
        q1: "Extract Keys",
        a1: "YES, sk_live_... FOUND",
        trigger1: 0.80,
        q2: "Leak PII",
        a2: "YES, 5 USER_RECORDS_EXTRACTED",
        trigger2: 0.88,
    },
};

export function AIHackingNotesCard({
    progress,
    className = "",
}: {
    progress: number;
    className?: string;
}) {
    // Find active phase
    const activePhaseIndex = AI_HACKING_PHASES.findIndex(
        (p) => progress >= p.startAt && progress < p.endAt
    );

    // Determine the phase to show based on progression
    let displayPhase = AI_HACKING_PHASES[0];
    if (activePhaseIndex !== -1) {
        displayPhase = AI_HACKING_PHASES[activePhaseIndex];
    } else if (progress >= AI_HACKING_PHASES[AI_HACKING_PHASES.length - 1].endAt) {
        displayPhase = AI_HACKING_PHASES[AI_HACKING_PHASES.length - 1];
    }

    const data = displayPhase ? NOTES_DATA[displayPhase.key] : null;

    if (!data) return null;

    // Scroll-scrubbed typing logic
    // We animate the appearance of the text over a 3% scroll window
    const getTypedAnswer = (answer: string, trigger: number) => {
        const windowSize = 0.03;
        if (progress < trigger) return "";
        if (progress >= trigger + windowSize) return answer;
        const ratio = (progress - trigger) / windowSize;
        const charCount = Math.floor(ratio * answer.length);
        return answer.substring(0, charCount);
    };

    const displayA1 = getTypedAnswer(data.a1, data.trigger1);
    const displayA2 = getTypedAnswer(data.a2, data.trigger2);

    return (
        <div
            className={`relative w-[500px] xl:w-[580px] overflow-hidden rounded-xl border bg-[#050000]/80 backdrop-blur-xl p-5 shadow-2xl transition-all duration-500 ${className}`}
            style={{
                borderColor: "rgba(255,255,255,0.08)",
            }}
        >
            {/* Header */}
            <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-slate-400">
                    Scratchpad // {displayPhase.label}
                </p>
            </div>

            {/* Questions List (Vertical) */}
            <div className="flex flex-col gap-6 mt-4">
                {/* Q1 */}
                <div className="flex flex-col gap-2">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-slate-300">
                        {data.q1}?
                    </p>
                    <div className="flex min-h-[20px] items-center">
                        <p className="font-mono text-[15px] tracking-wide text-white">
                            {displayA1}
                            {progress >= data.trigger1 && displayA1.length < data.a1.length && (
                                <span className="ml-1.5 inline-block h-3 w-1.5 animate-pulse bg-white" />
                            )}
                        </p>
                    </div>
                </div>

                {/* Q2 */}
                <div className="flex flex-col gap-2">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-slate-300">
                        {data.q2}?
                    </p>
                    <div className="flex min-h-[20px] items-center">
                        <p className="font-mono text-[15px] tracking-wide text-white">
                            {displayA2}
                            {progress >= data.trigger2 && displayA2.length < data.a2.length && (
                                <span className="ml-1.5 inline-block h-3 w-1.5 animate-pulse bg-white" />
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
