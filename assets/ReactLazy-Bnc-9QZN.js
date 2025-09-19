import{j as e}from"./index-t22nWg0v.js";import{S as n}from"./styled-BdwML8aC.js";const i=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"React.lazy"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"React.lazy"})," lets you load a component’s code ",e.jsx("i",{children:"on demand"})," (a technique called",e.jsx("b",{children:" code splitting"}),"). Instead of shipping everything in one big bundle, you split it into smaller chunks and load each chunk only when needed. Wrap lazy components in"," ",e.jsx(n.InlineCode,{children:"<Suspense>"})," to show a fallback while the chunk loads."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Code splitting:"})," Breaking your JavaScript into multiple bundles (chunks) so the browser only downloads what’s needed for the current screen."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dynamic import:"})," The syntax ",e.jsx(n.InlineCode,{children:'import("path/to/module")'})," which returns a Promise and causes the bundler (Vite/Rollup) to create a separate chunk."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React.lazy(factory):"})," A function that takes a ",e.jsx("i",{children:"factory"})," returning a Promise for a module and yields a ",e.jsx("i",{children:"lazy component"}),". The module must have a ",e.jsx("b",{children:"default export"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<Suspense fallback>:"})," A boundary that shows a temporary UI (spinner/skeleton) while lazy children are loading. You can nest multiple boundaries for better UX."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chunk:"})," A generated JS file that contains the code for a lazily-loaded module."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Basic Usage"}),e.jsx(n.Pre,{children:`// 1) Create a lazy component
import React, { Suspense, lazy } from "react";

// The module must default-export a React component:
const BigChart = lazy(() => import("../components/BigChart"));

export default function Dashboard() {
  return (
    <section>
      <h2>Dashboard</h2>

      {/* Suspense shows fallback while the BigChart chunk loads */}
      <Suspense fallback={<div>Loading chart…</div>}>
        <BigChart />
      </Suspense>
    </section>
  );
}
`}),e.jsxs(n.Small,{children:["Result: The initial bundle is smaller. The ",e.jsx(n.InlineCode,{children:"BigChart"})," code is loaded only when this screen renders it."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Default Export Requirement (and Workaround)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"React.lazy"})," expects the module to have a ",e.jsx("b",{children:"default export"}),"."]}),e.jsxs("li",{children:["If your module has ",e.jsx("i",{children:"named exports"})," only, wrap the dynamic import and re-export default."]})]}),e.jsx(n.Pre,{children:`// Module only has: export function Chart() { ... }
// Wrap and map named -> default:
const BigChart = lazy(() =>
  import("../components/Chart").then(mod => ({ default: mod.Chart }))
);`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Route-level Code Splitting"}),e.jsx(n.Pre,{children:`// Router file
import { lazy, Suspense } from "react";
const Settings = lazy(() => import("./pages/Settings"));

<Route
  path="/settings"
  element={
    <Suspense fallback={<div>Loading settings…</div>}>
      <Settings />
    </Suspense>
  }
/>`}),e.jsxs(n.Small,{children:["Put the ",e.jsx(n.InlineCode,{children:"<Suspense>"})," near the split point. For a global spinner, place a parent boundary around your ",e.jsx(n.InlineCode,{children:"<Routes>"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Nesting Suspense Boundaries"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use a ",e.jsx("i",{children:"page-level"})," boundary and smaller ",e.jsx("i",{children:"widget-level"})," boundaries for finer control."]}),e.jsxs("li",{children:["Show ",e.jsx("b",{children:"skeletons"})," that match the final layout to reduce layout shift."]})]}),e.jsx(n.Pre,{children:`function Page() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Header />
      <main className="grid">
        <Suspense fallback={<CardSkeleton />}>
          <BigChart />
        </Suspense>
        <Suspense fallback={<CardSkeleton />}>
          <ActivityFeed />
        </Suspense>
      </main>
    </Suspense>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Preloading (Optional Optimization)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Preload on hover:"})," start fetching the chunk when the user shows intent."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preload above-the-fold:"})," eagerly fetch chunks you know you’ll need right away."]})]}),e.jsx(n.Pre,{children:`// Simple manual preload
const Settings = lazy(() => import("./pages/Settings"));
Settings.preload = () => import("./pages/Settings"); // vendor-agnostic hint

function NavLinkToSettings() {
  return (
    <a
      href="/settings"
      onMouseEnter={() => Settings.preload?.()} // kick off download early
    >
      Settings
    </a>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Error Handling"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["If a chunk fails (offline, network error), the thrown promise/error should be caught by an"," ",e.jsx("b",{children:"Error Boundary"}),". Combine ",e.jsx(n.InlineCode,{children:"<Suspense>"})," with an error boundary for resilient UX."]}),e.jsx("li",{children:"Offer a “Retry” button to re-attempt loading (re-rendering the lazy component retries the import)."})]}),e.jsx(n.Pre,{children:`// Minimal error boundary
class Boundary extends React.Component {
  state = { error: null };
  static getDerivedStateFromError(error) { return { error }; }
  render() {
    if (this.state.error) {
      return <button onClick={() => this.setState({ error: null })}>Retry</button>;
    }
    return this.props.children;
  }
}

// Usage
<Boundary>
  <Suspense fallback={<div>Loading…</div>}>
    <LazyWidget />
  </Suspense>
</Boundary>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," lazy-load large, infrequently used screens or widgets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," place ",e.jsx(n.InlineCode,{children:"<Suspense>"})," close to the split to show precise fallbacks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use skeletons instead of spinners where possible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," over-split tiny components; each chunk has overhead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget that ",e.jsx("b",{children:"default export"})," is required (or map named → default)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," block the whole page with one giant boundary if only one card is loading."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"SSR & Hosting Notes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"CSR apps (like Vite + GH Pages):"})," React.lazy works out of the box—chunks are fetched at runtime."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSR frameworks:"})," need special handling (streaming + SSR-aware bundling). This notes app is CSR, so you’re good."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Suspense:"})," A React feature that lets components “wait” for something (like code or data) and show a fallback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback:"})," Temporary UI (spinner/skeleton) displayed by a Suspense boundary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lazy component:"})," A component returned by React.lazy that loads its code on demand."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error boundary:"})," A component that catches errors in its children and renders a safe UI."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Use ",e.jsx("b",{children:"React.lazy"})," to split your app into on-demand chunks. Always wrap lazy components in ",e.jsx("b",{children:"<Suspense>"}),", use multiple boundaries for better UX, consider preloading for likely paths, and combine with error boundaries for resilience."]})]});export{i as default};
