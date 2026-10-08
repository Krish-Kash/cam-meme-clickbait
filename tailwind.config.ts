import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: "#0a0e1a",
          darker: "#060810",
          card: "#111827",
          green: "#00ff88",
          blue: "#00d4ff",
          purple: "#a855f7",
          pink: "#ec4899",
          red: "#ff3366",
          orange: "#ff8800",
          yellow: "#ffdd00",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "monospace"],
      },
      animation: {
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "scan-line": "scanLine 3s linear infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "float": "float 3s ease-in-out infinite",
        "matrix-rain": "matrixRain 10s linear infinite",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 136, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 136, 0.6)" },
        },
        scanLine: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 3px)" },
          "40%": { transform: "translate(-3px, -3px)" },
          "60%": { transform: "translate(3px, 3px)" },
          "80%": { transform: "translate(3px, -3px)" },
          "100%": { transform: "translate(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
