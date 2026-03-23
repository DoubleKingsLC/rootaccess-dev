"use client";

import React from "react";
import { ReconPanel } from "./ReconPanel";

type PassiveReconSceneProps = {
  progress: number; // global 0–1
};

// ── Helpers ───────────────────────────────────────────────────────────────────
// Scene lives at 0.125–0.20 (fade in 0.125–0.135, full 0.135–0.165, fade out 0.165–0.20)
const sceneOpacity = (p: number): number => {
  if (p < 0.125) return 0;
  if (p < 0.135) return (p - 0.125) / 0.010;
  if (p <= 0.165) return 1;
  if (p < 0.200) return 1 - (p - 0.165) / 0.035;
  return 0;
};

// Local 0–1 across 0.125–0.175
const local = (p: number): number => Math.max(0, Math.min(1, (p - 0.125) / 0.05));

const captionOpacity = (p: number): number => {
  if (p < 0.135) return 0;
  if (p < 0.148) return (p - 0.135) / 0.013;
  if (p <= 0.165) return 1;
  if (p < 0.180) return 1 - (p - 0.165) / 0.015;
  return 0;
};

// ── Data ──────────────────────────────────────────────────────────────────────
const SUBDOMAINS = [
  { text: "api.nexuspay.io",      sub: "Port 443 · open",      ip: "104.21.47.83",  flag: false },
  { text: "mail.nexuspay.io",     sub: "Port 25 · open",       ip: "104.21.52.11",  flag: false },
  { text: "dev.nexuspay.io",      sub: "Port 443 · open",      ip: "178.62.14.109", flag: false },
  { text: "staging.nexuspay.io",  sub: "No auth detected",     ip: "178.62.14.201", flag: true  },
  { text: "admin.nexuspay.io",    sub: "Login portal exposed", ip: "188.166.92.14", flag: true  },
];

const ENDPOINTS = [
  { text: "/api/v1/users",          sub: "200 OK · no rate limit", flag: false },
  { text: "/api/v2/admin",          sub: "401 Unauthorized",        flag: false },
  { text: "/swagger/index.html",    sub: "API docs · public",       flag: true  },
  { text: "/.env.backup",           sub: "200 OK · plaintext",      flag: true  },
  { text: "/api/v1/transactions",   sub: "200 OK · enumerable",     flag: false },
];

export const PassiveReconScene: React.FC<PassiveReconSceneProps> = ({ progress }) => {
  const op = sceneOpacity(progress);
  if (op === 0) return null;

  const lp = local(progress);

  return (
    <>
      {/* ── Main scene ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center gap-8 px-12"
        style={{ opacity: op, zIndex: 15 }}
      >
        {/* Ambient glow behind panels */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.04) 0%, transparent 65%)",
          }}
        />

        {/* Source label — top center */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.45em]"
          style={{ color: "rgba(244,63,94,0.4)", opacity: lp > 0.1 ? 1 : 0, transition: "opacity 0.3s" }}
        >
          Passive intelligence — no packets sent
        </div>

        {/* Panel 1 — Subdomains */}
        <ReconPanel
          title="Subdomains"
          source="SHODAN · DNS"
          icon="🌐"
          items={SUBDOMAINS}
          localProgress={lp}
          appearAt={0.05}
          itemsStartAt={0.20}
          slideFrom="left"
          count="hosts"
        />

        {/* Panel 2 — Exposed Endpoints */}
        <ReconPanel
          title="Exposed Endpoints"
          source="WAYBACK · GOOGLE"
          icon="🔍"
          items={ENDPOINTS}
          localProgress={lp}
          appearAt={0.42}
          itemsStartAt={0.55}
          slideFrom="right"
          count="routes"
        />
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute bottom-[72px] left-1/2 z-[35] -translate-x-1/2"
        style={{ opacity: captionOpacity(progress) }}
        aria-hidden
      >
        <div className="rounded-xl border border-white/10 bg-slate-950/85 px-5 py-2.5 backdrop-blur-md max-w-[90vw]">
          <p className="font-mono text-xs font-medium tracking-wide text-slate-100 text-center md:text-sm">
            You haven&apos;t touched the server. But it&apos;s already talking.
          </p>
        </div>
      </div>
    </>
  );
};
