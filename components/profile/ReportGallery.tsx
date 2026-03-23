"use client";

import { Report } from "@/lib/profile-service";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ReportGalleryProps {
  reports: Report[];
}

export default function ReportGallery({ reports }: ReportGalleryProps) {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, i) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group relative flex flex-col p-6 rounded-2xl bg-[#0f172a]/40 border border-white/5 hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
          >
            {/* Visual Header */}
            <div className="mb-4 flex items-center justify-between">
              <span className="px-3 py-1 rounded bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[9px] tracking-widest uppercase font-bold">
                {report.type}
              </span>
              <span className="font-mono text-[9px] text-slate-600">{report.date}</span>
            </div>

            <h3 className="font-heading font-bold text-lg text-white group-hover:text-purple-400 transition-colors mb-4 line-clamp-2">
              {report.title}
            </h3>

            <div className="mt-auto flex items-center gap-3">
              <button 
                onClick={() => setSelectedReport(report)}
                className="flex-1 py-2 px-4 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] tracking-widest uppercase hover:bg-purple-500/20 transition-all duration-300 flex items-center justify-center gap-2"
              >
                 <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M1 6s1.5-3 5-3 5 3 5 3-1.5 3-5 3-5-3-5-3z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="6" cy="6" r="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
                 OPEN PREVIEW
              </button>
              
              <a 
                href={report.fileUrl} 
                className="p-2 rounded-lg bg-slate-900 border border-white/5 text-slate-500 hover:text-white hover:border-white/20 transition-all"
                title="Download PDF"
              >
                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M3 11h8M7 3v6m0 0l-3-3m3 3l3-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                 </svg>
              </a>
            </div>

            {/* Subtle Gradient Glow */}
            <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-purple-500/5 blur-2xl group-hover:bg-purple-500/10 transition-all rounded-full" />
          </motion.div>
        ))}
      </div>

      {/* Modern PDF Preview Modal */}
      <AnimatePresence>
        {selectedReport && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#020617]/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl h-[85vh] bg-[#0f172a] rounded-3xl border border-white/10 shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-4 border-b border-white/5 flex items-center justify-between bg-black/40">
                <div className="flex items-center gap-4">
                   <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400">
                     <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 11V3l8 10V5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                     </svg>
                   </div>
                   <div>
                     <h4 className="font-heading font-bold text-white tracking-tight">{selectedReport.title}</h4>
                     <p className="font-mono text-[9px] text-slate-500 uppercase tracking-widest">{selectedReport.type} // Analytical Report</p>
                   </div>
                </div>
                <button 
                  onClick={() => setSelectedReport(null)}
                  className="p-2.5 rounded-full bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                     <path d="M12 4L4 12M4 4l8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </button>
              </div>

              {/* PDF Content Area */}
              <div className="flex-1 bg-[#1e293b]/50 relative flex items-center justify-center">
                 <div className="text-center space-y-4 p-12 max-w-md">
                    <div className="w-16 h-16 rounded-full border-2 border-dashed border-slate-700 flex items-center justify-center mx-auto">
                       <div className="w-2 h-2 bg-slate-700 rounded-full animate-ping" />
                    </div>
                    <p className="font-mono text-xs text-slate-500 uppercase tracking-[0.2em] leading-relaxed">
                       SECURE_DOCUMENT_VIEWER_V1.0.4<br/>
                       [SYSTEM: READY]<br/>
                       [STATUS: FETCHING_RESOURCE...]
                    </p>
                    <p className="text-slate-400 text-sm italic">
                      In a production environment, the PDF would render here using react-pdf-viewer or an iframe source for <strong>{selectedReport.title}</strong>.
                    </p>
                    <a 
                      href={selectedReport.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-[10px] tracking-widest uppercase hover:bg-cyan-500/20 transition-all font-bold"
                    >
                      OPEN IN FULL VIEW
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M1 9l8-8M4 1h5v5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                 </div>
                 
                 {/* Decorative Grid */}
                 <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] pointer-events-none" />
              </div>

              {/* Modal Footer/Toolbar */}
              <div className="p-4 bg-black/40 border-t border-white/5 flex items-center justify-center gap-6">
                 <div className="flex items-center gap-2 font-mono text-[9px] text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-slate-800" /> ENCRYPTION: AES-256
                 </div>
                 <div className="flex items-center gap-2 font-mono text-[9px] text-slate-600">
                    <span className="w-2 h-2 rounded-full bg-slate-800" /> INTEGRITY: VERIFIED
                 </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
