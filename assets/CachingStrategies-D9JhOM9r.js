import{j as e}from"./index-BUVRD3Bm.js";import{S as s}from"./styled-BULU_ntT.js";const t=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Caching Strategies (PWA)"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"caching strategy"})," is the rule your ",e.jsx("b",{children:"Service Worker"})," uses to decide whether to respond from the ",e.jsx("b",{children:"Cache Storage"}),", the ",e.jsx("b",{children:"network"}),", or a combination of both. Good strategies make your app ",e.jsx("i",{children:"fast"}),", ",e.jsx("i",{children:"reliable"}),", and ",e.jsx("i",{children:"work offline"}),"."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker (SW):"})," a background script that can intercept ",e.jsx(s.InlineCode,{children:"fetch"})," requests and serve custom responses, even when offline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache Storage:"})," browser storage for request/response pairs (different from HTTP cache). Managed with the ",e.jsx(s.InlineCode,{children:"caches"})," API."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Precache:"})," assets cached during SW ",e.jsx("i",{children:"install"})," (e.g., app shell, critical CSS/JS)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Runtime cache:"})," responses cached while the app runs (e.g., API GET, images)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Strategy:"})," an algorithm deciding cache vs network (e.g., ",e.jsx("i",{children:"Cache-First"}),", ",e.jsx("i",{children:"Network-First"}),", ",e.jsx("i",{children:"Stale-While-Revalidate"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TTL (time-to-live):"})," how long a cached response is considered fresh. (You implement TTL yourself or via libraries.)"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Opaque response:"})," a cross-origin response you can't inspect (status/headers hidden). Counts against quota and can't be validated."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Choosing a Strategy (Quick Guide)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"HTML navigations (app shell):"})," ",e.jsx("u",{children:"Network-First"})," with offline fallback (latest content when online; works offline)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Static versioned assets (JS/CSS/fonts):"})," ",e.jsx("u",{children:"Cache-First"})," (super fast; hashed filenames bust cache on deploy)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"API GET (news feed, products):"})," ",e.jsx("u",{children:"Stale-While-Revalidate"})," or ",e.jsx("u",{children:"Network-First"})," (balance freshness + speed)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Images & icons:"})," ",e.jsx("u",{children:"Cache-First"})," with expiration (limit size/entries)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutations (POST/PUT/DELETE):"})," ",e.jsx("u",{children:"Network-Only"})," (optionally queue via Background Sync)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Strategies (with examples)"}),e.jsx(s.H3,{children:"1) Cache-First"}),e.jsx(s.Small,{children:"Serve from cache if present; otherwise go to network and cache it for next time. Great for immutable assets."}),e.jsx(s.Pre,{children:`self.addEventListener("fetch", (event) => {
  event.respondWith((async () => {
    const cache = await caches.open("assets-v1");
    const cached = await cache.match(event.request);
    if (cached) return cached; // hit!

    const res = await fetch(event.request);
    // Optional: only cache successful, same-origin, GET responses
    if (res.ok && event.request.method === "GET" && new URL(event.request.url).origin === location.origin) {
      cache.put(event.request, res.clone());
    }
    return res;
  })());
});`}),e.jsx(s.H3,{children:"2) Network-First"}),e.jsx(s.Small,{children:"Try network first for freshness; fall back to cache when offline/slow. Ideal for HTML pages and dynamic JSON."}),e.jsx(s.Pre,{children:`self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith((async () => {
      const cache = await caches.open("pages-v1");
      try {
        const fresh = await fetch(event.request);
        cache.put(event.request, fresh.clone());
        return fresh;
      } catch {
        const cached = await cache.match(event.request);
        return cached || await cache.match("/offline.html");
      }
    })());
  }
});`}),e.jsx(s.H3,{children:"3) Stale-While-Revalidate (SWR)"}),e.jsx(s.Small,{children:"Serve cached response immediately (stale), then fetch in background and update cache for next time (revalidate). Great DX + perceived speed."}),e.jsx(s.Pre,{children:`self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  event.respondWith((async () => {
    const cache = await caches.open("api-swr-v1");
    const cached = await cache.match(event.request);
    const networkPromise = fetch(event.request)
      .then((res) => {
        if (res && res.ok) cache.put(event.request, res.clone());
        return res;
      })
      .catch(() => null);

    // Return cached immediately if exists; else wait for network.
    return cached || (await networkPromise) || new Response("Offline", { status: 503 });
  })());
});`}),e.jsx(s.H3,{children:"4) Network-Only / Cache-Only"}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Network-Only:"})," always use network (e.g., POST). ",e.jsx("b",{children:"Cache-Only:"})," debug/special flows when you want to guarantee offline."]}),e.jsx(s.Pre,{children:`// Network-Only: do nothing (default browser behavior)
// Cache-Only: useful for special routes
self.addEventListener("fetch", (event) => {
  if (new URL(event.request.url).pathname.startsWith("/static-snapshot/")) {
    event.respondWith(caches.match(event.request));
  }
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Precache & Versioning"}),e.jsxs(s.Small,{children:["Precache critical files during ",e.jsx("code",{children:"install"}),", and clean old caches during ",e.jsx("code",{children:"activate"}),". Use versioned cache names or hashed filenames."]}),e.jsx(s.Pre,{children:`const PRECACHE = "precache-v3";
const RUNTIME = "runtime-v3";
const PRECACHE_URLS = ["/", "/index.html", "/offline.html", "/assets/app.abc123.js", "/assets/styles.def456.css"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(PRECACHE).then((c) => c.addAll(PRECACHE_URLS)));
});

self.addEventListener("activate", (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.map((n) => (n !== PRECACHE && n !== RUNTIME) ? caches.delete(n) : null));
    self.clients.claim();
  })());
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Expiration, Size Limits & Quotas"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Browsers enforce storage quotas. Periodically delete old entries or limit cache entries (e.g., keep last 100 images)."}),e.jsxs("li",{children:["Implement simple expiration by storing metadata (timestamp) in ",e.jsx(s.InlineCode,{children:"IndexedDB"})," or using a library that supports expiration."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Opaque responses"})," (e.g., CDNs with ",e.jsx(s.InlineCode,{children:"no-cors"}),") can't be validated and still consume space—cache carefully."]})]}),e.jsx(s.Pre,{children:`// Example: basic "max entries" eviction for an image cache
async function enforceMaxEntries(cacheName, max = 100) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  if (keys.length <= max) return;
  // delete oldest first (keys are in insertion order in most browsers)
  await cache.delete(keys[0]);
}

// After put():
// await enforceMaxEntries("images-v1", 100);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Offline Fallbacks"}),e.jsx(s.Small,{children:"Provide a default response when the network is unavailable and nothing is cached."}),e.jsx(s.Pre,{children:`self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith((async () => {
      try { return await fetch(event.request); }
      catch {
        const cache = await caches.open("pages-v1");
        return (await cache.match("/offline.html")) || new Response("You are offline.", { status: 503 });
      }
    })());
  }
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Using a Library (Workbox)"}),e.jsx(s.Small,{children:"Workbox provides batteries-included strategies like CacheFirst, NetworkFirst, StaleWhileRevalidate, plus plugins for expiration and routing."}),e.jsx(s.Pre,{children:`// workbox-sw.js must be available; then in your service worker:
workbox.routing.registerRoute(
  ({request}) => request.destination === "script" || request.destination === "style",
  new workbox.strategies.CacheFirst({ cacheName: "assets-v1" })
);

workbox.routing.registerRoute(
  ({url}) => url.pathname.startsWith("/api/"),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: "api-swr-v1",
    plugins: [new workbox.expiration.ExpirationPlugin({ maxEntries: 200, maxAgeSeconds: 60 * 10 })] // 10 min
  })
);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," precache your app shell and use hashed filenames for assets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer SWR for user-facing lists (fast + self-healing freshness)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," add an offline fallback page and image placeholder."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," cache POST/PUT/DELETE responses blindly; queue them for retry instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," cache sensitive endpoints (auth tokens, personal data) without strong justification."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget to clean old cache versions in ",e.jsx(s.InlineCode,{children:"activate"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Debugging & Testing"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Use DevTools → ",e.jsx("i",{children:"Application"})," tab to inspect ",e.jsx("i",{children:"Service Workers"})," and ",e.jsx("i",{children:"Cache Storage"}),"."]}),e.jsxs("li",{children:["Simulate ",e.jsx("i",{children:"Offline"})," in DevTools → Network; verify fallbacks and cache hits."]}),e.jsx("li",{children:"Run Lighthouse (PWA audits) to validate offline readiness and manifest."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"App shell:"})," minimal HTML/CSS/JS needed to render the UI chrome."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Background Sync:"})," API to retry network operations later when connectivity returns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Navigation fallback:"})," default HTML served for navigations when offline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Revisioned assets:"})," files named with content hashes (e.g., ",e.jsx(s.InlineCode,{children:"app.abc123.js"}),") to bust caches on deploy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Strategy plugins:"})," helpers that add expiration, cacheable response filtering, etc. (often via Workbox)."]})]})]}),e.jsx(s.Callout,{children:"Summary: pick strategies per resource type—Cache-First for immutable assets, SWR or Network-First for data and pages, and always ship an offline fallback. Version caches, expire entries, and test with DevTools + Lighthouse."})]});export{t as default};
