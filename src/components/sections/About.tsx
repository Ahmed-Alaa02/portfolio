"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn, slideUp } from "@/lib/animations";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { translations } = useLanguage();
  const t = translations.about;

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            variants={slideUp}
          >
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </motion.h2>

          <motion.div
            className="glass rounded-xl p-8 md:p-12"
            variants={slideUp}
          >
            <div className="space-y-6 text-lg text-dark-400 leading-relaxed">
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
              <div>
                <p>{t.workedOn}</p>
                <ul className="list-disc list-inside">
                  {t.workedOnList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p>{t.committed}</p>
                <ul className="list-disc list-inside">
                  {t.committedList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
              <p>{t.callToAction}</p>
            </div>

            <motion.div
              className="mt-8 pt-8 border-t border-dark-200"
              variants={slideUp}
            >
              <h3 className="text-xl font-semibold mb-4 text-white">
                {t.coreValues}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {t.values.problemSolving.title}
                    </h4>
                    <p className="text-sm text-dark-400">
                      {t.values.problemSolving.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {t.values.continuousLearning.title}
                    </h4>
                    <p className="text-sm text-dark-400">
                      {t.values.continuousLearning.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {t.values.qualityFirst.title}
                    </h4>
                    <p className="text-sm text-dark-400">
                      {t.values.qualityFirst.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
