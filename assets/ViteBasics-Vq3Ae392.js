import{j as e}from"./index-Cqwa5lnP.js";import{S as s}from"./styled-PG5506tl.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Vite Basics"}),e.jsx(s.Lead,{children:"Vite is a fast dev server + build tool. Dev uses native ES modules for instant startup and HMR; production build uses Rollup for optimized bundles."}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core ideas"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Index-first:"})," ",e.jsx(s.InlineCode,{children:"index.html"})," is the entry file (not a bundler config)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Native ESM in dev:"})," modules are served as files → fast startup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pre-bundle deps:"})," heavy deps are pre-bundled by esbuild (fast) for quick HMR."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rollup build:"})," production bundles, code-split chunks, asset hashing."]})]}),e.jsx(s.Pre,{children:`<!-- index.html -->
<!doctype html>
<html>
  <head><meta charset="utf-8" /><meta name="viewport" content="width=device-width,initial-scale=1" /></head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"><\/script>
  </body>
</html>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Dev commands"}),e.jsx(s.Pre,{children:`npm run dev      # start dev server with HMR
npm run build    # create production build in /dist
npm run preview  # preview the /dist build locally`}),e.jsx(s.Small,{children:"HMR is automatic; components refresh without losing state when possible."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Vite config essentials"}),e.jsx(s.Pre,{children:`// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  base: "/notes-reactjs/",  // repo name for GH Pages; "/" for Netlify/Vercel
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});`}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"base:"})," the public base path. Pairs with"," ",e.jsx(s.InlineCode,{children:"import.meta.env.BASE_URL"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"alias:"})," shorter imports (e.g.,"," ",e.jsx(s.InlineCode,{children:'import Btn from "@/components/Btn"'}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Environment variables"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Only variables prefixed with ",e.jsx("b",{children:"VITE_"})," are exposed to the client."]}),e.jsxs("li",{children:["Files: ",e.jsx(s.InlineCode,{children:".env"}),","," ",e.jsx(s.InlineCode,{children:".env.development"}),","," ",e.jsx(s.InlineCode,{children:".env.production"}),"."]})]}),e.jsx(s.Pre,{children:`// usage inside code
const api = import.meta.env.VITE_API_BASE;
const baseUrl = import.meta.env.BASE_URL;  // derived from vite.config.js -> base`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Assets — two ways"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Imported assets (recommended):"})," processed and hashed on build."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Public folder:"})," files under ",e.jsx(s.InlineCode,{children:"public/"})," are copied as-is and served at root."]})]}),e.jsx(s.Pre,{children:`// 1) Imported asset
import logo from "@/assets/logo.svg";
<img src={logo} alt="logo" />

// 2) Public asset (no import)
<img src={import.meta.env.BASE_URL + "logo.svg"} alt="logo" />`}),e.jsx(s.Small,{children:"Imported assets are safer with GH Pages/base paths. Public assets are convenient for favicons, robots.txt, etc."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Special asset queries"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"?url"})," → get the final URL as a string."]}),e.jsxs("li",{children:[e.jsx("b",{children:"?raw"})," → import file contents as raw text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"?worker"})," → create web workers easily."]})]}),e.jsx(s.Pre,{children:`import txt from "./notes.md?raw";
import imgUrl from "./photo.png?url";
import WorkerURL from "./heavy-task.js?worker";  // new Worker(WorkerURL)`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"CSS handling"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Regular CSS files are supported out of the box."}),e.jsxs("li",{children:["CSS Modules: name files like ",e.jsx(s.InlineCode,{children:"Button.module.css"}),"."]}),e.jsxs("li",{children:["Preprocessors: install the preprocessor (e.g., ",e.jsx(s.InlineCode,{children:"sass"}),") and import ",e.jsx(s.InlineCode,{children:".scss"}),"."]}),e.jsxs("li",{children:["PostCSS config works via ",e.jsx(s.InlineCode,{children:"postcss.config.js"}),"."]})]}),e.jsx(s.Pre,{children:`// CSS Modules
import styles from "./Button.module.css";
<button className={styles.primary}>Click</button>

// SCSS (after: npm i -D sass)
import "./global.scss";`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Auto imports to know"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"JSON as modules:"})," ",e.jsx(s.InlineCode,{children:'import data from "./data.json"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Glob imports:"})," eager/lazy import many files at once."]})]}),e.jsx(s.Pre,{children:`// import many modules at once
const pages = import.meta.glob("../pages/**/*.jsx");       // lazy (returns loader fns)
const mdFiles = import.meta.glob("../docs/**/*.md", { eager: true }); // eager (direct modules)`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Optimize deps (dev speed)"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Vite pre-bundles dependencies with esbuild for faster page loads."}),e.jsxs("li",{children:["Control with ",e.jsx(s.InlineCode,{children:"optimizeDeps.include/exclude"})," when needed."]})]}),e.jsx(s.Pre,{children:`// vite.config.js (snippet)
export default defineConfig({
  optimizeDeps: {
    include: ["lodash-es"],
    exclude: ["big-legacy-lib"]
  }
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Build output"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"dist/"})," contains hashed JS/CSS and copied assets."]}),e.jsx("li",{children:"Code splitting is automatic for dynamic imports."}),e.jsx("li",{children:"Analyze bundles with Rollup plugins or tools if needed."})]}),e.jsx(s.Pre,{children:`// Dynamic import example (also how React.lazy works under the hood)
const Editor = React.lazy(() => import("@/components/Editor"));`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common gotchas"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(s.InlineCode,{children:"import.meta.env"}),", not ",e.jsx(s.InlineCode,{children:"process.env"}),"."]}),e.jsxs("li",{children:["When deploying under a subpath (e.g., GH Pages), set ",e.jsx(s.InlineCode,{children:"base"})," and use ",e.jsx(s.InlineCode,{children:"import.meta.env.BASE_URL"})," for links to root assets."]}),e.jsxs("li",{children:["Absolute ",e.jsx(s.InlineCode,{children:"/src/…"})," imports in HTML won’t resolve; use module imports in JS."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Vite uses native ESM + esbuild for instant dev and Rollup for production builds. Key practices: set the correct ",e.jsx(s.InlineCode,{children:"base"}),", prefer imported assets, use ",e.jsx(s.InlineCode,{children:"import.meta.env"}),", and leverage glob/dynamic imports for scale."]})]});export{r as default};
