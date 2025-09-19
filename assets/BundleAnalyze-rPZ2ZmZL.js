import{j as e}from"./index-DUO2rjrc.js";import{S as i}from"./styled-Cs7EQ1OA.js";const l=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Bundle Analyze"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Bundle analysis"})," helps you see what's inside your production JavaScript/CSS bundles, how big each dependency is, and where you can trim size. In Vite (which uses Rollup for builds), we typically use a visualizer to inspect ",e.jsx("i",{children:"modules"}),", ",e.jsx("i",{children:"chunks"}),", and ",e.jsx("i",{children:"assets"}),"."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Why bundle analysis matters"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," Smaller bundles ship faster over the network and execute quicker."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Clarity:"})," See ",e.jsx("em",{children:"which"})," libraries dominate size and whether tree-shaking worked."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Priorities:"})," Decide where to split code (lazy routes), or replace heavy deps with lighter ones."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Key terms (plain English)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Module:"})," A single source file that your app imports (e.g., ",e.jsx(i.InlineCode,{children:"src/App.jsx"})," or ",e.jsx(i.InlineCode,{children:"node_modules/react/index.js"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bundle:"})," The final optimized files produced for production (",e.jsx(i.InlineCode,{children:"dist/assets/*.js"}),", ",e.jsx(i.InlineCode,{children:"*.css"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chunk:"})," A piece of a bundle produced by code-splitting. Each dynamic import often becomes its own chunk (e.g., ",e.jsx(i.InlineCode,{children:"index-XYZ.js"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Asset:"})," Non-JS/CSS files copied/processed to ",e.jsx(i.InlineCode,{children:"dist"})," (images, fonts, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tree-shaking:"})," Removing exported code that isn't used by your app."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Code-splitting:"})," Breaking your app into multiple chunks so the browser downloads only what's needed for the current page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parsed size:"})," Size of the file before compression; affects CPU parse/execute time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Gzip/Brotli size:"})," Compressed sizes over the network; what users actually download."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Vendor chunk:"})," A chunk that contains third-party deps (from ",e.jsx(i.InlineCode,{children:"node_modules"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sourcemap:"})," A file that maps minified code back to original code for debugging/analysis."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Tools for Vite builds"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"rollup-plugin-visualizer:"})," Generates a treemap HTML report of your chunks/modules."]}),e.jsxs("li",{children:[e.jsx("b",{children:"vite-bundle-visualizer:"})," Convenience wrapper for the same purpose."]}),e.jsxs("li",{children:[e.jsx("b",{children:"source-map-explorer:"})," CLI to analyze a single built file using its sourcemap."]}),e.jsxs("li",{children:[e.jsx("b",{children:"webpack-bundle-analyzer:"})," Popular for Webpack (mention only; not used with Vite builds)."]})]}),e.jsx(i.Small,{children:"Below are example setups you can copy into your project when you're ready."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Setup: rollup-plugin-visualizer (recommended)"}),e.jsx(i.Pre,{children:`# 1) Install the plugin (dev dependency)
npm i -D rollup-plugin-visualizer
# or
pnpm add -D rollup-plugin-visualizer
yarn add -D rollup-plugin-visualizer

// 2) vite.config.js — add Visualizer to Rollup plugins (build only)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true, // required for accurate module analysis
    rollupOptions: {
      plugins: [
        visualizer({
          filename: "dist/stats.html",   // where to write the report
          template: "treemap",           // "treemap", "sunburst", or "network"
          gzipSize: true,                // show gzip sizes
          brotliSize: true,              // show brotli sizes
          open: true                     // open the HTML report automatically after build
        })
      ]
    }
  }
});`}),e.jsx(i.Pre,{children:`# 3) Build the project
npm run build
# Then open dist/stats.html (auto-opens if open: true)`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Alternative: source-map-explorer (per-file view)"}),e.jsx(i.Pre,{children:`# 1) Install
npm i -D source-map-explorer

# 2) Ensure sourcemaps are on in vite.config.js (build.sourcemap = true)

# 3) Run against a built file (adjust name)
npx source-map-explorer "dist/assets/*.js" --html dist/sme-report.html`}),e.jsx(i.Small,{children:"Generates an HTML report per file to see which modules contribute to its size."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"How to read the report"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Big rectangles = big modules:"})," The larger the block, the more bytes it contributes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Vendor chunk:"})," Expect a large vendor chunk containing React, router, and UI libs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Multiple chunks:"})," Route-level lazy imports appear as separate chunks—this is good for first-load time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Gzip/Brotli:"})," Compare parsed vs compressed sizes; network cost may be far smaller than raw size."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Examples: shrinking the bundle"}),e.jsx(i.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"Code-split routes:"})," Use ",e.jsx(i.InlineCode,{children:"React.lazy"})," and dynamic imports so large pages load on demand."]})}),e.jsx(i.Pre,{children:`// Example: route-level code splitting
import { lazy, Suspense } from "react";
const HeavyPage = lazy(() => import("./pages/HeavyPage"));

<Route
  path="/heavy"
  element={
    <Suspense fallback={<Spinner/>}>
      <HeavyPage />
    </Suspense>
  }
/>`}),e.jsx(i.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"Manual vendor split (optional):"})," Control what goes into vendor vs app chunks."]})}),e.jsx(i.Pre,{children:`// vite.config.js — manual chunks (advanced)
build: {
  rollupOptions: {
    output: {
      manualChunks(id) {
        if (id.includes("node_modules")) {
          if (id.includes("react") || id.includes("react-router")) return "vendor-react";
          if (id.includes("styled-components")) return "vendor-styled";
          return "vendor";
        }
      }
    }
  }
}`}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use lighter libs:"})," e.g., prefer ",e.jsx(i.InlineCode,{children:"date-fns"})," over heavy, locale-bundled date libraries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Import only what you use:"})," From utility libs, import specific functions (tree-shakable ESM builds like ",e.jsx(i.InlineCode,{children:"lodash-es"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trim icons/fonts:"})," Avoid importing large icon packs wholesale; pick individual icons."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid duplicate deps:"})," Ensure a single version of each library in ",e.jsx(i.InlineCode,{children:"node_modules"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," enable ",e.jsx(i.InlineCode,{children:"build.sourcemap"})," for accurate analysis."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," analyze a ",e.jsx("em",{children:"production"})," build; dev server uses ES modules and is not optimized."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," lazy-load rarely used pages, editors, charts, and admin screens."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," micro-optimize tiny files; prioritize the top 2-3 offenders in the report."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block critical route JS with huge optional dependencies—split them out."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Quick checklist"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"✅ Add visualizer; build with sourcemaps; open the report."}),e.jsx("li",{children:"✅ Identify the largest modules and why they're needed."}),e.jsx("li",{children:"✅ Replace/trim heavy deps; prefer ESM and named imports."}),e.jsxs("li",{children:["✅ Add route-level ",e.jsx(i.InlineCode,{children:"React.lazy"})," and split heavy widgets."]}),e.jsx("li",{children:"✅ Rebuild and compare results; keep iterating until first-load is lean."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Minification:"})," Removing whitespace/renaming variables to reduce size."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dead code:"})," Code that's never executed; should be removed by tree-shaking."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration:"})," Attaching event listeners to server-rendered HTML (relevant for SSR apps)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Long-term caching:"})," Strategy where filenames include content hashes so browsers can cache aggressively."]})]})]}),e.jsx(i.Callout,{children:"Summary: Analyze your bundles regularly. Focus on the biggest modules first, split routes, import only what you use, and prefer lighter dependencies. Measure → change → measure again."})]});export{l as default};
