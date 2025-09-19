import{j as e}from"./index-BUVRD3Bm.js";import{S as n}from"./styled-DMDKXFr4.js";const o=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Portals"}),e.jsxs(n.Lead,{children:["A ",e.jsx("b",{children:"portal"})," lets you render a React subtree ",e.jsx("i",{children:"somewhere else in the DOM"})," (e.g., under",e.jsx(n.InlineCode,{children:"document.body"}),") while keeping it in the same React tree: context still works, and Synthetic Events still bubble to React ancestors.",e.jsx("br",{}),e.jsx("b",{children:"Your project stance:"})," prefer ",e.jsx("em",{children:"no portals"})," unless layout/stacking issues can’t be solved with regular layering; use fixed/absolute layers inside the app root when possible."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definition & Purpose"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Portal:"})," render children to a different DOM container via"," ",e.jsx(n.InlineCode,{children:"createPortal(child, container)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," escape clipping (",e.jsx(n.InlineCode,{children:"overflow: hidden"})," / transforms), complex stacking contexts, or parent z-index limits—common with modals, popovers, tooltips."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React behavior:"})," events bubble through the ",e.jsx("i",{children:"React"})," tree (not strictly the DOM tree). Context (theme, router, i18n) is preserved across the portal boundary."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Minimal Example (educational)"}),e.jsx(n.Pre,{children:`// PortalModal.jsx
import React from "react";
import { createPortal } from "react-dom";

export function PortalModal({ open, onClose, children }) {
  if (!open) return null;
  // Render into <body>. Create a #portal-root in index.html for stricter control.
  return createPortal(
    <div role="dialog" aria-modal="true" className="overlay" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        {children}
        <button onClick={onClose} autoFocus>Close</button>
      </div>
    </div>,
    document.body
  );
}`}),e.jsxs(n.Small,{children:["Events inside the panel bubble to React parents even though the DOM node is under"," ",e.jsx(n.InlineCode,{children:"document.body"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"No-Portal Alternative (preferred in your projects)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Append an overlay node as the ",e.jsx("i",{children:"last child"})," of your React root and layer it with"," ",e.jsx(n.InlineCode,{children:"position: fixed"})," + high"," ",e.jsx(n.InlineCode,{children:"z-index"}),"."]}),e.jsx("li",{children:"This avoids reparenting in the DOM and keeps styles/variables scoped as usual."})]}),e.jsx(n.Pre,{children:`// App.jsx (outline idea)
// <div id="app-root">...app...</div>
// <div id="overlay-root" />  // sibling inside the same root container

function OverlayRoot({ children }) {
  // toggled via global state/context; still NOT a portal
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000 }}>
      {children}
    </div>
  );
}`}),e.jsxs(n.Small,{children:["Use this when simple layering solves clipping/stacking. Reach for portals only if a parent’s",e.jsx(n.InlineCode,{children:"overflow/transform"})," creates unavoidable clipping."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Event Bubbling Across a Portal"}),e.jsx(n.Pre,{children:`// Click inside the portal still reaches React parent handlers.
function Parent() {
  function onAnyClick() { console.log("Parent saw click"); }
  return (
    <div onClick={onAnyClick}>
      <PortalModal open>
        <button onClick={() => console.log("Button in portal clicked")}>
          Click me
        </button>
      </PortalModal>
    </div>
  );
}`}),e.jsxs(n.Small,{children:["Synthetic Events bubble to React ancestors even if the DOM ancestor is elsewhere. Use ",e.jsx(n.InlineCode,{children:"e.stopPropagation()"})," per normal rules."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility (Modals/Popovers)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Roles:"})," ",e.jsx(n.InlineCode,{children:'role="dialog"'})," or"," ",e.jsx(n.InlineCode,{children:"alertdialog"})," for critical interrupts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Labelling:"})," connect ",e.jsx(n.InlineCode,{children:"aria-labelledby"})," /",e.jsx(n.InlineCode,{children:"aria-describedby"})," to headings/body text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus:"})," move initial focus inside; trap Tab/Shift+Tab; restore focus to the trigger on close."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Background inert:"})," set ",e.jsx(n.InlineCode,{children:"inert"})," on siblings (modern) or"," ",e.jsx(n.InlineCode,{children:'aria-hidden="true"'})," fallback."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Escape to close"})," and click-outside to dismiss (where appropriate)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Scroll Locking (avoid layout jump)"}),e.jsx(n.Pre,{children:`// Basic idea: lock <body> without causing layout shift.
function lockBodyScroll(lock) {
  if (typeof document === "undefined") return;
  const body = document.body;
  if (lock) {
    const barW = window.innerWidth - document.documentElement.clientWidth;
    body.style.overflow = "hidden";
    // compensate for scrollbar width
    body.style.paddingRight = barW ? barW + "px" : "";
  } else {
    body.style.overflow = "";
    body.style.paddingRight = "";
  }
}`}),e.jsx(n.Small,{children:"Guard for SSR. Always unlock on unmount to avoid “stuck” pages."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Styling & Scoping Notes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"CSS variables:"})," if a variable is defined on an ancestor ",e.jsx("i",{children:"not"})," in the portal’s DOM path, it won’t inherit. Prefer variables on ",e.jsx(n.InlineCode,{children:":root"})," or pass values via React context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stacking contexts:"})," transforms, filters, and position/opacity can create new contexts. Portals sidestep parent contexts but you still need a sensible ",e.jsx(n.InlineCode,{children:"z-index"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Theming:"})," React context (e.g., styled-components ThemeProvider) continues to work through portals."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"SSR & Lifecycle Gotchas"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"DOM availability:"})," only create portals after mount (",e.jsx(n.InlineCode,{children:"useEffect"}),") if you need access to"," ",e.jsx(n.InlineCode,{children:"document"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cleanup:"})," if you create a dedicated container node, remove it on unmount."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," try simple fixed/absolute layering first (your default approach)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use portals when clipping/stacking can’t be solved any other way."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," implement a11y: role, labelling, focus trap, inert background, Escape."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on implicit inheritance of CSS vars from non-ancestors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget to unlock body scroll and restore focus."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Portals change ",e.jsx("i",{children:"where"})," elements live in the DOM, not in React. Prefer same-root layering for overlays, and use a portal only when you must escape clipping or stacking traps. Keep accessibility and scroll-locking non-negotiable."]})]});export{o as default};
