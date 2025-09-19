import{j as e}from"./index-DUO2rjrc.js";import{S as n}from"./styled-C4J9b6z5.js";const i=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Conditional Rendering"}),e.jsxs(n.Lead,{children:["Conditional rendering shows or hides parts of the UI based on state. In JSX, conditions must be written as ",e.jsx("b",{children:"expressions"}),", not statements."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definition & rules"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["JSX curly braces expect an ",e.jsx("b",{children:"expression"})," that returns a node (or ",e.jsx(n.InlineCode,{children:"null"}),")."]}),e.jsxs("li",{children:["Statements like ",e.jsx(n.InlineCode,{children:"if"}),", ",e.jsx(n.InlineCode,{children:"for"})," cannot appear directly inside JSX—move logic above, or use an expression (ternary, ",e.jsx(n.InlineCode,{children:"&&"}),")."]}),e.jsxs("li",{children:["Returning ",e.jsx(n.InlineCode,{children:"null"})," or ",e.jsx(n.InlineCode,{children:"false"})," renders nothing."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 1 — Ternary (if/else)"}),e.jsx("p",{children:"Best choice when there is a clear “then/else”."}),e.jsx(n.Pre,{children:`{isLoading ? <Spinner /> : <List items={data} />}

// Multi-branch with a precomputed tag
const statusView =
  status === "error"   ? <ErrorBanner /> :
  status === "empty"   ? <Empty /> :
  status === "loading" ? <Spinner /> :
                         <List items={data} />;

return <section>{statusView}</section>;`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 2 — Logical AND (guarded render)"}),e.jsx("p",{children:"Render a piece only when a condition is truthy."}),e.jsx(n.Pre,{children:`{/* show error only when error exists */}
{error && <p className="error">{error.message}</p>}

{/* show badge only when count > 0 */}
{count > 0 && <span className="badge">{count}</span>}`}),e.jsxs(n.Small,{children:["Use a boolean expression (e.g., ",e.jsx(n.InlineCode,{children:"count > 0"}),"). If the left side can be",e.jsx(n.InlineCode,{children:"0"}),", writing ",e.jsx(n.InlineCode,{children:"{count && <Badge />}"})," would render the number ",e.jsx("em",{children:"0"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 3 — Early returns (before JSX)"}),e.jsx("p",{children:"Keep JSX flat by returning early for special cases."}),e.jsx(n.Pre,{children:`function Products({ data, error, loading }) {
  if (loading) return <Spinner />;
  if (error)   return <ErrorBanner error={error} />;
  if (!data?.length) return <Empty />;

  return <Grid items={data} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 4 — Guard components (wrapper)"}),e.jsx("p",{children:"Encapsulate a common gate (auth, feature flag, permission) once."}),e.jsx(n.Pre,{children:`function If({ when, children, otherwise = null }) {
  return when ? children : otherwise;
}

// usage
<If when={user}>
  <Dashboard />
</If>

// with 'otherwise'
<If when={canEdit} otherwise={<ReadOnly />}>
  <Editor />
</If>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 5 — Switch map (object map)"}),e.jsx("p",{children:"Prefer a lookup map over nested ternaries for multiple states."}),e.jsx(n.Pre,{children:`const views = {
  loading: <Spinner />,
  error:   <ErrorBanner />,
  empty:   <Empty />,
  ready:   <List items={data} />
};

return views[status] ?? <UnknownState />;`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 6 — Dynamic component choice"}),e.jsx("p",{children:"Select a component type by condition, then render it."}),e.jsx(n.Pre,{children:`const Field = readOnly ? ReadOnlyField : EditableField;
return <Field value={value} onChange={setValue} />;`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Hide with CSS vs Unmount"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Unmount (conditional render false)"}),": component is removed; state/effects are cleaned up."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hide with CSS"})," (",e.jsx(n.InlineCode,{children:"hidden"})," or ",e.jsx(n.InlineCode,{children:"display:none"}),"): node stays mounted; state is preserved."]})]}),e.jsx(n.Pre,{children:`// Unmount (state resets on next mount)
{open && <Dialog />}

// Hide (state preserved)
<Dialog hidden={!open} />`}),e.jsx(n.Small,{children:"Pick deliberately: unmount to free resources; hide to keep state (e.g., tabs)."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility notes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Announce async results/errors in an ",e.jsx(n.InlineCode,{children:'aria-live="polite"'})," region."]}),e.jsx("li",{children:"Do not hide focusable content without managing focus; move focus to the newly revealed region when appropriate."}),e.jsx("li",{children:"For dialogs/menus, use proper roles and focus traps; conditionally render the overlay and content together."})]}),e.jsx(n.Pre,{children:'<p aria-live="polite">{statusMsg}</p>'})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Conditional hooks (❌):"})," hooks must run in the same order on every render. Never call hooks inside a branch that might be skipped."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Nested ternaries:"})," quickly become unreadable. Extract variables, use maps, or early returns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"&& with non-boolean values:"})," ",e.jsx(n.InlineCode,{children:"{count && <Badge />}"})," shows ",e.jsx("em",{children:"0"})," when ",e.jsx(n.InlineCode,{children:"count"})," is 0. Use ",e.jsx(n.InlineCode,{children:"count > 0"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Expensive conditions in JSX:"})," compute once above and reuse the result in JSX."]})]}),e.jsx(n.Pre,{children:`// ❌ Wrong: conditional hook
function Comp({ show }) {
  if (show) { const [x] = useState(0); } // don't do this
  return null;
}

// ✅ Right
function Comp({ show }) {
  const [x] = useState(0); // always called
  return show ? <Pane x={x} /> : null;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a ternary for clear if/else."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(n.InlineCode,{children:"&&"})," for simple “render if truthy” cases."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," return early to keep JSX shallow."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a map/object for multiple states."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," call hooks conditionally."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on ",e.jsx(n.InlineCode,{children:"&&"})," with values like ",e.jsx(n.InlineCode,{children:"0"}),"—coerce to boolean or compare."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse nested ternaries—extract helpers."]})]})]}),e.jsxs(n.Callout,{children:["Summary: keep conditions as expressions, prefer ternary for if/else,",e.jsx(n.InlineCode,{children:"&&"})," for guards, early returns for clarity, and maps for multiple states. Never call hooks conditionally; choose unmount vs hide intentionally."]})]});export{i as default};
