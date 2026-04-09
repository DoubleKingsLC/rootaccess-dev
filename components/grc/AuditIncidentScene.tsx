"use client";

import React, { useCallback, useId, useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GRCBriefingCard } from "./GRCBriefingCard";

interface SceneProps {
  progress: number;
}

// Sub-component for the high-fidelity containment frame
const ContainmentFrame = () => (
  <motion.div 
    initial={{ scale: 2.5, opacity: 0, rotate: 15 }}
    animate={{ scale: 1, opacity: 1, rotate: 0 }}
    transition={{ type: "spring", stiffness: 220, damping: 20 }}
    className="absolute w-[140%] h-[140%] pointer-events-none z-10"
  >
    {/* Corner Brackets */}
    {[
      "top-0 left-0",
      "top-0 right-0 border-r-2 border-t-2",
      "bottom-0 left-0 border-l-2 border-b-2",
      "bottom-0 right-0 border-r-2 border-b-2"
    ].map((pos, i) => (
      <div key={i} className={`absolute w-5 h-5 border-teal-500/80 ${i === 0 ? "border-l-2 border-t-2" : i === 1 ? "border-r-2 border-t-2" : i === 2 ? "border-l-2 border-b-2" : "border-r-2 border-b-2"}`}>
        {/* Accent dot on corners */}
        <div className={`absolute w-1 h-1 bg-teal-400 rounded-full ${i === 0 ? "-top-0.5 -left-0.5" : i === 1 ? "-top-0.5 -right-0.5" : i === 2 ? "-bottom-0.5 -left-0.5" : "-bottom-0.5 -right-0.5"}`} />
      </div>
    ))}
    
    {/* Inner isolation grid */}
    <div className="absolute inset-2 bg-teal-500/[0.03] border border-teal-500/10 rounded-sm overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(20,184,166,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(20,184,166,0.2)_1px,transparent_1px)] bg-[size:10px:10px]" />
      <motion.div 
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-x-0 h-10 bg-gradient-to-b from-transparent via-teal-500/20 to-transparent"
      />
    </div>
  </motion.div>
);

const SHIELD_NODES = [
  { id: "access",   label: "Access Control",    sid: "AC-1", emoji: "🔑", cx: "50%", cy: "15%" },
  { id: "data",     label: "Data Protection",   sid: "DP-4", emoji: "🗄️", cx: "82%", cy: "30%" },
  { id: "network",  label: "Network Security",  sid: "NW-2", emoji: "🌐", cx: "82%", cy: "70%" },
  { id: "physical", label: "Physical Security",  sid: "PS-9", emoji: "🏢", cx: "50%", cy: "85%" },
  { id: "vendor",   label: "Vendor Risk",       sid: "VR-3", emoji: "🤝", cx: "18%", cy: "70%" },
  { id: "change",   label: "Change Mgmt",       sid: "CM-7", emoji: "📋", cx: "18%", cy: "30%" },
];

const BREACH_NODE_INDEX = 2; // "Network Security"

type HubGeometry = {
  w: number;
  h: number;
  hub: { x: number; y: number };
  nodes: { x: number; y: number }[];
};

/** Story window for incident beats (keeps internal thresholds aligned while scroll handoff shifts). */
const AUDIT_STORY_LO = 0.81;
const AUDIT_STORY_HI = 0.95;

export const AuditIncidentScene: React.FC<SceneProps> = ({ progress }) => {
  const cardStartFadeIn = 0.774;
  const cardEndFadeOut = 0.79;
  const sceneStartFadeIn = 0.79;
  /** Scene fully gone before Phase 7 (Reflection) begins — see ReflectionScene */
  const sceneEndFadeOut = 0.93;

  const isActive = progress >= cardStartFadeIn && progress < sceneEndFadeOut;
  if (!isActive) return null;

  const storyProgress =
    progress <= AUDIT_STORY_LO
      ? progress
      : AUDIT_STORY_LO + ((progress - AUDIT_STORY_LO) / (1 - AUDIT_STORY_LO)) * (AUDIT_STORY_HI - AUDIT_STORY_LO);
  const p = Math.min(1, Math.max(0, (storyProgress - AUDIT_STORY_LO) / (AUDIT_STORY_HI - AUDIT_STORY_LO)));

  const p_fade = (val: number, start: number, end: number) => Math.min(1, Math.max(0, (val - start) / (end - start)));
  const cardOpacity = progress < 0.784 ? p_fade(progress, 0.774, 0.78) : 1 - p_fade(progress, 0.784, 0.79);
  let sceneOpacity = 0;
  if (progress < 0.798) sceneOpacity = p_fade(progress, 0.79, 0.798);
  else if (progress < 0.88) sceneOpacity = 1;
  else if (progress < sceneEndFadeOut) sceneOpacity = 1 - p_fade(progress, 0.88, sceneEndFadeOut);
  else sceneOpacity = 0;

  const auditComplete       = p > 0.30;
  const threatApproaching   = p > 0.40 && p <= 0.50;
  const breachOccurred      = p > 0.50;
  const blastExpanding      = p > 0.58;
  const containmentActive   = p > 0.78;
  const isIncidentPhase     = p > 0.40;

  const getNodeState = (index: number): "idle" | "scanning" | "verified" | "breached" | "threatened" | "contained" => {
    if (!auditComplete) {
      const nodeThreshold = (index + 1) * 0.045;
      if (p > nodeThreshold + 0.04) return "verified";
      if (p > nodeThreshold) return "scanning";
      return "idle";
    }
    if (!breachOccurred) return "verified";
    if (index === BREACH_NODE_INDEX) return "breached";
    if (index === BREACH_NODE_INDEX - 1 || index === BREACH_NODE_INDEX + 1) {
      return containmentActive ? "contained" : blastExpanding ? "threatened" : "verified";
    }
    return "verified";
  };

  const getHudMessage = (): string => {
    if (containmentActive)   return "Isolation Complete — Perimeter Gaps Sealed";
    if (blastExpanding)      return "Assessing Blast Radius — Quantifying Exposure";
    if (breachOccurred)      return "SEV-1 ALERT: System Compromise Detected";
    if (threatApproaching)   return "Inbound Vector Detected — Origin Unknown";
    if (auditComplete)       return "Final Audit Pass Verified — Systems Nominal";
    return `Validating Regulatory Controls — ${Math.min(100, Math.round((p / 0.30) * 100))}%`;
  };

  const diagramWrapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geometry, setGeometry] = useState<HubGeometry | null>(null);
  const threatBlurId = useId().replace(/:/g, "");

  const measureHubLines = useCallback(() => {
    const run = () => {
      const wrap = diagramWrapRef.current;
      const hubEl = hubRef.current;
      if (!wrap || !hubEl) return;

      const wr = wrap.getBoundingClientRect();
      if (wr.width < 1 || wr.height < 1) return;

      const hubR = hubEl.getBoundingClientRect();
      const hub = {
        x: hubR.left + hubR.width / 2 - wr.left,
        y: hubR.top + hubR.height / 2 - wr.top,
      };

      const nodes = SHIELD_NODES.map((_, i) => {
        const el = nodeRefs.current[i];
        if (!el) return { x: hub.x, y: hub.y };
        const r = el.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - wr.left,
          y: r.top + r.height / 2 - wr.top,
        };
      });

      setGeometry({ w: wr.width, h: wr.height, hub, nodes });
    };
    run();
    requestAnimationFrame(run);
  }, []);

  useLayoutEffect(() => {
    measureHubLines();
    const wrap = diagramWrapRef.current;
    if (!wrap) return;
    const ro = new ResizeObserver(() => measureHubLines());
    ro.observe(wrap);
    window.addEventListener("resize", measureHubLines);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measureHubLines);
    };
  }, [measureHubLines, sceneOpacity, breachOccurred]);

  const breachTarget = geometry?.nodes[BREACH_NODE_INDEX];
  const threatFrom = geometry?.hub ?? { x: 0, y: 0 };
  const threatTo = breachTarget ?? threatFrom;

  return (
    <>
      <GRCBriefingCard
        phaseNumber={6}
        title="Emergency Ops"
        description="The moment of truth. When the pressure peaks, GRC is the voice of readiness. You guide operations through audits and manage the containment radius when a breach occurs."
        opacity={cardOpacity}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center p-4 md:p-12 text-white overflow-hidden pointer-events-none"
        style={{ opacity: sceneOpacity }}
      >
        <div className={`absolute inset-0 pointer-events-none transition-opacity duration-[400ms] ${breachOccurred ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-red-950/[0.03]" />
          <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-red-500/10 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-red-500/10 to-transparent" />
        </div>

        <div className="relative w-full max-w-7xl z-10 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Narrative Column */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-6"
              >
                <div>
                  <h2 className={`mb-2 font-mono text-[10px] uppercase tracking-[0.5em] transition-colors duration-300 ${isIncidentPhase ? 'text-red-500' : 'text-teal-500'}`}>
                    {isIncidentPhase ? 'Tactical Response' : 'Pre-Audit Validation'}
                  </h2>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none">
                    Mission <span className={isIncidentPhase ? 'text-red-500' : 'text-teal-400 transition-colors duration-300'}>Critical</span>
                  </h3>
                </div>

                <div className="space-y-6 border-l-2 border-white/5 pl-8 text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
                  <p className={`transition-all duration-300 ${isIncidentPhase ? 'opacity-30 scale-95 blur-[1px]' : 'opacity-100 scale-100'}`}>
                    Continuous auditing ensures that security targets aren't just met—they are <span className="text-white font-bold italic underline decoration-teal-500/50">permanent</span>.
                  </p>
                  <p className={`transition-all duration-300 ${isIncidentPhase ? 'opacity-100 scale-100' : 'opacity-30 scale-95 blur-[1px]'}`}>
                    When alarms ring, GRC defines the <span className="text-red-400 font-bold">Blast Radius</span>. We boundary the damage to protect the legal core of the business.
                  </p>
                </div>

                {/* HUD Display */}
                <div className={`relative mt-8 overflow-hidden rounded-3xl border p-6 backdrop-blur-md transition-all duration-[360ms] ${breachOccurred ? 'bg-red-950/20 border-red-500/30 ring-1 ring-red-500/20' : 'bg-[#0a0f16] border-teal-500/20 shadow-2xl'}`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-slate-500">System Command Feed</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-slate-700" />
                      <div className="w-1 h-1 rounded-full bg-slate-700" />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className={`w-3 h-3 rounded-full ${breachOccurred ? 'bg-red-500 animate-ping' : 'bg-teal-500'}`} />
                    <span className={`font-mono text-xs uppercase font-black tracking-widest ${breachOccurred ? 'text-red-400' : 'text-teal-400'}`}>
                      {getHudMessage()}
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Immersive Visualization */}
            <div className="relative flex h-[clamp(22rem,58vh,40rem)] min-h-0 flex-col items-center justify-center lg:col-span-7">
              
              <div
                ref={diagramWrapRef}
                className="relative flex h-full w-full scale-[0.9] items-center justify-center transition-transform sm:scale-100"
              >
                {/* Hub↔node lines — viewBox matches container px so lines track hub/node centers on resize */}
                {geometry && (
                  <svg
                    className="pointer-events-none absolute inset-0 z-10 h-full w-full overflow-visible"
                    viewBox={`0 0 ${geometry.w} ${geometry.h}`}
                  >
                    <defs>
                      <filter id={threatBlurId} x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceGraphic" stdDeviation={2} />
                      </filter>
                    </defs>
                    {SHIELD_NODES.map((node, i) => {
                      const state = getNodeState(i);
                      const color =
                        state === "breached"
                          ? "#ef4444"
                          : state === "threatened"
                            ? "#f59e0b"
                            : state === "verified" || state === "contained"
                              ? "#14b8a6"
                              : "#1e293b";
                      const end = geometry.nodes[i];
                      return (
                        <line
                          key={node.id}
                          x1={geometry.hub.x}
                          y1={geometry.hub.y}
                          x2={end.x}
                          y2={end.y}
                          stroke={color}
                          strokeWidth={1}
                          strokeDasharray={state === "idle" ? "2 2" : undefined}
                          opacity={state === "idle" ? 0.1 : 0.45}
                          className="transition-all duration-300"
                        />
                      );
                    })}

                    <AnimatePresence>
                      {threatApproaching && breachTarget && (
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <motion.circle
                            r={4}
                            fill="#ef4444"
                            filter={`url(#${threatBlurId})`}
                            initial={{ cx: threatFrom.x, cy: threatFrom.y }}
                            animate={{ cx: threatTo.x, cy: threatTo.y }}
                            transition={{ duration: 1.2, ease: "easeIn" }}
                          />
                          <motion.path
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1.2 }}
                            d={`M ${threatFrom.x} ${threatFrom.y} L ${threatTo.x} ${threatTo.y}`}
                            fill="none"
                            stroke="#ef4444"
                            strokeWidth={1}
                            strokeDasharray="4 4"
                            opacity={0.35}
                          />
                        </motion.g>
                      )}
                    </AnimatePresence>
                  </svg>
                )}

                {/* GRC Core */}
                <div className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
                  <div
                    ref={hubRef}
                    className={`flex h-20 w-20 items-center justify-center rounded-[2rem] border-2 bg-[#050a0f] backdrop-blur-xl transition-all duration-300 md:h-28 md:w-28 ${breachOccurred ? 'border-red-500 shadow-[0_0_80px_rgba(239,68,68,0.2)]' : 'border-teal-500/50 shadow-[0_0_50px_rgba(20,184,166,0.1)]'}`}
                  >
                    <span className="text-4xl md:text-5xl">{breachOccurred ? '🚨' : '🛡️'}</span>
                    
                    {/* Ring animation */}
                    <div className="absolute inset-0 rounded-[2rem] border border-white/5" />
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                      className="absolute -inset-4 border border-white/[0.03] rounded-full border-dashed"
                    />
                  </div>
                </div>

                {/* Nodes */}
                {SHIELD_NODES.map((node, i) => {
                  const state = getNodeState(i);
                  const isBreached = state === "breached";
                  const isContained = state === "contained";
                  const isThreatened = state === "threatened";
                  const isVerified = state === "verified" || isContained;

                  return (
                    <div key={node.id} className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-all duration-300" 
                      style={{ left: node.cx, top: node.cy }}>
                      
                      {/* --- BREACH VISUALS --- */}
                      {isBreached && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 1.2, repeat: Infinity }}
                            className="absolute w-24 h-24 bg-red-500 rounded-full blur-[30px]" 
                          />
                          {/* Fracture paths */}
                          <svg className="absolute w-20 h-20 overflow-visible">
                            <motion.path 
                              d="M -10 -10 L 0 0 L 10 -5 M 5 10 L 0 0 L -5 12"
                              fill="none" stroke="#ef4444" strokeWidth="2"
                              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                            />
                          </svg>
                        </div>
                      )}

                      {/* --- CONTAINMENT BRACKETS (THE "SAFE BLUE" OVERHAUL) --- */}
                      <AnimatePresence>
                        {isContained && <ContainmentFrame />}
                      </AnimatePresence>

                      {/* Node Holder — ref anchor for hub lines (center of icon box) */}
                      <div
                        ref={(el) => {
                          nodeRefs.current[i] = el;
                        }}
                        className={`relative z-20 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 md:h-16 md:w-16 ${
                        isBreached ? 'bg-red-950/40 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 
                        isThreatened ? 'bg-amber-950/20 border-amber-500/50' :
                        isVerified ? 'bg-slate-900 border-teal-500/60 shadow-[0_0_20px_rgba(20,184,166,0.2)]' :
                        'bg-slate-950 border-white/10'
                      }`}>
                        <span className="text-xl md:text-2xl">{node.emoji}</span>
                        
                        {/* Verfied Badge */}
                        {isVerified && !isBreached && !isIncidentPhase && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-[10px] shadow-lg">✓</motion.div>
                        )}
                        {isBreached && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-[10px] shadow-lg font-bold">✕</motion.div>
                        )}
                      </div>

                      {/* Tactical Labels */}
                      <div className="flex flex-col items-center">
                        <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border transition-all duration-300 backdrop-blur-sm ${
                          isBreached ? 'text-red-400 border-red-500/40 bg-red-950/80' : 
                          isVerified ? 'text-teal-400 border-teal-500/30 bg-black/60' :
                          'text-slate-500 border-white/5 bg-black/40'
                        }`}>
                          {node.label}
                        </span>
                        
                        {/* Sub-label/ID */}
                        <span className={`text-[7px] font-mono mt-0.5 opacity-40 transition-colors ${isBreached ? 'text-red-400' : isVerified ? 'text-teal-400' : 'text-slate-500'}`}>
                          ID::{node.sid} <span className="opacity-30">|</span> {isContained ? "FW_LOCK" : isVerified ? "VAL_PASS" : "WAIT_SET"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </>
  );
};
