"use client";

import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import Navbar from "@/components/Navbar";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { translations } = useLanguage();
  const t = translations.footer;

  return (
    <div className="page-cyber-bg">
      <div className="noise-overlay motion-safe-only" aria-hidden />
      <div className="page-cyber-inner">
        <Navbar />
        <main className="min-h-screen">
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />

          <footer className="py-10 px-4 sm:px-6 border-t border-matte-border">
            <div className="max-w-7xl mx-auto text-center text-matte-muted text-sm">
              <p>
                © {new Date().getFullYear()} {t.copyright}{" "}
                <span className="text-matte-gold/90">Next.js</span>,{" "}
                <span className="text-matte-teal/85">Tailwind CSS</span>
              </p>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
