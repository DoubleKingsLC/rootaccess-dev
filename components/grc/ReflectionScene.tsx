"use client";

import React from "react";
import { motion } from "framer-motion";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 7: Reflection & Planning (0.90 - 1.00)
 * Daily Summary Report Simulation.
 */
export const ReflectionScene: React.FC<SceneProps> = ({ progress }) => {
  const startFadeIn = 0.90;
  const fullOpacity = 0.95;

  const isActive = progress >= 0.88; 
  
  if (!isActive) return null;

  // Normalized phase progress within the transition
  const p = Math.min(1, Math.max(0, (progress - startFadeIn) / (1.0 - startFadeIn)));
  
  // Entrance fade
  const opacity = progress < fullOpacity 
    ? (progress - startFadeIn) / (fullOpacity - startFadeIn) 
    : 1;

  const STATS = [
    { label: "Risks Mitigated", value: 14, icon: "🛡️" },
    { label: "Policies Signed", value: 3, icon: "🖋️" },
    { label: "Incidents Closed", value: 1, icon: "✅" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity }}
    >
       <div className="relative w-full max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
             
             {/* Left: Narrative Focus */}
             <div className="lg:col-span-5 space-y-8">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                >
                   <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">Cycle Complete</h2>
                   <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase leading-none">The <span className="text-teal-400">Impact</span></h3>
                   <p className="text-slate-400 text-sm md:text-base leading-relaxed italic border-l-2 border-teal-500/20 pl-6 max-w-sm">
                     "Ensuring innovation and safety coexist harmoniously... mission complete for today."
                   </p>
                </motion.div>

                {/* Tomorrow's Preview HUD */}
                <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
                   <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-4">
                      <div className="w-2 h-2 rounded-full bg-teal-500/40" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Scheduled for tomorrow</span>
                   </div>
                   {["Evidence sync with SRE", "Remediation sweep", "Q4 Framework Sync"].map((task, i) => (
                      <div key={i} className="flex items-center gap-3">
                         <div className="w-4 h-4 rounded border border-white/10" />
                         <span className="text-[11px] font-medium text-slate-400">{task}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* Right: Summary Report Simulation */}
             <div className="lg:col-span-7 relative flex flex-col items-center">
                <motion.div 
                   className="w-full bg-slate-950 border-2 border-white/5 rounded-3xl p-10 overflow-hidden flex flex-col shadow-4xl h-[500px] relative"
                   initial={{ scale: 0.95, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 1.2 }}
                >
                   {/* Background Emblem */}
                   <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
                      <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                   </div>

                   <div className="relative z-10 flex flex-col h-full">
                      {/* Header UI */}
                      <div className="text-center mb-10 pb-10 border-b border-white/5 space-y-2">
                         <h4 className="text-2xl font-black text-white italic tracking-tighter uppercase underline decoration-teal-500/30 decoration-4 underline-offset-8">Daily Summary Report</h4>
                         <p className="font-mono text-[9px] text-slate-600 uppercase tracking-[0.4em]">Protocol // Analyst 42 // Locked</p>
                      </div>

                      {/* Summary Data Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10 flex-1 content-center">
                         {STATS.map((stat, i) => (
                           <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col items-center gap-2 group hover:bg-teal-500/5 transition-all">
                              <span className="text-2xl mb-1 group-hover:scale-125 transition-transform">{stat.icon}</span>
                              <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500 text-center">{stat.label}</span>
                              <span className="text-4xl font-black text-teal-400 drop-shadow-[0_0_15px_rgba(20,184,166,0.2)]">{stat.value}</span>
                           </div>
                         ))}
                      </div>

                      {/* Farewell Badge overlay */}
                      <div className="bg-teal-500/10 border border-teal-500/20 rounded-2xl p-6 flex items-center justify-between mt-auto">
                         <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-slate-950 font-black text-2xl shadow-[0_0_30px_rgba(20,184,166,0.3)] ring-4 ring-slate-950">
                               🦋
                            </div>
                            <div>
                               <h5 className="text-[11px] font-black text-teal-300 uppercase tracking-widest leading-none">Butterfly Net</h5>
                               <p className="text-[9px] font-mono text-slate-500 mt-1 uppercase tracking-tighter italic whitespace-nowrap">"Ensuring that innovation and safety coexist..."</p>
                            </div>
                         </div>
                         <div className="w-10 h-10 rounded-xl border border-teal-500/30 flex items-center justify-center text-teal-400 group-hover:bg-teal-500/10 cursor-pointer">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 19l7-7-7-7"/></svg>
                         </div>
                      </div>
                   </div>
                </motion.div>
             </div>
          </div>
       </div>

       {/* Floating Background Effects */}
       <motion.div 
         className="absolute -top-40 -left-40 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] -z-10"
         animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
         transition={{ duration: 6, repeat: Infinity }}
       />
       <motion.div 
         className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-500/5 rounded-full blur-[120px] -z-10"
         animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
         transition={{ duration: 6, repeat: Infinity, delay: 3 }}
       />
    </motion.div>
  );
};
