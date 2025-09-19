import{j as e}from"./index-DqLKwkYK.js";import{S as n}from"./styled-Bw6pqD7V.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Transitions"}),e.jsxs(n.Lead,{children:["A ",e.jsx("b",{children:"transition"})," marks some state updates as ",e.jsx("i",{children:"non-urgent"})," so React can keep the UI responsive. Urgent updates (like typing and button clicks) feel instant, while heavy work (like filtering a big list) runs as a transition that can be interrupted to avoid jank."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Why Transitions?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Problem:"})," Big renders (filter, sort, route change) can block the main thread and make typing or clicking feel laggy."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idea:"})," Separate updates into ",e.jsx("b",{children:"urgent"})," (must feel immediate) and"," ",e.jsx("b",{children:"non-urgent"})," (can be delayed/aborted) using transitions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Benefit:"})," React keeps the last interactive UI on screen while preparing the next screen in the background. If a new input arrives, the background work is interrupted."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Urgent update:"})," Must reflect instantly (e.g., ",e.jsx(n.InlineCode,{children:"input.value"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transition (non-urgent update):"})," A state update that can be delayed or restarted without harming UX (e.g., re-rendering a 10k-row list)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(n.InlineCode,{children:"startTransition(fn)"}),":"]})," Marks updates inside"," ",e.jsx(n.InlineCode,{children:"fn"})," as non-urgent."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx(n.InlineCode,{children:"useTransition()"}),":"]})," Hook returning"," ",e.jsx(n.InlineCode,{children:"[isPending, startTransition]"})," for local pending UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Interruptible rendering:"})," React can pause/throw away in-progress work when new urgent input arrives."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Beginner Pattern: Input (urgent) → Filter (transition)"}),e.jsx(n.Pre,{children:`import React, { useState, useTransition } from "react";

function Search({ items }) {
  const [text, setText] = useState("");
  const [results, setResults] = useState(items);
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const next = e.target.value;
    setText(next); // urgent: the input must update immediately

    startTransition(() => {
      // non-urgent: heavy filtering can lag; mark it as a transition
      const lower = next.trim().toLowerCase();
      const filtered = items.filter(it => it.name.toLowerCase().includes(lower));
      setResults(filtered);
    });
  }

  return (
    <div>
      <input value={text} onChange={onChange} placeholder="Type to search..." />
      {isPending && <p>Updating results…</p>}
      <ul>
        {results.map(r => <li key={r.id}>{r.name}</li>)}
      </ul>
    </div>
  );
}`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Rule of thumb:"})," update the input state urgently; wrap the heavy derived work in a transition."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:[e.jsx("code",{children:"startTransition"})," API"]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use the function from ",e.jsx(n.InlineCode,{children:"useTransition()"})," for local pending state, or ",e.jsx(n.InlineCode,{children:'import { startTransition } from "react"'})," ","for a global call (no ",e.jsx(n.InlineCode,{children:"isPending"})," feedback)."]}),e.jsxs("li",{children:["Wrap only the ",e.jsx("i",{children:"non-urgent"})," state updates. Don’t wrap the input’s own state."]})]}),e.jsx(n.Pre,{children:`import { startTransition } from "react";

function onRouteChange(nextPath) {
  // keep current screen responsive; prepare next screen in background
  startTransition(() => {
    // e.g., setRoute, load data in effects, etc.
  });
}`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:[e.jsx("code",{children:"useTransition"})," API"]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Signature:"})," ",e.jsx(n.InlineCode,{children:"const [isPending, startTransition] = useTransition();"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"isPending:"})," ",e.jsx("i",{children:"true"})," while the transition is outstanding. Great for spinners, dimming, or “skeleton” states."]}),e.jsxs("li",{children:[e.jsx("b",{children:"startTransition:"})," wrapper that marks updates non-urgent."]})]}),e.jsx(n.Pre,{children:`const [isPending, startTransition] = useTransition();

function onSortChange(nextSort) {
  startTransition(() => {
    // setSort(nextSort) -> triggers expensive re-render in a transition
  });
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Realistic Example: Tab Switch With Heavy Panel"}),e.jsx(n.Pre,{children:`import React, { useState, useTransition } from "react";

function Tabs({ panels }) {
  const [active, setActive] = useState(0);
  const [isPending, startTransition] = useTransition();

  function select(i) {
    // the click is urgent; the heavy panel render is non-urgent
    startTransition(() => setActive(i));
  }

  return (
    <div>
      <div role="tablist">
        {panels.map((p, i) => (
          <button
            key={p.id}
            role="tab"
            aria-selected={i === active}
            onClick={() => select(i)}
            disabled={isPending && i === active}
          >
            {p.title}
          </button>
        ))}
      </div>
      <div role="tabpanel" aria-busy={isPending}>
        {isPending ? <Skeleton /> : panels[active].content}
      </div>
    </div>
  );
}`}),e.jsx(n.Small,{children:"The previous tab stays visible until the next tab’s heavy content is ready, preventing flicker and keeping clicks snappy."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When to Use / Not Use"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use for:"})," filtering, sorting, pagination, tab/route changes, large list renders, chart updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid for:"})," form input echo, cursor position, button press feedback, “are we submitting?” flags — these are urgent."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Note:"})," Transitions don’t make work faster; they make it ",e.jsx("i",{children:"interruptible"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Patterns & Tips"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Split state:"})," urgent state for small, immediate UI; non-urgent derived state in transitions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Show progress:"})," wire ",e.jsx(n.InlineCode,{children:"isPending"})," to a small hint (spinner/dim/skeleton)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:["Combine with ",e.jsx(n.InlineCode,{children:"useDeferredValue"}),":"]})," defer a heavy value derived from urgent input to keep typing smooth."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoization helps:"})," if the heavy part mounts often, memo the expensive subtrees."]})]}),e.jsx(n.Pre,{children:`import React, { useDeferredValue } from "react";

function List({ query, items }) {
  const deferredQuery = useDeferredValue(query); // lags behind during typing
  const lower = deferredQuery.trim().toLowerCase();
  const filtered = items.filter(it => it.name.toLowerCase().includes(lower));
  return <BigList data={filtered} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Mistakes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Wrapping the input state in a transition."})," Don’t. The input must update instantly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Expecting a speedup."})," Work still takes time; it’s just scheduled better."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Forgetting UX feedback."})," No ",e.jsx(n.InlineCode,{children:"isPending"})," hint makes the app feel frozen even though it’s working."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Urgent update:"})," must render immediately (typing, click echo)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Non-urgent update:"})," can be prepared in background (filter, heavy rerender)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transition:"})," a non-urgent update marked via ",e.jsx(n.InlineCode,{children:"startTransition"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"isPending:"})," boolean flag while a transition is in progress."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Interruptible rendering:"})," React drops work when new urgent input arrives."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Keep interactions snappy by treating input as urgent and heavy UI changes as a transition. Use ",e.jsx("code",{children:"useTransition"})," for local pending feedback, and combine with"," ",e.jsx("code",{children:"useDeferredValue"})," when you need to lag heavy derived values behind fast input."]})]});export{s as default};
