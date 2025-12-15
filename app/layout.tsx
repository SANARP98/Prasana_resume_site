import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="container-custom py-10 text-center text-sm text-mediumGray border-t border-darkGray/10">
          <div className="flex justify-between items-center">
            <p>&copy; {new Date().getFullYear()} Prasana Renganathan. All rights reserved.</p>
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
