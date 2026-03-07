"use client";

import React, { forwardRef } from "react";
import { PlaybookHUD } from "./PlaybookHUD";

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
                        className={`flex items-baseline gap-4 font-mono leading-relaxed ${
                            line.alert
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
                <div className="flex-1">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-red-400">
                        What the L1 Analyst Sees
                    </p>
                    <p className="mt-1 font-mono text-lg font-bold leading-snug text-red-100">
                        47 failed logins in 4 minutes — same account, from Russia
                    </p>
                    <p className="mt-2 font-sans text-sm leading-relaxed text-slate-300">
                        One login attempt every 5 seconds. That's not a forgotten password — that's a brute-force attack.
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

const CORR_EVENTS = [
    {
        num: "01",
        icon: "🔐",
        title: "47 Failed Logins",
        subtitle: "14:22:31 — from 185.220.101.47 (Russia)",
        plain: "Someone hammered a login page 47 times in 4 minutes using one employee's username.",
    },
    {
        num: "02",
        icon: "📂",
        title: "Sensitive Files Opened",
        subtitle: "14:23:05 — Finance / Q4 Reports",
        plain: "Minutes later, confidential financial documents were opened from the same account.",
    },
    {
        num: "03",
        icon: "🛰",
        title: "Dark Web Contact",
        subtitle: "14:24:12 — Outbound DNS to .onion",
        plain: "The machine quietly phoned a server on the dark web — a classic attacker signal.",
    },
] as const;

const L2Content: React.FC<{ progress: number }> = ({ progress }) => {
    const correlated = progress >= 0.41;

    return (
        <div className="relative flex h-full flex-col p-5">
            {/* Status bar */}
            <div className="mb-4 flex shrink-0 items-center gap-3 border-b border-slate-700/40 pb-3">
                <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cyan-400">
                    L2 Analyst — connecting the dots across 3 events
                </span>
                <span className="ml-auto font-mono text-[9px] text-slate-500">3 events loaded</span>
            </div>

            {/* Evidence cards + SVG lines */}
            <div className="relative flex flex-1 items-stretch gap-0">
                {/* SVG connecting lines */}
                <svg className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
                    <defs>
                        <filter id="l2-glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {/* Event 01 → 02 connector */}
                    <line
                        x1="34%" y1="43%" x2="40%" y2="43%"
                        stroke={correlated ? "#22d3ee" : "#1e293b"}
                        strokeWidth={correlated ? "3" : "1.5"}
                        filter={correlated ? "url(#l2-glow)" : undefined}
                        style={{ transition: "stroke 0.7s ease, stroke-width 0.5s ease" }}
                    />
                    {/* Event 02 → 03 connector */}
                    <line
                        x1="60%" y1="43%" x2="66%" y2="43%"
                        stroke={correlated ? "#22d3ee" : "#1e293b"}
                        strokeWidth={correlated ? "3" : "1.5"}
                        filter={correlated ? "url(#l2-glow)" : undefined}
                        style={{ transition: "stroke 0.7s ease 0.25s, stroke-width 0.5s ease 0.25s" }}
                    />
                    {correlated && (
                        <text
                            x="50%" y="10%"
                            fill="#22d3ee"
                            fontSize="13"
                            textAnchor="middle"
                            fontFamily="monospace"
                            fontWeight="700"
                            letterSpacing="3"
                        >
                            ▸  LATERAL MOVEMENT CONFIRMED  ◂
                        </text>
                    )}
                </svg>

                {/* Three evidence cards */}
                <div className="relative z-10 flex w-full items-stretch gap-4 px-1">
                    {CORR_EVENTS.map((ev, i) => (
                        <div
                            key={i}
                            className={`flex flex-1 flex-col rounded-2xl border-2 bg-slate-900/80 p-5 transition-all duration-700 ${
                                correlated
                                    ? "border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]"
                                    : "border-slate-700/40"
                            }`}
                            style={{ transitionDelay: `${i * 0.15}s` }}
                        >
                            {/* Event badge */}
                            <span
                                className={`mb-3 font-mono text-[9px] font-black uppercase tracking-[0.4em] transition-colors duration-500 ${
                                    correlated ? "text-cyan-400" : "text-slate-600"
                                }`}
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                EVENT {ev.num}
                            </span>

                            {/* Icon */}
                            <div
                                className={`mb-4 flex h-20 w-20 items-center justify-center self-center rounded-2xl border-2 transition-all duration-700 ${
                                    correlated
                                        ? "border-cyan-400/40 bg-slate-800 shadow-[0_0_24px_rgba(34,211,238,0.3)]"
                                        : "border-slate-700/30 bg-slate-800/60"
                                }`}
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                <span className="text-5xl">{ev.icon}</span>
                            </div>

                            {/* Title */}
                            <p
                                className={`font-mono text-base font-bold leading-tight transition-colors duration-500 ${
                                    correlated ? "text-white" : "text-slate-400"
                                }`}
                                style={{ transitionDelay: `${i * 0.15}s` }}
                            >
                                {ev.title}
                            </p>

                            {/* Time/source */}
                            <p className="mt-1 font-mono text-[9px] text-slate-500">{ev.subtitle}</p>

                            {/* Plain English */}
                            <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-slate-300">
                                {ev.plain}
                            </p>

                            {/* Risk tag */}
                            <div
                                className={`mt-4 rounded-lg border px-3 py-2 text-center transition-all duration-700 ${
                                    correlated
                                        ? "border-cyan-500/30 bg-cyan-950/30 text-cyan-400"
                                        : "border-slate-700/20 bg-slate-800/40 text-slate-600"
                                }`}
                                style={{ transitionDelay: `${i * 0.2}s` }}
                            >
                                <p className="font-mono text-[9px] font-bold uppercase tracking-widest">
                                    {correlated ? "Part of attack chain" : "Low risk in isolation"}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Verdict strip */}
            <div
                className={`mt-4 shrink-0 rounded-xl border-2 px-5 py-4 transition-all duration-700 ${
                    correlated
                        ? "border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_30px_rgba(34,211,238,0.1)]"
                        : "border-slate-700/20 bg-slate-900/20"
                }`}
            >
                {correlated ? (
                    <div className="flex items-center gap-4">
                        <span className="shrink-0 text-3xl">🔗</span>
                        <div>
                            <p className="font-mono text-xs font-bold uppercase tracking-widest text-cyan-300">
                                What this means in plain English
                            </p>
                            <p className="mt-1 font-sans text-sm leading-relaxed text-slate-200">
                                The attacker didn't just fail to log in — they got in sideways, stole files, and phoned home.
                                Three separate events. One coordinated attack. L3 now pulls the disk to find exactly what weapon was used.
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className="font-mono text-[10px] text-slate-600 uppercase tracking-widest">
                        Cross-referencing events across systems...
                    </p>
                )}
            </div>

            <PlaybookHUD progress={progress} />
        </div>
    );
};

// ─── L3: Forensic results ─────────────────────────────────────────────────────

const L3Content: React.FC = () => (
    <div className="relative flex h-full flex-col gap-4 overflow-hidden p-5">
        {/* CRT scanlines */}
        <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.02]"
            style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.8) 2px, rgba(0,0,0,0.8) 4px)" }}
            aria-hidden
        />

        {/* Status bar */}
        <div className="flex shrink-0 items-center gap-3 border-b border-amber-900/40 bg-amber-950/10 pb-3">
            <div className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" style={{ boxShadow: "0 0 8px rgba(251,191,36,0.8)" }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-amber-400">
                L3 Analyst — 3 forensic findings extracted
            </span>
        </div>

        {/* Top row: Disk imaging + Malware detection */}
        <div className="grid shrink-0 grid-cols-2 gap-4">
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
                    A malicious file disguised as a normal Windows process — hiding in plain sight. The "32" in the name is the giveaway.
                </p>
                <div className="mt-auto flex gap-2">
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

        {/* Finding 3: C2 network diagram */}
        <div
            className="relative flex-1 rounded-2xl border-2 border-amber-500/40 bg-amber-950/10 p-5"
            style={{ boxShadow: "0 0 30px rgba(251,191,36,0.08)" }}
        >
            <div className="mb-2 flex items-center gap-3">
                <span className="text-xl">📡</span>
                <p className="font-mono text-[10px] uppercase tracking-widest text-amber-400">
                    Finding 3 — Attacker's remote control channel traced
                </p>
            </div>
            <p className="mb-5 font-sans text-sm leading-relaxed text-slate-300">
                The malware was secretly phoning home every 5 minutes — receiving orders and sending stolen data. This is called Command & Control (C2).
            </p>

            {/* Visual diagram */}
            <div className="flex items-center justify-around">
                {/* Infected machine */}
                <div className="flex flex-col items-center gap-3">
                    <div
                        className="flex h-20 w-24 items-center justify-center rounded-2xl border-2 border-red-500/60 bg-slate-900"
                        style={{ boxShadow: "0 0 24px rgba(239,68,68,0.25)" }}
                    >
                        <span className="text-4xl">💻</span>
                    </div>
                    <div className="text-center">
                        <p className="font-mono text-xs font-bold text-red-300">WS-04</p>
                        <p className="font-mono text-[8px] text-red-400/70">INFECTED</p>
                        <p className="font-mono text-[8px] text-slate-500">London Office</p>
                    </div>
                </div>

                {/* Animated connection */}
                <div className="relative flex flex-1 flex-col items-center gap-2 px-8">
                    <p className="font-mono text-[9px] font-bold uppercase tracking-wider text-amber-300">
                        Secret beacon every 300s
                    </p>
                    {/* Track */}
                    <div className="relative h-8 w-full overflow-hidden rounded-full bg-slate-800/60">
                        <div className="absolute inset-y-0 my-auto h-px w-full bg-amber-500/30" />
                        {/* Animated beacons */}
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "0%",
                                transform: "translateY(-50%)",
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#fbbf24",
                                boxShadow: "0 0 12px rgba(251,191,36,1), 0 0 24px rgba(251,191,36,0.5)",
                                animation: "packet-h 2.4s linear infinite"
                            }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                top: "50%",
                                left: "0%",
                                transform: "translateY(-50%)",
                                width: "10px",
                                height: "10px",
                                borderRadius: "50%",
                                background: "#fbbf24",
                                boxShadow: "0 0 12px rgba(251,191,36,1), 0 0 24px rgba(251,191,36,0.5)",
                                animation: "packet-h 2.4s linear infinite",
                                animationDelay: "1.2s"
                            }}
                        />
                    </div>
                    <p className="font-mono text-[8px] text-slate-500">HTTPS — Port 443</p>
                    <div className="mt-1 rounded-lg border border-amber-500/20 bg-amber-950/20 px-3 py-1">
                        <p className="font-mono text-[9px] text-amber-400">Receiving instructions. Sending stolen data.</p>
                    </div>
                </div>

                {/* C2 server */}
                <div className="flex flex-col items-center gap-3">
                    <div
                        className="flex h-20 w-24 items-center justify-center rounded-2xl border-2 border-amber-500/60 bg-slate-900"
                        style={{ boxShadow: "0 0 24px rgba(251,191,36,0.25)" }}
                    >
                        <span className="text-4xl">🖥</span>
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
                <div className={`relative flex h-[80vh] w-[80vw] flex-col overflow-hidden rounded-2xl border bg-slate-950/98 backdrop-blur-xl ${outerBorder}`}>
                    {/* Inset border */}
                    <div className={`pointer-events-none absolute inset-0 rounded-2xl border ${insetBorder}`} />

                    {/* Header */}
                    <div className={`relative shrink-0 border-b px-6 py-3 ${headerColor}`}>
                        <p className={`font-mono text-[10px] font-medium uppercase tracking-widest ${headerText}`}>
                            {getHeaderText(type)}
                        </p>
                    </div>

                    {/* Content */}
                    <div className="relative min-h-0 flex-1">
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
