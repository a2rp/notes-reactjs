import{j as e}from"./index-DqLKwkYK.js";import{S as t}from"./styled-BB_Z6cYV.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"useState Basics"}),e.jsxs(t.Lead,{children:[e.jsx(t.InlineCode,{children:"useState"})," lets a function component hold local state. Call it to get a ",e.jsx("b",{children:"state value"})," and a ",e.jsx("b",{children:"setter function"}),". Updating state queues a re-render."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Terminology (precise)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State:"})," component-owned data that can change over time (count, form fields, UI flags)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Setter:"})," the function returned by ",e.jsx(t.InlineCode,{children:"useState"})," that schedules a state update."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render:"})," React calls the component to produce JSX (no DOM changes yet)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Re-render:"})," the component runs again because props/state/context changed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mount / Update:"})," the first render is a mount; subsequent renders are updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Functional updater:"})," ",e.jsx(t.InlineCode,{children:"setX(prev => next)"})," form that receives the ",e.jsx("em",{children:"previous"})," value safely."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Initial state function:"})," ",e.jsx(t.InlineCode,{children:"useState(() => compute())"})," runs once on mount to avoid doing heavy work on every render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale closure:"})," using an ",e.jsx("em",{children:"old"})," state value captured by a function; fixed by the functional updater."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Basic usage"}),e.jsx(t.Pre,{children:`import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0); // initial state = 0

  return (
    <button onClick={() => setCount(count + 1)}>
      Clicked {count} time(s)
    </button>
  );
}`}),e.jsxs(t.Small,{children:["The setter ",e.jsx("em",{children:"schedules"})," an update. The new value appears on the next render."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Reading state right after ",e.jsx("code",{children:"setState"})]}),e.jsx("p",{children:"Setting state doesn’t change the variable immediately in the same render. Read the updated value on the next render or use the functional updater when the next value depends on the previous one."}),e.jsx(t.Pre,{children:`function Demo() {
  const [n, setN] = useState(0);

  function handle() {
    setN(n + 1);
    console.log("Still old value in this tick:", n); // prints previous n
  }

  return <button onClick={handle}>n = {n}</button>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Functional updater (safe when based on previous)"}),e.jsx(t.Pre,{children:`function Counter() {
  const [count, setCount] = useState(0);

  // Safe for multiple updates in one tick
  function add3() {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  }

  // Safe inside timers/subscriptions (stale closure protection)
  React.useEffect(() => {
    const id = setInterval(() => setCount(c => c + 1), 1000);
    return () => clearInterval(id);
  }, []);

  return <button onClick={add3}>Count: {count}</button>;
}`}),e.jsx(t.Small,{children:"Prefer the updater form whenever the new value depends on the previous value."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Initial state & lazy initialization"}),e.jsx(t.Pre,{children:`// Heavy compute? Use a function so it runs only on mount
function Search() {
  const [index, setIndex] = useState(() => buildIndexOnce()); // lazy init
  ...
}`}),e.jsxs(t.Small,{children:["Passing ",e.jsx(t.InlineCode,{children:"(() => initial)"})," avoids doing work on every render."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Multiple states vs a single object"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Using several ",e.jsx(t.InlineCode,{children:"useState"})," calls keeps updates localized and simple."]}),e.jsxs("li",{children:[e.jsx(t.InlineCode,{children:"useState"})," ",e.jsx("b",{children:"replaces"})," the value; it does ",e.jsx("em",{children:"not"})," merge objects. When storing objects, create a new object."]})]}),e.jsx(t.Pre,{children:`// Separate pieces (simple)
const [first, setFirst] = useState("");
const [last, setLast] = useState("");

// Single object (remember to copy!)
const [user, setUser] = useState({ first: "", last: "" });
setUser(prev => ({ ...prev, first: "Ada" })); // merge manually`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Arrays: always return a new array"}),e.jsx(t.Pre,{children:`const [todos, setTodos] = useState([]);

function add(todo) {
  setTodos(prev => [...prev, todo]);      // add
}
function remove(id) {
  setTodos(prev => prev.filter(t => t.id !== id)); // remove
}
function update(id, patch) {
  setTodos(prev => prev.map(t => t.id === id ? { ...t, ...patch } : t));
}`}),e.jsxs(t.Small,{children:["Mutating in place (e.g., ",e.jsx("code",{children:"push"}),", ",e.jsx("code",{children:"splice"})," on the existing array) won’t notify React reliably. Return new arrays/objects."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Initializing from props (avoid stale copies)"}),e.jsx("p",{children:"If a field should start from a prop and then be edited locally, initialize once. To intentionally reset on a change, use a key or sync in an effect."}),e.jsx(t.Pre,{children:`// Initialize once, then own it locally
function Editor({ initial }) {
  const [text] = React.useState(initial);
  // ... user edits 'text' locally
}

// Reset when 'version' changes (intentional)
function Editor({ value, version }) {
  const [text, setText] = React.useState(value);
  React.useEffect(() => setText(value), [value, version]);
  return <textarea value={text} onChange={e => setText(e.target.value)} />;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Batching (pointer)"}),e.jsxs("p",{children:["React groups multiple state updates in the same tick into a single render/commit for performance. Details and edge cases are covered in the next page ",e.jsx("b",{children:"Batching"}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common pitfalls"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Expecting ",e.jsx(t.InlineCode,{children:"setState"})," to change the variable immediately in the same render—read the new value on the next render."]}),e.jsx("li",{children:"Updating based on an old value without the functional updater (e.g., inside timers or multiple sets in one handler)."}),e.jsx("li",{children:"Mutating arrays/objects in place—always return new copies."}),e.jsx("li",{children:"Switching between different shapes or types for the same state, causing conditional logic bugs."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do / Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use the functional updater when the next value depends on the previous one."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use lazy initialization for heavy initial computations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep related pieces of state together; otherwise prefer separate ",e.jsx(t.InlineCode,{children:"useState"})," calls."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate arrays/objects; return new ones."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," expect immediate reads after ",e.jsx(t.InlineCode,{children:"setState"}),"; rely on the next render."]})]})]}),e.jsxs(t.Callout,{children:["Summary: ",e.jsx(t.InlineCode,{children:"useState"})," stores local, reactive data. Use the functional updater for correctness, initialize lazily when needed, and keep updates immutable so React can detect and render changes efficiently."]})]});export{i as default};
