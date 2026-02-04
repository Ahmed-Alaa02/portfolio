"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { en, ar, Translations } from "@/locales";

type Language = "en" | "ar";

interface LanguageContextType {
  language: Language;
  translations: Translations;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  const [isHydrated, setIsHydrated] = useState(false);

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language;
    if (savedLanguage && (savedLanguage === "en" || savedLanguage === "ar")) {
      setLanguage(savedLanguage);
    }
    setIsHydrated(true);
  }, []);

  // Save language to localStorage when it changes
  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem("language", language);
    }
  }, [language, isHydrated]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "ar" : "en"));
  };

  const translations = language === "en" ? en : ar;
  const isRTL = language === "ar";

  // Update document direction and lang
  useEffect(() => {
    if (isHydrated) {
      document.documentElement.lang = language;
      document.documentElement.dir = isRTL ? "rtl" : "ltr";
    }
  }, [language, isRTL, isHydrated]);

  return (
    <LanguageContext.Provider
      value={{ language, translations, toggleLanguage, isRTL }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
