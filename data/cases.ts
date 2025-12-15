export interface CaseStudy {
  slug: string;
  title: string;
  date: string;
  client: string;
  color: string;
  isNDA?: boolean;
  summary: string;
  whatIDid: string[];
  whyItMatters: string;
  results?: string[];
}

export interface Experience {
  slug: string;
  company: string;
  role: string;
  period: string;
  date: string;
  responsibilities: string[];
  summary: string;
}

export const allExperiences: Experience[] = [
  {
    slug: "qualitest-group",
    company: "Qualitest Group",
    role: "Cyber Security Specialist",
    period: "February 2021 - Present",
    date: "02/21 - Present",
    summary: "Leading DevSecOps workflows and AI-driven security automation across enterprise CI/CD platforms. Architecting secure pipelines, implementing automated security testing, and building full-stack security products for global enterprise clients.",
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
      "Lead team upskilling initiatives on DevSecOps practices, IaC security, Kubernetes hardening and vulnerability management through knowledge-sharing sessions and hands-on workshops"
    ]
  },
  {
    slug: "adaptive-biotechnologies",
    company: "Adaptive Biotechnologies",
    role: "Platform Engineer",
    period: "July 2023 - Present",
    date: "07/23 - Present",
    summary: "Platform engineering for biotechnology infrastructure, containerizing applications on Kubernetes, supporting TX-RAMP and SOX compliance, and developing RAG-based developer tools.",
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
      "Develop a local RAG-based chatbot for developers, integrating with Codex CLI and ChatGPT Enterprise to enable natural-language queries over code repositories and internal documentation"
    ]
  },
  {
    slug: "baxtor-credit-union",
    company: "Baxtor Credit Union (BCU)",
    role: "Cyber Security Engineer",
    period: "April 2022 - January 2023",
    date: "04/22 - 01/23",
    summary: "End-to-end application security testing for finance domain workloads, covering SAST, SCA, DAST, manual penetration testing, and Azure cloud security audits against CIS Benchmarks.",
    responsibilities: [
      "Performed end-to-end application security testing for web, mobile and API workloads in the finance domain, covering SAST, SCA, DAST and manual penetration testing using tools such as Burp Suite, OWASP ZAP, Postman, Vooki, Yazhini, SonarQube and Snyk",
      "Executed and tuned SAST/SCA scans, triaged results, de-duplicated and prioritized findings by risk/CVSS, wrote remediation guidance and worked with development teams to track fixes through to closure",
      "Conducted manual web and API penetration testing, focusing on authentication, authorization, session management, input validation and business-logic flaws; created PoC exploits, documented impact and retested applications after fixes",
      "Performed source code reviews for critical applications and APIs to validate security controls, identify vulnerable patterns and confirm remediation of high-risk issues",
      "Carried out Azure cloud security audits against CIS Benchmarks, reviewing identity and access management, network security groups, storage configuration and logging, and produced formal reports with prioritized recommendations for the client's security and engineering teams"
    ]
  },
  {
    slug: "national-car-parks",
    company: "National Car Parks (NCP)",
    role: "Cyber Security Engineer",
    period: "November 2021 - April 2022",
    date: "11/21 - 04/22",
    summary: "End-to-end security testing of web, mobile and API applications, CI/CD pipeline integration, and security automation proof-of-concepts.",
    responsibilities: [
      "Performed end-to-end security testing of web, mobile and API applications, covering SAST, SCA, DAST and manual penetration testing, and worked closely with development teams to remediate findings",
      "Ran and tuned SAST/SCA tools in CI, triaged and prioritised results by risk, wrote clear remediation guidance and retested applications after fixes to confirm closure",
      "Conducted manual web and API penetration testing focusing on authentication/authorization, session management, input validation and business-logic flaws; documented PoCs, impact and recommended mitigations",
      "Integrated application security tools into the client's CI/CD pipelines using Azure DevOps, and built POC security stages in Jenkins to demonstrate automated scanning and gating of builds",
      "Documented security testing procedures, tool usage and reporting templates, improving repeatability and knowledge transfer for the client's internal teams"
    ]
  }
];

export const allCases: CaseStudy[] = [
  {
    slug: "gritgo-trading-bot",
    title: "Gritgo – Quant-Style Algorithmic Derivatives Trading Bot",
    date: "2024",
    client: "Personal Project",
    color: "darkGray",
    summary: "A production-grade algorithmic derivatives trading system combining quant analysis, AI-driven strategy evaluation, and enterprise DevOps practices. The bot automates options/derivatives selling based on backtested strategies, real-time market signals, and multi-signal decision logic.",
    whatIDid: [
      "Designed multi-signal decision engine combining TradingView alerts, AI-based strategy evaluation and historical backtest results",
      "Built dedicated backtesting engine simulating real-world execution (order fills, slippage, brokerage, margin impact)",
      "Developed tick data collection subsystem for per-second market data ingestion and storage",
      "Architected microservices backend using Python, Flask, TimescaleDB, SQLite, MySQL and Confluent Kafka",
      "Orchestrated workflows using n8n and OpenAlgo for TradingView webhooks, AI inference and order placement",
      "Implemented risk management with margin-aware position sizing, trailing stop-loss and dynamic profit-booking",
      "Integrated Telegram bot for real-time notifications and interactive system control",
      "Deployed containerized services across AWS, Azure and GCP with full CI/CD automation"
    ],
    whyItMatters: "Applying enterprise-grade DevSecOps practices to low-latency trading workloads demonstrates the convergence of quantitative finance and modern cloud architecture. The system reduces emotional trading, increases backtesting rigor, and enables systematic profit capture while managing downside risk.",
    results: [
      "End-to-end quant trading platform from research to production",
      "Real-time multi-signal decision engine reducing false signals",
      "Containerized deployment with monitoring and observability",
      "Live production system: https://gritgo.in"
    ]
  },
  {
    slug: "ai-iac-security-pipeline",
    title: "AI-Driven IaC Security Scanning and Remediation Pipeline",
    date: "2023-2024",
    client: "Qualitest Group",
    color: "cyan",
    summary: "Designed and implemented an enterprise AI-powered Infrastructure-as-Code security pipeline using Azure OpenAI and a custom knowledge base of secure vs. insecure Terraform/Bicep/ARM patterns. The system automatically scans, patches, and re-verifies IaC code for security violations.",
    whatIDid: [
      "Built custom knowledge base of secure/insecure IaC patterns for Terraform, Bicep, and ARM templates",
      "Integrated Azure OpenAI for intelligent security violation detection and patch generation",
      "Automated security scanning, remediation, review/approval workflow, and verification pipeline",
      "Implemented automated SBOM generation and license compliance scanning using ScanCode and ORT Scan",
      "Embedded compliance frameworks (PCI DSS, NIST CSF, CIS Benchmarks, OWASP) into IaC guardrails",
      "Deployed as containerized microservices on Azure Kubernetes with full observability"
    ],
    whyItMatters: "Traditional static IaC scanning produces high false-positive rates and lacks context-aware remediation. AI-driven scanning with domain-specific knowledge enables intelligent, automated security fixes that understand business context and compliance requirements, drastically reducing security debt and manual review effort.",
    results: [
      "Automated IaC security remediation with AI-generated patches",
      "Reduced manual security review time by 60%",
      "Continuous compliance across cloud deployments",
      "Enterprise-grade AI security automation in production"
    ]
  },
  {
    slug: "git-rag-chatbot",
    title: "Git-RAG-Chatbot – Local RAG Git Assistant for Developers",
    date: "2024",
    client: "Personal Project / Adaptive Biotechnologies",
    color: "purple",
    summary: "A local, Docker-based RAG (Retrieval-Augmented Generation) chatbot enabling developers to query internal Git repositories in natural language. The system periodically indexes repositories, generates embeddings with LLM models, and stores them in ChromaDB as a vector store with rich code context metadata.",
    whatIDid: [
      "Built repository indexing system that chunks source files and generates embeddings with LLM embedding model",
      "Enriched chunks with metadata (repo, file path, language, symbol/function context, commit info)",
      "Implemented vector search over ChromaDB for context-aware code retrieval",
      "Developed Gradio chat UI backed by Python service for natural-language code queries",
      "Integrated with Codex CLI and ChatGPT Enterprise for code generation and analysis",
      "Containerized with Docker for local deployment, privacy, and developer productivity"
    ],
    whyItMatters: "Searching large codebases for specific implementations, understanding legacy code, and generating patches is time-consuming. RAG enables developers to ask natural-language questions over code, understand context across files, and generate/refine code using enterprise LLMs—all running locally for security and privacy.",
    results: [
      "Natural-language code search across Git repositories",
      "Faster onboarding and codebase understanding",
      "Privacy-first local deployment with Docker",
      "Production use for internal developer productivity"
    ]
  },
  {
    slug: "ai-secrets-detection",
    title: "AI-Assisted Secrets Detection for Large Codebases",
    date: "2023-2024",
    client: "Qualitest Group",
    color: "lime",
    summary: "Developed an AI-powered secrets detection tool that processes large codebases into manageable chunks, calls an internal AI model trained on company-specific sensitive terms and credential patterns, and generates detailed reports to prevent credential leaks.",
    whatIDid: [
      "Built codebase chunking system to process large repositories efficiently",
      "Trained internal AI model on company-specific secrets, credentials, and sensitive data patterns",
      "Developed API integration for AI model inference and response aggregation",
      "Implemented automated report generation with severity scoring and remediation guidance",
      "Integrated into CI/CD pipelines (Azure DevOps, GitLab CI, GitHub Actions) as security gates",
      "Co-developed LLM usage proxy and Chrome extension for sensitive-content checks on ChatGPT/Claude"
    ],
    whyItMatters: "Generic secrets scanners (Gitleaks, TruffleHog) miss company-specific patterns and generate high false-positive rates. AI-driven detection with custom training on internal data reduces false negatives, catches context-specific secrets, and prevents credential leaks before they reach production.",
    results: [
      "Reduced credential leaks and hard-coded secrets by 75%",
      "AI-trained on company-specific sensitive patterns",
      "Automated secrets detection in CI/CD pipelines",
      "Real-time LLM guardrails for developer tools"
    ]
  },
  {
    slug: "devsecops-security-product",
    title: "Full-Stack In-House Security Platform for Enterprise DevSecOps",
    date: "2021-2024",
    client: "Qualitest Group",
    color: "pink",
    summary: "Led full-stack design and development of an enterprise security product using Python, Node.js, Go, and MongoDB, deployed on Azure as containerized microservices. The platform automates web application security testing, vulnerability tracking, and compliance reporting across CI/CD pipelines.",
    whatIDid: [
      "Architected microservices platform using Python, Node.js, Go, and MongoDB on Azure Kubernetes",
      "Implemented Kubernetes security best practices (Pod Security Standards, CIS Kubernetes Benchmark)",
      "Automated SAST/DAST/SCA integration across Azure DevOps, Jenkins, GitHub Actions, GitLab CI, Bamboo",
      "Built container image scanning (Trivy, Grype, JFrog Xray) and secrets scanning (Gitleaks, TruffleHog)",
      "Designed security dashboards, vulnerability tracking, and compliance reporting (PCI DSS, ISO 27001, SOC 2)",
      "Integrated observability with Prometheus, Grafana, Sumo Logic, and ELK/EFK stacks",
      "Acted as solution architect, hands-on developer, and project lead"
    ],
    whyItMatters: "Enterprise security tools are often fragmented, expensive, and difficult to customize. Building an in-house platform enables tight integration with existing CI/CD workflows, custom compliance policies, and cost-effective scaling across global clients while maintaining full control over security data.",
    results: [
      "Production-grade security platform serving enterprise clients",
      "Automated security testing across multiple CI/CD platforms",
      "Reduced security tooling costs by 50%",
      "Enabled continuous compliance for PCI DSS, ISO 27001, SOC 2"
    ]
  },
  {
    slug: "smart-elevator-ml",
    title: "Smart Elevator using Machine Learning Techniques",
    date: "2019-2020",
    client: "SASTRA University (Prototype)",
    color: "red",
    summary: "Designed and prototyped a contactless smart elevator system that predicts a user's destination floor using RFID-based location tracking and machine learning, aiming to minimize button presses and waiting time.",
    whatIDid: [
      "Built hardware stack using Raspberry Pi, Arduino, NodeMCU (ESP8266), RFID readers, and cameras",
      "Implemented firmware and control logic for RFID tag reading and sensor input handling",
      "Collected movement data from RFID and camera streams to create user travel pattern dataset",
      "Applied image processing and ML models to predict destination floors based on user identity and history",
      "Developed central Raspberry Pi controller to fuse sensor data, run prediction model, and send elevator commands",
      "Achieved working lab-scale prototype demonstrating automatic floor selection and contactless operation"
    ],
    whyItMatters: "Traditional elevators require manual floor selection, increasing touch points and wait times. ML-driven prediction using RFID and camera data enables contactless operation, faster service, and improved hygiene—critical for high-traffic buildings and post-pandemic environments.",
    results: [
      "Working prototype with automatic floor prediction",
      "Contactless elevator operation using RFID and ML",
      "Reduced button presses and wait times in lab testing",
      "Foundation for building-scale deployment"
    ]
  }
];

export const featuredCases = allCases.slice(0, 4);
