import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        parkinsans: ["parkinsans", "serif"],
        "parkinsans-normal": ["parkinsans-regular", "serif"],
        handlee: ["handlee", "serif"],
        inter: ["inter", "sans"],
        interMedium: ["inter-medium", "sans"],
        dancing: ["dancing-bold", "serif"],
      },
      colors: {
        background01: "var(--background01)",
        background02: "var(--background02)",
        background03: "var(--background03)",
        corIcones: "var(--cor-icones)",
        corIconesHover: "var(--cor-icones-hover)",
        inputText: "var(--input-text)",
        errorColor: "var(--error-color)",
        roxominerva: "var(--roxo-minerva)",
        textColor: "var(--text-color)",
        buttonHover: "var(--button-hover)",
        buttonText: "var(--button-text)",
        borderColor: "var(--border-color)",
        headerColor: "var(--header-color)",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
