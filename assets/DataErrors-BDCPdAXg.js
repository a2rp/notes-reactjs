import{j as e}from"./index-DqLKwkYK.js";import{S as r}from"./styled-DouSOhtf.js";const i=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Data Errors"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Data errors"})," are problems fetching, parsing, validating, or updating data (APIs, storage, caches). They are different from ",e.jsx("i",{children:"render-time"})," errors (caught by Error Boundaries). Handle them by detecting failure, showing a clear UI state, and offering recovery (retry, edit, back)."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definitions"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Data error:"})," Any failure while ",e.jsx("em",{children:"communicating with"})," or ",e.jsx("em",{children:"processing"})," data sources (network down, 4xx/5xx, invalid JSON, schema mismatch, timeouts, conflicts)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Runtime (render) error:"})," A bug that throws while rendering React components. These are caught by",e.jsx(r.InlineCode,{children:"Error Boundaries"})," (separate topic)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Empty state:"})," A valid result with no items (not an error). Needs a distinct UI (“No results”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback UI:"})," A specific screen/section shown when a data error happens (message + actions)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retry:"})," Re-attempting a failed operation, often with ",e.jsx("i",{children:"exponential backoff"})," and ",e.jsx("i",{children:"jitter"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotency:"})," Doing the same request multiple times yields the same effect (important when retrying writes)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Common Types of Data Errors"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Network failures:"})," offline, DNS issues, TLS errors, connection reset."]}),e.jsxs("li",{children:[e.jsx("b",{children:"HTTP errors:"})," ",e.jsx("i",{children:"4xx"})," (client-side: 400, 401, 403, 404, 422) and ",e.jsx("i",{children:"5xx"})," (server-side: 500, 502, 503, 504)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Protocol/format errors:"})," invalid JSON, unexpected content-type, deserialization failures."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Validation errors:"})," response shape doesn't match your expected schema; field-level server errors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Timeouts:"})," request takes too long; cancellations via ",e.jsx(r.InlineCode,{children:"AbortController"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Concurrency/conflicts:"})," write conflicts (409), ETag/version mismatch."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Permission/auth:"})," unauthenticated (401) or unauthorized (403)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Detecting & Normalizing Errors"}),e.jsx(r.Pre,{children:`// A tiny helper that returns a normalized "result" instead of throwing
async function getJSON(url, { signal } = {}) {
  try {
    const res = await fetch(url, { signal, headers: { Accept: "application/json" } });
    const contentType = res.headers.get("content-type") || "";
    const isJSON = contentType.includes("application/json");
    const body = isJSON ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      return {
        ok: false,
        error: {
          kind: "http",
          status: res.status,
          message: (body && body.message) || res.statusText || "Request failed",
        },
      };
    }
    if (!isJSON || body == null) {
      return { ok: false, error: { kind: "format", message: "Invalid or empty JSON" } };
    }
    return { ok: true, data: body };
  } catch (e) {
    if (e.name === "AbortError") {
      return { ok: false, error: { kind: "timeout", message: "Request was aborted/timeout" } };
    }
    return { ok: false, error: { kind: "network", message: e.message || "Network error" } };
  }
}`}),e.jsx(r.Small,{children:"Normalize errors into a consistent shape so the UI can render a clear message and actions."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"UI States to Design"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Loading:"})," skeletons/spinners; avoid layout shift."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Success:"})," show data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Empty:"})," “No items” with a call-to-action."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error:"})," friendly summary + actions (Retry, Edit input, Back, Contact support)."]})]}),e.jsx(r.Pre,{children:`function UsersList() {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  React.useEffect(() => {
    const c = new AbortController();
    setState({ status: "loading", data: null, error: null });
    getJSON("/api/users", { signal: c.signal }).then((res) => {
      if (res.ok) setState({ status: "success", data: res.data, error: null });
      else setState({ status: "error", data: null, error: res.error });
    });
    return () => c.abort();
  }, []);

  if (state.status === "loading") return <div>Loading…</div>;
  if (state.status === "error") {
    return (
      <div role="alert">
        <p>Couldn't load users: {state.error.message}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }
  if (state.data.length === 0) return <div>No users yet</div>;
  return <ul>{state.data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Timeouts, Aborts & Retries"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Timeout:"})," wrap ",e.jsx(r.InlineCode,{children:"AbortController"}),"; if it fires, show a specific message (“Timed out”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retry with backoff:"})," for transient errors (5xx, network). Use exponential backoff + jitter. Avoid retrying on 4xx (except 429)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotent writes:"})," safe to retry (e.g., PUT with an idempotency key); non-idempotent writes need care."]})]}),e.jsx(r.Pre,{children:`function withTimeout(ms, controller) {
  const id = setTimeout(() => controller.abort(), ms);
  return () => clearTimeout(id);
}

async function fetchWithRetry(url, { attempts = 3, baseDelay = 300 } = {}) {
  let n = 0;
  while (n < attempts) {
    const c = new AbortController();
    const clear = withTimeout(8000, c); // 8s timeout
    const res = await getJSON(url, { signal: c.signal });
    clear();

    if (res.ok) return res;
    const transient = res.error.kind === "network" || res.error.kind === "timeout" || (res.error.kind === "http" && res.error.status >= 500);
    if (!transient) return res;

    n++;
    const jitter = Math.random() * 100;
    const delay = Math.pow(2, n - 1) * baseDelay + jitter;
    await new Promise(r => setTimeout(r, delay));
  }
  return { ok: false, error: { kind: "retry", message: "Gave up after retries" } };
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Validation & Schema Checking"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Schema validation:"})," ensure response has expected fields/types before using it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Graceful degradation:"})," tolerate extra fields, but fail clearly if required fields are missing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Field errors:"})," show errors near the fields; keep a page-level summary for screen readers."]})]}),e.jsx(r.Pre,{children:`function validateUserList(json) {
  if (!Array.isArray(json)) return { ok: false, message: "Expected an array" };
  for (const u of json) {
    if (typeof u.id !== "string" && typeof u.id !== "number") return { ok: false, message: "Invalid id" };
    if (typeof u.name !== "string") return { ok: false, message: "Invalid name" };
  }
  return { ok: true, data: json };
}

async function loadValidatedUsers() {
  const res = await getJSON("/api/users");
  if (!res.ok) return res;
  const v = validateUserList(res.data);
  return v.ok ? { ok: true, data: v.data } : { ok: false, error: { kind: "schema", message: v.message } };
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Optimistic Updates & Rollback"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic update:"})," update UI first, then confirm with server; if it fails, roll back and show a message."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Conflict handling:"})," for 409/412, refetch latest and let the user resolve or re-apply their change."]})]}),e.jsx(r.Pre,{children:`function useOptimisticLike(initialLiked, id) {
  const [liked, setLiked] = React.useState(initialLiked);
  async function toggle() {
    const prev = liked;
    setLiked(!prev); // optimistic
    const res = await fetchWithRetry('/api/like/' + id, { attempts: 1 });
    if (!res.ok) {
      setLiked(prev); // rollback
      alert("Could not save your like. Please try again.");
    }
  }
  return { liked, toggle };
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Accessibility & UX Tips"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(r.InlineCode,{children:'role="status"'})," for loading and"," ",e.jsx(r.InlineCode,{children:'role="alert"'})," for errors so screen readers announce them."]}),e.jsx("li",{children:"Keep error messages human, short, and actionable. Offer a clear next step."}),e.jsx("li",{children:"Preserve user input on error; don't wipe forms."}),e.jsx("li",{children:"Prefer inline errors near the cause; use toasts for transient notices only."})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Logging & Monitoring (overview)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Client logs:"})," capture error kind, status, URL, user action, correlation id."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Privacy:"})," avoid sending PII; redact sensitive fields."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Alerting:"})," aggregate and alert on spikes (e.g., 5xx rate, timeouts)."]})]}),e.jsx(r.Pre,{children:`function logError(error, context = {}) {
  // Example: send to your logging endpoint or console in dev
  if (process.env.NODE_ENV !== "production") {
    console.error("[data-error]", { error, context });
  }
  // fetch('/logs', { method: 'POST', body: JSON.stringify({ error, context }) });
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do / Don't & Checklist"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," distinguish empty vs error states."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show actionable fallback UI (Retry, Change filters, Back)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," retry transient failures with backoff; avoid retry loops for 4xx."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," time out requests and allow cancel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," swallow errors silently; log with context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block the whole app for a single widget failure; scope errors."]})]})]}),e.jsx(r.Callout,{children:"Summary: Treat data errors as first-class states. Detect precisely, normalize errors, present clear fallback UI, and provide safe recovery paths (retry, edit, rollback, back)."})]});export{i as default};
