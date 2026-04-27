"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { fadeIn, slideDown } from "@/lib/animations";
import { useLanguage } from "@/context/LanguageContext";
import { getAllSkillsFlat } from "@/data/skills";
import Magnetic from "@/components/ui/Magnetic";
import { SITE_CV_URL } from "@/config/site";
import { projectsData } from "@/data/projects";

function FloatingOrb({
  className,
  delay = 0,
  reduceMotion,
}: {
  className: string;
  delay?: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className={`absolute rounded-2xl border border-matte-gold/20 bg-gradient-to-br from-matte-gold/12 to-matte-teal/8 shadow-[0_0_40px_-12px_rgba(201,169,110,0.22)] motion-safe-only ${className}`}
      animate={
        reduceMotion
          ? {}
          : {
              y: [0, -14, 0],
              rotate: [0, 4, -2, 0],
            }
      }
      transition={
        reduceMotion
          ? undefined
          : {
              duration: 6 + delay,
              repeat: Infinity,
              ease: "easeInOut",
              delay,
            }
      }
    />
  );
}

function CodeEditorMock({ stack }: { stack: string[] }) {
  const stackLine = `  stack: [${stack.map((s) => `"${s}"`).join(", ")}],`;
  const lines = [
    { c: "text-matte-muted", t: "// stack snapshot" },
    { c: "text-matte-gold", t: "const developer = {" },
    { c: "text-matte-teal", t: '  focus: ["full-stack", "UX", "reliability"],' },
    { c: "text-matte-secondary", t: stackLine },
    { c: "text-matte-gold", t: "};" },
  ];

  return (
    <div className="relative" style={{ perspective: "1100px" }}>
      <div
        className="relative rounded-2xl glass-strong border border-matte-gold/20 overflow-hidden shadow-[0_0_80px_-24px_rgba(201,169,110,0.2)]"
        style={{ transform: "rotateX(6deg) rotateY(-10deg)" }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-matte-border bg-matte-bg/55">
          <span className="w-3 h-3 rounded-full bg-red-500/75" />
          <span className="w-3 h-3 rounded-full bg-matte-highlight/85" />
          <span className="w-3 h-3 rounded-full bg-matte-teal/75" />
          <span className="ml-2 text-[10px] font-mono text-matte-muted truncate">
            workspace / portfolio
          </span>
        </div>
        <pre className="p-4 text-xs sm:text-sm font-mono leading-relaxed text-left rtl:text-right">
          {lines.map((line, i) => (
            <div key={i} className={line.c}>
              {line.t}
            </div>
          ))}
        </pre>
      </div>
      <div
        className="pointer-events-none absolute -inset-8 rounded-full opacity-40 blur-3xl bg-gradient-to-tr from-matte-gold/18 via-transparent to-matte-teal/12 -z-10"
        aria-hidden
      />
    </div>
  );
}

export default function Hero() {
  const { translations, isRTL } = useLanguage();
  const t = translations.hero;
  const reduceMotion = useReducedMotion() ?? false;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yVisual = useTransform(scrollYProgress, [0, 1], [0, 80]);

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
      ref={ref}
      id="home"
      className="relative min-h-screen flex items-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <motion.div
            className="lg:col-span-5 text-center lg:text-left rtl:lg:text-right space-y-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <motion.div
              variants={slideDown}
              className="inline-flex items-center gap-2 rounded-full border border-matte-teal/35 bg-matte-teal/10 px-4 py-2 text-xs sm:text-sm text-matte-teal"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-matte-teal opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-matte-teal shadow-[0_0_12px_2px_rgba(125,211,199,0.35)]" />
              </span>
              {t.availability}
            </motion.div>

            <motion.div variants={slideDown} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-matte-text leading-[1.1]">
                {t.greeting}{" "}
                <span className="gradient-text">{t.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-matte-secondary font-medium">
                {t.title}
              </p>
              <p className="text-base sm:text-lg text-matte-muted max-w-xl mx-auto lg:mx-0 rtl:lg:ms-0 rtl:lg:me-auto leading-relaxed">
                {t.description}
              </p>
            </motion.div>

            <motion.div
              variants={slideDown}
              className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start"
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
              className="glass rounded-2xl px-4 py-3 inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 max-w-xl mx-auto lg:mx-0 glow-border-hover border border-matte-border"
            >
              {pillSkills.map((s) => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-1.5 text-xs text-matte-muted"
                  title={s.name}
                >
                  <span className="text-lg grayscale hover:grayscale-0 transition-[filter]">
                    {s.icon}
                  </span>
                  <span className="hidden sm:inline font-medium">{s.name}</span>
                </span>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className="lg:col-span-4 relative flex justify-center min-h-[280px] lg:min-h-[420px]"
            style={{ y: yVisual }}
          >
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
              <motion.div
                className="absolute inset-0 rounded-full border border-matte-gold/12 motion-safe-only"
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 48, repeat: Infinity, ease: "linear" }
                }
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-matte-teal/12 motion-safe-only"
                animate={reduceMotion ? {} : { rotate: -360 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 64, repeat: Infinity, ease: "linear" }
                }
              />
              <FloatingOrb
                className="w-10 h-10 top-[8%] right-[12%]"
                delay={0}
                reduceMotion={reduceMotion}
              />
              <FloatingOrb
                className="w-14 h-14 bottom-[18%] left-[6%]"
                delay={0.8}
                reduceMotion={reduceMotion}
              />
              <FloatingOrb
                className="w-8 h-8 top-[40%] -left-[2%]"
                delay={1.2}
                reduceMotion={reduceMotion}
              />

              <div className="relative z-10 w-[88%]">
                <CodeEditorMock
                  stack={getAllSkillsFlat()
                    .slice(0, 4)
                    .map((s) => s.name)}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-3 flex flex-col gap-6 justify-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            <ul className="space-y-5">
              {stats.map((s, i) => (
                <motion.li
                  key={i}
                  variants={slideDown}
                  className="glass rounded-xl px-5 py-4 border border-matte-border glow-border-hover"
                >
                  <p className="text-2xl sm:text-3xl font-bold gradient-text leading-none">
                    {s.value}
                  </p>
                  <p className="text-sm text-matte-muted mt-2 leading-snug">{s.label}</p>
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              variants={slideDown}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="hidden lg:flex items-center gap-3 text-matte-muted hover:text-matte-gold text-sm mt-4 transition-colors self-end"
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
      </div>
    </section>
  );
}
