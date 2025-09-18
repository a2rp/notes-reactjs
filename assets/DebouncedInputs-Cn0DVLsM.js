import{j as e}from"./index-CaPR9t66.js";import{S as n}from"./styled-DqsH5TT8.js";const s=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Debounced Inputs"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Debouncing"})," waits for a “quiet period” after the user stops typing before running work (e.g., filtering, API calls). This reduces unnecessary renders and network requests while keeping the UI responsive."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Definition & When to Use"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Debounce:"})," postpone running a function until ",e.jsx("i",{children:"N ms"})," have passed without another call. If a new call arrives within the window, the timer restarts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use for:"})," live search, typeahead queries, client-side filtering, expensive validations, autosave."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t use for:"})," critical interactions needing immediate feedback (e.g., password fields, stepper controls)—update immediately instead."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Debounce vs Throttle vs Delay"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Debounce:"})," run after the user stops. Good for text inputs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Throttle:"})," run at most once every ",e.jsx("i",{children:"N ms"})," during continuous activity. Good for scroll/resize."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Delay:"})," a one-off timeout. Not reactive to continued typing like debounce."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Controlled Pattern: Immediate text + Debounced value"}),e.jsx(n.Pre,{children:`function DebouncedSearch({ delay = 300 }) {
  const [text, setText] = React.useState("");       // immediate UI value
  const [query, setQuery] = React.useState("");     // debounced value

  React.useEffect(() => {
    const id = setTimeout(() => setQuery(text), delay);
    return () => clearTimeout(id);                  // cancel on change/unmount
  }, [text, delay]);

  // React to debounced query (fetch/filter)
  React.useEffect(() => {
    if (!query) return;
    let aborted = false;

    async function go() {
      try {
        const ctrl = new AbortController();
        const p = fetch("/api/search?q=" + encodeURIComponent(query), { signal: ctrl.signal })
          .then(r => r.json());
        // Optional: store ctrl to cancel if needed
        const data = await p;
        if (!aborted) {
          // setResults(data)
        }
      } catch (err) {
        // if aborted, ignore; else handle error
      }
    }
    go();
    return () => { aborted = true; };
  }, [query]);

  return (
    <>
      <label htmlFor="q">Search</label>
      <input
        id="q"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type to search..."
        autoComplete="off"
      />
      <p><b>Debounced query:</b> {query || "—"}</p>
    </>
  );
}`}),e.jsxs(n.Small,{children:["Keep UI snappy by updating ",e.jsx(n.InlineCode,{children:"text"})," every keystroke, but only “commit” work when ",e.jsx(n.InlineCode,{children:"query"})," updates."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Debounced Callback Pattern"}),e.jsx(n.Pre,{children:`function useDebouncedCallback(fn, delay = 300) {
  const fnRef = React.useRef(fn);
  React.useEffect(() => { fnRef.current = fn; }, [fn]);

  const timer = React.useRef(null);
  return React.useCallback((...args) => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => fnRef.current(...args), delay);
  }, [delay]);
}

// Usage in an input:
function DebouncedInput({ onDebouncedChange, delay = 300 }) {
  const [value, setValue] = React.useState("");
  const debounced = useDebouncedCallback(onDebouncedChange, delay);

  function onChange(e) {
    const next = e.target.value;
    setValue(next);            // immediate UI
    debounced(next);           // delayed work
  }

  return <input value={value} onChange={onChange} placeholder="Debounced input" />;
}`}),e.jsxs(n.Small,{children:["This pattern is useful when you want to run a function ",e.jsx("i",{children:"later"})," without introducing a second state."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Uncontrolled Variant (ref + native input)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled:"})," the DOM owns the value; React reads it when needed."]}),e.jsx("li",{children:"Useful when you have very large lists or want to minimize React renders while typing."})]}),e.jsx(n.Pre,{children:`function UncontrolledDebounced({ onDebounced, delay = 300 }) {
  const ref = React.useRef(null);
  const debounced = React.useRef(); // store timer id

  function onInput() {
    if (debounced.current) clearTimeout(debounced.current);
    debounced.current = setTimeout(() => {
      onDebounced(ref.current?.value ?? "");
    }, delay);
  }

  React.useEffect(() => () => clearTimeout(debounced.current), [delay]);

  return <input ref={ref} onInput={onInput} placeholder="Uncontrolled + debounced" />;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Leading vs Trailing Edge"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Trailing:"})," run ",e.jsx("i",{children:"after"})," the user stops typing (default)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Leading:"})," run once immediately on the first keystroke, then suppress until the gap."]})]}),e.jsx(n.Pre,{children:`function useDebouncedValue(value, delay = 300, { leading = false } = {}) {
  const [debounced, setDebounced] = React.useState(value);
  const firstCall = React.useRef(true);

  React.useEffect(() => {
    if (leading && firstCall.current) {
      firstCall.current = false;
      setDebounced(value);
      return;
    }
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay, leading]);

  return debounced;
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"IME, Accessibility & UX"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"IME composition:"})," when users type with input method editors (e.g., Chinese, Japanese), avoid triggering network calls mid-composition. Use"," ",e.jsx(n.InlineCode,{children:"onCompositionStart"})," /"," ",e.jsx(n.InlineCode,{children:"onCompositionEnd"})," to pause/resume."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Feedback:"})," show a small “searching…” or spinner while requests are inflight."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard:"})," support ",e.jsx(n.InlineCode,{children:"Enter"})," to submit immediately."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t debounce"})," password fields or critical validation that must be instant."]})]}),e.jsx(n.Pre,{children:`function SearchWithIME() {
  const [text, setText] = React.useState("");
  const [composing, setComposing] = React.useState(false);
  const debounced = useDebouncedValue(text, 300);

  React.useEffect(() => {
    if (composing) return;     // skip while composing
    if (!debounced) return;
    // fetch with debounced query...
  }, [debounced, composing]);

  return (
    <input
      value={text}
      onChange={(e) => setText(e.target.value)}
      onCompositionStart={() => setComposing(true)}
      onCompositionEnd={() => setComposing(false)}
      placeholder="Search..."
    />
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don’t"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep instant UI feedback with a controlled ",e.jsx(n.InlineCode,{children:"value"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," debounce only the expensive work (fetch/filter), not the user’s typing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," cancel stale requests (AbortController or a flag) when the query changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget to clear timers on unmount/prop changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," block IME users—respect composition events."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Debounce window:"})," the period of inactivity required before running the task."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Leading edge:"})," the first call fired immediately."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trailing edge:"})," the last call fired after the window elapses."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Controlled input:"})," React state owns the value via ",e.jsx(n.InlineCode,{children:"value"})," + ",e.jsx(n.InlineCode,{children:"onChange"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uncontrolled input:"})," the DOM owns the value; React reads it on demand via refs."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Debounce ",e.jsx("i",{children:"work"}),", not typing. Keep inputs responsive with controlled values, run expensive actions after a quiet period, cancel stale requests, and respect IME composition."]})]});export{s as default};
