import type { Metadata } from "next";
import Link from "next/link";
import { CaseExplorer } from "@/components/cases";
import { allCases } from "@/data/cases";

export const metadata: Metadata = { title: "Case studies · Prasana Renganathan" };

export default function CasesPage() {
  return (
    <div className="container-custom py-16">
      <Link href="/" className="eyebrow hover:text-accent">← Home</Link>
      <h1 className="mt-4 text-4xl sm:text-5xl">Case studies</h1>
      <p className="mb-10 mt-3 max-w-2xl text-muted">
        Everything from production AI security tooling to the university prototypes that started it. Filter by half or search by stack.
      </p>
      <CaseExplorer cases={allCases} showSearch />
    </div>
  );
}
