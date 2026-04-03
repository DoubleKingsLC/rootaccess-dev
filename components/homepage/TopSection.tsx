"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { isDomainLocked, useDomainLive } from "@/hooks/useDomainLive";
import { DomainDeepDiveVisual } from "@/components/homepage/DomainDeepDiveVisual";

const ROADMAPS_DATA = [
  { id: "soc", label: "SOC Career Path", href: "/roadmaps/soc/career-path", color: "#22d3ee" },
  { id: "web", label: "Web Hacking Path", href: "/roadmaps/web-hacking/career-path", color: "#f43f5e" },
  { id: "ai", label: "AI Hacking Path", href: "/roadmaps/ai-hacking/career-path", color: "#ef4444" },
  { id: "network", label: "Network Pentesting", href: "/roadmaps/network-pentesting/career-path", color: "#dc2626" },
];

const EXPERIENCES_DATA = [
  { id: "soc", label: "SOC Scrollytelling", href: "/roadmaps/soc", color: "#22d3ee" },
  { id: "web", label: "Web Hacking", href: "/roadmaps/web-hacking", color: "#f43f5e" },
  { id: "ai", label: "AI Hacking", href: "/roadmaps/ai-hacking", color: "#ef4444" },
  { id: "network", label: "Network Pentesting", href: "/roadmaps/network-pentesting", color: "#dc2626" },
];

/** Favicon hostnames for Curated Resources pills (DuckDuckGo icon proxy); null = no favicon. */
const CURATED_RESOURCE_PLATFORMS: { label: string; faviconHost: string | null }[] = [
  { label: "YouTube", faviconHost: "youtube.com" },
  { label: "TCM Security", faviconHost: "tcm-sec.com" },
  { label: "PortSwigger", faviconHost: "portswigger.net" },
  { label: "HackTheBox", faviconHost: "hackthebox.com" },
  { label: "CyberDefenders", faviconHost: "cyberdefenders.org" },
  { label: "Many more", faviconHost: null },
];

const DOMAIN_DATA = [
  {
    id: "soc",
    nodeCode: "NODE_001",
    title: "SOC",
    subtitle: "Security monitoring simulation.",
    analystRole: "SOC Analyst",
    isLive: true,
    status: "ACTIVE",
    threat: "CRITICAL // 0.94",
    sync: "8x44_SENTINEL",
  },
  {
    id: "web",
    nodeCode: "NODE_002",
    title: "WEB_HACKING",
    subtitle: "Vulnerability exploitation research.",
    analystRole: "WebApp Pentester",
    isLive: true,
    status: "ACTIVE",
    threat: "ELEVATED // 0.62",
    sync: "3x91_PROXY",
  },
  {
    id: "ai",
    nodeCode: "NODE_003",
    title: "AI_HACKING",
    subtitle: "LLM security audits.",
    analystRole: "AI Security Analyst",
    isLive: true,
    status: "ACTIVE",
    threat: "ELEVATED // 0.58",
    sync: "NEURAL_LINK_OK",
  },
  {
    id: "network",
    nodeCode: "NODE_004",
    title: "NETWORK_PENTESTING",
    subtitle: "Enterprise intrusion testing.",
    analystRole: "Network Pentester",
    isLive: true,
    status: "ACTIVE",
    threat: "MODERATE // 0.45",
    sync: "1x11_LAN",
  },
  {
    id: "cloud",
    nodeCode: "NODE_005",
    title: "CLOUD_SEC",
    subtitle: "Cloud hardening & IAM.",
    analystRole: "Cloud Security Engineer",
    isLive: false,
    status: "ACTIVE",
    threat: "LOW // 0.12",
    sync: "AWS_SYNC_OK",
  },
  {
    id: "grc",
    nodeCode: "NODE_006",
    title: "GRC",
    subtitle: "Governance & Risk frameworks.",
    analystRole: "GRC Analyst",
    isLive: false,
    status: "ACTIVE",
    threat: "NOMINAL",
    sync: "COMPLIANT",
  },
  {
    id: "devsecops",
    nodeCode: "NODE_007",
    title: "DEVSECOPS",
    subtitle: "Pipeline security, SAST/DAST & secure SDLC.",
    analystRole: "DevSecOps Engineer",
    isLive: false,
    status: "ACTIVE",
    threat: "ELEVATED // 0.38",
    sync: "PIPELINE_OK",
  },
];

const DomainIcons = {
  soc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-400 w-5 h-5">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(34,211,238,0.2)"/>
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-rose-400 w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400 w-5 h-5">
      <rect x="3" y="11" width="18" height="10" rx="2" />
      <circle cx="12" cy="5" r="2" />
      <path d="M12 7v4" />
      <line x1="8" y1="16" x2="8" y2="16" />
      <line x1="16" y1="16" x2="16" y2="16" />
    </svg>
  ),
  network: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-400 w-5 h-5">
      <path d="M12 2v6" />
      <path d="M12 8l-6 5" />
      <path d="M12 8l6 5" />
      <circle cx="12" cy="4" r="2" />
      <circle cx="6" cy="15" r="2" />
      <circle cx="18" cy="15" r="2" />
      <path d="M6 17v4" />
      <path d="M18 17v4" />
      <path d="M6 21h12" />
    </svg>
  ),
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400 w-5 h-5">
      <path d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.18 20.24 10.27 18 10.03C17.47 6.64 14.47 4 11 4C7.13401 4 4 7.13401 4 11C4 11.2312 4.011 11.459 4.033 11.683C2.28 12.35 1 14.03 1 16C1 18.2091 2.79086 20 5 20H17.5" fill="rgba(129,140,248,0.2)"/>
    </svg>
  ),
  grc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-teal-400 w-5 h-5">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  ),
  devsecops: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-400 w-5 h-5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" fill="rgba(251,191,36,0.12)" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
};

export default function TopSection() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileCareerOpen, setMobileCareerOpen] = useState(false);
  const [mobileWorkflowsOpen, setMobileWorkflowsOpen] = useState(false);
  const [activeDomain, setActiveDomain] = useState<string>("soc");

  useEffect(() => {
    if (!isMobileMenuOpen) {
      setMobileCareerOpen(false);
      setMobileWorkflowsOpen(false);
    }
  }, [isMobileMenuOpen]);

  const activeData = DOMAIN_DATA.find((d) => d.id === activeDomain) || DOMAIN_DATA[0];
  const activeLive = useDomainLive(activeData);

  return (
    <div className="relative font-body">
      {/* TopNavBar Section */}
      <nav className="fixed top-0 w-full z-[100] bg-background/70 backdrop-blur-lg shadow-[0_0_40px_rgba(0,229,255,0.05)] h-16 border-b border-white/[0.05]">
        <div className="flex justify-between items-center px-6 md:px-8 h-full w-full max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="text-xl text-primary font-headline tracking-tighter transition-opacity cursor-default font-bold lowercase">
              rootaccess.tech
            </div>
            
            <div className="hidden md:flex items-center gap-8 font-mono text-[14px] tracking-tight ml-4">
               {/* Domains anchor link */}
               <Link className="text-primary/90 hover:text-primary transition-colors flex items-center gap-1.5" href="#explore-domains">
                 <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                 Domains
               </Link>

               {/* Career Path Dropdown */}
               <div
                 className="relative group py-5"
                 onMouseEnter={() => setActiveDropdown('roadmaps')}
                 onMouseLeave={() => setActiveDropdown(null)}
               >
                 <button className={`flex items-center gap-1.5 transition-colors outline-none ${activeDropdown === 'roadmaps' ? 'text-primary' : 'text-secondary/70 hover:text-primary'}`}>
                   Career Path
                   <span className={`material-symbols-outlined text-[14px] transition-transform duration-300 ${activeDropdown === 'roadmaps' ? 'rotate-180 text-primary' : ''}`}>
                     expand_more
                   </span>
                 </button>
                 <div className={`absolute top-full left-0 pt-1 transition-all duration-300 ${activeDropdown === 'roadmaps' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                   <div className="w-52 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-3xl bg-[#060a0f]">
                     <div className="p-1.5 flex flex-col gap-0.5">
                       {ROADMAPS_DATA.map((item) => (
                         <Link key={item.id} href={item.href} className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg hover:bg-white/5 transition-all group/item">
                           <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }} />
                           <span className="text-[12px] text-white/70 group-hover/item:text-primary transition-colors whitespace-nowrap">{item.label}</span>
                         </Link>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>

               {/* Workflows Dropdown */}
               <div
                 className="relative group py-5"
                 onMouseEnter={() => setActiveDropdown('experiences')}
                 onMouseLeave={() => setActiveDropdown(null)}
               >
                 <button className={`flex items-center gap-1.5 transition-colors outline-none ${activeDropdown === 'experiences' ? 'text-primary' : 'text-secondary/70 hover:text-primary'}`}>
                   Workflows
                   <span className={`material-symbols-outlined text-[14px] transition-transform duration-300 ${activeDropdown === 'experiences' ? 'rotate-180 text-primary' : ''}`}>
                     expand_more
                   </span>
                 </button>
                 <div className={`absolute top-full left-0 pt-1 transition-all duration-300 ${activeDropdown === 'experiences' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                   <div className="w-64 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-3xl bg-[#060a0f]">
                     <div className="p-1.5 flex flex-col gap-0.5">
                       {EXPERIENCES_DATA.map((item) => (
                         <Link key={item.id} href={item.href} className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg hover:bg-white/5 transition-all group/item">
                           <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }} />
                           <span className="text-[12px] text-white/70 group-hover/item:text-primary transition-colors whitespace-nowrap">{item.label}</span>
                         </Link>
                       ))}
                     </div>
                   </div>
                 </div>
               </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <Link href="/about" className="hidden md:block bg-primary text-on-primary px-5 py-1.5 font-mono text-[13px] font-bold tracking-normal hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(129,236,255,0.2)] transition-all duration-200 rounded-sm">
               About
             </Link>
             
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden flex items-center justify-center p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors overflow-hidden ml-2"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="4" y1="7" x2="20" y2="7"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
                <line x1="4" y1="17" x2="20" y2="17"></line>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Sidebar Overlay */}
      <div className={`fixed inset-0 z-[200] transition-all duration-500 md:hidden overflow-hidden ${isMobileMenuOpen ? 'visible' : 'invisible pointer-events-none'}`}>
        <div
          className={`absolute inset-0 bg-background/60 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-[#060a0f] border-l border-white/10 shadow-[-20px_0_100px_rgba(0,0,0,0.8)] transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex h-full min-h-0 flex-col overflow-hidden">
            <div className="flex shrink-0 justify-between items-center px-8 h-20 border-b border-white/[0.03]">
              <span className="font-mono text-[9px] tracking-[0.4em] text-primary/40 uppercase font-light">Navigation</span>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center text-white/40 hover:text-primary hover:bg-primary/5 rounded-full transition-all group"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:rotate-90 transition-transform duration-300">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex min-h-0 flex-1 flex-col">
              <div className="min-h-0 flex-1 overflow-y-auto px-8 py-6">
                <div className="flex flex-col border-b border-white/[0.06] pb-1">
                  <button
                    type="button"
                    onClick={() => setMobileCareerOpen((o) => !o)}
                    className="flex w-full items-center justify-between gap-3 py-3 text-left outline-none"
                    aria-expanded={mobileCareerOpen}
                  >
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase font-bold text-cyan-300/95">
                      Career Paths
                    </span>
                    <span className={`material-symbols-outlined text-[20px] text-cyan-400/80 transition-transform duration-200 ${mobileCareerOpen ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  {mobileCareerOpen && (
                    <div className="flex flex-col pb-2">
                      {ROADMAPS_DATA.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group flex items-center justify-between py-3.5 border-b border-white/[0.03] transition-all last:border-0"
                        >
                          <span className="font-headline text-[17px] font-bold text-white/80 group-hover:text-primary group-hover:translate-x-1 transition-all">
                            {item.label}
                          </span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex flex-col border-b border-white/[0.06] pt-2 pb-1">
                  <button
                    type="button"
                    onClick={() => setMobileWorkflowsOpen((o) => !o)}
                    className="flex w-full items-center justify-between gap-3 py-3 text-left outline-none"
                    aria-expanded={mobileWorkflowsOpen}
                  >
                    <span className="font-mono text-[10px] tracking-[0.28em] uppercase font-bold text-cyan-300/95">
                      Workflows
                    </span>
                    <span className={`material-symbols-outlined text-[20px] text-cyan-400/80 transition-transform duration-200 ${mobileWorkflowsOpen ? "rotate-180" : ""}`}>
                      expand_more
                    </span>
                  </button>
                  {mobileWorkflowsOpen && (
                    <div className="flex flex-col pb-2">
                      {EXPERIENCES_DATA.map((item) => (
                        <Link
                          key={item.id}
                          href={item.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="group flex items-center justify-between py-3.5 border-b border-white/[0.03] transition-all last:border-0"
                        >
                          <span className="font-headline text-[17px] font-bold text-white/80 group-hover:text-primary group-hover:translate-x-1 transition-all">
                            {item.label}
                          </span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }} />
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="shrink-0 border-t border-white/[0.08] bg-[#060a0f] px-8 py-4">
                <Link
                  href="/about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex w-full items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] py-3.5 font-mono text-[12px] font-bold tracking-[0.12em] uppercase text-white/90 transition-colors hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  About
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Main Content Canvas - Level 1 (Original Hero + Bento) */}
      <main className="relative pt-24 pb-8 min-h-screen">
        <div className="absolute inset-0 grid-overlay -z-10 bg-background"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header Section */}
          <div className="mb-3 max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-on-surface-variant">System Intelligence Active</span>
            </div>
            <h1 className="font-headline text-2xl md:text-3xl font-bold tracking-tight mb-1.5 leading-[1.1] text-white">
              Master the <span className="text-primary">Cyber Frontier</span> with <span className="text-primary">RootAccess</span>.
            </h1>
            <p className="text-on-surface-variant text-xs md:text-sm max-w-2xl leading-relaxed opacity-70">
              Focused, tactical cybersecurity roadmaps built for practitioners.
            </p>
          </div>

          {/* Original Bento Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
            {/* ── Card 1: Interactive Roadmaps ─────────────────────────────── */}
            <div className="md:col-span-12 lg:col-span-8">
              <div
                className="rounded-2xl p-4 md:p-5 h-full flex flex-col lg:flex-row gap-4 xl:gap-6 relative overflow-hidden border border-white/[0.06] transition-colors duration-300 hover:border-white/[0.10]"
                style={{ background: "#0d1117" }}
              >
                {/* Left: text content */}
                <div className="flex flex-col flex-1">
                  <h3 className="font-headline text-3xl md:text-4xl font-bold text-white leading-[1.05] mb-1.5">
                    Interactive Roadmaps
                  </h3>
                  <p className="font-label text-primary text-sm italic mb-2 opacity-85">
                    Scenario-driven technical progression.
                  </p>

                  <div className="mt-2 grid grid-cols-2 gap-x-4 md:gap-x-6">
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60 mb-2">Live Now</p>
                      <ul className="space-y-1.5">
                        {[
                          { label: "SOC", color: "#22d3ee" },
                          { label: "Web Hacking", color: "#f43f5e" },
                          { label: "AI Hacking", color: "#ef4444" },
                          { label: "Network Pentest", color: "#dc2626" },
                        ].map((d) => (
                          <li key={d.label} className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse" style={{ background: d.color, boxShadow: `0 0 6px ${d.color}` }} />
                            <span className="font-label text-[17px] sm:text-[18px] text-white/90">{d.label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/45 mb-2">Coming Soon</p>
                      <ul className="space-y-1.5">
                        {["DevSecOps", "Cloud Sec", "GRC"].map((label) => (
                          <li key={label} className="flex items-center gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full border border-white/30 flex-shrink-0" />
                            <span className="font-label text-[17px] sm:text-[18px] text-white/50">{label}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Right: symmetric domain tree */}
                <div className="lg:w-[260px] xl:w-[295px] flex-shrink-0 flex items-center justify-center py-2 lg:py-0 hidden md:flex">
                  <svg viewBox="0 0 240 148" className="w-full h-full min-h-[148px]" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
                    {/* ── Root: website favicon ── */}
                    <circle cx="120" cy="24" r="24" fill="rgba(34,211,238,0.06)" />
                    <circle cx="120" cy="24" r="17" fill="rgba(10,16,24,1)" stroke="rgba(34,211,238,0.25)" strokeWidth="1" />
                    <image href="/favicon.svg" x="110" y="14" width="20" height="20" className="opacity-90 transition-opacity" />

                    {/* ── Branches (Structured Orthogonal) ── */}
                    <path d="M120,41 V46 Q120,54 112,54 H35 Q27,54 27,62 V82" stroke="rgba(34,211,238,0.3)" strokeWidth="1.2" fill="none" />
                    <path d="M120,41 V54 Q120,62 112,62 H73 Q65,62 65,70 V75" stroke="rgba(244,63,94,0.3)" strokeWidth="1.2" fill="none" />
                    <path d="M120,41 V62 Q120,70 112,70 H102 Q94,70 94,78 V95" stroke="rgba(129,140,248,0.25)" strokeWidth="1.2" fill="none" />
                    
                    <path d="M120,41 V46 Q120,54 128,54 H205 Q213,54 213,62 V82" stroke="rgba(239,68,68,0.3)" strokeWidth="1.2" fill="none" />
                    <path d="M120,41 V54 Q120,62 128,62 H167 Q175,62 175,70 V75" stroke="rgba(220,38,38,0.3)" strokeWidth="1.2" fill="none" />
                    <path d="M120,41 V62 Q120,70 128,70 H138 Q146,70 146,78 V95" stroke="rgba(129,140,248,0.25)" strokeWidth="1.2" fill="none" />

                    {/* ── Nodes ── */}
                    <circle cx="27" cy="98" r="16" fill="rgba(34,211,238,0.04)" />
                    <circle cx="27" cy="98" r="12" fill="rgba(34,211,238,0.08)" stroke="rgba(34,211,238,0.45)" strokeWidth="1" />
                    <path d="M27,93 L23,95 L23,99 C23,101.2 27,102.5 27,102.5 C27,102.5 31,101.2 31,99 L31,95 Z" fill="rgba(34,211,238,0.15)" stroke="rgba(34,211,238,0.8)" strokeWidth="0.8" />

                    <circle cx="65" cy="88" r="14" fill="rgba(244,63,94,0.04)" />
                    <circle cx="65" cy="88" r="11" fill="rgba(244,63,94,0.08)" stroke="rgba(244,63,94,0.45)" strokeWidth="1" />
                    <circle cx="65" cy="88" r="5" fill="none" stroke="rgba(244,63,94,0.7)" strokeWidth="0.8" />
                    <line x1="60" y1="88" x2="70" y2="88" stroke="rgba(244,63,94,0.4)" strokeWidth="0.6" />

                    <circle cx="213" cy="98" r="16" fill="rgba(239,68,68,0.04)" />
                    <circle cx="213" cy="98" r="12" fill="rgba(239,68,68,0.08)" stroke="rgba(239,68,68,0.45)" strokeWidth="1" />
                    <circle cx="209" cy="95" r="1.5" fill="rgba(239,68,68,0.8)" />
                    <circle cx="217" cy="95" r="1.5" fill="rgba(239,68,68,0.8)" />
                    <circle cx="213" cy="102" r="1.5" fill="rgba(239,68,68,0.8)" />
                    <line x1="209" y1="95" x2="217" y2="95" stroke="rgba(239,68,68,0.4)" strokeWidth="0.7" />
                    <line x1="209" y1="95" x2="213" y2="102" stroke="rgba(239,68,68,0.4)" strokeWidth="0.7" />
                    <line x1="217" y1="95" x2="213" y2="102" stroke="rgba(239,68,68,0.4)" strokeWidth="0.7" />

                    <circle cx="175" cy="88" r="14" fill="rgba(220,38,38,0.04)" />
                    <circle cx="175" cy="88" r="11" fill="rgba(220,38,38,0.08)" stroke="rgba(220,38,38,0.4)" strokeWidth="1" />
                    <circle cx="175" cy="84" r="2" fill="rgba(220,38,38,0.8)" />
                    <circle cx="171" cy="91" r="2" fill="rgba(220,38,38,0.8)" />
                    <circle cx="179" cy="91" r="2" fill="rgba(220,38,38,0.8)" />

                    <circle cx="94" cy="106" r="13" fill="rgba(129,140,248,0.03)" stroke="rgba(129,140,248,0.2)" strokeWidth="0.8" />
                    <path d="M100,109 C101,108 102,106 102,104.5 C102,102.6 100.4,101 98.5,101 C97.7,101 97,101.3 96.4,101.7 C95.8,100.1 94.2,99 92.5,99 C90,99 88,101 88,103.5 C88,104 88.1,104.5 88.3,105 C87,105.5 86,106.8 86,108.5 C86,110.4 87.6,112 89.5,112 H98.5 C100.4,112 102,110.4 102,108.5 C102,107.4 101.2,106.5 100,109 Z"
                      fill="rgba(129,140,248,0.1)" stroke="rgba(129,140,248,0.35)" strokeWidth="0.7" />

                    <circle cx="146" cy="109" r="13" fill="rgba(129,140,248,0.03)" stroke="rgba(129,140,248,0.2)" strokeWidth="0.8" />
                    <text x="146" y="112" textAnchor="middle" fontFamily="'JetBrains Mono', monospace" fontSize="7" fill="rgba(129,140,248,0.35)">&lt;/&gt;</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Card 2: Career Paths ──────────────────────────────────────── */}
            <div className="md:col-span-12 lg:col-span-4">
              <div
                className="rounded-2xl p-4 md:p-5 h-full flex flex-col relative overflow-hidden border border-white/[0.06] transition-colors duration-300 hover:border-white/[0.10]"
                style={{ background: "#0d1117" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 flex-shrink-0"
                  style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.14)" }}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-secondary">
                    <polyline points="2,13 6,8 9,11 16,4" />
                    <polyline points="11,4 16,4 16,9" />
                  </svg>
                </div>

                <h3 className="font-headline text-xl font-bold text-white mb-0.5">Career Paths</h3>
                <p className="font-label text-white/40 text-[12px] mb-4">Per level, per domain — everything mapped.</p>

                <div className="flex flex-col gap-3">
                  {[
                    {
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 2h8a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z" />
                          <line x1="5" y1="6" x2="9" y2="6" /><line x1="5" y1="9" x2="11" y2="9" /><line x1="5" y1="12" x2="8" y2="12" />
                        </svg>
                      ),
                      label: "Curated Resources",
                      desc: "Labs, courses & reads for each level",
                    },
                    {
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="1,11 5,7 8,10 15,3" />
                          <polyline points="10,3 15,3 15,8" />
                        </svg>
                      ),
                      label: "Skills Required",
                      desc: "What to master at each stage",
                    },
                    {
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="8" cy="5.5" r="3.5" />
                          <path d="M5 9.5L3.5 14.5L8 12.5L12.5 14.5L11 9.5" />
                        </svg>
                      ),
                      label: "Certifications",
                      desc: "Best certs ranked per level",
                    },
                    {
                      icon: (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="1" width="6" height="6" rx="1" />
                          <rect x="9" y="1" width="6" height="6" rx="1" />
                          <rect x="1" y="9" width="6" height="6" rx="1" />
                          <rect x="9" y="9" width="6" height="6" rx="1" />
                        </svg>
                      ),
                      label: "Tools to Learn",
                      desc: "What practitioners actually use",
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5"
                        style={{ background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.16)", color: "rgba(168,85,247,0.80)" }}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <p className="font-label text-[15px] font-semibold text-white/80 leading-snug">{item.label}</p>
                        <p className="font-label text-[11px] text-white/35 leading-snug">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Card 3: Curated Resources ─────────────────────────────────── */}
            <div className="md:col-span-12">
              <div
                className="rounded-2xl p-4 md:p-5 flex flex-col md:flex-row gap-5 md:gap-8 relative overflow-hidden border border-white/[0.06] transition-colors duration-300 hover:border-white/[0.10]"
                style={{ background: "#0d1117" }}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-headline text-xl font-bold text-white whitespace-nowrap">Curated Resources</h3>
                    <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.06)" }} />
                  </div>

                  <p className="font-headline text-base md:text-lg italic mb-2 leading-snug" style={{ color: "#f97316" }}>
                    Cut out the BS. Get to the point.
                  </p>
                  <p className="text-white/70 text-[15px] md:text-[17px] leading-relaxed mb-3">
                    Organised by domain and career stage. You get shortlists of labs, courses, and reads people
                    actually open, not another giant list you&apos;ll never finish.
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {CURATED_RESOURCE_PLATFORMS.map(({ label, faviconHost }) => (
                      <span
                        key={label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/[0.18] bg-white/[0.04] px-3 py-1.5 font-mono text-[10px] sm:text-[11px] tracking-[0.08em] uppercase text-white/85"
                      >
                        {faviconHost ? (
                          <img
                            src={`https://icons.duckduckgo.com/ip3/${faviconHost}.ico`}
                            alt=""
                            width={16}
                            height={16}
                            className="h-4 w-4 shrink-0 rounded-[3px] object-contain"
                            loading="lazy"
                            referrerPolicy="no-referrer"
                          />
                        ) : (
                          <span
                            className="flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border border-white/25 bg-white/[0.06] text-[10px] font-bold leading-none text-white/70"
                            aria-hidden
                          >
                            +
                          </span>
                        )}
                        {label}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:w-52 flex-shrink-0 flex items-stretch">
                  <div
                    className="w-full rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center"
                    style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.14)" }}
                    >
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#f97316" }}>
                        <path d="M11 2L4 5.5v5.5c0 4 2.8 7.7 7 9 4.2-1.3 7-5 7-9V5.5L11 2z" fill="rgba(249,115,22,0.15)" stroke="currentColor" />
                        <polyline points="8,11 10.5,13.5 14.5,9" />
                      </svg>
                    </div>

                    <div>
                      <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-white/80 mb-1.5">Verified Access</p>
                      <p className="font-mono text-[9px] tracking-[0.18em] uppercase" style={{ color: "#f97316" }}>Labelled &amp; Categorised</p>
                    </div>

                    <Link
                      href="#explore-domains"
                      className="w-full font-mono text-[10px] tracking-[0.2em] uppercase font-bold text-black bg-white px-4 py-2.5 rounded-lg hover:bg-white/90 transition-colors duration-200 text-center block"
                    >
                      Browse Library
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div className="mt-8 mb-4 flex flex-col items-center gap-1 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-label text-[8px] tracking-[0.5em] uppercase text-on-surface-variant transition-colors group-hover:text-primary">SCROLL TO EXPLORE</span>
            <div className="relative flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-xl animate-scroll-indicator lowercase select-none">keyboard_double_arrow_down</span>
              <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent mt-1"></div>
            </div>
          </div>
        </div>
      </main>

      {/* Main Content Canvas - Level 2 (New Mission Control Grid) */}
      <section className="relative py-12 md:py-20 lg:py-24 min-h-screen border-t border-white/5" id="explore-domains">
        {/* Deep dark grid background matching mockup */}
        <div className="absolute inset-0 -z-10" style={{ backgroundColor: "#080c10", backgroundImage: "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "32px 32px" }}></div>

        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          
          {/* Header Section */}
          <div className="mb-6 md:mb-10">
            <div className="flex items-center gap-4 mb-2 opacity-80">
              <div className="w-8 h-[1px]" style={{ background: "rgba(255,255,255,0.2)" }}></div>
              <span className="font-mono text-[9px] tracking-[0.25em] text-cyan-400 uppercase">Mission Control</span>
            </div>
            <h2 className="font-headline text-3xl md:text-[40px] font-bold tracking-tight mb-3 text-white uppercase leading-[1.1]">
              EXPLORE_DOMAINS
            </h2>
            <p className="text-white/40 text-[13px] md:text-sm max-w-2xl leading-relaxed">
              Discover real-world workflows, tools, and guided learning paths. Connect your terminal to the global node network.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
            
            {/* Left Column: Domain cards grid */}
            <div className="flex-1 w-full grid grid-cols-3 gap-px sm:gap-1">
               {DOMAIN_DATA.map((domain) => {
                  const isActive = activeDomain === domain.id;
                  const locked = isDomainLocked(domain);
                  
                  return (
                     <div 
                        key={domain.id} 
                        onClick={() => setActiveDomain(domain.id)}
                        className={`[container-type:inline-size] border flex flex-col p-2 sm:p-3 md:p-4 min-h-[96px] sm:min-h-[128px] md:min-h-[180px] lg:min-h-[200px] cursor-pointer transition-all duration-300 relative group overflow-hidden ${isActive ? 'bg-[#10151c] border-white/10 shadow-[inset_0_0_20px_rgba(34,211,238,0.05)]' : 'bg-[#0b0e13] border-white/5 hover:bg-[#0f131a] hover:border-white/10'}`}
                     >
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/0 to-cyan-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div className="flex justify-between items-start gap-0.5 mb-1 sm:mb-3 md:mb-4 relative z-10 min-w-0">
                           <div className="w-6 h-6 sm:w-7 sm:h-8 md:h-8 flex shrink-0 items-center justify-center bg-[#182029] border border-white/[0.08] rounded shadow-[0_4px_10px_rgba(0,0,0,0.2)] [&_svg]:w-3 [&_svg]:h-3 sm:[&_svg]:w-3.5 sm:[&_svg]:h-3.5 md:[&_svg]:w-4 md:[&_svg]:h-4">
                              {DomainIcons[domain.id as keyof typeof DomainIcons]}
                           </div>
                           <span className={`font-mono text-[5px] sm:text-[8px] tracking-[0.06em] sm:tracking-[0.1em] uppercase truncate max-w-[45%] text-right ${isActive ? 'text-cyan-400' : 'text-white/20'}`}>{domain.nodeCode}</span>
                        </div>
                        
                        <div className="relative z-10 min-w-0">
                           <h3
                              className="font-headline min-w-0 truncate font-bold text-white uppercase mb-0.5 sm:mb-1.5 leading-tight tracking-tight sm:tracking-wide [font-size:clamp(6px,calc(0.22rem+5.5cqw),22px)]"
                              title={domain.title}
                           >
                              {domain.title}
                           </h3>
                           <p className="font-body text-[7px] sm:text-[11px] text-white/40 leading-snug pr-0 sm:pr-1 line-clamp-2 sm:line-clamp-none">{domain.subtitle}</p>
                        </div>
                        
                        <div className="mt-auto pt-1 sm:pt-3 md:pt-4 flex items-center justify-between relative z-10 w-full min-w-0">
                           <div className="flex min-w-0 items-center gap-0.5 sm:gap-1.5 opacity-70 group-hover:opacity-100 transition-opacity">
                              <span className={`font-mono text-[6px] sm:text-[9px] tracking-[0.08em] sm:tracking-[0.15em] font-bold truncate ${locked ? 'text-white/30' : 'text-cyan-400'} uppercase`}>
                                 {locked ? 'Locked' : 'Explore'}
                              </span>
                              {locked ? (
                                 <span className="material-symbols-outlined text-[10px] text-white/30">lock</span>
                              ) : (
                                 <span className="material-symbols-outlined text-[12px] text-cyan-400 transition-transform group-hover:translate-x-1">arrow_forward</span>
                              )}
                           </div>
                        </div>
                     </div>
                  )
               })}
            </div>

            {/* Right Column: Deep Dive Panel */}
            <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0 flex flex-col gap-5 sticky top-28">
               
               {/* Terminal Top Title */}
               <div className="flex items-center gap-3">
                  <h3 className="font-headline text-[13px] tracking-[0.15em] text-white uppercase font-bold">DEEP_DIVE: {activeData.title}_OPERATIONS</h3>
                  <div className="flex-1 h-[1px]" style={{ background: "rgba(255,255,255,0.05)" }}></div>
               </div>
               
               {/* Outer Terminal Container */}
               <div className="border border-white/5 bg-[#0b0e13] flex flex-col shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  
                  {/* Info Top Section */}
                  <div className="overflow-visible p-4 sm:p-6 border-b border-white/5">
                     
                     {/* Node Identity */}
                     <div className="flex items-center gap-5 mb-4 md:mb-8">
                        <div className="w-11 h-11 flex items-center justify-center bg-[#182029] border border-white/[0.08] shadow-[inset_0_0_8px_rgba(255,255,255,0.02)]">
                           {DomainIcons[activeData.id as keyof typeof DomainIcons]}
                        </div>
                        <div className="flex flex-col gap-1.5">
                           <p className="font-headline text-[17px] font-bold text-white tracking-wide leading-none">
                              {activeData.analystRole}
                           </p>
                           <div className="flex items-center gap-2">
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  activeData.isLive
                                    ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.5)]"
                                    : "bg-red-500 shadow-[0_0_6px_rgba(239,68,68,0.5)]"
                                }`}
                              />
                              <span className="font-mono text-[8px] text-white/50 tracking-[0.1em] uppercase">
                                STATUS: {activeData.isLive ? `${activeData.status}_FEED` : "OFFLINE"}
                              </span>
                           </div>
                        </div>
                     </div>

                     {/* Stats Row */}
                     <div className="flex justify-between mb-4 md:mb-8">
                        <div className="flex flex-col gap-1.5">
                          <p className="font-mono text-[8px] text-white/30 tracking-[0.15em] uppercase">Threat</p>
                          <p className={`font-mono text-[10px] font-bold ${activeData.threat.includes('CRITICAL') || activeData.threat.includes('ELEVATED') ? 'text-red-400' : 'text-cyan-400'}`}>{activeData.threat}</p>
                        </div>
                        <div className="flex flex-col gap-1.5 text-right">
                          <p className="font-mono text-[8px] text-white/30 tracking-[0.15em] uppercase">Sync</p>
                          <p className="font-mono text-[10px] text-cyan-400 font-bold tracking-wider">{activeData.sync}</p>
                        </div>
                     </div>

                     {/* Action Buttons */}
                     <div className="flex gap-3 overflow-visible">
                        {activeLive.isLocked ? (
                          <span
                            className="relative group flex-1 flex items-center justify-center gap-1.5 bg-cyan-400/15 text-white/35 border border-cyan-400/20 font-headline text-[11px] tracking-[0.1em] font-bold py-3 px-4 uppercase cursor-not-allowed select-none"
                            aria-disabled
                            aria-label="Experience It — coming soon"
                          >
                            <span
                              className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-20 -translate-x-1/2 rounded border border-cyan-400/35 bg-[#0a0f12] px-2.5 py-1.5 font-mono text-[9px] font-bold tracking-[0.2em] text-cyan-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 whitespace-nowrap"
                              role="tooltip"
                            >
                              COMING SOON!
                            </span>
                            <span className="material-symbols-outlined text-[14px] text-white/35">lock</span>
                            Experience It
                          </span>
                        ) : (
                          <Link
                            href={EXPERIENCES_DATA.find((e) => e.id === activeData.id)?.href ?? "#"}
                            className="flex-1 bg-cyan-400 hover:bg-cyan-300 text-black font-headline text-[11px] tracking-[0.1em] font-bold py-3 px-4 outline-none transition-colors uppercase text-center"
                          >
                            Experience It
                          </Link>
                        )}
                        {activeLive.isLocked ? (
                          <span
                            className="relative group flex-1 flex items-center justify-center gap-1.5 border border-white/[0.08] text-white/35 font-headline text-[11px] tracking-[0.1em] font-bold py-3 px-4 uppercase cursor-not-allowed select-none"
                            aria-disabled
                            aria-label="Explore Pathway — coming soon"
                          >
                            <span
                              className="pointer-events-none absolute bottom-[calc(100%+6px)] left-1/2 z-20 -translate-x-1/2 rounded border border-white/20 bg-[#0a0f12] px-2.5 py-1.5 font-mono text-[9px] font-bold tracking-[0.2em] text-white/90 shadow-[0_4px_20px_rgba(0,0,0,0.5)] opacity-0 transition-opacity duration-150 group-hover:opacity-100 whitespace-nowrap"
                              role="tooltip"
                            >
                              COMING SOON!
                            </span>
                            <span className="material-symbols-outlined text-[14px] text-white/35">lock</span>
                            Explore Pathway
                          </span>
                        ) : (
                          <Link
                            href={ROADMAPS_DATA.find((r) => r.id === activeData.id)?.href ?? "#"}
                            className="flex-1 border border-white/10 text-white hover:bg-white/5 font-headline text-[11px] tracking-[0.1em] font-bold py-3 px-4 outline-none transition-colors uppercase text-center"
                          >
                            Explore Pathway
                          </Link>
                        )}
                     </div>
                  </div>

                  <DomainDeepDiveVisual domainId={activeData.id} />

               </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
