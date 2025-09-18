import{j as e}from"./index-wTxrXa3i.js";import{S as n}from"./styled-DLdngjjk.js";const i=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Attributes & Spread (JSX)"}),e.jsxs(n.Lead,{children:["JSX attributes look like HTML, but they're really JavaScript props. The spread operator ",e.jsx(n.InlineCode,{children:"{...obj}"})," copies properties from an object into attributes. Used well, this keeps components flexible; used carelessly, it leaks unwanted props into the DOM or causes overrides."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Attributes: quick rules"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"camelCase"})," names for DOM props: ",e.jsx(n.InlineCode,{children:"className"}),", ",e.jsx(n.InlineCode,{children:"htmlFor"}),", ",e.jsx(n.InlineCode,{children:"tabIndex"}),"."]}),e.jsxs("li",{children:["Attribute values are JS ",e.jsx("b",{children:"expressions"})," inside ","{}"," or plain strings in quotes."]}),e.jsxs("li",{children:["Event handlers expect a ",e.jsx("b",{children:"function"}),": ",e.jsx(n.InlineCode,{children:"onClick={() => ...}"}),"."]}),e.jsxs("li",{children:["Inline styles are a JS object with camelCased CSS: ",e.jsx(n.InlineCode,{children:'style={{ backgroundColor: "teal" }}'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lowercase"})," tags → real DOM elements; ",e.jsx("b",{children:"Capitalized"})," tags → React components."]})]}),e.jsx(n.Pre,{children:`<button
  className="primary"
  aria-label="Save"
  disabled={false}
  style={{ padding: "8px 12px" }}
  onClick={() => console.log("saved")}
>
  Save
</button>`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Spread basics"}),e.jsx("p",{children:"The spread operator copies all enumerable properties of an object onto the element or component as attributes/props."}),e.jsx(n.Pre,{children:`const common = { className: "btn", "aria-busy": false };
const events = { onClick: () => console.log("clicked") };

// Spread onto a DOM element
<button {...common} {...events}>Click</button>

// Spread onto a component
<MyButton {...common} {...events} variant="primary" />`}),e.jsxs(n.Small,{children:["Think “prop pack”. Useful for forwarding things like ",e.jsx(n.InlineCode,{children:"id"}),", ",e.jsx(n.InlineCode,{children:"aria-*"}),", ",e.jsx(n.InlineCode,{children:"data-*"}),", handlers, etc."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Order matters (last one wins)"}),e.jsx("p",{children:"When attributes collide, the property defined later overrides earlier ones."}),e.jsx(n.Pre,{children:`const a = { className: "btn A", disabled: true };
const b = { className: "btn B", disabled: false };

<button {...a} {...b} className="btn C" />;
// final: class="btn C", disabled=false`}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Put spreads first, then explicit attributes you want to guarantee."}),e.jsxs("li",{children:["Prefer explicit attributes for critical values (",e.jsx(n.InlineCode,{children:'type="button"'}),", ",e.jsx(n.InlineCode,{children:"rel"})," etc.)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"DOM element vs custom component"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Spreading onto a ",e.jsx("b",{children:"DOM element"})," (",e.jsx(n.InlineCode,{children:"<button>"}),") sends props as HTML attributes. Unknown attributes become custom attributes (",e.jsx(n.InlineCode,{children:"data-*"})," works; unknown event names like ",e.jsx(n.InlineCode,{children:"onclick"})," do nothing)."]}),e.jsxs("li",{children:["Spreading onto a ",e.jsx("b",{children:"custom component"})," passes props to that component. It decides what to do with them (often forwards to an inner DOM node)."]})]}),e.jsx(n.Pre,{children:`function MyButton(props) {
  // Forward all unknown props to the real <button>
  const { variant = "primary", ...rest } = props;
  return (
    <button
      type="button"               // explicit and safe
      data-variant={variant}
      {...rest}                   // aria-*, onClick, id, etc.
    />
  );
}`}),e.jsx(n.Small,{children:"This “rest props” pattern is standard for reusable components."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Filter props before spreading (avoid leaking junk)"}),e.jsxs("p",{children:["Never dump ",e.jsx(n.InlineCode,{children:"{...props}"})," onto a DOM element without removing non-DOM fields (e.g., custom ",e.jsx(n.InlineCode,{children:"variant"}),", ",e.jsx(n.InlineCode,{children:"size"}),"). Filter first, then spread ",e.jsx(n.InlineCode,{children:"rest"}),"."]}),e.jsx(n.Pre,{children:`function Button({ variant, size, className, style, ...rest }) {
  const base = "btn";
  const cls = [base, variant && \`btn--\${variant}\`, className].filter(Boolean).join(" ");
  const baseStyle = { borderRadius: 12, padding: "8px 12px" };
  return (
    <button
      type="button"
      className={cls}
      style={{ ...baseStyle, ...style }}
      {...rest}               // aria-*, onClick, disabled, id, etc.
    />
  );
}

// Usage
<Button variant="ghost" onClick={...} aria-label="Save" data-id="x" />`}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Good: ",e.jsx("b",{children:"strip"})," design-only props; ",e.jsx("b",{children:"forward"})," ARIA/data/handlers."]}),e.jsxs("li",{children:["Bad: forwarding internal flags (",e.jsx(n.InlineCode,{children:"isOpen"}),", ",e.jsx(n.InlineCode,{children:"renderAsPortal"}),") to the DOM."]})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Merging ",e.jsx("code",{children:"className"})," and ",e.jsx("code",{children:"style"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Concatenate classes instead of letting user ",e.jsx("em",{children:"replace"})," them unintentionally."]}),e.jsx("li",{children:"Merge styles with spread. Later properties override earlier ones."})]}),e.jsx(n.Pre,{children:`const cls = ["badge", props.className].filter(Boolean).join(" ");
const style = { ...baseStyle, ...props.style };
return <span className={cls} style={style} {...rest} />;`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Security & accessibility notes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["When forwarding links, enforce safety for ",e.jsx(n.InlineCode,{children:'target="_blank"'}),": add ",e.jsx(n.InlineCode,{children:'rel="noopener noreferrer"'}),"."]}),e.jsxs("li",{children:["Don't forward ",e.jsx(n.InlineCode,{children:"dangerouslySetInnerHTML"})," from untrusted sources."]}),e.jsxs("li",{children:["Keep ",e.jsx(n.InlineCode,{children:"aria-*"})," and ",e.jsx(n.InlineCode,{children:"data-*"})," props flowing—these are valid on DOM nodes."]}),e.jsxs("li",{children:["Set an explicit ",e.jsx(n.InlineCode,{children:'type="button"'})," on custom buttons to avoid unintended form submits."]})]}),e.jsx(n.Pre,{children:`function LinkLike({ href, target, rel, ...rest }) {
  const safeRel = target === "_blank"
    ? [rel, "noopener", "noreferrer"].filter(Boolean).join(" ")
    : rel;
  return <a href={href} target={target} rel={safeRel} {...rest} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"}),": spread ",e.jsx("em",{children:"filtered"})," rest props onto a DOM element for flexibility."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"}),": put spreads first, then explicit attributes to lock critical values."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"}),": merge ",e.jsx(n.InlineCode,{children:"className"})," and ",e.jsx(n.InlineCode,{children:"style"})," instead of replacing them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"}),": spread ",e.jsx(n.InlineCode,{children:"{...props}"})," blindly onto DOM; strip internal props."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"}),": rely on spread order accidentally—make intent obvious."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"}),": forward unsafe props (e.g., user-provided ",e.jsx(n.InlineCode,{children:"dangerouslySetInnerHTML"}),")."]})]})]}),e.jsx(n.Callout,{children:"Summary: attributes are just props; spread packs are powerful but must be filtered. Control precedence by order, keep critical attributes explicit, and forward only what the DOM (or child component) should actually see."})]});export{i as default};
