import{j as e}from"./index-wTxrXa3i.js";import{S as i}from"./styled-CtHB30Fv.js";const n=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"useDeferredValue"}),e.jsxs(i.Lead,{children:[e.jsx(i.InlineCode,{children:"useDeferredValue"})," creates a ",e.jsx("b",{children:"lagging copy"})," of a value. When the original value changes, React may ",e.jsx("b",{children:"delay"})," updating the deferred copy so urgent interactions stay responsive. The UI can keep showing content for the previous value while rendering the heavy update in the background."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Signature & terminology"}),e.jsx(i.Pre,{children:'const deferred = React.useDeferredValue(value); // returns a value that may "lag" behind'}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Deferred value:"})," a read-only value that trails the source during expensive renders, then catches up."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Urgent vs non-urgent:"})," urgent updates (typing/clicks) render immediately; work driven by the deferred value can be delayed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Staleness flag:"})," compare ",e.jsx(i.InlineCode,{children:"value !== deferred"})," to know if the UI is catching up."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core pattern: typeahead with a heavy list"}),e.jsx(i.Pre,{children:`function Search({ items }) {
  const [input, setInput] = React.useState("");
  const deferredQuery = React.useDeferredValue(input); // may lag during heavy renders
  const isStale = input !== deferredQuery;

  // heavy work depends on the deferred value, not the immediate input
  const visible = React.useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    // assume expensive filter + sort for large data
    return items
      .filter(it => it.name.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, deferredQuery]);

  return (
    <>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Search…"
      />
      {isStale && <Styled.Small>Updating…</Styled.Small>}
      <ul aria-busy={isStale ? "true" : "false"} style={{ opacity: isStale ? 0.7 : 1 }}>
        {visible.map(it => <li key={it.id}>{it.name}</li>)}
      </ul>
    </>
  );
}`}),e.jsxs(i.Small,{children:["The text input stays snappy (urgent). The list updates from ",e.jsx("code",{children:"deferredQuery"}),", so heavy work can lag without blocking typing."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Split responsibilities: pass deferred props to heavy children"}),e.jsx(i.Pre,{children:`const HeavyList = React.memo(function HeavyList({ query, items }) {
  const visible = React.useMemo(() => {
    const q = query.toLowerCase();
    return items.filter(x => x.name.toLowerCase().includes(q));
  }, [items, query]);
  return <ul>{visible.map(x => <li key={x.id}>{x.name}</li>)}</ul>;
});

function SearchPage({ items }) {
  const [input, setInput] = React.useState("");
  const deferred = React.useDeferredValue(input);
  const isStale = input !== deferred;

  return (
    <>
      <input value={input} onChange={e => setInput(e.target.value)} />
      {isStale && <Styled.Small>Updating…</Styled.Small>}
      <HeavyList items={items} query={deferred} /> {/* heavy child sees deferred value */}
    </>
  );
}`}),e.jsxs(i.Small,{children:["Keep the heavy child wrapped in ",e.jsx("code",{children:"React.memo"})," and feed it the deferred value to avoid re-rendering on every keystroke."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:[e.jsx("code",{children:"useDeferredValue"})," vs ",e.jsx("code",{children:"useTransition"})]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"useDeferredValue:"})," simplest when the entire heavy UI derives from ",e.jsx("em",{children:"one value"}),". Replace that value with its deferred copy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useTransition:"})," more control over ",e.jsx("em",{children:"which"})," updates are low priority. Wrap setters in ",e.jsx(i.InlineCode,{children:"startTransition"})," and use ",e.jsx(i.InlineCode,{children:"isPending"})," for status."]}),e.jsx("li",{children:"Both can be combined, but usually pick the one that matches the mental model of the UI."})]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["With ",e.jsx("code",{children:"Suspense"})," (data fetching)"]}),e.jsx(i.Pre,{children:`import React, { Suspense } from "react";

function ProductsPage() {
  const [filter, setFilter] = React.useState("all");
  const deferred = React.useDeferredValue(filter);
  const isStale = filter !== deferred;

  return (
    <>
      <Toolbar value={filter} onChange={setFilter} />
      {isStale && <Styled.Small>Loading…</Styled.Small>}
      <Suspense fallback={<p>Loading products…</p>}>
        <ProductsList resource={fetchProductsResource(deferred)} />
      </Suspense>
    </>
  );
}`}),e.jsx(i.Small,{children:"The previous list stays visible while a new resource for the deferred filter loads, reducing flashing."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Heuristics: when to use"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Typing/search boxes that drive expensive lists, charts, or maps."}),e.jsx("li",{children:"Tab/content switches where heavy content depends on a single selected value."}),e.jsx("li",{children:"Any case where UI should remain interactive while a derived view catches up."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Not a debounce/throttle"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Debounce/throttle"})," changes the ",e.jsx("em",{children:"event timing"})," (setTimeout, rate limiting)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useDeferredValue"})," keeps every change but lets React schedule when the heavy render appears."]}),e.jsx("li",{children:"Can be paired with debouncing if network calls should be reduced; defer for render cost, debounce for API cost."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility & UX cues"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use a subtle pending hint while ",e.jsx(i.InlineCode,{children:"value !== deferred"})," (spinner/dimming, ",e.jsx(i.InlineCode,{children:"aria-busy"}),")."]}),e.jsx("li",{children:"Preserve keyboard focus and avoid blocking inputs; the main benefit is uninterrupted interaction."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Common pitfalls"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Driving a ",e.jsx("b",{children:"controlled input’s value"})," from the deferred copy → keystrokes feel laggy. Use the ",e.jsx("em",{children:"immediate"})," value for inputs."]}),e.jsx("li",{children:"Mutating or depending on incidental side effects from the deferred value—treat it as a pure, read-only signal."}),e.jsx("li",{children:"Assuming correctness depends on deferred timing; it is a scheduling hint, not logic."}),e.jsxs("li",{children:["Doing expensive work without memoization. Defer ",e.jsx("em",{children:"and"})," memoize to reduce repeated computation."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do / Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," compute heavy UI from the deferred value so typing stays responsive."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show lightweight pending feedback while catching up."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pair with ",e.jsx(i.InlineCode,{children:"React.memo"}),"/",e.jsx(i.InlineCode,{children:"useMemo"})," for large data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," bind inputs to the deferred value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on deferred timing for correctness or state synchronization."]})]})]}),e.jsxs(i.Callout,{children:["Summary: ",e.jsx(i.InlineCode,{children:"useDeferredValue"})," keeps interactions smooth by letting heavy UI lag behind a changing value. Use it where one value drives expensive work, keep inputs urgent, memoize heavy computations, and add clear but subtle pending hints."]})]});export{n as default};
