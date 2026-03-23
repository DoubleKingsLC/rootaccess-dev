import { getUserProfile } from "@/lib/profile-service";
import ProfileHero from "@/components/profile/ProfileHero";
import PlatformIntegration from "@/components/profile/PlatformIntegration";
import SkillVisualization from "@/components/profile/SkillVisualization";
import Certifications from "@/components/profile/Certifications";
import ReportGallery from "@/components/profile/ReportGallery";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

interface PageProps {
  params: Promise<{ username: string }>;
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;

  if (!username) return notFound();

  const profile = await getUserProfile(username);

  if (!profile) {
    if (username !== 'ghost-operator') {
      redirect('/u/ghost-operator');
    }
    return notFound();
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-cyan-500/30">
        {/* Fixed Top Nav */}
        <div className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center pointer-events-none">
            <Link 
                href="/" 
                className="pointer-events-auto group flex items-center gap-2 font-heading font-bold text-xl tracking-tight text-cyan-400"
            >
                <span className="w-8 h-8 rounded bg-cyan-950 border border-cyan-500/30 flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-900 transition-all duration-300">R</span>
                <span className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">RootAccess</span>
            </Link>
            
            <div className="pointer-events-auto flex items-center gap-4">
                 <button className="px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/5 font-mono text-[10px] tracking-[0.2em] uppercase text-slate-400 hover:text-white hover:border-white/20 transition-all duration-300">
                    Connect
                </button>
            </div>
        </div>

      <main className="relative z-10 pt-20 pb-40 max-w-7xl mx-auto px-6 space-y-24">
        {/* Profile Hero & Rank Section */}
        <ProfileHero profile={profile} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Skills & Social Stats */}
            <div className="lg:col-span-4 space-y-12">
                 <SkillVisualization skills={profile.skills} />
                 <PlatformIntegration platforms={profile.platforms} />
            </div>

            {/* Right Column: Experience, Certs, Reports */}
            <div className="lg:col-span-8 space-y-12">
                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/50 to-transparent" />
                        <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-cyan-400">Certifications</h2>
                    </div>
                    <Certifications certifications={profile.certifications} />
                </section>

                <section className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-purple-500/50 to-transparent" />
                        <h2 className="font-mono text-xs tracking-[0.3em] uppercase text-purple-400">Analytical Reports</h2>
                    </div>
                    <ReportGallery reports={profile.reports} />
                </section>
            </div>
        </div>
      </main>

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02] bg-[length:50px_50px]" />
      </div>
    </div>
  );
}
