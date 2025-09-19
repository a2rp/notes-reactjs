import{j as e}from"./index-BUVRD3Bm.js";import{S as t}from"./styled-D6Sol--9.js";const s=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Typing Reducers (TypeScript)"}),e.jsxs(t.Lead,{children:["A ",e.jsx("b",{children:"reducer"})," is a ",e.jsx("i",{children:"pure function"})," that takes the current ",e.jsx("b",{children:"state"})," and an ",e.jsx("b",{children:"action"}),", then returns the next state:",e.jsx(t.InlineCode,{children:"(state, action) → newState"}),". In React, you use it with ",e.jsx("b",{children:"useReducer"})," to manage complex or multi-step state updates with a clear, testable flow. TypeScript gives you safety by typing ",e.jsx("b",{children:"State"}),", ",e.jsx("b",{children:"Action"}),", and ",e.jsx("b",{children:"Dispatch"})," precisely."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Terms & Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State:"})," The data your component manages (object/array/primitive) at a moment in time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action:"})," A plain object describing ",e.jsx("i",{children:"what happened"}),". Typically has a ",e.jsx(t.InlineCode,{children:"type"})," field and optional ",e.jsx("i",{children:"payload"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reducer:"})," A pure function ",e.jsx(t.InlineCode,{children:"(state, action) ⇒ newState"}),". “Pure” means: no side effects (no fetch, no timers), and same inputs → same output."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dispatch:"})," A function you call to send an action to the reducer (",e.jsxs(t.InlineCode,{children:["dispatch(",'type: "add", payload: ... ',")"]}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Discriminated union:"})," A TypeScript union where each variant carries a common “discriminant” (like ",e.jsx(t.InlineCode,{children:"type"}),") so TS can ",e.jsx("i",{children:"narrow"})," the shape safely per case."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Exhaustiveness check:"})," Ensuring every possible action type is handled (TS will flag any missing case)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Immutability:"})," You return a ",e.jsx("i",{children:"new"})," state value rather than mutating the existing one."]})]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Typing ",e.jsx("code",{children:"useReducer"})," — Overview"]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State type:"})," describes your state shape."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action type:"})," use a ",e.jsx("i",{children:"discriminated union"}),"—one variant per action ",e.jsx(t.InlineCode,{children:"type"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reducer type:"})," ",e.jsx(t.InlineCode,{children:"React.Reducer<State, Action>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dispatch type:"})," ",e.jsx(t.InlineCode,{children:"React.Dispatch<Action>"}),"."]})]}),e.jsx(t.Pre,{children:`// TypeScript examples below (TSX). You can paste in a .tsx file or a TS playground.
// Signature reminder:
// const [state, dispatch] = React.useReducer(reducer, initialArg, init?);

// Minimal template:
type State = { ... };
type Action =
  | { type: "..." }
  | { type: "..."; payload: ... };

const reducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    // handle each action, return NEW state
    default:
      return state;
  }
};`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example 1 — Counter (Discriminated Union)"}),e.jsx(t.Pre,{children:`type CounterState = { count: number };

type CounterAction =
  | { type: "increment"; step?: number }
  | { type: "decrement"; step?: number }
  | { type: "reset" };

const counterReducer: React.Reducer<CounterState, CounterAction> = (state, action) => {
  switch (action.type) {
    case "increment": {
      const step = action.step ?? 1;
      return { count: state.count + step };
    }
    case "decrement": {
      const step = action.step ?? 1;
      return { count: state.count - step };
    }
    case "reset":
      return { count: 0 };
    default: {
      // Exhaustiveness (should never happen if Action covers all types):
      const _exhaustive: never = action;
      return state;
    }
  }
};

// Usage with React:
function Counter() {
  const [state, dispatch] = React.useReducer(counterReducer, { count: 0 });

  return (
    <>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "reset" })}>Reset</button>
    </>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Why a union?"})," It lets TypeScript ",e.jsx("i",{children:"narrow"})," to the correct shape per case—no unsafe casting."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example 2 — Todos with Payloads"}),e.jsx(t.Pre,{children:`type Todo = { id: string; text: string; done: boolean };
type TodosState = { items: Todo[] };

type TodosAction =
  | { type: "add"; payload: { text: string } }
  | { type: "toggle"; payload: { id: string } }
  | { type: "remove"; payload: { id: string } }
  | { type: "clearCompleted" };

const todosReducer: React.Reducer<TodosState, TodosAction> = (state, action) => {
  switch (action.type) {
    case "add": {
      const newTodo: Todo = { id: crypto.randomUUID(), text: action.payload.text, done: false };
      return { items: [newTodo, ...state.items] };
    }
    case "toggle": {
      return {
        items: state.items.map(t => t.id === action.payload.id ? { ...t, done: !t.done } : t)
      };
    }
    case "remove": {
      return { items: state.items.filter(t => t.id !== action.payload.id) };
    }
    case "clearCompleted": {
      return { items: state.items.filter(t => !t.done) };
    }
    default: {
      const _exhaustive: never = action;
      return state;
    }
  }
};`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Payload:"})," additional data needed to compute the next state. Typed per action variant for safety."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Dispatch, Action Creators & ",e.jsx("code",{children:"as const"})]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Dispatch type:"})," ",e.jsx(t.InlineCode,{children:"React.Dispatch<Action>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action creator:"})," a small function that returns a correctly typed action object (removes string typos)."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"as const"}),":"]})," makes the ",e.jsx(t.InlineCode,{children:"type"})," literal immutable, improving discrimination."]})]}),e.jsx(t.Pre,{children:`// Action creators:
const add    = (text: string) => ({ type: "add",    payload: { text } } as const);
const toggle = (id: string)    => ({ type: "toggle", payload: { id } } as const);

// In a component:
function TodosUI() {
  const [state, dispatch] = React.useReducer(todosReducer, { items: [] });
  const onAdd = (text: string) => dispatch(add(text));
  const onToggle = (id: string) => dispatch(toggle(id));
  // dispatch has type React.Dispatch<TodosAction>
  return null;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Lazy Initialization"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Lazy init:"})," Use the third ",e.jsx(t.InlineCode,{children:"init"})," function when initial state needs computation (e.g., read from localStorage)."]}),e.jsxs("li",{children:["TypeScript infers from your ",e.jsx(t.InlineCode,{children:"reducer"})," + ",e.jsx(t.InlineCode,{children:"init"}),". You can also annotate the reducer explicitly."]})]}),e.jsx(t.Pre,{children:`type State = { value: number };
type Action = { type: "set"; payload: number };

const reducer: React.Reducer<State, Action> = (s, a) =>
  a.type === "set" ? { value: a.payload } : s;

function init(initialArg: number): State {
  // heavy compute or storage read here
  return { value: initialArg };
}

function Example() {
  const [state] = React.useReducer(reducer, /* initialArg */ 42, init);
  // state: { value: 42 }
  return <p>{state.value}</p>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Exhaustive Checks & Narrowing"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Use a ",e.jsx("b",{children:"switch"})," on ",e.jsx(t.InlineCode,{children:"action.type"}),". In the ",e.jsx("i",{children:"default"})," branch, assign ",e.jsx(t.InlineCode,{children:"action"})," to ",e.jsx(t.InlineCode,{children:"never"})," to force completeness."]}),e.jsxs("li",{children:["Avoid loose action shapes (e.g., ",e.jsx(t.InlineCode,{children:"any"})," payloads). Make payloads specific and required only where needed."]})]}),e.jsx(t.Pre,{children:`function reducer(state: State, action: Action): State {
  switch (action.type) {
    // cases...
    default: {
      const _x: never = action; // TS error if a case is missing
      return state;
    }
  }
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," model actions as a discriminated union with clear ",e.jsx(t.InlineCode,{children:"type"})," strings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep reducers ",e.jsx("i",{children:"pure"}),"; put side effects (fetch, timers, analytics) in ",e.jsx(t.InlineCode,{children:"useEffect"})," or caller code."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," return ",e.jsx("i",{children:"new"})," state objects (immutability) rather than mutating inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overuse enums for action types—string literal unions work great and are ergonomic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," put React elements or DOM refs into reducer state unless you know why (keep state serializable when possible)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Narrowing:"})," TS technique to refine a union to a specific variant using checks (like ",e.jsx(t.InlineCode,{children:"switch(action.type)"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Literal type:"})," a type that represents exactly one value (e.g., ",e.jsx(t.InlineCode,{children:'"add"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Readonly:"})," a modifier that prevents reassignment/mutation; useful to protect state shapes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Never:"})," a type with no possible values; assigning to it enforces exhaustiveness."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Define a precise ",e.jsx("b",{children:"State"}),", model ",e.jsx("b",{children:"Action"})," as a discriminated union, type your ",e.jsx("b",{children:"Reducer"})," and ",e.jsx("b",{children:"Dispatch"}),", keep reducers pure and immutable, and use",e.jsx("i",{children:" exhaustive checks"})," to guarantee you handle every action safely."]})]});export{s as default};
