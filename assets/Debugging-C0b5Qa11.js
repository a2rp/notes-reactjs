import{j as e}from"./index-DVAje__H.js";import{S as s}from"./styled-CqrU8alO.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Debugging (React + Vite)"}),e.jsx(s.Lead,{children:"Core workflows to find and fix issues quickly: browser DevTools, React DevTools, source maps, breakpoints, network inspection, and a few patterns that prevent bugs in the first place."}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Goals while debugging"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Reproduce the problem consistently."}),e.jsx("li",{children:"Locate the failing code path (stack trace or breakpoint)."}),e.jsx("li",{children:"Inspect state/props/variables at the moment of failure."}),e.jsx("li",{children:"Fix with a minimal change and verify no regressions."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Browser DevTools — quick tour"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Elements"}),": inspect DOM, view applied CSS, toggle rules, force states (:hover, :focus)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Console"}),": logs, expressions, stack traces, ",e.jsx("em",{children:"live"})," access to selected element as ",e.jsx(s.InlineCode,{children:"$0"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sources"}),": set breakpoints, step through code, watch variables."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Network"}),": request/response headers, status, payloads, caching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Application/Storage"}),": LocalStorage, SessionStorage, IndexedDB, cookies; clear stale data."]})]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Console essentials (beyond ",e.jsx("code",{children:"log"}),")"]}),e.jsx(s.Pre,{children:`// Label logs so stacks are scannable
console.log("[FetchUser] start", { userId });

// Pretty-print arrays/objects
console.table(rows);
console.dir(node, { depth: 1 });

// Timings
console.time("expensive");
doWork();
console.timeEnd("expensive");

// Group related logs
console.group("Submit form");
console.log("payload", payload);
console.log("valid", isValid);
console.groupEnd();

// Assertions (throws if condition is false in dev)
console.assert(Array.isArray(items), "items must be an array");

// Where did this log come from?
console.trace("who called me?");`}),e.jsx(s.Small,{children:"Keep production logs minimal; excessive logging can leak data and slow apps."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Breakpoints & stepping"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Click the line number in ",e.jsx("b",{children:"Sources"})," to set a breakpoint; refresh to hit it."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"conditional breakpoints"})," (right-click line) e.g."," ",e.jsx(s.InlineCode,{children:"count > 100"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Logpoints"})," (Chromium): print without editing code."]}),e.jsxs("li",{children:["The ",e.jsx(s.InlineCode,{children:"debugger;"})," statement pauses when DevTools is open."]})]}),e.jsx(s.Pre,{children:`// Example: pause only when value is unexpected
if (total < 0) debugger;`}),e.jsxs(s.Small,{children:["Use ",e.jsx("b",{children:"Watch"})," panel for expressions and ",e.jsx("b",{children:"Call Stack"})," to navigate frames. Blackbox vendor code to focus on app modules."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Source maps (see real files in stack traces)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Vite enables source maps in ",e.jsx("b",{children:"dev"})," automatically."]}),e.jsxs("li",{children:["For ",e.jsx("b",{children:"production"})," maps, enable in Vite:"]})]}),e.jsx(s.Pre,{children:`// vite.config.js (snippet)
export default defineConfig({
  build: { sourcemap: true }   // generate *.map files for prod debugging
});`}),e.jsx(s.Small,{children:"Ship prod maps only if needed (private deployments); otherwise keep them off to avoid exposing source."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"React DevTools"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Components"})," panel: inspect the component tree, view"," ",e.jsx(s.InlineCode,{children:"props"}),", ",e.jsx(s.InlineCode,{children:"state"}),", and hook values."]}),e.jsx("li",{children:"Edit props/state inline to test UI behavior without changing code."}),e.jsxs("li",{children:[e.jsx("b",{children:"Profiler"}),": record commits, find slow renders, see why updates occurred."]}),e.jsxs("li",{children:["Verify component identity and ",e.jsx("b",{children:"keys"})," in lists to avoid unnecessary remounts."]})]}),e.jsx(s.Pre,{children:`// Typical gotcha: stale closure in effects
useEffect(() => {
  const id = setInterval(() => {
    // 'count' might be stale if not in deps:
    setCount(c => c + 1);  // prefer functional update
  }, 1000);
  return () => clearInterval(id);
}, []);  // OK with functional updates`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Network debugging"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Check ",e.jsx("b",{children:"Status"}),", ",e.jsx("b",{children:"Request URL"}),", ",e.jsx("b",{children:"Method"}),", ",e.jsx("b",{children:"Query"}),", and"," ",e.jsx("b",{children:"Response"}),". Inspect ",e.jsx("b",{children:"CORS"})," and ",e.jsx("b",{children:"cache"})," headers (200 vs 304)."]}),e.jsx("li",{children:"Retry logic and timeouts prevent hanging UIs; log errors with context (endpoint, payload, user action)."})]}),e.jsx(s.Pre,{children:`// Simple fetch with timeout and basic error surface
async function fetchJson(url, { signal, ...opts } = {}) {
  const controller = new AbortController();
  const t = setTimeout(() => controller.abort(), 10_000);
  try {
    const res = await fetch(url, { signal: controller.signal, ...opts });
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
    return await res.json();
  } finally {
    clearTimeout(t);
  }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Runtime errors & boundaries"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Uncaught errors: see the red overlay in dev (Vite). Read the ",e.jsx("b",{children:"top"})," of the stack first."]}),e.jsx("li",{children:"Add a small error boundary to catch render errors and show a fallback UI."})]}),e.jsx(s.Pre,{children:`// Minimal error boundary (class-based)
import React from "react";
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  static getDerivedStateFromError(error) { return { hasError: true, error }; }
  componentDidCatch(error, info) { console.error("Boundary caught:", error, info); }
  render() {
    if (this.state.hasError) return <p>Something went wrong.</p>;
    return this.props.children;
  }
}
// Usage: <ErrorBoundary><App /></ErrorBoundary>`}),e.jsx(s.Small,{children:"For function components, use a small wrapper library or keep this class boundary; boundaries catch render, lifecycle, and constructor errors below them."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Cleaning effects & avoiding leaks"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Clear timers, intervals, and event listeners in effect cleanups to avoid memory leaks."}),e.jsx("li",{children:"Abort in-flight fetches on unmount to stop state updates on unmounted components."})]}),e.jsx(s.Pre,{children:`useEffect(() => {
  const controller = new AbortController();
  window.addEventListener("resize", onResize);
  const id = setInterval(tick, 1000);
  return () => {
    controller.abort();
    window.removeEventListener("resize", onResize);
    clearInterval(id);
  };
}, []);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common causes & quick fixes"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:'"Cannot read property of undefined"'}),": log the value before use; add guards; check async timing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State not updating"}),": ensure immutable updates; avoid mutating arrays/objects directly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Effect runs too often"}),": check dependency array; move stable functions with"," ",e.jsx(s.InlineCode,{children:"useCallback"})," if needed; avoid putting fresh objects in deps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"List re-renders / remounts"}),": make keys stable and unique; never use array index for dynamic lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"GH Pages deep-link 404"}),": add SPA fallback ",e.jsx("code",{children:"404.html"})," or use HashRouter."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Small checklist"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Reproduce → Inspect stack/trace → Set a breakpoint → Inspect variables."}),e.jsx("li",{children:"Use React DevTools to verify props/state/hook values."}),e.jsx("li",{children:"Clear caches/storage if stale data is suspected."}),e.jsx("li",{children:"Add minimal logs with clear labels; remove noisy logs later."}),e.jsx("li",{children:"Write a small test if the bug is subtle (prevents regressions)."})]})]}),e.jsx(s.Callout,{children:"Summary: use DevTools + React DevTools for visibility, breakpoints for precision, source maps for readable stacks, and clean effect patterns to prevent leaks."})]});export{i as default};
