import{j as e}from"./index-DqLKwkYK.js";import{S as n}from"./styled-DEJJGB6I.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Menu (Components Library)"}),e.jsxs(n.Lead,{children:["A ",e.jsx("b",{children:"Menu"})," is a temporary list of actions or navigation choices that opens on demand, usually from a ",e.jsx("b",{children:"Menu Button"})," (the trigger). It should be keyboard-friendly, screen-reader friendly, and keep focus behavior predictable."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Menu:"})," A popover list of selectable ",e.jsx("em",{children:"items"})," (actions/links). In ARIA terms, the container typically has ",e.jsx(n.InlineCode,{children:'role="menu"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Menu Button / Trigger:"})," The control that toggles the menu. It references the menu by ID and reflects open state via"," ",e.jsx(n.InlineCode,{children:'aria-haspopup="menu"'})," and"," ",e.jsx(n.InlineCode,{children:"aria-expanded"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Menu Item:"})," An actionable option inside the menu. Usually"," ",e.jsx(n.InlineCode,{children:'role="menuitem"'})," (or"," ",e.jsx(n.InlineCode,{children:"menuitemcheckbox"})," /"," ",e.jsx(n.InlineCode,{children:"menuitemradio"})," for toggles)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Separator:"})," A visual divider between related groups of items."," ",e.jsx(n.InlineCode,{children:'role="separator"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Submenu:"})," A nested menu that opens from a parent item. Parent gets"," ",e.jsx(n.InlineCode,{children:'aria-haspopup="menu"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roving Tabindex:"})," A keyboard pattern where only one item is"," ",e.jsx(n.InlineCode,{children:"tabIndex=0"})," (focusable) at a time and others are"," ",e.jsx(n.InlineCode,{children:"-1"}),". Arrow keys move the focus."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Typeahead:"})," Typing letters quickly focuses the next matching item label."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dismissal:"})," The rules that close the menu: selecting an item, pressing"," ",e.jsx(n.InlineCode,{children:"Escape"}),", clicking outside, or blurring the trigger (depending on UX)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Essential UX Rules"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["The menu should ",e.jsx("b",{children:"anchor"})," to the trigger (below/near it) and not jump on scroll."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Open on click"})," (or Enter/Space on the trigger), not on hover alone. Hover may preview, but click confirms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"One tab stop:"})," Tab moves into the first item (or stays on trigger); arrow keys handle intra-menu navigation."]}),e.jsx("li",{children:"Close on selection (unless it's a checkbox/radio group that supports multi-actions)."}),e.jsxs("li",{children:["Always keep a ",e.jsx("b",{children:"visible focus ring"})," on the current item."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Keyboard Map (WAI-ARIA Pattern)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Trigger:"})," ",e.jsx(n.InlineCode,{children:"Enter"})," /"," ",e.jsx(n.InlineCode,{children:"Space"})," /"," ",e.jsx(n.InlineCode,{children:"ArrowDown"})," opens the menu."," ",e.jsx(n.InlineCode,{children:"ArrowUp"})," may open to last item."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inside menu:"})," ",e.jsx(n.InlineCode,{children:"ArrowDown"})," /"," ",e.jsx(n.InlineCode,{children:"ArrowUp"})," moves focus;"," ",e.jsx(n.InlineCode,{children:"Home"})," /"," ",e.jsx(n.InlineCode,{children:"End"})," jumps to first/last; typing letters triggers"," ",e.jsx("b",{children:"typeahead"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Select:"})," ",e.jsx(n.InlineCode,{children:"Enter"})," /"," ",e.jsx(n.InlineCode,{children:"Space"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dismiss:"})," ",e.jsx(n.InlineCode,{children:"Escape"})," or click outside returns focus to the trigger."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Minimal Example (Concept)"}),e.jsx(n.Pre,{children:`function MenuExample() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const listRef = React.useRef(null);
  const [active, setActive] = React.useState(0);
  const items = ["New File", "Open...", "Save As...", "Export"];

  function openMenu() {
    setOpen(true);
    // Defer focus into the list
    requestAnimationFrame(() => {
      const el = listRef.current?.querySelector('[role="menuitem"][tabindex="0"]');
      el?.focus();
    });
  }

  function closeMenu() {
    setOpen(false);
    buttonRef.current?.focus();
  }

  function onTriggerKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu();
    }
  }

  function onListKeyDown(e) {
    if (e.key === "Escape") return closeMenu();
    if (e.key === "ArrowDown") setActive(i => (i + 1) % items.length);
    if (e.key === "ArrowUp") setActive(i => (i - 1 + items.length) % items.length);
    if (e.key === "Home") setActive(0);
    if (e.key === "End") setActive(items.length - 1);
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      // perform action for items[active]
      closeMenu();
    }
  }

  React.useEffect(() => {
    if (!open) return;
    const onClickOutside = (e) => {
      if (!listRef.current?.contains(e.target) && !buttonRef.current?.contains(e.target)) {
        closeMenu();
      }
    };
    window.addEventListener("mousedown", onClickOutside);
    return () => window.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  return (
    <div>
      <button
        ref={buttonRef}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls="file-menu"
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={onTriggerKeyDown}
      >
        File ▾
      </button>

      {open && (
        <ul
          id="file-menu"
          ref={listRef}
          role="menu"
          aria-label="File"
          onKeyDown={onListKeyDown}
          style={{ marginTop: 8, position: "absolute", minWidth: 160, padding: 6, border: "1px solid #ccc" }}
        >
          {items.map((label, i) => (
            <li key={label} role="presentation">
              <button
                role="menuitem"
                tabIndex={i === active ? 0 : -1}           // roving tabindex
                data-index={i}
                onMouseEnter={() => setActive(i)}         // hover sync
                onClick={() => { /* do action */ closeMenu(); }}
                style={{ display: "block", width: "100%", textAlign: "left", padding: "6px 8px" }}
              >
                {label}
              </button>
            </li>
          ))}
          <li role="separator" style={{ margin: "6px 0", borderTop: "1px solid #e5e5e5" }} />
          <li role="presentation">
            <button role="menuitem" tabIndex={-1} onClick={() => { /* settings */ closeMenu(); }}>
              Settings…
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}`}),e.jsxs(n.Small,{children:["This illustrates ",e.jsx("b",{children:"trigger"}),", ",e.jsx("b",{children:"menu"}),", ",e.jsx("b",{children:"menu items"}),", ",e.jsx("b",{children:"roving tabindex"}),","," ",e.jsx("b",{children:"dismissal"}),", and ",e.jsx("b",{children:"keyboard controls"}),". In your real component lib, wrap these behaviors into reusable primitives."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Typical API Shape (Consumer-Facing)"}),e.jsx(n.Pre,{children:`// Pseudocode API you might expose:
<Menu>
  <Menu.Trigger>File</Menu.Trigger>
  <Menu.Content align="start" side="bottom">
    <Menu.Item onSelect={...}>New File</Menu.Item>
    <Menu.Item onSelect={...}>Open…</Menu.Item>
    <Menu.Item disabled>Save As…</Menu.Item>
    <Menu.Separator />
    <Menu.Sub>
      <Menu.SubTrigger>Share</Menu.SubTrigger>
      <Menu.SubContent>
        <Menu.Item onSelect={...}>Email</Menu.Item>
        <Menu.Item onSelect={...}>Copy Link</Menu.Item>
      </Menu.SubContent>
    </Menu.Sub>
  </Menu.Content>
</Menu>`}),e.jsx(n.Small,{children:"This composition keeps the consumer API declarative while the library handles focus, keyboard, and positioning under the hood."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility Checklist"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Trigger has ",e.jsx(n.InlineCode,{children:'aria-haspopup="menu"'})," and toggles"," ",e.jsx(n.InlineCode,{children:"aria-expanded"}),"."]}),e.jsxs("li",{children:["Menu container uses ",e.jsx(n.InlineCode,{children:'role="menu"'})," with an"," ",e.jsx(n.InlineCode,{children:"aria-label"})," or is referenced by the trigger's"," ",e.jsx(n.InlineCode,{children:"aria-controls"}),"."]}),e.jsxs("li",{children:["Items use ",e.jsx(n.InlineCode,{children:'role="menuitem"'})," and follow"," ",e.jsx("b",{children:"roving tabindex"})," with arrow-key navigation."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"Escape"})," and outside click close and restore focus to the trigger."]}),e.jsx("li",{children:"Ensure visible focus indicators on trigger and items; preserve high contrast."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Positioning Notes"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Position relative to the trigger (compute bounding box + offsets). For simplicity, anchor below/left and flip when near viewport edges."}),e.jsx("li",{children:"If the menu risks being clipped by parent overflow, consider rendering at the document root. (In your projects you prefer avoiding portals; you can still compute positions within the same stacking context and manage overflow on parents.)"}),e.jsx("li",{children:"Keep width auto; prefer min-width matching the trigger for balanced layouts."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep one tab stop; use arrows for internal navigation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," close on selection and ",e.jsx(n.InlineCode,{children:"Escape"}),"; return focus to trigger."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use separators to group related actions; keep labels short and verbs first."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," open menus on hover alone; users may pass through unintentionally."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," trap focus permanently; menus are transient."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," disable typeahead; it's a big usability win for long lists."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Anchor"}),": The element (trigger) the menu is positioned relative to."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roving Tabindex"}),": Only the focused item is tabbable; arrows move focus."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Typeahead"}),": Pressing characters jumps focus to the next matching item."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dismissal"}),": Rules that close the menu (select, Escape, outside click)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Submenu"}),": A nested menu that opens from a parent item."]})]})]}),e.jsx(n.Callout,{children:"Summary: A great Menu respects platform conventions—one tab stop, arrow navigation, typeahead, clear focus, and predictable dismissal—while staying flexible enough to host actions, separators, and submenus without surprises."})]});export{t as default};
