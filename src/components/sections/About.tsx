"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { fadeIn, slideUp } from "@/lib/animations";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 px-6 md:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeIn}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-8 text-center"
            variants={slideUp}
          >
            About <span className="gradient-text">Me</span>
          </motion.h2>

          <motion.div
            className="glass rounded-xl p-8 md:p-12"
            variants={slideUp}
          >
            <div className="space-y-6 text-lg text-dark-400 leading-relaxed">
              <p>
                I'm a passionate{" "}
                <span className="text-white font-semibold">
                  Full-Stack Web Developer
                </span>{" "}
                with a strong engineering background and a passion for building
                clean, scalable, and user-friendly web applications.
              </p>
              <p>
                I specialize in Laravel, PHP, JavaScript, HTML, CSS, and MySQL,
                with hands-on experience in developing full systems from
                database design to polished user interfaces.
              </p>
              <p>
                What sets me apart is my{" "}
                <span className="text-white font-semibold">
                  Engineering Mindset
                </span>{" "}
                : I don't just write code, I solve problems. I focus on clean
                architecture, performance, and writing maintainable code that
                can grow with your business.
              </p>
              <div>
                <p>I have worked on:</p>
                <ul className="list-disc list-inside">
                  <li>Educational management systems</li>
                  <li>Dashboards and admin panels</li>
                  <li>RESTful APIs and database-driven applications</li>
                  <li>Frontend interactions and UI logic</li>
                </ul>
              </div>
              <div>
                <p>I'm committed to:</p>
                <ul className="list-disc list-inside">
                  <li>Clear communication</li>
                  <li>Meeting deadlines</li>
                  <li>Writing clean, well-structured code</li>
                </ul>
              </div>
              <p>
                If you're looking for a reliable developer who understands both
                the technical side and the business goals, let's work together.
              </p>
            </div>

            <motion.div
              className="mt-8 pt-8 border-t border-dark-200"
              variants={slideUp}
            >
              <h3 className="text-xl font-semibold mb-4 text-white">
                Core Values
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">🎯</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Problem-Solving
                    </h4>
                    <p className="text-sm text-dark-400">
                      Finding elegant solutions to complex challenges
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">📚</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Continuous Learning
                    </h4>
                    <p className="text-sm text-dark-400">
                      Always growing and adapting to new technologies
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-2xl">✨</span>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      Quality First
                    </h4>
                    <p className="text-sm text-dark-400">
                      Commitment to excellence in every detail
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
