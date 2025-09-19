import{j as e}from"./index-BUVRD3Bm.js";import{S as i}from"./styled-BID83fT8.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Vite Config"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Vite"})," is a fast dev server + build tool. In dev it serves ES modules directly and transforms code with ",e.jsx("b",{children:"esbuild"}),"; for production it bundles with ",e.jsx("b",{children:"Rollup"}),". Configuration lives in ",e.jsx(i.InlineCode,{children:"vite.config.js"})," (or ",e.jsx("em",{children:".ts"}),") and is exported via ",e.jsx(i.InlineCode,{children:"defineConfig"}),"."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Terms (know these first)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Dev server:"})," Vite’s local HTTP server with instant ",e.jsx("b",{children:"HMR"})," (hot module replacement) for fast feedback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"HMR:"})," updates modules in the browser without a full reload, preserving state when possible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ESBuild:"})," extremely fast transformer used by Vite for TS/JS/JSX in dev and dependency pre-bundling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rollup:"})," bundler used by Vite to create optimized production builds (",e.jsx(i.InlineCode,{children:"vite build"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Plugin:"})," a hookable extension (Vite/ Rollup compatible) that transforms code or injects behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mode:"})," a named environment (e.g., ",e.jsx(i.InlineCode,{children:"development"}),", ",e.jsx(i.InlineCode,{children:"production"}),") that loads matching ",e.jsx("em",{children:".env"})," files."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Env var:"})," configuration value exposed to the client only if it starts with ",e.jsx(i.InlineCode,{children:"VITE_"})," and is read via ",e.jsx(i.InlineCode,{children:"import.meta.env"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Minimal React Vite Config"}),e.jsx(i.Pre,{children:`// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
});`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"@vitejs/plugin-react"})," adds JSX transform, Fast Refresh (React HMR), and useful dev warnings. Use ",e.jsx(i.InlineCode,{children:"defineConfig"})," for type hints and clean DX."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Base Path (important for GitHub Pages)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"base:"})," the public path your app is served from. For GH Pages project sites, it’s ",e.jsx(i.InlineCode,{children:'"/<repo>/"'}),"."]}),e.jsxs("li",{children:["Your live URL is ",e.jsx(i.InlineCode,{children:"https://a2rp.github.io/notes-reactjs/"}),", so use ",e.jsx(i.InlineCode,{children:'base: "/notes-reactjs/"'}),"."]})]}),e.jsx(i.Pre,{children:`// vite.config.js
export default defineConfig({
  base: "/notes-reactjs/",
  plugins: [react()],
});`}),e.jsxs(i.Small,{children:["If you forget ",e.jsx("b",{children:"base"}),", asset URLs and code-split chunks may 404 on GH Pages."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Aliases (clean import paths)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Alias:"})," a shortcut so you can write ",e.jsx(i.InlineCode,{children:'import Button from "@/components/Button"'})," instead of long relative paths."]}),e.jsxs("li",{children:["Configure in ",e.jsx(i.InlineCode,{children:"resolve.alias"}),". (You’ll cover full “Aliases” topic later.)"]})]}),e.jsx(i.Pre,{children:`import path from "node:path";
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
      "@components": path.resolve(process.cwd(), "src/components"),
    },
  },
});`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Dev Server Options"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"server.port:"})," which port to run on."]}),e.jsxs("li",{children:[e.jsx("b",{children:"server.open:"})," open the browser on start."]}),e.jsxs("li",{children:[e.jsx("b",{children:"server.proxy:"})," proxy API calls in dev to avoid CORS issues."]})]}),e.jsx(i.Pre,{children:`export default defineConfig({
  server: {
    port: 5173,
    open: true,
    proxy: {
      "/api": {
        target: "http://localhost:4000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Proxy:"})," requests to ",e.jsx(i.InlineCode,{children:"/api/*"})," during dev are forwarded to your backend."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Environment Variables & Modes"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:".env files:"})," Vite loads ",e.jsx(i.InlineCode,{children:".env"}),", ",e.jsx(i.InlineCode,{children:".env.development"}),", ",e.jsx(i.InlineCode,{children:".env.production"})," based on mode."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Client exposure:"})," variables must be prefixed with ",e.jsx(i.InlineCode,{children:"VITE_"})," to be available in code."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Read:"})," ",e.jsx(i.InlineCode,{children:"import.meta.env.VITE_API_URL"}),". Do ",e.jsx("em",{children:"not"})," use ",e.jsx(i.InlineCode,{children:"process.env"})," in the browser."]})]}),e.jsx(i.Pre,{children:`// .env
VITE_APP_NAME="Notes ReactJS"
VITE_API_URL="https://api.example.com"

// in code
console.log(import.meta.env.MODE);           // "development" | "production"
console.log(import.meta.env.VITE_APP_NAME);  // "Notes ReactJS"`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Mode:"})," Use ",e.jsx(i.InlineCode,{children:"vite build --mode staging"})," to load ",e.jsx(i.InlineCode,{children:".env.staging"}),"."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:[e.jsx("code",{children:"define"})," (compile-time constants)"]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"define:"})," replaces identifiers at build time—great for feature flags and version strings."]}),e.jsxs("li",{children:["Unlike env vars, ",e.jsx("b",{children:"define"})," inlines values during build and doesn’t read from files automatically."]})]}),e.jsx(i.Pre,{children:`export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify("1.2.3"),
    __ENABLE_EXPERIMENT__: "true",
  },
});

// usage in app:
if (__ENABLE_EXPERIMENT__) {
  console.log("Running v", __APP_VERSION__);
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Production Build Options"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"target:"})," JavaScript output target (e.g., ",e.jsx(i.InlineCode,{children:'"es2019"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"outDir:"})," output directory (defaults to ",e.jsx(i.InlineCode,{children:"dist"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"sourcemap:"})," generate source maps for debugging."]}),e.jsxs("li",{children:[e.jsx("b",{children:"minify:"})," ",e.jsx(i.InlineCode,{children:'"esbuild"'})," (default) or ",e.jsx(i.InlineCode,{children:'"terser"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"rollupOptions:"})," fine-grained bundling control (manual chunks, asset naming, etc.)."]})]}),e.jsx(i.Pre,{children:`export default defineConfig({
  build: {
    target: "es2019",
    outDir: "dist",
    sourcemap: true,
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
        },
      },
    },
  },
});`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"manualChunks:"})," split big deps so browsers cache them separately; improves long-term page speed."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Optimize Deps (pre-bundle for faster dev)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"optimizeDeps:"})," pre-bundles slow/complex packages at dev start for snappier HMR."]}),e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"include"})," to force pre-bundling; ",e.jsx(i.InlineCode,{children:"exclude"})," to skip."]})]}),e.jsx(i.Pre,{children:`export default defineConfig({
  optimizeDeps: {
    include: ["lodash-es"],
    exclude: ["some-heavy-lib"],
  },
});`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Preview Server"}),e.jsx(i.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"vite preview:"})," serves the built ",e.jsx(i.InlineCode,{children:"dist"})," locally—useful to test prod behavior."]})}),e.jsx(i.Pre,{children:`export default defineConfig({
  preview: {
    port: 5050,
    open: true,
  },
});`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," set ",e.jsx(i.InlineCode,{children:"base"})," for GH Pages project sites (",e.jsx(i.InlineCode,{children:'"/notes-reactjs/"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefix client env vars with ",e.jsx(i.InlineCode,{children:"VITE_"})," and read via ",e.jsx(i.InlineCode,{children:"import.meta.env"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use aliases for clean imports and ",e.jsx(i.InlineCode,{children:"manualChunks"})," for better long-term caching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," use ",e.jsx(i.InlineCode,{children:"process.env"})," in browser code (use ",e.jsx(i.InlineCode,{children:"import.meta.env"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hardcode absolute URLs; prefer env-driven config."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Quick Reference"}),e.jsx(i.Pre,{children:`// vite.config.js (React + GH Pages + aliases + proxy + build)
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  base: "/notes-reactjs/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
  server: {
    port: 5173,
    proxy: { "/api": { target: "http://localhost:4000", changeOrigin: true } },
  },
  define: { __APP_VERSION__: JSON.stringify("1.0.0") },
  build: {
    target: "es2019",
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: { react: ["react", "react-dom"], vendor: ["react-router-dom"] },
      },
    },
  },
});`})]}),e.jsxs(i.Callout,{children:["Summary: Vite’s config is small but powerful—set the correct ",e.jsx("b",{children:"base"}),", organize imports with ",e.jsx("b",{children:"aliases"}),", use ",e.jsx("b",{children:"env vars"})," via ",e.jsx("b",{children:"import.meta.env"}),", optimize builds with",e.jsx("b",{children:" rollupOptions"}),", and lean on ",e.jsx("b",{children:"@vitejs/plugin-react"})," for React DX."]})]});export{r as default};
