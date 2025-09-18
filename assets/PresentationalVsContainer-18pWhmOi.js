import{j as e}from"./index-B_XJRlzM.js";import{S as s}from"./styled-CAOyY3rL.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Presentational vs Container"}),e.jsxs(s.Lead,{children:["A classic way to separate concerns in React is to split components into",e.jsx("b",{children:" presentational"})," (render UI) and ",e.jsx("b",{children:"container"})," (fetch data, hold state, orchestrate behavior). Modern React often replaces “container” classes with function components, custom hooks, and composition—but the mental model is still useful."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Terminology (precise)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Presentational (UI) component:"})," focuses on markup, styles, semantics, and accessibility. Accepts ",e.jsx("b",{children:"props"})," (data + callbacks) and typically has little or no data-fetching logic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Container (stateful/controller) component:"})," owns state, performs data fetching, handles side effects, derives view-model data, and passes props down to a presentational component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"View model:"})," a computed, UI-ready shape of data derived from raw sources (API responses, state, params)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Separation of concerns:"})," isolating “what to render” (view) from “how to get/update data” (logic)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headless component:"})," a behavior-only component (or hook) with no UI; callers supply the markup."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Custom hook:"})," a function starting with ",e.jsx(s.InlineCode,{children:"use*"})," that encapsulates reusable state/logic (fetching, caching, derived values)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why split UI and logic?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Reusability:"})," the same UI can be driven by different data sources."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Testability:"})," presentational components are easy to snapshot/unit-test; logic is tested via hooks or containers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Replaceability:"})," swap the container (fetching logic) without touching the UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Clarity:"})," fewer reasons for a component to change → simpler reviews and maintenance."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Classic pattern (container → presentational)"}),e.jsx(s.Pre,{children:`// Presentational: pure UI, no fetching
function ProductListView({ items, loading, error, onRetry }) {
  if (loading)   return <p>Loading…</p>;
  if (error)     return <div role="alert">Failed. <button onClick={onRetry}>Retry</button></div>;
  if (!items.length) return <p>No products</p>;

  return (
    <ul>
      {items.map(p => (
        <li key={p.id}>
          <b>{p.name}</b> — $\${p.price.toFixed(2)}
        </li>
      ))}
    </ul>
  );
}

// Container: fetches, owns state, passes props to view
function ProductListContainer() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const load = React.useCallback(async () => {
    try {
      setLoading(true); setError(null);
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => { load(); }, [load]);

  return (
    <ProductListView
      items={items}
      loading={loading}
      error={error}
      onRetry={load}
    />
  );
}`}),e.jsxs(s.Small,{children:["The presentational component can be reused in Storybook/tests by passing mock ",e.jsx("code",{children:"items"})," and states, while the container handles real data."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Modern approach: custom hooks + composition"}),e.jsxs("p",{children:["Extracting logic into a ",e.jsx("b",{children:"custom hook"})," keeps the UI thin without creating a separate container component. The page (or parent) composes the hook’s data into a view."]}),e.jsx(s.Pre,{children:`// Reusable logic
function useProducts() {
  const [items, setItems]   = React.useState([]);
  const [status, setStatus] = React.useState("loading"); // "loading" | "error" | "ready"
  const load = React.useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("HTTP " + res.status);
      setItems(await res.json());
      setStatus("ready");
    } catch (e) {
      setStatus("error");
    }
  }, []);
  React.useEffect(() => { load(); }, [load]);
  return { items, status, reload: load };
}

// UI consumes the hook directly (no explicit "container" needed)
function ProductsSection() {
  const { items, status, reload } = useProducts();
  return (
    <ProductListView
      items={items}
      loading={status === "loading"}
      error={status === "error" ? new Error("…") : null}
      onRetry={reload}
    />
  );
}`}),e.jsx(s.Small,{children:"Benefit: hooks are easy to share, test, and combine (fetching, caching, selection, pagination, etc.)."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Headless pattern (behavior-only) with render prop"}),e.jsx(s.Pre,{children:`function ProductsHeadless({ children }) {
  const api = useProducts(); // from the previous example
  return children(api);
}

// Caller controls the entire UI
<ProductsHeadless>
  {({ items, status, reload }) => (
    <>
      {status === "loading" && <Spinner />}
      {status === "error" && <Error retry={reload} />}
      {status === "ready" && <Grid products={items} />}
    </>
  )}
</ProductsHeadless>`}),e.jsx(s.Small,{children:"Use when consumers need full control over markup and states (design systems, libraries)."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"What belongs where?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Presentational"}),": markup, layout, styles, ARIA roles/labels, small UI state (open/closed), no fetch calls, no global side effects. Receives ",e.jsx("em",{children:"data"})," and ",e.jsx("em",{children:"callbacks"})," as props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Container / Hook"}),": data fetching, caching, derived data (sorting/filtering), business rules, navigation, analytics, cross-cutting concerns. Passes UI-ready data and event handlers down."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Alternatives & ecosystem"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Data libraries"}),": React Query / SWR manage cache, status, retries. Hooks become small coordinators."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context"}),": share state across a subtree (e.g., auth, theme, feature flags) → avoid prop drilling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Route loaders"})," (frameworks): fetch data at the route and render UI with ready props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Server components"})," (frameworks): fetch on the server; presentational client components receive prepared props."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Over-splitting:"})," too many files/components for trivial views increases friction. Split only when it helps reuse/clarity."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Leaky abstractions:"})," presentational components should not know about fetchers, query keys, or endpoints."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tight coupling via cloning:"})," prefer props/context instead of ",e.jsx(s.InlineCode,{children:"cloneElement"})," tricks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop drilling:"})," if a “container” passes the same props through multiple levels, consider context/compound patterns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State ownership confusion:"})," decide who owns which state (form values, selection). Lift or localize intentionally."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Testing strategy"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Test ",e.jsx("b",{children:"presentational"})," components with static props (snapshot/DOM queries). No network needed."]}),e.jsxs("li",{children:["Test ",e.jsx("b",{children:"hooks/containers"})," with mocked fetch/cache to verify transitions (loading → ready → error)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do / Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep UI and data concerns separate enough to reuse and test."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," extract logic into custom hooks; compose them in pages or containers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pass view-model props (already shaped for UI) to keep views simple."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," fetch data inside deeply presentational components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," over-engineer tiny UIs—split only when it adds clarity."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," leak internal flags/endpoints into presentational layers."]})]})]}),e.jsx(s.Callout,{children:"Summary: use the model that fits the scale. For small views, a single component + a small hook is fine. For larger features, separate a presentational UI from a container or custom hooks. Keep data logic testable and UI components reusable and accessible."})]});export{r as default};
