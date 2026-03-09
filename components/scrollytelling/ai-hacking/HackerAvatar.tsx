import React from 'react';

export const HackerAvatar: React.FC<{ className?: string }> = ({ className = "" }) => (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-2 border-red-500 bg-red-950/30 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
            <div className="absolute inset-0 rounded-full border border-red-500/50 animate-[ping_3s_ease-in-out_infinite]" />
        </div>
        <div className="font-mono text-sm tracking-widest text-red-400">
            ATTACKER
        </div>
    </div>
);
