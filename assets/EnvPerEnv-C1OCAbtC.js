import{j as e}from"./index-DUO2rjrc.js";import{S as n}from"./styled-CBN73NgU.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Env per Env (Vite)"}),e.jsxs(n.Lead,{children:["“Environment per environment” means your app reads different settings depending on where it runs:",e.jsx("b",{children:" development"})," on your laptop, ",e.jsx("b",{children:"staging"})," for internal testing, and ",e.jsx("b",{children:"production"})," for real users. With Vite, you use ",e.jsx(n.InlineCode,{children:".env"})," files and"," ",e.jsx(n.InlineCode,{children:"import.meta.env"})," to inject safe, build-time variables."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Definitions (read first)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Environment (env):"})," the context your app runs in (dev/test/staging/prod). Each env can have different servers, flags, analytics keys, etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Environment variable (env var):"})," a named value (like"," ",e.jsx(n.InlineCode,{children:"API_BASE_URL"}),") that controls behavior without changing code."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Build time:"})," when Vite bundles your app. Variables injected here become"," ",e.jsx("em",{children:"static"})," in the built JS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Runtime:"})," when the user's browser executes your app. Vite's SPA builds cannot load new env vars unless you fetch them (e.g., ",e.jsx("i",{children:"window"}),"-injected config or a fetched JSON)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Public vs Secret:"})," Frontend code is downloadable by anyone—assume everything in it is ",e.jsx("em",{children:"public"}),". Never put true secrets (DB passwords, private keys) in the frontend. Keep secrets on the server."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Vite Env Rules (important)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Files: ",e.jsx(n.InlineCode,{children:".env"}),","," ",e.jsx(n.InlineCode,{children:".env.development"}),","," ",e.jsx(n.InlineCode,{children:".env.staging"})," (custom),"," ",e.jsx(n.InlineCode,{children:".env.production"}),", plus"," ",e.jsx(n.InlineCode,{children:"*.local"})," variants (ignored by Git)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prefix required:"})," Only variables prefixed with"," ",e.jsx(n.InlineCode,{children:"VITE_"})," are exposed to your client bundle. Example: ",e.jsx(n.InlineCode,{children:"VITE_API_BASE_URL"}),"."]}),e.jsxs("li",{children:["Access in code via ",e.jsx(n.InlineCode,{children:"import.meta.env.VITE_*"}),"."]}),e.jsxs("li",{children:["Mode decides which file loads. Vite uses ",e.jsx(n.InlineCode,{children:"development"})," by default for"," ",e.jsx(n.InlineCode,{children:"vite"}),"/",e.jsx(n.InlineCode,{children:"dev"})," and"," ",e.jsx(n.InlineCode,{children:"production"})," for"," ",e.jsx(n.InlineCode,{children:"build"}),". You can force a mode with"," ",e.jsx(n.InlineCode,{children:"--mode"}),"."]})]}),e.jsx(n.Pre,{children:`// Example env files (at project root):
// .env                -> shared defaults
// .env.development    -> only in dev
// .env.staging        -> only when --mode staging
// .env.production     -> only in prod
//
// .env.local, .env.development.local, etc. -> ignored by Git (put personal/local values here)

// Example contents:
VITE_APP_NAME="Notes ReactJS"
VITE_API_BASE_URL="http://localhost:5000"
VITE_FEATURE_FLAGS='{"betaSearch": true}'`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Reading Env Vars in React"}),e.jsx(n.Pre,{children:`// Anywhere in your React code:
function EnvBadge() {
  const name = import.meta.env.VITE_APP_NAME;
  const base = import.meta.env.VITE_API_BASE_URL;
  const flags = JSON.parse(import.meta.env.VITE_FEATURE_FLAGS || "{}");

  return (
    <div>
      <strong>{name}</strong>
      <div>API: {base}</div>
      <div>betaSearch: {String(flags.betaSearch)}</div>
    </div>
  );
}`}),e.jsxs(n.Small,{children:["Tip: complex values like feature flags can be stored as JSON strings and"," ",e.jsx(n.InlineCode,{children:"JSON.parse()"}),"d at runtime."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"API Base URLs per Environment"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Keep a different ",e.jsx(n.InlineCode,{children:"VITE_API_BASE_URL"})," for dev/staging/prod."]}),e.jsx("li",{children:"Don't hard-code URLs in components. Centralize them in one config helper."})]}),e.jsx(n.Pre,{children:`// src/config/api.js
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Example usage:
export async function getTopics() {
  const res = await fetch(\`\${API_BASE_URL}/topics\`);
  if (!res.ok) throw new Error("Failed to fetch topics");
  return res.json();
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Modes & Scripts"}),e.jsx(n.Pre,{children:`// package.json (scripts)
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",               // uses mode=production by default
    "build:staging": "vite build --mode staging",
    "preview": "vite preview --port 4173"
  }
}`}),e.jsxs(n.Small,{children:["Running ",e.jsx(n.InlineCode,{children:"npm run build:staging"})," loads"," ",e.jsx(n.InlineCode,{children:".env.staging"})," in addition to base ",e.jsx(n.InlineCode,{children:".env"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Runtime Config (when you can't rebuild)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Vite inlines env at ",e.jsx("b",{children:"build time"}),". If you must change config ",e.jsx("em",{children:"without"})," rebuilding (e.g., same build for staging & prod), load a small JSON or attach a global on"," ",e.jsx(n.InlineCode,{children:"window"}),"."]}),e.jsx("li",{children:"This is useful on static hosts (e.g., GH Pages/CF Pages) where you deploy one build to multiple environments."})]}),e.jsx(n.Pre,{children:`// public/runtime-config.json (deployed alongside the app)
{
  "API_BASE_URL": "https://api.example.com",
  "FEATURE_FLAGS": { "betaSearch": false }
}

// src/config/runtime.js
export async function loadRuntimeConfig() {
  const res = await fetch("/runtime-config.json", { cache: "no-store" });
  if (!res.ok) return {};
  return res.json();
}

// In your root (e.g., main.jsx):
// const runtime = await loadRuntimeConfig();
// const API_BASE_URL = runtime.API_BASE_URL ?? import.meta.env.VITE_API_BASE_URL;`}),e.jsx(n.Small,{children:"Rule of thumb: prefer build-time env for simplicity. Use runtime config only when you truly need it."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Host Notes (GH Pages, Vercel, Netlify, CF Pages)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"GitHub Pages:"})," static hosting. Use build-time env files and set router base (e.g.,"," ",e.jsx(n.InlineCode,{children:'<BrowserRouter basename="/notes-reactjs">'}),"). Runtime config requires a fetched JSON in ",e.jsx(n.InlineCode,{children:"public/"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Vercel / Netlify:"})," support dashboard env vars that become build-time values. For SPA, they're still public after build—treat as non-secrets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cloudflare Pages:"})," similar to GH Pages (static). Use per-project env and/or runtime JSON."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Feature Flags (simple pattern)"}),e.jsx(n.Pre,{children:`// .env.development
VITE_FEATURE_FLAGS='{"betaSearch": true, "newNav": true}'

// .env.production
VITE_FEATURE_FLAGS='{"betaSearch": false, "newNav": false}'

// src/config/flags.js
export const FLAGS = Object.freeze(
  JSON.parse(import.meta.env.VITE_FEATURE_FLAGS || "{}")
);

// Usage in components:
{FLAGS.betaSearch && <BetaSearchBox />} // renders only when flag is true`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefix with ",e.jsx(n.InlineCode,{children:"VITE_"})," and centralize access in small helpers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep separate env files for dev/staging/prod; commit only non-sensitive ones."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(n.InlineCode,{children:"*.local"})," for machine-specific values (ignored by Git)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," put secrets in frontend env—use a server/API for secrets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," scatter base URLs across components—use one config source."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Mode:"})," Vite's selected environment profile that decides which ",e.jsx(n.InlineCode,{children:".env.*"})," files load."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prefix:"})," In Vite, only variables starting with ",e.jsx(n.InlineCode,{children:"VITE_"})," are exposed to the client."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Runtime config:"})," Settings loaded by the browser at page load (e.g., fetched JSON), not baked in at build time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Feature flag:"})," An on/off switch (env-driven) to enable or disable features safely."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Staging:"})," A production-like environment for final verification before going live."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Pick build-time env for simplicity, runtime config only when you must change settings without rebuilding. Prefix with ",e.jsx("b",{children:"VITE_"}),", never store secrets in the frontend, and centralize API URLs & flags so each environment behaves predictably."]})]});export{r as default};
