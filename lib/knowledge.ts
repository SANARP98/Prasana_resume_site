// Chatbot knowledge base, generated from the typed data files.
// The same `knowledgeBase` string can be sent to /api/chat as system context;
// `localAnswer` is the offline fallback used when the backend is unavailable.

import { profile, halves, fdeLoop } from "@/data/profile";
import { allExperiences } from "@/data/experience";
import { allCases } from "@/data/cases";
import { skillCategories } from "@/data/skills";

export interface KBDoc {
  id: string;
  title: string;
  href: string;
  text: string;
}

export const kbDocs: KBDoc[] = [
  {
    id: "profile",
    title: "About Prasana",
    href: "/#top",
    text: `${profile.name}. ${profile.title}. ${profile.positioning} ${profile.summary} ${profile.location}. Email ${profile.email}.`,
  },
  {
    id: "halves",
    title: "Ship the AI / Run the platform",
    href: "/#halves",
    text: `${halves.ai.title}: ${halves.ai.blurb} ${halves.ai.points.join(". ")}. ${halves.platform.title}: ${halves.platform.blurb} ${halves.platform.points.join(". ")}.`,
  },
  {
    id: "loop",
    title: "How I work (FDE loop)",
    href: "/#loop",
    text: fdeLoop.map((s) => `${s.step}: ${s.line} Proof: ${s.proof}`).join(" "),
  },
  {
    id: "education",
    title: "Education & languages",
    href: "/#about",
    text:
      profile.education.map((e) => `${e.degree}, ${e.school} (${e.period})`).join(". ") +
      ". Languages: " +
      profile.languages.map((l) => `${l.name} (${l.level})`).join(", "),
  },
  ...allExperiences.map((e) => ({
    id: `exp-${e.slug}`,
    title: `${e.role} @ ${e.company}`,
    href: `/experience/${e.slug}/`,
    text: `${e.role} at ${e.company}, ${e.period}. ${e.summary} ${e.aiAngle} ${e.highlights.map((h) => h.text).join(". ")}. Stack: ${e.stack.join(", ")}.`,
  })),
  ...allCases.map((c) => ({
    id: `case-${c.slug}`,
    title: c.title,
    href: `/cases/${c.slug}/`,
    text: `${c.title} (${c.client}, ${c.date}). ${c.summary} ${c.whatIDid.join(". ")}. ${c.whyItMatters} Results: ${(c.results ?? []).join(". ")}. Stack: ${c.stack.join(", ")}.`,
  })),
  ...skillCategories.map((s) => ({
    id: `skills-${s.title}`,
    title: `Skills: ${s.title}`,
    href: "/skills/",
    text: `${s.title}: ${s.skills.join(", ")}.`,
  })),
];

export const knowledgeBase = kbDocs.map((d) => `## ${d.title}\n${d.text}`).join("\n\n");

const STOP = new Set(
  "a an the and or of to in on for with is are was were be do does did has have i you he his him me my your what which who how when where why can could tell about any some this that it at as by from".split(" ")
);

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9+#./ -]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !STOP.has(t));
}

const SYNONYMS: Record<string, string[]> = {
  ai: ["llm", "openai", "rag", "agent", "ai-driven", "ai-assisted", "embeddings", "chatgpt"],
  llm: ["ai", "openai", "chatgpt", "claude", "rag"],
  k8s: ["kubernetes", "aks", "helm"],
  kubernetes: ["aks", "helm", "k8s"],
  security: ["devsecops", "sast", "dast", "pentest", "secrets", "compliance"],
  regulated: ["sox", "tx-ramp", "pci", "compliance", "audit", "finance"],
  compliance: ["sox", "tx-ramp", "pci", "soc", "iso", "nist", "audit"],
  iac: ["terraform", "bicep", "arm", "ansible"],
  contact: ["email", "linkedin", "github"],
  hire: ["contact", "email"],
  school: ["education", "sastra", "b.tech"],
  education: ["sastra", "b.tech", "degree"],
  trading: ["gritgo", "quant", "derivatives"],
};

/** Tiny lexical retriever: good enough to point people at the right page. */
export function retrieve(query: string, k = 3): KBDoc[] {
  const q = tokens(query).flatMap((t) => [t, ...(SYNONYMS[t] ?? [])]);
  if (!q.length) return [];
  return kbDocs
    .map((d) => {
      const hay = (d.title + " " + d.text).toLowerCase();
      const title = d.title.toLowerCase();
      let score = 0;
      for (const t of q) {
        const n = hay.split(t).length - 1; // occurrences
        score += Math.min(n, 4) + (title.includes(t) ? 3 : 0);
      }
      // Overview docs mention everything; prefer concrete evidence.
      if (d.id === "loop" || d.id === "halves") score *= 0.4;
      if (d.id.startsWith("skills-") || d.id === "profile") score *= 0.7;
      return { d, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, k)
    .map((x) => x.d);
}

function firstSentences(text: string, n = 2, skip = 0) {
  const parts = text.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [text];
  return parts.slice(skip, skip + n).join(" ").trim();
}

export function localAnswer(query: string): { text: string; sources: KBDoc[] } {
  const q = query.toLowerCase();
  if (/(email|contact|reach|hire|available)/.test(q)) {
    return {
      text: `The quickest route is ${profile.email}, or LinkedIn. He's open to FDE roles in the UAE, KSA, Qatar, US and India. Fair warning: he replies faster than most CI pipelines.`,
      sources: kbDocs.filter((d) => d.id === "profile"),
    };
  }
  const hits = retrieve(query);
  if (!hits.length) {
    return {
      text: "I couldn't find that in Prasana's record. I only know what's on this site, which is less fun but much easier to audit. Try asking about RAG, Kubernetes, compliance or a specific project.",
      sources: [],
    };
  }
  const [top, ...rest] = hits;
  const also = rest.length ? `\n\nAlso relevant: ${rest.map((r) => r.title).join(" · ")}.` : "";
  return {
    text: `Best match: ${top.title}.\n${firstSentences(top.text, 2, /^(case|exp)-/.test(top.id) ? 1 : 0)}${also}`,
    sources: [top, ...rest],
  };
}
