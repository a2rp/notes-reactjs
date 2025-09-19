import{j as e}from"./index-BUVRD3Bm.js";import{S as n}from"./styled-BULU_ntT.js";const a=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"PWA — Offline Fallback"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Offline fallback"})," means your app returns a friendly page when the network is unavailable, instead of showing a generic browser error. PWAs implement this using a ",e.jsx("b",{children:"Service Worker"})," to intercept requests and serve a cached ",e.jsx("b",{children:"fallback document"})," (usually an HTML page) or a",e.jsx("b",{children:"placeholder asset"})," (image, font) when the network can't be reached."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Progressive Web App (PWA):"})," A web app that uses modern capabilities (Service Worker, HTTPS, App Manifest) to deliver app-like reliability, installability, and performance."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker (SW):"})," A background script that sits between your app and the network. It can intercept ",e.jsx(n.InlineCode,{children:"fetch"})," requests and decide what to return (cache / network / fallback). Runs off the main thread and persists across page reloads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache Storage API:"})," An origin-scoped storage for HTTP responses (separate from the browser's HTTP cache). You control what to add/remove and what to serve when offline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Offline fallback (navigation):"})," For top-level navigations (URL bar, link clicks) when the real HTML can't be fetched, return a cached ",e.jsx("em",{children:"offline.html"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Offline fallback (assets):"})," For images/fonts/etc. return a lightweight placeholder if the original asset isn't cached and network fails."]}),e.jsxs("li",{children:[e.jsx("b",{children:"App Shell:"})," Minimal HTML/CSS/JS required to load the UI frame instantly. Often precached so the shell loads offline, then content hydrates when online."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"How Offline Fallback Works (Minimal Flow)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["During ",e.jsx("b",{children:"install"}),", the SW precaches an ",e.jsx(n.InlineCode,{children:"offline.html"})," page."]}),e.jsxs("li",{children:["During a ",e.jsx("b",{children:"fetch"})," for a ",e.jsx("i",{children:"navigation request"}),", the SW tries the network first."]}),e.jsxs("li",{children:["If network fails, the SW ",e.jsx("b",{children:"responds with the cached offline page"}),"."]})]}),e.jsx(n.Pre,{children:`// service-worker.js (conceptual example)
// Version your cache to manage updates
const CACHE_NAME = "app-cache-v1";
const OFFLINE_URL = "/offline.html";

// Install: open cache and add fallback document + minimal assets
self.addEventListener("install", (event) => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll([OFFLINE_URL]); // you can add CSS/fonts used by offline.html
  })());
  self.skipWaiting(); // activate immediately on first load (optional)
});

// Activate: cleanup old caches if you rotate versions
self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : undefined)));
  })());
  self.clients.claim();
});

// Fetch: provide an offline fallback for navigations
self.addEventListener("fetch", (event) => {
  const { request } = event;
  // A "navigation request" is when the browser is requesting a page (HTML)
  const isNavigation = request.mode === "navigate";

  if (isNavigation) {
    event.respondWith((async () => {
      try {
        // Try the network first for fresh content
        const networkResponse = await fetch(request);
        return networkResponse;
      } catch (err) {
        // If network fails, return the offline page from cache
        const cache = await caches.open(CACHE_NAME);
        const cached = await cache.match(OFFLINE_URL);
        return cached || new Response("Offline", { status: 503, statusText: "Offline" });
      }
    })());
  }
});`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Navigation request:"})," A top-level document request (not an image or XHR). In SW, detect via"," ",e.jsx(n.InlineCode,{children:'request.mode === "navigate"'}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Designing a Helpful Offline Page"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Keep it ",e.jsx("b",{children:"small"})," (fast to cache & serve). Inline minimal CSS. Offer a clear message like “You're offline — some features may be unavailable.”"]}),e.jsxs("li",{children:["Include ",e.jsx("b",{children:"basic navigation"})," back to the home route and to pages you know are cached."]}),e.jsxs("li",{children:["Optionally, show ",e.jsx("b",{children:"cached content"})," (from IndexedDB) if your app stores recent data."]}),e.jsxs("li",{children:["Offer a ",e.jsx("b",{children:"retry"})," button that attempts to reload when the network returns."]})]}),e.jsx(n.Pre,{children:`<!-- public/offline.html (keep dependencies minimal) -->
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Offline — YourApp</title>
    <style>
      body { font: 16px/1.5 system-ui, -apple-system, Segoe UI, Roboto, sans-serif; margin: 0; padding: 24px; }
      .card { max-width: 680px; margin: 0 auto; padding: 24px; border: 1px solid #ccc; border-radius: 12px; }
      h1 { margin-top: 0; }
      button { padding: 8px 14px; border-radius: 8px; border: 1px solid #bbb; cursor: pointer; }
    </style>
  </head>
  <body>
    <main class="card">
      <h1>You're offline</h1>
      <p>Some pages and features may be unavailable. Try again when you're back online.</p>
      <p><a href="/">Go to Home</a></p>
      <button onclick="location.reload()">Retry</button>
    </main>
  </body>
</html>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Asset Fallbacks (Images, Fonts, etc.)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["For non-navigation requests (e.g., images), you can return a ",e.jsx("b",{children:"placeholder"})," image when network + cache both miss."]}),e.jsxs("li",{children:["Use a separate ",e.jsx("b",{children:"runtime caching"})," strategy for assets: Cache-First (if you want speed) or Stale-While-Revalidate (if you want freshness)."]})]}),e.jsx(n.Pre,{children:`// In the same service-worker.js
const PLACEHOLDER_IMG_URL = "/img/placeholder.png";

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Example: provide a placeholder for images if fetch fails
  if (request.destination === "image") {
    event.respondWith((async () => {
      const cache = await caches.open(CACHE_NAME);
      // Try cache, then network, then placeholder
      const cached = await cache.match(request);
      if (cached) return cached;

      try {
        const resp = await fetch(request);
        // Optionally: put a copy into cache for future offline use
        cache.put(request, resp.clone());
        return resp;
      } catch {
        // Last resort: placeholder
        const ph = await cache.match(PLACEHOLDER_IMG_URL);
        return ph || new Response("", { status: 404 });
      }
    })());
  }
});`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Runtime caching:"})," Caching responses as the app runs (on demand) vs. ",e.jsx("b",{children:"precache"})," during SW install."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," precache ",e.jsx(n.InlineCode,{children:"offline.html"})," and any minimal CSS it needs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," return the offline page specifically for ",e.jsx("b",{children:"navigation requests"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the offline page independent of large JS bundles."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely solely on the browser's HTTP cache—use ",e.jsx("b",{children:"Cache Storage API"})," to control fallbacks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," cache POST responses or sensitive/auth-only content without a strategy."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Related Concepts (Quick Glossary)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"App Manifest:"})," A ",e.jsx(n.InlineCode,{children:"manifest.webmanifest"})," JSON file describing your app's name, icons, theme colors, and start URL. Required for “Install app.”"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Caching Strategy:"})," A policy for how to answer requests (Network-First, Cache-First, Stale-While-Revalidate, etc.). Offline fallback typically pairs with Network-First for navigations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Install / Activate events:"})," SW lifecycle events where you precache and clean old caches."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Navigation Preload:"})," A feature to start network fetch in parallel while the SW spins up, reducing latency (enable via ",e.jsx(n.InlineCode,{children:"self.registration.navigationPreload.enable()"}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Testing Your Offline Fallback"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Open DevTools → ",e.jsx("b",{children:"Application"})," → Service Workers: check “Offline”."]}),e.jsx("li",{children:"Hard refresh your app and navigate between routes; verify the offline page appears for new navigations."}),e.jsx("li",{children:"Switch DevTools Network to “Offline” and reload — ensure offline.html is served."}),e.jsx("li",{children:"Clear site data, reinstall SW, and repeat."})]})]}),e.jsxs(n.Callout,{children:[e.jsx("b",{children:"Summary:"})," Precache an ",e.jsx("i",{children:"offline.html"})," page during SW install. On navigation fetches, try network and fall back to the cached offline page. For assets, provide placeholders when both cache and network miss. Keep fallbacks tiny, helpful, and independent of your main bundle."]})]});export{a as default};
