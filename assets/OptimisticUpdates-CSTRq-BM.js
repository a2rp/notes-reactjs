import{j as e}from"./index-BRArnZ3i.js";import{S as t}from"./styled-Cm3OXcxs.js";const r=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Optimistic Updates"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Optimistic update"})," means we immediately update the UI as if a server change ",e.jsx("i",{children:"already succeeded"}),", then send the request in the background. If the server later fails, we ",e.jsx("b",{children:"rollback"}),' the UI. This makes apps feel fast by hiding network latency ("',e.jsx("b",{children:"latency compensation"}),'").']}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Definition & Purpose"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic update:"})," apply the expected result to local state/cache before the server confirms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pessimistic update:"})," wait for the server response, then update the UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Latency compensation:"})," UX technique to mask delay using optimistic UI + spinners/toasts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rollback:"})," restore the previous state if the request fails or conflicts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Source of truth:"})," the server remains authoritative; the cache is a prediction."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"When (and when not) to use"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Great for:"})," low-risk actions like like/subscribe, rename, add/remove from list, toggle flags."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Be cautious for:"})," payments, destructive ops (delete all), multi-user conflicts, complex validation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rule of thumb:"})," if a failure is rare and easy to undo, optimistic is a win. Otherwise consider pessimistic updates."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"How an Optimistic Update Works (Step-by-Step)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Snapshot:"})," save current cache/state you will modify."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Predict:"})," apply the predicted change locally (e.g., insert new item)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Send:"})," fire the network request in the background."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Finalize:"})," on success, reconcile with server data (IDs, versions). On error, rollback to the snapshot."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Revalidate:"})," refetch or invalidate to confirm final truth from the server."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary (Technical Terms)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Cache:"})," client-side store of server data (e.g., TanStack Query, SWR, custom state)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache key:"})," identifier for a piece of cached data (e.g., ",e.jsx(t.InlineCode,{children:'["todos", userId]'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Invalidation:"})," marking cached data as stale so it refetches."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Revalidation:"})," fetching again to ensure the cache matches the server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutation:"})," any write operation (POST/PUT/PATCH/DELETE)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotent:"})," request that can be safely retried without changing the final result (useful for retries)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Race condition:"})," responses arrive out of order; always reconcile with the latest server truth."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Conflict resolution:"})," strategy to merge local prediction with server reality (versions/ETags, timestamps)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pattern: Hand-Rolled Optimistic Update (Basic)"}),e.jsx(t.Pre,{children:`// Example: optimistic "rename" of a todo in local state (hand-rolled)
function renameTodoOptimistic(todos, setTodos, id, nextTitle) {
  // 1) Snapshot
  const prev = todos;

  // 2) Predict
  const predicted = todos.map(t => t.id === id ? { ...t, title: nextTitle } : t);
  setTodos(predicted);

  // 3) Send
  fetch(\`/api/todos/\${id}\`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: nextTitle })
  })
  .then(res => {
    if (!res.ok) throw new Error("Server rejected");
    return res.json();
  })
  .then(serverTodo => {
    // 4) Finalize (optional refine with server data)
    setTodos(ts => ts.map(t => t.id === id ? { ...t, ...serverTodo } : t));
  })
  .catch(() => {
    // Rollback on error
    setTodos(prev);
  });
}`}),e.jsx(t.Small,{children:"Keep the snapshot small and focused on what you changed to make rollback simple."})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Recipe: TanStack Query (Mutation with ",e.jsx("code",{children:"onMutate"}),")"]}),e.jsx(t.Pre,{children:`// Pseudocode using @tanstack/react-query
const queryClient = useQueryClient();

const mutation = useMutation({
  mutationFn: ({ id, nextTitle }) =>
    fetch(\`/api/todos/\${id}\`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: nextTitle })
    }).then(r => {
      if (!r.ok) throw new Error("Server error");
      return r.json();
    }),

  // 1) Snapshot & optimistic update
  onMutate: async ({ id, nextTitle }) => {
    const key = ["todos"];
    await queryClient.cancelQueries({ queryKey: key });
    const prev = queryClient.getQueryData(key);

    queryClient.setQueryData(key, (old = []) =>
      old.map(t => t.id === id ? { ...t, title: nextTitle } : t)
    );

    return { prev, key }; // context passed to onError/onSettled
  },

  // 2) Rollback on error
  onError: (err, variables, ctx) => {
    if (ctx?.prev) queryClient.setQueryData(ctx.key, ctx.prev);
  },

  // 3) Finalize: refetch or refine
  onSettled: () => {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }
});

// Usage
// mutation.mutate({ id, nextTitle })
`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"onMutate"})," runs before the request; return a context to rollback in ",e.jsx("b",{children:"onError"}),". Use ",e.jsx("b",{children:"invalidateQueries"})," or ",e.jsx("b",{children:"setQueryData"})," to finalize."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Recipe: SWR (",e.jsx("code",{children:"mutate"})," with optimistic data)"]}),e.jsx(t.Pre,{children:`// Pseudocode using swr
import useSWR, { mutate } from "swr";

function useTodos() {
  const { data } = useSWR("/api/todos", fetcher);
  return data ?? [];
}

async function renameTodo(id, nextTitle) {
  // Optimistically update cache
  mutate("/api/todos",
    (prev = []) => prev.map(t => t.id === id ? { ...t, title: nextTitle } : t),
    { revalidate: false }
  );

  // Send request
  const res = await fetch(\`/api/todos/\${id}\`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: nextTitle })
  });

  if (!res.ok) {
    // Rollback by revalidating (or keep your own snapshot to hard-rollback)
    await mutate("/api/todos");
    throw new Error("Server rejected");
  }

  // Finalize: revalidate or merge exact server data
  await mutate("/api/todos");
}
`}),e.jsxs(t.Small,{children:["With SWR, you can pass a function to ",e.jsx("b",{children:"mutate"})," to compute the optimistic cache."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Create Flow: Temporary IDs & Reconciliation"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Generate a ",e.jsx("b",{children:"temp ID"})," (e.g., ",e.jsx(t.InlineCode,{children:'"temp-123"'}),") for the new item."]}),e.jsx("li",{children:"Insert the item optimistically with the temp ID."}),e.jsxs("li",{children:["When the server returns the real ID, ",e.jsx("b",{children:"replace"})," the temp ID and merge other fields."]})]}),e.jsx(t.Pre,{children:`// Example: optimistic create with temp ID (hand-rolled)
const tempId = "temp-" + crypto.randomUUID();
setTodos(ts => [{ id: tempId, title: input, done: false }, ...ts]);

const res = await fetch("/api/todos", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: input })
});

if (!res.ok) {
  // rollback remove temp
  setTodos(ts => ts.filter(t => t.id !== tempId));
  // show error toast
} else {
  const serverTodo = await res.json();
  // replace temp with server ID/data
  setTodos(ts => ts.map(t => t.id === tempId ? serverTodo : t));
}
`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Delete Flow: Optimistic Remove + Restore on Error"}),e.jsx(t.Pre,{children:`// Remove from list immediately, then call DELETE
const prev = todos;
setTodos(ts => ts.filter(t => t.id !== id));

const res = await fetch(\`/api/todos/\${id}\`, { method: "DELETE" });
if (!res.ok) {
  // restore
  setTodos(prev);
}
`}),e.jsx(t.Small,{children:"For destructive ops, confirm with the user and keep rollback simple."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Infinite Lists & Pagination"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Apply optimistic changes to the correct ",e.jsx("b",{children:"page"})," in the cache (mind your ",e.jsx("b",{children:"cache keys"}),")."]}),e.jsx("li",{children:"For new items, prepend to page 1; for deletes/edits, locate the page containing the item."}),e.jsxs("li",{children:["After success, ",e.jsx("b",{children:"invalidate"})," each affected page key to revalidate."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"UX & Accessibility Tips"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Give immediate feedback (button state, subtle shimmer) to signal the change happened."}),e.jsx("li",{children:"Announce errors and rollbacks (ARIA live region or toast)."}),e.jsx("li",{children:"Disable duplicated actions while a mutation is in flight if idempotency is unclear."}),e.jsx("li",{children:"For multi-user apps, reconcile via version/updatedAt to avoid overwriting fresh server data."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common Pitfalls"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Forgetting rollback:"})," always keep a snapshot/context for failure paths."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Duplicates:"})," not replacing temp IDs with real ones after create."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale merges:"})," ignoring newer server updates that arrived concurrently."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Over-optimism:"})," optimistic delete of critical data without confirmation/undo."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache key mistakes:"})," writing to the wrong key can orphan or duplicate data."]})]})]}),e.jsx(t.Callout,{children:"Summary: Optimistic updates make apps feel instant. Snapshot ➜ predict ➜ send ➜ finalize/rollback. Use libraries (TanStack Query/SWR) for safe defaults, manage temp IDs, and always revalidate to keep the client in sync with the server."})]});export{r as default};
