import{j as e}from"./index-BrPsnAZM.js";import{S as i}from"./styled-CsMB-n00.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Keys Strategy"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Keys"})," give a stable ",e.jsx("b",{children:"identity"}),' to list items so React can match “old children" to “new children" during ',e.jsx("b",{children:"reconciliation"}),". The right keys preserve component state and avoid unnecessary unmounts/remounts; the wrong keys (like array indexes) can cause visual glitches and state mix-ups when items are inserted, removed, or reordered."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Key:"})," a string/number you attach to each child in a list (",e.jsx(i.InlineCode,{children:"key"})," prop) that uniquely identifies it among its siblings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Identity:"}),' the conceptual “same item across renders." Keys tell React which item is which, even if its index changes.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Reconciliation:"})," React's process of diffing previous children with next children to decide what to update, keep, or remove."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Preserving state:"})," when React recognizes an item as the same (same element type + same key), it keeps the child component's state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Remount:"})," if React can't match a child by key+type, it unmounts the old and mounts a new one, resetting local state and effects."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Why Keys Matter"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Correctness:"})," Prevents state from jumping to the wrong row after insert/remove/reorder."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," Enables minimal DOM changes (only moved/updated nodes change)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Predictability:"})," Stable keys make UI updates easier to reason about and debug."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Good Keys vs. Bad Keys"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Good:"})," stable IDs from your data (e.g., database id, slug, UUID generated at creation time and stored in data)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sometimes OK:"})," a ",e.jsx("em",{children:"composite key"})," like ",e.jsx(i.InlineCode,{children:"`${user.id}:${todo.id}`"})," if a single stable id doesn't exist."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bad:"})," ",e.jsx("b",{children:"array index"})," as key when the list can change order or length; state may stick to the wrong item."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bad:"})," ",e.jsx("b",{children:"random keys on each render"})," (e.g., ",e.jsx(i.InlineCode,{children:"Math.random()"}),")-forces remount every time."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example: Stable Keys from Data"}),e.jsx(i.Pre,{children:`const users = [
  { id: "u1", name: "Aarav" },
  { id: "u2", name: "Diya" },
  { id: "u3", name: "Kabir" },
];

export default function UserList() {
  return (
    <ul>
      {users.map((u) => (
        <li key={u.id}>{u.name}</li> // ✅ stable key
      ))}
    </ul>
  );
}`}),e.jsxs(i.Small,{children:["Keys must be ",e.jsx("i",{children:"unique among siblings"}),", not globally unique. Siblings refer to children of the same parent in that render."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Index Key Pitfall: Inserting in the Middle"}),e.jsx(i.List,{children:e.jsxs("li",{children:["When you use ",e.jsx("b",{children:"index as key"}),', inserting an item shifts indexes and React incorrectly “reuses" DOM/state for the wrong items.']})}),e.jsx(i.Pre,{children:`function TodoList({ todos, onToggle }) {
  // ❌ index as key (fragile if you insert/remove/reorder)
  return todos.map((todo, i) => (
    <label key={i}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
    </label>
  ));
}

/* Insert a todo at position 0 -> all subsequent items get different indexes,
   so their inputs may keep the wrong "checked" state or cursor position. */`}),e.jsx(i.Pre,{children:`function TodoList({ todos, onToggle }) {
  // ✅ stable key from data
  return todos.map((todo) => (
    <label key={todo.id}>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      {todo.text}
    </label>
  ));
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Reordering Example (Drag & Drop)"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Reordering changes positions but not identities. With stable keys, React just moves nodes."}),e.jsx("li",{children:"With index keys, React can mismatch items; local state (like input text) follows the index, not the item."})]}),e.jsx(i.Pre,{children:`// ✅ Stable keys: items carry state correctly when reordered
function DraggableList({ items }) {
  return items.map((item) => (
    <div key={item.id} className="row">
      <input defaultValue={item.label} />
    </div>
  ));
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Controlled Inputs & Preserving State"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Controlled inputs (",e.jsx(i.InlineCode,{children:"value"})," + ",e.jsx(i.InlineCode,{children:"onChange"}),") rely on keys to keep their identity."]}),e.jsxs("li",{children:["If a component should reset on some change, you can intentionally ",e.jsx("b",{children:"change its key"})," to force a remount."]})]}),e.jsx(i.Pre,{children:`// ✅ Force remount (reset) when "mode" changes by changing key
function Editor({ mode }) {
  return <TextArea key={mode} mode={mode} />;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Filtering / Sorting"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Filtering or sorting doesn't change an item's identity-keep the same ",e.jsx("b",{children:"data ID"})," key."]}),e.jsx("li",{children:"Do not derive keys from the current index after sort/filter; use the underlying stable id."})]}),e.jsx(i.Pre,{children:`function Sorted({ items }) {
  const sorted = [...items].sort((a, b) => a.name.localeCompare(b.name));
  return sorted.map((it) => <div key={it.id}>{it.name}</div>); // ✅
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Where Keys Live (and Fragments)"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Keys are read on the ",e.jsx("b",{children:"direct children"})," you return from a map. Put keys on the element you return in the loop."]}),e.jsxs("li",{children:["You can key a ",e.jsx(i.InlineCode,{children:"<React.Fragment>"})," when you don't want extra DOM."]}),e.jsxs("li",{children:["Uniqueness is required ",e.jsx("i",{children:"per list"}),". The same key can appear in a different sibling group."]})]}),e.jsx(i.Pre,{children:`// ✅ Keyed fragment when you don't want an extra wrapper div
items.map((it) => (
  <React.Fragment key={it.id}>
    <dt>{it.term}</dt>
    <dd>{it.desc}</dd>
  </React.Fragment>
));`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"When Can I Use Index as Key?"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["The list is ",e.jsx("b",{children:"truly static"})," (no insert/remove/reorder),"]}),e.jsxs("li",{children:["and items have ",e.jsx("b",{children:"no local state"})," (no inputs, no animations tied to identity),"]}),e.jsxs("li",{children:["and you're rendering a ",e.jsx("b",{children:"one-off"})," list (e.g., mapping an enum to static labels)."]})]}),e.jsx(i.Pre,{children:`// 😌 Okay: static, no state, never reorders
const days = ["Mon","Tue","Wed","Thu","Fri"];
days.map((d, i) => <li key={i}>{d}</li>);`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Debugging Keys"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["React warns: ",e.jsx("i",{children:`“Each child in a list should have a unique 'key' prop."`})]}),e.jsxs("li",{children:["Check for ",e.jsx("b",{children:"duplicates"})," or ",e.jsx("b",{children:"missing"})," keys, and ensure the key comes from stable data."]}),e.jsx("li",{children:"In dev, log keys while mapping to verify stability."})]}),e.jsx(i.Pre,{children:`items.map((it) => {
  console.log("key", it.id);
  return <Row key={it.id} {...it} />;
});`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Stable identifier:"})," a value that uniquely and consistently represents the same data item across renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Remount:"})," unmount old component and mount a new one (state/effects reset)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reorder:"})," change item positions while keeping the same items (identities)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composite key:"})," a key formed by combining stable properties (e.g., ",e.jsx(i.InlineCode,{children:"`${rowId}:${colId}`"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sibling group:"})," the set of children under the same parent in a single render."]})]})]}),e.jsxs(i.Callout,{children:[e.jsx("b",{children:"Rule of thumb:"})," Use a stable ID from your data as the key. Avoid array indexes unless the list is static and stateless. Stable keys preserve state correctly and help React update only what changed."]})]});export{t as default};
