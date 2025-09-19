import{j as e}from"./index-CDxhzYTb.js";import{S as i}from"./styled-Du7ucoCd.js";const l=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Deploy on Netlify"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Netlify"})," is a platform for hosting modern frontends. You connect your Git repo, it builds your app, and serves the optimized static files globally via a CDN. It also gives you preview URLs for every branch/PR and tools like redirects, headers, environment variables, and serverless/edge functions if you need them."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"CDN (Content Delivery Network):"})," a network of servers that caches and serves your static files from locations close to users."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Build command:"})," the script Netlify runs to produce production assets (for Vite, typically ",e.jsx(i.InlineCode,{children:"npm run build"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Publish directory:"})," the folder containing final build output that gets served (for Vite, ",e.jsx(i.InlineCode,{children:"dist/"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Continuous Deployment (CI/CD):"})," each push to your main branch triggers an auto build + deploy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preview Deploy:"})," an isolated deployment created for non-main branches or Pull Requests for testing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Redirect:"})," a rule that rewrites one URL to another (useful for SPA routing)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headers:"})," extra HTTP metadata you control (e.g., caching, security)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Environment variable:"})," key–value config available at build/runtime without hard-coding secrets (e.g., ",e.jsx(i.InlineCode,{children:"VITE_API_URL"}),")."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Quick Start (GitHub → Netlify CI/CD)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Push your Vite app to GitHub (ensure ",e.jsx(i.InlineCode,{children:"npm run build"})," works locally)."]}),e.jsxs("li",{children:["In Netlify dashboard: ",e.jsx("b",{children:"New site from Git"})," → choose Git provider → select repo."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Build command:"})," ",e.jsx(i.InlineCode,{children:"npm run build"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Publish directory:"})," ",e.jsx(i.InlineCode,{children:"dist"})]}),e.jsxs("li",{children:["Click ",e.jsx("b",{children:"Deploy site"}),". Netlify builds and gives you a live URL."]})]}),e.jsx(i.Pre,{children:`// package.json (Vite default)
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`}),e.jsx(i.Small,{children:'If the build fails, check Node version in Netlify "Site settings → Build & deploy → Environment" (match your local version).'})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Single-Page App Routing (Must-do)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["React Router uses client-side routing. On page refresh of a deep link (e.g., ",e.jsx(i.InlineCode,{children:"/about"}),"), the server must return ",e.jsx(i.InlineCode,{children:"index.html"}),"."]}),e.jsxs("li",{children:["Configure Netlify redirects so ",e.jsx("b",{children:"any"})," path falls back to ",e.jsx(i.InlineCode,{children:"index.html"})," (status 200)."]})]}),e.jsx(i.Pre,{children:`# netlify.toml (at repo root)
[build]
  command = "npm run build"
  publish = "dist"

# Redirect all routes to index.html (SPA fallback)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
`}),e.jsxs(i.Small,{children:["Alternatively, you can create a ",e.jsx(i.InlineCode,{children:"_redirects"})," file in ",e.jsx(i.InlineCode,{children:"public/"})," with the same rule: ",e.jsx(i.InlineCode,{children:"/*  /index.html  200"}),"."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Deploy with Netlify CLI (Optional)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Netlify CLI:"})," local tool to preview Netlify-like environment and deploy on demand."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"netlify init"})," links your local project to a Netlify site."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"netlify deploy"})," makes a draft deploy; ",e.jsx(i.InlineCode,{children:"netlify deploy --prod"})," publishes to production."]})]}),e.jsx(i.Pre,{children:`# one-time install
npm i -g netlify-cli

# inside your project
netlify init                  # link local folder to Netlify site
npm run build                 # create dist/
netlify deploy                # draft deploy (get a preview URL)
netlify deploy --prod         # publish to production
`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Environment Variables (Dev / Preview / Prod)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Set variables in Netlify: ",e.jsx("b",{children:"Site settings → Environment variables"}),". You can scope them to ",e.jsx("b",{children:"Deploy Previews"})," vs ",e.jsx("b",{children:"Production"}),"."]}),e.jsxs("li",{children:["In Vite, only variables prefixed with ",e.jsx(i.InlineCode,{children:"VITE_"})," are exposed to client code."]}),e.jsxs("li",{children:["Access in code via ",e.jsx(i.InlineCode,{children:"import.meta.env.VITE_*"}),"."]})]}),e.jsx(i.Pre,{children:`// Example usage in Vite + React
const apiBase = import.meta.env.VITE_API_BASE_URL;
// Use apiBase in fetch(...) and keep secrets out of source code.
`}),e.jsxs(i.Small,{children:["Keep true secrets on the server side (don't expose tokens to the browser). For public keys/config, ",e.jsx(i.InlineCode,{children:"VITE_"})," is OK."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Cache-Control & Headers"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Cache-Control:"})," tells browsers/CDNs how long to cache assets. Fingerprinted files (e.g., ",e.jsx(i.InlineCode,{children:"chunk-XYZ.js"}),") can be cached for a long time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"No-cache for HTML:"})," keep ",e.jsx(i.InlineCode,{children:"index.html"})," fresh so users get the latest bundle on next load."]})]}),e.jsx(i.Pre,{children:`# netlify.toml
[[headers]]
  for = "/*"
  [headers.values]
    # Security headers (optional but good practice)
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/index.html"
  [headers.values]
    Cache-Control = "no-cache, no-store, must-revalidate"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
`}),e.jsx(i.Small,{children:"Vite emits hashed assets, which are safe for long caching. The HTML should not be cached aggressively."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Optional: Forms & Redirects"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Netlify Forms:"})," you can enable static form handling by adding ",e.jsx(i.InlineCode,{children:'data-netlify="true"'})," to a form in your HTML and a hidden input with the form name."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Custom redirects:"})," map old paths to new ones or add 301/302 rules for SEO."]})]}),e.jsx(i.Pre,{children:`# public/_redirects
/old-route   /new-route   301
`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Production Monitoring (Basics)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Deploy notifications:"})," enable Slack/Email on successful or failed builds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uptime checks:"})," use an external uptime service to ping your site and alert on downtime."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error tracking:"})," integrate a client-side tracker (e.g., Sentry) to capture JS errors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," periodically run Lighthouse and watch TTI, LCP, CLS after deploys."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Troubleshooting & Pitfalls"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"404 on refresh:"})," you forgot SPA fallback. Add the redirect to ",e.jsx(i.InlineCode,{children:"index.html"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Env var not visible:"})," missing ",e.jsx(i.InlineCode,{children:"VITE_"})," prefix or you forgot to redeploy after changing it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale bundle:"})," browser cached old assets. Ensure HTML is ",e.jsx("i",{children:"no-cache"})," and assets are long-cache with hashes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Build fails on Netlify only:"})," Node version mismatch or missing install step. Set Node version and check build logs."]})]})]}),e.jsxs(i.Callout,{children:["Summary: Connect Git → set build (",e.jsx("i",{children:"npm run build"}),") and publish (",e.jsx("i",{children:"dist"}),") → add SPA fallback → tune headers and env vars → verify with preview deploys → monitor after go-live."]})]});export{l as default};
