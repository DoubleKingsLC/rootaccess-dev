"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 1: Morning Rituals (0.01 - 0.20)
 * GRC Inbox Simulation — Show, don't tell.
 */
export const MorningRitualsScene: React.FC<SceneProps> = ({ progress }) => {
  const startFadeIn = 0.01;
  const fullOpacity = 0.05;
  const startFadeOut = 0.15;
  const endFadeOut = 0.20;

  const isActive = progress >= startFadeIn && progress < endFadeOut;
  
  if (!isActive) return null;

  // Opacity for clean transition
  let opacity = 1;
  if (progress < fullOpacity) {
    opacity = (progress - startFadeIn) / (fullOpacity - startFadeIn);
  } else if (progress > startFadeOut) {
    opacity = Math.max(0, 1 - (progress - startFadeOut) / (endFadeOut - startFadeOut));
  }

  // Normalized progress within the phase for inner animations
  const p = Math.min(1, Math.max(0, (progress - startFadeIn) / (startFadeOut - startFadeIn)));

  const EMAILS = [
    { sender: "System Audit", subject: "ISO 27001: Evidence Needed", time: "08:12 AM", status: "Urgent" },
    { sender: "SRE Team", subject: "Risk Review for Project X", time: "08:24 AM", status: "Priority" },
    { sender: "CISO Office", subject: "Quarterly Compliance Sync", time: "08:45 AM", status: "Meeting" },
    { sender: "Dev Core", subject: "Compensating Controls Question", time: "09:02 AM", status: "Standard" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity }}
    >
      <div className="relative w-full max-w-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Narrative Context (Minimal) */}
          <div className="lg:col-span-4 space-y-6">
             <motion.div
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
                <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">Cycle Start</h2>
                <h3 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4 text-white leading-tight">The <span className="text-teal-400">Inbox</span> Ritual</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm italic border-l-2 border-teal-500/20 pl-4">
                  "A treasure trove of information... prioritizing the silence before the storm."
                </p>
             </motion.div>

             {/* Ambient Coffee Ritual */}
             <div className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 w-fit">
                <div className="relative">
                   <span className="text-3xl">☕</span>
                   <motion.div 
                      className="absolute -top-1 left-2 flex flex-col gap-1"
                      animate={{ y: [0, -10], opacity: [0, 0.5, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                   >
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 blur-sm" />
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-400 blur-sm" />
                   </motion.div>
                </div>
                <div className="flex flex-col">
                   <span className="font-mono text-[9px] uppercase text-slate-500 tracking-widest">Ritual Status</span>
                   <span className="text-[11px] font-bold text-teal-400">OPTIMIZING FOCUS...</span>
                </div>
             </div>
          </div>

          {/* Right: GRC Inbox Simulation */}
          <div className="lg:col-span-8 relative w-full overflow-hidden">
             <motion.div 
               className="w-full bg-slate-950/80 border border-teal-500/20 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl"
               initial={{ y: 50, opacity: 0 }}
               animate={{ y: 0, opacity: 1 }}
               transition={{ duration: 1, ease: "easeOut" }}
             >
                {/* Header UI */}
                <div className="bg-slate-900/80 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                      </div>
                      <span className="ml-4 font-mono text-[9px] text-slate-500 uppercase tracking-widest hidden sm:inline">Corporate Mail // g.analyst@rootaccess.tech</span>
                   </div>
                   <div className="w-24 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div 
                        className="h-full bg-teal-500"
                        style={{ width: `${Math.min(100, p * 100)}%` }}
                      />
                   </div>
                </div>

                {/* Inbox Body */}
                <div className="flex h-[380px]">
                   {/* Sidebar */}
                   <div className="w-40 bg-slate-900/40 border-r border-white/5 p-4 space-y-4 hidden md:block">
                      {["Inbox", "Drafts", "Sent", "Archive"].map((tab, i) => (
                        <div key={tab} className={`flex items-center gap-3 p-2 rounded-lg ${i === 0 ? 'bg-teal-500/10 text-teal-400' : 'text-slate-600'}`}>
                           <div className={`w-3.5 h-3.5 rounded border border-current opacity-40 ${i === 0 ? 'bg-teal-500/20' : ''}`} />
                           <span className="text-[10px] font-bold uppercase tracking-wider">{tab}</span>
                        </div>
                      ))}
                      <div className="mt-8 pt-8 border-t border-white/5">
                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-[0.2em]">Tags</span>
                        <div className="mt-4 space-y-2">
                          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500/50" /><span className="text-[9px] text-slate-500 uppercase">Audit</span></div>
                          <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-teal-500/50" /><span className="text-[9px] text-slate-500 uppercase">Policy</span></div>
                        </div>
                      </div>
                   </div>

                   {/* Email Feed */}
                   <div className="flex-1 overflow-hidden relative bg-slate-950/40">
                      <div className="p-3 space-y-2">
                         {EMAILS.map((mail, i) => {
                           const isCurrentlySelected = i === Math.floor(p * 4.5);
                           return (
                             <motion.div
                               key={i}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.2 + (i * 0.05) }}
                               className={`p-3.5 rounded-xl border transition-all duration-300 ${
                                 isCurrentlySelected 
                                   ? 'border-teal-500/40 bg-teal-500/10 scale-[1.01] shadow-[0_0_20px_rgba(20,184,166,0.05)]' 
                                   : 'border-white/5 bg-white/5'
                               }`}
                             >
                                <div className="flex items-center justify-between gap-4">
                                   <div className="flex items-center gap-3 min-w-0">
                                      <div className={`w-2 h-2 rounded-full shrink-0 ${mail.status === 'Urgent' ? 'bg-red-500 animate-pulse' : 'bg-teal-500/60'}`} />
                                      <div className="flex flex-col min-w-0">
                                         <span className={`text-[9px] font-mono uppercase tracking-wider ${isCurrentlySelected ? 'text-teal-400' : 'text-slate-500'}`}>{mail.sender}</span>
                                         <span className={`text-xs font-bold truncate ${isCurrentlySelected ? 'text-white' : 'text-slate-300'}`}>{mail.subject}</span>
                                      </div>
                                   </div>
                                   <span className="font-mono text-[9px] text-slate-600 shrink-0 uppercase">{mail.time}</span>
                                </div>
                             </motion.div>
                           )
                         })}
                      </div>

                      {/* Mock Reading Pane overlay that pops when you scroll deeply into this phase */}
                      <AnimatePresence>
                        {p > 0.65 && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="absolute inset-4 top-16 bg-slate-900 border border-teal-500/30 rounded-2xl p-6 md:p-8 shadow-4xl flex flex-col gap-5 z-20 backdrop-blur-2xl ring-1 ring-white/10"
                          >
                             <div className="flex justify-between items-start border-b border-white/5 pb-5">
                                <div className="space-y-1">
                                   <div className="flex items-center gap-2">
                                      <div className="w-6 h-6 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-400 text-xs font-bold">SA</div>
                                      <h4 className="text-sm font-bold text-white tracking-wide">ISO 27001 Evidence Needed</h4>
                                   </div>
                                   <p className="text-[10px] font-mono text-slate-500 lowercase ml-8">from: audit.ops@rootaccess.tech // 08:12 AM (2h ago)</p>
                                </div>
                                <span className="bg-red-500/10 text-red-500 text-[8px] px-2 py-0.5 rounded border border-red-500/20 font-black tracking-[0.2em] uppercase">Critical</span>
                             </div>
                             
                             <div className="flex-1 space-y-4">
                               <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                                 "Hi team, we're 48h out from the External Audit. Our portal shows missing evidence for <span className="text-teal-400">Control A.12.1.2</span> (Change Management). We need the last 3 deployment approvals from Staging to keep our certification track green."
                               </p>
                               <div className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                                 <div className="flex items-center gap-3">
                                   <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-lg">📄</div>
                                   <div className="flex flex-col">
                                     <span className="text-[10px] font-bold text-slate-300">audit_checklist.xlsx</span>
                                     <span className="text-[9px] text-slate-600 font-mono">1.2 MB // REQUESTED ITEM</span>
                                   </div>
                                 </div>
                                 <div className="w-6 h-6 rounded-full border border-teal-500/30 flex items-center justify-center text-teal-400">
                                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 10l5 5 5-5M12 15V3m9 14v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2"/></svg>
                                 </div>
                               </div>
                             </div>

                             <div className="flex items-center gap-3 mt-auto pt-4">
                                <div className="h-8 flex-1 rounded-lg bg-teal-500 text-slate-950 font-bold text-[10px] uppercase tracking-widest flex items-center justify-center">Acknowledge</div>
                                <div className="h-8 w-12 rounded-lg border border-white/10 flex items-center justify-center">
                                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="slate-400" strokeWidth="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg>
                                </div>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </div>
             </motion.div>

             {/* Floating UI Decorative Element */}
             <motion.div 
               className="absolute -right-6 -bottom-6 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl -z-10"
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 4, repeat: Infinity }}
             />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
