"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GRCBriefingCard } from "./GRCBriefingCard";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 1: Morning Rituals (~0.01 - ~0.198, overlaps Phase 2 briefing)
 * GRC Inbox Simulation — Show, don't tell.
 */
export const MorningRitualsScene: React.FC<SceneProps> = ({ progress }) => {
  const cardStartFadeIn = 0.01;
  const cardFullOpacity = 0.02;
  const cardStartFadeOut = 0.062;
  const cardEndFadeOut = 0.072;

  /** Simulator fades in the same scroll instant the briefing card hits 0 (no dead air) */
  const sceneStartFadeIn = 0.072;
  const sceneFullOpacity = 0.08;
  const sceneStartFadeOut = 0.18;
  /** Slightly longer tail so Phase 2 briefing can crossfade in */
  const sceneEndFadeOut = 0.198;

  const isActive = progress >= cardStartFadeIn && progress < sceneEndFadeOut;
  
  if (!isActive) return null;

  // Card Opacity
  let cardOpacity = 0;
  if (progress >= cardStartFadeIn && progress <= cardEndFadeOut) {
    if (progress < cardFullOpacity) cardOpacity = (progress - cardStartFadeIn) / (cardFullOpacity - cardStartFadeIn);
    else if (progress > cardStartFadeOut) cardOpacity = Math.max(0, 1 - (progress - cardStartFadeOut) / (cardEndFadeOut - cardStartFadeOut));
    else cardOpacity = 1;
  }

  // Scene Opacity
  let sceneOpacity = 0;
  if (progress >= sceneStartFadeIn && progress <= sceneEndFadeOut) {
    if (progress < sceneFullOpacity) sceneOpacity = (progress - sceneStartFadeIn) / (sceneFullOpacity - sceneStartFadeIn);
    else if (progress > sceneStartFadeOut) sceneOpacity = Math.max(0, 1 - (progress - sceneStartFadeOut) / (sceneEndFadeOut - sceneStartFadeOut));
    else sceneOpacity = 1;
  }

  // Normalized progress within the visible scene window
  const p = Math.min(1, Math.max(0, (progress - sceneStartFadeIn) / (sceneStartFadeOut - sceneStartFadeIn)));

  const EMAILS = [
    { sender: "System Audit Ops", subject: "ISO 27001: Evidence Needed", preview: "Hi team, we're 48h out from the External Audit. Our portal shows missing...", time: "08:12 AM", status: "Urgent", read: false },
    { sender: "SRE Team Lead", subject: "Risk Review for Project X", preview: "Attached is the architecture diagram for the new staging environment...", time: "08:24 AM", status: "Priority", read: false },
    { sender: "CISO Office", subject: "Quarterly Compliance Sync", preview: "Please review the agenda before our sync at 11 AM today...", time: "08:45 AM", status: "Meeting", read: true },
    { sender: "Dev Core (m.torres)", subject: "Compensating Controls Question", preview: "Can we use an IP allowlist instead of full mTLS for the internal service?", time: "09:02 AM", status: "Standard", read: true },
    { sender: "Automated Scanner", subject: "Weekly Vulnerability Report", preview: "Scan complete. 3 High, 12 Medium, 42 Low vulnerabilities found...", time: "Yesterday", status: "Report", read: true },
  ];

  // Browser Sequence derived states
  const isTypingPeriod = p < 0.25;
  const targetUrl = "mail.rootaccess.tech/inbox";
  const typedUrl = p < 0.20 
    ? targetUrl.slice(0, Math.floor((p / 0.20) * targetUrl.length))
    : targetUrl;
    
  // Reading Pane Logic
  let activeReadingPaneIndex = -1;
  if (p > 0.78) activeReadingPaneIndex = 0;
  else if (p > 0.59 && p <= 0.69) activeReadingPaneIndex = 1;
  else if (p > 0.42 && p <= 0.52) activeReadingPaneIndex = 2;

  const isReadingPaneOpen = activeReadingPaneIndex !== -1;

  // Active Pane Content map
  const renderPaneBody = (index: number) => {
     if (index === 0) {
        return (
          <>
            <p className="text-sm text-slate-300">Hi team,</p>
            <p className="text-sm text-slate-300">We need the last 3 deployment approvals from Staging for the upcoming External Audit. Please link them here.</p>
            <p className="text-sm text-slate-300">Thanks.</p>
            {/* Attachment Card */}
            <div className="mt-3 flex w-full max-w-sm items-center justify-between rounded-lg border border-white/10 bg-black/30 p-2.5 transition-colors group-hover:bg-black/50 sm:mt-4 sm:rounded-xl sm:p-3">
              <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 sm:h-10 sm:w-10">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 sm:h-5 sm:w-5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div className="min-w-0 flex flex-col">
                  <span className="truncate text-xs font-semibold text-slate-200 sm:text-sm">audit_checklist.pdf</span>
                  <span className="text-[10px] text-slate-500 sm:text-[11px]">1.2 MB</span>
                </div>
              </div>
              <div className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors group-hover:text-white">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
              </div>
            </div>
          </>
        );
     }
     if (index === 1) {
       return (
          <>
            <p className="text-sm text-slate-300">Hey folks,</p>
            <p className="text-sm text-slate-300">Architecture diagram for Project X is attached. The new staging env bypasses the WAF for internal telemetry tracking. Is this an acceptable risk?</p>
            <p className="text-sm text-slate-300">Need compliance sign-off by EOD.</p>
          </>
       );
     }
     if (index === 2) {
       return (
          <>
            <p className="text-sm text-slate-300">Friendly reminder:</p>
            <p className="text-sm text-slate-300">Our quarterly compliance sync is scheduled at 11 AM today. Please review the updated SOC 2 matrices before joining the call.</p>
            <p className="text-sm text-slate-300">Best, CISO Office.</p>
          </>
       );
     }
     return null;
  };

  const getPaneDetails = (index: number) => {
     if (index === 0) return { title: "ISO 27001: Evidence Needed", initials: "SA", email: "audit.ops@rootaccess.tech", time: "08:12 AM" };
     if (index === 1) return { title: "Risk Review for Project X", initials: "SR", email: "sre.lead@rootaccess.tech", time: "08:24 AM" };
     return { title: "Quarterly Compliance Sync", initials: "CI", email: "ciso.office@rootaccess.tech", time: "08:45 AM" };
  };

  return (
    <>
    <GRCBriefingCard 
      phaseNumber={1}
      title="The Inbox Ritual"
      description="Sifting through the morning noise to find the signals. You are checking priority emails before the standups begin."
      opacity={cardOpacity}
    />
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 xl:p-12 text-white overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
      <div className="relative w-full max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          
          {/* Left: Narrative Context (Pushed left, narrower) */}
          <div className="lg:col-span-3 space-y-8">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.45 }}
             >
                <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-500 mb-3">Cycle Start</h2>
                <h3 className="text-4xl lg:text-5xl font-black tracking-tight mb-5 text-white leading-[1.1] uppercase">The <span className="text-teal-400">Inbox</span><br/> Ritual</h3>
                <div className="w-12 h-1 bg-teal-500/50 mb-6 rounded-full" />
                <p className="text-slate-400 text-sm leading-relaxed italic border-l-2 border-teal-500/20 pl-4">
                  "A treasure trove of information... prioritizing the silence before the storm."
                </p>
             </motion.div>

             {/* Ambient Coffee Ritual */}
             <div className="flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 w-fit shrink-0 backdrop-blur-sm">
                <div className="relative">
                   <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center border border-teal-500/20">
                     <span className="text-2xl">☕</span>
                   </div>
                   <motion.div 
                      className="absolute -top-2 left-3 flex flex-col gap-1.5"
                      animate={{ y: [0, -15], opacity: [0, 0.6, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                   >
                      <div className="w-2 h-2 rounded-full bg-slate-300 blur-[2px]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-300 blur-[2px] ml-1" />
                   </motion.div>
                </div>
                <div className="flex flex-col">
                   <span className="font-mono text-[9px] uppercase text-slate-500 tracking-[0.2em] mb-0.5">Ritual Status</span>
                   <span className="text-xs font-black tracking-wide text-teal-400 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
                     OPTIMIZING FOCUS
                   </span>
                </div>
             </div>
          </div>

          {/* Right: Modern GRC Browser Simulation (Wider) */}
          <div className="relative w-full min-h-0 overflow-hidden lg:col-span-9">
             <motion.div 
               className="flex min-h-0 w-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-700/50 bg-[#0f151e] shadow-4xl ring-1 ring-white/5 backdrop-blur-2xl"
               initial={{ y: 50, opacity: 0, scale: 0.98 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
             >
                {/* Browser App Header UI */}
                <div className="bg-[#151c26] px-4 py-3 border-b border-white/5 flex items-center justify-between gap-6 relative z-30">
                   {/* Left: Window Controls */}
                   <div className="flex items-center gap-6 shrink-0">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-400 cursor-pointer transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-400 cursor-pointer transition-colors" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-400 cursor-pointer transition-colors" />
                      </div>
                      <div className="flex items-center gap-3 hidden sm:flex">
                        <div className="w-6 h-6 rounded flex items-center justify-center">
                          {isTypingPeriod ? (
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-slate-400"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                          ) : (
                            <div className="w-full h-full bg-teal-500/20 rounded text-teal-400 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
                            </div>
                          )}
                        </div>
                        <span className="font-semibold text-slate-300 tracking-wide text-sm">{isTypingPeriod ? "New Tab" : "Corporate Mail"}</span>
                      </div>
                   </div>

                   {/* Center: Search / Browser URL Bar */}
                   <div className="flex-1 max-w-2xl px-4 hidden md:block">
                      <div className="w-full bg-black/40 border border-white/5 hover:border-white/10 transition-colors rounded-xl flex items-center px-4 h-10 gap-3 relative overflow-hidden">
                         {isTypingPeriod ? (
                            <>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                              <div className="font-mono text-[12px] flex items-center">
                                 <span className="text-white">https://</span>
                                 <span className="text-slate-300">{typedUrl}</span>
                                 {p < 0.20 && <span className="w-1.5 h-4 bg-teal-400 ml-0.5 animate-pulse" />}
                              </div>
                              {/* progress bar executing search at p=0.20 to 0.25 */}
                              {p >= 0.20 && (
                                <motion.div 
                                  initial={{ width: 0 }} 
                                  animate={{ width: "100%" }} 
                                  transition={{ duration: 0.35 }} 
                                  className="absolute bottom-0 left-0 h-0.5 bg-teal-500" 
                                />
                              )}
                            </>
                         ) : (
                            <>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                              <span className="font-mono text-[11px] text-slate-500 placeholder">Search mail, audits, and compliance...</span>
                            </>
                         )}
                      </div>
                   </div>

                   {/* Right: User Profile */}
                   <div className="flex items-center gap-4 shrink-0">
                      <div className="w-12 h-1.5 rounded-full bg-white/5 overflow-hidden hidden md:block">
                         <motion.div className="h-full bg-teal-500" style={{ width: `${Math.min(100, Math.max(0, (p - 0.25) / 0.75) * 100)}%` }} />
                      </div>
                      <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold text-slate-300 transition-colors duration-300 ${isTypingPeriod ? 'bg-slate-800/20' : 'bg-slate-800'}`}>
                        {isTypingPeriod ? "?" : "GA"}
                      </div>
                   </div>
                </div>

                {/* Body Component Switcher — min height avoids loading spinner clipping on short viewports */}
                <div className="relative flex h-[clamp(26rem,62vh,42rem)] min-h-0 shrink-0 flex-col">
                   {isTypingPeriod ? (
                      <div className="flex min-h-[14rem] flex-1 flex-col items-center justify-center bg-[#0f151e] px-4 py-10 sm:min-h-[16rem] sm:py-12">
                         <motion.div 
                           className="h-12 w-12 shrink-0 rounded-full border-4 border-slate-800 border-t-teal-500 animate-spin"
                           initial={{ opacity: 0 }}
                           animate={{ opacity: p > 0.18 ? 1 : 0 }} 
                         />
                      </div>
                   ) : (
                      <div className="flex min-h-0 flex-1">
                         {/* Modern Sidebar */}
                         <div className="hidden w-56 min-h-0 shrink-0 flex-col space-y-6 border-r border-white/5 bg-[#121820]/80 p-4 md:flex">
                            <div className="h-12 w-full rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center gap-3 cursor-default hover:bg-teal-500/20 transition-colors group">
                               <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-teal-400 group-hover:scale-110 transition-transform"><path d="M12 5v14M5 12h14"/></svg>
                               <span className="font-bold text-teal-400 tracking-wide text-sm">Compose</span>
                            </div>

                            <div className="space-y-1">
                              {["Inbox", "Starred", "Snoozed", "Sent", "Drafts"].map((tab, i) => (
                                <div key={tab} className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-default transition-colors ${i === 0 ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:bg-white/5 hover:text-slate-300'}`}>
                                   <div className="flex items-center gap-4">
                                     <svg viewBox="0 0 24 24" fill={i === 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth={i === 0 ? "0" : "2"} className={`w-4 h-4 ${i === 0 ? 'text-teal-400' : ''}`}>
                                        {i === 0 && <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 12l-4-4h3V7h2v4h3l-4 4z"/>}
                                        {i === 1 && <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>}
                                        {i === 2 && <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>}
                                        {i === 3 && <><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></>}
                                        {i === 4 && <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></>}
                                     </svg>
                                     <span className="text-sm tracking-wide">{tab}</span>
                                   </div>
                                   {i === 0 && <span className="text-xs font-bold text-teal-400">2</span>}
                                </div>
                              ))}
                            </div>

                            <div className="mt-auto pt-6 border-t border-white/5">
                              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.1em] px-3">Labels</span>
                              <div className="mt-3 space-y-1">
                                <div className="flex items-center gap-3 px-3 py-2 text-slate-400"><div className="w-2.5 h-2.5 rounded-full bg-red-500/80" /><span className="text-sm">Audit Findings</span></div>
                                <div className="flex items-center gap-3 px-3 py-2 text-slate-400"><div className="w-2.5 h-2.5 rounded-full bg-teal-500/80" /><span className="text-sm">Policy Updates</span></div>
                                <div className="flex items-center gap-3 px-3 py-2 text-slate-400"><div className="w-2.5 h-2.5 rounded-full bg-indigo-500/80" /><span className="text-sm">Vendor Risk</span></div>
                              </div>
                            </div>
                         </div>

                         {/* Email Feed */}
                         <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[#0f151e]">
                            {/* Sub-header */}
                            <div className="sticky top-0 bg-[#0f151e]/90 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center justify-between z-10">
                               <div className="flex items-center gap-4">
                                  <div className="w-4 h-4 rounded border border-slate-600 ml-1" />
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-400"><polyline points="21 8 21 21 3 21 3 8"/><rect x="1" y="3" width="22" height="5"/><line x1="10" y1="12" x2="14" y2="12"/></svg>
                                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-400"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/><polyline points="12 7 12 11 16 11"/></svg>
                               </div>
                               <span className="text-xs text-slate-500 font-medium">1-5 of 124</span>
                            </div>

                            <div className="min-h-0 flex-1 divide-y divide-slate-800/50 overflow-y-auto">
                               {EMAILS.map((mail, i) => {
                                 const isHoveredEmail2 = i === 2 && p > 0.35 && p <= 0.42;
                                 const isHoveredEmail1 = i === 1 && p > 0.52 && p <= 0.59;
                                 const isHoveredEmail0 = i === 0 && p > 0.69 && p <= 0.78;
                                 
                                 const isHoveredState = isHoveredEmail2 || isHoveredEmail1 || isHoveredEmail0;
                                 
                                 const showPointer = isHoveredEmail2 || isHoveredEmail1 || isHoveredEmail0;
                                 const doClick = (i === 2 && p > 0.40 && p <= 0.42) || 
                                                 (i === 1 && p > 0.57 && p <= 0.59) || 
                                                 (i === 0 && p > 0.74 && p <= 0.78);
                                 
                                 return (
                                   <motion.div
                                     key={i}
                                     initial={{ opacity: 0, x: -20 }}
                                     animate={{ opacity: 1, x: 0 }}
                                     transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
                                     className={`relative flex items-center gap-4 border-l-4 px-4 py-3.5 transition-all duration-200 cursor-default ${
                                       isHoveredState 
                                         ? 'bg-teal-500/10 border-teal-500 shadow-[inset_0_1px_0_rgba(20,184,166,0.1),inset_0_-1px_0_rgba(20,184,166,0.1)]' 
                                         : 'bg-transparent border-transparent hover:bg-white-[0.02]'
                                     }`}
                                   >
                                      {/* Animated Pointer relative to the row itself */}
                                      <AnimatePresence>
                                        {showPointer && (
                                          <motion.div
                                            initial={{ x: 40, y: 40, opacity: 0 }}
                                            animate={{ x: 0, y: 0, opacity: 1, scale: doClick ? 0.8 : 1 }}
                                            exit={{ opacity: 0, scale: 1.2 }}
                                            transition={{ duration: 0.2 }}
                                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none drop-shadow-2xl"
                                          >
                                            <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1" strokeLinejoin="round"><path d="M4 2l6.5 19 3.5-7.5 7.5-3.5L4 2z"/></svg>
                                            {doClick && (
                                               <motion.div 
                                                 initial={{ scale: 0, opacity: 0.8 }} 
                                                 animate={{ scale: 2, opacity: 0 }} 
                                                 transition={{ duration: 0.3 }} 
                                                 className="absolute -top-3 -left-3 w-8 h-8 rounded-full border-2 border-teal-400 bg-teal-400/20" 
                                               />
                                            )}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>

                                      <div className="flex items-center gap-3 shrink-0">
                                         <div className="w-4 h-4 rounded border border-slate-600 hidden sm:block" />
                                         <svg viewBox="0 0 24 24" fill={mail.read ? "none" : "currentColor"} stroke="currentColor" strokeWidth="2" className={`w-4 h-4 ${mail.read ? 'text-slate-600' : 'text-slate-400'}`}>
                                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                                         </svg>
                                      </div>
                                      <div className={`w-48 shrink-0 truncate text-sm ${!mail.read ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>
                                         {mail.sender}
                                      </div>
                                      <div className="flex-1 min-w-0 pr-4 flex items-center">
                                         <span className={`truncate text-sm mr-2 ${!mail.read ? 'font-bold text-teal-50' : 'text-slate-300'}`}>
                                           {mail.subject}
                                         </span>
                                         <span className="text-slate-500 text-sm truncate hidden lg:inline">
                                           - {mail.preview}
                                         </span>
                                      </div>
                                      <div className={`w-20 text-right shrink-0 text-xs font-medium ${!mail.read ? 'text-teal-400' : 'text-slate-500'}`}>
                                         {mail.time}
                                      </div>
                                   </motion.div>
                                 )
                               })}
                            </div>

                            {/* Expanded "Reading Pane" simulation */}
                            <AnimatePresence>
                              {isReadingPaneOpen && activeReadingPaneIndex !== -1 && (
                                <motion.div 
                                  key={`pane-${activeReadingPaneIndex}`}
                                  initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                  animate={{ opacity: 1, scale: 1, y: 0 }}
                                  exit={{ opacity: 0, scale: 0.98, y: 10 }}
                                  transition={{ type: "spring", bounce: 0, duration: 0.38 }}
                                  className="absolute inset-x-2 top-12 bottom-2 z-20 flex min-h-0 flex-col gap-3 rounded-2xl border border-slate-600/50 bg-[#1e2430] p-4 shadow-2xl sm:inset-x-3 sm:top-14 sm:bottom-3 md:p-5"
                                >
                                   {/* Pane Header */}
                                   <div className="shrink-0 border-b border-slate-700/50 pb-3">
                                      <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 space-y-2">
                                         <h4 className="text-base font-bold tracking-wide text-white sm:text-lg md:text-xl">{getPaneDetails(activeReadingPaneIndex).title}</h4>
                                         <div className="flex items-center gap-2 sm:gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/20 text-sm font-bold text-teal-400 sm:h-10 sm:w-10">
                                              {getPaneDetails(activeReadingPaneIndex).initials}
                                            </div>
                                            <div className="min-w-0 flex flex-col">
                                               <span className="text-xs font-bold text-white sm:text-sm">{EMAILS[activeReadingPaneIndex].sender} <span className="font-normal text-slate-500">&lt;{getPaneDetails(activeReadingPaneIndex).email}&gt;</span></span>
                                               <span className="text-[10px] text-slate-500 sm:text-[11px]">to me, compliance-team</span>
                                            </div>
                                         </div>
                                        </div>
                                      <div className="flex shrink-0 flex-col items-end gap-1.5 text-right">
                                        <span className="text-[10px] text-slate-400 sm:text-xs">{getPaneDetails(activeReadingPaneIndex).time} (today)</span>
                                        <div className="flex gap-1.5">
                                          <div className="rounded p-1 text-slate-400 hover:bg-white/10"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 sm:h-4 sm:w-4"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg></div>
                                          <div className="rounded p-1 text-slate-400 hover:bg-white/10"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5 sm:h-4 sm:w-4"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg></div>
                                        </div>
                                      </div>
                                      </div>
                                   </div>
                                   
                                   {/* Pane Body — scrolls when viewport is short */}
                                   <div className="min-h-0 flex-1 space-y-3 overflow-y-auto pr-1 custom-scrollbar">
                                     {renderPaneBody(activeReadingPaneIndex)}
                                   </div>

                                   {/* Pane Actions */}
                                   <div className="flex shrink-0 items-center gap-2 pt-1 sm:gap-3 sm:pt-2">
                                      <div className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-slate-600 bg-slate-700 px-4 text-[12px] font-medium text-white transition-colors hover:bg-slate-600 sm:h-10 sm:px-5 sm:text-[13px]">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
                                        Reply
                                      </div>
                                      <div className="flex h-9 cursor-pointer items-center gap-2 rounded-full border border-slate-600 bg-slate-700 px-4 text-[12px] font-medium text-white transition-colors hover:bg-slate-600 sm:h-10 sm:px-5 sm:text-[13px]">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
                                        Forward
                                      </div>
                                   </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                         </div>
                      </div>
                   )}
                </div>
             </motion.div>

             {/* Floating UI Decorative Element */}
             <motion.div 
               className="absolute -right-10 -bottom-10 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10"
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 2.8, repeat: Infinity }}
             />
          </div>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
      `}</style>
    </motion.div>
    </>
  );
};
