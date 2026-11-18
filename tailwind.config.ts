import type { Config } from "tailwindcss";

// Colours are CSS variables (RGB triplets) defined in app/globals.css so that
// light and dark themes share one set of class names.
const v = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        surface: v("surface"),
        fg: v("fg"),
        muted: v("muted"),
        line: v("line"),
        accent: v("accent"),
        ai: v("ai"),
        ok: v("ok"),
        // Legacy names kept so the admin dashboard keeps working (and themes).
        cream: v("bg"),
        darkGray: v("fg"),
        mediumGray: v("muted"),
      },
      fontFamily: {
        sans: ["var(--font-inter, Inter)", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-mono, 'DM Mono')", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      spacing: { "70": "70px" },
      maxWidth: { container: "1200px" },
      letterSpacing: { tighter: "-0.04em" },
      boxShadow: {
        glow: "0 0 0 1px rgb(var(--ai) / 0.25), 0 8px 30px -8px rgb(var(--ai) / 0.35)",
        lift: "0 12px 32px -12px rgb(var(--fg) / 0.25)",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
