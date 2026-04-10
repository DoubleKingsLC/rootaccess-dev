"use client";

import React from "react";
import { ramp, CloudKeyframes, S3_RED, GREEN } from "./cloudShared";

const IN = 0.02, OUT = 0.20;
const sceneOp = (p: number) => {
  if (p < IN)          return 0;
  if (p < IN + 0.015)  return (p - IN) / 0.015;
  if (p < OUT - 0.015) return 1;
  if (p < OUT)         return 1 - (p - (OUT - 0.015)) / 0.015;
  return 0;
};

// ── Cursor helpers ─────────────────────────────────────────────────────────────
function easeIO(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
type WP = { at: number; x: number; y: number };
function cursorPos(lp: number, pts: WP[]) {
  if (lp <= pts[0].at) return { x: pts[0].x, y: pts[0].y };
  for (let i = 0; i < pts.length - 1; i++) {
    if (lp <= pts[i + 1].at) {
      const t = easeIO((lp - pts[i].at) / (pts[i + 1].at - pts[i].at));
      return { x: pts[i].x + (pts[i + 1].x - pts[i].x) * t, y: pts[i].y + (pts[i + 1].y - pts[i].y) * t };
    }
  }
  return { x: pts[pts.length - 1].x, y: pts[pts.length - 1].y };
}
function clickRipple(lp: number, at: number) {
  const d = lp - at;
  if (d < 0 || d > 0.026) return null;
  const t = d / 0.026;
  return { scale: 0.15 + t * 2.85, opacity: 1 - t };
}

// Desktop cursor — coords relative to window content area (1080 × 440)
// Notification sits at top:12 right:12 width:320 → centre ≈ (908, 52)
const DESKTOP_WAYPOINTS: WP[] = [
  { at: 0.04, x: 420, y: 280 },   // idle near terminal
  { at: 0.14, x: 908, y: 52  },   // moves toward notification
  { at: 0.22, x: 908, y: 52  },   // holds (click at 0.20)
];

// Browser cursor waypoints — coordinates relative to page-content div
const ALERT_WAYPOINTS: WP[] = [
  { at: 0.38, x: 520, y: 160 },   // appears in email body
  { at: 0.50, x: 255, y: 330 },   // moves toward "View in AWS Config →"
  { at: 0.58, x: 255, y: 330 },   // holds (click fires at 0.54)
  { at: 0.64, x: 255, y: 210 },   // on Config page — moves to prod-company-assets row
  { at: 0.80, x: 255, y: 210 },   // holds (click fires at 0.76)
  { at: 0.90, x: 500, y: 230 },   // drifts on S3 permissions page
];

// ── Desktop pre-phase ─────────────────────────────────────────────────────────
const TERMINAL_LINES = [
  "$ aws s3 ls --profile prod",
  "2024-03-15 08:12:04  prod-company-assets",
  "2024-03-15 08:12:04  backup-logs-archive",
  "$ aws iam list-roles | grep -c Role",
  "47",
  "$ cd ~/scripts && python3 compliance_check.py",
  "Running checks... [████████░░] 80%",
];

// Windowed desktop — same outer chrome dimensions as the browser window
function DesktopScene({ terminalOp, notifSlide, notifOp, desktopCursorOp, dcx, dcy, notifRipple }: {
  terminalOp: number; notifSlide: number; notifOp: number;
  desktopCursorOp: number; dcx: number; dcy: number;
  notifRipple: { scale: number; opacity: number } | null;
}) {
  const visibleLines = Math.floor(terminalOp * TERMINAL_LINES.length);
  return (
    <div style={{
      width: "min(1080px, 96vw)",
      borderRadius: 10,
      overflow: "hidden",
      boxShadow: "0 28px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06)",
      fontFamily: "system-ui, -apple-system, sans-serif",
    }}>
      {/* ── Title bar (macOS style) ── */}
      <div style={{
        background: "#1c1c1e",
        padding: "10px 16px",
        display: "flex", alignItems: "center", gap: 8,
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ef4444" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#f59e0b" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#22c55e" }} />
        <span style={{
          flex: 1, textAlign: "center", fontSize: 12,
          color: "rgba(255,255,255,0.45)", marginLeft: -52,
          fontWeight: 500,
        }}>
          Desktop — admin@prod-bastion
        </span>
        <span style={{ fontSize: 11, color: "rgba(148,163,184,0.5)", fontFamily: "monospace" }}>
          09:41 AM
        </span>
      </div>

      {/* ── Desktop surface ── */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #0a0f1e 100%)",
        position: "relative", height: 440, overflow: "hidden",
      }}>
        {/* Subtle grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(59,130,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,1) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }} />

        {/* Env badge top-left */}
        <div style={{
          position: "absolute", top: 14, left: 18,
          fontFamily: "monospace", fontSize: 11,
          color: "rgba(34,197,94,0.55)",
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "rgba(34,197,94,0.8)", display: "inline-block" }} />
          prod-environment
        </div>

        {/* Mini terminal window — centred on the desktop */}
        <div style={{
          position: "absolute",
          top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 560,
          opacity: Math.min(1, terminalOp * 3),
          background: "rgba(7,9,15,0.94)",
          border: "1px solid rgba(71,85,105,0.4)",
          borderRadius: 8,
          boxShadow: "0 16px 48px rgba(0,0,0,0.7)",
          fontFamily: "monospace",
          overflow: "hidden",
        }}>
          <div style={{ background: "#1e2433", padding: "8px 12px", display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ef4444" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#f59e0b" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22c55e" }} />
            <span style={{ marginLeft: 8, fontSize: 10.5, color: "rgba(148,163,184,0.45)" }}>
              admin@prod-bastion — bash
            </span>
          </div>
          <div style={{ padding: "12px 16px", minHeight: 160 }}>
            {TERMINAL_LINES.slice(0, visibleLines).map((line, i) => (
              <div key={i} style={{
                fontSize: 11, lineHeight: 1.75,
                color: line.startsWith("$") ? "#4ade80"
                     : line.match(/^\d+$/) ? "#93c5fd"
                     : line.includes("%") ? "#fbbf24"
                     : "rgba(148,163,184,0.7)",
              }}>
                {line}
              </div>
            ))}
            {visibleLines < TERMINAL_LINES.length && terminalOp > 0.1 && (
              <span style={{ color: "#4ade80", animation: "cs-blink 0.7s step-end infinite" }}>▋</span>
            )}
          </div>
        </div>

        {/* Notification toast — slides in from right within the window */}
        {notifOp > 0.01 && (
          <div style={{
            position: "absolute", top: 12, right: 12,
            transform: `translateX(${(1 - notifSlide) * 115}%)`,
            opacity: notifOp,
            width: 320,
            background: "rgba(28,28,30,0.97)",
            border: "1px solid rgba(245,158,11,0.35)",
            borderLeft: "3px solid #f59e0b",
            borderRadius: 10,
            padding: "11px 13px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,158,11,0.08)",
            backdropFilter: "blur(12px)",
          }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "#232f3e", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                <span style={{ color: "#f59e0b", fontWeight: 900, fontSize: 11, letterSpacing: "-0.5px", fontFamily: "monospace" }}>aws</span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 3 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.88)" }}>AWS Config</span>
                  <span style={{ fontSize: 10, color: "rgba(148,163,184,0.45)" }}>just now</span>
                </div>
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#fbbf24", marginBottom: 3 }}>
                  Config Rule Triggered
                </div>
                <div style={{ fontSize: 10, color: "rgba(239,68,68,0.85)", fontFamily: "monospace", marginBottom: 2 }}>
                  NON_COMPLIANT · s3-bucket-public-read-prohibited
                </div>
                <div style={{ fontSize: 10, color: "rgba(148,163,184,0.5)", fontFamily: "monospace" }}>
                  prod-company-assets · us-east-1
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Cursor — coords are relative to this 1080×440 content div */}
        <div style={{
          position: "absolute", left: 0, top: 0,
          transform: `translate3d(${dcx}px, ${dcy}px, 0)`,
          willChange: "transform", pointerEvents: "none", zIndex: 100,
        }}>
          {notifRipple && (
            <div style={{
              position: "absolute", left: -20, top: -20, width: 40, height: 40,
              borderRadius: "50%",
              border: "2px solid rgba(245,158,11,0.75)",
              background: "rgba(245,158,11,0.10)",
              transform: `scale(${notifRipple.scale})`,
              opacity: notifRipple.opacity,
            }} />
          )}
          <svg width="14" height="18" viewBox="0 0 14 18"
            style={{ display: "block", opacity: desktopCursorOp, filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.9))" }}>
            <path d="M1 1L1 14L4.5 11L7 17L9.5 16L7 10.5L11.5 10.5Z"
              fill="white" stroke="#1a1a1a" strokeWidth="1.5"
              strokeLinejoin="round" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

// ── Sub-page components ───────────────────────────────────────────────────────

function EmailPage() {
  return (
    <div style={{ display: "flex", height: "100%", minHeight: 440 }}>
      {/* Sidebar */}
      <div style={{ width: 188, background: "#f6f8fc", borderRight: "1px solid #e2e8f0", padding: "12px 0", flexShrink: 0 }}>
        <div style={{ padding: "8px 14px 12px" }}>
          <div style={{ background: "#1a73e8", color: "white", borderRadius: 24, padding: "9px 14px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 16 }}>✏</span> Compose
          </div>
        </div>
        {[
          { icon: "📥", label: "Inbox", active: true, badge: "1" },
          { icon: "⭐", label: "Starred" },
          { icon: "📤", label: "Sent" },
          { icon: "📋", label: "Drafts" },
        ].map(item => (
          <div key={item.label} style={{
            display: "flex", alignItems: "center", gap: 9,
            padding: "7px 14px",
            background: item.active ? "#d3e3fd" : "transparent",
            borderRadius: item.active ? "0 24px 24px 0" : 0,
            marginRight: 12,
          }}>
            <span style={{ fontSize: 13 }}>{item.icon}</span>
            <span style={{ fontSize: 12.5, fontWeight: item.active ? 700 : 400, color: "#333", flex: 1 }}>{item.label}</span>
            {item.badge && (
              <span style={{ background: "#1a73e8", color: "white", borderRadius: 10, padding: "1px 6px", fontSize: 10, fontWeight: 700 }}>{item.badge}</span>
            )}
          </div>
        ))}
      </div>

      {/* Email content */}
      <div style={{ flex: 1, padding: "20px 26px", overflowY: "auto" }}>
        <h2 style={{ fontSize: 17, fontWeight: 400, color: "#202124", margin: "0 0 14px" }}>
          <span style={{ background: "#fef2f2", color: "#dc2626", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 3, marginRight: 8, verticalAlign: "middle" }}>
            ⚠ SECURITY ALERT
          </span>
          [CONFIG] NON_COMPLIANT – S3 public access enabled
        </h2>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#ff9900", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "white", fontSize: 15, fontWeight: 700 }}>A</span>
          </div>
          <div>
            <div style={{ fontSize: 12, color: "#202124", fontWeight: 600 }}>aws-notifications@amazon.com</div>
            <div style={{ fontSize: 11, color: "#888" }}>to admin@company.com · just now</div>
          </div>
        </div>

        <div style={{ border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ background: "#232f3e", padding: "10px 18px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#f59e0b", fontWeight: 900, fontSize: 17, letterSpacing: "-1px" }}>aws</span>
            <span style={{ color: "rgba(255,255,255,0.6)", fontSize: 11 }}>Config Notification</span>
          </div>
          <div style={{ padding: "16px 18px", background: "#fff" }}>
            <div style={{ display: "grid", gridTemplateColumns: "120px 1fr", rowGap: 8 }}>
              {[
                ["Rule", "s3-bucket-public-read-prohibited"],
                ["Resource", "prod-company-assets"],
                ["Type", "AWS::S3::Bucket"],
                ["Region", "us-east-1"],
                ["Time", "2024-03-15  09:42:11 UTC"],
              ].map(([k, v]) => (
                <React.Fragment key={k}>
                  <span style={{ fontSize: 11, color: "#9ca3af" }}>{k}</span>
                  <span style={{ fontSize: 11, color: k === "Resource" ? "#1a73e8" : "#111827", fontWeight: k === "Resource" ? 700 : 400 }}>{v}</span>
                </React.Fragment>
              ))}
              <span style={{ fontSize: 11, color: "#9ca3af" }}>Compliance</span>
              <span>
                <span style={{ background: "#fef2f2", color: "#dc2626", fontSize: 11, padding: "2px 9px", borderRadius: 10, fontWeight: 700 }}>
                  ● NON_COMPLIANT
                </span>
              </span>
            </div>
            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid #f3f4f6" }}>
              <span style={{ background: "#0073bb", color: "white", padding: "7px 16px", borderRadius: 4, fontSize: 11, fontWeight: 600 }}>
                View in AWS Config →
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ConfigPage() {
  return (
    <div style={{ display: "flex", height: "100%", minHeight: 440 }}>
      <div style={{ width: 188, background: "#1a2332", padding: "14px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
          <span style={{ color: "#f59e0b", fontWeight: 900, fontSize: 18, letterSpacing: "-1px" }}>aws</span>
        </div>
        {["Dashboard", "Rules", "Resources", "Conformance packs"].map(item => (
          <div key={item} style={{
            padding: "9px 16px", fontSize: 12,
            color: item === "Rules" ? "white" : "rgba(255,255,255,0.5)",
            background: item === "Rules" ? "rgba(255,255,255,0.1)" : "transparent",
          }}>{item}</div>
        ))}
      </div>

      <div style={{ flex: 1, padding: "18px 22px", background: "#f4f5f7", overflowY: "auto" }}>
        <div style={{ fontSize: 11, color: "#0073bb", marginBottom: 12 }}>
          Config <span style={{ color: "#999", margin: "0 4px" }}>›</span>
          Rules <span style={{ color: "#999", margin: "0 4px" }}>›</span>
          s3-bucket-public-read-prohibited
        </div>

        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 6, padding: "14px 18px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 6 }}>
                s3-bucket-public-read-prohibited
              </div>
              <div style={{ fontSize: 11, color: "#6b7280", display: "flex", gap: 14 }}>
                <span>Status: <b style={{ color: "#16a34a" }}>● Active</b></span>
                <span>Scope: S3 Bucket</span>
              </div>
            </div>
            <div style={{ textAlign: "center", background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 5, padding: "8px 16px" }}>
              <div style={{ fontSize: 9.5, color: "#9ca3af", marginBottom: 3, textTransform: "uppercase", letterSpacing: "0.05em" }}>Compliance</div>
              <div style={{ fontSize: 13, color: "#dc2626", fontWeight: 700 }}>● NON_COMPLIANT</div>
            </div>
          </div>
        </div>

        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ padding: "10px 16px", borderBottom: "1px solid #e5e7eb", fontSize: 12.5, fontWeight: 600, color: "#374151" }}>
            Resources in scope (3)
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5 }}>
            <thead>
              <tr style={{ background: "#f9fafb" }}>
                {["Resource name", "Compliance", "Last evaluated"].map(h => (
                  <th key={h} style={{ textAlign: "left", padding: "8px 16px", color: "#6b7280", fontWeight: 600, borderBottom: "1px solid #e5e7eb", fontSize: 11 }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr style={{ background: "#fef2f2" }}>
                <td style={{ padding: "10px 16px", color: "#0073bb", fontWeight: 700 }}>prod-company-assets</td>
                <td style={{ padding: "10px 16px" }}><span style={{ color: "#dc2626", fontWeight: 700 }}>● NON_COMPLIANT</span></td>
                <td style={{ padding: "10px 16px", color: "#9ca3af" }}>09:42 UTC</td>
              </tr>
              {[["backup-logs-archive", "08:15 UTC"], ["static-website-assets", "08:15 UTC"]].map(([name, ts]) => (
                <tr key={name} style={{ borderTop: "1px solid #f3f4f6" }}>
                  <td style={{ padding: "10px 16px", color: "#0073bb" }}>{name}</td>
                  <td style={{ padding: "10px 16px" }}><span style={{ color: "#16a34a", fontWeight: 600 }}>✓ Compliant</span></td>
                  <td style={{ padding: "10px 16px", color: "#9ca3af" }}>{ts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function S3PermissionsPage() {
  return (
    <div style={{ display: "flex", height: "100%", minHeight: 440 }}>
      <div style={{ width: 188, background: "#1a2332", padding: "14px 0", flexShrink: 0 }}>
        <div style={{ padding: "0 16px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", marginBottom: 8 }}>
          <span style={{ color: "#f59e0b", fontWeight: 900, fontSize: 18, letterSpacing: "-1px" }}>aws</span>
        </div>
        {["Overview", "Properties", "Permissions", "Metrics"].map(item => (
          <div key={item} style={{
            padding: "9px 16px", fontSize: 12,
            color: item === "Permissions" ? "white" : "rgba(255,255,255,0.5)",
            background: item === "Permissions" ? "rgba(255,255,255,0.1)" : "transparent",
          }}>{item}</div>
        ))}
      </div>

      <div style={{ flex: 1, padding: "18px 22px", background: "#f4f5f7", overflowY: "auto" }}>
        <div style={{ fontSize: 11, color: "#0073bb", marginBottom: 12 }}>
          S3 <span style={{ color: "#999", margin: "0 4px" }}>›</span>
          prod-company-assets <span style={{ color: "#999", margin: "0 4px" }}>›</span>
          Permissions
        </div>

        <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 5, padding: "10px 14px", marginBottom: 14, display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ color: "#dc2626", fontSize: 16 }}>⚠</span>
          <span style={{ fontSize: 11.5, color: "#991b1b", fontWeight: 500 }}>This bucket is publicly accessible.</span>
        </div>

        <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 6, overflow: "hidden" }}>
          <div style={{ padding: "12px 18px", borderBottom: "1px solid #e5e7eb", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>Block public access (bucket settings)</div>
              <div style={{ fontSize: 11, color: "#6b7280", marginTop: 3 }}>prod-company-assets</div>
            </div>
            <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 4, padding: "5px 16px", fontSize: 13, color: "#dc2626", fontWeight: 800 }}>
              OFF
            </div>
          </div>
          <div style={{ padding: "0 18px" }}>
            {[
              "Block public access granted through new ACLs",
              "Block public access granted through any ACLs",
              "Block public access granted through new public bucket policies",
              "Restrict access to buckets with public policies",
            ].map((label, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: i < 3 ? "1px solid #f3f4f6" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11.5, color: "#374151" }}>{label}</span>
                <span style={{ fontSize: 11.5, color: "#dc2626", fontWeight: 600 }}>Off</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Main scene ─────────────────────────────────────────────────────────────────
export const AlertScene: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = sceneOp(progress);
  if (opacity === 0) return null;

  const lp = ramp(progress, IN, OUT - IN);

  // ── Desktop pre-phase ─────────────────────────────────────────────────────────
  const terminalOp      = ramp(lp, 0.00, 0.20);
  const notifSlide      = ramp(lp, 0.12, 0.10);
  const notifOp         = ramp(lp, 0.12, 0.08) * (1 - ramp(lp, 0.22, 0.06));
  const desktopCursorOp = ramp(lp, 0.04, 0.06);
  const desktopPhaseOp  = 1 - ramp(lp, 0.24, 0.08);
  const notifRipple     = clickRipple(lp, 0.20);
  const dc              = cursorPos(lp, DESKTOP_WAYPOINTS);

  // ── Browser phase ─────────────────────────────────────────────────────────────
  const browserIn = ramp(lp, 0.28, 0.14);
  const emailOp   = ramp(lp, 0.38, 0.14) * (1 - ramp(lp, 0.54, 0.12));
  const configOp  = ramp(lp, 0.54, 0.14) * (1 - ramp(lp, 0.76, 0.12));
  const s3Op      = ramp(lp, 0.76, 0.18);

  const showConfig = lp > 0.50;
  const showS3     = lp > 0.72;

  const url = showS3
    ? "s3.console.aws.amazon.com/s3/buckets/prod-company-assets?tab=permissions"
    : showConfig
      ? "console.aws.amazon.com/config/rules/s3-bucket-public-read-prohibited"
      : "mail.google.com/mail/u/0/#inbox";

  const tabLabel = showS3
    ? "prod-company-assets — Permissions"
    : showConfig
      ? "AWS Config Rule"
      : "Inbox — admin@company.com";

  const browserScale = 0.1 + browserIn * 0.9;

  // ── Browser cursor ────────────────────────────────────────────────────────────
  const cp       = cursorPos(lp, ALERT_WAYPOINTS);
  const ripple1  = clickRipple(lp, 0.54);   // email → config click
  const ripple2  = clickRipple(lp, 0.76);   // config → S3 click
  const cursorOp = Math.min(1, Math.max(0, (lp - 0.38) / 0.08));

  return (
    <div className="absolute inset-0 flex items-center justify-center" style={{ opacity }}>
      <CloudKeyframes />

      {/* Desktop window — fades out as browser scales in; both centred in the same spot */}
      <div style={{ position: "absolute", opacity: desktopPhaseOp, pointerEvents: "none" }}>
        <DesktopScene
          terminalOp={terminalOp}
          notifSlide={notifSlide}
          notifOp={notifOp}
          desktopCursorOp={desktopCursorOp}
          dcx={dc.x}
          dcy={dc.y}
          notifRipple={notifRipple}
        />
      </div>

      {/* Browser window — scales in from small, overlays desktop */}
      <div style={{
        position: "absolute",
        transform: `scale(${browserScale})`,
        transformOrigin: "center center",
        width: "min(1080px, 96vw)",
        borderRadius: 10,
        overflow: "hidden",
        boxShadow: "0 28px 80px rgba(0,0,0,0.75), 0 0 0 1px rgba(255,255,255,0.06)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        opacity: browserIn,
      }}>

        {/* Tab bar */}
        <div style={{ background: "#1e1e1e", padding: "8px 14px 0", display: "flex", alignItems: "flex-end", gap: 2 }}>
          <div style={{ background: "white", borderRadius: "7px 7px 0 0", padding: "7px 16px", fontSize: 11, color: "#333", display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            <span style={{ fontSize: 12 }}>{showS3 ? "🪣" : showConfig ? "⚙️" : "✉️"}</span>
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 200 }}>{tabLabel}</span>
            <span style={{ color: "#aaa", marginLeft: 4 }}>×</span>
          </div>
          <div style={{ background: "#2e2e2e", borderRadius: "7px 7px 0 0", padding: "7px 14px", fontSize: 11, color: "#777" }}>+</div>
        </div>

        {/* Address bar */}
        <div style={{ background: "#292929", padding: "7px 14px", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", gap: 5 }}>
            <span style={{ color: "#555", fontSize: 17, lineHeight: 1 }}>‹</span>
            <span style={{ color: "#444", fontSize: 17, lineHeight: 1 }}>›</span>
          </div>
          <div style={{ flex: 1, background: "#3a3a3a", borderRadius: 20, padding: "5px 14px", display: "flex", alignItems: "center", gap: 7, overflow: "hidden" }}>
            <span style={{ color: showS3 ? "#fbbf24" : "#4ade80", fontSize: 10 }}>🔒</span>
            <span style={{ color: "#d0d0d0", fontSize: 10.5, fontFamily: "monospace", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {url}
            </span>
          </div>
        </div>

        {/* Page content — cross-fading layers + cursor overlay */}
        <div style={{ background: "white", position: "relative", overflow: "hidden", minHeight: 440 }}>
          <div style={{ position: "absolute", inset: 0, opacity: emailOp,  pointerEvents: "none" }}>
            <EmailPage />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: configOp, pointerEvents: "none" }}>
            <ConfigPage />
          </div>
          <div style={{ position: "absolute", inset: 0, opacity: s3Op,     pointerEvents: "none" }}>
            <S3PermissionsPage />
          </div>

          {/* Cursor overlay */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 200 }}>
            <div style={{
              position: "absolute", left: 0, top: 0,
              transform: `translate3d(${cp.x}px, ${cp.y}px, 0)`,
              willChange: "transform",
            }}>
              {ripple1 && (
                <div style={{
                  position: "absolute", left: -20, top: -20, width: 40, height: 40,
                  borderRadius: "50%",
                  border: "2px solid rgba(79,70,229,0.75)",
                  background: "rgba(79,70,229,0.10)",
                  transform: `scale(${ripple1.scale})`,
                  opacity: ripple1.opacity,
                }} />
              )}
              {ripple2 && (
                <div style={{
                  position: "absolute", left: -20, top: -20, width: 40, height: 40,
                  borderRadius: "50%",
                  border: "2px solid rgba(79,70,229,0.75)",
                  background: "rgba(79,70,229,0.10)",
                  transform: `scale(${ripple2.scale})`,
                  opacity: ripple2.opacity,
                }} />
              )}
              <svg width="14" height="18" viewBox="0 0 14 18"
                style={{ display: "block", opacity: cursorOp, filter: "drop-shadow(1px 1px 2px rgba(0,0,0,0.75))" }}>
                <path d="M1 1L1 14L4.5 11L7 17L9.5 16L7 10.5L11.5 10.5Z"
                  fill="white" stroke="#1a1a1a" strokeWidth="1.5"
                  strokeLinejoin="round" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Phase label */}
      <div className="absolute bottom-8 left-8 font-mono text-[9px] uppercase tracking-widest"
        style={{ color: "rgba(148,163,184,0.4)", opacity: ramp(lp, 0.38, 0.14) }}>
        SCENE 01 · THE ALERT
      </div>
    </div>
  );
};
