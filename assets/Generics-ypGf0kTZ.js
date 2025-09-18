import{j as e}from"./index-C4jUa9lD.js";import{S as n}from"./styled-CsQj8-8K.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"TypeScript: Generics"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Generics"})," let you write ",e.jsx("i",{children:"reusable, type-safe"})," code that works with many kinds of values while keeping the exact types. A generic is a function, type, or class that takes",e.jsx("b",{children:" type parameters"})," like ",e.jsx(n.InlineCode,{children:"<T>"}),"—placeholders for real types supplied by the compiler (inferred) or by you (explicit)."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Type parameter:"})," a type variable (e.g., ",e.jsx(n.InlineCode,{children:"T"}),",",e.jsx(n.InlineCode,{children:"K"}),") declared in angle brackets that stands for an unknown type."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Generic function/type/class:"})," something that declares type parameters and uses them in its signature so it can adapt to different input/output types."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inference:"})," TypeScript often figures out ",e.jsx(n.InlineCode,{children:"T"})," ","automatically from arguments, so you don't have to write it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Constraint:"})," using ",e.jsx(n.InlineCode,{children:"T extends X"})," to restrict what types are allowed (e.g., “",e.jsx("i",{children:"T must be an object with a name"}),"”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Default type parameter:"})," give a fallback like"," ",e.jsx(n.InlineCode,{children:"<T = string>"})," if no type is inferred/passed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Indexed access type:"})," ",e.jsx(n.InlineCode,{children:"T[K]"})," — the type of property ",e.jsx(n.InlineCode,{children:"K"})," on ",e.jsx(n.InlineCode,{children:"T"}),"."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"keyof"}),":"]})," produces a union of property names of"," ",e.jsx(n.InlineCode,{children:"T"})," (e.g.,"," ",e.jsxs(n.InlineCode,{children:["keyof ","{ id: string; age: number }"]})," is"," ",e.jsx(n.InlineCode,{children:'"id" | "age"'}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"First Example: Identity Function"}),e.jsx(n.Pre,{children:`// Generic identity function: it returns the same value it receives.
function identity<T>(value: T): T {
  return value;
}

const a = identity(42);          // a: number
const b = identity("hello");     // b: string
const c = identity({ id: 1 });   // c: { id: number }`}),e.jsxs(n.Small,{children:["The type parameter ",e.jsx(n.InlineCode,{children:"T"})," “captures” the input type and carries it to the output—so TypeScript preserves exact types."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Working with Arrays"}),e.jsx(n.Pre,{children:`// Return the first item of an array; if empty, return undefined.
function first<T>(arr: T[]): T | undefined {
  return arr.length ? arr[0] : undefined;
}

const n = first([10, 20, 30]);        // number | undefined
const s = first(["a", "b"]);          // string | undefined
const u = first([] as boolean[]);     // boolean | undefined`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Tip:"})," Avoid ",e.jsx(n.InlineCode,{children:"any[]"}),". Use generics so callers keep their element types."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Generic Type Aliases & Interfaces"}),e.jsx(n.Pre,{children:`// A generic API response wrapper.
type ApiResponse<T> = {
  ok: boolean;
  data: T | null;
  error?: string;
};

type User = { id: string; name: string };

const res1: ApiResponse<User> = { ok: true, data: { id: "u1", name: "Ashish" } };
const res2: ApiResponse<string[]> = { ok: true, data: ["x", "y"] };`}),e.jsxs(n.Small,{children:["A ",e.jsx("b",{children:"generic alias"})," or ",e.jsx("b",{children:"interface"})," lets you parameterize shapes that contain other types (here, the ",e.jsx("i",{children:"data"})," field)."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Constraints: ",e.jsx("code",{children:"T extends …"})]}),e.jsx(n.Pre,{children:`// Only accept items that have an "id: string" property.
type WithId = { id: string };

function indexById<T extends WithId>(items: T[]): Record<string, T> {
  return items.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {} as Record<string, T>);
}

indexById([{ id: "a", name: "A" }, { id: "b", count: 2 }]); // OK`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Constraint"})," narrows what ",e.jsx(n.InlineCode,{children:"T"})," can be, enabling safe property access (e.g., ",e.jsx(n.InlineCode,{children:"item.id"}),")."]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Selecting Keys Safely (",e.jsx("code",{children:"keyof"})," + Indexed Access)"]}),e.jsx(n.Pre,{children:`// Pluck values for the given keys; keys must exist on T.
function pluck<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map(k => obj[k]);
}

const person = { id: 1, name: "Ashish", active: true };
const names = pluck(person, ["name"]);        // string[]
const flags = pluck(person, ["active"]);      // boolean[]
// pluck(person, ["missing"]);   // ❌ error: "missing" is not a key of person`}),e.jsxs(n.Small,{children:["We restrict ",e.jsx(n.InlineCode,{children:"K"})," to keys of"," ",e.jsx(n.InlineCode,{children:"T"}),", and return"," ",e.jsx(n.InlineCode,{children:"T[K][]"})," (the value types of those keys)."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Default Type Parameters & Explicit Arguments"}),e.jsx(n.Pre,{children:`// Default T to string when it can't be inferred.
function makeSet<T = string>(...items: T[]): Set<T> {
  return new Set(items);
}

const s1 = makeSet("a", "b");    // Set<string> (inferred)
const s2 = makeSet<number>(1, 2); // Set<number> (explicit)`}),e.jsxs(n.Small,{children:["You can ",e.jsx("b",{children:"pass"})," type parameters explicitly (e.g.,"," ",e.jsx(n.InlineCode,{children:"makeSet<number>()"}),") or rely on"," ",e.jsx("b",{children:"inference"})," when arguments reveal the type."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Generic Classes (Brief)"}),e.jsx(n.Pre,{children:`class Box<T> {
  constructor(public value: T) {}
  map<U>(fn: (x: T) => U): Box<U> {
    return new Box(fn(this.value));
  }
}

const boxed = new Box(10);          // Box<number>
const next = boxed.map(n => n * 2); // Box<number>`}),e.jsxs(n.Small,{children:["Classes can also be generic; methods may introduce new parameters like"," ",e.jsx(n.InlineCode,{children:"U"})," for transformations."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"React Examples with Generics"}),e.jsx(n.Pre,{children:`// 9a) Generic List component (props typed with T)
type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
};

function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map((it, i) => <li key={i}>{renderItem(it)}</li>)}</ul>;
}

// Usage:
// <List items={[{ id: 1, name: "Ashish" }]} renderItem={u => <>{u.name}</>} />


// 9b) Generic hook (e.g., fetching)
type AsyncState<T> = { status: "idle" | "loading" | "success" | "error"; data: T | null; error?: unknown; };

function useAsync<T>(fn: () => Promise<T>, deps: React.DependencyList = []): AsyncState<T> {
  const [state, setState] = React.useState<AsyncState<T>>({ status: "idle", data: null });

  React.useEffect(() => {
    let cancelled = false;
    setState({ status: "loading", data: null });
    fn()
      .then(d => !cancelled && setState({ status: "success", data: d }))
      .catch(e => !cancelled && setState({ status: "error", data: null, error: e }));
    return () => { cancelled = true; };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return state;
}`}),e.jsxs(n.Small,{children:["The hook's caller decides the ",e.jsx(n.InlineCode,{children:"T"})," (via inference from"," ",e.jsx(n.InlineCode,{children:"fn"}),"), so"," ",e.jsx(n.InlineCode,{children:"data"})," is strongly typed when used."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"When to Use Generics (vs. Unions or Overloads)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Choose ",e.jsx("b",{children:"generics"})," when input and output types are ",e.jsx("i",{children:"linked"})," (e.g., “return the same type as input”)."]}),e.jsxs("li",{children:["Choose ",e.jsx("b",{children:"unions"})," when you accept several fixed alternatives (e.g.,"," ",e.jsx(n.InlineCode,{children:'"success" | "error"'}),")."]}),e.jsxs("li",{children:["Choose ",e.jsx("b",{children:"overloads"})," when the return type depends on the ",e.jsx("i",{children:"specific"})," call signature (multiple distinct cases)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Common Pitfalls"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Using ",e.jsx(n.InlineCode,{children:"any"})," inside a generic defeats type safety. Prefer constraints or more precise types."]}),e.jsxs("li",{children:["Over-generic APIs (",e.jsx("i",{children:"too many"})," type parameters) hurt readability. Keep the minimal set that expresses your relationships."]}),e.jsxs("li",{children:["Forgetting constraints when you need safe property access (use"," ",e.jsx(n.InlineCode,{children:"T extends ..."}),")."]}),e.jsxs("li",{children:["Returning fresh object/array instances from hooks/components without memoization may cause unnecessary re-renders—pair generics with"," ",e.jsx(n.InlineCode,{children:"useMemo"}),"/",e.jsx(n.InlineCode,{children:"useCallback"})," ","when identity stability matters."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Quick Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Generic:"})," parameterized type/logic that adapts to the types it's used with."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Type parameter:"})," placeholder for a type (e.g., ",e.jsx(n.InlineCode,{children:"T"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Constraint:"})," limit allowed types (e.g., ",e.jsx(n.InlineCode,{children:"T extends object"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Inference:"})," the compiler deduces type arguments from the values you pass."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Indexed access:"})," ",e.jsx(n.InlineCode,{children:"T[K]"}),", the type of property"," ",e.jsx(n.InlineCode,{children:"K"})," on ",e.jsx(n.InlineCode,{children:"T"}),"."]}),e.jsxs("li",{children:[e.jsxs("b",{children:[e.jsx("code",{children:"keyof"}),":"]})," union of property names of a type."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Use generics to express ",e.jsx("i",{children:"type relationships"})," (inputs ↔ outputs ↔ internal data) while keeping code reusable and safe. Constrain when needed, rely on inference when possible, and keep APIs simple and predictable."]})]});export{t as default};
