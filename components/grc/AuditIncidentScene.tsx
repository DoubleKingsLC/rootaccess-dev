"use client";

import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GRCBriefingCard } from "./GRCBriefingCard";
import { ControlDomainIcon, IconShieldCheck, type ControlDomainIconId } from "./GRCSceneIcons";

interface SceneProps {
  progress: number;
}

const SHIELD_NODES: {
  id: string;
  label: string;
  sid: string;
  iconId: ControlDomainIconId;
  cx: string;
  cy: string;
}[] = [
  { id: "access", label: "Access Control", sid: "AC-1", iconId: "access", cx: "50%", cy: "15%" },
  { id: "data", label: "Data Protection", sid: "DP-4", iconId: "data", cx: "82%", cy: "30%" },
  { id: "network", label: "Network Security", sid: "NW-2", iconId: "network", cx: "82%", cy: "70%" },
  { id: "physical", label: "Physical Security", sid: "PS-9", iconId: "physical", cx: "50%", cy: "85%" },
  { id: "vendor", label: "Vendor Risk", sid: "VR-3", iconId: "vendor", cx: "18%", cy: "70%" },
  { id: "change", label: "Change Mgmt", sid: "CM-7", iconId: "change", cx: "18%", cy: "30%" },
];

/** Network Security — shown scanning longer so the “last gate” read is deliberate (no breach arc). */
const NETWORK_NODE_INDEX = 2;

type HubGeometry = {
  w: number;
  h: number;
  hub: { x: number; y: number };
  nodes: { x: number; y: number }[];
};

/** Scene fully visible → story completes here → then fade (avoids fading mid-beat). */
const SCENE_FULL_IN = 0.798;
const STORY_COMPLETE = 0.895;

export const AuditIncidentScene: React.FC<SceneProps> = ({ progress }) => {
  const cardStartFadeIn = 0.774;
  const cardEndFadeOut = 0.79;
  /** Scene fully gone before Reflection begins — see ReflectionScene */
  const sceneEndFadeOut = 0.93;

  const isActive = progress >= cardStartFadeIn && progress < sceneEndFadeOut;
  if (!isActive) return null;

  /** Linear 0→1 across the readable window so thresholds actually play out before fade. */
  const p = Math.min(1, Math.max(0, (progress - SCENE_FULL_IN) / (STORY_COMPLETE - SCENE_FULL_IN)));

  const p_fade = (val: number, start: number, end: number) => Math.min(1, Math.max(0, (val - start) / (end - start)));
  const cardOpacity = progress < 0.784 ? p_fade(progress, 0.774, 0.78) : 1 - p_fade(progress, 0.784, 0.79);
  let sceneOpacity = 0;
  if (progress < SCENE_FULL_IN) sceneOpacity = p_fade(progress, 0.79, SCENE_FULL_IN);
  else if (progress < STORY_COMPLETE) sceneOpacity = 1;
  else if (progress < sceneEndFadeOut) sceneOpacity = 1 - p_fade(progress, STORY_COMPLETE, sceneEndFadeOut);
  else sceneOpacity = 0;

  const auditComplete = p > 0.22;

  /**
   * Single pass only: during validation (p≤0.22) non-network stays idle so we never
   * “verify then reset” when auditComplete flips (that caused the double-check effect).
   */
  const getNodeState = (index: number): "idle" | "scanning" | "verified" => {
    if (!auditComplete) {
      if (index === NETWORK_NODE_INDEX) return "scanning";
      return "idle";
    }
    if (index === NETWORK_NODE_INDEX) {
      if (p < 0.68) return "scanning";
      return "verified";
    }
    const NON_NET = [0, 1, 3, 4, 5] as const;
    const pos = NON_NET.indexOf(index as 0 | 1 | 3 | 4 | 5);
    if (pos < 0) return "verified";
    const t0 = 0.24 + pos * 0.055;
    if (p >= t0 + 0.045) return "verified";
    if (p >= t0) return "scanning";
    return "idle";
  };

  const getHudMessage = (): string => {
    if (p >= 0.74) return "Final Audit Pass — All Domains Verified";
    if (p >= 0.68) return "Network Security — Final Control Gate Cleared";
    if (auditComplete) return "Domain Control Verification In Progress";
    return `Validating Regulatory Controls — ${Math.min(100, Math.round((p / 0.22) * 100))}%`;
  };

  const diagramWrapRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [geometry, setGeometry] = useState<HubGeometry | null>(null);

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
  }, [measureHubLines, sceneOpacity]);

  return (
    <>
      <GRCBriefingCard
        taskNumber={6}
        title="Close the audit loop"
        description="Validate controls domain by domain—network and segmentation last—so what you attest in policy matches what is running in production."
        opacity={cardOpacity}
      />

      <motion.div
        className="absolute inset-0 flex items-center justify-center p-4 md:p-12 text-white overflow-hidden pointer-events-none"
        style={{ opacity: sceneOpacity }}
      >
        <div className="relative w-full max-w-7xl z-10 pointer-events-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Narrative Column */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.45 }}
                className="space-y-4"
              >
                <div>
                  <h2 className="mb-2 font-mono text-[10px] uppercase tracking-[0.5em] text-teal-500">Pre-Audit Validation</h2>
                  <h3 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tight uppercase leading-none">
                    Mission Critical <span className="text-teal-400">Audits</span>
                  </h3>
                </div>

                <div className="border-l-2 border-white/5 pl-8 text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
                  <p>
                    Continuous auditing ensures that security targets aren&apos;t just met—they are{" "}
                    <span className="text-white font-bold italic underline decoration-teal-500/50">permanent</span>.
                  </p>
                </div>

                {/* HUD Display — enlarged so the command feed + validation state read as primary context */}
                <div
                  className="relative mt-4 w-full min-h-[clamp(11rem,26vh,18rem)] overflow-hidden rounded-3xl border border-teal-500/20 bg-[#0a0f16] p-8 shadow-2xl backdrop-blur-md transition-all duration-[360ms] md:mt-5"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-slate-400 md:text-sm">
                      System Command Feed
                    </span>
                    <div className="flex gap-1.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                      <div className="h-1.5 w-1.5 rounded-full bg-slate-600" />
                    </div>
                  </div>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center gap-4">
                      <div className="h-5 w-5 shrink-0 rounded-full bg-teal-500 shadow-[0_0_14px_rgba(20,184,166,0.45)] md:h-6 md:w-6" />
                      <span className="font-mono text-base font-black uppercase leading-tight tracking-[0.06em] text-teal-400 md:text-xl lg:text-2xl">
                        {getHudMessage()}
                      </span>
                    </div>
                    {!auditComplete && (
                      <div className="space-y-3 border-t border-white/5 pt-5">
                        <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800/90 md:h-3.5">
                          <div
                            className="h-full rounded-full bg-teal-500 shadow-[0_0_12px_rgba(20,184,166,0.35)] transition-[width] duration-300"
                            style={{ width: `${Math.min(100, (p / 0.22) * 100)}%` }}
                          />
                        </div>
                        <p className="font-mono text-[11px] uppercase tracking-widest text-slate-500 md:text-xs">
                          Mapping audit checks to live controls — progress updates as each domain validates.
                        </p>
                      </div>
                    )}
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
                    {SHIELD_NODES.map((node, i) => {
                      const state = getNodeState(i);
                      const color =
                        state === "verified" ? "#14b8a6" : state === "scanning" ? "#f59e0b" : "#1e293b";
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
                  </svg>
                )}

                {/* GRC Core */}
                <div className="absolute left-1/2 top-1/2 z-30 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3">
                  <div
                    ref={hubRef}
                    className="flex h-20 w-20 items-center justify-center rounded-[2rem] border-2 border-teal-500/50 bg-[#050a0f] shadow-[0_0_50px_rgba(20,184,166,0.1)] backdrop-blur-xl transition-all duration-300 md:h-28 md:w-28"
                  >
                    <IconShieldCheck className="text-teal-400" size={52} title="GRC control hub" />
                    
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
                  const isScanning = state === "scanning";
                  const isVerified = state === "verified";

                  return (
                    <div key={node.id} className="absolute z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-all duration-300" 
                      style={{ left: node.cx, top: node.cy }}>

                      {/* Node Holder — ref anchor for hub lines (center of icon box) */}
                      <div
                        ref={(el) => {
                          nodeRefs.current[i] = el;
                        }}
                        className={`relative z-20 flex h-12 w-12 items-center justify-center rounded-2xl border transition-all duration-300 md:h-16 md:w-16 ${
                          isVerified
                            ? "border-teal-500/60 bg-slate-900 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                            : isScanning
                              ? "border-amber-500/60 bg-amber-950/25 shadow-[0_0_18px_rgba(245,158,11,0.15)]"
                              : "border-white/10 bg-slate-950"
                        }`}
                      >
                        <ControlDomainIcon
                          id={node.iconId}
                          className={
                            isVerified
                              ? "text-teal-300"
                              : isScanning
                                ? "text-amber-300"
                                : "text-slate-500"
                          }
                          size={28}
                        />

                        {isVerified && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-teal-500 text-[10px] shadow-lg">
                            ✓
                          </motion.div>
                        )}
                        {isScanning && (
                          <span className="absolute -bottom-1 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-amber-500/80 animate-pulse" />
                        )}
                      </div>

                      {/* Tactical Labels */}
                      <div className="flex flex-col items-center">
                        <span
                          className={`rounded-md border px-2.5 py-1 text-[8px] font-black uppercase tracking-widest backdrop-blur-sm transition-all duration-300 md:text-[9px] ${
                            isVerified
                              ? "border-teal-500/30 bg-black/60 text-teal-400"
                              : isScanning
                                ? "border-amber-500/35 bg-black/60 text-amber-400"
                                : "border-white/5 bg-black/40 text-slate-500"
                          }`}
                        >
                          {node.label}
                        </span>

                        <span
                          className={`mt-0.5 font-mono text-[7px] opacity-40 transition-colors ${
                            isVerified ? "text-teal-400" : isScanning ? "text-amber-400" : "text-slate-500"
                          }`}
                        >
                          ID::{node.sid} <span className="opacity-30">|</span>{" "}
                          {isVerified ? "VAL_PASS" : isScanning ? "SCAN_RUN" : "PENDING"}
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
