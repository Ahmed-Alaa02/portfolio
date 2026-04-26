"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn, slideUp } from "@/lib/animations";
import { useLanguage } from "@/context/LanguageContext";
import Magnetic from "@/components/ui/Magnetic";
import { getAllSkillsFlat } from "@/data/skills";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { translations, isRTL } = useLanguage();
  const t = translations.about;
  const tag = translations.sections.about;

  const scrollContact = () => {
    document
      .getElementById("contact-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const jsonSnippet = {
    name: translations.hero.name,
    role: translations.hero.title,
    focus: [
      t.values.problemSolving.title,
      t.values.continuousLearning.title,
      t.values.qualityFirst.title,
    ],
    stack: getAllSkillsFlat().slice(0, 6).map((s) => s.name),
  };

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="glass-strong rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-12 glow-border-hover overflow-hidden"
        >
          <p className="section-tag">{tag}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div variants={slideUp} className="relative mx-auto w-full max-w-md">
              <div
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-violet-600/40 via-fuchsia-500/20 to-cyan-500/25 blur-2xl opacity-80 motion-safe-only"
                aria-hidden
              />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-violet-500/20 bg-zinc-900/80 shadow-[0_0_60px_-15px_rgba(124,58,237,0.45)]">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-zinc-800/50 to-black/80">
                  <span className="text-6xl sm:text-7xl font-bold gradient-text select-none">
                    {translations.hero.name
                      .split(/\s+/)
                      .map((w) => w[0])
                      .join("")
                      .slice(0, 3)
                      .toUpperCase()}
                  </span>
                </div>
                <div
                  className="absolute inset-0 opacity-30 mix-blend-soft-light pointer-events-none"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.25), transparent 45%)",
                  }}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.5 }}
                className={`absolute -bottom-4 ${isRTL ? "-left-2" : "-right-2"} w-[min(100%,280px)] glass rounded-xl border border-white/15 p-4 shadow-xl`}
              >
                <p className="text-[10px] font-mono text-violet-300/90 mb-2">
                  {t.codeCardTitle}
                </p>
                <pre className="text-[10px] sm:text-xs font-mono text-zinc-400 leading-relaxed overflow-x-auto text-left rtl:text-right">
                  {JSON.stringify(jsonSnippet, null, 2)}
                </pre>
              </motion.div>
            </motion.div>

            <motion.div variants={slideUp} className="space-y-6 text-zinc-400">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t.title}{" "}
                <span className="gradient-text">{t.titleHighlight}</span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  {t.intro}{" "}
                  <span className="text-white font-semibold">{t.role}</span>{" "}
                  {t.introText}
                </p>
                <p>{t.specialize}</p>
                <p>
                  {t.whatSetsApart}{" "}
                  <span className="text-white font-semibold">
                    {t.engineeringMindset}
                  </span>
                  {t.mindsetText}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-mono text-violet-300/80 mb-2">+ {t.workedOn}</p>
                  <ul className="space-y-2">
                    {t.workedOnList.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm text-zinc-500"
                      >
                        <span className="text-violet-400 shrink-0">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-mono text-cyan-300/80 mb-2">+ {t.committed}</p>
                  <ul className="space-y-2">
                    {t.committedList.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm text-zinc-500"
                      >
                        <span className="text-cyan-400 shrink-0">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <h3 className="text-sm font-mono text-zinc-500 mb-4">
                  {t.coreValues}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="glass rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-white text-sm mb-1">
                      {t.values.problemSolving.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {t.values.problemSolving.description}
                    </p>
                  </div>
                  <div className="glass rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-white text-sm mb-1">
                      {t.values.continuousLearning.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {t.values.continuousLearning.description}
                    </p>
                  </div>
                  <div className="glass rounded-xl p-4 border border-white/10">
                    <h4 className="font-semibold text-white text-sm mb-1">
                      {t.values.qualityFirst.title}
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed">
                      {t.values.qualityFirst.description}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-500">{t.callToAction}</p>

              <Magnetic className="inline-flex">
                <motion.button
                  type="button"
                  onClick={scrollContact}
                  className={`btn-cyber-primary inline-flex items-center gap-2 px-6 py-3 text-sm ${isRTL ? "flex-row-reverse" : ""}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.connectCta}
                  <svg
                    className={`w-4 h-4 ${isRTL ? "rtl-flip" : ""}`}
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
