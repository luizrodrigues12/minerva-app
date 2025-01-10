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
        inter: ["inter", "sans"],
        interMedium: ["inter-medium", "sans"],
        dancing: ["dancing-bold", "serif"],
      },
      colors: {
        background01: "#d4d4d4",
        background02: "#DFDFDF",
        background03: "#ececec",
        corIcones: "#524AAF",
        roxominerva: "#4F47A8",
        textwhite: "#ffffffce",
        buttonHover: "#413A8C",
        buttonText: "#e4e4e7",
        borderColor: "#A8A8A8",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
export default config;
