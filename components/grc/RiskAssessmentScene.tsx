"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GRCBriefingCard } from "./GRCBriefingCard";

interface SceneProps {
  progress: number;
}

/**
 * PHASE 3: Risk — overlaps Phase 2 fade + Phase 4 briefing; `p` span 0.10.
 */
export const RiskAssessmentScene: React.FC<SceneProps> = ({ progress }) => {
  const cardStartFadeIn = 0.318;
  const cardFullOpacity = 0.324;
  const cardStartFadeOut = 0.334;
  const cardEndFadeOut = 0.34;

  const sceneStartFadeIn = 0.34;
  const sceneFullOpacity = 0.348;
  const sceneStartFadeOut = 0.44;
  const sceneEndFadeOut = 0.462;

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
    <>
    <GRCBriefingCard 
      phaseNumber={3}
      title="Proactive Risk Mitigation"
      description="You step out of the compliance portal and directly into the IDE. A developer flagged a database query, and you must measure its active risk."
      opacity={cardOpacity}
    />
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center p-4 md:p-12 text-white overflow-hidden"
      style={{ opacity: sceneOpacity }}
    >
       <div className="relative w-full max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
             
             {/* Left: Scanner HUD */}
             <div className="lg:col-span-5 flex flex-col gap-6">
                <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ duration: 0.45 }}
                >
                   <h2 className="font-mono text-xs uppercase tracking-[0.4em] text-teal-500 mb-2">Threat Intelligence</h2>
                   <h3 className="text-4xl md:text-6xl font-black tracking-tight mb-4 uppercase leading-none">Risk <span className="text-teal-400">Lab</span></h3>
                   <p className="text-slate-400 text-sm italic border-l-2 border-teal-500/20 pl-4 mb-8">
                     "Balancing innovation and risk... identifying the cracks in the armor."
                   </p>
                </motion.div>

                {/* Dynamic Risk Calculation Engine */}
                <div className="relative flex min-h-[clamp(20rem,46vh,28rem)] flex-1 flex-col overflow-hidden rounded-3xl border border-teal-500/20 bg-[#0f151e] p-6 shadow-3xl ring-1 ring-white/5 md:p-8">
                   
                   {p < 0.45 && !isRemediated && (
                     <div className="absolute inset-0 flex items-center justify-center pointer-events-none blur-[60px] opacity-20">
                       <div className="w-64 h-64 border-8 border-teal-500 rounded-full border-t-transparent animate-spin" />
                     </div>
                   )}

                   <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                      <div className="flex items-center gap-3">
                         <div className={`w-2 h-2 rounded-full ${isRemediated ? 'bg-emerald-500 shadow-[0_0_10px_#10b981]' : p > 0.45 ? 'bg-red-500 shadow-[0_0_10px_#ef4444]' : 'bg-teal-500 animate-pulse'}`} />
                         <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-slate-400 font-bold">
                           {isRemediated ? 'SYSTEM SECURED' : p < 0.45 ? 'ANALYZING THREAT PAYLOAD...' : 'THREAT DETECTED'}
                         </span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-600">v2.4.1</span>
                   </div>

                   <div className="relative z-20 flex flex-col gap-4 mt-12 w-full justify-end flex-1">
                      {/* NODE 1: Data Sensitivity */}
                      <AnimatePresence>
                         {p >= 0.15 && (
                           <motion.div 
                             initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                             animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            className={`flex items-center justify-between rounded-2xl border p-4 backdrop-blur-md transition-colors duration-300 ${isRemediated ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-slate-700/50'}`}
                           >
                              <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isRemediated ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800/50 border-slate-700 text-teal-500'}`}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Data Classification</span>
                                    <span className="text-sm font-bold text-white tracking-wide">{isRemediated ? 'Anonymous (Hash)' : 'Customer PII'}</span>
                                 </div>
                              </div>
                              <span className={`text-[10px] font-black font-mono uppercase tracking-widest px-3 py-1 rounded-md border ${isRemediated ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                 {isRemediated ? 'SAFE' : 'IMPACT: HIGH'}
                              </span>
                           </motion.div>
                         )}
                      </AnimatePresence>

                      {/* NODE 2: Exposure Pattern */}
                      <AnimatePresence>
                         {p >= 0.30 && (
                           <motion.div 
                             initial={{ opacity: 0, x: -50, filter: 'blur(10px)' }}
                             animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            className={`flex items-center justify-between rounded-2xl border p-4 backdrop-blur-md transition-colors duration-300 ${isRemediated ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-white/5 border-slate-700/50'}`}
                           >
                              <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-colors ${isRemediated ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-800/50 border-slate-700 text-teal-500'}`}>
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
                                 </div>
                                 <div className="flex flex-col">
                                    <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Entry Vector</span>
                                    <span className="text-sm font-bold text-white tracking-wide">{isRemediated ? 'Internal Router' : 'Public Edge API'}</span>
                                 </div>
                              </div>
                              <span className={`text-[10px] font-black font-mono uppercase tracking-widest px-3 py-1 rounded-md border ${isRemediated ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-orange-500/10 border-orange-500/20 text-orange-500'}`}>
                                 {isRemediated ? 'BLOCKED' : 'Lh: EXTREME'}
                              </span>
                           </motion.div>
                         )}
                      </AnimatePresence>

                      {/* NODE 3: The Big Reveal -> Global Risk */}
                      <AnimatePresence>
                         {p >= 0.45 && (
                           <motion.div 
                             initial={{ opacity: 0, scale: 0.9, y: 30 }}
                             animate={{ opacity: 1, scale: 1, y: 0 }}
                            className={`relative mt-2 overflow-hidden rounded-[2rem] border p-6 shadow-2xl transition-all duration-[360ms] md:p-8 ${isRemediated ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-red-950/20 border-red-500/40'}`}
                           >
                              <div className={`pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full blur-[80px] transition-colors duration-300 ${isRemediated ? 'bg-emerald-500/20' : 'bg-red-500/30'}`} />
                              <div className="relative z-10 flex flex-col">
                                 <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-slate-400 mb-2 font-bold">Calculated Global Risk</span>
                                 <div className="flex items-end justify-between">
                                    <div className="flex items-baseline gap-2">
                                       <span className="text-6xl md:text-7xl font-black font-mono tracking-tighter text-white">
                                          {isRemediated ? '1.2' : '8.5'}
                                       </span>
                                       <span className="text-xl text-slate-500 font-bold mb-2">/10</span>
                                    </div>
                                    <div
                                      className={`px-3 py-2 rounded-xl border-2 uppercase text-xs md:text-sm font-black tracking-widest backdrop-blur-md mb-2 ${isRemediated ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' : 'bg-red-500/20 border-red-500 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.3)]'}`}
                                    >
                                       {isRemediated ? 'ACCEPTABLE' : 'CRITICAL'}
                                    </div>
                                 </div>
                              </div>
                           </motion.div>
                         )}
                      </AnimatePresence>
                   </div>
                </div>
             </div>

             {/* Right: Code Scanner Simulator */}
             <div className="lg:col-span-7 relative flex flex-col">
                <motion.div 
                   className="flex-1 bg-slate-950 border border-teal-500/20 rounded-3xl overflow-hidden flex flex-col shadow-2xl"
                   initial={{ scale: 0.95, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 0.5 }}
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
                          transition={{ duration: 2.1, repeat: Infinity, ease: "linear" }}
                        />
                      )}

                      <div className="space-y-4">
                         {codeSnippets.map((line, i) => (
                           <div key={line.line} className="flex gap-6 group items-start">
                              <span className="w-6 text-slate-700 text-right select-none pt-0.5">{line.line}</span>
                              <div className="relative flex-1 flex flex-col items-start gap-2">
                                 <span className={line.vul && !isRemediated ? "text-red-400 underline decoration-wavy decoration-red-500/40" : line.color}>
                                    {line.vul && isRemediated ? remediatedLine : line.content}
                                 </span>
                                 
                                 {line.vul && !isRemediated && (
                                   <motion.div 
                                      className="flex items-center gap-2 z-20"
                                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                      animate={{ opacity: 1, height: 'auto', marginTop: 4 }}
                                   >
                                      <span className="text-[9px] bg-[#2a0e14] text-red-400 px-3 py-1 rounded-md border border-red-500/40 font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(239,68,68,0.2)]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        VIOLATES: ISO-27001 (A.8.2)
                                      </span>
                                   </motion.div>
                                 )}

                                 {line.vul && isRemediated && (
                                   <motion.div 
                                      className="flex items-center gap-2 z-20"
                                      initial={{ opacity: 0, scale: 0.8, height: 0 }}
                                      animate={{ opacity: 1, scale: 1, height: 'auto' }}
                                   >
                                      <span className="text-[9px] bg-[#0e2a1b] text-emerald-400 px-3 py-1 rounded-md border border-emerald-500/40 font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        RISK MITIGATED
                                      </span>
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
    </>
  );
};
