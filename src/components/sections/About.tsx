"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn, slideUp } from "@/lib/animations";
import { useLanguage } from "@/context/LanguageContext";
import { en } from "@/locales";
import Magnetic from "@/components/ui/Magnetic";

// Always derived from the Latin name, even in Arabic: this is a design
// monogram (same idea as the Latin `<slug.dev/>` mark in the nav), not
// translated content, and naively slicing Arabic initials produces
// isolated letterforms that render as visually disconnected glyphs.
const avatarInitials = en.hero.name
  .split(/\s+/)
  .map((w) => w[0])
  .join("")
  .slice(0, 3)
  .toUpperCase();

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

  return (
    <section id="about" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="border-t border-matte-border pt-14 sm:pt-16"
        >
          <p className="section-tag">{tag}</p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              variants={slideUp}
              className="relative mx-auto w-full max-w-md"
            >
              <div
                className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-matte-gold/18 via-matte-highlight/8 to-transparent blur-2xl opacity-70 motion-safe-only"
                aria-hidden
              />
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-matte-gold/25 bg-matte-surface shadow-[0_0_60px_-18px_rgba(201,169,110,0.22)]">
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-matte-elevated/55 to-matte-bg/90">
                  <span
                    className="font-serif text-6xl sm:text-7xl font-normal gradient-text italic select-none"
                    dir="ltr"
                  >
                    {avatarInitials}
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
            </motion.div>

            <motion.div
              variants={slideUp}
              className="space-y-6 text-matte-muted"
            >
              <h2 className="font-serif text-3xl md:text-4xl font-normal text-matte-text">
                {t.title}{" "}
                <span className="gradient-text italic">{t.titleHighlight}</span>
              </h2>

              <div className="space-y-4 text-sm sm:text-base leading-relaxed">
                <p>
                  {t.intro}{" "}
                  <span className="text-matte-text font-semibold">
                    {t.role}
                  </span>{" "}
                  {t.introText}
                </p>
                <p>{t.specialize}</p>
                <p>
                  {t.whatSetsApart}{" "}
                  <span className="text-matte-text font-semibold">
                    {t.engineeringMindset}
                  </span>
                  {t.mindsetText}
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-mono text-matte-gold/85 mb-2">
                    + {t.workedOn}
                  </p>
                  <ul className="space-y-2">
                    {t.workedOnList.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm text-matte-muted"
                      >
                        <span className="text-matte-gold shrink-0">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-mono text-matte-teal/85 mb-2">
                    + {t.committed}
                  </p>
                  <ul className="space-y-2">
                    {t.committedList.map((item, index) => (
                      <li
                        key={index}
                        className="flex gap-2 text-sm text-matte-muted"
                      >
                        <span className="text-matte-teal shrink-0">+</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-matte-border">
                <h3 className="text-sm font-mono text-matte-muted mb-4">
                  {t.coreValues}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="glass rounded-xl p-4 border border-matte-border">
                    <h4 className="font-semibold text-matte-text text-sm mb-1">
                      {t.values.problemSolving.title}
                    </h4>
                    <p className="text-xs text-matte-muted leading-relaxed">
                      {t.values.problemSolving.description}
                    </p>
                  </div>
                  <div className="glass rounded-xl p-4 border border-matte-border">
                    <h4 className="font-semibold text-matte-text text-sm mb-1">
                      {t.values.continuousLearning.title}
                    </h4>
                    <p className="text-xs text-matte-muted leading-relaxed">
                      {t.values.continuousLearning.description}
                    </p>
                  </div>
                  <div className="glass rounded-xl p-4 border border-matte-border">
                    <h4 className="font-semibold text-matte-text text-sm mb-1">
                      {t.values.qualityFirst.title}
                    </h4>
                    <p className="text-xs text-matte-muted leading-relaxed">
                      {t.values.qualityFirst.description}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-matte-muted">
                {t.callToAction}
              </p>

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
