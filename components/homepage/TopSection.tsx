"use client";

import React, { useState } from "react";
import Link from "next/link";

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

export default function TopSection() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative font-body">
      {/* TopNavBar Section */}
      <nav className="fixed top-0 w-full z-[100] bg-background/70 backdrop-blur-lg shadow-[0_0_40px_rgba(0,229,255,0.05)] h-16">
        <div className="flex justify-between items-center px-6 md:px-8 h-full w-full max-w-screen-2xl mx-auto">
          <div className="text-xl text-primary font-headline lowercase tracking-tighter hover:opacity-80 transition-opacity cursor-default">
            rootaccess.tech
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-mono text-[14px] tracking-tight">
            <Link className="text-primary/90 hover:text-primary transition-colors flex items-center gap-1.5" href="#roadmaps">
              <span className="w-1 h-1 rounded-full bg-primary/40"></span>
              Domains
            </Link>
            
            {/* Roadmaps Dropdown Trigger */}
            <div 
              className="relative group py-5"
              onMouseEnter={() => setActiveDropdown('roadmaps')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 transition-colors outline-none ${activeDropdown === 'roadmaps' ? 'text-primary' : 'text-secondary/70 hover:text-primary'}`}>
                Roadmaps
                <span className={`material-symbols-outlined text-[14px] transition-transform duration-300 ${activeDropdown === 'roadmaps' ? 'rotate-180 text-primary' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 pt-1 transition-all duration-300 ${activeDropdown === 'roadmaps' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="w-52 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-3xl bg-[#060a0f]">
                  <div className="p-1.5 flex flex-col gap-0.5">
                    {ROADMAPS_DATA.map((item) => (
                      <Link 
                        key={item.id}
                        href={item.href}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg hover:bg-white/5 transition-all group/item"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }}
                        />
                        <span className="text-[12px] text-white/70 group-hover/item:text-primary transition-colors whitespace-nowrap">
                          {item.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience It Dropdown Trigger */}
            <div 
              className="relative group py-5"
              onMouseEnter={() => setActiveDropdown('experiences')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className={`flex items-center gap-1.5 transition-colors outline-none ${activeDropdown === 'experiences' ? 'text-primary' : 'text-secondary/70 hover:text-primary'}`}>
                Experience It
                <span className={`material-symbols-outlined text-[14px] transition-transform duration-300 ${activeDropdown === 'experiences' ? 'rotate-180 text-primary' : ''}`}>
                  expand_more
                </span>
              </button>

              {/* Dropdown Menu */}
              <div className={`absolute top-full left-0 pt-1 transition-all duration-300 ${activeDropdown === 'experiences' ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
                <div className="w-64 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-3xl bg-[#060a0f]">
                  <div className="p-1.5 flex flex-col gap-0.5">
                    {EXPERIENCES_DATA.map((item) => (
                      <Link 
                        key={item.id}
                        href={item.href}
                        className="flex items-center gap-3 px-3.5 py-2.5 rounded-lg hover:bg-white/5 transition-all group/item"
                      >
                        <span 
                          className="w-1.5 h-1.5 rounded-full" 
                          style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }}
                        />
                        <span className="text-[12px] text-white/70 group-hover/item:text-primary transition-colors whitespace-nowrap">
                          {item.label}
                        </span>
                      </Link>
                    ))}
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
              className="md:hidden flex items-center justify-center p-2 text-primary hover:bg-primary/10 rounded-lg transition-colors overflow-hidden"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
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
        {/* Backdrop for peeking effect */}
        <div 
          className={`absolute inset-0 bg-background/60 backdrop-blur-md transition-opacity duration-500 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Sidebar Panel */}
        <div className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-[#060a0f] border-l border-white/10 shadow-[-20px_0_100px_rgba(0,0,0,0.8)] transition-transform duration-500 transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full overflow-hidden">
            {/* Sidebar Header */}
            <div className="flex justify-between items-center px-8 h-20 border-b border-white/[0.03]">
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

            {/* Sidebar Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8 flex flex-col gap-12">
              {/* Section 1: Pathways */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase">Pathways & Certifications</span>
                <div className="flex flex-col">
                  {ROADMAPS_DATA.map((item) => (
                    <Link 
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-white/[0.03] transition-all last:border-0"
                    >
                      <span className="font-headline text-[17px] font-bold text-white/80 group-hover:text-primary group-hover:translate-x-1 transition-all">{item.label}</span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Section 2: Experiences */}
              <div className="flex flex-col gap-4">
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/20 uppercase">Interactive Experiences</span>
                <div className="flex flex-col">
                  {EXPERIENCES_DATA.map((item) => (
                    <Link 
                      key={item.id}
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-white/[0.03] transition-all last:border-0"
                    >
                      <span className="font-headline text-[17px] font-bold text-white/80 group-hover:text-primary group-hover:translate-x-1 transition-all">{item.label}</span>
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 10px ${item.color}44` }} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Specialized About Card */}
              <Link 
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 p-5 rounded-xl border border-primary/10 bg-white/[0.02] hover:bg-white/[0.04] transition-all group relative overflow-hidden"
              >
                <div className="flex justify-between items-center mb-1 relative z-10 w-full">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase font-bold">About System</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
                <p className="font-body text-[12px] text-white/40 relative z-10 leading-relaxed max-w-[200px]">Our mission, methodology and technical architecture</p>
                <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                  <span className="material-symbols-outlined text-6xl">hub</span>
                </div>
              </Link>
            </div>

            {/* Sidebar Footer */}
            <div className="px-8 py-10 border-t border-white/5 flex flex-col items-center gap-2">
              <span className="font-mono text-[8px] tracking-[0.4em] text-white/10 uppercase italic">RootAccess.tech V2.4 / Terminal</span>
              <div className="flex gap-4">
                <div className="w-1 h-1 rounded-full bg-primary/20 animate-pulse"></div>
                <div className="w-1 h-1 rounded-full bg-primary/20 animate-pulse delay-75"></div>
                <div className="w-1 h-1 rounded-full bg-primary/20 animate-pulse delay-150"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Canvas */}
      <main className="relative pt-24 pb-6 overflow-hidden bg-background">
        {/* Background decorative elements */}
        <div className="absolute inset-0 grid-overlay -z-10"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary/5 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Header Section */}
          <div className="mb-6 max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label text-[9px] tracking-[0.3em] uppercase text-on-surface-variant">System Intelligence Active</span>
            </div>
            <h1 className="font-headline text-3xl md:text-4xl font-bold tracking-tight mb-3 leading-[1.1] text-white">
              Master the <span className="text-primary">Digital Frontier</span>.
            </h1>
            <p className="text-on-surface-variant text-sm md:text-base max-w-2xl leading-relaxed opacity-80">
              Deploy your career into the high-stakes world of cybersecurity with a focused, tactical roadmap built for practitioners.
            </p>
          </div>

          {/* Bento Grid of Cards */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
            {/* Card 1: Interactive Roadmaps */}
            <div className="md:col-span-12 lg:col-span-8 group">
              <div className="glass-card p-5 md:p-7 rounded-xl h-full flex flex-col md:flex-row gap-6 relative overflow-hidden transition-all duration-500 hover:bg-surface-container-high border border-white/5">
                <div className="flex-1 z-10">
                  <span className="font-label text-primary text-[9px] tracking-[0.2em] uppercase mb-3 block">Navigation Module</span>
                  <h3 className="font-headline text-2xl font-bold mb-1.5 text-white">Interactive Roadmaps</h3>
                  <p className="font-headline text-on-surface-variant/80 text-base mb-3 italic">Experience Real world scenarios.</p>
                  <p className="font-label text-white text-[13px] uppercase tracking-[0.2em] mb-4 leading-relaxed">
                    Scroll driven workflows, understand through visualization. Beginner friendly roadmaps, save the jargon for later.
                  </p>
                </div>
                <div className="md:w-1/4 flex items-start justify-center pt-2 z-10">
                  <div className="relative">
                    <span className="material-symbols-outlined text-9xl text-primary glow-cyan transition-transform duration-700 group-hover:scale-110">route</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: Career Paths */}
            <div className="md:col-span-12 lg:col-span-4 group">
              <div className="glass-card p-5 md:p-6 rounded-xl h-full flex flex-col justify-between transition-all duration-500 hover:bg-surface-container-high overflow-hidden relative border border-white/5">
                <div>
                  <span className="material-symbols-outlined text-4xl text-secondary glow-purple mb-4 block">stairs</span>
                  <h3 className="font-headline text-xl font-bold mb-1 text-white">Career Paths</h3>
                  <p className="font-headline text-on-surface-variant/80 text-[13px] mb-3 italic">Know exactly where you're headed.</p>
                  <p className="text-on-surface-variant text-[13px] leading-relaxed mb-6">
                    Every role mapped with realistic salaries, prerequisites, and long-term trajectory analytics.
                  </p>
                </div>
                <ul className="space-y-1.5 mt-auto">
                  <li className="text-[9px] font-label uppercase tracking-[0.15em] text-on-secondary-container bg-secondary/10 px-2.5 py-1 rounded-lg border border-secondary/20">
                    Entry to leadership - 5 levels
                  </li>
                  <li className="text-[9px] font-label uppercase tracking-[0.15em] text-on-surface-variant px-2.5 py-1">
                    Tools, skills & timelines
                  </li>
                </ul>
              </div>
            </div>

            {/* Card 3: Curated Resources */}
            <div className="md:col-span-12 group mt-2">
              <div className="glass-card p-5 md:p-8 rounded-xl flex flex-col md:flex-row items-center gap-8 transition-all duration-500 hover:bg-surface-container-high border border-white/5 border-b border-transparent hover:border-tertiary/20">
                <div className="order-2 md:order-1 flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-0.5 bg-tertiary/20 text-tertiary text-[9px] font-bold font-label uppercase tracking-[0.2em] rounded">Verified Library</span>
                  </div>
                  <h3 className="font-headline text-2xl font-bold mb-1 text-white">Curated Resources</h3>
                  <p className="font-headline text-on-surface-variant/80 text-base mb-4 italic">No noise. Only what works.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <p className="text-on-surface-variant text-sm leading-relaxed">
                      Hand-picked resources for each and every domain, career level, skill. Your one stop shop, to get started.
                    </p>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-sm font-label uppercase tracking-wider text-on-surface text-white">
                        <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        PORTSWIGGER, TCM SECURITY, HTB & MORE
                      </li>
                      <li className="flex items-center gap-3 text-sm font-label uppercase tracking-wider text-on-surface text-white">
                        <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                        FREE AND PAID CLEARLY LABELLED
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="order-1 md:order-2">
                  <span className="material-symbols-outlined text-9xl text-tertiary glow-red transition-all duration-500 group-hover:rotate-6 group-hover:scale-105">menu_book</span>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Prompt */}
          <div className="mt-8 flex flex-col items-center gap-2 group cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
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
