"use client";

import React from "react";
import { SQLQueryPanel }      from "./SQLQueryPanel";
import { MockAdminDashboard } from "./MockAdminDashboard";
import { MockAdminLogin }     from "./MockAdminLogin";
import { SQLDiscoveryChip }   from "./SQLDiscoveryChip";
import { SQLExplanationPanel } from "./SQLExplanationPanel";
import { NarrativeCaption }    from "./NarrativeCaption";

type SQLiSceneProps = {
  progress: number; // global 0–1
};

// ── Scene window: 0.670–0.870 ──────────────────────────────────────────────────
// Full     0.670–0.860  (no fade-in — continues from InitialAccessScene seamlessly)
// Fade out 0.860–0.870 (1% Snappy)
const sceneOpacity = (p: number): number => {
  if (p < 0.670) return 0;
  if (p <= 0.860) return 1;
  if (p < 0.870) return 1 - (p - 0.860) / 0.010;
  return 0;
};

// Local 0–1 across 0.670–0.870
const local = (p: number): number =>
  Math.max(0, Math.min(1, (p - 0.670) / 0.200));

// ── Phase 1 — probe: type `'` into password (local 0.05–0.12) ────────────────
const PROBE = "'";
const probeTyped = (lp: number): string => {
  if (lp < 0.05 || lp >= 0.26) return "";   // cleared before payload phase
  if (lp < 0.12) return PROBE.slice(0, Math.round(((lp - 0.05) / 0.07) * PROBE.length));
  return PROBE;
};

// ── Phase 2 — error state (probe or failed payload, local windows) ──────
const errorVisible = (lp: number): boolean => 
  (lp >= 0.14 && lp < 0.26) ||  // Probe error
  (lp >= 0.44 && lp < 0.48);    // Payload click error

const ERROR_LINES = [
  "SQLSTATE[42000]: Syntax error or access violation",
  "near \"'\" at line 1 — unexpected token",
];
const errorLineVisible = (lp: number, idx: number): boolean => {
  if (!errorVisible(lp)) return false;
  return lp >= 0.14 + idx * 0.04;
};

// ── Phase 3 — payload: type `' OR 1=1 --` (local 0.26–0.42) ─────────────────
const PAYLOAD = "' OR 1=1 --";
const payloadTyped = (lp: number): string => {
  if (lp < 0.26) return "";
  const t = Math.min((lp - 0.26) / 0.16, 1);
  return PAYLOAD.slice(0, Math.round(t * PAYLOAD.length));
};

// ── Phase 4 — SQL zoom (local 0.47–0.75) ─────────────────────────────────────
const loginOpacity = (lp: number): number => {
  if (lp < 0.44) return 1;         // fully visible through authenticated moment
  if (lp < 0.47) return 1 - (lp - 0.44) / 0.03;   // fade out into zoom
  return 0;
};

const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const zoomOpacity = (lp: number): number => {
  if (lp < 0.48) return 0;
  if (lp < 0.51) return (lp - 0.48) / 0.03; 
  if (lp <= 0.72) return 1; 
  if (lp < 0.75) return 1 - (lp - 0.72) / 0.03;
  return 0;
};

// Scale: starts at 0.55 (roughly the small panel size), grows to 1.0
const zoomScale = (lp: number): number => {
  if (lp < 0.45) return 0.55;
  if (lp < 0.52) return 0.55 + ease((lp - 0.45) / 0.07) * 0.45;
  return 1.0;
};

const zoomTranslateY = (lp: number): number => {
  if (lp < 0.45) return 32;
  if (lp < 0.52) return 32 * (1 - ease((lp - 0.45) / 0.07));
  return 0;
};

// Result row streams in at lp 0.76, columns appear one by one
const RESULT_COLS = [
  { key: "id",         value: "1" },
  { key: "username",   value: "admin" },
  { key: "role",       value: "super_admin" },
  { key: "auth_token", value: "eyJhbGciOiJIUzI1NiJ9..." },
];
const resultColsVisible = (lp: number): number => {
  if (lp < 0.50) return 0;
  return Math.floor(((lp - 0.50) / 0.08) * (RESULT_COLS.length + 1));
};

// ── Dashboard visible after local 0.62 ───────────────────────────────────────
const showDashboard = (lp: number): boolean => lp >= 0.62;

// Caption: in at 0.710, out at 0.855 global
const captionOpacity = (p: number): number => {
  if (p < 0.710) return 0;
  if (p < 0.730) return (p - 0.710) / 0.020;
  if (p <= 0.845) return 1;
  if (p < 0.855) return 1 - (p - 0.845) / 0.010;
  return 0;
};

const ROSE  = "#f43f5e";
const GREEN = "rgba(34,197,94,0.9)";
const RED   = "#ef4444";

export const SQLiScene: React.FC<SQLiSceneProps> = ({ progress }) => {
  const op = sceneOpacity(progress);
  if (op === 0) return null;

  const lp        = local(progress);
  const probe     = probeTyped(lp);
  const payload   = payloadTyped(lp);
  // Error box logic — ONLY for the probe phase (lp 0.14 - 0.26)
  const errorVisible = lp >= 0.14 && lp < 0.26;
  const authenticated = lp >= 0.44; 

  // Transitions
  const loginOp   = loginOpacity(lp);
  const loginVis  = lp < 0.47;  // Keep login visible until 0.47 so "Authenticated" state is seen
  const isClicked = (lp >= 0.12 && lp < 0.14) || (lp >= 0.42 && lp < 0.44); 
  const zoomOp    = zoomOpacity(lp);
  const zoomVis   = lp >= 0.47 && lp < 0.76;
  const dashVis   = lp >= 0.76;  // Dashboard after zoom
  const dashOp    = lp >= 0.76 ? 1 : 0;
  const zoomSc    = zoomScale(lp);
  const zoomTY    = zoomTranslateY(lp);
  const colsVis   = resultColsVisible(lp);

  // What's currently in the password field
  const passField = payload || probe;
  const passIsPayload = payload.length > 0;
  const passIsProbe   = probe.length > 0 && !passIsPayload;

  return (
    <>
      {/* ── Main scene ──────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: op, zIndex: 15 }}
      >
        {/* Ambient glow */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(244,63,94,0.05) 0%, transparent 60%)",
          }}
        />

        {/* Top label */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[11px] uppercase tracking-[0.35em]"
          style={{
            color: "rgba(226,232,240,0.65)",
            opacity: lp > 0.05 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          SQL Injection — expanding access · target: nexuspay.io/admin
        </div>

        {/* ── SQL Discovery Reveal (LHS) ──────────────────────────────────── */}
        <SQLDiscoveryChip localProgress={lp} />

        {/* ── SQL Explanation Panel (LHS during zoom) ──────────────────────── */}
        <SQLExplanationPanel localProgress={lp} />

        {/* ── Login form + SQL panel (pre-bypass) ─────────────────────────── */}
        {loginVis && (
          <div className="flex flex-col gap-3" style={{ width: "clamp(480px, 52vw, 720px)", opacity: loginOp }}>
            <MockAdminLogin
              localProgress={lp}
              attack={{
                usernameValue: "admin",
                passwordValue: passField,
                showCursor:
                  (passIsProbe && probe.length < PROBE.length) ||
                  (passIsPayload && payload.length < PAYLOAD.length),
                isError: errorVisible,
                isClicked,
                errorLines: ERROR_LINES.map((text, idx) => ({
                  text,
                  visible: errorLineVisible(lp, idx) || (lp >= 0.44), // all visible for payload error
                })),
                isAuthenticated: authenticated,
              }}
            />
            {/* SQL query panel */}
            <SQLQueryPanel localProgress={lp} payload={payload} />
          </div>
        )}

        {/* ── SQL zoom phase (lp 0.45–0.75) ──────────────────────────────── */}
        {zoomVis && (
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: zoomOp,
              transform: `scale(${zoomSc}) translateY(${zoomTY}vh)`,
              width: "clamp(400px, 50vw, 740px)",
              marginLeft: "clamp(80px, 20vw, 12rem)",
            }}
          >
            {/* Zoomed query panel */}
            <div
              className="overflow-hidden rounded-2xl"
              style={{
                background: "rgba(6,9,18,0.98)",
                border: "1px solid rgba(244,63,94,0.25)",
                boxShadow: "0 0 60px rgba(244,63,94,0.12), 0 32px 64px rgba(0,0,0,0.6)",
              }}
            >
              {/* Header */}
              <div
                className="flex items-center justify-between px-5 py-3"
                style={{ background: "rgba(15,20,35,0.98)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
              >
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: ROSE, boxShadow: `0 0 6px ${ROSE}` }} />
                  <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.55)" }}>
                    SQL query — server side · mysql · nexusdb
                  </span>
                </div>
                <span className="font-mono text-[9px]" style={{ color: GREEN }}>
                  ✓ executed
                </span>
              </div>

              {/* Query — larger font */}
              <div className="px-6 py-4 font-mono text-[13px] leading-loose">
                <div>
                  <span style={{ color: "rgba(167,139,250,0.85)" }}>SELECT</span>
                  <span style={{ color: "rgba(226,232,240,0.65)" }}> * </span>
                  <span style={{ color: "rgba(167,139,250,0.85)" }}>FROM</span>
                  <span style={{ color: "rgba(96,165,250,0.8)" }}> users</span>
                </div>
                <div>
                  <span style={{ color: "rgba(167,139,250,0.85)" }}>WHERE</span>
                  <span style={{ color: "rgba(226,232,240,0.65)" }}> username </span>
                  <span style={{ color: "rgba(148,163,184,0.5)" }}>= </span>
                  <span style={{ color: "rgba(34,197,94,0.75)" }}>&apos;admin&apos;</span>
                </div>
                <div>
                  <span style={{ color: "rgba(167,139,250,0.85)" }}>AND</span>
                  <span style={{ color: "rgba(226,232,240,0.65)" }}> password </span>
                  <span style={{ color: "rgba(148,163,184,0.5)" }}>= </span>
                  <span style={{ color: "rgba(34,197,94,0.75)" }}>&apos;</span>
                  <span style={{ color: ROSE, fontWeight: 700 }}>&apos; OR 1=1 </span>
                  <span style={{ color: ROSE, fontWeight: 700 }}>--</span>
                  <span style={{ color: "rgba(148,163,184,0.2)", textDecoration: "line-through" }}>&apos;</span>
                </div>
                {/* Explanation */}
                <div className="mt-1 flex flex-wrap gap-3">
                  <span
                    className="rounded px-2 py-0.5 font-mono text-[10px]"
                    style={{ background: "rgba(244,63,94,0.08)", color: "rgba(244,63,94,0.7)", border: "1px solid rgba(244,63,94,0.18)" }}
                  >
                    1=1 always true → WHERE becomes OR true → all rows match
                  </span>
                  <span
                    className="rounded px-2 py-0.5 font-mono text-[10px]"
                    style={{ background: "rgba(244,63,94,0.08)", color: "rgba(244,63,94,0.7)", border: "1px solid rgba(244,63,94,0.18)" }}
                  >
                    -- comments out the rest of the query
                  </span>
                </div>
              </div>
            </div>

            {/* Result row */}
            {colsVis > 0 && (
              <div
                className="overflow-hidden rounded-xl"
                style={{
                  background: "rgba(8,12,24,0.96)",
                  border: "1px solid rgba(34,197,94,0.2)",
                  boxShadow: "0 0 24px rgba(34,197,94,0.06)",
                }}
              >
                <div
                  className="flex items-center justify-between px-5 py-2.5"
                  style={{ background: "rgba(15,20,35,0.98)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(34,197,94,0.6)" }}>
                    Query result
                  </span>
                  <span className="font-mono text-[9px]" style={{ color: GREEN }}>
                    1 row returned
                  </span>
                </div>
                <div className="flex flex-wrap gap-0 divide-x" style={{ borderColor: "rgba(255,255,255,0.04)" } as React.CSSProperties}>
                  {RESULT_COLS.slice(0, Math.min(colsVis, RESULT_COLS.length)).map((col) => (
                    <div key={col.key} className="flex flex-col px-4 py-2.5 gap-1">
                      <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.35)" }}>
                        {col.key}
                      </span>
                      <span
                        className="font-mono text-[11px] font-medium"
                        style={{ color: col.key === "role" ? ROSE : col.key === "auth_token" ? "rgba(96,165,250,0.75)" : "rgba(226,232,240,0.85)" }}
                      >
                        {col.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Admin dashboard (post-bypass) ───────────────────────────────── */}
        {dashVis && <MockAdminDashboard localProgress={lp} />}
      </div>

      {/* ── Narrative caption ───────────────────────────────────────────────── */}
      <NarrativeCaption opacity={captionOpacity(progress)}>
        One quote character. The password check never ran.
      </NarrativeCaption>
    </>
  );
};
