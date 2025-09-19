import{j as e}from"./index-CDxhzYTb.js";import{S as n}from"./styled-Cs2lW8f7.js";const i=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Deprecations (Modern React)"}),e.jsxs(n.Lead,{children:["As React evolved (17 → 18+), several ",e.jsx("b",{children:"legacy patterns and APIs"})," became discouraged or deprecated. This page explains each one in plain language, shows the modern replacement, and gives practical migration steps."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"What does “deprecated” mean?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Deprecated:"})," The API still exists for now, but you should avoid using it. It may be removed in a future major version."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Legacy:"})," Not technically removed, but considered old style; there is a recommended modern alternative."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Breaking change:"})," An API removed/changed in a major version update. Deprecation is the warning phase before this."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Legacy Class Lifecycles"}),e.jsxs(n.P,{children:["The following lifecycle methods are considered ",e.jsx("b",{children:"legacy"})," and unsafe for async rendering:",e.jsx(n.InlineCode,{children:"componentWillMount"}),","," ",e.jsx(n.InlineCode,{children:"componentWillReceiveProps"}),","," ",e.jsx(n.InlineCode,{children:"componentWillUpdate"}),". You may see “UNSAFE_” prefixed versions in older code."]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why deprecated?"})," They run at times that make logic fragile under concurrent rendering and can cause bugs on re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Modern replacements:"})," move side effects to"," ",e.jsx(n.InlineCode,{children:"componentDidMount"})," /"," ",e.jsx(n.InlineCode,{children:"componentDidUpdate"})," or, in function components, to"," ",e.jsx(n.InlineCode,{children:"useEffect"}),"."]})]}),e.jsx(n.H3,{children:"Before (legacy):"}),e.jsx(n.Pre,{children:`class Profile extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.userId !== this.props.userId) {
      this.load(nextProps.userId);
    }
  }
  // ...
}`}),e.jsx(n.H3,{children:"After (modern):"}),e.jsx(n.Pre,{children:`function Profile({ userId }) {
  React.useEffect(() => {
    let active = true;
    (async () => {
      const data = await fetch(\`/api/users/\${userId}\`).then(r => r.json());
      if (active) {/* set state with data */ }
    })();
    return () => { active = false; };
  }, [userId]);

  return /* UI */;
}`}),e.jsxs(n.Small,{children:["Note: prefer function components and hooks for new code. If you keep classes, use",e.jsx(n.InlineCode,{children:"componentDidMount/DidUpdate"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"String Refs (deprecated)"}),e.jsxs(n.P,{children:["Old code sometimes uses ",e.jsx(n.InlineCode,{children:'ref="name"'}),". This is deprecated. Use ",e.jsx(n.InlineCode,{children:"createRef"})," (class) or"," ",e.jsx(n.InlineCode,{children:"useRef"})," (function) instead."]}),e.jsx(n.H3,{children:"Before:"}),e.jsx(n.Pre,{children:`class Form extends React.Component {
  handleSubmit = () => {
    // ❌ deprecated string ref
    console.log(this.refs.email.value);
  };
  render() {
    return <input ref="email" />;
  }
}`}),e.jsx(n.H3,{children:"After (class with createRef):"}),e.jsx(n.Pre,{children:`class Form extends React.Component {
  emailRef = React.createRef();
  handleSubmit = () => console.log(this.emailRef.current.value);
  render() { return <input ref={this.emailRef} />; }
}`}),e.jsx(n.H3,{children:"After (function with useRef):"}),e.jsx(n.Pre,{children:`function Form() {
  const emailRef = React.useRef(null);
  const handleSubmit = () => console.log(emailRef.current?.value);
  return <input ref={emailRef} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:[e.jsx("code",{children:"findDOMNode"})," (deprecated)"]}),e.jsxs(n.P,{children:[e.jsx(n.InlineCode,{children:"ReactDOM.findDOMNode(component)"})," is deprecated because it breaks encapsulation and doesn’t work with some future renderers. Instead, attach a ",e.jsx("b",{children:"ref directly"})," to the DOM node."]}),e.jsx(n.H3,{children:"Before:"}),e.jsx(n.Pre,{children:`class Box extends React.Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this); // ❌
    el.focus();
  }
  render() { return <div tabIndex={-1}>Hi</div>; }
}`}),e.jsx(n.H3,{children:"After:"}),e.jsx(n.Pre,{children:`function Box() {
  const ref = React.useRef(null);
  React.useEffect(() => { ref.current?.focus(); }, []);
  return <div tabIndex={-1} ref={ref}>Hi</div>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Legacy Context API (contextTypes) "}),e.jsxs(n.P,{children:["The pre-16.3 context used ",e.jsx(n.InlineCode,{children:"childContextTypes"})," /",e.jsx(n.InlineCode,{children:"contextTypes"}),". It’s considered legacy. Use"," ",e.jsx(n.InlineCode,{children:"createContext"})," instead."]}),e.jsx(n.H3,{children:"Modern Context (recommended):"}),e.jsx(n.Pre,{children:`const ThemeContext = React.createContext("light");

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

function Toolbar() {
  const theme = React.useContext(ThemeContext);
  return <button data-theme={theme}>Click</button>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Legacy Root APIs"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Deprecated usage:"})," ",e.jsx(n.InlineCode,{children:"ReactDOM.render"})," and"," ",e.jsx(n.InlineCode,{children:"ReactDOM.hydrate"})," (legacy)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Modern API (React 18+):"})," ",e.jsx(n.InlineCode,{children:"createRoot"})," and"," ",e.jsx(n.InlineCode,{children:"hydrateRoot"}),"."]})]}),e.jsx(n.H3,{children:"Before:"}),e.jsx(n.Pre,{children:`import ReactDOM from "react-dom";
ReactDOM.render(<App />, document.getElementById("root")); // ❌ legacy`}),e.jsx(n.H3,{children:"After:"}),e.jsx(n.Pre,{children:`import { createRoot } from "react-dom/client";
const root = createRoot(document.getElementById("root"));
root.render(<App />);`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Default props on Function Components (avoid)"}),e.jsxs(n.P,{children:["Historically you could set ",e.jsx(n.InlineCode,{children:"Component.defaultProps"})," on function components. The modern style is to use default values in parameter destructuring, which is clearer and plays nicely with TypeScript and autocomplete."]}),e.jsx(n.H3,{children:"Before:"}),e.jsx(n.Pre,{children:`function Button({ label }) { return <button>{label}</button>; }
Button.defaultProps = { label: "Click" }; // 😐 avoid`}),e.jsx(n.H3,{children:"After (recommended):"}),e.jsx(n.Pre,{children:`function Button({ label = "Click" }) {
  return <button>{label}</button>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Event Pooling (historical)"}),e.jsxs(n.P,{children:["Older React versions “pooled” events, requiring ",e.jsx(n.InlineCode,{children:"event.persist()"})," for async access. Modern React no longer pools events—just use the event normally."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Other Patterns to Avoid"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Mutating props:"})," Props are read-only. Derive new values in state or compute during render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Heavy work in render:"})," Move expensive computations into ",e.jsx(n.InlineCode,{children:"useMemo"})," or background (web worker) if needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Global DOM side effects in render:"})," Do side effects in ",e.jsx(n.InlineCode,{children:"useEffect"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Migration Checklist"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Replace ",e.jsx(n.InlineCode,{children:"ReactDOM.render"})," →"," ",e.jsx(n.InlineCode,{children:"createRoot"}),"."]}),e.jsxs("li",{children:["Remove string refs → use ",e.jsx(n.InlineCode,{children:"useRef"}),"/",e.jsx(n.InlineCode,{children:"createRef"}),"."]}),e.jsxs("li",{children:["Replace ",e.jsx(n.InlineCode,{children:"findDOMNode"})," → direct DOM refs."]}),e.jsxs("li",{children:["Migrate legacy lifecycles → ",e.jsx(n.InlineCode,{children:"useEffect"})," or modern class lifecycles."]}),e.jsxs("li",{children:["Switch legacy context → ",e.jsx(n.InlineCode,{children:"createContext"}),"."]}),e.jsxs("li",{children:["Prefer param defaults over ",e.jsx(n.InlineCode,{children:"defaultProps"})," on function components."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Ref:"})," A mutable object whose ",e.jsx(n.InlineCode,{children:".current"})," holds a DOM node or value across renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Effect:"})," Code that runs after render for syncing with the outside world (events, timers, network, DOM)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration:"})," Attaching React listeners to server-rendered HTML."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Concurrent rendering:"})," React may prepare multiple versions of UI and interrupt work to keep the app responsive."]})]})]}),e.jsxs(n.Callout,{children:["Summary: audit your codebase for legacy lifecycles, string refs, ",e.jsx("i",{children:"findDOMNode"}),", legacy context, and old root APIs. Adopt hooks, direct refs, modern context, and the new root API for a clean, future-proof codebase."]})]});export{i as default};
