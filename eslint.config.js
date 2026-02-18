import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";

export default [
  { files: ["**/*.{js,mjs,cjs,jsx}"] },
  { ignores: ["dist/**", "eslint.config.js"] },
  { languageOptions: { globals: globals.browser, parserOptions: { ecmaFeatures: { jsx: true } } } },
  pluginJs.configs.recommended,
  pluginReactConfig,
  {
    settings: { react: { version: "18.3.1" } },
    rules: {
      "react/jsx-no-target-blank": "off",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "warn",
    },
  },
];
