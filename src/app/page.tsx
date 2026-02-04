"use client";

import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function Home() {
  const { translations } = useLanguage();
  const t = translations.footer;

  return (
    <main className="min-h-screen">
      <LanguageSwitcher />
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-200">
        <div className="max-w-7xl mx-auto text-center text-dark-400">
          <p className="text-sm">
            © {new Date().getFullYear()} {t.copyright}{" "}
            <span className="text-primary-500">Next.js</span>,{" "}
            <span className="text-primary-500">Tailwind CSS</span>
          </p>
        </div>
      </footer>
    </main>
  );
}
