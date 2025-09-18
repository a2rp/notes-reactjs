import{j as e}from"./index-BExKNf87.js";import{S as i}from"./styled-CeXOINHv.js";const r=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Measure & Layout"}),e.jsxs(i.Lead,{children:["“Measuring” means reading an element’s ",e.jsx("b",{children:"size"})," and ",e.jsx("b",{children:"position"})," (e.g., via",e.jsx(i.InlineCode,{children:"getBoundingClientRect()"}),",",e.jsx(i.InlineCode,{children:"offsetWidth"}),"). These reads can trigger browser",e.jsx("b",{children:" layout"})," work. Know when and how to measure to avoid jank, flicker, and layout thrashing."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Definition & Purpose"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Layout (reflow):"})," the step where the browser computes sizes/positions of elements."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Paint (repaint):"})," the step where pixels are drawn (colors, text, borders, shadows)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compositing:"})," combining painted layers on the GPU."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Measuring:"})," reading layout-dependent values:",e.jsx(i.InlineCode,{children:"getBoundingClientRect()"}),",",e.jsx(i.InlineCode,{children:"offsetWidth/Height"}),",",e.jsx(i.InlineCode,{children:"clientWidth/Height"}),",",e.jsx(i.InlineCode,{children:"scrollWidth/Height"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why it matters:"})," unnecessary or interleaved reads/writes cause ",e.jsx("i",{children:"forced synchronous layouts"})," → jank."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"When should you measure?"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"After a component mounts and renders dynamic content (e.g., to size a popover/tooltip)."}),e.jsx("li",{children:"When the element’s size can change (content changes, container resizes, responsive breakpoints)."}),e.jsx("li",{children:"On viewport changes (window resize/zoom) or when visibility toggles (tabs, accordions)."}),e.jsx("li",{children:"After fonts load (text reflow), or images load (intrinsic size changes)."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core APIs for measuring"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ref + getBoundingClientRect()"})," — returns ",e.jsx("i",{children:"position"})," & ",e.jsx("i",{children:"size"})," in viewport coordinates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"offsetWidth/offsetHeight"})," — round, includes borders; excludes margins."]}),e.jsxs("li",{children:[e.jsx("b",{children:"clientWidth/clientHeight"})," — inner box (padding included, border excluded)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"scrollWidth/scrollHeight"})," — content size including overflow area."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ResizeObserver"})," — async notifications when an element’s box size changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"IntersectionObserver"})," — visibility/overlap of a target with a root (useful for lazy UI)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"getComputedStyle(el)"})," — read resolved styles (expensive; avoid in hot paths)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example: Measure on mount (no flicker)"}),e.jsx(i.Pre,{children:`function Popover({ anchorRef, open, children }) {
  const popRef = React.useRef(null);
  const [pos, setPos] = React.useState({ top: 0, left: 0 });

  // Measure in useLayoutEffect to read after DOM updates but before paint.
  React.useLayoutEffect(() => {
    if (!open) return;
    const a = anchorRef.current;
    const p = popRef.current;
    if (!a || !p) return;

    const rect = a.getBoundingClientRect();
    const top = rect.bottom + window.scrollY;
    const left = rect.left + window.scrollX;

    setPos({ top, left });
  }, [open, anchorRef]);

  return open ? (
    <div
      ref={popRef}
      style={{
        position: "absolute",
        top: pos.top,
        left: pos.left
      }}
      role="dialog"
      aria-modal="true"
    >
      {children}
    </div>
  ) : null;
}`}),e.jsxs(i.Small,{children:["Use ",e.jsx("b",{children:"useLayoutEffect"})," for measuring to avoid a visible “jump” between first paint and positioned paint."]})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Example: Track size with ",e.jsx("code",{children:"ResizeObserver"})]}),e.jsx(i.Pre,{children:`function useElementSize(ref) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      setSize({ width: cr.width, height: cr.height });
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size;
}

function ResizablePanel() {
  const ref = React.useRef(null);
  const { width, height } = useElementSize(ref);
  return (
    <div ref={ref} className="panel">
      <p>Size: {Math.round(width)} × {Math.round(height)}</p>
    </div>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"ResizeObserver"})," is async and avoids repeated forced layouts. Guard for SSR and old browsers if needed."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Pattern: Batch reads, then writes"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Layout thrash:"})," alternating read → write → read forces multiple layouts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Solution:"})," read all metrics first; then perform style writes, ideally inside ",e.jsx(i.InlineCode,{children:"requestAnimationFrame"}),"."]})]}),e.jsx(i.Pre,{children:`function positionTooltip(el, anchor) {
  // READ phase
  const r = anchor.getBoundingClientRect();
  const top = r.bottom + window.scrollY;
  const left = r.left + window.scrollX;

  // WRITE phase (next frame)
  requestAnimationFrame(() => {
    el.style.transform = \`translate(\${left}px, \${top}px)\`;
  });
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example: Measure only when visible"}),e.jsx(i.Pre,{children:`function useVisibility(ref, options) {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    io.observe(el);
    return () => io.disconnect();
  }, [ref, options]);

  return visible;
}

function Chart() {
  const ref = React.useRef(null);
  const visible = useVisibility(ref, { threshold: 0.25 });

  React.useLayoutEffect(() => {
    if (!visible || !ref.current) return;
    // safe to measure + render chart now
    const rect = ref.current.getBoundingClientRect();
    // drawChart({ width: rect.width, height: rect.height });
  }, [visible]);

  return <div ref={ref} style={{ minHeight: 240 }} />;
}`}),e.jsx(i.Small,{children:"Defer heavy measuring/painting until the element is likely visible → faster initial load."})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:[e.jsx("code",{children:"useEffect"})," vs ",e.jsx("code",{children:"useLayoutEffect"})]}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Measure in"})," ",e.jsx(i.InlineCode,{children:"useLayoutEffect"})," (runs after DOM updates, before paint) to avoid flicker."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutate styles"})," that depend on measurements either in the same ",e.jsx("i",{children:"layout effect"})," or in a ",e.jsx("i",{children:"requestAnimationFrame"})," callback."]}),e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"useEffect"})," for non-visual side effects (fetch, logs, subscriptions) where timing vs paint doesn’t matter."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep a stable ",e.jsx(i.InlineCode,{children:"ref"})," and measure from it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," batch all ",e.jsx("i",{children:"reads"})," first, then ",e.jsx("i",{children:"writes"}),"; prefer ",e.jsx(i.InlineCode,{children:"requestAnimationFrame"})," for writes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(i.InlineCode,{children:"ResizeObserver"})," for ongoing size tracking."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," interleave reads and writes in one tick; avoid repeated ",e.jsx(i.InlineCode,{children:"getBoundingClientRect()"})," in loops."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on layout measurements during SSR; guard for ",e.jsx(i.InlineCode,{children:"window"}),"/API availability."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget fonts/images can change layout after load—listen or re-measure if needed."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Forced synchronous layout:"})," the browser must recompute layout immediately to answer a read."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layout thrashing:"})," alternating read/write that triggers multiple layouts in a frame."]}),e.jsxs("li",{children:[e.jsx("b",{children:"BBox / BCR:"})," bounding client rect (position & size in viewport coords)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CLS (Cumulative Layout Shift):"})," metric capturing unexpected layout movement; minimize flicker by measuring before paint."]})]})]}),e.jsxs(i.Callout,{children:["Summary: measure with refs, prefer ",e.jsx("b",{children:"useLayoutEffect"})," for timing, batch reads and writes, and use observers (Resize/Intersection) to react to change without thrashing."]})]});export{r as default};
