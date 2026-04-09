"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SceneProps {
  progress: number;
}

/**
 * Reflection & Impact — starts after the sixth task scene is fully faded out (~0.93).
 */

const DEBRIEF_TASKS = [
  { task: 1, label: "Morning Rituals",   outcome: "Reviewed overnight alerts and set priorities", icon: "📋" },
  { task: 2, label: "Frameworks",        outcome: "Mapped NIST & ISO controls to business units", icon: "📐" },
  { task: 3, label: "Risk Assessment",   outcome: "Identified and scored 14 organizational risks", icon: "⚡" },
  { task: 4, label: "Team Alignment",    outcome: "Coordinated fixes across SRE, AppSec, and Eng", icon: "🤝" },
  { task: 5, label: "Documentation",     outcome: "Verified evidence against 3 policy requirements", icon: "📄" },
  { task: 6, label: "Emergency Ops",     outcome: "Contained 1 SEV-1 incident, isolated blast radius", icon: "🚨" },
];

export const ReflectionScene: React.FC<SceneProps> = ({ progress }) => {
  const sceneStartFadeIn = 0.932;
  const sceneFullOpacity = 0.942;
  const sceneStartFadeOut = 0.975;
  const sceneEndFadeOut = 0.988;

  const isActive = progress >= sceneStartFadeIn && progress < sceneEndFadeOut;
  if (!isActive) return null;

  const p_fade = (val: number, start: number, end: number) => Math.min(1, Math.max(0, (val - start) / (end - start)));
  let sceneOpacity = 0;
  if (progress >= sceneStartFadeIn && progress <= sceneEndFadeOut) {
    if (progress < sceneFullOpacity) sceneOpacity = p_fade(progress, sceneStartFadeIn, sceneFullOpacity);
    else if (progress > sceneStartFadeOut) sceneOpacity = Math.max(0, 1 - p_fade(progress, sceneStartFadeOut, sceneEndFadeOut));
    else sceneOpacity = 1;
  }

  const p = Math.min(1, Math.max(0, (progress - sceneStartFadeIn) / (sceneEndFadeOut - sceneStartFadeIn)));

  // How many tasks to reveal (staggered as user scrolls)
  const revealedTasks = Math.min(6, Math.floor(p * 10) + 1);
  const showSummary = p > 0.6;

  return (
    <>
      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12 text-white overflow-hidden pointer-events-none"
        style={{ opacity: sceneOpacity }}
      >
        <div className="relative w-full max-w-7xl pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
             
             {/* Left: Narrative + "What You Just Did" explanation */}
             <div className="lg:col-span-5 flex flex-col gap-6 self-center">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.45 }}
                   className="space-y-6"
                >
                   <div className="space-y-2">
                     <h2 className="font-mono text-[10px] uppercase tracking-[0.5em] text-teal-500">Mission Debrief</h2>
                     <h3 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none">Your <span className="text-teal-400">Day</span></h3>
                   </div>
                   
                   <p className="text-slate-400 text-sm md:text-base leading-relaxed border-l-2 border-teal-500/20 pl-6 max-w-sm">
                     This is what a single day looks like as a GRC Analyst. Every task you scrolled through represents real work that keeps the entire company safe, compliant, and ready for anything.
                   </p>

                   {/* Concrete Impact Summary (appears after tasks reveal) */}
                   <AnimatePresence>
                     {showSummary && (
                       <motion.div 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                         className="space-y-4"
                       >
                         <div className="grid grid-cols-3 gap-3">
                           {[
                             { num: "14", label: "Risks Scored" },
                             { num: "3", label: "Policies Verified" },
                             { num: "1", label: "Incident Contained" },
                           ].map((stat, i) => (
                             <motion.div 
                               key={i}
                               initial={{ opacity: 0, scale: 0.8 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: i * 0.06 }}
                               className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20 text-center"
                             >
                               <span className="text-2xl md:text-3xl font-black text-teal-400 block">{stat.num}</span>
                               <span className="text-[8px] md:text-[9px] font-mono uppercase tracking-widest text-slate-500">{stat.label}</span>
                             </motion.div>
                           ))}
                         </div>

                         {/* Tomorrow teaser */}
                         <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                           <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mb-2">Tomorrow's Focus</span>
                           <p className="text-[11px] text-slate-400 leading-relaxed">
                             The cycle never stops. Tomorrow you will sync evidence with SRE, run the Q4 framework review, and verify last night's remediation patches.
                           </p>
                         </div>
                       </motion.div>
                     )}
                   </AnimatePresence>
                </motion.div>
             </div>

             {/* Right: The Journey Recap — visual timeline of completed tasks */}
             <div className="lg:col-span-7 relative">
                <motion.div 
                  className="rounded-3xl bg-[#060b10] border border-white/5 overflow-hidden shadow-2xl ring-1 ring-white/[0.03]"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45 }}
                >
                  {/* Header */}
                  <div className="px-6 md:px-8 py-5 border-b border-white/5 flex items-center justify-between bg-[#080e14]">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-teal-500 shadow-[0_0_10px_rgba(20,184,166,0.5)]" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-teal-400 font-black">
                        After-Action Report — Day Complete
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                    </div>
                  </div>

                  {/* Task timeline */}
                  <div className="px-6 md:px-8 py-6">
                    {DEBRIEF_TASKS.map((task, i) => {
                      const isRevealed = i < revealedTasks;
                      const isLast = i === DEBRIEF_TASKS.length - 1;
                      return (
                        <motion.div 
                          key={i}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: isRevealed ? 1 : 0.2, x: isRevealed ? 0 : 15 }}
                          transition={{ duration: 0.28, delay: i * 0.03 }}
                          className="flex gap-4 md:gap-5"
                        >
                          {/* Timeline column: node + connector */}
                          <div className="flex flex-col items-center flex-shrink-0">
                            <div className={`relative z-10 w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
                              isRevealed 
                                ? 'bg-teal-500/10 border-teal-500/40 shadow-[0_0_20px_rgba(20,184,166,0.1)]'
                                : 'bg-[#0a0f16] border-white/5'
                            }`}>
                              <span className="text-base">{task.icon}</span>
                            </div>
                            {/* Connector line to next node */}
                            {!isLast && (
                              <div className={`w-[2px] flex-1 my-1 rounded-full transition-colors duration-300 ${isRevealed ? 'bg-teal-500/30' : 'bg-white/5'}`} />
                            )}
                          </div>

                          {/* Task content */}
                          <div className={`flex-1 min-w-0 ${isLast ? 'pb-0' : 'pb-5'}`}>
                            <div className="flex items-center gap-3 mb-0.5">
                              <span className={`text-[9px] font-mono uppercase tracking-widest font-black transition-colors duration-300 ${isRevealed ? 'text-teal-400' : 'text-slate-700'}`}>
                                Task {task.task}
                              </span>
                              <span className={`text-[11px] md:text-xs font-bold uppercase tracking-wide transition-colors duration-300 ${isRevealed ? 'text-white' : 'text-slate-700'}`}>
                                {task.label}
                              </span>
                              {/* Inline check */}
                              {isRevealed && (
                                <motion.span 
                                  initial={{ scale: 0 }} animate={{ scale: 1 }}
                                  className="ml-auto text-[9px] font-black text-teal-400 bg-teal-500/10 border border-teal-500/20 px-2 py-0.5 rounded-full"
                                >
                                  DONE
                                </motion.span>
                              )}
                            </div>
                            <p className={`text-[11px] leading-relaxed transition-colors duration-300 ${isRevealed ? 'text-slate-400' : 'text-slate-800'}`}>
                              {task.outcome}
                            </p>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Footer: Final Status */}
                  <div className={`px-6 md:px-8 py-5 border-t border-white/5 flex items-center justify-between transition-all duration-300 ${showSummary ? 'bg-teal-500/5' : 'bg-transparent'}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${showSummary ? 'bg-emerald-500' : 'bg-slate-700'}`} />
                      <span className={`font-mono text-[10px] uppercase tracking-widest font-black transition-colors duration-300 ${showSummary ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {showSummary ? 'All Objectives Complete — Organization Secured' : 'Reviewing outcomes...'}
                      </span>
                    </div>
                    <span className="font-mono text-[9px] text-slate-600 uppercase tracking-widest">
                      {revealedTasks}/6
                    </span>
                  </div>
                </motion.div>
             </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
