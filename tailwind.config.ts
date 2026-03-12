import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "ra-bg": "#050816",
        "ra-accent": "#22d3ee",
        "danger-red": "#ef4444",
        "success-green": "#22c55e",
        "warning-orange": "#f97316",
        "command-green": "#4ade80",
        "undiscovered": "#0a0a14",
        "primary-blue": "#3b82f6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"]
      }
    }
  },
  plugins: []
};

export default config;

