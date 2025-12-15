import { notFound } from "next/navigation";
import Link from "next/link";
import { allCases } from "@/data/cases";
import CaseDetailClient from "@/components/CaseDetailClient";

export async function generateStaticParams() {
  return allCases.map((caseItem) => ({
    slug: caseItem.slug,
  }));
}

export default function CaseDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const caseItem = allCases.find((c) => c.slug === params.slug);

  if (!caseItem) {
    notFound();
  }

  // Get related cases (exclude current one, take 4)
  const relatedCases = allCases
    .filter((c) => c.slug !== caseItem.slug)
    .slice(0, 4);

  return <CaseDetailClient caseItem={caseItem} relatedCases={relatedCases} />;
}
