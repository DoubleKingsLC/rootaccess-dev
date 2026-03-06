import React, { forwardRef } from "react";

type MonitorType = "L1" | "L2" | "L3";

type MonitorPortalProps = {
    type: MonitorType;
};

const getHeaderText = (type: MonitorType) => {
    switch (type) {
        case "L1":
            return "L1 // REAL-TIME MONITORING";
        case "L2":
            return "L2 // EVENT CORRELATION";
        case "L3":
            return "L3 // FORENSIC ANALYSIS";
        default:
            return "MONITOR ONLINE";
    }
};

export const MonitorPortal = forwardRef<HTMLDivElement, MonitorPortalProps>(({ type }, ref) => {
    return (
        <div
            ref={ref}
            className="pointer-events-none absolute inset-0 z-40 flex h-full w-full items-center justify-center"
            style={{ opacity: 0, visibility: "hidden" }}
        >
            {/* Monitor Outer Casing */}
            <div className="relative flex h-[80vh] w-[80vw] flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-950/80 backdrop-blur-xl shadow-[inset_0_0_40px_rgba(14,165,233,0.1)]">
                {/* LCD Inset Border */}
                <div className="absolute inset-0 rounded-2xl border border-cyan-500/30" />

                {/* Monitor Header */}
                <div className="relative border-b border-cyan-500/20 bg-slate-950/50 px-6 py-3">
                    <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-cyan-400">
                        {getHeaderText(type)}
                    </p>
                </div>

                {/* Content Area (Transparent to see WorldStage behind it) */}
                <div className="relative flex-1" />
            </div>
        </div>
    );
});

MonitorPortal.displayName = "MonitorPortal";
