import{j as e}from"./index-Dt0Nk7bl.js";import{S as n}from"./styled-DuHK9_rw.js";const l=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:".env Files (Vite)"}),e.jsxs(n.Lead,{children:["Environment files provide per-environment configuration for the client app. In Vite, only variables prefixed with ",e.jsx("b",{children:"VITE_"})," are exposed to the browser. Values are injected at build/dev time."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key rules"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Only ",e.jsx(n.InlineCode,{children:"VITE_*"})," keys are available in client code via"," ",e.jsx(n.InlineCode,{children:"import.meta.env"}),"."]}),e.jsxs("li",{children:["Built-ins always available:"," ",e.jsx(n.InlineCode,{children:"import.meta.env.MODE"}),","," ",e.jsx(n.InlineCode,{children:"DEV"}),","," ",e.jsx(n.InlineCode,{children:"PROD"}),","," ",e.jsx(n.InlineCode,{children:"BASE_URL"}),"."]}),e.jsx("li",{children:"All env values are strings; convert to number/boolean in code when needed."}),e.jsx("li",{children:"Do not store secrets in client env files; everything ships to the browser."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common files & purpose"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:".env"})," — defaults for all modes."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:".env.development"})," — overrides for dev."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:".env.production"})," — overrides for prod builds."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:".env.local"})," and"," ",e.jsx(n.InlineCode,{children:".env.<mode>.local"})," — developer-specific overrides (keep out of git)."]})]}),e.jsx(n.Pre,{children:`# .gitignore (ensure local env files are ignored)
.env.local
.env.development.local
.env.production.local
.env.test.local`}),e.jsxs(n.Small,{children:["Recommended pattern: place defaults in ",e.jsx("code",{children:".env"}),", override by mode in"," ",e.jsx("code",{children:".env.development"}),"/",e.jsx("code",{children:".env.production"}),", use"," ",e.jsx("code",{children:".env.*.local"})," for machine-specific values."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Declaring variables"}),e.jsx(n.Pre,{children:`# .env
VITE_APP_NAME=React Notes
VITE_API_BASE=/api
VITE_ENABLE_ANALYTICS=false
VITE_PAGE_SIZE=20`}),e.jsx(n.Pre,{children:`# .env.production
VITE_API_BASE=https://api.example.com
VITE_ENABLE_ANALYTICS=true`}),e.jsx(n.Small,{children:"Quoting is optional for plain strings. Values are parsed as strings; coerce types in code (Number/Boolean)."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Using variables in code"}),e.jsx(n.Pre,{children:`// read variables
const name = import.meta.env.VITE_APP_NAME;         // "React Notes"
const api  = import.meta.env.VITE_API_BASE;         // "/api" or "https://api.example.com"
const on   = import.meta.env.VITE_ENABLE_ANALYTICS; // "false" or "true" (string)
const size = import.meta.env.VITE_PAGE_SIZE;        // "20" (string)

// coerce types
const ENABLE_ANALYTICS = on === "true";
const PAGE_SIZE = Number(size) || 10;

// using BASE_URL (public base path from vite.config.js -> base)
const assetUrl = import.meta.env.BASE_URL + "logo.svg";`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Modes and custom environments"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Default dev mode is ",e.jsx(n.InlineCode,{children:"development"}),"; default build mode is"," ",e.jsx(n.InlineCode,{children:"production"}),"."]}),e.jsxs("li",{children:["Custom mode (e.g., ",e.jsx("em",{children:"staging"}),") loads"," ",e.jsx(n.InlineCode,{children:".env"})," +"," ",e.jsx(n.InlineCode,{children:".env.staging"})," (+"," ",e.jsx(n.InlineCode,{children:".env.staging.local"})," if present)."]})]}),e.jsx(n.Pre,{children:`# package.json (scripts)
{
  "scripts": {
    "dev": "vite",
    "dev:staging": "vite --mode staging",
    "build": "vite build",
    "build:staging": "vite build --mode staging",
    "preview": "vite preview"
  }
}`}),e.jsx(n.Pre,{children:`# .env.staging (example)
VITE_API_BASE=https://staging-api.example.com
VITE_ENABLE_ANALYTICS=false`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Small helper (optional)"}),e.jsx("p",{children:"Lightweight helper to read env values with defaults and coercion."}),e.jsx(n.Pre,{children:`// utils/env.js
export const env = {
  string(key, fallback = "") {
    const v = import.meta.env[key];
    return typeof v === "string" ? v : fallback;
  },
  bool(key, fallback = false) {
    const v = import.meta.env[key];
    if (v === "true") return true;
    if (v === "false") return false;
    return fallback;
  },
  number(key, fallback = 0) {
    const n = Number(import.meta.env[key]);
    return Number.isFinite(n) ? n : fallback;
  },
};

// usage
// const API = env.string("VITE_API_BASE", "/api");`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Security note"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Client env files are public configuration. Never embed private API keys, DB URLs with credentials, or secrets. Place secrets on a server or edge function and call that from the client."}),e.jsxs("li",{children:["Consider a small backend proxy for protected APIs; the client reads"," ",e.jsx(n.InlineCode,{children:"VITE_API_BASE"})," that points to the proxy."]})]})]}),e.jsxs(n.Callout,{children:["Summary: prefix with ",e.jsx("b",{children:"VITE_"}),", organize defaults vs per-mode overrides, keep"," ",e.jsx("code",{children:".env.*.local"})," out of git, coerce types in code, and avoid placing secrets in client envs."]})]});export{l as default};
