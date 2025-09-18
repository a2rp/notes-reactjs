import{j as e}from"./index-CEhT6f_w.js";import{S as n}from"./styled-fQfunvK6.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Typing Refs (TypeScript)"}),e.jsxs(n.Lead,{children:["A ",e.jsx("b",{children:"ref"})," is a React way to hold an ",e.jsx("i",{children:"imperative handle"})," to something that lives outside React's declarative data flow—typically a ",e.jsx("b",{children:"DOM element"})," (like an input) or a",e.jsx("b",{children:"mutable value"})," that shouldn't trigger re-renders. In TypeScript, we add precise types so our refs are safe and discoverable."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Ref"}),": A container that points at a value across renders. In React, refs are usually created with ",e.jsx(n.InlineCode,{children:"useRef"})," and read via"," ",e.jsx(n.InlineCode,{children:"ref.current"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DOM ref"}),": A ref that points to a browser element (e.g.,"," ",e.jsx(n.InlineCode,{children:"HTMLInputElement"}),") so you can call imperative APIs like ",e.jsx(n.InlineCode,{children:".focus()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutable ref (value ref)"}),": A ref that stores any mutable value that persists across renders but ",e.jsx("i",{children:"does not"})," cause re-renders when it changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ref forwarding"}),": Passing a ref from a parent down to some deeply nested element via"," ",e.jsx(n.InlineCode,{children:"React.forwardRef"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Imperative handle"}),": A custom object you expose from a component via"," ",e.jsx(n.InlineCode,{children:"useImperativeHandle"}),", defining exactly what the parent can call."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Type cheat-sheet"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"React.RefObject<T>"}),": read-only"," ",e.jsx(n.InlineCode,{children:"{ current: T | null }"})," (what"," ",e.jsx(n.InlineCode,{children:"useRef"})," returns in TS)."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"React.MutableRefObject<T>"}),": explicitly mutable version (often inferred automatically)."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"React.Ref<T>"}),": union of object ref, callback ref, or ",e.jsx(n.InlineCode,{children:"null"}),"—useful for component prop typing."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"React.ForwardedRef<T>"}),": the param type your",e.jsx(n.InlineCode,{children:"forwardRef"})," component receives."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:'React.ElementRef<"div">'})," → resolves to"," ",e.jsx(n.InlineCode,{children:"HTMLDivElement"}),"; with a component type it resolves to that component's underlying instance type."]})]}),e.jsx(n.Pre,{children:`// Common DOM element types you'll use:
HTMLInputElement, HTMLTextAreaElement, HTMLDivElement, HTMLButtonElement, HTMLCanvasElement
SVGSVGElement, HTMLAnchorElement, etc.`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Typing DOM refs with ",e.jsx("code",{children:"useRef"})]}),e.jsx(n.Pre,{children:`import * as React from "react";

export function FocusInput() {
  // Type the ref with the exact DOM element type + null (initially null).
  const inputRef = React.useRef<HTMLInputElement>(null);

  function focus() {
    inputRef.current?.focus(); // safe: current may be null before mount
  }

  React.useEffect(() => {
    inputRef.current?.focus(); // autofocus after mount
  }, []);

  return (
    <>
      <input ref={inputRef} placeholder="Type here..." />
      <button onClick={focus}>Focus</button>
    </>
  );
}`}),e.jsxs(n.Small,{children:["Always include ",e.jsx(n.InlineCode,{children:"| null"})," in the ref type, because"," ",e.jsx(n.InlineCode,{children:"current"})," is ",e.jsx("i",{children:"null"})," before mount and after unmount."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Callback refs (precise control)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["A ",e.jsx("b",{children:"callback ref"})," is a function React calls with the node instance on mount and"," ",e.jsx(n.InlineCode,{children:"null"})," on unmount."]}),e.jsx("li",{children:"Useful when you need to subscribe/unsubscribe imperatively or when measuring synchronously."})]}),e.jsx(n.Pre,{children:`function MeasureBox() {
  const [size, setSize] = React.useState({ w: 0, h: 0 });

  const boxRef = React.useCallback((node: HTMLDivElement | null) => {
    if (!node) return; // unmount
    const rect = node.getBoundingClientRect();
    setSize({ w: Math.round(rect.width), h: Math.round(rect.height) });
  }, []);

  return (
    <>
      <div ref={boxRef} style={{ width: 240, padding: 16, border: "1px solid #ccc" }}>
        Resize me (try changing content)
      </div>
      <p>Size: {size.w} × {size.h}px</p>
    </>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Forwarding refs to components"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Function components ",e.jsx("b",{children:"don't accept refs"})," by default. Wrap them with"," ",e.jsx(n.InlineCode,{children:"React.forwardRef"})," and type the inner ref target."]}),e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:'ComponentPropsWithoutRef<"input">'})," so you inherit all native input props."]})]}),e.jsx(n.Pre,{children:`type InputProps = React.ComponentPropsWithoutRef<"input"> & {
  label?: string;
};

const FancyInput = React.forwardRef<HTMLInputElement, InputProps>(
  function FancyInput({ label, ...props }, ref) {
    return (
      <label style={{ display: "grid", gap: 4 }}>
        {label && <span>{label}</span>}
        <input ref={ref} {...props} />
      </label>
    );
  }
);

// Usage:
function Screen() {
  const ref = React.useRef<HTMLInputElement>(null);
  return (
    <>
      <FancyInput ref={ref} label="Name" placeholder="Jane Doe" />
      <button onClick={() => ref.current?.focus()}>Focus Name</button>
    </>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Exposing a custom imperative handle"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Sometimes you don't want to expose the raw DOM node, but a ",e.jsx("b",{children:"restricted API"})," (e.g.,",e.jsx(n.InlineCode,{children:"reset()"}),", ",e.jsx(n.InlineCode,{children:"validate()"}),")."]}),e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"useImperativeHandle"})," to define what the parent can call."]})]}),e.jsx(n.Pre,{children:`type CounterHandle = { reset(): void; get(): number };

const Counter = React.forwardRef<CounterHandle, {}>(function Counter(_, ref) {
  const [n, setN] = React.useState(0);

  React.useImperativeHandle(ref, () => ({
    reset: () => setN(0),
    get: () => n,
  }), [n]);

  return (
    <div>
      <p>Count: {n}</p>
      <button onClick={() => setN(n + 1)}>+</button>
    </div>
  );
});

// Parent:
function Demo() {
  const counterRef = React.useRef<CounterHandle>(null);
  return (
    <>
      <Counter ref={counterRef} />
      <button onClick={() => counterRef.current?.reset()}>Reset from parent</button>
      <button onClick={() => alert(counterRef.current?.get())}>Read value</button>
    </>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Value refs (non-DOM, no re-renders)"}),e.jsx(n.List,{children:e.jsxs("li",{children:[e.jsx("b",{children:"Value refs"})," store any mutable value that must survive renders without causing a re-render (e.g., IDs, timers, previous values)."]})}),e.jsx(n.Pre,{children:`function Timer() {
  const id = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  function start() {
    if (id.current) return; // already running
    id.current = setTimeout(() => {
      console.log("tick");
      id.current = null;
    }, 1000);
  }
  function stop() {
    if (id.current) clearTimeout(id.current);
    id.current = null;
  }

  return (
    <>
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </>
  );
}`}),e.jsxs(n.Small,{children:["Updating ",e.jsx(n.InlineCode,{children:"id.current"})," does ",e.jsx("i",{children:"not"})," re-render; use state when you need to update UI."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Measuring layout safely"}),e.jsx(n.List,{children:e.jsxs("li",{children:["Reading layout (e.g., ",e.jsx(n.InlineCode,{children:"getBoundingClientRect()"}),") is best done in ",e.jsx(n.InlineCode,{children:"useLayoutEffect"})," to avoid flicker."]})}),e.jsx(n.Pre,{children:`function MeasureOnLayout() {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [w, setW] = React.useState(0);

  React.useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    setW(Math.round(el.getBoundingClientRect().width));
  }, []);

  return <div ref={boxRef}>Width: {w}px</div>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pitfalls & best practices"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsxs("b",{children:["Always include ",e.jsx(n.InlineCode,{children:"| null"})," for DOM refs."]})," Avoid"," ",e.jsx(n.InlineCode,{children:"! (non-null assertion)"})," unless you truly guarantee presence."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't read/write DOM in render."})," Use effects (",e.jsx(n.InlineCode,{children:"useEffect"})," ","or ",e.jsx(n.InlineCode,{children:"useLayoutEffect"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't pass refs through props"})," like normal values; instead, use"," ",e.jsx(n.InlineCode,{children:"forwardRef"})," to expose a ref properly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ref changes don't trigger re-renders."})," Use state for anything that affects UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Function components can't receive refs"})," unless wrapped in"," ",e.jsx(n.InlineCode,{children:"forwardRef"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Ref object"}),": ",e.jsx(n.InlineCode,{children:"{ current: T | null }"})," container returned by"," ",e.jsx(n.InlineCode,{children:"useRef"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Callback ref"}),": ",e.jsx(n.InlineCode,{children:"(node: T | null) => void"})," invoked on mount/unmount."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Forwarded ref"}),": A ref passed into a component and attached internally via"," ",e.jsx(n.InlineCode,{children:"forwardRef"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Imperative handle"}),": A custom object you expose with"," ",e.jsx(n.InlineCode,{children:"useImperativeHandle"}),"."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Type refs precisely (always include ",e.jsx("i",{children:"| null"}),"), forward them when exposing inner elements, and prefer an ",e.jsx("b",{children:"imperative handle"})," when you want to control what parents can do. Use refs for imperative tasks and persistent mutable values—use state to update UI."]})]});export{s as default};
