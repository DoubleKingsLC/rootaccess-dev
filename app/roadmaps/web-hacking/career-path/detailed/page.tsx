import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web Hacking Career Path — Deep Dive | RootAccess.tech",
  description:
    "A long-form breakdown of every certification, skill, and resource in the web hacking career path — from total beginner to pentest lead.",
  openGraph: {
    title: "Web Hacking Career Path — Deep Dive | RootAccess.tech",
    description:
      "Why we recommend each certification, what it actually teaches, and how to sequence your learning at every stage of a web security career.",
    url: "https://rootaccess.tech/roadmaps/web-hacking/career-path/detailed",
  },
};

// ── Shared primitives ─────────────────────────────────────────────────────────

const LEVELS = [
  { num: "00", label: "Entry Point",        color: "#94a3b8", time: "0–6 months",  salary: "£25K–£35K" },
  { num: "01", label: "Junior Pentester",   color: "#f43f5e", time: "0–2 years",   salary: "£35K–£55K" },
  { num: "02", label: "Security Consultant",color: "#fb923c", time: "2–5 years",   salary: "£55K–£80K" },
  { num: "03", label: "Senior Pentester",   color: "#a78bfa", time: "5–8 years",   salary: "£80K–£110K" },
  { num: "04", label: "Pentest Lead",       color: "#34d399", time: "8+ years",    salary: "£110K–£160K+" },
] as const;

function NavDot({ num, color, label }: { num: string; color: string; label: string }) {
  return (
    <a
      href={`#level-${num}`}
      className="flex items-center gap-3 group"
      style={{ textDecoration: "none" }}
    >
      <span
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center font-mono text-[10px] font-bold border transition-all duration-200"
        style={{ borderColor: `${color}55`, color, background: `${color}12` }}
      >
        {num}
      </span>
      <span
        className="font-mono text-[11px] uppercase tracking-widest hidden lg:block transition-colors duration-200"
        style={{ color: "rgba(148,163,184,0.5)" }}
      >
        {label}
      </span>
    </a>
  );
}

interface CertCardProps {
  name: string;
  provider: string;
  href: string;
  difficulty: string;
  duration: string;
  cost: string;
  accentColor: string;
  what: string;
  why: string;
  isTop?: boolean;
}

function CertCard({ name, provider, href, difficulty, duration, cost, accentColor, what, why, isTop }: CertCardProps) {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "rgba(15,20,30,0.7)",
        border: `1px solid ${accentColor}25`,
        boxShadow: isTop ? `0 0 24px ${accentColor}0f` : "none",
      }}
    >
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-5 py-4"
        style={{
          background: `${accentColor}0d`,
          borderBottom: `1px solid ${accentColor}20`,
        }}
      >
        <div>
          {isTop && (
            <span
              className="inline-block font-mono text-[8px] uppercase tracking-[0.3em] px-2 py-0.5 rounded mb-2"
              style={{ background: `${accentColor}22`, color: accentColor, border: `1px solid ${accentColor}44` }}
            >
              ★ Recommended
            </span>
          )}
          <div className="flex items-center gap-2.5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://www.google.com/s2/favicons?domain=${new URL(href).hostname}&sz=64`}
              alt=""
              width={22}
              height={22}
              className="rounded-sm flex-shrink-0"
              style={{ objectFit: "contain" }}
            />
            <h4 className="font-mono text-sm font-bold text-white leading-tight">{name}</h4>
          </div>
          <p className="font-mono text-[10px] mt-1" style={{ color: `${accentColor}99` }}>{provider}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[10px] font-mono flex-shrink-0">
          <span className="px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(148,163,184,0.12)" }}>
            {difficulty}
          </span>
          <span className="px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(148,163,184,0.12)" }}>
            {duration}
          </span>
          <span className="px-2.5 py-1 rounded-full" style={{ background: "rgba(255,255,255,0.05)", color: "rgba(148,163,184,0.7)", border: "1px solid rgba(148,163,184,0.12)" }}>
            {cost}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-5 py-4 space-y-3">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1.5" style={{ color: `${accentColor}77` }}>
            What it teaches
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.8)" }}>{what}</p>
        </div>
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.3em] mb-1.5" style={{ color: `${accentColor}77` }}>
            Why at this level
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "rgba(203,213,225,0.8)" }}>{why}</p>
        </div>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors duration-150"
          style={{ color: `${accentColor}bb`, textDecoration: "none" }}
        >
          Official page
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}

function SectionHeader({ num, label, color, time, salary, subtitle }: {
  num: string; label: string; color: string; time: string; salary: string; subtitle: string;
}) {
  return (
    <div className="mb-10">
      <div className="flex flex-wrap items-baseline gap-4 mb-3">
        <span
          className="font-mono text-[10px] uppercase tracking-[0.35em] px-2 py-1 rounded"
          style={{ color, background: `${color}14`, border: `1px solid ${color}30` }}
        >
          Level {num}
        </span>
        <span className="font-mono text-[10px]" style={{ color: "rgba(148,163,184,0.4)" }}>
          {time} · {salary}
        </span>
      </div>
      <h2
        className="text-4xl font-bold text-white mb-2"
        style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.01em" }}
      >
        {label}
      </h2>
      <p className="font-mono text-sm" style={{ color: `${color}bb` }}>{subtitle}</p>
      <div className="mt-5 h-px" style={{ background: `linear-gradient(to right, ${color}30, transparent)` }} />
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function WebHackingDetailedPage() {
  return (
    <div
      className="min-h-screen"
      style={{ background: "#090d14", color: "rgba(226,232,240,0.9)" }}
    >
      {/* ── Top nav ── */}
      <div
        className="sticky top-0 z-30 flex items-center gap-3 px-5 py-3"
        style={{
          background: "rgba(9,13,20,0.95)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          backdropFilter: "blur(12px)",
        }}
      >
        <Link
          href="/roadmaps/web-hacking/career-path"
          className="font-mono text-[10px] uppercase tracking-widest flex items-center gap-1.5 transition-colors duration-150"
          style={{ color: "rgba(148,163,184,0.45)", textDecoration: "none" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M7 1L3 5L7 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Career Path
        </Link>
        <span style={{ color: "rgba(148,163,184,0.2)", fontSize: "10px" }}>/</span>
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: "rgba(148,163,184,0.35)" }}>
          Deep Dive
        </span>
        <div className="flex-1" />
        <div className="hidden sm:flex items-center gap-4">
          {LEVELS.map((l) => (
            <NavDot key={l.num} num={l.num} color={l.color} label={l.label} />
          ))}
        </div>
      </div>

      {/* ── Hero ── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-16 pb-12">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4" style={{ color: "rgba(244,63,94,0.6)" }}>
          Web Hacking · Full Breakdown
        </p>
        <h1
          className="text-5xl sm:text-6xl font-bold text-white mb-6 leading-tight"
          style={{ fontFamily: "var(--font-heading, system-ui)", letterSpacing: "-0.02em" }}
        >
          The Web Hacking<br />Career Path, Explained
        </h1>
        <p className="text-lg leading-relaxed max-w-2xl" style={{ color: "rgba(148,163,184,0.75)" }}>
          The career path page gives you the fast picture — where to go and what to get. This page explains the
          thinking behind every recommendation: why each certification sits where it does, what it actually
          covers, how long it takes, and how each one compounds on the last. Read it once before you start and
          return to each section as you reach it.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {LEVELS.map((l) => (
            <a
              key={l.num}
              href={`#level-${l.num}`}
              className="flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-widest transition-all duration-200"
              style={{
                background: `${l.color}0f`,
                border: `1px solid ${l.color}28`,
                color: `${l.color}cc`,
                textDecoration: "none",
              }}
            >
              <span>{l.num}</span>
              <span className="hidden sm:inline">{l.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          LEVEL 00 — ENTRY POINT
      ══════════════════════════════════════════════════════════════════════════ */}
      <section id="level-00" className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <SectionHeader
          num="00"
          label="Entry Point"
          subtitle="No experience required — but curiosity is mandatory"
          color="#94a3b8"
          time="0–6 months"
          salary="£25K–£35K"
        />

        <div className="prose-like space-y-5 text-base leading-relaxed mb-12" style={{ color: "rgba(203,213,225,0.78)" }}>
          <p>
            Most people waste their first six months. They start watching YouTube videos, jump between random
            tutorials, and buy three courses they never finish. The Entry Point phase is about preventing that.
            Your goal here is not to hack anything — it is to build the mental model that will let you
            understand <em style={{ color: "rgba(226,232,240,0.9)", fontStyle: "normal", fontWeight: 500 }}>why</em> every attack works.
          </p>
          <p>
            That means understanding TCP/IP well enough to read a packet capture. It means being comfortable
            at a Linux terminal before you open Burp Suite. It means knowing what DNS actually does so that
            DNS-based attacks make logical sense later rather than being magic you memorise. None of this is
            glamorous, but every professional who looks effortless at Level 02 and beyond built this foundation
            deliberately at Level 00.
          </p>
          <p>
            The certifications here are not prestigious in themselves — and they are not meant to be. They are
            structured learning frameworks that ensure you cover ground you might otherwise skip. Finish this
            level in three to six months. Do not linger here once you have the fundamentals.
          </p>
        </div>

        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(148,163,184,0.4)" }}>
          Certifications
        </h3>
        <div className="space-y-5">
          <CertCard
            name="TryHackMe Pre-Security (SEC1)"
            provider="TryHackMe"
            href="https://tryhackme.com/certification/pre-security"
            difficulty="Beginner"
            duration="40–60 hrs"
            cost="Free / £14/mo"
            accentColor="#94a3b8"
            isTop
            what="A structured, browser-based curriculum covering networking (OSI, DNS, HTTP), Linux basics, Windows fundamentals, and introductory web concepts. Every module has an in-browser attack box — no setup required."
            why="TryHackMe's Pre-Security path solves the single biggest problem at this level: environment friction. Instead of spending two days configuring a virtual machine before learning anything, you start practising in a browser on day one. The guided structure also means nothing important gets skipped. It is the best true-zero starting point available."
          />
          <CertCard
            name="Google Cybersecurity Certificate"
            provider="Coursera / Google"
            href="https://www.coursera.org/professional-certificates/google-cybersecurity"
            difficulty="Beginner"
            duration="6 months (part-time)"
            cost="~£39/mo (Coursera)"
            accentColor="#94a3b8"
            what="An eight-course sequence covering security fundamentals, network security, Linux and SQL, threat detection and response, automation with Python, and IDS/SIEM basics. Leans more blue-team than offensive but gives you a complete threat landscape picture."
            why="This certification signals employability to HR and hiring managers who have never heard of TryHackMe or OffSec. It holds weight at the CV screening stage for entry-level roles, particularly in larger organisations. Take it alongside the THM path — they complement rather than duplicate each other."
          />
          <CertCard
            name="TCM Practical Security Fundamentals"
            provider="TCM Security Academy"
            href="https://academy.tcm-sec.com/p/practical-security-fundamentals"
            difficulty="Beginner"
            duration="20–30 hrs"
            cost="~£25 (one-off)"
            accentColor="#94a3b8"
            what="Covers the same foundational territory (networking, OS, protocols) but from an explicitly offensive mindset. TCM Security is run by practising pentesters, so even the basic content is framed around how attackers think."
            why="Heath Adams (The Cyber Mentor) wrote this course to be the entry point for his broader PNPT pipeline. If you are fairly certain you want to do offensive security specifically — not blue-team or GRC — this gives you the right mental framing from day one. It is inexpensive and concise, so many people do all three Level 00 resources."
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          LEVEL 01 — JUNIOR PENTESTER
      ══════════════════════════════════════════════════════════════════════════ */}
      <section id="level-01" className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <SectionHeader
          num="01"
          label="Junior Pentester"
          subtitle="First exploits, first reports — the year everything clicks"
          color="#f43f5e"
          time="0–2 years"
          salary="£35K–£55K"
        />

        <div className="space-y-5 text-base leading-relaxed mb-12" style={{ color: "rgba(203,213,225,0.78)" }}>
          <p>
            This is the level where theory becomes technique. You will spend most of your time here in two
            places: PortSwigger Web Security Academy (free, browser-based labs targeting every OWASP Top 10
            vulnerability class) and Burp Suite Community. Learn those two tools deeply before you branch out.
            The OWASP Top 10 is not a list to memorise — it is a taxonomy to internalise. By the end of this
            level you should be able to identify a SQL injection from a request/response pair within thirty
            seconds, write a working proof-of-concept, and explain the business impact in plain English.
          </p>
          <p>
            The other skill you build here — and most courses underserve this — is report writing. The ability
            to find a critical vulnerability is worthless if you cannot communicate it clearly to a developer
            who has never heard of an IDOR. Your reports are your professional reputation. Practise them
            obsessively: write one for every HTB box you complete, every TryHackMe room you finish. Format
            matters. Clarity matters. Reproducibility matters.
          </p>
          <p>
            Junior roles at this level typically sit in consultancies doing web application assessments under
            the supervision of a senior. Expect to shadow engagements for the first few months, then run your
            own assessments with peer review. The salary range reflects how much the market values even
            entry-level practical skill — a genuine shortage of good junior practitioners keeps it high.
          </p>
        </div>

        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(244,63,94,0.4)" }}>
          Certifications
        </h3>
        <div className="space-y-5">
          <CertCard
            name="eJPT — eLearnSecurity Junior Penetration Tester"
            provider="INE Security"
            href="https://security.ine.com/certifications/ejpt-certification/"
            difficulty="Beginner–Intermediate"
            duration="1–3 months prep"
            cost="~£180 (exam voucher)"
            accentColor="#f43f5e"
            isTop
            what="A fully practical, 48-hour exam on a real network. No multiple choice questions — you compromise machines to answer the exam questions. Covers network reconnaissance, exploitation basics, pivoting, and web application attacks. Uses Metasploit, Nmap, and Burp Suite."
            why="The eJPT is the best entry-level practical certification in existence right now. Every answer comes from evidence gathered during the exam — you cannot pass by memorising theory. That rigour makes it genuinely meaningful on a CV, and the exam format mirrors real work: you are given an objective and a network, and you have to figure it out. It is also one of the few certs where the preparation material (INE's free Starter Pass) is excellent."
          />
          <CertCard
            name="CompTIA PenTest+"
            provider="CompTIA"
            href="https://www.comptia.org/certifications/pentest"
            difficulty="Intermediate"
            duration="2–3 months prep"
            cost="~£330"
            accentColor="#f43f5e"
            what="A vendor-neutral certification covering penetration testing planning, reconnaissance, scanning, exploitation, post-exploitation, and reporting. Mix of multiple choice and performance-based questions. Recognised by US Department of Defence Directive 8570."
            why="CompTIA certifications carry weight in regulated industries (finance, government, defence) where procurement frameworks explicitly list them. If you want to work in-house at a bank, NHS trust, or government contractor, PenTest+ on your CV opens doors that more technical certs sometimes do not. Its syllabus also covers engagement management and legal scope — underrated knowledge for a consultant."
          />
          <CertCard
            name="CEH v13 — Certified Ethical Hacker"
            provider="EC-Council"
            href="https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh/"
            difficulty="Intermediate"
            duration="2–4 months prep"
            cost="~£900–£1,800"
            accentColor="#f43f5e"
            what="A broad survey of attack techniques covering 20 modules: reconnaissance, scanning, enumeration, vulnerability analysis, system hacking, malware threats, sniffing, social engineering, session hijacking, web application attacks, SQL injection, and more."
            why="The CEH is controversial in the security community because its breadth comes at the expense of depth, and it is expensive. We include it here because it remains a hiring filter at large enterprise organisations and recruitment agencies that are not yet familiar with eJPT or OSCP. If your target employer explicitly mentions CEH in job listings, get it. Otherwise, prioritise eJPT first — it will prepare you better for actual work."
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          LEVEL 02 — SECURITY CONSULTANT
      ══════════════════════════════════════════════════════════════════════════ */}
      <section id="level-02" className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <SectionHeader
          num="02"
          label="Security Consultant"
          subtitle="Full engagements, cloud, and the art of chaining vulnerabilities"
          color="#fb923c"
          time="2–5 years"
          salary="£55K–£80K"
        />

        <div className="space-y-5 text-base leading-relaxed mb-12" style={{ color: "rgba(203,213,225,0.78)" }}>
          <p>
            The jump from Junior to Consultant is the biggest technical leap in the career path. At Level 01
            you found individual vulnerabilities. At Level 02 you learn to chain them. A reflected XSS becomes
            a session hijack. A session hijack becomes an IDOR. An IDOR becomes a full data exfiltration. The
            skill is not just finding each issue — it is seeing the attack surface as a graph and understanding
            which combination of nodes leads to maximum impact.
          </p>
          <p>
            Cloud becomes unavoidable here. Virtually every target at this level has AWS, Azure, or GCP
            infrastructure. IAM misconfiguration is the new server-side injection — it is pervasive, often
            critical, and frequently missed because most pentesters lack cloud depth. Invest early in
            understanding IAM roles, S3 bucket policies, and Lambda trust boundaries. The{" "}
            <span style={{ color: "rgba(251,146,60,0.9)", fontWeight: 500 }}>PNPT</span> covers network
            pentesting thoroughly, while the{" "}
            <span style={{ color: "rgba(251,146,60,0.9)", fontWeight: 500 }}>BSCP</span> will cement your
            web application depth at a professional level.
          </p>
          <p>
            The OSCP is the single most important milestone in an offensive security career. It changes how
            employers think about you — not because it is easy to get, but because it is genuinely hard to
            fake. Every hiring manager at a serious consultancy will recognise what it means: that you can be
            dropped into an unknown network and methodically work your way through it under time pressure
            without help. That is exactly what the job is.
          </p>
        </div>

        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(251,146,60,0.4)" }}>
          Certifications
        </h3>
        <div className="space-y-5">
          <CertCard
            name="OSCP — OffSec Certified Professional"
            provider="OffSec (Offensive Security)"
            href="https://www.offsec.com/courses/pen-200/"
            difficulty="Advanced"
            duration="3–6 months prep"
            cost="~£1,200–£1,500 (90-day lab access + exam)"
            accentColor="#fb923c"
            isTop
            what="The PEN-200 course covers the full penetration testing methodology: information gathering, vulnerability scanning, web application attacks, antivirus evasion, buffer overflows, privilege escalation on Windows and Linux, Active Directory attacks, tunnelling, and post-exploitation. The 24-hour exam requires you to compromise multiple machines in a realistic network and submit a professional report."
            why="OSCP is the industry standard. It is the certification that separates people who understand penetration testing from people who have read about it. The exam is deliberately designed to prevent memorisation — you cannot Google your way through a 24-hour live environment. Every hour of preparation builds real capability, not exam technique. If you hold an OSCP, every serious consultancy already knows you can do the job. It is the closest thing to a universal qualifier the industry has."
          />
          <CertCard
            name="BSCP — Burp Suite Certified Practitioner"
            provider="PortSwigger"
            href="https://portswigger.net/web-security/certification"
            difficulty="Advanced"
            duration="2–4 months prep"
            cost="~£89 (exam attempt)"
            accentColor="#fb923c"
            what="A two-part, four-hour practical exam covering advanced web vulnerabilities: SSRF, XXE, SSTI, prototype pollution, GraphQL injection, web cache poisoning, HTTP request smuggling, OAuth vulnerabilities, and more. Examiners are PortSwigger staff — the people who discovered many of these vulnerability classes."
            why="Web Security Academy is already the best free web security learning resource online. The BSCP exam is the culmination of completing it seriously. Its value lies in specificity: it proves deep web application expertise to employers who care specifically about web security, and the technical depth required means very few candidates hold it. At £89 for an attempt it is also dramatically underpriced relative to its signal value. This is a strong differentiator for pure web pentest roles."
          />
          <CertCard
            name="PNPT — Practical Network Penetration Tester"
            provider="TCM Security"
            href="https://certifications.tcm-sec.com/pnpt/"
            difficulty="Intermediate–Advanced"
            duration="1–3 months prep"
            cost="~£380"
            accentColor="#fb923c"
            what="A five-day, open-book practical exam covering external network reconnaissance, web application testing, Active Directory attacks (including Kerberoasting, Pass-the-Hash, and BloodHound analysis), privilege escalation, and report writing. Submit a professional report to pass."
            why="The PNPT was designed as an alternative to OSCP for people who want a practical certification without the budget or time commitment. It is respected in the industry — TCM Security's reputation for quality curriculum is well-established. Its real strength is the Active Directory coverage: AD attacks are central to real corporate network assessments, and many OSCP-level courses treat AD superficially. Do PNPT alongside or before OSCP to lock in your AD foundations."
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          LEVEL 03 — SENIOR PENTESTER
      ══════════════════════════════════════════════════════════════════════════ */}
      <section id="level-03" className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <SectionHeader
          num="03"
          label="Senior Pentester"
          subtitle="Red teaming, adversary simulation, and thinking like an APT"
          color="#a78bfa"
          time="5–8 years"
          salary="£80K–£110K"
        />

        <div className="space-y-5 text-base leading-relaxed mb-12" style={{ color: "rgba(203,213,225,0.78)" }}>
          <p>
            Red teaming is not penetration testing with a fancier name. The objective is different. In a
            pentest you find and document vulnerabilities. In a red team engagement you simulate a specific
            adversary — a nation-state group, a ransomware operator, an insider threat — to test whether the
            client's detection and response capability would actually stop them. You might spend three weeks
            maintaining access without triggering alerts rather than escalating as fast as possible.
          </p>
          <p>
            At this level you will work with C2 frameworks (Cobalt Strike, Sliver, Havoc) and spend
            significant time on OPSEC: how not to be caught while operating inside a network with active EDR.
            That requires deep knowledge of Windows internals, AV evasion, and how modern defensive tooling
            actually works — which is why many of the best red teamers also have strong blue-team
            backgrounds. You understand detection logic well enough to route around it.
          </p>
          <p>
            Active Directory is the centrepiece of almost every enterprise red team. Kerberoasting, ASREPRoast,
            DCSync, Pass-the-Ticket, ACL abuse, trust relationships — these attacks chain together to achieve
            domain compromise. BloodHound is your graph analysis tool for understanding which path through the
            AD environment has the shortest route to Domain Admin. The CRTP and OSEP will both drill this
            extensively.
          </p>
        </div>

        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(167,139,250,0.4)" }}>
          Certifications
        </h3>
        <div className="space-y-5">
          <CertCard
            name="OSWE — OffSec Web Expert"
            provider="OffSec (Offensive Security)"
            href="https://www.offsec.com/courses/web-300/"
            difficulty="Expert"
            duration="4–8 months prep"
            cost="~£1,200–£1,500"
            accentColor="#a78bfa"
            isTop
            what="WEB-300 is entirely code review driven. You receive application source code and must identify and exploit vulnerabilities by reading the code, not by fuzzing or automated scanning. Covers custom authentication bypasses, deserialization attacks, type juggling, race conditions, and complex multi-step exploit chains across multiple web stacks (PHP, Java, .NET, Node)."
            why="This is the certification that defines what &quot;expert-level web hacker&quot; means. It forces you to stop relying on tools and start thinking from first principles — every vulnerability you find must be reasoned from the code up. Passing OSWE at this level signals to employers that you can tackle custom bespoke applications that scanners and automated tools have never seen. For web-focused senior roles it is the highest signal available."
          />
          <CertCard
            name="OSEP — OffSec Experienced Penetration Tester"
            provider="OffSec (Offensive Security)"
            href="https://www.offsec.com/courses/pen-300/"
            difficulty="Expert"
            duration="4–6 months prep"
            cost="~£1,200–£1,500"
            accentColor="#a78bfa"
            what="PEN-300 covers advanced evasion techniques: custom shellcode, process injection, AMSI and WDAC bypass, CLM/AppLocker circumvention, Active Directory lateral movement with C2 frameworks, and living-off-the-land tradecraft. The exam is a simulated corporate environment with modern defences enabled — no turning off Windows Defender."
            why="OSEP is the red team certification that actually tests whether you can operate against modern defences. Unlike older certifications where you could ignore AV, the PEN-300 exam requires real evasion — you will fail if you simply upload Mimikatz without modification. Holding OSEP demonstrates you can operate in an environment that is actively trying to detect and stop you, which is the exact scenario that defines real red team work."
          />
          <CertCard
            name="CRTP — Certified Red Team Professional"
            provider="Altered Security (Nikhil Mittal)"
            href="https://www.alteredsecurity.com/redteamlab"
            difficulty="Advanced"
            duration="1–2 months prep"
            cost="~£250–£400"
            accentColor="#a78bfa"
            what="A lab-heavy certification focused entirely on Active Directory attacks: enumeration with BloodHound, Kerberoasting, AS-REP roasting, delegation abuse, ACL attacks, Cross-Domain and Cross-Forest trust exploitation, and persistence mechanisms. Uses PowerShell-based tooling throughout."
            why="Nikhil Mittal is one of the foremost researchers in Windows and AD attack techniques — the CRTP curriculum reflects genuine research depth rather than repackaged Metasploit modules. At a fraction of the OSCP/OSWE price it gives you focused, intensive AD knowledge that translates directly to the Active Directory work at the core of almost every red team engagement. It is the most cost-effective way to build AD expertise specifically."
          />
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-5 sm:px-8">
        <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
      </div>

      {/* ════════════════════════════════════════════════════════════════════════
          LEVEL 04 — PENTEST LEAD
      ══════════════════════════════════════════════════════════════════════════ */}
      <section id="level-04" className="max-w-4xl mx-auto px-5 sm:px-8 py-16">
        <SectionHeader
          num="04"
          label="Pentest Lead"
          subtitle="Program ownership, team strategy, and executive risk communication"
          color="#34d399"
          time="8+ years"
          salary="£110K–£160K+"
        />

        <div className="space-y-5 text-base leading-relaxed mb-12" style={{ color: "rgba(203,213,225,0.78)" }}>
          <p>
            The transition to Pentest Lead is primarily a mindset shift rather than a technical one. You will
            still do technical work — the best leads stay hands-on — but your primary output is now the
            programme rather than the assessment. You design the testing methodology. You decide which tools
            get standardised, which vulnerability classes need more coverage, and where your team's knowledge
            gaps are. You hire people who are already very good at certain things and create the conditions for
            them to do their best work.
          </p>
          <p>
            The certifications at this level reflect that shift. CISSP and CISM are not technical hacking
            certifications — they are frameworks for understanding risk, governance, and organisational security
            at the programme level. They give you the vocabulary and structure to communicate with CISOs,
            boards, and audit committees: stakeholders who care about business impact and compliance posture,
            not CVE numbers and CVSS scores.
          </p>
          <p>
            CREST registration (for UK-based practitioners) is worth understanding separately. Many government
            and financial sector clients in the UK are contractually required to use CREST-approved testing
            companies, and some contracts require CREST-certified individuals. The CPSA (Practitioner Security
            Analyst) and CRT (Registered Penetration Tester) exams sit below this level technically but carry
            meaningful weight in procurement decisions that will affect the programmes you lead.
          </p>
        </div>

        <h3 className="font-mono text-[10px] uppercase tracking-[0.3em] mb-5" style={{ color: "rgba(52,211,153,0.4)" }}>
          Certifications
        </h3>
        <div className="space-y-5">
          <CertCard
            name="CISSP — Certified Information Systems Security Professional"
            provider="ISC²"
            href="https://www.isc2.org/certifications/cissp"
            difficulty="Advanced"
            duration="3–6 months prep"
            cost="~£600–£700 (exam)"
            accentColor="#34d399"
            isTop
            what="A 125–175 adaptive question exam covering eight domains: Security & Risk Management, Asset Security, Security Architecture, Network Security, IAM, Security Assessment & Testing, Security Operations, and Software Development Security. Requires five years of professional experience in at least two domains to certify."
            why="CISSP is the most recognised security management certification globally and the de facto credential for senior security leadership. At Lead level it legitimises your ability to make programme-wide decisions — scope, budget, risk appetite — not just technical ones. Clients, procurement teams, and boards recognise it. It also provides a structured vocabulary for risk and governance conversations that pure technical certifications do not give you."
          />
          <CertCard
            name="GXPN — GIAC Exploit Researcher and Advanced Penetration Tester"
            provider="GIAC / SANS"
            href="https://www.giac.org/certifications/exploit-researcher-advanced-penetration-tester-gxpn/"
            difficulty="Expert"
            duration="2–4 months prep (with SANS SEC660)"
            cost="~£1,500–£8,000 depending on training format"
            accentColor="#34d399"
            what="Covers advanced network attacks, cryptographic weaknesses, IPv6 exploitation, fuzzing and vulnerability discovery, exploit development, and Windows kernel-level attacks. Open-book exam (two attempts included). Paired with SANS SEC660 Advanced Penetration Testing course."
            why="For leads who want to maintain deep technical credibility — and who need to validate the work of senior practitioners on their team — GXPN demonstrates that your technical floor is still at an elite level even as your responsibilities broaden. It is particularly valued in organisations that conduct vulnerability research and zero-day work alongside standard pentesting engagements. The SANS training is expensive but among the highest-quality available."
          />
          <CertCard
            name="CISM — Certified Information Security Manager"
            provider="ISACA"
            href="https://www.isaca.org/credentialing/cism"
            difficulty="Intermediate–Advanced"
            duration="2–4 months prep"
            cost="~£550–£700 (exam)"
            accentColor="#34d399"
            what="A 150-question exam across four domains: Information Security Governance, Information Security Risk Management, Information Security Programme Development and Management, and Information Security Incident Management. Requires five years of experience and three in management."
            why="CISM is CISSP's close complement and often preferred in organisations with a strong IT service management culture (ITIL environments, large banks, insurance firms). Where CISSP is broad, CISM is focused on management process — how you build and run a security programme, not just understand security concepts. Holding both CISSP and CISM sends a clear signal that you can operate at the level of security governance, not just technical execution."
          />
        </div>
      </section>

      {/* ── Footer nav ── */}
      <div
        className="max-w-4xl mx-auto px-5 sm:px-8 py-12"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Link
            href="/roadmaps/web-hacking/career-path"
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest transition-colors duration-150"
            style={{ color: "rgba(244,63,94,0.6)", textDecoration: "none" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back to Career Path
          </Link>
          <div className="flex flex-wrap gap-3">
            {LEVELS.map((l) => (
              <a
                key={l.num}
                href={`#level-${l.num}`}
                className="font-mono text-[9px] uppercase tracking-widest transition-colors duration-150"
                style={{ color: `${l.color}55`, textDecoration: "none" }}
              >
                {l.num} {l.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
