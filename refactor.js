const fs = require('fs');
const soc = fs.readFileSync('c:/rootaccess-dev/app/roadmaps/soc/career-path/page.tsx', 'utf8');
const ai = fs.readFileSync('c:/rootaccess-dev/app/roadmaps/ai-hacking/career-path/page.tsx', 'utf8');

// Extract AI LEVELS
const levelsMatch = ai.match(/const LEVELS: Level\[\] = \[([\s\S]*?)\] as const;/);
const aiLevels = levelsMatch[0];

// Extract AI ACTIONS
const actionsMatch = ai.match(/const ACTIONS: Action\[\] = \[([\s\S]*?)\] as const;/);
const aiActions = actionsMatch[0];

// In SOC code, replace its LEVELS and ACTIONS with AI's
let updated = soc.replace(/const LEVELS: Level\[\] = \[([\s\S]*?)\] as const;/, aiLevels);
updated = updated.replace(/const ACTIONS: Action\[\] = \[([\s\S]*?)\] as const;/, aiActions);

// Replace component names
updated = updated.replace(/SocCareerPathPage/g, 'AiHackingCareerPathPage');
updated = updated.replace(/MobileSocCareerPath/g, 'MobileAiHackingCareerPath');

// Replace Text
updated = updated.replace(/SOC Experience/g, 'AI Experience');
updated = updated.replace(/SOC Career Path/g, 'AI Hacking Career Path');
updated = updated.replace(/SOC Roadmap/g, 'AI Hacking Roadmap');
updated = updated.replace(/The SOC isn't just a career — it's the team that keeps the rest of us safe./g, 'The path to AI security is built on deep understanding and relentless experimentation.');
updated = updated.replace(/Every SOC analyst started somewhere./g, 'Every AI hacker started with one broken prompt.');

// Replace Colors
updated = updated.replace(/cyan-300/g, 'red-300');
updated = updated.replace(/cyan-400/g, 'red-400');
updated = updated.replace(/cyan-500/g, 'red-500');
updated = updated.replace(/cyan-950/g, 'red-950');
updated = updated.replace(/emerald-400/g, 'red-500'); // Hero text color
updated = updated.replace(/rgba\(52,211,153/g, 'rgba(239,68,68'); // Emerald glow to red
updated = updated.replace(/rgba\(34,211,238/g, 'rgba(239,68,68'); // Cyan glow to red
updated = updated.replace(/#22d3ee/g, '#ef4444'); // Hex cyan to red
updated = updated.replace(/bg-gradient-to-r from-transparent via-cyan-500\/30 to-transparent/g, 'bg-gradient-to-r from-transparent via-red-500/30 to-transparent');

// Hero text specific replacements
updated = updated.replace(/Wondering where<br \/>to begin\?/g, 'Want to hack<br />AI systems?');
updated = updated.replace(/The Blueprint to Perfection/g, 'The Path to Dominance');
updated = updated.replace(/Distilled from community discussions and industry standards. We've mapped out the precise skills, tools, and certifications you need—from your first lab to leading the SOC./g, 'Mapped across five levels with the exact skills, tools, and certifications you need—from your first jailbreak to leading global AI red teams.');
updated = updated.replace(/This is the ultimate, battle-tested roadmap for your cybersecurity career./g, 'This is the ultimate, research-backed roadmap for your AI security career.');

// Make sure the link back goes to ai-hacking
updated = updated.replace(/\/roadmaps\/soc/g, '/roadmaps/ai-hacking');
updated = updated.replace(/Back to AI Hacking Roadmap/g, 'Back to AI Experience'); // Fix duplicate meaning
updated = updated.replace(/AI Hacking Career Path Experience/g, 'AI Experience');

fs.writeFileSync('c:/rootaccess-dev/app/roadmaps/ai-hacking/career-path/page.tsx', updated);
console.log('Done!');
