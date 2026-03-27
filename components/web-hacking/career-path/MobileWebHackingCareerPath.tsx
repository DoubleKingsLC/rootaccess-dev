"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LEVELS } from "./data";

type MobileWebHackingCareerPathProps = {
  showScrollTop: boolean;
};

export function MobileWebHackingCareerPath({ showScrollTop }: MobileWebHackingCareerPathProps) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden font-sans pb-20 pt-14">
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b border-white/5 bg-slate-950/90 px-4 py-3 backdrop-blur-md">
        <button
          onClick={() => router.push("/")}
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400"
        >
          Home
        </button>
        <p className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-rose-400">
          Web Hacking Career Path
        </p>
        <button
          onClick={() => router.push("/roadmaps/web-hacking")}
          className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500"
        >
          Back
        </button>
      </header>
      <div className="relative">
        {LEVELS.map((level) => (
          <section key={level.num} className="relative pt-16 pb-20 px-6 border-b border-white/5 last:border-0 overflow-hidden">
            <div
              className="mb-8 flex items-center justify-center rounded-full border-2 bg-slate-950 shadow-2xl"
              style={{
                width: 48,
                height: 48,
                borderColor: level.color,
                boxShadow: `0 0 20px ${level.glow}`,
              }}
            >
              <span className="font-mono text-base font-black" style={{ color: level.color }}>
                {level.num}
              </span>
            </div>

            <div className="mb-10 space-y-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-rose-400/60">
                {level.subtitle}
              </span>
              <h2 className="text-3xl font-bold tracking-tight leading-tight">
                {level.label}
              </h2>
              <div className="relative pl-5 py-1 mt-4">
                <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-white/10" />
                <p className="text-slate-400 italic text-sm leading-relaxed max-w-md">
                  &ldquo;{level.quote}&rdquo;
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                { title: "SKILLS", items: level.skills, icon: "⚡" },
                { title: "CERTS", items: level.certs, icon: "🎯" },
                { title: "RESOURCES", items: level.labs, icon: "🧪" },
                { title: "TOOLS", items: level.tools, icon: "🔧" },
              ].map((cat: { title: string; items: unknown[]; icon: string }) => (
                <div
                  key={cat.title}
                  className="rounded-2xl border border-white/5 bg-slate-900/30 p-5 backdrop-blur-sm relative overflow-hidden group shadow-lg"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none text-2xl">
                    {cat.icon}
                  </div>
                  <h3 className="font-mono text-[10px] font-bold tracking-[0.3em] text-slate-500 mb-4 border-b border-white/5 pb-2">
                    {cat.title}
                  </h3>
                  {cat.title === "CERTS" && cat.items.length > 1 ? (
                    <div className="flex flex-col gap-5 pt-1">
                      <div>
                        <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-rose-500/60">Recommended</p>
                        <ul>
                          {[cat.items[0]].map((item: unknown, idx: number) => {
                            const isObj = typeof item === "object" && item !== null;
                            const label = isObj && "label" in item ? String((item as { label: string }).label) : String(item);
                            const link = isObj && "link" in item ? (item as { link?: string }).link : null;
                            const provider = isObj && "provider" in item ? (item as { provider?: string }).provider : null;
                            return (
                              <li key={idx} className="flex items-start gap-4">
                                {!provider || (provider !== "youtube" && provider !== "google") ? (
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-500/40" />
                                ) : (
                                  <div className="mt-0.5 shrink-0">
                                    {provider === "google" && (
                                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                      </svg>
                                    )}
                                  </div>
                                )}
                                <div className="flex flex-col gap-1 w-full">
                                  {link ? (
                                    <a href={link} target="_blank" rel="noopener noreferrer"
                                      className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link">
                                      <span>{label}</span>
                                      <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                      </svg>
                                    </a>
                                  ) : (
                                    <span className="text-xs font-medium text-slate-300 leading-normal">{label}</span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                      <div>
                        <p className="mb-2 font-mono text-[9px] font-bold uppercase tracking-[0.35em] text-slate-500">{level.num === "03" ? "Additional" : "Alternatives"}</p>
                        <ul className="space-y-4">
                          {cat.items.slice(1).map((item: unknown, idx: number) => {
                            const isObj = typeof item === "object" && item !== null;
                            const label = isObj && "label" in item ? String((item as { label: string }).label) : String(item);
                            const link = isObj && "link" in item ? (item as { link?: string }).link : null;
                            const provider = isObj && "provider" in item ? (item as { provider?: string }).provider : null;
                            return (
                              <li key={idx} className="flex items-start gap-4 mb-2 last:mb-0">
                                {!provider || (provider !== "youtube" && provider !== "google") ? (
                                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-500/40" />
                                ) : (
                                  <div className="mt-0.5 shrink-0">
                                    {provider === "google" && (
                                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                      </svg>
                                    )}
                                  </div>
                                )}
                                <div className="flex flex-col gap-1 w-full">
                                  {link ? (
                                    <a href={link} target="_blank" rel="noopener noreferrer"
                                      className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link">
                                      <span>{label}</span>
                                      <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                      </svg>
                                    </a>
                                  ) : (
                                    <span className="text-xs font-medium text-slate-300 leading-normal">{label}</span>
                                  )}
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <ul className="space-y-4 pt-1">
                      {cat.items.map((item: unknown, idx: number) => {
                        const isObj = typeof item === "object" && item !== null;
                        const label = isObj && "label" in item ? String((item as { label: string }).label) : String(item);
                        const link = isObj && "link" in item ? (item as { link?: string }).link : null;
                        const provider = isObj && "provider" in item ? (item as { provider?: string }).provider : null;

                        return (
                          <li key={idx} className="flex items-start gap-4 mb-2 last:mb-0">
                            {!provider || (provider !== "youtube" && provider !== "google") ? (
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-rose-500/40" />
                            ) : (
                              <div className="mt-0.5 shrink-0">
                                {provider === "youtube" && (
                                  <svg className="w-4 h-4 text-red-500 fill-current" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                  </svg>
                                )}
                                {provider === "google" && (
                                  <svg className="w-4 h-4 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                  </svg>
                                )}
                              </div>
                            )}
                            <div className="flex flex-col gap-1 w-full">
                              {link ? (
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-xs font-medium text-slate-300 active:text-white flex items-center justify-between group/link"
                                >
                                  <span>{label}</span>
                                  <svg className="w-3 h-3 opacity-20 group-hover/link:opacity-60 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                                  </svg>
                                </a>
                              ) : (
                                <span className="text-xs font-medium text-slate-300 leading-normal">
                                  {label}
                                </span>
                              )}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-12 mb-20 flex flex-col items-center gap-4 px-6">
        <button
          onClick={() => router.push("/roadmaps/web-hacking")}
          className="w-full max-w-xs py-4 rounded-xl border border-white/10 bg-white/5 font-mono text-xs uppercase tracking-widest text-slate-400 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Web Hacking Roadmap
        </button>
        <button
          onClick={() => router.push("/")}
          className="w-full max-w-xs py-3 font-mono text-[10px] uppercase tracking-[0.3em] text-slate-600 active:text-slate-300 transition-all"
        >
          Go to Homepage
        </button>
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          position: "fixed",
          bottom: "32px",
          right: "24px",
          zIndex: 100,
          width: "48px",
          height: "48px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          background: "rgba(15,23,42,0.8)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "#f8fafc",
          cursor: "pointer",
          opacity: showScrollTop ? 1 : 0,
          visibility: showScrollTop ? "visible" : "hidden",
          transform: showScrollTop ? "translateY(0)" : "translateY(20px)",
          transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}
