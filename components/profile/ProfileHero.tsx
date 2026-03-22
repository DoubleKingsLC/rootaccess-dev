"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { UserProfile } from "@/lib/profile-service";

interface ProfileHeroProps {
  profile: UserProfile;
}

export default function ProfileHero({ profile }: ProfileHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const rankRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(containerRef.current, {
        opacity: 0,
        y: 30,
        duration: 1.2,
        ease: "expo.out",
      });

      gsap.from(nameRef.current, {
        opacity: 0,
        x: -20,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(avatarRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        delay: 0.2,
        ease: "elastic.out(1, 0.75)",
      });

      // Rank Pulse Animation
      gsap.to(rankRef.current, {
        boxShadow: "0 0 20px rgba(34, 211, 238, 0.4)",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative py-12 flex flex-col items-center text-center lg:items-start lg:text-left">
      <div className="flex flex-col lg:flex-row items-center gap-10 w-full">
        {/* Avatar Section */}
        <div ref={avatarRef} className="relative w-40 h-40 group">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 animate-pulse blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
          <div className="relative w-full h-full rounded-2xl border border-white/10 bg-[#0f172a] overflow-hidden flex items-center justify-center">
             {/* Placeholder for real avatar, using a styled initials fallback */}
             <span className="font-heading text-6xl font-bold bg-gradient-to-br from-white to-slate-500 bg-clip-text text-transparent">
                {profile.displayName.charAt(0)}
             </span>
             
             {/* Tech Brackets */}
             <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyan-500/50" />
             <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-purple-500/50" />
          </div>
          
          {/* Status Indicator */}
          <div className="absolute -bottom-2 -right-2 px-3 py-1 rounded bg-black border border-cyan-500/30 flex items-center gap-2 shadow-xl">
             <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,1)]" />
             <span className="font-mono text-[9px] text-cyan-400 tracking-widest uppercase font-bold">Verified</span>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
             <div ref={rankRef} className="px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono text-xs tracking-widest font-bold uppercase">
                {profile.rootAccessRank.tier} CLASS
             </div>
             <div className="text-slate-500 font-mono text-[10px] tracking-widest uppercase">
                Global Rank: <span className="text-white">#{profile.rootAccessRank.globalRank}</span>
             </div>
          </div>

          <h1 ref={nameRef} className="font-heading text-5xl lg:text-7xl font-bold tracking-tight text-white mb-2">
            {profile.displayName}
            <span className="text-cyan-500/50 text-2xl ml-2 font-mono">@{profile.username}</span>
          </h1>

          <p className="max-w-2xl text-slate-400 font-medium leading-relaxed italic text-lg opacity-80">
            "{profile.bio}"
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4 text-xs font-mono text-slate-500 tracking-wide uppercase">
             <div className="flex items-center gap-2">
                <span className="text-cyan-500/50">Location:</span> 
                <span className="text-slate-300">{profile.location}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-cyan-500/50">Joined:</span> 
                <span className="text-slate-300">{profile.memberSince}</span>
             </div>
             <div className="flex items-center gap-2">
                <span className="text-cyan-500/50">Web:</span> 
                <a href={profile.website} className="text-cyan-400 hover:underline">{profile.website.replace('https://', '')}</a>
             </div>
          </div>
        </div>
      </div>

      {/* Decorative Line */}
      <div className="absolute -bottom-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent w-full" />
    </div>
  );
}
