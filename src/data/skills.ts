export const skillsData = {
  frontend: [
    { name: "HTML5", icon: "🌐" },
    { name: "CSS3", icon: "🎨" },
    { name: "JavaScript", icon: "⚡" },
    { name: "Bootstrap", icon: "💨" },
  ],
  backend: [
    { name: "PHP", icon: "🐘" },
    { name: "Laravel", icon: "🚂" },
    { name: "Python", icon: "🐍" },
    { name: "MySQL", icon: "💾" },
  ],
  tools: [
    { name: "Git", icon: "📦" },
    { name: "GitHub", icon: "🐙" },
    { name: "Wordpress", icon: "W" },
    { name: "Vercel", icon: "▲" },
  ],
} as const;

export type SkillEntry = { name: string; icon: string };

export function getAllSkillsFlat(): SkillEntry[] {
  return [
    ...skillsData.frontend,
    ...skillsData.backend,
    ...skillsData.tools,
  ];
}
