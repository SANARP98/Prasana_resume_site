import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#f6f7f1',
        darkGray: '#333333',
        mediumGray: '#777777',
        accent: '#1020cc',
        caseColors: {
          darkGray: '#2d2d2d',
          pink: '#ff6b9d',
          purple: '#8b5cf6',
          cyan: '#00d9ff',
          red: '#ff3b30',
          lime: '#32d74b',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      spacing: {
        '70': '70px',
      },
      maxWidth: {
        'container': '1200px',
      },
      letterSpacing: {
        'tighter': '-0.04em',
      },
      lineHeight: {
        'tight': '1.2',
        'snug': '1.375',
        'normal': '1.6',
        'relaxed': '1.7',
        'loose': '1.875',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce-smooth': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
