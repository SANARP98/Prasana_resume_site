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

              {/* Skills Summary */}
              <div className="text-sm text-mediumGray leading-relaxed space-y-2">
                <div><span className="font-semibold text-darkGray">→</span> Cloud & Infrastructure</div>
                <div><span className="font-semibold text-darkGray">→</span> Containers & Kubernetes</div>
                <div><span className="font-semibold text-darkGray">→</span> CI/CD & Pipeline Security</div>
                <div><span className="font-semibold text-darkGray">→</span> Security & Compliance</div>
                <div><span className="font-semibold text-darkGray">→</span> Security Tools & Scanning</div>
                <div><span className="font-semibold text-darkGray">→</span> AI, LLM & RAG Systems</div>
                <div><span className="font-semibold text-darkGray">→</span> Observability & Monitoring</div>
                <div><span className="font-semibold text-darkGray">→</span> Infrastructure as Code & Automation</div>
                <div><span className="font-semibold text-darkGray">→</span> Backend Development & APIs</div>
                <div><span className="font-semibold text-darkGray">→</span> Databases & Messaging</div>
                <div><span className="font-semibold text-darkGray">→</span> DevOps & Best Practices</div>
                <div><span className="font-semibold text-darkGray">→</span> Collaboration & Project Management</div>
              </div>

              <div className="mt-6">
                <Link
                  href="/skills"
                  className="inline-block text-sm text-accent hover:underline"
                >
                  View all skills →
                </Link>
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

