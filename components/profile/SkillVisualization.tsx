"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  value: number;
}

interface SkillVisualizationProps {
  skills: Skill[];
}

export default function SkillVisualization({ skills }: SkillVisualizationProps) {
  const size = 300;
  const center = size / 2;
  const radius = size * 0.4;
  const angleStep = (Math.PI * 2) / skills.length;

  const getPoint = (value: number, index: number, totalRadius = radius) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / 100) * totalRadius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const points = skills.map((s, i) => getPoint(s.value, i));
  const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-slate-500 whitespace-nowrap">Skill Matrix</h2>
        <div className="h-px w-full bg-gradient-to-r from-slate-800 to-transparent" />
      </div>

      <div className="relative flex justify-center bg-[#0f172a]/20 rounded-2xl border border-white/5 p-8 overflow-hidden group">
        {/* Background Accents */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)]" />
        
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="relative z-10 drop-shadow-[0_0_15px_rgba(6,182,212,0.1)]">
          {/* Grid Circles */}
          {[0.2, 0.4, 0.6, 0.8, 1].map((scale) => (
            <circle
              key={scale}
              cx={center}
              cy={center}
              r={radius * scale}
              fill="none"
              stroke="rgba(255,255,255,0.03)"
              strokeWidth="1"
            />
          ))}

          {/* Axis Lines */}
          {skills.map((_, i) => {
            const p = getPoint(100, i);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={p.x}
                y2={p.y}
                stroke="rgba(255,255,255,0.05)"
                strokeWidth="1"
              />
            );
          })}

          {/* Skill Web */}
          <motion.path
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            d={pathData}
            fill="rgba(6,182,212,0.15)"
            stroke="rgb(6,182,212)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="rgb(6,182,212)"
              className="drop-shadow-[0_0_5px_rgba(6,182,212,1)]"
            />
          ))}
        </svg>

        {/* Labels - positioned manually around the SVG */}
        {skills.map((s, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const tx = center + (radius + 25) * Math.cos(angle);
            const ty = center + (radius + 15) * Math.sin(angle);
            return (
                <div 
                    key={s.name}
                    className="absolute font-mono text-[9px] tracking-tighter text-slate-500 uppercase font-bold"
                    style={{
                        left: tx,
                        top: ty,
                        transform: 'translate(-50%, -50%)',
                        whiteSpace: 'nowrap'
                    }}
                >
                    {s.name}
                </div>
            )
        })}

        {/* Center Tech Detail */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-cyan-500/30 flex items-center justify-center opacity-50">
             <div className="w-1 h-1 bg-cyan-400 rounded-full animate-ping" />
        </div>
      </div>

      {/* Legend / Values */}
      <div className="grid grid-cols-2 gap-3">
         {skills.map((s, i) => (
             <div key={s.name} className="flex items-center justify-between p-2 rounded bg-white/5 border border-white/5">
                 <span className="font-mono text-[8px] text-slate-400">{s.name}</span>
                 <span className="font-heading text-xs font-bold text-cyan-400">{s.value}%</span>
             </div>
         ))}
      </div>
    </div>
  );
}
