import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Portfolio | Full-Stack Developer",
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
  authors: [{ name: "Ahmed Alaa" }],
  openGraph: {
    title: "Portfolio | Full-Stack Developer",
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
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
