"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface CVFile {
  name: string;
  path: string;
  extension: string;
}

export default function CVDropdown({ cvFiles }: { cvFiles: CVFile[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isOpen) return; // Only add listener when dropdown is open

    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]); // Dependency on isOpen ensures listener is only active when needed

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-1.5 bg-darkGray text-cream rounded-md hover:bg-accent transition-colors uppercase text-xs font-semibold flex items-center gap-2"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        CV
        <svg
          className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu - Only rendered when open */}
      {isOpen && cvFiles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
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
                onClick={() => setIsOpen(false)}
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

      {/* No CVs message - Only rendered when open and no files */}
      {isOpen && cvFiles.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
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
  );
}
