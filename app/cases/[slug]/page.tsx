import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allCases } from "@/data/cases";
import { getKPIsForCase } from "@/lib/kpis";
import { CaseCard } from "@/components/cases";
import { TrackTag } from "@/components/ui";

export async function generateStaticParams() {
  return allCases.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = allCases.find((x) => x.slug === slug);
  return { title: c ? `${c.title} · Prasana Renganathan` : "Case study", description: c?.summary };
}

export default async function CaseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = allCases.find((x) => x.slug === slug);
  if (!c) notFound();

  const kpis = getKPIsForCase(c.slug);
  const related = allCases.filter((x) => x.slug !== c.slug && x.track.some((t) => c.track.includes(t))).slice(0, 3);
  const isAI = c.track.includes("ai");

  const steps = [
    { n: "01", label: "Problem", body: <p>{c.whyItMatters}</p> },
    {
      n: "02",
      label: "What I built",
      body: (
        <ul className="space-y-2.5">
          {c.whatIDid.map((w) => (
            <li key={w} className="flex gap-3">
              <span aria-hidden className={`mt-2 h-1.5 w-1.5 flex-none ${isAI ? "rounded-full bg-ai" : "rounded-[1px] bg-ok"}`} />
              {w}
            </li>
          ))}
        </ul>
      ),
    },
    {
      n: "03",
      label: "Result",
      body: (
        <ul className="space-y-2.5">
          {(c.results ?? []).map((r) => {
            const url = r.match(/https?:\/\/\S+/)?.[0];
            return (
              <li key={r} className="flex gap-3">
                <span aria-hidden className="font-mono text-accent">✓</span>
                {url ? (
                  <span>
                    {r.replace(url, "")}
                    <a href={url} target="_blank" rel="noopener noreferrer" className="text-accent underline-offset-2 hover:underline">
                      {url.replace(/^https?:\/\//, "")}
                    </a>
                  </span>
                ) : (
                  r
                )}
              </li>
            );
          })}
        </ul>
      ),
    },
  ];

  return (
    <article className="container-custom py-16">
      <Link href="/cases/" className="eyebrow hover:text-accent">← All cases</Link>

      <header className="mt-6 max-w-3xl">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          {c.track.map((t) => <TrackTag key={t} track={t} />)}
          {c.isNDA && <span className="tag-neutral">NDA · details generalised</span>}
        </div>
        <h1 className="text-3xl sm:text-5xl text-balance">{c.title}</h1>
        <p className="mt-4 text-lg text-muted">{c.summary}</p>
        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 font-mono text-xs">
          <div><dt className="text-muted">client</dt><dd>{c.client}</dd></div>
          <div><dt className="text-muted">when</dt><dd>{c.date}</dd></div>
          <div><dt className="text-muted">headline</dt><dd className={isAI ? "text-ai" : "text-ok"}>{c.headline}</dd></div>
        </dl>
      </header>

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_300px]">
        <ol className="space-y-6">
          {steps.map((s) => (
            <li key={s.n} className="card p-6 sm:p-8">
              <p className="eyebrow mb-3"><span className="text-accent">{s.n}</span> · {s.label}</p>
              <div className="leading-relaxed">{s.body}</div>
            </li>
          ))}
        </ol>

        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="card p-5">
            <p className="eyebrow mb-3">Stack</p>
            <div className="flex flex-wrap gap-1.5">
              {c.stack.map((s) => <span key={s} className="tag-neutral">{s}</span>)}
            </div>
          </div>
          {kpis.length > 0 && (
            <div className="card p-5">
              <p className="eyebrow mb-3">By the numbers</p>
              <dl className="grid grid-cols-2 gap-4">
                {kpis.map((k) => (
                  <div key={k.label}>
                    <dd className="font-mono text-xl text-accent">{k.value}</dd>
                    <dt className="text-xs text-muted">{k.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          )}
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="mb-6 text-2xl">Related work</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => <CaseCard key={r.slug} c={r} />)}
          </div>
        </section>
      )}
    </article>
  );
}
