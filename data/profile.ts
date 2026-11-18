// Single source of truth for identity, positioning and site-wide copy.
// The chatbot knowledge base (lib/knowledge.ts) is generated from this file
// plus data/experience.ts, data/cases.ts and data/skills.ts.

export type Track = "ai" | "platform";

export interface Metric {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  track: Track | "both";
  source: string; // where the number comes from (kpis.json / CV)
}

export const profile = {
  name: "Prasana Renganathan",
  initials: "PR",
  photo: null as string | null, // [TODO] add e.g. "/img/prasana.jpg"
  title: "Forward Deployed Engineer · AI Security & Platform",
  formerTitle: "DevSecOps & Cloud Security Engineer",
  positioning:
    "The FDE who ships agentic AI into regulated enterprises, and also runs the platform under it.",
  summary:
    "5+ years building, securing and operating production systems on Azure and Kubernetes for enterprise clients across Europe and the US. I build LLM tooling that has to pass an audit, like AI-driven IaC remediation, AI secrets detection, LLM usage guardrails and RAG over code. I also own the Terraform, Kubernetes, CI/CD and SRE work it runs on.",
  location: "India-based · open to UAE / KSA / Qatar, US and India", // [TODO] confirm
  email: "sanarp1998@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/prasana-r-324b1526/",
    github: "https://github.com/SANARP98",
    site: "https://gritgo.in/portfolio",
    gritgo: "https://gritgo.in",
  },
  education: [
    {
      degree: "B.Tech, Electronics and Communication Engineering",
      school: "SASTRA University",
      period: "2016 – 2020",
    },
    {
      degree: "Higher Secondary",
      school: "Campion Anglo Indian Higher Secondary School",
      period: "2014 – 2016",
    },
  ],
  languages: [
    { name: "English", level: "Native / bilingual" },
    { name: "Tamil", level: "Native / bilingual" },
    { name: "Hindi", level: "Limited working" },
    { name: "French", level: "Limited working" },
  ],
};

// Hero counters. Values are taken from kpis.json and the CV, so re-check
// them against your own records before publishing.
export const heroMetrics: Metric[] = [
  { value: 5, suffix: "+", label: "years in production", track: "both", source: "CV" },
  { value: 10, suffix: "M+", label: "lines of code scanned by AI", track: "ai", source: "kpis.json · Qualitest" },
  { value: 40, suffix: "+", label: "apps behind security gates", track: "platform", source: "kpis.json · Qualitest" },
  { value: 13, suffix: "+", label: "apps migrated to AKS", track: "platform", source: "kpis.json · Adaptive" },
];

export const halves = {
  ai: {
    title: "Ship the AI",
    blurb:
      "Agents, RAG and LLM governance built for regulated enterprises, with evaluation, guardrails and audit trails included from the start.",
    points: [
      "Azure OpenAI pipeline that scans, patches and re-verifies Terraform / Bicep / ARM",
      "AI secrets detection over 10M+ lines, using a model trained on company-specific patterns",
      "LLM usage proxy and Chrome extension that checks ChatGPT and Claude prompts for sensitive data",
      "Local RAG assistant over Git repos (ChromaDB, embeddings, Codex CLI, ChatGPT Enterprise)",
    ],
  },
  platform: {
    title: "Run the platform",
    blurb:
      "The Terraform, Kubernetes, CI/CD, security and observability that keep the AI working after the demo.",
    points: [
      "Terraform + Helm on AKS, with 13+ apps containerized and migrated",
      "SAST / DAST / SCA / container / secrets gates across 5 CI/CD platforms",
      "SOX and TX-RAMP evidence, automated secret rotation and Okta SSO",
      "Prometheus, Grafana, Sumo Logic and ELK dashboards with alerting",
    ],
  },
};

// The FDE loop, shown as an auto-advancing stepper on the home page.
export const fdeLoop = [
  {
    step: "Discover",
    line: "Sit with the client team, map the workflow, find where risk and value are.",
    proof: "Security posture reviews for enterprise clients in Europe and the US",
  },
  {
    step: "Prototype",
    line: "Ship a working agent or RAG slice against real data in days, not quarters.",
    proof: "Git-RAG assistant: indexing, embeddings and a chat UI, packaged as a Docker PoC",
  },
  {
    step: "Deploy",
    line: "Put it on infrastructure the client already trusts, using IaC with no hand-built servers.",
    proof: "Terraform + Helm on AKS, with GitLab / Azure DevOps pipelines",
  },
  {
    step: "Harden",
    line: "Guardrails, secrets, SBOMs, access reviews. Pass the audit before anyone asks for one.",
    proof: "LLM usage proxy, AI secrets detection, SOX / TX-RAMP evidence",
  },
  {
    step: "Operate",
    line: "Dashboards, alerts, rollouts and on-call. The demo is the easy part.",
    proof: "Prometheus / Grafana / Sumo Logic, plus LaunchDarkly canaries",
  },
  {
    step: "Hand over",
    line: "Docs, workshops and runbooks, so the client team can own it after I leave.",
    proof: "50+ engineers upskilled through DevSecOps and IaC workshops",
  },
];
