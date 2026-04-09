"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GRCBriefingCard } from "./GRCBriefingCard";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 2: Compliance — overlaps Phase 1 exit + Phase 3 briefing (~0.338 scene end)
 * Dynamic Compliance Portal Simulation bridging from Phase 1.
 */
export const ComplianceFrameworksScene: React.FC<SceneProps> = ({ progress }) => {
  const cardStartFadeIn = 0.182;
  const cardFullOpacity = 0.188;
  const cardStartFadeOut = 0.214;
  const cardEndFadeOut = 0.222;

  const sceneStartFadeIn = 0.222;
  const sceneFullOpacity = 0.232;
  const sceneStartFadeOut = 0.31;
  /** Longer fade-out so Phase 3 briefing can overlap (no blank frame) */
  const sceneEndFadeOut = 0.338;

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

  // Data structure for the interactive Controls list
  const CONTROLS = [
    {
       id: 'phys',
       title: "Physical Security",
       controlId: "A.11",
       alert: "Missing Logs",
       expanded: p >= 0.25 && p < 0.50,
       clickTime: 0.25,
       body: (
         <div className="pt-4 border-t border-slate-700/50 mt-4">
           <div className="flex justify-between items-center text-sm font-mono text-slate-300">
             <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-slate-500"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
                <span>Datacenter Access Logs (Q4)</span>
             </div>
             <span className="text-red-400 font-bold text-[10px] sm:text-xs tracking-widest border border-red-500/30 bg-red-500/10 px-2 py-1 rounded">LACKING EVIDENCE ❌</span>
           </div>
         </div>
       )
    },
    {
       id: 'enc',
       title: "Encryption Configuration",
       controlId: "A.10",
       alert: "Configuration Failed",
       expanded: p >= 0.50 && p < 0.75,
       clickTime: 0.50,
       body: (
         <div className="pt-4 border-t border-slate-700/50 mt-4 space-y-3">
           <div className="flex justify-between items-center text-sm font-mono text-slate-300">
             <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-emerald-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span>Database At-Rest TDE</span>
             </div>
             <span className="text-emerald-400 font-bold text-[10px] sm:text-xs tracking-widest border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">VERIFIED ✓</span>
           </div>
           <div className="flex justify-between items-center text-sm font-mono text-slate-300">
             <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-red-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                <span>Internal Service mTLS</span>
             </div>
             <span className="text-red-400 font-bold text-[10px] sm:text-xs tracking-widest border border-red-500/30 bg-red-500/10 px-2 py-1 rounded">LACKING CONFIG ❌</span>
           </div>
         </div>
       )
    },
    {
       id: 'change',
       title: "Change Management",
       controlId: "A.12",
       alert: "Missing 3 Approvals",
       expanded: p >= 0.75,
       clickTime: 0.75,
       body: (
         <div className="pt-4 border-t border-slate-700/50 mt-4">
           <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-red-500" />
              <div className="flex items-center gap-2 mb-2">
                 <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-red-400"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                 <span className="text-sm font-bold text-red-400 tracking-wider">CRITICAL AUDIT FAILURE</span>
              </div>
              <p className="text-[13px] text-slate-300 mb-4 leading-relaxed">System Audit Ops identified missing Staging pipeline approvals for the last 3 releases. These are strictly required for the ISO 27001 audit.</p>
              <div className="flex items-center gap-4">
                 <button className="bg-red-500 hover:bg-red-400 text-white text-[11px] font-bold px-3 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(239,68,68,0.4)] shadow-red-500/50 flex gap-2 items-center">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    UPLOAD EVIDENCE
                 </button>
                 <span className="text-[10px] font-mono text-slate-500 underline decoration-slate-600">JIRA: TICK-4122</span>
              </div>
           </div>
         </div>
       )
    }
  ];

  return (
    <>
    <GRCBriefingCard 
      phaseNumber={2}
      title="Hunting The Gaps"
      description="You've identified a critical alert in your inbox. Now, you pivot into the root access compliance portal to locate missing staging evidence."
      opacity={cardOpacity}
    />
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-x-hidden overflow-y-hidden p-4 text-white md:p-8 xl:p-12"
      style={{ opacity: sceneOpacity }}
    >
      <div className="relative w-full max-w-[1600px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-16 items-center">
          
          {/* Left: Narrative Context */}
          <div className="lg:col-span-3 space-y-8">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.45 }}
             >
                <h2 className="font-mono text-[10px] uppercase tracking-[0.4em] text-teal-500 mb-3">Audit Readiness</h2>
                <h3 className="text-4xl lg:text-5xl font-black tracking-tight mb-5 leading-[1.1] uppercase">Hunting The <span className="text-teal-400">Gaps</span></h3>
                <div className="w-12 h-1 bg-teal-500/50 mb-6 rounded-full" />
                <p className="text-slate-400 text-sm leading-relaxed border-l-2 border-teal-500/20 pl-4 italic">
                  "It's never a clean sweep. It's about finding the missing pieces before the external auditors do."
                </p>
             </motion.div>

             {/* Audit Context Bubble */}
             <div className="p-5 rounded-2xl bg-white/5 border border-white/10 w-fit backdrop-blur-sm">
                <span className="font-mono text-[9px] uppercase text-slate-500 tracking-[0.2em] mb-2 block">Active Assessment</span>
                <span className="text-sm font-black tracking-wide text-white flex items-center gap-2 mb-2">
                   ISO 27001 SURVEILLANCE
                </span>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mt-3">
                   <div className="h-full bg-teal-500 w-[92%]" />
                </div>
                <div className="flex justify-between items-center mt-2">
                   <span className="text-[10px] text-slate-400">92% Mapping complete</span>
                   <span className="text-[10px] font-bold text-red-400">3 Lacking</span>
                </div>
             </div>
          </div>

          {/* Right: Security Command Center Portal Simulator */}
          <div className="relative w-full min-h-0 overflow-hidden lg:col-span-9">
             <motion.div 
               className="flex min-h-0 w-full max-w-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-700/50 bg-[#0f151e] shadow-4xl ring-1 ring-white/5 backdrop-blur-2xl"
               initial={{ y: 50, opacity: 0, scale: 0.98 }}
               animate={{ y: 0, opacity: 1, scale: 1 }}
               transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
             >
                {/* App Header */}
                <div className="bg-[#151c26] px-5 py-4 border-b border-white/5 flex items-center justify-between gap-6 relative z-30">
                   <div className="flex items-center gap-6">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-slate-700 cursor-default" />
                        <div className="w-3 h-3 rounded-full bg-slate-700 cursor-default" />
                        <div className="w-3 h-3 rounded-full bg-slate-700 cursor-default" />
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded bg-teal-500/20 flex items-center justify-center text-teal-400">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                        </div>
                        <span className="font-bold text-white tracking-wide text-sm font-mono uppercase">RootAccess CmdCtr // Audits</span>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
                      <div className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                      <span className="text-[10px] font-bold tracking-widest uppercase">Action Required</span>
                   </div>
                </div>

                <div className="relative flex h-[clamp(22rem,58vh,40rem)] min-h-0 flex-1">
                   {/* Sidebar */}
                   <div className="hidden w-64 min-h-0 shrink-0 flex-col border-r border-white/5 bg-[#121820]/80 p-5 md:flex">
                      <div className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Frameworks</div>
                      <div className="space-y-2">
                         <div className="px-3 py-2.5 rounded-lg bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-between">
                            <span className="text-sm font-bold">ISO 27001</span>
                            <span className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-[9px] font-bold text-white">3</span>
                         </div>
                         <div className="px-3 py-2.5 rounded-lg text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors cursor-default">
                            <span className="text-sm font-medium">SOC 2 Type II</span>
                         </div>
                         <div className="px-3 py-2.5 rounded-lg text-slate-400 hover:bg-white/5 hover:text-slate-200 transition-colors cursor-default">
                            <span className="text-sm font-medium">GDPR Privacy</span>
                         </div>
                      </div>
                   </div>

                   {/* Main Content Area */}
                   <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#0a0e14] p-6 lg:p-8">
                      <div className="flex justify-between items-end mb-4 border-b border-slate-800 pb-4">
                         <div>
                            <h4 className="text-xs uppercase font-bold text-slate-500 tracking-widest mb-1">Active Readiness Assessment</h4>
                            <h1 className="text-2xl font-black text-white">ISO 27001 Control Mapping</h1>
                         </div>
                         <div className="text-right">
                            <div className="text-3xl font-black text-teal-400">92.4%</div>
                            <div className="text-[10px] uppercase text-slate-500 tracking-widest font-bold">Passing Evidence</div>
                         </div>
                      </div>

                      {/* Interactive Controls Accordion List — stable gutter + overscroll contain reduces page scrollbar flicker */}
                      <div className="compliance-controls-scroll min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-y-contain pb-6 pr-2 [scrollbar-gutter:stable]">
                         {CONTROLS.map((control, i) => {
                            const isExpanded = control.expanded;
                            const isBeforeClickTime = p < control.clickTime;
                            const isClickMoment = p >= control.clickTime && p <= control.clickTime + 0.05;

                            return (
                              <div 
                                key={control.id} 
                                className={`relative rounded-xl border transition-all duration-300 ${isExpanded ? 'bg-white/[0.04] border-slate-600 shadow-xl' : 'bg-transparent border-white/5'}`}
                              >
                                 <div className="p-4 flex items-center justify-between relative z-10">
                                    <div className="flex min-w-0 items-center gap-3 sm:gap-4">
                                       <div className={`flex h-9 min-w-[2.35rem] shrink-0 items-center justify-center rounded-lg px-1.5 font-mono text-[10px] font-bold leading-none tracking-tight sm:h-10 sm:min-w-[2.5rem] sm:text-[11px] ${isExpanded ? 'bg-teal-500/20 text-teal-400' : 'bg-slate-800 text-slate-400'}`}>
                                          {control.controlId}
                                       </div>
                                       <span className={`text-base font-bold ${isExpanded ? 'text-white' : 'text-slate-300'}`}>{control.title}</span>
                                    </div>
                                    <div className="flex items-center gap-6">
                                       <span className="text-xs font-bold text-red-500 tracking-widest uppercase hidden sm:block">{control.alert}</span>
                                       <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"/></svg>
                                    </div>
                                    
                                    {/* Mouse Pointer Logic inside the header for precision hitting */}
                                    <AnimatePresence>
                                       {isBeforeClickTime && p > control.clickTime - 0.06 && (
                                         <motion.div
                                           initial={{ x: 50, y: 50, opacity: 0 }}
                                           animate={{ x: 0, y: 0, opacity: 1, scale: isClickMoment ? 0.8 : 1 }}
                                           exit={{ opacity: 0, scale: 1.2 }}
                                           transition={{ duration: 0.16 }}
                                           className="absolute top-1/2 right-4 -translate-y-1/2 z-20 pointer-events-none drop-shadow-2xl"
                                         >
                                           <svg width="28" height="28" viewBox="0 0 24 24" fill="white" stroke="black" strokeWidth="1" strokeLinejoin="round"><path d="M4 2l6.5 19 3.5-7.5 7.5-3.5L4 2z"/></svg>
                                           {isClickMoment && (
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
                                 </div>
                                 
                                 <AnimatePresence>
                                    {isExpanded && (
                                       <motion.div 
                                         initial={{ height: 0, opacity: 0 }}
                                         animate={{ height: "auto", opacity: 1 }}
                                         exit={{ height: 0, opacity: 0, transition: { duration: 0.16 } }}
                                         className="overflow-hidden"
                                       >
                                          <div className="px-4 pb-4">
                                            {control.body}
                                          </div>
                                       </motion.div>
                                    )}
                                 </AnimatePresence>
                              </div>
                            )
                         })}
                      </div>
                   </div>
                </div>
             </motion.div>

             {/* Floating UI Decorative Element */}
             <motion.div 
               className="absolute -right-10 -top-10 w-64 h-64 bg-teal-500/10 rounded-full blur-[80px] -z-10"
               animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
               transition={{ duration: 2.8, repeat: Infinity }}
             />
          </div>
        </div>
      </div>
      <style>{`
        .compliance-controls-scroll::-webkit-scrollbar { width: 6px; }
        .compliance-controls-scroll::-webkit-scrollbar-track { background: transparent; }
        .compliance-controls-scroll::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 4px; }
        .compliance-controls-scroll { scrollbar-width: thin; scrollbar-color: rgba(255,255,255,0.15) transparent; }
      `}</style>
    </motion.div>
    </>
  );
};
