"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn, slideDown } from "@/lib/animations";
import { useLanguage } from "@/context/LanguageContext";
import { getAllSkillsFlat } from "@/data/skills";
import Magnetic from "@/components/ui/Magnetic";
import { SITE_CV_URL } from "@/config/site";
import { projectsData } from "@/data/projects";

export default function Hero() {
  const { translations, isRTL } = useLanguage();
  const t = translations.hero;
  const reduceMotion = useReducedMotion() ?? false;

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document
      .getElementById("contact-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const pillSkills = getAllSkillsFlat().slice(0, 6);

  const stats = t.stats.map((s, i) =>
    i === 1 ? { ...s, value: String(projectsData.length) } : s,
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-32 pb-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto w-full text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-9">
          <motion.div
            variants={slideDown}
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-matte-muted"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matte-teal opacity-50" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-matte-teal" />
            </span>
            {t.availability}
          </motion.div>

          <motion.div variants={slideDown} className="space-y-4">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-matte-text leading-[1.15]">
              {t.greeting}{" "}
              <span className="gradient-text italic">{t.name}</span>
            </h1>
            <p className="text-xl sm:text-2xl text-matte-secondary font-medium">
              {t.title}
            </p>
            <p className="text-base sm:text-lg text-matte-muted max-w-xl mx-auto leading-relaxed">
              {t.description}
            </p>
          </motion.div>

          <motion.div
            variants={slideDown}
            className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center"
          >
            <Magnetic className="inline-flex">
              <motion.button
                type="button"
                onClick={scrollToProjects}
                className={`btn-cyber-primary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base ${isRTL ? "flex-row-reverse" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.viewProjects}
                <svg
                  className={`w-5 h-5 ${isRTL ? "rtl-flip" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </motion.button>
            </Magnetic>

            {SITE_CV_URL ? (
              <motion.a
                href={SITE_CV_URL}
                download
                className={`btn-cyber-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base ${isRTL ? "flex-row-reverse" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                {t.downloadCv}
              </motion.a>
            ) : (
              <motion.button
                type="button"
                onClick={scrollToContact}
                className={`btn-cyber-secondary inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm sm:text-base ${isRTL ? "flex-row-reverse" : ""}`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {t.contactCta}
              </motion.button>
            )}
          </motion.div>

          <motion.div
            variants={slideDown}
            className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 max-w-xl mx-auto"
          >
            {pillSkills.map((s) => (
              <span
                key={s.name}
                className="inline-flex items-center gap-1.5 text-xs text-matte-muted"
                title={s.name}
              >
                <span className="text-base grayscale opacity-70">{s.icon}</span>
                <span className="hidden sm:inline font-medium">{s.name}</span>
              </span>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            className="flex items-center justify-center gap-8 sm:gap-12 pt-2"
          >
            {stats.map((s, i) => (
              <div
                key={i}
                className={
                  i > 0
                    ? "border-l rtl:border-l-0 rtl:border-r border-matte-border pl-8 sm:pl-12 rtl:pl-0 rtl:pr-8 sm:rtl:pr-12"
                    : ""
                }
              >
                <p className="text-2xl sm:text-3xl font-bold gradient-text leading-none">
                  {s.value}
                </p>
                <p className="text-xs sm:text-sm text-matte-muted mt-2 leading-snug">{s.label}</p>
              </div>
            ))}
          </motion.div>

          <motion.button
            type="button"
            variants={slideDown}
            onClick={scrollToProjects}
            className="inline-flex flex-col items-center gap-2 text-matte-muted hover:text-matte-gold text-sm transition-colors pt-2"
          >
            <span className="font-mono text-xs uppercase tracking-widest">
              {t.scrollExplore}
            </span>
            <span className="flex h-9 w-6 rounded-full border border-matte-border justify-center pt-2">
              <motion.span
                className="w-1 h-2 rounded-full bg-matte-gold"
                animate={
                  reduceMotion
                    ? {}
                    : { y: [0, 8, 0], opacity: [1, 0.4, 1] }
                }
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 1.8, repeat: Infinity, ease: "easeInOut" }
                }
              />
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
