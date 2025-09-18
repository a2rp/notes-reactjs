import{j as e}from"./index-DVAje__H.js";import{S as t}from"./styled-CGxYVbEH.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Batching"}),e.jsxs(t.Lead,{children:["Batching means React groups multiple state updates that happen in the",e.jsx("b",{children:" same event loop turn"})," and applies them in a single render/commit. This reduces work and avoids flicker. React 18 enables ",e.jsx("b",{children:"automatic batching"})," for updates from events, timeouts, promises, and more."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Terminology (precise)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Batch:"})," a set of state updates collected together and applied in one render/commit."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tick / Turn:"})," a single run of the JS event loop (e.g., one click handler, one timeout callback, one promise microtask chain)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Automatic batching:"})," in React 18+, updates queued during the same tick are batched even if they originate from ",e.jsx("em",{children:"promises, timeouts, or async/await"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"flushSync:"})," an escape hatch that forces React to flush updates",e.jsx("em",{children:"immediately"})," (separate commit) so the DOM reflects the change right away."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Handlers: multiple sets → one render/commit"}),e.jsx(t.Pre,{children:`import { useState } from "react";

function Counter() {
  const [n, setN] = useState(0);

  function add3() {
    setN(v => v + 1);
    setN(v => v + 1);
    setN(v => v + 1);
  }

  return <button onClick={add3}>n = {n}</button>;
}
// Clicking once results in a single render where n increases by 3.`}),e.jsxs(t.Small,{children:["Note the ",e.jsx("em",{children:"functional updater"})," ensures correctness if multiple updates are queued."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Async sources are batched (React 18+)"}),e.jsx(t.Pre,{children:`function AsyncDemo() {
  const [step, setStep] = React.useState(0);
  const [msg, setMsg] = React.useState("");

  async function run() {
    setMsg("Working...");
    await new Promise(r => setTimeout(r, 50));   // simulate async
    setStep(s => s + 1);
    setMsg("Done");
  }

  return <button onClick={run}>{msg || "Start"} (step: {step})</button>;
}
// The two updates after 'await' are batched together into one render/commit.`}),e.jsxs(t.Small,{children:["Updates inside ",e.jsx("code",{children:"Promise.then"}),", ",e.jsx("code",{children:"setTimeout"}),", and ",e.jsx("code",{children:"async/await"})," callbacks are batched by default."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"When updates won’t batch"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Updates separated by different event loop turns (e.g., two different timeouts firing at different times)."}),e.jsxs("li",{children:["Updates inside a ",e.jsx(t.InlineCode,{children:"flushSync"})," boundary (forced immediate flush)."]}),e.jsx("li",{children:"Updates from unrelated browser tasks like separate user events—each event forms its own batch."})]}),e.jsx(t.Pre,{children:`import { flushSync } from "react-dom";

function MeasureOnOpen() {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);

  function openAndMeasure() {
    // Ensure the dialog is committed before measuring:
    flushSync(() => setOpen(true));
    const rect = ref.current?.getBoundingClientRect();
    console.log("Height after open:", rect?.height);
  }

  return (
    <>
      <button onClick={openAndMeasure}>Open</button>
      {open && <div ref={ref} role="dialog">Dialog content</div>}
    </>
  );
}`}),e.jsxs(t.Small,{children:["Use ",e.jsx("code",{children:"flushSync"})," sparingly—only when the DOM must reflect a change",e.jsx("em",{children:"before"})," the next line runs (measurements, imperative APIs)."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Reading state in the same tick"}),e.jsx("p",{children:"State variables do not update immediately after calling the setter during the same render. Read the latest value:"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"On the next render (normal pattern),"}),e.jsxs("li",{children:["Or via the functional updater argument (",e.jsx(t.InlineCode,{children:"prev"}),"),"]}),e.jsx("li",{children:"Or by scheduling work in an effect that runs after commit."})]}),e.jsx(t.Pre,{children:`function Clicks() {
  const [count, setCount] = React.useState(0);

  function handleClick() {
    setCount(c => {
      const next = c + 1;
      console.log("Next value that will be rendered:", next);
      return next;
    });
  }

  React.useEffect(() => {
    console.log("Rendered with:", count); // confirmed after commit
  }, [count]);

  return <button onClick={handleClick}>{count}</button>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Batching and priorities (quick note)"}),e.jsx(t.List,{children:e.jsxs("li",{children:["React can batch updates of different priorities. For example, an urgent input update and a non-urgent list filter inside a ",e.jsx(t.InlineCode,{children:"startTransition"})," can be scheduled together, but the UI remains responsive because the heavy work is lower priority."]})}),e.jsx(t.Pre,{children:`import { useState, useTransition } from "react";

function Search({ items }) {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();

  function onChange(e) {
    const q = e.target.value;
    setText(q); // urgent (keeps input fast)
    startTransition(() => {
      // non-urgent: expensive filtering work
      // setFiltered(...)
    });
  }

  return (
    <>
      <input value={text} onChange={onChange} />
      {isPending && <span>Filtering…</span>}
    </>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common pitfalls"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Assuming each ",e.jsx(t.InlineCode,{children:"setState"})," causes an immediate render—React batches in the same tick."]}),e.jsx("li",{children:"Computing the next value from a possibly stale variable—use the functional updater."}),e.jsxs("li",{children:["Measuring layout right after ",e.jsx(t.InlineCode,{children:"setState"})," without waiting for commit—use"," ",e.jsx(t.InlineCode,{children:"useLayoutEffect"})," or ",e.jsx(t.InlineCode,{children:"flushSync"})," when truly needed."]}),e.jsxs("li",{children:["Confusing dev ",e.jsx("b",{children:"Strict Mode"})," double-invocations (development only) with multiple commits; production will not double-invoke."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do / Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," rely on batching to reduce renders; group related updates in one handler."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use functional updaters when next value depends on previous."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(t.InlineCode,{children:"flushSync"})," only for immediate DOM reads/measurements."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," assume state reads change instantly after ",e.jsx(t.InlineCode,{children:"setState"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," sprinkle ",e.jsx(t.InlineCode,{children:"flushSync"})," everywhere—it can hurt performance."]})]})]}),e.jsxs(t.Callout,{children:["Summary: in React 18, updates queued in the same tick are automatically batched— across events, timeouts, and promises. Use functional updaters for correctness, and reach for ",e.jsx("code",{children:"flushSync"})," only when immediate DOM reads are required."]})]});export{i as default};
