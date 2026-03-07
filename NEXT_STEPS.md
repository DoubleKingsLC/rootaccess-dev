# RootAccess.tech — Next Steps

## Context

The technical foundation is strong. The home page branching animation, the SOC scrollytelling layout,
the GSAP + Lenis scroll system, and the zoom-portal camera work are all solid. The gap is narrative:
a tech-curious person with no cybersecurity background lands here, watches monitors flash red, and
leaves without understanding what happened, why it matters, or where they fit in.

The goal of these next steps is to layer the human story on top of the technical shell that already exists.

---

## The Story to Tell: One Incident, Start to Finish

The most powerful frame for someone new to cybersecurity is following **a single incident in real time**.
Pick something concrete — a ransomware intrusion attempt. Walk the user through what the SOC does from
first alert to post-mortem. Make them feel what it is like to be in that room.

### Incident Story Arc (mapped to scroll progress)

| Scroll % | Scene | What the user experiences |
|---|---|---|
| 0–5% | **The Floor — Normal Ops** | Analyst stations humming, data packets flowing, intel ticker cycling, quiet operations |
| 5–12% | **Alert Fires** — L1 catches something | Ticker highlights: `UNUSUAL AUTH PATTERN: REGION MISMATCH`. L1 monitor turns red. Narrative card fades in. |
| 12–30% | **L1 Portal: First Look** | Camera zooms into L1 desk. MonitorPortal shows live log stream, the suspicious login line highlighted, L1 triaging |
| 30–38% | **Escalation** | Brief narrative: *"L1 confirmed it's real. L2 now needs to find out how far in they got."* Camera returns to floor. |
| 38–57% | **L2 Portal: Connect the Dots** | Zoom into L2 triple monitors. Correlation view: 3 events individually harmless, together = lateral movement. Playbook HUD activates. |
| 57–72% | **L3 Portal: Forensics** | Zoom into L3. Forensic artifact view — malware hash, filename, IOC extracted. Hard disk animation fires. |
| 72–85% | **War Room** — Stakeholders notified | CISO, Legal, Systems Admin notifications fire. Briefing toasts appear. Organisation responds. |
| 85–90% | **Lessons Learned** | Post-mortem metrics: 15min response, root cause, resolution. Boardroom view. |
| 90–100% | **Career Path CTA** | Earned transition: "This is what SOC analysts do. Here's how you get there." |

---

## What Already Exists but Is Not Wired Up

These components are fully built in `/components/scrollytelling/` but are **not mounted** in
`ScrollytellingLayout.tsx`. They are ready to use:

| Component | Purpose | Where it belongs |
|---|---|---|
| `TerminalView` | CRT terminal with L1_Analyst login, log stream | L1 MonitorPortal content |
| `PlaybookHUD` | SOAR playbook steps activating by scroll progress | L2 portal / active during 0.38–0.57 |
| `StakeholderBroadcast` | CISO / Legal / Systems Admin notifications + pulse animations | 0.78–0.85 phase |
| `BriefingOverlay` | Plain-English role descriptions for CISO, Legal, Systems Admin | Triggered by StakeholderBroadcast |
| `LessonsLearnedView` | Boardroom post-mortem with Cloud / Playbook / Monitoring nodes | 0.85–0.90 phase |
| `ExecutivePOV` | Executive station with response time, root cause, resolution metrics | 0.85–0.90 phase |
| `NotificationToast` | Already used inside StakeholderBroadcast — no action needed | — |
| `WorkstationPOV` | Alternative absolute-positioned workstation with boardroom variant | Optional for executive phase |
| `AnalystAvatar` | Framer Motion avatar with alert glow state | Optional enhancement for station labels |

The `MonitorPortal` component (`L1`, `L2`, `L3`) has its content area completely empty —
it renders a header bar and transparent space. The three camera-zoom moments are the most
cinematic beats of the experience and currently show nothing meaningful.

---

## Priority 1 — Fill the MonitorPortal Content

**File:** `components/scrollytelling/MonitorPortal.tsx`

The portal is a full `80vh × 80vw` overlay that appears on each station zoom. Each one needs
a screen that makes the user feel like they just sat down at that analyst's workstation.

### L1 Portal — Real-Time Monitoring
Show a simulated SIEM log stream. A wall of timestamped log lines scrolling slowly, then one
line highlighted in red — the anomaly that triggered the alert.

Content to render inside the L1 portal content area:
- Scrolling monospace log lines (static fake data is fine, does not need to be live)
- One line in red/amber: `[WARN] AUTH_FAIL x47 | user: j.chen | src: 185.220.101.47 | region: RU`
- A blinking cursor below it
- Small label: `SIEM — Real-time log ingestion`
- Use the existing `TerminalView` component as the base — it already has CRT scanlines and the L1_Analyst header

### L2 Portal — Event Correlation
Show a mini correlation timeline. Three events displayed as nodes connected by lines,
individually grey, but when correlated the connecting lines glow cyan.

Content to render inside the L2 portal content area:
- Event 1: `Unusual auth (47 failures)` — node
- Event 2: `SMB share access — Finance folder` — node
- Event 3: `Outbound DNS to unknown TLD` — node
- Lines connecting them, animating in sequence
- Label: `EDR Correlation — 3 events, 1 pattern`
- Mount `PlaybookHUD` here — steps activate as this portal is held open by scroll position

### L3 Portal — Forensic Analysis
Show forensic artifact output. The hard disk extraction (`l3DiskRef`) is already animated
to slide out at 55% — make this visible and contextualised inside the portal.

Content to render inside the L3 portal content area:
- Disk image label: `DISK_IMAGE_WS04.img — acquired 14:32:07`
- Extracted artifact: `Filename: svchost32.exe | MD5: a3f2...c91b | Verdict: MALICIOUS`
- IOC block: `C2: 185.220.101.47 | Beacon interval: 300s`
- Label: `Forensic Analysis — Artifact extraction complete`

---

## Priority 2 — Wire StakeholderBroadcast + BriefingOverlay

**File:** `components/scrollytelling/ScrollytellingLayout.tsx`

Mount `StakeholderBroadcast` and `BriefingOverlay` in the layout. They are complete — GSAP
animations, toast notifications, pulse animations, and plain-English role descriptions are
all already written. They just need to be imported and rendered.

```tsx
// Add to ScrollytellingLayout render, inside the pinned viewport div:
<StakeholderBroadcast progress={progress} />
```

`BriefingOverlay` is triggered by a selected role state. Wire it so clicking a stakeholder
label in `StakeholderBroadcast` opens the corresponding briefing card.

This phase (0.78–0.85) is important for non-cyber visitors because it shows that cybersecurity
is not purely technical — it touches legal compliance, executive risk, and operational recovery.
That broadens who sees themselves in this field.

---

## Priority 3 — Wire LessonsLearnedView + ExecutivePOV

**File:** `components/scrollytelling/ScrollytellingLayout.tsx`

Mount `LessonsLearnedView` for the 0.85–0.90 window. It already has the boardroom silhouette,
the glowing Cloud / Playbook / Monitoring nodes, and the post-mortem frame.

`ExecutivePOV` has the metric cards:
- Response Time: **15m**
- Root Cause: **VPC NAT IP Exhaustion**
- Resolution: **Elastic IP Rotation & NAT Gateway Scaling**

These numbers should be visible and readable at this phase. They make the abstract (incident
response) concrete (here is what the outcome actually looked like).

---

## Priority 4 — Narrative Phase Text Overlays

The `IntroOverlay` pattern (a text card that fades in at a scroll threshold and fades out at
the next) is the right mechanism. Extend it to add plain-English context at each major transition.

Create a `NarrativeOverlay` component that accepts a message, a fade-in threshold, and a
fade-out threshold, and renders in the same style as the existing overlay.

### Copy for each phase

**0.05 — Alert fires:**
> *"Something just triggered. One analyst, one anomaly, thousands of events per hour. Their job is catching the one that isn't noise."*

**0.12 — L1 zoom:**
> *"L1 analysts are the first line of detection. They triage alerts in real time — flag it, dismiss it, or escalate it."*

**0.30 — Escalation:**
> *"This one gets escalated. L1 confirmed it's real. L2 needs to find out how far in the attacker got."*

**0.38 — L2 zoom:**
> *"L2 analysts don't look at events in isolation. They look at patterns — what three unrelated events mean when they happen together."*

**0.57 — L3 zoom:**
> *"L3 analysts go deeper. They pull disk images, extract malware, and identify exactly what the attacker left behind."*

**0.78 — Stakeholders:**
> *"A confirmed incident doesn't stay in the SOC. Legal needs to know. Executives need to know. The organisation moves as one."*

**0.85 — Post-mortem:**
> *"15 minutes from first alert to containment. The incident is over. Now the team figures out how to prevent the next one."*

---

## Priority 5 — Replace the Progress Bar with an Incident Timeline

**File:** `components/scrollytelling/ScrollytellingLayout.tsx` (bottom bar)

The current `Scroll Progress: 47%` bar is a developer tool, not a user experience. Replace it
with a named incident lifecycle bar that teaches the IR process while guiding the user through the scroll.

```
◉ Detection  →  ◎ Triage  →  ○ Analysis  →  ○ Containment  →  ○ Recovery
```

Each node activates (fills, glows) as the user scrolls past the corresponding phase threshold.
This reinforces the incident response lifecycle — a core concept in security operations — without
requiring the user to read about it separately.

### Phase-to-threshold mapping

| Phase label | Activates at scroll % |
|---|---|
| Detection | 0.08 |
| Triage | 0.30 |
| Analysis | 0.57 |
| Containment | 0.78 |
| Recovery | 0.85 |

---

## Priority 6 — Career Path Page (`/roadmaps/soc/career-path`)

After the story, the career path is the payoff. The transition from `CareerRoadmap.tsx` should
feel earned, not abrupt. Update the card copy before routing:

> *"15 minutes. That's how long it took this team to detect, triage, escalate, and contain a ransomware attempt. This is what a career in the SOC looks like."*

The career path page itself should carry forward the same aesthetic and tell the next part of
the story: **how do you get here?**

### Structure for the career path page

**1. Role Ladder — with lived reality, not just titles**

For each tier (L1 → L2 → L3 → SOC Lead → SOC Manager), show:
- What you actually do day-to-day
- What tools you use (Splunk, CrowdStrike, Wireshark, etc.)
- What decisions you make
- What you are accountable for
- Approximate time-to-role from entry and salary range (anchors abstract paths for people evaluating a career pivot)

**2. Skill Tree with Certifications Mapped to Roles**

Show certifications not as a checklist but as milestones on a path:
- Entry: CompTIA Security+, Google Cybersecurity Certificate
- L1 → L2: CompTIA CySA+, BTL1 (Blue Team Labs)
- L2 → L3: GCIH, GCFE, GREM
- Leadership: CISM, CISSP

Map each cert visually to the role level it enables. Show the path, not just the destination.

**3. Day-in-the-Life Vignettes**

Short first-person narrative snippets for each role in the same tone as the scrollytelling
experience. Not "L1 analysts perform alert triage" but:

> *"07:45. You open the SIEM dashboard. 4,200 alerts overnight. Your job is to find the three that matter."*

These give career-explorers a visceral sense of the role before they commit to a learning path.

**4. Next Actions — Concrete, Not Vague**

End with specific, actionable next steps rather than "explore more":
- Free labs to try today (TryHackMe SOC Level 1 path, LetsDefend, Cyber Defenders)
- What to build in a portfolio as a beginner
- Where to find entry-level SOC roles

---

## Priority 7 — Jargon Tooltips (Polish Layer)

Terms like SIEM, IOC, SOAR, TTPs, lateral movement, C2, and EDR appear throughout the
experience in tickers, HUDs, and portal screens. For a tech-curious but non-cyber person
these are blockers that create anxiety rather than excitement.

Add simple hover/tap tooltip popups with one-sentence plain-English definitions.
They should feel native to the aesthetic — monospace, dark background, cyan border —
not like a Wikipedia footnote.

### Priority glossary terms

| Term | Plain English |
|---|---|
| SIEM | Software that collects logs from every system and lets analysts search and alert on patterns |
| IOC | A specific clue that a system has been compromised — an IP address, file hash, or domain |
| SOAR | Automation that runs standard response steps so analysts focus on decisions, not manual tasks |
| EDR | Security software on endpoints that records everything happening and can kill malicious processes |
| C2 | Command and Control — the attacker's server that the malware "phones home" to for instructions |
| Lateral movement | When an attacker who got into one system moves sideways to access others on the same network |
| TTPs | Tactics, Techniques, and Procedures — the attacker's playbook, how they operate |
| Triage | Quickly assessing an alert to decide: real threat, false positive, or needs escalation |

---

## Remaining Disciplines (Home Page — "SOON" cards)

The home page already has cards for Red Team, AppSec, Cloud Security, and GRC. Each one
will eventually need its own scrollytelling pathway with its own story.

When the time comes, the same pattern applies: pick a concrete scenario, follow it start to
finish, zoom into the real work, end with a career path.

Suggested scenarios for future disciplines:

| Discipline | Story scenario |
|---|---|
| Red Team | A penetration test against a corporate target — from scoping to report |
| AppSec | A code review that catches an injection vulnerability before it ships |
| Cloud Security | A misconfigured S3 bucket discovered before an attacker does |
| GRC | A compliance audit that uncovers a policy gap and drives a policy change |

---

## Implementation Order Summary

1. **MonitorPortal content** — L1 terminal, L2 correlation, L3 forensics. Biggest visual payoff for the least new code.
2. **Wire StakeholderBroadcast + BriefingOverlay** — fully built, one import and mount away.
3. **Wire LessonsLearnedView + ExecutivePOV** — same. Completes the story arc.
4. **Narrative phase overlays** — the primary learning mechanism. New `NarrativeOverlay` component, ~6 instances.
5. **Incident timeline progress bar** — replace the raw scroll % bar. Small change, high user impact.
6. **Career path page** — the story's payoff. Role ladder, skill tree, vignettes, next actions.
7. **Jargon tooltips** — polish layer. Add after core experience is solid.
