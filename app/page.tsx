"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ─── Domains ──────────────────────────────────────────────────────────────────

const DOMAINS = [
    { id: "soc", label: "SOC", sub: "Security Operations", desc: "Blue Team · Detect & Respond", color: "#22d3ee", branch: "rgba(34,211,238,0.55)", href: "/roadmaps/soc", live: true },
    { id: "appsec", label: "DevSecOps", sub: "Application Security", desc: "Modern Secure Dev Lifecycle", color: "#a78bfa", branch: "rgba(167,139,250,0.5)", href: null, live: false },
    { id: "web", label: "Web Hacking", sub: "App Exploitation", desc: "Offense · Adversary Simulation", color: "#f43f5e", branch: "rgba(244,63,94,0.5)", href: null, live: false },
    { id: "network", label: "Network Pentesting", sub: "Infrastructure Security", desc: "Offense · Adversary Simulation", color: "#dc2626", branch: "rgba(220,38,38,0.5)", href: "/roadmaps/network-pentesting", live: true },
    { id: "ai", label: "AI Hacking", sub: "Offensive AI", desc: "Offense · Adversary Simulation", color: "#ef4444", branch: "rgba(239,68,68,0.5)", href: "/roadmaps/ai-hacking", live: true },
    { id: "cloud", label: "Cloud Sec", sub: "Cloud Security", desc: "Infra · Identity · Posture", color: "#34d399", branch: "rgba(52,211,153,0.5)", href: null, live: false },
    { id: "grc", label: "GRC", sub: "Governance & Compliance", desc: "Risk · Audit · Frameworks", color: "#fbbf24", branch: "rgba(251,191,36,0.5)", href: null, live: false },
] as const;

const L1_TO_BANNER: [number, number][] = [
    [0, 0], [0, 1],
    [1, 2], [1, 3], [1, 4],
    [2, 5], [2, 6],
];

const L1_LABELS = ["SYS.01", "SYS.02", "SYS.03"];

// Vertical offsets per banner — deliberately irregular, no symmetric pattern
// Kept within ±80px so larger cards still fit in the viewport
const BANNER_Y_OFFSETS = [30, -25, -60, -85, -40, 20, -45];

// ─── Layout ───────────────────────────────────────────────────────────────────

interface Pt { x: number; y: number }

interface Layout {
    rCenter: Pt;
    legLeft: Pt;   // bottom of R's vertical stroke (left side)
    legRight: Pt;   // tip of R's diagonal leg (right side)
    l1: Pt[];
    jR2L1: number;
    jL12B: number;
    bannerY: number;  // base reference Y
    labelY: number;  // "Choose Your Path" label — above highest banner
    bannerW: number;
    bannerH: number;
    banners: Array<{ x: number; cx: number; y: number }>;
    rInitialH: number;
}

// R visual height at destination — larger for stronger visual anchor
const R_FINAL_H = 88;

function computeLayout(vw: number, vh: number): Layout {
    // Larger cards
    const bannerH = Math.min(265, vh * 0.31);
    const bannerGap = Math.max(10, vw * 0.01);
    const bannerW = Math.min(248, (vw * 0.93 - 6 * bannerGap) / 7);
    const totalW = 7 * bannerW + 6 * bannerGap;
    const startX = (vw - totalW) / 2;
    // Raise base Y so the most-lowered banner (+30) never overflows viewport
    const maxPositiveOffset = Math.max(0, ...BANNER_Y_OFFSETS);
    const bannerY = vh - bannerH - Math.max(14, vh * 0.018) - maxPositiveOffset;

    const banners = DOMAINS.map((_, i) => ({
        x: startX + i * (bannerW + bannerGap),
        cx: startX + i * (bannerW + bannerGap) + bannerW / 2,
        y: bannerY + BANNER_Y_OFFSETS[i],
    }));

    const rCenter: Pt = { x: vw / 2, y: vh * 0.105 };
    // Space Grotesk Bold: ascender=780/1000, UPM=1000.
    // With lineHeight:1, baseline = span_top + 780/1000 * em
    // span_top = rCenter.y - R_FINAL_H/2  →  baseline = rCenter.y + R_FINAL_H*(0.78-0.5) = +0.28*em
    // Glyph advance width ≈ 52px @ 88px → left stem ≈ −22%, diagonal leg ≈ +23%
    const legBaseline = rCenter.y + R_FINAL_H * 0.28;
    const legLeft: Pt = { x: rCenter.x - R_FINAL_H * 0.22, y: legBaseline };
    const legRight: Pt = { x: rCenter.x + R_FINAL_H * 0.23, y: legBaseline };

    // L1 nodes positioned between R and banners
    const l1Y = legLeft.y + (bannerY - legLeft.y) * 0.36;
    const l1: Pt[] = [
        { x: (banners[0].cx + banners[1].cx) / 2, y: l1Y },
        { x: banners[3].cx, y: l1Y },
        { x: (banners[5].cx + banners[6].cx) / 2, y: l1Y },
    ];

    const jR2L1 = legLeft.y + (l1Y - legLeft.y) * 0.50;
    const jL12B = l1Y + (bannerY - l1Y) * 0.44;

    // Label sits 26px above the highest (most-elevated) banner
    const labelY = bannerY + Math.min(...BANNER_Y_OFFSETS) - 26;

    return { rCenter, legLeft, legRight, l1, jR2L1, jL12B, bannerY, labelY, bannerW, bannerH, banners, rInitialH: 88 };
}

// Orthogonal path with rounded corners
function orthRounded(from: Pt, to: Pt, jY: number, r = 16): string {
    const dx = to.x - from.x;
    if (Math.abs(dx) < 2) {
        return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
    }
    const sign = dx > 0 ? 1 : -1;
    const r1 = Math.min(r, (jY - from.y) * 0.42, Math.abs(dx) * 0.42);
    const r2 = Math.min(r, (to.y - jY) * 0.42, Math.abs(dx) * 0.42);
    return [
        `M ${from.x} ${from.y}`,
        `L ${from.x} ${jY - r1}`,
        `Q ${from.x} ${jY} ${from.x + sign * r1} ${jY}`,
        `L ${to.x - sign * r2} ${jY}`,
        `Q ${to.x} ${jY} ${to.x} ${jY + r2}`,
        `L ${to.x} ${to.y}`,
    ].join(" ");
}

// ─── Banner card ──────────────────────────────────────────────────────────────

function BannerCard({
    domain: d,
    style,
    bRef,
}: {
    domain: typeof DOMAINS[number];
    style: React.CSSProperties;
    bRef: (el: HTMLDivElement | null) => void;
}) {
    const [hovered, setHovered] = useState(false);

    const inner = (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: "100%", height: "100%",
                background: "linear-gradient(155deg, rgba(6,10,24,0.98) 0%, rgba(3,6,16,0.99) 100%)",
                border: `1px solid ${d.color}${hovered && d.live ? "28" : "12"}`,
                borderLeft: `2.5px solid ${d.color}${hovered && d.live ? "dd" : "65"}`,
                borderTop: `1px solid ${d.color}${hovered && d.live ? "22" : "0a"}`,
                borderRadius: 10,
                padding: "20px 18px 16px",
                display: "flex", flexDirection: "column",
                position: "relative", overflow: "hidden",
                cursor: d.live ? "pointer" : "default",
                boxShadow: hovered && d.live
                    ? `0 0 0 1px ${d.color}15, inset 0 0 40px ${d.color}07, 0 28px 72px rgba(0,0,0,0.88), 0 0 60px ${d.color}0d`
                    : `inset 0 0 24px ${d.color}04, 0 16px 48px rgba(0,0,0,0.65)`,
                transition: "all 0.24s ease",
                transform: hovered && d.live ? "translateY(-5px)" : "none",
            }}
        >
            {/* Top-right corner bracket */}
            <svg style={{ position: "absolute", top: 9, right: 9, pointerEvents: "none" }} width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M0 13 L0 0 L13 0" stroke={`${d.color}50`} strokeWidth="1" fill="none" />
            </svg>
            {/* Bottom-left corner bracket */}
            <svg style={{ position: "absolute", bottom: 9, left: 11, pointerEvents: "none" }} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M10 0 L10 10 L0 10" stroke={`${d.color}28`} strokeWidth="1" fill="none" />
            </svg>

            {/* Ambient glow */}
            <div style={{
                position: "absolute", top: -28, right: -28, width: 140, height: 140,
                background: `radial-gradient(circle, ${d.color}0e 0%, transparent 65%)`,
                pointerEvents: "none",
            }} />

            {/* Scanlines */}
            <div style={{
                position: "absolute", inset: 0, opacity: 0.028,
                backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.25) 3px, rgba(255,255,255,0.25) 4px)",
                pointerEvents: "none", borderRadius: 10,
            }} />

            {/* Status row */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <div style={{
                        width: 6, height: 6, borderRadius: "50%",
                        background: d.live ? d.color : "rgba(71,85,105,0.35)",
                        boxShadow: d.live ? `0 0 9px ${d.color}aa` : "none",
                        animation: d.live ? "alert-pulse 2s ease-in-out infinite" : "none",
                    }} />
                    <span style={{
                        fontFamily: "var(--font-mono, monospace)", fontSize: 7.5,
                        letterSpacing: "0.25em", color: d.live ? d.color : "rgba(71,85,105,0.40)", fontWeight: 600,
                    }}>{d.live ? "LIVE" : "SOON"}</span>
                </div>
                <span style={{
                    fontFamily: "var(--font-mono, monospace)", fontSize: 7,
                    color: `${d.color}40`, letterSpacing: "0.15em",
                    border: `1px solid ${d.color}18`, padding: "2px 6px", borderRadius: 3,
                    background: `${d.color}07`,
                }}>{d.id.toUpperCase()}</span>
            </div>

            {/* Title */}
            <div style={{
                fontFamily: "var(--font-heading, sans-serif)", fontSize: 30, fontWeight: 700,
                color: "rgba(248,250,252,0.97)", letterSpacing: -1, lineHeight: 1.02, marginBottom: 6,
            }}>{d.label}</div>

            {/* Subtitle */}
            <div style={{
                fontFamily: "var(--font-sans, sans-serif)", fontSize: 11,
                color: "rgba(148,163,184,0.44)", marginBottom: 14,
            }}>{d.sub}</div>

            {/* Divider with left accent */}
            <div style={{
                height: 1,
                background: `linear-gradient(to right, ${d.color}22, rgba(255,255,255,0.05), transparent)`,
                marginBottom: 13,
            }} />

            {/* Desc */}
            <div style={{
                fontFamily: "var(--font-mono, monospace)", fontSize: 9.5,
                color: `${d.color}60`, letterSpacing: "0.04em", lineHeight: 1.8, flexGrow: 1,
            }}>{d.desc}</div>

            {/* CTA */}
            {d.live && d.href && (
                <div style={{
                    marginTop: 14, paddingTop: 11,
                    borderTop: `1px solid ${d.color}14`,
                    display: "flex", alignItems: "center", gap: 6,
                }}>
                    <div style={{
                        width: 18, height: 1,
                        background: hovered ? d.color : `${d.color}55`,
                        transition: "background 0.22s ease",
                    }} />
                    <span style={{
                        fontFamily: "var(--font-mono, monospace)", fontSize: 8.5,
                        color: hovered ? d.color : `${d.color}80`, letterSpacing: "0.20em",
                        transition: "color 0.22s ease",
                    }}>ACCESS PATHWAY</span>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1 5h8M6 2l3 3-3 3"
                            stroke={hovered ? d.color : `${d.color}80`} strokeWidth="1.1"
                            strokeLinecap="round" strokeLinejoin="round"
                            style={{ transition: "stroke 0.22s ease" }} />
                    </svg>
                </div>
            )}
        </div>
    );

    return (
        <div
            ref={bRef}
            style={{
                position: "absolute", opacity: 0,
                transform: "translateY(14px)",
                transition: "opacity 0.5s cubic-bezier(0.16,1,0.3,1), transform 0.5s cubic-bezier(0.16,1,0.3,1)",
                ...style,
            }}
        >
            {d.live && d.href
                ? <a href={d.href} style={{ textDecoration: "none", display: "block", height: "100%" }}>{inner}</a>
                : inner}
        </div>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
    const containerRef = useRef<HTMLDivElement>(null);
    const rSpacerRef = useRef<HTMLSpanElement>(null);

    const heroRRef = useRef<HTMLDivElement>(null);
    const rLetterRef = useRef<HTMLSpanElement>(null);

    const ootRef = useRef<HTMLSpanElement>(null);
    const subtitleRef = useRef<HTMLParagraphElement>(null);
    const scrollIndRef = useRef<HTMLDivElement>(null);
    const dotLabelRef = useRef<HTMLParagraphElement>(null);
    const pathLabelRef = useRef<HTMLDivElement>(null);

    const svgTreeRef = useRef<SVGSVGElement>(null);
    const r2l1Lines = useRef<(SVGPathElement | null)[]>(Array(3).fill(null));
    const r2l1Glows = useRef<(SVGPathElement | null)[]>(Array(3).fill(null));
    const l12bLines = useRef<(SVGPathElement | null)[]>(Array(7).fill(null));
    const l12bGlows = useRef<(SVGPathElement | null)[]>(Array(7).fill(null));
    const l1DotEls = useRef<(SVGGElement | null)[]>(Array(3).fill(null));
    const termDotEls = useRef<(SVGCircleElement | null)[]>(Array(7).fill(null));
    const bannerRefs = useRef<(HTMLDivElement | null)[]>(Array(7).fill(null));

    const [layout, setLayout] = useState<Layout | null>(null);
    const [rPos, setRPos] = useState<Pt | null>(null);

    useEffect(() => {
        const update = () => setLayout(computeLayout(window.innerWidth, window.innerHeight));
        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    useEffect(() => {
        if (!layout || !rSpacerRef.current) return;
        const r = rSpacerRef.current.getBoundingClientRect();
        setRPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    }, [layout]);

    useEffect(() => {
        if (!layout || !rPos || !containerRef.current || !heroRRef.current || !rLetterRef.current || !rSpacerRef.current) return;

        gsap.registerPlugin(ScrollTrigger);

        // Center heroR on rPos
        gsap.set(heroRRef.current, { xPercent: -50, yPercent: -50 });

        // Travel delta
        const dx = layout.rCenter.x - rPos.x;
        const dy = layout.rCenter.y - rPos.y;

        // Scale-based shrink — much smoother than animating fontSize (no layout reflow)
        const rInitialH = rSpacerRef.current.getBoundingClientRect().height;
        const scale = R_FINAL_H / rInitialH;
        gsap.set(rLetterRef.current, { transformOrigin: "50% 50%" });

        const L1_THRESH = [0.56, 0.59, 0.62];
        const BAN_THRESH = [0.74, 0.76, 0.77, 0.78, 0.79, 0.82, 0.85];

        // Hide all paths via strokeDasharray/offset — set precise values in rAF
        requestAnimationFrame(() => {
            [...r2l1Lines.current, ...l12bLines.current,
            ...r2l1Glows.current, ...l12bGlows.current].forEach((el) => {
                if (!el) return;
                const len = el.getTotalLength();
                gsap.set(el, { strokeDasharray: len, strokeDashoffset: len });
            });
        });

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 2,                      // smoother, less jumpy
                    onUpdate: (self) => {
                        const p = self.progress;

                        // Bidirectional — elements hide correctly when scrolling back
                        if (svgTreeRef.current) {
                            svgTreeRef.current.style.opacity = p > 0.44 ? "1" : "0";
                        }

                        L1_THRESH.forEach((t, i) => {
                            const el = l1DotEls.current[i];
                            if (el) el.style.opacity = p > t ? "1" : "0";
                        });

                        BAN_THRESH.forEach((t, i) => {
                            const elB = bannerRefs.current[i];
                            if (elB) {
                                elB.style.opacity = p > t ? "1" : "0";
                                elB.style.transform = p > t ? "translateY(0px)" : "translateY(14px)";
                            }
                            const elD = termDotEls.current[i];
                            if (elD) elD.style.opacity = p > t ? "1" : "0";
                        });

                        if (pathLabelRef.current) {
                            pathLabelRef.current.style.opacity = p > 0.86 ? "1" : "0";
                        }
                    },
                },
            });

            // ── Hero exit ─────────────────────────────────────────────────────────
            tl.to([dotLabelRef.current, subtitleRef.current, scrollIndRef.current], {
                opacity: 0, y: -8, duration: 0.18, stagger: 0.03, ease: "power2.in",
            }, 0);
            tl.to(ootRef.current, {
                opacity: 0, x: 80, duration: 0.30, ease: "power3.in",
            }, 0.03);

            // ── R travels upward — scale-based (GPU, no layout reflow) ────────────
            tl.to(heroRRef.current, {
                x: dx, y: dy, duration: 0.38, ease: "power2.inOut",
            }, 0.06);
            tl.to(rLetterRef.current, {
                scale, duration: 0.38, ease: "power2.inOut",
            }, 0.06);

            // ── R→L1 branches ─────────────────────────────────────────────────────
            const R2L1_START = [0.46, 0.49, 0.52];
            R2L1_START.forEach((start, i) => {
                tl.to(r2l1Lines.current[i], { strokeDashoffset: 0, duration: 0.12, ease: "none" }, start);
                tl.to(r2l1Glows.current[i], { strokeDashoffset: 0, duration: 0.12, ease: "none" }, start);
            });

            // ── L1→banner branches ────────────────────────────────────────────────
            const L12B_START = [0.58, 0.60, 0.61, 0.62, 0.63, 0.65, 0.68];
            L12B_START.forEach((start, i) => {
                tl.to(l12bLines.current[i], { strokeDashoffset: 0, duration: 0.12, ease: "none" }, start);
                tl.to(l12bGlows.current[i], { strokeDashoffset: 0, duration: 0.12, ease: "none" }, start);
            });
        });

        return () => ctx.revert();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [layout, rPos]);

    // ─── Render ──────────────────────────────────────────────────────────────────

    return (
        <div ref={containerRef} style={{ height: "280vh" }}>
            {/* Fixed top-right nav */}
            <Link
                href="/about"
                style={{
                    position: "fixed", top: 20, right: 24, zIndex: 100,
                    display: "inline-flex", alignItems: "center", gap: 8,
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: 10, letterSpacing: "0.28em", textTransform: "uppercase",
                    color: "rgba(34,211,238,0.72)",
                    background: "rgba(2,6,23,0.75)",
                    border: "1px solid rgba(34,211,238,0.28)",
                    borderRadius: 8, padding: "10px 18px",
                    textDecoration: "none", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
                    transition: "all 0.2s ease",
                    boxShadow: "0 0 20px rgba(34,211,238,0.06)",
                }}
                onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.color = "#22d3ee";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.55)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.10)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 24px rgba(34,211,238,0.14)";
                }}
                onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.color = "rgba(34,211,238,0.72)";
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.28)";
                    (e.currentTarget as HTMLElement).style.background = "rgba(2,6,23,0.75)";
                    (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px rgba(34,211,238,0.06)";
                }}
            >
                About
                <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                    <path d="M1 4.5h7M5 1.5l3 3-3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>

            <div
                style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden" }}
                className="world-grid"
            >
                {/* Vignette */}
                <div className="pointer-events-none absolute inset-0" style={{
                    background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 28%, rgba(2,6,23,0.7) 100%)",
                }} />

                {/* ── Hero text ──────────────────────────────────────────────────────── */}
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ zIndex: 10 }}>
                    <p ref={dotLabelRef} className="font-mono uppercase" style={{
                        fontSize: 9, letterSpacing: "0.55em", color: "rgba(34,211,238,0.45)", marginBottom: "1rem",
                    }}>rootaccess.tech</p>

                    <h1 className="font-heading leading-none" style={{
                        display: "flex", alignItems: "baseline",
                        fontSize: "clamp(4.5rem, 13vw, 10.5rem)", fontWeight: 700, letterSpacing: "-0.04em",
                    }}>
                        <span ref={rSpacerRef} aria-hidden="true" style={{ visibility: "hidden", color: "#22d3ee" }}>R</span>
                        <span ref={ootRef}>
                            <span style={{ color: "#22d3ee" }}>oot</span>
                            <span style={{ color: "rgba(248,250,252,0.95)" }}>Access</span>
                        </span>
                    </h1>

                    <p ref={subtitleRef} className="font-mono uppercase" style={{
                        fontSize: 10, letterSpacing: "0.38em", color: "rgba(100,116,139,0.6)",
                        maxWidth: 390, lineHeight: 1.8, marginTop: "1.6rem", textAlign: "center",
                    }}>
                        Interactive career roadmaps for cybersecurity professionals
                    </p>

                    <div ref={scrollIndRef} className="flex flex-col items-center gap-3" style={{ marginTop: "2.4rem" }}>
                        <span className="font-mono uppercase" style={{
                            fontSize: 8, letterSpacing: "0.46em", color: "rgba(71,85,105,0.5)",
                        }}>Scroll to explore</span>
                        <div style={{ position: "relative", width: 1, height: 38 }}>
                            <div style={{
                                position: "absolute", inset: 0,
                                background: "linear-gradient(to bottom, rgba(34,211,238,0.55), transparent)",
                                animation: "scrollPulse 2s ease-in-out infinite",
                            }} />
                        </div>
                    </div>
                </div>

                {/* ── THE R ─────────────────────────────────────────────────────────── */}
                {rPos && (
                    <div
                        ref={heroRRef}
                        style={{ position: "absolute", left: rPos.x, top: rPos.y, pointerEvents: "none", zIndex: 20 }}
                    >
                        <span
                            ref={rLetterRef}
                            style={{
                                display: "block",
                                fontFamily: "var(--font-heading, sans-serif)",
                                fontSize: "clamp(4.5rem, 13vw, 10.5rem)",
                                fontWeight: 700,
                                color: "#22d3ee",
                                letterSpacing: "-0.04em",
                                lineHeight: 1,
                                textShadow: "0 0 40px rgba(34,211,238,0.65), 0 0 80px rgba(34,211,238,0.3)",
                                userSelect: "none",
                                whiteSpace: "nowrap",
                            }}
                        >R</span>
                    </div>
                )}

                {/* ── SVG tree — hidden until R arrives ─────────────────────────────── */}
                {layout && (
                    <svg
                        ref={svgTreeRef}
                        style={{
                            position: "absolute", inset: 0,
                            width: "100%", height: "100%",
                            pointerEvents: "none", zIndex: 12, overflow: "visible",
                            opacity: 0, transition: "opacity 0.4s ease",
                        }}
                    >
                        <defs>
                            <filter id="branchGlow" x="-120%" y="-120%" width="340%" height="340%">
                                <feGaussianBlur stdDeviation="3.5" result="blur" />
                                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                            </filter>
                            <filter id="nodeGlow" x="-200%" y="-200%" width="500%" height="500%">
                                <feGaussianBlur stdDeviation="4" />
                            </filter>
                        </defs>

                        {/* ── Leg-tip nodes — small glowing dots exactly at R's foot positions ── */}
                        {[layout.legLeft, layout.legRight].map((leg, i) => (
                            <g key={`legtip-${i}`}>
                                <circle cx={leg.x} cy={leg.y} r={4}
                                    fill="none" stroke="rgba(34,211,238,0.12)" strokeWidth={6}
                                    filter="url(#nodeGlow)" />
                                <circle cx={leg.x} cy={leg.y} r={3}
                                    fill="rgba(5,8,22,0.95)"
                                    stroke="rgba(34,211,238,0.40)" strokeWidth={1} />
                                <circle cx={leg.x} cy={leg.y} r={1.5}
                                    fill="#22d3ee"
                                    style={{ filter: "drop-shadow(0 0 6px rgba(34,211,238,1))" }} />
                            </g>
                        ))}

                        {/* ── R→L1 branches (cyan, rounded) ──
                l1[0] (left cluster)  ← legLeft  (R's vertical stroke bottom)
                l1[1] (middle)        ← legRight (R's diagonal leg tip)
                l1[2] (right cluster) ← legRight */}
                        {layout.l1.map((l1, i) => {
                            const origin = i === 0 ? layout.legLeft : layout.legRight;
                            const d = orthRounded(origin, l1, layout.jR2L1, 18);
                            return (
                                <g key={`r2l1-${i}`}>
                                    <path
                                        ref={(el) => { r2l1Glows.current[i] = el; }}
                                        d={d} fill="none"
                                        stroke="rgba(34,211,238,0.22)" strokeWidth={6}
                                        filter="url(#branchGlow)"
                                        strokeLinecap="round"
                                        strokeDasharray="9999" strokeDashoffset="9999"
                                    />
                                    <path
                                        ref={(el) => { r2l1Lines.current[i] = el; }}
                                        d={d} fill="none"
                                        stroke="rgba(34,211,238,0.35)" strokeWidth={1.4}
                                        strokeLinecap="round"
                                        strokeDasharray="9999" strokeDashoffset="9999"
                                    />
                                </g>
                            );
                        })}

                        {/* ── L1 cyber nodes ── */}
                        {layout.l1.map((l1, i) => (
                            <g
                                key={`node-${i}`}
                                ref={(el) => { l1DotEls.current[i] = el; }}
                                style={{ opacity: 0, transition: "opacity 0.28s ease" }}
                            >
                                {/* Outer ring glow */}
                                <circle cx={l1.x} cy={l1.y} r={11}
                                    fill="none" stroke="rgba(34,211,238,0.08)" strokeWidth={8}
                                    filter="url(#nodeGlow)" />
                                {/* Outer ring */}
                                <circle cx={l1.x} cy={l1.y} r={9}
                                    fill="rgba(5,8,22,0.9)"
                                    stroke="rgba(34,211,238,0.25)" strokeWidth={1}
                                    strokeDasharray="4 3" />
                                {/* Inner ring */}
                                <circle cx={l1.x} cy={l1.y} r={5}
                                    fill="none" stroke="rgba(34,211,238,0.18)" strokeWidth={1} />
                                {/* Center */}
                                <circle cx={l1.x} cy={l1.y} r={2.5}
                                    fill="#22d3ee" opacity={0.85}
                                    style={{ filter: "drop-shadow(0 0 5px rgba(34,211,238,1))" }} />
                                {/* Node ID label */}
                                <text
                                    x={l1.x} y={l1.y - 16}
                                    textAnchor="middle"
                                    style={{
                                        fontFamily: "var(--font-mono, monospace)",
                                        fontSize: 7, fill: "rgba(34,211,238,0.32)",
                                        letterSpacing: "0.12em",
                                    }}
                                >{L1_LABELS[i]}</text>
                            </g>
                        ))}

                        {/* ── L1→banner branches (domain colour, rounded) ── */}
                        {L1_TO_BANNER.map(([l1Idx, bIdx], i) => {
                            const from = layout.l1[l1Idx];
                            const banner = layout.banners[bIdx];
                            const to: Pt = { x: banner.cx, y: banner.y };
                            // Per-branch junction adapts to each banner's unique height
                            const jY = from.y + (banner.y - from.y) * 0.44;
                            const d = orthRounded(from, to, jY, 18);
                            const col = DOMAINS[bIdx].branch;
                            return (
                                <g key={`l12b-${i}`}>
                                    <path
                                        ref={(el) => { l12bGlows.current[i] = el; }}
                                        d={d} fill="none"
                                        stroke={col} strokeWidth={6}
                                        filter="url(#branchGlow)"
                                        strokeLinecap="round"
                                        strokeDasharray="9999" strokeDashoffset="9999"
                                    />
                                    <path
                                        ref={(el) => { l12bLines.current[i] = el; }}
                                        d={d} fill="none"
                                        stroke={col} strokeWidth={1.4}
                                        strokeLinecap="round"
                                        strokeDasharray="9999" strokeDashoffset="9999"
                                    />
                                </g>
                            );
                        })}

                        {/* ── Terminal dots at banner tops (outer ring + inner fill, same ref) ── */}
                        {layout.banners.map((b, i) => (
                            <g
                                key={`bdot-${i}`}
                                ref={(el) => { termDotEls.current[i] = el as unknown as SVGCircleElement; }}
                                style={{ opacity: 0, transition: "opacity 0.2s ease" }}
                            >
                                <circle
                                    cx={b.cx} cy={b.y} r={4.5}
                                    fill="none"
                                    stroke={DOMAINS[i].color}
                                    strokeWidth={1}
                                />
                                <circle
                                    cx={b.cx} cy={b.y} r={2}
                                    fill={DOMAINS[i].color}
                                    style={{ filter: `drop-shadow(0 0 4px ${DOMAINS[i].color})` }}
                                />
                            </g>
                        ))}
                    </svg>
                )}

                {/* ── Banner cards ──────────────────────────────────────────────────── */}
                {layout && DOMAINS.map((d, i) => (
                    <BannerCard
                        key={d.id}
                        domain={d}
                        bRef={(el) => { bannerRefs.current[i] = el; }}
                        style={{
                            left: layout.banners[i].x,
                            top: layout.banners[i].y,
                            width: layout.bannerW,
                            height: layout.bannerH,
                            zIndex: 13,
                        }}
                    />
                ))}

                {/* "Choose your path" */}
                {layout && (
                    <div
                        ref={pathLabelRef}
                        style={{
                            position: "absolute", top: layout.labelY,
                            left: 0, right: 0,
                            display: "flex", justifyContent: "center",
                            zIndex: 13, pointerEvents: "none",
                            opacity: 0, transition: "opacity 0.5s ease",
                        }}
                    >
                        <p className="font-mono uppercase" style={{
                            fontSize: 7.5, letterSpacing: "0.55em", color: "rgba(34,211,238,0.22)",
                        }}>Choose Your Path</p>
                    </div>
                )}
            </div>
        </div>
    );
}
