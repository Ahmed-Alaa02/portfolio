"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function LanguageSwitcher() {
  const { language, toggleLanguage, translations } = useLanguage();

  return (
    <motion.button
      onClick={toggleLanguage}
      className="fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2 glass rounded-full hover:bg-white/10 transition-all duration-300 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      {/* Globe Icon */}
      <svg
        className="w-5 h-5 text-primary-400 group-hover:text-primary-300 transition-colors"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
        />
      </svg>

      {/* Language Text */}
      <span className="font-medium text-sm text-dark-600 group-hover:text-white transition-colors">
        {translations.language.switchTo}
      </span>

      {/* Current Language Badge */}
      <span className="px-2 py-0.5 text-xs font-bold bg-primary-600/20 text-primary-400 rounded-full uppercase">
        {language}
      </span>
    </motion.button>
  );
}
