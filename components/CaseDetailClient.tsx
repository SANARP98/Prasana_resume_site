"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CaseStudy } from "@/data/cases";
import CaseCard from "./CaseCard";

export default function CaseDetailClient({
  caseItem,
  relatedCases,
}: {
  caseItem: CaseStudy;
  relatedCases: CaseStudy[];
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
        <a
          href="/cases/"
          className="text-sm uppercase text-mediumGray hover:text-accent transition-colors"
        >
          ← All Cases
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
          {caseItem.title}
        </h1>
        <div className="flex gap-3 text-mediumGray">
          <span>{caseItem.date}</span>
          <span>•</span>
          <span>{caseItem.isNDA ? "🔒 NDA" : caseItem.client}</span>
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
          <p className="text-lg leading-relaxed">{caseItem.summary}</p>
        </section>

        {/* What I Did */}
        <section>
          <h2 className="text-2xl font-bold mb-6">What I did</h2>
          <ul className="space-y-3">
            {caseItem.whatIDid.map((item, index) => (
              <li key={index} className="flex gap-3">
                <span className="text-accent mt-1">→</span>
                <span className="flex-1">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Why It Matters */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Why it matters</h2>
          <p className="leading-relaxed">{caseItem.whyItMatters}</p>
        </section>

        {/* Results */}
        {caseItem.results && caseItem.results.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Results</h2>
            <ul className="space-y-3">
              {caseItem.results.map((result, index) => (
                <li key={index} className="flex gap-3">
                  <span className="text-lime-500">✓</span>
                  <span className="flex-1">{result}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </motion.article>

      {/* Related Cases */}
      {relatedCases.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-32 pt-16 border-t border-darkGray/10"
        >
          <h2 className="text-sm uppercase tracking-wider text-mediumGray mb-8 font-bold">
            Related Cases
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedCases.map((relatedCase, index) => (
              <CaseCard
                key={relatedCase.slug}
                caseItem={relatedCase}
                index={index}
              />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
