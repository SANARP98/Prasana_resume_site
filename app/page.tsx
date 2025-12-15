"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import CaseCard from "@/components/CaseCard";
import ExperienceCard from "@/components/ExperienceCard";
import { featuredCases, allExperiences } from "@/data/cases";

export default function Home() {
  return (
    <div className="container-custom py-16">
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* LEFT COLUMN - Profile, Bio, Study, Info */}
        <div className="space-y-16">
          {/* Profile Introduction */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-start gap-6 mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent to-cyan-400 flex-shrink-0" />
              <div>
                <h1 className="text-4xl font-black mb-1">Prasana Renganathan</h1>
                <p className="text-lg uppercase text-mediumGray mb-4">DevSecOps & Cloud Security Engineer</p>
              </div>
            </div>
            <p className="text-base leading-relaxed">
              I build and secure{" "}
              <Link href="https://gritgo.in" className="text-accent hover:underline" target="_blank">
                production systems
              </Link>{" "}
              on Azure and Kubernetes. DevSecOps specialist with 5+ years architecting secure CI/CD pipelines,
              implementing{" "}
              <span className="text-accent">AI-driven security automation</span>, and designing{" "}
              <Link href="/cases/gritgo-trading-bot" className="hover:underline">
                quant-style algorithmic trading systems
              </Link>
              . Working globally with enterprise clients across Europe and the US.
            </p>
          </motion.section>

          {/* Education Section */}
          <Section title="Study" delay={0.2}>
            <ul className="space-y-2 text-sm">
              <li>🎓 B.Tech Electronics and Communication Engineering, SASTRA University (2016-2020)</li>
              <li>📚 Higher Secondary, Campion Anglo Indian Higher Secondary School (2014-2016)</li>
            </ul>
          </Section>

          {/* Tools & Info Section */}
          <Section title="Info" delay={0.3}>
            <div className="space-y-4">
              <p className="mb-4 text-sm leading-relaxed">
                I specialize in <span className="font-semibold">DevSecOps, Cloud Security Architecture, and AI-driven Security Automation</span>.
                My work focuses on building secure-by-default systems, implementing automated security testing across the SDLC,
                and designing production-grade infrastructure on Azure and Kubernetes with strong observability.
              </p>

              {/* Cloud & Infrastructure */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Cloud & Infrastructure:</span> Microsoft Azure, Azure DevOps Services, Azure Key Vault, Azure Monitor, Application Insights, Azure Container Registry, Network Watcher, Azure Traffic Manager, Azure Web Applications Firewall (WAF), Azure Application Gateway, Azure Resource Manager (ARM), Azure Bicep, Terraform, Ansible, Azure Database for PostgreSQL
              </div>

              {/* Containers & Kubernetes */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Containers & Kubernetes:</span> Docker, Kubernetes, Helm, Helm Charts, Container Registries, Container Networking, Container Security, Pod Security, Deployments, StatefulSets, Jobs, Kubernetes Readiness/Liveness Probes
              </div>

              {/* CI/CD & Pipeline Security */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">CI/CD & Pipeline Security:</span> Azure DevOps, GitHub Actions, GitLab CI/CD, Bamboo, Secure Pipeline Design, Automated Security Gates, Artifact Scanning, Container Image Scanning, Secrets Management, GitOps
              </div>

              {/* Security & Compliance */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Security & Compliance:</span> DevSecOps, SAST / DAST / SCA Automation, Web Application Penetration Testing, Cloud Security Audits, Security Architecture, Vulnerability Assessment & Remediation, Kubernetes Security, SBOM Generation & Verification, Secrets Detection (AI-driven), Compliance Frameworks (PCI DSS, NIST CSF, ISO 27001, SOC 2, HIPAA, TX-RAMP, CIS Benchmarks, OWASP)
              </div>

              {/* Security Tools & Scanning */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Security Tools & Scanning:</span> SonaQube, Burp Suite Pro, OWASP ZAP, Trivy, Grype, Styyk, Checkov, JFrog Xray, ScanCode, ORT Scan (OSS Review Toolkit), Nerdctl, Trufflehog, git-secrets, Nmap, OpenVAS, Nessus, Azure OpenAI (AI-driven IaC and security automation)
              </div>

              {/* AI, LLM & RAG Systems */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">AI, LLM & RAG Systems:</span> Retrieval-Augmented Generation (RAG), ChromaDB, Vector Databases, Embeddings, Git Repository Indexing, Code Chunking & Metadata Design, Codex CLI, ChatGPT Enterprise, Grazily, AI-driven IaC Scanning & Remediation, AI-assisted Secrets Detection, LLM Usage Proxy / Guardian Systems
              </div>

              {/* Observability & Monitoring */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Observability & Monitoring:</span> Prometheus, Grafana, ELK Stack, Azure Monitor, Application Insights, Microsoft Sentinel, Log Aggregation, Alert Management, Dashboard Design
              </div>

              {/* Infrastructure as Code (IaC) & Automation */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Infrastructure as Code (IaC) & Automation:</span> Terraform, Ansible, Azure Bicep, ARM Templates, Git, Git Workflows (branching, pull requests, code review), Bash Scripting, Infrastructure Provisioning, Configuration Management, Policy as Code (Checkov, Sentinel)
              </div>

              {/* Backend Development & APIs */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Backend Development & APIs:</span> Python, Node.js, Go, Flask, REST APIs, Microservices Architecture, API Security, HTTP Proxy Services, Production Deployment
              </div>

              {/* Databases & Messaging */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Databases & Messaging:</span> PostgreSQL, Azure Database for PostgreSQL, MongoDB, TimeseriesDB, SQLite, MySQL, Apache Kafka, pgbadger, SQLPad, Redash, Apache Superset, CloudBeaver, Database Security, Event-Driven Architecture
              </div>

              {/* DevOps & Best Practices */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">DevOps & Best Practices:</span> Linux, Nginx, Docker Compose, Blue-Green Deployments, Canary Deployments, Health Checks, Auto-Scaling, Load Balancing, Chrome Extension Integration, Developer Productivity / DevEx Tools
              </div>

              {/* Collaboration & Project Management */}
              <div className="text-sm text-mediumGray leading-relaxed">
                <span className="font-semibold text-darkGray">Collaboration & Project Management:</span> Git, GitHub, Visual Studio Code, Cross-functional Collaboration, Stakeholder Management
              </div>
            </div>
          </Section>
        </div>

        {/* RIGHT COLUMN - Experience and Cases */}
        <div className="space-y-12">
          {/* Experience Section */}
          <Section title="Experience" delay={0.4}>
            <div className="space-y-6">
              {allExperiences.map((exp, index) => (
                <ExperienceCard key={index} experience={exp} />
              ))}
            </div>
          </Section>

          {/* Cases Section */}
          <Section title="Cases" delay={0.5}>
            <div className="space-y-6">
              {featuredCases.map((caseItem, index) => (
                <CaseCard key={caseItem.slug} caseItem={caseItem} index={index} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/cases"
                className="inline-block px-6 py-2 border border-darkGray rounded-md hover:bg-darkGray hover:text-cream transition-colors uppercase text-xs font-bold"
              >
                All Cases
              </Link>
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  delay = 0
}: {
  title: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="mb-20"
    >
      <h2 className="text-sm uppercase tracking-wider text-mediumGray mb-6 font-bold">
        {title}
      </h2>
      <div className="max-w-3xl">
        {children}
      </div>
    </motion.section>
  );
}

