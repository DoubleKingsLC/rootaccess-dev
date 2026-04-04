"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 3: Risk Assessment (0.30 - 0.50)
 * Live Code Scanner & Risk Lab simulation.
 */
export const RiskAssessmentScene: React.FC<SceneProps> = ({ progress }) => {
  const startFadeIn = 0.30;
  const fullOpacity = 0.35;
  const startFadeOut = 0.45;
  const endFadeOut = 0.50;

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

  const VULNERABILITIES = [
    { id: "CVE-2024-1283", label: "SQL Injection", severity: "CRITICAL", color: "text-red-500" },
    { id: "CVE-2024-5591", label: "Broken Access Control", severity: "HIGH", color: "text-orange-500" },
    { id: "CVE-2023-8821", label: "Cleartext Storage", severity: "MEDIUM", color: "text-yellow-500" }
  ];

  const codeSnippets = [
    { line: 1, content: "async function handleAuth(req, res) {", color: "text-slate-400" },
    { line: 2, content: "  const query = `SELECT * FROM users WHERE id = ${req.body.id}`;", color: "text-red-400 font-bold", vul: true },
    { line: 3, content: "  const user = await db.execute(query);", color: "text-slate-400" },
    { line: 4, content: "  if (user) {", color: "text-slate-400" },
    { line: 5, content: "    session.start(user.id);", color: "text-slate-400" },
    { line: 6, content: "  }", color: "text-slate-400" },
    { line: 7, content: "}", color: "text-slate-400" }
  ];

  const remediatedLine = "  const user = await db.users.findUnique({ where: { id: req.body.id } });";

  const isRemediated = p > 0.6;

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity }}
    >
       <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
             
             {/* Left: Scanner HUD */}
             <div className="lg:col-span-5 flex flex-col gap-6">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                >
                   <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">Threat Intelligence</h2>
                   <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase leading-none">Risk <span className="text-teal-400">Lab</span></h3>
                   <p className="text-slate-400 text-sm italic border-l-2 border-teal-500/20 pl-4 mb-8">
                     "Balancing innovation and risk... identifying the cracks in the armor."
                   </p>
                </motion.div>

                {/* Risk Matrix HUD */}
                <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-6">
                   <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Risk Severity Matrix</span>
                      <div className="flex gap-2">
                         <div className="w-2 h-2 rounded-full bg-red-500" />
                         <div className="w-2 h-2 rounded-full bg-orange-500" />
                         <div className="w-2 h-2 rounded-full bg-yellow-500" />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-5 gap-1 aspect-square md:aspect-video bg-black/40 p-2 rounded-lg border border-white/5">
                      {Array.from({ length: 15 }).map((_, i) => (
                        <div key={i} className={`rounded-sm transition-colors duration-500 ${
                          i === 0 ? 'bg-red-500/40 shadow-[0_0_10px_red]' : 
                          i < 3 ? 'bg-orange-500/20' : 
                          i < 6 ? 'bg-yellow-500/10' : 'bg-teal-500/5'
                        }`} />
                      ))}
                      <motion.div 
                        className="col-span-full mt-2 h-px bg-teal-500/20 relative"
                        animate={{ y: [0, 80, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      />
                   </div>

                   <div className="space-y-3">
                      {VULNERABILITIES.map((v, i) => (
                        <motion.div 
                          key={v.id}
                          className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                        >
                           <div className="flex flex-col">
                              <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">{v.id}</span>
                              <span className="text-xs font-bold">{v.label}</span>
                           </div>
                           <span className={`font-mono text-[9px] font-black tracking-widest px-2 py-1 rounded bg-black/40 border border-white/5 ${v.color}`}>
                              {v.severity}
                           </span>
                        </motion.div>
                      ))}
                   </div>
                </div>
             </div>

             {/* Right: Code Scanner Simulator */}
             <div className="lg:col-span-7 relative flex flex-col">
                <motion.div 
                   className="flex-1 bg-slate-950 border border-teal-500/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
                   initial={{ scale: 0.95, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 1 }}
                >
                   {/* Terminal Header */}
                   <div className="bg-slate-900/80 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-500">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                               <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                            </svg>
                         </div>
                         <h4 className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Static Analysis // rootaccess-api / main</h4>
                      </div>
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                         <span className="font-mono text-[9px] text-teal-400">SCANNING...</span>
                      </div>
                   </div>

                   {/* Code Editor Body */}
                   <div className="flex-1 p-8 font-mono text-sm relative overflow-hidden bg-slate-950/40">
                      {/* Scanning Line overlay */}
                      {!isRemediated && (
                        <motion.div 
                          className="absolute inset-x-0 h-8 bg-teal-500/10 border-y border-teal-500/30 blur-sm z-10 pointer-events-none"
                          animate={{ top: ["5%", "85%", "5%"] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                      )}

                      <div className="space-y-4">
                         {codeSnippets.map((line, i) => (
                           <div key={line.line} className="flex gap-6 group">
                              <span className="w-6 text-slate-700 text-right select-none">{line.line}</span>
                              <div className="relative">
                                 <span className={line.vul && !isRemediated ? "text-red-400 underline decoration-wavy decoration-red-500/40" : line.color}>
                                    {line.vul && isRemediated ? remediatedLine : line.content}
                                 </span>
                                 
                                 {line.vul && !isRemediated && (
                                   <motion.div 
                                      className="absolute -right-20 top-0"
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                   >
                                      <span className="text-[8px] bg-red-500/20 text-red-400 px-2 py-0.5 rounded border border-red-500/30 font-black uppercase tracking-tighter">Vulnerable</span>
                                   </motion.div>
                                 )}

                                 {line.vul && isRemediated && (
                                   <motion.div 
                                      className="absolute -right-20 top-0"
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                   >
                                      <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30 font-black uppercase tracking-tighter">Fixed</span>
                                   </motion.div>
                                 )}
                              </div>
                           </div>
                         ))}
                      </div>
                      
                      {/* Remediation HUD overlay */}
                      <AnimatePresence>
                        {p > 0.45 && (
                          <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 right-8 left-8 p-6 rounded-2xl bg-slate-900 border border-teal-500/40 shadow-4xl backdrop-blur-3xl ring-2 ring-black flex flex-col gap-4"
                          >
                             <div className="flex items-center justify-between">
                                <div className="flex flex-col">
                                   <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">Remediation Suggestion</span>
                                   <h5 className="text-sm font-bold text-white tracking-wide">Replace concatenated SQL query with Parameterized Query (ORM)</h5>
                                </div>
                                <div className="flex gap-2">
                                   {isRemediated ? (
                                      <div className="bg-emerald-500 text-slate-950 text-[10px] px-4 py-2 rounded-lg font-black uppercase tracking-widest flex items-center gap-2">
                                         <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12"/></svg>
                                         Applied
                                      </div>
                                   ) : (
                                      <div className="bg-teal-500 text-slate-950 text-[10px] px-6 py-2 rounded-lg font-black uppercase tracking-widest animate-pulse cursor-default">
                                         Apply Fix
                                      </div>
                                   )}
                                </div>
                             </div>
                             <p className="text-[10px] text-slate-400 leading-relaxed italic">
                                "The GRC analyst works tirelessly to ensure that our applications remain resilient... minimizing the attack surface before code reaches production."
                             </p>
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
