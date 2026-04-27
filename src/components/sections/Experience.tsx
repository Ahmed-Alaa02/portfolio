"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { useLanguage } from "@/context/LanguageContext";

export default function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { translations } = useLanguage();
  const t = translations.experience;
  const tag = translations.sections.experience;
  const n = t.milestones.length;
  const smGridCols =
    n <= 1
      ? "sm:grid-cols-1"
      : n === 2
        ? "sm:grid-cols-2"
        : n === 3
          ? "sm:grid-cols-3"
          : n === 4
            ? "sm:grid-cols-4"
            : "sm:grid-cols-5";

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="glass-strong rounded-3xl border border-matte-border p-6 sm:p-10 glow-border-hover"
        >
          <p className="section-tag">{tag}</p>
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-matte-text mb-2"
            variants={staggerItem}
          >
            {t.title}{" "}
            <span className="gradient-text">{t.titleHighlight}</span>
          </motion.h2>
          <motion.p
            className="text-matte-muted text-sm sm:text-base max-w-2xl mb-12"
            variants={staggerItem}
          >
            {t.subtitle}
          </motion.p>

          <motion.div variants={staggerItem} className="relative">
            <div
              className="absolute top-[11px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-matte-gold/40 to-transparent hidden sm:block"
              aria-hidden
            />
            <ul className={`grid grid-cols-1 gap-8 sm:gap-4 relative ${smGridCols}`}>
              {t.milestones.map((m, i) => {
                const isNow = m.year === "now";
                const label = isNow ? t.nowLabel : m.year;
                return (
                  <motion.li
                    key={`${m.year}-${i}`}
                    variants={staggerItem}
                    className="relative flex sm:flex-col items-start sm:items-center gap-4 sm:gap-6 text-left sm:text-center"
                  >
                    <div className="flex sm:flex-col items-center gap-3 sm:gap-0 w-full sm:w-auto">
                      <span className="sm:hidden w-2 h-2 rounded-full bg-matte-gold shadow-[0_0_12px_2px_rgba(201,169,110,0.35)] shrink-0 mt-1.5" />
                      <div className="hidden sm:flex relative z-10 w-6 h-6 rounded-full border-2 border-matte-gold bg-matte-bg shadow-[0_0_20px_-4px_rgba(201,169,110,0.35)] items-center justify-center">
                        <span className="w-2 h-2 rounded-full bg-matte-highlight" />
                      </div>
                      <span className="font-mono text-sm text-matte-gold sm:mt-4">
                        {label}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-matte-muted leading-relaxed sm:px-1">
                      {m.text}
                    </p>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
