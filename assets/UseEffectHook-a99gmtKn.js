import{j as e}from"./index-BUVRD3Bm.js";import{S as s}from"./styled-B0PYZfi9.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"useEffect"}),e.jsxs(s.Lead,{children:[e.jsx(s.InlineCode,{children:"useEffect"})," runs ",e.jsx("b",{children:"side effects"})," after React updates the DOM. Use it for work that touches the outside world: fetching, subscriptions, timers, logging, and imperative APIs."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Terminology (precise)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Effect:"})," code that runs after the component commits to the DOM."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cleanup:"})," a function returned by the effect; React calls it before the effect re-runs and on unmount."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dependency array:"})," list of reactive values used by the effect. React re-runs the effect when any of them change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render phase:"})," calculating JSX (no DOM changes). Effects do ",e.jsx("em",{children:"not"})," run here."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Commit phase:"})," DOM is updated, then effects run."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useLayoutEffect:"})," like ",e.jsx(s.InlineCode,{children:"useEffect"}),", but runs ",e.jsx("em",{children:"synchronously"})," after DOM mutations and ",e.jsx("em",{children:"before"})," the browser paints. Use for measurements and synchronous DOM reads/writes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Strict Mode (dev):"})," React mounts, immediately cleans up, then mounts again to surface bugs; effects may run twice in development only."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"When to use (and when to avoid)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use for:"})," network requests, event listeners, subscriptions, timers, logging/analytics, imperative APIs (focus, media, third-party widgets)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid for:"})," deriving values from props/state (compute during render), formatting values (render or ",e.jsx(s.InlineCode,{children:"useMemo"}),"), or handling UI events (use handlers directly)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Basic usage & dependency forms"}),e.jsx(s.Pre,{children:`import { useEffect, useState } from "react";

// A) No deps → runs after every render
useEffect(() => {
  document.title = "Counter app";
});

// B) Empty deps [] → run once on mount, cleanup on unmount
useEffect(() => {
  const id = setInterval(() => console.log("tick"), 1000);
  return () => clearInterval(id);   // cleanup
}, []);

// C) With deps [count] → run when 'count' changes
function Title({ count }) {
  useEffect(() => {
    document.title = "Count: " + count;
  }, [count]);
  return null;
}`}),e.jsx(s.Small,{children:"Always include every reactive value used inside the effect in the dependency array."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Cleanup examples"}),e.jsx(s.Pre,{children:`// Event listener
useEffect(() => {
  function onKey(e) { if (e.key === "Escape") console.log("esc"); }
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);

// Subscriptions (e.g., WebSocket)
useEffect(() => {
  const socket = new WebSocket("wss://example.test");
  socket.addEventListener("message", ev => console.log(ev.data));
  return () => socket.close();
}, []);`}),e.jsx(s.Small,{children:"If the effect sets something up, the cleanup should undo it (remove listener, clear timer, close connection)."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Fetching with cancellation (avoid races)"}),e.jsx(s.Pre,{children:`import { useEffect, useState } from "react";

function User({ id }) {
  const [data, setData] = useState(null);
  const [status, setStatus] = useState("idle"); // "idle" | "loading" | "error" | "ready"

  useEffect(() => {
    const ctrl = new AbortController();
    setStatus("loading");
    fetch("https://api.example.test/users/" + id, { signal: ctrl.signal })
      .then(res => {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(json => setData(json))
      .then(() => setStatus("ready"))
      .catch(err => {
        if (err.name !== "AbortError") setStatus("error");
      });

    return () => ctrl.abort(); // cancel stale request when id changes or unmounts
  }, [id]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "error")   return <p role="alert">Failed to load</p>;
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}`}),e.jsxs(s.Small,{children:["Changing ",e.jsx(s.InlineCode,{children:"id"})," cancels the previous request and starts a fresh one, preventing stale data from winning the race."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Measuring layout (useLayoutEffect)"}),e.jsx(s.Pre,{children:`import { useLayoutEffect, useRef, useState } from "react";

function MeasureBox() {
  const ref = useRef(null);
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    // DOM is updated but not painted yet → measurement is safe, no flicker
    const rect = ref.current.getBoundingClientRect();
    setH(rect.height);
  }, []);

  return <div ref={ref}>Height is {h}px</div>;
}`}),e.jsxs(s.Small,{children:["Prefer ",e.jsx(s.InlineCode,{children:"useEffect"})," for most work. Use ",e.jsx(s.InlineCode,{children:"useLayoutEffect"})," only for synchronous reads/writes where flicker matters."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Dependency rules"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Include all values used inside the effect that come from props, state, or context."}),e.jsxs("li",{children:["Functions created in render are reactive values; wrap them with ",e.jsx(s.InlineCode,{children:"useCallback"})," if the effect depends on a stable reference."]}),e.jsxs("li",{children:["Refs (",e.jsx(s.InlineCode,{children:"ref.current"}),") are mutable and do not trigger renders; reading/writing them does not require adding the ref object to deps (unless you replace the ref)."]}),e.jsxs("li",{children:["It’s safe to exclude ",e.jsx(s.InlineCode,{children:"setState"})," functions; setters are stable."]}),e.jsx("li",{children:"Avoid disabling the ESLint rule permanently; fix dependency issues by restructuring code (split effects, move computations, memoize callbacks)."})]}),e.jsx(s.Pre,{children:`// Split effects if they depend on different things
useEffect(() => { document.title = "Count: " + count; }, [count]);
useEffect(() => { console.log("User changed", userId); }, [userId]);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Making the effect callback ",e.jsx("em",{children:"async"})," directly. Declare an async function inside and call it."]}),e.jsx("li",{children:"Missing deps → stale closures (effect reads old values). Always include dependencies or refactor."}),e.jsx("li",{children:"Putting pure derivations in effects; compute during render instead."}),e.jsx("li",{children:"Mutating state in a loop or without guards; prefer functional updaters where needed."}),e.jsxs("li",{children:["Using ",e.jsx(s.InlineCode,{children:"useLayoutEffect"})," unnecessarily, causing layout thrash or blocking paint."]})]}),e.jsx(s.Pre,{children:`useEffect(() => {
  let cancelled = false;
  async function load() {
    const res = await fetch("/api/data");
    if (!cancelled) {
      // safe to update
    }
  }
  load();
  return () => { cancelled = true; };
}, []);`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do / Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use effects for external systems (network, subscriptions, timers, DOM APIs)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," clean up listeners/timers/subscriptions in the cleanup function."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," include all reactive dependencies; split effects or memoize callbacks when needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," compute derived values in effects; compute during render or memoize."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget to handle request cancellation to avoid race conditions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse ",e.jsx(s.InlineCode,{children:"useLayoutEffect"}),"; only for measurements or synchronous DOM writes that must block paint."]})]})]}),e.jsxs(s.Callout,{children:["Summary: ",e.jsx(s.InlineCode,{children:"useEffect"})," synchronizes components with external systems. Keep effects focused, include the right dependencies, and clean up thoroughly. Measure layout with ",e.jsx(s.InlineCode,{children:"useLayoutEffect"})," only when needed."]})]});export{r as default};
