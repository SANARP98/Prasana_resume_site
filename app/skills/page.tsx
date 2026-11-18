"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { skillCategories } from "@/data/skills";
import { TrackTag } from "@/components/ui";

export default function SkillsPage() {
  const [q, setQ] = useState("");
  const total = skillCategories.reduce((n, c) => n + c.skills.length, 0);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return skillCategories;
    return skillCategories
      .map((c) => ({ ...c, skills: c.skills.filter((s) => s.toLowerCase().includes(n) || c.title.toLowerCase().includes(n)) }))
      .filter((c) => c.skills.length);
  }, [q]);

  const hits = filtered.reduce((n, c) => n + c.skills.length, 0);

  return (
    <div className="container-custom py-16">
      <Link href="/" className="eyebrow hover:text-accent">← Home</Link>
      <h1 className="mt-4 text-4xl sm:text-5xl">Skills & technologies</h1>
      <p className="mt-3 max-w-2xl text-muted">
        {total} tools and practices across {skillCategories.length} categories. AI is listed first, platform after it.
      </p>

      <label className="mt-8 block max-w-md">
        <span className="sr-only">Filter skills</span>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="grep skills: terraform, rag, sox…"
          className="w-full rounded-md border border-line/15 bg-surface px-3 py-2.5 font-mono text-sm placeholder:text-muted focus:border-accent focus:outline-none"
        />
      </label>
      <p className="mt-2 font-mono text-[11px] text-muted" aria-live="polite">
        {q ? `${hits} match${hits === 1 ? "" : "es"}` : " "}
      </p>

      <div className="mt-6 columns-1 gap-5 md:columns-2">
        {filtered.map((c) => (
          <section
            key={c.title}
            className={`mb-5 break-inside-avoid p-6 ${c.track === "ai" ? "rounded-3xl border border-ai/25" : "rounded-md border border-ok/25"}`}
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h2 className="text-lg tracking-tight">{c.title}</h2>
              <TrackTag track={c.track}>{c.skills.length}</TrackTag>
            </div>
            <ul className="flex flex-wrap gap-1.5">
              {c.skills.map((s) => (
                <li key={s} className={c.track === "ai" ? "tag-ai" : "tag-platform"}>{s}</li>
              ))}
            </ul>
          </section>
        ))}
        {filtered.length === 0 && (
          <p className="text-sm text-muted">No match. If it&apos;s important, I can probably learn it before the onsite.</p>
        )}
      </div>
    </div>
  );
}
