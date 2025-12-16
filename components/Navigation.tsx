"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface CVFile {
  name: string;
  path: string;
  extension: string;
}

export default function Navigation({ cvFiles = [] }: { cvFiles?: CVFile[] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      className="sticky top-0 z-50 bg-cream/80 backdrop-blur-sm border-b border-darkGray/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="container-custom py-4 flex justify-between items-center">
        {/* Social Links - Left */}
        <div className="flex gap-3">
          <SocialLink href="https://www.linkedin.com/in/prasana-r-324b1526/" label="LinkedIn">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://github.com/SANARP98" label="GitHub">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </SocialLink>
          <SocialLink href="https://gritgo.in/portfolio" label="Portfolio">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
            </svg>
          </SocialLink>
        </div>

        {/* CTA Buttons - Right */}
        <div className="flex gap-3 items-center">
          {/* CV Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="px-4 py-1.5 bg-darkGray text-cream rounded-md hover:bg-accent transition-colors uppercase text-xs font-semibold flex items-center gap-2"
            >
              CV
              <svg
                className={`w-3 h-3 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && cvFiles.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-white border border-darkGray/20 rounded-md shadow-lg overflow-hidden z-50"
              >
                <div className="py-1">
                  {cvFiles.map((cv, index) => (
                    <a
                      key={index}
                      href={cv.path}
                      download
                      className="block px-4 py-2 text-sm text-darkGray hover:bg-accent/10 hover:text-accent transition-colors flex items-center justify-between group"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      <span className="flex-1 truncate">{cv.name}</span>
                      <span className="text-xs text-mediumGray ml-2 uppercase group-hover:text-accent">
                        {cv.extension.replace('.', '')}
                      </span>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* No CVs message */}
            {isDropdownOpen && cvFiles.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-64 bg-white border border-darkGray/20 rounded-md shadow-lg overflow-hidden z-50"
              >
                <div className="px-4 py-3 text-sm text-mediumGray text-center">
                  No CV files available
                  <div className="text-xs mt-1">Add files to /public/cv/</div>
                </div>
              </motion.div>
            )}
          </div>

          <a
            href="mailto:prasana@gritgo.in"
            className="px-4 py-1.5 border border-darkGray rounded-md hover:bg-darkGray hover:text-cream transition-colors text-xs font-medium"
          >
            prasana@gritgo.in
          </a>
        </div>
      </nav>
    </motion.header>
  );
}

function SocialLink({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-7 h-7 flex items-center justify-center rounded-full border border-darkGray/20 hover:border-accent hover:text-accent transition-colors"
      aria-label={label}
    >
      {children}
    </a>
  );
}
