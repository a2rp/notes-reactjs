import{j as e}from"./index-Der9nZEc.js";import{S as r}from"./styled-DlqEt0Mz.js";const i=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Fragments"}),e.jsx(r.Lead,{children:"A fragment lets multiple children be returned without adding an extra DOM element. Use it to satisfy React’s “one parent” rule without introducing wrappers that break layout or semantics."}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definition"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["A ",e.jsx("b",{children:"Fragment"})," is a wrapper that renders ",e.jsx("em",{children:"zero"})," DOM nodes. In JSX it appears as ",e.jsx(r.InlineCode,{children:"<>...</>"})," (shorthand) or ",e.jsx(r.InlineCode,{children:"<React.Fragment>...</React.Fragment>"}),"."]}),e.jsxs("li",{children:["Purpose: group siblings so a component can return a single parent without creating an extra ",e.jsx(r.InlineCode,{children:"<div>"}),"/",e.jsx(r.InlineCode,{children:"<span>"}),"."]})]}),e.jsx(r.Pre,{children:`function Toolbar() {
  return (
    <>
      <button>Back</button>
      <button>Next</button>
    </>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Why not a <div> wrapper?"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Layout:"})," extra wrappers can break CSS grid/flex gaps or inflow."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Semantics:"})," invalid HTML like ",e.jsx(r.InlineCode,{children:"<ul><div>...</div></ul>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"A11y:"})," screen readers may announce extra landmarks/regions unnecessarily."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance:"})," fewer DOM nodes = less work for layout/paint (small but real)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Shorthand vs explicit fragment"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Shorthand:"})," ",e.jsx(r.InlineCode,{children:"<>...</>"})," is concise, no import needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Explicit:"})," ",e.jsx(r.InlineCode,{children:"<React.Fragment>...</React.Fragment>"})," (or ",e.jsx(r.InlineCode,{children:"<Fragment>"})," if imported) is required when a ",e.jsx("b",{children:"key"})," is needed."]})]}),e.jsx(r.Pre,{children:`// Needs a key? Use explicit form:
items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </React.Fragment>
));`}),e.jsxs(r.Small,{children:["Shorthand fragments ",e.jsx("b",{children:"cannot"})," take keys or attributes."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Table pattern (no illegal wrappers)"}),e.jsxs("p",{children:["When rendering rows/cells, a wrapper ",e.jsx("code",{children:"div"})," is invalid inside",e.jsx("code",{children:"table"}),". Fragments solve it cleanly."]}),e.jsx(r.Pre,{children:`function Cells({ product }) {
  return (
    <>
      <td>{product.name}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
    </>
  );
}

function Table({ products }) {
  return (
    <table>
      <tbody>
        {products.map(p => (
          <tr key={p.id}>
            <Cells product={p} />
          </tr>
        ))}
      </tbody>
    </table>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Returning multiple siblings from a component"}),e.jsx("p",{children:"React components must return one parent. Fragments are the lightest way to return siblings."}),e.jsx(r.Pre,{children:`function ProfileHeader({ user }) {
  return (
    <>
      <h2>{user.name}</h2>
      <p>{user.title}</p>
    </>
  );
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Conditional rendering with fragments"}),e.jsx(r.Pre,{children:`// Group multiple elements in a branch without a wrapper node
{isError ? (
  <>
    <h4>Error</h4>
    <p>{error.message}</p>
  </>
) : (
  <>
    <h4>Loaded</h4>
    <List items={data} />
  </>
)}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Fragments vs arrays"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Returning an ",e.jsx("b",{children:"array"})," of elements is valid but requires commas and keys on each element—less readable than fragments for most cases."]}),e.jsxs("li",{children:["Fragments read like normal JSX; use explicit fragments for keyed groups inside a ",e.jsx(r.InlineCode,{children:"map"}),"."]})]}),e.jsx(r.Pre,{children:`// Array form (valid, but noisy)
return [
  <h4 key="t">Title</h4>,
  <p key="p">Content</p>
];`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"What fragments can’t do"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["No ",e.jsx("b",{children:"attributes"})," (except ",e.jsx(r.InlineCode,{children:"key"})," on explicit fragments). You cannot set ",e.jsx(r.InlineCode,{children:"className"}),", ",e.jsx(r.InlineCode,{children:"style"}),", or event handlers on a fragment."]}),e.jsxs("li",{children:["No ",e.jsx("b",{children:"ref"})," target—there’s no DOM node. If a ref or class is needed, use a real element."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do / Don’t"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use fragments to avoid extra DOM wrappers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(r.InlineCode,{children:"<React.Fragment key={...}>"})," for keyed groups in lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use fragments inside tables where ",e.jsx("code",{children:"div"})," would be invalid."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," try to style a fragment; use a semantic wrapper if styles or roles are needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," use shorthand ",e.jsx(r.InlineCode,{children:"<>"})," when a key is required—switch to explicit form."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," wrap list items for ",e.jsx("code",{children:"ul/ol"}),"—children must be ",e.jsx("code",{children:"li"}),"; fragments are for grouping siblings, not replacing required semantics."]})]})]}),e.jsx(r.Callout,{children:"Summary: Fragments group siblings without extra DOM. Use shorthand for simple grouping; switch to explicit fragments when a key is required (maps, definition lists, table cells). Prefer fragments over wrapper divs to preserve layout and semantics."})]});export{i as default};
