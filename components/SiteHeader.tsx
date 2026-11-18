"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/profile";
import { Icon } from "./ui";

interface CVFile {
  name: string;
  path: string;
  extension: string;
}

const nav = [
  { href: "/#halves", label: "Positioning" },
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  const toggle = () => {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
    setDark(next);
  };

  return (
    <button
      onClick={toggle}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-line/20 transition hover:border-accent hover:text-accent"
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      title={dark ? "Light mode" : "Dark mode. Your retinas will thank you."}
    >
      {dark ? Icon.sun : Icon.moon}
    </button>
  );
}

function CVMenu({ cvFiles }: { cvFiles: CVFile[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-ghost"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        CV
        <svg className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="card absolute right-0 z-50 mt-2 w-72 overflow-hidden py-1 shadow-lift"
          >
            {cvFiles.length === 0 ? (
              <p className="px-4 py-3 text-sm text-muted">No CVs here yet. Check back after the next deploy.</p>
            ) : (
              cvFiles.map((cv) => (
                <a
                  key={cv.path}
                  role="menuitem"
                  href={cv.path}
                  download
                  className="flex items-center justify-between px-4 py-2 text-sm transition hover:bg-accent/10 hover:text-accent"
                  onClick={() => {
                    try {
                      navigator.sendBeacon("/api/track/download", JSON.stringify({ file_name: cv.name, file_path: cv.path }));
                    } catch {}
                    setOpen(false);
                  }}
                >
                  <span className="truncate">{cv.name}</span>
                  <span className="ml-2 font-mono text-[10px] uppercase text-muted">{cv.extension.replace(".", "")}</span>
                </a>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SiteHeader({ cvFiles = [] }: { cvFiles?: CVFile[] }) {
  const [menu, setMenu] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line/10 bg-bg/80 backdrop-blur-md">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 btn-primary">
        Skip to content
      </a>
      <nav className="container-custom flex h-16 items-center justify-between gap-4" aria-label="Primary">
        <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent font-mono text-[11px] text-white dark:text-bg">
            {profile.initials}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>

        <ul className="hidden items-center gap-6 text-sm text-muted lg:flex">
          {nav.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="transition hover:text-fg">
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden sm:block">
            <CVMenu cvFiles={cvFiles} />
          </div>
          <a href={`mailto:${profile.email}`} className="btn-primary hidden sm:inline-flex">
            Get in touch
          </a>
          <button
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line/20 lg:hidden"
            onClick={() => setMenu((m) => !m)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label="Menu"
          >
            {menu ? Icon.close : Icon.menu}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-line/10 lg:hidden"
          >
            <div className="container-custom flex flex-col gap-1 py-4">
              {nav.map((n) => (
                <a key={n.href} href={n.href} onClick={() => setMenu(false)} className="rounded-md px-2 py-2 hover:bg-line/5">
                  {n.label}
                </a>
              ))}
              <div className="mt-3 flex flex-col gap-2 border-t border-line/10 pt-3 sm:hidden">
                <p className="eyebrow">Download CV</p>
                {cvFiles.map((cv) => (
                  <a key={cv.path} href={cv.path} download className="flex justify-between px-2 py-1 text-sm hover:text-accent">
                    <span className="truncate">{cv.name}</span>
                    <span className="font-mono text-[10px] uppercase text-muted">{cv.extension.replace(".", "")}</span>
                  </a>
                ))}
                <a href={`mailto:${profile.email}`} className="btn-primary mt-2 justify-center">
                  Get in touch
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
