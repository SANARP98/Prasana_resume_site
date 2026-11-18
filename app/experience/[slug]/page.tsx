import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allExperiences } from "@/data/experience";
import { getKPIsForExperience } from "@/lib/kpis";
import { TrackTag } from "@/components/ui";
import type { Track } from "@/data/profile";

export async function generateStaticParams() {
  return allExperiences.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const e = allExperiences.find((x) => x.slug === slug);
  return { title: e ? `${e.role} @ ${e.company} · Prasana Renganathan` : "Experience", description: e?.summary };
}

export default async function ExperienceDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idx = allExperiences.findIndex((x) => x.slug === slug);
  if (idx < 0) notFound();
  const e = allExperiences[idx];
  const prev = allExperiences[idx - 1];
  const next = allExperiences[idx + 1];
  const kpis = getKPIsForExperience(e.kpiId);

  return (
    <article className="container-custom py-16">
      <Link href="/experience/" className="eyebrow hover:text-accent">← All experience</Link>

      <header className="mt-6 max-w-3xl">
        <p className="font-mono text-xs text-muted">{e.period}</p>
        <h1 className="mt-2 text-3xl sm:text-5xl">{e.role}</h1>
        <p className="mt-1 text-xl text-muted">{e.company}</p>
        <p className="mt-6 text-lg">{e.summary}</p>
        <p className="mt-4 rounded-lg border-l-2 border-ai bg-ai/5 px-4 py-3 text-sm">
          <span className="font-mono text-[11px] uppercase tracking-widest text-ai">FDE lens · </span>
          {e.aiAngle}
        </p>
      </header>

      {kpis.length > 0 && (
        <section className="mt-12">
          <h2 className="eyebrow mb-4">By the numbers</h2>
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 sm:grid-cols-3 lg:grid-cols-4">
            {kpis.map((k) => (
              <div key={k.label} className="flex flex-col-reverse bg-bg p-4" title={k.description}>
                <dt className="mt-1 text-xs text-muted">{k.label}</dt>
                <dd className="font-mono text-2xl text-accent">{k.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        {(["ai", "platform"] as Track[]).map((t) => {
          const items = e.highlights.filter((h) => h.track === t);
          if (!items.length) return null;
          return (
            <div key={t} className={`p-6 ${t === "ai" ? "rounded-3xl border border-ai/25" : "rounded-md border border-ok/30"}`}>
              <TrackTag track={t} />
              <ul className="mt-4 space-y-2.5 text-sm">
                {items.map((h) => (
                  <li key={h.text} className="flex gap-3">
                    <span aria-hidden className={`mt-1.5 h-2 w-2 flex-none ${t === "ai" ? "rounded-full bg-ai" : "rounded-[1px] bg-ok"}`} />
                    {h.text}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="mt-12">
        <details className="card group p-6" open>
          <summary className="flex cursor-pointer list-none items-center justify-between">
            <h2 className="text-xl">Full responsibilities</h2>
            <span className="font-mono text-xs text-muted group-open:hidden">expand ({e.responsibilities.length})</span>
            <span className="hidden font-mono text-xs text-muted group-open:inline">collapse</span>
          </summary>
          <ul className="mt-5 space-y-3 text-sm leading-relaxed">
            {e.responsibilities.map((r) => (
              <li key={r} className="flex gap-3">
                <span aria-hidden className="text-accent">→</span>
                {r}
              </li>
            ))}
          </ul>
        </details>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {e.stack.map((s) => <span key={s} className="tag-neutral">{s}</span>)}
        </div>
      </section>

      <nav className="mt-16 flex justify-between gap-4 border-t border-line/10 pt-6 text-sm" aria-label="Other roles">
        {prev ? <Link href={`/experience/${prev.slug}/`} className="hover:text-accent">← {prev.company}</Link> : <span />}
        {next ? <Link href={`/experience/${next.slug}/`} className="hover:text-accent">{next.company} →</Link> : <span />}
      </nav>
    </article>
  );
}
