"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Experience } from "@/data/cases";
import { getKPIIdFromSlug, getTopKPIsForExperience } from "@/lib/kpis";
import { KPIBadge } from "./KPIDisplay";

export default function ExperienceCard({
  experience,
  index = 0
}: {
  experience: Experience;
  index?: number;
}) {
  const kpiId = getKPIIdFromSlug(experience.slug);
  const topKPIs = getTopKPIsForExperience(kpiId, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/experience/${experience.slug}`} className="block">
        <div className="flex gap-3 items-start">
          {/* Icon */}
          <div className="w-8 h-8 rounded-full bg-darkGray flex items-center justify-center flex-shrink-0 mt-1">
            <span className="text-white text-sm">*</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-0.5 group-hover:text-accent transition-colors">
              {experience.company}
            </h3>
            <p className="text-xs text-mediumGray mb-1">{experience.role}</p>
            <div className="flex gap-2 text-xs text-mediumGray mb-2">
              <span>{experience.date}</span>
            </div>

            {/* KPI Badges - Only show if KPIs exist */}
            {topKPIs.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {topKPIs.map((kpi, idx) => (
                  <KPIBadge key={idx} kpi={kpi} delay={index * 0.05 + idx * 0.05} />
                ))}
              </div>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
