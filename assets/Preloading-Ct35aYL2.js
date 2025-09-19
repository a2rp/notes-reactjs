import{j as e}from"./index-CAccbg1x.js";import{S as r}from"./styled-eC7StfsU.js";const n=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Preloading"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Preloading"})," means fetching code or data ",e.jsx("i",{children:"early"})," so that when the user navigates, there's little or no wait. It complements ",e.jsx("b",{children:"code splitting"})," (breaking the app into smaller chunks) and ",e.jsx("b",{children:"lazy loading"})," (loading those chunks on demand) by fetching the likely-needed chunk ",e.jsx("i",{children:"before"})," it's demanded."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Core Concepts & Definitions"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Code splitting:"})," splitting your bundle into smaller files (chunks) that can be loaded on demand (e.g., via ",e.jsx(r.InlineCode,{children:"import()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lazy loading:"})," loading a chunk only when needed (e.g., a route component). React exposes ",e.jsx(r.InlineCode,{children:"React.lazy"})," for this."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preloading:"})," fetching a resource ",e.jsx("i",{children:"ahead of use"})," so it's already in cache when needed (e.g., calling ",e.jsx(r.InlineCode,{children:"import()"})," on hover)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Resource hints:"})," HTML ",e.jsx(r.InlineCode,{children:"<link>"})," tags that give the browser a heads-up:",e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("b",{children:e.jsx(r.InlineCode,{children:'rel="preload"'})})," — high-priority fetch for the ",e.jsx("i",{children:"current"})," page; must be used soon. Requires"," ",e.jsx(r.InlineCode,{children:"as"})," (script, style, font, image)."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx(r.InlineCode,{children:'rel="prefetch"'})})," — low-priority fetch for a ",e.jsx("i",{children:"future"})," page (idle time)."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx(r.InlineCode,{children:'rel="modulepreload"'})})," — prefetch an ES module ",e.jsx("i",{children:"and"})," its static imports (great for ESM code chunks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx(r.InlineCode,{children:'rel="preconnect"'})})," — warm up TCP+TLS to a domain; faster first request later."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx(r.InlineCode,{children:'rel="dns-prefetch"'})})," — resolve a domain's DNS early (small win)."]})]})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense boundary:"})," a UI boundary that shows a fallback while lazy code/data is loading; if you preload, the fallback often never shows."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Preload Lazy Components"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," if you know a user is likely to click a link, call"," ",e.jsx(r.InlineCode,{children:"import()"})," early to warm the chunk."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," use a small helper to attach a ",e.jsx("em",{children:"preload"})," function to a lazy component."]})]}),e.jsx(r.Pre,{children:`// lazyWithPreload.ts/js — attach a .preload() helper
export function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory; // call this to start fetching the chunk early
  return Component;
}

// Usage: define a lazy route component with preload capability
const ProfilePage = lazyWithPreload(() => import("../routes/ProfilePage"));

// UI: preload on hover/focus/idle
function ProfileLink() {
  function onHover() { ProfilePage.preload(); }
  function onFocus() { ProfilePage.preload(); }
  React.useEffect(() => {
    // Warm during idle time too (optional)
    const id = window.requestIdleCallback?.(() => ProfilePage.preload());
    return () => id && window.cancelIdleCallback?.(id);
  }, []);
  return (
    <a href="/profile" onMouseEnter={onHover} onFocus={onFocus}>
      Go to Profile
    </a>
  );
}`}),e.jsx(r.Small,{children:"Result: when the user clicks, the chunk is already cached—navigation feels instant and the Suspense fallback rarely appears."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Route Preloading with Visibility"}),e.jsx(r.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"Idea:"})," preload the route component when its link ",e.jsx("i",{children:"scrolls into view"})," using"," ",e.jsx(r.InlineCode,{children:"IntersectionObserver"}),"."]})}),e.jsx(r.Pre,{children:`function PreloadOnVisible({ preload, children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          preload();
          io.disconnect();
          break;
        }
      }
    }, { rootMargin: "200px" }); // start early
    io.observe(el);
    return () => io.disconnect();
  }, [preload]);
  return <span ref={ref}>{children}</span>;
}

// Example: wrap a NavLink (or button) and pass the route .preload
<PreloadOnVisible preload={ProfilePage.preload}>
  <a href="/profile">Go to Profile</a>
</PreloadOnVisible>`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Preload Data (Warm the Cache)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," even if the code is hot, data can still delay the screen. Kick off the fetch early and cache the result."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," use your data layer (SWR/React Query/your own cache) to"," ",e.jsx("i",{children:"prefetch"})," on hover or visibility."]})]}),e.jsx(r.Pre,{children:`// Minimal DIY cache example
const dataCache = new Map();

async function fetchUser(userId) {
  const res = await fetch(\`/api/users/\${userId}\`);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

function preloadUser(userId) {
  if (!dataCache.has(userId)) {
    const promise = fetchUser(userId).then(data => {
      dataCache.set(userId, { status: "success", data });
    }).catch(error => {
      dataCache.set(userId, { status: "error", error });
    });
    dataCache.set(userId, { status: "loading", promise });
  }
}

function useUser(userId) {
  const cached = dataCache.get(userId);
  const [state, setState] = React.useState(cached ?? { status: "idle", data: null });
  React.useEffect(() => {
    if (!cached) {
      preloadUser(userId); // start now
    }
    const tick = setInterval(() => setState(dataCache.get(userId) ?? { status: "idle" }), 50);
    return () => clearInterval(tick);
  }, [userId]);
  return state; // {status,data,error}
}

// Trigger prefetch on hover
<button onMouseEnter={() => preloadUser("42")}>Open user 42</button>`}),e.jsxs(r.Small,{children:["In real apps, prefer libraries with built-in ",e.jsx("i",{children:"prefetch"}),"/",e.jsx("i",{children:"preload"})," APIs (SWR, React Query) for better caching and deduplication."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Preload Images & Fonts"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Images (JS):"})," create and cache ",e.jsx(r.InlineCode,{children:"Image()"})," ","objects so they're decoded before use."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Images (HTML hint):"})," ",e.jsx(r.InlineCode,{children:'<link rel="preload" as="image" href="/hero.webp">'})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fonts:"})," ",e.jsx(r.InlineCode,{children:'<link rel="preload" as="font" href="/inter.woff2" crossorigin>'})]})]}),e.jsx(r.Pre,{children:`// JS image preloader
const imgCache = new Set();
export function preloadImage(src) {
  if (imgCache.has(src)) return;
  const img = new Image();
  img.src = src;
  img.decode?.().catch(() => {}); // ignore decode errors
  imgCache.add(src);
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Resource Hints Cheat-Sheet"}),e.jsx(r.Pre,{children:`<!-- Current page, must use soon -->
<link rel="preload" as="script" href="/assets/chunk-profile.js" />

<!-- Future page, low priority -->
<link rel="prefetch" href="/assets/chunk-settings.js" />

<!-- ESM: fetch module + its static imports -->
<link rel="modulepreload" href="/assets/chunk-dashboard.js" />

<!-- Warm network to a third-party host -->
<link rel="preconnect" href="https://api.example.com" crossorigin />
<link rel="dns-prefetch" href="https://api.example.com">`}),e.jsx(r.Small,{children:"In many build tools, some hints are auto-injected for you. Only add manual hints when you have a measured need."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do / Don't / Pitfalls"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," preload the ",e.jsx("i",{children:"next most likely"})," route on hover, focus, visibility, or idle."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep Suspense boundaries around lazy routes so a fallback is available if needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," measure with real user timings; remove preloads that don't move the needle."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," preload everything—excess preloads can ",e.jsx("i",{children:"slow down"})," the current page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," use ",e.jsx(r.InlineCode,{children:'rel="preload"'})," for resources you won't use immediately."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pitfall:"})," wrong ",e.jsx(r.InlineCode,{children:"as"})," value breaks the hint (e.g., fonts need ",e.jsx(r.InlineCode,{children:"crossorigin"}),")."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Idle time:"})," moments when the browser has spare bandwidth/CPU to prefetch."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Decode (images):"})," step where the compressed image is converted to pixels in memory."]}),e.jsxs("li",{children:[e.jsx("b",{children:"IntersectionObserver:"})," browser API to detect when an element enters the viewport."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prefetch vs Preload:"})," prefetch = future, low priority; preload = now, high priority."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Modulepreload:"})," ESM-aware preload that also fetches static imports of the module."]})]})]}),e.jsx(r.Callout,{children:"Summary: Pair code splitting with smart preloading triggers (hover, focus, visibility, idle) and small, well-placed resource hints. Keep Suspense boundaries, measure results, and avoid over-fetching."})]});export{n as default};
