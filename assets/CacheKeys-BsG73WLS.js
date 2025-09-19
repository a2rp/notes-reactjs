import{j as e}from"./index-t22nWg0v.js";import{S as s}from"./styled-DSN_kYZO.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Cache Keys"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"cache key"})," (also called a ",e.jsx("i",{children:"query key"}),") is the unique label that identifies a piece of cached data. Good keys are ",e.jsx("b",{children:"deterministic"})," (same inputs ⇒ same key),",e.jsx("b",{children:"stable"})," (don't change unexpectedly), and ",e.jsx("b",{children:"descriptive"})," (encode resource + params + scope)."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Cache:"})," a temporary storage layer that holds previously fetched data to avoid refetching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache key / Query key:"})," a unique identifier used to store and retrieve a specific cached result (e.g., ",e.jsxs(s.InlineCode,{children:['["users", ','page: 2, q: "a" ',"]"]}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deterministic:"})," given the same inputs, your key is exactly the same. No random or time-varying parts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable identity:"})," the “shape” and ordering of your key are consistent (e.g., parameters sorted)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope / namespace:"})," context that affects data (user ID, tenant, locale, feature flag)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale vs fresh:"})," “fresh” means data is considered up-to-date; “stale” means the app may show cached data while triggering a background revalidation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TTL / gcTime / cacheTime:"})," how long cached data can live before it's garbage-collected (naming varies by library; TanStack Query v5 uses ",e.jsx("i",{children:"gcTime"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Invalidation:"})," marking cached data as outdated so it refetches on next use or immediately."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Anatomy of a Good Key"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Resource:"})," ",e.jsx(s.InlineCode,{children:'"users"'}),","," ",e.jsx(s.InlineCode,{children:'"todos"'}),","," ",e.jsx(s.InlineCode,{children:'"product"'}),", etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parameters:"})," filters, pagination, search, sorting - normalized (trimmed, lowercased, ordered)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," user/tenant, locale, AB flag, route params (e.g., ",e.jsx(s.InlineCode,{children:"userId"}),")."]})]}),e.jsx(s.Pre,{children:`// Example "shape" (array form keeps pieces separate and readable)
["users", { page: 2, q: "alice", sort: "name:asc" }, { userId: 42, locale: "en-IN" }]`}),e.jsx(s.Small,{children:"Keep the shape predictable; avoid stuffing everything into one long string unless you have a robust, stable serializer."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Manual Cache with Stable Keys"}),e.jsx(s.Pre,{children:`// A tiny manual cache using Map + stable serialization
const cache = new Map();

function stableParams(obj) {
  // 1) sort keys   2) normalize values  3) stringify consistently
  const entries = Object.entries(obj)
    .filter(([, v]) => v !== undefined)                 // ignore undefined
    .map(([k, v]) => [k, typeof v === "string" ? v.trim().toLowerCase() : v])
    .sort(([a],[b]) => a.localeCompare(b));            // sort keys

  return JSON.stringify(Object.fromEntries(entries));
}

function makeKey(resource, params = {}, scope = {}) {
  return JSON.stringify([resource, stableParams(params), stableParams(scope)]);
}

async function fetchUsers({ page = 1, q = "", userId }) {
  const key = makeKey("users", { page, q }, { userId });
  if (cache.has(key)) return cache.get(key);

  const url = new URL("/api/users", location.origin);
  url.searchParams.set("page", String(page));
  if (q) url.searchParams.set("q", q.trim().toLowerCase());

  const res = await fetch(url);
  const data = await res.json();
  cache.set(key, data);
  return data;
}`}),e.jsxs(s.Small,{children:["The important bit is ",e.jsx("b",{children:"how you build the key"}),": normalize and sort parameters so semantically equal inputs produce the same key."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Cache Keys in TanStack Query"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Query keys are typically ",e.jsx("b",{children:"arrays"})," (e.g.,"," ",e.jsxs(s.InlineCode,{children:['["users", ',"page, q","]"]}),")."]}),e.jsx("li",{children:"The library hashes keys; you can include objects - avoid functions/non-serializable values."}),e.jsxs("li",{children:[e.jsx("b",{children:"staleTime"}),": how long data is considered fresh. ",e.jsx("b",{children:"gcTime"})," (a.k.a. cacheTime in older versions): how long unused data stays in memory."]})]}),e.jsx(s.Pre,{children:`// Example with @tanstack/react-query (v5 API shown conceptually)
import { useQuery, useQueryClient } from "@tanstack/react-query";

function useUsers({ page, q, userId }) {
  const queryKey = ["users", { page, q: q?.trim().toLowerCase() }, { userId }];

  return useQuery({
    queryKey,
    queryFn: () => fetch(\`/api/users?page=\${page}&q=\${encodeURIComponent(q || "")}\`).then(r => r.json()),
    staleTime: 30_000,  // 30s fresh window
    gcTime: 5 * 60_000, // 5m in memory after unused
  });
}

function RefreshUsersButton() {
  const qc = useQueryClient();
  return <button onClick={() => qc.invalidateQueries({ queryKey: ["users"] })}>Refresh</button>;
}`}),e.jsxs(s.Small,{children:["Invalidating ",e.jsx(s.InlineCode,{children:'["users"]'})," will refetch all user lists regardless of page/search - that's the power of a ",e.jsx("b",{children:"hierarchical key"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Cache Keys in SWR"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Keys can be a string, array, or a function that returns the key (or ",e.jsx("i",{children:"null"})," to skip)."]}),e.jsx("li",{children:"Avoid embedding unstable values in the key; normalize params."}),e.jsxs("li",{children:[e.jsx("b",{children:"dedupingInterval"}),": time window to dedupe requests; ",e.jsx("b",{children:"revalidateOnFocus"}),": refetch on focus."]})]}),e.jsx(s.Pre,{children:`import useSWR, { mutate } from "swr";

const fetcher = (url) => fetch(url).then(r => r.json());

function useUsers({ page, q }) {
  const qn = q?.trim().toLowerCase() || "";
  const key = ["/api/users", page, qn];  // deterministic key
  return useSWR(key, () => fetcher(\`/api/users?page=\${page}&q=\${encodeURIComponent(qn)}\`), {
    dedupingInterval: 2000,
  });
}

function RefreshUsersButton() {
  return <button onClick={() => mutate((key) => Array.isArray(key) && key[0] === "/api/users")}>Refresh</button>;
}`}),e.jsxs(s.Small,{children:["Using an ",e.jsx("b",{children:"array key"})," keeps parameters separate and predictable, reducing accidental collisions."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Invalidation Patterns"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Fan-out:"})," invalidate a broad key (e.g., ",e.jsx(s.InlineCode,{children:'["todos"]'}),") after a mutation to refresh all related lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Targeted:"})," invalidate a specific detail key (e.g.,"," ",e.jsxs(s.InlineCode,{children:['["todo", ',"id","]"]}),") after an update."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cross-entity:"})," when updating a comment, also invalidate its post list/detail keys."]})]}),e.jsx(s.Pre,{children:`// TanStack Query (concept)
qc.invalidateQueries({ queryKey: ["posts"] });       // refresh all posts lists
qc.invalidateQueries({ queryKey: ["post", { id }] }); // refresh one post detail

// SWR (concept)
mutate(["/api/posts"]);               // all post lists
mutate(["/api/post", id]);            // one post detail`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Infinite Scroll & Pagination Keys"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Keep a ",e.jsx("b",{children:"base key"})," for the collection (e.g., ",e.jsx(s.InlineCode,{children:'["feed"]'}),")."]}),e.jsxs("li",{children:["Libraries track ",e.jsx("b",{children:"pageParam"})," internally; your query key usually stays the same and the page cursor is passed via options."]}),e.jsxs("li",{children:["For manual caches, include ",e.jsx("b",{children:"cursor/page"})," in the key."]})]}),e.jsx(s.Pre,{children:`// TanStack useInfiniteQuery (concept)
useInfiniteQuery({
  queryKey: ["feed", { q }],
  queryFn: ({ pageParam }) => fetch(\`/api/feed?cursor=\${pageParam || ""}&q=\${q}\`).then(r => r.json()),
  getNextPageParam: (lastPage) => lastPage.nextCursor ?? null,
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Optimistic Updates & Keys"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Update the ",e.jsx("b",{children:"list"})," key and the ",e.jsx("b",{children:"detail"})," key together so UI stays consistent."]}),e.jsx("li",{children:"Roll back on error using the snapshot returned by your library's mutation helpers."})]}),e.jsx(s.Pre,{children:`// TanStack (concept)
await qc.cancelQueries({ queryKey: ["todos"] });
const prev = qc.getQueryData(["todos"]);
qc.setQueryData(["todos"], (old = []) => [{ id, title, optimistic: true }, ...old]);
try {
  await api.createTodo({ title });
  qc.invalidateQueries({ queryKey: ["todos"] });
} catch (e) {
  qc.setQueryData(["todos"], prev); // rollback
}

// SWR (concept)
mutate(["/api/todos"], async (curr = []) => {
  const optimistic = [{ id, title, optimistic: true }, ...curr];
  try {
    await api.createTodo({ title });
    return await fetcher("/api/todos"); // revalidate
  } catch (e) {
    return curr; // rollback
  }
}, { revalidate: false });`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," normalize text params (trim, lowercase) before building the key."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," sort object keys before serializing to avoid key order issues."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," include scope (user/tenant/locale) when it affects the data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," put ",e.jsx("i",{children:"functions"}),", ",e.jsx("i",{children:"class instances"}),", or ",e.jsx("i",{children:"DOM nodes"})," in keys."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," include time-varying values (",e.jsx("i",{children:"Date.now()"}),", ",e.jsx("i",{children:"Math.random()"}),") unless that's intentional."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget to invalidate the right keys after mutations."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Key collision:"})," two different queries map to the same key - caused by poor key design."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Serialization:"})," turning params into a stable string form."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Revalidation:"})," refetch to ensure data is up-to-date (often in the background)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration:"})," seeding the cache (e.g., from SSR) before the client renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deduplication:"})," bundling identical in-flight requests to avoid duplicates."]})]})]}),e.jsx(s.Callout,{children:"Summary: Good cache keys are deterministic, stable, and descriptive. Encode resource, params, and scope; normalize inputs; and lean on your library's hierarchical matching to invalidate the right data after writes."})]});export{n as default};
