import{j as e}from"./index-DXTGIo8z.js";import{S as r}from"./styled-BCNq78HO.js";const i=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Loading & Error States"}),e.jsxs(r.Lead,{children:["Almost every frontend fetches data. A great UX depends on handling the full lifecycle:",e.jsx("b",{children:" idle → loading → success → empty → error → retry"}),". This page explains the terms, anti-patterns, and battle-tested patterns for beginners."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Core Definitions"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Idle:"})," No request has started yet."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Loading (pending):"})," A request is in flight."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Success:"})," Data arrived and is usable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Empty state:"})," Success, but the data set is empty (e.g., 200 OK, items=[])."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error:"})," The request failed (network error, timeout) or the response is not acceptable (4xx/5xx, parse error)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retry:"})," A subsequent attempt after a failure, sometimes with backoff (wait a bit before trying again)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cancellation:"})," Intentionally stop a request that's no longer needed (e.g., user navigated away). In the browser, use ",e.jsx("code",{children:"AbortController"}),"."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Minimal State Model"}),e.jsx(r.Pre,{children:`// A simple "remote data" shape you can keep in component state
type RemoteData<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "empty" }
  | { status: "error"; error: Error };

`}),e.jsxs(r.Small,{children:["Keep remote status inside one object. Avoid multiple booleans that conflict (e.g., ",e.jsx("i",{children:"isLoading"})," and ",e.jsx("i",{children:"hasError"})," both true)."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Basic Fetch with All Branches"}),e.jsx(r.Pre,{children:`function Users() {
  const [remote, setRemote] = React.useState({ status: "idle" });

  React.useEffect(() => {
    let ignore = false;               // defensive guard against stale sets
    setRemote({ status: "loading" });

    fetch("/api/users")
      .then(async (r) => {
        if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
        const data = await r.json();
        if (ignore) return;
        if (Array.isArray(data) && data.length === 0) {
          setRemote({ status: "empty" });
        } else {
          setRemote({ status: "success", data });
        }
      })
      .catch((err) => {
        if (!ignore) setRemote({ status: "error", error: err });
      });

    return () => { ignore = true; };  // prevent state update after unmount
  }, []);

  if (remote.status === "loading") return <Spinner />;
  if (remote.status === "error") return <ErrorBox error={remote.error} />;
  if (remote.status === "empty") return <EmptyState message="No users yet" />;
  if (remote.status === "success") {
    return <ul>{remote.data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
  }
  return <button onClick={() => /* trigger */ null}>Load users</button>; // idle
}`}),e.jsxs(r.Small,{children:["Branch your UI by ",e.jsx("b",{children:"status"}),". Provide a dedicated empty state, not just a blank screen."]})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Cancellation with ",e.jsx("code",{children:"AbortController"})]}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," Stop wasted work and avoid racing responses when the user navigates or changes filters quickly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How:"})," Create a controller per request; pass ",e.jsx("code",{children:"signal"})," to ",e.jsx("code",{children:"fetch"}),"; call ",e.jsx("code",{children:"controller.abort()"})," in cleanup."]})]}),e.jsx(r.Pre,{children:`function SearchUsers({ query }) {
  const [remote, setRemote] = React.useState({ status: "idle" });

  React.useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    setRemote({ status: "loading" });

    fetch(\`/api/users?q=\${encodeURIComponent(query)}\`, { signal: controller.signal })
      .then(async (r) => {
        if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
        const data = await r.json();
        setRemote(Array.isArray(data) && data.length === 0
          ? { status: "empty" }
          : { status: "success", data });
      })
      .catch((err) => {
        // If aborted, err.name === "AbortError" — treat as non-error UI-wise
        if (err.name === "AbortError") return;
        setRemote({ status: "error", error: err });
      });

    return () => controller.abort();
  }, [query]);

  /* render remote... */
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Error Types & Messages"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Network error:"})," No response (offline, DNS, CORS). Message like “You appear to be offline.”"]}),e.jsxs("li",{children:[e.jsx("b",{children:"HTTP error:"})," Response with non-2xx status. Show user-safe text; log status code for diagnostics."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parse error:"})," Response body isn't valid JSON. Offer “Try again” and log."]}),e.jsxs("li",{children:[e.jsx("b",{children:"App error:"})," Server returned ","{ ok:false, message }",". Show ",e.jsx("i",{children:"message"})," if safe."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Validation error (422):"})," Highlight specific fields and helper texts."]})]}),e.jsx(r.Pre,{children:`function ErrorBox({ error }) {
  const msg = error?.userMessage || error?.message || "Something went wrong.";
  return <div role="alert" aria-live="polite" className="error">{msg}</div>;
}`}),e.jsxs(r.Small,{children:["Always provide an accessible ",e.jsx("b",{children:'role="alert"'})," container so screen readers announce errors."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Retry & Backoff (When Appropriate)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Automatic retry"})," is useful for flaky networks, but do not retry on user errors (e.g., 401/403/422)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Exponential backoff:"})," wait progressively longer between attempts (e.g., 300ms, 600ms, 1200ms…)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Give control:"})," show a “Retry” button for manual attempts."]})]}),e.jsx(r.Pre,{children:`async function fetchWithRetry(url, { attempts = 3, base = 300, ...opts } = {}) {
  let n = 0;
  while (true) {
    try {
      const r = await fetch(url, opts);
      if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
      return await r.json();
    } catch (err) {
      n++;
      const retriable = !(err.status >= 400 && err.status < 500); // don't retry 4xx (usually)
      if (n >= attempts || !retriable) throw err;
      const delay = base * 2 ** (n - 1);
      await new Promise(res => setTimeout(res, delay));
    }
  }
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Skeletons, Spinners & Placeholders"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Skeletons:"})," Show the structure of upcoming content; best for lists/cards."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spinner:"})," Simple “busy” indicator; fine for short waits < 500ms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Progress:"})," If you know progress (upload), show determinate progress bars."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Placeholders:"})," For images, reserve space to prevent layout shift."]})]}),e.jsx(r.Pre,{children:`function ListSkeleton({ rows = 5 }) {
  return (
    <ul aria-busy="true" aria-live="polite">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="skeleton-row" />
      ))}
    </ul>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Race Conditions & In-Flight Deduplication"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Race condition:"})," A slower old request overwrites state after a faster new request resolves."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fix:"})," cancel the old request, or gate state updates to the “latest request id”."]}),e.jsxs("li",{children:[e.jsx("b",{children:"In-flight dedupe:"})," If the same URL is requested again immediately, reuse the existing promise."]})]}),e.jsx(r.Pre,{children:`// Gate updates to the latest request
let reqId = 0;
function useLatestGuardedFetch(url) {
  const [remote, setRemote] = React.useState({ status: "idle" });

  React.useEffect(() => {
    const id = ++reqId;
    setRemote({ status: "loading" });
    fetch(url).then(async (r) => {
      if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
      const data = await r.json();
      if (id === reqId) setRemote(
        Array.isArray(data) && data.length === 0 ? { status: "empty" } : { status: "success", data }
      );
    }).catch((e) => { if (id === reqId) setRemote({ status: "error", error: e }); });
  }, [url]);

  return remote;
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Accessibility & UX Checklist"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Announce loading with ",e.jsx("code",{children:'aria-busy="true"'})," on regions that are updating."]}),e.jsxs("li",{children:["Use ",e.jsx("code",{children:'role="status"'})," or ",e.jsx("code",{children:'role="alert"'})," to announce success/errors."]}),e.jsx("li",{children:"Keep focus: after errors, focus the error heading/button so keyboard users aren't lost."}),e.jsx("li",{children:"Provide a visible retry button; keyboard and screen reader accessible."}),e.jsx("li",{children:"Use timeouts carefully; don't auto-dismiss critical errors without user acknowledgement."})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," model state with a single ",e.jsx("i",{children:"status"})," field; render per-branch UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show ",e.jsx("i",{children:"empty"})," separately from ",e.jsx("i",{children:"error"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," cancel or gate outdated requests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hide errors behind generic “Something went wrong” if you can show a helpful message."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block the entire screen for partial loads; prefer skeletons and progressively reveal content."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Backoff:"})," Increasing wait times between retries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dedupe:"})," Coalescing identical in-flight requests to one network call."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback UI:"})," A temporary UI shown while content is unavailable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic UI:"})," Temporarily show the expected outcome before the server confirms it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Toast:"})," Small transient alert for success/error that doesn't steal focus."]})]})]}),e.jsx(r.Callout,{children:"Summary: Represent loading clearly, handle empty vs error distinctly, cancel outdated requests, offer retries with sensible backoff, and announce changes accessibly. Users should always know what's happening and what they can do next."})]});export{i as default};
