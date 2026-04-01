"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MobileMenu } from "@/components/MobileMenu";

// ─── Domains ──────────────────────────────────────────────────────────────────

const DOMAINS = [
    { id: "soc", label: "SOC", sub: "Security Operations", desc: "Blue Team · Detect & Respond", color: "#22d3ee", branch: "rgba(34,211,238,0.55)", href: "/roadmaps/soc", live: true },
    { id: "appsec", label: "DevSecOps", sub: "Application Security", desc: "Modern Secure Dev Lifecycle", color: "#a78bfa", branch: "rgba(167,139,250,0.5)", href: null, live: false },
    { id: "web", label: "Web Hacking", sub: "App Exploitation", desc: "Offense · Adversary Simulation", color: "#f43f5e", branch: "rgba(244,63,94,0.5)", href: "/roadmaps/web-hacking", live: true },
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
                background: d.live
                    ? "linear-gradient(155deg, rgba(6,10,24,0.98) 0%, rgba(3,6,16,0.99) 100%)"
                    : "linear-gradient(160deg, rgba(15,23,42,0.98) 0%, rgba(15,23,42,0.96) 45%, rgba(15,23,42,0.99) 100%)",
                border: `1px solid ${d.live ? `${d.color}${hovered ? "28" : "18"}` : "rgba(51,65,85,0.7)"}`,
                borderLeft: d.live
                    ? `2.5px solid ${d.color}${hovered ? "dd" : "65"}`
                    : "2px solid rgba(51,65,85,0.9)",
                borderTop: d.live
                    ? `1px solid ${d.color}${hovered ? "22" : "0a"}`
                    : "1px solid rgba(30,41,59,0.9)",
                borderRadius: 10,
                padding: "20px 18px 16px",
                display: "flex", flexDirection: "column",
                position: "relative", overflow: "hidden",
                cursor: d.live ? "pointer" : "default",
                boxShadow: d.live
                    ? (hovered
                        ? `0 0 0 1px ${d.color}15, inset 0 0 40px ${d.color}07, 0 28px 72px rgba(0,0,0,0.88), 0 0 60px ${d.color}0d`
                        : `inset 0 0 24px ${d.color}04, 0 16px 48px rgba(0,0,0,0.65)`)
                    : "inset 0 0 20px rgba(15,23,42,0.9), 0 14px 32px rgba(0,0,0,0.75)",
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
                background: d.live
                    ? `radial-gradient(circle, ${d.color}0e 0%, transparent 65%)`
                    : "radial-gradient(circle, rgba(148,163,184,0.12) 0%, transparent 65%)",
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
                        background: d.live ? d.color : "rgba(71,85,105,0.5)",
                        boxShadow: d.live ? `0 0 9px ${d.color}aa` : "0 0 0 rgba(0,0,0,0)",
                        animation: d.live ? "alert-pulse 2s ease-in-out infinite" : "none",
                    }} />
                    <span style={{
                        fontFamily: "var(--font-mono, monospace)", fontSize: 7.5,
                        letterSpacing: "0.25em",
                        color: d.live ? d.color : "rgba(148,163,184,0.85)",
                        fontWeight: 600,
                    }}>{d.live ? "LIVE" : "COMING SOON"}</span>
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
                color: d.live ? "rgba(248,250,252,0.97)" : "rgba(148,163,184,0.9)",
                letterSpacing: -1, lineHeight: 1.02, marginBottom: 6,
            }}>{d.label}</div>

            {/* Subtitle */}
            <div style={{
                fontFamily: "var(--font-sans, sans-serif)", fontSize: 11,
                color: d.live ? "rgba(148,163,184,0.44)" : "rgba(148,163,184,0.65)",
                marginBottom: 14,
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
                color: d.live ? `${d.color}60` : "rgba(148,163,184,0.7)",
                letterSpacing: "0.04em", lineHeight: 1.8, flexGrow: 1,
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

            {/* Disabled overlay for coming-soon domains */}
            {!d.live && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: 10,
                        pointerEvents: "none",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "-22%",
                            width: "144%",
                            height: 22,
                            transform: "rotate(-24deg)",
                            transformOrigin: "center",
                            background: "linear-gradient(90deg, rgba(148,163,184,0.04), rgba(148,163,184,0.5), rgba(148,163,184,0.04))",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 8,
                            letterSpacing: "0.28em",
                            textTransform: "uppercase",
                            color: "rgba(15,23,42,0.95)",
                            textShadow: "0 0 12px rgba(15,23,42,0.9)",
                        }}
                    >
                        Coming Soon
                    </div>
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
    const [hoveredMenu, setHoveredMenu] = useState<'workflows' | 'roadmaps' | null>(null);
    const [rPos, setRPos] = useState<Pt | null>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const update = () => {
            setIsMobile(window.innerWidth < 1024);
            setLayout(computeLayout(window.innerWidth, window.innerHeight));
        };
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

        if (isMobile) {
            // Un-hide elements that are hidden by default for the GSAP animation
            if (pathLabelRef.current) pathLabelRef.current.style.opacity = "1";
            return;
        }

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
        <div ref={containerRef} style={{ height: isMobile ? "auto" : "280vh" }}>
            {/* Fixed top-left nav (Desktop Only) */}
            {!isMobile && (
                <div style={{ position: "fixed", top: 28, left: 32, zIndex: 100, display: "flex", gap: 16 }}>
                    {/* Workflows Dropdown */}
                    <div 
                        onMouseEnter={() => setHoveredMenu('workflows')}
                        onMouseLeave={() => setHoveredMenu(null)}
                        style={{ position: "relative" }}
                    >
                        <button
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 10,
                                fontFamily: "var(--font-mono, monospace)",
                                fontSize: 12, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase",
                                color: hoveredMenu === 'workflows' ? "#fff" : "#22d3ee",
                                background: hoveredMenu === 'workflows' ? "rgba(34,211,238,0.22)" : "rgba(34,211,238,0.06)",
                                border: "1.5px solid",
                                borderColor: hoveredMenu === 'workflows' ? "#22d3ee" : "rgba(34,211,238,0.45)",
                                borderRadius: 10, padding: "12px 24px",
                                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                                boxShadow: hoveredMenu === 'workflows' 
                                    ? "0 0 35px rgba(34,211,238,0.25), inset 0 0 15px rgba(34,211,238,0.1)"
                                    : "0 0 25px rgba(34,211,238,0.12), inset 0 0 10px rgba(34,211,238,0.05)",
                                transform: hoveredMenu === 'workflows' ? "translateY(-1px)" : "none",
                                cursor: "pointer",
                            }}
                        >
                            Workflows
                            <svg 
                                width="10" height="6" viewBox="0 0 10 6" fill="none"
                                style={{ transform: hoveredMenu === 'workflows' ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                            >
                                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Workflows Menu */}
                        <div style={{
                            position: "absolute", top: "115%", left: 0, width: 260,
                            padding: "8px", borderRadius: 12,
                            background: "rgba(2,6,23,0.85)", backdropFilter: "blur(16px)",
                            border: "1px solid rgba(34,211,238,0.2)",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(34,211,238,0.05)",
                            opacity: hoveredMenu === 'workflows' ? 1 : 0,
                            visibility: hoveredMenu === 'workflows' ? "visible" : "hidden",
                            transform: hoveredMenu === 'workflows' ? "translateY(0)" : "translateY(10px)",
                            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                            zIndex: 110,
                        }}>
                            {[
                                { label: "SOC Experience", href: "/roadmaps/soc" },
                                { label: "Web Hacking Experience", href: "/roadmaps/web-hacking" },
                                { label: "AI Hacking Experience", href: "/roadmaps/ai-hacking" },
                                { label: "Network Pentesting Experience", href: "/roadmaps/network-pentesting" }
                            ].map((item) => (
                                <Link 
                                    key={item.href} href={item.href}
                                    style={{
                                        display: "block", width: "100%", padding: "12px 16px",
                                        borderRadius: 8, textDecoration: "none",
                                        fontFamily: "var(--font-mono, monospace)",
                                        fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
                                        color: "rgba(248,250,252,0.8)", transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.12)";
                                        (e.currentTarget as HTMLElement).style.color = "#22d3ee";
                                        (e.currentTarget as HTMLElement).style.paddingLeft = "20px";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                        (e.currentTarget as HTMLElement).style.color = "rgba(248,250,252,0.8)";
                                        (e.currentTarget as HTMLElement).style.paddingLeft = "16px";
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Roadmaps Dropdown */}
                    <div 
                        onMouseEnter={() => setHoveredMenu('roadmaps')}
                        onMouseLeave={() => setHoveredMenu(null)}
                        style={{ position: "relative" }}
                    >
                        <button
                            style={{
                                display: "inline-flex", alignItems: "center", gap: 10,
                                fontFamily: "var(--font-mono, monospace)",
                                fontSize: 12, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase",
                                color: hoveredMenu === 'roadmaps' ? "#fff" : "#22d3ee",
                                background: hoveredMenu === 'roadmaps' ? "rgba(34,211,238,0.22)" : "rgba(34,211,238,0.06)",
                                border: "1.5px solid",
                                borderColor: hoveredMenu === 'roadmaps' ? "#22d3ee" : "rgba(34,211,238,0.45)",
                                borderRadius: 10, padding: "12px 24px",
                                backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                                transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                                boxShadow: hoveredMenu === 'roadmaps' 
                                    ? "0 0 35px rgba(34,211,238,0.25), inset 0 0 15px rgba(34,211,238,0.1)"
                                    : "0 0 25px rgba(34,211,238,0.12), inset 0 0 10px rgba(34,211,238,0.05)",
                                transform: hoveredMenu === 'roadmaps' ? "translateY(-1px)" : "none",
                                cursor: "pointer",
                            }}
                        >
                            Roadmaps
                            <svg 
                                width="10" height="6" viewBox="0 0 10 6" fill="none"
                                style={{ transform: hoveredMenu === 'roadmaps' ? "rotate(180deg)" : "none", transition: "transform 0.3s ease" }}
                            >
                                <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        {/* Roadmaps Menu */}
                        <div style={{
                            position: "absolute", top: "115%", left: 0, width: 260,
                            padding: "8px", borderRadius: 12,
                            background: "rgba(2,6,23,0.85)", backdropFilter: "blur(16px)",
                            border: "1px solid rgba(34,211,238,0.2)",
                            boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px rgba(34,211,238,0.05)",
                            opacity: hoveredMenu === 'roadmaps' ? 1 : 0,
                            visibility: hoveredMenu === 'roadmaps' ? "visible" : "hidden",
                            transform: hoveredMenu === 'roadmaps' ? "translateY(0)" : "translateY(10px)",
                            transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                            zIndex: 110,
                        }}>
                            {[
                                { label: "SOC Pathway", href: "/roadmaps/soc/career-path" },
                                { label: "Web Hacking Pathway", href: "/roadmaps/web-hacking/career-path" },
                                { label: "AI Hacking Pathway", href: "/roadmaps/ai-hacking/career-path" },
                                { label: "Network Pentesting Pathway", href: "/roadmaps/network-pentesting/career-path" }
                            ].map((item) => (
                                <Link 
                                    key={item.href} href={item.href}
                                    style={{
                                        display: "block", width: "100%", padding: "12px 16px",
                                        borderRadius: 8, textDecoration: "none",
                                        fontFamily: "var(--font-mono, monospace)",
                                        fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
                                        color: "rgba(248,250,252,0.8)", transition: "all 0.2s ease",
                                    }}
                                    onMouseEnter={e => {
                                        (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.12)";
                                        (e.currentTarget as HTMLElement).style.color = "#22d3ee";
                                        (e.currentTarget as HTMLElement).style.paddingLeft = "20px";
                                    }}
                                    onMouseLeave={e => {
                                        (e.currentTarget as HTMLElement).style.background = "transparent";
                                        (e.currentTarget as HTMLElement).style.color = "rgba(248,250,252,0.8)";
                                        (e.currentTarget as HTMLElement).style.paddingLeft = "16px";
                                    }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Mobile Header (Mobile Only) */}
            {isMobile && (
                 <div style={{ 
                    position: "fixed", top: 0, left: 0, right: 0, height: 60, zIndex: 100,
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "0 24px", background: "rgba(9,13,20,0.8)", backdropFilter: "blur(12px)",
                    borderBottom: "1px solid rgba(255,255,255,0.05)"
                 }}>
                    <span className="font-mono text-[11px] font-bold tracking-[0.4em] text-cyan-400">rootaccess</span>
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 8,
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 10, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase",
                            color: "#22d3ee", padding: "8px 16px",
                            background: "rgba(34,211,238,0.1)", border: "1px solid rgba(34,211,238,0.3)",
                            borderRadius: 8, transition: "all 0.2s ease"
                        }}
                    >
                        Menu
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                 </div>
            )}

            {/* Fixed top-right nav (Desktop Only) */}
            {!isMobile && (
                <Link
                    href="/about"
                    style={{
                        position: "fixed", top: 28, right: 32, zIndex: 100,
                        display: "inline-flex", alignItems: "center", gap: 10,
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 12, fontWeight: 700, letterSpacing: "0.35em", textTransform: "uppercase",
                        color: "#22d3ee",
                        background: "rgba(34,211,238,0.06)",
                        border: "1.5px solid rgba(34,211,238,0.45)",
                        borderRadius: 10, padding: "12px 24px",
                        textDecoration: "none", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
                        transition: "all 0.25s cubic-bezier(0.16,1,0.3,1)",
                        boxShadow: "0 0 25px rgba(34,211,238,0.12), inset 0 0 10px rgba(34,211,238,0.05)",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = "#fff";
                        (e.currentTarget as HTMLElement).style.borderColor = "#22d3ee";
                        (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.22)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 35px rgba(34,211,238,0.25), inset 0 0 15px rgba(34,211,238,0.1)";
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = "#22d3ee";
                        (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.45)";
                        (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.06)";
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(34,211,238,0.12), inset 0 0 10px rgba(34,211,238,0.05)";
                        (e.currentTarget as HTMLElement).style.transform = "none";
                    }}
                >
                    About
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                        <path d="M1.5 5.5h8M6.5 2l3.5 3.5-3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </Link>
            )}

            {/* Mobile Menu Overlay */}
            <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

            <div
                style={{ position: isMobile ? "relative" : "sticky", top: 0, height: isMobile ? "auto" : "100vh", overflow: isMobile ? "visible" : "hidden" }}
                className="world-grid"
            >
                {/* Vignette */}
                <div className="pointer-events-none absolute inset-0" style={{
                    background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 28%, rgba(2,6,23,0.7) 100%)",
                    position: isMobile ? "fixed" : "absolute"
                }} />

                {/* ── Hero text ──────────────────────────────────────────────────────── */}
                <div className={isMobile ? "flex flex-col items-center justify-center relative min-h-[100vh] pb-16" : "absolute inset-0 flex flex-col items-center justify-center"} style={{ zIndex: 10 }}>
                    <p ref={dotLabelRef} className="font-mono uppercase transition-colors" style={{
                        fontSize: 12, fontWeight: 700, letterSpacing: "0.6em", color: "rgba(34,211,238,0.75)", marginBottom: "1.2rem",
                    }}>rootaccess.tech</p>

                    <h1 className="font-heading leading-none" style={{
                        display: "flex", alignItems: "baseline",
                        fontSize: "clamp(4.5rem, 13vw, 10.5rem)", fontWeight: 700, letterSpacing: "-0.04em",
                    }}>
                        <span ref={rSpacerRef} aria-hidden="true" style={{
                            visibility: isMobile ? "visible" : "hidden",
                            color: "#22d3ee",
                            textShadow: isMobile ? "0 0 40px rgba(34,211,238,0.65), 0 0 80px rgba(34,211,238,0.3)" : "none"
                        }}>R</span>
                        <span ref={ootRef}>
                            <span style={{ color: "#22d3ee" }}>oot</span>
                            <span style={{ color: "rgba(248,250,252,0.95)" }}>Access</span>
                        </span>
                    </h1>

                    <p ref={subtitleRef} className="font-mono uppercase" style={{
                        fontSize: 16, fontWeight: 600, letterSpacing: "0.38em", color: "#f8fafc",
                        maxWidth: 620, lineHeight: 1.7, marginTop: "2rem", textAlign: "center",
                    }}>
                        Interactive career roadmaps for cybersecurity professionals
                    </p>

                    <div ref={scrollIndRef} className="flex flex-col items-center gap-4" style={{ marginTop: "3.2rem" }}>
                        <span className="font-mono uppercase font-bold" style={{
                            fontSize: 13,
                            letterSpacing: "0.5em",
                            color: "rgba(248,250,252,0.95)",
                        }}>Scroll to explore</span>
                        <div className="animate-bounce">
                            <svg
                                className="w-10 h-10 text-slate-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* ── THE R ─────────────────────────────────────────────────────────── */}
                {rPos && !isMobile && (
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
                {layout && !isMobile && (
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
                {layout && !isMobile && DOMAINS.map((d, i) => (
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

                {isMobile && (
                    <div style={{ position: "relative", zIndex: 13, display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", padding: "0 20px 60px 20px" }}>
                        <p ref={pathLabelRef} className="font-mono uppercase" style={{
                            fontSize: 10, letterSpacing: "0.55em", color: "rgba(34,211,238,0.6)", marginBottom: "10px", marginTop: "20px"
                        }}>Choose Your Path</p>

                        {DOMAINS.map((d) => (
                            <div key={d.id} style={{ width: "100%", maxWidth: "340px", height: "auto" }}>
                                <BannerCard
                                    domain={d}
                                    bRef={() => { }}
                                    style={{
                                        position: "relative",
                                        opacity: 1,
                                        transform: "none",
                                        width: "100%",
                                        minHeight: "240px",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}

                {/* "Choose your path" (Desktop only) */}
                {layout && !isMobile && (
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
