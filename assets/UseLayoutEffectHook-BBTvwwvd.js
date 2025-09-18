import{j as e}from"./index-dGwxAdn8.js";import{S as s}from"./styled-BD_Zc-Tc.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"useLayoutEffect"}),e.jsxs(s.Lead,{children:[e.jsx(s.InlineCode,{children:"useLayoutEffect"})," runs ",e.jsx("b",{children:"synchronously after the DOM is updated"})," but",e.jsx("b",{children:" before the browser paints"}),". Use it for ",e.jsx("b",{children:"measurement"})," and ",e.jsx("b",{children:"synchronous DOM reads/writes"})," that must happen without visible flicker. Prefer ",e.jsx(s.InlineCode,{children:"useEffect"})," for most side effects."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Terminology (precise)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Commit phase:"})," React has written DOM updates. Effects run after commit."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Paint:"})," the browser draws pixels on screen. ",e.jsx(s.InlineCode,{children:"useLayoutEffect"})," blocks paint until it finishes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layout/measurement:"})," reading sizes/positions from the DOM (getBoundingClientRect, scrollWidth, offsetHeight)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Flicker:"})," a visible jump when measuring then styling asynchronously. Layout effects avoid this."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"When to use (vs useEffect)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use useLayoutEffect"})," to measure layout and synchronously adjust styles, classes, or scroll positions before paint."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use useEffect"})," for network requests, subscriptions, logging, non-blocking updates, and anything where flicker does not matter."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Measure, then style (no flicker)"}),e.jsx(s.Pre,{children:`import { useLayoutEffect, useRef, useState } from "react";

function ClampToTwoLines() {
  const ref = useRef(null);
  const [needsClamp, setNeedsClamp] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const tooTall = el.scrollHeight > el.clientHeight;
    if (tooTall) setNeedsClamp(true); // runs before paint → no visible jump
  });

  return (
    <p
      ref={ref}
      className={needsClamp ? "clamp-2" : ""}
      style={{ maxHeight: "3em", overflow: "hidden" }}
    >
      Long text that may need clamping depending on layout and font metrics.
    </p>
  );
}`}),e.jsx(s.Small,{children:"Reads layout then sets state; React will commit the style change before the first paint of this update."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Scroll and selection before paint"}),e.jsx(s.Pre,{children:`import { useLayoutEffect, useRef } from "react";

function AutoScrollIntoView({ active }) {
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (active) {
      // ensure the active item is visible immediately
      ref.current && ref.current.scrollIntoView({ block: "nearest" });
    }
  }, [active]);

  return <li ref={ref} aria-current={active ? "true" : undefined}>Item</li>;
}`}),e.jsx(s.Small,{children:"Scrolling in a layout effect makes the list appear already scrolled at paint time."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Cursor/caret synchronization"}),e.jsx(s.Pre,{children:`import { useLayoutEffect, useRef, useState } from "react";

function NumberInput() {
  const [value, setValue] = useState("1000");
  const inputRef = useRef(null);

  // Format on change, then restore caret before paint
  useLayoutEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const end = el.value.length;
    el.setSelectionRange(end, end); // keep caret at end after formatting
  }, [value]);

  function onChange(e) {
    const digits = e.target.value.replace(/[^0-9]/g, "");
    // Add simple thousands separator
    const formatted = digits.replace(/\\B(?=(\\d{3})+(?!\\d))/g, ",");
    setValue(formatted);
  }

  return <input ref={inputRef} value={value} onChange={onChange} inputMode="numeric" />;
}`}),e.jsx(s.Small,{children:"Layout effect prevents caret jumps that would be visible with a normal effect."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Read → write order and batching"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Group all layout reads first, then writes, to avoid layout thrashing."}),e.jsx("li",{children:"Updates inside a layout effect are synchronous and block paint; keep the work minimal."}),e.jsxs("li",{children:["If heavy, schedule with ",e.jsx(s.InlineCode,{children:"requestAnimationFrame"})," or move to ",e.jsx(s.InlineCode,{children:"useEffect"}),"."]})]}),e.jsx(s.Pre,{children:`useLayoutEffect(() => {
  // read: bounds
  const r1 = box1.current.getBoundingClientRect();
  const r2 = box2.current.getBoundingClientRect();

  // write: position an overlay
  overlay.current.style.left = String(Math.min(r1.left, r2.left)) + "px";
  overlay.current.style.width = String(Math.abs(r2.right - r1.left)) + "px";
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"SSR considerations"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"On the server"}),", layout effects do not run and may show a warning in some setups."]}),e.jsxs("li",{children:["Create an isomorphic hook that uses ",e.jsx(s.InlineCode,{children:"useLayoutEffect"})," in the browser and ",e.jsx(s.InlineCode,{children:"useEffect"})," on the server."]})]}),e.jsx(s.Pre,{children:`import { useEffect, useLayoutEffect } from "react";
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;`}),e.jsx(s.Small,{children:"Use the isomorphic variant in libraries or SSR apps to avoid warnings and ensure safe behavior."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Doing heavy work in ",e.jsx(s.InlineCode,{children:"useLayoutEffect"})," and blocking paint; only use it when flicker must be prevented."]}),e.jsxs("li",{children:["Measuring in render or in ",e.jsx(s.InlineCode,{children:"useEffect"})," and then styling → causes a visible jump."]}),e.jsx("li",{children:"Forgetting cleanups for observers/listeners added during layout effects."}),e.jsxs("li",{children:["Depending on mutable DOM that might be ",e.jsx("em",{children:"null"})," initially; always null-check refs."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do / Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," reserve ",e.jsx(s.InlineCode,{children:"useLayoutEffect"})," for measurements and synchronous DOM writes that must happen pre-paint."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep work minimal, and group reads before writes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use an isomorphic variant when targeting SSR."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," fetch or perform non-visual side effects here; use a normal effect."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," cause long blocks that delay first paint; move heavy logic elsewhere."]})]})]}),e.jsxs(s.Callout,{children:["Summary: reach for ",e.jsx(s.InlineCode,{children:"useLayoutEffect"})," only when visual correctness depends on pre-paint measurement or synchronous writes. Keep work tiny, clean up properly, and use an isomorphic fallback for SSR."]})]});export{i as default};
