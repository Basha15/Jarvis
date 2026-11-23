import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Manrope", "system-ui", "-apple-system", "sans-serif"],
        mono: ["Geist Mono", "monospace"],
      },
      colors: {
        jarvis: {
          darkBg: "#0B0E14",
          surface: "#111622",
          surfaceElevated: "#182030",
          surfaceBorder: "#232D42",
          surfaceBorderSubtle: "#1C2436",
          accentPurple: "#8B5CF6",
          accentPurpleHover: "#7C3AED",
          accentBlue: "#3B82F6",
          accentBlueHover: "#2563EB",
          accentCyan: "#06B6D4",
          textPrimary: "#F8FAFC",
          textSecondary: "#94A3B8",
          textMuted: "#64748B",
          success: "#10B981",
          warning: "#F59E0B",
          danger: "#EF4444",
        },
        surface: {
          black: "#000000",
          dark0: "#0B0E14",
          dark1: "#111622",
          dark2: "#182030",
          dark3: "#232D42",
          dark4: "#2F3C56",
          light0: "#FFFFFF",
          light1: "#F8FAFC",
          light2: "#F1F5F9",
          light3: "#E2E8F0",
          light4: "#CBD5E1",
        },
      },
      spacing: {
        "0": "0px",
        "25": "2px",
        "50": "4px",
        "75": "8px",
        "100": "12px",
        "200": "16px",
        "300": "24px",
        "400": "32px",
        "500": "40px",
        "600": "48px",
        "700": "64px",
        "800": "80px",
        "900": "96px",
      },
      transitionTimingFunction: {
        "jarvis-base": "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
