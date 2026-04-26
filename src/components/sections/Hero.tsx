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
      className={`absolute rounded-2xl border border-violet-500/20 bg-gradient-to-br from-violet-600/20 to-cyan-500/10 shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] motion-safe-only ${className}`}
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
    { c: "text-zinc-500", t: "// stack snapshot" },
    { c: "text-violet-300", t: "const developer = {" },
    { c: "text-cyan-300", t: '  focus: ["full-stack", "UX", "reliability"],' },
    { c: "text-zinc-300", t: stackLine },
    { c: "text-violet-300", t: "};" },
  ];

  return (
    <div className="relative" style={{ perspective: "1100px" }}>
      <div
        className="relative rounded-2xl glass-strong border border-violet-500/20 overflow-hidden shadow-[0_0_80px_-20px_rgba(124,58,237,0.45)]"
        style={{ transform: "rotateX(6deg) rotateY(-10deg)" }}
      >
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-amber-400/80" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
          <span className="ml-2 text-[10px] font-mono text-zinc-500 truncate">
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
        className="pointer-events-none absolute -inset-8 rounded-full opacity-40 blur-3xl bg-gradient-to-tr from-violet-600/30 via-transparent to-cyan-500/20 -z-10"
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
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm text-emerald-200/90"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400 shadow-[0_0_12px_2px_rgba(52,211,153,0.6)]" />
              </span>
              {t.availability}
            </motion.div>

            <motion.div variants={slideDown} className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                {t.greeting}{" "}
                <span className="gradient-text">{t.name}</span>
              </h1>
              <p className="text-xl sm:text-2xl text-zinc-400 font-medium">
                {t.title}
              </p>
              <p className="text-base sm:text-lg text-zinc-500 max-w-xl mx-auto lg:mx-0 rtl:lg:ms-0 rtl:lg:me-auto leading-relaxed">
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
              className="glass rounded-2xl px-4 py-3 inline-flex flex-wrap items-center justify-center lg:justify-start gap-3 max-w-xl mx-auto lg:mx-0 glow-border-hover border border-white/10"
            >
              {pillSkills.map((s) => (
                <span
                  key={s.name}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-400"
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
                className="absolute inset-0 rounded-full border border-violet-500/10 motion-safe-only"
                animate={reduceMotion ? {} : { rotate: 360 }}
                transition={
                  reduceMotion
                    ? undefined
                    : { duration: 48, repeat: Infinity, ease: "linear" }
                }
              />
              <motion.div
                className="absolute inset-4 rounded-full border border-cyan-500/10 motion-safe-only"
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
                  className="glass rounded-xl px-5 py-4 border border-white/10 glow-border-hover"
                >
                  <p className="text-2xl sm:text-3xl font-bold gradient-text leading-none">
                    {s.value}
                  </p>
                  <p className="text-sm text-zinc-500 mt-2 leading-snug">{s.label}</p>
                </motion.li>
              ))}
            </ul>

            <motion.button
              type="button"
              variants={slideDown}
              onClick={() =>
                document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
              }
              className="hidden lg:flex items-center gap-3 text-zinc-500 hover:text-zinc-300 text-sm mt-4 transition-colors self-end"
            >
              <span className="font-mono text-xs uppercase tracking-widest">
                {t.scrollExplore}
              </span>
              <span className="flex h-9 w-6 rounded-full border border-white/20 justify-center pt-2">
                <motion.span
                  className="w-1 h-2 rounded-full bg-violet-400"
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
