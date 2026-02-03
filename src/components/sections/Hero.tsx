"use client";

import { motion } from "framer-motion";
import { fadeIn, slideDown } from "@/lib/animations";

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById("projects");
    projectsSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="max-w-5xl mx-auto text-center">
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
            variants={slideDown}
          >
            Hi, I'm <span className="gradient-text">Ahmed Alaa</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl lg:text-3xl text-dark-500 mb-8"
            variants={slideDown}
          >
            Full-Stack Web Developer
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-dark-400 max-w-3xl mx-auto mb-12"
            variants={slideDown}
          >
            Applying engineering thinking to build reliable and scalable
            full-stack web applications. Clean architecture, performance, and
            maintainability first.
          </motion.p>

          <motion.button
            onClick={scrollToProjects}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold rounded-lg overflow-hidden transition-all duration-300 hover:scale-105 glow-on-hover"
            variants={slideDown}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">View Projects</span>
            <svg
              className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
