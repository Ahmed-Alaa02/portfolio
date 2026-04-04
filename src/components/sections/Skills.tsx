"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useLanguage } from "@/context/LanguageContext";

const skills = {
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
};

const SkillBadge = ({ skill }: { skill: { name: string; icon: string } }) => {
  return (
    <motion.div
      variants={staggerItem}
      className="group glass rounded-lg px-6 py-4 flex items-center gap-3 hover:bg-white/10 transition-all duration-300 cursor-default"
      whileHover={{ scale: 1.05, y: -4 }}
    >
      <span className="text-3xl group-hover:scale-110 transition-transform">
        {skill.icon}
      </span>
      <span className="font-medium text-dark-600 group-hover:text-white transition-colors">
        {skill.name}
      </span>
    </motion.div>
  );
};

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { translations } = useLanguage();
  const t = translations.skills;

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            variants={staggerItem}
          >
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </motion.h2>

          <motion.p
            className="text-dark-400 text-center mb-16 text-lg max-w-2xl mx-auto"
            variants={staggerItem}
          >
            {t.subtitle}
          </motion.p>

          {/* Frontend */}
          <motion.div className="mb-12" variants={staggerItem}>
            <h3 className="text-2xl font-semibold mb-6 text-primary-400">
              {t.frontend}
            </h3>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
            >
              {skills.frontend.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </motion.div>

          {/* Backend */}
          <motion.div className="mb-12" variants={staggerItem}>
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">
              {t.backend}
            </h3>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
            >
              {skills.backend.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </motion.div>

          {/* Tools */}
          <motion.div variants={staggerItem}>
            <h3 className="text-2xl font-semibold mb-6 text-pink-400">
              {t.tools}
            </h3>
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              variants={staggerContainer}
            >
              {skills.tools.map((skill) => (
                <SkillBadge key={skill.name} skill={skill} />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
