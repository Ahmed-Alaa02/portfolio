import type { Metadata } from "next";
import { Inter, Cairo, Lora } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-serif",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  // Only applied when the user switches to Arabic (see globals.css), so don't
  // force-preload it for the default English visit.
  preload: false,
});

export const metadata: Metadata = {
  title: "Ahmed Alaa | PHP Laravel Backend Developer",
  description:
    "Modern developer portfolio showcasing PHP and Laravel backend web projects with cutting-edge technologies.",
  keywords: [
    "backend developer",
    "PHP developer",
    "Laravel developer",
    "web development",
    "MySQL",
    "REST API",
    "portfolio",
  ],
  icons: {
    icon: "/favicon.png",
  },
  authors: [{ name: "Ahmed Alaa" }],
  openGraph: {
    title: "Ahmed Alaa | PHP Laravel Backend Developer",
    description:
      "Modern developer portfolio showcasing PHP and Laravel backend web projects",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${lora.variable} ${cairo.variable}`}>
      <body className="font-sans antialiased bg-matte-bg text-matte-text">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
