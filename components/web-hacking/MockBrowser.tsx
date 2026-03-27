"use client";

import React from "react";

type MockBrowserProps = {
  /** 0–1: how far the URL has "typed" into the address bar */
  urlProgress: number;
};

const FULL_URL = "nexuspay.io";

export const MockBrowser: React.FC<MockBrowserProps> = ({ urlProgress }) => {
  const visibleChars = Math.round(urlProgress * FULL_URL.length);
  const displayUrl   = FULL_URL.slice(0, visibleChars);
  const showCursor   = urlProgress < 1;

  return (
    <div
      className="relative flex w-full flex-col overflow-hidden rounded-2xl"
      style={{
        background: "rgba(8, 12, 24, 0.97)",
        border: "1px solid rgba(244,63,94,0.12)",
        boxShadow: "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.04)",
      }}
    >
      {/* ── Chrome bar ──────────────────────────────────────────────────────── */}
      <div
        className="flex shrink-0 items-center gap-3 border-b px-4 py-3"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(15,20,35,0.98)" }}
      >
        {/* Traffic lights */}
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full" style={{ background: "#ff5f57" }} />
          <div className="h-3 w-3 rounded-full" style={{ background: "#ffbd2e" }} />
          <div className="h-3 w-3 rounded-full" style={{ background: "#28ca41" }} />
        </div>

        {/* Address bar */}
        <div
          className="flex flex-1 items-center gap-2 rounded-lg px-3 py-1.5"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Lock icon */}
          <svg className="h-3 w-3 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="font-mono text-[12px] text-slate-300">
            {displayUrl}
            {showCursor && <span className="ml-0.5 inline-block h-3 w-0.5 animate-pulse bg-rose-400 align-middle" />}
          </span>
        </div>

        {/* Nav icons */}
        <div className="flex items-center gap-2 opacity-30">
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <svg className="h-4 w-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </div>
      </div>

      {/* ── Fake website content ─────────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">

        {/* Site navbar */}
        <div
          className="flex items-center justify-between border-b px-8 py-4"
          style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(10,14,28,0.98)" }}
        >
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: "rgba(244,63,94,0.15)", border: "1px solid rgba(244,63,94,0.3)" }}>
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#f43f5e" opacity="0.9" />
                <path d="M2 17l10 5 10-5" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" />
                <path d="M2 12l10 5 10-5" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
              </svg>
            </div>
            <span className="font-sans text-sm font-bold tracking-tight text-white">NexusPay</span>
          </div>

          {/* Nav links */}
          <nav className="flex items-center gap-6">
            {["Products", "Pricing", "Security", "Developers"].map((link) => (
              <span key={link} className="font-sans text-xs text-slate-400">{link}</span>
            ))}
          </nav>

          {/* Login CTA */}
          <div className="flex items-center gap-3">
            <span className="font-sans text-xs text-slate-400">Sign in</span>
            <div className="rounded-lg px-4 py-1.5" style={{ background: "#f43f5e", boxShadow: "0 0 16px rgba(244,63,94,0.3)" }}>
              <span className="font-sans text-xs font-semibold text-white">Get Started</span>
            </div>
          </div>
        </div>

        {/* Hero */}
        <div className="flex flex-col items-center px-8 pt-10 pb-8 text-center">
          <div className="mb-4 rounded-full border px-3 py-1 text-[10px] font-mono uppercase tracking-widest" style={{ borderColor: "rgba(244,63,94,0.25)", color: "rgba(244,63,94,0.8)", background: "rgba(244,63,94,0.06)" }}>
            Trusted by 14 million users
          </div>
          <h2 className="mb-3 font-sans text-3xl font-bold leading-tight text-white md:text-4xl">
            Secure payments for<br />the modern web
          </h2>
          <p className="mb-8 max-w-md font-sans text-sm leading-relaxed text-slate-400">
            Process transactions at scale with enterprise-grade security. PCI-DSS Level 1 compliant.
          </p>
          <div className="flex items-center gap-4">
            <div className="rounded-xl px-6 py-2.5" style={{ background: "#f43f5e" }}>
              <span className="font-sans text-sm font-semibold text-white">Start for free</span>
            </div>
            <span className="font-sans text-sm text-slate-400">View the docs →</span>
          </div>
        </div>

        {/* Stats bar */}
        <div
          className="flex items-center justify-center gap-10 border-t px-8 py-4"
          style={{ borderColor: "rgba(255,255,255,0.05)", background: "rgba(8,12,20,0.6)" }}
        >
          {[
            { val: "14M+", label: "Users" },
            { val: "£2.4B", label: "Processed" },
            { val: "99.99%", label: "Uptime" },
            { val: "180+", label: "Countries" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-sans text-base font-bold text-white">{s.val}</p>
              <p className="font-mono text-[10px] uppercase tracking-widest text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
