import{j as e}from"./index-t22nWg0v.js";import{S as r}from"./styled-DdphZhc0.js";const i=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Fallback UI"}),e.jsxs(r.Lead,{children:["A ",e.jsx("b",{children:"Fallback UI"})," is what you show when the normal UI can't render: during ",e.jsx("i",{children:"loading"}),", after an ",e.jsx("i",{children:"error"}),", or when there's ",e.jsx("i",{children:"nothing to show"}),". In React, you'll mainly use ",e.jsx(r.InlineCode,{children:'<Suspense fallback="..." />'})," for loading states and",e.jsx("b",{children:" Error Boundaries"})," for render-time errors."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Why Fallback UI matters"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Resilience:"})," keeps the app usable even if a part fails."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Clarity:"})," tells users what's happening (loading / error / empty)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Recovery:"})," provides ",e.jsx("i",{children:"Retry"})," or ",e.jsx("i",{children:"Reset"})," so users can continue."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Types of fallback UI"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Suspense fallback"}),": temporary UI while children are “not ready” (code-splitting, data fetching with Suspense). Use ",e.jsx(r.InlineCode,{children:"fallback"})," prop on ",e.jsx(r.InlineCode,{children:"Suspense"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error fallback"}),": UI rendered by an ",e.jsx("b",{children:"Error Boundary"})," after a render-time error occurs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Empty state"}),": UI when the request succeeds but there's no data. Not an error."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Suspense fallback (loading)"}),e.jsx(r.Pre,{children:`import React, { Suspense, lazy } from "react";

const UserList = lazy(() => import("./UserList"));

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <UserList />
    </Suspense>
  );
}

function Spinner() {
  return <div aria-busy="true" aria-live="polite">Loading…</div>;
}`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx("i",{children:"Suspense"})," shows a ",e.jsx("i",{children:"fallback"})," until children finish loading. It's not for errors—pair it with an Error Boundary."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Error Boundary (render-time errors)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," An ",e.jsx("i",{children:"Error Boundary"})," is a component that catches ",e.jsx("u",{children:"render"})," errors in its subtree and shows a ",e.jsx("i",{children:"fallback"})," instead of crashing the whole app."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," Catches errors in ",e.jsx("i",{children:"render"}),", ",e.jsx("i",{children:"lifecycle"}),", and ",e.jsx("i",{children:"constructor"})," of children. It does ",e.jsx("u",{children:"not"})," catch errors in event handlers or async code—handle those in your logic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reset:"})," Change a ",e.jsx("i",{children:"key"})," on the boundary (or internal state) to try rendering again."]})]}),e.jsx(r.Pre,{children:`// Minimal class-based Error Boundary (built-in React pattern)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // log to monitoring here (Sentry/LogRocket/etc.)
    console.error("ErrorBoundary caught:", error, info);
  }
  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <ErrorFallback error={this.state.error} onReset={() => this.setState({ hasError: false, error: null })} />;
    }
    return this.props.children;
  }
}

function ErrorFallback({ error, onReset }) {
  return (
    <div role="alert" aria-live="assertive">
      <h3>Something went wrong.</h3>
      <pre style={{ whiteSpace: "pre-wrap" }}>{error?.message}</pre>
      <button onClick={onReset}>Try again</button>
    </div>
  );
}

// Usage:
// <ErrorBoundary fallback={<ErrorFallback />}>
//   <Profile id={userId} />
// </ErrorBoundary>`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Compose Suspense + Error Boundary"}),e.jsx(r.Pre,{children:`// Load code/data (suspense) AND handle render errors (boundary)
<ErrorBoundary fallback={<ErrorFallback />}>
  <React.Suspense fallback={<Spinner />}>
    <UserProfile id={id} />
  </React.Suspense>
</ErrorBoundary>`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Tip:"})," Place boundaries around logical islands (widgets, panels), not the whole app, so one faulty section doesn't blank out everything."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Data errors ≠ Render errors"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Data error:"})," The fetch failed or returned an error. Handle in your data layer and render a",e.jsx("i",{children:"data fallback"})," (message + retry)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render error:"})," Component threw while rendering. An ",e.jsx("i",{children:"Error Boundary"})," must provide the fallback."]})]}),e.jsx(r.Pre,{children:`// Data error fallback (inside your component)
function Products() {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  React.useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });
    fetch("/api/products")
      .then(r => r.ok ? r.json() : Promise.reject(new Error("Request failed")))
      .then(data => !cancelled && setState({ status: "success", data, error: null }))
      .catch(error => !cancelled && setState({ status: "error", data: null, error }));
    return () => { cancelled = true; };
  }, []);

  if (state.status === "loading") return <Spinner />;
  if (state.status === "error") {
    return (
      <div role="alert">
        <p>Couldn't load products.</p>
        <button onClick={() => /* trigger refetch */ window.location.reload()}>Retry</button>
      </div>
    );
  }
  if (!state.data?.length) return <EmptyState />; // empty state (not an error)
  return <List items={state.data} />;
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Reset & Retry patterns"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Retry:"})," Re-run the failing operation (refetch, re-mount). Provide a clear button or auto-retry with backoff."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reset:"})," Clear the boundary's error state so children can attempt to render. Common trick: change the",e.jsx(r.InlineCode,{children:"key"})," on the boundary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backoff:"})," Delay between retries (e.g., 1s → 2s → 4s) to avoid hammering the server."]})]}),e.jsx(r.Pre,{children:`// Reset by changing a key to force a re-mount
function Panel() {
  const [nonce, setNonce] = React.useState(0);
  return (
    <ErrorBoundary key={nonce} fallback={<ErrorFallback onReset={() => setNonce(n => n + 1)} />}>
      <ProblemChild />
    </ErrorBoundary>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"UX guidance: what good fallbacks look like"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Be specific:"})," “Couldn't load orders. Check your connection and retry.”"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Offer action:"})," Provide a ",e.jsx("i",{children:"Retry"})," or ",e.jsx("i",{children:"Reset"})," button when possible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Be accessible:"})," use ",e.jsx(r.InlineCode,{children:'role="status"'})," / ",e.jsx(r.InlineCode,{children:'role="alert"'})," and ",e.jsx(r.InlineCode,{children:"aria-live"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't over-polish errors:"})," simple, calm UI beats flashy modals for systemic failures."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keep loading tight:"})," prefer lightweight spinners or ",e.jsx("i",{children:"skeletons"}),"; avoid layout jumps."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," wrap risky islands with Error Boundaries (charts, third-party widgets, complex views)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," compose Suspense fallback (loading) inside an Error Boundary (errors)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," distinguish ",e.jsx("i",{children:"empty"})," vs ",e.jsx("i",{children:"error"})," vs ",e.jsx("i",{children:"loading"}),"—they need different UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," swallow errors silently—log to console in dev and to monitoring in prod."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," show raw stack traces to end users—show a friendly message and log details elsewhere."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Fallback UI:"})," The UI you show when normal rendering can't proceed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error Boundary:"})," React component that catches render-time errors in its subtree."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense:"})," React mechanism to wait for code/data and show a fallback while waiting."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Empty State:"})," UI for successful requests that return no items."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retry:"})," Re-attempting a failed operation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reset:"})," Clearing an error boundary's error so children can re-render."]})]})]}),e.jsxs(r.Callout,{children:["Summary: Use ",e.jsx("b",{children:"Suspense"})," fallbacks for loading, ",e.jsx("b",{children:"Error Boundaries"})," for render errors, and a clear",e.jsx("b",{children:" empty state"})," when nothing is available. Provide ",e.jsx("i",{children:"Retry"}),"/",e.jsx("i",{children:"Reset"}),", keep messages helpful, and log errors for visibility."]})]});export{i as default};
