import{j as e}from"./index-XTJb1MLF.js";import{S as t}from"./styled-DdHthaau.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"useState"}),e.jsxs(t.Lead,{children:[e.jsx(t.InlineCode,{children:"useState"})," adds local, reactive state to a function component. It returns a pair: the current value and a ",e.jsx("b",{children:"setter"})," to schedule updates."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Signature & terms"}),e.jsx(t.Pre,{children:`const [state, setState] = useState(initialState);
const [state, setState] = useState(() => initialState); // lazy init`}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State"}),": component-owned data that changes over time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Setter"}),": schedules an update. The value changes on the next render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Object.is"})," comparison: if the next value is Object.is-equal to the previous, React skips re-render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lazy initialization"}),": pass a function to run the initializer once at mount time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Functional updater"}),": ",e.jsx(t.InlineCode,{children:"setState(prev => next)"})," computes next from previous safely."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rule of hooks"}),": call at the top level (not in loops/conditions); call in the same order every render."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Basic counter"}),e.jsx(t.Pre,{children:`import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} time(s)
    </button>
  );
}`}),e.jsx(t.Small,{children:"Reading the updated value immediately after calling the setter during the same event will still show the old value; the update appears on the next render."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Functional updater (avoid stale values)"}),e.jsx(t.Pre,{children:`function AddThree() {
  const [n, setN] = useState(0);
  function handle() {
    setN(v => v + 1);
    setN(v => v + 1);
    setN(v => v + 1); // n increases by 3 in one render
  }
  return <button onClick={handle}>n = {n}</button>;
}

// Safe inside timers/subscriptions as well:
React.useEffect(() => {
  const id = setInterval(() => setN(v => v + 1), 1000);
  return () => clearInterval(id);
}, []);`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Lazy initialization"}),e.jsx(t.Pre,{children:`function Search() {
  const [index, setIndex] = useState(() => buildIndexOnce()); // runs once on mount
  // ...
  return null;
}`}),e.jsx(t.Small,{children:"Use a function initializer for heavy work so it doesn’t run on every render."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Objects vs multiple state variables"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Using several ",e.jsx(t.InlineCode,{children:"useState"})," calls keeps updates simple and localized."]}),e.jsxs("li",{children:[e.jsx(t.InlineCode,{children:"useState"})," replaces the value; it does not merge objects like class ",e.jsx("code",{children:"setState"}),"."]})]}),e.jsx(t.Pre,{children:`// Separate pieces
const [first, setFirst] = useState("");
const [last, setLast] = useState("");

// Object (remember to copy)
const [user, setUser] = useState({ first: "", last: "" });
setUser(prev => ({ ...prev, first: "Ada" }));`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Arrays & immutable updates"}),e.jsx(t.Pre,{children:`const [todos, setTodos] = useState([]);

function add(todo) {
  setTodos(prev => [...prev, todo]);                 // add
}
function remove(id) {
  setTodos(prev => prev.filter(t => t.id !== id));   // remove
}
function update(id, patch) {
  setTodos(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t)); // update
}`}),e.jsxs(t.Small,{children:["Return new arrays/objects. Avoid mutating helpers like ",e.jsx("code",{children:"push"}),", ",e.jsx("code",{children:"sort"}),", or ",e.jsx("code",{children:"reverse"})," on state."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Booleans & toggles"}),e.jsx(t.Pre,{children:`const [open, setOpen] = useState(false);
const toggle = () => setOpen(v => !v);
`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Resetting state"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Set back to the initial value with the setter."}),e.jsxs("li",{children:["To reset an entire subtree, change its ",e.jsx(t.InlineCode,{children:"key"})," so React remounts it."]})]}),e.jsx(t.Pre,{children:`// Local reset
setForm({ name: "", email: "" });

// Remount reset for a component subtree
<Form key={version} initial={defaults} />`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Development Strict Mode note"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"In development, React may invoke components and initializers twice to surface side-effect bugs. Production runs once."}),e.jsx("li",{children:"Initializers should be pure (no network calls or subscriptions)."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common pitfalls"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Expecting the state variable to change immediately after calling the setter in the same event."}),e.jsx("li",{children:"Computing the next value from a possibly stale variable instead of using the functional updater."}),e.jsx("li",{children:"Mutating arrays/objects in place and passing the same reference back to the setter."}),e.jsxs("li",{children:["Switching a field between controlled and uncontrolled (e.g., ",e.jsx(t.InlineCode,{children:"value"})," sometimes ",e.jsx("code",{children:"undefined"}),"); keep the mode consistent."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do / Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use the functional updater when next depends on previous."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use lazy initialization for heavy initial work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep updates immutable (return new objects/arrays)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," expect immediate reads after ",e.jsx(t.InlineCode,{children:"setState"}),"; read on the next render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," store derived values; compute during render or memoize if expensive."]})]})]}),e.jsxs(t.Callout,{children:["Summary: ",e.jsx(t.InlineCode,{children:"useState"})," stores local data and triggers re-renders on changes. Prefer functional updaters for correctness, initialize lazily when needed, and keep updates immutable so React can detect changes efficiently."]})]});export{i as default};
