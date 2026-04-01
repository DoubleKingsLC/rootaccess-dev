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
      { label: "Hacking AI is TOO EASY (this should be illegal)", link: "https://youtu.be/Qvx2sVgQ-u0", provider: "youtube" },
      { label: "TryHackMe · Pre-Security learning path", link: "https://tryhackme.com/path/outline/presecurity", provider: "tryhackme" },
      { label: "Learn Virtual Machines RIGHT NOW!! (Kali, Ubuntu, Windows)", link: "https://youtu.be/wX75Z-4MEoM", provider: "youtube" },
      { label: "40 Windows Commands you NEED to know", link: "https://youtu.be/Jfvg3CS1X3A", provider: "youtube" }
    ],
  },
  {
    num: "01",
    label: "AI Red Team Operator",
    subtitle: "Adversarial Prompting & Model Exploitation",
    color: "#f97316",
    glow: "rgba(249,115,22,0.2)",
    border: "rgba(249,115,22,0.25)",
    quote: "In 2026, we don't just 'chat' with the AI. We probe its architecture, intercept its traffic, and automate its failure.",
    time: "6–18 months",
    salary: "£30K–£50K",
    tools: [
      "Microsoft PyRIT",
      "Garak",
      "Promptmap",
      "Promptfoo",
      "Burp Suite"
    ],
    skills: [
      "Direct Prompt Injection — DAN, Persona-play",
      "Indirect Injection — webpages, uploaded PDFs",
      "System Prompt Extraction — leakage techniques",
      "Filter Evasion — Base64, Rot13, multi-lingual",
      "Agentic Loop Hijacking — Tool Use exploitation"
    ],
    certs: [
      { label: "TCM · Practical AI Pentest Associate (PAPA)", link: "https://certifications.tcm-sec.com/papa/", provider: "tcm" },
      { label: "OffSec · OSAI (OffSec AI Red Teamer)", link: "https://www.offsec.com/courses/ai-300/", provider: "offsec" }
    ],
    labs: [
      { label: "The AI Attack Blueprint (Interview with Jason Haddix)", link: "https://youtu.be/2Z-9EOyb6HE", provider: "youtube" },
      { label: "Gandalf by Lakera", link: "https://gandalf.lakera.ai/gandalf-the-white", provider: "lakera" },
      { label: "Prompt Airlines (by Wiz.io)", link: "https://promptairlines.com/", provider: "wiz" },
      { label: "OWASP Top 10 for LLM Applications", link: "https://owasp.org/www-project-top-10-for-large-language-model-applications/", provider: "owasp" }
    ]
  },
  {
    num: "02",
    label: "AI Security Researcher",
    subtitle: "Deep Exploitation & Adversarial ML",
    color: "#fb7185",
    glow: "rgba(251,113,133,0.2)",
    border: "rgba(251,113,133,0.25)",
    quote:
      "You're not running known exploits. You're discovering techniques the field hasn't documented yet.",
    time: "4–7 years",
    salary: "£75K–£110K",
    tools: [
      "ART (Adversarial Robustness Toolbox)",
      "HiddenLayer Model Scanner",
      "Counterfit",
      "Impacket Suite"
    ],
    skills: [
      "RAG Hijacking & Vector DB Poisoning",
      "Model Extraction — internal weights/logic",
      "Adversarial Perturbations — FGSM, PGD attacks",
      "Training Data Poisoning — backdoors, triggers",
      "Supply Chain Security — auditing model hubs"
    ],
    certs: [
      { label: "GIAC Offensive AI Analyst (GOAA)", link: "https://www.giac.org/certifications/offensive-ai-analyst-goaa/", provider: "giac" },
      { label: "OSCP+ (OffSec Certified Professional Plus)", link: "https://www.offsec.com/products/oscp-plus/", provider: "offsec" }
    ],
    labs: [
      { label: "AI Village (DEF CON / Black Hat)", link: "https://aivillage.org/", provider: "defcon" },
      { label: "OffSec Proving Grounds (PG) Practice", link: "https://www.offsec.com/ads/pg-practice/", provider: "offsec" },
      { label: "RobustBench", link: "https://robustbench.github.io/", provider: "github" },
      { label: "Hugging Face Security", link: "https://huggingface.co/docs/hub/security", provider: "huggingface" }
    ],
  },
  {
    num: "03",
    label: "Principal AI Security Architect",
    subtitle: "Enterprise Defense, Governance & Leadership",
    color: "#a78bfa",
    glow: "rgba(167,139,250,0.2)",
    border: "rgba(167,139,250,0.25)",
    quote:
      "You've been the attacker. Now you build the systems that make the next attacker's job impossible.",
    time: "7+ years",
    salary: "£110K–£160K+",
    tools: [
      "Lakera Guard",
      "Azure AI Content Safety",
      "AWS Bedrock Guardrails",
      "Protect AI (Guardian)"
    ],
    skills: [
      "Defense-in-Depth Architecture — multi-layered pipelines",
      "AI Governance & Compliance — EU AI Act, NIST AI RMF",
      "Adversarial Tabletop Exercises — simulation leadership",
      "Executive Risk Communication — metrics & translation",
      "AI Red Team Management — automated portfolio testing"
    ],
    certs: [
      { label: "CISSP — Certified Information Systems Security Professional", link: "https://www.isc2.org/certifications/cissp", provider: "isc2" },
      { label: "CISM — Certified Information Security Manager", link: "https://www.isaca.org/credentialing/cism", provider: "isaca" }
    ],
    labs: [
      { label: "NIST AI RMF Playbook", link: "https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf", provider: "nist" },
      { label: "EU AI Act 2026 Compliance Guide", link: "https://artificialintelligenceact.eu/", provider: "eu" },
      { label: "eSecurity Planet: AI Threats Playbook", link: "https://www.esecurityplanet.com/", provider: "esecurityplanet" },
      { label: "Lakera AI Security Hub", link: "https://www.lakera.ai/blog", provider: "lakera" }
    ],
  },
];

export const ACTIONS: Action[] = [
  {
    icon: "🎯",
    title: "Break Your First Model",
    color: "#ef4444",
    border: "rgba(239,68,68,0.25)",
    glow: "rgba(239,68,68,0.08)",
    items: [
      { label: "Gandalf by Lakera — Beat all 8 levels", link: "https://gandalf.lakera.ai/" },
      { label: "HackAPrompt — Injection challenges", link: "https://www.hackaprompt.com/" },
      { label: "Prompt Airlines CTF — Indirect injection", link: "https://wiz.io/blog/prompt-airlines-ctf-writeup" },
    ],
  },
  {
    icon: "📁",
    title: "Build a Portfolio",
    color: "#f97316",
    border: "rgba(249,115,22,0.25)",
    glow: "rgba(249,115,22,0.08)",
    items: [
      "Write injection technique writeups with examples",
      "Publish Garak vulnerability scans on GitHub",
      "Contribute to the OWASP LLM Top 10 project",
    ],
  },
];
