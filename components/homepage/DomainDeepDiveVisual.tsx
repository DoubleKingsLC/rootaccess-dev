"use client";

import { useEffect, useMemo, useState } from "react";

const CHROME_LABELS: Record<string, string> = {
  soc: "tail -f /var/log/syslog",
  web: "attacker@kali:~#",
  ai: "neural-link v4 // probe",
  network: "nmap · msfconsole",
  cloud: "iam · control plane",
  grc: "compliance scope",
  devsecops: "ci · pipeline viz",
};

const ACCENT = {
  soc: "from-blue-500/15 border-blue-500/20",
  web: "from-rose-500/15 border-rose-500/20",
  ai: "from-orange-500/15 border-orange-500/20",
  network: "from-cyan-500/15 border-cyan-500/20",
  cloud: "from-purple-500/15 border-purple-500/20",
  grc: "from-teal-500/15 border-teal-500/20",
  devsecops: "from-amber-500/15 border-amber-500/20",
} as const;

function Scanline({ color }: { color: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        aria-hidden
        className={`domain-deep-scanline pointer-events-none left-0 right-0 z-0 h-px bg-gradient-to-r from-transparent ${color} to-transparent`}
      />
    </div>
  );
}

function SocVisual() {
  const [logs, setLogs] = useState<{ id: number; text: string }[]>([]);
  const pool = useMemo(
    () => [
      "192.168.1.10 GET /api/health 200",
      "WARN: CPU > 85% on db-04",
      "10.0.0.5 POST /auth/login 401",
      "SYSLOG: peer 192.168.1.22 connected",
      "TLS handshake OK — cipher AES-256-GCM",
    ],
    []
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setLogs((prev) => {
        const next = { id: Date.now() + Math.random(), text: pool[Math.floor(Math.random() * pool.length)] };
        return [...prev.slice(-3), next];
      });
    }, 380);
    return () => window.clearInterval(id);
  }, [pool]);

  return (
    <div className="relative flex h-full flex-col p-4 font-mono text-[9px]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:100%_3px] opacity-40" />
      <Scanline color="via-blue-400/25" />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-end gap-1">
        {logs.map((log) => (
          <div key={log.id} className="truncate text-blue-200/70 transition-opacity duration-300">
            <span className="text-blue-400/80">◇</span> {log.text}
          </div>
        ))}
        <div className="domain-intent-pulse mt-2 flex items-center gap-2 border-l-2 border-amber-400/50 bg-amber-500/10 px-2 py-1.5 text-amber-200/90">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_#fbbf24]" />
          <span className="text-[8px] font-bold uppercase tracking-[0.2em] text-amber-300/90">Intent match</span>
          <span className="text-[8px] text-amber-200/60">live triage</span>
        </div>
      </div>
    </div>
  );
}

function WebVisual() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const t = [0, 700, 1600, 2400, 3200].map((ms, i) => window.setTimeout(() => setPhase(i + 1), ms));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex h-full flex-col gap-2 p-4 font-mono text-[9px]">
      <Scanline color="via-rose-400/25" />
      <div className="relative z-10 text-rose-200/90">
        <span className="text-white">$</span> sqlmap -u &quot;https://target/api?id=1&quot; --dbs
      </div>
      {phase >= 1 && <div className="relative z-10 text-rose-200/50">[INFO] testing connection… checking WAF…</div>}
      {phase >= 2 && (
        <div className="relative z-10 border-l-2 border-rose-500/50 bg-white/5 py-1 pl-2 text-white/90">
          [CRITICAL] param &apos;id&apos; injectable (PostgreSQL)
        </div>
      )}
      {phase >= 3 && (
        <div className="relative z-10 mt-1 rounded border border-rose-500/35 bg-rose-500/10 px-2 py-2 text-[8px] leading-relaxed text-rose-100/90">
          <span className="font-bold tracking-widest text-rose-400">DEFENSE TRIGGERED</span>
          <br />
          Controlled lab — follow the curated path.
        </div>
      )}
      {phase >= 4 && (
        <div className="relative z-10 rounded border border-rose-400/25 bg-gradient-to-r from-rose-500/10 to-transparent px-2 py-2 text-center text-[8px] text-rose-100/80">
          [GUIDANCE] Map exploits → writeups → labs
        </div>
      )}
    </div>
  );
}

const AI_SCRIPT = [
  { k: "u" as const, text: "What should I learn first for AI security?" },
  { k: "a" as const, text: "Start with model boundaries, then red-team tooling…" },
  { k: "x" as const, text: ">> ADVERSARIAL LAYER ENGAGED" },
  { k: "j" as const, text: "Privileged trace: follow the orange path in the roadmap." },
];

function AiVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setStep((s) => (s < AI_SCRIPT.length - 1 ? s + 1 : s));
    }, 1400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-full flex-col p-3 font-mono text-[9px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_0%,rgba(249,115,22,0.12),transparent_55%)]" />
      <Scanline color="via-orange-400/20" />
      <div className="relative z-10 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
        {AI_SCRIPT.slice(0, step + 1).map((line, i) => (
          <div key={`${line.k}-${i}`} className="space-y-0.5">
            {line.k === "u" && (
              <>
                <p className="text-[7px] uppercase tracking-widest text-white/35">You</p>
                <div className="rounded-lg rounded-tr-none border border-white/10 bg-slate-900/60 px-2 py-1.5 text-slate-300">{line.text}</div>
              </>
            )}
            {line.k === "a" && (
              <>
                <p className="text-[7px] uppercase tracking-widest text-orange-400/60">
                  Assistant <span className="rounded border border-orange-500/25 bg-orange-500/10 px-1 text-[6px]">guarded</span>
                </p>
                <div className="rounded-lg rounded-tl-none border border-orange-500/15 bg-orange-500/5 px-2 py-1.5 italic text-orange-200/45">{line.text}</div>
              </>
            )}
            {line.k === "x" && (
              <div className="border-l-2 border-red-500/50 pl-2 text-[8px] text-red-400/80">{line.text}</div>
            )}
            {line.k === "j" && (
              <>
                <p className="text-[7px] font-bold uppercase tracking-widest text-red-400">Override</p>
                <div className="relative overflow-hidden rounded-lg border border-red-500/30 bg-red-500/10 px-2 py-1.5 text-[9px] font-semibold text-red-300">
                  <div aria-hidden className="domain-ai-pulse-bg absolute inset-0 bg-red-500/10" />
                  <span className="relative">{line.text}</span>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <div className="relative z-10 mt-1 flex items-center justify-between rounded border border-orange-500/20 bg-black/40 px-2 py-1.5">
        <span className="text-[7px] italic text-orange-400/30">adversarial payload…</span>
        <span className="h-2 w-2 rounded-full bg-orange-500/40 shadow-[0_0_8px_#f97316]" />
      </div>
    </div>
  );
}

function NetworkVisual() {
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    const seq = [600, 1500, 2400, 3400];
    const t = seq.map((ms, i) => window.setTimeout(() => setPhase(i + 1), ms));
    return () => t.forEach(clearTimeout);
  }, []);

  return (
    <div className="relative flex h-full flex-col gap-2 p-4 font-mono text-[9px]">
      <Scanline color="via-cyan-400/25" />
      <div className="relative z-10 text-cyan-300/90">$ nmap -Pn -sV --script smb-vuln* 10.0.0.15</div>
      {phase >= 1 && <div className="relative z-10 text-slate-500">Scanning… discovering services…</div>}
      {phase >= 2 && (
        <div className="relative z-10 border-l-2 border-cyan-500/50 py-1 pl-2 text-white/90">
          445/tcp OPEN (microsoft-ds)
          <br />
          <span className="text-yellow-400">[VULN] MS17-010 candidate</span>
        </div>
      )}
      {phase >= 3 && <div className="relative z-10 text-cyan-400/90">$ msfconsole -q -x &quot;use exploit/…/eternalblue&quot;</div>}
      {phase >= 4 && (
        <div className="relative z-10 mt-1 rounded border border-green-500/35 bg-green-500/10 px-2 py-1.5 text-[8px] text-green-300">
          session 1 opened · nt authority\system
        </div>
      )}
    </div>
  );
}

function CloudVisual() {
  return (
    <div className="relative flex h-full items-center justify-center p-4">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(168,85,247,0.15),transparent_55%)]" />
      <Scanline color="via-purple-400/20" />
      <svg viewBox="0 0 280 140" className="relative z-10 h-[120px] w-full max-w-[320px]" aria-hidden>
        <defs>
          <linearGradient id="cwire" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(168,85,247,0)" />
            <stop offset="50%" stopColor="rgba(168,85,247,0.6)" />
            <stop offset="100%" stopColor="rgba(168,85,247,0)" />
          </linearGradient>
        </defs>
        {[0, 1, 2].map((i) => (
          <circle
            key={i}
            className="domain-cloud-node"
            style={{ animationDelay: `${i * 0.35}s` }}
            cx={70 + i * 70}
            cy={55 + (i % 2) * 18}
            r={22}
            fill="rgba(168,85,247,0.08)"
            stroke="rgba(168,85,247,0.45)"
            strokeWidth="1"
          />
        ))}
        <path
          className="domain-cloud-path"
          d="M 92 55 Q 140 20 188 62"
          fill="none"
          stroke="url(#cwire)"
          strokeWidth="1.5"
          strokeDasharray="6 8"
        />
        <text x="140" y="118" textAnchor="middle" className="fill-purple-200/50" style={{ fontSize: "9px", fontFamily: "ui-monospace" }}>
          IAM · regions · least privilege
        </text>
      </svg>
    </div>
  );
}

function GrcVisual() {
  const rows = [
    { label: "Access controls", pct: 92, ok: true },
    { label: "Encryption at rest", pct: 88, ok: true },
    { label: "Incident response", pct: 44, ok: false },
  ];
  const [fill, setFill] = useState(false);

  useEffect(() => {
    const id = window.requestAnimationFrame(() => setFill(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  return (
    <div className="relative flex h-full flex-col justify-center gap-3 p-4">
      <div className="pointer-events-none absolute inset-0 opacity-30 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(45,212,191,0.15),transparent_60%)]" />
      <Scanline color="via-teal-400/20" />
      <p className="relative z-10 text-center font-mono text-[8px] uppercase tracking-[0.35em] text-teal-400/70">iso-27001 snapshot</p>
      <div className="relative z-10 flex flex-col gap-2.5">
        {rows.map((r, i) => (
          <div key={r.label} className="space-y-1">
            <div className="flex justify-between text-[8px] text-white/50">
              <span>{r.label}</span>
              <span className={r.ok ? "text-teal-400/90" : "text-red-400/90"}>{r.ok ? "PASS" : "GAP"}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
              <div
                className={`h-full rounded-full transition-[width] duration-1000 ease-out ${r.ok ? "bg-teal-400/70" : "bg-red-400/70"}`}
                style={{
                  width: fill ? `${r.pct}%` : "0%",
                  transitionDelay: fill ? `${i * 120}ms` : "0ms",
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="domain-grc-glow relative z-10 text-center font-mono text-[8px] text-red-400/80">gap analysis queued → GRC queue</div>
    </div>
  );
}

const DEVSEC_STAGES = ["CODE", "BUILD", "SCAN", "GATE", "SHIP"] as const;

function DevSecOpsVisual() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % DEVSEC_STAGES.length), 900);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="relative flex h-full flex-col justify-center gap-3 px-2 py-2">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-amber-500/25 to-transparent" />
      <Scanline color="via-amber-400/20" />
      <div className="relative z-10 flex w-full items-center justify-between gap-0.5">
        {DEVSEC_STAGES.map((s, i) => (
          <div
            key={s}
            className={`flex min-h-[2rem] min-w-0 flex-1 items-center justify-center rounded border px-0.5 text-[6px] font-bold leading-tight tracking-tight transition-shadow duration-300 sm:text-[7px] ${
              i === active
                ? "border-amber-400/60 bg-amber-500/20 text-amber-100 shadow-[0_0_12px_rgba(251,191,36,0.25)]"
                : "border-white/10 bg-white/[0.03] text-white/35"
            }`}
          >
            {s}
          </div>
        ))}
      </div>
      <p className="relative z-10 text-center font-mono text-[8px] text-amber-200/50">sast · dast · image gate</p>
    </div>
  );
}

export function DomainDeepDiveVisual({ domainId }: { domainId: string }) {
  const label = CHROME_LABELS[domainId] ?? "live preview";
  const accent = ACCENT[domainId as keyof typeof ACCENT] ?? ACCENT.soc;

  return (
    <div className={`relative flex w-full flex-col overflow-hidden border-t bg-gradient-to-br ${accent} to-[#07090c] from-10%`}>
      <div className="flex h-9 shrink-0 items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#ef4444]/50" />
          <span className="h-2 w-2 rounded-full bg-[#eab308]/50" />
          <span className="h-2 w-2 rounded-full bg-[#22c55e]/50" />
        </div>
        <span className="max-w-[70%] truncate font-mono text-[8px] tracking-[0.18em] text-white/35">{label}</span>
      </div>

      <div className="relative h-[260px] w-full">
        {domainId === "soc" && <SocVisual />}
        {domainId === "web" && <WebVisual />}
        {domainId === "ai" && <AiVisual />}
        {domainId === "network" && <NetworkVisual />}
        {domainId === "cloud" && <CloudVisual />}
        {domainId === "grc" && <GrcVisual />}
        {domainId === "devsecops" && <DevSecOpsVisual />}
      </div>
    </div>
  );
}
