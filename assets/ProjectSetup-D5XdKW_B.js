import{j as e}from"./index-Cqwa5lnP.js";import{S as t}from"./styled-PG5506tl.js";const n=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Project Setup (React + Vite + styled-components)"}),e.jsx(t.Lead,{children:"End-to-end setup: tools, folder structure, routing, styling, linting/formatting, env handling, aliases, and a quick GH Pages note."}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Prerequisites"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Node.js"})," (LTS) + a package manager: npm / pnpm / yarn."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Git"})," for version control."]}),e.jsxs("li",{children:[e.jsx("b",{children:"VS Code"})," + extensions: ESLint, Prettier, EditorConfig."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Create a Vite React project"}),e.jsx("p",{children:"Pick any one of these:"}),e.jsx(t.Pre,{children:`# npm
npm create vite@latest notes-reactjs -- --template react
cd notes-reactjs
npm install
npm run dev

# pnpm
pnpm create vite notes-reactjs --template react
cd notes-reactjs
pnpm install
pnpm dev

# yarn
yarn create vite notes-reactjs --template react
cd notes-reactjs
yarn
yarn dev`}),e.jsxs(t.Small,{children:["Template ",e.jsx("code",{children:"react-swc"})," is also fine (faster dev transform)."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Recommended folder structure"}),e.jsx(t.Pre,{children:`notes-reactjs/
├─ index.html
├─ vite.config.js
├─ package.json
├─ .gitignore
├─ .editorconfig
├─ .eslintrc.cjs        # or .js/.json
├─ .prettierrc          # or package.json "prettier"
└─ src/
   ├─ main.jsx
   ├─ App.jsx
   ├─ components/
   ├─ pages/
   │  ├─ home/
   │  │  ├─ index.jsx
   │  │  └─ styled.js
   │  └─ intro/
   │     ├─ styled.js
   │     ├─ WhatIsReact.jsx
   │     ├─ SpaVsMpa.jsx
   │     └─ ProjectSetup.jsx
   ├─ routes/            # optional: centralize route arrays
   ├─ styles/            # global styles/tokens if needed
   └─ assets/`}),e.jsxs(t.Small,{children:["Keep each page self-contained: ",e.jsx("code",{children:"index.jsx"})," + ",e.jsx("code",{children:"styled.js"})," when needed."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Install core libraries"}),e.jsx(t.Pre,{children:"npm i react-router-dom styled-components"}),e.jsx("p",{children:"Minimal router wiring:"}),e.jsx(t.Pre,{children:`// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
);`}),e.jsxs(t.Small,{children:[e.jsxs("b",{children:["Why ",e.jsxs("code",{children:["basename=","/notes-reactjs/"]}),"?"]})," In dev it’s ",e.jsx("code",{children:"/"}),", in GH Pages it becomes ",e.jsx("code",{children:"/notes-reactjs/"})," automatically."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"App routes (skeleton)"}),e.jsx(t.Pre,{children:`// src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/notFound";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<Home />} />

      {/* Intro topics */}
      {/* ...each topic gets its own route, see lazy import at bottom */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"styled-components quick start"}),e.jsx(t.Pre,{children:`// src/styles/theme.js (optional)
export const theme = {
  colors: { bg: "#0f1115", text: "#e8e8e8", accent: "coral" },
  radius: "12px",
};

// src/styles/GlobalStyle.jsx (optional)
import { createGlobalStyle } from "styled-components";
export const GlobalStyle = createGlobalStyle\`
  :root { color-scheme: dark; }
  body { margin: 0; background: #0f1115; color: #e8e8e8; }
\`;

// src/main.jsx (wrap the app)
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";

<ThemeProvider theme={theme}>
  <GlobalStyle />
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
  </BrowserRouter>
</ThemeProvider>`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"ESLint + Prettier + EditorConfig"}),e.jsx(t.Pre,{children:`# install (pick your PM)
npm i -D eslint prettier eslint-plugin-react-hooks eslint-plugin-react   eslint-config-prettier eslint-plugin-prettier @vitejs/plugin-react
`}),e.jsx(t.Pre,{children:`// .eslintrc.cjs
module.exports = {
  env: { browser: true, es2022: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "detect" } },
  rules: {
    "react/react-in-jsx-scope": "off"
  }
};`}),e.jsx(t.Pre,{children:`// .prettierrc
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "es5"
}`}),e.jsx(t.Pre,{children:`# .editorconfig
root = true
[*]
charset = utf-8
end_of_line = lf
indent_style = space
indent_size = 2
insert_final_newline = true`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Vite config essentials"}),e.jsx(t.Pre,{children:`// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "/notes-reactjs/",            // set to repo name for GH Pages
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
});`}),e.jsxs(t.Small,{children:["Use aliases to avoid long relative imports. Example:",e.jsx("code",{children:' import Button from "@components/Button"; '})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Environment variables (Vite)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Only variables prefixed with ",e.jsx("b",{children:"VITE_"})," are exposed to the client."]}),e.jsxs("li",{children:["Files: ",e.jsx("code",{children:".env"}),", ",e.jsx("code",{children:".env.development"}),", ",e.jsx("code",{children:".env.production"}),"."]})]}),e.jsx(t.Pre,{children:`# .env.development
VITE_API_BASE=/api-dev

# .env.production
VITE_API_BASE=https://api.example.com`}),e.jsx(t.Pre,{children:`// usage
const base = import.meta.env.VITE_API_BASE;`}),e.jsxs(t.Small,{children:[e.jsx("code",{children:"import.meta.env.BASE_URL"})," is injected by Vite and matches ",e.jsx("code",{children:"base"})," in",e.jsx("code",{children:"vite.config.js"}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Package scripts (typical)"}),e.jsx(t.Pre,{children:`// package.json (scripts)
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext .js,.jsx --max-warnings=0",
    "format": "prettier --write ."
  }
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"GH Pages SPA fallback (optional)"}),e.jsxs("p",{children:["For BrowserRouter on GH Pages, add a fallback ",e.jsx("code",{children:"404.html"}),":"]}),e.jsx(t.Pre,{children:`<!-- public/404.html (copy of index.html with a redirect) -->
<!DOCTYPE html>
<html>
  <head><meta charset="utf-8"><meta http-equiv="refresh" content="0; url=./" /></head>
  <body></body>
</html>`}),e.jsxs(t.Small,{children:["Ensures deep links like ",e.jsx("code",{children:"/intro/what-is-react"})," reload correctly."]})]}),e.jsxs(t.Callout,{children:["Summary: Vite bootstraps a fast React setup; React Router handles navigation with a basename tied to Vite’s ",e.jsx("code",{children:"BASE_URL"}),"; styled-components provides scoped styling; ESLint/Prettier/EditorConfig keep the codebase consistent; env files use the ",e.jsx("code",{children:"VITE_"})," prefix; aliases clean up imports; GH Pages needs a small SPA fallback."]})]});export{n as default};
