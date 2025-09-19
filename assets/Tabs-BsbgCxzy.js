import{j as e}from"./index-CAccbg1x.js";import{S as n}from"./styled-etCu7VF7.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Tabs (Reusable Component)"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Tabs"})," display multiple ",e.jsx("i",{children:"panels"})," of content in the same space and let the user switch between them without navigating away. They are ideal when the content is related and should be compared or switched quickly."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Key Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Tab"}),": the clickable control (the “button”) that selects a panel. In ARIA terms it uses role ",e.jsx(n.InlineCode,{children:"tab"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tablist"}),": the container that groups the tabs. In ARIA terms"," ",e.jsx(n.InlineCode,{children:'role="tablist"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tab panel"}),": the content region shown for the active tab. In ARIA terms"," ",e.jsx(n.InlineCode,{children:'role="tabpanel"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Activation"}),": how a tab becomes active. ",e.jsx("i",{children:"Manual"})," activation changes focus but not the panel until Enter/Space or click; ",e.jsx("i",{children:"Automatic"})," activation changes panel as focus moves."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roving tabindex"}),": an a11y technique where only the focused tab has"," ",e.jsx(n.InlineCode,{children:"tabIndex=0"})," and other tabs have"," ",e.jsx(n.InlineCode,{children:"-1"}),", so arrow keys move focus within the set."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled vs Uncontrolled"}),": in a ",e.jsx("i",{children:"controlled"})," Tabs, the parent holds the active index/state. In ",e.jsx("i",{children:"uncontrolled"}),", Tabs manages its own internal state."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When to Use / When Not to Use"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use"})," tabs for sibling content at the same hierarchy level (e.g., “Profile / Billing / Security”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use"})," when users need quick switch/compare without page navigation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't use"})," tabs if each section is long or requires separate URLs → prefer routes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't use"})," tabs for nested navigation inside accordions or modals unless necessary (can harm discoverability)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Accessibility Essentials"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:'role="tablist"'})," on the container of the tabs."]}),e.jsxs("li",{children:["Each tab: ",e.jsx(n.InlineCode,{children:'role="tab"'}),","," ",e.jsx(n.InlineCode,{children:"aria-selected"})," (true/false),"," ",e.jsx(n.InlineCode,{children:"aria-controls"})," pointing to its panel id, and roving"," ",e.jsx(n.InlineCode,{children:"tabIndex"})," (0 for focused tab, -1 for others)."]}),e.jsxs("li",{children:["Each panel: ",e.jsx(n.InlineCode,{children:'role="tabpanel"'}),","," ",e.jsx(n.InlineCode,{children:"id"})," referenced by a tab's"," ",e.jsx(n.InlineCode,{children:"aria-controls"}),", and"," ",e.jsx(n.InlineCode,{children:"aria-labelledby"})," referencing the active tab id."]}),e.jsx("li",{children:"Keyboard: Left/Right (or Up/Down for vertical) move focus between tabs; Home/End jump to first/last; Enter/Space activates in manual mode."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Data Model"}),e.jsx(n.Pre,{children:`// Suggested shape for tabs data
const items = [
  { id: "tab-overview",  label: "Overview",  panelId: "panel-overview"  },
  { id: "tab-details",   label: "Details",   panelId: "panel-details"   },
  { id: "tab-settings",  label: "Settings",  panelId: "panel-settings"  },
];`}),e.jsxs(n.Small,{children:["Keep stable ids for ",e.jsx(n.InlineCode,{children:"aria-controls"})," links and easier testing."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Example: Uncontrolled Tabs (automatic activation)"}),e.jsx(n.Pre,{children:`function UncontrolledTabs({ items, defaultIndex = 0 }) {
  const [active, setActive] = React.useState(defaultIndex);
  const tabRefs = React.useRef([]);

  function onKeyDown(e) {
    const count = items.length;
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % count;
    else if (e.key === "ArrowLeft") next = (active - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else return;
    e.preventDefault();
    setActive(next);                    // automatic activation: change panel immediately
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Sample tabs" onKeyDown={onKeyDown}>
        {items.map((it, i) => {
          const selected = i === active;
          return (
            <button
              key={it.id}
              id={it.id}
              role="tab"
              aria-selected={selected}
              aria-controls={it.panelId}
              tabIndex={selected ? 0 : -1}         // roving tabindex
              ref={el => (tabRefs.current[i] = el)}
              onClick={() => setActive(i)}
            >
              {it.label}
            </button>
          );
        })}
      </div>

      {items.map((it, i) => {
        const selected = i === active;
        return (
          <div
            key={it.panelId}
            role="tabpanel"
            id={it.panelId}
            aria-labelledby={it.id}
            hidden={!selected}          // hide inactive panels from layout
          >
            {/* panel content for: it.label */}
          </div>
        );
      })}
    </div>
  );
}`}),e.jsx(n.Small,{children:"“Automatic” here means moving focus with arrows also updates the active panel instantly."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Example: Controlled Tabs (manual activation)"}),e.jsx(n.Pre,{children:`function ControlledTabs({ items, index, onIndexChange }) {
  const [focusIndex, setFocusIndex] = React.useState(index); // focus can move without activation
  const tabRefs = React.useRef([]);

  function onKeyDown(e) {
    const count = items.length;
    let next = focusIndex;
    if (e.key === "ArrowRight") next = (focusIndex + 1) % count;
    else if (e.key === "ArrowLeft") next = (focusIndex - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    else if (e.key === "Enter" || e.key === " ") {
      onIndexChange(focusIndex);       // manual activation on Enter/Space
      return;
    } else return;
    e.preventDefault();
    setFocusIndex(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <div>
      <div role="tablist" aria-label="Manual tabs" onKeyDown={onKeyDown}>
        {items.map((it, i) => {
          const selected = i === index;
          return (
            <button
              key={it.id}
              id={it.id}
              role="tab"
              aria-selected={selected}
              aria-controls={it.panelId}
              tabIndex={i === focusIndex ? 0 : -1}
              ref={el => (tabRefs.current[i] = el)}
              onClick={() => onIndexChange(i)}
            >
              {it.label}
            </button>
          );
        })}
      </div>

      {items.map((it, i) => {
        const selected = i === index;
        return (
          <div
            key={it.panelId}
            role="tabpanel"
            id={it.panelId}
            aria-labelledby={it.id}
            hidden={!selected}
          >
            {/* panel content */}
          </div>
        );
      })}
    </div>
  );
}

// Usage:
// const [idx, setIdx] = React.useState(0);
// <ControlledTabs items={items} index={idx} onIndexChange={setIdx} />`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Sync with URL (hash-based)"}),e.jsx(n.Pre,{children:`function useHashTab(defaultKey) {
  const [key, setKey] = React.useState(() => window.location.hash.slice(1) || defaultKey);

  React.useEffect(() => {
    function onHash() {
      setKey(window.location.hash.slice(1) || defaultKey);
    }
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [defaultKey]);

  const set = React.useCallback((k) => {
    if (!k) return;
    history.replaceState(null, "", "#" + k); // no scroll jump
    setKey(k);
  }, []);

  return [key, set];
}

// Example: map tab.key -> hash value
// const [activeKey, setActiveKey] = useHashTab("overview");`}),e.jsx(n.Small,{children:"Use routing for deep links if tabs represent major app sections; hashes are fine for minor intra-page switches."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Rendering Strategy"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Keep mounted"}),": keep all panels in the DOM (just hide inactive). Pros: preserves internal state (inputs). Cons: larger DOM."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unmount on hide"}),": render only the active panel. Pros: smaller DOM. Cons: panel state resets on switch."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Styling Pointers"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Use a clear selected style (underline/indicator) and focus ring for keyboard users."}),e.jsx("li",{children:"Make the tablist scrollable horizontally for many items; show an overflow hint."}),e.jsx("li",{children:"Consider an animated indicator that moves between tabs for delightful feedback."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," give each tab a short, clear label; avoid wrapping to 2+ lines."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," support arrow keys, Home/End, and Enter/Space."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," preserve panel state when users type into forms (keep mounted when needed)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix tabs with long scroll-heavy content; consider routes/sections instead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," trap keyboard focus; let users tab in/out of the tablist and panel."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ARIA"}),": Accessible Rich Internet Applications—attributes/roles to convey semantics to AT."]}),e.jsxs("li",{children:[e.jsx("b",{children:"AT"}),": Assistive Technologies (screen readers, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Manual vs Automatic activation"}),": whether focusing a tab also switches its panel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Roving tabindex"}),": a technique to keep one focusable item in a set at a time."]})]})]}),e.jsx(n.Callout,{children:"Summary: Tabs are a compact way to switch related content. Build with proper roles, keyboard support, and either automatic or manual activation depending on your UX. Choose rendering and URL strategy based on the complexity and importance of the content."})]});export{s as default};
