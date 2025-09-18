import{j as e}from"./index-UhLb6G-I.js";import{S as n}from"./styled-B1-pArGG.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Focus Management"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Focus management"})," is about making keyboard navigation predictable: where focus starts, where it moves, how it’s announced by screen readers, and how it’s restored. In React, you’ll mostly manage focus with ",e.jsx(n.InlineCode,{children:"ref"}),", effects, and ARIA practices."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Focus:"})," The element that receives keyboard input. The browser exposes it as"," ",e.jsx(n.InlineCode,{children:"document.activeElement"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tab order:"})," The sequence focus follows with ",e.jsx("kbd",{children:"Tab"}),"/",e.jsx("kbd",{children:"Shift+Tab"}),", based on DOM order and"," ",e.jsx(n.InlineCode,{children:"tabIndex"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focusable:"})," Elements that can gain focus (links, buttons, form fields, anything with"," ",e.jsx(n.InlineCode,{children:"tabIndex >= 0"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roving tabIndex:"})," A pattern where only one item in a composite widget has"," ",e.jsx(n.InlineCode,{children:"tabIndex=0"})," and the rest are ",e.jsx(n.InlineCode,{children:"-1"}),", with arrow keys moving focus."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus trap:"})," Modal/dialog behavior that keeps focus inside until the dialog closes."]}),e.jsxs("li",{children:[e.jsx("b",{children:":focus-visible:"})," CSS pseudo-class that shows focus only for keyboard focus (not mouse)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Principles"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Every interactive element must be reachable with the keyboard."}),e.jsxs("li",{children:["Focus must be ",e.jsx("b",{children:"visible"})," (don’t remove outlines; use ",e.jsx(n.InlineCode,{children:":focus-visible"}),")."]}),e.jsx("li",{children:"When UI context changes (route, dialog open), move focus to the most relevant element."}),e.jsxs("li",{children:["When closing transient UI (modal, popover), ",e.jsx("b",{children:"restore"})," focus to the triggering control."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Programmatic Focus (refs & effects)"}),e.jsx(n.Pre,{children:`function NameField() {
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    // Focus on mount without scrolling the page:
    inputRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <label>
      Name
      <input ref={inputRef} type="text" />
    </label>
  );
}`}),e.jsxs(n.Small,{children:["Use ",e.jsxs(n.InlineCode,{children:["focus(","{ preventScroll: true }",")"]})," to avoid layout jumps. Prefer focusing the first error field after validation."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Route/Page Changes: Move Focus to Main"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Place ",e.jsx(n.InlineCode,{children:'tabIndex="-1"'})," on your page heading or main region."]}),e.jsx("li",{children:"On route change, focus it so screen readers announce the new context."})]}),e.jsx(n.Pre,{children:`function PageTitle({ children }) {
  const h1Ref = React.useRef(null);
  React.useEffect(() => { h1Ref.current?.focus(); }, []);
  return (
    <h1 ref={h1Ref} tabIndex={-1}>
      {children}
    </h1>
  );
}`}),e.jsxs(n.Small,{children:["Add a “Skip to content” link that targets ",e.jsx(n.InlineCode,{children:"#main"})," to bypass nav."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Focus Trap (Modal/Dialog)"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"When a modal opens: focus the first meaningful control inside."}),e.jsxs("li",{children:["Trap ",e.jsx("kbd",{children:"Tab"})," within the dialog; restore focus to the trigger on close."]})]}),e.jsx(n.Pre,{children:`function useFocusTrap(containerRef, isOpen) {
  React.useEffect(() => {
    if (!isOpen) return;
    const container = containerRef.current;
    if (!container) return;

    const FOCUSABLE = [
      "a[href]", "button:not([disabled])", "input:not([disabled])",
      "select:not([disabled])", "textarea:not([disabled])",
      "[tabindex]:not([tabindex='-1'])"
    ].join(",");

    const nodes = () => Array.from(container.querySelectorAll(FOCUSABLE));
    const onKeyDown = (e) => {
      if (e.key !== "Tab") return;
      const list = nodes();
      if (!list.length) return;
      const first = list[0];
      const last = list[list.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);
    // Initial focus
    (nodes()[0] || container).focus({ preventScroll: true });

    return () => container.removeEventListener("keydown", onKeyDown);
  }, [containerRef, isOpen]);
}`}),e.jsx(n.Small,{children:"This is a minimal trap. For production, also handle focus return to the opening button."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Roving tabIndex (Menus, Toolbars, Grids)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Only the “active” item has ",e.jsx(n.InlineCode,{children:"tabIndex=0"}),"; the rest are ",e.jsx(n.InlineCode,{children:"-1"}),"."]}),e.jsx("li",{children:"Arrow keys move focus without leaving the widget."})]}),e.jsx(n.Pre,{children:`function RovingList({ items }) {
  const [index, setIndex] = React.useState(0);
  const refs = React.useRef([]);

  React.useEffect(() => {
    refs.current[index]?.focus();
  }, [index]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setIndex(i => (i + 1) % items.length); }
    if (e.key === "ArrowUp")   { e.preventDefault(); setIndex(i => (i - 1 + items.length) % items.length); }
  };

  return (
    <ul role="listbox" aria-activedescendant={\`item-\${index}\`} onKeyDown={onKeyDown}>
      {items.map((it, i) => (
        <li key={it.id}>
          <button
            id={\`item-\${i}\`}
            ref={el => (refs.current[i] = el)}
            tabIndex={i === index ? 0 : -1}
            aria-selected={i === index}
            onClick={() => setIndex(i)}
          >
            {it.label}
          </button>
        </li>
      ))}
    </ul>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Focus Styles & :focus-visible"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Don’t remove outlines globally. If you restyle, do it with ",e.jsx(n.InlineCode,{children:":focus-visible"}),"."]}),e.jsx("li",{children:"Use clear, high-contrast rings; avoid relying on color alone."})]}),e.jsx(n.Pre,{children:`/* Example (in your global CSS) */
:focus {
  outline: none; /* avoid removing unless you replace with :focus-visible */
}
:focus-visible {
  outline: 3px solid currentColor;
  outline-offset: 3px;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"React Focus Events"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"onFocus / onBlur bubble in React"})," (unlike native). Use"," ",e.jsx(n.InlineCode,{children:"onFocusCapture"}),"/",e.jsx(n.InlineCode,{children:"onBlurCapture"})," to intercept early."]}),e.jsxs("li",{children:["Read ",e.jsx(n.InlineCode,{children:"e.relatedTarget"})," on blur/focus to know where focus is going/coming from."]})]}),e.jsx(n.Pre,{children:`function FieldGroup() {
  function onBlur(e) {
    // When leaving the group entirely:
    if (!e.currentTarget.contains(e.relatedTarget)) {
      // commit validation, etc.
    }
  }
  return (
    <div onBlur={onBlur}>
      <input placeholder="First" />
      <input placeholder="Last" />
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," move focus intentionally after route/dialog changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," restore focus to the trigger when closing modals/popovers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use semantic elements (",e.jsx(n.InlineCode,{children:"<button>"}),", ",e.jsx(n.InlineCode,{children:"<a>"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," remove focus outlines without an accessible replacement."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," trap focus accidentally (hidden off-screen elements with ",e.jsx(n.InlineCode,{children:"tabIndex=0"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on mouse-only interactions; ensure full keyboard flow."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Active element:"})," the focused element in the document."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus ring:"})," the visual outline indicating focus."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Skip link:"})," a link at the top of the page that jumps to main content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composite widget:"})," a grouped control (menu, listbox, toolbar) managed with roving tabIndex."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Ensure logical tab order, visible focus, and programmatic focus moves only when context changes. Use roving tabIndex inside composite widgets, trap & restore focus in modals, and rely on ",e.jsx("i",{children:":focus-visible"})," for friendly, accessible styling."]})]});export{t as default};
