import{j as e}from"./index-DVAje__H.js";import{S as n}from"./styled-DhMisaJL.js";const l=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Event Bubbling & Capturing"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Event propagation"})," is how an event travels through the tree: first the"," ",e.jsx("b",{children:"capturing phase"})," (ancestors → target), then at the ",e.jsx("b",{children:"target"}),", then the"," ",e.jsx("b",{children:"bubbling phase"})," (target → ancestors). React exposes both via"," ",e.jsx(n.InlineCode,{children:"onXxxCapture"})," (capture) and"," ",e.jsx(n.InlineCode,{children:"onXxx"})," (bubble)."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Capturing phase:"})," the event descends from the document/root down to the target. In React, use handlers like ",e.jsx(n.InlineCode,{children:"onClickCapture"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Target phase:"})," the event is dispatched on the actual element where it originated."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bubbling phase:"})," the event ascends from the target up through ancestors. In React, use handlers like ",e.jsx(n.InlineCode,{children:"onClick"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Propagation:"})," the overall traversal of the event through capture → target → bubble."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Default action:"})," the browser’s built-in behavior (e.g., link navigation, form submit)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Order of handlers (capture vs bubble)"}),e.jsx(n.Pre,{children:`function Demo() {
  function log(label) {
    return () => console.log(label);
  }

  return (
    <div
      onClickCapture={log("capture: OUTER")}
      onClick={log("bubble: OUTER")}
      style={{ padding: 16, border: "1px solid" }}
    >
      <div
        onClickCapture={log("capture: INNER")}
        onClick={log("bubble: INNER")}
        style={{ padding: 16, border: "1px dashed" }}
      >
        <button
          onClickCapture={log("capture: BUTTON")}
          onClick={log("bubble: BUTTON")}
        >
          Click me
        </button>
      </div>
    </div>
  );
}
/*
Clicking the button logs:
capture: OUTER
capture: INNER
capture: BUTTON
bubble: BUTTON
bubble: INNER
bubble: OUTER
*/`}),e.jsx(n.Small,{children:"Capture handlers fire top→down before bubble handlers fire bottom→up."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Stopping propagation vs preventing default"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"e.stopPropagation()"})," stops the event from continuing to the next listeners in the propagation path."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"e.preventDefault()"})," cancels the default browser action but ",e.jsx("em",{children:"does not"})," stop propagation."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"e.isPropagationStopped()"})," tells you if propagation has been stopped (SyntheticEvent helper)."]})]}),e.jsx(n.Pre,{children:`function LinkInsideCard() {
  function onCardClick() {
    console.log("card clicked");
  }
  function onLinkClick(e) {
    e.preventDefault();       // don't navigate
    e.stopPropagation();      // don't trigger card click
    console.log("link clicked only");
  }
  return (
    <div onClick={onCardClick} role="button">
      <a href="/somewhere" onClick={onLinkClick}>Open</a>
    </div>
  );
}`}),e.jsx(n.Small,{children:"Preventing default doesn’t imply stopping propagation; call both if you need both."})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:[e.jsx("code",{children:"event.target"})," vs ",e.jsx("code",{children:"event.currentTarget"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"target:"})," the actual element that originated the event (deepest node)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"currentTarget:"})," the element whose handler is currently running (where you attached the listener). Prefer this when reading dataset/props associated with that handler."]})]}),e.jsx(n.Pre,{children:`function Toolbar() {
  function onClick(e) {
    const btn = e.currentTarget;           // the <button> we bound to
    console.log("action:", btn.dataset.action);
  }
  return (
    <>
      <button data-action="save" onClick={onClick}>
        <span className="icon">💾</span> Save
      </button>
      <button data-action="delete" onClick={onClick}>
        <span className="icon">🗑️</span> Delete
      </button>
    </>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Delegation (one parent handles many children)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Attach a single handler high in the tree, use"," ",e.jsx(n.InlineCode,{children:"e.target.closest(selector)"})," to discover which child was activated. Useful for dynamic lists."]}),e.jsx("li",{children:"Keeps memory footprint low and avoids re-binding handlers during list updates."})]}),e.jsx(n.Pre,{children:`function Menu({ items }) {
  function onClick(e) {
    const el = e.target.closest("[data-key]");
    if (!el) return;
    const key = el.dataset.key;
    console.log("clicked:", key);
  }
  return (
    <div onClick={onClick}>
      {items.map(it => (
        <button key={it.key} data-key={it.key}>{it.label}</button>
      ))}
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Modals & overlays: outside vs inside clicks"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Close on overlay click by listening on the overlay; stop propagation inside the dialog content to avoid accidental close."}),e.jsxs("li",{children:["Alternatively, inspect ",e.jsx(n.InlineCode,{children:"e.target"})," and only close if it equals the overlay element."]})]}),e.jsx(n.Pre,{children:`function Modal({ onClose }) {
  function onOverlayClick(e) {
    if (e.target === e.currentTarget) onClose(); // clicked on overlay itself
  }
  function onDialogClick(e) {
    e.stopPropagation(); // prevent bubbling to overlay
  }
  return (
    <div className="overlay" onClick={onOverlayClick}>
      <div className="dialog" onClick={onDialogClick}>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"React-specific behavior"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Focus/blur:"})," in native DOM these don’t bubble; in React ",e.jsx("em",{children:"they do"})," as"," ",e.jsx(n.InlineCode,{children:"onFocus"}),"/",e.jsx(n.InlineCode,{children:"onBlur"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll:"})," React’s ",e.jsx(n.InlineCode,{children:"onScroll"})," bubbles up the React tree."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Portals:"})," events from portal children bubble through the ",e.jsx("em",{children:"React"})," parent tree, even if the DOM ancestor is elsewhere."]}),e.jsxs("li",{children:[e.jsx("b",{children:"stopImmediatePropagation:"})," SyntheticEvent has"," ",e.jsx(n.InlineCode,{children:"stopPropagation()"})," but not"," ",e.jsx(n.InlineCode,{children:"stopImmediatePropagation()"}),". Avoid reaching for"," ",e.jsx(n.InlineCode,{children:"e.nativeEvent.stopImmediatePropagation()"})," unless you truly need native cancellation semantics."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t (A11y + Pitfalls)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer semantic controls (",e.jsx(n.InlineCode,{children:"<button>"}),", ",e.jsx(n.InlineCode,{children:"<label>"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep handlers stable when passing deep to avoid needless re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," scope ",e.jsx(n.InlineCode,{children:"stopPropagation()"})," to real conflicts—overuse can hide bugs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," nest interactive elements (e.g., button inside link). It confuses focus/AT and complicates propagation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," assume ",e.jsx(n.InlineCode,{children:"preventDefault()"})," stops bubbling—it doesn’t."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Quick Reference"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"onXxxCapture"}),": capture phase listener"]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"onXxx"}),": bubble phase listener"]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"e.stopPropagation()"}),": stop further propagation"]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"e.preventDefault()"}),": cancel default action"]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"e.target"})," vs ",e.jsx(n.InlineCode,{children:"e.currentTarget"}),": origin vs bound element"]})]})]}),e.jsxs(n.Callout,{children:["Summary: Understand the three phases, use capture for early interception, bubble for normal UI flows, and apply ",e.jsx("i",{children:"stopPropagation"})," only when necessary. Favor semantic elements and delegation for scalable, accessible interactions."]})]});export{l as default};
