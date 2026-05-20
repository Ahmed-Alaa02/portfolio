"use client";

import { AnimatePresence, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useLanguage } from "@/context/LanguageContext";
import { projectsData, type ProjectData } from "@/data/projects";
import { staggerContainer, staggerItem } from "@/lib/animations";

type ProjectAction = "dashboard" | "taskr";

const getActionType = (project: ProjectData): ProjectAction | null => {
  if (project.isRequestDemoDashboard) return "dashboard";
  if (project.isRequestDemoTaskr) return "taskr";
  return null;
};

const ProjectCard = ({
  project,
  index,
  onOpen,
  onRequestDemo,
}: {
  project: ProjectData;
  index: number;
  onOpen: (project: ProjectData) => void;
  onRequestDemo: (action: ProjectAction) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = project.images || [];
  const { translations, isRTL } = useLanguage();
  const t = translations.projects;
  const projectTranslation = t.projectsList[project.titleKey];
  const num = String(index + 1).padStart(2, "0");
  const actionType = getActionType(project);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToImage = (idx: number) => {
    setCurrentImageIndex(idx);
  };

  const openFromKeyboard = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(project);
    }
  };

  return (
    <motion.article
      layoutId={`project-card-${project.id}`}
      variants={staggerItem}
      role="button"
      tabIndex={0}
      aria-label={`${t.openDetails}: ${projectTranslation.title}`}
      onClick={() => onOpen(project)}
      onKeyDown={openFromKeyboard}
      className="group relative w-full min-w-0 h-full flex flex-col glass-strong rounded-2xl overflow-hidden glow-border-hover border border-matte-border cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-matte-teal"
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 24 }}
    >
      <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-20 font-mono text-4xl font-bold text-matte-text/10 group-hover:text-matte-gold/25 transition-colors">
        {num}
      </div>

      {images.length > 0 && (
        <motion.div
          layoutId={`project-image-${project.id}`}
          className="relative h-52 bg-matte-bg overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={`${projectTranslation.title} screenshot ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
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
        </motion.div>
      )}

      <div className="p-6 pt-5 relative z-10 flex-1 flex flex-col min-h-0">
        <motion.h3
          layoutId={`project-title-${project.id}`}
          className="text-xl font-bold mb-2 text-matte-text group-hover:text-matte-highlight transition-colors"
        >
          {projectTranslation.title}
        </motion.h3>
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
          {actionType ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRequestDemo(actionType);
              }}
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
              onClick={(e) => e.stopPropagation()}
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
  );
};

const ProjectDetailsModal = ({
  project,
  onClose,
  onRequestDemo,
}: {
  project: ProjectData;
  onClose: () => void;
  onRequestDemo: (action: ProjectAction) => void;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { translations, isRTL } = useLanguage();
  const t = translations.projects;
  const projectTranslation = t.projectsList[project.titleKey];
  const images = project.images || [];
  const slides = images.map((src) => ({ src }));
  const actionType = getActionType(project);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

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

      <motion.div
        className="fixed inset-0 z-50 overflow-y-auto px-4 py-5 sm:py-8"
        role="dialog"
        aria-modal="true"
        aria-label={`${t.projectDetails}: ${projectTranslation.title}`}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        <motion.div
          className="fixed inset-0 bg-matte-bg/82 backdrop-blur-xl"
          aria-hidden="true"
        />
        <div className="relative z-10 min-h-full flex items-center justify-center">
          <motion.article
            layoutId={`project-card-${project.id}`}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-matte-gold/25 bg-matte-surface/95 shadow-[0_40px_120px_-50px_rgba(201,169,110,0.55)]"
            transition={{ type: "spring", stiffness: 230, damping: 28 }}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label={t.closeDetails}
              className="absolute right-4 top-4 rtl:right-auto rtl:left-4 z-30 w-10 h-10 rounded-full border border-matte-border bg-matte-bg/80 text-matte-secondary hover:text-matte-text hover:border-matte-gold/60 transition-colors flex items-center justify-center"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <motion.div
                layoutId={`project-image-${project.id}`}
                className="relative min-h-[280px] sm:min-h-[420px] lg:min-h-[620px] bg-matte-bg overflow-hidden"
              >
                {images.length > 0 && (
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={images[currentImageIndex]}
                      alt={`${projectTranslation.title} screenshot ${currentImageIndex + 1}`}
                      onClick={() => setLightboxOpen(true)}
                      className="absolute inset-0 w-full h-full object-cover cursor-zoom-in"
                      initial={{ opacity: 0, scale: 1.03, x: isRTL ? -40 : 40 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.98, x: isRTL ? 40 : -40 }}
                      transition={{ duration: 0.34, ease: "easeOut" }}
                    />
                  </AnimatePresence>
                )}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-matte-bg/90 to-transparent pointer-events-none" />

                {images.length > 1 && (
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-4">
                    <div className="flex gap-2">
                      {images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setCurrentImageIndex(idx)}
                          className={`h-1.5 rounded-full transition-all ${
                            idx === currentImageIndex
                              ? "w-9 bg-matte-gold"
                              : "w-3 bg-matte-text/35 hover:bg-matte-text/60"
                          }`}
                          aria-label={`Go to image ${idx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={prevImage}
                        className="w-10 h-10 rounded-full border border-matte-border bg-matte-bg/75 text-matte-text hover:border-matte-gold/60 transition-colors flex items-center justify-center"
                        aria-label="Previous image"
                      >
                        <svg
                          className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
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
                        onClick={nextImage}
                        className="w-10 h-10 rounded-full border border-matte-border bg-matte-bg/75 text-matte-text hover:border-matte-gold/60 transition-colors flex items-center justify-center"
                        aria-label="Next image"
                      >
                        <svg
                          className={`w-4 h-4 ${isRTL ? "rotate-180" : ""}`}
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
                    </div>
                  </div>
                )}
              </motion.div>

              <div className="relative p-6 sm:p-8 lg:p-10 flex flex-col">
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-matte-gold/50 to-transparent lg:hidden" />
                <p className="section-tag">{t.projectDetails}</p>
                <motion.h3
                  layoutId={`project-title-${project.id}`}
                  className="text-3xl sm:text-4xl font-bold text-matte-text mb-4"
                >
                  {projectTranslation.title}
                </motion.h3>
                <p className="text-base text-matte-secondary leading-relaxed mb-4">
                  {projectTranslation.description}
                </p>
                <p className="text-sm sm:text-base text-matte-muted leading-7 mb-8">
                  {projectTranslation.fullDescription}
                </p>

                <div className="mb-8">
                  <h4 className="text-sm font-semibold text-matte-highlight mb-3">
                    {t.techStack}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1.5 text-xs rounded-full bg-matte-elevated/65 text-matte-secondary border border-matte-border"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                  {actionType ? (
                    <button
                      type="button"
                      onClick={() => onRequestDemo(actionType)}
                      className="px-5 py-3 btn-cyber-primary text-sm rounded-full flex items-center justify-center gap-2"
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
                      className="px-5 py-3 btn-cyber-primary text-sm rounded-full flex items-center justify-center gap-2"
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

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3 btn-cyber-secondary text-sm rounded-full flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 2C6.477 2 2 6.59 2 12.253c0 4.529 2.862 8.369 6.839 9.725.5.094.683-.222.683-.494 0-.244-.009-.891-.014-1.749-2.782.62-3.369-1.376-3.369-1.376-.455-1.185-1.11-1.5-1.11-1.5-.908-.636.069-.623.069-.623 1.004.073 1.532 1.057 1.532 1.057.892 1.567 2.341 1.115 2.91.852.091-.663.35-1.115.636-1.371-2.221-.259-4.555-1.139-4.555-5.069 0-1.12.39-2.035 1.03-2.752-.104-.26-.447-1.302.098-2.714 0 0 .84-.276 2.75 1.052A9.38 9.38 0 0 1 12 6.93a9.37 9.37 0 0 1 2.504.345c1.909-1.328 2.747-1.052 2.747-1.052.547 1.412.203 2.454.1 2.714.64.717 1.028 1.632 1.028 2.752 0 3.94-2.337 4.807-4.566 5.061.359.318.678.944.678 1.902 0 1.372-.012 2.478-.012 2.815 0 .274.18.593.688.493C19.14 20.618 22 16.778 22 12.253 22 6.59 17.523 2 12 2Z" />
                      </svg>
                      {t.github}
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </div>
      </motion.div>
    </>
  );
};

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const { translations } = useLanguage();
  const t = translations.projects;
  const tag = translations.sections.projects;

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [selectedProject]);

  const handleRequestDemo = (action: ProjectAction) => {
    Swal.fire({
      title: t.requestDemoTitle,
      text: action === "dashboard" ? t.requestDemoDashboard : t.requestDemoTaskr,
      icon: "info",
      confirmButtonText: t.goToContact,
      confirmButtonColor: "#C9A96E",
      background: "#111315",
      color: "#F3F4F6",
    }).then((result) => {
      if (result.isConfirmed) {
        setSelectedProject(null);
        setTimeout(() => {
          document
            .getElementById("contact-section")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
    });
  };

  const projectsGridClass = "grid-cols-1 md:grid-cols-2";

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
          <div className="mb-10">
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
          </div>

          <motion.div
            variants={staggerContainer}
            className={`grid gap-6 ${projectsGridClass} items-stretch`}
          >
            {projectsData.map((project, i) => (
              <div key={project.id} className="min-w-0 w-full h-full">
                <ProjectCard
                  project={project}
                  index={i}
                  onOpen={setSelectedProject}
                  onRequestDemo={handleRequestDemo}
                />
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailsModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onRequestDemo={handleRequestDemo}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
