import type { Config } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: "#1a73e8",
      },
      fontFamily: {
        sporty: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config; 