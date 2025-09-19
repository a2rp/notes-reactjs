import{j as e}from"./index-CDxhzYTb.js";import{S as i}from"./styled-CvugdggF.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Lists & Keys"}),e.jsxs(i.Lead,{children:["Rendering arrays is straightforward with ",e.jsx(i.InlineCode,{children:"Array.map"}),". The important part is choosing the right ",e.jsx("b",{children:"key"})," so React can keep item identity stable across renders."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Definition"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["A ",e.jsx("b",{children:"key"})," is a stable identifier for a list item among its siblings. React uses keys to match previous items to next items during updates."]}),e.jsxs("li",{children:["Keys are not visible to children as props; they are only used by React’s reconciliation. If the child needs an ID, pass one explicitly (e.g., ",e.jsx(i.InlineCode,{children:"itemId"}),")."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Mapping arrays (basic)"}),e.jsx(i.Pre,{children:`const users = [
  { id: "u1", name: "Ada" },
  { id: "u2", name: "Linus" },
];

<ul>
  {users.map(u => (
    <li key={u.id}>{u.name}</li>  // use a stable, unique key per sibling
  ))}
</ul>`}),e.jsxs(i.Small,{children:["Keys must be ",e.jsx("b",{children:"unique among siblings"}),", not globally unique in the entire app."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Why keys matter (identity, not order)"}),e.jsxs("p",{children:["With correct keys, React updates only what changed. With bad keys (or index keys), React may ",e.jsx("em",{children:"remount"})," items unnecessarily—losing focus, resetting local state, or mixing user input across rows."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Should array index be a key?"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Avoid"})," index as key when the list can reorder, filter, insert in the middle, or delete—index changes will rename identities."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Acceptable"})," when the list is truly static (never reorders, never filters), or when items are append-only and purely presentational."]})]}),e.jsx(i.Pre,{children:`// ❌ Using index: edits can jump rows after sorting/removal
items.map((item, i) => <Row key={i} item={item} />);

// ✅ Use a domain ID (DB id, slug, stable hash)
items.map((item) => <Row key={item.id} item={item} />);`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Reordering pitfall (why index breaks state)"}),e.jsx(i.Pre,{children:`// Each Row has local input state
function Row({ item }) {
  const [text, setText] = React.useState(item.name);
  return <input value={text} onChange={e => setText(e.target.value)} />;
}

// If keys are indexes, and you sort the list,
// React reuses DOM nodes for new positions → text moves to wrong rows.
// Use a stable key like item.id to keep each Row instance paired to the right item.`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Where to place the key"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Put the key on the ",e.jsx("b",{children:"immediate child"})," of the array you’re returning."]}),e.jsx("li",{children:"For nested maps, each level needs its own keys for its siblings."}),e.jsxs("li",{children:["Fragments can carry keys when returning multiple siblings from ",e.jsx(i.InlineCode,{children:"map"}),"."]})]}),e.jsx(i.Pre,{children:`// Correct: key at the element returned by 'map'
rows.map(row => (
  <tr key={row.id}>
    {row.cells.map(cell => (
      <td key={cell.id}>{cell.value}</td>
    ))}
  </tr>
));

// Grouped siblings with a keyed Fragment
list.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.desc}</dd>
  </React.Fragment>
));`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Choosing a good key"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Best:"})," a stable domain identifier (DB id, slug, UUID from server)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Generated once and stored with data"})," is OK (e.g., assign an ",e.jsx("em",{children:"id"})," when creating items client-side)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid:"})," transient values like ",e.jsx(i.InlineCode,{children:"Math.random()"})," on every render—this forces remounts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," use ",e.jsx(i.InlineCode,{children:"useId"})," as a list key—",e.jsx("em",{children:"useId"})," is for stable accessibility IDs per component, not for identifying external list items."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Updating list state (immutable)"}),e.jsx("p",{children:"Keep arrays immutable so React sees a new reference and can reconcile efficiently."}),e.jsx(i.Pre,{children:`// Add
setItems(prev => [...prev, newItem]);

// Remove
setItems(prev => prev.filter(x => x.id !== removeId));

// Update
setItems(prev => prev.map(x => x.id === edit.id ? { ...x, ...edit } : x));

// Reorder (drag & drop)
setItems(prev => reorder(prev, startIndex, endIndex));`}),e.jsxs(i.Small,{children:["Mutating in place (e.g., ",e.jsx("code",{children:"splice"})," on the existing array) can cause subtle bugs; create a new array instead."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Performance notes"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["For very long lists, consider virtualization (",e.jsx("em",{children:"react-window"}),", ",e.jsx("em",{children:"react-virtual"}),"). Keys still matter—use stable IDs for rows."]}),e.jsxs("li",{children:["Avoid heavy computations inside ",e.jsx(i.InlineCode,{children:"map"}),"; compute derived data once above."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do / Don’t"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use stable domain IDs as keys."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," put keys on the element returned by the ",e.jsx(i.InlineCode,{children:"map"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use keyed fragments for multi-sibling groups in a loop."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," use array index if the list can reorder, filter, insert, or delete."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," generate random keys per render—this defeats reconciliation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," expect ",e.jsx(i.InlineCode,{children:"props.key"})," in children—pass a real prop if the child needs an ID."]})]})]}),e.jsx(i.Callout,{children:"Summary: mapping is easy; choosing keys is the real work. Prefer stable IDs, avoid index keys for dynamic lists, place keys at the correct level, and keep updates immutable so React can preserve each item’s identity."})]});export{t as default};
