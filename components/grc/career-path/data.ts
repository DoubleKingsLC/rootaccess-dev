import type { Action, Level } from "./types";

export const PROVIDER_DOMAINS: Record<string, string> = {
  tryhackme:        "tryhackme.com",
  google:           "google.com",
  tcm:              "tcm-sec.com",
  ine:              "ine.com",
  comptia:          "comptia.org",
  "ec-council":     "eccouncil.org",
  offsec:           "offsec.com",
  portswigger:      "portswigger.net",
  isc2:             "isc2.org",
  giac:             "giac.org",
  isaca:            "isaca.org",
  altered:          "alteredsecurity.com",
  hackerone:        "hackerone.com",
  htb:              "hackthebox.com",
  bugcrowd:         "bugcrowd.com",
  owasp:            "owasp.org",
  youtube:          "www.youtube.com",
  sans:             "sans.org",
  crest:            "crest-approved.org",
  pentesteracademy: "pentesteracademy.com",
  cisco:            "cisco.com",
  lpi:              "lpi.org",
  zeropointsec:     "training.zeropointsecurity.co.uk",
  specterops:       "specterops.io",
  linuxjourney:     "linuxjourney.com",
  netacad:          "netacad.com",
  vulnhub:          "vulnhub.com",
  ired:             "ired.team",
  redteamguide:     "redteam.guide",
  ost:              "ost2.fyi",
  ippsec:           "ippsec.rocks",
  github:           "github.com",
  blackhat:         "blackhat.com",
  pentesterland:    "pentester.land",
  sysreptor:        "sysreptor.com",
  jeremysitlab:     "jeremysitlab.com",
  pentesterlab:     "pentesterlab.com",
  vanta:            "vanta.com",
  drata:            "drata.com",
  iapp:             "iapp.org",
  rootaccess:       "rootaccess.tech",
  iso:              "iso.org",
  grcmastery:       "grcmastery.com",
  nist:             "nist.gov",
  servicenow:       "servicenow.com",
  reddit:           "reddit.com",
  eramba:           "eramba.org",
  fairinstitute:    "fairinstitute.org",
};

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
    ],
    labs: [
      { label: "TryHackMe · Pre-Security learning path", link: "https://tryhackme.com/path/outline/presecurity", provider: "tryhackme" },
      { label: "Learn Virtual Machines RIGHT NOW!! (Kali, Ubuntu, Windows)", link: "https://youtu.be/wX75Z-4MEoM", provider: "youtube" },
      { label: "40 Windows Commands you NEED to know", link: "https://youtu.be/Jfvg3CS1X3A", provider: "youtube" },
    ],
  },
  {
    num: "01",
    label: "Junior GRC Analyst",
    subtitle: "Evidence & Documentation",
    color: "#14b8a6",
    glow: "rgba(20,184,166,0.2)",
    border: "rgba(20,184,166,0.25)",
    quote: "Your job isn't to know everything. It's to document everything. Precision and consistency are your only two metrics right now.",
    time: "1–2 years",
    tools: ["Excel", "Vanta", "eramba"],
    skills: [
      "Evidence Collection",
      "Policy Writing",
      "Framework Literacy"
    ],
    certs: [
      { label: "GRC Mastery", link: "https://www.grcmastery.com/", provider: "grcmastery" },
      { label: "CompTIA Security+", link: "https://www.comptia.org/certifications/security", provider: "comptia" }
    ],
    labs: [
      { label: "NIST CSF 2.0 Official Publication", link: "https://doi.org/10.6028/NIST.CSWP.29", provider: "nist" },
      { label: "eramba Community Edition (Local GRC)", link: "https://www.eramba.org/community-edition", provider: "eramba" },
      { label: "ServiceNow Developer Program", link: "https://developer.servicenow.com/", provider: "servicenow" },
      { label: "Simply Cyber on YouTube", link: "https://www.youtube.com/@SimplyCyber", provider: "youtube" }
    ],
  },
  {
    num: "02",
    label: "GRC Analyst",
    subtitle: "Assessment & Ownership",
    color: "#3b82f6",
    glow: "rgba(59,130,246,0.2)",
    border: "rgba(59,130,246,0.25)",
    quote: "You stop being the person who collects evidence and start being the person who knows what's missing before the auditor asks.",
    time: "2–4 years",
    tools: ["Vanta", "OneTrust", "ServiceNow IRM"],
    skills: [
      "Gap Analysis",
      "Vendor Risk Management",
      "Risk Lifecycle Management"
    ],
    certs: [
      { label: "CISA — Certified Information Systems Auditor", link: "https://www.isaca.org/credentialing/cisa", provider: "isaca" },
      { label: "ISO 27001 Lead Implementer", link: "https://www.iso.org/standard/27001", provider: "iso" }
    ],
    labs: [
      { label: "ISACA CISA Review Manual", link: "https://www.isaca.org/credentialing/cisa/prepare-for-the-cisa-exam", provider: "isaca" },
      { label: "NIST RMF (SP 800-37) Full Document", link: "https://doi.org/10.6028/NIST.SP.800-37r2", provider: "nist" },
      { label: "Vanta / Drata Automated GRC Trials", link: "https://www.vanta.com/", provider: "vanta" },
      { label: "r/cybersecurity GRC Practitioner Threads", link: "https://www.reddit.com/r/cybersecurity/", provider: "reddit" }
    ],
  },
  {
    num: "03",
    label: "GRC Lead",
    subtitle: "Program Design & Strategy",
    color: "#f59e0b",
    glow: "rgba(245,158,11,0.2)",
    border: "rgba(245,158,11,0.25)",
    quote: "At this level you're not doing GRC. You're building the program other people execute. Your output is a security posture the board can defend to a regulator.",
    time: "5+ years",
    tools: ["ServiceNow IRM", "Power BI", "FAIR Model"],
    skills: [
      "GRC Program Design",
      "Quantitative Risk (FAIR)",
      "Executive & Board Reporting"
    ],
    certs: [
      { label: "CISSP — Certified Info Systems Security Professional", link: "https://www.isc2.org/Certifications/CISSP", provider: "isc2" },
      { label: "CRISC — Certified in Risk and IS Control", link: "https://www.isaca.org/credentialing/crisc", provider: "isaca" }
    ],
    labs: [
      { label: "FAIR Institute (Quantitative Risk)", link: "https://www.fairinstitute.org/", provider: "fairinstitute" },
      { label: "ISACA Practitioner Journal", link: "https://www.isaca.org/resources/isaca-journal", provider: "isaca" },
      { label: "The CISO Playbook (Board Comms)", link: "https://www.vanta.com/resources/ciso-playbook", provider: "vanta" },
      { label: "IAPP Privacy Governance (GDPR/CCPA)", link: "https://iapp.org/certify/cipp/", provider: "iapp" }
    ],
  },
];

export const ACTIONS: Action[] = [
  {
    icon: "🤝",
    title: "Start an Audit",
    color: "#14b8a6",
    border: "rgba(20,184,166,0.25)",
    glow: "rgba(20,184,166,0.08)",
    items: [
      { label: "Map one control in NIST CSF and start tracking", link: "https://www.nist.gov/cyberframework" },
      { label: "Draft a policy using SANS free templates", link: "https://www.sans.org/information-security-policy/" },
      { label: "Run eramba locally and log one 'High' risk", link: "https://www.eramba.org/community-edition" }
    ],
  },
  {
    icon: "🏗️",
    title: "Build the Program",
    color: "#f59e0b",
    border: "rgba(245,158,11,0.25)",
    glow: "rgba(245,158,11,0.08)",
    items: [
      { label: "Join the FAIR Institute for Quantitative Risk", link: "https://www.fairinstitute.org/" },
      { label: "Review a public SOC 2 report guide", link: "https://www.vanta.com/resources/soc-2-compliance-checklist" },
      { label: "Set up a free ServiceNow developer instance", link: "https://developer.servicenow.com/" }
    ],
  },
];
