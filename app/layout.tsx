import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Manrope, JetBrains_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Vincent Munene",
  description:
    "Full stack engineer — Flutter, Spring Boot, Kotlin, Kafka, Kubernetes.",
};

// Nav is NOT in the root layout because the home page and work detail pages
// use different nav treatments (full link list vs. a single back arrow).
// Each page renders its own nav variant at the top.
// Footer is in the root layout because it's identical on every page.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-scroll-behavior is a Next 16 opt-in: it keeps the CSS smooth scroll
    // for in-page anchors (#about, #stack) while forcing route changes to land
    // instantly at the top. Without it, opening a project visibly glides up.
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col">
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
