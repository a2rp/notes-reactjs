import{j as e}from"./index-dGwxAdn8.js";import{S as s}from"./styled-e1So3LLi.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Route Splitting"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Route splitting"})," loads a page's code ",e.jsx("i",{children:"only when its route is visited"}),". It uses",e.jsx(s.InlineCode,{children:"React.lazy()"})," + ",e.jsx(s.InlineCode,{children:"<Suspense>"}),"to cut your bundle into smaller ",e.jsx("b",{children:"chunks"}),", speeding up the initial load."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Bundle:"})," the combined JavaScript your users download. Big bundles = slower first load."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chunk:"})," a piece of the bundle created by your build tool for lazy loading."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Code splitting:"})," splitting the bundle into chunks, loading them on demand."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dynamic import:"})," ",e.jsx(s.InlineCode,{children:'import("...")'})," expression that returns a Promise for a module chunk."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React.lazy:"})," wraps a dynamic import so the result can be used as a component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense boundary:"})," a UI boundary that shows a ",e.jsx("i",{children:"fallback"})," while some child is loading."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Route splitting:"})," applying code splitting at ",e.jsx("i",{children:"route"})," level, so each page ships on demand."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why Route Split?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Faster first paint:"})," users download only what they need for the first screen."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lower memory/CPU:"})," less JS to parse/execute upfront."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scales with app size:"})," new routes add new chunks without bloating the entry bundle."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Minimal Example (React Router)"}),e.jsx(s.Pre,{children:`// routes/AppRoutes.jsx
import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";

// Each route is a lazy chunk:
const Home = lazy(() => import("../pages/Home"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Settings = lazy(() => import("../pages/Settings"));

export default function AppRoutes() {
  return (
    <Suspense fallback={<div className="spinner" aria-live="polite">Loading…</div>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/settings/*" element={<Settings />} />
        <Route path="*" element={<div>Not found</div>} />
      </Routes>
    </Suspense>
  );
}`}),e.jsxs(s.Small,{children:["Each ",e.jsx(s.InlineCode,{children:"lazy(() => import(...))"})," creates a separate chunk. The Suspense ",e.jsx("i",{children:"boundary"})," shows a fallback while the chunk downloads."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Layout Routes & Boundary Placement"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Place a ",e.jsx("b",{children:"Suspense boundary"})," where you can show a meaningful skeleton (e.g., around the outlet area)."]}),e.jsxs("li",{children:["Keep ",e.jsx("i",{children:"layout"})," code (header/sidebar) outside the boundary so it appears immediately."]})]}),e.jsx(s.Pre,{children:`// App.jsx (layout outside, page content inside Suspense)
import React, { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import Shell from "./Shell";

export default function App() {
  return (
    <Shell>
      <Suspense fallback={<PageSkeleton />}>
        <Outlet /> {/* nested lazy routes render here */}
      </Suspense>
    </Shell>
  );
}

// routes
// <Route element={<App />}>
//   <Route index element={<Home />} />
//   <Route path="reports" element={<Reports />} />
// </Route>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Preloading (Warm Up the Next Route)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Eager prefetch:"})," preload critical next pages after first render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"On hover/focus:"})," preload when the user hints they'll click a link."]}),e.jsxs("li",{children:[e.jsx("b",{children:"On viewport:"})," preload when a link scrolls into view (IntersectionObserver)."]})]}),e.jsx(s.Pre,{children:`// 5a) Eager prefetch a likely next page
const preloadDashboard = () => import("../pages/Dashboard");
React.useEffect(() => { preloadDashboard(); }, []);

// 5b) Preload on hover/focus
function DashLink() {
  const onWarm = () => { preloadDashboard(); };
  return (
    <a href="/dashboard" onMouseEnter={onWarm} onFocus={onWarm}>
      Go to Dashboard
    </a>
  );
}`}),e.jsx(s.Small,{children:"Preloading triggers the dynamic import early; when the user navigates, the chunk is already cached."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Data & Code: Avoid Waterfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Waterfall:"})," sequential waits (load code → then fetch data). Prefer parallel: start data fetch ASAP."]}),e.jsx("li",{children:"Kick off fetches in a parent that's not gated by the child's code load, or use router loaders (if you're using data routers)."})]}),e.jsx(s.Pre,{children:`// Parallel start: kick off data fetch outside the lazy page
function ReportsRoute() {
  const promise = React.useMemo(() => fetch("/api/reports").then(r => r.json()), []);
  const Reports = React.useMemo(() => lazy(() => import("../pages/Reports")), []);
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Reports initialPromise={promise} />
    </Suspense>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Granularity: How Much to Split?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Split by route"})," by default. It's a natural, user-visible boundary."]}),e.jsxs("li",{children:["Split big intra-route widgets (charts, editors) ",e.jsx("i",{children:"within"})," a page if they're below the fold or rarely used."]}),e.jsx("li",{children:"Avoid over-splitting tiny components; more chunks = more requests and worse cache behavior."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Error Handling for Lazy Routes"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Wrap boundaries with an ",e.jsx("b",{children:"Error Boundary"})," to catch network/parse errors while loading chunks."]}),e.jsx("li",{children:"Offer a retry action (re-import the chunk) and offline messaging."})]}),e.jsx(s.Pre,{children:`// Pseudo: Suspense + ErrorBoundary
<ErrorBoundary fallback={<ReloadMessage />}>
  <Suspense fallback={<Skeleton />}>
    <Routes>/* lazy routes here */</Routes>
  </Suspense>
</ErrorBoundary>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep layouts outside Suspense, content inside."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," preload “next-click” routes on hover/focus for snappier UX."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," co-locate heavy widgets and lazy them inside a page if needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block navigation on non-essential requests; show skeletons."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," split everything—measure and split where it helps."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Entry bundle:"})," the first script your app downloads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chunk name:"})," the build-generated filename for a lazy module."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prefetch vs Preload:"})," prefetch = low-priority “likely soon”; preload = high-priority “needed now”."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Skeleton:"})," lightweight placeholder UI shown while content loads."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Route splitting uses ",e.jsx("i",{children:"lazy + Suspense"})," to ship only the code a page needs when it's visited. Place boundaries around content areas, preload predicted routes, parallelize data fetching, and split only where it improves user-perceived speed."]})]});export{n as default};
