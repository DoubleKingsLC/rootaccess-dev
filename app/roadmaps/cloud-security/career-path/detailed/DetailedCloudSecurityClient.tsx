"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// ── Level metadata ─────────────────────────────────────────────────────────────

const LEVELS = [
  { num: "00", label: "Cloud Foundations",        color: "#94a3b8", time: "0–6 months",       subtitle: "Zero to Cloud Literate"              },
  { num: "01", label: "Cloud Security Associate", color: "#22d3ee", time: "6 months – 2 years", subtitle: "Identity, Visibility & Hardening"    },
  { num: "02", label: "Cloud Security Engineer",  color: "#3b82f6", time: "2–5 years",         subtitle: "Automation, IaC & Posture at Scale"  },
  { num: "03", label: "Cloud Penetration Tester", color: "#a855f7", time: "4–8 years",         subtitle: "Offensive Cloud & Privilege Escalation" },
  { num: "04", label: "Cloud Security Architect", color: "#f59e0b", time: "8+ years",           subtitle: "Zero Trust, CNAPP & Enterprise Programs" },
] as const;

// ── Sidebar ───────────────────────────────────────────────────────────────────

function Sidebar() {
  return (
    <aside
      className="hidden lg:flex flex-col gap-1 w-[240px] xl:w-[260px] flex-shrink-0 sticky self-start overflow-y-auto px-5 py-8"
      style={{ top: "48px", maxHeight: "calc(100vh - 48px)", borderRight: "1px solid rgba(255,255,255,0.04)" }}
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.4em] mb-6 font-bold" style={{ color: "rgba(148,163,184,0.8)" }}>
        Levels
      </p>
      {LEVELS.map((l) => (
        <a key={l.num} href={`#level-${l.num}`}
          className="group flex items-start gap-4 rounded-xl px-4 py-3.5 transition-all duration-200 hover:bg-white/[0.03]"
          style={{ textDecoration: "none" }}>
          <span className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-mono text-[12px] font-bold border mt-0.5 transition-all duration-300 group-hover:scale-110"
            style={{ borderColor: `${l.color}88`, color: l.color, background: `${l.color}1a` }}>
            {l.num}
          </span>
          <div>
            <p className="font-mono text-[13px] font-bold uppercase tracking-widest leading-tight transition-colors duration-200 group-hover:text-white"
              style={{ color: "rgba(226,232,240,0.95)" }}>
              {l.label}
            </p>
            <p className="font-mono text-[11px] mt-1 font-medium" style={{ color: "rgba(148,163,184,0.7)" }}>{l.time}</p>
          </div>
        </a>
      ))}
      <div className="mt-6 pt-6" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <Link href="/roadmaps/cloud-security/career-path"
          className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-white"
          style={{ color: "rgba(34,211,238,0.85)", textDecoration: "underline" }}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Career Path
        </Link>
      </div>
    </aside>
  );
}

// ── CertCard ──────────────────────────────────────────────────────────────────

interface CertCardProps {
  name: string; provider: string; href?: string;
  accentColor: string; what: string; why: string; isTop?: boolean;
}

function CertCard({ name, provider, href, accentColor, what, why, isTop }: CertCardProps) {
  const domain = href ? (() => { try { return new URL(href).hostname; } catch { return "aws.amazon.com"; } })() : "aws.amazon.com";
  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "rgba(15,20,30,0.7)", border: `1px solid ${accentColor}35` }}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-5"
        style={{ background: `${accentColor}10`, borderBottom: `1px solid ${accentColor}25` }}>
        <div className="flex-1 min-w-0">
          {isTop && (
            <span className="inline-block font-mono text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 rounded mb-3 font-semibold"
              style={{ background: `${accentColor}28`, color: accentColor, border: `1px solid ${accentColor}55` }}>
              ★ Recommended
            </span>
          )}
          <div className="flex items-center gap-3">
            <img src={`https://www.google.com/s2/favicons?domain=${domain}&sz=64`} alt="" width={28} height={28} className="rounded flex-shrink-0" />
            <h4 className="font-mono text-lg font-bold text-white leading-tight">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium" style={{ color: `${accentColor}cc` }}>{provider}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0">
        <div className="px-6 py-6 font-sans">
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>What it teaches</p>
          <p className="text-[15px] leading-relaxed text-slate-300">{what}</p>
        </div>
        <div className="px-6 py-6 font-sans" style={{ borderLeft: `1px solid ${accentColor}18` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>Why at this level</p>
          <p className="text-[15px] leading-relaxed text-slate-300">{why}</p>
        </div>
      </div>
      {href && (
        <div className="px-6 pb-5">
          <a href={href} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors hover:opacity-100 underline"
            style={{ color: `${accentColor}cc` }}>
            Official page
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M2 8L8 2M8 2H4M8 2V6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}

// ── SkillCard ─────────────────────────────────────────────────────────────────

interface SkillCardProps {
  name: string; category: string; correlatedTools: string[];
  accentColor: string; what: string; why: string;
  resources: { free: { label: string; url: string; why?: string }[]; paid: { label: string; url: string; why?: string }[] };
}

function SkillCard({ name, category, correlatedTools, accentColor, what, why, resources }: SkillCardProps) {
  return (
    <div className="rounded-2xl overflow-hidden mt-6"
      style={{ background: "rgba(15,20,30,0.6)", border: `1px solid ${accentColor}35` }}>
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 px-6 py-5"
        style={{ background: `${accentColor}10`, borderBottom: `1px solid ${accentColor}25` }}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-mono text-sm font-bold"
              style={{ background: `${accentColor}28`, color: accentColor }}>
              {name.charAt(0)}
            </span>
            <h4 className="font-mono text-lg font-bold text-white">{name}</h4>
          </div>
          <p className="font-mono text-[12px] mt-2 font-medium text-slate-400">{category}</p>
        </div>
        <div className="flex flex-wrap gap-2 text-[11px] font-mono sm:justify-end">
          {correlatedTools.map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-white/[0.05] text-slate-400 border border-white/10">{t}</span>
          ))}
        </div>
      </div>
      <div className="px-6 py-5 font-sans" style={{ background: "rgba(255,255,255,0.02)", borderBottom: `1px solid ${accentColor}15` }}>
        <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-3" style={{ color: `${accentColor}ee` }}>What it is</p>
        <p className="text-[15px] leading-relaxed text-slate-300">{what}</p>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-0 font-sans">
        <div className="px-6 py-6 border-b xl:border-b-0" style={{ borderColor: `${accentColor}15` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-4" style={{ color: `${accentColor}ee` }}>Why you need it here</p>
          <p className="text-[15px] leading-relaxed text-slate-300">{why}</p>
        </div>
        <div className="px-6 py-6 xl:border-l" style={{ borderColor: `${accentColor}18` }}>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.25em] mb-4 text-slate-400">Resources</p>
          <div className="grid grid-cols-1 gap-6">
            {resources.free.length > 0 && (
              <div>
                <p className="text-[10px] font-bold uppercase text-blue-400/70 mb-3 tracking-widest">Free</p>
                <div className="space-y-4">
                  {resources.free.map(r => (
                    <div key={r.label}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        className="text-[13px] font-bold text-slate-200 hover:text-white underline decoration-blue-500/30 hover:decoration-blue-500 transition-all block mb-1">
                        {r.label}
                      </a>
                      {r.why && <p className="text-[12px] leading-relaxed text-slate-500">{r.why}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {resources.paid.length > 0 && (
              <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] font-bold uppercase text-amber-400/70 mb-3 tracking-widest">Paid / Professional</p>
                <div className="space-y-4">
                  {resources.paid.map(r => (
                    <div key={r.label}>
                      <a href={r.url} target="_blank" rel="noopener noreferrer"
                        className="text-[13px] font-bold text-slate-200 hover:text-white underline decoration-amber-500/30 hover:decoration-amber-500 transition-all block mb-1">
                        {r.label}
                      </a>
                      {r.why && <p className="text-[12px] leading-relaxed text-slate-500">{r.why}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Section header ─────────────────────────────────────────────────────────────

function SectionHeader({ num, label, color, time, subtitle }: {
  num: string; label: string; color: string; time: string; subtitle: string;
}) {
  return (
    <div className="mb-12">
      <div className="flex flex-wrap items-baseline gap-4 mb-4">
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] px-3 py-1.5 rounded"
          style={{ color, background: `${color}18`, border: `1px solid ${color}40` }}>Level {num}</span>
        <span className="font-mono text-[13px] font-medium text-slate-500">{time}</span>
      </div>
      <h2 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white mb-3 tracking-tight">{label}</h2>
      <p className="font-mono text-[14px]" style={{ color: `${color}dd` }}>{subtitle}</p>
      <div className="mt-6 h-px" style={{ background: `linear-gradient(to right, ${color}40, transparent)` }} />
    </div>
  );
}

// ── Level 00 ──────────────────────────────────────────────────────────────────

function Level00() {
  const c = "#94a3b8";
  return (
    <section id="level-00" className="py-16 xl:py-20">
      <SectionHeader num="00" label="Cloud Foundations" color={c} time="0–6 months" subtitle="Zero to Cloud Literate" />

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-2" style={{ color: c }}>Certifications</h3>
      <div className="space-y-4">
        <CertCard
          name="AWS Certified Cloud Practitioner (CLF-C02)"
          provider="Amazon Web Services"
          href="https://aws.amazon.com/certification/certified-cloud-practitioner/"
          accentColor={c}
          isTop
          what="Covers cloud computing fundamentals, core AWS services (EC2, S3, IAM, VPC, RDS), the shared responsibility model, basic security and compliance, and AWS pricing. No prior experience required."
          why="Before you can secure a cloud environment you need to understand how it works. The CCP gives you the vocabulary and mental model for every concept above it — IAM, VPCs, S3, the shared responsibility model. Skip it and you'll be memorizing tools without understanding why they exist."
        />
        <CertCard
          name="Google Associate Cloud Engineer"
          provider="Google Cloud"
          href="https://cloud.google.com/learn/certification/cloud-engineer"
          accentColor={c}
          what="Covers deploying applications, monitoring operations, and managing enterprise solutions on Google Cloud. Includes networking, compute, storage, and identity fundamentals."
          why="If your target employer is GCP-heavy, this is the equivalent starting point. GCP and AWS share ~80% of their conceptual model — learning one makes the other much easier. Good to have if you want multi-cloud credibility."
        />
      </div>

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-12" style={{ color: c }}>Core Skills</h3>
      <div className="space-y-0">
        <SkillCard
          name="AWS IAM Fundamentals"
          category="Identity & Access"
          correlatedTools={["AWS Console", "AWS CLI", "IAM Policy Simulator"]}
          accentColor={c}
          what="IAM (Identity and Access Management) is how AWS controls who can do what to which resources. It covers users, groups, roles, and JSON-based policies with Effect/Principal/Action/Resource/Condition structure."
          why="Everything in cloud security traces back to identity. Misconfigured IAM is the root cause behind the majority of cloud breaches — overly permissive roles, wildcard actions, missing MFA. You cannot defend cloud environments without understanding IAM fluently."
          resources={{
            free: [
              { label: "AWS IAM documentation (official)", url: "https://docs.aws.amazon.com/iam/", why: "The authoritative reference. Read the 'Understanding how IAM works' section first." },
              { label: "flaws.cloud — Level 2 (IAM key exposure)", url: "http://flaws.cloud/", why: "A hands-on challenge that teaches you what bad IAM looks like from the attacker's perspective." },
              { label: "IAM Policy Simulator (AWS tool)", url: "https://policysim.aws.amazon.com/", why: "Test what any policy actually allows before deploying it. Essential for learning policy evaluation logic." },
            ],
            paid: [
              { label: "A Cloud Guru — AWS Cloud Practitioner course", url: "https://acloudguru.com/course/aws-certified-cloud-practitioner", why: "Best video-based introduction to AWS including IAM. Subscription required." },
            ],
          }}
        />
        <SkillCard
          name="VPC Networking"
          category="Cloud Networking"
          correlatedTools={["AWS VPC Console", "Security Groups", "NACLs", "Route Tables"]}
          accentColor={c}
          what="A Virtual Private Cloud is your isolated network within AWS. It includes subnets (public/private), security groups (stateful instance-level firewalls), NACLs (stateless subnet-level ACLs), internet gateways, NAT gateways, and route tables."
          why="Network misconfiguration is the second most common cloud vulnerability after IAM. Overly permissive security groups, unnecessary public subnet exposure, and missing VPC flow log monitoring are entry points attackers actively scan for."
          resources={{
            free: [
              { label: "AWS VPC Workshop", url: "https://catalog.workshops.aws/networking/en-US", why: "Hands-on lab that builds a real VPC from scratch. Covers subnets, routing, and security group rules." },
              { label: "TryHackMe — AWS rooms", url: "https://tryhackme.com/hacktivities?tab=search&page=1&free=false&order=most-popular&difficulty=all&type=room&searchTxt=aws", why: "Search for AWS-tagged rooms covering networking and security basics." },
            ],
            paid: [],
          }}
        />
        <SkillCard
          name="S3 and Object Storage"
          category="Storage Security"
          correlatedTools={["AWS S3 Console", "AWS CLI (s3api)", "Bucket policies", "Block Public Access settings"]}
          accentColor={c}
          what="S3 is AWS's infinitely scalable object storage. Security controls include bucket policies (resource-based), ACLs (legacy), Block Public Access settings (4 independent flags), server-side encryption (SSE-S3, SSE-KMS), and versioning."
          why="S3 public bucket misconfigurations are among the most frequently exploited cloud vulnerabilities — thousands of breaches have started with a single exposed bucket. Learning the exact mechanics of each access control layer at this stage prevents you from making the mistakes you'll later be paid to find."
          resources={{
            free: [
              { label: "flaws.cloud — Levels 1–3 (all S3-focused)", url: "http://flaws.cloud/", why: "The first three levels of this challenge are entirely about S3 misconfigurations. Do them before reading any docs." },
              { label: "AWS S3 security best practices", url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html", why: "Official reference. Read after doing flaws.cloud — it will make much more sense with the context." },
            ],
            paid: [],
          }}
        />
      </div>
    </section>
  );
}

// ── Level 01 ──────────────────────────────────────────────────────────────────

function Level01() {
  const c = "#22d3ee";
  return (
    <section id="level-01" className="py-16 xl:py-20">
      <SectionHeader num="01" label="Cloud Security Associate" color={c} time="6 months – 2 years" subtitle="Identity, Visibility & Hardening" />

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-2" style={{ color: c }}>Certifications</h3>
      <div className="space-y-4">
        <CertCard
          name="AWS Certified Solutions Architect – Associate (SAA-C03)"
          provider="Amazon Web Services"
          href="https://aws.amazon.com/certification/certified-solutions-architect-associate/"
          accentColor={c}
          isTop
          what="In-depth coverage of 30+ AWS services including compute, storage, databases, networking, and security. Covers high availability, fault tolerance, cost optimization, and the Well-Architected Framework security pillar."
          why="Security engineers are most effective when they understand what they're protecting. The SAA forces you to understand why applications are built the way they are — load balancing, auto-scaling, multi-AZ deployments — so you can reason about the full attack surface, not just the security controls bolted on top."
        />
        <CertCard
          name="CompTIA Security+ SY0-701"
          provider="CompTIA"
          href="https://www.comptia.org/certifications/security"
          accentColor={c}
          what="Vendor-neutral coverage of security domains: threats, vulnerabilities, architecture, implementation, operations, and governance. Covers both on-prem and cloud scenarios."
          why="If your role sits inside a compliance-heavy organization (government, finance, healthcare), Security+ is often a hiring requirement. It also reinforces the foundational security vocabulary that you'll apply to AWS-specific controls at this level."
        />
      </div>

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-12" style={{ color: c }}>Core Skills</h3>
      <div className="space-y-0">
        <SkillCard
          name="CloudTrail + CloudWatch Analysis"
          category="Detection & Monitoring"
          correlatedTools={["CloudTrail", "CloudWatch Logs Insights", "EventBridge", "Athena"]}
          accentColor={c}
          what="CloudTrail records every API call made in your AWS account — who did what, from where, and when. CloudWatch aggregates metrics and logs. Together they're your primary audit and detection layer. CloudWatch Logs Insights and Athena let you query CloudTrail at scale."
          why="Every cloud incident response begins with CloudTrail. If you can't query it efficiently, you can't investigate. Building detection logic (EventBridge rules, CloudWatch Metric Filters) for high-risk actions like root account usage, IAM changes, or S3 public access modifications is a core skill at this level."
          resources={{
            free: [
              { label: "AWS CloudTrail documentation", url: "https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html", why: "Read the 'CloudTrail Event Reference' section to understand the structure of every event you'll be querying." },
              { label: "AWS Skill Builder — Security Monitoring on AWS", url: "https://skillbuilder.aws/", why: "Free courses covering CloudTrail querying, CloudWatch alarms, and Security Hub integration." },
            ],
            paid: [
              { label: "A Cloud Guru — AWS Security Specialty prep", url: "https://acloudguru.com/", why: "Covers detection and monitoring in depth as part of the Security Specialty curriculum." },
            ],
          }}
        />
        <SkillCard
          name="IAM Policy Analysis"
          category="Identity & Access"
          correlatedTools={["IAM Access Analyzer", "IAM Policy Simulator", "AWS CLI", "Parliament (open source)"]}
          accentColor={c}
          what="Reading and evaluating JSON IAM policies — understanding effect, principal, action, resource, and condition blocks. Using IAM Access Analyzer to find external access to your resources. Identifying dangerous actions: iam:PassRole, sts:AssumeRole, iam:CreateAccessKey, lambda:CreateFunction with iam:PassRole."
          why="Nearly every significant cloud breach in the last five years has involved IAM privilege escalation. At this level you need to be able to read a policy and immediately identify overly permissive configurations. This skill directly translates to finding the paths attackers will use before they do."
          resources={{
            free: [
              { label: "flaws.cloud — IAM and role chaining levels", url: "http://flaws.cloud/", why: "Levels 4-6 specifically cover role chaining and metadata service abuse — the practical application of IAM policy analysis." },
              { label: "AWS IAM Access Analyzer documentation", url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html", why: "Understand what Access Analyzer can and cannot detect — important for knowing its blind spots." },
              { label: "Parliament (open source IAM linter)", url: "https://github.com/duo-labs/parliament", why: "Lints IAM policies for common errors. Useful for understanding the structure of valid vs. dangerous policies." },
            ],
            paid: [],
          }}
        />
        <SkillCard
          name="AWS Security Hub + Config Rules"
          category="Posture Management"
          correlatedTools={["Security Hub", "AWS Config", "GuardDuty", "Inspector", "Macie"]}
          accentColor={c}
          what="Security Hub aggregates findings from GuardDuty (threat detection), Inspector (vulnerability assessment), Macie (sensitive data discovery), and Config into a normalized security score against standards like CIS AWS Foundations Benchmark and PCI DSS. Config tracks the configuration state of every resource and evaluates it against custom or managed rules."
          why="At this level you're building a security posture — not just responding to individual alerts. Security Hub and Config give you the visibility layer to understand your overall compliance posture, identify drift, and prioritize remediation. This is the foundation of everything more advanced at L02."
          resources={{
            free: [
              { label: "AWS Security Hub workshop", url: "https://catalog.workshops.aws/securityhub/en-US", why: "Hands-on workshop that walks through enabling, configuring, and actioning Security Hub findings." },
              { label: "PwnedLabs — Cloud security labs", url: "https://pwnedlabs.io/", why: "Practical labs that simulate the kind of misconfigurations Security Hub and Config are designed to catch." },
            ],
            paid: [],
          }}
        />
      </div>
    </section>
  );
}

// ── Level 02 ──────────────────────────────────────────────────────────────────

function Level02() {
  const c = "#3b82f6";
  return (
    <section id="level-02" className="py-16 xl:py-20">
      <SectionHeader num="02" label="Cloud Security Engineer" color={c} time="2–5 years" subtitle="Automation, IaC & Posture at Scale" />

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-2" style={{ color: c }}>Certifications</h3>
      <div className="space-y-4">
        <CertCard
          name="AWS Certified Security – Specialty (SCS-C02)"
          provider="Amazon Web Services"
          href="https://aws.amazon.com/certification/certified-security-specialty/"
          accentColor={c}
          isTop
          what="The gold standard for AWS security engineering. Covers incident response and forensics, logging and monitoring architecture, infrastructure security (WAF, Shield, network controls), data protection (KMS, ACM, Secrets Manager), and identity design patterns."
          why="This is the certification that proves you can design and operate security at scale in AWS. It's a hard exam that requires genuine hands-on experience — you cannot pass it by memorizing. At L02 you have enough context to appreciate the nuance in its questions, and it will close significant gaps in areas like KMS key policies and cross-account trust relationships."
        />
        <CertCard
          name="CCSP — Certified Cloud Security Professional"
          provider="ISC²"
          href="https://www.isc2.org/certifications/ccsp"
          accentColor={c}
          what="Vendor-neutral coverage of cloud data security, cloud platform and infrastructure security, cloud application security, cloud security operations, and legal and compliance. Covers multi-cloud environments and governance frameworks (CSA CCM, ISO 27017)."
          why="The CCSP fills the gap the AWS Security Specialty leaves — governance, legal compliance, multi-cloud strategy, and the frameworks that large organizations use to audit cloud posture. It's ISC²'s cloud-specific credential and is recognized by organizations that want cloud security practitioners who think beyond a single provider."
        />
      </div>

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-12" style={{ color: c }}>Core Skills</h3>
      <div className="space-y-0">
        <SkillCard
          name="IaC Security (Terraform + SAST)"
          category="Shift-Left / DevSecOps"
          correlatedTools={["Checkov", "tfsec", "Terrascan", "Terraform", "CloudFormation"]}
          accentColor={c}
          what="Scanning Infrastructure-as-Code (Terraform, CloudFormation, CDK) templates for security misconfigurations before they're deployed. Static analysis tools flag issues like public S3 buckets, missing encryption, overly permissive IAM roles, and unencrypted EBS volumes at the PR stage."
          why="By the time a misconfiguration reaches production in a cloud environment with thousands of resources, it may have existed for months and spawned dozens of dependent resources. Shift-left security — catching issues in code before deployment — is exponentially more efficient. At this level you're expected to own the pipeline security gate."
          resources={{
            free: [
              { label: "Checkov documentation (Bridgecrew/Prisma)", url: "https://www.checkov.io/", why: "The most widely used IaC scanner. Open source, fast, and supports Terraform, CloudFormation, CDK, Kubernetes." },
              { label: "tfsec (Aqua Security)", url: "https://aquasecurity.github.io/tfsec/", why: "Terraform-specific scanner. Good at catching AWS-specific misconfigs with clear remediation guidance." },
              { label: "CloudGoat by Rhino Security", url: "https://github.com/RhinoSecurityLabs/cloudgoat", why: "Deliberately vulnerable IaC — review its Terraform files to understand exactly what bad IaC looks like before writing scanners for it." },
            ],
            paid: [],
          }}
        />
        <SkillCard
          name="CSPM — Cloud Security Posture Management"
          category="Continuous Assessment"
          correlatedTools={["Prowler", "ScoutSuite", "AWS Security Hub", "Wiz (enterprise)"]}
          accentColor={c}
          what="Continuously evaluating your cloud environment against security benchmarks (CIS AWS Foundations, NIST 800-53, PCI DSS, SOC 2) using automated tools. Identifies exposed resources, missing encryption, insecure configurations, and compliance gaps across hundreds of checks."
          why="Manual cloud security review doesn't scale past a handful of accounts. CSPM tooling gives you continuous assurance and surfaces configuration drift the moment it happens. Prowler is the industry-standard open source tool — knowing how to run it, interpret findings, and automate remediation is a core L02 skill."
          resources={{
            free: [
              { label: "Prowler open source (GitHub)", url: "https://github.com/prowler-cloud/prowler", why: "Run against an AWS account with read-only credentials and get hundreds of categorized findings in minutes. The best way to learn what 'bad' looks like at scale." },
              { label: "ScoutSuite (NCC Group)", url: "https://github.com/nccgroup/ScoutSuite", why: "Multi-cloud posture assessment tool. Good for learning to assess GCP and Azure alongside AWS." },
            ],
            paid: [
              { label: "SANS SEC510 — Public Cloud Security", url: "https://www.sans.org/cyber-security-courses/public-cloud-security-aws-azure-gcp/", why: "The most rigorous hands-on cloud security engineering course available. Covers AWS, Azure, and GCP from a defender's perspective." },
            ],
          }}
        />
        <SkillCard
          name="Container + ECS/EKS Security"
          category="Workload Security"
          correlatedTools={["Falco", "Trivy", "AWS Inspector", "EKS Pod Security", "IAM Roles for Service Accounts"]}
          accentColor={c}
          what="Securing containerized workloads in AWS: scanning container images for CVEs (Trivy, Inspector), enforcing runtime security policies (Falco detects unexpected syscalls), hardening ECS/EKS configurations (non-root containers, read-only filesystems, network policies), and scoping IAM Roles for Service Accounts (IRSA) to least privilege."
          why="Containers are the dominant deployment model in modern cloud environments. Privileged containers, containers running as root, missing network policies, and overly permissive service account roles are all commonly found vulnerabilities. At L02 you need to have an opinionated security stance on container workloads."
          resources={{
            free: [
              { label: "Falco documentation (CNCF)", url: "https://falco.org/docs/", why: "The standard for container runtime threat detection. Start with the default rules to understand what anomalous container behavior looks like." },
              { label: "Trivy — container image scanner (Aqua)", url: "https://aquasecurity.github.io/trivy/", why: "Scans images, filesystems, and IaC. Used by most CI/CD pipelines for container vulnerability management." },
              { label: "HackTricks Cloud — ECS/EKS attacks", url: "https://cloud.hacktricks.xyz/pentesting-cloud/aws-security/aws-services/aws-eks-and-ecs-enumeration", why: "Understanding the attack surface of EKS is the fastest way to learn what needs defending." },
            ],
            paid: [],
          }}
        />
      </div>
    </section>
  );
}

// ── Level 03 ──────────────────────────────────────────────────────────────────

function Level03() {
  const c = "#a855f7";
  return (
    <section id="level-03" className="py-16 xl:py-20">
      <SectionHeader num="03" label="Cloud Penetration Tester" color={c} time="4–8 years" subtitle="Offensive Cloud & Privilege Escalation" />

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-2" style={{ color: c }}>Certifications</h3>
      <div className="space-y-4">
        <CertCard
          name="AWS Certified Security – Specialty (SCS-C02)"
          provider="Amazon Web Services"
          href="https://aws.amazon.com/certification/certified-security-specialty/"
          accentColor={c}
          isTop
          what="Covers incident response, logging and monitoring architecture, infrastructure security, data protection, and identity and access management at depth. The advanced AWS security certification."
          why="If you don't have it from L02, it's the baseline credential. Cloud pentesting engagements require you to understand the detection mechanisms you're trying to evade — knowing what Security Hub, CloudTrail, and GuardDuty look for is as important as knowing the attack techniques."
        />
        <CertCard
          name="TCM Security — Cloud Security Practitioner"
          provider="TCM Security"
          href="https://certifications.tcm-sec.com/"
          accentColor={c}
          what="Covers cloud security fundamentals with a practical, lab-heavy approach. TCM's courses are consistently the most hands-on in the industry — labs over lectures."
          why="Cloud pentesting certifications are newer and evolving rapidly. TCM Security has built a reputation for practical, job-relevant training. Their cloud curriculum is worth following as the space matures — it maps closely to real-world engagement techniques."
        />
      </div>

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-12" style={{ color: c }}>Core Skills</h3>
      <div className="space-y-0">
        <SkillCard
          name="AWS IAM Privilege Escalation"
          category="Offensive Cloud"
          correlatedTools={["Pacu", "enumerate-iam", "CloudFox", "AWS CLI", "Rhino Security Labs research"]}
          accentColor={c}
          what="The art of chaining low-privilege IAM permissions into high-privilege access. Classic paths include: iam:PassRole + lambda:CreateFunction (run code as any role), iam:PassRole + ec2:RunInstances (launch an instance as a privileged role), iam:CreateAccessKey (generate keys for another user), and iam:AttachUserPolicy (attach AdministratorAccess to yourself)."
          why="IAM privilege escalation is the cloud equivalent of local privilege escalation — it turns 'I have some access' into 'I have all access.' Every cloud pentester needs to know the 20+ documented escalation paths, how to enumerate them with tools like Pacu and CloudFox, and how to chain them across accounts."
          resources={{
            free: [
              { label: "Rhino Security Labs — AWS IAM Privilege Escalation research", url: "https://rhinosecuritylabs.com/aws/aws-privilege-escalation-methods-mitigation/", why: "The definitive reference. All 21+ escalation paths documented with technical detail and detection guidance." },
              { label: "CloudGoat — iam_privesc_by_attachment scenario", url: "https://github.com/RhinoSecurityLabs/cloudgoat", why: "Deploy this scenario locally and work through the escalation path hands-on. The best way to learn is to do it." },
              { label: "HackTricks Cloud — AWS IAM attacks", url: "https://cloud.hacktricks.xyz/pentesting-cloud/aws-security/aws-privilege-escalation", why: "Comprehensive reference for all IAM attack techniques, updated regularly." },
            ],
            paid: [],
          }}
        />
        <SkillCard
          name="SSRF → Cloud Metadata Abuse"
          category="Offensive Cloud"
          correlatedTools={["Burp Suite", "AWS IMDSv1", "curl", "Pacu SSRF module"]}
          accentColor={c}
          what="Server-Side Request Forgery targeting the AWS Instance Metadata Service (IMDS) at 169.254.169.254. In IMDSv1 (still widely deployed), a single SSRF request returns IAM credentials attached to the EC2 instance role — no authentication required. These credentials can then be used to pivot through the entire account."
          why="SSRF to IMDS credential theft is one of the most common initial access paths in AWS breaches. The Capital One breach (2019, $80M fine, 100M records) was precisely this technique. Understanding the full chain — SSRF discovery → metadata fetch → credential extraction → IAM enumeration → privilege escalation — is essential for any cloud pentest."
          resources={{
            free: [
              { label: "flaws2.cloud — Attacker path (SSRF to metadata)", url: "https://flaws2.cloud/", why: "flaws2 is the offensive counterpart to flaws.cloud. Level 2 specifically covers SSRF to IMDS exploitation." },
              { label: "HackTricks — SSRF in Cloud environments", url: "https://cloud.hacktricks.xyz/pentesting-cloud/aws-security/aws-services/aws-ec2-enumeration/ssrf-in-aws-metadata", why: "Documents every metadata endpoint worth querying and what credentials look like in the response." },
            ],
            paid: [],
          }}
        />
        <SkillCard
          name="Cross-Account Attacks & Role Chaining"
          category="Offensive Cloud"
          correlatedTools={["Pacu", "CloudFox", "AWS CLI (--profile)", "enumerate-iam"]}
          accentColor={c}
          what="Exploiting overly permissive trust relationships between AWS accounts. When a role in Account A trusts Account B with sts:AssumeRole, a compromised principal in B can pivot to A. Combined with misconfigurations in resource-based policies (S3 bucket policies, SQS queues), this enables lateral movement across an entire AWS Organization."
          why="Enterprise AWS environments use multi-account architectures — dozens or hundreds of accounts linked through AWS Organizations. A foothold in a low-trust dev account with a misconfigured role trust policy can cascade to production. Cross-account enumeration and exploitation is L03-level work that separates cloud pentesters from cloud security generalists."
          resources={{
            free: [
              { label: "CloudGoat — cross_account_takeover scenario", url: "https://github.com/RhinoSecurityLabs/cloudgoat", why: "Purpose-built lab for practicing cross-account role assumption. Builds the mental model for Organizations-scale attacks." },
              { label: "CloudFox (BishopFox) — automates cross-account enumeration", url: "https://github.com/BishopFox/cloudfox", why: "CloudFox was built specifically to speed up the cross-account enumeration phase of cloud pentests. Read its documentation to understand the attack surface it maps." },
            ],
            paid: [],
          }}
        />
      </div>
    </section>
  );
}

// ── Level 04 ──────────────────────────────────────────────────────────────────

function Level04() {
  const c = "#f59e0b";
  return (
    <section id="level-04" className="py-16 xl:py-20">
      <SectionHeader num="04" label="Cloud Security Architect" color={c} time="8+ years" subtitle="Zero Trust, CNAPP & Enterprise Programs" />

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-2" style={{ color: c }}>Certifications</h3>
      <div className="space-y-4">
        <CertCard
          name="CISSP — Certified Information Systems Security Professional"
          provider="ISC²"
          href="https://www.isc2.org/certifications/cissp"
          accentColor={c}
          isTop
          what="The broadest security certification — covers security and risk management, asset security, security architecture, communications security, identity and access management, security assessment, security operations, and software development security. Requires 5 years of professional experience."
          why="At the architect level, you're no longer just executing — you're advising executives, designing programs, and making decisions that affect entire organizations. The CISSP provides the governance and management vocabulary for those conversations. It's the most widely recognized indicator that a practitioner thinks at the program level, not just the technical level."
        />
        <CertCard
          name="SANS SEC549 — Enterprise Cloud Security Architecture"
          provider="SANS Institute"
          href="https://www.sans.org/cyber-security-courses/enterprise-cloud-security-architecture/"
          accentColor={c}
          what="Advanced course covering cloud security architecture patterns, Zero Trust design, CNAPP evaluation, multi-cloud governance, supply chain security, and cloud-native detection engineering. Includes a GIAC certification (GCSA)."
          why="SANS SEC549 is the most technically advanced cloud security architecture training available. It's designed specifically for architects and senior practitioners who need to design security programs from the ground up — not configure individual controls. The GCSA certification that accompanies it is still new but carries SANS's credibility."
        />
      </div>

      <h3 className="font-mono text-[13px] font-bold uppercase tracking-[0.3em] mb-6 mt-12" style={{ color: c }}>Core Skills</h3>
      <div className="space-y-0">
        <SkillCard
          name="Zero Trust Architecture for Cloud"
          category="Security Architecture"
          correlatedTools={["AWS Verified Access", "AWS IAM Identity Center", "Service Control Policies", "VPC Lattice"]}
          accentColor={c}
          what="Zero Trust means no implicit trust based on network location — every request is authenticated, authorized, and encrypted regardless of whether it originates inside or outside the perimeter. In AWS this translates to: identity-based access everywhere, SCPs that enforce minimum guardrails across all accounts, micro-segmentation via VPC security groups and Lattice, and continuous verification with IAM conditions (aws:PrincipalOrgID, aws:SourceVpc)."
          why="Traditional perimeter security fails in cloud environments because there is no perimeter — APIs are reachable from anywhere. Zero Trust is the only architectural model that scales with cloud. Architects who can design and articulate Zero Trust posture are in significant demand at enterprises migrating from on-prem security models."
          resources={{
            free: [
              { label: "AWS Zero Trust whitepaper", url: "https://aws.amazon.com/security/zero-trust/", why: "AWS's own framing of Zero Trust with specific service recommendations. Good starting point for the AWS-specific implementation." },
              { label: "NIST SP 800-207 — Zero Trust Architecture", url: "https://nvlpubs.nist.gov/nistpubs/SpecialPublications/NIST.SP.800-207.pdf", why: "The authoritative definition. Read this before any vendor's marketing material so you can evaluate claims objectively." },
            ],
            paid: [
              { label: "SANS SEC549 — Enterprise Cloud Security Architecture", url: "https://www.sans.org/cyber-security-courses/enterprise-cloud-security-architecture/", why: "The most rigorous architectural training. Expensive but the content is unmatched for senior practitioners." },
            ],
          }}
        />
        <SkillCard
          name="CNAPP Strategy — Platform Consolidation"
          category="Enterprise Program Design"
          correlatedTools={["Wiz", "Prisma Cloud", "Orca Security", "Microsoft Defender for Cloud", "AWS Security Hub"]}
          accentColor={c}
          what="Cloud-Native Application Protection Platforms converge CSPM (posture), CWPP (workload protection), CIEM (entitlements), DSPM (data security), and CDR (detection and response) into a single platform. Architects design the integration strategy, data flow, and escalation model between CNAPP alerts and SIEM/SOAR systems."
          why="At scale, point tools create alert fatigue and coverage gaps. CNAPP consolidation is a board-level investment decision that requires an architect to evaluate platforms, build the business case, define success metrics, and design the operating model. This is where technical expertise meets business strategy."
          resources={{
            free: [
              { label: "Wiz Research Blog — cloud attack research", url: "https://www.wiz.io/blog/research", why: "Wiz's research team publishes some of the most impactful cloud security research (ExtraReplica, BrokenSesame, OMIGOD). Understanding attack research at this level informs platform selection." },
              { label: "fwd:cloudsec — cloud security conference talks", url: "https://fwdcloudsec.org/", why: "The premier cloud-security-focused conference. Papers and talks represent the current state of the art from practitioners at hyperscalers and leading security teams." },
            ],
            paid: [],
          }}
        />
        <SkillCard
          name="Multi-Account Governance with AWS Organizations"
          category="Enterprise Cloud Governance"
          correlatedTools={["AWS Organizations", "Service Control Policies (SCPs)", "AWS Control Tower", "Delegated Admin", "CloudFormation StackSets"]}
          accentColor={c}
          what="Designing and enforcing security guardrails across hundreds of AWS accounts using AWS Organizations SCPs (preventive controls), Config conformance packs (detective controls), and Control Tower landing zones (prescriptive architecture). SCPs function as an IAM ceiling that even account-level administrators cannot exceed."
          why="Enterprise cloud security operates at the organizational level, not the account level. A single misconfigured SCP can block legitimate operations across an entire organization, or a gap in SCP coverage can allow an account owner to disable security controls. Architects at this level design the policy hierarchy that everyone else operates within."
          resources={{
            free: [
              { label: "AWS Organizations SCP documentation", url: "https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html", why: "Read the 'SCP evaluation logic' and 'inheritance' sections carefully — the interaction between SCPs and identity policies is non-obvious and has caused major production incidents." },
              { label: "AWS Security Reference Architecture", url: "https://docs.aws.amazon.com/prescriptive-guidance/latest/security-reference-architecture/welcome.html", why: "AWS's prescriptive multi-account security architecture. The canonical reference for how to structure an AWS Organization from a security perspective." },
            ],
            paid: [],
          }}
        />
      </div>
    </section>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function DetailedCloudSecurityClient() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0);
      if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    const toggle = () => setShowScrollTop(window.pageYOffset > 400);
    window.addEventListener("scroll", toggle);
    return () => window.removeEventListener("scroll", toggle);
  }, []);

  return (
    <div className="min-h-screen" style={{ background: "#060a0f", color: "rgba(226,232,240,0.9)" }}>

      {/* Top nav */}
      <div className="sticky top-0 z-30 flex items-center gap-3 px-6"
        style={{ background: "rgba(6,10,15,0.96)", borderBottom: "1px solid rgba(255,255,255,0.05)", backdropFilter: "blur(12px)", height: "48px" }}>
        <Link href="/" className="font-mono text-[11px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Home</Link>
        <span className="text-slate-700">/</span>
        <Link href="/roadmaps/cloud-security" className="font-mono text-[11px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Cloud Security</Link>
        <span className="text-slate-700">/</span>
        <Link href="/roadmaps/cloud-security/career-path" className="font-mono text-[11px] uppercase tracking-widest text-slate-400 hover:text-white transition-colors">Career Path</Link>
        <span className="text-slate-700">/</span>
        <span className="font-mono text-[11px] uppercase tracking-widest font-semibold text-slate-500">Deep Dive</span>
        <div className="flex-1" />
        <span className="hidden lg:block font-mono text-[11px] font-black uppercase tracking-[0.4em] text-amber-400">
          Cloud Security — Deep Dive
        </span>
      </div>

      {/* Hero */}
      <div className="px-6 lg:px-16 xl:px-20 pt-14 pb-10">
        <p className="font-mono text-[10px] uppercase tracking-[0.4em] mb-4 text-amber-400/55">Deep Dive</p>
        <h1 className="text-4xl sm:text-5xl xl:text-6xl font-bold text-white mb-4 tracking-tight leading-tight">
          The &ldquo;why&rdquo; behind<br />every certification.
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
          Not a list of certs to collect — a breakdown of what each one teaches, why it matters at a specific point in your career, and the exact resources to use. Each skill section explains the concept, the attack surface it protects, and where to learn it for free.
        </p>
      </div>

      <div className="h-px mx-6 lg:mx-16 xl:mx-20" style={{ background: "rgba(255,255,255,0.05)" }} />

      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-w-0 px-6 lg:px-12 xl:px-16">
          <Level00 />
          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
          <Level01 />
          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
          <Level02 />
          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
          <Level03 />
          <div className="h-px" style={{ background: "rgba(255,255,255,0.04)" }} />
          <Level04 />
        </main>
      </div>

      {/* Scroll to top */}
      <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-10 right-10 z-50 w-12 h-12 rounded-xl bg-slate-900 border border-white/10 text-white flex items-center justify-center transition-all ${showScrollTop ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>
    </div>
  );
}
