import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  title: "Ahmed Alaa | Full-Stack Developer",
  description:
    "Modern developer portfolio showcasing frontend and full-stack web projects with cutting-edge technologies.",
  keywords: [
    "frontend developer",
    "full-stack developer",
    "web development",
    "React",
    "Next.js",
    "portfolio",
  ],
  icons: {
    icon: "/favicon.png",
  },
  authors: [{ name: "Ahmed Alaa" }],
  openGraph: {
    title: "Ahmed Alaa | Full-Stack Developer",
    description:
      "Modern developer portfolio showcasing frontend and full-stack web projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body className="font-sans">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
