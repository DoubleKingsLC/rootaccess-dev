"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

// ── Types ─────────────────────────────────────────────────────────────────────
interface ResourceItem {
  label: string;
  link: string;
  provider?: string;
}

interface Level {
  num: string;
  label: string;
  subtitle: string;
  color: string;
  glow: string;
  border: string;
  quote: string;
  time: string;
  salary: string;
  tools: string[];
  skills: string[];
  certs: ResourceItem[];
  labs: ResourceItem[];
}

interface ActionItem {
  label: string;
  link?: string;
}

interface Action {
  icon: string;
  title: string;
  color: string;
  border: string;
  glow: string;
  items: Array<ActionItem | string>;
}

// ── Provider Favicons ─────────────────────────────────────────────────────────

const PROVIDER_DOMAINS: Record<string, string> = {
    tryhackme: "tryhackme.com",
    hackthebox: "hackthebox.com",
    htb: "hackthebox.com",
    google: "google.com",
    tcm: "tcm-sec.com",
    offsec: "offsec.com",
    blueteam: "securityblue.team",
    cyberdefenders: "cyberdefenders.org",
    elearnsecurity: "elearnsecurity.com",
    giac: "giac.org",
    isc2: "isc2.org",
    comptia: "comptia.org",
    youtube: "youtube.com",
    sans: "sans.org",
    crest: "crest-approved.org",
    pentesteracademy: "pentesteracademy.com",
    coursera: "coursera.org",
    isaca: "isaca.org",
};

function ProviderFavicon({ provider, size = 18 }: { provider: string | null; size?: number }) {
    const domain = provider ? PROVIDER_DOMAINS[provider] : null;
    if (!domain) return null;
    return (
        <img
            src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`}
            alt={provider ?? ""}
            width={size}
            height={size}
            className="rounded-sm flex-shrink-0"
            style={{ objectFit: "contain" }}
        />
    );
}

// ── Career level data ─────────────────────────────────────────────────────────
const LEVELS: Level[] = [
  {
    num: "00",
    label: "Entry Point",
    subtitle: "No Experience Required",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.2)",
    border: "rgba(148,163,184,0.25)",
    quote:
      "You don't need a degree. You need curiosity and the discipline to build it. Everyone starts here.",
    time: "0–6 months",
    salary: "£25K–£35K",
    tools: ["VirtualBox", "Linux", "Terminal / PowerShell", "Python"],
    skills: [
      "Networking — TCP/IP, DNS, DHCP, subnetting",
      "OS fundamentals — Windows & Linux",
      "Security concepts — CIA triad, common threats",
      "Scripting basics — Python or Bash",
    ],
    certs: [
      { label: "Google Cybersecurity Certificate", link: "https://www.coursera.org/professional-certificates/google-cybersecurity", provider: "google" },
      { label: "TCM · Practical Security Fundamentals", link: "https://academy.tcm-sec.com/p/practical-security-fundamentals", provider: "tcm" },
      { label: "THM · Security+ Pre-Security (SEC1)", link: "https://tryhackme.com/certification/pre-security", provider: "tryhackme" },
    ],
    labs: [
      { label: "TryHackMe · Pre-Security learning path", link: "https://tryhackme.com/path/outline/presecurity", provider: "tryhackme" },
      { label: "Learn Virtual Machines RIGHT NOW!! (Kali, Ubuntu, Windows)", link: "https://youtu.be/wX75Z-4MEoM", provider: "youtube" },
      { label: "40 Windows Commands you NEED to know", link: "https://youtu.be/Jfvg3CS1X3A", provider: "youtube" },
    ],
  },
  {
    num: "01",
    label: "L1 Triage Analyst",
    subtitle: "First Line of Detection",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.2)",
    border: "rgba(34,211,238,0.25)",
    quote:
      "07:45. You open the SIEM dashboard. 4,200 alerts overnight. Your job is to find the three that matter.",
    time: "6–18 months",
    salary: "£30K–£45K",
    tools: ["Splunk / ELK / Wazuh", "Wireshark / tcpdump", "VirusTotal", "grep / awk"],
    skills: [
      "SIEM log analysis and search query writing",
      "Alert triage, classification, and prioritisation",
      "IOC lookup and contextual enrichment",
      "Incident ticketing and escalation procedures",
    ],
    certs: [
      { label: "Practical SOC Analyst (PSAA)", link: "https://certifications.tcm-sec.com/psaa/", provider: "tcm" },
      { label: "BTL1 — Blue Team Level 1", link: "https://www.securityblue.team/certifications/blue-team-level-1", provider: "blueteam" },
      { label: "CompTIA Security+", link: "https://www.comptia.org/en/certifications/security/", provider: "comptia" },
    ],
    labs: [
      { label: "Cyberdefenders CyberRange - Network Forensics, Threat Hunting", link: "https://cyberdefenders.org/blue-team-labs/", provider: "cyberdefenders" },
      { label: "HTB Sherlocks - SOC", link: "https://app.hackthebox.com/sherlocks", provider: "htb" },
      { label: "Wazuh - you need this FREE CyberSecurity tool", link: "https://youtu.be/3CaG2GI1kn0", provider: "youtube" },
      { label: "Splunk - Getting started guide", link: "https://youtu.be/-SXddlIZkUs", provider: "youtube" },
    ],
  },
  {
    num: "02",
    label: "L2 Advanced Analyst",
    subtitle: "Pattern Recognition & Correlation",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.2)",
    border: "rgba(139,92,246,0.25)",
    quote:
      "Three events. Each harmless alone. But you see them together — and you see the attacker's hand.",
    time: "2–4 years",
    salary: "£45K–£65K",
    tools: ["CyberChef", "Velociraptor", "MISP", "TheHive", "MITRE ATT&CK"],
    skills: [
      "Threat correlation and attack pattern mapping",
      "Malware triage — static and dynamic analysis",
      "MITRE ATT&CK framework and TTP identification",
      "SOAR automation and playbook development",
    ],
    certs: [
      { label: "CCDL2 — Threat Hunting & DFIR Certification", link: "https://cyberdefenders.org/certifications/certified-cyberdefender-level2/", provider: "cyberdefenders" },
      { label: "HTB CDSA — Certified Defensive Security Analyst", link: "https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst", provider: "htb" },
    ],
    labs: [
      { label: "Cyberdefenders CyberRange - Detection Engineering, Threat Hunting", link: "https://cyberdefenders.org/blue-team-labs/", provider: "cyberdefenders" },
      { label: "HTB Sherlocks - SOC/DFIR", link: "https://app.hackthebox.com/sherlocks", provider: "htb" },
      { label: "Detection Engineering with Wazuh (John Hammond)", link: "https://youtu.be/nSOqU1iX5oQ", provider: "youtube" },
    ],
  },
  {
    num: "03",
    label: "L3 Forensic Analyst",
    subtitle: "Deep Forensics & Incident Lead",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
    border: "rgba(245,158,11,0.25)",
    quote:
      "You pull the disk. You find the malware. You trace it to its first byte. This is where the story ends.",
    time: "4–7 years",
    salary: "£65K–£90K",
    tools: ["Volatility", "KAPE", "EZTools", "x64dbg", "FTK Imager"],
    skills: [
      "Disk and memory forensics — full acquisition",
      "Malware reverse engineering and binary analysis",
      "C2 infrastructure profiling and attribution",
      "APT tracking and threat intelligence production",
    ],
    certs: [
      { label: "BTL2 — Blue Team Level 2", link: "https://www.securityblue.team/certifications/blue-team-level-2", provider: "blueteam" },
      { label: "GCFA — GIAC Certified Forensic Analyst", link: "https://www.giac.org/certifications/certified-forensic-analyst-gcfa/", provider: "giac" },
      { label: "OSCP+", link: "https://www.offsec.com/courses/pen-200/", provider: "offsec" },
    ],
    labs: [
      { label: "Cyberdefenders CyberRange - Endpoint Forensics, Threat Hunting", link: "https://cyberdefenders.org/blue-team-labs/", provider: "cyberdefenders" },
      { label: "HTB Sherlocks - SOC/DFIR", link: "https://app.hackthebox.com/sherlocks", provider: "htb" },
      { label: "Antisyphon - SOC Core Skills", link: "https://www.antisyphontraining.com/product/soc-core-skills-with-john-strand/", provider: "antisyphon" },
    ],
  },
  {
    num: "04",
    label: "SOC Lead",
    subtitle: "Operations Command",
    color: "#34d399",
    glow: "rgba(52,211,153,0.2)",
    border: "rgba(52,211,153,0.25)",
    quote:
      "The team responds as fast as the system you built for them. Your job: make the next incident take 10 minutes, not 15.",
    time: "7+ years",
    salary: "£90K–£130K+",
    tools: ["Palo Alto XSOAR", "PowerBI", "ServiceNow SecOps", "Confluence / Jira"],
    skills: [
      "SOC architecture design and tool strategy",
      "MTTD / MTTR KPI definition and reporting",
      "Analyst mentoring and career development",
      "Executive stakeholder communication",
    ],
    certs: [
      { label: "CISSP — Certified Information Systems Security Professional", link: "https://www.isc2.org/certifications/cissp", provider: "isc2" },
      { label: "CSOM — Certified SOC Manager", link: "https://www.securityblue.team/certifications/certified-security-operations-manager", provider: "blueteam" },
      { label: "CISM — Certified Information Security Manager", link: "https://www.isaca.org/credentialing/cism", provider: "isaca" },
    ],
    labs: [
      { label: "Antisyphon - SOC Core Skills", link: "https://www.antisyphontraining.com/product/soc-core-skills-with-john-strand/", provider: "antisyphon" },
      { label: "MITRE ATT&CK for SOC Managers", link: "https://attack.mitre.org/resources/training/cti/", provider: "mitre" },
      { label: "NIST CSWP 29 (SOC Model)", link: "https://csrc.nist.gov/pubs/cswp/29/final", provider: "nist" },
    ],
  },
] as const;

// ── Next action cards ─────────────────────────────────────────────────────────
const ACTIONS: Action[] = [
  {
    icon: "🧪",
    title: "Start in a Lab Today",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.25)",
    glow: "rgba(34,211,238,0.08)",
    items: [
      { label: "TryHackMe SOC Level 1 path", link: "https://tryhackme.com/path/outline/soclevel1" },
      { label: "LetsDefend.io - SOC environment", link: "https://letsdefend.io/" },
      { label: "CyberDefenders - blue team labs", link: "https://cyberdefenders.org/blue-team-labs/" },
      { label: "HTB Sherlocks - SOC/DFIR", link: "https://app.hackthebox.com/sherlocks" },
      { label: "BTLO - Blue Team Labs Online", link: "https://blueteamlabs.online/" },
    ],
  },
  {
    icon: "📁",
    title: "Build a Portfolio",
    color: "#8b5cf6",
    border: "rgba(139,92,246,0.25)",
    glow: "rgba(139,92,246,0.08)",
    items: [
      "Write lab walkthrough reports in PDF format",
      "Document your homelab with screenshots",
      "GitHub: scripts, tools, and detection rules",
    ],
  },
] as const;

// ── Components ────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col gap-1 w-[240px] xl:w-[260px] flex-shrink-0 sticky self-start overflow-y-auto px-5 py-8"
      style={{ top: "64px", maxHeight: "calc(100vh - 64px)", borderRight: "1px solid rgba(255,255,255,0.04)" }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] mb-5" style={{ color: "rgba(148,163,184,0.55)" }}>
        Levels
      </p>
      {LEVELS.map((level) => (
        <a
          key={level.num}
          href={`#level-${level.num}`}
          className="group flex items-start gap-3 rounded-lg px-3 py-3 transition-all duration-150"
          style={{ textDecoration: "none" }}
        >
          <span
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-mono text-[11px] font-bold border mt-0.5 transition-all duration-200 group-hover:scale-110"
            style={{ borderColor: `${level.color}55`, color: level.color, background: `${level.color}12` }}
          >
            {level.num}
          </span>
          <div>
            <p
              className="font-mono text-[12px] font-semibold uppercase tracking-wider leading-tight transition-colors duration-150 group-hover:text-white"
              style={{ color: "rgba(226,232,240,0.75)" }}
            >
              {level.label}
            </p>
          </div>
        </a>
      ))}
    </aside>
  );
}

function SectionHeader({
  num, label, color, subtitle,
}: {
  num: string; label: string; color: string; subtitle: string;
}) {
  return (
    <div className="mb-10 flex flex-col md:flex-row md:items-start justify-between gap-8 group/header transition-all duration-300">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-baseline gap-4 mb-4">
          <span
            className="font-mono text-[10px] uppercase tracking-[0.35em] px-2.5 py-1.5 rounded"
            style={{ color, background: `${color}12`, border: `1px solid ${color}28` }}
          >
            Level {num}
          </span>
        </div>
        <h2
          className="text-4xl xl:text-5xl font-bold text-white mb-3 leading-tight"
          style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}
        >
          {label}
        </h2>
        <p className="font-mono text-sm" style={{ color: `${color}aa` }}>{subtitle}</p>
        <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${color}28, transparent)` }} />
      </div>

      <Link
        href={`/roadmaps/soc/career-path/detailed#level-${num}`}
        className="group/deep hidden xl:flex flex-col gap-2.5 p-5 rounded-2xl border transition-all duration-300 w-[320px] flex-shrink-0 hover:-translate-y-1 hover:shadow-2xl"
        style={{
          textDecoration: "none",
          borderColor: `${color}35`,
          background: `linear-gradient(135deg, ${color}15, ${color}05)`,
          boxShadow: `0 4px 20px ${color}0a`,
        }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color }}>Deep Dive</span>
            <span className="flex h-1.5 w-1.5 rounded-full animate-pulse" style={{ background: color, boxShadow: `0 0 8px ${color}aa` }} />
          </div>
          <svg className="w-4 h-4 transform group-hover/deep:translate-x-1.5 transition-transform" style={{ color }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
        <p className="text-[13px] leading-relaxed transition-colors group-hover/deep:text-white" style={{ color: "rgba(203,213,225,0.8)" }}>
          Full breakdown of every certification, tool, and the "why" behind them.
        </p>
      </Link>
    </div>
  );
}

function ContentCard({
  title, icon, color, border, glow, items, isCerts, levelNum,
}: {
  title: string;
  icon: string;
  color: string;
  border: string;
  glow: string;
  items: Array<string | ResourceItem>;
  isCerts?: boolean;
  levelNum?: string;
}) {
  const renderItem = (item: string | ResourceItem, idx: number) => {
    const isObj = typeof item === "object";
    const label = isObj ? item.label : item;
    const link = isObj ? item.link : null;
    const provider = isObj ? item.provider : null;

    return (
      <li key={idx} className="flex items-start gap-3 group/li">
        {provider && PROVIDER_DOMAINS[provider] ? (
          <div className="mt-0.5 flex-shrink-0">
            <ProviderFavicon provider={provider} size={16} />
          </div>
        ) : (
          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-sm flex-shrink-0" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
        )}
        <div className="flex-1 min-w-0">
          {link ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-[14px] leading-relaxed text-slate-300 hover:text-white transition-all flex items-center justify-between gap-2 group/link"
            >
              <span className="relative">
                {label}
                <span className="absolute left-0 -bottom-0.5 w-0 h-px bg-current transition-all duration-300 group-hover/link:w-full opacity-25" />
              </span>
              <svg className="w-3 h-3 opacity-0 group-hover/link:opacity-50 flex-shrink-0 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </a>
          ) : (
            <span className="font-sans text-[14px] leading-relaxed text-slate-300">{label}</span>
          )}
        </div>
      </li>
    );
  };

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,20,30,0.7)",
        border: `1px solid ${color}20`,
        boxShadow: `0 0 24px ${glow}`,
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}
      >
        <span className="text-lg" style={{ textShadow: `0 0 10px ${color}` }}>{icon}</span>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>{title}</p>
      </div>

      <div className="px-5 py-5">
        {isCerts && items.length > 1 ? (
          <div className="flex flex-col gap-5">
            <div>
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em]" style={{ color, opacity: 0.65 }}>
                Recommended
              </p>
              <ul className="space-y-3">
                {[items[0]].map((item, idx) => renderItem(item, idx))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">
                {levelNum === "03" ? "Additional" : "Alternatives"}
              </p>
              <ul className="space-y-3">
                {items.slice(1).map((item, idx) => renderItem(item, idx))}
              </ul>
            </div>
          </div>
        ) : (
          <ul className="space-y-3">
            {items.map((item, idx) => renderItem(item, idx))}
          </ul>
        )}
      </div>
    </div>
  );
}

function ToolsCard({ tools, color, border, glow }: { tools: string[]; color: string; border: string; glow: string }) {
  return (
    <div
      className="inline-flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "rgba(15,20,30,0.7)",
        border: `1px solid ${color}20`,
        boxShadow: `0 0 24px ${glow}`,
      }}
    >
      <div
        className="flex items-center gap-3 px-5 py-4"
        style={{ background: `${color}08`, borderBottom: `1px solid ${color}15` }}
      >
        <span className="text-lg" style={{ textShadow: `0 0 10px ${color}` }}>🔧</span>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color }}>Tools &amp; Stack</p>
      </div>
      <div className="px-5 py-5">
        <div className="flex flex-wrap gap-2">
          {tools.map((tool) => (
            <span
              key={tool}
              className="font-mono text-[11px] px-3 py-1.5 rounded-full"
              style={{
                background: `${color}10`,
                border: `1px solid ${color}28`,
                color: `${color}cc`,
              }}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function SocCareerPathPage() {
  const router = useRouter();
  const isMobile = useIsMobile(768);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
    }
  }, []);

  useEffect(() => {
    const toggleVisibility = () => {
      setShowScrollTop(window.pageYOffset > 400);
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (isMobile) {
    return (
      <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans pb-20 pt-14">
        <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-slate-950/90 px-4 py-3 backdrop-blur-md">
          <button onClick={() => router.push("/")} className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">Home</button>
          <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-cyan-400">SOC Career Path</p>
          <button onClick={() => router.push("/roadmaps/soc")} className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">Back</button>
        </header>
        <div className="relative">
          {LEVELS.map((level) => (
            <section key={level.num} className="relative pt-16 pb-20 px-6 border-b border-white/5 last:border-0 overflow-hidden">
              <div
                className="mb-8 flex items-center justify-center rounded-full border-2 bg-slate-950 shadow-2xl"
                style={{ width: 48, height: 48, borderColor: level.color, boxShadow: `0 0 20px ${level.glow}` }}
              >
                <span className="font-mono text-base font-black" style={{ color: level.color }}>{level.num}</span>
              </div>
              <div className="mb-10 space-y-2">
                <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyan-400/60">{level.subtitle}</span>
                <h2 className="text-3xl font-bold tracking-tight leading-tight">{level.label}</h2>
                <div className="relative pl-5 py-1 mt-4">
                  <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />
                  <p className="text-slate-400 italic text-sm leading-relaxed max-w-md">&ldquo;{level.quote}&rdquo;</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6">
                {[
                  { title: "SKILLS", items: level.skills, icon: "⚡" },
                  { title: "CERTS", items: level.certs, icon: "🎯" },
                  { title: "RESOURCES", items: level.labs, icon: "🧪" },
                  { title: "TOOLS", items: level.tools, icon: "🔧" },
                ].map((cat) => (
                  <div key={cat.title} className="rounded-2xl border border-white/5 bg-slate-900/30 p-5 backdrop-blur-sm relative overflow-hidden group shadow-lg">
                    <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-2xl">{cat.icon}</div>
                    <h3 className="font-mono text-[10px] font-bold tracking-[0.3em] text-slate-500 mb-4 border-b border-white/5 pb-2">{cat.title}</h3>
                    {cat.title === "CERTS" && cat.items.length > 1 ? (
                      <div className="flex flex-col gap-5 pt-1">
                        <div>
                          <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-500/60">Recommended</p>
                          <ul>
                            {[cat.items[0]].map((item: any, idx) => (
                              <li key={idx} className="flex items-start gap-4 mb-2">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-500/40" />
                                <div className="flex flex-col gap-1 w-full">
                                  {item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link">
                                      <span>{item.label}</span>
                                      <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                                    </a>
                                  ) : <span className="text-xs font-medium text-slate-300 leading-normal">{item.label}</span>}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">{level.num === "03" ? "Additional" : "Alternatives"}</p>
                          <ul className="space-y-4">
                            {cat.items.slice(1).map((item: any, idx) => (
                              <li key={idx} className="flex items-start gap-4 mb-2 last:mb-0">
                                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-500/40" />
                                <div className="flex flex-col gap-1 w-full">
                                  {item.link ? (
                                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link">
                                      <span>{item.label}</span>
                                      <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                                    </a>
                                  ) : <span className="text-xs font-medium text-slate-300 leading-normal">{item.label}</span>}
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ) : (
                      <ul className="space-y-4 pt-1">
                        {cat.items.map((item: any, idx) => (
                          <li key={idx} className="flex items-start gap-4 mb-2 last:mb-0">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-500/40" />
                            <div className="flex flex-col gap-1 w-full">
                              {item.link ? (
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link">
                                  <span>{item.label}</span>
                                  <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                                </a>
                              ) : <span className="text-xs font-medium text-slate-300">{typeof item === "object" ? item.label : item}</span>}
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="mt-12 mb-20 flex flex-col items-center gap-4 px-6">
          <button onClick={() => router.push("/roadmaps/soc")} className="w-full max-w-xs py-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back to SOC Roadmap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#09121d", color: "rgba(226,232,240,0.9)" }}>
      {/* ── Top nav ── */}
      <div
        className="sticky top-0 z-30 flex items-center gap-3 px-6 py-0"
        style={{
          background: "rgba(9,18,29,0.96)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
          height: "64px",
        }}
      >
        <button
          onClick={() => router.push("/")}
          className="font-mono text-[12px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(226,232,240,0.85)", background: "none", border: "none", cursor: "pointer" }}
        >
          Home
        </button>
        <span style={{ color: "rgba(148,163,184,0.9)", fontSize: "12px" }}>/</span>
        <button
          onClick={() => router.push("/roadmaps/soc")}
          className="font-mono text-[12px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(226,232,240,0.75)", background: "none", border: "none", cursor: "pointer" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          SOC
        </button>
        <span style={{ color: "rgba(148,163,184,0.9)", fontSize: "12px" }}>/</span>
        <span className="font-mono text-[12px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.6)" }}>
          Career Path
        </span>

        <div className="flex-1" />

        <div className="flex lg:hidden items-center gap-2">
          {LEVELS.map((l) => (
            <a key={l.num} href={`#level-${l.num}`} className="font-mono text-[9px] font-bold w-6 h-6 rounded-full flex items-center justify-center border transition-all duration-150" style={{ borderColor: `${l.color}44`, color: l.color, background: `${l.color}10`, textDecoration: "none" }}>{l.num}</a>
          ))}
        </div>

        <p className="hidden lg:block font-mono text-sm font-black uppercase tracking-[0.4em] text-cyan-400">
          SOC Career Path
        </p>
      </div>

      {/* ── Hero ── */}
      <div className="px-8 lg:px-16 xl:px-20 pt-16 pb-14 flex items-center gap-12 xl:gap-20">
        {/* Left: text */}
        <div className="flex-1 min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-5" style={{ color: "rgba(34,211,238,0.55)" }}>
            The Front Line of Defense
          </p>
          <h1
            className="font-mono font-black text-cyan-400 mb-7 leading-[1.05] tracking-tight"
            style={{
              fontSize: "clamp(42px, 5.5vw, 72px)",
              textShadow: "0 0 80px rgba(34,211,238,0.5), 0 0 160px rgba(34,211,238,0.2)",
            }}
          >
            Protect.<br />Detect.<br />Respond.
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mb-3" style={{ color: "rgba(203,213,225,0.85)" }}>
            The blueprint to building a elite career in security operations and incident response.
          </p>
          <p className="text-base leading-relaxed max-w-xl" style={{ color: "rgba(148,163,184,0.65)" }}>
            From triage analyst to SOC command. We&apos;ve mapped the precise tools, certifications, and high-impact skills consumed by the world&apos;s leading defensive security teams.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {LEVELS.map((l) => (
              <a
                key={l.num}
                href={`#level-${l.num}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-200 hover:scale-105"
                style={{ background: `${l.color}0f`, border: `1px solid ${l.color}25`, color: `${l.color}cc`, textDecoration: "none" }}
              >
                <span style={{ opacity: 0.6 }}>{l.num}</span>
                <span>{l.label}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right: SIEM Alert Feed */}
        <div className="hidden xl:flex flex-col w-[380px] flex-shrink-0" style={{ gap: "0" }}>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(6,14,22,0.85)",
              border: "1px solid rgba(34,211,238,0.18)",
              boxShadow: "0 0 60px rgba(34,211,238,0.08), 0 24px 80px rgba(0,0,0,0.6)",
            }}
          >
            {/* Terminal title bar */}
            <div className="flex items-center gap-2 px-4 py-3" style={{ background: "rgba(34,211,238,0.06)", borderBottom: "1px solid rgba(34,211,238,0.1)" }}>
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#ff5f57" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#febc2e" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "#28c840" }} />
              </div>
              <span className="font-mono text-[10px] ml-2" style={{ color: "rgba(34,211,238,0.5)" }}>SIEM · Live Alerts</span>
              <div className="flex-1" />
              <div className="flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "#22d3ee", boxShadow: "0 0 6px #22d3ee", animation: "soc-pulse 1.2s infinite" }} />
                <span className="font-mono text-[9px]" style={{ color: "rgba(34,211,238,0.55)" }}>LIVE</span>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-px" style={{ background: "rgba(34,211,238,0.06)", borderBottom: "1px solid rgba(34,211,238,0.08)" }}>
              {[
                { label: "Alerts", val: "4,218", color: "#22d3ee" },
                { label: "Critical", val: "3", color: "#f87171" },
                { label: "Resolved", val: "4,215", color: "#4ade80" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col items-center py-3" style={{ background: "rgba(6,14,22,0.6)" }}>
                  <span className="font-mono text-base font-black" style={{ color: s.color }}>{s.val}</span>
                  <span className="font-mono text-[9px] mt-0.5" style={{ color: "rgba(148,163,184,0.5)" }}>{s.label}</span>
                </div>
              ))}
            </div>

            {/* Alert rows */}
            <div className="flex flex-col" style={{ maxHeight: "270px", overflow: "hidden", position: "relative" }}>
              <style>{`
                @keyframes soc-scroll { 0% { transform: translateY(0); } 100% { transform: translateY(-50%); } }
                @keyframes soc-pulse { 0%,100% { opacity:1; } 50% { opacity:0.3; } }
              `}</style>
              <div style={{ animation: "soc-scroll 18s linear infinite" }}>
                {[
                  { sev: "CRIT", color: "#f87171", src: "192.168.1.44", msg: "Lateral movement — SMB sweep detected" },
                  { sev: "WARN", color: "#fbbf24", src: "10.0.0.12", msg: "Anomalous outbound DNS (fast-flux)" },
                  { sev: "INFO", color: "#22d3ee", src: "172.16.0.3", msg: "New service account created" },
                  { sev: "CRIT", color: "#f87171", src: "10.10.2.88", msg: "Mimikatz signature on endpoint" },
                  { sev: "WARN", color: "#fbbf24", src: "192.168.0.200", msg: "RDP brute-force threshold exceeded" },
                  { sev: "INFO", color: "#22d3ee", src: "10.0.0.55", msg: "Scheduled task modified" },
                  { sev: "CRIT", color: "#f87171", src: "172.16.8.2", msg: "C2 beacon — heartbeat every 60s" },
                  { sev: "WARN", color: "#fbbf24", src: "10.0.1.9", msg: "Failed auth x47 — admin account" },
                  { sev: "INFO", color: "#22d3ee", src: "192.168.1.15", msg: "Registry Run key added" },
                  { sev: "CRIT", color: "#f87171", src: "10.0.0.44", msg: "Data exfil detected — HTTPS 240MB" },
                  { sev: "WARN", color: "#fbbf24", src: "172.16.0.18", msg: "PowerShell encoded command block" },
                  { sev: "INFO", color: "#22d3ee", src: "10.0.2.67", msg: "Group Policy Object modified" },
                  // duplicate for seamless loop
                  { sev: "CRIT", color: "#f87171", src: "192.168.1.44", msg: "Lateral movement — SMB sweep detected" },
                  { sev: "WARN", color: "#fbbf24", src: "10.0.0.12", msg: "Anomalous outbound DNS (fast-flux)" },
                  { sev: "INFO", color: "#22d3ee", src: "172.16.0.3", msg: "New service account created" },
                  { sev: "CRIT", color: "#f87171", src: "10.10.2.88", msg: "Mimikatz signature on endpoint" },
                  { sev: "WARN", color: "#fbbf24", src: "192.168.0.200", msg: "RDP brute-force threshold exceeded" },
                  { sev: "INFO", color: "#22d3ee", src: "10.0.0.55", msg: "Scheduled task modified" },
                  { sev: "CRIT", color: "#f87171", src: "172.16.8.2", msg: "C2 beacon — heartbeat every 60s" },
                  { sev: "WARN", color: "#fbbf24", src: "10.0.1.9", msg: "Failed auth x47 — admin account" },
                  { sev: "INFO", color: "#22d3ee", src: "192.168.1.15", msg: "Registry Run key added" },
                  { sev: "CRIT", color: "#f87171", src: "10.0.0.44", msg: "Data exfil detected — HTTPS 240MB" },
                  { sev: "WARN", color: "#fbbf24", src: "172.16.0.18", msg: "PowerShell encoded command block" },
                  { sev: "INFO", color: "#22d3ee", src: "10.0.2.67", msg: "Group Policy Object modified" },
                ].map((alert, idx) => (
                  <div key={idx} className="flex items-start gap-3 px-4 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="font-mono text-[9px] font-black mt-0.5 px-1.5 py-0.5 rounded flex-shrink-0" style={{ color: alert.color, background: `${alert.color}18`, border: `1px solid ${alert.color}30` }}>{alert.sev}</span>
                    <div className="flex flex-col min-w-0 gap-0.5">
                      <span className="font-mono text-[10px]" style={{ color: "rgba(148,163,184,0.5)" }}>{alert.src}</span>
                      <span className="font-sans text-[11px] leading-snug" style={{ color: "rgba(203,213,225,0.75)" }}>{alert.msg}</span>
                    </div>
                  </div>
                ))}
              </div>
              {/* Fade mask bottom */}
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "60px", background: "linear-gradient(to top, rgba(6,14,22,0.95), transparent)", pointerEvents: "none" }} />
            </div>
          </div>
        </div>
      </div>

      <div className="h-px mx-8 lg:mx-16 xl:mx-20" style={{ background: "rgba(255,255,255,0.05)" }} />

      {/* ── Body ── */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 px-6 lg:px-12 xl:px-16">
          {LEVELS.map((level, i) => (
            <React.Fragment key={level.num}>
              <section id={`level-${level.num}`} className="py-16 xl:py-20">
                <SectionHeader num={level.num} label={level.label} color={level.color} subtitle={level.subtitle} />
                <p className="font-sans text-lg italic leading-relaxed mb-10 pl-4" style={{ color: "rgba(203,213,225,0.6)", borderLeft: `2px solid ${level.color}40` }}>
                  &ldquo;{level.quote}&rdquo;
                </p>
                <div className="mb-6">
                  <ToolsCard tools={level.tools} color={level.color} border={level.border} glow={level.glow} />
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                  <ContentCard title="Core Skills" icon="⚡" color={level.color} border={level.border} glow={level.glow} items={level.skills} />
                  <ContentCard title="Certifications" icon="🎯" color={level.color} border={level.border} glow={level.glow} items={level.certs} isCerts levelNum={level.num} />
                  <ContentCard title="Resources" icon="🧪" color={level.color} border={level.border} glow={level.glow} items={level.labs} />
                </div>
              </section>
              {i < LEVELS.length - 1 && <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />}
            </React.Fragment>
          ))}

          {/* ── Next Actions ── */}
          <section className="py-16 xl:py-20" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            <div className="mb-10">
              <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: "rgba(34,211,238,0.55)" }}>Mission</p>
              <h2 className="text-4xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}>Next Actions</h2>
              <p className="font-sans text-base text-slate-500">The adversary doesn&apos;t wait. Neither should you.</p>
              <div className="mt-6 h-px" style={{ background: "linear-gradient(to right, rgba(34,211,238,0.2), transparent)" }} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl">
              {ACTIONS.map((action) => (
                <div key={action.title} className="rounded-2xl overflow-hidden" style={{ background: "rgba(15,20,30,0.7)", border: `1px solid ${action.border}`, boxShadow: `0 0 24px ${action.glow}` }}>
                  <div className="flex items-center gap-3 px-5 py-4" style={{ background: `${action.color}08`, borderBottom: `1px solid ${action.color}15` }}>
                    <span className="text-lg">{action.icon}</span>
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.3em]" style={{ color: action.color }}>{action.title}</p>
                  </div>
                  <div className="px-5 py-5">
                    <ul className="space-y-3">
                      {action.items.map((item: any, idx) => {
                        const isObj = typeof item === "object";
                        const label = isObj ? item.label : item;
                        const link = isObj ? item.link : null;
                        return (
                          <li key={idx} className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: action.color }} />
                            {link ? (
                              <a href={link} target="_blank" rel="noopener noreferrer" className="font-sans text-[13px] text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group/link">
                                <span>{label}</span>
                                <svg className="w-3 h-3 opacity-0 group-hover/link:opacity-50 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" /></svg>
                              </a>
                            ) : <span className="font-sans text-[13px] text-slate-300">{label}</span>}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-16 flex flex-col items-start gap-4">
              <button onClick={() => router.push("/roadmaps/soc")} className="inline-flex items-center gap-2 rounded-xl font-mono text-[11px] uppercase tracking-widest transition-all duration-200" style={{ border: "1px solid rgba(34,211,238,0.3)", background: "rgba(34,211,238,0.08)", color: "rgba(34,211,238,0.75)", padding: "10px 20px", cursor: "pointer" }}>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Back to SOC Roadmap
              </button>
            </div>
          </section>
        </main>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed", bottom: "40px", right: "40px", zIndex: 100, width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "14px", background: "rgba(9,18,29,0.9)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)", color: "#f8fafc", cursor: "pointer", opacity: showScrollTop ? 1 : 0, visibility: showScrollTop ? "visible" : "hidden", transform: showScrollTop ? "translateY(0)" : "translateY(20px)", transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1)", boxShadow: "0 12px 32px rgba(0,0,0,0.5)"
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6" /></svg>
      </button>
    </div>
  );
}
