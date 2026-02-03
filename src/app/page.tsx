import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Projects />
      <Skills />
      <About />
      <Contact />

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-dark-200">
        <div className="max-w-7xl mx-auto text-center text-dark-400">
          <p className="text-sm">
            © {new Date().getFullYear()} Your Name. Built with{" "}
            <span className="text-primary-500">Next.js</span>,{" "}
            <span className="text-primary-500">Tailwind CSS</span>, and{" "}
            <span className="text-primary-500">Framer Motion</span>.
          </p>
        </div>
      </footer>
    </main>
  );
}
