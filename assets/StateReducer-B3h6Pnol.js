import{j as e}from"./index-DXTGIo8z.js";import{S as t}from"./styled-DwPHPas3.js";const r=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"State Reducer Pattern"}),e.jsxs(t.Lead,{children:["The ",e.jsx("b",{children:"State Reducer"})," pattern lets a component keep its ",e.jsx("i",{children:"own"})," state while allowing consumers to ",e.jsx("b",{children:"intercept"})," and ",e.jsx("b",{children:"shape"})," state transitions by providing a custom",e.jsx(t.InlineCode,{children:"stateReducer"})," function. It's like giving users a hook into the component's decision-making, without exposing its internals."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Terms (clear definitions)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State:"})," The data a component remembers between renders (e.g., ",e.jsx("code",{children:"on"})," for a toggle)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action:"})," A plain object describing ",e.jsx("i",{children:"what happened"})," (e.g., ",e.jsx("code",{children:'{ type: "toggle" }'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reducer:"})," A pure function ",e.jsx("code",{children:"(state, action) ⇒ nextState"})," that computes the next state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Default reducer:"})," The component's built-in reducer that defines its normal behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State reducer (prop):"})," A consumer-supplied reducer that can ",e.jsx("i",{children:"override"})," or",e.jsx("i",{children:"augment"})," the default reducer's result."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs Uncontrolled:"})," Controlled means the parent owns the state (via props like",e.jsx("code",{children:"value"})," + ",e.jsx("code",{children:"onChange"}),"). Uncontrolled means the component manages its own state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transition:"})," The move from current state → next state caused by an action."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Why use a State Reducer?"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Extensibility:"})," Consumers can enforce rules (e.g., “toggle can only turn on once per minute”) without changing your component code."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Predictability:"})," All state changes flow through a single reducer pipeline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Testability:"})," You can test behavior by asserting reducer outputs for given inputs."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Anatomy of the Pattern"}),e.jsx(t.Pre,{children:`// Inside your reusable component:
const defaultReducer = (state, action) => {
  switch (action.type) {
    case "toggle":
      return { ...state, on: !state.on };
    case "set":
      return { ...state, on: !!action.payload };
    default:
      return state;
  }
};

// Merge default + user reducer. The user reducer gets the "proposed" nextState to modify.
function getFinalState(userReducer, state, action) {
  const proposed = defaultReducer(state, action);
  return typeof userReducer === "function" ? userReducer(state, action, proposed) : proposed;
}`}),e.jsxs(t.Small,{children:["The consumer's ",e.jsx("code",{children:"stateReducer(state, action, proposed)"})," can accept or alter the"," ",e.jsx("i",{children:"proposed"})," next state. Returning ",e.jsx("code",{children:"state"})," blocks the change; returning",e.jsx("code",{children:"proposed"})," accepts it; or return a custom object to reshape it."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example: Toggle (Uncontrolled with a State Reducer)"}),e.jsx(t.Pre,{children:`function Toggle({ initialOn = false, stateReducer, onChange }) {
  const [state, setState] = React.useState({ on: !!initialOn });

  function dispatch(action) {
    setState((prev) => {
      const next = getFinalState(stateReducer, prev, action);
      if (next !== prev) onChange?.(next, action); // notify consumer
      return next;
    });
  }

  return (
    <button
      aria-pressed={state.on}
      onClick={() => dispatch({ type: "toggle" })}
    >
      {state.on ? "ON" : "OFF"}
    </button>
  );
}

// Usage: block turning OFF (force sticky ON)
function stickyOnReducer(state, action, proposed) {
  if (action.type === "toggle" && state.on && !proposed.on) {
    return state; // reject the OFF transition
  }
  return proposed; // accept all others
}

// <Toggle stateReducer={stickyOnReducer} onChange={(s,a) => console.log(s,a)} />
`}),e.jsxs(t.Small,{children:["The parent ",e.jsx("b",{children:"shapes behavior"})," without rewriting the Toggle. Great for business rules, quotas, or logging."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Hybrid: Allow Controlled Usage"}),e.jsx(t.Pre,{children:`function ToggleHybrid({ value, defaultValue = false, onChange, stateReducer }) {
  const isControlled = value != null;
  const [internal, setInternal] = React.useState({ on: !!defaultValue });
  const state = { on: isControlled ? !!value : internal.on };

  function setState(next, action) {
    if (!isControlled) setInternal(next);
    onChange?.(next, action); // always notify
  }

  function dispatch(action) {
    const next = getFinalState(stateReducer, state, action);
    if (next !== state) setState(next, action);
  }

  return (
    <button aria-pressed={state.on} onClick={() => dispatch({ type: "toggle" })}>
      {state.on ? "ON" : "OFF"}
    </button>
  );
}

// Usage (controlled):
// <ToggleHybrid value={on} onChange={(next) => setOn(next.on)} />
`}),e.jsxs(t.Small,{children:["Support both uncontrolled and controlled patterns. In controlled mode, the parent is the source of truth; we still run the reducer pipeline and emit ",e.jsx("code",{children:"onChange"}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Advanced: Enforce Rules & Return Reasons"}),e.jsx(t.Pre,{children:`// action: { type: "toggle", meta?: any }
function businessRulesReducer(state, action, proposed) {
  const now = Date.now();
  // Example rule: only allow one OFF per 5 seconds
  if (state.on && !proposed.on && now - (state._lastOffAt ?? 0) < 5000) {
    return { ...state, _reason: "Too soon to turn OFF" }; // reject + annotate
  }
  if (!state.on && proposed.on) {
    return { ...proposed, _lastOnAt: now, _reason: undefined };
  }
  if (state.on && !proposed.on) {
    return { ...proposed, _lastOffAt: now, _reason: undefined };
  }
  return proposed;
}`}),e.jsx(t.Small,{children:"A custom reducer can annotate state with metadata (timestamps, reason codes) to inform the UI."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Best Practices"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Document actions:"})," List the ",e.jsx("code",{children:"type"})," strings and expected payload shapes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keep reducers pure:"})," No side effects; compute next state only. Do effects in handlers after state updates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Always call consumer reducer last:"})," Compute a ",e.jsx("i",{children:"proposed"})," next state first, then hand it to the user reducer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Notify changes consistently:"})," Call ",e.jsx("code",{children:"onChange(next, action)"})," when the final state actually changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Support controlled usage:"})," Allow ",e.jsx("code",{children:"value/onChange"})," when it makes sense."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the action surface small and well-named (e.g., ",e.jsx("code",{children:"toggle"}),", ",e.jsx("code",{children:"open"}),", ",e.jsx("code",{children:"close"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pass ",e.jsx("code",{children:"(state, action, proposed)"})," to the user reducer for full context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate state objects; always return new objects for changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hide side effects in reducers; perform side effects outside (e.g., in ",e.jsx("code",{children:"useEffect"})," or handlers)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," couple the reducer to DOM specifics; keep it UI-agnostic."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Pure function:"})," Same inputs → same output, no external side effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotent:"})," Reapplying the same action yields the same state (useful for safety)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Invariant:"})," A rule that must always hold true for state (e.g., ",e.jsx("code",{children:"count ≥ 0"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Metadata:"})," Extra state fields (timestamps, reasons) that inform UI decisions."]})]})]}),e.jsx(t.Callout,{children:"Summary: The State Reducer pattern exposes a predictable state transition pipeline. Components define the default behavior; consumers can accept, block, or transform transitions via a custom reducer—without forking your component."})]});export{r as default};
