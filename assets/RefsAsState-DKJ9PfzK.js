import{j as e}from"./index-DqLKwkYK.js";import{S as n}from"./styled-bitiOoJc.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Anti-Pattern: Refs as State"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"TL;DR:"})," ",e.jsx(n.InlineCode,{children:"useRef"})," holds a mutable value that"," ",e.jsx("i",{children:"does not"})," trigger re-renders. If the UI should update when a value changes, that value belongs in ",e.jsx(n.InlineCode,{children:"state"}),", not in a ref. Storing “render-relevant” data in a ref is the ",e.jsx("b",{children:"Refs-as-State anti-pattern"}),"."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definitions (Clear & Precise)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State:"})," Data that influences rendering. Changing state with"," ",e.jsx(n.InlineCode,{children:"setState"})," schedules a re-render so the UI shows the new value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ref:"})," A persistent, mutable container (",e.jsx(n.InlineCode,{children:"{ current: T }"}),") that survives re-renders but ",e.jsx("i",{children:"does not cause"})," a re-render when changed. Refs are often used to reference DOM nodes or store ",e.jsx("i",{children:"non-visual"})," mutable values (like a timeout id)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render-relevant data:"})," Any data that, if changed, should be visible in the UI (text, counts, toggles, lists, derived labels, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Anti-pattern (Refs as State):"})," Putting render-relevant data in a ref and manually poking the DOM or otherwise hoping React will notice. It won't."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"How to Recognize the Smell"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["You update ",e.jsx(n.InlineCode,{children:"ref.current"})," and expect the UI to change—but nothing happens until some unrelated state update occurs."]}),e.jsxs("li",{children:["You start calling DOM APIs (like ",e.jsx(n.InlineCode,{children:"innerText"}),") to “force” the screen to match ",e.jsx(n.InlineCode,{children:"ref.current"}),"."]}),e.jsxs("li",{children:["You feel tempted to use hacky workarounds like a dummy state (“",e.jsx("code",{children:"forceUpdate"}),"”) just to refresh the UI after changing a ref."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Bad Example: Counter stored in a ref"}),e.jsx(n.Pre,{children:`function BadCounter() {
  const countRef = React.useRef(0);

  function increment() {
    countRef.current += 1;       // ❌ Changes a ref only
    // UI won't re-render, so the screen won't show the new value
  }

  return (
    <div>
      <p>Count: {countRef.current}</p>  {/* ❌ stale on screen */}
      <button onClick={increment}>+1</button>
    </div>
  );
}`}),e.jsx(n.Small,{children:"Problem: The paragraph won't update, because changing a ref doesn't trigger a re-render."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Good Example: Counter stored in state"}),e.jsx(n.Pre,{children:`function GoodCounter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p>Count: {count}</p>      {/* ✅ always in sync with UI */}
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  );
}`}),e.jsx(n.Small,{children:"Fix: Store render-relevant data in state so React re-renders when it changes."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When Refs are the Right Tool"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"DOM access:"})," Focus a field, measure size/position, scroll into view. (",e.jsx(n.InlineCode,{children:"ref"})," holds an element)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Instance variables:"})," Store values that must persist across renders but don't belong in the UI (e.g., a timeout id, an AbortController, a previous value snapshot)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," Cache non-visual mutable info to avoid re-renders (e.g., throttling flags) while the visible UI is driven by state."]})]}),e.jsx(n.Pre,{children:`function SearchBox() {
  const inputRef = React.useRef(null);       // ✅ DOM node reference
  React.useEffect(() => { inputRef.current?.focus(); }, []);
  return <input ref={inputRef} placeholder="Type to search..." />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Mixed Case: State + Ref (each for its job)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"state"})," for the value rendered on screen (e.g., text shown in the input)."]}),e.jsxs("li",{children:["Use a ",e.jsx("b",{children:"ref"})," for imperative helpers (e.g., focus control, caret tracking, transient flags) that don't need to render."]})]}),e.jsx(n.Pre,{children:`function ChatBox() {
  const [message, setMessage] = React.useState("");
  const inputRef = React.useRef(null);
  const lastTypedAtRef = React.useRef(0);   // ⏱️ not shown in UI

  function onChange(e) {
    setMessage(e.target.value);             // ✅ state drives UI
    lastTypedAtRef.current = Date.now();    // ✅ ref stores non-visual info
  }

  function focusInput() {
    inputRef.current?.focus();              // ✅ imperative DOM op
  }

  return (
    <>
      <input ref={inputRef} value={message} onChange={onChange} />
      <button onClick={focusInput}>Focus</button>
    </>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Misuse → Correct Fix"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Misuse:"})," Keep a list in a ref and push/pop items, expecting the UI list to update.",e.jsx("br",{}),e.jsx("b",{children:"Fix:"})," Store the list in state and update immutably (create a new array)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Misuse:"})," Put a toggle (",e.jsx(n.InlineCode,{children:"isOpen"}),") in a ref and manually change class names via the DOM.",e.jsx("br",{}),e.jsx("b",{children:"Fix:"})," Put the toggle in state; let JSX conditionally render classes or elements."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Misuse:"})," Use a ref to “remember” a number that should redraw the chart.",e.jsx("br",{}),e.jsx("b",{children:"Fix:"})," Keep the number in state; pass it as a prop to the chart component."]})]}),e.jsx(n.Pre,{children:`// ❌ Misuse: list in a ref, UI never updates
function BadTodos() {
  const listRef = React.useRef(["Read"]);
  const add = () => { listRef.current.push("Write"); }; // no re-render
  return (
    <div>
      <button onClick={add}>Add</button>
      <ul>{listRef.current.map((t, i) => <li key={i}>{t}</li>)}</ul> {/* stale */}
    </div>
  );
}

// ✅ Fix: list in state
function GoodTodos() {
  const [list, setList] = React.useState(["Read"]);
  const add = () => setList(prev => [...prev, "Write"]);
  return (
    <div>
      <button onClick={add}>Add</button>
      <ul>{list.map((t, i) => <li key={i}>{t}</li>)}</ul>
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Subtle Trap: Using Refs to “Avoid Re-renders”"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Refs are not a performance silver bullet. If the UI depends on a value, that value must be state so React can render it correctly."}),e.jsxs("li",{children:["Prematurely stuffing things into refs can create ",e.jsx("b",{children:"invisible bugs"})," and make the UI drift from the data."]}),e.jsxs("li",{children:["For performance, prefer ",e.jsx(n.InlineCode,{children:"useMemo"})," /"," ",e.jsx(n.InlineCode,{children:"useCallback"})," /"," ",e.jsx(n.InlineCode,{children:"React.memo"})," before resorting to non-reactive refs."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Decision Guide"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Does changing this value need to update the UI?"})," Yes → ",e.jsx("b",{children:"State"}),". No → maybe"," ",e.jsx("b",{children:"Ref"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do I need to imperatively access a DOM node?"})," Yes → ",e.jsx("b",{children:"Ref"})," (to the element)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Is this a derived value from other state/props?"})," Compute with"," ",e.jsx(n.InlineCode,{children:"useMemo"})," or inside render, not a ref."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Re-render:"})," The process where React calls your component function again to produce updated UI from the latest state/props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutable:"})," A value you can change in place (like"," ",e.jsx(n.InlineCode,{children:"ref.current"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Immutable update:"})," Creating a new object/array when changing state so React can detect changes by reference."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived value:"})," A value computed from existing state/props (e.g.,"," ",e.jsx(n.InlineCode,{children:'fullName = first + " " + last'}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep render-relevant data in state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use refs for DOM nodes and non-visual mutable values (timers, controllers, flags)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate the DOM to “sync” with ref values—let React render from state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hide important UI values inside refs to “optimize.” It breaks correctness."]})]})]}),e.jsxs(n.Callout,{children:[e.jsx("b",{children:"Summary:"})," If the screen must change, store the value in ",e.jsx("i",{children:"state"}),". Use"," ",e.jsx("i",{children:"refs"})," for DOM handles and non-visual, persistent data. Avoid the Refs-as-State anti-pattern to keep your UI predictable, testable, and easy to reason about."]})]});export{r as default};
