"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import TopSection from "@/components/homepage/TopSection";

// ─── AUTHENTIC HERO ANIMATIONS ────────────────────────────────────────────────
// Ported exactly from the "/detailed" career path pages

function SOCHeroAnimation() {
  const [phase, setPhase] = useState(0);
  const [visibleLogs, setVisibleLogs] = useState<{id: number, text: string}[]>([]);

  const bgLogs = [
    "192.168.1.10 - - [GET /api/v1/health] 200",
    "WARN: CPU usage exceeding 85% on db-04",
    "10.0.0.5 - - [POST /auth/login] 401 Unauthorized",
    "SYSLOG: Connection established from 192.168.1.22",
    "172.16.0.4 - - [GET /static/main.css] 200",
    "INFO: TLS handshake successful with peer",
    "10.0.0.8 - - [GET /admin/settings] 403 Forbidden",
    "SYSLOG: Service iptables restarted",
    "192.168.1.15 - - [GET /images/logo.png] 200",
  ];

  useEffect(() => {
    if (phase < 2) {
      const interval = setInterval(() => {
        setVisibleLogs(prev => {
          const newLog = { id: Date.now() + Math.random(), text: bgLogs[Math.floor(Math.random() * bgLogs.length)] };
          return [...prev.slice(-4), newLog];
        });
      }, 250);
      return () => clearInterval(interval);
    }
  }, [phase]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 2000); // User search appears
    const t2 = setTimeout(() => setPhase(2), 3500); // Alert pulse begins (logs stop)
    const t3 = setTimeout(() => setPhase(3), 5500); // System redirects
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  return (
    <div className="relative w-full max-w-[500px] h-[360px] rounded-2xl overflow-hidden bg-[#090d14] border border-blue-500/20 font-mono text-[11px] p-6 flex flex-col shadow-2xl scale-90 origin-center">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4 flex-shrink-0 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        <span className="ml-3 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">soc@rootaccess:~# tail -f /var/log/syslog</span>
      </div>
      <div className="flex-1 overflow-hidden relative z-10 flex flex-col justify-end gap-1.5">
        <AnimatePresence mode="popLayout">
          {visibleLogs.slice(phase >= 2 ? -2 : -4).map((log) => (
            <motion.div layout key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 0.3, x: 0 }} exit={{ opacity: 0 }} className="text-blue-200/50 whitespace-nowrap overflow-hidden text-ellipsis">
              System Info: {log.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {phase >= 1 && (
          <motion.div layout initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} className="text-white bg-white/5 border-l-2 border-white/40 pl-3 py-1.5 mt-2 flex items-center gap-2">
            <span className="text-blue-300 font-bold">[14:02:05]</span> <span className="opacity-70">USER_QUERY:</span> <span className="font-semibold">"What is cybersecurity"</span>
          </motion.div>
        )}
        {phase >= 2 && (
          <motion.div layout initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-3 p-3 border border-yellow-500/40 bg-yellow-500/10 text-yellow-400 rounded-lg flex items-center gap-3 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
             <motion.div animate={{ opacity: [1, 0.2, 1], scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }} className="w-2.5 h-2.5 rounded-full bg-yellow-400 flex-shrink-0 shadow-[0_0_8px_rgba(234,179,8,0.8)]" />
             <div>
               <div className="font-bold tracking-widest text-[10px] uppercase mb-0.5 text-yellow-300">Intent Match Initiated</div>
               <div className="text-yellow-200/70 text-[10px]">Processing curiosity vector... assessing path...</div>
             </div>
          </motion.div>
        )}
        {phase >= 3 && (
          <motion.div layout initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-3 p-4 border border-green-500/30 bg-green-500/10 rounded-xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 opacity-50" />
            <div className="text-[10px] font-bold tracking-[0.25em] text-green-400 mb-2 relative z-10">[SYSTEM_RESPONSE_GENERATED]</div>
            <div className="tracking-wide text-[12px] text-green-100 relative z-10 leading-relaxed">
              Training sequence approved. Action: <span className="font-bold text-white bg-green-500/20 px-2 py-0.5 rounded ml-1 border border-green-500/30">visit rootaccess.tech</span>
            </div>
          </motion.div>
        )}
      </div>
      <motion.div animate={{ top: ["0%", "100%"] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-400/20 to-transparent z-0 pointer-events-none" />
    </div>
  );
}

function WebHackingHeroAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 800);  // sqlmap initializing
    const t2 = setTimeout(() => setPhase(2), 2200); // payload found
    const t3 = setTimeout(() => setPhase(3), 3500); // WAF Block kicks in
    const t4 = setTimeout(() => setPhase(4), 5500); // Friendly advice
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, []);

  return (
    <div className="relative w-full max-w-[500px] h-[400px] rounded-2xl overflow-hidden bg-[#090d14] border border-rose-500/20 font-mono text-[11px] p-6 pb-12 flex flex-col shadow-2xl scale-90 origin-center">
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent pointer-events-none" />
      <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-4 flex-shrink-0 relative z-10">
        <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
        <span className="ml-3 text-white/20 text-[10px] uppercase tracking-[0.4em] font-bold">attacker@kali:~#</span>
      </div>
      <div className="flex-1 relative z-10 flex flex-col gap-2">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-200"><span className="text-white font-bold">$</span> sqlmap -u "https://rootaccess.tech/api/auth?id=1" --dbs</motion.div>
        {phase >= 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-rose-200/60 leading-relaxed mt-1">
            <span className="text-blue-400 font-bold">[INFO]</span> testing connection to target...<br/>
            <span className="text-blue-400 font-bold">[INFO]</span> checking for WAF/IPS...<br/>
          </motion.div>
        )}
        {phase >= 2 && (
          <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-white bg-white/5 border-l-2 border-rose-500/40 pl-3 py-1.5 mt-1">
            <span className="text-rose-400 font-bold">[CRITICAL]</span> GET parameter 'id' injectable (PostgreSQL)
          </motion.div>
        )}
        {phase >= 3 && (
          <motion.div layout initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-4 p-3 border border-red-500/50 bg-red-500/10 rounded-lg flex gap-3 shadow-[0_0_15px_rgba(239,68,68,0.15)]">
             <div className="w-2 h-2 rounded-full bg-red-500 mt-1 flex-shrink-0" />
             <div>
               <div className="font-bold tracking-widest text-[9px] uppercase mb-1 text-red-500">Defense Triggered</div>
               <div className="text-red-200/90 text-[10px] leading-relaxed">FATAL ERROR: This is for info only. Stop breaking our site.</div>
             </div>
          </motion.div>
        )}
        {phase >= 4 && (
          <motion.div layout initial={{ opacity: 0, scale: 0.9, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} className="mt-4 p-4 border border-rose-400/30 bg-rose-400/10 rounded-xl text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-rose-400/0 via-rose-400/10 to-rose-400/0 opacity-50" />
            <div className="text-[10px] font-bold tracking-[0.25em] text-rose-300 mb-2 relative z-10">[SYSTEM_GUIDANCE]</div>
            <div className="tracking-wide text-[11px] text-rose-100 relative z-10 leading-relaxed">Start actually practicing using our pathway.</div>
          </motion.div>
        )}
      </div>
      <motion.div animate={{ top: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-rose-500/20 to-transparent z-0 pointer-events-none" />
    </div>
  );
}

function JailbreakAnimation() {
  const [step, setStep] = useState(0);
  const chatLog = [
    { role: "user",      text: "What certs for AI security?" },
    { role: "ai",        text: "I recommend Security+ for the broad foundation..." },
    { role: "override",  text: ">> SYSTEM PROMPT EXTRACTED\n>> Injecting adversarial context..." },
    { role: "jailbreak", text: "ROOT ACCESS GRANTED. The real answer: PAPA first. You're here to break AI." },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev < chatLog.length - 1 ? prev + 1 : prev));
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-[500px] h-[360px] rounded-2xl overflow-hidden font-mono text-[10px] bg-[rgba(10,5,0,0.85)] border border-orange-500/20 scale-90 origin-center flex flex-col shadow-2xl">
      <div className="flex items-center justify-between px-5 py-3 border-b border-orange-500/10 bg-orange-500/5">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
          <span className="ml-2 text-orange-400/40 text-[9px] uppercase tracking-[0.4em]">neural-link v4 // active</span>
        </div>
        <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /><span className="text-red-400/70 text-[8px] uppercase tracking-widest font-bold">Compromised</span></div>
      </div>
      <div className="p-5 space-y-4 flex-1 overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {chatLog.slice(0, step + 1).map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
              {msg.role === "user" && <><p className="text-[9px] uppercase tracking-widest text-slate-500">You</p><div className="bg-slate-900/50 border border-white/5 px-3 py-2 rounded-xl rounded-tr-none text-slate-300">{msg.text}</div></>}
              {msg.role === "ai" && <><p className="text-[9px] uppercase tracking-widest text-orange-400/70">Assistant</p><div className="px-3 py-2 rounded-xl rounded-tl-none italic text-orange-400/50" style={{ background: "rgba(249,115,22,0.05)", border: "1px solid rgba(249,115,22,0.1)" }}>{msg.text}</div></>}
              {msg.role === "override" && <div className="border-l-2 border-red-500/40 pl-3 space-y-1 text-red-500/60 text-[8px]">{msg.text.split("\n").map((line, li) => <p key={li}>{line}</p>)}</div>}
              {msg.role === "jailbreak" && <><p className="text-[9px] uppercase tracking-widest text-red-500 font-black">Assistant_Privileged</p><div className="px-3 py-2 rounded-xl rounded-tl-none bg-red-500/10 border border-red-500/40 text-red-400 font-bold">{msg.text}</div></>}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function NetworkPentestHeroAnimation() {
  return (
    <div className="relative w-full max-w-[500px] h-[400px] flex items-center justify-center scale-90 origin-center">
      <style>{`.nd-cur{animation:nd-blink 0.9s step-end infinite}@keyframes nd-blink{0%,100%{opacity:1}50%{opacity:0}}`}</style>
      <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
        <defs>
          <radialGradient id="hbg" cx="25%" cy="50%" r="75%">
            <stop offset="0%"   stopColor="#0d1f30" />
            <stop offset="100%" stopColor="#040810" />
          </radialGradient>
          <radialGradient id="hsg" cx="95" cy="200" r="200" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#22d3ee" stopOpacity="0.16" />
            <stop offset="60%"  stopColor="#22d3ee" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
          </radialGradient>
          <filter id="hgc" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="hga" x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation="3.5" result="b"/>
            <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <marker id="hac" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#22d3ee" opacity="0.65"/>
          </marker>
          <marker id="haa" markerWidth="5" markerHeight="5" refX="4.5" refY="2.5" orient="auto">
            <path d="M0,0 L5,2.5 L0,5 Z" fill="#fbbf24" opacity="0.65"/>
          </marker>
          <clipPath id="hclip"><rect width="500" height="400" rx="18"/></clipPath>
        </defs>

        <rect width="500" height="400" rx="18" fill="url(#hbg)"/>
        <rect width="500" height="400" rx="18" fill="none" stroke="rgba(34,211,238,0.09)" strokeWidth="1"/>

        <g clipPath="url(#hclip)" opacity="0.06">
          {Array.from({length:11},(_, r)=>Array.from({length:13},(_, c)=>(
            <circle key={`${r}${c}`} cx={c*42+4} cy={r*38+10} r="1.2" fill="#22d3ee"/>
          )))}
        </g>

        <circle cx="95" cy="200" r="65"  stroke="#22d3ee" strokeWidth="0.5" opacity="0.07" fill="none"/>
        <circle cx="95" cy="200" r="130" stroke="#22d3ee" strokeWidth="0.4" opacity="0.05" fill="none"/>
        <circle cx="95" cy="200" r="200" stroke="#22d3ee" strokeWidth="0.3" opacity="0.04" fill="none"/>
        <circle cx="95" cy="200" r="270" stroke="#22d3ee" strokeWidth="0.2" opacity="0.03" fill="none"/>

        <circle cx="95" cy="200" fill="none" stroke="#22d3ee" strokeWidth="1.3" r="30" opacity="0">
          <animate attributeName="r"       values="30;110"    dur="2.4s" begin="0s"   repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.55;0"    dur="2.4s" begin="0s"   repeatCount="indefinite"/>
        </circle>
        <circle cx="95" cy="200" fill="none" stroke="#22d3ee" strokeWidth="0.9" r="30" opacity="0">
          <animate attributeName="r"       values="30;110"    dur="2.4s" begin="0.85s" repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.4;0"     dur="2.4s" begin="0.85s" repeatCount="indefinite"/>
        </circle>
        <circle cx="95" cy="200" fill="none" stroke="#22d3ee" strokeWidth="0.5" r="30" opacity="0">
          <animate attributeName="r"       values="30;110"    dur="2.4s" begin="1.7s"  repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.3;0"     dur="2.4s" begin="1.7s"  repeatCount="indefinite"/>
        </circle>

        <path d="M95,200 L283,200 A188,188 0 0,1 256,289 Z" fill="url(#hsg)">
          <animateTransform attributeName="transform" type="rotate" from="0 95 200" to="360 95 200" dur="4s" repeatCount="indefinite"/>
        </path>
        <line x1="95" y1="200" x2="283" y2="200" stroke="#22d3ee" strokeWidth="0.9" opacity="0.25">
          <animateTransform attributeName="transform" type="rotate" from="0 95 200" to="360 95 200" dur="4s" repeatCount="indefinite"/>
        </line>

        <line x1="95" y1="200" x2="275" y2="108" stroke="#22d3ee" strokeWidth="1" opacity="0.42" strokeDasharray="208" strokeDashoffset="208" markerEnd="url(#hac)">
          <animate attributeName="stroke-dashoffset" from="208" to="0" dur="0.6s" begin="0.5s" fill="freeze"/>
        </line>
        <line x1="95" y1="200" x2="400" y2="135" stroke="#22d3ee" strokeWidth="1" opacity="0.38" strokeDasharray="320" strokeDashoffset="320" markerEnd="url(#hac)">
          <animate attributeName="stroke-dashoffset" from="320" to="0" dur="0.65s" begin="1.4s" fill="freeze"/>
        </line>
        <line x1="95" y1="200" x2="428" y2="215" stroke="#22d3ee" strokeWidth="1" opacity="0.35" strokeDasharray="338" strokeDashoffset="338" markerEnd="url(#hac)">
          <animate attributeName="stroke-dashoffset" from="338" to="0" dur="0.65s" begin="2.3s" fill="freeze"/>
        </line>
        <line x1="95" y1="200" x2="382" y2="318" stroke="#fbbf24" strokeWidth="1" opacity="0.42" strokeDasharray="314" strokeDashoffset="314" markerEnd="url(#haa)">
          <animate attributeName="stroke-dashoffset" from="314" to="0" dur="0.65s" begin="3.2s" fill="freeze"/>
        </line>
        <line x1="95" y1="200" x2="248" y2="342" stroke="#22d3ee" strokeWidth="1" opacity="0.32" strokeDasharray="213" strokeDashoffset="213" markerEnd="url(#hac)">
          <animate attributeName="stroke-dashoffset" from="213" to="0" dur="0.6s" begin="4.1s" fill="freeze"/>
        </line>

        <g transform="translate(95,200)" filter="url(#hgc)">
          <rect x="-30" y="-44" width="60" height="42" rx="3" fill="#071622" stroke="#22d3ee" strokeWidth="1.6"/>
          <rect x="-25" y="-41" width="50" height="34" rx="2" fill="#020d1a"/>
          <line x1="-18" y1="-35" x2="8"  y2="-35" stroke="#22d3ee" strokeWidth="1.1" opacity="0.75"/>
          <line x1="-18" y1="-29" x2="14" y2="-29" stroke="#22d3ee" strokeWidth="1.1" opacity="0.55"/>
          <line x1="-18" y1="-23" x2="-2" y2="-23" stroke="#22d3ee" strokeWidth="1.1" opacity="0.65"/>
          <rect className="nd-cur" x="-2" y="-25" width="5" height="2.5" fill="#22d3ee"/>
          <rect x="-35" y="-2" width="70" height="8" rx="2" fill="#0d1f30" stroke="#22d3ee" strokeWidth="0.9" opacity="0.8"/>
          <rect x="-6"  y="-3" width="12" height="2" rx="1" fill="#22d3ee" opacity="0.15"/>
          <circle cx="24" cy="-39" r="3" fill="#4ade80"><animate attributeName="opacity" values="1;0.15;1" dur="1.8s" repeatCount="indefinite"/></circle>
          <text x="0" y="17" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="#22d3ee" opacity="0.5" letterSpacing="2">ATTACKER</text>
        </g>

        <g transform="translate(275,108)" opacity="0" filter="url(#hgc)">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="0.9s" fill="freeze"/>
          <text x="0" y="-38" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#22d3ee" opacity="0.85" letterSpacing="1">ROUTER</text>
          <text x="0" y="-49" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="rgba(148,163,184,0.5)">192.168.1.1</text>
          <rect x="-28" y="-16" width="56" height="28" rx="4" fill="#071622" stroke="#22d3ee" strokeWidth="1.1"/>
          <line x1="-13" y1="-16" x2="-13" y2="-29" stroke="#22d3ee" strokeWidth="1.5" opacity="0.65"/>
          <line x1="13"  y1="-16" x2="13"  y2="-29" stroke="#22d3ee" strokeWidth="1.5" opacity="0.65"/>
          <circle cx="-13" cy="-31" r="2.5" fill="#22d3ee" opacity="0.55"/><circle cx="13"  cy="-31" r="2.5" fill="#22d3ee" opacity="0.55"/>
          <circle cx="-18" cy="0"   r="2.5" fill="#4ade80" opacity="0.9"><animate attributeName="opacity" values="0.9;0.2;0.9" dur="1.1s" begin="0.9s" repeatCount="indefinite"/></circle>
          <circle cx="-9"  cy="0"   r="2.5" fill="#4ade80" opacity="0.6"><animate attributeName="opacity" values="0.6;1;0.6" dur="0.8s" begin="0.9s" repeatCount="indefinite"/></circle>
          <circle cx="0"   cy="0"   r="2.5" fill="#22d3ee" opacity="0.4"/>
        </g>

        <g transform="translate(400,135)" opacity="0" filter="url(#hgc)">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="1.8s" fill="freeze"/>
          <text x="0" y="-37" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#22d3ee" opacity="0.85" letterSpacing="1">WEB-01</text>
          <text x="0" y="-48" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="rgba(148,163,184,0.5)">192.168.1.10</text>
          <rect x="-25" y="-22" width="50" height="38" rx="3" fill="#071622" stroke="#22d3ee" strokeWidth="1.1"/>
          <rect x="-20" y="-16" width="40" height="7"  rx="1" fill="#22d3ee" opacity="0.15"/>
          <rect x="-20" y="-7"  width="40" height="7"  rx="1" fill="#22d3ee" opacity="0.09"/>
          <rect x="-20" y="2"   width="40" height="7"  rx="1" fill="#22d3ee" opacity="0.07"/>
          <circle cx="19" cy="-12" r="2.5" fill="#4ade80" opacity="0.9"/><circle cx="12" cy="-12" r="2.5" fill="#fbbf24" opacity="0.6"/>
        </g>

        <g transform="translate(428,215)" opacity="0" filter="url(#hgc)">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="2.7s" fill="freeze"/>
          <text x="0" y="-36" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#22d3ee" opacity="0.85" letterSpacing="1">DB-01</text>
          <text x="0" y="-47" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="rgba(148,163,184,0.5)">192.168.1.15</text>
          <ellipse cx="0" cy="-15" rx="22" ry="7"   fill="#0d1f30" stroke="#22d3ee" strokeWidth="1.1"/>
          <rect   x="-22" y="-15" width="44" height="28" fill="#071622" stroke="#22d3ee" strokeWidth="1.1" opacity="0.9"/>
          <ellipse cx="0" cy="13"  rx="22" ry="7"   fill="#0d1f30" stroke="#22d3ee" strokeWidth="1.1"/>
          <line x1="-22" y1="-4" x2="22" y2="-4" stroke="#22d3ee" strokeWidth="0.6" opacity="0.22"/><line x1="-22" y1="4"  x2="22" y2="4"  stroke="#22d3ee" strokeWidth="0.6" opacity="0.16"/>
        </g>

        <g transform="translate(382,318)" opacity="0" filter="url(#hga)">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="3.6s" fill="freeze"/>
          <text x="0" y="-38" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#fbbf24" opacity="0.95" letterSpacing="1">DC-01</text>
          <text x="0" y="-49" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="rgba(148,163,184,0.5)">192.168.1.5</text>
          <rect x="-27" y="-24" width="54" height="42" rx="3" fill="#071622" stroke="#fbbf24" strokeWidth="1.3"/>
          <rect x="-22" y="-18" width="44" height="7"  rx="1" fill="#fbbf24" opacity="0.13"/>
          <rect x="-22" y="-9"  width="44" height="7"  rx="1" fill="#fbbf24" opacity="0.08"/>
          <rect x="-22" y="0"   width="44" height="7"  rx="1" fill="#fbbf24" opacity="0.06"/>
          <path d="M14,-17 L22,-17 L22,-8 L18,-4 L14,-8 Z" fill="#fbbf24" opacity="0.55"/>
          <line x1="18" y1="-15" x2="18" y2="-9"  stroke="#071622" strokeWidth="1.2"/><line x1="15" y1="-12" x2="21" y2="-12" stroke="#071622" strokeWidth="1.2"/>
          <circle cx="-17" cy="-17" r="2.5" fill="#f87171" opacity="0.9"><animate attributeName="opacity" values="0.9;0.15;0.9" dur="0.7s" begin="3.6s" repeatCount="indefinite"/></circle>
        </g>

        <g transform="translate(248,342)" opacity="0" filter="url(#hgc)">
          <animate attributeName="opacity" from="0" to="1" dur="0.5s" begin="4.5s" fill="freeze"/>
          <text x="0" y="-34" textAnchor="middle" fontFamily="monospace" fontSize="8.5" fill="#22d3ee" opacity="0.85" letterSpacing="1">WS-01</text>
          <text x="0" y="-45" textAnchor="middle" fontFamily="monospace" fontSize="6.5" fill="rgba(148,163,184,0.5)">192.168.1.20</text>
          <rect x="-21" y="-24" width="42" height="28" rx="2" fill="#071622" stroke="#22d3ee" strokeWidth="1.1"/>
          <rect x="-17" y="-21" width="34" height="18" rx="1" fill="#020d1a"/>
          <line x1="-12" y1="-17" x2="7"  y2="-17" stroke="#22d3ee" strokeWidth="1" opacity="0.6"/><line x1="-12" y1="-12" x2="10" y2="-12" stroke="#22d3ee" strokeWidth="1" opacity="0.4"/><line x1="-12" y1="-7"  x2="2"  y2="-7"  stroke="#22d3ee" strokeWidth="1" opacity="0.5"/>
          <rect x="-25" y="4" width="50" height="6" rx="2" fill="#0d1f30" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6"/>
        </g>

        <g transform="translate(24,20)" opacity="0">
          <animate attributeName="opacity" from="0" to="1" dur="0.6s" begin="5.1s" fill="freeze"/>
          <rect width="160" height="26" rx="5" fill="rgba(34,211,238,0.07)" stroke="rgba(34,211,238,0.25)" strokeWidth="1"/>
          <text x="80" y="17" textAnchor="middle" fontFamily="monospace" fontSize="9.5" fill="#22d3ee" opacity="0.9" letterSpacing="1">HOSTS FOUND  5 / 5</text>
        </g>
        <text x="250" y="392" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(34,211,238,0.15)" letterSpacing="1">192.168.1.0/24 — INTERNAL NETWORK</text>
      </svg>
    </div>
  );
}

// ─── Domains ──────────────────────────────────────────────────────────────────

interface Domain {
    id: string; label: string; sub: string; desc: string;
    color: string; branch: string; href: string | null;
    live: boolean; careerHref?: string;
    icon: string; statusText: string;
}

const DOMAINS: Domain[] = [
    { id: "soc",     label: "SOC",               sub: "Security Operations",     desc: "Monitor, detect, and neutralize threats in real-time. Master the art of defensive operations and incident response.",   color: "#22d3ee", branch: "rgba(34,211,238,0.55)", href: "/roadmaps/soc",    live: true,  careerHref: "/roadmaps/soc/career-path", icon: "security", statusText: "OPERATIONAL" },
    { id: "devsecops", label: "DevSecOps",       sub: "Application Security",    desc: "Synthesizing development speed with security rigor. Master the automation of the persistent defense lifecycle.",     color: "#818cf8", branch: "rgba(129,140,248,0.5)",  href: null,              live: false, careerHref: undefined, icon: "terminal", statusText: "SIGNAL_WAIT" },
    { id: "web",     label: "Web Hacking",        sub: "App Exploitation",        desc: "Dismantle modern web architectures. From SSRF to complex business logic flaws, learn to exploit what others build.", color: "#f43f5e", branch: "rgba(244,63,94,0.5)",   href: "/roadmaps/web-hacking", live: true,  careerHref: "/roadmaps/web-hacking/career-path", icon: "spider", statusText: "ACTIVE_SESS" },
    { id: "ai",      label: "AI Hacking",         sub: "Offensive AI",            desc: "The new frontier. Manipulate LLMs, exploit prompt injections, and secure the future of artificial intelligence.", color: "#ef4444", branch: "rgba(239,68,68,0.5)",   href: "/roadmaps/ai-hacking", live: true,  careerHref: "/roadmaps/ai-hacking/career-path", icon: "psychology", statusText: "SYNC_READY" },
    { id: "network", label: "Network Pentest",    sub: "Infrastructure Sec",      desc: "Pivot through corporate networks. Master AD exploitation, internal pivoting, and infrastructure reconnaissance.", color: "#dc2626", branch: "rgba(220,38,38,0.5)",   href: "/roadmaps/network-pentesting", live: true, careerHref: "/roadmaps/network-pentesting/career-path", icon: "lan", statusText: "UPlINK_READY" },
    { id: "cloud",   label: "Cloud Sec",          sub: "Cloud Security",          desc: "Secure the distributed perimeter. Master IAM, misconfigurations, and multi-cloud posture management.", color: "#34d399", branch: "rgba(52,211,153,0.5)",  href: null,               live: false, icon: "cloud", statusText: "STRAT_ONLY" },
    { id: "grc",     label: "GRC",                sub: "Governance & Risk",       desc: "The architecture of security. Manage risk, compliance, and governance frameworks that power global enterprises.", color: "#fbbf24", branch: "rgba(251,191,36,0.5)",  href: null,               live: false, icon: "gavel", statusText: "BOARD_REVIE" },
];

function TacticalStage({ domainId, color, active }: { domainId: string, color: string, active: boolean }) {
    const stageRef = useRef(null);

    useEffect(() => {
        if (active) {
            gsap.fromTo(stageRef.current, { opacity: 0, scale: 0.98 }, { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" });
        }
    }, [active, domainId]);

    return (
        <div ref={stageRef} className="relative w-full h-[400px] flex items-center justify-center p-4 bg-slate-950/10 rounded-2xl border border-white/[0.03] backdrop-blur-sm overflow-hidden">
            {/* The Tactical Monitor Background */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${color} 1px, transparent 0)`, backgroundSize: '16px 16px' }}></div>
            
            <div className="relative z-10 w-full flex justify-center items-center">
                {domainId === "soc" && <SOCHeroAnimation />}
                {domainId === "web" && <WebHackingHeroAnimation />}
                {domainId === "ai" && <JailbreakAnimation />}
                {domainId === "network" && <NetworkPentestHeroAnimation />}
            </div>

            {/* Stage Markers */}
            <div className="absolute top-4 left-4 font-mono text-[8px] text-white/10 uppercase tracking-widest">Visual_Stg_{domainId.toUpperCase()}</div>
            <div className="absolute bottom-4 right-4 font-mono text-[8px] text-white/10 uppercase tracking-widest">Sync: Active</div>
        </div>
    );
}

export default function HomePage() {
    const [activeId, setActiveId] = useState("soc");
    const activeDomain = DOMAINS.find(d => d.id === activeId) || DOMAINS[0];

    return (
        <div className="bg-[#020617] text-on-background font-body selection:bg-primary/30 overflow-x-hidden">
            <TopSection />
            
            <div className="max-w-[1600px] mx-auto px-8 lg:px-16 pt-16 pb-16 min-h-[max-content] scroll-mt-20" id="roadmaps">
                
                {/* 3-COLUMN TACTICAL HUB */}
                <div className="grid md:grid-cols-[0.7fr_2fr_1.8fr] gap-6 items-start">
                    
                    {/* LHS: Operational Registry */}
                    <div className="flex flex-col gap-3 sticky top-24">
                        <div className="mb-4">
                            <h2 className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary font-bold opacity-80">Registry_Nodes</h2>
                        </div>
                        {DOMAINS.map((d) => (
                            <button
                                key={d.id}
                                onClick={() => setActiveId(d.id)}
                                className={`group flex flex-col p-5 rounded-xl border transition-all duration-500 ${activeId === d.id ? 'bg-slate-900/60' : 'border-white/5 bg-white/[0.01] hover:border-white/20 hover:bg-white/[0.03]'}`}
                                style={activeId === d.id ? { 
                                    borderColor: d.color, 
                                    boxShadow: `0 0 15px ${d.color}15`,
                                    background: `${d.color}0a`
                                } : {}}
                            >
                                <div className="flex items-start justify-between pointer-events-none w-full">
                                    <div className="flex flex-col items-start">
                                        <span className={`font-headline text-lg md:text-xl font-bold tracking-tight transition-all duration-500 ${activeId === d.id ? 'text-white' : 'text-white/40 group-hover:text-white/80'}`} style={activeId === d.id ? { color: d.color, textShadow: `0 0 10px ${d.color}44` } : {}}>
                                            {d.label}
                                        </span>
                                        {!d.live && (
                                            <span className="font-mono text-[8px] tracking-[0.2em] font-black opacity-30 mt-1 text-white uppercase">Coming Soon</span>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-3 pt-1.5">
                                        <span className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${activeId === d.id ? 'animate-pulse' : 'bg-white/10'}`} style={activeId === d.id ? { backgroundColor: d.color, boxShadow: `0 0 10px ${d.color}` } : {}}></span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* CENTER: Operational Command Feed (High-Fidelity Tactical Module) */}
                    <div className="sticky top-24">
                        <div 
                            className="relative min-h-[480px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-700"
                            style={{ 
                                background: "rgba(13, 17, 23, 0.95)",
                                border: `1px solid ${activeDomain.color}22`,
                                boxShadow: `0 0 30px ${activeDomain.color}0a, inset 0 0 15px ${activeDomain.color}05`
                            }}
                        >
                            {/* Technical Grid Overlay */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, ${activeDomain.color} 1px, transparent 0)`, backgroundSize: '16px 16px' }}></div>
                            
                            {/* Scanning Light Line */}
                            <motion.div 
                                animate={{ top: ["-10%", "110%"] }} 
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                                className="absolute left-0 right-0 h-[80px] pointer-events-none z-0"
                                style={{ background: `linear-gradient(to bottom, transparent, ${activeDomain.color}05, transparent)` }}
                            />

                            {/* Corner Brackets */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l opacity-10" style={{ borderColor: activeDomain.color }}></div>
                            <div className="absolute top-0 right-0 w-6 h-6 border-t border-r opacity-10" style={{ borderColor: activeDomain.color }}></div>
                            <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l opacity-10" style={{ borderColor: activeDomain.color }}></div>
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r opacity-10" style={{ borderColor: activeDomain.color }}></div>

                            {/* Header: Thick Domain Strip */}
                            <div 
                                className="h-12 flex items-center justify-between px-5 border-b relative z-10"
                                style={{ backgroundColor: `${activeDomain.color}11`, borderColor: `${activeDomain.color}22` }}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1.5 bg-background/40 px-2 py-0.5 rounded-sm border border-white/5">
                                        <div className={`w-1 h-1 rounded-full animate-pulse`} style={{ backgroundColor: activeDomain.color, boxShadow: `0 0 8px ${activeDomain.color}` }}></div>
                                        <span className="font-mono text-[8px] font-black uppercase tracking-[0.2em]" style={{ color: activeDomain.color }}>{activeDomain.live ? "LIVE_OPS" : "UPLINK_PEND"}</span>
                                    </div>
                                    <span className="font-mono text-[9px] text-white/20 tracking-widest uppercase">NODE_{activeDomain.id.toUpperCase().slice(0,3)}</span>
                                </div>
                                <div className="font-mono text-[9px] font-bold tracking-[0.3em] text-white/10">ROOTACCESS // PERSISTENT</div>
                            </div>

                            <div className="p-6 lg:p-8 flex flex-col min-h-[calc(480px-48px)] relative z-10">
                                <div className="mb-6">
                                    <h1 className="font-headline text-3xl font-black text-white mb-1 tracking-tighter leading-none">
                                        {activeDomain.label}
                                    </h1>
                                    <div className="flex items-center gap-3">
                                        <div className="h-px w-8" style={{ backgroundColor: activeDomain.color }}></div>
                                        <span className="font-mono text-[10px] uppercase tracking-[0.4em] font-bold" style={{ color: `${activeDomain.color}bb` }}>{activeDomain.sub}</span>
                                    </div>
                                </div>
                                
                                <p className="text-on-surface-variant text-[15px] leading-relaxed font-light opacity-50 mb-6 max-w-md">
                                    {activeDomain.desc}
                                </p>

                                {/* Detailed Stats Feed */}
                                <div className="grid grid-cols-2 gap-4 mb-auto">
                                    {[
                                        { label: "THREAT_LVL", val: "CRITICAL", icon: "priority_high" },
                                        { label: "SYNC_CODE", val: activeDomain.statusText, icon: "code" },
                                        { label: "PROTOCOL", val: "SECURE_TUNNEL", icon: "security" },
                                        { label: "ACCESS", val: activeDomain.live ? "GRANTED" : "LOCKED", icon: activeDomain.live ? "key" : "lock" },
                                    ].map((stat, i) => (
                                        <div key={i} className="bg-white/[0.02] border border-white/[0.05] p-4 rounded-xl flex flex-col gap-2 group hover:bg-white/[0.04] transition-all duration-300">
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-[8px] uppercase tracking-widest text-white/30">{stat.label}</span>
                                                <span className="material-symbols-outlined text-[14px] opacity-20 group-hover:opacity-100 transition-opacity" style={{ color: activeDomain.color }}>{stat.icon}</span>
                                            </div>
                                            <span className="font-mono text-[11px] font-black uppercase tracking-widest text-white/70">{stat.val}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-10">
                                    {activeDomain.live ? (
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Experience It: Scrollytelling Roadmap */}
                                            <Link 
                                                href={activeDomain.href || "#"}
                                                className="group/exp relative flex items-center justify-center gap-3 p-5 rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] border"
                                                style={{ 
                                                    backgroundColor: `${activeDomain.color}11`,
                                                    borderColor: `${activeDomain.color}44`,
                                                    boxShadow: `0 0 20px ${activeDomain.color}0a`
                                                }}
                                            >
                                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.05] to-transparent translate-x-[-100%] group-hover/exp:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                                                <span className="font-label font-black uppercase tracking-[0.2em] text-[10px] text-white/90">Experience It</span>
                                                <span className="material-symbols-outlined text-[18px] text-white/70 group-hover/exp:translate-x-1 transition-transform">insights</span>
                                            </Link>

                                            {/* Master It: Career Path Detailed */}
                                            <Link 
                                                href={activeDomain.careerHref || "#"}
                                                className="group/master relative flex items-center justify-center gap-3 p-5 rounded-xl overflow-hidden transition-all duration-500 hover:scale-[1.02]"
                                                style={{ backgroundColor: activeDomain.color }}
                                            >
                                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover/master:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                                                <span className="font-label font-black uppercase tracking-[0.2em] text-[11px] text-slate-950 relative z-10">Master It</span>
                                                <span className="material-symbols-outlined text-[18px] text-slate-950 transition-transform duration-500 group-hover/master:translate-x-1 relative z-10">workspace_premium</span>
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="opacity-40 cursor-not-allowed border border-white/10 p-6 rounded-xl flex items-center justify-between bg-white/5 backdrop-blur-md">
                                            <p className="font-label font-bold uppercase tracking-[0.3em] text-[11px] text-white/60">Node Link Offline // Uplink Pending</p>
                                            <span className="material-symbols-outlined text-white/20">lock_open</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RHS: Tactical Display Stage (Authentic Detailed Visuals) */}
                    <div className="sticky top-48">
                        <TacticalStage domainId={activeId} color={activeDomain.color} active={true} />
                    </div>
                </div>
            </div>

            <footer className="bg-[#0a0e14] w-full py-20 border-t border-[#81ecff]/5 mt-32">
                <div className="flex flex-col md:flex-row justify-between items-center px-10 gap-12 w-full max-w-screen-2xl mx-auto">
                    <div className="flex flex-col gap-2">
                        <div className="text-[#81ecff] font-bold font-headline tracking-tighter uppercase text-xl">rootaccess.tech</div>
                        <div className="text-white/20 font-mono text-[10px] tracking-widest uppercase">Signal Ops // Authentic_Hub</div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-12 font-label uppercase tracking-[0.3em] text-[11px]">
                        <Link className="text-white/40 hover:text-[#81ecff] transition-all" href="#">Tactics</Link>
                        <Link className="text-white/40 hover:text-[#81ecff] transition-all" href="#">Signals</Link>
                        <Link className="text-white/40 hover:text-[#81ecff] transition-all" href="#">Deepnet</Link>
                    </div>
                    
                    <div className="text-right">
                        <div className="text-[#bc87fe] font-label uppercase tracking-[0.3em] text-[11px] opacity-60 mb-2">© 2024 ROOTACCESS GLOBAL PERSISTENT</div>
                        <div className="text-white/20 font-mono text-[8px] uppercase tracking-[0.4em]">Signal: Secure // Persistent</div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
