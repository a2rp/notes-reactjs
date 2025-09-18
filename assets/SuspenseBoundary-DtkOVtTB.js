import{j as e}from"./index-BExKNf87.js";import{S as s}from"./styled-DjDrwfi1.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Suspense Boundary"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"Suspense boundary"})," is a part of your UI wrapped in"," ",e.jsx(s.InlineCode,{children:"<Suspense fallback=…>"}),'. If any child inside it is "',e.jsx("i",{children:"waiting"}),`" (e.g., a lazily-loaded component's code chunk hasn't arrived yet), React will temporarily show the `,e.jsx("b",{children:"fallback UI"})," instead of rendering that part. Once the child is ready, React swaps in the real UI."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary (clear definitions)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Code splitting:"})," breaking your bundle into smaller ",e.jsx("i",{children:"chunks"})," that load on demand, e.g., only when a route/page is visited."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lazy component:"})," a component loaded via"," ",e.jsx(s.InlineCode,{children:'React.lazy(() => import("./X"))'}),". It suspends while the chunk is downloading."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense boundary:"})," a wrapper (",e.jsx(s.InlineCode,{children:"<Suspense>"}),") that shows a ",e.jsx("b",{children:"fallback"})," whenever a child is not ready."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback UI:"})," temporary placeholder (spinner, skeleton, message) shown while loading."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspending:"}),` the state when a child signals "I'm not ready yet"—with code splitting, this happens while the chunk is fetching.`]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preloading:"})," requesting a chunk ",e.jsx("i",{children:"before"})," the user actually needs it (e.g., on hover or idle) to reduce or avoid fallbacks."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Basic Pattern: lazy + Suspense"}),e.jsx(s.Pre,{children:`// Lazy-load a component (code-splitting)
const UserPanel = React.lazy(() => import("./UserPanel"));

export default function Page() {
  return (
    <Suspense fallback={<div aria-busy="true">Loading user panel…</div>}>
      <UserPanel />
    </Suspense>
  );
}`}),e.jsxs(s.Small,{children:["If ",e.jsx(s.InlineCode,{children:"UserPanel"})," is not yet downloaded, the boundary shows the fallback. When its code arrives, React renders the real panel."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Where Should the Boundary Live?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Wrap the ",e.jsx("i",{children:"smallest meaningful"}),' area that might load separately (card list, side panel, tab content), not the entire page—this avoids "spinner everything."']}),e.jsxs("li",{children:["Use a ",e.jsx("b",{children:"page-level"})," boundary around routes for first-visit loads, plus",e.jsx("b",{children:"smaller nested boundaries"})," for slower fragments inside the page."]})]}),e.jsx(s.Pre,{children:`// Page-level boundary + a nested boundary
const ProductGallery = React.lazy(() => import("./ProductGallery"));
const Reviews = React.lazy(() => import("./Reviews"));

export function ProductPage() {
  return (
    <Suspense fallback={<div>Loading page…</div>}>
      <main>
        <h1>Product</h1>

        {/* Nested: show skeleton just for the gallery */}
        <Suspense fallback={<div className="skeleton">Loading images…</div>}>
          <ProductGallery />
        </Suspense>

        {/* Nested: reviews may be slower */}
        <Suspense fallback={<div>Loading reviews…</div>}>
          <Reviews />
        </Suspense>
      </main>
    </Suspense>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Route-Level Code Splitting"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Wrap your ",e.jsx(s.InlineCode,{children:"<Routes />"})," (or each route element) in a Suspense boundary so new routes can lazy-load smoothly."]}),e.jsxs("li",{children:["Keep a small, consistent ",e.jsx("b",{children:"route fallback"})," (e.g., top skeleton/loader) for better UX."]})]}),e.jsx(s.Pre,{children:`// routes.jsx
import { Routes, Route } from "react-router-dom";
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Reports = React.lazy(() => import("./pages/Reports"));

export function AppRoutes() {
  return (
    <Suspense fallback={<div className="route-fallback">Loading…</div>}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Suspense>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Preloading (reduce or avoid spinners)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Trigger ",e.jsx(s.InlineCode,{children:"import()"})," early (hover, onVisible, idle) so chunks are cached by the time the user navigates."]}),e.jsxs("li",{children:["Keep the logic simple—call the same dynamic import used by"," ",e.jsx(s.InlineCode,{children:"React.lazy"}),"."]})]}),e.jsx(s.Pre,{children:`// user-panel.js (module file)
export default function UserPanel(){ /* ... */ }

// preload helper (same module)
export function preloadUserPanel() {
  return import("./user-panel");
}

// usage (e.g., in a menu or Link wrapper)
function MenuLink() {
  return (
    <a
      href="/user"
      onMouseEnter={() => { preloadUserPanel(); }}
    >
      User
    </a>
  );
}

// lazy usage elsewhere
const UserPanel = React.lazy(() => import("./user-panel"));`}),e.jsxs(s.Small,{children:["You can also preload on intersection (when a link becomes visible) or on"," ",e.jsx(s.InlineCode,{children:"requestIdleCallback"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Designing Good Fallbacks"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Skeletons over spinners"}),"—hint at layout; reduce perceived wait."]}),e.jsxs("li",{children:["Keep fallbacks ",e.jsx("b",{children:"stable in size"})," to avoid layout shift."]}),e.jsx("li",{children:"Group related UI under one boundary so a single fallback covers all of it coherently."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Suspense vs Error Boundaries"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Suspense"})," handles ",e.jsx("i",{children:"waiting"})," states (e.g., chunk loading)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ErrorBoundary"})," handles ",e.jsx("i",{children:"failures"})," (runtime errors). Use both."]})]}),e.jsx(s.Pre,{children:`// Minimal error boundary (concept)
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) { console.error(error, info); }
  render() { return this.state.hasError ? <div>Something went wrong.</div> : this.props.children; }
}

// Combine with Suspense
<ErrorBoundary>
  <Suspense fallback={<div>Loading…</div>}>
    <LazyWidget />
  </Suspense>
</ErrorBoundary>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," place boundaries near slow code (routes, big widgets, image galleries)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer skeleton fallbacks sized like final content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," preload on hover/idle for popular paths."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," wrap your entire app in a single boundary—one spinner for everything hurts UX."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block critical UI (e.g., nav/header) inside a loading boundary."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"FAQ"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Does Suspense work for data?"})," In client-only React, Suspense is officially for code-splitting. Frameworks (Next.js/React Server Components) extend it to data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Will fallback flicker?"})," Preload and choose skeletons. You can also keep the fallback visible for a minimum duration with small CSS tricks if needed."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Wrap uncertain, slow-to-load UI in a ",e.jsx("b",{children:"Suspense boundary"})," with a well-designed fallback. Use ",e.jsx("b",{children:"lazy"})," for code splitting, ",e.jsx("b",{children:"nest boundaries"})," to isolate slow areas, and ",e.jsx("b",{children:"preload"})," likely chunks to make loading feel instant."]})]});export{i as default};
