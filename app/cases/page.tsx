"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CaseCard from "@/components/CaseCard";
import { allCases } from "@/data/cases";
import { useState } from "react";

export default function CasesPage() {
  const [visibleCount, setVisibleCount] = useState(4);
  const hasMore = visibleCount < allCases.length;

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
        Cases
      </motion.h1>

      {/* Cases List */}
      <div className="space-y-8 mb-12">
        {allCases.slice(0, visibleCount).map((caseItem, index) => (
          <div key={caseItem.slug}>
            <CaseCard caseItem={caseItem} index={index} />
            {index < visibleCount - 1 && (
              <div className="h-px bg-darkGray/10 mt-8" />
            )}
          </div>
        ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={() => setVisibleCount(allCases.length)}
            className="px-8 py-3 border-2 border-darkGray rounded-md hover:bg-darkGray hover:text-cream transition-colors uppercase text-sm font-bold"
          >
            Load More
          </button>
        </motion.div>
      )}
    </div>
  );
}
