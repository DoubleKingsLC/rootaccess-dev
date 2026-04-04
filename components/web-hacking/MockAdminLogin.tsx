"use client";

import React from "react";

const ROSE  = "#f43f5e";
const RED   = "#ef4444";
const GREEN = "rgba(34,197,94,0.9)";

// URL types 0.00–0.28 (reveal mode only)
const URL_TEXT = "https://admin.nexuspay.io/login";
const urlTyped = (lp: number): string => {
  if (lp <= 0) return "";
  const chars = Math.round((Math.min(lp, 0.28) / 0.28) * URL_TEXT.length);
  return URL_TEXT.slice(0, chars);
};

// Username types 0.90–0.96 (reveal mode only, at the very end of discovery)
const USERNAME_TEXT = "admin";
const userTyped = (lp: number): string => {
  if (lp < 0.90) return "";
  const t = Math.min((lp - 0.90) / 0.06, 1);
  return USERNAME_TEXT.slice(0, Math.round(t * USERNAME_TEXT.length));
};

// Page content fades in at 0.32 (reveal mode only)
const pageOpacity = (lp: number): number => {
  if (lp < 0.32) return 0;
  if (lp < 0.46) return (lp - 0.32) / 0.14;
  return 1;
};

// "Found via recon" chip appears at 0.54, fades out at 0.92–0.98 (to avoid jumpy transition)
const chipOpacity = (lp: number): number => {
  if (lp < 0.54) return 0;
  if (lp < 0.64) return (lp - 0.54) / 0.10;
  if (lp <= 0.92) return 1;
  if (lp < 0.98) return 1 - (lp - 0.92) / 0.06;
  return 0;
};

const alertOpacity = (lp: number): number => {
  if (lp < 0.46) return 0; // After page fades in
  if (lp < 0.56) return (lp - 0.46) / 0.10;
  if (lp <= 0.92) return 1;
  if (lp < 0.98) return 1 - (lp - 0.92) / 0.06;
  return 0;
};

type AttackState = {
  usernameValue: string;                          // e.g. "admin"
  passwordValue: string;                          // probe or payload text
  showCursor: boolean;                            // blinking cursor in password field
  isError: boolean;                               // red border + SQL error box
  isClicked?: boolean;                            // button pressed state
  errorLines: Array<{ text: string; visible: boolean }>;
  isAuthenticated: boolean;                       // green border + ✓ Authenticated
};

type MockAdminLoginProps = {
  localProgress: number;  // 0–1 within owning scene
  attack?: AttackState;   // if provided → attack mode (SQLi animation)
};

export const MockAdminLogin: React.FC<MockAdminLoginProps> = ({ localProgress, attack }) => {
  const isAttack = !!attack;

  // ── Reveal-mode derived values ─────────────────────────────────────────────
  const typedUser = isAttack ? null : userTyped(localProgress);
  const typedUrl  = isAttack ? null : urlTyped(localProgress);
  const pageOp    = isAttack ? 1    : pageOpacity(localProgress);
  const chipOp    = isAttack ? 0    : chipOpacity(localProgress);
  const alertOp   = isAttack ? 0    : alertOpacity(localProgress);

  // ── Border / glow colour ───────────────────────────────────────────────────
  const borderColor = attack?.isAuthenticated
    ? "rgba(34,197,94,0.5)"
    : attack?.isError
      ? `${RED}55`
      : "rgba(244,63,94,0.22)";
  const boxShadow = attack?.isAuthenticated
    ? "0 0 40px rgba(34,197,94,0.12)"
    : attack?.isError
      ? `0 0 32px rgba(239,68,68,0.10)`
      : "0 0 60px rgba(244,63,94,0.10), 0 32px 64px rgba(0,0,0,0.6)";

  return (
    <div className="relative" style={{ width: "clamp(480px, 52vw, 720px)" }}>

      {/* ── Browser shell ─────────────────────────────────────────────────── */}
      <div
        className="flex flex-col overflow-hidden rounded-2xl"
        style={{
          background: "#0d1117",
          border: `1px solid ${borderColor}`,
          boxShadow,
          transition: "border-color 0.25s, box-shadow 0.25s",
        }}
      >
        {/* Chrome bar */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#161b22", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          <div className="flex gap-1.5">
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <div key={i} className="h-3 w-3 rounded-full" style={{ background: c }} />
            ))}
          </div>

          {/* URL bar */}
          <div
            className="mx-3 flex flex-1 items-center gap-2 rounded-lg px-3 py-1.5"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="rgba(34,197,94,0.8)" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="font-mono text-[11px]" style={{ color: "rgba(226,232,240,0.7)" }}>
              {isAttack ? URL_TEXT : typedUrl}
              {!isAttack && typedUrl && typedUrl.length < URL_TEXT.length && localProgress > 0 && (
                <span
                  className="ml-0.5 inline-block w-px"
                  style={{ background: ROSE, height: "12px", verticalAlign: "middle", animation: "pulse 1s steps(1) infinite" }}
                />
              )}
            </span>
          </div>

          {/* Tab badge */}
          <div
            className="rounded px-2 py-1 font-mono text-[9px] uppercase tracking-widest"
            style={{ background: "rgba(244,63,94,0.08)", color: "rgba(244,63,94,0.5)" }}
          >
            admin
          </div>
        </div>

        {/* ── Page body ─────────────────────────────────────────────────────── */}
        <div
          className="flex flex-col items-center justify-center px-8 py-10 gap-6"
          style={{
            opacity: pageOp,
            height: 540,
            background: "linear-gradient(160deg, #0d1117 0%, #0f0a12 100%)",
          }}
        >
          {/* Logo / brand */}
          <div className="flex flex-col items-center gap-2">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)" }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={ROSE} strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <p className="font-mono text-sm font-bold text-white tracking-wide">NexusPay</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em]" style={{ color: "rgba(244,63,94,0.5)" }}>
              Admin Portal
            </p>
          </div>

          {/* Form */}
          <div className="flex w-full max-w-xs flex-col gap-3">
            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.5)" }}>
                Username
              </label>
              <div
                className="rounded-lg px-3 py-2.5"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                <span className="font-mono text-[12px]" style={{ color: (isAttack || (typedUser && typedUser.length > 0)) ? "rgba(226,232,240,0.85)" : "rgba(148,163,184,0.4)" }}>
                  {isAttack ? attack.usernameValue : (typedUser || "Enter username")}
                  {!isAttack && typedUser && typedUser.length > 0 && typedUser.length < USERNAME_TEXT.length && (
                    <span
                      className="ml-0.5 inline-block w-px"
                      style={{ background: ROSE, height: "13px", verticalAlign: "middle", animation: "pulse 1s steps(1) infinite" }}
                    />
                  )}
                </span>
              </div>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.5)" }}>
                Password
              </label>
              <div
                className="rounded-lg px-3 py-2.5"
                style={{
                  background: attack?.isError ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
                  border: attack?.isError
                    ? `1px solid ${RED}88`
                    : attack?.passwordValue
                      ? `1px solid ${ROSE}66`
                      : "1px solid rgba(255,255,255,0.10)",
                  transition: "border-color 0.2s, background 0.2s",
                }}
              >
                {isAttack ? (
                  <span
                    className="font-mono text-[12px]"
                    style={{
                      color: attack.isError
                        ? RED
                        : attack.passwordValue.includes("OR")
                          ? ROSE
                          : "rgba(226,232,240,0.85)",
                    }}
                  >
                    {attack.passwordValue || <span style={{ color: "rgba(148,163,184,0.3)" }}>Password</span>}
                    {attack.showCursor && (
                      <span
                        className="ml-0.5 inline-block w-px"
                        style={{ background: ROSE, height: "13px", verticalAlign: "middle", animation: "pulse 1s steps(1) infinite" }}
                      />
                    )}
                  </span>
                ) : (
                  <span className="font-mono text-[12px]" style={{ color: "rgba(148,163,184,0.4)" }}>
                    ••••••••
                  </span>
                )}
              </div>
            </div>

  
            {/* Login button */}
            {isAttack ? (
              <div
                className="mt-1 w-full rounded-lg py-2.5 text-center font-mono text-[11px] font-bold uppercase tracking-widest"
                style={{
                  background: attack.isAuthenticated ? "rgba(34,197,94,0.15)" : "rgba(244,63,94,0.12)",
                  border: attack.isAuthenticated ? "1px solid rgba(34,197,94,0.4)" : `1px solid ${attack.isClicked ? ROSE : "rgba(244,63,94,0.25)"}`,
                  color: attack.isAuthenticated ? GREEN : "rgba(244,63,94,0.6)",
                  transform: attack.isClicked ? "scale(0.96)" : "scale(1)",
                  boxShadow: attack.isClicked ? `0 0 20px ${ROSE}33` : "none",
                  transition: "all 0.1s ease-out",
                }}
              >
                {attack.isAuthenticated ? "✓ Authenticated" : "Sign In"}
              </div>
            ) : (
              <button
                className="mt-1 w-full rounded-lg py-2.5 font-mono text-[11px] font-bold uppercase tracking-widest text-white"
                style={{
                  background: "rgba(244,63,94,0.15)",
                  border: "1px solid rgba(244,63,94,0.3)",
                  cursor: "default",
                }}
              >
                Sign In
              </button>
            )}

            {/* No MFA notice — always rendered but visible only during discovery to prevent layout jumps */}
            <div
              className="flex items-center gap-2 rounded-lg px-3 py-2"
              style={{
                opacity: alertOp,
                background: "rgba(244,63,94,0.06)",
                border: "1px solid rgba(244,63,94,0.12)",
                transition: "opacity 0.25s",
                pointerEvents: alertOp > 0 ? "auto" : "none",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ROSE} strokeWidth="2.5">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span className="font-mono text-[10px]" style={{ color: "rgba(244,63,94,0.65)" }}>
                No MFA · No rate limit · No lockout policy
              </span>
            </div>
          </div>

          {/* ── Database error — page-level, pulse + pop (attack mode) ─────── */}
          {attack?.isError && (
            <div
              className="w-full overflow-hidden rounded-lg"
              style={{
                border: `1px solid ${RED}55`,
                background: "rgba(17,6,6,0.95)",
                transform: `translateY(${localProgress >= 0.44 ? Math.max(0, 8 - (localProgress - 0.44) * 400) : 0}px)`,
                boxShadow: `0 0 ${20 + Math.sin(localProgress * 180) * 12}px rgba(239,68,68,${0.25 + Math.sin(localProgress * 180) * 0.2})`,
                transition: "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
              }}
            >
              {/* Error header bar */}
              <div
                className="flex items-center gap-2 px-4 py-2.5"
                style={{ background: "rgba(239,68,68,0.14)", borderBottom: `1px solid ${RED}33` }}
              >
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#f43f5e]" />
                <span className="font-mono text-[11px] font-bold uppercase tracking-widest" style={{ color: RED }}>
                  Database Error
                </span>
                <span className="ml-auto font-mono text-[9px]" style={{ color: `${RED}66` }}>
                  HTTP 500
                </span>
              </div>

              {/* Error body */}
              <div className="px-4 py-3 flex flex-col gap-2">
                {attack.errorLines.map((line, idx) =>
                  line.visible ? (
                    <div key={idx} className="flex items-start gap-2">
                      <span
                        className="shrink-0 font-mono text-[10px] font-bold"
                        style={{ color: `${RED}88`, marginTop: "1px" }}
                      >
                        {idx === 0 ? "ERR" : "  ↳"}
                      </span>
                      <span
                        className="font-mono text-[11px] leading-relaxed"
                        style={{ color: idx === 0 ? "rgba(252,165,165,0.9)" : "rgba(252,165,165,0.65)" }}
                      >
                        {line.text}
                      </span>
                    </div>
                  ) : null
                )}

                {/* SQL injection label */}
                {attack.errorLines[1]?.visible && (
                  <div
                    className="mt-1 flex items-center gap-2 rounded px-3 py-1.5"
                    style={{ background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.18)" }}
                  >
                    <span className="font-mono text-[10px] font-bold" style={{ color: "rgba(244,63,94,0.8)" }}>
                      ↳
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(244,63,94,0.7)" }}>
                      SQL injection vector detected
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── "Found via recon" chip (reveal mode only) ─────────────────────── */}
      <div
        className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-lg px-3 py-1.5"
        style={{
          opacity: chipOp,
          background: "rgba(8,12,24,0.95)",
          border: "1px solid rgba(244,63,94,0.3)",
          boxShadow: "0 0 16px rgba(244,63,94,0.12)",
        }}
      >
        <div className="h-1.5 w-1.5 rounded-full" style={{ background: ROSE, boxShadow: `0 0 6px ${ROSE}` }} />
        <span className="font-mono text-[9px] uppercase tracking-widest" style={{ color: ROSE }}>
          dir enum · /login · 200 OK
        </span>
      </div>
    </div>
  );
};
