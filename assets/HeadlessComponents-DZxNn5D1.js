import{j as e}from"./index-BRArnZ3i.js";import{S as t}from"./styled-BhNhJnsx.js";const o=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Headless Components"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Headless components"})," encapsulate behavior without dictating UI. They expose state, actions, and ARIA helpers so you can compose any design while reusing solid logic."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Definition & Purpose"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Headless component:"})," a component or hook that manages behavior/state but renders",e.jsx("em",{children:" no opinionated UI"}),". You control the markup and styling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Goal:"})," reuse complex logic (keyboard interactions, selection, async state) across many “skins” (Tailwind, styled-components, MUI, design systems)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Contrast:"})," a “headed”/visual component ships both logic and fixed markup/CSS. Headless separates concerns: logic ↔ presentation."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Terms (beginner-friendly)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"API surface:"})," the set of props, returned values, and callbacks consumers use."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs uncontrolled:"})," ",e.jsx("em",{children:"controlled"})," means parent holds state and passes it via props; ",e.jsx("em",{children:"uncontrolled"})," means the component holds its own internal state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render prop:"})," passing a function as ",e.jsx("code",{children:"children"})," so the headless component can “hand back” state/actions: ",e.jsx("code",{children:"children(props) => UI"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compound components:"})," related subcomponents (",e.jsx("code",{children:"Select.List"}),",",e.jsx("code",{children:"Select.Option"}),") communicate via context without hardcoding styles."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State reducer:"})," advanced control point where parents can alter how state updates apply."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ARIA helpers:"})," attributes/ids/roles to make custom UI accessible (e.g., listbox)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example 1 — Headless Toggle (Hook)"}),e.jsx(t.Small,{children:"Logic in a custom hook; UI composed by consumer. Both controlled and uncontrolled supported."}),e.jsx(t.Pre,{children:`// Logic-only hook (headless)
function useToggle({ value, defaultValue = false, onChange } = {}) {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue);
  const on = isControlled ? value : uncontrolled;

  const set = React.useCallback((next) => {
    const resolved = typeof next === "function" ? next(on) : next;
    if (!isControlled) setUncontrolled(resolved);
    onChange?.(resolved);
  }, [isControlled, on, onChange]);

  const toggle = React.useCallback(() => set(v => !v), [set]);
  const setTrue = React.useCallback(() => set(true), [set]);
  const setFalse = React.useCallback(() => set(false), [set]);

  return { on, toggle, setTrue, setFalse, set };
}

// Consumer decides UI:
function ToggleButton() {
  const { on, toggle } = useToggle();
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={toggle}
    >
      {on ? "ON" : "OFF"}
    </button>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Why headless?"})," The same ",e.jsx("code",{children:"useToggle"})," logic can power a switch, a checkbox, a segmented control, or a custom icon button—your choice."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example 2 — Headless Listbox (Render Prop + ARIA)"}),e.jsx(t.Small,{children:"The component controls selection & keyboard; you render any list UI while keeping accessibility."}),e.jsx(t.Pre,{children:`function useListbox({ items, defaultIndex = 0, onChange } = {}) {
  const [index, setIndex] = React.useState(defaultIndex);
  const id = React.useId();

  const select = React.useCallback((i) => {
    setIndex(i);
    onChange?.(items[i], i);
  }, [items, onChange]);

  const onKeyDown = React.useCallback((e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); select(Math.min(items.length - 1, index + 1)); }
    if (e.key === "ArrowUp")   { e.preventDefault(); select(Math.max(0, index - 1)); }
    if (e.key === "Home")      { e.preventDefault(); select(0); }
    if (e.key === "End")       { e.preventDefault(); select(items.length - 1); }
  }, [index, items.length, select]);

  // ARIA plumbing
  const listboxProps = {
    role: "listbox",
    "aria-activedescendant": \`\${id}-option-\${index}\`,
    tabIndex: 0,
    onKeyDown,
  };

  const getOptionProps = (i) => ({
    id: \`\${id}-option-\${i}\`,
    role: "option",
    "aria-selected": i === index,
    onMouseDown: (e) => e.preventDefault(), // avoid focus loss
    onClick: () => select(i),
  });

  return { index, select, listboxProps, getOptionProps };
}

// Headless component with render prop
function Listbox({ items, children, ...opts }) {
  const api = useListbox({ items, ...opts });
  return children(api); // render-prop: children(api) => UI
}

// Consumer UI (any design system)
function ColorPicker() {
  const colors = ["Red", "Green", "Blue"];
  return (
    <Listbox items={colors}>
      {({ index, listboxProps, getOptionProps }) => (
        <div {...listboxProps} style={{ border: "1px solid #555", padding: 8, width: 220 }}>
          {colors.map((c, i) => (
            <div
              key={c}
              {...getOptionProps(i)}
              style={{
                padding: "6px 8px",
                background: i === index ? "rgba(255,255,255,0.08)" : "transparent",
                cursor: "pointer",
              }}
            >
              {c}
            </div>
          ))}
          <div style={{ marginTop: 8, opacity: 0.8 }}>Selected: {colors[index]}</div>
        </div>
      )}
    </Listbox>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Note:"})," ",e.jsx("code",{children:'role="listbox"'}),", ",e.jsx("code",{children:'role="option"'}),", and"," ",e.jsx("code",{children:"aria-activedescendant"})," help screen readers understand the widget."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Example 3 — Compound Components + Context"}),e.jsx(t.Small,{children:"Subcomponents read shared state via context. Still headless—no fixed styles."}),e.jsx(t.Pre,{children:`const SelectContext = React.createContext(null);

function SelectRoot({ value, defaultValue, onChange, children }) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue);
  const val = isControlled ? value : internal;

  const set = React.useCallback((next) => {
    const v = typeof next === "function" ? next(val) : next;
    if (!isControlled) setInternal(v);
    onChange?.(v);
  }, [isControlled, val, onChange]);

  const api = React.useMemo(() => ({ value: val, set }), [val, set]);
  return <SelectContext.Provider value={api}>{children}</SelectContext.Provider>;
}

function SelectButton({ children, ...rest }) {
  const { value } = React.useContext(SelectContext);
  return <button type="button" {...rest}>{children ?? String(value)}</button>;
}

function SelectOption({ value, children, ...rest }) {
  const select = React.useContext(SelectContext);
  const selected = select.value === value;
  return (
    <div
      role="option"
      aria-selected={selected}
      onClick={() => select.set(value)}
      {...rest}
    >
      {children ?? String(value)}
    </div>
  );
}

// Usage (any markup/styles)
function SizeChooser() {
  return (
    <SelectRoot defaultValue="M">
      <SelectButton className="btn">Current size</SelectButton>
      <div className="list">
        <SelectOption value="S" className="item">Small</SelectOption>
        <SelectOption value="M" className="item">Medium</SelectOption>
        <SelectOption value="L" className="item">Large</SelectOption>
      </div>
    </SelectRoot>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Compound components"})," give a natural API: ",e.jsx("code",{children:"<SelectRoot>"}),",",e.jsx("code",{children:"<SelectButton>"}),", ",e.jsx("code",{children:"<SelectOption>"})," without imposing visuals."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Advanced: State Reducer"}),e.jsxs(t.Small,{children:["A ",e.jsx("b",{children:"state reducer"})," lets the parent intercept internal updates. Useful for logging, custom rules, or integrating with external stores."]}),e.jsx(t.Pre,{children:`function useHeadlessCounter({ initial = 0, stateReducer } = {}) {
  const [state, setState] = React.useState({ count: initial });

  const apply = React.useCallback((changes, actionType) => {
    const next = typeof stateReducer === "function"
      ? stateReducer(state, changes, actionType)
      : { ...state, ...changes };
    setState(next);
  }, [state, stateReducer]);

  const inc = () => apply({ count: state.count + 1 }, "increment");
  const dec = () => apply({ count: state.count - 1 }, "decrement");

  return { count: state.count, inc, dec };
}

// Parent can customize:
const reducer = (state, changes, type) => {
  if (type === "increment" && state.count >= 10) return state; // clamp
  return { ...state, ...changes };
};`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," document the API surface clearly (props, returned values, events)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," support both controlled and uncontrolled usage when practical."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," provide accessibility helpers (roles/ids/keyboard behavior) for interactive widgets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," ship hardcoded markup/CSS—keep visuals to the consumer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," leak internal DOM refs unless intentional; expose safe callbacks and props getters."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Testing Headless Components"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Test ",e.jsx("em",{children:"observable behavior"}),": state changes, invoked callbacks, and ARIA attributes— not internal implementation details."]}),e.jsx("li",{children:"For render-prop components, mount with simple test UIs and assert keyboard/mouse flows."}),e.jsx("li",{children:"Validate both controlled and uncontrolled modes and any state-reducer logic."})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Headless:"})," logic-only; no fixed UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render prop:"})," children-as-function to render custom UI from provided API."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compound components:"})," coordinated subcomponents communicating via context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled:"})," parent owns state via props; ",e.jsx("b",{children:"Uncontrolled:"})," internal state managed by component."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State reducer:"})," parent-injected function that modifies how internal updates apply."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ARIA:"})," accessibility attributes that describe custom widgets to assistive tech."]})]})]}),e.jsx(t.Callout,{children:"Summary: headless components let you reuse robust behavior while keeping visual freedom. Start with a logic-only hook or a render-prop/compound architecture, expose a clean API, support controlled/uncontrolled, and ship ARIA helpers for accessible, flexible UIs."})]});export{o as default};
