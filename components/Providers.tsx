"use client";

import { MotionConfig } from "framer-motion";

export default function Providers({ children }: { children: React.ReactNode }) {
  // reducedMotion="user" makes every framer animation respect prefers-reduced-motion.
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
