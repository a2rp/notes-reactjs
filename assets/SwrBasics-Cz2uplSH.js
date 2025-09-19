import{j as e}from"./index-DqLKwkYK.js";import{S as i}from"./styled-dF7BRNCt.js";const n=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"SWR Basics (Stale-While-Revalidate)"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"SWR"})," is a tiny React data fetching library (by Vercel) implementing the"," ",e.jsx("b",{children:"stale-while-revalidate"})," strategy: first show ",e.jsx("i",{children:"stale"})," cached data instantly, then ",e.jsx("i",{children:"revalidate"})," in the background and update the UI with fresh data."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"What is SWR?"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stale-While-Revalidate (SWR):"})," a caching strategy where the app uses cached data immediately and simultaneously kicks off a re-fetch to refresh the cache. Once fresh data arrives, the UI updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SWR (library):"})," a React hook set—",e.jsx(i.InlineCode,{children:"useSWR"})," and helpers— that gives you caching, revalidation on focus/reconnect/interval, request deduping, and mutation APIs."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Terms (Glossary)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Cache:"})," in-memory store that holds previously fetched responses. SWR keeps a global cache (by default a Map) so the same data can be reused across components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache Key:"})," a unique, stable identifier for a resource. In SWR it's the first argument to",e.jsx(i.InlineCode,{children:"useSWR(key, fetcher)"}),". Keys can be strings or arrays (e.g.,",e.jsx(i.InlineCode,{children:'["/api/user", userId]'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale:"})," data that may be out of date but is safe to show immediately for instant UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Revalidate:"})," refetch the resource to refresh the cache and update the UI with the latest data. Triggers include focus, reconnect, interval polling, manual ",e.jsx(i.InlineCode,{children:"mutate"}),", and key changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deduping:"})," SWR merges identical in-flight requests (same key) within a time window so the network is not spammed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutate:"})," programmatically update the cache. Useful for ",e.jsx("i",{children:"optimistic updates"}),", invalidation, and prefetching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback data:"})," initial value for a key so UI has something to render before the first fetch resolves."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Installation"}),e.jsx(i.Pre,{children:`# npm
npm i swr

# pnpm
pnpm add swr

# yarn
yarn add swr`}),e.jsxs(i.Small,{children:["You can set a global config once using ",e.jsx(i.InlineCode,{children:"<SWRConfig value={{ ... }}>"}),"."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Basic Usage"}),e.jsx(i.Pre,{children:`import useSWR from "swr";

const fetcher = (url) => fetch(url).then((r) => {
  if (!r.ok) throw new Error("Network error");
  return r.json();
});

function Profile({ id }) {
  const { data, error, isLoading, isValidating, mutate } =
    useSWR(id ? \`/api/users/\${id}\` : null, fetcher); // null => skip/conditional

  if (error) return <p>Failed: {error.message}</p>;
  if (isLoading) return <p>Loading…</p>;

  return (
    <>
      <p>Name: {data.name}</p>
      <button onClick={() => mutate()}>Refresh</button>
      {isValidating && <small>Updating…</small>}
    </>
  );
}`}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Conditional fetch:"})," pass ",e.jsx(i.InlineCode,{children:"null"})," as key to skip (e.g., when"," ",e.jsx(i.InlineCode,{children:"id"})," is not ready)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State flags:"})," ",e.jsx(i.InlineCode,{children:"isLoading"})," (first load),"," ",e.jsx(i.InlineCode,{children:"isValidating"})," (revalidating after cache shows)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Global Configuration"}),e.jsx(i.Pre,{children:`import { SWRConfig } from "swr";

export function AppProviders({ children }) {
  return (
    <SWRConfig
      value={{
        fetcher: (url) => fetch(url).then((r) => r.json()),
        dedupingInterval: 2000,     // merge same-key fetches within 2s
        revalidateOnFocus: true,    // refetch when window/tab regains focus
        revalidateOnReconnect: true,
        refreshInterval: 0,         // polling ms (0 = off)
        keepPreviousData: true,     // keep last data during key change
        shouldRetryOnError: true,
      }}
    >
      {children}
    </SWRConfig>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Cache Keys: Best Practices"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"stable strings/arrays"}),". Include all parameters that affect the response:",e.jsx(i.InlineCode,{children:'["/api/search", q, page, sort]'}),"."]}),e.jsx("li",{children:"Avoid objects/functions as keys. Use arrays of primitives instead to ensure stable equality."}),e.jsxs("li",{children:["Changing the key ",e.jsx("b",{children:"invalidates"})," the old data and triggers a new fetch for the new resource."]})]}),e.jsx(i.Pre,{children:`// Good
const key = ["/api/products", categoryId, page, sort];

// Bad (unstable)
const key = { url: "/api/products", params: { categoryId, page, sort } };`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Revalidation Triggers"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Focus:"})," returning to the tab triggers revalidation (configurable)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reconnect:"})," when network reconnects after offline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Interval:"})," set ",e.jsx(i.InlineCode,{children:"refreshInterval"})," for polling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Key change:"})," new key ⇒ new request."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Manual:"})," call ",e.jsx(i.InlineCode,{children:"mutate(key)"})," or the hook's ",e.jsx(i.InlineCode,{children:"mutate()"}),"."]})]}),e.jsx(i.Pre,{children:`// Poll every 10s, but pause when the page is hidden:
const { data } = useSWR("/api/news", fetcher, {
  refreshInterval: 10000,
  refreshWhenHidden: false,
  refreshWhenOffline: false,
});`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Optimistic Updates"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic update:"})," update the UI immediately, assume success, then confirm with the server. If it fails, ",e.jsx("i",{children:"rollback"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"mutate(key, updater, options)"})," with"," ",e.jsx(i.InlineCode,{children:"optimisticData"})," and"," ",e.jsx(i.InlineCode,{children:"rollbackOnError"}),"."]})]}),e.jsx(i.Pre,{children:`import useSWR, { useSWRConfig } from "swr";

function Todo({ id }) {
  const { data } = useSWR(\`/api/todos/\${id}\`, fetcher);
  const { mutate } = useSWRConfig();

  async function toggle() {
    await mutate(
      \`/api/todos/\${id}\`,
      async (current) => {
        const optimistic = { ...current, done: !current.done };
        // send patch to server
        const saved = await fetch(\`/api/todos/\${id}\`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ done: optimistic.done }),
        }).then(r => r.json());
        return saved; // becomes the new cache value
      },
      {
        optimisticData: (current) => ({ ...current, done: !current.done }),
        rollbackOnError: true,
        revalidate: false, // we already returned the server value
        populateCache: true,
      }
    );
  }

  if (!data) return null;
  return <button onClick={toggle}>{data.done ? "✅" : "⬜"} {data.title}</button>;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Prefetching & Fallback Data"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prefetch:"})," warm the cache before a screen shows. Great for hover/intent or router preloads."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback:"})," provide a starting value while the first fetch runs."]})]}),e.jsx(i.Pre,{children:`import { useSWRConfig, SWRConfig } from "swr";

// Prefetch somewhere (e.g., on hover)
const { mutate } = useSWRConfig();
async function prefetchUser(id) {
  await mutate(\`/api/users/\${id}\`, fetch(\`/api/users/\${id}\`).then(r => r.json()));
}

// Fallback for initial render
<SWRConfig value={{ fallback: { "/api/users/1": { id: 1, name: "Guest" } } }}>
  <Profile id={1} />
</SWRConfig>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Error Handling & Retries"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Throw errors in your ",e.jsx(i.InlineCode,{children:"fetcher"})," for non-2xx responses. SWR exposes"," ",e.jsx(i.InlineCode,{children:"error"})," and can auto-retry with backoff."]}),e.jsxs("li",{children:["Customize retry count/delay via ",e.jsx(i.InlineCode,{children:"onErrorRetry"})," in config."]})]}),e.jsx(i.Pre,{children:`const fetcher = async (url) => {
  const r = await fetch(url);
  if (!r.ok) throw new Error(\`HTTP \${r.status}\`);
  return r.json();
};`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," design ",e.jsx("b",{children:"stable keys"}),"—they are the identity of your data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep your fetcher tiny and consistent (same errors, same JSON parsing)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(i.InlineCode,{children:"mutate"})," for optimistic UX and invalidation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," put non-deterministic values (like new Date()) in keys; it will destroy caching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," over-poll; prefer focus/reconnect revalidation for most dashboards."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"SWR vs TanStack Query (Quick Note)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Both provide caching, revalidation, mutations, and invalidation. ",e.jsx("b",{children:"TanStack Query"})," adds rich devtools, more mutation helpers, and advanced features (e.g., ",e.jsx("i",{children:"queryClient"}),")—you'll cover it in the"," ",e.jsx("i",{children:"TanStack Query"})," topic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SWR"})," stays minimal: a tiny API with a global cache and flexible hooks. Pick either per project, not both."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Common Pitfalls"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Using objects/functions as keys (unstable identity) → cache misses and unnecessary refetches."}),e.jsx("li",{children:"Forgetting to throw on HTTP errors in the fetcher → silent failures and confusing UI states."}),e.jsxs("li",{children:["Mutating the server without updating the cache → UI appears stale; use ",e.jsx(i.InlineCode,{children:"mutate"}),"."]})]})]}),e.jsxs(i.Callout,{children:["Summary: SWR gives you instant UI from cache and seamless background updates. Master keys, revalidation triggers, and ",e.jsx("i",{children:"mutate"})," for a responsive, optimistic experience."]})]});export{n as default};
