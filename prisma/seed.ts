const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const ghostRef = '11111111-1111-1111-1111-111111111111' // Placeholder UUID

  console.log('Seeding Ghost Operator...')

  const profile = await prisma.profile.upsert({
    where: { username: 'ghost-operator' },
    update: {},
    create: {
      id: ghostRef,
      username: 'ghost-operator',
      displayName: 'Ghost Operator',
      title: 'Lead Security Researcher',
      bio: 'Specializing in Red Teaming and Cloud Security. Passionate about automating adversarial simulations and finding innovative ways to bypass modern defenses.',
      avatarUrl: '/avatars/ghost.png',
      location: 'Digital Void',
      website: 'https://ghost-ops.io',
      rankTier: 'Elite',
      rankPoints: 12450,
      globalRank: 42,
      skills: {
        create: [
          { name: 'Web Hacking', value: 95 },
          { name: 'Network Pentesting', value: 88 },
          { name: 'Cloud Security', value: 92 },
          { name: 'Binary Exploitation', value: 75 },
          { name: 'Social Engineering', value: 82 },
          { name: 'OSINT', value: 90 },
        ],
      },
      platforms: {
        create: [
          { 
            platform: 'tryhackme', 
            username: 'ghost_ops', 
            rank: 'Godel', 
            points: 45000, 
            badges: 120, 
            percentile: 'Top 1%' 
          },
          { 
            platform: 'hackthebox', 
            username: 'ghost_htb', 
            rank: 'Omniscient', 
            userOwned: 154, 
            rootOwned: 142, 
            points: 850 
          },
          { 
            platform: 'cyberdefenders', 
            username: 'ghost_cd', 
            rank: 'Expert', 
            points: 12000 
          },
          { 
            platform: 'btlo', 
            username: 'ghost_btlo', 
            rank: 'Investigator', 
            points: 5400 
          },
        ],
      },
      certifications: {
        create: [
          { name: 'OSCP', issuer: 'OffSec', date: '2023-05-12', verifyUrl: '#' },
          { name: 'CISSP', issuer: 'ISC2', date: '2024-01-15', verifyUrl: '#' },
          { name: 'AWSEC', issuer: 'Amazon', date: '2023-11-20', verifyUrl: '#' },
        ],
      },
      reports: {
        create: [
          { title: 'Enterprise Network Assessment', date: '2024-02-10', type: 'Pentest', fileUrl: '#' },
          { title: 'Critical Auth Bypass in Fintech App', date: '2024-03-05', type: 'Bug Bounty', fileUrl: '#' },
        ],
      },
    },
  })

  console.log('Seed complete:', profile.username)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
