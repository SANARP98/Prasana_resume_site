"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CaseStudy } from "@/data/cases";

const colorMap: Record<string, string> = {
  darkGray: "bg-caseColors-darkGray",
  pink: "bg-caseColors-pink",
  purple: "bg-caseColors-purple",
  cyan: "bg-caseColors-cyan",
  red: "bg-caseColors-red",
  lime: "bg-caseColors-lime",
};

export default function CaseCard({
  caseItem,
  index = 0
}: {
  caseItem: CaseStudy;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/cases/${caseItem.slug}`} className="block">
        <div className="flex gap-3 items-start">
          {/* Icon */}
          <div className={`w-8 h-8 rounded-full ${colorMap[caseItem.color] || 'bg-darkGray'} flex items-center justify-center flex-shrink-0 mt-1`}>
            <span className="text-white text-sm">*</span>
          </div>

          {/* Content */}
          <div className="flex-1">
            <h3 className="font-bold text-sm mb-0.5 group-hover:text-accent transition-colors">
              {caseItem.title}
            </h3>
            <div className="flex gap-2 text-xs text-mediumGray">
              <span>{caseItem.date}</span>
              <span>•</span>
              <span>
                {caseItem.isNDA ? "🔒 NDA" : caseItem.client}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
