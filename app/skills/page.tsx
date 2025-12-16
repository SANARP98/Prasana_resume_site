"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
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
      "Grazily",
      "AI-driven IaC Scanning & Remediation",
      "AI-assisted Secrets Detection",
      "LLM Usage Proxy / Guardian Systems"
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

function SkillCategoryCard({ category, index }: { category: SkillCategory; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="border border-darkGray/10 rounded-lg overflow-hidden"
    >
      {/* Category Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-darkGray/5 transition-colors"
      >
        <h3 className="text-lg font-bold text-darkGray">{category.title}</h3>
        <div className="flex items-center gap-3">
          <span className="text-xs text-mediumGray">{category.skills.length} skills</span>
          <motion.span
            animate={{ rotate: isExpanded ? 90 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-accent text-xl"
          >
            →
          </motion.span>
        </div>
      </button>

      {/* Expandable Skills List */}
      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 bg-cream border-t border-darkGray/10">
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {category.skills.map((skill, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.02 }}
                className="flex items-start gap-2 text-sm text-mediumGray"
              >
                <span className="text-accent mt-1 text-xs">•</span>
                <span>{skill}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function SkillsPage() {
  return (
    <div className="container-custom py-20">
      {/* Back Link */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <Link
          href="/"
          className="text-sm uppercase text-mediumGray hover:text-accent transition-colors"
        >
          ← Home
        </Link>
      </motion.div>

      {/* Title */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12"
      >
        <h1 className="text-5xl font-black mb-4">Skills & Technologies</h1>
        <p className="text-lg text-mediumGray max-w-2xl">
          Comprehensive list of technologies, tools, and frameworks I work with across DevSecOps, Cloud Security, and AI-driven automation.
        </p>
      </motion.header>

      {/* Skills Grid */}
      <div className="space-y-4">
        {skillCategories.map((category, index) => (
          <SkillCategoryCard key={category.title} category={category} index={index} />
        ))}
      </div>
    </div>
  );
}
