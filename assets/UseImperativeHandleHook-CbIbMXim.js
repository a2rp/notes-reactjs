import{j as e}from"./index-XTJb1MLF.js";import{S as n}from"./styled-DwMTJZtE.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"useImperativeHandle"}),e.jsxs(n.Lead,{children:[e.jsx(n.InlineCode,{children:"useImperativeHandle"})," customizes the value a parent receives when it attaches a ",e.jsx("b",{children:"ref"})," to a child built with ",e.jsx(n.InlineCode,{children:"forwardRef"}),". Expose a small, well-defined imperative API (e.g., ",e.jsx("em",{children:"focus"}),", ",e.jsx("em",{children:"open"}),", ",e.jsx("em",{children:"reset"}),") while keeping internals private."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Terminology (precise)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Forwarded ref:"})," a ref passed from parent to child via ",e.jsx(n.InlineCode,{children:"React.forwardRef"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Imperative handle:"})," the object returned by ",e.jsx(n.InlineCode,{children:"useImperativeHandle"})," (methods/fields exposed to parent)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Surface area:"})," the public methods intentionally exposed (keep it minimal)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dependencies:"})," third arg to ",e.jsx(n.InlineCode,{children:"useImperativeHandle"}),"; when they change, the handle is refreshed."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Signature & basic pattern"}),e.jsx(n.Pre,{children:`// Parent holds a ref to the child
const ref = React.useRef(null);

// Child: forward the ref and define the public methods
const Child = React.forwardRef(function Child(props, ref) {
  const inputRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    select: () => inputRef.current?.select(),
    clear:  () => { if (inputRef.current) inputRef.current.value = ""; }
  }), []); // handle stays stable

  return <input ref={inputRef} {...props} />;
});

// Parent can call:
ref.current?.focus();
ref.current?.clear();`}),e.jsx(n.Small,{children:"The parent sees only the exposed methods, not the child’s internal refs/state."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Why use it?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Encapsulation:"})," hide internal DOM/structure; expose only safe operations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ergonomics:"})," allow parents to focus/scroll/open without reaching through DOM trees."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stability:"})," methods remain stable and independent from internal ref nodes or markup changes."]})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Example: Modal exposing ",e.jsx("code",{children:"open"}),"/",e.jsx("code",{children:"close"})]}),e.jsx(n.Pre,{children:`const Modal = React.forwardRef(function Modal({ children }, ref) {
  const [open, setOpen] = React.useState(false);

  React.useImperativeHandle(ref, () => ({
    open:  () => setOpen(true),
    close: () => setOpen(false),
    toggle: () => setOpen(o => !o)
  }), []);

  if (!open) return null;
  return (
    <div role="dialog" aria-modal="true" className="modal">
      <button onClick={() => setOpen(false)} aria-label="Close">×</button>
      {children}
    </div>
  );
});

function Page() {
  const modalRef = React.useRef(null);
  return (
    <>
      <button onClick={() => modalRef.current?.open()}>Open modal</button>
      <Modal ref={modalRef}><p>Hello</p></Modal>
    </>
  );
}`}),e.jsxs(n.Small,{children:["The parent triggers behavior without controlling internal state directly; UI details stay inside ",e.jsx("code",{children:"Modal"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Avoid stale closures"}),e.jsx(n.Pre,{children:`function Player() {
  const videoRef = React.useRef(null);
  const volumeRef = React.useRef(0.5); // mutable latest value

  React.useImperativeHandle(videoRef, () => ({
    setVolume: (v) => { volumeRef.current = v; },
    getVolume: () => volumeRef.current
  }), []);

  // UI updates could sync from volumeRef.current when necessary
  return null;
}

// Or include reactive values in deps to refresh the handle:
React.useImperativeHandle(ref, () => ({ doSomething: () => console.log(state) }), [state]);`}),e.jsx(n.Small,{children:"Methods capture values from render. Use a “latest” ref for mutables or add dependencies so the handle updates when inputs change."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Design a minimal, safe API"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Expose verbs (actions), not internals (DOM nodes or raw state)."}),e.jsxs("li",{children:["Avoid returning transient nodes; prefer methods like ",e.jsx(n.InlineCode,{children:"focus()"})," instead of exposing ",e.jsx(n.InlineCode,{children:"inputRef"}),"."]}),e.jsx("li",{children:"Keep operations idempotent and predictable; avoid coupling to internal class names or structure."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Callback ref vs imperative handle"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Callback ref"}),": direct access to a node on mount/unmount; great for quick setup (",e.jsx(n.InlineCode,{children:"(node) => "}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useImperativeHandle"}),": define a stable, high-level API that stays valid even if internals change."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Integrate third-party widgets"}),e.jsx(n.Pre,{children:`const Chart = React.forwardRef(function Chart({ data }, ref) {
  const hostRef = React.useRef(null);
  const instanceRef = React.useRef(null);

  React.useEffect(() => {
    // pseudo create
    instanceRef.current = createChart(hostRef.current, { data });
    return () => instanceRef.current?.destroy();
  }, []);

  React.useEffect(() => {
    instanceRef.current?.setData(data);
  }, [data]);

  React.useImperativeHandle(ref, () => ({
    exportPng: () => instanceRef.current?.export("png"),
    resetZoom: () => instanceRef.current?.resetZoom()
  }), []);

  return <div ref={hostRef} />;
});`}),e.jsx(n.Small,{children:"Store the library instance in a ref; expose only needed methods to the parent."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Using it for data flow that should be props/state—keep imperative handles for ",e.jsx("em",{children:"actions"}),", not state sharing."]}),e.jsx("li",{children:"Exposing internal DOM nodes, causing tight coupling; expose verbs instead."}),e.jsx("li",{children:"Stale closures in exposed methods; use refs for “latest” values or include deps."}),e.jsxs("li",{children:["Forgetting ",e.jsx(n.InlineCode,{children:"forwardRef"}),"; ",e.jsx(n.InlineCode,{children:"useImperativeHandle"})," must be used inside a forwarded component."]}),e.jsxs("li",{children:["Recreating the handle every render unnecessarily; pass ",e.jsx("b",{children:"deps"})," to keep it stable."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pair with ",e.jsx(n.InlineCode,{children:"forwardRef"})," and expose a minimal API (focus/open/reset)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep methods stable and free from stale values (deps or “latest” refs)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use for imperative integration with DOM or third-party widgets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," leak internal nodes/state; avoid overexposing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," replace declarative props with imperative calls when props suffice."]})]})]}),e.jsxs(n.Callout,{children:["Summary: ",e.jsx(n.InlineCode,{children:"useImperativeHandle"})," provides a clean, minimal imperative API for parents while preserving encapsulation. Combine with ",e.jsx(n.InlineCode,{children:"forwardRef"}),", avoid stale closures, and expose only safe actions—not internals."]})]});export{t as default};
