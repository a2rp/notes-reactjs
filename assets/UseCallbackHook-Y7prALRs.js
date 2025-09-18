import{j as e}from"./index-ikndkUkk.js";import{S as n}from"./styled-C0WeN79k.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"useCallback"}),e.jsxs(n.Lead,{children:[e.jsx(n.InlineCode,{children:"useCallback"})," memoizes a ",e.jsx("b",{children:"function"}),". It returns the same function reference between renders while its dependency list stays equal. Useful for ",e.jsx("b",{children:"referential stability"})," with ",e.jsx(n.InlineCode,{children:"React.memo"})," children and effect dependencies."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Signature & terminology"}),e.jsx(n.Pre,{children:`const memoizedFn = useCallback(fn, deps);
// Equivalent to: const memoizedFn = useMemo(() => fn, deps);`}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Memoized function:"})," the stable function returned by ",e.jsx(n.InlineCode,{children:"useCallback"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dependencies:"})," reactive values that the function reads; when any changes, a ",e.jsx("em",{children:"new"})," function is created."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Referential equality:"})," whether a function is the exact same reference as last render. Matters for ",e.jsx(n.InlineCode,{children:"React.memo"})," and effect deps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable handler:"})," a memoized function that does not change identity unless needed; prevents child re-renders and listener re-subscriptions."]})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["When ",e.jsx("code",{children:"useCallback"})," helps"]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Passing callbacks to ",e.jsx(n.InlineCode,{children:"React.memo"})," children (avoid re-render due to new function identity)."]}),e.jsx("li",{children:"Supplying a function to an effect dependency array (avoid tearing down/setting up on every render)."}),e.jsx("li",{children:"Memoized computations that depend on a function prop (keep the function stable so the memoized value stays cached)."})]}),e.jsxs(n.Small,{children:["If no child/effect depends on function identity, ",e.jsx(n.InlineCode,{children:"useCallback"})," usually isn’t needed."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Example: memoized child + stable ",e.jsx("code",{children:"onSelect"})]}),e.jsx(n.Pre,{children:`const Item = React.memo(function Item({ item, onSelect }) {
  console.log("render:", item.id); // renders only if props change by reference
  return <li onClick={() => onSelect(item.id)}>{item.name}</li>;
});

function List({ items }) {
  const [selected, setSelected] = React.useState(null);

  // Stable across renders (identity changes only if setSelected changes, which it doesn't)
  const handleSelect = React.useCallback((id) => {
    setSelected(id);
  }, []);

  return (
    <>
      <p>Selected: {String(selected)}</p>
      <ul>{items.map(it => <Item key={it.id} item={it} onSelect={handleSelect} />)}</ul>
    </>
  );
}`}),e.jsxs(n.Small,{children:["Without ",e.jsx(n.InlineCode,{children:"useCallback"}),", a new ",e.jsx("code",{children:"onSelect"})," function each render would invalidate ",e.jsx("code",{children:"Item"}),"’s memoization."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Avoid stale state with functional updates"}),e.jsx(n.Pre,{children:`function Counter() {
  const [count, setCount] = React.useState(0);

  // No 'count' in deps, yet remains correct by using the functional updater
  const increment = React.useCallback(() => {
    setCount(c => c + 1);
  }, []);

  return <button onClick={increment}>Count: {count}</button>;
}`}),e.jsxs(n.Small,{children:["If the callback computes next value from previous, prefer the ",e.jsx("b",{children:"functional updater"})," so the deps can stay minimal."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Effects depending on a handler"}),e.jsx(n.Pre,{children:`function KeyListener({ onEscape }) {
  // Stable wrapper so the effect doesn't re-subscribe each render
  const handleKey = React.useCallback((e) => {
    if (e.key === "Escape") onEscape?.();
  }, [onEscape]);

  React.useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);

  return null;
}`}),e.jsx(n.Small,{children:"Keep the effect’s dependency list accurate; stabilize the handler (or use a “latest ref” pattern) to avoid re-subscribing on every render."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Passing parameters without re-creating handlers"}),e.jsx(n.Pre,{children:`function Shop({ products }) {
  const [cart, setCart] = React.useState(new Map());

  const add = React.useCallback((id, qty = 1) => {
    setCart(prev => {
      const next = new Map(prev);
      next.set(id, (next.get(id) ?? 0) + qty);
      return next;
    });
  }, []);

  return (
    <ul>
      {products.map(p => (
        <li key={p.id}>
          {p.name} — Rs {p.price}
          <button onClick={() => add(p.id, 1)}>Add</button>
        </li>
      ))}
    </ul>
  );
}`}),e.jsxs(n.Small,{children:["The stable ",e.jsx("code",{children:"add"})," function accepts parameters at call time, so the identity stays the same across renders."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Interplay with ",e.jsx("code",{children:"useMemo"})," & object deps"]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["If the callback depends on an object/array built during render, memoize that input with ",e.jsx(n.InlineCode,{children:"useMemo"})," first."]}),e.jsx("li",{children:"Otherwise the input changes identity each render → the callback rememoizes each time."})]}),e.jsx(n.Pre,{children:`const options = React.useMemo(() => ({ min: 0, max: 10 }), []);
const compute = React.useCallback((x) => x >= options.min && x <= options.max, [options]);`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Performance model"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Creating a new inline arrow each render is cheap. ",e.jsx("b",{children:"Only"})," memoize when identity matters (memoized child/effect deps)."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"useCallback"})," itself has overhead (tracking deps). Measure before widespread use."]}),e.jsxs("li",{children:["Prefer a simple render first; add ",e.jsx(n.InlineCode,{children:"useCallback"})," where it prevents real work."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Empty deps (",e.jsx(n.InlineCode,{children:"[]"}),") while reading changing values inside → ",e.jsx("b",{children:"stale closures"}),". Fix by including deps or using functional updaters/refs."]}),e.jsx("li",{children:"Omitting dependencies to silence lints → subtle bugs. Keep deps correct; restructure code if necessary."}),e.jsx("li",{children:"Memoizing everything “just in case” → unnecessary complexity with minimal benefit."}),e.jsxs("li",{children:["Using ",e.jsx(n.InlineCode,{children:"useCallback"})," to avoid ",e.jsx("em",{children:"parent"})," re-renders—memoizing a function won’t stop the parent rendering."]})]}),e.jsx(n.Pre,{children:`// ❌ Stale closure (reads old 'value')
const onSave = React.useCallback(() => console.log(value), []);

// ✅ Include deps OR use a ref/functional update
const onSaveOk = React.useCallback(() => console.log(value), [value]);`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," memoize handlers passed to ",e.jsx(n.InlineCode,{children:"React.memo"})," children."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use functional updaters to keep deps minimal when next value depends on previous state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," stabilize inputs (with ",e.jsx(n.InlineCode,{children:"useMemo"}),") before depending on them in ",e.jsx(n.InlineCode,{children:"useCallback"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse it for trivial handlers; identity only matters if something compares references."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," omit dependencies to keep a function “stable”—use the right patterns instead."]})]})]}),e.jsxs(n.Callout,{children:["Summary: ",e.jsx(n.InlineCode,{children:"useCallback"})," keeps function references stable for memoized children and effects. Include the right dependencies, lean on functional updaters to avoid stale closures, and use it selectively where identity ",e.jsx("em",{children:"actually"})," matters."]})]});export{t as default};
