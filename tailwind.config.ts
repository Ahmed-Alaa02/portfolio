import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        matte: {
          bg: "#111315",
          surface: "#1B1F24",
          elevated: "#22272E",
          border: "#2A2F36",
          text: "#F3F4F6",
          secondary: "#C7CDD6",
          muted: "#94A3B8",
          gold: "#C9A96E",
          highlight: "#E2C68B",
          teal: "#7DD3C7",
        },
        cyber: {
          violet: "#C9A96E",
          glow: "#E2C68B",
          cyan: "#7DD3C7",
          surface: "#1B1F24",
          muted: "#94A3B8",
        },
        primary: {
          50: "#faf8f3",
          100: "#f2ede3",
          200: "#e5dac8",
          300: "#d9c9a8",
          400: "#E2C68B",
          500: "#d4b87a",
          600: "#C9A96E",
          700: "#a88b56",
          800: "#8a7048",
          900: "#5c4a32",
          DEFAULT: "#C9A96E",
        },
        dark: {
          50: "#18181b",
          100: "#27272a",
          200: "#3f3f46",
          300: "#52525b",
          400: "#71717a",
          500: "#a1a1aa",
          600: "#d4d4d8",
          700: "#e4e4e7",
          800: "#f4f4f5",
          900: "#fafafa",
        },
      },
      fontFamily: {
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "SF Mono",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        glow: "glow 2s ease-in-out infinite alternate",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        "pulse-glow": "pulseGlow 4s ease-in-out infinite",
        orbit: "orbit 22s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        glow: {
          "0%": { boxShadow: "0 0 18px rgba(125, 211, 199, 0.12)" },
          "100%": { boxShadow: "0 0 28px rgba(125, 211, 199, 0.22)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(1deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      backgroundImage: {
        "gradient-radial-cyber":
          "radial-gradient(ellipse at center, rgba(201,169,110,0.12) 0%, transparent 65%)",
      },
    },
  },
  plugins: [],
};

export default config;
