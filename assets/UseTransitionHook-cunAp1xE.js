import{j as e}from"./index-UhLb6G-I.js";import{S as n}from"./styled-r13ExFbq.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"useTransition"}),e.jsxs(n.Lead,{children:[e.jsx(n.InlineCode,{children:"useTransition"})," marks some state updates as ",e.jsx("b",{children:"non-urgent"}),". Urgent updates (typing, clicks) render immediately, while transition updates may be deferred, interrupted, and resumed. This keeps the UI responsive during expensive renders."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Signature & terminology"}),e.jsx(n.Pre,{children:`const [isPending, startTransition] = useTransition();
// Or outside components (event handlers, async code):
import { startTransition } from "react";`}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"startTransition(fn)"}),": run state updates inside ",e.jsx("em",{children:"fn"})," as low priority (non-blocking)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"isPending"}),": ",e.jsx("code",{children:"true"})," while a transition is ongoing; use it to show spinners or dim content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Urgent vs non-urgent"}),": urgent updates reflect direct input; non-urgent updates can be deferred."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Interruption"}),": if a new urgent update arrives, React can pause/abandon an in-flight transition."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern: split urgent vs non-urgent state"}),e.jsx(n.Pre,{children:`import React, { useState, useTransition } from "react";

function SearchBox({ items }) {
  const [input, setInput] = useState("");   // urgent: mirrors the textbox
  const [query, setQuery] = useState("");   // non-urgent: drives heavy UI
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const next = e.target.value;
    setInput(next);                          // urgent update (keeps typing snappy)
    startTransition(() => {
      setQuery(next);                        // non-urgent: can be deferred/interrupted
    });
  }

  const visible = React.useMemo(() => {
    const q = query.toLowerCase();
    // assume heavy work (filter + sort)
    return items.filter(x => x.name.toLowerCase().includes(q))
                .sort((a, b) => a.name.localeCompare(b.name));
  }, [items, query]);

  return (
    <>
      <input value={input} onChange={onChange} placeholder="Search..." />
      {isPending && <Styled.Small>Updating…</Styled.Small>}
      <ul>{visible.map(x => <li key={x.id}>{x.name}</li>)}</ul>
    </>
  );
}`}),e.jsxs(n.Small,{children:["Keep the text input responsive while the results list updates under a transition. Show a lightweight pending hint with ",e.jsx("code",{children:"isPending"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern: tab/content switch without jank"}),e.jsx(n.Pre,{children:`function Tabs({ panes }) {
  const [active, setActive] = React.useState(panes[0].id);      // urgent: selected tab id
  const [shown, setShown]   = React.useState(panes[0].id);      // non-urgent: heavy pane being rendered
  const [isPending, startTransition] = React.useTransition();

  function select(id) {
    setActive(id);                                              // update tab UI instantly
    startTransition(() => setShown(id));                        // render heavy pane as non-urgent
  }

  const pane = panes.find(p => p.id === shown);
  return (
    <>
      <nav>
        {panes.map(p => (
          <button
            key={p.id}
            aria-pressed={active === p.id}
            onClick={() => select(p.id)}
            disabled={isPending && active === p.id}
          >{p.label}</button>
        ))}
      </nav>

      <div aria-busy={isPending ? "true" : "false"} style={{ opacity: isPending ? 0.7 : 1 }}>
        {pane.render()}
      </div>
    </>
  );
}`}),e.jsx(n.Small,{children:"The selection updates immediately; the expensive pane render runs as a transition. Use subtle dimming/aria-busy to signal work-in-progress."})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["With ",e.jsx("code",{children:"Suspense"})," (async boundaries)"]}),e.jsx(n.Pre,{children:`import React, { Suspense, useTransition } from "react";

function ProductsPage() {
  const [filter, setFilter] = React.useState("all");
  const [resource, setResource] = React.useState(() => fetchProducts("all"));
  const [isPending, startTransition] = useTransition();

  function onFilterChange(next) {
    setFilter(next); // urgent: button active state, etc.
    startTransition(() => {
      setResource(fetchProducts(next)); // non-urgent: new async resource triggers Suspense
    });
  }

  return (
    <>
      <Filters value={filter} onChange={onFilterChange} pending={isPending} />
      <Suspense fallback={<p>Loading products…</p>}>
        <ProductsList resource={resource} />
      </Suspense>
    </>
  );
}
`}),e.jsx(n.Small,{children:"Suspense shows a fallback while the transition fetches. Urgent UI (controls) remains responsive; content reveals when ready."})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Where to call ",e.jsx("code",{children:"startTransition"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Inside event handlers (e.g., ",e.jsx("code",{children:"onChange"}),", ",e.jsx("code",{children:"onClick"}),") to split immediate UI from heavy updates."]}),e.jsx("li",{children:"Inside async callbacks (after a promise resolves) to update expensive views without blocking urgent renders."}),e.jsxs("li",{children:["Top-level ",e.jsx("code",{children:"startTransition"})," (imported from ",e.jsx("code",{children:"react"}),") is useful outside components."]})]}),e.jsx(n.Pre,{children:`// outside a component
import { startTransition } from "react";
fetch("/api/data").then(data => {
  startTransition(() => {
    store.setData(data); // if connected to React via an external store binding
  });
});`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Heuristics: what to mark as transition"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Expensive derived UI (large lists, heavy charts, complex layouts) that updates in reaction to user input."}),e.jsx("li",{children:"Navigation between big screens/panes where content rendering is heavy or data is fetched via Suspense."}),e.jsx("li",{children:"Bulk state changes that cause many components to re-render."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Performance notes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Transitions don’t make work cheaper; they ",e.jsx("em",{children:"schedule"})," it so urgent interactions stay smooth."]}),e.jsx("li",{children:"Heavy computations should still be optimized (memoization, virtualization, splitting components)."}),e.jsxs("li",{children:["Multiple transitions can overlap; ",e.jsx("code",{children:"isPending"})," is ",e.jsx("code",{children:"true"})," while any are in flight."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Putting ",e.jsx("b",{children:"all"})," updates in a transition—then nothing feels immediate. Keep truly interactive updates urgent."]}),e.jsx("li",{children:"Assuming transitions guarantee completion—an in-flight transition can be interrupted by newer updates."}),e.jsx("li",{children:"Mutating large data during render; transitions won’t fix logic issues or expensive un-memoized work."}),e.jsxs("li",{children:["Driving form input ",e.jsx("em",{children:"value"})," from a transition state—keystrokes will feel laggy. Mirror input urgently; derive heavy UI in transition."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," split state: urgent for immediate feedback, transition for heavy UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," show lightweight pending hints (spinners, dimming) bound to ",e.jsx("code",{children:"isPending"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pair with memoization/virtualization for large lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," wrap simple, cheap updates in transitions needlessly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on transitions for correctness; they are a scheduling hint."]})]})]}),e.jsxs(n.Callout,{children:["Summary: use ",e.jsx("b",{children:"useTransition"})," to keep interactions snappy while rendering heavy UI in the background. Update input/controls urgently, move expensive state changes into ",e.jsx("b",{children:"startTransition"}),", and provide clear pending feedback. Optimize heavy work; transitions handle ",e.jsx("em",{children:"when"}),", not ",e.jsx("em",{children:"how much"}),"."]})]});export{s as default};
