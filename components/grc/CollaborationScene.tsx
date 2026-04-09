"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GRCBriefingCard } from "./GRCBriefingCard";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 4: Collaboration — crossfades with Phase 3 exit + Phase 5 entry.
 */
export const CollaborationScene: React.FC<SceneProps> = ({ progress }) => {
  const cardStartFadeIn = 0.456;
  const cardFullOpacity = 0.462;
  const cardStartFadeOut = 0.492;
  const cardEndFadeOut = 0.5;

  const sceneStartFadeIn = 0.5;
  const sceneFullOpacity = 0.508;
  const sceneStartFadeOut = 0.6;
  const sceneEndFadeOut = 0.622;

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

  const isTransmitting = p > 0.1 && p <= 0.35;
  const isConfirming = p > 0.35 && p < 0.9;
  const isAligned = p >= 0.9;

  return (
    <>
    <GRCBriefingCard 
      phaseNumber={4}
      title="Security Alignment"
      description="The risk is patched. You now hop into a cross-functional standup to verify the fix and align the whole team on the security standards going forward."
      opacity={cardOpacity}
    />
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
      <div className="relative w-full max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Narrative Focus */}
          <div className="lg:col-span-4 flex flex-col gap-8 justify-center">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.45 }}
             >
                <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">Team Dynamics</h2>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-none">Synergy <span className="text-teal-400">Map</span></h3>
                <p className="text-slate-400 text-base italic border-l-2 border-teal-500/20 pl-6 leading-relaxed">
                  "Collaboration is the lifeblood... serving as educators and partners to our developers."
                </p>
             </motion.div>

             {/* Live Node State Tracker */}
             <div className="p-6 md:p-8 rounded-3xl bg-[#0f151e] shadow-2xl border border-white/5 space-y-6 relative overflow-hidden ring-1 ring-white/5">
                <div className="flex items-center justify-between border-b border-slate-700/50 pb-4">
                   <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">Node Alignment Status</span>
                   <div className="flex gap-2">
                       <div className={`w-2 h-2 rounded-full ${isAligned ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : 'bg-teal-500 animate-pulse'}`} />
                   </div>
                </div>

                <div className="space-y-4">
                   {/* SRE Node State */}
                   <div className={`flex items-center justify-between rounded-lg border p-3 transition-colors duration-300 ${isAligned ? 'bg-emerald-500/10 border-emerald-500/30' : p > 0.1 ? 'bg-indigo-500/10 border-indigo-500/30' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-3">
                         <span className="text-lg">⚙️</span>
                         <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">DevOps / SRE</span>
                            <span className="text-[9px] font-mono text-slate-500">AWS Infrastructure</span>
                         </div>
                      </div>
                      <span className={`text-[8px] font-black font-mono uppercase px-2 py-1 rounded tracking-widest ${isAligned ? 'text-emerald-400' : p > 0.1 ? 'text-indigo-400' : 'text-slate-500'}`}>
                         {isAligned ? 'ALIGNED' : p > 0.1 ? 'ACTIVE' : 'IDLE'}
                      </span>
                   </div>

                   {/* AppSec Node State */}
                   <div className={`flex items-center justify-between rounded-lg border p-3 transition-colors duration-300 ${isAligned ? 'bg-emerald-500/10 border-emerald-500/30' : p > 0.55 ? 'bg-orange-500/10 border-orange-500/30' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-3">
                         <span className="text-lg">🔐</span>
                         <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Application Security</span>
                            <span className="text-[9px] font-mono text-slate-500">Pipeline Checks</span>
                         </div>
                      </div>
                      <span className={`text-[8px] font-black font-mono uppercase px-2 py-1 rounded tracking-widest ${isAligned ? 'text-emerald-400' : p > 0.55 ? 'text-orange-400' : 'text-slate-500'}`}>
                         {isAligned ? 'ALIGNED' : p > 0.55 ? 'ACTIVE' : 'IDLE'}
                      </span>
                   </div>
                   
                   {/* EngLead Node State */}
                   <div className={`flex items-center justify-between rounded-lg border p-3 transition-colors duration-300 ${isAligned ? 'bg-emerald-500/10 border-emerald-500/30' : p > 0.75 ? 'bg-purple-500/10 border-purple-500/30' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-3">
                         <span className="text-lg">💻</span>
                         <div className="flex flex-col">
                            <span className="text-xs font-bold text-white">Engineering Lead</span>
                            <span className="text-[9px] font-mono text-slate-500">Core Services</span>
                         </div>
                      </div>
                      <span className={`text-[8px] font-black font-mono uppercase px-2 py-1 rounded tracking-widest ${isAligned ? 'text-emerald-400' : p > 0.75 ? 'text-purple-400' : 'text-slate-500'}`}>
                         {isAligned ? 'ALIGNED' : p > 0.75 ? 'ACTIVE' : 'IDLE'}
                      </span>
                   </div>
                </div>

                {isAligned && (
                   <motion.div 
                     initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                     className="absolute inset-x-0 bottom-0 top-0 pointer-events-none rounded-3xl"
                     style={{ boxShadow: 'inset 0 0 50px rgba(16, 185, 129, 0.15)' }}
                   />
                )}
             </div>
          </div>

          {/* Right: Network Topology Alignment Map */}
          <div className="lg:col-span-8 relative flex flex-col justify-center">
             <motion.div 
               className="relative flex h-[clamp(22rem,58vh,40rem)] min-h-0 items-center justify-center overflow-hidden rounded-3xl border border-teal-500/20 bg-[#0b1016] p-4 shadow-3xl ring-1 ring-white/5 sm:p-6 md:p-8"
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 0.5 }}
             >
                {/* Background Radar Grid */}
                <div className="absolute inset-0 bg-[#0b1016]" />
                <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "linear-gradient(#14b8a6 1px, transparent 1px), linear-gradient(90deg, #14b8a6 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                
                {/* Central Radial Glows */}
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(500px,72%)] w-[min(500px,72%)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-500/10" />
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-[min(300px,45%)] w-[min(300px,45%)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-teal-500/20" />
                <div className={`pointer-events-none absolute left-1/2 top-1/2 h-[min(150px,24%)] w-[min(150px,24%)] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[50px] transition-colors duration-[400ms] ${isAligned ? 'bg-emerald-500/30' : 'bg-teal-500/10'}`} />

                {/* SVG Connections */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
                   {/* GRC -> SRE (Top Right) */}
                   <line x1="50%" y1="50%" x2="78%" y2="22%" stroke={isAligned ? "#10b981" : "#14b8a6"} strokeWidth={isAligned ? "4" : "1"} opacity={p > 0.05 ? (isAligned ? 0.8 : 0.4) : 0} />
                   
                   {/* GRC -> AppSec (Bottom Right) */}
                   <line x1="50%" y1="50%" x2="78%" y2="78%" stroke={isAligned ? "#10b981" : "#14b8a6"} strokeWidth={isAligned ? "4" : "1"} opacity={p > 0.3 ? (isAligned ? 0.8 : 0.4) : 0} />
                   
                   {/* GRC -> EngLead (Bottom Left) */}
                   <line x1="50%" y1="50%" x2="22%" y2="78%" stroke={isAligned ? "#10b981" : "#14b8a6"} strokeWidth={isAligned ? "4" : "1"} opacity={p > 0.5 ? (isAligned ? 0.8 : 0.4) : 0} />

                   {/* Animated Transmission Packets */}
                   {p > 0.1 && !isAligned && (
                     <motion.circle r="6" fill="#14b8a6" filter="blur(2px)"
                       initial={{ cx: "50%", cy: "50%" }}
                       animate={{ cx: "78%", cy: "22%" }}
                      transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity }}
                     />
                   )}
                   {p > 0.3 && !isAligned && (
                     <motion.circle r="6" fill="#14b8a6" filter="blur(2px)"
                       initial={{ cx: "50%", cy: "50%" }}
                       animate={{ cx: "78%", cy: "78%" }}
                      transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, delay: 0.35 }}
                     />
                   )}
                   {p > 0.5 && !isAligned && (
                     <motion.circle r="6" fill="#14b8a6" filter="blur(2px)"
                       initial={{ cx: "50%", cy: "50%" }}
                       animate={{ cx: "22%", cy: "78%" }}
                      transition={{ duration: 1.1, ease: "easeInOut", repeat: Infinity, delay: 0.7 }}
                     />
                   )}
                </svg>

                {/* --- NODES & MESSAGES --- */}
                
                {/* NODE: GRC Analyst (Center) */}
                <div className={`absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-all duration-300 ${isAligned ? 'scale-105' : 'scale-100'}`}>
                   {/* GRC Message */}
                   <AnimatePresence>
                      {p >= 0.35 && p < 0.55 && (
                         <motion.div initial={{ opacity: 0, scale: 0.9, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }} className="absolute bottom-full z-40 mb-3 w-[min(16rem,72vw)] rounded-2xl rounded-bl-none border border-teal-500/50 bg-slate-900 p-3 shadow-[0_10px_30px_rgba(20,184,166,0.2)] lg:w-[min(18rem,26vw)]">
                            <span className="text-[10px] font-black text-teal-400 uppercase tracking-widest block mb-1">g.analyst (GRC)</span>
                            <p className="text-xs text-slate-300 leading-snug">Yes, ISO 6.1.2 requires it for PII. Let's ensure consistency across the environments.</p>
                         </motion.div>
                      )}
                   </AnimatePresence>
                   <div className={`w-24 h-24 rounded-[2rem] flex items-center justify-center border-2 border-teal-500 shadow-[0_0_40px_rgba(20,184,166,0.2)] bg-[#121c26] backdrop-blur-md transition-colors ${isAligned ? 'border-emerald-500 shadow-[0_0_80px_rgba(16,185,129,0.4)]' : ''}`}>
                      <span className="text-4xl">🛡️</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className={`text-[11px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-lg bg-[#0b1016]/80 backdrop-blur-md border ${isAligned ? 'text-emerald-400 border-emerald-500/50' : 'text-teal-400 border-teal-500/50'}`}>GRC Analyst</span>
                   </div>
                </div>

                {/* NODE: SRE (Top Right) */}
                <div className={`absolute left-[74%] top-[26%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-all duration-300 md:left-[78%] md:top-[22%]`}>
                   {/* SRE Message */}
                   <AnimatePresence>
                      {p >= 0.1 && p < 0.35 && (
                         <motion.div initial={{ opacity: 0, scale: 0.9, y: -14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }} className="absolute top-full z-40 mt-3 flex w-[min(15rem,68vw)] flex-col rounded-2xl rounded-tr-none border border-indigo-500/50 bg-slate-900 p-3 shadow-[0_10px_30px_rgba(99,102,241,0.2)] lg:w-[min(17rem,24vw)]">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-1">m.torres (SRE)</span>
                            <p className="text-xs text-slate-300 leading-snug">Do we really need full encryption at rest for the staging DB?</p>
                         </motion.div>
                      )}
                   </AnimatePresence>

                   <div className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-[#121c26] backdrop-blur-md transition-colors duration-300 ${isAligned ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : p > 0.1 ? 'border-indigo-500 shadow-[0_0_40px_rgba(99,102,241,0.3)]' : 'border-slate-700'}`}>
                      {p > 0.1 && !isAligned && <div className="absolute inset-0 rounded-full border-2 border-indigo-500 animate-ping opacity-30" />}
                      <span className="text-2xl">⚙️</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded bg-[#0b1016]/80 backdrop-blur-md border ${isAligned ? 'text-emerald-400 border-emerald-500/50' : p > 0.1 ? 'text-indigo-400 border-indigo-500/50' : 'text-slate-400 border-slate-700'}`}>DevOps/SRE</span>
                   </div>
                </div>

                {/* NODE: AppSec (Bottom Right) */}
                <div className={`absolute left-[74%] top-[74%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-all duration-300 md:left-[78%] md:top-[78%]`}>
                   {/* AppSec Message */}
                   <AnimatePresence>
                      {p >= 0.55 && p < 0.75 && (
                         <motion.div initial={{ opacity: 0, scale: 0.9, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }} className="absolute bottom-full z-40 mb-3 w-[min(16rem,72vw)] rounded-2xl rounded-br-none border border-orange-500/50 bg-slate-900 p-3 shadow-[0_10px_30px_rgba(249,115,22,0.2)] lg:w-[min(18rem,26vw)]">
                            <span className="text-[10px] font-black text-orange-400 uppercase tracking-widest block mb-1">r.chen (APPSEC)</span>
                            <p className="text-xs text-slate-300 leading-snug">Got it. I'll add KMS rotation checks to the CI/CD pipeline immediately.</p>
                         </motion.div>
                      )}
                   </AnimatePresence>

                   <div className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-[#121c26] backdrop-blur-md transition-colors duration-300 ${isAligned ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : p > 0.55 ? 'border-orange-500 shadow-[0_0_40px_rgba(249,115,22,0.3)]' : 'border-slate-700'}`}>
                      {p > 0.55 && !isAligned && <div className="absolute inset-0 rounded-full border-2 border-orange-500 animate-ping opacity-30" />}
                      <span className="text-2xl">🔐</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded bg-[#0b1016]/80 backdrop-blur-md border ${isAligned ? 'text-emerald-400 border-emerald-500/50' : p > 0.55 ? 'text-orange-400 border-orange-500/50' : 'text-slate-400 border-slate-700'}`}>AppSec</span>
                   </div>
                </div>

                {/* NODE: EngLead (Bottom Left) */}
                <div className={`absolute left-[26%] top-[74%] z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 transition-all duration-300 md:left-[22%] md:top-[78%]`}>
                   {/* EngLead Message */}
                   <AnimatePresence>
                      {p >= 0.75 && p < 1.0 && !isAligned && (
                         <motion.div initial={{ opacity: 0, scale: 0.9, y: 14 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.25 }} className="absolute bottom-full z-40 mb-3 w-[min(15rem,68vw)] rounded-2xl rounded-bl-none border border-purple-500/50 bg-slate-900 p-3 shadow-[0_10px_30px_rgba(168,85,247,0.2)] lg:w-[min(17rem,24vw)]">
                            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest block mb-1">j.doe (ENG LEAD)</span>
                            <p className="text-xs text-slate-300 leading-snug">Confirmed. Core services will use the rotated keys by next sprint.</p>
                         </motion.div>
                      )}
                   </AnimatePresence>

                   <div className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-[#121c26] backdrop-blur-md transition-colors duration-300 ${isAligned ? 'border-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.3)]' : p > 0.75 ? 'border-purple-500 shadow-[0_0_40px_rgba(168,85,247,0.3)]' : 'border-slate-700'}`}>
                      {p > 0.75 && !isAligned && <div className="absolute inset-0 rounded-full border-2 border-purple-500 animate-ping opacity-30" />}
                      <span className="text-2xl">💻</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded bg-[#0b1016]/80 backdrop-blur-md border ${isAligned ? 'text-emerald-400 border-emerald-500/50' : p > 0.75 ? 'text-purple-400 border-purple-500/50' : 'text-slate-400 border-slate-700'}`}>Eng Lead</span>
                   </div>
                </div>

             </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
    </>
  );
};
