import{j as e}from"./index-CEhT6f_w.js";import{S as t}from"./styled-Bb2WVd4b.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"useReducer"}),e.jsxs(t.Lead,{children:[e.jsx(t.InlineCode,{children:"useReducer"})," centralizes complex state updates in a",e.jsx("b",{children:" pure reducer function"}),". It is ideal when updates are multi-step, the state is nested, or many events lead to the same transitions."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Signature & terminology"}),e.jsx(t.Pre,{children:`const [state, dispatch] = useReducer(reducer, initialArg, init?);

// reducer: (state, action) => nextState   // must be pure & immutable
// action:  { type: string, ...payload }   // a plain object describing "what happened"
// init:    (initialArg) => initialState   // optional lazy initializer, runs once on mount`}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State:"})," the current value managed by the reducer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action:"})," a plain object describing the event that occurred."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dispatch:"})," a stable function used to send actions to the reducer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pure reducer:"})," no side effects, no mutations, same inputs → same output."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lazy init:"})," costly initial state can be computed once with ",e.jsx(t.InlineCode,{children:"init"}),"."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"When to use"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Multiple updates must stay in sync or follow rules (state machine vibe)."}),e.jsx("li",{children:"Many different events change the same state in related ways."}),e.jsxs("li",{children:["Nested/complex state where switch cases are clearer than many ",e.jsx(t.InlineCode,{children:"setState"})," calls."]}),e.jsxs("li",{children:["Prop drilling of handlers becomes messy; sharing ",e.jsx(t.InlineCode,{children:"dispatch"})," is simpler."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Todos reducer"}),e.jsx(t.Pre,{children:`function todosReducer(state, action) {
  switch (action.type) {
    case "added": {
      const { id, text } = action;
      return [...state, { id, text, done: false }];
    }
    case "toggled": {
      const { id } = action;
      return state.map(t => t.id === id ? { ...t, done: !t.done } : t);
    }
    case "removed": {
      const { id } = action;
      return state.filter(t => t.id !== id);
    }
    case "renamed": {
      const { id, text } = action;
      return state.map(t => t.id === id ? { ...t, text } : t);
    }
    default:
      return state; // unknown actions return current state
  }
}

function TodosApp() {
  const [text, setText] = React.useState("");
  const [todos, dispatch] = React.useReducer(todosReducer, []);

  function add() {
    if (!text.trim()) return;
    dispatch({ type: "added", id: Date.now(), text });
    setText("");
  }

  return (
    <>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={add}>Add</button>
      <ul>
        {todos.map(t => (
          <li key={t.id}>
            <label>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: "toggled", id: t.id })}
              />
              {t.text}
            </label>
            <button onClick={() => dispatch({ type: "removed", id: t.id })}>x</button>
          </li>
        ))}
      </ul>
    </>
  );
}`}),e.jsx(t.Small,{children:"All updates flow through the reducer, keeping the rules in one place and updates immutable."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Lazy initialization"}),e.jsx(t.Pre,{children:`function init(savedJson) {
  try {
    const parsed = JSON.parse(savedJson || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function App() {
  const [todos, dispatch] = React.useReducer(todosReducer, localStorage.getItem("todos"), init);

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // ...
  return null;
}`}),e.jsxs(t.Small,{children:[e.jsx(t.InlineCode,{children:"init"})," runs only on mount. Use it to parse, normalize, or hydrate initial state once."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Action shape (naming & creators)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Use past-tense or event-like names: ",e.jsx(t.InlineCode,{children:'"added"'}),", ",e.jsx(t.InlineCode,{children:'"removed"'}),", ",e.jsx(t.InlineCode,{children:'"toggled"'}),"."]}),e.jsxs("li",{children:["Prefer a single ",e.jsx(t.InlineCode,{children:"type"})," string and a small payload; avoid deeply nested payloads."]}),e.jsx("li",{children:"Optional helpers keep call sites clean."})]}),e.jsx(t.Pre,{children:`const addTodo    = (id, text) => ({ type: "added", id, text });
const toggleTodo = (id)       => ({ type: "toggled", id });
const removeTodo = (id)       => ({ type: "removed", id });`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Side effects with reducers"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Reducers must be pure: no fetch, no timers, no DOM mutations inside."}),e.jsxs("li",{children:["Handle effects in event handlers or ",e.jsx(t.InlineCode,{children:"useEffect"})," responding to state changes."]}),e.jsxs("li",{children:["Async flows: dispatch a sequence such as ",e.jsx(t.InlineCode,{children:'"fetch-started"'})," → ",e.jsx(t.InlineCode,{children:'"fetch-succeeded"'})," or ",e.jsx(t.InlineCode,{children:'"fetch-failed"'}),"."]})]}),e.jsx(t.Pre,{children:`function reducer(state, action) {
  switch (action.type) {
    case "load-start":   return { ...state, status: "loading" };
    case "load-success": return { ...state, status: "ready", data: action.data };
    case "load-error":   return { ...state, status: "error", error: action.error };
    default:             return state;
  }
}

function Products() {
  const [state, dispatch] = React.useReducer(reducer, { status: "idle", data: null, error: null });

  React.useEffect(() => {
    let cancelled = false;
    dispatch({ type: "load-start" });
    fetch("/api/products")
      .then(r => { if (!r.ok) throw new Error("HTTP " + r.status); return r.json(); })
      .then(data => { if (!cancelled) dispatch({ type: "load-success", data }); })
      .catch(err => { if (!cancelled) dispatch({ type: "load-error", error: String(err) }); });
    return () => { cancelled = true; };
  }, []);

  // render based on state.status...
  return null;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Organizing large reducers"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Split"})," by feature and combine at a higher level (multiple ",e.jsx(t.InlineCode,{children:"useReducer"})," calls)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compose"})," reducers: a parent reducer delegates part of the state to child reducers."]}),e.jsx("li",{children:"For deeply nested updates, consider normalizing state or using a reducer helper like Immer for ergonomics."})]}),e.jsx(t.Pre,{children:`function childA(state, action) { /* ... */ return state; }
function childB(state, action) { /* ... */ return state; }

function root(state, action) {
  return {
    a: childA(state.a, action),
    b: childB(state.b, action)
  };
}

const [state, dispatch] = React.useReducer(root, { a: {}, b: {} });`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"useReducer + context (simple app store)"}),e.jsx(t.Pre,{children:`const StoreContext = React.createContext(null);

function StoreProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => ({ state, dispatch }), [state]); // memoize identity
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}`}),e.jsxs(t.Small,{children:["Consumers read ",e.jsx(t.InlineCode,{children:"state"})," and call ",e.jsx(t.InlineCode,{children:"dispatch"}),". Split contexts for state vs dispatch if needed for performance."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Performance notes"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"dispatch is stable"}),"; its identity does not change between renders."]}),e.jsx("li",{children:"Large top-level state causes many consumers to re-render on each change. Split state or providers when necessary."}),e.jsxs("li",{children:["Keep reducers fast and pure; derive values in render or with ",e.jsx(t.InlineCode,{children:"useMemo"})," if heavy."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common pitfalls"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Mutating state inside the reducer; always return new objects/arrays."}),e.jsx("li",{children:"Embedding side effects in reducers; move them to effects or handlers."}),e.jsx("li",{children:"Saving derived state in the reducer; compute during render or memoize."}),e.jsx("li",{children:"Very broad context with frequently changing state causing app-wide renders; scope the provider."}),e.jsx("li",{children:"Forgetting a default case that returns the current state."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do / Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(t.InlineCode,{children:"useReducer"})," for complex or related updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep reducers pure and immutable; test them as pure functions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use lazy initialization for expensive initial state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," perform side effects in reducers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," duplicate derived data in state; derive it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," let a single massive reducer handle unrelated concerns—split or compose."]})]})]}),e.jsxs(t.Callout,{children:["Summary: ",e.jsx(t.InlineCode,{children:"useReducer"})," shines when updates are coordinated and rules-driven. Keep reducers pure, use actions to describe changes, derive computed values, and combine with context to share state cleanly across a subtree."]})]});export{i as default};
