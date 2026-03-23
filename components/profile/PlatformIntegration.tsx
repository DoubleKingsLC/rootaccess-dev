"use client";

import { ExternalStats, UserProfile } from "@/lib/profile-service";
import { motion } from "framer-motion";

interface PlatformIntegrationProps {
  platforms: UserProfile['platforms'];
}

const PLATFORM_CONFIG = {
  tryhackme: {
    name: "TryHackMe",
    color: "#de3333",
    bg: "rgba(222, 51, 51, 0.05)",
    border: "rgba(222, 51, 51, 0.2)",
    icon: "THM",
  },
  hackthebox: {
    name: "HackTheBox",
    color: "#9fe52f",
    bg: "rgba(159, 229, 47, 0.05)",
    border: "rgba(159, 229, 47, 0.2)",
    icon: "HTB",
  },
  cyberdefenders: {
    name: "CyberDefenders",
    color: "#34d399",
    bg: "rgba(52, 211, 153, 0.05)",
    border: "rgba(52, 211, 153, 0.2)",
    icon: "CD",
  },
  btlo: {
    name: "Blue Team Labs",
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.05)",
    border: "rgba(59, 130, 246, 0.2)",
    icon: "BTLO",
  },
};

export default function PlatformIntegration({ platforms }: PlatformIntegrationProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-slate-500 whitespace-nowrap">External Rankings</h2>
        <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {Object.entries(PLATFORM_CONFIG).map(([key, config]) => {
          const stats = platforms[key as keyof typeof platforms] as any;
          if (!stats) return null;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02, translateX: 5 }}
              transition={{ duration: 0.3 }}
              className="group relative p-4 rounded-xl border border-white/5 bg-[#0f172a]/40 overflow-hidden"
              style={{
                borderColor: config.border,
                backgroundColor: config.bg,
              }}
            >
              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-40 transition-opacity">
                 <div className="absolute top-2 right-2 w-full h-full border-t-2 border-r-2" style={{ borderColor: config.color }} />
              </div>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center font-heading font-black text-sm border border-white/10 bg-[#020617]" style={{ color: config.color }}>
                    {config.icon}
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">{config.name}</p>
                    <h3 className="font-heading text-lg font-bold text-white tracking-tight">
                       {stats.username}
                    </h3>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-mono text-[9px] tracking-[0.2em] text-cyan-500/50 uppercase">Current Rank</p>
                  <p className="font-heading text-xl font-black italic uppercase tracking-tighter" style={{ color: config.color }}>
                    {stats.rank}
                  </p>
                </div>
              </div>

              {/* Stats Row */}
              <div className="mt-4 flex items-center gap-6 border-t border-white/5 pt-3">
                 {stats.points && (
                   <div className="flex flex-col">
                      <span className="font-mono text-[8px] tracking-widest text-slate-500 uppercase">Points</span>
                      <span className="text-sm font-bold text-slate-300 tabular-nums">{stats.points.toLocaleString()}</span>
                   </div>
                 )}
                 {stats.userOwned && (
                   <div className="flex flex-col">
                      <span className="font-mono text-[8px] tracking-widest text-slate-500 uppercase">Owned</span>
                      <span className="text-sm font-bold text-slate-300 tabular-nums">{stats.userOwned + stats.rootOwned}</span>
                   </div>
                 )}
                 {stats.percentile && (
                   <div className="flex flex-col">
                      <span className="font-mono text-[8px] tracking-widest text-slate-500 uppercase">Top</span>
                      <span className="text-sm font-bold text-cyan-400 tabular-nums font-mono">{stats.percentile}</span>
                   </div>
                 )}
                 <div className="ml-auto">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                 </div>
              </div>

              {/* Subtle Scanline */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-0" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
