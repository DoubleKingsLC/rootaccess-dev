"use client";

import React, { forwardRef } from "react";


type MonitorType = "L1" | "L2" | "L3";

type MonitorPortalProps = {
    type: MonitorType;
    progress?: number;
};

const getHeaderText = (type: MonitorType) => {
    switch (type) {
        case "L1": return "L1 // REAL-TIME MONITORING — ALERT ACTIVE";
        case "L2": return "L2 // EVENT CORRELATION — PATTERN ANALYSIS";
        case "L3": return "L3 // FORENSIC ANALYSIS — ARTIFACT EXTRACTION";
    }
};

// ─── L1: SIEM terminal ───────────────────────────────────────────────────────

const LOG_LINES: { time: string; level: string; msg: string; alert?: boolean }[] = [
    { time: "14:21:44", level: "INFO", msg: "AUTH_OK   | user: m.torres  | src: 10.0.1.45   | region: US" },
    { time: "14:21:51", level: "INFO", msg: "AUTH_OK   | user: k.patel   | src: 10.0.2.12   | region: UK" },
    { time: "14:21:58", level: "INFO", msg: "FILE_READ | user: a.smith   | src: 10.0.1.87   | target: /reports/q4" },
    { time: "14:22:03", level: "INFO", msg: "AUTH_OK   | user: r.chen    | src: 10.0.3.21   | region: CA" },
    { time: "14:22:09", level: "INFO", msg: "NET_CON   | process: chrome | dst: 142.250.80.46 | port: 443" },
    { time: "14:22:14", level: "INFO", msg: "AUTH_OK   | user: j.nguyen  | src: 10.0.1.33   | region: US" },
    { time: "14:22:19", level: "INFO", msg: "SVC_OK    | service: nginx  | status: healthy" },
    { time: "14:22:27", level: "INFO", msg: "AUTH_OK   | user: p.wilson  | src: 10.0.4.55   | region: US" },
    { time: "14:22:31", level: "WARN", msg: "AUTH_FAIL x47 | user: j.chen | src: 185.220.101.47 | region: RU", alert: true },
    { time: "14:22:33", level: "INFO", msg: "DNS_RES   | domain: api.github.com | resolved: 140.82.112.3" },
    { time: "14:22:37", level: "INFO", msg: "AUTH_OK   | user: t.johnson | src: 10.0.2.88   | region: US" },
    { time: "14:22:41", level: "INFO", msg: "PROC_OK   | pid: 2341      | name: svchost.exe | status: normal" },
];

const L1Content: React.FC = () => (
    <div
        className="relative flex h-full flex-col overflow-hidden bg-slate-950"
        style={{ boxShadow: "inset 0 0 80px rgba(239,68,68,0.08)" }}
    >
        {/* CRT scanlines */}
        <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.025]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)" }}
            aria-hidden
        />

        {/* Status bar */}
        <div className="relative z-20 flex shrink-0 items-center gap-3 border-b border-red-900/40 bg-red-950/20 px-5 py-2">
            <div className="h-2 w-2 rounded-full bg-red-500 alert-pulse" style={{ boxShadow: "0 0 10px rgba(239,68,68,0.8)" }} />
            <span className="font-mono text-xs font-bold uppercase tracking-[0.25em] text-red-400">
                1 ALERT ACTIVE — Anomalous authentication pattern
            </span>
            <span className="ml-auto font-mono text-[9px] text-red-400/50">14:22:31 UTC</span>
        </div>

        {/* Scrolling log stream */}
        <div className="relative z-0 min-h-0 flex-1 overflow-hidden px-5 pt-4">
            <div className="mb-2 flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-slate-500">
                    SIEM live feed — 14,847 events/min
                </span>
            </div>
            <div style={{ animation: "log-scroll 14s linear infinite" }}>
                {[...LOG_LINES, ...LOG_LINES].map((line, i) => (
                    <div
                        key={i}
                        className={`flex items-baseline gap-4 font-mono leading-relaxed ${line.alert
                            ? "my-2 rounded-lg border-l-4 border-red-500 bg-red-950/50 px-4 py-3"
                            : "border-l border-transparent px-1 py-1 opacity-35"
                            }`}
                        style={line.alert ? {
                            boxShadow: "0 0 40px rgba(239,68,68,0.3), inset 0 0 30px rgba(239,68,68,0.08)"
                        } : undefined}
                    >
                        <span className={`shrink-0 ${line.alert ? "text-xs text-red-400/80" : "text-[10px] text-slate-600"}`}>
                            {line.time}
                        </span>
                        <span className={`shrink-0 ${line.alert ? "text-sm font-black text-red-500" : "w-12 text-[10px] text-slate-600"}`}>
                            {line.level}
                        </span>
                        <span className={line.alert ? "text-base font-semibold text-red-200" : "text-xs text-slate-500"}>
                            {line.msg}
                        </span>
                    </div>
                ))}
            </div>
        </div>

        {/* Alert explanation — pinned at bottom */}
        <div
            className="relative z-20 mx-5 mb-5 mt-3 shrink-0 rounded-xl border-2 border-red-500/60 bg-red-950/30 px-5 py-4"
            style={{ boxShadow: "0 0 50px rgba(239,68,68,0.25), inset 0 0 30px rgba(239,68,68,0.06)" }}
        >
            <div className="flex items-start gap-4">
                <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border-2 border-red-500/60 bg-red-950/80 text-3xl"
                    style={{ boxShadow: "0 0 20px rgba(239,68,68,0.5)" }}
                >
                    ⚠
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400">
                        What the L1 Analyst Sees
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold leading-snug text-red-100">
                        47 failed logins in 4 minutes — same account, from Russia
                    </p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-slate-300">
                        One login attempt every 5 seconds. That&apos;s not a forgotten password — that&apos;s a brute-force attack.
                        The L1 analyst flags it and escalates immediately.
                    </p>
                    <div className="mt-3 flex items-center gap-2">
                        <span className="font-mono text-xs font-medium text-cyan-400">Escalating to L2 for deep analysis</span>
                        <span className="blink-cursor inline-block h-4 w-1 bg-cyan-400" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// ─── L2: Event correlation ────────────────────────────────────────────────────

// ── Mini-visualization: Event 1 — 47 AUTH_FAIL brute force ───────────────────
const AuthFailViz: React.FC<{ correlated: boolean }> = ({ correlated }) => (
    <div
        className="relative mb-3 overflow-hidden rounded-xl border bg-slate-950/90 transition-all duration-700 h-full flex flex-col"
        style={{
            borderColor: correlated ? "rgba(239,68,68,0.55)" : "rgba(51,65,85,0.4)",
            boxShadow: correlated ? "0 0 32px rgba(239,68,68,0.3), inset 0 0 40px rgba(239,68,68,0.05)" : "none",
            minHeight: 300,
        }}
    >
        {/* CRT scanlines */}
        <div className="pointer-events-none absolute inset-0 z-20 opacity-[0.03]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.8) 2px,rgba(0,0,0,0.8) 4px)" }} />

        {/* Scrolling AUTH_FAIL log — absolute background layer */}
        <div className="absolute inset-0 z-0 select-none overflow-hidden"
            style={{ opacity: correlated ? 0.5 : 0.22, transition: "opacity 0.7s" }}>
            <div style={{ animation: "log-scroll 2.2s linear infinite" }}>
                {Array.from({ length: 40 }, (_, k) => {
                    const attempt = 31 + (k % 47);
                    const src = k % 3 === 0 ? "185.220.101.47" : k % 3 === 1 ? "185.220.101.48" : "94.102.49.190";
                    return (
                        <div key={k} className="flex items-baseline gap-3 px-4 py-[3px] font-mono text-xs"
                            style={{ color: correlated ? "rgba(239,68,68,0.75)" : "rgba(239,68,68,0.4)" }}>
                            <span className="shrink-0 text-red-800/70">{`14:22:${String(attempt % 60).padStart(2, "0")}`}</span>
                            <span className="font-black text-red-500">AUTH_FAIL</span>
                            <span className="text-red-600">j.chen</span>
                            <span className="text-slate-600">{src}</span>
                            <span className="ml-auto font-bold text-red-800">RU</span>
                        </div>
                    );
                })}
            </div>
        </div>

        {/* Foreground content — fills available height */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-4 py-6 text-center"
            style={{ background: "linear-gradient(to bottom, rgba(2,4,12,0.05) 0%, rgba(2,4,12,0.85) 20%, rgba(2,4,12,0.85) 80%, rgba(2,4,12,0.05) 100%)" }}>

            {/* Attack rate bar */}
            <div className="mx-auto mb-4 w-4/5">
                <div className="mb-1.5 flex justify-between font-mono text-[10px] font-medium text-red-600">
                    <span>ATTEMPT RATE</span><span>1 every 5 seconds</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-900">
                    <div className="h-full rounded-full bg-red-500"
                        style={{ width: "94%", boxShadow: "0 0 10px rgba(239,68,68,0.9)", animation: "alert-pulse 1.1s ease-in-out infinite" }} />
                </div>
            </div>

            {/* Big counter */}
            <p className="font-mono font-black leading-none tabular-nums"
                style={{
                    fontSize: "clamp(32px, 4.5vw, 68px)",
                    color: "#ef4444",
                    textShadow: correlated
                        ? "0 0 50px rgba(239,68,68,1), 0 0 100px rgba(239,68,68,0.7)"
                        : "0 0 30px rgba(239,68,68,0.5)",
                }}>×47</p>
            <p className="mt-2 font-mono text-sm font-black uppercase tracking-[0.4em] text-red-400">FAILED LOGINS</p>

            {/* Timeline strip */}
            <div className="mx-auto mt-4 w-4/5">
                <div className="mb-1.5 flex justify-between font-mono text-[10px] text-red-800">
                    <span>14:22:31</span><span>14:26:29</span>
                </div>
                <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-900/80">
                    {Array.from({ length: 12 }, (_, k) => (
                        <div key={k} className="absolute top-0 h-full w-[3px] rounded-sm bg-red-600"
                            style={{ left: `${(k / 11) * 95}%`, opacity: 0.5 + (k / 11) * 0.5 }} />
                    ))}
                    <div className="absolute inset-0 rounded-full"
                        style={{ background: "linear-gradient(to right, rgba(239,68,68,0.12), rgba(239,68,68,0.45))" }} />
                </div>
                <p className="mt-1.5 font-mono text-[10px] font-medium text-red-700">4 MIN WINDOW · BRUTE FORCE PATTERN DETECTED</p>
            </div>
        </div>


    </div>
);

// ── Mini-visualization: Event 2 — Finance file tree ──────────────────────────
const FileBrowserViz: React.FC<{ correlated: boolean }> = ({ correlated }) => (
    <div
        className="relative mb-3 overflow-hidden rounded-xl border bg-slate-950/90 transition-all duration-700 h-full flex flex-col"
        style={{
            borderColor: correlated ? "rgba(245,158,11,0.5)" : "rgba(51,65,85,0.4)",
            boxShadow: correlated ? "0 0 24px rgba(245,158,11,0.2)" : "none",
            minHeight: 300,
        }}
    >
        {/* Terminal header bar */}
        <div className="flex items-center gap-2.5 border-b px-4 py-2.5"
            style={{ borderColor: correlated ? "rgba(245,158,11,0.25)" : "rgba(51,65,85,0.3)", background: "rgba(15,23,42,0.85)" }}>
            <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: correlated ? "#f59e0b" : "#334155", boxShadow: correlated ? "0 0 10px #f59e0b" : "none", transition: "all 0.5s" }} />
            <span className="font-mono text-[10px] uppercase tracking-widest truncate" style={{ color: correlated ? "rgba(245,158,11,0.75)" : "rgba(71,85,105,0.5)" }}>
                FILE SYSTEM AUDIT — WS-04 — j.chen SESSION
            </span>
        </div>

        {/* Body — flex-1 so it fills the remaining card space */}
        <div className="flex-1 px-4 pt-3 pb-3">
            {/* Path breadcrumb */}
            <div className="mb-3 font-mono text-xs text-slate-600">
                <span className="text-slate-700">/network/</span>
                <span className="text-slate-600">shared/</span>
                <span style={{ color: correlated ? "rgba(245,158,11,0.65)" : "rgba(100,116,139,0.5)" }}>Finance/</span>
            </div>

            {/* File tree */}
            <div className="space-y-1.5 font-mono text-xs">
                {[
                    { indent: 0, icon: "📁", name: "/network/shared/", active: false },
                    { indent: 1, icon: "📁", name: "HR/", active: false, tag: "NO ACCESS", tagColor: "rgba(71,85,105,0.5)" },
                    { indent: 1, icon: "📁", name: "Finance/", active: true },
                ].map((f, k) => (
                    <div key={k} className="flex items-center gap-2" style={{ paddingLeft: f.indent * 12 }}>
                        <span>{f.icon}</span>
                        <span style={{ color: (f as { active?: boolean }).active ? (correlated ? "rgba(245,158,11,0.85)" : "rgba(100,116,139,0.65)") : "rgba(71,85,105,0.45)", transition: "color 0.5s" }}>
                            {f.name}
                        </span>
                        {(f as { tag?: string; tagColor?: string }).tag && <span className="font-mono text-[9px]" style={{ color: (f as { tagColor?: string }).tagColor }}>— {(f as { tag?: string }).tag}</span>}
                    </div>
                ))}

                {/* Accessed file */}
                <div className="rounded-lg border px-3 py-2.5 transition-all duration-700"
                    style={{
                        borderColor: correlated ? "rgba(245,158,11,0.6)" : "rgba(51,65,85,0.35)",
                        background: correlated ? "rgba(120,53,15,0.28)" : "rgba(15,23,42,0.4)",
                        boxShadow: correlated ? "0 0 24px rgba(245,158,11,0.22)" : "none",
                    }}>
                    <div className="flex items-start gap-2.5">
                        <span className="text-lg shrink-0">📊</span>
                        <div className="flex-1 min-w-0">
                            <p className="font-mono text-xs font-bold truncate transition-colors duration-500"
                                style={{ color: correlated ? "#fbbf24" : "rgba(100,116,139,0.6)" }}>
                                Q4_Reports_2024.xlsx
                            </p>
                        </div>
                        <p className="animate-pulse shrink-0 font-mono text-xs font-black" style={{ color: "#f59e0b" }}>● OPENED</p>
                    </div>
                    {correlated && (
                        <div className="mt-2.5 border-t border-amber-900/30 pt-2.5">
                            <div className="flex justify-between font-mono text-[10px] font-medium text-amber-700">
                                <span>OPEN</span><span>READ 847 KB</span><span>COPY?</span>
                            </div>
                            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-900">
                                <div className="h-full rounded-full bg-amber-500/70 animate-pulse" style={{ width: "60%", boxShadow: "0 0 8px rgba(245,158,11,0.7)" }} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Analyst query */}
                {correlated && (
                    <div className="mt-3 rounded-lg border px-3 py-3 transition-all duration-700"
                        style={{ borderColor: "rgba(245,158,11,0.45)", background: "rgba(120,53,15,0.22)", boxShadow: "0 0 18px rgba(245,158,11,0.12)" }}>
                        <p className="font-mono text-xs font-black leading-snug text-amber-200"
                            style={{ textShadow: "0 0 20px rgba(245,158,11,0.6)" }}>
                            Were any business critical files accessed?
                            <span className="blink-cursor ml-1 inline-block h-4 w-0.5 bg-amber-400 align-middle" />
                        </p>
                    </div>
                )}
            </div>
        </div>


    </div>
);

// ── Mini-visualization: Event 3 — Dark web / C2 contact ──────────────────────
const DarkWebViz: React.FC<{ correlated: boolean }> = ({ correlated }) => (
    <div
        className="relative mb-3 overflow-hidden rounded-xl border bg-slate-950/90 transition-all duration-700 h-full flex flex-col"
        style={{
            borderColor: correlated ? "rgba(139,92,246,0.5)" : "rgba(51,65,85,0.4)",
            boxShadow: correlated ? "0 0 24px rgba(139,92,246,0.2)" : "none",
            minHeight: 300,
        }}
    >
        {/* Terminal header */}
        <div className="flex items-center gap-2.5 border-b px-4 py-2.5"
            style={{ borderColor: correlated ? "rgba(139,92,246,0.25)" : "rgba(51,65,85,0.3)", background: "rgba(10,4,28,0.92)" }}>
            <div className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: correlated ? "#8b5cf6" : "#334155", boxShadow: correlated ? "0 0 10px #8b5cf6" : "none", transition: "all 0.5s", animation: correlated ? "alert-pulse 1.3s ease-in-out infinite" : "none" }} />
            <span className="font-mono text-[10px] uppercase tracking-widest truncate" style={{ color: correlated ? "rgba(139,92,246,0.75)" : "rgba(71,85,105,0.5)" }}>
                NETWORK ANALYSIS — OUTBOUND TRAFFIC — WS-04
            </span>
        </div>

        {/* Body — flex-1 fills remaining card space */}
        <div className="flex-1 px-4 pt-3 pb-3 space-y-3">
            {/* Connection diagram */}
            <div className="flex items-center gap-3">
                <div className="shrink-0 text-center">
                    <div className="flex h-12 w-14 items-center justify-center rounded-xl border-2 text-2xl mx-auto transition-all duration-500"
                        style={{
                            borderColor: correlated ? "rgba(239,68,68,0.55)" : "rgba(51,65,85,0.3)",
                            background: "rgba(15,23,42,0.9)",
                            boxShadow: correlated ? "0 0 16px rgba(239,68,68,0.25)" : "none",
                        }}>💻</div>
                    <p className="mt-1 font-mono text-[10px] font-black text-red-400">WS-04</p>
                    <p className="font-mono text-[8px] text-slate-500">LONDON</p>
                </div>

                {/* Animated track */}
                <div className="relative flex-1" style={{ height: 44 }}>
                    <div className="absolute inset-y-0 my-auto h-px w-full transition-all duration-700"
                        style={{ background: correlated ? "linear-gradient(to right, rgba(239,68,68,0.35), rgba(139,92,246,0.5))" : "rgba(51,65,85,0.25)" }} />
                    <div className="absolute bottom-1 left-0 right-0 text-center overflow-hidden">
                        <span className="font-mono text-[9px] font-medium" style={{ color: correlated ? "rgba(139,92,246,0.6)" : "rgba(51,65,85,0.3)" }}>HTTPS · PORT 443 · ENCRYPTED</span>
                    </div>
                    {[0, 0.8].map((delay, k) => (
                        <div key={k} style={{
                            position: "absolute", top: "32%", left: "0%",
                            transform: "translateY(-50%)",
                            width: 10, height: 10, borderRadius: "50%",
                            background: "#8b5cf6",
                            boxShadow: "0 0 14px #8b5cf6, 0 0 28px rgba(139,92,246,0.7)",
                            animation: "packet-h 1.6s linear infinite",
                            animationDelay: `${delay}s`,
                        }} />
                    ))}
                </div>

                <div className="shrink-0 text-center">
                    <div className="flex h-12 w-14 items-center justify-center rounded-xl border-2 text-2xl mx-auto transition-all duration-500"
                        style={{
                            borderColor: correlated ? "rgba(139,92,246,0.6)" : "rgba(51,65,85,0.3)",
                            background: correlated ? "rgba(46,16,101,0.35)" : "rgba(15,23,42,0.9)",
                            boxShadow: correlated ? "0 0 20px rgba(139,92,246,0.35)" : "none",
                        }}>🌑</div>
                    <p className="mt-1 font-mono text-[10px] font-black text-violet-400">TOR NODE</p>
                    <p className="font-mono text-[8px] text-slate-500">.onion</p>
                </div>
            </div>

            {/* Context lines */}
            <div className="space-y-1">
                <p className="font-mono text-[10px] text-slate-400">Target: <span className="text-violet-300">a3f2c91b.onion</span></p>
                <p className="font-mono text-[10px] text-slate-400">Status: <span className={correlated ? "animate-pulse font-semibold text-violet-400" : "text-slate-600"}>BEACON established ●</span></p>
                {correlated && <p className="font-mono text-[10px] font-bold tracking-widest text-violet-700/80">C2 ACTIVE — BEACONING EVERY 300s</p>}
            </div>

            {/* Analyst query */}
            {correlated && (
                <div className="rounded-lg border px-3 py-3 transition-all duration-700"
                    style={{ borderColor: "rgba(139,92,246,0.45)", background: "rgba(46,16,101,0.25)", boxShadow: "0 0 18px rgba(139,92,246,0.12)" }}>
                    <p className="font-mono text-xs font-black leading-snug text-violet-200"
                        style={{ textShadow: "0 0 20px rgba(139,92,246,0.6)" }}>
                        Is the IP contacted linked to a known attack group?
                        <span className="blink-cursor ml-1 inline-block h-4 w-0.5 bg-violet-400 align-middle" />
                    </p>
                </div>
            )}
        </div>


    </div>
);

const CORR_EVENTS = [
    {
        num: "01",
        icon: "🔐",
        title: "47 Failed Logins",
        subtitle: "14:22:31 — 185.220.101.47 · Russia",
        plain: "47 login attempts in 4 minutes. One account. One attacker.",
    },
    {
        num: "02",
        icon: "📂",
        title: "Sensitive Files Opened",
        subtitle: "14:23:05 — Finance / Q4 Reports",
        plain: "Confidential financials opened seconds after access was gained.",
    },
    {
        num: "03",
        icon: "🛰",
        title: "Dark Web Contact",
        subtitle: "14:24:12 — Outbound DNS to .onion",
        plain: "The machine phoned a dark web server — a classic C2 signal.",
    },
] as const;

const VIZ_COMPONENTS = [AuthFailViz, FileBrowserViz, DarkWebViz] as const;

const L2Content: React.FC<{ progress: number }> = ({ progress }) => {
    const correlated = progress >= 0.41;

    return (
        <div className="relative flex h-full flex-col p-5">
            {/* Status bar */}
            <div className="mb-3 flex shrink-0 flex-wrap items-center gap-2 border-b border-slate-700/40 pb-3">
                <div className="h-2 w-2 shrink-0 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                    L2 Analyst — connecting the dots across 3 events
                </span>
                {correlated && (
                    <span
                        className="ml-auto rounded border border-cyan-500/40 bg-cyan-950/30 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-widest text-cyan-300 whitespace-nowrap"
                        style={{ boxShadow: "0 0 12px rgba(34,211,238,0.3)" }}
                    >
                        ▸ LATERAL MOVEMENT CONFIRMED ◂
                    </span>
                )}
                {!correlated && (
                    <span className="ml-auto font-mono text-[9px] text-slate-500">Cross-referencing...</span>
                )}
            </div>

            {/* Three evidence cards — stretch to fill space */}
            <div className="flex-1 overflow-hidden">
                <div className="flex flex-col xl:flex-row gap-4 h-full">
                    {CORR_EVENTS.map((ev, i) => {
                        const VizComp = VIZ_COMPONENTS[i];
                        return (
                            <div
                                key={i}
                                className={`flex flex-col rounded-2xl border-2 bg-slate-900/80 p-4 transition-all duration-700 w-full xl:flex-1 h-full ${correlated
                                    ? "border-cyan-400/45 shadow-[0_0_28px_rgba(34,211,238,0.18)]"
                                    : "border-slate-700/40"
                                    }`}
                                style={{ transitionDelay: `${i * 0.14}s` }}
                            >
                                {/* Event badge + title row */}
                                <div className="mb-2 flex items-center justify-between gap-2">
                                    <div className="min-w-0">
                                        <span className={`block font-mono text-[8px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${correlated ? "text-cyan-400" : "text-slate-600"}`}>
                                            EVENT {ev.num}
                                        </span>
                                        <p className={`font-mono text-xs font-bold leading-tight transition-colors duration-500 ${correlated ? "text-white" : "text-slate-400"}`}>
                                            {ev.title}
                                        </p>
                                    </div>
                                    <span className="shrink-0 text-lg">{ev.icon}</span>
                                </div>

                                {/* Mini-visualization — flex-1 fills remaining card height */}
                                <div className="flex-1">
                                    <VizComp correlated={correlated} />
                                </div>


                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Verdict strip */}
            <div
                className={`mt-3 shrink-0 rounded-xl border-2 px-5 py-4 transition-all duration-700 ${correlated
                    ? "border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_28px_rgba(34,211,238,0.1)]"
                    : "border-slate-700/20 bg-slate-900/20"
                    }`}
            >
                {correlated ? (
                    <div className="flex items-center gap-3 flex-wrap">
                        <p className="font-mono text-base font-black leading-snug text-cyan-200"
                            style={{ textShadow: "0 0 24px rgba(34,211,238,0.65)" }}>
                            Are these isolated anomalies, or one coordinated attack chain?
                        </p>
                        <span className="blink-cursor inline-block h-5 w-0.5 shrink-0 bg-cyan-400" />
                    </div>
                ) : (
                    <p className="font-mono text-[10px] uppercase tracking-widest text-slate-600">
                        Cross-referencing events across systems...
                    </p>
                )}
            </div>


        </div>
    );
};

// ─── L3: Forensic results ─────────────────────────────────────────────────────

const L3Content: React.FC = () => (
    <div
        className="relative overflow-hidden h-full"
        style={{ display: "grid", gridTemplateRows: "auto auto 1fr auto", padding: "16px 20px", gap: "10px" }}
    >
        {/* CRT scanlines */}
        <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.02]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)" }}
            aria-hidden
        />

        {/* Row 1 — Status bar */}
        <div className="flex items-center gap-3 border-b border-amber-900/40 bg-amber-950/10 pb-3">
            <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" style={{ boxShadow: "0 0 8px rgba(251,191,36,0.8)" }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400">
                L3 Analyst — 3 forensic findings extracted
            </span>
        </div>

        {/* Row 2 — Top row: Disk imaging + Malware detection */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            {/* Finding 1: Disk */}
            <div className="flex flex-col gap-3 rounded-2xl border border-slate-700/40 bg-slate-900/60 p-5">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">💾</span>
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-slate-400">Finding 1 — Disk Acquired</p>
                        <p className="font-mono text-sm font-bold text-white">DISK_IMAGE_WS04.img</p>
                    </div>
                </div>
                <p className="font-mono text-[9px] text-slate-500">Workstation WS-04 · 14:32:07 UTC · 512 GB</p>
                <p className="font-sans text-sm text-slate-300">
                    L3 physically removed the hard drive and took a complete copy — a bit-for-bit snapshot of everything on the machine.
                </p>
                <div className="mt-auto">
                    <div className="mb-1.5 flex justify-between">
                        <span className="font-mono text-[8px] uppercase tracking-wider text-emerald-400">Scan complete</span>
                        <span className="font-mono text-[8px] text-slate-500">2,847 artifacts catalogued</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                        <div
                            className="h-full w-full rounded-full bg-emerald-400"
                            style={{ boxShadow: "0 0 12px rgba(52,211,153,0.7)" }}
                        />
                    </div>
                </div>
            </div>

            {/* Finding 2: Malware */}
            <div
                className="flex flex-col gap-3 rounded-2xl border-2 border-red-500/50 bg-red-950/25 p-5"
                style={{ boxShadow: "0 0 30px rgba(239,68,68,0.15)" }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border-2 border-red-500/60 bg-red-950/80 text-2xl"
                        style={{ boxShadow: "0 0 16px rgba(239,68,68,0.5)" }}
                    >
                        ☠
                    </div>
                    <div>
                        <p className="font-mono text-[9px] uppercase tracking-widest text-red-400">Finding 2 — Malware Identified</p>
                        <p className="font-mono text-sm font-bold text-red-200">svchost32.exe</p>
                    </div>
                </div>
                <p className="font-sans text-sm text-slate-300">
                    A malicious file disguised as a normal Windows process — hiding in plain sight. The &quot;32&quot; in the name is the giveaway.
                </p>
                <div className="mt-auto flex flex-wrap gap-2">
                    <div
                        className="rounded-lg border-2 border-red-500/40 bg-red-950/60 px-3 py-2"
                        style={{ boxShadow: "0 0 12px rgba(239,68,68,0.2)" }}
                    >
                        <p className="font-mono text-sm font-black text-red-400">VERDICT: MALICIOUS</p>
                    </div>
                    <div className="rounded-lg border border-slate-700/30 bg-slate-900/40 px-3 py-2">
                        <p className="font-mono text-[9px] text-slate-400">MD5: a3f2...c91b</p>
                    </div>
                </div>
            </div>
        </div>

        {/* Row 3 — Finding 3: C2 network diagram (1fr — fills remaining space) */}
        <div
            className="relative overflow-hidden rounded-2xl border-2 border-amber-500/40 bg-amber-950/10"
            style={{ boxShadow: "0 0 30px rgba(251,191,36,0.08)" }}
        >
            {/* absolute inset fills the 1fr cell — breaks flex chain for Firefox */}
            <div className="absolute inset-0 flex flex-col p-4 overflow-hidden">
                <div className="shrink-0 mb-2 flex items-center gap-3">
                    <span className="text-xl">📡</span>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400">
                        Finding 3 — Attacker&apos;s remote control channel traced
                    </p>
                </div>
                <p className="shrink-0 mb-3 font-sans text-sm leading-relaxed text-slate-300">
                    The malware was secretly phoning home every 5 minutes — receiving orders and sending stolen data. This is called Command &amp; Control (C2).
                </p>

                {/* Visual diagram */}
                <div className="flex flex-1 min-h-0 flex-col xl:flex-row items-center justify-around gap-3 xl:gap-0">
                    {/* Infected machine */}
                    <div className="flex flex-col items-center gap-2">
                        <div
                            className="flex items-center justify-center rounded-2xl border-2 border-red-500/60 bg-slate-900"
                            style={{
                                width: "clamp(56px,7vw,96px)", height: "clamp(48px,6vw,80px)",
                                fontSize: "clamp(1.5rem,3vw,2.5rem)",
                                boxShadow: "0 0 24px rgba(239,68,68,0.25)"
                            }}
                        >
                            💻
                        </div>
                        <div className="text-center">
                            <p className="font-mono text-xs font-bold text-red-300">WS-04</p>
                            <p className="font-mono text-[8px] text-red-400/70">INFECTED</p>
                            <p className="font-mono text-[8px] text-slate-500">London Office</p>
                        </div>
                    </div>

                    {/* Animated connection */}
                    <div className="relative flex flex-1 w-full xl:w-auto flex-col items-center gap-2 px-4">
                        <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300">
                            Secret beacon every 300s
                        </p>
                        <div className="relative w-full overflow-hidden rounded-full bg-slate-800/60" style={{ height: "clamp(20px,3vh,32px)" }}>
                            <div className="absolute inset-y-0 my-auto h-px w-full bg-amber-500/30" />
                            {[0, 1.2].map((delay, k) => (
                                <div key={k} style={{
                                    position: "absolute", top: "50%", left: "0%",
                                    transform: "translateY(-50%)",
                                    width: 10, height: 10, borderRadius: "50%",
                                    background: "#fbbf24",
                                    boxShadow: "0 0 12px rgba(251,191,36,1), 0 0 24px rgba(251,191,36,0.5)",
                                    animation: "packet-h 2.4s linear infinite",
                                    animationDelay: `${delay}s`
                                }} />
                            ))}
                        </div>
                        <p className="font-mono text-[8px] text-slate-500">HTTPS — Port 443</p>
                        <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 px-3 py-1">
                            <p className="font-mono text-[9px] text-amber-400">Receiving instructions. Sending stolen data.</p>
                        </div>
                    </div>

                    {/* C2 server */}
                    <div className="flex flex-col items-center gap-2">
                        <div
                            className="flex items-center justify-center rounded-2xl border-2 border-amber-500/60 bg-slate-900"
                            style={{
                                width: "clamp(56px,7vw,96px)", height: "clamp(48px,6vw,80px)",
                                fontSize: "clamp(1.5rem,3vw,2.5rem)",
                                boxShadow: "0 0 24px rgba(251,191,36,0.25)"
                            }}
                        >
                            🖥
                        </div>
                        <div className="text-center">
                            <p className="font-mono text-xs font-bold text-amber-300">185.220.101.47</p>
                            <p className="font-mono text-[8px] text-amber-400/70">C2 SERVER</p>
                            <p className="font-mono text-[8px] text-slate-500">Moscow, Russia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Row 4 — Critical query strip */}
        <div className="rounded-xl border-2 px-4 py-3"
            style={{ borderColor: "rgba(245,158,11,0.45)", background: "rgba(120,53,15,0.2)", boxShadow: "0 0 28px rgba(245,158,11,0.1)" }}>
            <div className="flex items-center gap-3 flex-wrap">
                <p className="font-mono text-sm font-black leading-snug text-amber-200"
                    style={{ textShadow: "0 0 24px rgba(245,158,11,0.65)" }}>
                    Is the attack successfully contained?
                </p>
                <span className="blink-cursor inline-block h-5 w-0.5 shrink-0 bg-amber-400" />
            </div>
        </div>
    </div>
);

// ─── Portal shell ─────────────────────────────────────────────────────────────

export const MonitorPortal = forwardRef<HTMLDivElement, MonitorPortalProps>(
    ({ type, progress = 0 }, ref) => {
        const headerColor = type === "L1"
            ? "border-red-900/60 bg-red-950/30"
            : type === "L3"
                ? "border-amber-900/40 bg-amber-950/10"
                : "border-cyan-500/20 bg-slate-950/50";

        const outerBorder = type === "L1"
            ? "border-red-900/60 shadow-[inset_0_0_60px_rgba(239,68,68,0.08)]"
            : type === "L3"
                ? "border-amber-900/40 shadow-[inset_0_0_40px_rgba(251,191,36,0.06)]"
                : "border-slate-800 shadow-[inset_0_0_40px_rgba(14,165,233,0.1)]";

        const insetBorder = type === "L1"
            ? "border-red-500/25"
            : type === "L3"
                ? "border-amber-500/20"
                : "border-cyan-500/30";

        const headerText = type === "L1"
            ? "text-red-400"
            : type === "L3"
                ? "text-amber-400"
                : "text-cyan-400";

        return (
            <div
                ref={ref}
                className="pointer-events-none absolute inset-0 z-40 flex h-full w-full items-center justify-center"
                style={{ opacity: 0, visibility: "hidden" }}
            >
                <div
                    className={`soc-monitor-shell relative flex h-[88vh] md:h-[80vh] max-h-[880px] w-[95vw] md:w-[82vw] max-w-[1220px] flex-col overflow-hidden rounded-2xl border bg-slate-950/98 backdrop-blur-xl ${outerBorder}`}
                >
                    {/* Inset border */}
                    <div className={`pointer-events-none absolute inset-0 rounded-2xl border ${insetBorder}`} />

                    {/* Header */}
                    <div className={`relative shrink-0 border-b px-6 py-3 ${headerColor}`}>
                        <p className={`font-mono text-[10px] font-medium uppercase tracking-widest ${headerText}`}>
                            {getHeaderText(type)}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="relative min-h-0 flex-1 overflow-y-auto">
                        {type === "L1" && <L1Content />}
                        {type === "L2" && <L2Content progress={progress} />}
                        {type === "L3" && <L3Content />}
                    </div>
                </div>
            </div>
        );
    }
);

MonitorPortal.displayName = "MonitorPortal";
