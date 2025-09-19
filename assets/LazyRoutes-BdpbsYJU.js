import{j as e}from"./index-BUVRD3Bm.js";import{S as r}from"./styled-DJM-L2iW.js";const i=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Lazy Routes"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Lazy routing"})," loads route components ",e.jsx("i",{children:"on demand"})," using dynamic imports so your initial bundle stays small. It relies on ",e.jsx(r.InlineCode,{children:"React.lazy()"})," for",e.jsx("b",{children:" code-splitting"})," and ",e.jsx(r.InlineCode,{children:"<Suspense>"})," to show a temporary ",e.jsx("b",{children:"fallback"})," UI while the chunk downloads."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary (read first)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Code-splitting:"})," breaking your JavaScript into smaller files (chunks) that load when needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dynamic import:"})," ",e.jsx(r.InlineCode,{children:'import("...")'})," returns a Promise for that module; bundlers emit a separate chunk."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React.lazy:"})," wraps a dynamic import so React can render the module’s ",e.jsx("b",{children:"default export"})," as a component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense:"})," a React component that shows a ",e.jsx("b",{children:"fallback"})," while a lazy child is loading."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chunk:"})," the output file produced by the bundler (Vite/Rollup) for a lazy module."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preload / Prefetch:"})," proactively fetching a chunk earlier (e.g., on hover or when a link is visible)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Why lazy routes?"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Faster first paint:"})," ship only what the initial screen needs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scales with content:"})," as topics grow, loading stays snappy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Natural boundaries:"})," routes are a perfect place to split code."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Basic Pattern (React.lazy + Suspense)"}),e.jsx(r.Pre,{children:`// routes file (excerpt)
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// 1) Lazy import the page component (must have a default export)
const UserProfilePage = lazy(() => import("./pages/users/UserProfilePage"));

export default function AppRoutes() {
  return (
    // 2) A Suspense boundary shows a fallback while any child is loading
    <Suspense fallback={<div className="spinner" aria-label="Loading">Loading…</div>}>
      <Routes>
        <Route path="/users/:id" element={<UserProfilePage />} />
      </Routes>
    </Suspense>
  );
}`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Tip:"})," You likely already wrap your entire ",e.jsx(r.InlineCode,{children:"<Routes>"})," in one Suspense. You can also add ",e.jsx("i",{children:"nested"})," Suspense boundaries for more granular fallbacks."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Route-level Suspense (granular fallback)"}),e.jsx(r.Pre,{children:`// If the app has a global Suspense but you want a specific fallback for this route:
const ReportsPage = lazy(() => import("./pages/reports/ReportsPage"));

<Route
  path="/reports"
  element={
    <Suspense fallback={<div>Loading reports…</div>}>
      <ReportsPage />
    </Suspense>
  }
/>`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Split by Section (group related routes)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Place section pages under a folder (e.g., ",e.jsx("i",{children:"routing/"}),", ",e.jsx("i",{children:"hooksAdv/"}),")."]}),e.jsx("li",{children:"Lazy-load each page or a section wrapper that nests child routes."})]}),e.jsx(r.Pre,{children:`// Example: a section wrapper that includes nested routes (each can be lazy)
const RoutingSection = lazy(() => import("./pages/topics/routing/RoutingSection"));

<Route path="/routing/*" element={<RoutingSection />} />`}),e.jsxs(r.Small,{children:["The wrapper renders an ",e.jsx("i",{children:"Outlet"})," and its own sidebar/header. Child topic pages can be lazy too."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Preloading (hover or when link is visible)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," fetching the chunk right before navigation removes the loading spinner."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," call the same dynamic import early. React will reuse the loaded module when navigating."]})]}),e.jsx(r.Pre,{children:`// Preload on hover
const preloadUser = () => import("./pages/users/UserProfilePage"); // same path as React.lazy

<Link to="/users/42" onMouseEnter={preloadUser} onFocus={preloadUser}>
  View Profile
</Link>

// Preload when link scrolls into view
function PrefetchOnVisible({ to, importFn, children }) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) {
        importFn(); // fire once
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [importFn]);
  return <a ref={ref} href={to}>{children}</a>;
}`}),e.jsxs(r.Small,{children:["In Vite, dynamic imports are cached; calling ",e.jsx(r.InlineCode,{children:"import()"})," early “warms” the chunk."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Error Handling for Lazy Routes"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Wrap routes with an ",e.jsx("b",{children:"Error Boundary"})," to catch load/render errors."]}),e.jsx("li",{children:"Show a helpful retry UI when a chunk fails (offline, cache issues)."})]}),e.jsx(r.Pre,{children:`// Minimal error boundary
class RouteErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) return <div>Something went wrong. <button onClick={() => location.reload()}>Retry</button></div>;
    return this.props.children;
  }
}

// Usage:
// <RouteErrorBoundary>
//   <Suspense fallback={<Spinner />}>
//     <Routes>…</Routes>
//   </Suspense>
// </RouteErrorBoundary>`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don’t"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," lazy-load routes and other heavy screens (charts, editors, markdown renderers)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep a global Suspense + occasional route-level Suspense for tailored fallbacks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," preload chunks on hover/visible links for smoother UX."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," lazy-load tiny components that are reused everywhere (hurts perf)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget that ",e.jsx(r.InlineCode,{children:"React.lazy"})," requires a ",e.jsx("b",{children:"default export"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate the DOM to “insert” chunks—navigation should trigger the render."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"FAQ & Notes"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Named chunks?"})," In Vite, chunk names are derived from file paths. Prefer clear file/folder names."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSR?"})," For pure client apps (like this project), React.lazy works out of the box. SSR requires different handling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Where to put Suspense?"})," Put one near ",e.jsx(r.InlineCode,{children:"<Routes>"}),"; add nested ones where UX needs different fallbacks."]})]})]}),e.jsxs(r.Callout,{children:["Summary: use ",e.jsx("i",{children:"React.lazy"})," + ",e.jsx("i",{children:"Suspense"})," to code-split by route, add targeted fallbacks where it matters, and preload chunks on intent (hover/visible) for instant page transitions."]})]});export{i as default};
