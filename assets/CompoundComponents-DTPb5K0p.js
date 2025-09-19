import{j as e}from"./index-CAccbg1x.js";import{S as n}from"./styled-3nKDg9i1.js";const i=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Compound Components"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Compound Components"})," are multiple components that collaborate as one unit (e.g., Tabs). Instead of a single “god” component with tons of props, users compose parts like"," ",e.jsx(n.InlineCode,{children:"<Tabs>"}),","," ",e.jsx(n.InlineCode,{children:"<Tabs.List>"}),","," ",e.jsx(n.InlineCode,{children:"<Tabs.Tab>"}),", and"," ",e.jsx(n.InlineCode,{children:"<Tabs.Panel>"}),". Shared state/behavior flows from a parent or React Context."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Terms & Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Compound Component:"})," A set of components designed to be used together under a parent that coordinates their state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parent Coordinator:"})," The top-level component that owns state (e.g., active tab) and exposes child parts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," React’s mechanism to share data (state/actions) to nested children without prop drilling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled vs Controlled:"})," Uncontrolled = parent manages its own state; Controlled = parent accepts state via props and notifies via callbacks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Slots:"})," Named places where consumers insert content (e.g., ",e.jsx(n.InlineCode,{children:"<Tabs.List>"})," acts like a “slot” for tab triggers)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Accessibility (A11y):"})," Using roles, states, and keyboard support so assistive technologies can operate the widget."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Example: Tabs (Uncontrolled, Context)"}),e.jsxs(n.Small,{children:["The parent ",e.jsx(n.InlineCode,{children:"Tabs"})," holds active index. Subcomponents read/write via context. Consumers compose parts declaratively."]}),e.jsx(n.Pre,{children:`// tabs.js (example for learning)
// NOTE: This is an educational sketch for the pattern, not a final prod component.
const TabsContext = React.createContext(null);

export function Tabs({ defaultIndex = 0, children }) {
  const [index, setIndex] = React.useState(defaultIndex);
  const value = React.useMemo(() => ({ index, setIndex }), [index]);
  return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

function useTabsCtx() {
  const ctx = React.useContext(TabsContext);
  if (!ctx) throw new Error("Tabs.* must be used within <Tabs>");
  return ctx;
}

export function List({ children, ...rest }) {
  return (
    <div role="tablist" {...rest}>
      {children}
    </div>
  );
}

export function Tab({ tabIndex, children, ...rest }) {
  const { index, setIndex } = useTabsCtx();
  const selected = index === tabIndex;
  return (
    <button
      role="tab"
      aria-selected={selected}
      aria-controls={\`panel-\${tabIndex}\`}
      id={\`tab-\${tabIndex}\`}
      onClick={() => setIndex(tabIndex)}
      {...rest}
    >
      {children}
    </button>
  );
}

export function Panels({ children, ...rest }) {
  return <div {...rest}>{children}</div>;
}

export function Panel({ tabIndex, children, ...rest }) {
  const { index } = useTabsCtx();
  const hidden = index !== tabIndex;
  return (
    <div
      role="tabpanel"
      id={\`panel-\${tabIndex}\`}
      aria-labelledby={\`tab-\${tabIndex}\`}
      hidden={hidden}
      {...rest}
    >
      {children}
    </div>
  );
}

// Usage
// <Tabs defaultIndex={0}>
//   <Tabs.List>
//     <Tabs.Tab tabIndex={0}>General</Tabs.Tab>
//     <Tabs.Tab tabIndex={1}>Billing</Tabs.Tab>
//   </Tabs.List>
//   <Tabs.Panels>
//     <Tabs.Panel tabIndex={0}>General content</Tabs.Panel>
//     <Tabs.Panel tabIndex={1}>Billing content</Tabs.Panel>
//   </Tabs.Panels>
// </Tabs>

// Attach as statics for ergonomic API:
Tabs.List = List;
Tabs.Tab = Tab;
Tabs.Panels = Panels;
Tabs.Panel = Panel;`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Controlled Variant"}),e.jsxs(n.Small,{children:["In a controlled compound component, the ",e.jsx(n.InlineCode,{children:"value"})," (active tab) comes from props; the parent notifies changes via ",e.jsx(n.InlineCode,{children:"onChange"}),"."]}),e.jsx(n.Pre,{children:`export function TabsControlled({ value, onChange, children }) {
  const ctx = React.useMemo(() => ({ index: value, setIndex: onChange }), [value, onChange]);
  return <TabsContext.Provider value={ctx}>{children}</TabsContext.Provider>;
}

// Usage
// const [tab, setTab] = React.useState(0);
// <TabsControlled value={tab} onChange={setTab}> ... </TabsControlled>
`})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Alternatives: ",e.jsx("code",{children:"React.Children"})," & ",e.jsx("code",{children:"cloneElement"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"React.Children.map"}),": Iterate children to inject props (e.g., assign ",e.jsx(n.InlineCode,{children:"tabIndex"})," automatically)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"React.cloneElement"}),": Clone a child and add props. Useful but can become brittle if you overuse it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Recommendation:"})," Prefer context for state sharing; use cloning sparingly for minor prop injection."]})]}),e.jsx(n.Pre,{children:`function TabsLegacy({ children }) {
  const [index, setIndex] = React.useState(0);
  return React.Children.map(children, (child) => {
    if (child.type.displayName === "Tab") {
      const tabIndex = child.props.tabIndex;
      return React.cloneElement(child, {
        selected: index === tabIndex,
        onClick: () => setIndex(tabIndex),
      });
    }
    return child;
  });
}
`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility (A11y) Essentials"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Roles:"})," ",e.jsx(n.InlineCode,{children:'role="tablist"'}),","," ",e.jsx(n.InlineCode,{children:'role="tab"'}),","," ",e.jsx(n.InlineCode,{children:'role="tabpanel"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Relationships:"})," Tabs have ",e.jsx(n.InlineCode,{children:"aria-controls"})," pointing to panel IDs; panels have ",e.jsx(n.InlineCode,{children:"aria-labelledby"})," back to tabs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard:"})," Left/Right to switch tabs, Home/End to jump, Space/Enter to activate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Focus management:"})," keep focus on the active tab; don’t trap it in panels."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," expose a small, composable API (List, Tab, Panels, Panel)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer context to avoid prop drilling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," support both uncontrolled and controlled usage when feasible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," bury rendering logic inside “logic” components—keep subcomponents UI-focused, state in the coordinator."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse ",e.jsx(n.InlineCode,{children:"cloneElement"}),"; it couples implementation to element types."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Related Patterns & When to Use"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Render Props:"})," Great when you need to pass functions to render UI, but composition with compounds is often cleaner for widgets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Provider Pattern:"})," Compound components typically rely on a Context Provider internally."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Headless Components:"})," Logic-only components that expose state via render props or context—pair well with compounds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State Reducer:"})," For advanced control, let consumers intercept state changes (see Downshift pattern)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Coordinator:"})," The parent that owns/coordinates shared state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Slot:"})," A named place where consumers insert content (a subcomponent acts as a slot)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled:"})," State comes from props; parent notifies via callbacks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled:"})," Component manages its own internal state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," React API for passing data deeply without prop drilling."]})]})]}),e.jsx(n.Callout,{children:"Summary: Compound Components let users compose a widget from parts while the parent (or context) coordinates state. Start with an uncontrolled version, add a controlled variant when needed, keep APIs small, and ship solid accessibility."})]});export{i as default};
