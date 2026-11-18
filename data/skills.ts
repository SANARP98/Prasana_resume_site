import type { Track } from "./profile";

export interface SkillCategory {
  title: string;
  track: Track;
  skills: string[];
}

const raw: { title: string; skills: string[] }[] = [
  {
    title: "Cloud & Infrastructure",
    skills: [
      "Microsoft Azure",
      "Azure DevOps Services",
      "Azure Key Vault",
      "Azure Monitor",
      "Application Insights",
      "Azure Container Registry",
      "Network Watcher",
      "Azure Traffic Manager",
      "Azure Web Applications Firewall (WAF)",
      "Azure Application Gateway",
      "Azure Resource Manager (ARM)",
      "Azure Bicep",
      "Terraform",
      "Ansible",
      "Azure Database for PostgreSQL"
    ]
  },
  {
    title: "Containers & Kubernetes",
    skills: [
      "Docker",
      "Kubernetes",
      "Helm",
      "Helm Charts",
      "Container Registries",
      "Container Networking",
      "Container Security",
      "Pod Security",
      "Deployments",
      "StatefulSets",
      "Jobs",
      "Kubernetes Readiness/Liveness Probes"
    ]
  },
  {
    title: "CI/CD & Pipeline Security",
    skills: [
      "Azure DevOps",
      "GitHub Actions",
      "GitLab CI/CD",
      "Bamboo",
      "Secure Pipeline Design",
      "Automated Security Gates",
      "Artifact Scanning",
      "Container Image Scanning",
      "Secrets Management",
      "GitOps"
    ]
  },
  {
    title: "Security & Compliance",
    skills: [
      "DevSecOps",
      "SAST / DAST / SCA Automation",
      "Web Application Penetration Testing",
      "Cloud Security Audits",
      "Security Architecture",
      "Vulnerability Assessment & Remediation",
      "Kubernetes Security",
      "SBOM Generation & Verification",
      "Secrets Detection (AI-driven)",
      "PCI DSS",
      "NIST CSF",
      "ISO 27001",
      "SOC 2",
      "HIPAA",
      "TX-RAMP",
      "CIS Benchmarks",
      "OWASP"
    ]
  },
  {
    title: "Security Tools & Scanning",
    skills: [
      "SonaQube",
      "Burp Suite Pro",
      "OWASP ZAP",
      "Trivy",
      "Grype",
      "Styyk",
      "Checkov",
      "JFrog Xray",
      "ScanCode",
      "ORT Scan (OSS Review Toolkit)",
      "Nerdctl",
      "Trufflehog",
      "git-secrets",
      "Nmap",
      "OpenVAS",
      "Nessus",
      "Azure OpenAI (AI-driven IaC and security automation)"
    ]
  },
  {
    title: "AI, LLM & RAG Systems",
    skills: [
      "Retrieval-Augmented Generation (RAG)",
      "ChromaDB",
      "Vector Databases",
      "Embeddings",
      "Git Repository Indexing",
      "Code Chunking & Metadata Design",
      "Codex CLI",
      "ChatGPT Enterprise",
      "Gradio",
      "AI-driven IaC Scanning & Remediation",
      "AI-assisted Secrets Detection",
      "LLM Usage Proxy / Guardrail Systems"
    ]
  },
  {
    title: "Observability & Monitoring",
    skills: [
      "Prometheus",
      "Grafana",
      "ELK Stack",
      "Azure Monitor",
      "Application Insights",
      "Microsoft Sentinel",
      "Log Aggregation",
      "Alert Management",
      "Dashboard Design"
    ]
  },
  {
    title: "Infrastructure as Code (IaC) & Automation",
    skills: [
      "Terraform",
      "Ansible",
      "Azure Bicep",
      "ARM Templates",
      "Git",
      "Git Workflows (branching, pull requests, code review)",
      "Bash Scripting",
      "Infrastructure Provisioning",
      "Configuration Management",
      "Policy as Code (Checkov, Sentinel)"
    ]
  },
  {
    title: "Backend Development & APIs",
    skills: [
      "Python",
      "Node.js",
      "Go",
      "Flask",
      "REST APIs",
      "Microservices Architecture",
      "API Security",
      "HTTP Proxy Services",
      "Production Deployment"
    ]
  },
  {
    title: "Databases & Messaging",
    skills: [
      "PostgreSQL",
      "Azure Database for PostgreSQL",
      "MongoDB",
      "TimeseriesDB",
      "SQLite",
      "MySQL",
      "Apache Kafka",
      "pgbadger",
      "SQLPad",
      "Redash",
      "Apache Superset",
      "CloudBeaver",
      "Database Security",
      "Event-Driven Architecture"
    ]
  },
  {
    title: "DevOps & Best Practices",
    skills: [
      "Linux",
      "Nginx",
      "Docker Compose",
      "Blue-Green Deployments",
      "Canary Deployments",
      "Health Checks",
      "Auto-Scaling",
      "Load Balancing",
      "Chrome Extension Integration",
      "Developer Productivity / DevEx Tools"
    ]
  },
  {
    title: "Collaboration & Project Management",
    skills: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      "Cross-functional Collaboration",
      "Stakeholder Management"
    ]
  }
];

const aiCategories = new Set(["AI, LLM & RAG Systems", "Backend Development & APIs"]);

export const skillCategories: SkillCategory[] = raw
  .map((c): SkillCategory => ({
    ...c,
    track: aiCategories.has(c.title) ? "ai" : "platform",
  }))
  // AI first, so the positioning reads top-down.
  .sort((a, b) => (a.track === b.track ? 0 : a.track === "ai" ? -1 : 1));

// Short, high-signal list for the home-page skill map.
export const coreSkills: { name: string; track: Track }[] = [
  { name: "RAG / embeddings", track: "ai" },
  { name: "Azure OpenAI", track: "ai" },
  { name: "LLM guardrails / DLP", track: "ai" },
  { name: "AI code + IaC remediation", track: "ai" },
  { name: "ChromaDB / vector DBs", track: "ai" },
  { name: "Codex CLI / ChatGPT Enterprise", track: "ai" },
  { name: "n8n / agent workflows", track: "ai" },
  { name: "Python · Go · Node.js", track: "ai" },
  { name: "Terraform / Bicep", track: "platform" },
  { name: "Kubernetes / Helm", track: "platform" },
  { name: "Azure", track: "platform" },
  { name: "CI/CD security gates", track: "platform" },
  { name: "SAST · DAST · SCA", track: "platform" },
  { name: "Okta SSO / RBAC", track: "platform" },
  { name: "SOX · TX-RAMP · PCI DSS", track: "platform" },
  { name: "Prometheus / Grafana", track: "platform" },
];
