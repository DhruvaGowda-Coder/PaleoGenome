/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ocean: {
          950: "#030a16",
          900: "#061325",
          800: "#0b203c",
          700: "#10315a",
          500: "#1a5b8f",
          400: "#247cb8",
        },
        forest: {
          950: "#051108",
          900: "#0a1e11",
          800: "#11321d",
          700: "#1a4d2e",
        },
        earth: {
          900: "#1a1612",
          800: "#2a221a",
          700: "#3d3227",
          600: "#59493a",
          200: "#ded5cb",
          100: "#f0ece6",
        },
        accent: {
          teal: "#1ec2a4",
          amber: "#d99b42",
          cyan: "#38bdf8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};

