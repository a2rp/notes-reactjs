import{j as e}from"./index-C4jUa9lD.js";import{S as n}from"./styled-DIkHk3G6.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Props"}),e.jsxs(n.Lead,{children:["Props (properties) are the ",e.jsx("b",{children:"inputs"})," to a component. They flow one-way from parent to child, are ",e.jsx("b",{children:"read-only"})," inside the child, and can be any serializable JS value (strings, numbers, booleans, arrays, objects, functions, even JSX)."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Terminology (precise)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prop:"})," a single named input (e.g., ",e.jsx(n.InlineCode,{children:"title"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Props object:"})," the object passed to a component function (e.g., ",e.jsx(n.InlineCode,{children:"function Card(props) { ... }"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Children prop:"})," the special prop containing whatever appears between a component’s opening and closing tags (handled in depth on the “Children” page)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop drilling:"})," passing props through many layers just to reach a deep child. Often a signal to use context or lift/shared state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Default prop value:"})," a fallback used when the caller omits that prop."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prop type:"})," the expected type/shape/contract for a prop (documented via PropTypes or TypeScript)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Special props:"})," ",e.jsx(n.InlineCode,{children:"key"})," and ",e.jsx(n.InlineCode,{children:"ref"})," are handled by React; they are not regular props."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Basics: pass and read props"}),e.jsx(n.Pre,{children:`function Welcome(props) {
  return <h2>Welcome, {props.name}</h2>;
}

// Passing a prop
<Welcome name="Ada" />`}),e.jsxs(n.Small,{children:["Component functions receive a single argument (",e.jsx(n.InlineCode,{children:"props"}),") and return JSX."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Destructuring & default values"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Destructure for clarity; set defaults in the parameter list."}),e.jsxs("li",{children:["Defaults run at call time and only when the prop is ",e.jsx("em",{children:"undefined"}),"."]})]}),e.jsx(n.Pre,{children:`function Avatar({ src = "/avatar.png", alt = "User avatar", size = 40 }) {
  return <img src={src} alt={alt} width={size} height={size} />;
}

// <Avatar />  // uses all defaults
// <Avatar size={64} />  // overrides size only`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Passing functions (callbacks)"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Parents pass behavior down by providing callbacks."}),e.jsxs("li",{children:["In JSX, pass a ",e.jsx("b",{children:"function"}),", not the result of calling one."]})]}),e.jsx(n.Pre,{children:`function SaveButton({ onSave }) {
  return <button onClick={() => onSave?.()}>Save</button>;
}

// Parent:
// <SaveButton onSave={() => fetch("/api/save", { method: "POST" })} />`}),e.jsxs(n.Small,{children:["Callbacks can receive arguments: ",e.jsx(n.InlineCode,{children:"onSelect(item)"}),". Use inline arrows or wrap named handlers."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Props vs State"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Props"})," are inputs from the parent; they are read-only inside the child."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State"})," is internal component data; update it with ",e.jsx(n.InlineCode,{children:"setState"})," hooks."]}),e.jsx("li",{children:"Parent changes → child re-renders with new props. Child changes state → child re-renders itself."})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:[e.jsx("code",{children:"children"})," (overview)"]}),e.jsxs("p",{children:["The ",e.jsx(n.InlineCode,{children:"children"})," prop represents nested content. It enables composition without creating a dedicated prop for every slot. A full page covers patterns and render-props."]}),e.jsx(n.Pre,{children:`function Card({ title, children }) {
  return (
   <section className="card">
     <h3>{title}</h3>
     {children}
   </section>
  );
}

// <Card title="Hello"><p>Body</p></Card>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Rest props & safe forwarding"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Accept design-only props (e.g., ",e.jsx(n.InlineCode,{children:"variant"}),") but do not leak them to the DOM."]}),e.jsxs("li",{children:["Forward valid DOM props (",e.jsx(n.InlineCode,{children:"id"}),", ",e.jsx(n.InlineCode,{children:"aria-*"}),", ",e.jsx(n.InlineCode,{children:"data-*"}),", event handlers)."]})]}),e.jsx(n.Pre,{children:`function Button({ variant = "primary", className, style, ...rest }) {
  const cls = ["btn", \`btn--\${variant}\`, className].filter(Boolean).join(" ");
  return <button type="button" className={cls} style={style} {...rest} />;
}

// <Button aria-label="Save" onClick={...} data-test="x" />`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Polymorphic components with ",e.jsx("code",{children:"as"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Let callers swap the underlying tag (",e.jsx(n.InlineCode,{children:"button"})," → ",e.jsx(n.InlineCode,{children:"a"}),", ",e.jsx(n.InlineCode,{children:"div"})," → ",e.jsx(n.InlineCode,{children:"section"}),")."]}),e.jsx("li",{children:"Preserve accessibility: correct roles/attributes when switching semantics."})]}),e.jsx(n.Pre,{children:`function Text({ as: Comp = "p", ...rest }) {
  return <Comp {...rest} />;
}

// <Text>para</Text>
// <Text as="h2">heading</Text>`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Special props: ",e.jsx("code",{children:"key"})," & ",e.jsx("code",{children:"ref"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"key"})," gives identity among siblings for reconciliation. It is ",e.jsx("em",{children:"not"})," available as ",e.jsx(n.InlineCode,{children:"props.key"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ref"})," holds a reference to a DOM node or to a child component that forwards a ref. Use ",e.jsx(n.InlineCode,{children:"forwardRef"}),"."]})]}),e.jsx(n.Pre,{children:"const Input = React.forwardRef((props, ref) => <input ref={ref} {...props} />);"})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Avoid “derived state from props” unless necessary"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Do not copy props into state just to render them; this creates stale data."}),e.jsx("li",{children:"Compute derived values during render or memoize if expensive."}),e.jsx("li",{children:"If the UI must reset on a prop change, key the subtree or sync intentionally in an effect."})]}),e.jsx(n.Pre,{children:`// ❌ Anti-pattern: local copy becomes stale if 'value' changes
function Editor({ value }) {
  const [text, setText] = React.useState(value);
  return <input value={text} onChange={e => setText(e.target.value)} />;
}

// ✅ Intentional re-initialize when 'version' changes
function Editor({ value, version }) {
  const [text, setText] = React.useState(value);
  React.useEffect(() => setText(value), [value, version]);
  return <input value={text} onChange={e => setText(e.target.value)} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Validation & documentation"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"PropTypes"})," (JS): runtime dev-time validation & docs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TypeScript"}),": static, compile-time checking and editor hints."]})]}),e.jsx(n.Pre,{children:`// PropTypes (optional)
import PropTypes from "prop-types";
function Badge({ color = "gray", children }) { /* ... */ }
Badge.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node.isRequired,
};`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility & security"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Forward ",e.jsx(n.InlineCode,{children:"aria-*"})," and ",e.jsx(n.InlineCode,{children:"data-*"})," props to DOM elements."]}),e.jsxs("li",{children:["For links with ",e.jsx(n.InlineCode,{children:'target="_blank"'}),", add ",e.jsx(n.InlineCode,{children:'rel="noopener noreferrer"'}),"."]}),e.jsxs("li",{children:["Avoid passing untrusted HTML into ",e.jsx(n.InlineCode,{children:"dangerouslySetInnerHTML"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep props read-only; compute values instead of copying props to state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," destructure with defaults; document expectations (PropTypes/TS)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pass callbacks for actions; keep signatures simple."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," forward filtered rest props to the underlying DOM element."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate props or rely on ",e.jsx(n.InlineCode,{children:"props.key"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," spread unfiltered props into DOM; avoid leaking internal flags."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," derive local state from props without an explicit sync/reset strategy."]})]})]}),e.jsx(n.Callout,{children:"Summary: props are the component inputs. Keep them immutable, define clear defaults and types, pass behavior via callbacks, forward only valid DOM props, and avoid stale copies by deriving values during render."})]});export{r as default};
