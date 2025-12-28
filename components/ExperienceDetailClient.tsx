"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Experience } from "@/data/cases";
import ExperienceCard from "./ExperienceCard";
import { getKPIIdFromSlug, getKPIsForExperience, categorizeKPIs } from "@/lib/kpis";
import { StatsCard, ProgressBar, CircularProgress, MetricCard, StatRow } from "./KPIDisplay";

export default function ExperienceDetailClient({
  experience,
  relatedExperiences,
}: {
  experience: Experience;
  relatedExperiences: Experience[];
}) {
  const kpiId = getKPIIdFromSlug(experience.slug);
  const allKPIs = getKPIsForExperience(kpiId);
  const { percentages, counts, reductions } = categorizeKPIs(allKPIs);

  return (
    <div className="container-custom py-20">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <a
          href="/experience/"
          className="text-sm uppercase text-mediumGray hover:text-accent transition-colors"
        >
          ← All Experience
        </a>
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

      {/* KPI Section - Only show if KPIs exist */}
      {allKPIs.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-20"
        >
          <h2 className="text-sm uppercase tracking-wider text-mediumGray mb-8 font-bold">
            Key Impact Metrics
          </h2>

          {/* Stats Cards Grid - For count-based metrics */}
          {counts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {counts.slice(0, 8).map((kpi, idx) => (
                <StatsCard key={idx} kpi={kpi} delay={0.1 + idx * 0.05} />
              ))}
            </div>
          )}

          {/* Progress Bars - For reduction/improvement metrics */}
          {reductions.length > 0 && (
            <div className="space-y-6 mb-8 max-w-2xl">
              <h3 className="text-xs uppercase tracking-wider text-mediumGray font-bold">
                Performance Improvements
              </h3>
              {reductions.map((kpi, idx) => (
                <ProgressBar key={idx} kpi={kpi} delay={0.2 + idx * 0.05} />
              ))}
            </div>
          )}

          {/* Circular Progress - For high-percentage achievements */}
          {percentages.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xs uppercase tracking-wider text-mediumGray mb-6 font-bold">
                Achievement Rates
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                {percentages.map((kpi, idx) => (
                  <CircularProgress key={idx} kpi={kpi} delay={0.3 + idx * 0.05} />
                ))}
              </div>
            </div>
          )}

          {/* Remaining KPIs as Stat Rows */}
          {counts.length > 8 && (
            <div className="max-w-2xl">
              <h3 className="text-xs uppercase tracking-wider text-mediumGray mb-4 font-bold">
                Additional Metrics
              </h3>
              <div className="bg-white border border-darkGray/10 rounded-lg p-4">
                {counts.slice(8).map((kpi, idx) => (
                  <StatRow key={idx} kpi={kpi} delay={0.4 + idx * 0.03} />
                ))}
              </div>
            </div>
          )}
        </motion.section>
      )}

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
