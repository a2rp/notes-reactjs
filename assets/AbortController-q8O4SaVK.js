import{j as e}from"./index-wTxrXa3i.js";import{S as r}from"./styled-62D9hIkN.js";const s=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"AbortController"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"AbortController"})," is a Web API that lets you ",e.jsx("b",{children:"cancel in-flight async work"})," like"," ",e.jsx(r.InlineCode,{children:"fetch()"})," or"," ",e.jsx(r.InlineCode,{children:"addEventListener()"}),". It exposes an"," ",e.jsx(r.InlineCode,{children:"AbortSignal"})," you pass to an API; call"," ",e.jsx(r.InlineCode,{children:"controller.abort(reason?)"})," to stop that work ",e.jsx("i",{children:"early"}),"."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Key definitions"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"AbortController:"})," an object you create with"," ",e.jsx(r.InlineCode,{children:"new AbortController()"}),". It has"," ",e.jsx(r.InlineCode,{children:"signal"})," and an"," ",e.jsx(r.InlineCode,{children:"abort()"})," method."]}),e.jsxs("li",{children:[e.jsx("b",{children:"AbortSignal:"})," read-only object found at"," ",e.jsx(r.InlineCode,{children:"controller.signal"}),"; you pass it into APIs like"," ",e.jsxs(r.InlineCode,{children:["fetch(url, ",'{ "{" }} signal {{ "}" }',")"]}),". When aborted, the API should stop and reject/clean up."]}),e.jsxs("li",{children:[e.jsx("b",{children:"AbortError:"})," a ",e.jsx("i",{children:"DOMException"})," name used by many APIs (e.g.,"," ",e.jsx(r.InlineCode,{children:"fetch"}),") to indicate the operation ended because it was aborted—not because it truly failed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"In-flight request:"})," a network request currently running (not yet resolved/rejected)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cancellation:"})," intentionally terminating an async operation before completion."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotent action:"})," safe to run multiple times without changing the outcome; good target for retries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Race condition:"})," when the order of async completions changes the result (e.g., slow response overwrites a newer one). Aborting previous requests helps prevent this."]})]})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Basic usage with ",e.jsx("code",{children:"fetch()"})]}),e.jsx(r.Pre,{children:`const controller = new AbortController();
const { signal } = controller;

fetch("/api/data", { signal })
  .then(r => r.json())
  .then(data => console.log("data:", data))
  .catch(err => {
    if (err.name === "AbortError") {
      // expected: we aborted on purpose
      return;
    }
    // real error handling
    console.error(err);
  });

// somewhere later...
controller.abort("user navigated away"); // optional reason (string, Error, etc.)`}),e.jsxs(r.Small,{children:["If the signal is already aborted when calling ",e.jsx(r.InlineCode,{children:"fetch"}),", it rejects immediately with ",e.jsx(r.InlineCode,{children:"AbortError"}),"."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"React pattern: cancel on unmount or dependency change"}),e.jsx(r.Pre,{children:`function useUser(userId) {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  React.useEffect(() => {
    if (!userId) return;

    const controller = new AbortController();
    setState({ status: "loading", data: null, error: null });

    fetch(\`/api/users/\${userId}\`, { signal: controller.signal })
      .then(r => r.json())
      .then(data => setState({ status: "success", data, error: null }))
      .catch(err => {
        if (err.name === "AbortError") return; // ignore controlled cancellation
        setState({ status: "error", data: null, error: err });
      });

    // Cleanup aborts any in-flight request when userId changes or component unmounts
    return () => controller.abort("effect cleanup");
  }, [userId]);

  return state; // { status, data, error }
}`}),e.jsxs(r.Small,{children:["This prevents ",e.jsx("i",{children:"stale"})," responses from older ",e.jsx(r.InlineCode,{children:"userId"})," overwriting newer state and avoids work after unmount (memory leaks)."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Typeahead pattern: cancel previous request when starting a new one"}),e.jsx(r.Pre,{children:`function useCancelableSearch() {
  const ctrlRef = React.useRef(null);
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  async function search(q) {
    // Abort any previous in-flight request
    ctrlRef.current?.abort("new search");
    const controller = new AbortController();
    ctrlRef.current = controller;

    setState({ status: "loading", data: null, error: null });
    try {
      const res = await fetch(\`/api/search?q=\${encodeURIComponent(q)}\`, {
        signal: controller.signal,
      });
      const data = await res.json();
      setState({ status: "success", data, error: null });
    } catch (err) {
      if (err.name === "AbortError") return;
      setState({ status: "error", data: null, error: err });
    } finally {
      // clear only if this was the active controller
      if (ctrlRef.current === controller) ctrlRef.current = null;
    }
  }

  return { ...state, search };
}`}),e.jsx(r.Small,{children:"Each new query cancels the previous one, eliminating race conditions where older responses arrive last."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Timeouts with AbortController"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Modern API:"})," ",e.jsx(r.InlineCode,{children:"AbortSignal.timeout(ms)"})," makes a signal that aborts after a given time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback:"})," create a controller and call ",e.jsx(r.InlineCode,{children:"abort()"})," via"," ",e.jsx(r.InlineCode,{children:"setTimeout"}),"."]})]}),e.jsx(r.Pre,{children:`// Modern (where supported)
const signal = AbortSignal.timeout(3000);
const res = await fetch("/api/slow", { signal });

// Fallback
const controller = new AbortController();
const id = setTimeout(() => controller.abort(new Error("timeout")), 3000);
try {
  const res = await fetch("/api/slow", { signal: controller.signal });
  // ...
} finally {
  clearTimeout(id);
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Abort multiple tasks together"}),e.jsx(r.Pre,{children:`const controller = new AbortController();
const { signal } = controller;

const p1 = fetch("/api/a", { signal });
const p2 = fetch("/api/b", { signal });
const p3 = fetch("/api/c", { signal });

controller.abort("navigate away"); // cancels all three`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Auto-remove event listeners with a signal"}),e.jsx(r.Pre,{children:`const controller = new AbortController();
const { signal } = controller;

function onMove(e) { /* ... */ }

window.addEventListener("pointermove", onMove, { signal });
// later:
controller.abort(); // removes the listener automatically`}),e.jsxs(r.Small,{children:[e.jsx(r.InlineCode,{children:"addEventListener"})," supports a"," ",e.jsx(r.InlineCode,{children:"signal"})," option; when aborted, the listener is removed. This prevents leaks."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Error handling: distinguish abort from failures"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Check ",e.jsx(r.InlineCode,{children:'err.name === "AbortError"'})," to silently ignore controlled cancellations."]}),e.jsx("li",{children:"Treat network/HTTP problems as real errors; surface them to users or retry if appropriate (idempotent GET)."}),e.jsxs("li",{children:["Once aborted, a controller ",e.jsx("b",{children:"can't be reused"}),"; create a new one for the next request."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," create a fresh controller per request or per logical batch of work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," abort in ",e.jsx(r.InlineCode,{children:"useEffect"})," cleanup to stop stale work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use it to avoid race conditions in typeahead, tab switches, or route changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," swallow all errors—only ignore ",e.jsx(r.InlineCode,{children:"AbortError"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate UI after abort; the request result is no longer relevant."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary (quick reference)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Abort:"})," to stop an async operation early."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Signal:"})," an object that represents “should we stop?” state, passed into APIs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reason:"})," optional value passed to ",e.jsx(r.InlineCode,{children:"abort()"})," for context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"AbortError:"})," a special error name to indicate controlled cancellation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cleanup:"})," code that runs to remove listeners/stop timers/cancel requests."]})]})]}),e.jsxs(r.Callout,{children:["Summary: Use ",e.jsx("b",{children:"AbortController"})," to cancel work you no longer need—on route changes, tab switches, or new queries. Always pass the signal, abort in cleanup, and treat AbortError as a normal control-flow event."]})]});export{s as default};
