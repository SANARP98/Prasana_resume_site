"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

export interface KPI {
  label: string;
  value: string;
  description: string;
  type?: "number" | "percentage" | "badge" | "stat" | "progress";
}

// Animated counter for numbers
function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  // Extract numeric value
  const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = numericValue;
      const duration = 1500;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, numericValue]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

// Style 1: Stats Card (for main numbers - applications, findings, etc.)
export function StatsCard({ kpi, delay = 0 }: { kpi: KPI; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="bg-gradient-to-br from-darkGray/5 to-accent/5 border border-darkGray/10 rounded-lg p-6 hover:border-accent/30 transition-all group"
    >
      <div className="text-4xl font-black text-accent mb-2">
        <AnimatedNumber value={kpi.value} />
      </div>
      <div className="text-sm font-semibold text-darkGray mb-1">{kpi.label}</div>
      <div className="text-xs text-mediumGray leading-relaxed">{kpi.description}</div>
    </motion.div>
  );
}

// Style 2: Progress Bar (for percentages and reductions)
export function ProgressBar({ kpi, delay = 0 }: { kpi: KPI; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const percentage = parseInt(kpi.value.replace(/[^0-9]/g, "")) || 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-baseline">
        <span className="text-sm font-semibold">{kpi.label}</span>
        <span className="text-lg font-black text-accent">{kpi.value}</span>
      </div>
      <div className="h-2 bg-darkGray/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-accent to-cyan-400 rounded-full"
        />
      </div>
      <p className="text-xs text-mediumGray">{kpi.description}</p>
    </motion.div>
  );
}

// Style 3: Badge/Pill (compact for card previews)
export function KPIBadge({ kpi, delay = 0 }: { kpi: KPI; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="inline-flex items-center gap-2 px-3 py-1.5 bg-accent/10 border border-accent/20 rounded-full text-xs font-semibold text-accent hover:bg-accent/20 transition-colors"
      title={kpi.description}
    >
      <span className="font-black">{kpi.value}</span>
      <span className="text-darkGray/70">{kpi.label}</span>
    </motion.div>
  );
}

// Style 4: Circular Progress (for percentages and high achievement metrics)
export function CircularProgress({ kpi, delay = 0 }: { kpi: KPI; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const percentage = parseInt(kpi.value.replace(/[^0-9]/g, "")) || 0;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center"
    >
      <div className="relative w-32 h-32">
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-darkGray/10"
          />
          {/* Progress circle */}
          <motion.circle
            cx="64"
            cy="64"
            r="45"
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            className="text-accent"
            initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
            animate={
              isInView
                ? { strokeDashoffset }
                : { strokeDashoffset: circumference }
            }
            transition={{ duration: 1.5, delay: delay + 0.2, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-black text-accent">
            {isInView ? <AnimatedNumber value={kpi.value} /> : "0%"}
          </span>
        </div>
      </div>
      <div className="mt-4 text-center">
        <div className="text-sm font-semibold text-darkGray">{kpi.label}</div>
        <div className="text-xs text-mediumGray mt-1 max-w-[150px]">{kpi.description}</div>
      </div>
    </motion.div>
  );
}

// Style 5: Metric Card (storytelling with icon and context)
export function MetricCard({ kpi, delay = 0, icon = "📊" }: { kpi: KPI; delay?: number; icon?: string }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      onClick={() => setIsExpanded(!isExpanded)}
      className="bg-white border border-darkGray/10 rounded-lg p-4 hover:border-accent/30 transition-all cursor-pointer group"
    >
      <div className="flex items-start gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-xs font-semibold text-mediumGray uppercase tracking-wide">
              {kpi.label}
            </span>
            <span className="text-2xl font-black text-accent">
              <AnimatedNumber value={kpi.value} />
            </span>
          </div>
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-xs text-mediumGray mt-2 leading-relaxed">{kpi.description}</p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// Style 6: Compact Stat Row (for dense lists)
export function StatRow({ kpi, delay = 0 }: { kpi: KPI; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="flex items-center justify-between py-2 border-b border-darkGray/5 last:border-0 group hover:bg-accent/5 px-2 -mx-2 rounded transition-colors"
    >
      <span className="text-sm text-darkGray">{kpi.label}</span>
      <span className="text-lg font-black text-accent">
        <AnimatedNumber value={kpi.value} />
      </span>
    </motion.div>
  );
}

// Smart KPI selector - automatically chooses the best visualization
export function SmartKPI({ kpi, delay = 0, style }: { kpi: KPI; delay?: number; style?: "auto" | "card" | "progress" | "badge" | "circular" | "metric" | "row" }) {
  // Auto-detect best style based on KPI characteristics
  const detectStyle = () => {
    if (style && style !== "auto") return style;

    const value = kpi.value.toLowerCase();

    // Percentages work well with progress bars or circular
    if (value.includes("%")) {
      const percentage = parseInt(value.replace(/[^0-9]/g, ""));
      return percentage >= 80 ? "circular" : "progress";
    }

    // Large numbers work well with stats cards
    const numericValue = parseInt(value.replace(/[^0-9]/g, "")) || 0;
    if (numericValue >= 100) return "card";

    // Small numbers work well with metric cards
    if (numericValue < 100 && numericValue > 0) return "metric";

    // Default to card
    return "card";
  };

  const selectedStyle = detectStyle();

  switch (selectedStyle) {
    case "progress":
      return <ProgressBar kpi={kpi} delay={delay} />;
    case "badge":
      return <KPIBadge kpi={kpi} delay={delay} />;
    case "circular":
      return <CircularProgress kpi={kpi} delay={delay} />;
    case "metric":
      return <MetricCard kpi={kpi} delay={delay} />;
    case "row":
      return <StatRow kpi={kpi} delay={delay} />;
    default:
      return <StatsCard kpi={kpi} delay={delay} />;
  }
}
