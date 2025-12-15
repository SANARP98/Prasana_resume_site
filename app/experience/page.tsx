"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ExperienceCard from "@/components/ExperienceCard";
import { allExperiences } from "@/data/cases";

export default function ExperiencePage() {
  return (
    <div className="container-custom py-20">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Link
          href="/"
          className="text-sm uppercase text-mediumGray hover:text-accent transition-colors"
        >
          ← Home
        </Link>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-black mb-16"
      >
        Experience
      </motion.h1>

      {/* Experience List */}
      <div className="space-y-8">
        {allExperiences.map((experience, index) => (
          <div key={experience.slug}>
            <ExperienceCard experience={experience} index={index} />
            {index < allExperiences.length - 1 && (
              <div className="h-px bg-darkGray/10 mt-8" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
