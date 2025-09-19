import{j as e}from"./index-CAccbg1x.js";import{S as n}from"./styled-CzuBf27i.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Render Cycle"}),e.jsxs(n.Lead,{children:["The render cycle is how React turns state and props into DOM updates. It has two main stages: ",e.jsx("b",{children:"render"})," (compute the next UI) and ",e.jsx("b",{children:"commit"}),"(apply changes to the DOM). Effects run around the commit."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Big picture (timeline)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render"})," — call components (pure functions) → produce JSX (a virtual tree)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Diff"})," — compare previous tree vs next (reconciliation)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Commit"})," — update DOM (mutations), then run layout effects, browser paints, then run passive effects."]})]}),e.jsx(n.Pre,{children:`// High-level order (per update)
render() -> diff -> commit(mutating DOM)
 -> run useLayoutEffect create
 -> browser paints
 -> run useEffect create
// On next update/unmount: cleanups run before re-running creates`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"What triggers a render"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Local ",e.jsx("b",{children:"state"})," updates: ",e.jsx(n.InlineCode,{children:"setState"}),"."]}),e.jsxs("li",{children:["Parent ",e.jsx("b",{children:"re-renders"}),": children re-render by default (even if their props didn’t change)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context"})," value changes: re-renders all consumers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Key"})," changes or element type changes: forces a ",e.jsx("em",{children:"remount"})," (new instance)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Render vs Commit"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render phase"}),": no DOM reads/writes should happen here; components should be pure (same inputs → same JSX, no side effects)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Commit phase"}),": React mutates the DOM, then runs effects. Visual changes become visible after paint."]})]}),e.jsx(n.Pre,{children:`// ❌ Side effects in render (anti-pattern)
function Comp({ url }) {
  fetch(url); // causes duplicate requests and race conditions
  return <div/>;
}

// ✅ Side effects in effects (after commit)
function Comp({ url }) {
  React.useEffect(() => {
    const c = new AbortController();
    fetch(url, { signal: c.signal });
    return () => c.abort();
  }, [url]);
  return <div/>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Effect timing"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"useLayoutEffect"})," — runs ",e.jsx("em",{children:"after"})," DOM mutations but ",e.jsx("em",{children:"before"})," the browser paints. Use for measuring layout or synchronously adjusting layout. Blocks paint; keep it quick."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useEffect"})," — runs ",e.jsx("em",{children:"after"})," paint. Use for subscriptions, network requests, timers, logging."]}),e.jsx("li",{children:"Cleanups run before the next time the effect runs, and on unmount."})]}),e.jsx(n.Pre,{children:`// Measure size: layout effect (pre-paint)
function Box() {
  const ref = React.useRef(null);
  React.useLayoutEffect(() => {
    const rect = ref.current.getBoundingClientRect(); // safe here
    // ...position a popover using rect
  });
  return <div ref={ref} />;
}

// Fetch data: passive effect (post-paint)
function Users() {
  const [rows, setRows] = React.useState([]);
  React.useEffect(() => {
    let alive = true;
    fetch("/api/users").then(r => r.json()).then(d => {
      if (alive) setRows(d);
    });
    return () => { alive = false };
  }, []);
  return <List items={rows} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Batching (React 18+)"}),e.jsx("p",{children:"Multiple state updates in the same tick are batched into one render/commit, even across promises and timeouts."}),e.jsx(n.Pre,{children:`// One render, one commit
setCount(c => c + 1);
setFlag(f => !f);

// Also batched (async)
setTimeout(() => {
  setA(1);
  setB(2);
}, 0);`}),e.jsxs(n.Small,{children:["To force a synchronous update (rare cases like reading updated layout immediately), use ",e.jsx(n.InlineCode,{children:"flushSync"}),"."]}),e.jsx(n.Pre,{children:`import { flushSync } from "react-dom";
flushSync(() => setOpen(true));
// DOM now reflects open=true; safe to measure synchronously`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Concurrent rendering (high-level)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["React can ",e.jsx("b",{children:"start, pause, abandon, and retry"})," rendering before commit. Nothing shows until commit."]}),e.jsx("li",{children:"Keep render functions pure and idempotent—no side effects—since they may run multiple times."}),e.jsxs("li",{children:["Mark non-urgent updates as ",e.jsx("b",{children:"transitions"})," to keep the UI responsive."]})]}),e.jsx(n.Pre,{children:`// useTransition: mark non-urgent work
import { useState, useTransition } from "react";

function Search() {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const q = e.target.value;
    setQuery(q); // urgent (keeps input snappy)
    startTransition(() => {
      // non-urgent: filter a big list, fetch suggestions, etc.
      filterResults(q);
    });
  }

  return (
    <>
      <input value={query} onChange={onChange} />
      {isPending && <Spinner />}
      <Results />
    </>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Deferring heavy derived work"}),e.jsxs("p",{children:[e.jsx("b",{children:"useDeferredValue"})," lets the UI show the latest input while postponing heavy rendering that depends on it."]}),e.jsx(n.Pre,{children:`import { useState, useDeferredValue } from "react";

function Typeahead({ items }) {
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text); // may lag slightly

  const filtered = React.useMemo(() => {
    // heavy filter
    return items.filter(x => x.includes(deferredText));
  }, [items, deferredText]);

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <List items={filtered} />
    </>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Strict Mode (development-only checks)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["In ",e.jsx("b",{children:"development"}),", Strict Mode may intentionally double-invoke render and effect setup/cleanup to surface unsafe patterns."]}),e.jsxs("li",{children:["This does ",e.jsx("b",{children:"not"})," happen in production. Ensure effects are idempotent and have correct cleanups."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common pitfalls"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Side effects in render (e.g., fetching, subscriptions) → run in effects instead."}),e.jsxs("li",{children:["Blocking layout in ",e.jsx(n.InlineCode,{children:"useLayoutEffect"})," with heavy work → move to ",e.jsx(n.InlineCode,{children:"useEffect"})," or defer."]}),e.jsx("li",{children:"Depending on stale values in effects → include proper deps or use functional updates."}),e.jsx("li",{children:"Mutating state directly → React can’t detect changes; always create new objects/arrays."}),e.jsxs("li",{children:["Measuring layout in ",e.jsx(n.InlineCode,{children:"useEffect"})," → runs after paint, measurements may flicker; measure in ",e.jsx(n.InlineCode,{children:"useLayoutEffect"}),"."]})]}),e.jsx(n.Pre,{children:`// Stale closure fix: functional update
setCount(c => c + 1);`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Performance checklist"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Keep renders pure and fast; avoid heavy sync work in render."}),e.jsxs("li",{children:["Memoize expensive derived values with ",e.jsx(n.InlineCode,{children:"useMemo"})," when inputs rarely change."]}),e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"React.memo"})," for pure child components to skip unchanged props."]}),e.jsxs("li",{children:["Virtualize long lists; split code with ",e.jsx(n.InlineCode,{children:"React.lazy"})," and Suspense."]}),e.jsxs("li",{children:["Mark non-urgent updates with ",e.jsx(n.InlineCode,{children:"useTransition"}),"; use ",e.jsx(n.InlineCode,{children:"useDeferredValue"})," for heavy derived work."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep side effects out of render; use effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," measure layout in ",e.jsx(n.InlineCode,{children:"useLayoutEffect"}),", not ",e.jsx(n.InlineCode,{children:"useEffect"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," rely on automatic batching; reach for ",e.jsx(n.InlineCode,{children:"flushSync"})," only when necessary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," assume one render per update; renders can be repeated or interrupted before commit."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate state; always return new objects/arrays."]})]})]}),e.jsxs(n.Callout,{children:["Summary: render computes the next UI; commit applies it. Effects run around the commit, with",e.jsx(n.InlineCode,{children:"useLayoutEffect"})," before paint and ",e.jsx(n.InlineCode,{children:"useEffect"})," after. React batches updates and can restart rendering, so keep components pure and use transitions/deferrals to keep UIs responsive."]})]});export{r as default};
