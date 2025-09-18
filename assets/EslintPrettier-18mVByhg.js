import{j as e}from"./index-CLbx3UkF.js";import{S as i}from"./styled-ByqZYc9C.js";const n=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"ESLint & Prettier"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"ESLint"})," is a ",e.jsx("i",{children:"linter"})," (static code analysis that finds problems and enforces rules).",e.jsx("b",{children:" Prettier"})," is a ",e.jsx("i",{children:"formatter"})," (rewrites your code to a consistent style automatically). Use them together to keep code ",e.jsx("b",{children:"correct"})," and ",e.jsx("b",{children:"consistently styled"})," across the team."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Linter:"})," a tool that analyzes source code without running it to detect bugs, bad patterns, and style violations. Example: ",e.jsx(i.InlineCode,{children:"no-undef"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Formatter:"})," a tool that rewrites code to a uniform style (quotes, spaces, line wraps). Example: ",e.jsx(i.InlineCode,{children:"Prettier"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Static Analysis:"})," reasoning about code by reading it, not executing it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"AST (Abstract Syntax Tree):"})," a tree representation of code that linters/formatters use to understand structure."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rule:"})," a specific check or constraint (e.g., require semicolons, no unused vars)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Plugin:"})," a package that adds rules/configs for a domain (React, import order, a11y)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Config:"})," how you turn rules on/off and set options. ESLint supports ",e.jsx("b",{children:"Flat Config"})," (",e.jsx(i.InlineCode,{children:"eslint.config.js"}),", modern) and ",e.jsx("b",{children:"Legacy"})," (",e.jsx(i.InlineCode,{children:".eslintrc.*"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parser:"})," translates code text into an AST (e.g., ",e.jsx(i.InlineCode,{children:"@babel/eslint-parser"})," or TS parser)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Env & Globals:"})," predefined environments (browser, node) and allowed global names."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ignore:"})," files/folders ESLint/Prettier should skip (e.g., ",e.jsx(i.InlineCode,{children:"dist"}),", ",e.jsx(i.InlineCode,{children:"coverage"}),")."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"How ESLint & Prettier Work Together"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Separate concerns:"})," ESLint handles ",e.jsx("i",{children:"code quality"}),"; Prettier handles ",e.jsx("i",{children:"code style"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid conflicts:"})," disable ESLint's formatting rules by extending ",e.jsx(i.InlineCode,{children:"eslint-config-prettier"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Two common setups:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:"A. Run Prettier separately"})," (recommended & simple): Scripts for ",e.jsx(i.InlineCode,{children:"lint"})," and ",e.jsx(i.InlineCode,{children:"format"}),"; ESLint doesn't run Prettier."]}),e.jsxs("li",{children:[e.jsx("b",{children:"B. Integrate via plugin"}),": Use ",e.jsx(i.InlineCode,{children:"eslint-plugin-prettier"})," (often via ",e.jsx(i.InlineCode,{children:"plugin:prettier/recommended"}),") to report Prettier issues as ESLint errors."]})]})]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"ESLint (Flat Config) for Vite + React"}),e.jsxs(i.Small,{children:["Modern ESLint uses ",e.jsx(i.InlineCode,{children:"eslint.config.js"})," at the root."]}),e.jsx(i.Pre,{children:`// eslint.config.js (JS project)
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default [
  { ignores: ["dist", "build", "coverage"] },
  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser, ...globals.node },
    },
    plugins: { react, "react-hooks": reactHooks, "react-refresh": reactRefresh },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": "off",
      "react/react-in-jsx-scope": "off", // not needed with React 17+
    },
    settings: { react: { version: "detect" } },
  },
  // turn off ESLint formatting rules that conflict with Prettier
  prettier,
];`}),e.jsxs(i.Small,{children:["The last line applies ",e.jsx(i.InlineCode,{children:"eslint-config-prettier"})," to disable formatting rules so Prettier can own the style."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"ESLint (Legacy .eslintrc) — Optional"}),e.jsx(i.Pre,{children:`// .eslintrc.cjs
module.exports = {
  env: { browser: true, es2022: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier" // disable conflicting formatting rules
  ],
  settings: { react: { version: "detect" } },
  plugins: ["react", "react-hooks"],
  rules: { "react/react-in-jsx-scope": "off" },
  ignorePatterns: ["dist", "build", "coverage"]
};`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Prettier Config"}),e.jsx(i.Pre,{children:`// .prettierrc.json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always"
}

// .prettierignore
dist
build
coverage
*.min.js`}),e.jsxs(i.Small,{children:["Prettier ignores ESLint; it just formats text. Keep it focused on ",e.jsx("i",{children:"style"}),", not correctness."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Package Scripts"}),e.jsx(i.Pre,{children:`// package.json (scripts section)
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "format": "prettier . --write",
    "format:check": "prettier . --check"
  }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"VS Code: Format & Lint on Save"}),e.jsx(i.Pre,{children:`// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}`}),e.jsx(i.Small,{children:"This runs Prettier to format, then ESLint to auto-fix fixable issues (imports, etc.)."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep ESLint for quality and Prettier for formatting—separate concerns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," add ",e.jsx(i.InlineCode,{children:"eslint-config-prettier"})," to avoid rule conflicts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," run ",e.jsx(i.InlineCode,{children:"eslint --fix"})," and ",e.jsx(i.InlineCode,{children:"prettier --write"})," in CI or a pre-commit hook."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," double-format: if you use ",e.jsx(i.InlineCode,{children:"eslint-plugin-prettier"}),", avoid also running Prettier separately on the same files in the same step."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix different formatters (e.g., Prettier and an IDE formatter) at the same time."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Optional: Integrate Prettier into ESLint"}),e.jsx(i.Pre,{children:`// eslint.config.js snippet (add-on)
import prettierPlugin from "eslint-plugin-prettier";

export default [
  // ... your base config,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      "prettier/prettier": "error" // report Prettier diffs as ESLint errors
    }
  }
];`}),e.jsx(i.Small,{children:'This is convenient for a single "lint" step, but running Prettier separately is simpler and faster.'})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Troubleshooting"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"IDE formats differently?"})," Ensure the default formatter is Prettier and ESLint fixes run on save."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rules fighting with Prettier?"})," Confirm ",e.jsx(i.InlineCode,{children:"eslint-config-prettier"})," is last in the config order."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ignored files not ignored?"})," Check ",e.jsx(i.InlineCode,{children:"ignorePatterns"}),", ",e.jsx(i.InlineCode,{children:".eslintignore"}),", and that the path casing matches."]})]})]}),e.jsxs(i.Callout,{children:["Summary: Use ESLint to ",e.jsx("b",{children:"prevent bugs"})," and Prettier to ",e.jsx("b",{children:"format consistently"}),". Disable conflicting ESLint style rules via ",e.jsx("i",{children:"eslint-config-prettier"}),", decide whether to run Prettier separately or through ESLint, and wire up on-save + CI for a smooth developer experience."]})]});export{n as default};
