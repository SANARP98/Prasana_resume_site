"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import type { CaseStudy } from "@/data/cases";
import type { Track } from "@/data/profile";
import { Icon, TrackTag } from "./ui";

export function CaseCard({ c }: { c: CaseStudy }) {
  const isAI = c.track.includes("ai");
  return (
    <motion.div layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.25 }}>
      <Link
        href={`/cases/${c.slug}/`}
        className={`card group flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1 hover:shadow-lift ${
          isAI ? "hover:border-ai/40" : "hover:border-ok/40"
        }`}
      >
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {c.track.map((t) => (
            <TrackTag key={t} track={t}>
              {t === "ai" ? "AI" : "Platform"}
            </TrackTag>
          ))}
          <span className="ml-auto font-mono text-[11px] text-muted">{c.date}</span>
        </div>
        <h3 className="mb-2 text-lg leading-snug tracking-tight group-hover:text-accent">{c.title}</h3>
        <p className="mb-5 line-clamp-3 text-sm text-muted">{c.summary}</p>
        <div className="mt-auto">
          <p className={`mb-4 font-mono text-sm ${isAI ? "text-ai" : "text-ok"}`}>
            <span aria-hidden>→ </span>
            {c.headline}
          </p>
          <div className="flex items-center justify-between text-xs text-muted">
            <span>{c.client}</span>
            <span className="flex items-center gap-1 text-accent opacity-0 transition group-hover:opacity-100">
              Read case {Icon.arrow}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

type Filter = "all" | Track;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "Ship the AI" },
  { id: "platform", label: "Run the platform" },
];

export function CaseExplorer({ cases, showSearch = false }: { cases: CaseStudy[]; showSearch?: boolean }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [q, setQ] = useState("");

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return cases.filter((c) => {
      if (filter !== "all" && !c.track.includes(filter)) return false;
      if (!needle) return true;
      return [c.title, c.summary, c.client, ...c.stack].join(" ").toLowerCase().includes(needle);
    });
  }, [cases, filter, q]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" aria-label="Filter cases" className="inline-flex rounded-lg border border-line/15 p-1">
          {filters.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`relative rounded-md px-3 py-1.5 text-xs font-semibold transition ${
                filter === f.id ? "text-white dark:text-bg" : "text-muted hover:text-fg"
              }`}
            >
              {filter === f.id && (
                <motion.span
                  layoutId="case-filter"
                  className={`absolute inset-0 rounded-md ${f.id === "ai" ? "bg-ai" : f.id === "platform" ? "bg-ok" : "bg-fg"}`}
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{f.label}</span>
            </button>
          ))}
        </div>
        {showSearch && (
          <label className="relative block sm:w-64">
            <span className="sr-only">Search cases</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search: RAG, Terraform, Kafka…"
              className="w-full rounded-md border border-line/15 bg-surface px-3 py-2 font-mono text-xs placeholder:text-muted focus:border-accent focus:outline-none"
            />
          </label>
        )}
      </div>

      <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((c) => (
            <CaseCard key={c.slug} c={c} />
          ))}
        </AnimatePresence>
      </motion.div>
      {visible.length === 0 && (
        <p className="card p-8 text-center text-sm text-muted">
          Nothing matches that. Not even in staging. Try a broader term.
        </p>
      )}
    </div>
  );
}
