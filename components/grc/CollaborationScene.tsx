"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 4: Collaboration (0.45 - 0.65)
 * Team Synergy / Chat Simulation - "Collaborative Guardians"
 */
export const CollaborationScene: React.FC<SceneProps> = ({ progress }) => {
  const startFadeIn = 0.45;
  const fullOpacity = 0.50;
  const startFadeOut = 0.60;
  const endFadeOut = 0.65;

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

  const CHAT_MESSAGES = [
    { sender: "m.torres (SRE)", msg: "Hey team, looking at the infra for Project X. Do we really need full encryption at rest for the staging DB?", time: "2:14 PM", color: "text-indigo-400" },
    { sender: "g.analyst (GRC)", msg: "Yes, ISO Control 6.1.2. Since it contains PII, we need to ensure consistency across all environments.", time: "2:15 PM", color: "text-teal-400" },
    { sender: "m.torres (SRE)", msg: "Understood. Will enabling AWS RDS encryption satisfy the audit requirement?", time: "2:16 PM", color: "text-indigo-400" },
    { sender: "g.analyst (GRC)", msg: "Perfectly. Just make sure the KMS key rotation is enabled. Thanks for checking first! 🤝", time: "2:18 PM", color: "text-teal-400" }
  ];

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity }}
    >
      <div className="relative w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left: Narrative Focus */}
          <div className="lg:col-span-5 space-y-8">
             <motion.div
               initial={{ opacity: 0, x: -30 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
             >
                <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">Team Dynamics</h2>
                <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-6 leading-none">Synergy <span className="text-teal-400">Hub</span></h3>
                <p className="text-slate-400 text-base italic border-l-2 border-teal-500/20 pl-6 leading-relaxed max-w-md">
                  "Collaboration is the lifeblood... serving as educators and partners to our developers."
                </p>
             </motion.div>

             {/* Meeting HUD */}
             <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-mono text-[10px] text-red-400 uppercase tracking-widest font-bold">In Meeting: Security Review</span>
                   </div>
                   <span className="font-mono text-[10px] text-slate-500">24:12</span>
                </div>
                
                <div className="flex -space-x-4">
                   {[1, 2, 3, 4].map(i => (
                     <div key={i} className="w-12 h-12 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-xl overflow-hidden grayscale hover:grayscale-0 transition-all">
                        {i === 1 ? '👨‍💻' : i === 2 ? '👩‍🔬' : i === 3 ? '👨‍💼' : '🤖'}
                     </div>
                   ))}
                   <div className="w-12 h-12 rounded-full border-2 border-slate-900 bg-teal-500/20 flex items-center justify-center text-teal-400 text-[10px] font-bold">+2</div>
                </div>

                <div className="h-12 w-full bg-black/40 rounded-xl flex items-center justify-center px-4 gap-4">
                   <div className="h-4 flex-1 flex gap-1 items-end">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div 
                          key={i}
                          className="w-full bg-teal-500/40 rounded-full"
                          animate={{ height: [4, Math.random() * 16 + 4, 4] }}
                          transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                        />
                      ))}
                   </div>
                   <span className="text-[10px] font-mono text-teal-400 uppercase font-black tracking-widest">Active Discussion</span>
                </div>
             </div>
          </div>

          {/* Right: Mock Discord/Slack Interface */}
          <div className="lg:col-span-7 relative flex flex-col">
             <motion.div 
               className="bg-slate-950 border border-teal-500/10 rounded-3xl overflow-hidden flex flex-col shadow-3xl h-[500px]"
               initial={{ scale: 0.95, opacity: 0 }}
               animate={{ scale: 1, opacity: 1 }}
               transition={{ duration: 1 }}
             >
                {/* App Header */}
                <div className="bg-slate-900 px-6 py-4 border-b border-white/5 flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className="w-3 h-3 rounded-full bg-teal-500" />
                      <h4 className="text-[11px] font-black font-mono text-white tracking-[0.2em] uppercase">#compliance-sync</h4>
                   </div>
                   <div className="flex gap-4">
                      <div className="w-4 h-4 rounded bg-white/5" /><div className="w-4 h-4 rounded bg-white/5" />
                   </div>
                </div>

                {/* Chat Stream */}
                <div className="flex-1 p-6 space-y-6 overflow-y-auto bg-slate-950/40 custom-scrollbar">
                   {CHAT_MESSAGES.map((msg, i) => {
                     const isVisible = p > (i * 0.2);
                     return (
                       <AnimatePresence key={i}>
                         {isVisible && (
                           <motion.div 
                             initial={{ opacity: 0, x: -20, y: 10 }}
                             animate={{ opacity: 1, x: 0, y: 0 }}
                             className="flex gap-4 group"
                           >
                              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-xl shrink-0 group-hover:bg-teal-500/10 transition-colors">
                                 {i % 2 === 0 ? '👷' : '🧑‍🚀'}
                              </div>
                              <div className="flex flex-col gap-1 min-w-0">
                                 <div className="flex items-baseline gap-3">
                                    <span className={`text-[11px] font-black tracking-wide ${msg.color}`}>{msg.sender}</span>
                                    <span className="text-[9px] font-mono text-slate-600 uppercase">{msg.time}</span>
                                 </div>
                                 <p className="text-xs text-slate-300 bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 leading-relaxed">
                                    {msg.msg}
                                 </p>
                              </div>
                           </motion.div>
                         )}
                       </AnimatePresence>
                     )
                   })}
                </div>

                {/* Chat Input simulation */}
                <div className="p-4 border-t border-white/5 bg-slate-900/60">
                   <div className="w-full h-10 rounded-xl bg-black/40 border border-white/5 flex items-center px-4 gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[10px]">➕</div>
                      <span className="text-[10px] font-mono text-slate-600 italic">Message #compliance-sync...</span>
                      <motion.div 
                         className="ml-auto w-1 h-4 bg-teal-500"
                         animate={{ opacity: [0, 1, 0] }}
                         transition={{ duration: 1, repeat: Infinity }}
                      />
                   </div>
                </div>
             </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(20, 184, 166, 0.1);
          border-radius: 10px;
        }
      `}</style>
    </motion.div>
  );
};
