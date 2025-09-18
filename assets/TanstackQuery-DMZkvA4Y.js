import{j as e}from"./index-dGwxAdn8.js";import{S as r}from"./styled-6Iz41B7y.js";const t=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"TanStack Query (React Query)"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"TanStack Query"})," is a data fetching & caching library for React. It gives you declarative hooks (",e.jsx("code",{children:"useQuery"}),", ",e.jsx("code",{children:"useMutation"}),") to load, cache, update, and sync server state with minimal boilerplate."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"What & Why"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Server state:"})," Data that lives on a server (APIs, DB) and must be fetched over the network. It can be stale, can change without your app, and needs caching & syncing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Query:"})," A cached read for some data. Identified by a ",e.jsx("b",{children:"query key"})," and loaded by a ",e.jsx("b",{children:"query function"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutation:"})," A write operation (POST/PUT/PATCH/DELETE) that can update cache and/or refetch affected queries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Query Client:"})," The object that manages the cache, configuration, and utilities (invalidate, prefetch, setQueryData, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Query Key:"})," An ",e.jsx("i",{children:"array"})," that uniquely identifies data (e.g., ",e.jsx("code",{children:'["todos", userId]'}),"). Keys must be JSON-serializable and stable. "]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fresh vs Stale:"})," After fetching, data is ",e.jsx("i",{children:"fresh"})," for ",e.jsx("code",{children:"staleTime"}),"; then it becomes ",e.jsx("i",{children:"stale"})," and may refetch on events (focus, reconnect, etc.). Default ",e.jsx("code",{children:"staleTime"})," is ",e.jsx("code",{children:"0"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache lifetime:"})," Unused queries are garbage-collected after ",e.jsx("code",{children:"gcTime"})," (default ~5 minutes). "]})]}),e.jsxs(r.Small,{children:["Keys must be arrays; defaults like ",e.jsx("code",{children:"staleTime"})," and ",e.jsx("code",{children:"gcTime"})," control freshness and garbage collection."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Install & Setup"}),e.jsx(r.Pre,{children:`# install (examples)
npm i @tanstack/react-query
# devtools (optional, recommended)
npm i @tanstack/react-query-devtools`}),e.jsx(r.Pre,{children:`// main.jsx (example)
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

root.render(
  <QueryClientProvider client={queryClient}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
);`}),e.jsxs(r.Small,{children:["Wrap your app once with ",e.jsx("code",{children:"QueryClientProvider"}),". Use the Devtools to inspect queries, mutations, and cache state visually."]})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:[e.jsx("code",{children:"useQuery"})," - Basics"]}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"queryKey:"})," array that identifies the data. Include every variable used by your ",e.jsx("code",{children:"queryFn"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"queryFn:"})," async function that returns data (or throws on error)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State flags:"})," ",e.jsx("code",{children:"isPending"}),", ",e.jsx("code",{children:"isError"}),", ",e.jsx("code",{children:"isSuccess"}),", ",e.jsx("code",{children:"isFetching"}),", plus ",e.jsx("code",{children:"data"}),"/",e.jsx("code",{children:"error"}),"."]})]}),e.jsx(r.Pre,{children:`import { useQuery } from "@tanstack/react-query";

function Todos({ userId }) {
  const {
    data, error,
    isPending,     // initial load
    isFetching,    // background refetches
    isError, isSuccess,
  } = useQuery({
    queryKey: ["todos", { userId }],
    queryFn: async () => {
      const res = await fetch(\`/api/users/\${userId}/todos\`);
      if (!res.ok) throw new Error("Network error");
      return res.json();
    },
    staleTime: 2 * 60 * 1000, // keep data fresh for 2 min
    select: (rows) => rows.sort((a, b) => a.done - b.done), // shape/refine data
  });

  if (isPending) return <p>Loading…</p>;
  if (isError) return <p>Failed: {String(error)}</p>;
  return <ul>{data.map(t => <li key={t.id}>{t.title}</li>)}</ul>;
}`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Tip:"})," Use ",e.jsx("code",{children:"select"})," to derive UI-ready data without extra renders."]})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Dependent queries (",e.jsx("code",{children:"enabled"}),")"]}),e.jsx(r.Pre,{children:`// Only run when userId is known
useQuery({
  queryKey: ["profile", userId],
  queryFn: () => fetch(\`/api/users/\${userId}\`).then(r => r.json()),
  enabled: !!userId,
});`}),e.jsxs(r.Small,{children:[e.jsx("code",{children:"enabled"})," prevents running until prerequisites are ready (auth, params, feature flags)."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Cache Keys - correctness rules"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Always array:"})," e.g., ",e.jsxs("code",{children:['["posts", page, ',"tag","]"]}),". Don't put functions in keys."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Include variables used in the query:"})," any variable referenced inside ",e.jsx("code",{children:"queryFn"})," must appear in the key so caching & refetching stay correct."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable shapes:"})," prefer objects with stable property ordering for options (e.g., ",e.jsx("code",{children:"{ tag, sort }"}),")."]})]}),e.jsx(r.Pre,{children:`// Good
useQuery({ queryKey: ["posts", page, { tag }], queryFn: () => api.listPosts({ page, tag }) });

// Bad: key doesn't include "tag" dependency → wrong cache / missed refetch
useQuery({ queryKey: ["posts", page], queryFn: () => api.listPosts({ page, tag }) });`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Freshness, Stale Time & Refetching"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"staleTime:"})," time until data becomes stale. Fresh data is read from cache only."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Refetch triggers for stale queries:"})," window focus, reconnect, mount (configurable)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"gcTime:"})," how long inactive data stays in cache before it's garbage-collected."]})]}),e.jsx(r.Pre,{children:`useQuery({
  queryKey: ["feed"],
  queryFn: () => fetch("/api/feed").then(r => r.json()),
  staleTime: 60_000,            // stay fresh for 1 min
  refetchOnWindowFocus: true,   // default behavior for stale queries
  refetchOnReconnect: true,
  refetchOnMount: true,
});`})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:[e.jsx("code",{children:"useMutation"})," - writes & invalidation"]}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Mutation:"})," perform a write, then ",e.jsx("b",{children:"invalidate"})," affected queries to refetch fresh data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic update:"})," temporarily update the UI before the server responds; rollback on error."]})]}),e.jsx(r.Pre,{children:`import { useMutation, useQueryClient } from "@tanstack/react-query";

function AddTodo() {
  const qc = useQueryClient();
  const createTodo = useMutation({
    mutationFn: (payload) => fetch("/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).then(r => {
      if (!r.ok) throw new Error("Create failed");
      return r.json();
    }),
    // Optimistic UI
    onMutate: async (variables) => {
      await qc.cancelQueries({ queryKey: ["todos"] });
      const prev = qc.getQueryData(["todos"]);
      qc.setQueryData(["todos"], (old = []) => [{ id: "temp", ...variables }, ...old]);
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      // Rollback
      if (ctx?.prev) qc.setQueryData(["todos"], ctx.prev);
    },
    onSettled: () => {
      // Ensure server truth
      qc.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return <button onClick={() => createTodo.mutate({ title: "New" })}>Add</button>;
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Prefetching & Initial Data"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prefetch:"})," warm the cache before navigation for instant screens."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Placeholder / Initial:"})," show temp data immediately; replaced when the real fetch resolves."]})]}),e.jsx(r.Pre,{children:`// Prefetch (e.g., on hover)
await queryClient.prefetchQuery({
  queryKey: ["profile", id],
  queryFn: () => api.profile(id),
});

// Placeholder vs Initial
useQuery({
  queryKey: ["profile", id],
  queryFn: () => api.profile(id),
  placeholderData: { name: "Loading…" }, // replaced after fetch
  // initialData: someCachedValue,     // treated as loaded data at t0
});`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Devtools"}),e.jsx(r.List,{children:e.jsxs("li",{children:["Install ",e.jsx("code",{children:"@tanstack/react-query-devtools"})," and render ",e.jsx("code",{children:"<ReactQueryDevtools />"})," inside the provider to inspect queries, mutations, and cache."]})}),e.jsx(r.Pre,{children:`import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

<QueryClientProvider client={queryClient}>
  <App />
  <ReactQueryDevtools initialIsOpen={false} />
</QueryClientProvider>`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use an ",e.jsx("b",{children:"array"})," query key and include every variable the query depends on."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," set ",e.jsx("code",{children:"staleTime"})," thoughtfully to avoid “refetch spam” and waterfall requests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx("code",{children:"invalidateQueries"})," after writes or ",e.jsx("code",{children:"setQueryData"})," for local corrections."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," fetch in effects for screen data - prefer ",e.jsx("code",{children:"useQuery"})," instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," create new key object identities on every render (memoize or keep them primitive/stable)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Query Key:"})," array ID for a query (e.g., ",e.jsx("code",{children:'["users", page]'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Query Function:"})," async function that returns the data for a query key."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fresh:"})," within ",e.jsx("code",{children:"staleTime"}),"; no refetch triggers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale:"})," past ",e.jsx("code",{children:"staleTime"}),"; may refetch on focus/reconnect/mount."]}),e.jsxs("li",{children:[e.jsx("b",{children:"gcTime:"})," duration an inactive query remains in cache before being removed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Invalidate:"})," mark a query stale so the next render/focus refetches it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prefetch:"})," fetch data into cache ahead of navigation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic Update:"})," temporary UI update before server confirmation; rollback on error."]})]})]}),e.jsxs(r.Callout,{children:["Summary: Model each API read as a ",e.jsx("i",{children:"query"})," with a clear array key, tune freshness with",e.jsx("code",{children:" staleTime"}),", and keep cache truthful via invalidation or optimistic writes. Use Devtools to see what's happening under the hood."]})]});export{t as default};
