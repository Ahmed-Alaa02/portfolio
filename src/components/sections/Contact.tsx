"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { fadeIn, slideUp } from "@/lib/animations";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useLanguage } from "@/context/LanguageContext";
import Magnetic from "@/components/ui/Magnetic";

const EMAILJS_SERVICE_ID = "service_e6vgwyh";
const EMAILJS_TEMPLATE_ID = "template_l6kd1ev";
const EMAILJS_PUBLIC_KEY = "uVdXhgcBD9eT8lK4S";

const EMAIL = "ahmed.alaa02@outlook.com";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { translations, isRTL } = useLanguage();
  const t = translations.contact;
  const tag = translations.sections.contact;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
        },
        EMAILJS_PUBLIC_KEY,
      );

      Swal.fire({
        title: t.alerts.successTitle,
        text: t.alerts.successText,
        icon: "success",
        confirmButtonText: t.alerts.successButton,
        confirmButtonColor: "#C9A96E",
        background: "#111315",
        color: "#F3F4F6",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch {
      Swal.fire({
        title: t.alerts.errorTitle,
        text: t.alerts.errorText,
        icon: "error",
        confirmButtonText: t.alerts.errorButton,
        confirmButtonColor: "#C9A96E",
        background: "#111315",
        color: "#F3F4F6",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contact-section" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
          className="glass-strong rounded-3xl border border-matte-border p-6 sm:p-10 lg:p-12 glow-border-hover overflow-hidden"
        >
          <p className="section-tag">{tag}</p>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-matte-text mb-4"
            variants={slideUp}
          >
            {t.title}{" "}
            <span className="gradient-text">{t.titleHighlight}</span>
          </motion.h2>

          <motion.p
            className="text-xl sm:text-2xl text-matte-text font-medium mb-2"
            variants={slideUp}
          >
            {t.headline}
          </motion.p>
          <motion.p
            className="text-matte-muted mb-10 max-w-2xl text-sm sm:text-base"
            variants={slideUp}
          >
            {t.subtitle}
          </motion.p>

          <motion.div variants={slideUp} className="mb-10">
            <Magnetic className="max-w-xl" strength={0.15}>
              <a
                href={`mailto:${EMAIL}`}
                className={`group flex items-center gap-3 rounded-2xl btn-cyber-primary px-5 py-4 sm:py-5 shadow-[0_0_40px_-10px_rgba(201,169,110,0.28)] ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="flex-1 font-mono text-sm sm:text-base truncate">
                  {EMAIL}
                </span>
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-matte-bg/35 shrink-0 group-hover:bg-matte-bg/50 transition-colors">
                  <svg
                    className={`w-5 h-5 ${isRTL ? "rtl-flip" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
              </a>
            </Magnetic>
            <p className="text-xs text-matte-muted mt-2 font-mono">{t.emailCta}</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <motion.form
              onSubmit={handleSubmit}
              className="glass rounded-2xl p-6 sm:p-8 space-y-5 border border-matte-border"
              variants={slideUp}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs font-mono text-matte-muted mb-2"
                >
                  {t.form.name}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-matte-bg/50 border border-matte-border rounded-xl focus:outline-none focus:border-matte-teal/45 focus:ring-2 focus:ring-matte-teal/15 transition-all text-matte-text disabled:opacity-50 placeholder:text-matte-muted"
                  placeholder={t.form.namePlaceholder}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-mono text-matte-muted mb-2"
                >
                  {t.form.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-matte-bg/50 border border-matte-border rounded-xl focus:outline-none focus:border-matte-teal/45 focus:ring-2 focus:ring-matte-teal/15 transition-all text-matte-text disabled:opacity-50 placeholder:text-matte-muted"
                  placeholder={t.form.emailPlaceholder}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-xs font-mono text-matte-muted mb-2"
                >
                  {t.form.message}
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={isSubmitting}
                  rows={5}
                  className="w-full px-4 py-3 bg-matte-bg/50 border border-matte-border rounded-xl focus:outline-none focus:border-matte-teal/45 focus:ring-2 focus:ring-matte-teal/15 transition-all text-matte-text resize-none disabled:opacity-50 placeholder:text-matte-muted"
                  placeholder={t.form.messagePlaceholder}
                  dir={isRTL ? "rtl" : "ltr"}
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full btn-cyber-primary px-6 py-3.5 text-sm sm:text-base rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
              >
                {isSubmitting ? t.form.sending : t.form.send}
              </motion.button>
            </motion.form>

            <motion.div className="space-y-6" variants={slideUp}>
              <div className="glass rounded-2xl p-6 sm:p-8 border border-matte-border">
                <h3 className="text-sm font-mono text-matte-gold/90 mb-6">
                  {t.info.title}
                </h3>

                <div className="space-y-5">
                  <a
                    href={`mailto:${EMAIL}`}
                    className={`flex items-center gap-4 text-matte-secondary hover:text-matte-gold transition-colors group ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-matte-elevated/40 border border-matte-border flex items-center justify-center group-hover:border-matte-gold/35 transition-colors">
                      <svg
                        className="w-6 h-6 text-matte-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <p className="text-xs text-matte-muted">{t.info.email}</p>
                      <p className="font-medium text-matte-text text-sm break-all">
                        {EMAIL}
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+201010137937"
                    className={`flex items-center gap-4 text-matte-secondary hover:text-matte-teal transition-colors group ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    <div className="w-12 h-12 rounded-xl bg-matte-elevated/40 border border-matte-border flex items-center justify-center group-hover:border-matte-teal/35 transition-colors">
                      <svg
                        className="w-6 h-6 text-matte-teal"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div className={isRTL ? "text-right" : "text-left"}>
                      <p className="text-xs text-matte-muted">{t.info.phone}</p>
                      <p className="font-medium text-matte-text text-sm" dir="ltr">
                        +201010137937
                      </p>
                    </div>
                  </a>
                </div>
              </div>

              <div className="glass rounded-2xl p-6 sm:p-8 border border-matte-border">
                <h3 className="text-sm font-mono text-matte-gold/90 mb-6">
                  {t.social.title}
                </h3>
                <div className="flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Ahmed-Alaa02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-xl bg-matte-elevated/40 border border-matte-border flex items-center justify-center hover:border-matte-gold/45 hover:bg-matte-gold/10 transition-all text-matte-muted hover:text-matte-text"
                    aria-label="GitHub"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ahmedalaa02"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-12 w-12 rounded-xl bg-matte-elevated/40 border border-matte-border flex items-center justify-center hover:border-matte-gold/45 hover:bg-matte-gold/10 transition-all text-matte-muted hover:text-matte-text"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
