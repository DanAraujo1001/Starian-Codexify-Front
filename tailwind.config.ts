import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class", // Habilita troca de tema via classe .dark
  theme: {
    extend: {
      boxShadow: {
        card: "0px 1px 3px 0px rgba(0,0,0,0.1), 0px 1px 2px 0px rgba(0,0,0,0.06)",
        highlight:
          "0px 10px 15px 0px rgba(0,0,0,0.1), 0px 4px 6px 0px rgba(0,0,0,0.1)",
        avatar: "inset 0 0 0 1px rgba(229,231,235,0.75)",
        input: "0px 1px 2px 0px rgba(0,0,0,0.05)",
        "input-hover":
          "0px 4px 6px -1px rgba(0,0,0,0.1), 0px 2px 4px -2px rgba(0,0,0,0.1)",
      },
      colors: {
        brand: {
          primary: "rgb(var(--brand-primary) / <alpha-value>)",
          dark: "rgb(var(--brand-dark) / <alpha-value>)",
          hover: "rgb(var(--brand-hover) / <alpha-value>)",
        },
        surface: {
          primary: "rgb(var(--surface-primary) / <alpha-value>)",
          subtle: "rgb(var(--surface-subtle) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
        },
        status: {
          critical: "rgb(var(--critical-light) / <alpha-value>)",
          medium: "rgb(var(--medium-light) / <alpha-value>)",
          excellent: "rgb(var(--excellent-light) / <alpha-value>)",
        },
      },
      borderRadius: {
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
