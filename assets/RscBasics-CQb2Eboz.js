import{j as e}from"./index-t22nWg0v.js";import{S as n}from"./styled-1HWmqcri.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"RSC Basics (React Server Components)"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"React Server Components (RSC)"})," let you render some components entirely on the server, send a compact payload to the browser, and hydrate only the parts that need interactivity. This reduces JavaScript shipped to the client and gives server-side data access by default."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"What are Server Components?"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Server Component:"})," a React component that runs only on the ",e.jsx("em",{children:"server"}),", never ships its code to the browser, and can directly access server resources (DB, secrets, files). It can render other server or client components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Client Component:"})," a component that runs in the ",e.jsx("em",{children:"browser"})," (can use state, effects, event handlers). It must be marked with"," ",e.jsx(n.InlineCode,{children:'"use client"'})," at the top of its file."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Boundary:"})," the point where a server component renders a client component (or vice-versa). Props passed across this boundary must be ",e.jsx("em",{children:"serializable"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why RSC?"})," Ship less JS, render close to data, keep secrets server-side, and get fast ",e.jsx("em",{children:"Time-to-Interactive"})," by hydrating only interactive islands."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"SSR, Hydration & Streaming - where RSC fits"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SSR (Server-Side Rendering):"})," server outputs HTML for a request, then the browser"," ",e.jsx("em",{children:"hydrates"})," it (attaches React listeners/state). Great for first paint + SEO."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSG (Static Site Generation):"})," HTML is prebuilt at build time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ISR (Incremental Static Regeneration):"})," static pages are re-generated on a schedule or on demand - a hybrid of SSG and dynamic data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration:"})," process where React attaches event handlers to already rendered HTML. With RSC, ",e.jsx("em",{children:"non-interactive"})," parts don't need hydration at all."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Streaming:"})," server sends HTML (and RSC payload) in chunks using"," ",e.jsx(n.InlineCode,{children:"<Suspense>"})," boundaries, so users see content progressively rather than waiting for everything."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Capabilities & Constraints"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Server Components can:"})," fetch data directly, read files, call server APIs, and render other components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Server Components cannot:"})," use ",e.jsx(n.InlineCode,{children:"useState"}),","," ",e.jsx(n.InlineCode,{children:"useEffect"}),", refs, or browser-only APIs (DOM, ",e.jsx(n.InlineCode,{children:"window"}),", etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Client Components can:"})," use state/effects/events, read DOM, and run in the browser - but they cannot access server-only resources directly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Serialization:"})," props crossing the boundary must be serializable (no functions, class instances, or circular structures). Pass IDs/POJOs, not live connections."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Server Actions:"})," special server-side functions (marked with"," ",e.jsx(n.InlineCode,{children:'"use server"'}),") callable from forms or client components to mutate data securely without REST boilerplate."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Example: Server vs Client Component"}),e.jsx(n.Pre,{children:`// Server component (no "use client", can run async and fetch safely)
export default async function ProductsList() {
  const res = await fetch("https://api.example.com/products", { cache: "no-store" });
  const products = await res.json();

  // You can render a client component for interactive parts:
  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.name} - $ {p.price}
            {/* Client component below handles clicks/state */}
            <AddToCartButton productId={p.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

// Client component (must be in its own file with "use client")
"use client";
import React from "react";

export function AddToCartButton({ productId }) {
  const [pending, setPending] = React.useState(false);
  async function onClick() {
    setPending(true);
    // call an API or a Server Action here
    await fetch("/api/cart", { method: "POST", body: JSON.stringify({ productId }) });
    setPending(false);
  }
  return <button onClick={onClick} disabled={pending}>{pending ? "Adding..." : "Add to cart"}</button>;
}`}),e.jsx(n.Small,{children:"The server component renders data; the client component handles interaction and state."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Passing Data Across the Boundary"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Pass serializable props (strings, numbers, arrays, objects). Don't pass functions or DOM nodes."}),e.jsxs("li",{children:["Need to ",e.jsx("em",{children:"call back"})," to the server? Use an HTTP API or a"," ",e.jsx("b",{children:"Server Action"}),"."]})]}),e.jsx(n.Pre,{children:`// Server component providing plain data to client:
export default async function Profile() {
  const user = await db.users.findById("123"); // server-only
  return <ProfileCard user={{ id: user.id, name: user.name, avatar: user.avatar }} />;
}

// Client component consumes serializable data:
"use client";
export function ProfileCard({ user }) {
  return (
    <article>
      <img alt={user.name} src={user.avatar} />
      <h3>{user.name}</h3>
    </article>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Streaming with Suspense"}),e.jsx(n.Pre,{children:`// Server component can await data inside and stream UI when ready
import { Suspense } from "react";

export default function Page() {
  return (
    <>
      <h1>Dashboard</h1>
      <Suspense fallback={<Skeleton />}>
        {/* UsersServer renders once data arrives; HTML streams progressively */}
        <UsersServer />
      </Suspense>
    </>
  );
}

async function UsersServer() {
  const res = await fetch("https://api.example.com/users");
  const users = await res.json();
  return <UserTable users={users} />;
}

function Skeleton() {
  return <p>Loading users…</p>;
}`}),e.jsx(n.Small,{children:"With streaming, users see parts of the page immediately; slower sections fill in later."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Server Actions (Concept)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Mark a function with ",e.jsx(n.InlineCode,{children:'"use server"'})," to run it on the server. A client component can invoke it via a form action or a direct call (framework-specific)."]}),e.jsx("li",{children:"Great for mutations: create/update/delete without exposing credentials to the client."})]}),e.jsx(n.Pre,{children:`// Pseudo-example (frameworks differ slightly)
"use server";
export async function saveNote(formData) {
  const text = formData.get("text");
  await db.notes.insert({ text });
}

// Client file
"use client";
import { saveNote } from "./actions";

export default function NewNoteForm() {
  return (
    <form action={saveNote}>
      <textarea name="text" required />
      <button type="submit">Save</button>
    </form>
  );
}`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep data-heavy, non-interactive UI in Server Components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," isolate interactivity in small Client Components with ",e.jsx(n.InlineCode,{children:'"use client"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pass only serializable props across the boundary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," try to use state/effects in Server Components."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," leak secrets to Client Components; call server via actions/APIs."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"RSC (React Server Components):"})," React feature to render components on the server without sending their JS to the client."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Client Component:"})," runs in the browser, can use hooks/effects/events; must start with ",e.jsx(n.InlineCode,{children:'"use client"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Server Action:"})," server-side function (marked with ",e.jsx(n.InlineCode,{children:'"use server"'}),") callable from the client or forms."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSR:"})," render HTML per request on the server; good for SEO and fast first paint."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSG:"})," pre-render at build time; fastest delivery for content that rarely changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ISR:"})," re-generate static pages incrementally on demand or schedule."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration:"})," attaching event listeners/state to server-rendered HTML on the client."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Streaming:"})," sending HTML/RSC chunks progressively using ",e.jsx(n.InlineCode,{children:"Suspense"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Serialization:"})," converting data to a transferable format for crossing the server↔client boundary."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Use ",e.jsx("b",{children:"Server Components"})," for data-heavy, non-interactive UI and"," ",e.jsx("b",{children:"Client Components"})," for interactivity. Combine with ",e.jsx("b",{children:"SSR/SSG/ISR"}),","," ",e.jsx("b",{children:"hydration"}),", and ",e.jsx("b",{children:"streaming"})," to balance performance, DX, and SEO."]})]});export{t as default};
