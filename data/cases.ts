import type { Track } from "./profile";
export { allExperiences } from "./experience";
export type { Experience } from "./experience";

export interface BaseCase {
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

const baseCases: BaseCase[] = [
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
  },
  {
    slug: "self-balancing-wheel",
    title: "Self-Balancing Single Wheel using a Mechanical Gyroscope",
    date: "2019-2020",
    client: "SASTRA University (Prototype)",
    color: "darkGray",
    summary: "A unicycle-style single-wheel vehicle that stays upright using a mechanical gyroscope based on the rigidity principle, with a Control Moment Gyroscope (CMG) providing steering and manoeuvrability.",
    whatIDid: [
      "Integrated the gyroscope assembly, wheel drive, sensors and an embedded controller",
      "Continuously stabilised the wheel against external disturbances and surface inclination",
      "Developed control logic to keep the wheel balanced and responsive",
      "Collaborated on mechanical design, hardware integration and system testing, and documented behaviour and limitations"
    ],
    whyItMatters: "Targeted local transportation inside factories or homes, and formed the base for a future personal carrier robot.",
    results: [
      "Working prototype that balances against disturbances and inclines",
      "Foundation for a personal carrier robot"
    ]
  },
  {
    slug: "leaf-identification-dl",
    title: "Leaf Identification using Deep Learning",
    date: "2019-2020",
    client: "Academic Project",
    color: "lime",
    summary: "A CNN-based leaf identification system with a Raspberry Pi camera at the edge and an AWS-hosted inference service in the cloud.",
    whatIDid: [
      "Collected and pre-processed a leaf image dataset with augmentation and normalization",
      "Trained a Convolutional Neural Network in Python for reliable leaf classification",
      "Integrated a Raspberry Pi + camera that sends live images to an AWS-hosted inference service",
      "Documented the workflow from data collection through training, deployment and on-device testing"
    ],
    whyItMatters: "An early end-to-end edge + cloud ML pipeline: capture, inference in the cloud, answer back on the device. That is the same deployment shape used for applied AI today.",
    results: [
      "End-to-end edge + cloud computer vision pipeline",
      "Real-time species prediction returned to the device"
    ]
  }
];



interface CaseMeta {
  track: Track[];
  featured?: boolean;
  /** Headline result shown on cards. Kept to the claims already published. */
  headline: string;
  stack: string[];
}

const meta: Record<string, CaseMeta> = {
  "ai-iac-security-pipeline": {
    track: ["ai", "platform"], featured: true,
    headline: "60% less manual security review",
    stack: ["Azure OpenAI", "Terraform", "Bicep", "ARM", "AKS", "ScanCode", "ORT"],
  },
  "ai-secrets-detection": {
    track: ["ai", "platform"], featured: true,
    headline: "75% fewer hard-coded secrets",
    stack: ["Internal LLM", "Python", "Azure DevOps", "GitLab CI", "GitHub Actions", "Chrome extension"],
  },
  "git-rag-chatbot": {
    track: ["ai"], featured: true,
    headline: "Natural-language search over private repos",
    stack: ["RAG", "ChromaDB", "Embeddings", "Gradio", "Codex CLI", "ChatGPT Enterprise", "Docker"],
  },
  "devsecops-security-product": {
    track: ["platform"], featured: true,
    headline: "50% lower security tooling cost",
    stack: ["Python", "Node.js", "Go", "MongoDB", "Kubernetes", "Helm", "Prometheus", "Grafana"],
  },
  "gritgo-trading-bot": {
    track: ["ai", "platform"], featured: true,
    headline: "Live, end-to-end quant platform",
    stack: ["Python", "Flask", "Kafka", "TimescaleDB", "n8n", "OpenAlgo", "AWS", "Azure", "GCP"],
  },
  "smart-elevator-ml": {
    track: ["ai"],
    headline: "Contactless floor prediction prototype",
    stack: ["Raspberry Pi", "Arduino", "ESP8266", "RFID", "OpenCV", "ML"],
  },
  "self-balancing-wheel": {
    track: ["platform"],
    headline: "Gyro-stabilised single wheel prototype",
    stack: ["Embedded C", "CMG", "Sensors", "Control systems"],
  },
  "leaf-identification-dl": {
    track: ["ai"],
    headline: "Edge + cloud CNN pipeline",
    stack: ["Python", "CNN", "Raspberry Pi", "AWS"],
  },
};

export type CaseStudy = BaseCase & CaseMeta;

export const allCases: CaseStudy[] = baseCases.map((c) => ({
  ...c,
  ...(meta[c.slug] ?? { track: ["platform"], headline: c.summary.slice(0, 60), stack: [] }),
}));

// Featured order on the home page: AI-forward first.
const featuredOrder = [
  "ai-iac-security-pipeline",
  "ai-secrets-detection",
  "git-rag-chatbot",
  "gritgo-trading-bot",
  "devsecops-security-product",
];
export const featuredCases: CaseStudy[] = featuredOrder
  .map((s) => allCases.find((c) => c.slug === s))
  .filter((c): c is CaseStudy => Boolean(c));
