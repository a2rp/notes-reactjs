import{j as e}from"./index-CEhT6f_w.js";import{S as t}from"./styled-C41n-7rC.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Retries"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Retry"})," means trying an operation again after it failed. In UIs, we usually retry"," ",e.jsx("i",{children:"network requests"})," to handle temporary problems (flaky internet, overloaded servers, transient 5xx). Good retry logic is ",e.jsx("b",{children:"bounded"})," (max attempts), uses"," ",e.jsx("b",{children:"backoff"})," (wait between attempts), adds ",e.jsx("b",{children:"jitter"})," (randomness), and respects"," ",e.jsx("b",{children:"idempotency"})," (safe to do again)."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Definition & Purpose"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Retry:"})," Re-running a failed operation in hopes it succeeds on a later attempt."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Purpose:"})," Improve robustness against ",e.jsx("i",{children:"transient"})," failures (e.g., 502/503/504, timeouts, DNS hiccups)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," Typically only for ",e.jsx("i",{children:"reads"})," (GET) or ",e.jsx("i",{children:"idempotent"})," writes, unless your backend supports idempotency keys."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Terms (plain English)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Transient error:"})," Temporary problem likely to succeed if tried again (e.g., server busy)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotent:"})," Doing the same request multiple times has the same effect as doing it once (e.g., GET is idempotent; POST usually is not)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backoff:"})," Waiting before the next attempt (e.g., 300ms, then 600ms, then 1200ms...)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Exponential backoff:"})," Increase the wait time exponentially after each failure (x2, x3...)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Jitter:"}),' Add randomness to backoff to avoid synchronized "thundering herd."']}),e.jsxs("li",{children:[e.jsx("b",{children:"Max attempts:"})," Hard limit on how many times you'll try (e.g., 3 attempts total)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retryable error:"})," An error you've classified as safe to retry (e.g., 502, 503, 504, 429, network failure)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Non-retryable error:"})," Should not be retried (e.g., 400, 401, 403, 404, invalid input)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Timeout:"})," Give up waiting after a duration (paired with ",e.jsx(t.InlineCode,{children:"AbortController"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deduping:"})," Avoid sending the same in-flight request twice (cache or key-based guard)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Circuit breaker:"})," Temporarily stop calling a failing service to protect your app; try again later."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"When to Retry vs. When Not To"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Retry"})," on: network errors, timeouts, HTTP ",e.jsx("b",{children:"5xx"}),", ",e.jsx("b",{children:"429"})," (Too Many Requests), sometimes ",e.jsx("b",{children:"408"})," (Request Timeout)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't retry"})," on: ",e.jsx("b",{children:"4xx"})," like 400 (bad input), 401/403 (auth), 404 (missing). Fix the cause instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Writes (POST/PUT/PATCH/DELETE):"})," retry only if ",e.jsx("b",{children:"idempotent"})," (server supports idempotency keys) or you can safely detect duplicates."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Backoff Strategies (with Jitter)"}),e.jsx(t.Pre,{children:`// Exponential backoff with "full jitter":
// attempt: 1..N  | base: initial delay in ms (e.g., 300)
function backoffDelay(attempt, base = 300, factor = 2) {
  const exp = base * Math.pow(factor, attempt - 1);
  const jitter = Math.random() * exp;        // full jitter
  return jitter;                              // wait somewhere between 0..exp
}

// Optional: respect Retry-After (seconds) header from 429/503 responses
function retryAfterToMs(res) {
  const h = res.headers?.get?.("Retry-After");
  if (!h) return null;
  const n = Number(h);
  return Number.isFinite(n) ? n * 1000 : null;
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Why jitter?"})," If all clients wait the same durations, they'll stampede the server again. Jitter spreads them out."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Practical: ",e.jsx("code",{children:"fetchWithRetry"})]}),e.jsx(t.Pre,{children:`// A minimal, safe default implementation for GET/other idempotent calls.
async function fetchWithRetry(url, options = {}, retryOpts = {}) {
  const {
    attempts = 3,               // total attempts (1 initial + 2 retries)
    base = 300,                 // base backoff (ms)
    factor = 2,                 // exponential factor
    classify,                   // (res, error) => "retry" | "fail" | "success"
    timeoutMs = 8000,           // per-attempt timeout
  } = retryOpts;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort("timeout"), timeoutMs);

  try {
    for (let attempt = 1; attempt <= attempts; attempt++) {
      try {
        const res = await fetch(url, { ...options, signal: controller.signal });

        // Default classifier: retry on 429/5xx, success on 2xx/3xx, fail otherwise
        const decision = classify
          ? classify(res, null)
          : res.status >= 200 && res.status < 400
            ? "success"
            : [429, 500, 502, 503, 504].includes(res.status)
              ? "retry"
              : "fail";

        if (decision === "success") return res;
        if (decision === "fail" || attempt === attempts) throw res;

        // Wait before next attempt (Retry-After takes priority when present)
        const ra = retryAfterToMs(res);
        const delay = ra ?? backoffDelay(attempt, base, factor);
        await new Promise(r => setTimeout(r, delay));
        continue;
      } catch (err) {
        // Network/timeout errors are usually retryable
        const isAbort = (err?.name === "AbortError") || ("" + err).includes("timeout");
        const isNetwork = err instanceof TypeError; // fetch network failure
        const shouldRetry = isAbort || isNetwork;

        if (!shouldRetry || attempt === attempts) throw err;

        const delay = backoffDelay(attempt, base, factor);
        await new Promise(r => setTimeout(r, delay));
      }
    }
  } finally {
    clearTimeout(timer);
  }
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Timeouts & cancellation:"})," Each attempt uses ",e.jsx(t.InlineCode,{children:"AbortController"}),". You can also pass your own ",e.jsx(t.InlineCode,{children:"signal"})," via ",e.jsx(t.InlineCode,{children:"options"})," for user-initiated cancel."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Usage Examples"}),e.jsx(t.Pre,{children:`// GET (safe by default)
const res = await fetchWithRetry("/api/products?limit=50");
const data = await res.json();

// Custom classification (treat 409 as retryable only if body says "try-later")
const res2 = await fetchWithRetry("/api/process", {}, {
  attempts: 4,
  timeoutMs: 10000,
  classify: async (res) => {
    if (res.ok) return "success";
    if ([502, 503, 504, 429].includes(res.status)) return "retry";
    if (res.status === 409) {
      const body = await res.clone().json().catch(() => ({}));
      return body?.temporary ? "retry" : "fail";
    }
    return "fail";
  }
});

// POST (only if idempotent!)
// Use server-supported idempotency keys to make POST safe to retry.
const idempotencyKey = crypto.randomUUID();
const res3 = await fetchWithRetry("/api/charge", {
  method: "POST",
  headers: { "Content-Type": "application/json", "Idempotency-Key": idempotencyKey },
  body: JSON.stringify({ amount: 4999, currency: "INR" })
}, { attempts: 3 });`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Idempotency key:"})," A unique key clients send so the server treats repeats as the same operation (prevents double-charges). Your backend must implement it."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"UI Patterns"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Auto-retry + manual retry:"}),' Try a few times automatically, then show a "Try again" button.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Disable while in-flight:"})," Prevent spam clicks; show a spinner and remaining attempts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Progressive fallback:"})," Small skeleton → partial cached data → final data when ready."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Explain errors:"}),' Show human text (e.g., "Server is busy, retrying…"). Include a short tech reason for dev tools.']})]}),e.jsx(t.Pre,{children:`// Sketch: simple manual retry pattern (React)
function LoadUsers() {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  async function load() {
    setState({ status: "loading", data: null, error: null });
    try {
      const res = await fetchWithRetry("/api/users", {}, { attempts: 3 });
      const json = await res.json();
      setState({ status: "success", data: json, error: null });
    } catch (e) {
      setState({ status: "error", data: null, error: e });
    }
  }

  React.useEffect(() => { load(); }, []);

  if (state.status === "loading") return <p>Loading… (auto-retrying if needed)</p>;
  if (state.status === "error") return <button onClick={load}>Try again</button>;
  return <pre>{JSON.stringify(state.data, null, 2)}</pre>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," cap attempts and use exponential backoff with jitter."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," respect ",e.jsx(t.InlineCode,{children:"Retry-After"})," headers when present."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," retry only ",e.jsx("b",{children:"retryable"})," errors; fail fast for invalid inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," make writes idempotent before retrying (idempotency keys or server-side safeguards)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," retry blindly — you can amplify load during an outage."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget timeouts and user cancellation (e.g., close modal / navigate away)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," show cryptic errors; guide the user with a helpful message and a retry option."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Throttling:"})," Server intentionally limits your rate (HTTP 429). Back off and retry later."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rate limiting:"})," Policy that caps how many requests you can make in a window."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Circuit breaker:"}),' Pattern that "opens" after repeated failures to stop sending requests, then "half-opens" to test recovery.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Deduping:"})," Prevent duplicate in-flight requests by keying them and sharing the same promise."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Retry only when it's safe and likely to help. Use bounded attempts, exponential backoff with jitter, honor ",e.jsx("i",{children:"Retry-After"}),", make writes idempotent, and always include a clear path for the user to try again."]})]});export{i as default};
