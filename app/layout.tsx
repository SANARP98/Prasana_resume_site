import type { Metadata, Viewport } from "next";
import { Inter, DM_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import ChatWidget from "@/components/ChatWidget";
import Providers from "@/components/Providers";
import { getCVFilesForClient } from "@/lib/cv";
import { profile } from "@/data/profile";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const mono = DM_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name} · Forward Deployed Engineer (AI + Platform)`,
  description:
    "Forward Deployed Engineer who ships agentic AI into regulated enterprises (LLM guardrails, RAG, AI-driven IaC remediation) and runs the Terraform, Kubernetes and security platform under it.",
  openGraph: {
    title: `${profile.name} · Forward Deployed Engineer`,
    description: profile.positioning,
    type: "profile",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f7f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0d0e12" },
  ],
};

// Runs before paint: pick stored theme, else follow the system. Prevents a flash.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cvFiles = getCVFilesForClient();

  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${mono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="font-sans">
        <Providers>
          <SiteHeader cvFiles={cvFiles} />
          <main id="main" className="min-h-screen">
            {children}
          </main>
          <footer className="border-t border-line/10">
            <div className="container-custom flex flex-col gap-4 py-10 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
              <p className="font-mono">
                © {new Date().getFullYear()} {profile.name} · static build, no servers were harmed
              </p>
              <nav className="flex flex-wrap gap-5 uppercase tracking-widest" aria-label="Footer">
                <Link href="/cases/" className="hover:text-accent">Cases</Link>
                <Link href="/experience/" className="hover:text-accent">Experience</Link>
                <Link href="/skills/" className="hover:text-accent">Skills</Link>
                <a href="/admin/" aria-label="Admin" className="opacity-30 hover:opacity-60">•</a>
              </nav>
            </div>
          </footer>
          <ChatWidget />
        </Providers>
        <script src="/js/track.js" defer></script>
      </body>
    </html>
  );
}
