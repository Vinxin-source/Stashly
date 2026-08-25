import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        clay: {
          DEFAULT: "#C4785A",
          dark: "#9A5A42",
          light: "#E8A88A",
          muted: "#F3E4DC",
        },
        cream: {
          DEFAULT: "#F9F5F0",
          dark: "#F0E9E0",
        },
        sage: {
          DEFAULT: "#7D8F7E",
          light: "#A8B8A9",
          muted: "#E8EEE9",
        },
        charcoal: {
          DEFAULT: "#2C2A28",
          soft: "#3D3A37",
        },
        stone: {
          DEFAULT: "#6B6560",
          light: "#9C9590",
          muted: "#E5DFD8",
        },
        gold: {
          DEFAULT: "#C9A86C",
          muted: "#F5EDD8",
        },
      },
      borderRadius: {
        sm: "10px",
        md: "18px",
        lg: "28px",
        xl: "36px",
      },
      boxShadow: {
        soft: "0 2px 16px -4px rgba(44, 42, 40, 0.07)",
        card: "0 4px 24px -6px rgba(44, 42, 40, 0.09)",
        lift: "0 12px 40px -10px rgba(44, 42, 40, 0.14)",
        glow: "0 0 0 1px rgba(196, 120, 90, 0.15), 0 4px 20px -4px rgba(196, 120, 90, 0.2)",
      },
      fontFamily: {
        sans: ["var(--font-plus-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.25, 0.1, 0.25, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
