import{j as e}from"./index-c1-mK4-g.js";import{S as n}from"./styled-Dr5w0GdT.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"useRef"}),e.jsxs(n.Lead,{children:[e.jsx(n.InlineCode,{children:"useRef"})," creates a ",e.jsx("b",{children:"mutable ref object"})," that persists across renders: ",e.jsx(n.InlineCode,{children:"{ current: ... }"}),". Updating ",e.jsx(n.InlineCode,{children:"ref.current"})," does ",e.jsx("b",{children:"not"})," trigger a re-render."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Terminology (precise)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Ref object:"})," an object with a ",e.jsx(n.InlineCode,{children:"current"})," property."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DOM ref:"})," a ref pointing to a DOM node (e.g., input element) for imperative access."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutable ref:"})," any ref used to hold values between renders (IDs, previous values, instances)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Callback ref:"})," a function ref ",e.jsx(n.InlineCode,{children:"(node) => void"})," that runs when a node mounts/unmounts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"forwardRef:"})," lets a component expose an inner ref to its parent."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useImperativeHandle:"})," customizes the instance a parent receives via ref (expose specific methods)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"DOM access: focus, measure, scroll"}),e.jsx(n.Pre,{children:`import { useEffect, useRef } from "react";

function FocusOnMount() {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="Auto-focused" />;
}

function Measure() {
  const boxRef = useRef(null);
  useEffect(() => {
    const rect = boxRef.current?.getBoundingClientRect();
    if (rect) console.log("Height:", rect.height);
  }, []);
  return <div ref={boxRef} style={{ padding: 16 }}>Measure me</div>;
}`}),e.jsx(n.Small,{children:"Access the DOM in an effect (after commit) to avoid reading a stale layout."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Store values across renders (no re-render)"}),e.jsx(n.Pre,{children:`function Stopwatch() {
  const [running, setRunning] = React.useState(false);
  const startMsRef = React.useRef(0); // mutable
  const idRef = React.useRef(null);   // interval id

  function start() {
    if (running) return;
    setRunning(true);
    startMsRef.current = Date.now();
    idRef.current = setInterval(() => {
      // render updates could be scheduled here if showing elapsed time
    }, 1000);
  }
  function stop() {
    setRunning(false);
    clearInterval(idRef.current);
  }
  return (
    <>
      <button onClick={start} disabled={running}>Start</button>
      <button onClick={stop} disabled={!running}>Stop</button>
    </>
  );
}`}),e.jsx(n.Small,{children:"Refs are perfect for IDs, previous values, or any mutable instance that should not cause re-renders."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Avoid stale closures with a “latest” ref"}),e.jsx(n.Pre,{children:`function useInterval(callback, delay) {
  const latest = React.useRef(callback);
  React.useEffect(() => { latest.current = callback; }, [callback]);

  React.useEffect(() => {
    if (delay == null) return;
    const id = setInterval(() => latest.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
`}),e.jsx(n.Small,{children:"Keep mutable refs in sync with the latest callback/props to prevent timers using old values."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Track previous value"}),e.jsx(n.Pre,{children:`function usePrevious(value) {
  const prevRef = React.useRef();
  React.useEffect(() => { prevRef.current = value; }, [value]);
  return prevRef.current;
}

function Field({ value }) {
  const prev = usePrevious(value);
  return <p>Prev: {String(prev)} — Now: {String(value)}</p>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Expose an imperative API (forwardRef + useImperativeHandle)"}),e.jsx(n.Pre,{children:`const TextInput = React.forwardRef(function TextInput(props, ref) {
  const inputRef = React.useRef(null);

  React.useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    select: () => inputRef.current?.select()
  }));

  return <input ref={inputRef} {...props} />;
});

function Demo() {
  const ref = React.useRef(null);
  return (
    <>
      <TextInput ref={ref} />
      <button onClick={() => ref.current?.focus()}>Focus</button>
      <button onClick={() => ref.current?.select()}>Select</button>
    </>
  );
}`}),e.jsx(n.Small,{children:"Expose only the minimal surface (focus/select). Avoid leaking internal DOM details."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Callback refs"}),e.jsx(n.Pre,{children:`function CallbackRefExample() {
  const [width, setWidth] = React.useState(0);

  const setNode = React.useCallback(node => {
    if (!node) return; // unmount
    const rect = node.getBoundingClientRect();
    setWidth(rect.width);
  }, []);

  return <div ref={setNode}>Width: {width}</div>;
}`}),e.jsx(n.Small,{children:"Callback refs run on mount/unmount; useful when a calculation is needed at attach time."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Integrate third-party libraries"}),e.jsx(n.Pre,{children:`function ChartWrapper({ data }) {
  const hostRef = React.useRef(null);
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    // pseudo create
    chartRef.current = createChart(hostRef.current, { data });
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    chartRef.current?.setData(data); // imperative update
  }, [data]);

  return <div ref={hostRef} />;
}`}),e.jsx(n.Small,{children:"Keep the library instance in a ref, initialize once, clean up on unmount, and update imperatively."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Refs vs state (choose correctly)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use state"})," for values that should trigger a re-render when they change (UI output)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use ref"})," for values that are only used imperatively or to persist across renders without causing re-renders (IDs, instances, previous value, latest callback)."]}),e.jsx("li",{children:"Do not read/write layout in render; use refs inside effects."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Expecting UI to update when changing ",e.jsx(n.InlineCode,{children:"ref.current"}),"—refs do not trigger re-renders."]}),e.jsxs("li",{children:["Reading a ref before mount (it is ",e.jsx(n.InlineCode,{children:"null"})," initially). Access it in effects or after conditional rendering."]}),e.jsx("li",{children:"Conditional refs (different nodes based on branches) without handling unmount; prefer stable ref usage."}),e.jsx("li",{children:"Using refs to store derived state; compute during render or with memo instead."}),e.jsx("li",{children:"Forgetting to clean up observers/listeners created with a DOM ref."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do / Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use refs for DOM access, instance storage, and “latest” values in async code."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," expose a minimal imperative API with ",e.jsx(n.InlineCode,{children:"forwardRef"})," and ",e.jsx(n.InlineCode,{children:"useImperativeHandle"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," manage DOM work in effects and clean up."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," replace state with refs when the UI must update."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate DOM directly in render; use effects."]})]})]}),e.jsxs(n.Callout,{children:["Summary: ",e.jsx(n.InlineCode,{children:"useRef"})," holds mutable values and DOM nodes across renders without re-rendering. Use it for imperative DOM access, third-party instances, previous values, and avoiding stale closures. Reach for state when the UI should react to changes."]})]});export{s as default};
