import Link from "next/link";
import { Hero, Halves, FdeLoop, ExperienceTimeline, SkillMap, AboutContact } from "@/components/home";
import { CaseExplorer } from "@/components/cases";
import { SectionHeading } from "@/components/ui";
import { featuredCases } from "@/data/cases";

export default function Home() {
  return (
    <>
      <Hero />
      <Halves />
      <FdeLoop />
      <section className="container-custom py-20">
        <SectionHeading
          id="work"
          eyebrow="03 · Proof"
          title="Case studies: problem, what I built, result."
          kicker="Filter by half. The ones that need both are the ones I like most."
        />
        <CaseExplorer cases={featuredCases} />
        <Link href="/cases/" className="btn-ghost mt-8">
          All case studies, including prototypes →
        </Link>
      </section>
      <ExperienceTimeline />
      <SkillMap />
      <AboutContact />
    </>
  );
}
