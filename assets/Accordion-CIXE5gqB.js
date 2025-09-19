import{j as e}from"./index-DUO2rjrc.js";import{S as n}from"./styled-BVnyC97j.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Accordion"}),e.jsxs(n.Lead,{children:["An ",e.jsx("b",{children:"Accordion"})," is a vertical stack of ",e.jsx("i",{children:"items"}),". Each item has a",e.jsx("b",{children:" header (trigger) "})," you can click or focus + press a key to expand/collapse its ",e.jsx("b",{children:" panel (content)"}),". Accordions help organize dense content into bite-sized sections without navigating away."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definition & Purpose"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Item:"})," a pair of ",e.jsx("i",{children:"header"})," (the clickable/focusable control) and its ",e.jsx("i",{children:"panel"})," (the content region that toggles visibility)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accordion:"})," a list of items where ",e.jsx("i",{children:"only one"})," or ",e.jsx("i",{children:"several"})," items can be open at once."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use it when:"})," you have related sections (FAQ, settings groups, documentation chapters) and want to keep the page compact."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Terms (plain English)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Header / Trigger:"})," the control (usually a button) users interact with to show or hide a panel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Panel:"})," the content container tied to a header; it expands or collapses."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Single-expand:"})," at most one item is open at a time (like radio behavior)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Multi-expand:"})," multiple items can be open (like checkboxes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled:"})," the parent component holds the open state (via props like",e.jsx(n.InlineCode,{children:"openId"})," or",e.jsx(n.InlineCode,{children:"openIds"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled:"})," each item manages its own open/closed state internally."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Disclosure:"}),' a single header+panel pair (a "mini accordion item").']})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Anatomy (What pieces you need)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Container"})," that lists items."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Header (button)"})," for each item with the label/icon."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Panel"})," region that shows content when the item is open."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State"})," that tracks which item(s) are open."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessibility bindings"})," so screen readers and keyboards work naturally."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Example: Minimal Uncontrolled Accordion"}),e.jsx(n.Pre,{children:`function UncontrolledAccordion() {
  const items = [
    { id: "a", title: "What is React?", content: "A library for building UIs." },
    { id: "b", title: "What is an Accordion?", content: "A stacked set of collapsible panels." },
    { id: "c", title: "When to use?", content: "When content can be grouped and revealed on demand." },
  ];

  // Local state per item (uncontrolled-ish per-mount). Each item stores open flag.
  const [openMap, setOpenMap] = React.useState(() => Object.create(null));

  function toggle(id) {
    setOpenMap(prev => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <div>
      {items.map(it => {
        const isOpen = !!openMap[it.id];
        return (
          <div key={it.id}>
            {/* Header: use a <button> for accessibility */}
            <button
              aria-expanded={isOpen}
              aria-controls={\`panel-\${it.id}\`}
              id={\`header-\${it.id}\`}
              onClick={() => toggle(it.id)}
            >
              {it.title}
            </button>

            {/* Panel: reference header with aria-labelledby */}
            <div
              id={\`panel-\${it.id}\`}
              role="region"
              aria-labelledby={\`header-\${it.id}\`}
              hidden={!isOpen}
            >
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}`}),e.jsxs(n.Small,{children:["Uses native ",e.jsx(n.InlineCode,{children:"<button>"}),", wires"," ",e.jsx(n.InlineCode,{children:"aria-expanded"})," and"," ",e.jsx(n.InlineCode,{children:"aria-controls"})," for headers and a"," ",e.jsx(n.InlineCode,{children:'role="region"'})," panel with"," ",e.jsx(n.InlineCode,{children:"aria-labelledby"}),"."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Example: Controlled (Single-Expand)"}),e.jsx(n.Pre,{children:`function SingleExpandAccordion({ items }) {
  const [openId, setOpenId] = React.useState(null);

  function onToggle(id) {
    setOpenId(prev => (prev === id ? null : id)); // radio-like behavior
  }

  return (
    <div>
      {items.map(it => {
        const isOpen = openId === it.id;
        return (
          <div key={it.id}>
            <button
              id={\`hdr-\${it.id}\`}
              aria-expanded={isOpen}
              aria-controls={\`pan-\${it.id}\`}
              onClick={() => onToggle(it.id)}
            >
              {it.title}
            </button>

            <div
              id={\`pan-\${it.id}\`}
              role="region"
              aria-labelledby={\`hdr-\${it.id}\`}
              hidden={!isOpen}
            >
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}`}),e.jsxs(n.Small,{children:["Parent owns state (",e.jsx(n.InlineCode,{children:"openId"}),") and passes behavior to headers. Only one open at a time."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Example: Controlled (Multi-Expand)"}),e.jsx(n.Pre,{children:`function MultiExpandAccordion({ items }) {
  const [openIds, setOpenIds] = React.useState(() => new Set());

  function toggle(id) {
    setOpenIds(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div>
      {items.map(it => {
        const isOpen = openIds.has(it.id);
        return (
          <div key={it.id}>
            <button
              id={\`h-\${it.id}\`}
              aria-expanded={isOpen}
              aria-controls={\`p-\${it.id}\`}
              onClick={() => toggle(it.id)}
            >
              {isOpen ? "▼" : "►"} {it.title}
            </button>
            <div
              id={\`p-\${it.id}\`}
              role="region"
              aria-labelledby={\`h-\${it.id}\`}
              hidden={!isOpen}
            >
              {it.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility (Keyboard & ARIA)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Headers must be focusable:"})," use ",e.jsx(n.InlineCode,{children:"<button>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State announce:"})," toggle ",e.jsx(n.InlineCode,{children:"aria-expanded"})," on the header; connect header ↔ panel with ",e.jsx(n.InlineCode,{children:"aria-controls"})," (header) and"," ",e.jsx(n.InlineCode,{children:"aria-labelledby"})," (panel)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard:"})," ",e.jsx("kbd",{children:"Enter"}),"/",e.jsx("kbd",{children:"Space"})," toggles; optional arrow keys to move focus between headers for long lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Structure:"})," it's fine to use plain divs; the critical part is correct labeling/relationships."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"UX Patterns & Do/Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep headers short and descriptive; reflect the panel's content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"}),' indicate state (chevron rotation, +/-, "Show/Hide").']}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," choose single vs multi-expand based on content relationship."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," put critical content only inside a collapsed panel if users might miss it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," trap focus; allow tabbing from header into panel content and out."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Performance & Edge Cases"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Mount vs unmount:"})," collapsing can be done by hiding via CSS or by unmounting. Unmount to save memory; keep mounted for preserving form state inside panels."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Long lists:"})," consider virtualization if there are dozens of heavy panels."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Deep content:"})," if a panel contains interactive widgets (forms, tables), ensure focus order and keyboard hints are obvious."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"API Design Checklist (for a reusable component)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Value props:"})," ",e.jsx(n.InlineCode,{children:"openId"})," /"," ",e.jsx(n.InlineCode,{children:"openIds"})," for controlled modes;"," ",e.jsx(n.InlineCode,{children:"defaultOpenId(s)"})," for uncontrolled."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Events:"})," ",e.jsx(n.InlineCode,{children:"onChange(id)"})," (single) or"," ",e.jsx(n.InlineCode,{children:"onChange(nextIds)"})," (multi)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composition:"})," slots like ",e.jsx(n.InlineCode,{children:"Accordion.Item"}),","," ",e.jsx(n.InlineCode,{children:"Accordion.Header"}),","," ",e.jsx(n.InlineCode,{children:"Accordion.Panel"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessibility:"})," wire ",e.jsx(n.InlineCode,{children:"aria-*"})," attributes internally so consumers get an accessible experience by default."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Disclosure:"})," a single header+panel toggle (one item of an accordion)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled:"})," parent owns the state and passes props down."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled:"})," component manages its own internal state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Single-expand:"})," one open at a time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Multi-expand:"})," multiple open at once."]})]})]}),e.jsx(n.Callout,{children:"Summary: Build accordions with semantic buttons for headers, clearly labeled panels, and a conscious choice between single vs multi-expand and controlled vs uncontrolled state. Keep keyboard and screen-reader flows first-class."})]});export{t as default};
