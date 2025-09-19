import{j as e}from"./index-CDxhzYTb.js";import{S as n}from"./styled-D8binL51.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Dropdown"}),e.jsxs(n.Lead,{children:["A ",e.jsx("b",{children:"Dropdown"})," is a floating panel that opens from a trigger (usually a"," ",e.jsx(n.InlineCode,{children:"<button>"}),") to reveal actions or choices. It's not a native element; you design its structure, behavior, and accessibility."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Dropdown:"})," A generic popover opened by a trigger to show a small list of actions or options. It can be a ",e.jsx("em",{children:"menu"})," (actions) or a ",e.jsx("em",{children:"listbox"})," (choose one)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Select (native):"})," The HTML"," ",e.jsx(n.InlineCode,{children:"<select>"})," element. Good defaults, built-in keyboard & mobile UI, but limited styling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Menu:"})," A list of ",e.jsx("em",{children:"actions"})," (not selected state). Use"," ",e.jsx(n.InlineCode,{children:'role="menu"'})," and"," ",e.jsx(n.InlineCode,{children:'role="menuitem"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Listbox:"})," A list of ",e.jsx("em",{children:"options"})," where one (or more) is selected. Use"," ",e.jsx(n.InlineCode,{children:'role="listbox"'})," with"," ",e.jsx(n.InlineCode,{children:'role="option"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Combobox:"})," An input + popup options you can type to filter. It's ",e.jsx("em",{children:"not"})," a menu; it's an interactive form control with"," ",e.jsx(n.InlineCode,{children:'role="combobox"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trigger:"})," The element (usually a button) that opens/closes the dropdown. It should have ",e.jsx(n.InlineCode,{children:"aria-expanded"})," and"," ",e.jsx(n.InlineCode,{children:"aria-controls"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus management:"})," Ensuring focus moves predictably (to the panel on open; back to the trigger on close), enabling full keyboard usage."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When to use what?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx("b",{children:"native select"})," for simple form selection—best mobile support, minimal code."]}),e.jsxs("li",{children:["Use a ",e.jsx("b",{children:"menu dropdown"})," for performing actions (Edit, Duplicate, Delete)."]}),e.jsxs("li",{children:["Use a ",e.jsx("b",{children:"listbox dropdown"})," for stylable, keyboardable option selection."]}),e.jsxs("li",{children:["Use a ",e.jsx("b",{children:"combobox"})," when typing to filter choices is important."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 1 — Native Select (fastest path)"}),e.jsx(n.Pre,{children:`function NativeSelect() {
  const [value, setValue] = React.useState("apple");
  return (
    <label>
      Fruit:
      <select value={value} onChange={(e) => setValue(e.target.value)}>
        <option value="apple">Apple</option>
        <option value="mango">Mango</option>
        <option value="banana">Banana</option>
      </select>
    </label>
  );
}`}),e.jsx(n.Small,{children:"Pros: accessibility & mobile UI handled by the browser. Cons: limited styling."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 2 — Menu Dropdown (actions)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Structure: ",e.jsx(n.InlineCode,{children:"<button>"})," (trigger) +"," ",e.jsx(n.InlineCode,{children:'<div role="menu">'})," (popup)."]}),e.jsxs("li",{children:["Keyboard: ",e.jsx(n.InlineCode,{children:"Enter"}),"/",e.jsx(n.InlineCode,{children:"Space"})," opens; ",e.jsx(n.InlineCode,{children:"Esc"})," closes;"," ","arrow keys move between items; ",e.jsx(n.InlineCode,{children:"Tab"})," usually closes."]}),e.jsx("li",{children:"Close rules: click outside, focus loss to outside, Escape, selecting a menu item."})]}),e.jsx(n.Pre,{children:`function MenuDropdown() {
  const [open, setOpen] = React.useState(false);
  const btnRef = React.useRef(null);
  const menuRef = React.useRef(null);
  const menuId = "user-menu";

  React.useEffect(() => {
    function onDocClick(e) {
      if (!open) return;
      const m = menuRef.current, b = btnRef.current;
      if (m && !m.contains(e.target) && b && !b.contains(e.target)) setOpen(false);
    }
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  React.useEffect(() => {
    if (open && menuRef.current) {
      // Move focus into the menu on open
      const first = menuRef.current.querySelector('[role="menuitem"]');
      first?.focus();
    } else if (!open) {
      // Return focus to trigger on close
      btnRef.current?.focus();
    }
  }, [open]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={btnRef}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        Open menu
      </button>

      {open && (
        <div
          ref={menuRef}
          id={menuId}
          role="menu"
          aria-label="User actions"
          style={{
            position: "absolute", insetInlineStart: 0, marginTop: 8,
            minWidth: 180, padding: 8, border: "1px solid #333", borderRadius: 8, background: "#111",
          }}
        >
          <button role="menuitem" onClick={() => { /* edit */ setOpen(false); }}>Edit</button>
          <button role="menuitem" onClick={() => { /* duplicate */ setOpen(false); }}>Duplicate</button>
          <button role="menuitem" onClick={() => { /* delete */ setOpen(false); }}>Delete</button>
        </div>
      )}
    </div>
  );
}`}),e.jsxs(n.Small,{children:["Semantics: ",e.jsx(n.InlineCode,{children:'role="menu"'})," with"," ",e.jsx(n.InlineCode,{children:'role="menuitem"'}),". Manage focus and close behavior."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pattern 3 — Listbox Dropdown (choose one)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Structure: trigger button shows current value; popup is"," ",e.jsx(n.InlineCode,{children:'role="listbox"'})," with"," ",e.jsx(n.InlineCode,{children:'role="option"'}),"."]}),e.jsx("li",{children:"Keyboard: Up/Down navigate options; Enter/Space selects; Esc closes; type-to-select is a nice bonus."}),e.jsxs("li",{children:["Reflect selection with ",e.jsx(n.InlineCode,{children:"aria-activedescendant"})," or"," ",e.jsx(n.InlineCode,{children:"aria-selected"}),"."]})]}),e.jsx(n.Pre,{children:`function ListboxDropdown({ options = ["Apple", "Mango", "Banana"] }) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(options[0]);
  const [activeIndex, setActiveIndex] = React.useState(0);
  const listRef = React.useRef(null);
  const btnRef = React.useRef(null);
  const listId = "fruit-listbox";

  function selectAt(i) {
    setValue(options[i]);
    setOpen(false);
  }

  function onListKeyDown(e) {
    if (e.key === "Escape") setOpen(false);
    if (e.key === "ArrowDown") setActiveIndex(i => Math.min(i + 1, options.length - 1));
    if (e.key === "ArrowUp") setActiveIndex(i => Math.max(i - 1, 0));
    if (e.key === "Enter" || e.key === " ") selectAt(activeIndex);
  }

  React.useEffect(() => {
    if (open) {
      const el = listRef.current?.querySelector('[role="option"][data-index="' + activeIndex + '"]');
      el?.focus();
    } else {
      btnRef.current?.focus();
    }
  }, [open, activeIndex]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <button
        ref={btnRef}
        aria-haspopup="listbox"
        aria-controls={listId}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        {value}
      </button>

      {open && (
        <div
          ref={listRef}
          id={listId}
          role="listbox"
          tabIndex={-1}
          onKeyDown={onListKeyDown}
          style={{
            position: "absolute", insetInlineStart: 0, marginTop: 8,
            minWidth: 180, padding: 4, border: "1px solid #333", borderRadius: 8, background: "#111",
          }}
        >
          {options.map((opt, i) => {
            const selected = opt === value;
            const active = i === activeIndex;
            return (
              <div
                key={opt}
                role="option"
                data-index={i}
                tabIndex={active ? 0 : -1}
                aria-selected={selected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => selectAt(i)}
                style={{
                  padding: "6px 10px",
                  outline: "none",
                  borderRadius: 6,
                  background: active ? "#1b1b1b" : "transparent",
                  fontWeight: selected ? 600 : 400,
                }}
              >
                {opt}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}`}),e.jsx(n.Small,{children:"For complex behaviors (search, virtualization, multi-select), prefer a mature library or your own well-tested component."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Positioning, Layering, & Portals"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Positioning:"})," Place the panel relative to the trigger (below/above/start/end) and flip when there's no space. A positioning lib (e.g., “floating UI”) simplifies edge cases."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layering:"})," Dropdowns should appear above content (z-index). In complex layouts, rendering inside a ",e.jsx("em",{children:"portal"})," can avoid clipping by overflow/transform parents."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll containers:"})," Ensure the panel repositions on scroll/resize; throttle if needed."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility Essentials"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Trigger:"})," a real ",e.jsx(n.InlineCode,{children:"<button>"})," with"," ",e.jsx(n.InlineCode,{children:"aria-expanded"})," +"," ",e.jsx(n.InlineCode,{children:"aria-controls"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roles:"})," Use ",e.jsx(n.InlineCode,{children:'role="menu"'})," for actions,"," ",e.jsx(n.InlineCode,{children:'role="listbox"'})," for selection."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus:"})," Move focus into the popup on open; restore to the trigger on close."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard:"})," Handle Esc to close; Arrow keys to navigate items/options."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Announcements:"})," Give the popup a label (aria-label or aria-labelledby)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer native ",e.jsx(n.InlineCode,{children:"<select>"})," for simple forms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a real button for the trigger; not a div."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," close on outside click, Escape, and selection (unless multi-select)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," trap focus inside a ",e.jsx("em",{children:"menu"}),"; it should close when tabbing away."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely only on hover—support click and keyboard."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget touch targets (at least ~40px) on mobile."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Using ",e.jsx("em",{children:'role="menu"'})," for selection UIs (should be listbox)."]}),e.jsx("li",{children:"Not restoring focus to the trigger after close."}),e.jsx("li",{children:"Forgetting Escape/Outside click handling."}),e.jsx("li",{children:"Anchoring inside an overflow-hidden parent without a portal (panel gets clipped)."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Portal:"})," Rendering a subtree elsewhere in the DOM to control layering/clipping."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Disclosure:"})," A button that shows/hides related content region."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Activedescendant:"})," ARIA pattern where focus stays on container while indicating the active child via ID."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Typeahead:"})," Typing letters moves focus to matching options."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus ring:"})," The visible outline indicating the focused element."]})]})]}),e.jsx(n.Callout,{children:"Summary: Pick the right primitive (menu vs listbox vs native select), wire up focus + keyboard + closing rules, and position the panel robustly. Start simple; add features only when the UX truly needs them."})]});export{t as default};
