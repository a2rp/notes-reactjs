import{j as e,r as l}from"./index-BRArnZ3i.js";import{S as s}from"./styled-B9Www9HH.js";function o(n){return new Promise(r=>setTimeout(r,n))}function d(n){let r="pending",i;const a=n().then(t=>{r="success",i=t}).catch(t=>{r="error",i=t});return{read(){if(r==="pending")throw a;if(r==="error")throw i;return i}}}function c(){return o(1200).then(()=>({id:"u_42",name:"Ada Lovelace",role:"Mathematician / Programmer"}))}const h=d(c);function u(){const n=h.read();return e.jsxs("div",{role:"region","aria-label":"User profile",style:{border:"1px solid hsl(0 0% 100% / 0.14)",borderRadius:12,padding:12,marginTop:8},children:[e.jsx("h4",{style:{margin:0},children:n.name}),e.jsx("p",{style:{margin:"4px 0 0",opacity:.9},children:n.role}),e.jsxs(s.Small,{children:["ID: ",n.id]})]})}const j=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Suspense for Data"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Suspense"})," lets components “wait” for something (like data) before they render. While a component is waiting, React shows a ",e.jsx("em",{children:"fallback"}),". When the data arrives, the real UI appears automatically—no manual loading state plumbing."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why does Suspense exist?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Loading UI without boilerplate:"})," Components can declare “I’m not ready yet”, and React will show a fallback automatically."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Smoother UX:"})," Boundaries prevent the whole screen from flashing; only the parts that wait will show a placeholder."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composability:"})," Parent and child components can each suspend independently. You can nest boundaries for fine-grained control."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key terms (plain English)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Suspense boundary:"})," a wrapper (",e.jsx(s.InlineCode,{children:"<Suspense fallback={...}>"}),") that shows a fallback while any child “suspends”."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspending:"})," when a component throws a ",e.jsx(s.InlineCode,{children:"Promise"})," during render to say “wait for this”."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback:"})," the temporary UI shown while waiting (e.g., spinner, skeleton, shimmer)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Concurrent rendering:"})," React can prepare a new UI in the background and switch when it’s ready. Suspense builds on this."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transition:"})," a non-urgent update wrapped in ",e.jsx(s.InlineCode,{children:"startTransition"})," to keep the UI responsive while loading."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Minimal example (learning pattern)"}),e.jsx(s.Pre,{children:`// 1) Create a resource that "throws" a Promise while loading
const userResource = createResource(fetchUser);

// 2) Child reads from the resource. If not ready, it suspends.
function UserCard() {
  const user = userResource.read(); // returns OR throws a Promise
  return <div>{user.name}</div>;
}

// 3) Wrap the child in a Suspense boundary
export default function Page() {
  return (
    <Suspense fallback={<div>Loading…</div>}>
      <UserCard />
    </Suspense>
  );
}`}),e.jsxs(s.Small,{children:["The trick: ",e.jsx("b",{children:"throwing a Promise inside render"})," is how React knows to show the fallback. In real apps, a data library handles this for you."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Teaching block: see it in action"}),e.jsx(s.Pre,{children:`<Suspense fallback={<div>Loading profile…</div>}>
  <UserCard />
</Suspense>`}),e.jsx(s.Small,{children:"Below is the same code running on this page. It deliberately waits ~1.2s so you see the fallback first, then the real user data."}),e.jsx(s.Section,{"aria-live":"polite",style:{marginTop:12},children:e.jsx(l.Suspense,{fallback:e.jsx("div",{children:"Loading profile…"}),children:e.jsx(u,{})})})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Where do I put boundaries?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Around units of content:"})," e.g., a product panel, comments list, side card."]}),e.jsxs("li",{children:[e.jsx("b",{children:"At natural page splits:"})," main content vs. sidebar; list vs. detail."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Nested boundaries:"})," small inner boundaries give faster, progressive reveal."]})]}),e.jsx(s.Pre,{children:`<Suspense fallback={<PageSkeleton />}>
  <MainLayout>
    <Sidebar />
    <Suspense fallback={<PanelSkeleton />}>
      <ProductPanel />
    </Suspense>
  </MainLayout>
</Suspense>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Transitions + Suspense (keep typing responsive)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Urgent vs. non-urgent:"})," typing into an input is urgent; filtering a big list can be non-urgent."]}),e.jsxs("li",{children:[e.jsx("b",{children:"startTransition:"})," marks a state update as non-urgent so React can keep the old UI responsive until the new result is ready."]})]}),e.jsx(s.Pre,{children:`import { startTransition, useState } from "react";

function Search({ items }) {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(items);

  function onChange(e) {
    const q = e.target.value;
    setQuery(q); // urgent (keystrokes feel instant)
    startTransition(() => {
      const filtered = expensiveFilter(items, q);
      setResult(filtered);
    });
  }

  return (
    <>
      <input value={query} onChange={onChange} placeholder="Search…" />
      <Suspense fallback={<div>Updating…</div>}>
        <ResultList data={result} />
      </Suspense>
    </>
  );
}`}),e.jsx(s.Small,{children:"Rule of thumb: urgent updates shouldn’t lag because data is loading. Use transitions to protect them."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Error handling"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Pair Suspense with an ",e.jsx("b",{children:"Error Boundary"})," to catch thrown errors. Suspense handles the “waiting” case; Error Boundaries handle the “failed” case."]})}),e.jsx(s.Pre,{children:`// Sketch
<ErrorBoundary fallback={<RetryPanel />}>
  <Suspense fallback={<div>Loading…</div>}>
    <Comments />
  </Suspense>
</ErrorBoundary>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," place small, meaningful boundaries to progressively reveal content."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a data library that supports Suspense (or a framework with loaders/streaming) in real apps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep urgent interactions responsive; wrap heavy updates in ",e.jsx(s.InlineCode,{children:"startTransition"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," suspend the entire app for tiny pieces of data; prefer nested boundaries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," forget an Error Boundary for network failures/timeouts."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Wrap parts of the UI in ",e.jsx("code",{children:"<Suspense>"})," to handle loading states automatically. Use ",e.jsx("i",{children:"small, well-placed"})," boundaries, pair with Error Boundaries, and protect urgent interactions with ",e.jsx("code",{children:"startTransition"}),"."]})]});export{j as default};
