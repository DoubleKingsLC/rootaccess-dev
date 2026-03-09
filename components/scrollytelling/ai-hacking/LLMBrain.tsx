import React from 'react';

export const LLMBrain: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="relative flex h-32 w-32 items-center justify-center">
            {/* 10% opacity shield */}
            <div className="absolute inset-0 rounded-full border-2 border-cyan-400 border-dashed bg-cyan-400/10 shadow-[0_0_20px_rgba(34,211,238,0.3)] animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-2 rounded-full border border-cyan-400/30 bg-cyan-400/5 shadow-[inset_0_0_15px_rgba(34,211,238,0.2)]" />
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" /><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" /><path d="M17.599 6.5a3 3 0 0 0 .399-1.375" /><path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" /><path d="M3.477 10.896a4 4 0 0 1 .585-.396" /><path d="M19.938 10.5a4 4 0 0 1 .585.396" /><path d="M6 18a4 4 0 0 1-1.967-.516" /><path d="M19.967 17.484A4 4 0 0 1 18 18" /></svg>
        </div>
        <div className="font-mono text-sm tracking-widest text-cyan-400">
            TARGET_LLM
        </div>
    </div>
);
