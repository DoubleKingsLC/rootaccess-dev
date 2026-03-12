"use client";

import React, { useState } from "react";
import Link from "next/link";

const FOUNDERS = [
    {
        initials: "AJ",
        name: "Aaron Joseph Jean",
        role: "Co-Founder",
        location: "Galway, Ireland",
        color: "#1db6ce",
        story:
            "Aaron is a cybersecurity professional with hands-on SOC operations experience — including managing security monitoring for a large-scale Government of India deployment. A Cyberdefenders Global Top 50-ranked analyst currently pursuing an MSc in Adaptive Cybersecurity at the University of Galway, he holds AWS Solutions Architect, CompTIA Security+, and Practical SOC Analyst certifications. He built RootAccess.tech to give beginners the navigable, narrative-driven entry into cybersecurity that he had to piece together himself.",
        skills: [
            "SIEM Engineering (Splunk · Wazuh)",
            "Threat Detection & Incident Triage",
            "Malware Analysis & Forensics",
            "MITRE ATT&CK Mapping",
            "Cloud (AWS)",
            "Full-Stack Development",
        ],
        certs: ["Cyberdefenders Top 50", "AWS Solutions Architect", "CompTIA Security+", "Practical SOC Analyst"],
        email: "aaronjjean@gmail.com",
        linkedin: "https://linkedin.com/in/aaronjjean",
        github: "https://github.com/aaronjjean",
    },
    {
        initials: "KM",
        name: "Katriel Delzyn Moses",
        role: "Co-Founder",
        location: "Bangalore, India",
        color: "#a78bfa",
        story:
            "Katriel is a Founding Security Engineer who has built and operated security infrastructure for platforms serving 100M+ users — architecting a SOC engine from scratch, leading SEV-1 incident response, and slashing MTTR by 95% under live production pressure. An AWS Certified Security Specialist with deep expertise in cloud forensics, threat hunting, and DevSecOps, he brings real production security experience to every roadmap on this platform. He co-founded RootAccess.tech to make the complexity of professional security work legible to anyone serious about breaking in.",
        skills: [
            "Cloud Forensics (AWS · GCP)",
            "SOC Architecture & SOAR",
            "Incident Response & RCA",
            "Threat Hunting & Detection Engineering",
            "DevSecOps & CI/CD Security",
            "YARA · MISP · Wazuh · Splunk",
        ],
        certs: ["AWS Security Specialty", "AWS Solutions Architect", "CompTIA Security+", "Practical SOC Analyst"],
        email: "katriel.moses@gmail.com",
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
                background: "linear-gradient(155deg, rgba(6,10,24,0.98) 0%, rgba(3,6,16,0.99) 100%)",
                border: `1px solid ${founder.color}18`,
                borderLeft: `2.5px solid ${founder.color}80`,
                borderRadius: 14,
                padding: "36px 32px",
                position: "relative",
                overflow: "hidden",
                animation: `fadeSlideUp 0.6s ${index * 0.15}s both ease-out`,
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Corner bracket */}
            <svg style={{ position: "absolute", top: 12, right: 12, pointerEvents: "none" }} width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M0 14 L0 0 L14 0" stroke={`${founder.color}40`} strokeWidth="1" fill="none" />
            </svg>
            <svg style={{ position: "absolute", bottom: 12, left: 14, pointerEvents: "none" }} width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M10 0 L10 10 L0 10" stroke={`${founder.color}20`} strokeWidth="1" fill="none" />
            </svg>

            {/* Ambient glow */}
            <div style={{
                position: "absolute", top: -50, right: -50, width: 240, height: 240,
                background: `radial-gradient(circle, ${founder.color}07 0%, transparent 65%)`,
                pointerEvents: "none",
            }} />

            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 28 }}>
                <div style={{
                    width: 62, height: 62, borderRadius: "50%", flexShrink: 0,
                    background: `${founder.color}10`,
                    border: `1.5px solid ${founder.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: `0 0 24px ${founder.color}16`,
                }}>
                    <span style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 18, fontWeight: 700,
                        color: founder.color,
                        letterSpacing: "-0.02em",
                    }}>
                        {founder.initials}
                    </span>
                </div>
                <div>
                    <p style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 7.5, letterSpacing: "0.32em",
                        color: `${founder.color}58`,
                        textTransform: "uppercase", marginBottom: 4,
                    }}>
                        {founder.role} · {founder.location}
                    </p>
                    <h2 style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: 24, fontWeight: 700,
                        color: "rgba(248,250,252,0.95)",
                        letterSpacing: "-0.02em", lineHeight: 1.1,
                    }}>
                        {founder.name}
                    </h2>
                </div>
            </div>

            {/* Divider */}
            <div style={{
                height: 1,
                background: `linear-gradient(to right, ${founder.color}25, rgba(255,255,255,0.04), transparent)`,
                marginBottom: 22,
            }} />

            {/* Story */}
            <p style={{
                fontFamily: "var(--font-sans, sans-serif)",
                fontSize: 14.5, lineHeight: 1.78,
                color: "rgba(148,163,184,0.80)",
                marginBottom: 26,
            }}>
                {founder.story}
            </p>

            {/* Skills */}
            <div style={{ marginBottom: 22 }}>
                <p style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: 7.5, letterSpacing: "0.32em",
                    color: `${founder.color}44`,
                    textTransform: "uppercase", marginBottom: 10,
                }}>
                    Skills &amp; Expertise
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {founder.skills.map((skill) => (
                        <span key={skill} style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 9, letterSpacing: "0.07em",
                            color: `${founder.color}78`,
                            background: `${founder.color}0d`,
                            border: `1px solid ${founder.color}20`,
                            borderRadius: 4, padding: "4px 10px",
                        }}>
                            {skill}
                        </span>
                    ))}
                </div>
            </div>

            {/* Certifications */}
            <div style={{ marginBottom: 28 }}>
                <p style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: 7.5, letterSpacing: "0.32em",
                    color: `${founder.color}44`,
                    textTransform: "uppercase", marginBottom: 10,
                }}>
                    Certifications
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                    {founder.certs.map((cert) => (
                        <span key={cert} style={{
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 9, letterSpacing: "0.07em",
                            color: "rgba(251,191,36,0.65)",
                            background: "rgba(251,191,36,0.06)",
                            border: "1px solid rgba(251,191,36,0.16)",
                            borderRadius: 4, padding: "4px 10px",
                        }}>
                            {cert}
                        </span>
                    ))}
                </div>
            </div>

            {/* Spacer pushes contact links to bottom */}
            <div style={{ flexGrow: 1 }} />

            {/* Divider before contact */}
            <div style={{
                height: 1,
                background: `linear-gradient(to right, ${founder.color}14, transparent)`,
                marginBottom: 18,
            }} />

            {/* Contact links */}
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {/* LinkedIn */}
                <a
                    href={founder.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
                        color: `${founder.color}72`,
                        background: `${founder.color}09`,
                        border: `1px solid ${founder.color}1e`,
                        borderRadius: 6, padding: "8px 14px",
                        textDecoration: "none", transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.color = founder.color;
                        (e.currentTarget as HTMLElement).style.background = `${founder.color}16`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${founder.color}38`;
                    }}
                    onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.color = `${founder.color}72`;
                        (e.currentTarget as HTMLElement).style.background = `${founder.color}09`;
                        (e.currentTarget as HTMLElement).style.borderColor = `${founder.color}1e`;
                    }}
                >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                </a>

                {/* GitHub (if available) */}
                {founder.github && (
                    <a
                        href={founder.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 7,
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
                            color: `${founder.color}72`,
                            background: `${founder.color}09`,
                            border: `1px solid ${founder.color}1e`,
                            borderRadius: 6, padding: "8px 14px",
                            textDecoration: "none", transition: "all 0.2s ease",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.color = founder.color;
                            (e.currentTarget as HTMLElement).style.background = `${founder.color}16`;
                            (e.currentTarget as HTMLElement).style.borderColor = `${founder.color}38`;
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = `${founder.color}72`;
                            (e.currentTarget as HTMLElement).style.background = `${founder.color}09`;
                            (e.currentTarget as HTMLElement).style.borderColor = `${founder.color}1e`;
                        }}
                    >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                    </a>
                )}

                {/* Email copy */}
                <button
                    onClick={copyEmail}
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 7,
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 9, letterSpacing: "0.16em", textTransform: "uppercase",
                        color: copied ? "#34d399" : `${founder.color}72`,
                        background: copied ? "rgba(52,211,153,0.08)" : `${founder.color}09`,
                        border: `1px solid ${copied ? "rgba(52,211,153,0.26)" : `${founder.color}1e`}`,
                        borderRadius: 6, padding: "8px 14px",
                        cursor: "pointer", transition: "all 0.2s ease",
                    }}
                    onMouseEnter={e => {
                        if (!copied) {
                            (e.currentTarget as HTMLElement).style.color = founder.color;
                            (e.currentTarget as HTMLElement).style.background = `${founder.color}16`;
                            (e.currentTarget as HTMLElement).style.borderColor = `${founder.color}38`;
                        }
                    }}
                    onMouseLeave={e => {
                        if (!copied) {
                            (e.currentTarget as HTMLElement).style.color = `${founder.color}72`;
                            (e.currentTarget as HTMLElement).style.background = `${founder.color}09`;
                            (e.currentTarget as HTMLElement).style.borderColor = `${founder.color}1e`;
                        }
                    }}
                >
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M22 7l-10 7L2 7" />
                    </svg>
                    {copied ? "Copied!" : "Email"}
                </button>
            </div>
        </div>
    );
}

export default function AboutPage() {
    return (
        <div
            style={{
                minHeight: "100vh",
                background: "#020617",
                backgroundImage: [
                    "linear-gradient(to right, rgba(148,163,184,0.055) 1px, transparent 1px)",
                    "linear-gradient(to bottom, rgba(148,163,184,0.055) 1px, transparent 1px)",
                ].join(", "),
                backgroundSize: "40px 40px",
            }}
        >
            {/* Vignette */}
            <div style={{
                position: "fixed", inset: 0, pointerEvents: "none",
                background: "radial-gradient(ellipse 80% 80% at 50% 30%, transparent 30%, rgba(2,6,23,0.65) 100%)",
                zIndex: 0,
            }} />

            {/* Top nav */}
            <nav style={{
                position: "sticky", top: 0, zIndex: 50,
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "16px 32px",
                borderBottom: "1px solid rgba(148,163,184,0.07)",
                background: "rgba(2,6,23,0.88)",
                backdropFilter: "blur(12px)",
            }}>
                <Link
                    href="/"
                    style={{
                        display: "inline-flex", alignItems: "center", gap: 8,
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 9, letterSpacing: "0.35em", textTransform: "uppercase",
                        color: "rgba(34,211,238,0.52)", textDecoration: "none",
                        transition: "color 0.2s ease",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = "rgba(34,211,238,0.88)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(34,211,238,0.52)")}
                >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M7 5H1M4 2L1 5l3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    RootAccess.tech
                </Link>

                <p style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: 8, letterSpacing: "0.35em", textTransform: "uppercase",
                    color: "rgba(71,85,105,0.5)",
                }}>
                    About the Team
                </p>
            </nav>

            {/* Main */}
            <main style={{ position: "relative", zIndex: 1, maxWidth: 1080, margin: "0 auto", padding: "60px 24px 96px" }}>

                {/* Header — single line */}
                <div style={{ textAlign: "center", marginBottom: 64 }}>
                    <p style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 9, letterSpacing: "0.5em", textTransform: "uppercase",
                        color: "rgba(34,211,238,0.40)", marginBottom: 18,
                    }}>
                        rootaccess.tech
                    </p>
                    <h1 style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "clamp(2.8rem, 5.5vw, 4.2rem)",
                        fontWeight: 700, letterSpacing: "-0.03em",
                        color: "rgba(248,250,252,0.95)",
                        lineHeight: 1.1, marginBottom: 20,
                        whiteSpace: "nowrap",
                    }}>
                        The story behind RootAccess.tech
                    </h1>
                    <p style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: 15.5, lineHeight: 1.75,
                        color: "rgba(100,116,139,0.72)",
                        maxWidth: 560, margin: "0 auto",
                    }}>
                        We are two security engineers who have learnt together — actively pursuing cybersecurity for just over a year. Being learners ourselves, navigating the security space, we wished for a cheatsheet or a roadmap to guide us through the industry. So we decided to use our knowledge, experience, and research to build one for people just starting in cybersecurity, or those who wish to advance their skills and land the role they aim for. A community is essential, and the right guidance can go a long way.
                    </p>
                </div>

                {/* Divider */}
                <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                    <div style={{ flex: 1, height: 1, background: "rgba(34,211,238,0.08)" }} />
                    <p style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 7.5, letterSpacing: "0.45em", textTransform: "uppercase",
                        color: "rgba(34,211,238,0.28)", whiteSpace: "nowrap",
                    }}>
                        Founders
                    </p>
                    <div style={{ flex: 1, height: 1, background: "rgba(34,211,238,0.08)" }} />
                </div>

                {/* Founder cards — full width two columns */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(440px, 1fr))",
                    gap: 24,
                    marginBottom: 72,
                }}>
                    {FOUNDERS.map((founder, i) => (
                        <FounderCard key={founder.name} founder={founder} index={i} />
                    ))}
                </div>

                {/* Mission */}
                <div style={{
                    borderTop: "1px solid rgba(148,163,184,0.07)",
                    paddingTop: 56, textAlign: "center",
                }}>
                    <p style={{
                        fontFamily: "var(--font-mono, monospace)",
                        fontSize: 8, letterSpacing: "0.42em", textTransform: "uppercase",
                        color: "rgba(34,211,238,0.30)", marginBottom: 20,
                    }}>
                        What we&apos;re building
                    </p>
                    <h2 style={{
                        fontFamily: "var(--font-heading, sans-serif)",
                        fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)",
                        fontWeight: 700, letterSpacing: "-0.02em",
                        color: "rgba(248,250,252,0.88)",
                        lineHeight: 1.2, maxWidth: 600, margin: "0 auto 16px",
                    }}>
                        Roadmaps that feel like experience, not coursework.
                    </h2>
                    <p style={{
                        fontFamily: "var(--font-sans, sans-serif)",
                        fontSize: 15, lineHeight: 1.75,
                        color: "rgba(100,116,139,0.62)",
                        maxWidth: 520, margin: "0 auto 36px",
                    }}>
                        Each path is a story. You don&apos;t read about a SOC analyst — you sit inside an active incident. You don&apos;t read about pentesting — you watch a real engagement unfold. We think that&apos;s the only way any of this actually sticks.
                    </p>
                    <Link
                        href="/"
                        style={{
                            display: "inline-flex", alignItems: "center", gap: 10,
                            fontFamily: "var(--font-mono, monospace)",
                            fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase",
                            color: "rgba(34,211,238,0.68)",
                            background: "rgba(34,211,238,0.06)",
                            border: "1px solid rgba(34,211,238,0.16)",
                            borderRadius: 8, padding: "12px 22px",
                            textDecoration: "none", transition: "all 0.22s ease",
                        }}
                        onMouseEnter={e => {
                            (e.currentTarget as HTMLElement).style.color = "#22d3ee";
                            (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.10)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.28)";
                        }}
                        onMouseLeave={e => {
                            (e.currentTarget as HTMLElement).style.color = "rgba(34,211,238,0.68)";
                            (e.currentTarget as HTMLElement).style.background = "rgba(34,211,238,0.06)";
                            (e.currentTarget as HTMLElement).style.borderColor = "rgba(34,211,238,0.16)";
                        }}
                    >
                        Explore the Roadmaps
                        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                            <path d="M1 5.5h9M6 1.5l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </Link>
                </div>
            </main>

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
