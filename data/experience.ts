import type { Track } from "./profile";

export interface Highlight {
  text: string;
  track: Track;
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  period: string;
  date: string;
  summary: string;
  /** One-line framing of this role through the FDE / applied-AI lens. */
  aiAngle: string;
  /** Curated highlights, each tagged to one half of the positioning. */
  highlights: Highlight[];
  stack: string[];
  /** Full, original responsibility list (kept verbatim from the CV). */
  responsibilities: string[];
  kpiId: string;
}

export const allExperiences: Experience[] = [
  {
    slug: "qualitest-group",
    company: "Qualitest Group",
    role: "Cyber Security Specialist",
    period: "February 2021 - Present",
    date: "02/21 – Present",
    kpiId: "qualitest-cyber-security-specialist",
    summary:
      "Leading DevSecOps workflows and AI-driven security automation across enterprise CI/CD platforms. Architecting secure pipelines, implementing automated security testing, and building full-stack security products for global enterprise clients.",
    aiAngle:
      "Client-facing, embedded with enterprise teams in Europe and the US. I ship LLM-powered security tooling into their pipelines and run the platform it depends on.",
    highlights: [
      { track: "ai", text: "Built an AI-driven IaC scanning and remediation pipeline on Azure OpenAI, backed by a knowledge base of secure vs. insecure Terraform / Bicep / ARM patterns" },
      { track: "ai", text: "Built an AI-assisted secrets detector that chunks large codebases and calls an internal model trained on company-specific credential patterns" },
      { track: "ai", text: "Co-developed an LLM usage proxy (HTTP proxy + Chrome extension) that checks ChatGPT and Claude prompts for sensitive content" },
      { track: "platform", text: "Run SAST / DAST / SCA / container / secrets gates across Azure DevOps, Jenkins, GitHub Actions, GitLab CI and Bamboo" },
      { track: "platform", text: "Lead full-stack development of an in-house security product (Python, Node.js, Go, MongoDB) on AKS with Helm" },
      { track: "platform", text: "Embed PCI DSS, NIST CSF, CIS, OWASP, ISO 27001, SOC 2, HIPAA and TX-RAMP controls into IaC guardrails" },
    ],
    stack: ["Azure OpenAI", "Terraform", "Bicep", "Kubernetes", "Helm", "Python", "Go", "Node.js", "SonarQube", "Burp Suite", "Snyk", "Trivy", "Nuclei"],
    responsibilities: [
      "Architect and operate DevSecOps workflows, automating SAST (SonarQube), DAST (Burp Suite Pro, OWASP ZAP), SCA (Snyk) and template-based automated penetration testing using ProjectDiscovery Nuclei across enterprise CI/CD platforms (Azure DevOps, Jenkins, GitHub Actions, GitLab CI/CD, Bamboo)",
      "Integrate container image scanning (Trivy, Grype, JFrog Xray) and secret/source scanning (Gitleaks, TruffleHog, git-secrets) to detect vulnerabilities and hard-coded secrets early in the SDLC",
      "Design and implement secure CI/CD pipeline architecture with automated security gates, scan stages, artifact integrity checks and secrets management via Azure Key Vault",
      "Standardize infrastructure provisioning using Terraform, Ansible and Azure Bicep/ARM templates, reducing configuration drift and improving deployment consistency",
      "Design and implement an AI-driven IaC security scanning and remediation pipeline using Azure OpenAI and a custom knowledge base of secure vs. insecure Terraform/Bicep/ARM patterns",
      "Implement automated open-source and license compliance scanning using ScanCode and ORT Scan (OSS Review Toolkit) to generate SBOMs, identify license/compliance risks and feed results into CI/CD reports and governance dashboards",
      "Develop an AI-assisted secrets detection tool that processes large codebases into smaller chunks, calls an internal AI model (trained on company-specific sensitive terms and credential patterns) via API",
      "Co-develop an AI-enforced LLM usage proxy for tools like ChatGPT and Claude by building a backend HTTP proxy server and Chrome extension that intercept user prompts for sensitive-content checks",
      "Perform cloud security audits on Azure infrastructure, assessing IAM policies, network segmentation (NSGs, WAF, Application Gateway), configuration baselines and monitoring setups (Azure Monitor, Application Insights, Sumo Logic, ELK/EFK)",
      "Lead full-stack design and development of an in-house security product using Python, Node.js, Go and MongoDB, deployed on Azure as containerized microservices (Docker, Kubernetes, Helm)",
      "Implement Kubernetes security best practices (Pod Security Standards, CIS Kubernetes Benchmark validation) and automate web-application security testing, vulnerability tracking and reporting",
      "Consult with enterprise clients across Europe and the US on application and cloud security posture, performing vulnerability assessments, risk prioritization, root-cause analysis and secure-coding guidance for development teams",
      "Embed security and compliance frameworks (PCI DSS, NIST CSF, CIS Benchmarks, OWASP and, where applicable, ISO 27001, SOC 2, HIPAA, TX-RAMP) into IaC guardrails, pipeline policies, security checklists and code review processes",
      "Design and maintain observability and security monitoring using Prometheus, Grafana, Sumo Logic and ELK/EFK, building dashboards and alerts for CI/CD pipelines, containerized workloads and Azure infrastructure",
      "Conduct security testing and penetration testing (pentesting) for internal tools and platforms, providing detailed vulnerability analysis, remediation plans and secure-coding guidance",
      "Lead team upskilling initiatives on DevSecOps practices, IaC security, Kubernetes hardening and vulnerability management through knowledge-sharing sessions and hands-on workshops",
    ],
  },
  {
    slug: "adaptive-biotechnologies",
    company: "Adaptive Biotechnologies",
    role: "Platform Engineer",
    period: "July 2023 - Present",
    date: "07/23 – Present",
    kpiId: "adaptive-platform-engineer",
    summary:
      "Platform engineering for biotechnology infrastructure, containerizing applications on Kubernetes, supporting TX-RAMP and SOX compliance, and developing RAG-based developer tools.",
    aiAngle:
      "A regulated, audited environment (SOX, TX-RAMP, lab systems). I run the platform and ship RAG tooling for developers on top of it.",
    highlights: [
      { track: "ai", text: "Built a local RAG chatbot over code repos and internal docs, integrated with Codex CLI and ChatGPT Enterprise" },
      { track: "platform", text: "Containerized apps and deployed to Kubernetes with Terraform + Helm, from PoC to production" },
      { track: "platform", text: "Automated token and secret rotation for TX-RAMP / SOX via GitLab CI and Azure Key Vault, with full audit logging" },
      { track: "platform", text: "Set up Okta SSO (SAML / OIDC) and LDAP-backed RBAC, and ran SOX access reviews and audit evidence" },
      { track: "platform", text: "Administered Azure PostgreSQL (upgrades, pgBadger tuning) and self-serve analytics (Superset, Redash)" },
    ],
    stack: ["Kubernetes", "Terraform", "Helm", "GitLab CI", "Azure Key Vault", "Okta", "PostgreSQL", "Sumo Logic", "LaunchDarkly", "ChromaDB"],
    responsibilities: [
      "Containerize applications and execute PoC validation and production deployments on Kubernetes using Terraform for infrastructure provisioning and Helm charts for application rollout, enabling repeatable, on-demand deployments",
      "Support and optimize the Laboratory Information Management System (LIMS) infrastructure, including Linux servers, application services and databases, improving system reliability and reducing unplanned downtime for internal lab workflows",
      "Automate application update and maintenance processes using Python, Selenium, shell scripting and SQL/T-SQL. Developed a centralized control application for nodes across diverse environments, reducing manual maintenance effort and human error",
      "Support TX-RAMP and SOX compliance by implementing token and secret rotation workflows using application REST APIs, GitLab CI/CD pipelines and Azure Key Vault, with full audit logging and monitoring",
      "Perform SOX application and user access reviews and prepare audit evidence",
      "Configure Okta SSO (SAML/OIDC) integration for internal and third-party applications, aligning access controls with corporate policies. Integrate Linux servers and services with LDAP for centralized authentication and RBAC",
      "Administer Azure Database for PostgreSQL, including version upgrades, rollbacks and performance tuning using pgBadger. Deploy and maintain analytics tooling (SQLPad, Redash, Apache Superset, CloudBeaver) to provide self-service data access for teams",
      "Manage installation, upgrades and health monitoring of CrowdStrike sensors across servers and endpoints, ensuring endpoint security visibility for security operations",
      "Administer cloud infrastructure on Microsoft Azure, leveraging Terraform and Ansible for provisioning, configuration management and deployment of platform services",
      "Deploy, configure and maintain Linux systems and VMs, including certificate management, LDAP integration, mail configuration and Nginx reverse proxy for internal services",
      "Configure and maintain Sumo Logic (log collection, monitors, alerts) and Checkmk for server-side monitoring, providing centralized observability and alerting for applications, servers and Kubernetes clusters",
      "Manage feature flags and controlled rollouts using LaunchDarkly, supporting canary and staged deployments for platform features",
      "Automate builds and deployments using GitLab CI/CD, Bamboo and Git-based workflows; collaborate with product, QA and lab teams via Jira to plan and track platform changes",
      "Develop a local RAG-based chatbot for developers, integrating with Codex CLI and ChatGPT Enterprise to enable natural-language queries over code repositories and internal documentation",
    ],
  },
  {
    slug: "baxtor-credit-union",
    company: "Baxtor Credit Union (BCU)",
    role: "Cyber Security Engineer",
    period: "April 2022 - January 2023",
    date: "04/22 – 01/23",
    kpiId: "bcu-cyber-security-engineer",
    summary:
      "End-to-end application security testing for finance domain workloads, covering SAST, SCA, DAST, manual penetration testing, and Azure cloud security audits against CIS Benchmarks.",
    aiAngle:
      "Financial services client: the threat-modelling and audit discipline I now apply to every LLM deployment.",
    highlights: [
      { track: "platform", text: "Tested web, mobile and API workloads end to end: SAST, SCA, DAST and manual pentesting" },
      { track: "platform", text: "Triaged and prioritized findings by CVSS, then worked with dev teams to track fixes through to closure" },
      { track: "platform", text: "Ran Azure cloud security audits against CIS Benchmarks and produced formal reports with prioritized recommendations" },
    ],
    stack: ["Burp Suite", "OWASP ZAP", "SonarQube", "Snyk", "Postman", "Azure", "CIS Benchmarks"],
    responsibilities: [
      "Performed end-to-end application security testing for web, mobile and API workloads in the finance domain, covering SAST, SCA, DAST and manual penetration testing using tools such as Burp Suite, OWASP ZAP, Postman, Vooki, Yazhini, SonarQube and Snyk",
      "Executed and tuned SAST/SCA scans, triaged results, de-duplicated and prioritized findings by risk/CVSS, wrote remediation guidance and worked with development teams to track fixes through to closure",
      "Conducted manual web and API penetration testing, focusing on authentication, authorization, session management, input validation and business-logic flaws; created PoC exploits, documented impact and retested applications after fixes",
      "Performed source code reviews for critical applications and APIs to validate security controls, identify vulnerable patterns and confirm remediation of high-risk issues",
      "Carried out Azure cloud security audits against CIS Benchmarks, reviewing identity and access management, network security groups, storage configuration and logging, and produced formal reports with prioritized recommendations for the client's security and engineering teams",
    ],
  },
  {
    slug: "national-car-parks",
    company: "National Car Parks (NCP)",
    role: "Cyber Security Engineer",
    period: "November 2021 - April 2022",
    date: "11/21 – 04/22",
    kpiId: "ncp-cyber-security-engineer",
    summary:
      "End-to-end security testing of web, mobile and API applications, CI/CD pipeline integration, and security automation proof-of-concepts.",
    aiAngle:
      "My first embedded client engagement: shipping security PoCs into someone else's pipelines and leaving the team able to run them.",
    highlights: [
      { track: "platform", text: "Integrated AppSec tooling into the client's Azure DevOps pipelines and built PoC security stages in Jenkins" },
      { track: "platform", text: "Ran manual web and API pentests (auth, session, input validation, business logic) with documented PoCs" },
      { track: "platform", text: "Wrote testing procedures and reporting templates so the client's teams could repeat the work" },
    ],
    stack: ["Azure DevOps", "Jenkins", "Burp Suite", "OWASP ZAP", "SAST / SCA"],
    responsibilities: [
      "Performed end-to-end security testing of web, mobile and API applications, covering SAST, SCA, DAST and manual penetration testing, and worked closely with development teams to remediate findings",
      "Ran and tuned SAST/SCA tools in CI, triaged and prioritised results by risk, wrote clear remediation guidance and retested applications after fixes to confirm closure",
      "Conducted manual web and API penetration testing focusing on authentication/authorization, session management, input validation and business-logic flaws; documented PoCs, impact and recommended mitigations",
      "Integrated application security tools into the client's CI/CD pipelines using Azure DevOps, and built POC security stages in Jenkins to demonstrate automated scanning and gating of builds",
      "Documented security testing procedures, tool usage and reporting templates, improving repeatability and knowledge transfer for the client's internal teams",
    ],
  },
];
