"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";

const projects = [
  {
    id: 1,
    title: "Ketan School Website",
    description:
      "A modern, responsive school website designed to present content clearly and deliver a smooth user experience.",
    tech: ["Laravel", "PHP", "MySQL", "API", "JavaScript", "Bootstrap"],
    liveUrl: "https://lms.cyberface-solutions.com/",
    images: [
      "images/projects/ketan-school/1.png",
      "images/projects/ketan-school/2.png",
      "images/projects/ketan-school/3.png",
    ],
  },
  {
    id: 2,
    title: "School LMS Dashboard",
    description:
      "Real-time weather application with location search, 7-day forecasts, and beautiful data visualizations.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Bootstrap", "Breeze"],
    liveUrl: "https://example.com",
    images: [
      "images/projects/lms-dashboard/1.png",
      "images/projects/lms-dashboard/2.png",
      "images/projects/lms-dashboard/3.png",
      "images/projects/lms-dashboard/4.png",
      "images/projects/lms-dashboard/5.png",
    ],
  },
  {
    id: 3,
    title: "TASKR - Task Management",
    description:
      "A lightweight task management app for creating, organizing, and tracking tasks with a clean and intuitive interface.",
    tech: ["PHP", "MySQL", "HTML 5", "CSS", "JavaScript", "Bootstrap"],
    liveUrl: "https://example.com",
    images: [
      "images/projects/taskr-app/1.png",
      "images/projects/taskr-app/2.png",
      "images/projects/taskr-app/3.png",
      "images/projects/taskr-app/4.png",
    ],
  },
];

const ProjectCard = ({ project }: { project: (typeof projects)[0] }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <motion.div
      variants={staggerItem}
      className="group relative glass rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300"
      whileHover={{ y: -8 }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary-500/0 to-purple-500/0 group-hover:from-primary-500/20 group-hover:to-purple-500/20 transition-all duration-300 -z-10"></div>

      {/* Image Slider */}
      {images.length > 0 && (
        <div className="relative h-48 bg-dark-100 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${project.title} screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}

          {/* Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? "bg-white w-6"
                      : "bg-white/50 hover:bg-white/70"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold mb-3 group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-dark-400 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm bg-dark-100 rounded-full text-dark-600 border border-dark-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="projects"
      className="min-h-screen py-20 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-4 text-center"
            variants={staggerItem}
          >
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>

          <motion.p
            className="text-dark-400 text-center mb-16 text-lg max-w-2xl mx-auto"
            variants={staggerItem}
          >
            A collection of my recent work showcasing modern web development
            skills and best practices.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
          >
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
