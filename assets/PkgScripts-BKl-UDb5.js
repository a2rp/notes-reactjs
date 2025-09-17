import{j as e}from"./index-Dt0Nk7bl.js";import{S as i}from"./styled-DuHK9_rw.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"PKG Scripts (package.json)"}),e.jsx(i.Lead,{children:"Scripts are short aliases to run common tasks: dev server, build, preview, lint/format, tests, deploy, and utility commands. The same ideas work with npm, pnpm, and yarn."}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core scripts"}),e.jsx(i.Pre,{children:`// package.json (scripts only)
{
  "scripts": {
    "dev": "vite",
    "dev:open": "vite --open",
    "dev:host": "vite --host",                 // access from LAN / phone
    "build": "vite build",
    "preview": "vite preview --host --strictPort",
    "clean": "rimraf dist"                     // needs: npm i -D rimraf
  }
}`}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"dev"}),": starts Vite dev server with HMR."]}),e.jsxs("li",{children:[e.jsx("b",{children:"build"}),": produces optimized production bundles in ",e.jsx(i.InlineCode,{children:"dist/"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"preview"}),": serves the built app locally to verify prod output."]}),e.jsxs("li",{children:[e.jsx("b",{children:"clean"}),": removes previous build artifacts (cross-platform via ",e.jsx(i.InlineCode,{children:"rimraf"}),")."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Linting & formatting"}),e.jsx(i.Pre,{children:`// dev deps (example)
// npm i -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-prettier eslint-config-prettier

// package.json
{
  "scripts": {
    "lint": "eslint . --ext .js,.jsx",
    "lint:fix": "eslint . --ext .js,.jsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "check": "npm run lint && npm run format:check"
  }
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"check"})," is handy in CI to fail builds on lint or formatting issues."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Environment modes"}),e.jsxs("p",{children:["The ",e.jsx(i.InlineCode,{children:"--mode"})," flag loads matching env files (e.g., ",e.jsx(i.InlineCode,{children:".env.staging"}),"). Use it for staging builds or previews."]}),e.jsx(i.Pre,{children:`{
  "scripts": {
    "dev:staging": "vite --mode staging",
    "build:staging": "vite build --mode staging",
    "preview:staging": "vite preview --mode staging --host"
  }
}`}),e.jsxs(i.Small,{children:["Combine with ",e.jsx(i.InlineCode,{children:".env.staging"})," variables (see the ",e.jsx("b",{children:".env Files"})," note)."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Tests (optional wiring)"}),e.jsx("p",{children:"A minimal setup uses Jest + React Testing Library or Vitest. Example with Jest:"}),e.jsx(i.Pre,{children:`// dev deps (example)
// npm i -D jest @testing-library/react @testing-library/jest-dom babel-jest @babel/preset-env @babel/preset-react

{
  "scripts": {
    "test": "jest --watch",
    "test:ci": "jest --ci --runInBand",
    "coverage": "jest --coverage"
  }
}`}),e.jsxs(i.Small,{children:["For Vitest: ",e.jsx(i.InlineCode,{children:"npm i -D vitest @testing-library/react @testing-library/jest-dom jsdom"})," and use ",e.jsx(i.InlineCode,{children:"vitest"})," in scripts."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Bundle analysis (optional)"}),e.jsx("p",{children:"Useful to inspect what ships in production builds."}),e.jsx(i.Pre,{children:`// npm i -D rollup-plugin-visualizer

// vite.config.js (snippet)
// import { visualizer } from "rollup-plugin-visualizer";
// export default defineConfig({
//   plugins: [react(), visualizer({ open: true })]
// });

// package.json
{
  "scripts": {
    "analyze": "vite build && vite preview"   // visualizer opens a treemap after build
  }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Concurrent/serial tasks (quality gates)"}),e.jsxs("p",{children:["For chaining tasks, keep it simple with built-in ",e.jsx("em",{children:"&&"})," or add utilities for cross-platform concurrency."]}),e.jsx(i.Pre,{children:`// npm i -D npm-run-all concurrently

{
  "scripts": {
    "precommit": "run-s lint:fix format",
    "dev:all": "concurrently \\"npm:dev\\" \\"npm:lint -- --watch\\""
  }
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"npm-run-all"})," provides ",e.jsx(i.InlineCode,{children:"run-s"})," (serial) and ",e.jsx(i.InlineCode,{children:"run-p"})," (parallel)."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Pre-commit hooks (optional)"}),e.jsx("p",{children:"Husky + lint-staged help keep commits clean by running linters on staged files only."}),e.jsx(i.Pre,{children:`// npm i -D husky lint-staged
// npx husky init   # creates .husky/ pre-commit

// package.json
{
  "lint-staged": {
    "*.{js,jsx,css,md}": [
      "prettier --write"
    ],
    "*.{js,jsx}": [
      "eslint --fix"
    ]
  }
}

// .husky/pre-commit
npx lint-staged`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Deploy to GitHub Pages (one-liner option)"}),e.jsxs("p",{children:["For repos deployed under ",e.jsx("em",{children:"/REPO_NAME/"}),", set ",e.jsx(i.InlineCode,{children:"base"})," in ",e.jsx("em",{children:"vite.config.js"})," and add:"]}),e.jsx(i.Pre,{children:`// npm i -D gh-pages

{
  "scripts": {
    "predeploy": "vite build",
    "deploy": "gh-pages -d dist"
  }
}
# usage
# npm run deploy  // pushes dist/ to gh-pages branch`}),e.jsxs(i.Small,{children:["Ensure a SPA fallback (e.g., ",e.jsx("code",{children:"public/404.html"})," redirect) when using ",e.jsx("b",{children:"BrowserRouter"}),"."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Troubleshooting helpers"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Large projects: increase Node memory for builds —"," ",e.jsx(i.InlineCode,{children:'cross-env NODE_OPTIONS="--max-old-space-size=4096"'})," ","before the build command (needs ",e.jsx("code",{children:"cross-env"})," on Windows)."]}),e.jsxs("li",{children:["Windows path issues: prefer cross-platform tools like"," ",e.jsx(i.InlineCode,{children:"rimraf"}),","," ",e.jsx(i.InlineCode,{children:"cross-env"}),","," ",e.jsx(i.InlineCode,{children:"npm-run-all"}),"."]})]}),e.jsx(i.Pre,{children:`// npm i -D cross-env
{
  "scripts": {
    "build:big": "cross-env NODE_OPTIONS=--max-old-space-size=4096 vite build"
  }
}`})]}),e.jsxs(i.Callout,{children:["Summary: start with ",e.jsx("b",{children:"dev / build / preview / clean"}),". Add lint/format and checks for consistency, optional test scripts for reliability, analysis for bundle insight, and a deploy script for GH Pages. Keep scripts small and composable."]})]});export{r as default};
