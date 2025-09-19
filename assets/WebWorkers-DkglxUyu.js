import{j as e}from"./index-DqLKwkYK.js";import{S as r}from"./styled-DaTlZWAW.js";const o=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Web Workers"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Web Workers"})," let you run JavaScript on a background thread so heavy CPU work doesn't block the UI (scrolling, typing, animations). You send messages to a worker, it computes, and sends results back—keeping the ",e.jsx("b",{children:"main thread"})," responsive."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definition & Purpose"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Main thread:"})," the browser's UI thread. It runs React rendering, layout, painting, and most JS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Web Worker:"})," a separate JS thread (no DOM access) for CPU-intensive tasks (parsing, encoding, math, AI inference, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Goal:"})," offload expensive work and keep interactions smooth (avoid “page is unresponsive”)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Worker Types (Know the differences)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Dedicated Worker:"})," one page ↔ one worker instance. Best for component-local tasks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shared Worker:"})," multiple tabs/windows can talk to the same worker (shared context)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker:"})," background proxy between app and network (caching, offline, push). ",e.jsx("i",{children:"Not"})," a compute worker for components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Module Worker:"})," a worker whose script is an ES module (",e.jsx(r.InlineCode,{children:'{ type: "module" }'}),")—supports imports and strict mode by default."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"How Workers Communicate"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"postMessage / onmessage:"})," send JSON-serializable data between main thread and worker."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Structured clone:"})," the algorithm the browser uses to copy complex objects (Map, Set, ArrayBuffer, File, etc.) safely between threads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transferable objects:"})," pass ownership (zero-copy) of certain objects like ",e.jsx(r.InlineCode,{children:"ArrayBuffer"}),", ",e.jsx(r.InlineCode,{children:"MessagePort"}),", ",e.jsx(r.InlineCode,{children:"ImageBitmap"})," to avoid cloning cost."]})]}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Tip:"})," Prefer ",e.jsx("i",{children:"transfer"})," large binary data instead of cloning it for better performance."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Vite Import Pattern (ES Modules)"}),e.jsx(r.Pre,{children:`// Main thread (React component file)
const worker = new Worker(
  new URL("./prime.worker.js", import.meta.url),
  { type: "module" }
);`}),e.jsxs(r.Small,{children:["Vite resolves the worker script at build time. Use ",e.jsx(r.InlineCode,{children:'type: "module"'})," so you can import inside the worker."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Dedicated Worker with Progress Updates"}),e.jsx(r.Pre,{children:`// prime.worker.js (module worker)
self.onmessage = (e) => {
  const { max } = e.data;
  try {
    const primes = [];
    const isPrime = (n) => {
      if (n < 2) return false;
      for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
      return true;
    };

    const step = Math.max(1, Math.floor(max / 100));
    for (let n = 2; n <= max; n++) {
      if (isPrime(n)) primes.push(n);
      if (n % step === 0) {
        // stream progress to main thread
        self.postMessage({ type: "progress", value: Math.round((n / max) * 100) });
      }
    }
    self.postMessage({ type: "done", primes });
  } catch (err) {
    self.postMessage({ type: "error", message: String(err) });
  }
};`}),e.jsx(r.Pre,{children:`// React (main thread): create, talk, cleanup
import React from "react";

export function PrimeFinder() {
  const [progress, setProgress] = React.useState(0);
  const [count, setCount] = React.useState(0);
  const workerRef = React.useRef(null);

  React.useEffect(() => {
    const w = new Worker(new URL("./prime.worker.js", import.meta.url), { type: "module" });
    workerRef.current = w;

    w.onmessage = (e) => {
      const msg = e.data;
      if (msg.type === "progress") setProgress(msg.value);
      if (msg.type === "done") { setCount(msg.primes.length); setProgress(100); }
      if (msg.type === "error") console.error("Worker error:", msg.message);
    };

    w.onerror = (ev) => console.error("Uncaught worker error:", ev.message);
    w.onmessageerror = (ev) => console.error("Message data could not be cloned:", ev);

    return () => { w.terminate(); };
  }, []);

  function start() {
    workerRef.current?.postMessage({ max: 250000 }); // heavy work off the main thread
  }

  return (
    <div>
      <button onClick={start}>Find primes</button>
      <p>Progress: {progress}% • Count: {count}</p>
    </div>
  );
}`}),e.jsxs(r.Small,{children:["Pattern: create worker in ",e.jsx(r.InlineCode,{children:"useEffect"}),", send a message to start, show progress, terminate on unmount."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Transferable Objects (Zero-copy)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Definition:"})," a ",e.jsx("i",{children:"transferable"})," can move across threads without cloning. Ownership changes hands; the sender's buffer becomes unusable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Common:"})," ",e.jsx(r.InlineCode,{children:"ArrayBuffer"}),", ",e.jsx(r.InlineCode,{children:"MessagePort"}),", ",e.jsx(r.InlineCode,{children:"ImageBitmap"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," large binary data (images, audio, numeric arrays) becomes fast to pass around."]})]}),e.jsx(r.Pre,{children:`// Main thread - transfer a Float64Array buffer
const buf = new Float64Array(1_000_000);
worker.postMessage({ type: "data", buffer: buf.buffer }, [buf.buffer]); // transfer list
// buf.buffer is now "neutered" on the main thread (no longer usable)`}),e.jsx(r.Pre,{children:`// Worker - receive, wrap, and process
self.onmessage = (e) => {
  if (e.data.type === "data") {
    const view = new Float64Array(e.data.buffer);
    // ... compute ...
    // send results back (optionally transfer again)
    self.postMessage({ ok: true });
  }
};`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Limitations & Gotchas"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"No DOM access:"})," workers can't touch the document, window layout, or React tree. Use messages to request UI updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Same-origin rules:"})," worker scripts must be served with proper CORS/headers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Heavy messaging:"})," too many messages can bottleneck. Batch updates or send progress at intervals."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memory:"})," large clones are expensive. Prefer transferables for big binary payloads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Termination:"})," call ",e.jsx(r.InlineCode,{children:"worker.terminate()"})," to free resources when done/unmounting."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Patterns: Worker Pools, Batching, Cancellation"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Worker pool:"})," keep N workers and dispatch jobs in round-robin for parallelism on multi-core CPUs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cancellation:"})," define a ",e.jsx(r.InlineCode,{children:'{ type: "cancel", jobId }'})," message; the worker checks flags and stops work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backpressure:"})," when a worker is busy, queue jobs; avoid flooding it with messages."]})]}),e.jsx(r.Pre,{children:`// Tiny cancellable protocol
// main thread
const jobId = crypto.randomUUID();
worker.postMessage({ type: "start", jobId, payload: { /* ... */ } });
// later...
worker.postMessage({ type: "cancel", jobId });

// worker
let cancelled = new Set();
self.onmessage = (e) => {
  const { type, jobId } = e.data;
  if (type === "cancel") { cancelled.add(jobId); return; }
  if (type === "start") {
    for (let i = 0; i < 1e9; i++) {
      if (cancelled.has(jobId)) return; // stop early
      // work...
    }
    self.postMessage({ type: "done", jobId });
  }
};`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Graphics: OffscreenCanvas (Optional)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"OffscreenCanvas:"})," draw on a canvas from a worker (no UI thread jank)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flow:"})," get ",e.jsx(r.InlineCode,{children:"canvas.transferControlToOffscreen()"})," on main thread, send it to worker as transferable."]})]}),e.jsx(r.Pre,{children:`// Main
const off = canvas.transferControlToOffscreen();
worker.postMessage({ canvas: off }, [off]);
// Worker
self.onmessage = (e) => {
  const ctx = e.data.canvas.getContext("2d");
  // render loop here...
};`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary (Quick Reference)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Main thread:"})," the UI thread that paints and runs most JS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Worker:"})," JS thread without DOM access for background work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dedicated worker:"})," private to a single page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Shared worker:"})," shared by multiple browsing contexts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Service worker:"})," background network proxy (offline, cache, push)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Module worker:"})," worker that runs an ES module."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Structured clone:"})," safe deep-copy algorithm used by ",e.jsx(r.InlineCode,{children:"postMessage"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transferable:"})," objects whose ownership can move between threads (",e.jsx(r.InlineCode,{children:"ArrayBuffer"}),", etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MessageChannel:"})," two connected ",e.jsx(r.InlineCode,{children:"MessagePort"}),"s for duplex messaging."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," offload heavy, CPU-bound work (parsing, compression, crypto, simulation)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," stream progress and batch messages (avoid chatty loops)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," terminate workers when done and reuse via pools for frequent jobs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," try to manipulate the DOM from a worker (impossible by design)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," clone huge buffers; ",e.jsx("b",{children:"transfer"})," them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," create a new worker per keystroke—debounce or queue work."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Step-by-Step: Add a Worker to a React Component"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"1."})," Create ",e.jsx(r.InlineCode,{children:"*.worker.js"})," with an ",e.jsx(r.InlineCode,{children:"onmessage"})," handler."]}),e.jsxs("li",{children:[e.jsx("b",{children:"2."})," In the component, construct it via ",e.jsxs(r.InlineCode,{children:["new Worker(new URL(...), ",`{ "{ type: 'module' }" }`,")"]}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"3."})," Hook up ",e.jsx(r.InlineCode,{children:"onmessage"}),"/",e.jsx(r.InlineCode,{children:"onerror"}),", send a ",e.jsx(r.InlineCode,{children:"postMessage"})," to start."]}),e.jsxs("li",{children:[e.jsx("b",{children:"4."})," Update React state from messages; clean up with ",e.jsx(r.InlineCode,{children:"terminate()"})," on unmount."]})]})]}),e.jsxs(r.Callout,{children:["Summary: Use Web Workers to keep React apps smooth under heavy CPU load. Communicate with",e.jsx("i",{children:" postMessage "})," using structured clone, transfer big binary data, stream progress, and terminate workers when done. Start small with a dedicated worker, then evolve into pools and OffscreenCanvas as needs grow."]})]});export{o as default};
