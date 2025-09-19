import{j as e}from"./index-t22nWg0v.js";import{S as s}from"./styled-DF2u5t0H.js";const t=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Defer Work"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Defer work"})," means postponing non-urgent computations or rendering so the UI stays responsive. The goal is to keep typing, clicks, and basic interactions smooth while heavier work completes later (or in smaller chunks)."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Main thread:"})," where JS runs and the browser lays out/paints your page. If JS blocks, the UI can't update."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Blocking:"})," a long task (loops, parsing, heavy renders) preventing the browser from handling input/paint."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Frame budget:"})," at 60 FPS you get ~",e.jsx("b",{children:"16.7ms"})," per frame. If work exceeds this, users see jank."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Urgent update:"})," must reflect immediately (e.g., input value on keypress)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Non-urgent update:"})," can lag a bit (e.g., filtering a huge list after typing)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Defer:"})," schedule non-urgent work later (low priority, next frame, idle time, or in chunks)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"When to Defer"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Heavy computations triggered by ",e.jsx("b",{children:"every keystroke"})," (filtering/sorting huge lists)."]}),e.jsxs("li",{children:["Rendering ",e.jsx("b",{children:"large trees"})," after small inputs (search results, tables)."]}),e.jsxs("li",{children:["Loading ",e.jsx("b",{children:"rarely used"})," components (charts, editors, modals) - use code-splitting."]}),e.jsx("li",{children:"Non-visual tasks (analytics, precomputations) that don't need to run immediately."})]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Technique 1: ",e.jsx("code",{children:"startTransition"})," (mark updates as non-urgent)"]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx(s.InlineCode,{children:"startTransition"})," tells React “this state update is low priority.” Urgent updates (typing) stay snappy; the deferred update can render later."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use case:"})," typing in a search box (urgent) while rendering a big filtered list (non-urgent)."]})]}),e.jsx(s.Pre,{children:`import React, { startTransition, useState } from "react";

function SearchLargeList({ items }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(items);

  function onChange(e) {
    const next = e.target.value;
    setQuery(next); // urgent: keep input responsive

    // non-urgent: recompute heavy results
    startTransition(() => {
      const q = next.trim().toLowerCase();
      const filtered = items.filter(it => it.name.toLowerCase().includes(q));
      setResults(filtered);
    });
  }

  return (
    <>
      <input value={query} onChange={onChange} placeholder="Search..." />
      <ul>{results.map(it => <li key={it.id}>{it.name}</li>)}</ul>
    </>
  );
}`}),e.jsxs(s.Small,{children:["React may pause/continue the deferred render to keep the UI responsive. Don't wrap ",e.jsx("i",{children:"every"})," update; only the non-urgent ones."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Technique 2: ",e.jsx("code",{children:"useDeferredValue"})," (lag a value, not the UI)"]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," ",e.jsx(s.InlineCode,{children:"useDeferredValue(value)"})," returns a “lagging” version of a value. The original updates immediately; the deferred value updates later when React is free."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use case:"})," pass a deferred query to an expensive child so typing remains instant."]})]}),e.jsx(s.Pre,{children:`import React from "react";

function ExpensiveList({ query, items }) {
  // pretend this render is expensive when query changes
  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter(it => it.name.toLowerCase().includes(q));
  }, [items, query]);

  return <ul>{filtered.map(it => <li key={it.id}>{it.name}</li>)}</ul>;
}

export default function SearchWithDeferred({ items }) {
  const [query, setQuery] = React.useState("");
  const deferredQuery = React.useDeferredValue(query); // may lag behind "query"

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ExpensiveList query={deferredQuery} items={items} />
    </>
  );
}`}),e.jsx(s.Small,{children:"Great for keeping a controlled input instant while heavy children lag slightly."})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Technique 3: Code-Splitting with ",e.jsx("code",{children:"lazy"})," + ",e.jsx("code",{children:"Suspense"})]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," load components on demand so initial render is light."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use case:"})," defer heavy chart/editor until the user opens it."]})]}),e.jsx(s.Pre,{children:`import React, { lazy, Suspense, useState } from "react";
const Chart = lazy(() => import("./HeavyChart"));

export default function Report() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Show Chart</button>
      {open && (
        <Suspense fallback={<div>Loading chart…</div>}>
          <Chart />
        </Suspense>
      )}
    </>
  );
}`}),e.jsx(s.Small,{children:"Users who never open the chart never download it - instant win for performance."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Technique 4: Break Long Tasks (idle time / next frame)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"requestIdleCallback (rIC):"})," runs when the browser is idle; not supported everywhere and not time-guaranteed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"requestAnimationFrame (rAF):"})," runs before the next paint; good for visual step-by-step work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chunking:"})," slice large loops into smaller batches so the browser can breathe between them."]})]}),e.jsx(s.Pre,{children:`// Chunk a large array in idle time, with a fallback
function processInChunks(items, each, done) {
  const CHUNK = 500;

  function work(deadline) {
    while ((deadline?.timeRemaining?.() ?? 0) > 0 && items.length) {
      for (let i = 0; i < CHUNK && items.length; i++) each(items.shift());
    }
    if (items.length) {
      schedule(); // more remains
    } else {
      done?.();
    }
  }

  function schedule() {
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(work);
    } else {
      // Fallback: schedule next macrotask
      setTimeout(() => work({ timeRemaining: () => 10 }), 0);
    }
  }

  schedule();
}`}),e.jsx(s.Small,{children:"Use for background transformations, precomputations, or large JSON processing without freezing the UI."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Technique 5: Move Non-Visual Work to Effects"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Don't compute heavy results during render. Compute inside ",e.jsx(s.InlineCode,{children:"useEffect"})," after the paint, or mark as a transition."]}),e.jsxs("li",{children:["Persist results (state/ref) and reuse with ",e.jsx(s.InlineCode,{children:"useMemo"})," when inputs don't change."]})]}),e.jsx(s.Pre,{children:`function HeavyCompute({ input }) {
  const [result, setResult] = React.useState(null);

  React.useEffect(() => {
    let cancelled = false;
    // simulate heavy async compute
    Promise.resolve().then(() => {
      const r = expensiveFn(input);
      if (!cancelled) setResult(r);
    });
    return () => { cancelled = true; };
  }, [input]);

  return <div>{result ?? "Computing…"}</div>;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Technique 6: Offload CPU to Web Workers"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," a Web Worker runs JS on a background thread. Main thread stays free for UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use case:"})," heavy CPU (parsing, image transforms, crypto, ML inference)."]})]}),e.jsx(s.Pre,{children:`// worker.js
self.onmessage = (e) => {
  const result = heavyCompute(e.data);
  self.postMessage(result);
};

// in component:
// const worker = new Worker(new URL("./worker.js", import.meta.url), { type: "module" });
// worker.postMessage(data);
// worker.onmessage = (e) => setResult(e.data);`}),e.jsxs(s.Small,{children:["You have a separate topic for ",e.jsx("i",{children:"Web Workers"})," - this is just how it relates to deferring work."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Debounce & Throttle (control event rate)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Debounce:"})," wait until events stop for N ms, then run once (good for search)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Throttle:"})," run at most once per N ms during a burst (good for scroll/resize handlers)."]})]}),e.jsx(s.Pre,{children:`function debounce(fn, ms=200){let t;return (...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}}
function throttle(fn, ms=200){let t=0;return (...a)=>{const n=Date.now();if(n-t>=ms){t=n;fn(...a);}}}`}),e.jsx(s.Small,{children:"Use with scroll/resize/input to reduce work frequency. Combine with transitions for best UX."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," identify urgent vs non-urgent updates and mark non-urgent with transitions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," code-split rarely used components and routes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," chunk big loops and consider Web Workers for CPU-heavy tasks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," run heavy computations during render; prefer effects or workers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," wrap everything in ",e.jsx(s.InlineCode,{children:"startTransition"}),"; it's for user-perceived priority, not correctness."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Transition:"})," a lower-priority state update that may be interrupted to keep the UI responsive."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deferred value:"})," a value React allows to lag behind the source temporarily."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Code-splitting:"})," splitting bundles so code loads on demand."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chunking:"})," slicing big work into smaller batches across time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idle time:"})," moments when the browser has spare time to run background work."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Keep interactions snappy by separating ",e.jsx("i",{children:"urgent"})," and ",e.jsx("i",{children:"non-urgent"})," work. Use ",e.jsx("b",{children:"startTransition"})," / ",e.jsx("b",{children:"useDeferredValue"})," for priority, ",e.jsx("b",{children:"code-splitting"})," to shrink initial work, ",e.jsx("b",{children:"chunking"})," and ",e.jsx("b",{children:"Web Workers"})," to avoid blocking the main thread."]})]});export{t as default};
