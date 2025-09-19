import{j as e}from"./index-DUO2rjrc.js";import{S as n}from"./styled-CjWdcn30.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Memoization"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Memoization"})," means ",e.jsx("i",{children:"remembering the result"})," of a computation for a given set of inputs so we can reuse it later instead of recomputing. In React, we memoize ",e.jsx("b",{children:"values"}),",",e.jsx("b",{children:"functions"}),", and sometimes ",e.jsx("b",{children:"components"})," to reduce unnecessary work and re-renders."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render:"})," React calling your component to compute its UI for given props/state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Re-render:"})," The component renders again because its ",e.jsx("i",{children:"props"})," or ",e.jsx("i",{children:"state"})," (or a parent) changed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Commit:"})," React applies the final render result to the DOM."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Referential equality (identity):"})," Two references point to the exact same object/function in memory (e.g., ",e.jsx(n.InlineCode,{children:"prevObj === nextObj"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pure component:"})," A component that renders the same output for the same props; useful with ",e.jsx(n.InlineCode,{children:"React.memo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Expensive computation:"})," Work that is slow (large loops, heavy transforms, formatting, filtering, crypto, etc.). Memoize it if inputs are the same across renders."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"React Tools for Memoization"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"useMemo(fn, deps)"})," → returns a ",e.jsx("i",{children:"memoized value"}),". React recomputes the value only when dependencies change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useCallback(fn, deps)"})," → returns a ",e.jsx("i",{children:"memoized function"})," (stable reference). Use it when a child depends on the handler's identity (e.g., wrapped in ",e.jsx(n.InlineCode,{children:"React.memo"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React.memo(Component, [areEqual])"}),' → memoizes a component. It skips re-render if shallow comparison of props says "no change." Optionally provide a custom comparator.']})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Memoize Derived Values with ",e.jsx("code",{children:"useMemo"})]}),e.jsx(n.Pre,{children:`function ProductList({ products, query }) {
  // Expensive: filtering + sorting large arrays each render
  const visible = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = products.filter(p =>
      p.name.toLowerCase().includes(q) || p.tags.some(t => t.includes(q))
    );
    // Assume sorting is heavy
    return filtered.sort((a, b) => a.price - b.price);
  }, [products, query]);

  return (
    <ul>
      {visible.map(p => <li key={p.id}>{p.name} - ₹{p.price}</li>)}
    </ul>
  );
}`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Why:"})," Avoids recomputing when ",e.jsx("i",{children:"products"})," and ",e.jsx("i",{children:"query"})," didn't change. Keep the dependency array complete to prevent stale results."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Stable Handlers with ",e.jsx("code",{children:"useCallback"})]}),e.jsx(n.Pre,{children:`const Row = React.memo(function Row({ item, onSelect }) {
  // React.memo: re-render only if props (item, onSelect) change by shallow compare
  return <button onClick={() => onSelect(item.id)}>{item.label}</button>;
});

function List({ items, onPick }) {
  // Without useCallback, onSelect would be a new function on every render,
  // causing every <Row /> to re-render even when "items" didn't change.
  const onSelect = React.useCallback((id) => onPick(id), [onPick]);

  return items.map(it => <Row key={it.id} item={it} onSelect={onSelect} />);
}`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Why:"})," Keeps ",e.jsx("code",{children:"onSelect"})," identity stable so ",e.jsx("code",{children:"Row"})," can skip re-renders."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Skip Re-renders with ",e.jsx("code",{children:"React.memo"})]}),e.jsx(n.Pre,{children:`const PriceTag = React.memo(function PriceTag({ amount, currency }) {
  // Renders only when "amount" or "currency" changes
  return <span>{currency} {amount.toFixed(2)}</span>;
});

// Optional custom comparator
const EqualById = React.memo(
  function EqualById({ user }) {
    return <div>{user.name}</div>;
  },
  (prev, next) => prev.user.id === next.user.id // treat same id as "equal"
);`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Note:"})," Overusing ",e.jsx("code",{children:"React.memo"})," can add comparison overhead. Use it for components that are frequently re-rendered with identical props."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Referential Equality: Common Pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"New objects/arrays every render:"})," ",e.jsx(n.InlineCode,{children:"{}"})," or"," ",e.jsx(n.InlineCode,{children:"[]"})," literals create new identities. Memoize stable objects if children rely on referential equality."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Incomplete dependency arrays:"})," Missing a dependency in ",e.jsx("code",{children:"useMemo"}),"/",e.jsx("code",{children:"useCallback"})," can cause stale values or handlers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Premature memoization:"})," Memoization itself costs memory and comparisons. Start with clean data flow; memoize after profiling."]})]}),e.jsx(n.Pre,{children:`function Toolbar({ theme }) {
  // BAD: new object each render -> memoized children still re-render
  // const style = { color: theme.fg, background: theme.bg };

  // GOOD: memoize style object based on theme
  const style = React.useMemo(
    () => ({ color: theme.fg, background: theme.bg }),
    [theme.fg, theme.bg]
  );
  return <div style={style}>Tools</div>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When Should You Memoize?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Yes"})," - heavy derived data (filter/sort/format large lists), repeated on many renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Yes"})," - stable callbacks passed deep into memoized children."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Maybe"})," - leaf components that often receive identical props (use ",e.jsx("code",{children:"React.memo"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"No"})," - trivial computations or components that rarely re-render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Always profile first"})," to confirm the bottleneck before adding complexity."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Shallow compare:"})," Compares top-level fields (primitives by value, objects by reference)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable reference:"})," The same function/object identity across renders (e.g., via ",e.jsx("code",{children:"useMemo"}),"/",e.jsx("code",{children:"useCallback"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale value/closure:"})," Using an old value inside a memo/handler because the dependency list was incomplete."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memo hit/miss:"}),' "Hit" = use cached result; "miss" = recompute.']})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," start with clean state/prop design; memorize only proven bottlenecks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep dependency arrays complete to avoid stale bugs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize handlers passed to memoized children."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," wrap everything in ",e.jsx("code",{children:"useMemo"}),"/",e.jsx("code",{children:"useCallback"}),' "just in case."']}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely on deep compares in ",e.jsx("code",{children:"React.memo"}),"; it's often slower than re-rendering."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Memoization saves work by reusing results for the same inputs. In React, use ",e.jsx("b",{children:"useMemo"})," for values, ",e.jsx("b",{children:"useCallback"})," for functions, and",e.jsx("b",{children:" React.memo"})," for components-",e.jsx("i",{children:"but only where it truly reduces re-renders or expensive work"}),". Measure with the Profiler before and after to validate the win."]})]});export{r as default};
