"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const NAV_GROUPS = [
  {
    title: "Pathways & Certifications",
    items: [
      { label: "SOC Career Path", href: "/roadmaps/soc/career-path", color: "#22d3ee" },
      { label: "Web Hacking Path", href: "/roadmaps/web-hacking/career-path", color: "#f43f5e" },
      { label: "AI Hacking Path", href: "/roadmaps/ai-hacking/career-path", color: "#ef4444" },
      { label: "Network Pentesting", href: "/roadmaps/network-pentesting/career-path", color: "#dc2626" },
    ],
  },
  {
    title: "Interactive Experiences",
    items: [
      { label: "SOC Scrollytelling", href: "/roadmaps/soc", color: "#22d3ee" },
      { label: "Web Hacking", href: "/roadmaps/web-hacking", color: "#f43f5e" },
      { label: "AI Hacking", href: "/roadmaps/ai-hacking", color: "#ef4444" },
      { label: "Network Pentesting", href: "/roadmaps/network-pentesting", color: "#dc2626" },
    ],
  },
];

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        opacity: 1,
        visibility: "visible",
        duration: 0.4,
        ease: "power2.out",
      });
      tl.fromTo(
        contentRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.5, ease: "power3.out" },
        "<"
      );
      tl.fromTo(
        itemsRef.current.filter(Boolean),
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" },
        "-=0.2"
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(overlayRef.current, {
        opacity: 0,
        visibility: "hidden",
        duration: 0.3,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] invisible opacity-0"
      style={{ background: "rgba(2, 6, 23, 0.7)", backdropFilter: "blur(12px)" }}
    >
      <div
        ref={contentRef}
        className="absolute right-0 top-0 h-full w-[85%] max-w-[400px] shadow-2xl p-8 flex flex-col"
        style={{ background: "#090d14", borderLeft: "1px solid rgba(34, 211, 238, 0.15)" }}
      >
        <div className="flex items-center justify-between mb-12">
          <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-cyan-400/60 font-bold">
            Navigation Menu
          </span>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-white/50 hover:text-white transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto pr-4 -mr-4 custom-scrollbar">
          {NAV_GROUPS.map((group, gIdx) => (
            <div key={group.title} className="mb-10" ref={(el) => { itemsRef.current[gIdx] = el; }}>
              <h3 className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-500 mb-6 font-bold">
                {group.title}
              </h3>
              <div className="space-y-4">
                {group.items.map((item, iIdx) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="group block py-2 border-b border-white/5 relative"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {item.label}
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-12 pt-8 border-t border-white/5" ref={(el) => { itemsRef.current[2] = el; }}>
             <Link
                href="/about"
                onClick={onClose}
                className="flex items-center justify-between p-5 rounded-2xl border transition-all duration-300"
                style={{ 
                    background: "rgba(34,211,238,0.05)",
                    borderColor: "rgba(34,211,238,0.2)",
                    textDecoration: "none"
                }}
             >
                <div className="flex flex-col gap-1">
                    <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-400">About</span>
                    <span className="text-[13px] text-slate-400">Our mission & method</span>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-cyan-400">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
             </Link>
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-center">
             <span className="font-mono text-[9px] uppercase tracking-[0.5em] text-slate-600">rootaccess.tech v2.4</span>
        </div>
      </div>
    </div>
  );
}
