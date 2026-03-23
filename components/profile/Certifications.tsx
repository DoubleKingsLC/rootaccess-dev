"use client";

import { Certification } from "@/lib/profile-service";
import { motion } from "framer-motion";

interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {certifications.map((cert, i) => (
        <motion.div
           key={cert.id}
           initial={{ opacity: 0, y: 10 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ delay: i * 0.1 }}
           className="group p-5 rounded-2xl bg-[#0f172a]/40 border border-white/5 hover:border-cyan-500/30 transition-all duration-300 relative overflow-hidden"
        >
           {/* Verified Badge */}
           <div className="absolute top-4 right-4 flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/20">
              <div className="w-1 h-1 bg-cyan-400 rounded-full" />
              <span className="font-mono text-[8px] text-cyan-400 font-bold uppercase tracking-widest">Verified</span>
           </div>

           <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center font-heading font-black text-slate-500 text-xs">
                 {cert.issuer.substring(0, 3).toUpperCase()}
              </div>
              
              <div className="flex-1 min-w-0">
                 <h3 className="font-heading font-bold text-white truncate leading-tight group-hover:text-cyan-400 transition-colors">{cert.name}</h3>
                 <p className="font-mono text-[10px] text-slate-500 mt-1 uppercase tracking-wider">{cert.issuer}</p>
                 <div className="mt-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-600">{cert.date}</span>
                    <a 
                      href={cert.verifyUrl}
                      className="inline-flex items-center gap-2 font-mono text-[10px] text-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                       VERIFY
                       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M1 9l8-8M4 1h5v5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                       </svg>
                    </a>
                 </div>
              </div>
           </div>

           {/* Tech Accent */}
           <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
        </motion.div>
      ))}
    </div>
  );
}
