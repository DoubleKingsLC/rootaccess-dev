import prisma from "./db";

export interface ExternalStats {
  rank: string;
  points?: number;
  badges?: number;
  level?: string;
  percentile?: string;
  lastUpdated: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  verifyUrl: string;
  icon?: string;
}

export interface Report {
  id: string;
  title: string;
  date: string;
  type: 'Pentest' | 'Bug Bounty' | 'CTF' | 'Research';
  fileUrl: string;
  previewUrl?: string;
}

export interface UserProfile {
  username: string;
  displayName: string;
  title: string;
  bio: string;
  avatarUrl: string;
  location: string;
  website: string;
  memberSince: string;
  rootAccessRank: {
    tier: string;
    points: number;
    globalRank: number;
  };
  skills: {
    name: string;
    value: number; // 0-100
  }[];
  platforms: {
    tryhackme?: ExternalStats & { username: string };
    hackthebox?: ExternalStats & { username: string; userOwned: number; rootOwned: number };
    cyberdefenders?: ExternalStats & { username: string };
    btlo?: ExternalStats & { username: string };
  };
  certifications: Certification[];
  reports: Report[];
}

export async function getUserProfile(username: string): Promise<UserProfile | null> {
  try {
    const profile = await prisma.profile.findUnique({
      where: { username },
      include: {
        skills: true,
        platforms: true,
        certifications: true,
        reports: true,
      },
    });

    if (!profile) return null;

    // Map Prisma models to UserProfile interface
    const formattedProfile: UserProfile = {
      username: profile.username,
      displayName: profile.displayName,
      title: profile.title || "",
      bio: profile.bio || "",
      avatarUrl: profile.avatarUrl || "/avatars/default.png",
      location: profile.location || "Unknown",
      website: profile.website || "",
      memberSince: profile.memberSince.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
      rootAccessRank: {
        tier: profile.rankTier,
        points: profile.rankPoints,
        globalRank: profile.globalRank || 0,
      },
      skills: profile.skills.map(s => ({ name: s.name, value: s.value })),
      platforms: {},
      certifications: profile.certifications.map(c => ({
        id: c.id,
        name: c.name,
        issuer: c.issuer,
        date: c.date,
        verifyUrl: c.verifyUrl,
      })),
      reports: profile.reports.map(r => ({
        id: r.id,
        title: r.title,
        date: r.date,
        type: r.type as any,
        fileUrl: r.fileUrl,
      })),
    };

    // Map platform stats
    profile.platforms.forEach(p => {
      const stats: any = {
        username: p.username,
        rank: p.rank,
        points: p.points || 0,
        lastUpdated: p.lastUpdated.toISOString(),
        percentile: p.percentile || undefined,
      };

      if (p.platform === 'hackthebox') {
        stats.userOwned = p.userOwned || 0;
        stats.rootOwned = p.rootOwned || 0;
      }

      (formattedProfile.platforms as any)[p.platform] = stats;
    });

    return formattedProfile;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
