import{j as e}from"./index-CEhT6f_w.js";import{S as s}from"./styled-Bb2WVd4b.js";const o=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Custom Hooks"}),e.jsxs(s.Lead,{children:["Custom hooks encapsulate reusable stateful logic. They are plain functions that ",e.jsx("b",{children:"start with “use”"}),", call other hooks, and return values/functions to consumers. They do not render UI."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & purpose"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Custom hook:"})," a function like ",e.jsx(s.InlineCode,{children:"useSomething(...)"})," that composes built-in hooks to solve a repeatable problem."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Goal:"})," hide implementation details, keep components small, share logic across multiple places."]}),e.jsxs("li",{children:[e.jsx("b",{children:"No UI:"})," custom hooks return data and callbacks; components decide how to render."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Naming & API conventions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Prefix with ",e.jsx("b",{children:"use"})," (required so lints can verify Rules of Hooks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inputs:"})," prefer a single ",e.jsx("em",{children:"options object"})," when parameters may grow; use positional args for essential values."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Outputs:"})," return a tuple ",e.jsx(s.InlineCode,{children:"[value, actions]"})," or an object with named fields. Keep shapes stable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stability:"})," memoize returned objects/functions that are intended to be stable across renders."]}),e.jsx("li",{children:"Document side effects, cleanup behavior, and when the hook re-runs."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Rules of Hooks (still apply)"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Call hooks at the top level of the custom hook (no loops/conditions)."}),e.jsx("li",{children:"Keep the order of hooks consistent between renders."}),e.jsx("li",{children:"Custom hooks can call other custom hooks freely."})]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"useToggle"})]}),e.jsx(s.Pre,{children:`export function useToggle(initial = false) {
  const [on, setOn] = React.useState(!!initial);
  const toggle = React.useCallback(() => setOn(v => !v), []);
  const setTrue = React.useCallback(() => setOn(true), []);
  const setFalse = React.useCallback(() => setOn(false), []);
  return [on, { toggle, setTrue, setFalse }] as const;
}`}),e.jsx(s.Small,{children:"Returns a boolean plus stable actions. Tuple form is ergonomic in components."})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"useCounter"})," (clamped, step)"]}),e.jsx(s.Pre,{children:`export function useCounter(opts = {}) {
  const { initial = 0, step = 1, min = -Infinity, max = Infinity } = opts;
  const [count, setCount] = React.useState(initial);
  const clamp = React.useCallback((n) => Math.min(max, Math.max(min, n)), [min, max]);

  const inc = React.useCallback(() => setCount(c => clamp(c + step)), [step, clamp]);
  const dec = React.useCallback(() => setCount(c => clamp(c - step)), [step, clamp]);
  const set = React.useCallback((n) => setCount(() => clamp(n)), [clamp]);
  const reset = React.useCallback(() => setCount(initial), [initial]);

  return { count, inc, dec, set, reset };
}`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"useLocalStorage"})," (SSR-safe)"]}),e.jsx(s.Pre,{children:`export function useLocalStorage(key, initialValue) {
  const isBrowser = typeof window !== "undefined";

  const [value, setValue] = React.useState(() => {
    if (!isBrowser) return initialValue;
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  // Persist when key or value changes
  React.useEffect(() => {
    if (!isBrowser) return;
    try { window.localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* storage may be full/blocked */ }
  }, [key, value, isBrowser]);

  // Respond to key changes from other tabs
  React.useEffect(() => {
    if (!isBrowser) return;
    const onStorage = (e) => {
      if (e.key === key) {
        try { setValue(e.newValue != null ? JSON.parse(e.newValue) : initialValue); }
        catch { /* ignore */ }
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, initialValue, isBrowser]);

  return [value, setValue];
}`}),e.jsx(s.Small,{children:"Guards for SSR and cross-tab sync. Handles JSON parsing safely."})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"useEvent"})," (stable callback, no stale closure)"]}),e.jsx(s.Pre,{children:`export function useEvent(fn) {
  const ref = React.useRef(fn);
  React.useLayoutEffect(() => { ref.current = fn; });
  return React.useCallback((...args) => ref.current?.(...args), []);
}

// Usage:
// const onClick = useEvent((id) => { /* always latest logic */ });`}),e.jsx(s.Small,{children:"Returns a stable function reference that calls the latest implementation."})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"useAsync"})," (status + cancellation)"]}),e.jsx(s.Pre,{children:`export function useAsync(asyncFn, deps = []) {
  const [state, setState] = React.useState({ status: "idle", data: null, error: null });

  React.useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null, error: null });

    asyncFn()
      .then((data) => !cancelled && setState({ status: "success", data, error: null }))
      .catch((error) => !cancelled && setState({ status: "error", data: null, error }));

    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state; // { status, data, error }
}

// Usage:
// const { status, data, error } = useAsync(() => fetch('/api').then(r => r.json()), [url]);`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"useOnClickOutside"})]}),e.jsx(s.Pre,{children:`export function useOnClickOutside(ref, handler) {
  const latest = useEvent(handler);
  React.useEffect(() => {
    function onDown(e) {
      const el = ref?.current;
      if (!el || el.contains(e.target)) return;
      latest(e);
    }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, [ref, latest]);
}`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"useDebouncedValue"})]}),e.jsx(s.Pre,{children:`export function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = React.useState(value);
  React.useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: ",e.jsx("code",{children:"useElementSize"})," (ResizeObserver)"]}),e.jsx(s.Pre,{children:`export function useElementSize(ref) {
  const [size, setSize] = React.useState({ width: 0, height: 0 });

  React.useEffect(() => {
    const el = ref?.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(([entry]) => {
      const box = entry?.contentRect;
      if (box) setSize({ width: box.width, height: box.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [ref]);

  return size; // { width, height }
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Composing hooks"}),e.jsx(s.Pre,{children:`function useSearch(items) {
  const [input, setInput] = React.useState("");
  const debounced = useDebouncedValue(input, 150);
  const result = React.useMemo(() => {
    const q = debounced.trim().toLowerCase();
    return items.filter(it => it.name.toLowerCase().includes(q));
  }, [items, debounced]);
  return { input, setInput, result };
}`}),e.jsx(s.Small,{children:"Custom hooks can call other custom hooks to layer behavior."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Patterns: stability & dependencies"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Return functions via ",e.jsx(s.InlineCode,{children:"useCallback"})," so consumers and effects can depend on them safely."]}),e.jsxs("li",{children:["Return objects via ",e.jsx(s.InlineCode,{children:"useMemo"})," when identity stability matters."]}),e.jsx("li",{children:"Expose a minimal API; avoid leaking internal refs or DOM nodes unless intentional."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Testing custom hooks"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Test as pure logic with ",e.jsx(s.InlineCode,{children:"@testing-library/react"}),"’s ",e.jsx(s.InlineCode,{children:"renderHook"})," or by using a tiny test component."]}),e.jsx("li",{children:"Mock timers/network for hooks that debounce or fetch."}),e.jsxs("li",{children:["Assert ",e.jsx("em",{children:"observable outputs"})," (returned values, called callbacks), not implementation details."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common pitfalls"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"Calling hooks conditionally inside the custom hook (breaks Rules of Hooks)."}),e.jsx("li",{children:"Returning a new object every render when consumers depend on reference equality (memoize when needed)."}),e.jsx("li",{children:"Forgetting to clean up listeners/timers opened by the hook."}),e.jsx("li",{children:"Encoding rendering/UI inside the hook; keep hooks UI-agnostic."}),e.jsxs("li",{children:["Hiding synchronous errors—bubble errors or return them explicitly (as in ",e.jsx(s.InlineCode,{children:"useAsync"}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Index & exports"}),e.jsx(s.Pre,{children:`// src/hooks/index.js
export * from "./useToggle";
export * from "./useCounter";
export * from "./useLocalStorage";
export * from "./useEvent";
export * from "./useAsync";
export * from "./useOnClickOutside";
export * from "./useDebouncedValue";
export * from "./useElementSize";`}),e.jsx(s.Small,{children:"Re-export for convenient imports and consistent APIs."})]}),e.jsx(s.Callout,{children:"Summary: custom hooks package stateful logic with clean, stable APIs. Keep the Rules of Hooks, design predictable inputs/outputs, memoize where identity matters, and document effects and cleanup."})]});export{o as default};
