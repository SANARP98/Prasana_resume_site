import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { getCVFilesForClient } from "@/lib/cv";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prasana Renganathan - DevSecOps & Cloud Security Engineer",
  description: "DevSecOps and Cloud Security Engineer with 5+ years building secure CI/CD pipelines, AI-driven security automation, and production systems on Azure and Kubernetes. Portfolio showcasing enterprise security projects and quantitative trading systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cvFiles = getCVFilesForClient();

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Navigation cvFiles={cvFiles} />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="container-custom py-12 text-xs text-mediumGray border-t border-darkGray/10">
          <div className="flex justify-between items-center tracking-widest">
            <div className="flex gap-6">
              <Link href="/skills" className="hover:text-accent uppercase transition-colors">All Skills</Link>
            </div>
            <div className="flex gap-6">
              <Link href="/experience" className="hover:text-accent uppercase transition-colors">All Experience</Link>
              <Link href="/cases" className="hover:text-accent uppercase transition-colors">All Cases</Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
