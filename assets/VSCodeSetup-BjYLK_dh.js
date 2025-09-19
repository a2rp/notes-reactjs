import{j as e}from"./index-CDxhzYTb.js";import{S as i}from"./styled-Drh0cwNW.js";const n=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"VS Code Setup (for React + Vite)"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Visual Studio Code (VS Code)"})," is a free, lightweight, cross-platform"," ",e.jsx("b",{children:"code editor"})," with a rich ",e.jsx("b",{children:"extension"})," ecosystem. This guide sets up a smooth React workflow with linting, formatting, debugging, and quality-of-life tweaks."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Key Definitions (read once)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Editor:"})," An app for writing code. VS Code is an editor (not a full IDE)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Extension:"})," A plugin that adds features to VS Code (e.g., React snippets, ESLint integration)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Workspace:"})," The folder (your project) you open in VS Code. VS Code stores project-specific settings in ",e.jsx(i.InlineCode,{children:".vscode/"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Linter:"})," A tool that checks code for problems and style issues. We use"," ",e.jsx(i.InlineCode,{children:"ESLint"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Formatter:"})," A tool that rearranges text to a consistent style. We use"," ",e.jsx(i.InlineCode,{children:"Prettier"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Format on Save:"})," VS Code feature that runs the formatter every time you save."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Code Action:"})," Quick fixes offered by VS Code/ESLint (lightbulb menu)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Launch configuration:"})," File that tells VS Code how to run/debug your app (stored in ",e.jsx(i.InlineCode,{children:".vscode/launch.json"}),")."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Recommended Extensions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ESLint"})," — integrates ESLint into VS Code (shows errors/warnings inline)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prettier – Code Formatter"})," — consistent code formatting."]}),e.jsxs("li",{children:[e.jsx("b",{children:"JavaScript and TypeScript Nightly"})," (optional) — newer TS/JS language features."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Path Intellisense"})," — autocompletes file paths in imports."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Auto Rename Tag"})," — renames the closing tag when you rename the opening tag."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ES7+ React/Redux/React-Native snippets"})," (optional) — quick React snippets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Code Metrics"}),' (for the "code-metrics" topic later) — visual complexity metrics.']})]}),e.jsx(i.Small,{children:"Tip: Open the Extensions sidebar and search each name. Install one by one to understand what it adds."})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Project Settings (",e.jsx("code",{children:".vscode/settings.json"}),")"]}),e.jsx(i.Pre,{children:`{
  // Use Prettier for formatting
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,

  // Trim whitespace and keep files tidy
  "files.trimTrailingWhitespace": true,
  "files.insertFinalNewline": true,

  // ESLint: run on save and show fixes
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.organizeImports": true
  },

  // JS/TS suggestions
  "javascript.suggest.completeFunctionCalls": true,
  "typescript.suggest.completeFunctionCalls": true,

  // React JSX formatting (Prettier defaults are fine; customize if you like)
  "prettier.singleQuote": true,
  "prettier.trailingComma": "es5",
  "prettier.semi": true
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Why project-level?"}),' Everyone on the team gets the same behavior. It prevents "works on my machine" issues.']})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"ESLint + Prettier (React-friendly config)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ESLint"})," checks code quality and modern best practices (e.g., Rules of Hooks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prettier"})," focuses purely on consistent formatting (spaces, quotes, line-wraps)."]}),e.jsx("li",{children:'We make them "play nice" together by using the Prettier ESLint config.'})]}),e.jsx(i.Pre,{children:`// eslint.config.js (Flat config style)
import js from "@eslint/js";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default [
  js.configs.recommended,
  {
    plugins: { react, "react-hooks": reactHooks },
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: "module",
      globals: { window: "readonly", document: "readonly" }
    },
    rules: {
      "react/jsx-uses-react": "off",   // React 17+ JSX transform
      "react/react-in-jsx-scope": "off",
      ...reactHooks.configs.recommended.rules
    },
    settings: { react: { version: "detect" } }
  },
  prettier // <-- turn off rules that conflict with Prettier
];`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx("i",{children:"Flat config"})," is ESLint's modern configuration format (using"," ",e.jsx(i.InlineCode,{children:"eslint.config.js"}),") that replaces"," ",e.jsx(i.InlineCode,{children:".eslintrc"})," files."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Prettier Config (",e.jsx("code",{children:"prettier.config.cjs"})," or ",e.jsx("code",{children:".prettierrc"}),")"]}),e.jsx(i.Pre,{children:`module.exports = {
  singleQuote: true,
  trailingComma: "es5",
  semi: true,
  printWidth: 100
};`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Tip:"})," Keep Prettier minimal. If teammates argue about style, let Prettier decide and move on."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Snippets (",e.jsx("code",{children:".vscode/javascriptreact.json"}),")"]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Snippet:"})," A shortcut that expands to a code template (saves time and typos)."]}),e.jsxs("li",{children:["File lives at ",e.jsx(i.InlineCode,{children:".vscode/javascriptreact.json"})," for project-only snippets."]})]}),e.jsx(i.Pre,{children:`{
  "React Component (styled)": {
    "prefix": "rcs",
    "body": [
      "import React from \\"react\\";",
      "import { Styled } from \\"./styled\\";",
      "",
      "const \\\${1:ComponentName} = () => {",
      "  return (",
                    "    <Styled.Page>",
                        "      <Styled.Title>\\\${1:ComponentName}</Styled.Title>",
                        "      <Styled.Section>",
                            "        <Styled.P>...</Styled.P>",
                            "      </Styled.Section>",
                        "    </Styled.Page>",
                    "  );",
      "};",
                    "",
                    "export default \\\${1:ComponentName};"
                    ],
                    "description": "React component using local Styled system"
  },
                    "useState + useEffect template": {
                        "prefix": "rse",
                    "body": [
                    "const [\\\${1:state}, set\\\${1 / (.*) /\\\${1:/capitalize}/}] = React.useState(\\\${2:null});",
      "React.useEffect(() => {",
      "  \\\${3:// side-effect}",
      "  return () => { \\\${4:// cleanup} };",
      "}, [\\\${5:deps}]);"
                    ],
                    "description": "Common state + effect pattern"
  }
}`}),e.jsxs(i.Small,{children:["Note: Inside this code block we escaped every ",e.jsxs("code",{children:["$","{...}"]})," as ",e.jsxs("code",{children:["\\\\$","{...}"]})," so the template literal doesn’t try to interpolate snippet placeholders."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Debugging with VS Code"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Debugging:"})," Running your app with breakpoints so you can pause and inspect values."]}),e.jsx("li",{children:"For Vite + React, we attach VS Code's debugger to the browser."})]}),e.jsx(i.Pre,{children:`// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Vite: Chrome",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:5173",
      "webRoot": "\${workspaceFolder}",
      "breakOnLoad": true,
      "sourceMaps": true
    }
  ]
}`}),e.jsxs(i.Small,{children:["Start Vite (",e.jsx(i.InlineCode,{children:"npm run dev"}),"), then press"," ",e.jsx("b",{children:"F5"})," and choose ",e.jsx("i",{children:"Vite: Chrome"}),". Set breakpoints in your source files."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Quality-of-Life Tweaks"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Autosave:"}),' Enable in Settings (search "Files: Auto Save") →'," ",e.jsx("i",{children:"onFocusChange"})," or ",e.jsx("i",{children:"afterDelay"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Terminal:"})," Use the built-in terminal (View → Terminal). Keep one pane for",e.jsx(i.InlineCode,{children:"dev"})," and another for tests or lint."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Split Editor:"})," Use ",e.jsx(i.InlineCode,{children:"Ctrl/⌘+\\"})," to view two files side by side."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Peek Definition:"})," ",e.jsx(i.InlineCode,{children:"Alt/Option+F12"})," to avoid jumping files."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," commit ",e.jsx(i.InlineCode,{children:".vscode/settings.json"})," for shared formatting/lint behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," enable ",e.jsx("i",{children:"Format on Save"})," and ESLint auto-fix to reduce nitpicks in PRs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix multiple formatters. Pick ",e.jsx("i",{children:"one"})," (Prettier) as the default formatter."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," ignore linter errors. They often highlight real bugs (e.g., stale deps in effects)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Troubleshooting"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:'"ESLint is not working"'}),": Check that the ESLint extension is enabled and that your ESLint config file name matches (e.g., ",e.jsx(i.InlineCode,{children:"eslint.config.js"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:`"Prettier didn't format"`}),": Ensure"," ",e.jsx(i.InlineCode,{children:"editor.defaultFormatter"})," is set to Prettier and you haven't installed a conflicting formatter."]}),e.jsxs("li",{children:[e.jsx("b",{children:'"Breakpoints are grey"'}),": Open the exact source file served by Vite, not the compiled output. Make sure ",e.jsx(i.InlineCode,{children:"webRoot"})," is"," ",e.jsxs(i.InlineCode,{children:["\\$","{workspaceFolder}"]}),"."]})]})]}),e.jsx(i.Callout,{children:"Summary: Install ESLint + Prettier, enable format-on-save with auto-fix, add a couple of snippets, and wire up debugging. Keep settings in the repo for consistency. Small setup, big daily payoff."})]});export{n as default};
