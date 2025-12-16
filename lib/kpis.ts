import kpisData from "@/kpis.json";
import { KPI } from "@/components/KPIDisplay";

export interface ExperienceKPIs {
  id: string;
  company: string;
  role: string;
  period: string;
  kpis: KPI[];
}

export interface ProjectKPIs {
  id: string;
  name: string;
  kpis: KPI[];
}

export function getKPIsForExperience(experienceId: string): KPI[] {
  const experience = kpisData.experiences.find((exp) => exp.id === experienceId);
  return experience?.kpis || [];
}

export function getTopKPIsForExperience(experienceId: string, count: number = 3): KPI[] {
  const kpis = getKPIsForExperience(experienceId);
  return kpis.slice(0, count);
}

export function getKPIsForProject(projectId: string): KPI[] {
  const project = kpisData.projects[projectId as keyof typeof kpisData.projects];
  return project?.kpis || [];
}

export function getAllExperienceKPIs(): ExperienceKPIs[] {
  return kpisData.experiences;
}

// Helper to categorize KPIs by type for smart rendering
export function categorizeKPIs(kpis: KPI[]) {
  const percentages: KPI[] = [];
  const counts: KPI[] = [];
  const reductions: KPI[] = [];
  const others: KPI[] = [];

  kpis.forEach((kpi) => {
    const value = kpi.value.toLowerCase();

    if (value.includes("%")) {
      percentages.push(kpi);
    } else if (value.includes("reduction") || kpi.label.toLowerCase().includes("reduction") || kpi.label.toLowerCase().includes("improvement")) {
      reductions.push(kpi);
    } else if (value.match(/^\d+\+?$/)) {
      counts.push(kpi);
    } else {
      others.push(kpi);
    }
  });

  return { percentages, counts, reductions, others };
}

// Map experience slugs to KPI IDs
export const experienceSlugToKPIId: Record<string, string> = {
  "qualitest-group": "qualitest-cyber-security-specialist",
  "adaptive-biotechnologies": "adaptive-platform-engineer",
  "baxtor-credit-union": "bcu-cyber-security-engineer",
  "national-car-parks": "ncp-cyber-security-engineer",
};

export function getKPIIdFromSlug(slug: string): string {
  return experienceSlugToKPIId[slug] || slug;
}
