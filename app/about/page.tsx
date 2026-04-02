"use client";

import React, { useState } from "react";
import Link from "next/link";

const FOUNDERS = [
    {
        initials: "AJ",
        photo: "/aaron_dp.jpeg",
        name: "Aaron Joseph Jean",
        role: "Cybersecurity Professional | SOC Operations Specialist | M.Sc Adaptive Cybersecurity",
        location: "Galway, Ireland",
        color: "#94a3b8", // Slate 400
        story: "Aaron is a cybersecurity leader with hands-on experience managing SOC operations for large-scale Government of India deployments. Currently pursuing his Masters in Adaptive Cybersecurity at the University of Galway, Aaron specializes in endpoint forensics, SIEM integration, and cross-departmental security strategy. His background in managing complex government RFP requirements and SIEM facilities makes him a specialist in administrative and technical security alignment.",
        expertise: [
            "SIEM (Elastic/Splunk) Engineering",
            "Red Teaming",
            "Threat Intel Management"
        ],
        impact: "Handled daily security operations for government-sector SOC solutions, focusing on parser integration and real-time threat detection.",
        certs: ["Cyberdefenders Top 50", "AWS Solutions Architect", "CompTIA Security+", "Practical SOC Analyst", "Google Cybersecurity Professional"],
        email: "aaron@rootaccess.tech",
        linkedin: "https://linkedin.com/in/aaronjjean",
        github: "https://github.com/aaronjjean",
    },
    {
        initials: "KM",
        photo: "/katriel_dp.jpeg",
        name: "Katriel Delzyn Moses",
        role: "Founding Security Engineer | Cloud Architect | AWS Certified Security Specialist",
        location: "Bangalore, India",
        color: "#94a3b8", // Slate 400
        story: "Katriel brings the experience of building and operating security infrastructure for platforms serving 100M+ global users. From architecting centralized SOC engines from scratch to commanding SEV-1 incident responses that restored revenue in under 15 minutes, his work is rooted in high-consequence environments. He specializes in multi-cloud forensics, threat hunting, and ensuring continuous operational resilience.",
        expertise: [
            "GCP/AWS Cloud Security",
            "Incident Response (RCA)",
            "DevSecOps Automation"
        ],
        impact: "Slashed MTTR by 95% for major fintech infrastructure through advanced log correlation and telemetry.",
        certs: ["AWS Security Specialty", "AWS Solutions Architect", "CompTIA Security+", "Practical SOC Analyst", "Google Cybersecurity Professional"],
        email: "katriel@rootaccess.tech",
        linkedin: "https://www.linkedin.com/in/katriel-moses/",
        github: null,
    },
];

function FounderCard({ founder, index }: { founder: typeof FOUNDERS[number]; index: number }) {
    const [copied, setCopied] = useState(false);

    function copyEmail() {
        navigator.clipboard.writeText(founder.email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    }

    return (
        <div
            style={{
                background: "rgba(15,23,42,0.4)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderLeft: `2px solid ${founder.color}60`,
                borderRadius: 16,
                padding: "32px 28px",
                position: "relative",
                overflow: "hidden",
                animation: `fadeSlideUp 0.8s ${index * 0.2}s both cubic-bezier(0.16, 1, 0.3, 1)`,
                display: "flex",
                flexDirection: "column",
                backdropFilter: "blur(12px)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
            }}
        >
            {/* Design accents */}
            <div style={{ position: "absolute", top: 0, right: 0, width: 100, height: 100, background: "radial-gradient(circle at top right, rgba(255,255,255,0.02), transparent 70%)", pointerEvents: "none" }} />

            {/* Corner bracket */}
            <svg style={{ position: "absolute", top: 12, right: 12, pointerEvents: "none", opacity: 0.3 }} width="14" height="14" viewBox="0 0 18 18" fill="none">
                <path d="M0 18 L0 0 L18 0" stroke="white" strokeWidth="1.5" fill="none" />
            </svg>

            {/* Header Area */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 24 }}>
                <div style={{
                    width: 64, height: 64, borderRadius: "50%", flexShrink: 0,
                    border: `2px solid ${founder.color}40`,
                    boxShadow: `0 0 20px ${founder.color}18`,
                    overflow: "hidden",
                }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={founder.photo}
                        alt={founder.name}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <div style={{ width: 6, height: 2, background: founder.color, borderRadius: 1 }} />
                        <p style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 8, letterSpacing: "0.4em",
                            color: founder.color,
                            textTransform: "uppercase", fontWeight: 700,
                        }}>
                            {founder.location}
                        </p>
                    </div>
                    <h2 style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: 22, fontWeight: 800,
                        color: "#f8fafc",
                        letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: 4,
                    }}>
                        {founder.name}
                    </h2>
                    <p style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 9, lineHeight: 1.4,
                        color: "rgba(148,163,184,0.85)",
                        maxWidth: "95%",
                        fontWeight: 500,
                    }}>
                        {founder.role}
                    </p>
                </div>
            </div>

            {/* Story with pull-quote feel */}
            <div style={{ position: "relative", marginBottom: 20 }}>
                <div style={{
                    position: "absolute", left: -10, top: 0, bottom: 0, width: 1,
                    background: `linear-gradient(to bottom, ${founder.color}30, transparent)`,
                }} />
                <p style={{
                    fontFamily: "var(--font-sans, sans-serif)",
                    fontSize: 14, lineHeight: 1.75,
                    color: "rgba(226,232,240,0.85)",
                    fontStyle: "normal",
                }}>
                    {founder.story}
                </p>
            </div>

            {/* Expertise & Impact Grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 18, marginBottom: 24 }}>
                <div>
                    <h3 style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 8, letterSpacing: "0.35em",
                        color: `${founder.color}70`,
                        textTransform: "uppercase", fontWeight: 800, marginBottom: 10,
                        display: "flex", alignItems: "center", gap: 8,
                    }}>
                        <span style={{ width: 10, height: 1, background: `${founder.color}30` }} />
                        Key Expertise
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {founder.expertise.map((item) => (
                            <span key={item} style={{
                                fontFamily: "var(--font-mono, monospace)",
                                fontSize: 9, letterSpacing: "0.01em",
                                color: "rgba(255,255,255,0.9)",
                                background: "rgba(255,255,255,0.02)",
                                border: "1px solid rgba(255,255,255,0.06)",
                                borderRadius: 5, padding: "4px 10px",
                            }}>
                                {item}
                            </span>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 8, letterSpacing: "0.35em",
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase", fontWeight: 800, marginBottom: 10,
                        display: "flex", alignItems: "center", gap: 8,
                    }}>
                        <span style={{ width: 10, height: 1, background: "rgba(255,255,255,0.1)" }} />
                        Operational Certifications
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {founder.certs.map((cert) => {
                            const isAWS = cert.includes("AWS");
                            const isGoogle = cert.includes("Google");
                            
                            return (
                                <span key={cert} style={{
                                    fontFamily: "var(--font-mono, monospace)",
                                    fontSize: 9, letterSpacing: "0.01em",
                                    color: "rgba(255,255,255,0.7)",
                                    background: "rgba(255,255,255,0.03)",
                                    border: "1px solid rgba(255,255,255,0.1)",
                                    borderRadius: 5, padding: "4px 10px",
                                    fontWeight: 600,
                                    display: "inline-flex", alignItems: "center", gap: 5,
                                }}>
                                    {isAWS && (
                                        <img src="/assets/aws-svgrepo-com.svg" alt="AWS" style={{ height: 10, width: "auto", objectFit: "contain", filter: "brightness(0) invert(1) opacity(0.7)" }} />
                                    )}
                                    {isGoogle && (
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" style={{ opacity: 0.8 }}>
                                            <path d="M22.56,12.25c0-0.78-0.07-1.53-0.2-2.25H12v4.26h5.92c-0.26,1.37-1.04,2.53-2.21,3.31v2.77h3.57 C21.35,18.41,22.56,15.62,22.56,12.25z" fill="#4285F4"/>
                                            <path d="M12,23c2.97,0,5.46-0.98,7.28-2.66l-3.57-2.77c-0.99,0.66-2.26,1.05-3.71,1.05c-2.86,0-5.29-1.93-6.16-4.53H2.18v2.84 C3.99,20.53,7.7,23,12,23z" fill="#34A853"/>
                                            <path d="M5.84,14.09c-0.22-0.66-0.35-1.36-0.35-2.09s0.13-1.43,0.35-2.09V7.07H2.18C1.43,8.55,1,10.22,1,12s0.43,3.45,1.18,4.93 L5.84,14.09z" fill="#FBBC05"/>
                                            <path d="M12,5.38c1.62,0,3.06,0.56,4.21,1.66l3.15-3.15C17.45,2.09,14.97,1,12,1C7.7,1,3.99,3.47,2.18,7.07l3.66,2.84 C6.71,7.31,9.14,5.38,12,5.38z" fill="#EA4335"/>
                                        </svg>
                                    )}
                                    {cert}
                                </span>
                            );
                        })}
                    </div>
                </div>

                <div>
                    <h3 style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 8, letterSpacing: "0.35em",
                        color: "rgba(255,255,255,0.4)",
                        textTransform: "uppercase", fontWeight: 800, marginBottom: 10,
                        display: "flex", alignItems: "center", gap: 8,
                    }}>
                        <span style={{ width: 10, height: 1, background: "rgba(255,255,255,0.1)" }} />
                        Industry Impact
                    </h3>
                    <div style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: 10, padding: "12px 16px",
                    }}>
                        <p style={{
                            fontFamily: "var(--font-sans, sans-serif)",
                            fontSize: 13, lineHeight: 1.5,
                            color: "rgba(255,255,255,0.7)",
                            fontWeight: 500,
                        }}>
                            {founder.impact}
                        </p>
                    </div>
                </div>
            </div>

            {/* Spacer pushes contact links to bottom */}
            <div style={{ flexGrow: 1 }} />

            {/* Action Area */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", paddingTop: 16, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase",
                        color: "#fff",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: 8, padding: "8px 16px",
                        textDecoration: "none", transition: "all 0.25s ease",
                        fontWeight: 700,
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = founder.color;
                        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 25px ${founder.color}40`;
                        (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = `${founder.color}30`;
                        (e.currentTarget as HTMLElement).style.boxShadow = "none";
                        (e.currentTarget as HTMLElement).style.transform = "none";
                    }}
                >
                    LinkedIn
                </a>

                {founder.github && (
                    <a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", padding: "10px",
                            color: "rgba(255,255,255,0.6)",
                            background: "rgba(255,255,255,0.03)",
                            border: "1.5px solid rgba(255,255,255,0.1)",
                            borderRadius: 10, transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.color = "#fff";
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.08)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = "rgba(255,255,255,0.6)";
                            (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                        }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                    </a>
                )}

                <button
                    onClick={copyEmail}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase",
                        color: copied ? "#34d399" : "rgba(255,255,255,0.7)",
                        background: copied ? "rgba(52,211,153,0.1)" : "rgba(255,255,255,0.03)",
                        border: `1.5px solid ${copied ? "rgba(52,211,153,0.4)" : "rgba(255,255,255,0.1)"}`,
                        borderRadius: 10, padding: "10px 20px",
                        cursor: "pointer", transition: "all 0.2s ease",
                        fontWeight: 600,
                    }}
                >
                    {copied ? "Copied!" : "Email Contact"}
                </button>
            </div>
        </div>
    );
}

export default function AboutPage() {
    const [journeyOpen, setJourneyOpen] = useState(false);

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                backgroundImage: [
                    "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px)",
                    "linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
                ].join(", "),
                backgroundSize: "60px 60px",
            }}
        >
            {/* Ambient Lighting - extremely subtle */}
            <div style={{ position: "fixed", top: "-10%", left: "20%", width: "60vw", height: "60vw", background: "radial-gradient(circle, rgba(255,255,255,0.015) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />
            <div style={{ position: "fixed", bottom: "-10%", right: "10%", width: "50vw", height: "50vw", background: "radial-gradient(circle, rgba(167,139,250,0.03) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

            <nav style={{
                position: "sticky", top: 0, zIndex: 50,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "20px 40px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(2,6,23,0.8)",
                backdropFilter: "blur(20px)",
            }}>
                <Link
                    href="/"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 10,
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 10, fontWeight: 700, letterSpacing: "0.4em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.6)", textDecoration: "none",
                        transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.6)")}
                >
                    <svg width="12" height="12" viewBox="0 0 10 10" fill="none">
                        <path d="M7 5H1M4 2L1 5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    RootAccess.tech
                </Link>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 4, height: 4, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                    <p style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase",
                        color: "rgba(255,255,255,0.4)", fontWeight: 600,
                    }}>
                        Operational Data
                    </p>
                </div>
            </nav>

            <main style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "40px 32px 80px" }}>

                {/* Hero / Story */}
                <div style={{ marginBottom: 60 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                        <div style={{ width: 30, height: 1, background: "rgba(255,255,255,0.15)" }} />
                        <p style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase",
                            color: "rgba(255,255,255,0.5)", fontWeight: 700,
                        }}>
                            Mission Log
                        </p>
                    </div>

                    <h1 style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                        fontWeight: 900, letterSpacing: "-0.04em",
                        color: "#f8fafc",
                        lineHeight: 1.05, marginBottom: 20,
                        maxWidth: "20ch",
                    }}>
                        The RootAccess.tech Story
                    </h1>

                    <div style={{ maxWidth: 840 }}>
                        <p style={{
                            fontFamily: "var(--font-sans, sans-serif)",
                            fontSize: 16, lineHeight: 1.6,
                            color: "rgba(248,250,252,0.95)",
                            fontWeight: 500, marginBottom: 16,
                        }}>
                            We are two security engineers who didn’t just learn cybersecurity—we lived it under production pressure.
                        </p>
                        <p style={{
                            fontFamily: "var(--font-sans, sans-serif)",
                            fontSize: 14.5, lineHeight: 1.7,
                            color: "rgba(148,163,184,0.85)",
                            maxWidth: 720,
                        }}>
                            After a year of navigating the high-stakes world of cloud architecture, SOC operations, and incident response, we realized the industry lacked a definitive roadmap for those transitioning from theory to real-world execution. RootAccess.tech was born from a simple mission: to take the complexity of professional security work and make it legible for anyone serious about breaking in. We combine deep-dive technical research with the battle-tested experience of protecting platforms at a national and global scale.
                        </p>
                    </div>
                </div>

                {/* ── Learning Journey ──────────────────────────────────── */}
                <div style={{ marginBottom: 72 }}>
                    {/* Collapsible header row */}
                    <button
                        onClick={() => setJourneyOpen(o => !o)}
                        style={{
                            width: "100%", display: "flex", alignItems: "center",
                            justifyContent: "space-between", gap: 16,
                            background: "none", border: "none", padding: 0,
                            cursor: "pointer", textAlign: "left", marginBottom: journeyOpen ? 8 : 0,
                        }}
                    >
                        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                <div style={{ width: 30, height: 1, background: "rgba(255,255,255,0.15)" }} />
                                <p style={{
                                    fontFamily: "var(--font-mono, monospace)",
                                    fontSize: 10, letterSpacing: "0.5em", textTransform: "uppercase",
                                    color: "rgba(255,255,255,0.5)", fontWeight: 700, margin: 0,
                                }}>
                                    How We Got Here
                                </p>
                            </div>
                            <h2 style={{
                                fontFamily: "var(--font-heading, sans-serif)",
                                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                                fontWeight: 900, letterSpacing: "-0.03em",
                                color: "#f8fafc", margin: 0, lineHeight: 1.1,
                            }}>
                                The Learning Journey
                            </h2>
                        </div>
                        {/* Chevron */}
                        <svg
                            width="18" height="18" viewBox="0 0 18 18" fill="none"
                            style={{
                                flexShrink: 0,
                                transition: "transform 0.3s ease",
                                transform: journeyOpen ? "rotate(180deg)" : "rotate(0deg)",
                                color: "rgba(255,255,255,0.4)",
                            }}
                        >
                            <path d="M4 6.5l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>

                    {/* Collapsible body */}
                    <div style={{
                        overflow: "hidden",
                        maxHeight: journeyOpen ? "9999px" : "0px",
                        transition: "max-height 0.5s cubic-bezier(0.4,0,0.2,1)",
                    }}>
                    <p style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: 14, color: "rgba(148,163,184,0.75)",
                        margin: "16px 0 40px", maxWidth: 560, lineHeight: 1.6,
                    }}>
                        No bootcamp, no shortcut. Just two engineers who figured it out step by step — and built this so you don't have to start from scratch.
                    </p>

                    {/* Timeline */}
                    <div style={{ position: "relative", paddingLeft: 32 }}>
                        {/* Vertical line */}
                        <div style={{
                            position: "absolute", left: 7, top: 8, bottom: 8, width: 1,
                            background: "linear-gradient(to bottom, rgba(255,255,255,0.12), rgba(255,255,255,0.03))",
                        }} />

                        {[
                            {
                                num: "01",
                                title: "Curiosity Over Convention",
                                body: "We were deep in the SDE grind — and bored out of our minds. Cybersecurity caught our attention not as a career pivot, but as something that was just genuinely interesting. That curiosity was the only thing that got us started.",
                                tag: null,
                                color: "rgba(148,163,184,0.6)",
                            },
                            {
                                num: "02",
                                title: "Google Cybersecurity Certificate",
                                body: "Our first structured foundation. It gave us the fundamentals and — more importantly — a map of the field. We could finally see what paths existed and which ones pulled us in.",
                                tag: "Certification",
                                color: "#4285F4",
                            },
                            {
                                num: "03",
                                title: "Going Blue Team",
                                body: "Defensive security clicked for us. We dug into TCM Security's SOC 101, pursued the Practical SOC Analyst (PSAA) certification, and started building a real operator mindset — not just theory.",
                                tag: "TCM Security · PSAA",
                                color: "#22d3ee",
                            },
                            {
                                num: "04",
                                title: "CompTIA Security+",
                                body: "Let's be honest — this one was for the HR filters. We studied for it, passed it, and moved on. It served its purpose.",
                                tag: "Certification",
                                color: "rgba(148,163,184,0.5)",
                            },
                            {
                                num: "05",
                                title: "HTB Sherlocks → CyberDefenders → Top 50 Globally",
                                body: "We started with Sherlock challenges on HackTheBox, then migrated to CyberDefenders for the deeper labs and stuck with it. Grinding through real forensics cases until we cracked the top 50 in the world. That ranking changed how we saw ourselves.",
                                tag: "CyberDefenders · Top 50",
                                color: "#f59e0b",
                            },
                            {
                                num: "06",
                                title: "Forensics, Threat Hunting & Malware Analysis",
                                body: "The leaderboard lit a fire. We went deep — digital forensics, threat hunting, malware analysis. Not surface-level. We got genuinely good at it, and that expertise is baked directly into what we teach.",
                                tag: "Specialisation",
                                color: "#ef4444",
                            },
                            {
                                num: "07",
                                title: "Stepping into Cloud Security",
                                body: "We noticed a gap. Cloud was everywhere but we were still learning it. Started with accessible challenges to build intuition before committing to formal study.",
                                tag: "Cloud Entry",
                                color: "#34d399",
                            },
                            {
                                num: "08",
                                title: "AWS Solutions Architect — Associate",
                                body: "To secure the cloud properly, you need to understand how it's built. We went hands-on with architecture — IAM, VPCs, services — not to become architects, but to understand what we were protecting.",
                                tag: "AWS Certification",
                                color: "#f97316",
                            },
                            {
                                num: "09",
                                title: "AWS Security Specialty",
                                body: "Closed the loop. Took everything we'd learned about cloud architecture and applied it through a security lens. This one wasn't for the resume — it was because we needed to know it cold.",
                                tag: "AWS Certification",
                                color: "#f97316",
                            },
                        ].map((step, i, arr) => (
                            <div key={step.num} style={{
                                position: "relative",
                                paddingBottom: i < arr.length - 1 ? 32 : 0,
                                display: "flex", gap: 20, alignItems: "flex-start",
                            }}>
                                {/* Dot */}
                                <div style={{
                                    position: "absolute", left: -28, top: 4,
                                    width: 14, height: 14, borderRadius: "50%",
                                    background: `${step.color}18`,
                                    border: `1.5px solid ${step.color}`,
                                    flexShrink: 0,
                                    boxShadow: `0 0 10px ${step.color}30`,
                                }} />

                                {/* Content */}
                                <div style={{
                                    background: "rgba(15,23,42,0.35)",
                                    border: "1px solid rgba(255,255,255,0.05)",
                                    borderLeft: `2px solid ${step.color}40`,
                                    borderRadius: 12,
                                    padding: "16px 20px",
                                    flex: 1,
                                    backdropFilter: "blur(8px)",
                                }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                                        <span style={{
                                            fontFamily: "var(--font-mono, monospace)",
                                            fontSize: 8, letterSpacing: "0.3em",
                                            color: step.color, fontWeight: 800,
                                            opacity: 0.8,
                                        }}>
                                            {step.num}
                                        </span>
                                        <h3 style={{
                                            fontFamily: "var(--font-heading, sans-serif)",
                                            fontSize: 15, fontWeight: 800,
                                            color: "#f1f5f9", letterSpacing: "-0.02em",
                                            lineHeight: 1.2,
                                        }}>
                                            {step.title}
                                        </h3>
                                        {step.tag && (
                                            <span style={{
                                                fontFamily: "var(--font-mono, monospace)",
                                                fontSize: 8, letterSpacing: "0.12em",
                                                textTransform: "uppercase",
                                                color: step.color,
                                                background: `${step.color}12`,
                                                border: `1px solid ${step.color}30`,
                                                borderRadius: 4, padding: "2px 8px",
                                                fontWeight: 700,
                                            }}>
                                                {step.tag}
                                            </span>
                                        )}
                                    </div>
                                    <p style={{
                                        fontFamily: "var(--font-sans, sans-serif)",
                                        fontSize: 13.5, lineHeight: 1.65,
                                        color: "rgba(203,213,225,0.85)",
                                        margin: 0,
                                    }}>
                                        {step.body}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                    </div>{/* end collapsible body */}
                </div>

                {/* Founders Section */}
                <div style={{ marginBottom: 40 }}>
                    <h2 style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                        fontWeight: 800, letterSpacing: "-0.03em",
                        color: "#f8fafc", marginBottom: 32,
                        display: "flex", alignItems: "center", gap: 20,
                    }}>
                        Meet the Founders
                        <div style={{ flex: 1, height: 1, background: "linear-gradient(to right, rgba(255,255,255,0.1), transparent)" }} />
                    </h2>

                    <div style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(500px, 1fr))",
                        gap: 32,
                    }}>
                        {FOUNDERS.map((founder, i) => (
                            <FounderCard key={founder.name} founder={founder} index={i} />
                        ))}
                    </div>
                </div>

                <div style={{
                    marginTop: 100,
                    padding: "60px 40px",
                    background: "rgba(15,23,42,0.4)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 24,
                    textAlign: "center",
                    position: "relative",
                    overflow: "hidden",
                    backdropFilter: "blur(12px)",
                }}>
                    <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "radial-gradient(circle at center, rgba(255,255,255,0.015) 0%, transparent 70%)", pointerEvents: "none" }} />
                    
                    <h2 style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "clamp(2rem, 4vw, 2.5rem)",
                        fontWeight: 900, color: "#f8fafc",
                        marginBottom: 16, letterSpacing: "-0.02em",
                    }}>
                        Ready to level up?
                    </h2>
                    <p style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: 16, color: "rgba(148,163,184,0.8)",
                        maxWidth: 500, margin: "0 auto 32px",
                        lineHeight: 1.6,
                    }}>
                        Each roadmap is a battle-tested simulation of real-world security challenges. Choose your domain and start your career today.
                    </p>
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 12,
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 12, fontWeight: 800, letterSpacing: "0.2em",
                            textTransform: "uppercase", textDecoration: "none",
                            color: "#0f172a",
                            background: "#f8fafc",
                            border: "1px solid #f8fafc",
                            borderRadius: 10, padding: "14px 32px",
                            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(0,0,0,0.2)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                            (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
                        }}
                    >
                        Access Pathways
                        <svg width="14" height="14" viewBox="0 0 10 10" fill="none">
                            <path d="M1 5h8M6 2l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </main>

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(30px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
