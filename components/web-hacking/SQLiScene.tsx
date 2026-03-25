"use client";

import React from "react";
import { SQLQueryPanel }      from "./SQLQueryPanel";
import { MockAdminDashboard } from "./MockAdminDashboard";
import { MockAdminLogin }     from "./MockAdminLogin";

type SQLiSceneProps = {
  progress: number; // global 0–1
};

// ── Scene window: 0.60–0.785 ──────────────────────────────────────────────────
// Full     0.600–0.755  (no fade-in — continues from InitialAccessScene seamlessly)
// Fade out 0.755–0.785 (3% = 240vh!)
const sceneOpacity = (p: number): number => {
  if (p < 0.600) return 0;
  if (p <= 0.755) return 1;
  if (p < 0.785) return 1 - (p - 0.755) / 0.030;
  return 0;
};

// Local 0–1 across 0.600–0.775
const local = (p: number): number =>
  Math.max(0, Math.min(1, (p - 0.600) / 0.175));

// ── Phase 1 — probe: type `'` into password (local 0.06–0.18) ────────────────
const PROBE = "'";
const probeTyped = (lp: number): string => {
  if (lp < 0.06 || lp >= 0.34) return "";   // cleared before payload phase
  if (lp < 0.18) return PROBE.slice(0, Math.round(((lp - 0.06) / 0.12) * PROBE.length));
  return PROBE; // stays visible during error phase
};

// ── Phase 2 — error state (local 0.20–0.34) ──────────────────────────────────
const errorVisible = (lp: number): boolean => lp >= 0.20 && lp < 0.34;

const ERROR_LINES = [
  "SQLSTATE[42000]: Syntax error or access violation",
  "near \"'\" at line 1 — unexpected token",
];
// Each error line flashes in sequentially
const errorLineVisible = (lp: number, idx: number): boolean => {
  if (!errorVisible(lp)) return false;
  return lp >= 0.20 + idx * 0.055;
};

// ── Phase 3 — payload: type `' OR 1=1 --` (local 0.34–0.56) ─────────────────
const PAYLOAD = "' OR 1=1 --";
const payloadTyped = (lp: number): string => {
  if (lp < 0.34) return "";
  const t = Math.min((lp - 0.34) / 0.22, 1);
  return PAYLOAD.slice(0, Math.round(t * PAYLOAD.length));
};

// ── Phase 4 — SQL zoom (local 0.72–0.82) ─────────────────────────────────────
const showSQLZoom  = (lp: number): boolean => lp >= 0.72 && lp < 0.82;
const showLoginForm = (lp: number): boolean => lp < 0.72;

// Zoom panel — starts small + low (mimics the bottom SQLQueryPanel),
// rises to center and scales up to full size
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const zoomOpacity = (lp: number): number => {
  if (lp < 0.72) return 0;
  if (lp < 0.73) return ease((lp - 0.72) / 0.01) * 0.7; // quick partial fade in
  if (lp <= 0.80) return 0.7 + ease((lp - 0.73) / 0.07) * 0.3; // finish to 1
  if (lp < 0.82) return 1 - (lp - 0.80) / 0.02;
  return 0;
};

// Scale: starts at 0.55 (roughly the small panel size), grows to 1.0
const zoomScale = (lp: number): number => {
  if (lp < 0.72) return 0.55;
  if (lp < 0.77) return 0.55 + ease((lp - 0.72) / 0.05) * 0.45;
  return 1.0;
};

// TranslateY: starts at +32vh (bottom), rises to 0 (center)
const zoomTranslateY = (lp: number): number => {
  if (lp < 0.72) return 32;
  if (lp < 0.77) return 32 * (1 - ease((lp - 0.72) / 0.05));
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
  if (lp < 0.76) return 0;
  return Math.floor(((lp - 0.76) / 0.055) * (RESULT_COLS.length + 1));
};

// ── Dashboard visible after local 0.82 ───────────────────────────────────────
const showDashboard = (lp: number): boolean => lp >= 0.82;

// Caption: in at 0.650, out at 0.770 global
const captionOpacity = (p: number): number => {
  if (p < 0.650) return 0;
  if (p < 0.670) return (p - 0.650) / 0.020;
  if (p <= 0.760) return 1;
  if (p < 0.780) return 1 - (p - 0.760) / 0.020;
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
  const isError   = errorVisible(lp);
  const loginVis  = showLoginForm(lp);
  const sqlZoom   = showSQLZoom(lp);
  const dashVis   = showDashboard(lp);
  const zoomOp    = zoomOpacity(lp);
  const zoomSc    = zoomScale(lp);
  const zoomTY    = zoomTranslateY(lp);
  const colsVis   = resultColsVisible(lp);

  // What's currently in the password field
  const passField = payload || probe;
  const passIsPayload = payload.length > 0;
  const passIsProbe   = probe.length > 0 && !passIsPayload;
  const authenticated = lp >= 0.72;

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
          className="absolute top-12 left-1/2 -translate-x-1/2 font-mono text-[9px] uppercase tracking-[0.45em]"
          style={{
            color: "rgba(244,63,94,0.4)",
            opacity: lp > 0.05 ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        >
          {dashVis ? "Access granted — admin session active" : "SQL injection · admin.nexuspay.io/login"}
        </div>

        {/* ── Login form + SQL panel (pre-bypass) ─────────────────────────── */}
        {loginVis && (
          <div className="flex flex-col gap-3" style={{ width: "clamp(480px, 52vw, 720px)" }}>
            <MockAdminLogin
              localProgress={lp}
              attack={{
                usernameValue: "admin",
                passwordValue: passField,
                showCursor:
                  (passIsProbe && probe.length < PROBE.length) ||
                  (passIsPayload && payload.length < PAYLOAD.length),
                isError,
                errorLines: ERROR_LINES.map((text, idx) => ({
                  text,
                  visible: errorLineVisible(lp, idx),
                })),
                isAuthenticated: authenticated,
              }}
            />
            {/* SQL query panel */}
            <SQLQueryPanel localProgress={lp} payload={payload} />
          </div>
        )}

        {/* ── SQL zoom phase (lp 0.72–0.82) ──────────────────────────────── */}
        {sqlZoom && (
          <div
            className="flex flex-col gap-4"
            style={{
              opacity: zoomOp,
              transform: `scale(${zoomSc}) translateY(${zoomTY}vh)`,
              width: "clamp(480px, 58vw, 780px)",
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
      <div
        className="pointer-events-none absolute bottom-[72px] left-1/2 z-[35] -translate-x-1/2"
        style={{ opacity: captionOpacity(progress) }}
        aria-hidden
      >
        <div className="rounded-xl border border-white/10 bg-slate-950/85 px-5 py-2.5 backdrop-blur-md max-w-[90vw]">
          <p className="font-mono text-xs font-medium tracking-wide text-slate-100 text-center md:text-sm">
            One quote character. The password check never ran.
          </p>
        </div>
      </div>
    </>
  );
};
