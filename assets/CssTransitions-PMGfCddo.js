import{j as e}from"./index-CLbx3UkF.js";import{S as i}from"./styled-DU7cfzEl.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"CSS Transitions"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"CSS transitions"})," smoothly interpolate a property's value over time when it changes. You define ",e.jsx(i.InlineCode,{children:"what"})," to transition, the",e.jsx(i.InlineCode,{children:"duration"}),", the ",e.jsx(i.InlineCode,{children:"easing"})," (speed curve), and an optional ",e.jsx(i.InlineCode,{children:"delay"}),". They're ideal for simple UI feedback like hover/focus states, expanding panels, and subtle fades."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Key Terms (clear definitions)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Animatable property:"})," a CSS property whose intermediate values can be calculated (e.g., ",e.jsx(i.InlineCode,{children:"opacity"}),", ",e.jsx(i.InlineCode,{children:"transform"}),",",e.jsx(i.InlineCode,{children:"color"}),", ",e.jsx(i.InlineCode,{children:"background-color"}),"). Not everything is animatable (e.g., ",e.jsx(i.InlineCode,{children:"display"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transition"})," = property change + time function. Built from:",e.jsx(i.InlineCode,{children:"transition-property"}),",",e.jsx(i.InlineCode,{children:"transition-duration"}),",",e.jsx(i.InlineCode,{children:"transition-timing-function"}),",",e.jsx(i.InlineCode,{children:"transition-delay"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Easing (timing function):"})," the speed curve over time (e.g.,",e.jsx(i.InlineCode,{children:"ease"}),", ",e.jsx(i.InlineCode,{children:"linear"}),",",e.jsx(i.InlineCode,{children:"ease-in"}),", ",e.jsx(i.InlineCode,{children:"ease-out"}),",",e.jsx(i.InlineCode,{children:"cubic-bezier(x1, y1, x2, y2)"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reflow (layout):"})," recalculating element positions/sizes. ",e.jsx("b",{children:"Repaint (paint):"})," drawing pixels.",e.jsx("b",{children:"Composite:"})," GPU combines layers without repainting. For best performance, prefer animating",e.jsx(i.InlineCode,{children:"transform"})," and ",e.jsx(i.InlineCode,{children:"opacity"})," (often only compositing)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transition trigger:"})," a state change that modifies a property—hover/focus, adding/removing a class, toggling data attributes, or updating inline styles in JS/React."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Syntax: Shorthand & Longhand"}),e.jsx(i.Pre,{children:`/* Shorthand: property | duration | timing-function | delay */
.box {
  transition: transform 200ms ease-out, opacity 200ms ease-out;
}

/* Longhand (equivalent) */
.box {
  transition-property: transform, opacity;
  transition-duration: 200ms, 200ms;
  transition-timing-function: ease-out, ease-out;
  transition-delay: 0ms, 0ms;
}`}),e.jsxs(i.Small,{children:["Avoid ",e.jsx(i.InlineCode,{children:"transition: all"})," for performance and predictability. List only the properties you actually change."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example 1: Hover Fade & Move"}),e.jsx(i.Pre,{children:`/* HTML */
<button class="btn">Hover me</button>

/* CSS */
.btn {
  transform: translateY(0);
  opacity: 1;
  transition: transform 180ms ease, opacity 180ms ease;
}
.btn:hover {
  transform: translateY(-2px);
  opacity: 0.9;
}`}),e.jsxs(i.Small,{children:["We set the ",e.jsx("i",{children:"initial"})," state on the base selector, then the :hover state changes properties—transition runs automatically."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example 2: Class Toggle (JS / React)"}),e.jsx(i.Pre,{children:`/* CSS */
.panel {
  max-height: 0; overflow: hidden;
  opacity: 0;
  transition: max-height 300ms ease, opacity 200ms ease;
}
.panel.open {
  max-height: 320px; /* big enough for content */
  opacity: 1;
}

/* React (concept) */
function Panel() {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setOpen(o => !o)}>
        {open ? "Close" : "Open"}
      </button>
      <div className={open ? "panel open" : "panel"}>Content...</div>
    </div>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Note:"})," CSS can't transition ",e.jsx(i.InlineCode,{children:"height: auto"})," directly. Use a fixed ",e.jsx(i.InlineCode,{children:"max-height"})," or measure with JS then set an explicit height."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Easing: Built-ins & Custom Curves"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Built-ins:"})," ",e.jsx(i.InlineCode,{children:"ease"})," (standard),",e.jsx(i.InlineCode,{children:"linear"})," (constant speed),",e.jsx(i.InlineCode,{children:"ease-in"})," (accelerate),",e.jsx(i.InlineCode,{children:"ease-out"})," (decelerate),",e.jsx(i.InlineCode,{children:"ease-in-out"})," (accel then decel)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"cubic-bezier(x1, y1, x2, y2)"})," gives precise control (values 0-1 for x; y can go beyond 0-1 for overshoot)."]})]}),e.jsx(i.Pre,{children:`/* Subtle snap: fast start, gentle end */
.card {
  transition: transform 220ms cubic-bezier(.2, .8, .2, 1);
}
.card:hover {
  transform: translateY(-3px);
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Best Practice: Transform & Opacity"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Prefer ",e.jsx(i.InlineCode,{children:"transform"})," (translate/scale/rotate) and ",e.jsx(i.InlineCode,{children:"opacity"})," for smooth, GPU-composited transitions."]}),e.jsxs("li",{children:["Avoid animating layout/paint-heavy properties like ",e.jsx(i.InlineCode,{children:"top/left"}),", ",e.jsx(i.InlineCode,{children:"width/height"}),", ",e.jsx(i.InlineCode,{children:"box-shadow"})," (can be janky)."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"will-change"})," can hint upcoming animation, but use sparingly to avoid memory cost."]})]}),e.jsx(i.Pre,{children:`/* Good */
.tile { transform: translateZ(0); transition: transform 160ms ease; }
.tile:hover { transform: translateY(-2px) scale(1.01); }

/* Risky (layout every frame) */
.bad { position: relative; transition: top 160ms ease; }
.bad:hover { top: -4px; }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Visibility & Interaction (Click-through)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," transition ",e.jsx(i.InlineCode,{children:"display"})," (it jumps, no interpolation)."]}),e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"opacity"})," + ",e.jsx(i.InlineCode,{children:"visibility"})," and optionally",e.jsx(i.InlineCode,{children:"pointer-events"})," to manage clickability during fades."]})]}),e.jsx(i.Pre,{children:`.fade {
  opacity: 0; visibility: hidden; pointer-events: none;
  transition: opacity 200ms ease, visibility 0s linear 200ms;
}
.fade.show {
  opacity: 1; visibility: visible; pointer-events: auto;
  transition: opacity 200ms ease, visibility 0s;
}`}),e.jsxs(i.Small,{children:["Here, ",e.jsx("i",{children:"visibility"})," is delayed to switch after the fade finishes—so it's hidden when fully transparent."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Transition Events"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"transitionend"})," fires when a property finishes transitioning (per property)."]}),e.jsxs("li",{children:["In React, use ",e.jsx(i.InlineCode,{children:"onTransitionEnd"})," on the element."]})]}),e.jsx(i.Pre,{children:`function Toast({ open, onClose }) {
  return (
    <div
      className={open ? "toast open" : "toast"}
      onTransitionEnd={(e) => {
        if (e.propertyName === "opacity" && !open) onClose?.();
      }}
    >
      Saved!
    </div>
  );
}

/* CSS */
.toast { opacity: 0; transition: opacity 180ms ease; }
.toast.open { opacity: 1; }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility: Motion Sensitivity"}),e.jsx(i.List,{children:e.jsx("li",{children:"Respect users who prefer reduced motion; keep transitions subtle or disable large movements."})}),e.jsx(i.Pre,{children:`@media (prefers-reduced-motion: reduce) {
  * {
    transition-duration: 0.001ms !important;
    transition-delay: 0ms !important;
  }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," define initial styles on the base selector (so the browser knows where to start)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," list explicit properties instead of ",e.jsx(i.InlineCode,{children:"all"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer ",e.jsx(i.InlineCode,{children:"transform"})," & ",e.jsx(i.InlineCode,{children:"opacity"})," for performance."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," transition ",e.jsx(i.InlineCode,{children:"display"})," or rely on ",e.jsx(i.InlineCode,{children:"height: auto"})," without a workaround."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," make transitions slow—UI should feel snappy (150-250ms typical for micro-interactions)."]})]})]}),e.jsx(i.Callout,{children:"Summary: CSS transitions are the simplest way to add polish. Transition specific properties, choose good easing, and prefer transform/opacity for smooth, accessible motion."})]});export{t as default};
