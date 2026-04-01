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
        // New theme colors
        "outline": "#72757d",
        "on-secondary-container": "#e1c5ff",
        "surface-bright": "#262c36",
        "tertiary-container": "#f94d4e",
        "error-container": "#9f0519",
        "inverse-primary": "#006976",
        "primary-fixed": "#00e3fd",
        "secondary-container": "#5e289b",
        "outline-variant": "#44484f",
        "tertiary-dim": "#ff716c",
        "on-tertiary-fixed": "#3a0004",
        "primary-fixed-dim": "#00d4ec",
        "inverse-surface": "#f8f9ff",
        "background": "#0a0e14",
        "primary": "#81ecff",
        "on-primary-container": "#004d57",
        "surface-container-lowest": "#000000",
        "on-primary-fixed-variant": "#005762",
        "on-error": "#490006",
        "surface-container-low": "#0f141a",
        "tertiary-fixed": "#ff928c",
        "inverse-on-surface": "#51555d",
        "secondary-fixed-dim": "#d7b5ff",
        "on-background": "#f1f3fc",
        "secondary-fixed": "#e2c7ff",
        "on-tertiary": "#490006",
        "on-tertiary-fixed-variant": "#790010",
        "on-secondary-fixed-variant": "#6834a6",
        "on-secondary": "#340064",
        "on-secondary-fixed": "#4a0b87",
        "secondary-dim": "#ba85fb",
        "on-surface-variant": "#a8abb3",
        "on-tertiary-container": "#110000",
        "surface-dim": "#0a0e14",
        "on-primary": "#005762",
        "surface-tint": "#81ecff",
        "tertiary-fixed-dim": "#ff7b75",
        "on-primary-fixed": "#003840",
        "surface": "#0a0e14",
        "secondary": "#bc87fe",
        "tertiary": "#ff716c",
        "error": "#ff716c",
        "surface-container-highest": "#20262f",
        "on-error-container": "#ffa8a3",
        "primary-dim": "#00d4ec",
        "primary-container": "#00e3fd",
        "error-dim": "#d7383b",
        "on-surface": "#f1f3fc",
        "surface-variant": "#20262f",
        "surface-container": "#151a21",
        "surface-container-high": "#1b2028"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "Consolas", "monospace"],
        headline: ["var(--font-headline)", "Space Grotesk"],
        body: ["var(--font-sans)", "Inter"],
        label: ["var(--font-label)", "Manrope"]
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      }
    }
  },
  plugins: []
};

export default config;

