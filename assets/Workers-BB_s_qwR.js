import{j as e}from"./index-DXTGIo8z.js";import{S as r}from"./styled-jL9hMBcz.js";const o=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Workers"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Workers"})," run JavaScript off the main UI thread so heavy work doesn't freeze your app. They use ",e.jsx(r.InlineCode,{children:"postMessage"})," to talk with the main thread and can massively improve responsiveness for CPU-bound tasks (parsing, crunching, image transforms)."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definition & Purpose"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Web Worker:"})," a background script with its ",e.jsx("em",{children:"own event loop"})," and ",e.jsx("em",{children:"no DOM access"}),". Ideal for CPU-heavy logic. Communicates via messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SharedWorker:"})," like a Web Worker but shared by multiple tabs/windows of the same origin. Good for multi-tab coordination or caching shared state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker:"})," a special worker that sits between your app and the network. Enables offline, caching, and push. Runs even when the page is closed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Worklets:"})," small, specialized workers hosted by browser subsystems (e.g., ",e.jsx(r.InlineCode,{children:"AudioWorklet"}),", CSS Paint/Animation Worklet). They run tiny, time-critical code off the main thread."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Main thread:"})," the UI thread that renders DOM, runs React, handles input. Keeping it free prevents jank, dropped frames, and input lag."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"React + Workers: Mental Model"}),e.jsxs(r.List,{children:[e.jsx("li",{children:"React stays on the main thread rendering UI. Heavy tasks go to a worker. Send inputs to the worker; receive results; then update state."}),e.jsx("li",{children:"Workers can't touch the DOM or React state directly—only message passing is allowed."}),e.jsxs("li",{children:["Prefer a ",e.jsx("b",{children:"pure function"})," interface for worker logic; it's easier to test and reuse."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Web Worker (Vite-friendly) — Example"}),e.jsxs(r.Small,{children:["Use ",e.jsx(r.InlineCode,{children:'new URL("./file.js", import.meta.url)'})," and ",e.jsx(r.InlineCode,{children:'{ type: "module" }'}),"."]}),e.jsx(r.Pre,{children:`// src/pages/topics/integrations/examples/heavy.worker.js
// A simple CPU-heavy task (e.g., sum large array)
self.onmessage = (e) => {
  const { cmd, payload } = e.data || {};
  if (cmd === "sum") {
    const arr = payload || [];
    let total = 0;
    for (let i = 0; i < arr.length; i++) total += arr[i];
    self.postMessage({ ok: true, result: total });
  }
};

self.onerror = (err) => {
  // Errors inside the worker
  // You can also post back a structured error if desired
};

// Optional: handle malformed messages
self.onmessageerror = () => {
  self.postMessage({ ok: false, error: "Message could not be deserialized." });
};`}),e.jsx(r.Pre,{children:`// src/pages/topics/integrations/examples/WorkerDemo.jsx
import React from "react";

export default function WorkerDemo() {
  const [total, setTotal] = React.useState(null);
  const [status, setStatus] = React.useState("idle");

  React.useEffect(() => {
    // Create the worker (Vite-friendly URL + module type)
    const worker = new Worker(
      new URL("./heavy.worker.js", import.meta.url),
      { type: "module" }
    );

    worker.onmessage = (e) => {
      const { ok, result, error } = e.data || {};
      if (!ok) {
        setStatus("error");
        console.error(error);
      } else {
        setTotal(result);
        setStatus("done");
      }
    };

    worker.onerror = (err) => {
      setStatus("error");
      console.error("Worker error:", err);
    };

    // Send a big array once mounted
    setStatus("working");
    const big = Array.from({ length: 2_000_00 }, (_, i) => (i % 7) - 3);
    worker.postMessage({ cmd: "sum", payload: big });

    // Cleanup when component unmounts (terminate frees resources)
    return () => worker.terminate();
  }, []);

  return (
    <div>
      <p>Status: {status}</p>
      <p>Sum: {total ?? "…"}</p>
    </div>
  );
}`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Key terms:"})," ",e.jsx("i",{children:"terminate()"})," stops the worker; ",e.jsx("i",{children:"postMessage()"})," sends data;"," ","the ",e.jsx("i",{children:"message"})," event receives results. Data is structured-cloned by default."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Transferables for Speed (ArrayBuffer, OffscreenCanvas)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Structured clone:"})," the default way messages copy data. For large binary data, copying is expensive."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transferable:"})," objects like ",e.jsx(r.InlineCode,{children:"ArrayBuffer"})," can be",e.jsx("em",{children:"transferred"})," (moved, not copied) to the worker for zero-copy performance."]}),e.jsxs("li",{children:[e.jsx("b",{children:"OffscreenCanvas:"})," a canvas that can be used in a worker for rendering off the main thread. Transfer it using ",e.jsx(r.InlineCode,{children:"postMessage(canvas, [canvas])"})," after calling"," ",e.jsx(r.InlineCode,{children:"canvas.transferControlToOffscreen()"}),"."]})]}),e.jsx(r.Pre,{children:`// Transferring an ArrayBuffer (fast, no copy):
const buffer = new ArrayBuffer(1024 * 1024); // 1 MB
worker.postMessage({ cmd: "process", buffer }, [buffer]);
// After transfer, 'buffer' is detached (unusable) on the sender side.`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Optional: Comlink (RPC-style API)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Comlink:"})," a tiny library that wraps ",e.jsx("i",{children:"postMessage"})," and lets you call worker functions as if they were local (Promises behind the scenes)."]}),e.jsx("li",{children:"It makes workers feel like modules with async functions—great for readability."})]}),e.jsx(r.Pre,{children:`// Worker (math.worker.js)
import * as Comlink from "comlink";
const api = {
  async multiply(a, b) {
    // pretend it's expensive
    return a * b;
  }
};
Comlink.expose(api);

// Main thread
import * as Comlink from "comlink";
const w = new Worker(new URL("./math.worker.js", import.meta.url), { type: "module" });
const workerApi = Comlink.wrap(w);
const result = await workerApi.multiply(6, 7); // 42`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Shared Worker (multi-tab)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SharedWorker:"})," one shared background script for all tabs of the same origin. Communication uses ",e.jsx(r.InlineCode,{children:"MessagePort"}),"."]}),e.jsx("li",{children:"Good for shared cache, presence indicators, or broadcasting messages across tabs."})]}),e.jsx(r.Pre,{children:`// main.js
const shared = new SharedWorker(new URL("./shared.js", import.meta.url), { type: "module" });
shared.port.start();
shared.port.onmessage = (e) => console.log("From shared:", e.data);
shared.port.postMessage({ hello: "from tab" });

// shared.js
onconnect = (e) => {
  const port = e.ports[0];
  port.onmessage = (msg) => {
    // Broadcast to all connected ports if you store them
    port.postMessage({ pong: msg.data });
  };
};`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Service Worker (offline, caching, push)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker:"})," a network proxy in your browser. Lets you cache assets/API responses, serve offline, and receive push notifications."]}),e.jsx("li",{children:"Registered once per origin + scope; updates when files change. Works even if the page is closed."})]}),e.jsx(r.Pre,{children:`// Basic registration (in your app entry, guarded for support)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(console.error);
  });
}`}),e.jsx(r.Small,{children:"For Vite apps, consider a plugin (e.g., PWA) to generate and manage the service worker."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Error Handling & Cleanup"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Add ",e.jsx(r.InlineCode,{children:"worker.onerror"})," and"," ",e.jsx(r.InlineCode,{children:"worker.onmessageerror"})," for diagnostics."]}),e.jsxs("li",{children:["Always ",e.jsx("b",{children:"terminate"})," workers you no longer need to free memory and threads."]}),e.jsx("li",{children:"Validate inputs inside the worker; never trust message shapes implicitly."})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," move CPU-heavy logic (parsing, transform, crypto, image ops) into workers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the worker API small and pure; pass inputs, return outputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use transferables for large binary data and consider OffscreenCanvas for rendering."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," try to touch the DOM from a worker—it's not allowed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," spam the bridge with many tiny messages; batch them if possible."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"postMessage:"})," function to send data between threads (structured clone by default)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Structured Clone:"})," algorithm that copies complex objects between threads safely."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transferable:"})," an object that can be moved (not copied) across threads (e.g., ArrayBuffer)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MessagePort:"})," object representing one end of a message channel (used in SharedWorkers)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"OffscreenCanvas:"})," a canvas that can be rendered from a worker (no main-thread blocking)."]})]})]}),e.jsx(r.Callout,{children:"Summary: Workers keep React UIs smooth by offloading heavy work. Start with Web Workers for CPU-bound tasks, consider SharedWorker for multi-tab coordination, Service Worker for offline and caching, and Worklets for specialized, real-time pipelines."})]});export{o as default};
