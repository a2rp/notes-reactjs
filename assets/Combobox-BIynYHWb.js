import{j as e}from"./index-t22nWg0v.js";import{S as i}from"./styled-B6nJrukD.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Combobox"}),e.jsxs(i.Lead,{children:["A ",e.jsx("b",{children:"combobox"})," lets users pick from a list of options ",e.jsx("i",{children:"and/or"})," type to filter or enter a custom value. Think of it as a blend of an ",e.jsx("b",{children:"input"})," (typing) and a ",e.jsx("b",{children:"dropdown"})," (choices) with rich keyboard support and accessibility semantics."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Definitions (plain & precise)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Combobox:"})," A single-line ",e.jsx("i",{children:"text input"})," with a ",e.jsx("i",{children:"popup"})," list of suggestions the user can navigate and choose from. It may allow freeform values (not in the list), or restrict to the list only."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Listbox:"})," The popup container that holds options. In ARIA, it uses ",e.jsx(i.InlineCode,{children:'role="listbox"'})," and contains options with ",e.jsx(i.InlineCode,{children:'role="option"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Option:"})," A single selectable item inside the listbox. ARIA: ",e.jsx(i.InlineCode,{children:'role="option"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Autocomplete:"})," Typing filters the list or suggests completions. ARIA uses ",e.jsx(i.InlineCode,{children:"aria-autocomplete"})," to describe behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Active descendant:"})," The “visually highlighted” option while navigating with keys. Conveyed via ",e.jsx(i.InlineCode,{children:"aria-activedescendant"})," on the input."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs Uncontrolled:"})," Controlled means React owns the value in state (",e.jsx(i.InlineCode,{children:"value"})," + ",e.jsx(i.InlineCode,{children:"onChange"}),"). Uncontrolled means the DOM holds it (",e.jsx(i.InlineCode,{children:"defaultValue"})," + refs)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"UX Goals"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Fast: type a few letters and hit ",e.jsx("b",{children:"Enter"}),"."]}),e.jsxs("li",{children:["Flexible: arrow keys to navigate options, ",e.jsx("b",{children:"Escape"})," to close, ",e.jsx("b",{children:"Tab"})," to move on."]}),e.jsx("li",{children:"Clear: the current value is obvious; highlighted option is obvious."}),e.jsx("li",{children:"Accessible: works with screen readers and keyboards; uses proper roles/attributes."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Basic Shape (Controlled)"}),e.jsx(i.Pre,{children:`function useCombobox(items = []) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const filtered = React.useMemo(() => {
    const q = inputValue.trim().toLowerCase();
    return q ? items.filter(it => it.toLowerCase().includes(q)) : items;
  }, [items, inputValue]);

  const show = () => setOpen(true);
  const hide = () => { setOpen(false); setHighlightedIndex(-1); };
  const selectIndex = (i) => {
    const val = filtered[i];
    if (val != null) setInputValue(val);
    hide();
  };

  return {
    open, inputValue, setInputValue, highlightedIndex, setHighlightedIndex,
    filtered, show, hide, selectIndex
  };
}`}),e.jsxs(i.Small,{children:["This hook captures the core state: ",e.jsx("i",{children:"open/close"}),", ",e.jsx("i",{children:"input value"}),", ",e.jsx("i",{children:"highlighted index"}),", and ",e.jsx("i",{children:"filtered options"}),"."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Keyboard Interactions (must-have)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ArrowDown / ArrowUp:"})," move the highlight through the list; open if closed and there are options."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Enter:"})," select the highlighted option (if any) or accept typed text (if freeform allowed)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Escape:"})," close the list (and optionally clear highlight or text)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tab:"})," commit the current text and move focus away (normal form flow)."]})]}),e.jsx(i.Pre,{children:`function onKeyDown(e, api) {
  const { open, filtered, highlightedIndex, setHighlightedIndex, show, selectIndex } = api;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    if (!open) return filtered.length && show();
    setHighlightedIndex(i => (i + 1) % filtered.length);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (!open) return filtered.length && show();
    setHighlightedIndex(i => (i - 1 + filtered.length) % filtered.length);
  } else if (e.key === "Enter") {
    if (open && highlightedIndex >= 0) {
      e.preventDefault();
      selectIndex(highlightedIndex);
    }
  } else if (e.key === "Escape") {
    api.hide();
  }
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility (ARIA 1.2 pattern)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["The input can have ",e.jsx(i.InlineCode,{children:'role="combobox"'})," with these attributes:",e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"aria-expanded"}),": whether the popup is open."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"aria-controls"}),": the ",e.jsx("i",{children:"id"})," of the listbox popup."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:'aria-haspopup="listbox"'}),": announces a listbox popup."]}),e.jsxs("li",{children:[e.jsx(i.InlineCode,{children:"aria-activedescendant"}),": id of the highlighted option (for screen readers)."]})]})]}),e.jsxs("li",{children:["The popup list uses ",e.jsx(i.InlineCode,{children:'role="listbox"'}),"; each item uses ",e.jsx(i.InlineCode,{children:'role="option"'})," and sets ",e.jsx(i.InlineCode,{children:"aria-selected"})," when highlighted/selected."]}),e.jsxs("li",{children:["The input should have an accessible ",e.jsx("b",{children:"label"})," (via ",e.jsx(i.InlineCode,{children:"<label htmlFor>"}),", ",e.jsx(i.InlineCode,{children:"aria-label"}),", or ",e.jsx(i.InlineCode,{children:"aria-labelledby"}),")."]}),e.jsxs("li",{children:["Keep focus on the input; use ",e.jsx(i.InlineCode,{children:"aria-activedescendant"})," instead of moving focus to list items."]})]}),e.jsx(i.Pre,{children:`// Minimal wiring (IDs simplified):
<input
  id="city"
  role="combobox"
  aria-expanded={open}
  aria-controls="city-listbox"
  aria-haspopup="listbox"
  aria-activedescendant={highlightedIndex >= 0 ? \`city-opt-\${highlightedIndex}\` : undefined}
/>

<ul id="city-listbox" role="listbox">
  {filtered.map((it, i) => (
    <li
      key={it}
      id={\`city-opt-\${i}\`}
      role="option"
      aria-selected={i === highlightedIndex}
    >
      {it}
    </li>
  ))}
</ul>`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Variants & Behavior Choices"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Freeform vs Restricted:"})," allow values outside the list (freeform) or only from options (restricted)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Autocomplete mode:"})," filter as you type, or show the full list until user navigates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Debounced filtering:"})," for large lists, debounce inputs (150–300ms) before filtering or fetching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Async suggestions:"})," fetch options as the user types; show loading state and empty results clearly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Virtualized list:"})," for thousands of items, use windowing (e.g., react-window) inside the listbox."]})]}),e.jsx(i.Pre,{children:`// Debounced input value (for async fetch or heavy filtering)
function useDebounced(value, delay = 200) {
  const [v, setV] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setV(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return v;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Selection Model"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Single select:"})," pick one; commit to input value on select."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Multi-select:"})," show chips/tokens; ",e.jsx(i.InlineCode,{children:"Backspace"})," removes the last token when input is empty."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Clear action:"})," a small “×” button to reset the value; always have an accessible label (e.g., ",e.jsx("i",{children:"“Clear selection”"}),")."]})]}),e.jsx(i.Pre,{children:`// Single-select commit
function onOptionClick(i, api) {
  api.selectIndex(i); // sets input to option and closes
}

// Multi-select pattern: keep an array of selected items and render as chips.
// Input stays editable to add more items.`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the input focused; manage highlight via ",e.jsx(i.InlineCode,{children:"aria-activedescendant"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," support keyboard from the start (Arrow keys, Enter, Escape, Tab)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," announce loading/empty states (visually and via accessible text)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," trap focus inside the popup; users should be able to Tab away."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely on mouse-only interactions; keyboard and screen reader users matter."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Common Pitfalls"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Moving focus into list items (breaks typing flow and SR expectations)."}),e.jsxs("li",{children:["Forgetting unique ids for options (then ",e.jsx(i.InlineCode,{children:"aria-activedescendant"})," can't point correctly)."]}),e.jsx("li",{children:"Inconsistent controlled state (value vs filtered list vs highlight get out of sync)."}),e.jsx("li",{children:"Closing the popup too aggressively (e.g., on every blur—even when clicking an option)."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Testing (what to verify)"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Typing updates value and filters options."}),e.jsx("li",{children:"Arrow keys change the highlighted option; Enter selects it."}),e.jsx("li",{children:"Escape closes the popup; Tab moves focus away without surprises."}),e.jsxs("li",{children:["ARIA attributes update correctly (",e.jsx(i.InlineCode,{children:"aria-expanded"}),", ",e.jsx(i.InlineCode,{children:"aria-activedescendant"}),", ",e.jsx(i.InlineCode,{children:"aria-selected"}),")."]}),e.jsx("li",{children:"Clicking an option commits its value and closes the popup."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Mini Wiring Example (bringing it together)"}),e.jsx(i.Pre,{children:`function ComboboxExample({ items }) {
  const api = useCombobox(items);
  const { open, inputValue, setInputValue, filtered, highlightedIndex } = api;

  return (
    <div className="cb">
      <label htmlFor="cb-input">City</label>
      <input
        id="cb-input"
        role="combobox"
        aria-expanded={open}
        aria-controls="cb-listbox"
        aria-haspopup="listbox"
        aria-activedescendant={highlightedIndex >= 0 ? \`cb-opt-\${highlightedIndex}\` : undefined}
        value={inputValue}
        onChange={e => { setInputValue(e.target.value); api.show(); }}
        onKeyDown={e => onKeyDown(e, api)}
        onFocus={() => api.show()}
      />

      {open && filtered.length > 0 && (
        <ul id="cb-listbox" role="listbox">
          {filtered.map((it, i) => (
            <li
              key={it}
              id={\`cb-opt-\${i}\`}
              role="option"
              aria-selected={i === highlightedIndex}
              onMouseEnter={() => api.setHighlightedIndex(i)}
              onMouseDown={e => e.preventDefault()} // keep focus on input
              onClick={() => api.selectIndex(i)}
            >
              {it}
            </li>
          ))}
        </ul>
      )}

      {open && filtered.length === 0 && (
        <div role="status" aria-live="polite">No results</div>
      )}
    </div>
  );
}`}),e.jsx(i.Small,{children:"This is intentionally minimal. In a real component, add styling, positioning, virtualization for large lists, and robust outside-click + scroll handling."})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Popup:"})," The overlay that appears under the input (the listbox)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Highlight:"})," The visually focused option in the list; announced via ",e.jsx(i.InlineCode,{children:"aria-activedescendant"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Commit:"})," Confirming the current selection (Enter/click), syncing it into the input value."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Freeform:"})," User can type values not present in the options."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Restricted:"})," Only options can be chosen; arbitrary text is not allowed."]})]})]}),e.jsx(i.Callout,{children:"Summary: A good combobox prioritizes typing flow, keyboard navigation, and clear ARIA semantics. Keep focus on the input, highlight with aria-activedescendant, and treat the popup as a proper listbox."})]});export{t as default};
