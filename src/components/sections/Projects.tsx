"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import Swal from "sweetalert2";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLanguage } from "@/context/LanguageContext";
import { projectsData, type ProjectData } from "@/data/projects";

const ProjectCard = ({
  project,
  index,
}: {
  project: ProjectData;
  index: number;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const images = project.images || [];
  const { translations, isRTL } = useLanguage();
  const t = translations.projects;
  const projectTranslation = t.projectsList[project.titleKey];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (idx: number) => {
    setCurrentImageIndex(idx);
  };

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const handleRequestDemoDashboard = (e: React.MouseEvent) => {
    e.preventDefault();
    Swal.fire({
      title: t.requestDemoTitle,
      text: t.requestDemoDashboard,
      icon: "info",
      confirmButtonText: t.goToContact,
      confirmButtonColor: "#C9A96E",
      background: "#111315",
      color: "#F3F4F6",
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          document
            .getElementById("contact-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });
  };

  const handleRequestDemoTaskr = (e: React.MouseEvent) => {
    e.preventDefault();
    Swal.fire({
      title: t.requestDemoTitle,
      text: t.requestDemoTaskr,
      icon: "info",
      confirmButtonText: t.goToContact,
      confirmButtonColor: "#C9A96E",
      background: "#111315",
      color: "#F3F4F6",
    }).then((result) => {
      if (result.isConfirmed) {
        setTimeout(() => {
          document
            .getElementById("contact-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });
  };

  const slides = images.map((src) => ({ src }));
  const num = String(index + 1).padStart(2, "0");

  return (
    <>
      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={currentImageIndex}
        slides={slides}
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, 0.92)" },
        }}
      />

      <motion.article
        variants={staggerItem}
        className="group relative w-full min-w-0 h-full flex flex-col glass-strong rounded-2xl overflow-hidden glow-border-hover border border-matte-border"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
      >
        <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 font-mono text-4xl font-bold text-matte-text/10 group-hover:text-matte-gold/25 transition-colors">
          {num}
        </div>

        {images.length > 0 && (
          <div className="relative h-52 bg-matte-bg overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`${projectTranslation.title} screenshot ${currentImageIndex + 1}`}
                className="w-full h-full object-cover cursor-pointer"
                onClick={openLightbox}
                initial={{ opacity: 0, x: isRTL ? -100 : 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 100 : -100 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            <div className="absolute top-2 right-2 rtl:right-auto rtl:left-2 px-2 py-1 rounded-lg bg-matte-bg/75 text-[10px] text-matte-secondary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-matte-border">
              {t.clickToExpand}
            </div>

            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    prevImage();
                  }}
                  className={`absolute ${isRTL ? "right-2" : "left-2"} top-1/2 -translate-y-1/2 w-9 h-9 bg-matte-bg/70 hover:bg-matte-surface rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-matte-border`}
                  aria-label="Previous image"
                >
                  <svg
                    className={`w-4 h-4 text-matte-text ${isRTL ? "rotate-180" : ""}`}
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
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    nextImage();
                  }}
                  className={`absolute ${isRTL ? "left-2" : "right-2"} top-1/2 -translate-y-1/2 w-9 h-9 bg-matte-bg/70 hover:bg-matte-surface rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 border border-matte-border`}
                  aria-label="Next image"
                >
                  <svg
                    className={`w-4 h-4 text-matte-text ${isRTL ? "rotate-180" : ""}`}
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

            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToImage(idx);
                    }}
                    className={`h-1.5 rounded-full transition-all ${
                      idx === currentImageIndex
                        ? "w-6 bg-matte-gold"
                        : "w-2 bg-matte-secondary/35 hover:bg-matte-secondary/55"
                    }`}
                    aria-label={`Go to image ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="p-6 pt-5 relative z-10 flex-1 flex flex-col min-h-0">
          <h3 className="text-xl font-bold mb-2 text-matte-text group-hover:text-matte-highlight transition-colors">
            {projectTranslation.title}
          </h3>
          <p className="text-sm text-matte-muted mb-4 leading-relaxed line-clamp-3">
            {projectTranslation.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-[11px] rounded-lg bg-matte-elevated/50 text-matte-muted border border-matte-border"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex gap-2 mt-auto pt-2">
            {project.isRequestDemoDashboard ? (
              <button
                type="button"
                onClick={handleRequestDemoDashboard}
                className="flex-1 px-4 py-2.5 btn-cyber-primary text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {t.requestDemo}
              </button>
            ) : project.isRequestDemoTaskr ? (
              <button
                type="button"
                onClick={handleRequestDemoTaskr}
                className="flex-1 px-4 py-2.5 btn-cyber-primary text-sm rounded-xl flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                {t.requestDemo}
              </button>
            ) : (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2.5 btn-cyber-primary text-sm rounded-xl flex items-center justify-center gap-2 text-center"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
                {t.liveDemo}
              </a>
            )}
          </div>
        </div>
      </motion.article>
    </>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { translations } = useLanguage();
  const t = translations.projects;
  const tag = translations.sections.projects;

  const scrollToProjectsTop = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const projectCount = projectsData.length;
  const projectsGridClass =
    projectCount <= 1
      ? "grid-cols-1"
      : projectCount === 2
        ? "grid-cols-1 sm:grid-cols-2"
        : projectCount === 3
          ? "grid-cols-1 md:grid-cols-3"
          : "grid-cols-1 md:grid-cols-2 xl:grid-cols-4";

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="glass-strong rounded-3xl border border-matte-border p-6 sm:p-10 glow-border-hover"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
            <div>
              <p className="section-tag">{tag}</p>
              <motion.h2
                className="text-3xl md:text-4xl font-bold text-matte-text"
                variants={staggerItem}
              >
                {t.title}{" "}
                <span className="gradient-text">{t.titleHighlight}</span>
              </motion.h2>
              <motion.p
                className="text-matte-muted mt-3 max-w-xl text-sm sm:text-base"
                variants={staggerItem}
              >
                {t.subtitle}
              </motion.p>
            </div>
            <motion.button
              type="button"
              variants={staggerItem}
              onClick={scrollToProjectsTop}
              className="self-start sm:self-auto text-sm font-medium text-matte-gold hover:text-matte-highlight border border-matte-gold/35 hover:border-matte-highlight/55 rounded-full px-5 py-2.5 transition-colors"
            >
              {t.viewAll}
            </motion.button>
          </div>

          <motion.div
            variants={staggerContainer}
            className={`grid gap-6 ${projectsGridClass} items-stretch`}
          >
            {projectsData.map((project, i) => (
              <div key={project.id} className="min-w-0 w-full h-full">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
