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
      className={`fixed top-0 inset-x-0 z-[100] border-b border-matte-border bg-matte-bg/95 transition-shadow duration-300 ${
        scrolled ? "shadow-lg shadow-black/30" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between gap-4 py-4"
          aria-label="Primary"
        >
          <button
            type="button"
            onClick={() => scrollTo("#home")}
            className="font-mono text-sm sm:text-base text-matte-text tracking-tight hover:text-matte-highlight transition-colors text-left"
          >
            <span className="text-matte-muted">&lt;</span>
            {brandSlug}
            <span className="text-matte-gold">.dev</span>
            <span className="text-matte-muted">/&gt;</span>
          </button>

          <ul className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navIds.map(({ key, href }) => (
              <li key={key}>
                <button
                  type="button"
                  onClick={() => scrollTo(href)}
                  className="px-3 py-2 text-sm text-matte-muted hover:text-matte-gold transition-colors"
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
              className="hidden sm:inline-flex items-center gap-2 px-3 py-2 rounded-full border border-matte-border text-xs font-medium text-matte-secondary hover:border-matte-gold/40 hover:text-matte-text transition-colors"
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
              className="lg:hidden p-2 rounded-full border border-matte-border text-matte-secondary"
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
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-matte-border bg-matte-bg overflow-hidden"
          >
            <ul className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-col ${isRTL ? "text-right" : "text-left"}`}>
              {navIds.map(({ key, href }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => scrollTo(href)}
                    className="w-full py-3 text-sm text-matte-secondary hover:text-matte-text"
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
                  className="w-full py-3 text-sm text-matte-gold"
                >
                  {translations.language.switchTo}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
