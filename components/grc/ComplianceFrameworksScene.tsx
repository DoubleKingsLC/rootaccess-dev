"use client";

import React from "react";
import { motion } from "framer-motion";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 2: Compliance Frameworks (0.15 - 0.35)
 * Framework Readiness Dashboard simulation.
 */
export const ComplianceFrameworksScene: React.FC<SceneProps> = ({ progress }) => {
  const startFadeIn = 0.15;
  const fullOpacity = 0.20;
  const startFadeOut = 0.30;
  const endFadeOut = 0.35;

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

  const CATEGORIES = [
    { label: "Access Control", status: "94%", count: "12/13", color: "text-teal-400" },
    { label: "Asset Management", status: "100%", count: "8/8", color: "text-emerald-400" },
    { label: "Physical Security", status: "82%", count: "6/7", color: "text-yellow-400" },
    { label: "Encryption", status: "100%", count: "5/5", color: "text-emerald-400" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity }}
    >
      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left: Narrative Focus */}
          <div className="lg:col-span-5 space-y-8">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
                <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">Policy Alignment</h2>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-6">Framework <span className="text-teal-400 text-shadow-glow">Readiness</span></h3>
                <p className="text-slate-400 text-base leading-relaxed border-l-2 border-teal-500/20 pl-6 italic">
                  "Ensuring innovation and compliance coexist... mapping technical excellence to regulatory safety."
                </p>
             </motion.div>

             <div className="grid grid-cols-2 gap-4">
                {["ISO 27001", "SOC 2 Type II"].map((fw, i) => (
                  <motion.div 
                    key={fw}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + (i * 0.1) }}
                    className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col gap-2"
                  >
                     <span className="font-mono text-[9px] uppercase text-slate-500 tracking-widest">Active Audit</span>
                     <span className="text-sm font-bold text-white">{fw}</span>
                     <div className="mt-2 flex items-center gap-2">
                        <div className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden">
                           <motion.div 
                             className="h-full bg-teal-500"
                             style={{ width: i === 0 ? "92%" : "88%" }}
                           />
                        </div>
                        <span className="font-mono text-[10px] text-teal-400">{i === 0 ? "92%" : "88%"}</span>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>

          {/* Right: Detailed Dashboard simulation */}
          <div className="lg:col-span-7 relative">
             <motion.div 
               className="bg-slate-950/40 border-2 border-white/5 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(20,184,166,0.05)]"
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1 }}
             >
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                   <div>
                      <h4 className="text-lg font-bold tracking-tight text-white uppercase">Control Assessment</h4>
                      <p className="font-mono text-[10px] text-slate-500 tracking-widest mt-1 uppercase">Q4_INTERNAL_READINESS_REPORT</p>
                   </div>
                   <div className="text-right">
                      <span className="font-mono text-3xl font-black text-teal-400 tabular-nums">94.2%</span>
                      <p className="font-mono text-[9px] text-teal-500/60 uppercase">Aggregated Score</p>
                   </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {CATEGORIES.map((cat, i) => (
                     <motion.div 
                       key={cat.label}
                       className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4 group hover:bg-teal-500/5 transition-all"
                       whileHover={{ y: -5 }}
                       initial={{ opacity: 0, y: 20 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ delay: 0.2 + (i * 0.1) }}
                     >
                        <div className="flex items-center justify-between">
                           <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                                 {i === 0 && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                                 {i === 1 && <path d="M12 2v20m10-10H2" />}
                                 {i === 2 && <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M13.8 12H3" />}
                                 {i === 3 && <path d="M12 15V3m9 12v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2" />}
                              </svg>
                           </div>
                           <span className={`text-xs font-black font-mono ${cat.color}`}>{cat.status}</span>
                        </div>
                        
                        <div>
                           <div className="flex justify-between items-baseline mb-2">
                             <h5 className="text-[11px] font-bold text-white uppercase tracking-wider">{cat.label}</h5>
                             <span className="text-[9px] font-mono text-slate-500">{cat.count}</span>
                           </div>
                           <div className="h-1 w-full bg-black/40 rounded-full overflow-hidden">
                              <motion.div 
                                className="h-full bg-teal-500"
                                initial={{ width: 0 }}
                                animate={{ width: cat.status }}
                                transition={{ duration: 1.5, delay: 0.5 + (i * 0.1) }}
                              />
                           </div>
                        </div>
                     </motion.div>
                   ))}
                </div>

                {/* Technical Success Map simulation */}
                <div className="mt-8 p-6 rounded-2xl bg-teal-500/5 border border-teal-500/10">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                      <span className="text-[10px] font-mono font-bold text-teal-300 uppercase tracking-widest underline decoration-teal-500/30">Mapping Success Criteria</span>
                   </div>
                   <div className="space-y-3">
                      {[ 
                        { label: "Deployment Approval Evidence", success: p > 0.4 },
                        { label: "IAM Role Multi-Factor Verification", success: p > 0.6 },
                        { label: "Encryption at Rest Enforcement", success: true }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                           <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${item.success ? 'bg-teal-500 border-teal-500 shadow-[0_0_8px_rgba(20,184,166,0.4)]' : 'border-white/20'}`}>
                              {item.success && (
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                                   <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                           </div>
                           <span className={`text-[11px] font-medium transition-colors ${item.success ? 'text-slate-200' : 'text-slate-600 line-through decoration-slate-800'}`}>
                             {item.label}
                           </span>
                        </div>
                      ))}
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .text-shadow-glow {
          text-shadow: 0 0 20px rgba(20,184,166,0.3);
        }
      `}</style>
    </motion.div>
  );
};
