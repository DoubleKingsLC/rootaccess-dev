"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 6: Audits & Incident Response (0.75 - 0.95)
 * Command Center / Terminal Simulation — "Silent War Room"
 */
export const AuditIncidentScene: React.FC<SceneProps> = ({ progress }) => {
  const startFadeIn = 0.75;
  const fullOpacity = 0.80;
  const startFadeOut = 0.90;
  const endFadeOut = 0.95;

  const isActive = progress >= startFadeIn && progress < endFadeOut;
  
  if (!isActive) return null;

  // Normalized phase progress
  const p = Math.min(1, Math.max(0, (progress - startFadeIn) / (endFadeOut - startFadeIn)));
  
  // Transition styles: Switch from Audit (Calm) to Incident (Urgent) based on progress within phase
  const isIncidentPhase = p > 0.45;
  
  // Opacity calculation for clean transition
  let opacity = 1;
  if (progress < fullOpacity) {
    opacity = (progress - startFadeIn) / (fullOpacity - startFadeIn);
  } else if (progress > startFadeOut) {
    opacity = Math.max(0, 1 - (progress - startFadeOut) / (endFadeOut - startFadeOut));
  }

  const AUDIT_ITEMS = [
    { label: "Access Control Review", status: "VERIFIED" },
    { label: "Change Management Evidence", status: "COMPLIANT" },
    { label: "Vulnerability Scanning Logs", status: "SIGNED" }
  ];

  const INCIDENT_LOGS = [
    { time: "14:24:12", event: "ANOMALOUS_ACCESS_DETECTED", src: "185.22.x.47" },
    { time: "14:24:30", event: "UNAUTHORIZED_FILE_READ", target: "/finance/q4" },
    { time: "14:25:05", event: "CONTAINMENT_TRIGGERED", status: "ISOLATED" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Pulsing Flare for Incident Stage */}
      <AnimatePresence>
        {isIncidentPhase && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.15, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-0 bg-red-600/10 pointer-events-none z-0"
          />
        )}
      </AnimatePresence>

       <div className="relative w-full max-w-6xl z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
             
             {/* Left: Dynamic HUD Status */}
             <div className="lg:col-span-5 flex flex-col gap-8">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.8 }}
                >
                   <h2 className={`font-mono text-xs uppercase tracking-[0.4em] mb-2 ${isIncidentPhase ? 'text-red-500' : 'text-teal-500'}`}>
                      {isIncidentPhase ? 'Emergency Ops' : 'Compliance Assurance'}
                   </h2>
                   <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase leading-none">
                      {isIncidentPhase ? (
                        <>Incident <span className="text-red-500">Response</span></>
                      ) : (
                        <>Audits & <span className="text-teal-400">Reviews</span></>
                      )}
                   </h3>
                   <p className="text-slate-400 text-sm italic border-l-2 border-white/10 pl-6 leading-relaxed max-w-sm">
                      {isIncidentPhase ? (
                        "Understanding the unknown under pressure... remediation efforts are tireless."
                      ) : (
                        "Play a key role in evaluations... being the voice of readiness for our developers."
                      )}
                   </p>
                </motion.div>

                {/* Status Dashboard Panel */}
                <div className={`p-6 rounded-3xl bg-white/5 border relative transition-colors duration-700 ${isIncidentPhase ? 'border-red-500/20 shadow-[0_0_50px_rgba(239,68,68,0.1)]' : 'border-teal-500/20'}`}>
                   <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                      <div className={`w-3 h-3 rounded-full ${isIncidentPhase ? 'bg-red-500 animate-ping' : 'bg-teal-500'}`} />
                      <span className={`font-mono text-[10px] uppercase font-black tracking-widest ${isIncidentPhase ? 'text-red-400' : 'text-teal-400'}`}>
                         {isIncidentPhase ? 'SEV-1 Incident — Active' : 'Internal Audit — Passing'}
                      </span>
                   </div>
                   
                   <div className="space-y-4">
                      {isIncidentPhase ? (
                        <>
                           <div className="flex justify-between items-baseline font-mono text-[10px] text-red-100">
                              <span>Remediation Progress</span>
                              <span>74%</span>
                           </div>
                           <div className="h-2 w-full bg-red-950/40 rounded-full overflow-hidden border border-red-500/10">
                              <motion.div 
                                 className="h-full bg-red-500"
                                 initial={{ width: 0 }}
                                 animate={{ width: "74%" }}
                                 transition={{ duration: 2, ease: "easeOut" }}
                              />
                           </div>
                           <div className="grid grid-cols-2 gap-2 mt-4">
                              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                                 <p className="font-mono text-[8px] text-red-400 uppercase">Impact</p>
                                 <p className="text-xs font-black text-red-100 uppercase">Limited</p>
                              </div>
                              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-center">
                                 <p className="font-mono text-[8px] text-red-400 uppercase">Status</p>
                                 <p className="text-xs font-black text-red-100 uppercase italic">Contained</p>
                              </div>
                           </div>
                        </>
                      ) : (
                        AUDIT_ITEMS.map((item, i) => (
                           <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                              <span className="text-[10px] font-bold text-slate-300 uppercase tracking-wide">{item.label}</span>
                              <span className="text-[9px] font-black font-mono text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded bg-teal-500/5">{item.status}</span>
                           </div>
                        ))
                      )}
                   </div>
                </div>
             </div>

             {/* Right: Simulation View (Audit Deck or Incident Terminal) */}
             <div className="lg:col-span-7 relative">
                <AnimatePresence mode="wait">
                   {!isIncidentPhase ? (
                      /* Audit Deck UI */
                      <motion.div 
                         key="audit-ui"
                         initial={{ opacity: 0, scale: 0.95 }}
                         animate={{ opacity: 1, scale: 1 }}
                         exit={{ opacity: 0, scale: 1.05 }}
                         className="bg-slate-950 border border-teal-500/10 rounded-3xl p-8 h-[450px] shadow-4xl flex flex-col items-center justify-center text-center gap-8 relative overflow-hidden"
                      >
                         {/* Subtle Background HUD elements */}
                         <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-teal-500/5 to-transparent pointer-events-none" />
                         
                         <div className="relative">
                            <div className="w-32 h-32 rounded-full border-4 border-teal-500/20 flex items-center justify-center relative">
                               <span className="text-6xl text-teal-400 drop-shadow-[0_0_20px_rgba(20,184,166,0.5)]">✍️</span>
                               <motion.div 
                                  className="absolute inset-0 border-2 border-teal-400 rounded-full"
                                  animate={{ scale: [1, 1.3], opacity: [0.5, 0] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                               />
                            </div>
                            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-teal-500 text-slate-950 font-black text-[10px] px-6 py-2 rounded-full uppercase tracking-widest whitespace-nowrap">Voice of Readiness</div>
                         </div>
                         
                         <div className="space-y-4 max-w-xs">
                            <h5 className="text-xl font-black text-white italic tracking-tighter uppercase underline decoration-teal-500/30 decoration-4">The Afternoon Audit</h5>
                            <p className="text-xs text-slate-400 leading-relaxed">
                               Preparing for evaluations, addressing auditors' questions, and ensuring all compliance documentation is flawlessly organized.
                            </p>
                         </div>
                         
                         <div className="w-full h-px bg-white/5 relative">
                            <motion.div 
                              className="absolute inset-y-0 left-0 bg-teal-500 shadow-[0_0_10px_#14b8a6]"
                              animate={{ width: ["0%", "100%"] }}
                              transition={{ duration: 5, repeat: Infinity }}
                            />
                         </div>
                      </motion.div>
                   ) : (
                      /* Incident Terminal simulation */
                      <motion.div 
                        key="incident-ui"
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-slate-950 border border-red-500/30 rounded-3xl h-[450px] shadow-4xl flex flex-col shadow-[0_0_80px_rgba(239,68,68,0.1)] ring-2 ring-red-500/10 overflow-hidden"
                      >
                         {/* Terminal Header */}
                         <div className="bg-red-950/20 px-6 py-4 border-b border-red-500/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                               <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse shadow-[0_0_8px_red]" />
                               <h4 className="text-[10px] font-mono text-red-500 uppercase font-black tracking-widest">EOC // INCIDENT_TERMINAL // SESSION_422</h4>
                            </div>
                            <div className="flex gap-2">
                               <div className="w-2 h-2 rounded-full bg-red-900" /><div className="w-2 h-2 rounded-full bg-red-900" />
                            </div>
                         </div>

                         {/* Log Stream Body */}
                         <div className="flex-1 p-6 font-mono text-xs space-y-3 bg-red-950/5 relative overflow-hidden">
                            {/* Matrix-style falling code background (minimalists) */}
                            <div className="absolute inset-0 opacity-[0.03] select-none pointer-events-none">
                               {Array.from({ length: 15 }).map((_, i) => (
                                 <motion.div 
                                    key={i} 
                                    className="text-red-500 text-[10px] whitespace-nowrap"
                                    animate={{ y: [-100, 500] }}
                                    transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "linear" }}
                                    style={{ left: `${i * 7}%`, position: 'absolute' }}
                                 >
                                    010110011110011010101011101011
                                 </motion.div>
                               ))}
                            </div>

                            <div className="relative z-10 space-y-4">
                               {INCIDENT_LOGS.map((log, i) => (
                                 <motion.div 
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.4 }}
                                    className="flex gap-4 border-l border-red-500/20 pl-4 py-1"
                                 >
                                    <span className="text-red-900/60 font-black">{log.time}</span>
                                    <div className="flex flex-col gap-1">
                                       <span className="text-red-500 font-black uppercase tracking-widest">{log.event}</span>
                                       <span className="text-slate-500 text-[10px]">
                                          {log.src ? `SOURCE: ${log.src}` : log.target ? `TARGET: ${log.target}` : `STATUS: ${log.status}`}
                                       </span>
                                    </div>
                                 </motion.div>
                               ))}
                               
                               <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: [0, 1, 0] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                  className="flex items-center gap-2 text-red-400 font-black text-[11px] mt-8"
                               >
                                  <span className="blink-cursor w-2 h-4 bg-red-500" />
                                  INITIATING_REMEDIATION_PROTOCOL...
                               </motion.div>
                            </div>

                            {/* Alert Warning Strip */}
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-red-500 border border-red-400 rounded-xl flex items-center justify-between text-slate-950 font-black uppercase tracking-widest text-[10px] shadow-2xl">
                               <span>Impact Assessment: Restricted</span>
                               <div className="w-12 h-2 bg-white/30 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="h-full bg-white"
                                    animate={{ width: ["10%", "100%", "10%"] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                  />
                               </div>
                            </div>
                         </div>
                      </motion.div>
                   )}
                </AnimatePresence>
             </div>
          </div>
       </div>
    </motion.div>
  );
};
