"use client";

import { createClient } from "@/lib/supabase/client";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  const handleGitHubLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Login error:", error.message);
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      console.error("Login error:", error.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-[length:50px_50px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center gap-2 font-heading font-bold text-3xl tracking-tight text-cyan-400 mb-6 group">
             <span className="w-10 h-10 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-900 transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.15)]">R</span>
             <span>RootAccess</span>
          </Link>
          <h1 className="font-heading text-xl font-bold text-slate-200 tracking-tight">Identity Verification Required</h1>
          <p className="font-mono text-[10px] text-slate-500 uppercase tracking-[0.3em] mt-2">Access Portal // Security Protocol v1.0.4</p>
        </div>

        <div className="bg-[#0f172a]/40 border border-white/5 backdrop-blur-md rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
          {/* Tech Brackets */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-cyan-500/20 group-hover:border-cyan-500/50 transition-colors" />

          <div className="space-y-6">
            <p className="text-slate-400 text-sm text-center font-medium leading-relaxed">
              Connect your professional identity to manage your interactive portfolio, certifications, and high-performance stats.
            </p>

            <button
              onClick={handleGitHubLogin}
              disabled={loading}
              className="w-full relative group/btn flex items-center justify-center gap-4 py-4 rounded-xl bg-slate-100 text-black font-bold text-sm tracking-tight hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              {loading ? "INITIALIZING..." : "CONTINUE WITH GITHUB"}
              <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[30deg] group-hover/btn:left-[150%] transition-all duration-700 pointer-events-none" />
            </button>

            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="w-full relative group/btn flex items-center justify-center gap-4 py-4 rounded-xl bg-[#1e293b]/50 border border-white/5 text-white font-bold text-sm tracking-tight hover:bg-[#1e293b]/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
            >
              <svg width="20" height="20" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083L43.611,20.083L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              {loading ? "INITIALIZING..." : "CONTINUE WITH GOOGLE"}
              <div className="absolute top-0 -left-[100%] w-[50%] h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[30deg] group-hover/btn:left-[150%] transition-all duration-700 pointer-events-none" />
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
              <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em] font-mono text-slate-600">
                <span className="bg-[#020617] px-4 py-1 rounded-full border border-white/5">End-to-End Encrypted</span>
              </div>
            </div>

            <p className="text-[10px] text-slate-500 font-mono text-center tracking-wider leading-relaxed">
              By continuing, you agree to the RootAccess Terminus and Security Protocol. Authentication is handled securely via Supabase.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Terminal Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[8px] tracking-[0.2em] text-cyan-500/50 uppercase"
      >
        <div className="flex items-center gap-4">
           <span>Sys.Status: Online</span>
           <span>Latency: 24ms</span>
        </div>
        <div>
           © 2026 ROOTACCESS.TECH // ALL RIGHTS RESERVED
        </div>
      </motion.div>
    </div>
  );
}
