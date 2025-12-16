import type { Metadata } from "next";
import { Inter } from "next/font/google";
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
        <footer className="container-custom py-10 text-sm text-mediumGray border-t border-darkGray/10">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <a href="/skills" className="hover:text-accent uppercase">All Skills</a>
            </div>
            <div className="flex gap-4">
              <a href="/experience" className="hover:text-accent uppercase">All Experience</a>
              <a href="/cases" className="hover:text-accent uppercase">All Cases</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
