"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Experience } from "@/data/cases";
import ExperienceCard from "./ExperienceCard";

export default function ExperienceDetailClient({
  experience,
  relatedExperiences,
}: {
  experience: Experience;
  relatedExperiences: Experience[];
}) {
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

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-16 max-w-3xl"
      >
        <h1 className="text-5xl font-black mb-4 leading-tight">
          {experience.company}
        </h1>
        <div className="flex flex-col gap-2 mb-6">
          <p className="text-2xl font-semibold text-darkGray">{experience.role}</p>
          <p className="text-mediumGray">{experience.period}</p>
        </div>
      </motion.header>

      {/* Content */}
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="max-w-3xl space-y-16"
      >
        {/* Summary */}
        <section>
          <p className="text-lg leading-relaxed">{experience.summary}</p>
        </section>

        {/* Key Responsibilities */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Key Responsibilities & Achievements</h2>
          <ul className="space-y-4">
            {experience.responsibilities.map((responsibility, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-accent mt-1.5 text-lg leading-none">→</span>
                <span className="flex-1 leading-relaxed">{responsibility}</span>
              </li>
            ))}
          </ul>
        </section>
      </motion.article>

      {/* Related Experiences */}
      {relatedExperiences.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-32 pt-16 border-t border-darkGray/10"
        >
          <h2 className="text-sm uppercase tracking-wider text-mediumGray mb-8 font-bold">
            Other Experience
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedExperiences.map((relatedExp, index) => (
              <ExperienceCard
                key={relatedExp.slug}
                experience={relatedExp}
                index={index}
              />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
