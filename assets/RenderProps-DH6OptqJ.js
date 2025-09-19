import{j as e}from"./index-DXTGIo8z.js";import{S as s}from"./styled-DwPHPas3.js";const t=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Render Props"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Render props"})," is a pattern where a component accepts a"," ",e.jsx("b",{children:"function"})," (often via the ",e.jsx(s.InlineCode,{children:"children"})," prop or a prop named ",e.jsx(s.InlineCode,{children:"render"}),") and ",e.jsx("em",{children:"calls"})," it to render UI. This lets you ",e.jsx("b",{children:"share stateful logic"})," while letting consumers decide the markup."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render prop:"})," a prop whose value is a function that the component calls to render UI, e.g. ",e.jsx(s.InlineCode,{children:"children={(api) => <UI ... />}"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Function-as-children (FaCC):"})," a specific form of render props that uses"," ",e.jsx(s.InlineCode,{children:"props.children"})," as a function instead of JSX nodes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider vs Render Props:"})," a ",e.jsx("i",{children:"Provider"})," broadcasts values via context to any descendant; a ",e.jsx("i",{children:"Render Prop"})," explicitly renders using a passed function."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headless component:"})," a component that contains logic but no visual styling of its own. Render props are a common way to build headless components."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why Render Props?"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Share logic (state, effects, event handling) without dictating UI structure."}),e.jsx("li",{children:"Compose different UIs on top of the same behavior (flexibility)."}),e.jsx("li",{children:"Keep components small and focused (logic separate from presentation)."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Minimal Example"}),e.jsx(s.Pre,{children:`// A headless Toggle component that exposes state + actions via a render prop.
function Toggle({ children, initial = false }) {
  const [on, setOn] = React.useState(!!initial);
  const toggle = React.useCallback(() => setOn(v => !v), []);
  const setTrue = React.useCallback(() => setOn(true), []);
  const setFalse = React.useCallback(() => setOn(false), []);

  // Call the render function with an "API object"
  return children({ on, toggle, setTrue, setFalse });
}

// Consumer chooses the UI freely
function Example() {
  return (
    <Toggle initial>
      {({ on, toggle }) => (
        <button onClick={toggle} aria-pressed={on}>
          {on ? "ON" : "OFF"}
        </button>
      )}
    </Toggle>
  );
}`}),e.jsxs(s.Small,{children:["The ",e.jsx(s.InlineCode,{children:"Toggle"})," has the logic; the consumer decides the markup. This is the essence of render props."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["API Styles: ",e.jsx("code",{children:"children"})," vs ",e.jsx("code",{children:"render"})]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Children as function (FaCC):"})," idiomatic and concise; common in the React ecosystem."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Named prop (render):"})," explicit and self-documenting; useful when you also accept normal children."]})]}),e.jsx(s.Pre,{children:`// 1) Function-as-children
<DataFetcher url="/api/user">
  {(state) => <UserCard {...state} />}
</DataFetcher>

// 2) Named render prop
<DataFetcher url="/api/user" render={(state) => <UserCard {...state} />} />`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Realistic Example: ",e.jsx("code",{children:"DataFetcher"})]}),e.jsx(s.Pre,{children:`function DataFetcher({ url, children }) {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  React.useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    fetch(url)
      .then(r => r.ok ? r.json() : Promise.reject(new Error(r.status)))
      .then(data => { if (!cancelled) setState({ status: "success", data, error: null }); })
      .catch(error => { if (!cancelled) setState({ status: "error", data: null, error }); });

    return () => { cancelled = true; };
  }, [url]);

  // Let consumers render loading/error/success however they want
  return children(state);
}

// Consumer
function Profile() {
  return (
    <DataFetcher url="/api/user">
      {({ status, data, error }) => {
        if (status === "loading") return <p>Loading…</p>;
        if (status === "error") return <p role="alert">Failed: {String(error)}</p>;
        return <div>{data.name}</div>;
      }}
    </DataFetcher>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Prop Getters (Ergonomics)"}),e.jsx(s.List,{children:e.jsxs("li",{children:["A ",e.jsx("b",{children:"prop getter"})," is a function that returns a set of props (handlers/aria/ids) for wiring UI elements. It standardizes accessibility and behavior."]})}),e.jsx(s.Pre,{children:`function Toggle({ children }) {
  const [on, setOn] = React.useState(false);
  const toggle = React.useCallback(() => setOn(v => !v), []);
  const getButtonProps = React.useCallback(
    (props = {}) => ({
      "aria-pressed": on,
      onClick: (e) => {
        props.onClick?.(e);
        toggle();
      },
      ...props,
    }),
    [on, toggle]
  );

  return children({ on, getButtonProps });
}

// Consumer ensures a11y with minimal effort
<Toggle>
  {({ on, getButtonProps }) => (
    <button {...getButtonProps({ className: "btn" })}>
      {on ? "ON" : "OFF"}
    </button>
  )}
</Toggle>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"When to Use (vs Hooks & Context)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prefer Hooks"})," for sharing logic in modern React—hooks are simpler and avoid extra component layers. Render props remain useful when you need to ",e.jsx("b",{children:"control rendering"}),"from the parent or combine with ",e.jsx("b",{children:"headless components"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use Context/Provider"})," for app-wide or shared values across distant components. Render props are more local and explicit."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Performance & Pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Re-renders:"})," a new render function identity each render can cause downstream updates. Mitigate with memoization at consumer boundaries if needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deep trees:"})," render-prop components add to the tree. Excessive nesting can reduce readability—consider hooks or composition."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessibility:"})," expose prop getters that include required ARIA/keyboard handlers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSR:"})," safe by default; ensure any browser APIs are guarded in the logic layer."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the API tiny: return a well-named object with state + actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," document whether children or ",e.jsx(s.InlineCode,{children:"render"})," is used."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," hard-code markup in the logic component—stay headless."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse when a simple custom hook is enough."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render prop:"})," function prop used to decide what to render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Function-as-children (FaCC):"})," using ",e.jsx("code",{children:"children"})," as a function."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headless component:"})," logic-only, no visual styling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop getter:"})," helper that returns standardized props for UI elements."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider pattern:"})," using React Context to distribute shared values."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Render props separate ",e.jsx("i",{children:"logic"})," from ",e.jsx("i",{children:"presentation"})," by letting consumers render anything using the API you expose. Prefer hooks for most logic-sharing, but reach for render props when consumers must fully control the UI."]})]});export{t as default};
