"use client";

import React, { useState } from "react";
import Link from "next/link";

const LIVE_WORKFLOWS = [
  { id: "soc", label: "SOC Engineer", href: "/roadmaps/soc/career-path", color: "#22d3ee" },
  { id: "web", label: "Web Pentester", href: "/roadmaps/web-hacking/career-path", color: "#f43f5e" },
  { id: "ai", label: "AI Security", href: "/roadmaps/ai-hacking/career-path", color: "#ef4444" },
  { id: "network", label: "Network Pentester", href: "/roadmaps/network-pentesting/career-path", color: "#dc2626" },
];

export default function TopSection() {
  const [openDropdown, setOpenDropdown] = useState(false);

  return (
    <div className="relative font-body">
      {/* TopNavBar Section */}
      <nav className="fixed top-0 w-full z-[100] bg-background/70 backdrop-blur-lg shadow-[0_0_40px_rgba(0,229,255,0.05)] h-16">
        <div className="flex justify-between items-center px-8 h-full w-full max-w-screen-2xl mx-auto">
          <div className="text-lg text-primary font-body lowercase tracking-tight">
            rootaccess.tech
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-body text-[13px]">
            <Link className="text-primary/90 hover:text-primary transition-colors" href="#roadmaps">Roadmaps</Link>
            
            {/* Workflows Dropdown Trigger */}
            <div 
              className="relative group py-5"
              onMouseEnter={() => setOpenDropdown(true)}
              onMouseLeave={() => setOpenDropdown(false)}
            >
              <button className="flex items-center gap-1.5 text-secondary/70 group-hover:text-primary transition-colors outline-none">
                Workflows
                <span className={`material-symbols-outlined text-[14px] transition-transform duration-300 ${openDropdown ? 'rotate-180 text-primary' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full right-0 pt-1 transition-all duration-300 ${openDropdown ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="w-52 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-3xl bg-[#060a0f]">
                  <div className="p-1.5 flex flex-col gap-0.5">
                    {LIVE_WORKFLOWS.map((wf) => (
                      <Link 
                        key={wf.id}
                        href={wf.href}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg hover:bg-white/5 transition-all group/item"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: wf.color, boxShadow: `0 0 10px ${wf.color}44` }}
                        />
                        <span className="text-[12px] text-white/70 group-hover/item:text-primary transition-colors">
                          {wf.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="bg-white/[0.02] px-4 py-2 border-t border-white/5">
                    <span className="text-[9px] italic text-white/30 tracking-wider font-light">Verified Systems Only</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Link href="/about" className="bg-primary text-on-primary px-5 py-1.5 font-body text-[13px] hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(129,236,255,0.2)] transition-all duration-200 rounded-sm">
            About
          </Link>
        </div>
      </nav>

      {/* Main Content Canvas */}
      <main className="relative pt-24 pb-8 overflow-hidden bg-background">
        {/* Background decorative elements */}
        <div className="absolute inset-0 grid-overlay -z-10"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header Section */}
          <div className="mb-10 max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-on-surface-variant">System Intelligence Active</span>
            </div>
            <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight mb-4 leading-[1.1] text-white">
              Master the <span className="text-primary">Digital Frontier</span>.
            </h1>
            <p className="text-on-surface-variant text-base md:text-lg max-w-2xl leading-relaxed opacity-80">
              Deploy your career into the high-stakes world of cybersecurity with a focused, tactical roadmap built for practitioners.
            </p>
          </div>

          {/* Bento Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* Card 1: Interactive Roadmaps */}
            <div className="md:col-span-8 group">
              <div className="glass-card p-6 md:p-8 rounded-xl h-full flex flex-col md:flex-row gap-6 relative overflow-hidden transition-all duration-500 hover:bg-surface-container-high border border-white/5">
                <div className="flex-1 z-10">
                  <span className="font-label text-primary text-[9px] tracking-[0.2em] uppercase mb-3 block">Navigation Module</span>
                  <h3 className="font-headline text-2xl font-bold mb-1.5 text-white">Interactive Roadmaps</h3>
                  <p className="font-headline text-on-surface-variant/80 text-base mb-4 italic">See hacking, not just read it.</p>
                  <p className="text-on-surface-variant text-sm leading-relaxed mb-6 max-w-md">
                    Scroll-driven attack and defence workflows that visualize complex vulnerabilities in real-time environments.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-sm font-label uppercase tracking-wider text-on-surface text-white">
                      <span className="material-symbols-outlined text-primary text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>terminal</span>
                      SOC & Web Hacking live now
                    </li>
                    <li className="flex items-center gap-3 text-sm font-label uppercase tracking-wider text-on-surface-variant">
                      <span className="material-symbols-outlined text-outline text-[16px]">schedule</span>
                      AI Hacking & Network Pentest soon
                    </li>
                  </ul>
                </div>
                <div className="md:w-1/3 flex items-center justify-center py-6 z-10">
                  <div className="relative">
                    <span className="material-symbols-outlined text-7xl text-primary glow-cyan transition-transform duration-700 group-hover:scale-110">route</span>
                  </div>
                </div>
                {/* Inset Image/Texture for visual depth */}
                <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-10 pointer-events-none transition-opacity group-hover:opacity-20">
                  <img 
                    alt="digital circuit paths" 
                    className="w-full h-full object-cover grayscale invert" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZ9JJvgAYBAu28VXKpd9E8zAAll3zG2y1FaEB4XFe4iMgc_k5W02WNmdkPeAvM4HDoPkwbnLYQQnOPYySm8KifI_sf3uGs0VXbXf1hnA2BGzrN-oYSoWl4PHPBlH7PXCy8GtHf68fXu33-emLPxhFh_NzHGocAMEInPUX-xYJ3rtauELama1le9p8UJTeQDv_h05-r6Y0fzpJJrxzpzYZ72FLx6uQwt3w8ahWjmmTf_8xet7vPS2ikNJJzXw514U0b8HozmtJq"
                  />
                </div>
              </div>
            </div>

            {/* Card 2: Career Paths */}
            <div className="md:col-span-4 group">
              <div className="glass-card p-6 rounded-xl h-full flex flex-col justify-between transition-all duration-500 hover:bg-surface-container-high overflow-hidden relative border border-white/5">
                <div>
                  <span className="material-symbols-outlined text-4xl text-secondary glow-purple mb-4 block">stairs</span>
                  <h3 className="font-headline text-xl font-bold mb-1 text-white">Career Paths</h3>
                  <p className="font-headline text-on-surface-variant/80 text-[13px] mb-3 italic">Know exactly where you're headed.</p>
                  <p className="text-on-surface-variant text-[13px] leading-relaxed mb-6">
                    Every role mapped with realistic salaries, prerequisites, and long-term trajectory analytics.
                  </p>
                </div>
                <ul className="space-y-2 mt-auto">
                  <li className="text-[10px] font-label uppercase tracking-[0.15em] text-on-secondary-container bg-secondary/10 px-3 py-1.5 rounded-lg border border-secondary/20">
                    Entry to leadership - 5 levels
                  </li>
                  <li className="text-[10px] font-label uppercase tracking-[0.15em] text-on-surface-variant px-3 py-1">
                    Tools, skills & timelines
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3: Curated Resources */}
            <div className="md:col-span-12 group mt-2">
              <div className="glass-card p-6 md:p-10 rounded-xl flex flex-col md:flex-row items-center gap-8 transition-all duration-500 hover:bg-surface-container-high border border-white/5 border-b border-transparent hover:border-tertiary/20">
                <div className="order-2 md:order-1 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 bg-tertiary/20 text-tertiary text-[9px] font-bold font-label uppercase tracking-[0.2em] rounded">Verified Library</span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-1 text-white">Curated Resources</h3>
                  <p className="font-headline text-on-surface-variant/80 text-base mb-4 italic">No noise. Only what works.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Hand-picked labs, courses, and platforms vetted by industry veterans to cut through the marketing fluff.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm font-label uppercase tracking-wider text-on-surface text-white">
                        <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        PortSwigger, TryHackMe, HTB & more
                      </li>
                      <li className="flex items-center gap-3 text-sm font-label uppercase tracking-wider text-on-surface text-white">
                        <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        Free and paid clearly labelled
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <span className="material-symbols-outlined text-7xl text-tertiary glow-red transition-all duration-500 group-hover:rotate-6 group-hover:scale-105">menu_book</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div className="mt-12 flex flex-col items-center gap-2 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
            <span className="font-label text-[8px] tracking-[0.5em] uppercase text-on-surface-variant transition-colors group-hover:text-primary">SCROLL TO EXPLORE</span>
            <div className="relative flex flex-col items-center">
              <span className="material-symbols-outlined text-primary text-xl animate-scroll-indicator lowercase select-none">keyboard_double_arrow_down</span>
              <div className="w-px h-8 bg-gradient-to-b from-primary/60 to-transparent mt-1"></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
