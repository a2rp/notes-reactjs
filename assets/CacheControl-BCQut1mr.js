import{j as e}from"./index-BRArnZ3i.js";import{S as s}from"./styled-B0kPaGfM.js";const l=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Cache Control"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Cache control"})," is how we tell browsers and CDNs which files they can keep, for how long, and when to re-download. Done right, your site feels instant after the first visit. Done wrong, users get stale JS or a broken UI after a deploy."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why this matters (especially for React SPAs)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Fast loads:"})," caching static files (JS/CSS/fonts/images) avoids repeat downloads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Safe updates:"})," the HTML shell (",e.jsx(s.InlineCode,{children:"index.html"}),") must refresh quickly so it can point to the latest hashed assets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CDN friendly:"})," correct headers let CDNs (Netlify/Vercel/CF Pages) serve from edge caches globally."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core terms (plain English)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"HTTP cache:"})," A storage layer in the browser (and sometimes a CDN) that keeps copies of responses."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache-Control:"})," The main header that sets caching rules. Example:",e.jsx(s.InlineCode,{children:"Cache-Control: public, max-age=31536000, immutable"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"max-age=<seconds>:"})," How long the response is fresh. After this, the browser revalidates or refetches."]}),e.jsxs("li",{children:[e.jsx("b",{children:"public / private:"})," ",e.jsx("i",{children:"public"})," allows shared caches (CDNs). ",e.jsx("i",{children:"private"})," restricts caching to the user’s browser."]}),e.jsxs("li",{children:[e.jsx("b",{children:"immutable:"})," Tells the browser the file will never change during its lifetime. Great for fingerprinted files."]}),e.jsxs("li",{children:[e.jsx("b",{children:"no-store:"})," Never cache. Always fetch from the server (used for highly dynamic or sensitive responses)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"no-cache:"})," Allow storing, but revalidate before using (not the same as “don’t cache”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ETag:"})," A file “fingerprint” from the server. Browser asks “has it changed?”; server answers without resending the file if not."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Last-Modified:"})," Timestamp of last change. Similar purpose to ETag, less precise."]}),e.jsxs("li",{children:[e.jsx("b",{children:"s-maxage:"})," Max age for shared caches (CDNs). Overrides ",e.jsx("i",{children:"max-age"})," for the CDN layer only."]}),e.jsxs("li",{children:[e.jsx("b",{children:"stale-while-revalidate:"})," Serve the old file instantly, refresh it in the background for next time."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"The golden rule for Vite/React builds"}),e.jsx(s.Pre,{children:`// After "vite build", you get:
//   - /dist/index.html                    (HTML shell, changes often)
//   - /dist/assets/*.hash.js, *.hash.css  (fingerprinted assets, change rarely)

Rule of thumb:
- index.html        => Cache very briefly (or revalidate often)
- *.hash.js/*.css   => Cache for a year + immutable`}),e.jsxs(s.Small,{children:["Vite puts a hash in asset filenames (",e.jsx("i",{children:"content fingerprinting"}),"). When content changes, the filename changes, so it’s safe to cache “forever”."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Recipes you can copy"}),e.jsx(s.H3,{children:"HTML shell (update quickly)"}),e.jsx(s.Pre,{children:`Cache-Control: no-cache
ETag: "..."`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"no-cache"})," means the browser may keep a copy, but must revalidate before using it. This ensures users pick up the latest asset references after you deploy."]}),e.jsx(s.H3,{children:"Hashed assets (cache forever)"}),e.jsx(s.Pre,{children:"Cache-Control: public, max-age=31536000, immutable"}),e.jsxs(s.Small,{children:["One year in seconds = ",e.jsx(s.InlineCode,{children:"31536000"}),"."," ",e.jsx("b",{children:"immutable"})," tells the browser not to revalidate during that period."]}),e.jsx(s.H3,{children:"Images & fonts"}),e.jsx(s.Pre,{children:`// If filenames are fingerprinted: treat like JS/CSS
Cache-Control: public, max-age=31536000, immutable

// If not fingerprinted (e.g., /logo.png):
Cache-Control: public, max-age=86400, must-revalidate   // 1 day, safer`}),e.jsx(s.H3,{children:"SPA routing (React Router)"}),e.jsx(s.Pre,{children:`// For unknown routes, serve index.html with no-cache:
Cache-Control: no-cache
// This ensures client-side router picks up new bundles after deploy.`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Platform snippets"}),e.jsxs(s.H3,{children:["Netlify — ",e.jsx("code",{children:"_headers"})," file"]}),e.jsx(s.Pre,{children:`/*              // all paths: default safe base
  Cache-Control: public, max-age=0, must-revalidate

/index.html
  Cache-Control: no-cache

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable`}),e.jsxs(s.H3,{children:["Vercel — ",e.jsx("code",{children:"vercel.json"})]}),e.jsx(s.Pre,{children:`{
  "headers": [
    {
      "source": "/index.html",
      "headers": [{ "key": "Cache-Control", "value": "no-cache" }]
    },
    {
      "source": "/assets/(.*)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    },
    {
      "source": "/(.*)\\.(js|css)",
      "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }]
    }
  ]
}`}),e.jsxs(s.H3,{children:["Cloudflare Pages — ",e.jsx("code",{children:"_headers"})]}),e.jsx(s.Pre,{children:`/*              
  Cache-Control: public, max-age=0, must-revalidate

/index.html
  Cache-Control: no-cache

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable`}),e.jsx(s.H3,{children:"GitHub Pages"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["GH Pages sets conservative caching for HTML by default (good). For long-lived assets, serve them under ",e.jsx(s.InlineCode,{children:"/assets/"})," with hashed filenames (Vite default)."]}),e.jsx("li",{children:"You don’t control headers directly, but hashed filenames still give you safe “forever cache” because the URL changes on every build."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Advanced options"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"stale-while-revalidate"}),": serve cached content instantly and refresh in background. Example: ",e.jsx(s.InlineCode,{children:"Cache-Control: public, max-age=600, stale-while-revalidate=86400"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"s-maxage"})," for CDNs: ",e.jsx(s.InlineCode,{children:"Cache-Control: public, max-age=0, s-maxage=31536000"})," ","(browser revalidates, CDN keeps it long)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker vs HTTP cache:"})," A SW gives offline support and custom strategies (Cache First, Network First). It’s additional to HTTP caching, not a replacement."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," cache ",e.jsx("i",{children:"fingerprinted"})," assets for a year with ",e.jsx("i",{children:"immutable"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx("i",{children:"no-cache"})," for ",e.jsx(s.InlineCode,{children:"index.html"})," so deploys roll out instantly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep images/fonts hashed if you want long caching without busting manually."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," set long caching on ",e.jsx("i",{children:"non-fingerprinted"})," files (users may never see updates)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," assume ",e.jsx("i",{children:"no-cache"})," means “don’t store” — it means “revalidate”. Use ",e.jsx("i",{children:"no-store"})," to disable storing."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Fingerprinting:"})," Putting a content hash in the filename so changed content gets a new URL."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Revalidate:"})," Ask the server/CDN if the cached file is still fresh (using ETag/Last-Modified)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shared cache:"})," A cache used by many users (e.g., CDN). Controlled via ",e.jsx("i",{children:"public"}),"/",e.jsx("i",{children:"s-maxage"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Private cache:"})," A user’s browser cache. Controlled via ",e.jsx("i",{children:"private"}),"/",e.jsx("i",{children:"max-age"}),"."]})]})]}),e.jsxs(s.Callout,{children:["Summary: cache the HTML shell briefly so users get the new build, and cache hashed assets for a year with ",e.jsx("i",{children:"immutable"}),". That’s the safe, fast default for React + Vite on any host."]})]});export{l as default};
