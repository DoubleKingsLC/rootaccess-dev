import { Level, Action } from "./types";

export const LEVELS: Level[] = [
  {
    num: "00",
    label: "Entry Point",
    subtitle: "No Experience Required",
    color: "#94a3b8",
    glow: "rgba(148,163,184,0.2)",
    border: "rgba(148,163,184,0.25)",
    quote:
      "You don't need a degree. You need curiosity and the discipline to build it. Everyone starts here.",
    time: "0–6 months",
    salary: "£25K–£35K",
    tools: ["VirtualBox", "Linux", "Terminal / PowerShell", "Python"],
    skills: [
      "Networking — TCP/IP, DNS, DHCP, subnetting",
      "OS fundamentals — Windows & Linux",
      "Security concepts — CIA triad, common threats",
      "Scripting basics — Python or Bash",
    ],
    certs: [
      { label: "Google Cybersecurity Certificate", link: "https://www.coursera.org/professional-certificates/google-cybersecurity", provider: "google" },
      { label: "TCM · Practical Security Fundamentals", link: "https://academy.tcm-sec.com/p/practical-security-fundamentals", provider: "tcm" },
      { label: "THM · Security+ Pre-Security (SEC1)", link: "https://tryhackme.com/certification/pre-security", provider: "tryhackme" },
    ],
    labs: [
      { label: "TryHackMe · Pre-Security learning path", link: "https://tryhackme.com/path/outline/presecurity", provider: "tryhackme" },
      { label: "Learn Virtual Machines RIGHT NOW!! (Kali, Ubuntu, Windows)", link: "https://youtu.be/wX75Z-4MEoM", provider: "youtube" },
      { label: "40 Windows Commands you NEED to know", link: "https://youtu.be/Jfvg3CS1X3A", provider: "youtube" },
    ],
  },
  {
    num: "01",
    label: "L1 Triage Analyst",
    subtitle: "First Line of Detection",
    color: "#22d3ee",
    glow: "rgba(34,211,238,0.2)",
    border: "rgba(34,211,238,0.25)",
    quote:
      "07:45. You open the SIEM dashboard. 4,200 alerts overnight. Your job is to find the three that matter.",
    time: "6–18 months",
    salary: "£30K–£45K",
    tools: ["Splunk / ELK / Wazuh", "Wireshark / tcpdump", "VirusTotal", "grep / awk"],
    skills: [
      "SIEM log analysis and search query writing",
      "Alert triage, classification, and prioritisation",
      "IOC lookup and contextual enrichment",
      "Incident ticketing and escalation procedures",
    ],
    certs: [
      { label: "Practical SOC Analyst (PSAA)", link: "https://certifications.tcm-sec.com/psaa/", provider: "tcm" },
      { label: "BTL1 — Blue Team Level 1", link: "https://www.securityblue.team/certifications/blue-team-level-1", provider: "blueteam" },
      { label: "CompTIA Security+", link: "https://www.comptia.org/en/certifications/security/", provider: "comptia" },
    ],
    labs: [
      { label: "Cyberdefenders CyberRange - Network Forensics, Threat Hunting", link: "https://cyberdefenders.org/blue-team-labs/", provider: "cyberdefenders" },
      { label: "HTB Sherlocks - SOC", link: "https://app.hackthebox.com/sherlocks", provider: "htb" },
      { label: "Wazuh - you need this FREE CyberSecurity tool", link: "https://youtu.be/CaG2GI1kn0", provider: "youtube" },
      { label: "Splunk - Getting started guide", link: "https://youtu.be/-SXddlIZkUs", provider: "youtube" },
    ],
  },
  {
    num: "02",
    label: "L2 Advanced Analyst",
    subtitle: "Pattern Recognition & Correlation",
    color: "#8b5cf6",
    glow: "rgba(139,92,246,0.2)",
    border: "rgba(139,92,246,0.25)",
    quote:
      "Three events. Each harmless alone. But you see them together — and you see the attacker's hand.",
    time: "2–4 years",
    salary: "£45K–£65K",
    tools: ["CyberChef", "Velociraptor", "MISP", "TheHive", "MITRE ATT&CK"],
    skills: [
      "Threat correlation and attack pattern mapping",
      "Malware triage — static and dynamic analysis",
      "MITRE ATT&CK framework and TTP identification",
      "SOAR automation and playbook development",
    ],
    certs: [
      { label: "CCDL2 — Threat Hunting & DFIR Certification", link: "https://cyberdefenders.org/certifications/certified-cyberdefender-level2/", provider: "cyberdefenders" },
      { label: "HTB CDSA — Certified Defensive Security Analyst", link: "https://academy.hackthebox.com/preview/certifications/htb-certified-defensive-security-analyst", provider: "htb" },
    ],
    labs: [
      { label: "Cyberdefenders CyberRange - Detection Engineering, Threat Hunting", link: "https://cyberdefenders.org/blue-team-labs/", provider: "cyberdefenders" },
      { label: "HTB Sherlocks - SOC/DFIR", link: "https://app.hackthebox.com/sherlocks", provider: "htb" },
      { label: "Detection Engineering with Wazuh (John Hammond)", link: "https://youtu.be/nSOqU1iX5oQ", provider: "youtube" },
    ],
  },
  {
    num: "03",
    label: "L3 Forensic Analyst",
    subtitle: "Deep Forensics & Incident Lead",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
    border: "rgba(245,158,11,0.25)",
    quote:
      "You pull the disk. You find the malware. You trace it to its first byte. This is where the story ends.",
    time: "4–7 years",
    salary: "£65K–£90K",
    tools: ["Volatility", "KAPE", "EZTools", "x64dbg", "FTK Imager"],
    skills: [
      "Disk and memory forensics — full acquisition",
      "Malware reverse engineering and binary analysis",
      "C2 infrastructure profiling and attribution",
      "APT tracking and threat intelligence production",
    ],
    certs: [
      { label: "BTL2 — Blue Team Level 2", link: "https://www.securityblue.team/certifications/blue-team-level-2", provider: "blueteam" },
      { label: "GCFA — GIAC Certified Forensic Analyst", link: "https://www.giac.org/certifications/certified-forensic-analyst-gcfa/", provider: "giac" },
      { label: "OSCP+", link: "https://www.offsec.com/courses/pen-200/", provider: "offsec" },
    ],
    labs: [
      { label: "Cyberdefenders CyberRange - Endpoint Forensics, Threat Hunting", link: "https://cyberdefenders.org/blue-team-labs/", provider: "cyberdefenders" },
      { label: "HTB Sherlocks - SOC/DFIR", link: "https://app.hackthebox.com/sherlocks", provider: "htb" },
      { label: "Antisyphon - SOC Core Skills", link: "https://www.antisyphontraining.com/product/soc-core-skills-with-john-strand/", provider: "antisyphon" },
    ],
  },
  {
    num: "04",
    label: "SOC Lead",
    subtitle: "Operations Command",
    color: "#34d399",
    glow: "rgba(52,211,153,0.2)",
    border: "rgba(52,211,153,0.25)",
    quote:
      "The team responds as fast as the system you built for them. Your job: make the next incident take 10 minutes, not 15.",
    time: "7+ years",
    salary: "£90K–£130K+",
    tools: ["Palo Alto XSOAR", "PowerBI", "ServiceNow SecOps", "Confluence / Jira"],
    skills: [
      "SOC architecture design and tool strategy",
      "MTTD / MTTR KPI definition and reporting",
      "Analyst mentoring and career development",
      "Executive stakeholder communication",
    ],
    certs: [
      { label: "CISSP — Certified Information Systems Security Professional", link: "https://www.isc2.org/certifications/cissp", provider: "isc2" },
      { label: "CSOM — Certified SOC Manager", link: "https://www.securityblue.team/certifications/certified-security-operations-manager", provider: "blueteam" },
      { label: "CISM — Certified Information Security Manager", link: "https://www.isaca.org/credentialing/cism", provider: "isaca" },
    ],
    labs: [
      { label: "Antisyphon - SOC Core Skills", link: "https://www.antisyphontraining.com/product/soc-core-skills-with-john-strand/", provider: "antisyphon" },
      { label: "MITRE ATT&CK for SOC Managers", link: "https://attack.mitre.org/resources/training/cti/", provider: "mitre" },
      { label: "NIST CSWP 29 (SOC Model)", link: "https://csrc.nist.gov/pubs/cswp/29/final", provider: "nist" },
    ],
  },
];

export const ACTIONS: Action[] = [
  {
    icon: "🧪",
    title: "Start in a Lab Today",
    color: "#22d3ee",
    border: "rgba(34,211,238,0.25)",
    glow: "rgba(34,211,238,0.08)",
    items: [
      { label: "TryHackMe SOC Level 1 path", link: "https://tryhackme.com/path/outline/soclevel1" },
      { label: "LetsDefend.io - SOC environment", link: "https://letsdefend.io/" },
      { label: "CyberDefenders - blue team labs", link: "https://cyberdefenders.org/blue-team-labs/" },
      { label: "HTB Sherlocks - SOC/DFIR", link: "https://app.hackthebox.com/sherlocks" },
      { label: "BTLO - Blue Team Labs Online", link: "https://blueteamlabs.online/" },
    ],
  },
  {
    icon: "📁",
    title: "Build a Portfolio",
    color: "#8b5cf6",
    border: "rgba(139,92,246,0.25)",
    glow: "rgba(139,92,246,0.08)",
    items: [
      "Write lab walkthrough reports in PDF format",
      "Document your homelab with screenshots",
      "GitHub: scripts, tools, and detection rules",
    ],
  },
];
