import{j as e}from"./index-DqLKwkYK.js";import{S as t}from"./styled-bitiOoJc.js";const n=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Anti-Pattern: Effect for Fetching"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Effect for Fetching"})," refers to the habit of performing network requests inside"," ",e.jsx(t.InlineCode,{children:"useEffect"})," during component mount. While it works, it frequently creates ",e.jsx("i",{children:"race conditions"}),", duplicate requests under ",e.jsx("i",{children:"Strict Mode"}),", tangled ",e.jsx("i",{children:"loading/error state"})," handling, and no ",e.jsx("i",{children:"caching"}),". Prefer dedicated data fetching patterns."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Effect (useEffect):"})," A hook for synchronizing a component with an external system (DOM, subscriptions, timers, network). Effects run ",e.jsx("i",{children:"after"})," render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Race condition:"})," Multiple async operations complete in an unexpected order, so a newer result can be overwritten by an older one."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React Strict Mode (dev):"})," React intentionally mounts, unmounts, and re-mounts components to help surface side-effect bugs. This can trigger ",e.jsx("i",{children:"duplicate"})," fetches when done in effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotent:"})," An operation that can be performed multiple times with the same result and without unintended side effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cancellation:"})," Stopping an ongoing async operation (e.g., via ",e.jsx(t.InlineCode,{children:"AbortController"}),") so stale results don't update state after unmount."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Why Using Effects for Fetching Causes Pain"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Duplicate requests:"})," Strict Mode double-invokes effects in development, often hitting your API twice."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Races & stale data:"})," Switching params quickly can let an older request finish last and overwrite newer data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Manual state machine:"})," You build ",e.jsx("i",{children:"loading"}),", ",e.jsx("i",{children:"error"}),", ",e.jsx("i",{children:"retry"}),", and ",e.jsx("i",{children:"cache"})," logic by hand."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tight coupling:"})," Networking logic ends up mixed with rendering code; testing gets harder."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"The Common Approach (and Its Problems)"}),e.jsx(t.Pre,{children:`function Users({ orgId }) {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  React.useEffect(() => {
    let cancelled = false;                  // manual cancellation guard
    setState({ status: "loading", data: null, error: null });

    fetch(\`/api/orgs/\${orgId}/users\`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)))
      .then(data => { if (!cancelled) setState({ status: "success", data, error: null }); })
      .catch(error => { if (!cancelled) setState({ status: "error", data: null, error }); });

    return () => { cancelled = true; };     // avoid setState after unmount
  }, [orgId]);

  // ...render based on state.status
}`}),e.jsx(t.Small,{children:"This works but you're hand-rolling a fragile state machine, with potential double fetches under Strict Mode, no cache, and a DIY retry strategy."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Better Patterns (Use These Instead)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Event-driven fetching:"})," Fetch in response to a user interaction (e.g., button click or form submit), not automatically on mount."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Route loaders (React Router):"})," Fetch data ",e.jsx("i",{children:"outside"})," the component in the router layer, pass results as props. You get co-located data and URL, fewer effect footguns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Data libraries:"})," Use a library (e.g., TanStack Query/SWR) for cache, retries, dedupe, and status handling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense data APIs:"})," Where available in your setup, use data APIs designed for Suspense to keep UI declarative."]})]}),e.jsx(t.Pre,{children:`// 4a) Event-driven: explicit fetch on user intent
function SearchUsers() {
  const [q, setQ] = React.useState("");
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  async function onSubmit(e) {
    e.preventDefault();                       // user-driven, not auto on mount
    setState({ status: "loading", data: null, error: null });
    try {
      const res = await fetch(\`/api/users?q=\${encodeURIComponent(q)}\`);
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setState({ status: "success", data, error: null });
    } catch (error) {
      setState({ status: "error", data: null, error });
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search users..." />
      <button type="submit">Search</button>
      {/* render state */}
    </form>
  );
}
`}),e.jsx(t.Pre,{children:`// 4b) React Router loader (conceptual example)
/*
export async function usersLoader({ params }) {
  const res = await fetch(\`/api/orgs/\${params.orgId}/users\`);
  if (!res.ok) throw new Response("Not Found", { status: 404 });
  return res.json(); // returned value becomes route data
}
*/
`}),e.jsx(t.Small,{children:"With loaders, components read data directly from the router context; there's no effect to write or maintain."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"If You Must Use an Effect, Do It Defensively"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Abort on unmount:"})," Use ",e.jsx(t.InlineCode,{children:"AbortController"})," to cancel in-flight requests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Guard against races:"})," Track the latest request; ignore results from older requests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable dependencies:"})," Keep the dependency array minimal and inputs stable to avoid accidental refires."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotence:"})," Make effect logic safe to run more than once (anticipate Strict Mode)."]})]}),e.jsx(t.Pre,{children:`function Products({ category }) {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  React.useEffect(() => {
    const ctrl = new AbortController();
    let reqId = Math.random();                   // track "this" request
    setState({ status: "loading", data: null, error: null });

    (async () => {
      try {
        const res = await fetch(\`/api/products?cat=\${category}\`, { signal: ctrl.signal });
        if (!res.ok) throw new Error("HTTP " + res.status);
        const data = await res.json();
        // simple "is latest" guard by closure:
        if (!ctrl.signal.aborted) {
          setState({ status: "success", data, error: null });
        }
      } catch (error) {
        if (!ctrl.signal.aborted) {
          setState({ status: "error", data: null, error });
        }
      }
    })();

    return () => ctrl.abort();                    // cancel on unmount/param change
  }, [category]);

  // render...
}
`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer user-intent (submit/click) or router loaders for fetching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use data libraries to get caching, retries, and dedupe out of the box."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," cancel in-flight requests and guard against races if you use effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix rendering with networking; keep responsibilities separate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rebuild a data cache manually in component state if a library can do it better."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"FAQ & Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"“Is fetching in an effect always wrong?”"})," No. It's acceptable for small demos or when other infrastructure isn't available. It becomes a problem as complexity grows."]}),e.jsxs("li",{children:[e.jsx("b",{children:"“Why does my effect fetch twice in dev?”"})," Strict Mode double-mounts to reveal unsafe side effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"“What is a stale closure?”"})," A function capturing old state/props, so it reads outdated values when it runs later."]}),e.jsxs("li",{children:[e.jsx("b",{children:"“What is deduplication?”"})," Automatically preventing the same request from running multiple times simultaneously."]})]})]}),e.jsx(t.Callout,{children:"Takeaway: Fetching in effects scales poorly. Reach for event-driven flows, route loaders, or a data library for robust apps. If you remain in effects, design for cancellation, idempotence, and race safety."})]});export{n as default};
