"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 5: Documentation & Ritual (0.60 - 0.80)
 * Evidence Portal & "Lunch Mode" Simulation.
 */
export const DocumentationScene: React.FC<SceneProps> = ({ progress }) => {
  const startFadeIn = 0.60;
  const fullOpacity = 0.65;
  const startFadeOut = 0.75;
  const endFadeOut = 0.80;

  const isActive = progress >= startFadeIn && progress < endFadeOut;
  
  if (!isActive) return null;

  // Opacity calculation for clean transition
  let opacity = 1;
  if (progress < fullOpacity) {
    opacity = (progress - startFadeIn) / (fullOpacity - startFadeIn);
  } else if (progress > startFadeOut) {
    opacity = Math.max(0, 1 - (progress - startFadeOut) / (endFadeOut - startFadeOut));
  }

  // Normalized progress within the phase for inner animations
  const p = Math.min(1, Math.max(0, (progress - startFadeIn) / (startFadeOut - startFadeIn)));

  const FILES = [
    { name: "deployment_approvals_Q4.zip", size: "42.5 MB", status: "Uploaded" },
    { name: "iam_access_policy_audit.pdf", size: "1.2 MB", status: "Signed" },
    { name: "remediation_plan_project_x.docx", size: "840 KB", status: "Pending" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity }}
    >
       <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
             
             {/* Left: Narrative Focus */}
             <div className="lg:col-span-5 flex flex-col gap-8">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                >
                   <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">Evidence Trail</h2>
                   <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase leading-none">The <span className="text-teal-400">Details</span></h3>
                   <p className="text-slate-400 text-sm md:text-base leading-relaxed italic border-l-2 border-teal-500/20 pl-6 max-w-sm">
                     "The devil is in the details... documentation is the foundation of assurance."
                   </p>
                </motion.div>

                {/* Lunch Ritual HUD overlap */}
                <motion.div 
                  className="p-6 rounded-3xl bg-teal-500/5 border border-teal-500/10 flex items-center gap-6"
                  animate={{ opacity: p > 0.7 ? 1 : 0.6 }}
                >
                   <div className="w-16 h-16 rounded-full bg-teal-500/10 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(20,184,166,0.1)]">
                      {p > 0.7 ? '🍜' : '🍳'}
                   </div>
                   <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-teal-500/70 uppercase tracking-widest uppercase">System Status</span>
                      <span className="text-sm font-bold text-teal-400">
                         {p > 0.7 ? 'LUNCH_MODE_ACTIVE' : 'READY_FOR_FUELING'}
                      </span>
                      <div className="mt-2 flex gap-1">
                         {[1, 2, 3].map(i => (
                           <div key={i} className={`h-1 w-4 rounded-full bg-teal-500 transition-opacity ${p > 0.7 ? 'opacity-100' : 'opacity-20'}`} />
                         ))}
                      </div>
                   </div>
                </motion.div>
             </div>

             {/* Right: Evidence Portal simulation */}
             <div className="lg:col-span-7 relative flex flex-col">
                <motion.div 
                   className="flex-1 bg-slate-950 border border-teal-500/20 rounded-3xl overflow-hidden flex flex-col shadow-3xl h-[450px]"
                   initial={{ scale: 0.95, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 1 }}
                >
                   {/* Header UI */}
                   <div className="bg-slate-900 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 text-teal-400">
                               <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
                            </svg>
                         </div>
                         <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Evidence Portal // g.analyst / exports</h4>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-800" /><div className="w-2 h-2 rounded-full bg-slate-800" />
                      </div>
                   </div>

                   {/* File Explorer body */}
                   <div className="flex-1 p-6 space-y-4 bg-slate-950/40 relative">
                      {/* Animated Upload Drag-n-Drop box */}
                      <div className="p-8 border-2 border-dashed border-teal-500/10 rounded-2xl flex flex-col items-center justify-center gap-4 group hover:border-teal-500/30 transition-all cursor-default relative">
                         <div className="w-12 h-12 rounded-full bg-teal-500/5 flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 11V3m0 0L7 8m5-5l5 5M5 19h14a2 2 0 002-2v-2a2 2 0 00-2-2H5a2 2 0 00-2 2v2a2 2 0 002 2z"/></svg>
                         </div>
                         <div className="text-center">
                            <span className="text-[10px] font-black font-mono text-teal-400 uppercase tracking-[0.2em] block mb-1">Drag & Drop Evidence</span>
                            <span className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">Accepted: .zip, .pdf, .docx, .logs</span>
                         </div>
                         
                         {/* Animated File Floating In */}
                         <motion.div 
                           className="absolute -top-10 scale-50 p-4 rounded-xl bg-slate-800 border border-teal-500/30 shadow-2xl flex items-center gap-3 z-10 pointer-events-none"
                           animate={{ y: [0, 80], opacity: [0, 1, 0], scale: [0.5, 0.4, 0.2] }}
                           transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                         >
                            <span className="text-2xl">📄</span>
                            <span className="font-mono text-xs text-white">evidence_sample.logs</span>
                         </motion.div>
                      </div>

                      {/* File List */}
                      <div className="space-y-2">
                         {FILES.map((file, i) => (
                           <motion.div 
                             key={i}
                             initial={{ opacity: 0, x: -10 }}
                             animate={{ opacity: 1, x: 0 }}
                             transition={{ delay: 0.2 + (i * 0.1) }}
                             className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group hover:bg-teal-500/5 transition-colors"
                           >
                              <div className="flex items-center gap-3">
                                 <span className="text-lg opacity-50">📄</span>
                                 <div className="flex flex-col">
                                    <span className="text-[11px] font-bold text-slate-200">{file.name}</span>
                                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">{file.size}</span>
                                 </div>
                              </div>
                              <div className="flex items-center gap-3">
                                 <span className={`text-[9px] font-black font-mono uppercase tracking-widest px-2 py-0.5 rounded border border-white/5 ${file.status === 'Signed' ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/20' : 'text-slate-500 bg-white/5'}`}>
                                    {file.status}
                                 </span>
                                 <div className="w-5 h-5 rounded hover:bg-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M7 10l5 5 5-5M12 15V3m9 14v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2"/></svg>
                                 </div>
                              </div>
                           </motion.div>
                         ))}
                      </div>

                      {/* Digital Signature Overlay simulation */}
                      <AnimatePresence>
                        {p > 0.55 && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="absolute inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-30 p-12"
                          >
                             <div className="w-full max-w-sm bg-slate-900 border border-teal-500/40 rounded-3xl p-8 shadow-4xl flex flex-col gap-6 ring-1 ring-white/10">
                                <div className="text-center space-y-1">
                                   <h5 className="text-sm font-bold text-white tracking-widest uppercase">Digital Signature</h5>
                                   <p className="text-[9px] font-mono text-slate-500 uppercase tracking-[0.2em]">Authenticity Verification Required</p>
                                </div>
                                <div className="h-32 w-full bg-black/60 rounded-2xl border border-white/5 flex items-center justify-center relative overflow-hidden">
                                   <motion.path 
                                      d="M10,80 Q50,20 90,80 T170,80"
                                      fill="none" 
                                      stroke="#14b8a6"
                                      strokeWidth="2"
                                      initial={{ pathLength: 0 }}
                                      animate={{ pathLength: 1 }}
                                      transition={{ duration: 2, ease: "easeInOut" }}
                                   />
                                   {/* Stylized signature strokes */}
                                   <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full p-4 pointer-events-none opacity-60">
                                      <motion.path
                                         d="M30,70 C50,20 80,80 120,40 S160,80 180,30"
                                         fill="none"
                                         stroke="#22d3ee"
                                         strokeWidth="3"
                                         strokeLinecap="round"
                                         initial={{ pathLength: 0 }}
                                         animate={{ pathLength: 1 }}
                                         transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
                                      />
                                   </svg>
                                   <span className="absolute bottom-3 left-6 font-mono text-[8px] text-teal-800 uppercase tracking-widest">Sign here // G. Analyst</span>
                                </div>
                                <div className="flex gap-3">
                                   <div className="flex-1 h-10 rounded-xl bg-teal-500 flex items-center justify-center font-black text-[10px] text-slate-950 uppercase tracking-widest">Authorize</div>
                                   <div className="flex-1 h-10 rounded-xl border border-white/5 text-slate-400 flex items-center justify-center font-bold text-[10px] uppercase tracking-widest">Cancel</div>
                                </div>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Lunch Mode Standby Overlay */}
                      <AnimatePresence>
                        {p > 0.85 && (
                          <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center z-40 text-center gap-6"
                          >
                             <div className="w-20 h-20 rounded-full border-4 border-teal-500/20 flex items-center justify-center relative">
                                <span className="text-4xl animate-bounce">🍜</span>
                                <motion.div 
                                  className="absolute inset-0 border-2 border-teal-500/40 rounded-full"
                                  animate={{ scale: [1, 1.4], opacity: [0.4, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                />
                             </div>
                             <div className="space-y-2">
                                <h4 className="text-xl font-black text-white italic tracking-tighter uppercase">Technician Away</h4>
                                <p className="text-[10px] font-mono text-teal-500/60 uppercase tracking-[0.4em]">Fueling System Protocol 4.2 Active</p>
                             </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                   </div>
                </motion.div>
             </div>
          </div>
       </div>
    </motion.div>
  );
};
