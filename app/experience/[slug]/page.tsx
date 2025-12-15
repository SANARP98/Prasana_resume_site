import { notFound } from "next/navigation";
import { allExperiences } from "@/data/cases";
import ExperienceDetailClient from "@/components/ExperienceDetailClient";

export async function generateStaticParams() {
  return allExperiences.map((exp) => ({
    slug: exp.slug,
  }));
}

export default function ExperienceDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const experience = allExperiences.find((exp) => exp.slug === params.slug);

  if (!experience) {
    notFound();
  }

  // Get related experiences (exclude current one)
  const relatedExperiences = allExperiences
    .filter((exp) => exp.slug !== experience.slug)
    .slice(0, 3);

  return <ExperienceDetailClient experience={experience} relatedExperiences={relatedExperiences} />;
}
