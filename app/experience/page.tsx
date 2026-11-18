import type { Metadata } from "next";
import Link from "next/link";
import { allExperiences } from "@/data/experience";
import { getTopKPIsForExperience } from "@/lib/kpis";
import { TrackTag } from "@/components/ui";

export const metadata: Metadata = { title: "Experience · Prasana Renganathan" };

export default function ExperiencePage() {
  return (
    <div className="container-custom py-16">
      <Link href="/" className="eyebrow hover:text-accent">← Home</Link>
      <h1 className="mt-4 text-4xl sm:text-5xl">Experience</h1>
      <p className="mb-10 mt-3 max-w-2xl text-muted">Four roles, each embedded with a client&apos;s engineering team.</p>
      <div className="grid gap-5 md:grid-cols-2">
        {allExperiences.map((e) => {
          const hasAI = e.highlights.some((h) => h.track === "ai");
          return (
            <Link key={e.slug} href={`/experience/${e.slug}/`} className="card group flex flex-col p-6 transition hover:-translate-y-1 hover:shadow-lift">
              <div className="mb-3 flex items-center gap-2">
                {hasAI && <TrackTag track="ai">AI</TrackTag>}
                <TrackTag track="platform">Platform</TrackTag>
                <span className="ml-auto font-mono text-[11px] text-muted">{e.date}</span>
              </div>
              <h2 className="text-xl tracking-tight group-hover:text-accent">{e.role}</h2>
              <p className="text-sm text-muted">{e.company}</p>
              <p className="mt-3 text-sm">{e.aiAngle}</p>
              <dl className="mt-5 grid grid-cols-3 gap-3 border-t border-line/10 pt-4">
                {getTopKPIsForExperience(e.kpiId, 3).map((k) => (
                  <div key={k.label}>
                    <dd className="font-mono text-lg text-accent">{k.value}</dd>
                    <dt className="text-[11px] leading-tight text-muted">{k.label}</dt>
                  </div>
                ))}
              </dl>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
