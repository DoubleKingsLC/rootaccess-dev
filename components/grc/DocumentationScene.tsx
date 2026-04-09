"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GRCBriefingCard } from "./GRCBriefingCard";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 5: Documentation — crossfades with Phase 4 + Phase 6.
 */
export const DocumentationScene: React.FC<SceneProps> = ({ progress }) => {
  const cardStartFadeIn = 0.616;
  const cardFullOpacity = 0.622;
  const cardStartFadeOut = 0.65;
  const cardEndFadeOut = 0.658;

  const sceneStartFadeIn = 0.658;
  const sceneFullOpacity = 0.666;
  const sceneStartFadeOut = 0.758;
  const sceneEndFadeOut = 0.78;

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

  return (
    <>
      <GRCBriefingCard
        phaseNumber={5}
        title="The Details"
        description="The devil is in the details. Evidence gathering and documentation form the foundation of compliance assurance. Proper records prove that security controls are not just theoretical, but actively enforced."
        opacity={cardOpacity}
      />

      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden pointer-events-none"
        style={{ opacity: sceneOpacity }}
      >
         <div className="relative w-full max-w-6xl pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
             
             {/* Left: Narrative Focus */}
             <div className="lg:col-span-4 flex flex-col gap-8 justify-center">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.45 }}
                >
                   <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">The Evidence Match</h2>
                   <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-4 uppercase leading-none">Mapping <span className="text-teal-400">Reality</span></h3>
                   <p className="text-slate-400 text-sm md:text-base leading-relaxed italic border-l-2 border-teal-500/20 pl-6 max-w-sm">
                     "Policies hold no weight without proof. Validation is the art of mapping real-world engineering evidence directly to your control framework."
                   </p>
                </motion.div>

                {/* Tracking Process Box */}
                <div className="p-6 rounded-3xl bg-teal-500/5 border border-teal-500/10 flex flex-col gap-4">
                   <div className="flex items-center gap-3 border-b border-teal-500/10 pb-3">
                      <div className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                      <span className="font-mono text-[9px] uppercase tracking-widest text-teal-500 font-bold">Review Protocol</span>
                   </div>
                   <div className="space-y-3 font-mono text-[10px] text-slate-500 uppercase tracking-widest transition-colors duration-300">
                      <div className={`flex justify-between items-center transition-colors duration-300 ${p > 0.1 ? 'text-teal-400 font-bold' : ''}`}><span>1. Assess Gap</span><span>{p > 0.1 ? '[ START ]' : '[ WAIT ]'}</span></div>
                      <div className={`flex justify-between items-center transition-colors duration-300 ${p > 0.3 ? 'text-teal-400 font-bold' : ''}`}><span>2. Collect Proof</span><span>{p > 0.3 ? '[ OK ]' : '[ WAIT ]'}</span></div>
                      <div className={`flex justify-between items-center transition-colors duration-300 ${p > 0.5 ? 'text-teal-400 font-bold' : ''}`}><span>3. Verify Math</span><span>{p > 0.5 ? '[ SCANNING ]' : '[ WAIT ]'}</span></div>
                      <div className={`flex justify-between items-center transition-colors duration-300 ${p > 0.7 ? 'text-teal-400 font-bold' : ''}`}><span>4. Sign Off</span><span>{p > 0.7 ? '[ CLOSED ]' : '[ WAIT ]'}</span></div>
                   </div>
                </div>
             </div>

             {/* Right: The Document Review HUD */}
             <div className="relative flex min-h-0 flex-col lg:col-span-8">
                <motion.div 
                   className="flex h-[clamp(26rem,62vh,42rem)] min-h-0 flex-col overflow-hidden rounded-3xl border border-teal-500/20 bg-slate-950/80 shadow-[0_0_80px_rgba(20,184,166,0.05)]"
                   initial={{ scale: 0.95, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 0.5 }}
                >
                   {/* Header UI */}
                   <div className="bg-slate-900 border-b border-white/5 flex items-center justify-between px-6 py-4 relative z-40 backdrop-blur-sm">
                      <div className="flex items-center gap-3">
                         <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                         <h4 className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Document_Review // G.Analyst</h4>
                      </div>
                      <div className="flex gap-2">
                        <div className="w-2 h-2 rounded-full bg-slate-800" /><div className="w-2 h-2 rounded-full bg-slate-800" />
                      </div>
                   </div>

                   {/* Interactive Sandbox (Review pane) */}
                   <div className="relative flex min-h-0 flex-1 flex-col gap-3 bg-[#050a0d] p-4 md:gap-4 md:p-5">
                      
                      {/* Top: Policy Requirement Box */}
                      <div className={`w-full shrink-0 rounded-2xl border p-4 transition-all duration-300 md:p-5 ${p > 0.7 ? 'bg-teal-950/20 border-teal-500/40 shadow-[0_0_30px_rgba(20,184,166,0.1)]' : 'bg-rose-950/20 border-rose-500/30 shadow-[0_0_30px_rgba(225,29,72,0.05)]'}`}>
                          <div className="mb-3 flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Control Requirement</span>
                                  <h4 className="mt-1 text-base font-black text-white md:text-lg">AC-7: Multi-Factor Authentication</h4>
                              </div>
                              <div className={`shrink-0 rounded px-2 py-1 font-mono text-[9px] font-black uppercase tracking-widest border transition-all duration-300 sm:text-[10px] ${p > 0.7 ? 'bg-teal-500/10 text-teal-400 border-teal-500/50' : 'bg-rose-500/10 text-rose-400 border-rose-500/50'}`}>
                                  {p > 0.7 ? 'COMPLIANT' : 'EVIDENCE MISSING'}
                              </div>
                          </div>
                          <p className="max-w-lg text-xs leading-relaxed text-slate-400">
                              The organization must enforce MFA for all network access to privileged accounts and non-privileged accounts handling confidential data.
                          </p>
                      </div>

                      {/* Bottom: Evidence Viewer */}
                      <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
                         {/* Viewer Header */}
                         <div className="flex shrink-0 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-2">
                            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500">Evidence Reader</span>
                            <span className="text-[9px] font-mono uppercase tracking-widest text-slate-600">ID: DOC-934</span>
                         </div>
                         
                         {/* Viewer Body — no scroll; content sized to fit */}
                         <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.05)_0%,transparent_70%)] p-3 md:p-4">
                            <AnimatePresence>
                               {p > 0.3 && (
                                  <motion.div 
                                    initial={{ y: 24, opacity: 0, rotate: -1 }}
                                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    className="relative mx-auto w-full max-w-sm shrink-0 overflow-hidden rounded bg-white p-4 font-mono text-[10px] leading-relaxed text-slate-900 shadow-2xl sm:p-5"
                                  >
                                     <div className="border-b-2 border-slate-200 pb-2 mb-3">
                                        <h5 className="font-bold text-sm">Identity Management Audit Log</h5>
                                        <span className="text-slate-500">Generated: 2026-04-07 14:00 UTC</span>
                                     </div>
                                     <div className="space-y-2 opacity-80">
                                        <p>&gt; Checking authentication policies...</p>
                                        <p>&gt; Validating global enforcement...</p>
                                        <div className={`transition-all duration-300 ${p > 0.6 ? '' : 'blur-sm opacity-50'}`}>
                                           <p className="font-bold text-teal-700 bg-teal-50 p-1 rounded">
                                              [PASS] Require_MFA is set to TRUE globally.
                                           </p>
                                        </div>
                                        <p>&gt; 412 active user accounts checked.</p>
                                        <p>&gt; 0 exceptions found.</p>
                                     </div>
                                     
                                     {/* Scanning Laser */}
                                     {p > 0.5 && p < 0.7 && (
                                        <motion.div 
                                          initial={{ top: "0%" }}
                                          animate={{ top: "100%" }}
                                          transition={{ duration: 1.1, repeat: Infinity, ease: "linear" }}
                                          className="absolute left-0 right-0 h-10 bg-gradient-to-b from-transparent to-teal-400/30 border-b-2 border-teal-500 pointer-events-none"
                                        />
                                     )}
                                  </motion.div>
                               )}
                            </AnimatePresence>
                         </div>
                      </div>

                      {/* Final Validation Stamp */}
                      <AnimatePresence>
                         {p > 0.75 && (
                            <motion.div 
                               className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]"
                               initial={{ scale: 3, opacity: 0 }}
                               animate={{ scale: 1, opacity: 1 }}
                               transition={{ type: "spring", stiffness: 220, damping: 20 }}
                            >
                               <div className="border-[6px] border-teal-500 text-teal-400 px-6 py-2 rounded-xl font-black uppercase text-3xl tracking-[0.3em] bg-teal-950/80 shadow-[0_0_50px_rgba(20,184,166,0.3)] transform -rotate-12">
                                  VERIFIED
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
    </>
  );
};
