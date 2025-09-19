import{j as e}from"./index-CAccbg1x.js";import{S as i}from"./styled-etCu7VF7.js";const s=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"List (Reusable Component)"}),e.jsxs(i.Lead,{children:["A ",e.jsx("b",{children:"List"})," is a reusable UI primitive that displays a collection of items with a consistent layout, states (loading/empty/error), selection behavior, and keyboard navigation. It should be ",e.jsx("i",{children:"data-agnostic"})," (works for any item shape) and ",e.jsx("i",{children:"render-agnostic"}),"(caller decides how an item looks)."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"List"}),": a component that renders a one-dimensional collection (vertical by default)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Item"}),": a single entry in the collection (e.g., a user, a file)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Render prop"}),": a function prop (e.g., ",e.jsx(i.InlineCode,{children:"renderItem"}),") that returns JSX for each item, keeping the List generic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Key extractor"}),": a function that returns a stable unique key per item (e.g., an id). Prevents remounts and preserves focus/state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selection"}),": which item(s) are chosen. Can be ",e.jsx("i",{children:"single"})," (one item), ",e.jsx("i",{children:"multiple"})," (many), or ",e.jsx("i",{children:"none"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs Uncontrolled"}),": in a ",e.jsx("i",{children:"controlled"})," List, the parent owns the selection value; in an ",e.jsx("i",{children:"uncontrolled"})," List, internal state owns it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Virtualization (windowing)"}),": render only visible rows to improve performance for large lists. (Use libraries like ",e.jsx("i",{children:"react-window"})," when needed.)"]}),e.jsxs("li",{children:[e.jsx("b",{children:"ARIA roles"}),": ",e.jsx(i.InlineCode,{children:'role="list"'})," for static lists; ",e.jsx(i.InlineCode,{children:'role="listbox"'})," with ",e.jsx(i.InlineCode,{children:'role="option"'})," for selectable lists."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Minimal Example (static list)"}),e.jsx(i.Pre,{children:`function UsersStatic() {
  const users = [
    { id: "u1", name: "Aarav" },
    { id: "u2", name: "Isha" },
  ];
  return (
    <ul role="list" aria-label="Team members">
      {users.map(u => (
        <li key={u.id}>
          {u.name}
        </li>
      ))}
    </ul>
  );
}`}),e.jsxs(i.Small,{children:["This is not reusable yet, but it highlights the semantics: ",e.jsx(i.InlineCode,{children:'ul[role="list"]'})," with ",e.jsx(i.InlineCode,{children:"li"})," children."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Reusable List Primitive (data- & render-agnostic)"}),e.jsx(i.Pre,{children:`/**
 * Props:
 * - items: any[] — the data
 * - renderItem: (item, state) => JSX — how to render each item
 * - keyExtractor?: (item, index) => string | number — unique key
 * - empty?: JSX — UI when no items
 * - loading?: boolean — show loading state
 */
export function ListPrimitive({
  items,
  renderItem,
  keyExtractor = (it, i) => i,
  empty = <div className="muted">No items</div>,
  loading = false,
}) {
  if (loading) return <div role="status" aria-live="polite">Loading…</div>;
  if (!items || items.length === 0) return empty;

  return (
    <ul role="list" className="list-root">
      {items.map((it, i) => (
        <li key={keyExtractor(it, i)} className="list-row">
          {renderItem(it, { index: i })}
        </li>
      ))}
    </ul>
  );
}`}),e.jsxs(i.Small,{children:["The parent controls ",e.jsx(i.InlineCode,{children:"renderItem"})," and data. The List remains generic and simple to test."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Selectable List (Single-Select, Controlled)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:'role="listbox"'})," and mark rows with ",e.jsx(i.InlineCode,{children:'role="option"'}),"."]}),e.jsx("li",{children:"Track the selected key in parent state and pass a handler to update it."}),e.jsxs("li",{children:["Support keyboard navigation: ",e.jsx(i.InlineCode,{children:"ArrowUp"}),", ",e.jsx(i.InlineCode,{children:"ArrowDown"}),", ",e.jsx(i.InlineCode,{children:"Home"}),", ",e.jsx(i.InlineCode,{children:"End"}),", ",e.jsx(i.InlineCode,{children:"Enter"}),"/",e.jsx(i.InlineCode,{children:"Space"}),"."]})]}),e.jsx(i.Pre,{children:`export function Listbox({
  items,
  keyExtractor = it => it.id,
  selectedKey,
  onSelectedKeyChange,
  renderItem,
  label = "Items",
}) {
  const refs = React.useRef(new Map()); // store row refs for focus

  // Focus management helper
  const focusByIndex = (idx) => {
    const it = items[idx];
    if (!it) return;
    const el = refs.current.get(keyExtractor(it, idx));
    el?.focus();
  };

  const onKeyDown = (e) => {
    const idx = items.findIndex(it => keyExtractor(it) === selectedKey);
    if (e.key === "ArrowDown") {
      const next = Math.min(items.length - 1, (idx < 0 ? 0 : idx + 1));
      onSelectedKeyChange(keyExtractor(items[next]));
      e.preventDefault();
      focusByIndex(next);
    } else if (e.key === "ArrowUp") {
      const prev = Math.max(0, (idx < 0 ? 0 : idx - 1));
      onSelectedKeyChange(keyExtractor(items[prev]));
      e.preventDefault();
      focusByIndex(prev);
    } else if (e.key === "Home") {
      onSelectedKeyChange(keyExtractor(items[0]));
      e.preventDefault();
      focusByIndex(0);
    } else if (e.key === "End") {
      const last = items.length - 1;
      onSelectedKeyChange(keyExtractor(items[last]));
      e.preventDefault();
      focusByIndex(last);
    } else if (e.key === "Enter" || e.key === " ") {
      // "activate" current selection (up to the parent)
      e.preventDefault();
    }
  };

  return (
    <ul
      role="listbox"
      aria-label={label}
      tabIndex={0}
      className="listbox-root"
      onKeyDown={onKeyDown}
    >
      {items.map((it, i) => {
        const key = keyExtractor(it, i);
        const selected = key === selectedKey;
        return (
          <li
            key={key}
            role="option"
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            ref={el => refs.current.set(key, el)}
            className={selected ? "row selected" : "row"}
            onClick={() => onSelectedKeyChange(key)}
          >
            {renderItem(it, { index: i, selected })}
          </li>
        );
      })}
    </ul>
  );
}`}),e.jsxs(i.Small,{children:["This is ",e.jsx("i",{children:"controlled"}),": the parent owns ",e.jsx(i.InlineCode,{children:"selectedKey"}),". Use it for deterministic behavior (e.g., syncing selection with URL or other UI)."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Multiple Select (Checkbox Pattern)"}),e.jsx(i.Pre,{children:`export function ListboxMulti({
  items,
  keyExtractor = it => it.id,
  selectedKeys,
  onSelectedKeysChange,
  renderItem,
  label = "Items",
}) {
  const set = new Set(selectedKeys);

  const toggle = (key) => {
    const next = new Set(set);
    next.has(key) ? next.delete(key) : next.add(key);
    onSelectedKeysChange([...next]);
  };

  return (
    <ul role="listbox" aria-multiselectable aria-label={label} className="listbox-root">
      {items.map((it, i) => {
        const key = keyExtractor(it, i);
        const selected = set.has(key);
        return (
          <li
            key={key}
            role="option"
            aria-selected={selected}
            className={selected ? "row selected" : "row"}
            onClick={() => toggle(key)}
          >
            <input
              type="checkbox"
              tabIndex={-1}
              checked={selected}
              onChange={() => toggle(key)}
              aria-hidden
            />
            {renderItem(it, { index: i, selected })}
          </li>
        );
      })}
    </ul>
  );
}`}),e.jsxs(i.Small,{children:["For very large collections, consider ",e.jsx("i",{children:"virtualization"})," to keep the DOM light and scrolling smooth."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Empty, Loading & Error States"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Loading"}),": Show a polite live region (",e.jsx(i.InlineCode,{children:'role="status"'}),") so screen readers are informed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Empty"}),": Offer a short explanation and a primary action (“Add item”, “Invite someone”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error"}),": Explain the problem and provide a retry action."]})]}),e.jsx(i.Pre,{children:`// Example usage
function ProjectsList({ projects, busy, error }) {
  if (busy) return <div role="status" aria-live="polite">Loading projects…</div>;
  if (error) return <div role="alert">Failed to load. <button onClick={/* retry */}>Retry</button></div>;
  return (
    <ListPrimitive
      items={projects}
      keyExtractor={(p) => p.id}
      empty={<div className="muted">No projects yet. <button>Create project</button></div>}
      renderItem={(p) => <div className="row">{p.name}</div>}
    />
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep the List generic; push visuals and data formatting to ",e.jsx(i.InlineCode,{children:"renderItem"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," provide stable keys; avoid using the array index if items reorder."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," add keyboard support for selectable lists; test with a keyboard only."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix selection and navigation on the same click without clear intent (e.g., use a dedicated “Open” affordance)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," render thousands of rows at once—use virtualization for big data."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility Essentials"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Non-interactive lists: ",e.jsx(i.InlineCode,{children:'role="list"'})," with children as plain ",e.jsx(i.InlineCode,{children:"li"}),"."]}),e.jsxs("li",{children:["Selectable lists: ",e.jsx(i.InlineCode,{children:'role="listbox"'}),", items as ",e.jsx(i.InlineCode,{children:'role="option"'}),", manage ",e.jsx(i.InlineCode,{children:"aria-selected"}),"."]}),e.jsxs("li",{children:["Make the container focusable (",e.jsx(i.InlineCode,{children:"tabIndex=0"}),") to receive keyboard events; manage roving focus to the selected row."]}),e.jsx("li",{children:"Announce counts and selection when helpful (e.g., “5 results”)."})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render prop"}),": function prop that returns UI; enables composition without coupling visuals to the List."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Key extractor"}),": function that returns a stable, unique key for each item (e.g., item.id)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roving focus"}),": keyboard focus “moves” among items, usually aligning to selection."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Virtualization"}),": technique to render only visible rows; boosts performance for large data sets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Listbox"}),": ARIA pattern for keyboard-selectable lists (",e.jsx(i.InlineCode,{children:'role="listbox"'}),")."]})]})]}),e.jsxs(i.Callout,{children:["Summary: Treat ",e.jsx("b",{children:"List"})," as a small, stable primitive. Keep data & visuals separate via a render prop, support keyboard selection when needed, and scale performance with virtualization."]})]});export{s as default};
