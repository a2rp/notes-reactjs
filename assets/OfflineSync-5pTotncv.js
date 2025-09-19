import{j as e}from"./index-t22nWg0v.js";import{S as n}from"./styled-MzHhj4va.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Offline Sync"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Offline Sync"})," means your app keeps working without internet and then",e.jsx("i",{children:" synchronizes"})," changes when the connection returns. The core idea is to read from a local cache while offline and queue writes for later, achieving ",e.jsx("b",{children:"eventual consistency"}),"."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Concepts & Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Offline-first:"})," design so the app is usable without network from the start."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Local Cache:"})," data stored on device (e.g., ",e.jsx(n.InlineCode,{children:"Cache Storage"})," or ",e.jsx(n.InlineCode,{children:"IndexedDB"}),") used to render UI when offline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Outbox / Write Queue:"})," a local list of pending writes (create/update/delete) to send when the app is online again."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Eventual Consistency:"})," the system converges to the correct state after syncing; short-term differences are expected."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic Update:"})," update UI immediately assuming the server will accept the change; roll back on failure."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotency:"})," the same operation can be safely retried without unintended effects (e.g., by using ",e.jsx(n.InlineCode,{children:"requestId"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Conflict Resolution:"})," rules to merge client/server changes (e.g., “last-write-wins”, “server-wins”, or custom merge)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Building Blocks"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker (SW):"})," a background script that can intercept requests and serve cached responses."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache Storage:"})," key-value store for HTTP responses (great for GETs and static assets)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"IndexedDB:"})," structured client DB for app data and queues; use a tiny wrapper in real apps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Background Sync:"})," SW feature to retry when connectivity returns (limited support on some browsers)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Network Status:"})," ",e.jsx(n.InlineCode,{children:"navigator.onLine"})," and ",e.jsx(n.InlineCode,{children:"online/offline"})," events to react to connectivity changes."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Minimal Viable Offline (MVO)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Read:"})," serve list/detail pages from Cache/IndexedDB when offline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Write:"})," push user actions to an ",e.jsx("b",{children:"outbox"}),"; show optimistic UI; flush when back online."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retry:"})," exponential backoff, deduplicate by ",e.jsx(n.InlineCode,{children:"requestId"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Hook: Detect Network Status"}),e.jsx(n.Pre,{children:`// useNetworkStatus: track online/offline
export function useNetworkStatus() {
  const [online, setOnline] = React.useState(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );

  React.useEffect(() => {
    function goOnline() { setOnline(true); }
    function goOffline() { setOnline(false); }
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  return online; // boolean
}`}),e.jsx(n.Small,{children:"Use this to toggle UI states like “Syncing…/Offline mode”."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Service Worker: Cache Strategy"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Network-first with cache fallback:"})," try network; if it fails, return cache."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale-while-revalidate:"})," return cache immediately, refresh in background for next time."]})]}),e.jsx(n.Pre,{children:`// sw.js (conceptual example)
// Install: pre-cache core assets
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open("app-v1").then(cache => cache.addAll([
    "/", "/index.html", "/assets/app.css", "/assets/app.js"
  ])));
});

// Fetch: network-first for JSON APIs, cache-first for static
self.addEventListener("fetch", (e) => {
  const req = e.request;
  const url = new URL(req.url);

  if (url.pathname.startsWith("/api/")) {
    // Network-first for data
    e.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        const cache = await caches.open("api-v1");
        cache.put(req, fresh.clone());
        return fresh;
      } catch {
        const cached = await caches.match(req);
        if (cached) return cached;
        return new Response(JSON.stringify({ ok:false, offline:true }), { status: 503 });
      }
    })());
    return;
  }

  // Static assets: cache-first
  e.respondWith((async () => {
    const cached = await caches.match(req);
    return cached || fetch(req);
  })());
});`}),e.jsx(n.Small,{children:"Register the SW in your app entry once. Real apps use Workbox or a bundler plugin to manage revisions."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Outbox Pattern: Queue Writes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Store pending operations in IndexedDB: ",e.jsx("i",{children:"{ id, url, method, body, headers, attempt }"}),"."]}),e.jsxs("li",{children:["When online, flush the queue with ",e.jsx("b",{children:"backoff"})," and ",e.jsx("b",{children:"idempotency"})," (send a unique ",e.jsx(n.InlineCode,{children:"X-Request-Id"}),")."]})]}),e.jsx(n.Pre,{children:`// useOutbox (conceptual)
// replace idb access with your preferred tiny wrapper
export function useOutbox() {
  const online = useNetworkStatus();

  // enqueue: optimistic update first, then persist to outbox
  async function enqueue(op) {
    // optimistic UI (e.g., setState)
    // await idb.add("outbox", { ...op, id: crypto.randomUUID(), attempt: 0 });
  }

  // flush: try sending all pending ops
  const flush = React.useCallback(async () => {
    if (!online) return;
    // const ops = await idb.getAll("outbox");
    // for (const op of ops) {
    //   try {
    //     const res = await fetch(op.url, {
    //       method: op.method,
    //       headers: { "Content-Type": "application/json", "X-Request-Id": op.id, ...op.headers },
    //       body: op.body ? JSON.stringify(op.body) : undefined,
    //     });
    //     if (!res.ok) throw new Error("server-error");
    //     // await idb.delete("outbox", op.id); // success
    //   } catch (err) {
    //     // await idb.update("outbox", op.id, { attempt: op.attempt + 1 });
    //     // apply exponential backoff, stop at a max attempt
    //   }
    // }
  }, [online]);

  React.useEffect(() => {
    if (online) { flush(); }
  }, [online, flush]);

  return { enqueue, flush, online };
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Optimistic UI Example"}),e.jsx(n.Pre,{children:`// Example: adding a todo while offline
function Todos() {
  const [todos, setTodos] = React.useState([]);
  const { enqueue, online } = useOutbox();

  async function addTodo(title) {
    // 1) optimistic: update UI immediately
    const tempId = crypto.randomUUID();
    setTodos(prev => [{ id: tempId, title, optimistic: true }, ...prev]);

    // 2) enqueue write for server
    await enqueue({
      url: "/api/todos",
      method: "POST",
      body: { title, clientId: tempId }
    });
  }

  return (
    <>
      <button onClick={() => addTodo("Read a book")}>
        Add Todo {online ? "" : "(queued)"}
      </button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            {t.title} {t.optimistic ? <em>(syncing)</em> : null}
          </li>
        ))}
      </ul>
    </>
  );
}`}),e.jsx(n.Small,{children:"Mark optimistic items so users see that sync is pending."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Conflict Resolution"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Server-wins:"})," server state overwrites client (simple, but can lose local edits)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Last-write-wins (LWW):"})," compare timestamps or versions; newest change wins."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Merge:"})," field-level or CRDTs for collaborative editing; more complex, fewer conflicts."]})]}),e.jsx(n.Pre,{children:`// Example: LWW merge
function resolve(clientDoc, serverDoc) {
  return (serverDoc.updatedAt >= clientDoc.updatedAt) ? serverDoc : clientDoc;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Patterns & Best Practices"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SWR (stale-while-revalidate):"})," read cached data instantly, then fetch to refresh."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Versioning:"})," include ",e.jsx(n.InlineCode,{children:"etag"})," or ",e.jsx(n.InlineCode,{children:"version"})," to detect stale writes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backoff & jitter:"})," retry after 1s, 2s, 4s… with randomness to avoid thundering herds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deduplication:"})," use ",e.jsx(n.InlineCode,{children:"X-Request-Id"})," so repeated POSTs don't create duplicates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Partial sync:"})," batch small ops; resume from last checkpoint with cursors or timestamps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Security:"})," protect tokens in SW fetches; handle auth expiry while offline (graceful errors)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Testing & Tooling"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Use DevTools “Offline” checkbox to simulate no-network."}),e.jsx("li",{children:"Throttle to “Slow 3G” to test flaky networks and retries."}),e.jsx("li",{children:"Clear specific caches in Application → Storage to verify cache logic."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show clear offline indicators and queued actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep writes idempotent and retriable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," store large JSON in localStorage (use IndexedDB for MBs of data)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block UI if sync fails; keep queueing and retrying in background."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker (SW):"})," background script that can intercept and respond to network requests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache Storage:"})," browser storage for HTTP responses; accessed from SW or window."]}),e.jsxs("li",{children:[e.jsx("b",{children:"IndexedDB:"})," low-level key-value DB for structured data; suitable for queues and datasets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Background Sync:"})," SW API to retry after connectivity is restored (limited browser support)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backoff:"})," increasing delay between retries to reduce server load and collisions."]})]})]}),e.jsxs(n.Callout,{children:["Summary: implement ",e.jsx("b",{children:"cache for reads"})," and an ",e.jsx("b",{children:"outbox for writes"}),", detect network status, retry with idempotency and backoff, and resolve conflicts predictably. That's a robust Offline Sync foundation."]})]});export{t as default};
