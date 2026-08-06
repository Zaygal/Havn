import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF6EE",
        sandstone: "#C7A06B",
        "sandstone-deep": "#A9814E",
        forest: "#1E3A2B",
        "forest-deep": "#12261B",
        charcoal: "#2A2520",
        gold: "#C79A3D",
      },
      fontFamily: {
        display: ["Clash Display", "sans-serif"],
        body: ["Switzer", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
