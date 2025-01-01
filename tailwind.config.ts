import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        parkinsans: ["parkinsans", "serif"],
        "parkinsans-normal": ["parkinsans-regular", "serif"],
        handlee: ["handlee", "serif"],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        roxominerva: "#4f47a8",
        textwhite: "#ffffffce",
        backButton: "#444449",
        backButtonHover: "#27272a",
        textButton: "#e4e4e7",
        textButtonHover: "#f4f4f5",
      },
    },
    screens: {
      "2xl": "1440px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
