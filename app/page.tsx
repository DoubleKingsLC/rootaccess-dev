"use client";

import TopSection from "@/components/homepage/TopSection";

export default function HomePage() {
    return (
        <div className="bg-[#020617] text-on-background font-body selection:bg-primary/30 overflow-x-hidden">
            <TopSection />

            <footer className="bg-[#0a0e14] w-full py-20 border-t border-[#81ecff]/5 mt-16">
                <div className="flex flex-col md:flex-row justify-between items-center px-10 gap-12 w-full max-w-screen-2xl mx-auto">
                    <div className="flex flex-col gap-2">
                        <div className="text-[#81ecff] font-bold font-headline tracking-tighter text-xl">rootaccess.tech</div>
                        <div className="text-white/20 font-mono text-[10px] tracking-widest uppercase">Signal Ops // Authentic_Hub</div>
                    </div>
                    <div className="text-right">
                        <div className="text-[#bc87fe] font-label uppercase tracking-[0.3em] text-[11px] opacity-60 mb-2">© 2026 ROOTACCESS</div>
                        <div className="text-white/20 font-mono text-[8px] uppercase tracking-[0.4em]">Signal: Secure // Persistent</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
