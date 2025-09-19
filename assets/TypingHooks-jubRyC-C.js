import{j as e}from"./index-Der9nZEc.js";import{S as n}from"./styled-BPDb2uQ9.js";const i=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Typing Hooks (TypeScript)"}),e.jsxs(n.Lead,{children:["“Typing hooks” means adding ",e.jsx("b",{children:"TypeScript types"})," so React hooks are safe and autocomplete-friendly. Lean on ",e.jsx("b",{children:"type inference"})," first; add ",e.jsx("b",{children:"annotations"})," when state can't be inferred (e.g., ",e.jsx("i",{children:"null"})," initial values) or when you want stricter APIs."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Terms (Quick Definitions)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Type inference:"})," TypeScript figures out a type from the value (no annotation needed)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Annotation:"})," Writing the type explicitly, e.g., ",e.jsx(n.InlineCode,{children:"useState<number>(0)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Generic:"})," A reusable type/function with a type parameter, e.g., ",e.jsx(n.InlineCode,{children:"function wrap<T>(x: T): T"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Union type:"})," A value can be one of several types, e.g., ",e.jsx(n.InlineCode,{children:"string | null"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Narrowing:"})," Refining a broad type to a more specific one via checks, e.g., ",e.jsx(n.InlineCode,{children:"if (value !== null)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dispatch/SetStateAction:"})," React's setter types: ",e.jsx(n.InlineCode,{children:"React.Dispatch<React.SetStateAction<T>>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"MutableRefObject<T>:"})," The type of ",e.jsx(n.InlineCode,{children:"useRef"}),"'s object (",e.jsx(n.InlineCode,{children:"{ current: T }"}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Typing ",e.jsx("code",{children:"useState"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prefer inference:"})," if you pass a ",e.jsx("i",{children:"non-null"})," initial value, TS infers the state type."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Annotate unions:"})," if initial value is ",e.jsx("i",{children:"null"})," or ambiguous, provide a generic like ",e.jsx(n.InlineCode,{children:"<T | null>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Setter type:"})," ",e.jsx(n.InlineCode,{children:"React.Dispatch<React.SetStateAction<T>>"})," accepts a value ",e.jsx("i",{children:"or"})," a function that receives previous state."]})]}),e.jsx(n.Pre,{children:`// ✅ Inference from initial value
const [count, setCount] = React.useState(0);             // number
const [title, setTitle] = React.useState("Hello");       // string
const [flags, setFlags] = React.useState([true, false]); // boolean[]

// ✅ Union when null is valid (common for async data)
type User = { id: string; name: string };
const [user, setUser] = React.useState<User | null>(null);

// ✅ Functional update is typed automatically
setCount(c => c + 1);

// ✅ Lazy initialization keeps type
const [expensive, setExpensive] = React.useState<number>(() => computeHeavy());

// ⚠️ If you omit the generic with null, TS infers 'null' and you'll fight types later
// const [bad, setBad] = React.useState(null); // type: null (too narrow)`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Typing ",e.jsx("code",{children:"useRef"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"DOM refs:"})," use ",e.jsx(n.InlineCode,{children:"HTMLElement"})," subtypes and allow ",e.jsx("i",{children:"null"})," at start. Example: ",e.jsx(n.InlineCode,{children:"useRef<HTMLDivElement | null>(null)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutable boxes:"})," store mutable values across renders without causing re-renders:",e.jsx(n.InlineCode,{children:"useRef<T>(initial)"})," ⇒ ",e.jsx(n.InlineCode,{children:"MutableRefObject<T>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Remember:"})," changing ",e.jsx(n.InlineCode,{children:"ref.current"})," does ",e.jsx("i",{children:"not"})," trigger a render."]})]}),e.jsx(n.Pre,{children:`// DOM node ref
const divRef = React.useRef<HTMLDivElement | null>(null);

// Timer id ref (Node, Browser)
const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

// Mutable box (e.g., latest value or a flag)
const isDraggingRef = React.useRef(false);

// Safe usage with narrowing
if (divRef.current) {
  const rect = divRef.current.getBoundingClientRect();
  console.log(rect.width);
}`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Typing ",e.jsx("code",{children:"useEffect"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Effect function:"})," type is inferred. The returned ",e.jsx("b",{children:"cleanup"})," must be ",e.jsx(n.InlineCode,{children:"() => void"})," (or nothing)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Subscribing to native events:"})," when using ",e.jsx(n.InlineCode,{children:"addEventListener"}),", type the handler using DOM event types like ",e.jsx(n.InlineCode,{children:"KeyboardEvent"})," / ",e.jsx(n.InlineCode,{children:"MouseEvent"}),"."]})]}),e.jsx(n.Pre,{children:`React.useEffect(() => {
  function onKey(e: KeyboardEvent) {
    if (e.key === "Escape") {
      // ...
    }
  }
  window.addEventListener("keydown", onKey);
  return () => window.removeEventListener("keydown", onKey);
}, []);`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Typing ",e.jsx("code",{children:"useMemo"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Inference first:"})," return value determines the memo's type."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Annotate when needed:"})," use a generic if the return type can't be inferred cleanly."]})]}),e.jsx(n.Pre,{children:`// Inference from return value
const total = React.useMemo(() => prices.reduce((a, b) => a + b, 0), [prices]); // number

// Explicit annotation (rarely needed)
const ids = React.useMemo<string[]>(
  () => users.map(u => u.id),
  [users]
);`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Typing ",e.jsx("code",{children:"useCallback"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Inference:"})," TS infers parameters/return from the function you pass. If you want a stricter signature, add a function type."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Event handlers:"})," You can use React's event handler types like",e.jsx(n.InlineCode,{children:" React.MouseEventHandler<HTMLButtonElement>"}),"."]})]}),e.jsx(n.Pre,{children:`// Inferred
const onSelect = React.useCallback((id: string) => {
  // ...
}, []);

// Explicit function type (alternative)
type SelectHandler = (id: string) => void;
const onSelect2: SelectHandler = React.useCallback((id) => { /* ... */ }, []);

// React event handler type
const onBtnClick: React.MouseEventHandler<HTMLButtonElement> =
  React.useCallback((e) => {
    console.log(e.currentTarget.name);
  }, []);`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Quick Note: ",e.jsx("code",{children:"useReducer"})," Types"]}),e.jsx(n.Small,{children:"You'll deep-dive this in “Typing Reducers”. Here's the shape:"}),e.jsx(n.Pre,{children:`type State = { count: number };
type Action =
  | { type: "inc"; step?: number }
  | { type: "dec"; step?: number }
  | { type: "reset" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "inc": return { count: state.count + (action.step ?? 1) };
    case "dec": return { count: state.count - (action.step ?? 1) };
    case "reset": return { count: 0 };
  }
}

const [state, dispatch] = React.useReducer(reducer, { count: 0 });
// dispatch is React.Dispatch<Action>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Typing Custom Hooks with Generics"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why generics?"})," Let consumers decide the data type, keeping the hook reusable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Return shapes:"})," Prefer an object for named fields or a tuple marked ",e.jsx(n.InlineCode,{children:"as const"})," for stable positions."]})]}),e.jsx(n.Pre,{children:`// Generic data fetcher (demo style)
type AsyncState<T> =
  | { status: "idle"; data: null; error: null }
  | { status: "loading"; data: null; error: null }
  | { status: "success"; data: T; error: null }
  | { status: "error"; data: null; error: unknown };

export function useFetch<T>(url: string): AsyncState<T> {
  const [state, setState] = React.useState<AsyncState<T>>({ status: "idle", data: null, error: null });

  React.useEffect(() => {
    let cancel = false;
    setState({ status: "loading", data: null, error: null });

    fetch(url)
      .then(r => r.json() as Promise<T>)
      .then(data => !cancel && setState({ status: "success", data, error: null }))
      .catch(err => !cancel && setState({ status: "error", data: null, error: err }));

    return () => { cancel = true; };
  }, [url]);

  return state;
}

// Usage:
type User = { id: string; name: string };
const usersState = useFetch<User[]>("/api/users");`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Patterns · Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," rely on inference; annotate only when inference isn't enough."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," model “not yet loaded” with unions (",e.jsx(n.InlineCode,{children:"T | null"})," or status enums)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," type DOM refs as ",e.jsx(n.InlineCode,{children:"Element | null"})," and narrow before use."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," use ",e.jsx(n.InlineCode,{children:"any"}),"—prefer generics and proper unions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," store reactive state in refs (they don't trigger renders)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," over-annotate simple cases; it adds noise without benefits."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Mini Glossary (Hooks Context)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Cleanup:"})," a function returned from an effect to undo subscriptions/timers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dependency array:"})," list of values a hook depends on; changes re-run the hook work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stale closure:"})," a function closes over old values; fix by listing deps or using refs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tuple:"})," a fixed-length array with positional meaning, e.g., ",e.jsx(n.InlineCode,{children:"[state, setState]"}),"."]})]})]}),e.jsx(n.Callout,{children:"Summary: start with inference, add precise annotations for unions and refs, use generics for reusable custom hooks, and keep reducers/actions strongly typed for safety and autocomplete."})]});export{i as default};
