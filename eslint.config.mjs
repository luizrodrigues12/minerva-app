import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const config = [
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      "no-unused-expressions": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      // Regra NOVA do react-hooks 7; nao existia no ruleset anterior.
      // Mantida desligada para reproduzir as regras atuais (ver change).
      "react-hooks/set-state-in-effect": "off",
    },
  },
];

export default config;
