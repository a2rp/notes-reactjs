import{j as e}from"./index-C4jUa9lD.js";import{S as r}from"./styled-C7iLp_gB.js";const s=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"forwardRef"}),e.jsxs(r.Lead,{children:[e.jsx(r.InlineCode,{children:"React.forwardRef"})," lets a component",e.jsx("b",{children:" pass a ref it receives down to a child"})," (usually a DOM node). This enables parents to imperatively focus, measure, or scroll an inner element of a function component."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Terminology (precise)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Ref object:"})," an object with ",e.jsx(r.InlineCode,{children:"current"})," that persists across renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Forwarded ref:"})," a ref passed to a custom component that forwards it to its inner target."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Callback ref:"})," a function ",e.jsx(r.InlineCode,{children:"(node) => void"})," called on mount/unmount."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Target:"})," the node or instance that actually receives the ref (e.g., ",e.jsx(r.InlineCode,{children:"<input>"}),")."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Basic pattern (forward a ref to a DOM input)"}),e.jsx(r.Pre,{children:`const TextInput = React.forwardRef(function TextInput(props, ref) {
  return <input ref={ref} {...props} />;
});

function Form() {
  const inputRef = React.useRef(null);
  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);
  return <TextInput ref={inputRef} placeholder="Your name" />;
}`}),e.jsxs(r.Small,{children:["Without ",e.jsx(r.InlineCode,{children:"forwardRef"}),", passing ",e.jsx(r.InlineCode,{children:"ref"})," to ",e.jsx(r.InlineCode,{children:"<TextInput />"})," would attach it to the ",e.jsx("em",{children:"component"})," itself (not the inner input), which is not supported for function components."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Forward through a wrapper (add styles but keep ref working)"}),e.jsx(r.Pre,{children:`const FancyButton = React.forwardRef(function FancyButton({ className = "", ...props }, ref) {
  return (
    <button
      ref={ref}
      className={"btn " + className}
      {...props}
    />
  );
});

function Toolbar() {
  const btnRef = React.useRef(null);
  return (
    <>
      <FancyButton ref={btnRef} onClick={() => console.log("clicked")}>
        Save
      </FancyButton>
      <button onClick={() => btnRef.current?.focus()}>Focus Save</button>
    </>
  );
}`}),e.jsxs(r.Small,{children:["Destructure known props, spread the rest, and pass ",e.jsx(r.InlineCode,{children:"ref"})," to the underlying element to keep the wrapper transparent."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Callback refs (run logic on attach/detach)"}),e.jsx(r.Pre,{children:`const Video = React.forwardRef(function Video(props, ref) {
  return <video ref={ref} {...props} />;
});

function Player() {
  const setRef = React.useCallback(node => {
    if (!node) return; // unmounted
    // node is the <video> element here
    node.volume = 0.5;
  }, []);
  return <Video ref={setRef} src="movie.mp4" controls />;
}`}),e.jsx(r.Small,{children:"Callback refs are useful when setup is needed immediately on mount (no separate effect)."})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Composition: ",e.jsx("code",{children:"memo(forwardRef(...))"})]}),e.jsx(r.Pre,{children:`const ListItem = React.memo(
  React.forwardRef(function ListItem({ item }, ref) {
    return <li ref={ref}>{item.label}</li>;
  })
);
// Optionally set a displayName for better DevTools labels:
ListItem.displayName = "ListItem";`}),e.jsxs(r.Small,{children:["Combine with ",e.jsx(r.InlineCode,{children:"React.memo"})," to avoid re-rendering stable items while still exposing their DOM nodes via refs."]})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Polymorphic components (",e.jsx("code",{children:"as"})," prop)"]}),e.jsx(r.Pre,{children:`const Box = React.forwardRef(function Box({ as: Comp = "div", ...props }, ref) {
  return <Comp ref={ref} {...props} />;
});

// Usage
<Box as="a" href="#top">Go top</Box>
<Box as="button" onClick={() => {}}>Click</Box>`}),e.jsx(r.Small,{children:"Forward the ref to whatever element is rendered. In TypeScript, prefer a typed polymorphic pattern."})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Expose a minimal imperative API (with ",e.jsx("code",{children:"useImperativeHandle"}),")"]}),e.jsx(r.Pre,{children:`const TextField = React.forwardRef(function TextField(props, ref) {
  const inputRef = React.useRef(null);
  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    select: () => inputRef.current?.select()
  }));
  return <input ref={inputRef} {...props} />;
});

// Parent:
const tfRef = React.useRef(null);
// tfRef.current.focus() / select()`}),e.jsxs(r.Small,{children:[e.jsx(r.InlineCode,{children:"forwardRef"})," passes the ref; ",e.jsx(r.InlineCode,{children:"useImperativeHandle"})," customizes what the parent can call. Full details are covered in the next page."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Filter non-DOM props (avoid React warnings)"}),e.jsx(r.Pre,{children:`// Bad: forwards custom prop to DOM -> <button dataActive="true"> (unexpected)
function Bad({ dataActive, ...rest }) {
  return <button dataActive={dataActive} {...rest} />;
}

// Good: map or omit custom props before forwarding to DOM
const Btn = React.forwardRef(function Btn({ active, ...rest }, ref) {
  return <button ref={ref} aria-pressed={active ? "true" : "false"} {...rest} />;
});`}),e.jsx(r.Small,{children:"DOM elements accept only valid HTML attributes/ARIA props. Strip or map custom props before spreading."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Common pitfalls"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Expecting ",e.jsx(r.InlineCode,{children:"ref"})," to “pass through” automatically—custom components need ",e.jsx(r.InlineCode,{children:"forwardRef"}),"."]}),e.jsx("li",{children:"Forgetting to attach the forwarded ref to the correct inner element."}),e.jsxs("li",{children:["Forwarding the ref but also spreading it as a normal prop (naming collisions). The ",e.jsx("em",{children:"special"})," prop is always ",e.jsx(r.InlineCode,{children:"ref"}),"."]}),e.jsx("li",{children:"Creating new wrapper objects/handlers every render around the forwarded element—can defeat memoization."}),e.jsxs("li",{children:["Using refs for data that should be state (UI won’t update when ",e.jsx(r.InlineCode,{children:"ref.current"})," changes)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do / Don’t"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," forward refs for focus, measure, scroll, or library integration."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the wrapper “transparent”: spread props, attach ref to the real target."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," combine with ",e.jsx(r.InlineCode,{children:"memo"})," when rendering large lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forward arbitrary custom props to DOM elements; sanitize or map them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," replace state with refs when the UI must react to changes."]})]})]}),e.jsxs(r.Callout,{children:["Summary: ",e.jsx(r.InlineCode,{children:"forwardRef"})," lets a parent reach an inner node of a function component. Use it for imperative focus/measure/scroll, keep wrappers transparent, and pair with",e.jsx(r.InlineCode,{children:"useImperativeHandle"})," to expose a minimal, well-defined API."]})]});export{s as default};
