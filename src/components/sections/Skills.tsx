"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useMemo } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useLanguage } from "@/context/LanguageContext";
import { getAllSkillsFlat } from "@/data/skills";

function HexTile({
  skill,
  highlighted,
}: {
  skill: { name: string; icon: string };
  highlighted: boolean;
}) {
  return (
    <motion.div
      variants={staggerItem}
      className="relative w-[4.5rem] h-[5rem] sm:w-[5.25rem] sm:h-[5.75rem] flex items-center justify-center"
      style={{ marginRight: "-0.25rem", marginBottom: "-0.5rem" }}
      whileHover={{ scale: 1.06, zIndex: 10 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center [clip-path:polygon(50%_0%,100%_25%,100%_75%,50%_100%,0%_75%,0%_25%)] border transition-all duration-300 ${
          highlighted
            ? "bg-violet-600/25 border-violet-400/50 shadow-[0_0_28px_-6px_rgba(124,58,237,0.65)]"
            : "bg-white/[0.04] border-white/10 hover:border-violet-500/30"
        }`}
      />
      <div className="relative z-10 flex flex-col items-center gap-1 px-2 text-center">
        <span className="text-2xl sm:text-3xl leading-none">{skill.icon}</span>
        <span className="text-[10px] sm:text-[11px] font-medium text-zinc-400 leading-tight max-w-[4.5rem] truncate">
          {skill.name}
        </span>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { translations } = useLanguage();
  const t = translations.skills;
  const tag = translations.sections.skills;
  const all = getAllSkillsFlat();

  const { rows, highlightSet } = useMemo(() => {
    const chunkSize = 4;
    const r: (typeof all)[] = [];
    for (let i = 0; i < all.length; i += chunkSize) {
      r.push(all.slice(i, i + chunkSize));
    }
    // Glow the full second row (backend stack: PHP, Laravel, Python, MySQL) so none look "turned off"
    const set = new Set<number>();
    const row2Start = chunkSize;
    const row2End = Math.min(row2Start + chunkSize, all.length);
    for (let i = row2Start; i < row2End; i++) set.add(i);
    return { rows: r, highlightSet: set };
  }, [all]);

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="glass-strong rounded-3xl border border-white/10 p-6 sm:p-10 glow-border-hover"
        >
          <p className="section-tag">{tag}</p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-white mb-3"
            variants={staggerItem}
          >
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </motion.h2>
          <motion.p
            className="text-zinc-500 mb-10 max-w-2xl text-sm sm:text-base"
            variants={staggerItem}
          >
            {t.subtitle}
          </motion.p>

          <motion.div
            variants={staggerItem}
            className="flex flex-col items-center justify-center py-4"
          >
            <div className="inline-flex flex-col items-center gap-0">
              {rows.map((row, rowIdx) => {
                const offset = rowIdx % 2 === 1;
                let globalBase = 0;
                for (let r = 0; r < rowIdx; r++) globalBase += rows[r].length;
                return (
                  <div
                    key={rowIdx}
                    className={`flex ${offset ? "translate-x-[2.25rem] sm:translate-x-[2.625rem]" : ""}`}
                  >
                    {row.map((skill, colIdx) => {
                      const globalIdx = globalBase + colIdx;
                      return (
                        <HexTile
                          key={`${skill.name}-${globalIdx}`}
                          skill={skill}
                          highlighted={highlightSet.has(globalIdx)}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.p
            variants={staggerItem}
            className="text-center text-xs text-zinc-600 font-mono mt-6"
          >
            {t.frontend} · {t.backend} · {t.tools}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
