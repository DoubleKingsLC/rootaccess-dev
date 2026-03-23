"use client";

import React from "react";

type MockAdminDashboardProps = {
  localProgress: number; // 0–1 within SQLiScene
};

// ── Helpers ────────────────────────────────────────────────────────────────────
const ease = (t: number) => 1 - Math.pow(1 - t, 3);

const dashOp = (lp: number): number => {
  if (lp < 0.72) return 0;
  if (lp < 0.84) return ease((lp - 0.72) / 0.12);
  return 1;
};

const aop = (lp: number, trigger: number): number => {
  if (lp < trigger) return 0;
  return Math.min(1, (lp - trigger) / 0.03);
};

// ── Palette ────────────────────────────────────────────────────────────────────
const ROSE  = "#f43f5e";
const ORG   = "#f97316";
const GREEN = "rgba(34,197,94,0.85)";

// ── Data ───────────────────────────────────────────────────────────────────────
const USERS = [
  { email: "admin@nexuspay.io",      role: "Super Admin", ip: "203.0.113.42", token: "eyJhbGci…uJ9", status: "ACTIVE",  admin: true  },
  { email: "ops@nexuspay.io",        role: "Ops Admin",   ip: "198.51.100.7", token: "eyJhbGci…kQ8", status: "ACTIVE",  admin: true  },
  { email: "j.harrison@nexuspay.io", role: "User",        ip: "10.0.0.55",    token: "—",            status: "ONLINE",  admin: false },
  { email: "m.chen@nexuspay.io",     role: "User",        ip: "10.0.0.22",    token: "—",            status: "ONLINE",  admin: false },
];

const API_KEYS = [
  { key: "sk_live_Ax9kJ2mNpQ3rT6wY1vZ4uB",  scope: "Full Access", env: "PRODUCTION" },
  { key: "sk_live_Bz7cL3oO9qR4sU7xW2uX5eC", scope: "Read Only",   env: "PRODUCTION" },
];

// top = px from the top of the outer browser shell
const ANNOTS = [
  { trigger: 0.84, color: ROSE, title: "14.2M accounts accessible",   detail: "/api/v1/users — no auth, full dump",    top: 106 },
  { trigger: 0.87, color: ORG,  title: "£2.4B financial data exposed", detail: "All transaction history readable",       top: 134 },
  { trigger: 0.90, color: ROSE, title: "Live session tokens",          detail: "Copy token → instant account hijack",   top: 252 },
  { trigger: 0.93, color: ROSE, title: "Production API keys exposed",  detail: "sk_live_* — full platform access",       top: 370 },
  { trigger: 0.96, color: ROSE, title: "Audit log disabled",           detail: "Attacker session leaves zero trace",     top: 458 },
] as const;

// ── Component ──────────────────────────────────────────────────────────────────
export const MockAdminDashboard: React.FC<MockAdminDashboardProps> = ({ localProgress: lp }) => {
  const op = dashOp(lp);
  if (op === 0) return null;

  // Section highlight triggers
  const hUsers  = lp >= 0.84;
  const hVolume = lp >= 0.87;
  const hTokens = lp >= 0.90;
  const hKeys   = lp >= 0.93;
  const hConfig = lp >= 0.96;

  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        width: "clamp(660px, 82vw, 920px)",
        opacity: op,
        alignItems: "flex-start",
        position: "relative",
      }}
    >
      {/* ── Browser shell ─────────────────────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: "monospace",
          background: "#0d1117",
          border: `1px solid rgba(244,63,94,0.22)`,
          borderRadius: 12,
          overflow: "hidden",
          boxShadow: "0 0 40px rgba(244,63,94,0.08), 0 24px 48px rgba(0,0,0,0.5)",
        }}
      >
        {/* Chrome bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 12px",
            background: "#161b22",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <div style={{ display: "flex", gap: 5 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <div
            style={{
              flex: 1,
              margin: "0 8px",
              padding: "3px 10px",
              borderRadius: 5,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              fontSize: 11,
              color: "rgba(226,232,240,0.5)",
            }}
          >
            🔒 admin.nexuspay.io/dashboard
          </div>
          <div
            style={{
              padding: "2px 8px",
              borderRadius: 4,
              background: "rgba(244,63,94,0.08)",
              border: "1px solid rgba(244,63,94,0.2)",
              fontSize: 9,
              color: "rgba(244,63,94,0.45)",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            admin
          </div>
        </div>

        {/* App nav bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 14px",
            height: 36,
            background: "#0f1420",
            borderBottom: "1px solid rgba(244,63,94,0.15)",
            gap: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div
              style={{
                width: 20,
                height: 20,
                borderRadius: 5,
                background: "rgba(244,63,94,0.1)",
                border: "1px solid rgba(244,63,94,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={ROSE} strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <span style={{ color: ROSE, fontSize: 11, fontWeight: 700 }}>NexusPay Admin</span>
          </div>
          <div style={{ width: 1, height: 14, background: "rgba(255,255,255,0.07)" }} />
          {["Dashboard", "Users", "Transactions", "API Keys", "Logs"].map((item, i) => (
            <span
              key={item}
              style={{
                color: i === 0 ? "rgba(226,232,240,0.75)" : "rgba(148,163,184,0.4)",
                fontSize: 10,
                fontWeight: i === 0 ? 600 : 400,
              }}
            >
              {item}
            </span>
          ))}
          <div style={{ flex: 1 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 5,
              padding: "2px 8px",
              borderRadius: 4,
              background: "rgba(244,63,94,0.12)",
              border: "1px solid rgba(244,63,94,0.35)",
            }}
          >
            <div
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: ROSE,
                boxShadow: `0 0 5px ${ROSE}`,
                animation: "pulse 1s infinite",
              }}
            />
            <span style={{ color: ROSE, fontSize: 8, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" }}>
              Privileged Access
            </span>
          </div>
        </div>

        {/* Page body */}
        <div
          style={{
            padding: "12px 14px",
            background: "rgba(8,12,24,0.97)",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {/* ── Stat cards ──────────────────────────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
            {/* Total Users */}
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 6,
                background: hUsers ? `${ROSE}08` : "rgba(255,255,255,0.03)",
                border: hUsers ? `1px solid ${ROSE}55` : "1px solid rgba(255,255,255,0.07)",
                boxShadow: hUsers ? `inset 0 0 0 1px ${ROSE}33` : "none",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: hUsers ? ROSE : "#f1f5f9" }}>14.2M</div>
              <div style={{ fontSize: 9, color: "rgba(148,163,184,0.45)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>
                Total Users
              </div>
            </div>
            {/* Transaction Volume */}
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 6,
                background: hVolume ? `${ORG}08` : "rgba(255,255,255,0.03)",
                border: hVolume ? `1px solid ${ORG}55` : "1px solid rgba(255,255,255,0.07)",
                boxShadow: hVolume ? `inset 0 0 0 1px ${ORG}33` : "none",
                transition: "all 0.3s",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: hVolume ? ORG : "#f1f5f9" }}>£2.4B</div>
              <div style={{ fontSize: 9, color: "rgba(148,163,184,0.45)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>
                Transaction Volume
              </div>
            </div>
            {/* Active Sessions */}
            <div
              style={{
                padding: "10px 12px",
                borderRadius: 6,
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <div style={{ fontSize: 20, fontWeight: 700, color: "#f1f5f9" }}>847</div>
              <div style={{ fontSize: 9, color: "rgba(148,163,184,0.45)", letterSpacing: "0.18em", textTransform: "uppercase", marginTop: 2 }}>
                Active Sessions
              </div>
            </div>
          </div>

          {/* ── Users table ─────────────────────────────────────────────────── */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
              <span style={{ fontSize: 9, color: "rgba(148,163,184,0.4)", letterSpacing: "0.28em", textTransform: "uppercase" }}>
                User Accounts
              </span>
              <span
                style={{
                  fontSize: 8,
                  padding: "1px 6px",
                  borderRadius: 3,
                  background: "rgba(244,63,94,0.08)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  color: "rgba(244,63,94,0.55)",
                }}
              >
                14.2M total
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: 8,
                  padding: "1px 6px",
                  borderRadius: 3,
                  background: "rgba(96,165,250,0.07)",
                  border: "1px solid rgba(96,165,250,0.18)",
                  color: "rgba(96,165,250,0.6)",
                  cursor: "default",
                }}
              >
                Export CSV
              </span>
            </div>

            {/* Table */}
            <div
              style={{
                borderRadius: 6,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {/* Header */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "2.5fr 1.2fr 1.5fr 2fr 1fr",
                  padding: "5px 10px",
                  background: "rgba(255,255,255,0.04)",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {["Email", "Role", "Last IP", "Session Token", "Status"].map((h) => (
                  <span
                    key={h}
                    style={{ fontSize: 8, color: "rgba(148,163,184,0.35)", letterSpacing: "0.2em", textTransform: "uppercase" }}
                  >
                    {h}
                  </span>
                ))}
              </div>

              {/* Rows */}
              {USERS.map((u, i) => (
                <div
                  key={i}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "2.5fr 1.2fr 1.5fr 2fr 1fr",
                    padding: "6px 10px",
                    alignItems: "center",
                    background:
                      hTokens && u.admin
                        ? "rgba(244,63,94,0.05)"
                        : i % 2 === 0
                        ? "transparent"
                        : "rgba(255,255,255,0.015)",
                    borderBottom: i < USERS.length - 1 ? "1px solid rgba(255,255,255,0.03)" : "none",
                    transition: "background 0.3s",
                  }}
                >
                  <span style={{ fontSize: 10, color: u.admin ? "#f87171" : "rgba(226,232,240,0.75)" }}>
                    {u.email}
                    {u.admin && <span style={{ marginLeft: 4, fontSize: 8, color: ROSE }}>⚠</span>}
                  </span>
                  <span style={{ fontSize: 9, color: u.admin ? "rgba(244,63,94,0.65)" : "rgba(148,163,184,0.5)" }}>
                    {u.role}
                  </span>
                  <span style={{ fontSize: 9, color: "rgba(148,163,184,0.5)" }}>{u.ip}</span>
                  <span
                    style={{
                      fontSize: 9,
                      color: hTokens && u.admin ? ROSE : "rgba(148,163,184,0.4)",
                      fontWeight: hTokens && u.admin ? 700 : 400,
                      transition: "color 0.3s",
                    }}
                  >
                    {u.token}
                  </span>
                  <span
                    style={{
                      fontSize: 8,
                      color: u.status === "ACTIVE" ? GREEN : "rgba(148,163,184,0.5)",
                    }}
                  >
                    ● {u.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ── API Keys ─────────────────────────────────────────────────────── */}
          <div
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              background: hKeys ? `${ROSE}07` : "rgba(255,255,255,0.02)",
              border: hKeys ? `1px solid ${ROSE}44` : "1px solid rgba(255,255,255,0.06)",
              transition: "all 0.3s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: "rgba(148,163,184,0.4)", letterSpacing: "0.28em", textTransform: "uppercase" }}>
                API Keys
              </span>
              <span
                style={{
                  fontSize: 8,
                  padding: "1px 6px",
                  borderRadius: 3,
                  background: "rgba(244,63,94,0.08)",
                  border: "1px solid rgba(244,63,94,0.2)",
                  color: "rgba(244,63,94,0.55)",
                }}
              >
                sk_live environment
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              {API_KEYS.map((k, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "5px 8px",
                    borderRadius: 4,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={hKeys ? ROSE : "rgba(148,163,184,0.3)"} strokeWidth="2.5">
                    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                  </svg>
                  <span
                    style={{
                      fontSize: 10,
                      flex: 1,
                      color: hKeys ? ROSE : "rgba(148,163,184,0.65)",
                      fontWeight: hKeys ? 700 : 400,
                      transition: "color 0.3s",
                      letterSpacing: "0.03em",
                    }}
                  >
                    {k.key}
                  </span>
                  <span
                    style={{
                      fontSize: 8,
                      padding: "1px 6px",
                      borderRadius: 3,
                      background: "rgba(244,63,94,0.08)",
                      border: "1px solid rgba(244,63,94,0.18)",
                      color: "rgba(244,63,94,0.55)",
                    }}
                  >
                    {k.scope}
                  </span>
                  <span style={{ fontSize: 8, color: "rgba(148,163,184,0.3)" }}>{k.env}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── System config ─────────────────────────────────────────────────── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 6,
              padding: "6px 10px",
              borderRadius: 6,
              background: hConfig ? `${ROSE}06` : "rgba(255,255,255,0.02)",
              border: hConfig ? `1px solid ${ROSE}44` : "1px solid rgba(255,255,255,0.05)",
              transition: "all 0.3s",
            }}
          >
            <span
              style={{
                fontSize: 9,
                color: "rgba(148,163,184,0.35)",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                marginRight: 2,
              }}
            >
              System:
            </span>
            {[
              { label: "Audit Log: DISABLED",    color: ROSE },
              { label: "Debug Mode: ON",          color: ORG  },
              { label: "Session Timeout: NEVER",  color: "rgba(251,191,36,0.8)" },
              { label: "Log Level: VERBOSE",       color: "rgba(96,165,250,0.7)" },
            ].map((item) => (
              <span
                key={item.label}
                style={{
                  fontSize: 8,
                  padding: "2px 7px",
                  borderRadius: 3,
                  background: `${item.color}12`,
                  border: `1px solid ${item.color}40`,
                  color: item.color,
                  fontWeight: 600,
                }}
              >
                {item.label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Annotation column ─────────────────────────────────────────────────── */}
      <div style={{ width: 196, flexShrink: 0, position: "relative", minHeight: 500 }}>
        {ANNOTS.map((a, i) => {
          const opacity = aop(lp, a.trigger);
          if (opacity === 0) return null;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: a.top,
                left: 0,
                right: 0,
                opacity,
                transform: `translateX(${(1 - opacity) * 10}px)`,
                transition: "none",
              }}
            >
              {/* Connector nub */}
              <div
                style={{
                  position: "absolute",
                  right: "100%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 0,
                  pointerEvents: "none",
                }}
              >
                <div style={{ flex: 1, height: 1, borderTop: `1px dashed ${a.color}50` }} />
                <div
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: "50%",
                    background: a.color,
                    boxShadow: `0 0 4px ${a.color}`,
                    flexShrink: 0,
                  }}
                />
              </div>

              {/* Card */}
              <div
                style={{
                  padding: "8px 10px",
                  borderRadius: 7,
                  background: "rgba(6,9,18,0.98)",
                  border: `1px solid ${a.color}44`,
                  boxShadow: `0 0 16px ${a.color}10, 0 8px 24px rgba(0,0,0,0.4)`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 4 }}>
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: a.color,
                      boxShadow: `0 0 6px ${a.color}`,
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: a.color,
                      fontFamily: "monospace",
                      lineHeight: 1.3,
                    }}
                  >
                    {a.title}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 9,
                    color: "rgba(148,163,184,0.6)",
                    fontFamily: "monospace",
                    margin: 0,
                    lineHeight: 1.5,
                    paddingLeft: 11,
                  }}
                >
                  {a.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
