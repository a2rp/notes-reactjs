import{j as e}from"./index-C1_RbWbm.js";import{S as i}from"./styled-DMWrhJzb.js";const n=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Invalidation"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Invalidation"})," marks cached data as ",e.jsx("i",{children:"stale"})," so it can be re-fetched. You do this whenever the source of truth may have changed (after a mutation, time passing, focus regain, network reconnect, etc.). Invalidation doesn't have to delete data; it simply flags it as no longer trusted and triggers or allows a revalidation."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Cache:"})," An in-memory store that keeps results of previous requests to avoid refetching every render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache key:"})," A unique identifier that describes ",e.jsx("em",{children:"what"})," data a request represents (endpoint + params, e.g., ",e.jsxs(i.InlineCode,{children:['["todos", ',"page: 1 ","]"]}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fresh vs Stale:"})," ",e.jsx("i",{children:"Fresh"})," means “safe to show without refetch.” ",e.jsx("i",{children:"Stale"})," means “may be outdated; should revalidate soon.”"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Invalidation:"})," Marking cached data as ",e.jsx("i",{children:"stale"}),". The next read can refetch in the background or immediately."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Revalidation:"})," The act of checking freshness (usually by refetching) and updating the cache/UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Refetch:"})," Performing a new network request for a given cache key."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TTL / staleTime:"})," Time-based freshness window. Before it elapses, data is treated as fresh; after, it's stale."]}),e.jsxs("li",{children:[e.jsx("b",{children:"cacheTime / GC:"})," How long stale data stays in memory before garbage collection removes it."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Why Invalidate?"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Consistency:"})," After creating/updating/deleting an item, previously fetched lists/details may be outdated."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fair performance:"})," Invalidate only the affected keys instead of refetching everything."]}),e.jsxs("li",{children:[e.jsx("b",{children:"User trust:"})," Keep UI reflect the source of truth quickly without forcing full-page reloads."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"When to Invalidate"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"After mutations:"})," On successful create/update/delete, invalidate the list and the affected detail."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Time-based:"})," When ",e.jsx(i.InlineCode,{children:"staleTime"})," expires (or a custom TTL passes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus regain:"})," When the tab regains focus (many libs refetch or revalidate then)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Network reconnect:"})," After coming back online."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Manual triggers:"})," Pull-to-refresh, refresh button, or specific “Refresh data” action."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Vanilla Pattern (Simple Cache + Invalidate)"}),e.jsx(i.Pre,{children:`// Tiny cache with invalidation
const cache = new Map(); // key -> { data, ts }
const subscribers = new Set();

export function getKey(resource, params) {
  return JSON.stringify([resource, params || null]);
}

export async function fetchWithCache(resource, params, { ttl = 10_000 } = {}) {
  const key = getKey(resource, params);
  const hit = cache.get(key);
  const fresh = hit && (Date.now() - hit.ts < ttl);

  if (fresh) return hit.data;

  const url = new URL(resource, window.location.origin);
  Object.entries(params || {}).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url);
  const data = await res.json();
  cache.set(key, { data, ts: Date.now() });
  subscribers.forEach(fn => fn(key)); // notify
  return data;
}

export function invalidate(keyOrPredicate) {
  // Mark as stale by deleting timestamp (keep data for SWR-like UX)
  for (const [key, value] of cache.entries()) {
    const match = typeof keyOrPredicate === "function"
      ? keyOrPredicate(key)
      : key === keyOrPredicate;
    if (match) cache.set(key, { ...value, ts: 0 });
  }
  subscribers.forEach(fn => fn(null)); // notify general change
}

export function subscribe(fn) {
  subscribers.add(fn);
  return () => subscribers.delete(fn);
}`}),e.jsxs(i.Small,{children:["Here, ",e.jsx(i.InlineCode,{children:"invalidate()"})," flips entries to ",e.jsx("i",{children:"stale"})," by zeroing ",e.jsx("code",{children:"ts"}),". Next read refetches; UI can show stale-while-revalidate (old data immediately, then update)."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example Flow: Create Todo → Invalidate List"}),e.jsx(i.Pre,{children:`async function createTodo(payload) {
  const res = await fetch("/api/todos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Failed to create");
  // Invalidate the list; details may also need invalidation
  invalidate((key) => key.includes('["/api/todos"'));
}`}),e.jsx(i.Small,{children:"After mutation success, invalidate the affected keys (list and, if applicable, specific detail keys)."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"With SWR (stale-while-revalidate)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"mutate(key)"}),":"]})," invalidates and revalidates a key."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"mutate(key, newData, { revalidate: false })"}),":"]})," optimistic/local update without immediate refetch."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Key matching:"})," ",e.jsx(i.InlineCode,{children:'mutate((key) => key.startsWith("/api/todos"))'})," to invalidate multiple keys."]})]}),e.jsx(i.Pre,{children:`import useSWR, { useSWRConfig } from "swr";

function Todos() {
  const { mutate } = useSWRConfig();
  const { data } = useSWR("/api/todos", (url) => fetch(url).then(r => r.json()));

  async function onCreate(todo) {
    // optimistic add
    mutate("/api/todos", (current = []) => [...current, todo], { revalidate: false });
    try {
      await fetch("/api/todos", { method: "POST", body: JSON.stringify(todo) });
      // revalidate list after success
      mutate("/api/todos");
    } catch {
      // rollback by revalidating from server
      mutate("/api/todos");
    }
  }
  return /* render todos */ null;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"With TanStack Query (React Query)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"queryKey"}),":"]})," stable identifier for a query (array recommended)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"staleTime"}),":"]})," ms before data becomes stale (no auto refetch while fresh)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"cacheTime"}),":"]})," ms a stale query stays in cache before garbage collection."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"invalidateQueries"}),":"]})," flag queries as stale so they refetch next time or immediately if mounted."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(i.InlineCode,{children:"setQueryData"}),":"]})," optimistic/local update of cached data."]})]}),e.jsx(i.Pre,{children:`import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: () => fetch("/api/todos").then(r => r.json()),
    staleTime: 10_000, // 10s fresh window
    cacheTime: 5 * 60_000, // 5m in cache after becoming stale
    refetchOnWindowFocus: true,
  });
}

function CreateTodo() {
  const qc = useQueryClient();
  const mutation = useMutation({
    mutationFn: (todo) => fetch("/api/todos", { method: "POST", body: JSON.stringify(todo) }),
    onMutate: async (newTodo) => {
      await qc.cancelQueries({ queryKey: ["todos"] });
      const prev = qc.getQueryData(["todos"]);
      qc.setQueryData(["todos"], (old = []) => [...old, newTodo]); // optimistic
      return { prev };
    },
    onError: (_err, _newTodo, ctx) => {
      if (ctx?.prev) qc.setQueryData(["todos"], ctx.prev); // rollback
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ["todos"] }); // invalidate -> refetch
    },
  });
  return /* form that calls mutation.mutate */ null;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"What to Invalidate (Scoping)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Minimal blast radius:"})," Invalidate only keys that could be affected."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lists + details:"})," If an item changes, invalidate the item detail key and any lists that include it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parameterized keys:"})," If your list is paginated or filtered, invalidate by predicate (e.g., keys starting with ",e.jsx(i.InlineCode,{children:'["todos"]'}),")."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Patterns & Tips"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stale-While-Revalidate (SWR UX):"})," Show cached data instantly, fetch in background, then update."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Refetch on focus/reconnect:"})," Great for dashboards where data changes in the background."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid thundering herds:"})," Debounce manual refresh and use library deduping features."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable keys:"})," Always use stable arrays/strings; don't inline new object references every render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error handling:"})," On failure after optimistic updates, rollback via server revalidation or saved snapshot."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep ",e.jsx(i.InlineCode,{children:"queryKey"}),"/",e.jsx(i.InlineCode,{children:"key"})," shapes consistent across the app."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," invalidate immediately after successful mutations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer predicates to invalidate groups of related keys safely."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," invalidate everything unless you must; it wastes bandwidth and can jank the UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely only on time-based TTL for highly dynamic data; add event-based invalidation."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Predicate invalidation:"})," Matching many keys by a function (e.g., prefix)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic update:"})," Update UI first, then confirm with server; rollback on error."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deduping:"})," Preventing concurrent duplicate requests for the same key."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Garbage collection (GC):"})," Removing stale, unused entries from the cache after ",e.jsx("i",{children:"cacheTime"}),"."]})]})]}),e.jsxs(i.Callout,{children:[e.jsx("b",{children:"Takeaway:"})," Invalidation keeps cached UI honest. Use precise keys, invalidate on mutation, leverage library helpers (",e.jsx("i",{children:"mutate"}),", ",e.jsx("i",{children:"invalidateQueries"}),"), and combine time-based and event-based strategies for a fast, correct experience."]})]});export{n as default};
