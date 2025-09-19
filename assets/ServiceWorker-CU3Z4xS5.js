import{j as e}from"./index-BRArnZ3i.js";import{S as s}from"./styled-D2V7rSeJ.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Service Worker (PWA)"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"Service Worker"})," is a background script that sits between your app and the network. It can intercept requests, cache files, work offline, and enable advanced features like background sync and push notifications. It runs on a ",e.jsx("b",{children:"separate thread"}),", has no DOM access, and requires ",e.jsx("b",{children:"HTTPS"})," (or ",e.jsx("b",{children:"localhost"}),")."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Terms & Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker (SW):"})," A programmable network proxy running in the browser that can intercept fetches and serve cached responses."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," The URL path range the SW controls. It's set by the SW file's location and the ",e.jsx(s.InlineCode,{children:"scope"})," option during registration."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lifecycle:"})," Distinct phases: ",e.jsx("i",{children:"install"})," → ",e.jsx("i",{children:"activate"})," → ",e.jsx("i",{children:"idle"}),". Updates download a new SW that becomes ",e.jsx("i",{children:"waiting"})," until the old one releases."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Install Event:"})," First run; typically pre-cache your “app shell”."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Activate Event:"})," Cleanup old caches, take control of pages (optionally via ",e.jsx(s.InlineCode,{children:"clients.claim()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fetch Event:"})," Intercept network requests and apply a caching strategy to respond."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache Storage:"})," The persistent store (separate from HTTP cache) exposed via the ",e.jsx(s.InlineCode,{children:"caches"})," API."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Precache vs Runtime cache:"})," Precache known assets at install; runtime cache things encountered later (API responses, images, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"HTTPS only:"})," SWs are restricted to secure contexts to protect users."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Project Setup (Vite)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Place your SW script at ",e.jsx(s.InlineCode,{children:"public/sw.js"}),". Vite copies it to the build output unchanged."]}),e.jsxs("li",{children:["When deployed under a subpath (e.g., GitHub Pages: ",e.jsx(s.InlineCode,{children:"/notes-reactjs/"}),"), register the SW using a URL relative to ",e.jsx(s.InlineCode,{children:"import.meta.env.BASE_URL"})," so scope matches your app."]})]}),e.jsx(s.Pre,{children:`// src/pwa/registerSW.js (example helper)
export async function registerSW() {
  if (!("serviceWorker" in navigator)) return;

  // Ensure correct URL when app is served from a base path (e.g., /notes-reactjs/)
  const swUrl = new URL("sw.js", import.meta.env.BASE_URL).toString();

  try {
    const reg = await navigator.serviceWorker.register(swUrl /*, { scope: import.meta.env.BASE_URL }*/);

    // Optional: listen for updates
    reg.addEventListener("updatefound", () => {
      const newWorker = reg.installing;
      newWorker?.addEventListener("statechange", () => {
        // states: installing -> installed (waiting) -> activating -> activated -> redundant
        // you can surface a toast when newWorker.state === "installed"
      });
    });

    // Optional: react when a waiting SW takes control (page reload, etc.)
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // A new SW has taken control. You might prompt "App updated — reload?"
    });
  } catch (err) {
    console.error("SW registration failed:", err);
  }
}`}),e.jsxs(s.Small,{children:["Tip: import and call ",e.jsx(s.InlineCode,{children:"registerSW()"})," from your ",e.jsx(s.InlineCode,{children:"main.jsx"})," or a boot file after the app mounts."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Minimal ",e.jsx("code",{children:"sw.js"}),": Install → Activate → Fetch"]}),e.jsx(s.Pre,{children:`// public/sw.js
const CACHE_NAME = "app-cache-v1";
const ASSETS = [
  // "Precache" your app shell (paths relative to the SW scope)
  // e.g., "/", "/index.html", "/assets/index-xxxxx.js", "/assets/index-xxxxx.css"
];

// Install: open cache and add pre-known assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  // Activate new SW immediately (optional — see update strategy below)
  self.skipWaiting();
});

// Activate: delete old caches and take control
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((k) => (k !== CACHE_NAME ? caches.delete(k) : null)));
      await self.clients.claim();
    })()
  );
});

// Fetch: basic "cache-first, then network" for same-origin GET
self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        return res;
      }).catch(() => {
        // Optional: offline fallback for navigations (see Offline Fallback topic)
      });
    })
  );
});`}),e.jsx(s.Small,{children:"This is a starter for learning. For production, prefer a well-defined strategy per route/asset and consider Workbox."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Updates: Waiting vs Immediate"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Default behavior:"})," a new SW becomes ",e.jsx("i",{children:"waiting"})," until all old pages close; then it activates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Immediate activation:"})," call ",e.jsx(s.InlineCode,{children:"self.skipWaiting()"})," (in SW) and ",e.jsx(s.InlineCode,{children:"clients.claim()"})," to take over. Safer with a user prompt to reload."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Recommended UX:"})," show “New version available — Update” button that posts a message to the SW to ",e.jsx("i",{children:"skip waiting"}),", then reload the page."]})]}),e.jsx(s.Pre,{children:`// page code (e.g., registerSW helper): trigger refresh when an update is ready
navigator.serviceWorker.getRegistration().then((reg) => {
  if (!reg?.waiting) return;
  // Tell the waiting SW to activate NOW
  reg.waiting.postMessage({ type: "SKIP_WAITING" });
});

// sw.js: listen for that message
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Caching Strategies (Preview)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Cache-First:"})," Serve from cache if available; else fetch & cache. Great for app shell / static assets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Network-First:"})," Try network; fall back to cache when offline. Good for HTML pages / dynamic content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale-While-Revalidate:"})," Serve cache instantly, update it in the background. Great UX for CSS/JSON that can refresh quietly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache-Only / Network-Only:"})," Special cases, usually for analytics or sensitive endpoints."]})]}),e.jsxs(s.Small,{children:["Detailed code per strategy will be covered in ",e.jsx("b",{children:"Caching Strategies"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Messaging, Background Sync, Push (Overview)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"postMessage API:"})," Two-way communication between page and SW for update prompts or custom commands."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Background Sync:"})," Queue requests while offline and retry later. Useful for “send later”."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Push Notifications:"})," Receive server-sent pushes (requires user permission + a push service + VAPID keys). Covered in the Push topic."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Debugging & Safety"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"DevTools:"})," Application → Service Workers (inspect, unregister, “Update on reload”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unregister:"})," If you break caching during development, unregister and clear storage."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Version caches:"})," Change ",e.jsx(s.InlineCode,{children:"CACHE_NAME"})," on releases to avoid stale assets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't cache POST/credentials data"})," unless you fully understand the risks."]})]}),e.jsx(s.Pre,{children:`// Unregister (run once in console or a debug button)
navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach(r => r.unregister()));`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep your SW small and deterministic; prefer clear strategies per route/asset type."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," serve SW over HTTPS and verify scope matches your deployed base path."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," provide an offline UX and a friendly update prompt."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," cache sensitive API responses or authenticated endpoints by default."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate the DOM from the SW (it can't). Communicate via messages."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"App Shell:"})," The minimal HTML/CSS/JS needed to render your UI frame offline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Clients:"})," The open tabs/windows your SW controls (",e.jsx(s.InlineCode,{children:"self.clients"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Navigation Request:"})," A request where ",e.jsx(s.InlineCode,{children:"mode"})," is ",e.jsx("i",{children:"navigate"})," (page loads / SPA route changes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Workbox:"})," A library that generates precaches and applies strategies declaratively."]})]})]}),e.jsx(s.Callout,{children:"Summary: A Service Worker gives your app offline power and control over network requests. Start simple—precache your shell, pick clear strategies for assets/APIs, and design a friendly update flow."})]});export{n as default};
