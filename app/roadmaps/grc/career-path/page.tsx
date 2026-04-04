import Link from "next/link";

export const metadata = {
  title: "GRC Career Path | rootaccess",
  description: "Structured path for governance, risk, and compliance careers — coming soon.",
};

export default function GRCCareerPathPage() {
  return (
    <div className="min-h-[100dvh] w-full bg-[#060a0f] px-6 py-16 text-white">
      <div className="mx-auto max-w-lg space-y-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-teal-400">GRC</p>
        <h1 className="text-balance font-sans text-2xl font-bold tracking-tight">Career path</h1>
        <p className="text-sm leading-relaxed text-slate-400">
          This roadmap is under construction. Check back soon for frameworks, certifications, and
          resources tailored to GRC roles.
        </p>
        <Link
          href="/roadmaps/grc"
          className="inline-flex items-center justify-center rounded-xl border border-teal-500/40 bg-teal-500/10 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-teal-400 transition-colors hover:border-teal-400 hover:bg-teal-500/20"
        >
          Back to workflow
        </Link>
      </div>
    </div>
  );
}
