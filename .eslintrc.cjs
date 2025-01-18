module.exports = {
  root: true,
  env: { browser: true, es2020: true, node: true },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  plugins: ["react-refresh", "@typescript-eslint", "import", "prettier"],
  rules: {
    "react/prop-types": "off",
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "@typescript-eslint/no-unused-vars": ["warn"],
    "@typescript-eslint/no-explicit-any": "warn",
    "import/order": ["warn", { "groups": ["builtin", "external", "internal"] }],
    "import/no-duplicates": "warn",
    "prettier/prettier": ["error"],
    "no-console": "warn",
    "no-debugger": "error",
    "prefer-const": "error",
  },
  settings: { react: { version: "detect" } },
};
