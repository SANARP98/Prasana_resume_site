"use client";

import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { profile, heroMetrics, halves, fdeLoop, type Track } from "@/data/profile";
import { allExperiences } from "@/data/experience";
import { coreSkills } from "@/data/skills";
import { CountUp, Icon, Reveal, SectionHeading, TrackTag } from "./ui";

/* ================= Hero ================= */

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line/10">
      <div aria-hidden className="bg-blueprint pointer-events-none absolute inset-0" />
      <div className="container-custom relative py-16 sm:py-24">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="mb-8 flex items-center gap-4">
            {profile.photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={profile.photo} alt={profile.name} className="h-16 w-16 flex-none rounded-full object-cover ring-2 ring-accent/30" />
            ) : (
              <div
                aria-label={`${profile.name} monogram`}
                className="flex h-16 w-16 flex-none items-center justify-center rounded-full bg-gradient-to-br from-accent to-ai font-mono text-lg text-white ring-4 ring-accent/10"
              >
                {profile.initials}
              </div>
            )}
            <div>
              <p className="font-semibold">{profile.name}</p>
              <p className="eyebrow mt-1">{profile.title}</p>
            </div>
          </div>

          <h1 className="max-w-4xl text-4xl sm:text-5xl lg:text-6xl text-balance">
            The FDE who ships <span className="text-ai">agentic AI</span> into regulated enterprises, and also{" "}
            <span className="text-ok">runs the platform</span> under it.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted">{profile.summary}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#work" className="btn-primary">
              See the proof {Icon.arrow}
            </a>
            <a href={`mailto:${profile.email}`} className="btn-ghost">
              {profile.email}
            </a>
            <div className="ml-1 flex gap-2">
              {[
                { href: profile.links.linkedin, label: "LinkedIn", icon: Icon.linkedin },
                { href: profile.links.github, label: "GitHub", icon: Icon.github },
                { href: profile.links.gritgo, label: "Gritgo (live project)", icon: Icon.globe },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-line/20 transition hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line/10 bg-line/10 lg:grid-cols-4">
          {heroMetrics.map((m) => (
            <div key={m.label} className="flex flex-col-reverse bg-bg/90 p-5">
              <dt className="mt-1 text-xs text-muted">{m.label}</dt>
              <dd
                className={`font-mono text-3xl ${m.track === "ai" ? "text-ai" : m.track === "platform" ? "text-ok" : "text-fg"}`}
              >
                <CountUp value={m.value} prefix={m.prefix} suffix={m.suffix} />
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-3 font-mono text-[10px] text-muted">
          <span className="text-fg/70">$</span> numbers from internal KPI records · ask me how they were measured
        </p>
      </div>
    </section>
  );
}

/* ================= Two halves ================= */

export function Halves() {
  const [active, setActive] = useState<Track | null>(null);
  return (
    <section className="container-custom py-20">
      <SectionHeading
        id="halves"
        eyebrow="01 · Positioning"
        title="Two halves, one engineer."
        kicker="Most FDE candidates bring one of these. Hover either side to see the proof."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {(["ai", "platform"] as Track[]).map((t, i) => {
          const h = halves[t];
          const isAI = t === "ai";
          const dim = active && active !== t;
          return (
            <Reveal key={t} delay={i * 0.08}>
              <div
                onMouseEnter={() => setActive(t)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(t)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                className={`relative h-full overflow-hidden p-7 transition duration-300 ${
                  isAI
                    ? "rounded-3xl border border-ai/25 bg-ai/[0.04] hover:shadow-glow"
                    : "rounded-md border border-ok/30 bg-ok/[0.03]"
                } ${dim ? "opacity-50" : "opacity-100"}`}
              >
                {!isAI && <div aria-hidden className="bg-grid-sm absolute inset-0 opacity-60" />}
                <div className="relative">
                  <TrackTag track={t} />
                  <h3 className="mt-4 text-2xl">{h.title}</h3>
                  <p className="mt-2 text-muted">{h.blurb}</p>
                  <ul className="mt-6 space-y-3">
                    {h.points.map((p) => (
                      <li key={p} className="flex gap-3 text-sm">
                        <span
                          aria-hidden
                          className={`mt-1.5 h-2 w-2 flex-none ${isAI ? "rounded-full bg-ai" : "rounded-[1px] bg-ok"}`}
                        />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

/* ================= FDE loop ================= */

export function FdeLoop() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setI((x) => (x + 1) % fdeLoop.length), 3800);
    return () => clearInterval(t);
  }, [paused, reduce]);

  const s = fdeLoop[i];
  return (
    <section className="border-y border-line/10 bg-surface/60">
      <div className="container-custom py-20">
        <SectionHeading
          id="loop"
          eyebrow="02 · How I work"
          title="The FDE loop, from first call to handover."
          kicker="Click any step. It pauses while you read."
        />
        <div onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <ol className="grid grid-cols-3 gap-2 sm:grid-cols-6" role="tablist" aria-label="FDE loop steps">
            {fdeLoop.map((step, idx) => (
              <li key={step.step}>
                <button
                  role="tab"
                  aria-selected={idx === i}
                  onClick={() => {
                    setI(idx);
                    setPaused(true);
                  }}
                  className={`group w-full text-left`}
                >
                  <div className="h-1 overflow-hidden rounded-full bg-line/10">
                    <motion.div
                      className="h-full bg-accent"
                      initial={false}
                      animate={{ width: idx < i ? "100%" : idx === i ? "100%" : "0%" }}
                      transition={{ duration: idx === i && !paused && !reduce ? 3.6 : 0.2, ease: "linear" }}
                      key={idx === i ? `active-${i}-${paused}` : `idle-${idx}`}
                    />
                  </div>
                  <span className={`mt-3 block font-mono text-[11px] ${idx === i ? "text-accent" : "text-muted group-hover:text-fg"}`}>
                    {String(idx + 1).padStart(2, "0")} {step.step}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="card mt-8 min-h-[150px] p-7" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.step}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="grid gap-6 md:grid-cols-[1fr_1fr]"
              >
                <div>
                  <p className="eyebrow mb-2">Step {i + 1} / {fdeLoop.length}</p>
                  <h3 className="text-2xl">{s.step}</h3>
                  <p className="mt-2 text-muted">{s.line}</p>
                </div>
                <div className="rounded-lg border border-line/10 bg-bg p-4 font-mono text-xs">
                  <p className="text-muted">// proof</p>
                  <p className="mt-2 text-fg">{s.proof}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Experience timeline ================= */

export function ExperienceTimeline() {
  const [lens, setLens] = useState<"all" | Track>("all");
  const [open, setOpen] = useState<string | null>(allExperiences[0].slug);

  return (
    <section className="container-custom py-20">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          id="experience"
          eyebrow="04 · Experience"
          title="Embedded with enterprise teams since 2021."
          kicker="Pick a lens to see each role through the AI or the platform half."
        />
        <div className="mb-10 inline-flex rounded-lg border border-line/15 p-1 text-xs" role="radiogroup" aria-label="Experience lens">
          {(["all", "ai", "platform"] as const).map((l) => (
            <button
              key={l}
              role="radio"
              aria-checked={lens === l}
              onClick={() => setLens(l)}
              className={`rounded-md px-3 py-1.5 font-semibold transition ${
                lens === l ? (l === "ai" ? "bg-ai text-white dark:text-bg" : l === "platform" ? "bg-ok text-white dark:text-bg" : "bg-fg text-bg") : "text-muted hover:text-fg"
              }`}
            >
              {l === "all" ? "All" : l === "ai" ? "AI lens" : "Platform lens"}
            </button>
          ))}
        </div>
      </div>

      <ol className="relative space-y-4 border-l border-line/15 pl-6 sm:pl-8">
        {allExperiences.map((e) => {
          const items = e.highlights.filter((h) => lens === "all" || h.track === lens);
          const isOpen = open === e.slug;
          return (
            <li key={e.slug} className="relative">
              <span
                aria-hidden
                className={`absolute -left-[31px] top-6 h-3 w-3 rounded-full border-2 border-bg sm:-left-[39px] ${
                  e.highlights.some((h) => h.track === "ai") ? "bg-ai" : "bg-ok"
                }`}
              />
              <div className="card overflow-hidden">
                <button
                  className="flex w-full flex-col gap-1 p-5 text-left sm:flex-row sm:items-center sm:justify-between"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : e.slug)}
                >
                  <div>
                    <h3 className="text-lg tracking-tight">
                      {e.role} <span className="text-muted">@ {e.company}</span>
                    </h3>
                    <p className="mt-1 text-sm text-muted">{e.aiAngle}</p>
                  </div>
                  <span className="flex-none font-mono text-xs text-muted">{e.date}</span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="border-t border-line/10 p-5">
                        {items.length ? (
                          <ul className="space-y-2.5">
                            {items.map((h) => (
                              <li key={h.text} className="flex gap-3 text-sm">
                                <span
                                  aria-hidden
                                  className={`mt-1.5 h-2 w-2 flex-none ${h.track === "ai" ? "rounded-full bg-ai" : "rounded-[1px] bg-ok"}`}
                                />
                                {h.text}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-sm text-muted">
                            Pure security and platform work in this role. Every AI team needs someone like that.
                          </p>
                        )}
                        <div className="mt-5 flex flex-wrap items-center gap-1.5">
                          {e.stack.slice(0, 8).map((s) => (
                            <span key={s} className="tag-neutral">
                              {s}
                            </span>
                          ))}
                          <Link href={`/experience/${e.slug}/`} className="ml-auto flex items-center gap-1 text-xs font-semibold text-accent">
                            Full role & KPIs {Icon.arrow}
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

/* ================= Skill map ================= */

export function SkillMap() {
  const ai = coreSkills.filter((s) => s.track === "ai");
  const pf = coreSkills.filter((s) => s.track === "platform");
  return (
    <section className="border-y border-line/10 bg-surface/60">
      <div className="container-custom py-20">
        <SectionHeading id="skills" eyebrow="05 · Skill map" title="What I reach for, by half." />
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-ai/25 p-6">
              <p className="eyebrow mb-4 text-ai">Ship the AI</p>
              <div className="flex flex-wrap gap-2">
                {ai.map((s) => (
                  <span key={s.name} className="tag-ai text-xs">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="relative h-full overflow-hidden rounded-md border border-ok/30 p-6">
              <div aria-hidden className="bg-grid-sm absolute inset-0 opacity-50" />
              <p className="eyebrow relative mb-4 text-ok">Run the platform</p>
              <div className="relative flex flex-wrap gap-2">
                {pf.map((s) => (
                  <span key={s.name} className="tag-platform text-xs">
                    {s.name}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
        <Link href="/skills/" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-accent">
          All 150+ skills by category {Icon.arrow}
        </Link>
      </div>
    </section>
  );
}

/* ================= About + contact ================= */

export function AboutContact() {
  return (
    <section className="container-custom grid gap-10 py-20 md:grid-cols-2">
      <div id="about">
        <p className="eyebrow mb-3">06 · Background</p>
        <h2 className="mb-6 text-3xl">Study & languages</h2>
        <ul className="space-y-4">
          {profile.education.map((e) => (
            <li key={e.school} className="card p-4">
              <p className="font-semibold">{e.degree}</p>
              <p className="text-sm text-muted">
                {e.school} · <span className="font-mono">{e.period}</span>
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap gap-2">
          {profile.languages.map((l) => (
            <span key={l.name} className="tag-neutral">
              {l.name} · {l.level}
            </span>
          ))}
        </div>
      </div>

      <div id="contact" className="relative overflow-hidden rounded-2xl bg-fg p-8 text-bg">
        <div aria-hidden className="bg-blueprint absolute inset-0 opacity-40" />
        <div className="relative">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">07 · Contact</p>
          <h2 className="mt-3 text-3xl">Deploying AI somewhere regulated?</h2>
          <p className="mt-3 opacity-75">
            I&apos;m interviewing for Forward Deployed Engineer roles. {profile.location}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={`mailto:${profile.email}?subject=FDE%20role`} className="inline-flex items-center gap-2 rounded-md bg-bg px-4 py-2 text-xs font-semibold text-fg transition hover:opacity-90">
              Email me {Icon.arrow}
            </a>
            <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-md border border-bg/30 px-4 py-2 text-xs font-semibold transition hover:border-bg">
              {Icon.linkedin} LinkedIn
            </a>
          </div>
          <p className="mt-6 font-mono text-[11px] opacity-60">or ask the chatbot, bottom right. It only knows what&apos;s on this site.</p>
        </div>
      </div>
    </section>
  );
}
