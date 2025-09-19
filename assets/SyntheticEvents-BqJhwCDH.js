import{j as e}from"./index-Der9nZEc.js";import{S as n}from"./styled-btIFeUQ4.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Synthetic Events"}),e.jsxs(n.Lead,{children:["React wraps native browser events in a cross-browser ",e.jsx("b",{children:"SyntheticEvent"})," object so your handlers behave consistently. You write ",e.jsx(n.InlineCode,{children:"onClick"}),",",e.jsx(n.InlineCode,{children:"onChange"}),", etc., and React delivers a normalized event with the same API across browsers."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definition & Purpose"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SyntheticEvent:"})," a lightweight wrapper around the browser’s native event (",e.jsx(n.InlineCode,{children:"event.nativeEvent"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Goal:"})," consistent event properties, names, and propagation behavior across browsers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Removed pooling:"})," Since React 17+, events are ",e.jsx("em",{children:"not pooled"}),"; you can access them asynchronously without calling ",e.jsx(n.InlineCode,{children:"event.persist()"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Attaching Handlers"}),e.jsx(n.Pre,{children:`function Button() {
  function handleClick(e) {
    // e is a SyntheticEvent
    e.preventDefault();           // stop default action (e.g., <a> navigation)
    e.stopPropagation();          // stop bubbling to ancestors
    console.log(e.type, e.target, e.currentTarget);
  }

  return (
    <a href="https://example.com" onClick={handleClick}>
      Click me
    </a>
  );
}`}),e.jsxs(n.Small,{children:["Handlers receive ",e.jsx(n.InlineCode,{children:"e"})," (SyntheticEvent). Use"," ",e.jsx(n.InlineCode,{children:"e.nativeEvent"})," only when you specifically need the underlying browser event."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:[e.jsx("code",{children:"event.target"})," vs ",e.jsx("code",{children:"event.currentTarget"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"target:"})," the deepest element that actually triggered the event (where it originated)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"currentTarget:"})," the element on which the handler is currently running (the one you attached the handler to)."]})]}),e.jsx(n.Pre,{children:`function List({ items }) {
  function onItemClick(e) {
    // data-id is on the button (currentTarget), not necessarily the inner icon (target)
    const id = e.currentTarget.dataset.id;
    console.log("Clicked item id:", id);
  }

  return items.map((it) => (
    <button key={it.id} data-id={it.id} onClick={onItemClick}>
      <span className="icon">★</span> {it.label}
    </button>
  ));
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Propagation: Bubbling & Capturing"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["React supports both phases via ",e.jsx(n.InlineCode,{children:"onClick"})," (bubble) and ",e.jsx(n.InlineCode,{children:"onClickCapture"})," (capture)."]}),e.jsxs("li",{children:[e.jsx(n.InlineCode,{children:"e.stopPropagation()"})," stops the event from continuing to bubble/capture."]}),e.jsx("li",{children:"Use capture to intercept early (e.g., global shortcuts, dismiss overlays)."})]}),e.jsx(n.Pre,{children:`function Cards() {
  function onContainerClick() { console.log("bubble: container"); }
  function onContainerClickCapture() { console.log("capture: container"); }
  function onCardClick(e) {
    console.log("bubble: card");
    // e.stopPropagation(); // uncomment to keep container from seeing it
  }

  return (
    <div onClick={onContainerClick} onClickCapture={onContainerClickCapture}>
      <div className="card" onClick={onCardClick}>Card A</div>
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Preventing Default"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Call ",e.jsx(n.InlineCode,{children:"e.preventDefault()"})," to cancel default behavior (navigation, text selection, form submit, etc.)."]}),e.jsxs("li",{children:["Prefer semantic elements (",e.jsx(n.InlineCode,{children:"<button>"}),") over overriding defaults on non-semantic tags."]})]}),e.jsx(n.Pre,{children:`function Form() {
  function onSubmit(e) {
    e.preventDefault();
    // do async submit...
  }
  return <form onSubmit={onSubmit}>/* fields */</form>;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Events & React Differences"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"onChange (inputs):"})," fires on every keystroke in React (similar to native ",e.jsx("code",{children:"input"}),"), not just on blur."]}),e.jsxs("li",{children:[e.jsx("b",{children:"onFocus / onBlur:"})," in React, these ",e.jsx("em",{children:"bubble"}),". Natively, focus/blur don’t bubble."]}),e.jsxs("li",{children:[e.jsx("b",{children:"onScroll:"})," in React, scroll events bubble up the React tree; natively they do not."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pointer events:"})," prefer ",e.jsx(n.InlineCode,{children:"onPointerDown/Move/Up"})," for unified mouse/touch/pen handling."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard events:"})," use ",e.jsx(n.InlineCode,{children:"onKeyDown"})," for accessibility and shortcuts."]})]}),e.jsx(n.Pre,{children:`function SearchBox() {
  const [q, setQ] = React.useState("");
  function onChange(e) { setQ(e.target.value); }
  function onKeyDown(e) {
    if (e.key === "Enter") { /* submit */ }
  }
  return <input value={q} onChange={onChange} onKeyDown={onKeyDown} />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Patterns & Performance"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Delegate high-level handlers:"})," attach one handler on a parent and read ",e.jsx(n.InlineCode,{children:"e.target"}),"/",e.jsx(n.InlineCode,{children:"closest()"})," when many children are dynamic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable handlers:"})," prefer memoized callbacks when passing to deep children to avoid unnecessary re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Passive listeners:"})," if you truly need ",e.jsx("em",{children:"passive"})," listeners (e.g., wheel/scroll perf), use native ",e.jsx(n.InlineCode,{children:"addEventListener"})," on ",e.jsx(n.InlineCode,{children:"window"})," with ",e.jsx(n.InlineCode,{children:"{ passive: true }"}),"."]})]}),e.jsx(n.Pre,{children:`// Example: single delegated handler on a parent
function Menu({ items }) {
  function onClick(e) {
    const button = e.target.closest("[data-action]");
    if (!button) return;
    const action = button.dataset.action;
    // handle action...
  }
  return (
    <div onClick={onClick}>
      {items.map(it => (
        <button key={it.id} data-action={it.action}>{it.label}</button>
      ))}
    </div>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use semantic elements and the closest appropriate event (click, change, submit)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer pointer/keyboard events for inclusive interactions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," stop propagation sparingly; prefer structural fixes if parents shouldn’t react."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," rely on ",e.jsx(n.InlineCode,{children:"event.persist()"})," (no longer needed)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mutate the DOM in handlers; update state instead and let React re-render."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Default action:"})," the browser’s built-in behavior for an event (e.g., link navigation)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Bubbling:"})," event travels from the target up to ancestors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Capturing:"})," event travels from ancestors down to the target (use ",e.jsx("code",{children:"onXxxCapture"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Delegation:"})," one high-level handler manages many child interactions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pointer events:"})," unified input model for mouse, touch, pen."]})]})]}),e.jsxs(n.Callout,{children:["Summary: React’s Synthetic Events give you a consistent API, predictable propagation, and convenience across browsers. Understand ",e.jsx("i",{children:"target"})," vs ",e.jsx("i",{children:"currentTarget"}),", when to prevent default, and prefer pointer/keyboard events for robust, accessible UI."]})]});export{s as default};
