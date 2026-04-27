"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

const navIds = [
  { key: "home", href: "#home" },
  { key: "about", href: "#about" },
  { key: "projects", href: "#projects" },
  { key: "skills", href: "#skills" },
  { key: "experience", href: "#experience" },
  { key: "contact", href: "#contact-section" },
] as const;

export default function Navbar() {
  const { translations, toggleLanguage, language, isRTL } = useLanguage();
  const t = translations.nav;
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const brandSlug = translations.hero.logoSlug;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-[100] transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`glass-strong rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4 border border-matte-border ${
            scrolled ? "shadow-lg shadow-black/40" : ""
          }`}
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="font-mono text-sm sm:text-base text-matte-text tracking-tight hover:text-matte-highlight transition-colors text-left"
          >
            <span className="text-matte-gold/90">&lt;</span>
            {brandSlug}
            <span className="text-matte-teal/90">.dev</span>
            <span className="text-matte-gold/90">/&gt;</span>
          </button>

          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navIds.map(({ key, href }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="px-3 py-2 text-sm text-matte-muted hover:text-matte-gold rounded-lg hover:bg-matte-elevated/40 transition-colors"
                >
                  {t[key]}
                </button>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={toggleLanguage}
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-matte-border bg-matte-surface/50 text-xs font-medium text-matte-secondary hover:border-matte-gold/40 hover:text-matte-text transition-colors"
              aria-label={`Switch language to ${language === "en" ? "Arabic" : "English"}`}
            >
              <span className="opacity-70">Aa</span>
              <span className="text-matte-gold">{translations.language.switchTo}</span>
            </button>

            <button
              type="button"
              onClick={() => scrollTo("#contact-section")}
              className="hidden sm:inline-flex btn-cyber-primary px-4 py-2.5 text-sm"
            >
              {t.letsTalk}
            </button>

            <button
              type="button"
              className="lg:hidden p-2 rounded-lg border border-matte-border text-matte-secondary"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">Menu</span>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="lg:hidden mt-2 glass-strong rounded-2xl border border-matte-border overflow-hidden"
            >
              <ul className={`py-2 flex flex-col ${isRTL ? "text-right" : "text-left"}`}>
                {navIds.map(({ key, href }) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => scrollTo(href)}
                      className="w-full px-4 py-3 text-sm text-matte-secondary hover:bg-matte-elevated/35 hover:text-matte-text"
                    >
                      {t[key]}
                    </button>
                  </li>
                ))}
                <li className="border-t border-matte-border mt-1 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      toggleLanguage();
                      setOpen(false);
                    }}
                    className="w-full px-4 py-3 text-sm text-matte-gold"
                  >
                    {translations.language.switchTo}
                  </button>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
