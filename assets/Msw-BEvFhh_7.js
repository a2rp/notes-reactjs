import{j as e}from"./index-CDxhzYTb.js";import{S as r}from"./styled-CRAefCRT.js";const n=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"MSW (Mock Service Worker)"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Mock Service Worker (MSW)"})," lets you intercept network requests and return",e.jsx("em",{children:" realistic "})," mocked responses — in the ",e.jsx("b",{children:"browser"})," (via a Service Worker) and in ",e.jsx("b",{children:"Node test environments"}),". You can build UI before a backend exists, reproduce edge cases, and write stable integration tests that don't hit real servers."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definition: API Mocking"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"API mocking"}),' means your app still "fetches" data, but a mock layer intercepts the request and returns a crafted response instead of calling the real API.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Goal:"}),' deterministic, fast, offline-friendly development & testing, with responses that look like production ("fixtures").']})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Key Terms"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker:"})," a background script in the browser that can intercept network calls. MSW uses it to catch ",e.jsx(r.InlineCode,{children:"fetch"}),"/",e.jsx(r.InlineCode,{children:"XHR"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Handler:"})," a matcher + resolver for a route (e.g., GET ",e.jsx(r.InlineCode,{children:"/api/user/:id"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Resolver:"})," the function that builds a response:",e.jsx(r.InlineCode,{children:"(req, res, ctx) => res(ctx.status(200), ctx.json(...))"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"REST / GraphQL:"})," MSW has"," ",e.jsx(r.InlineCode,{children:"rest.get/post/put/patch/delete"})," and"," ",e.jsx(r.InlineCode,{children:"graphql.query/mutation"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Node vs Browser:"})," In tests, MSW runs in Node with"," ",e.jsx(r.InlineCode,{children:"setupServer"}),"; in the browser it runs a Service Worker with"," ",e.jsx(r.InlineCode,{children:"setupWorker"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fixture:"})," a realistic sample payload used as mock data."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Install (Dev & Tests)"}),e.jsx(r.Pre,{children:`# Add MSW
npm i -D msw

# (Browser only, one-time) Generate the worker file into /public
npx msw init public/ --save`}),e.jsxs(r.Small,{children:["The init command creates ",e.jsx(r.InlineCode,{children:"public/mockServiceWorker.js"}),", which the browser registers to intercept requests in dev."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Define Handlers (REST & GraphQL)"}),e.jsx(r.Pre,{children:`// src/mocks/handlers.js
import { rest, graphql } from "msw";

export const handlers = [
  // REST: GET /api/user/:id
  rest.get("/api/user/:id", (req, res, ctx) => {
    const { id } = req.params;
    const user = { id, name: id === "42" ? "Ada Lovelace" : "Linus Torvalds" };
    return res(
      ctx.status(200),
      ctx.delay(200),              // artificial latency
      ctx.json(user)
    );
  }),

  // REST: POST /api/login
  rest.post("/api/login", async (req, res, ctx) => {
    const { email, password } = await req.json();
    if (email === "a@b.com" && password === "secret") {
      return res(ctx.status(200), ctx.json({ token: "jwt-123" }));
    }
    return res(ctx.status(401), ctx.json({ error: "Invalid credentials" }));
  }),

  // GraphQL: Query user
  graphql.query("GetUser", (req, res, ctx) => {
    const { id } = req.variables;
    return res(ctx.data({ user: { id, name: "Grace Hopper" } }));
  }),
];`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"ctx"})," helpers: ",e.jsx(r.InlineCode,{children:"ctx.status"}),","," ",e.jsx(r.InlineCode,{children:"ctx.json"}),", ",e.jsx(r.InlineCode,{children:"ctx.delay"}),","," ",e.jsx(r.InlineCode,{children:"ctx.cookie"}),", ",e.jsx(r.InlineCode,{children:"ctx.set"}),", etc."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Browser Setup (Dev)"}),e.jsx(r.Pre,{children:`// src/mocks/browser.js
import { setupWorker } from "msw";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// src/main.jsx (start worker only in dev)
if (import.meta.env.DEV) {
  const { worker } = await import("./mocks/browser");
  await worker.start({ onUnhandledRequest: "bypass" });
}`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"onUnhandledRequest"}),": ",e.jsx("i",{children:'"bypass"'})," lets unknown requests hit the real network; use",e.jsx("i",{children:'"warn"'})," during debugging to see unexpected calls."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Node Test Setup (Jest/Vitest)"}),e.jsx(r.Pre,{children:`// src/mocks/server.js
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
export const server = setupServer(...handlers);

// setupTests.(js|ts) - auto-loaded by Jest/Vitest
import { server } from "./src/mocks/server";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"resetHandlers()"})," removes per-test overrides so each test starts clean."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Component + Test using MSW"}),e.jsx(r.Pre,{children:`// src/components/UserCard.jsx
import React from "react";

export default function UserCard({ id }) {
  const [state, setState] = React.useState({ status: "idle", user: null, error: null });

  React.useEffect(() => {
    let alive = true;
    setState({ status: "loading", user: null, error: null });

    fetch(\`/api/user/\${id}\`)
      .then(r => r.ok ? r.json() : Promise.reject(new Error("HTTP " + r.status)))
      .then(data => alive && setState({ status: "success", user: data, error: null }))
      .catch(err => alive && setState({ status: "error", user: null, error: err.message }));

    return () => { alive = false; };
  }, [id]);

  if (state.status === "loading") return <p>Loading…</p>;
  if (state.status === "error")   return <p role="alert">Error: {state.error}</p>;
  return <p data-testid="name">{state.user.name}</p>;
}`}),e.jsx(r.Pre,{children:`// src/components/__tests__/UserCard.test.jsx
import { render, screen } from "@testing-library/react";
import UserCard from "../UserCard";
import { server } from "../../mocks/server";
import { rest } from "msw";

test("renders the mocked user", async () => {
  render(<UserCard id="42" />);
  expect(await screen.findByText("Ada Lovelace")).toBeInTheDocument();
});

test("can override a handler for one test", async () => {
  server.use(
    rest.get("/api/user/:id", (req, res, ctx) => {
      return res(ctx.status(500), ctx.json({ error: "Boom" }));
    })
  );
  render(<UserCard id="42" />);
  expect(await screen.findByRole("alert")).toHaveTextContent("HTTP 500");
});`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"server.use(...)"})," overrides a handler for the current test. Use ",e.jsx("b",{children:"res.once(...)"})," to apply only once."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Advanced Patterns"}),e.jsx(r.Pre,{children:`// One-time failure, then success
server.use(
  rest.get("/api/ping", (req, res, ctx) => res.once(ctx.status(503))),
  rest.get("/api/ping", (req, res, ctx) => res(ctx.status(200), ctx.text("ok")))
);

// Set a cookie and header
rest.post("/api/login", async (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.cookie("token", "jwt-123", { httpOnly: true }),
    ctx.set("x-request-id", "abc")
  );
});`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep fixtures realistic and cover success, empty, and error states."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," colocate handlers with the API surface (one file per feature) for discoverability."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(r.InlineCode,{children:'onUnhandledRequest: "error"'})," in CI to catch accidental real calls."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mock ",e.jsx("em",{children:"inside"})," components; keep mocks at the edge (MSW). Components should not know about mocking."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overfit handlers to a specific test; prefer general handlers and override per test when needed."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Troubleshooting"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["If nothing is intercepted in the browser, ensure the worker script exists in ",e.jsx(r.InlineCode,{children:"/public"})," and the worker is ",e.jsx("b",{children:"started"})," in dev."]}),e.jsxs("li",{children:["Paths must match exactly. Prefer relative app routes (",e.jsx(r.InlineCode,{children:'"/api/..."'}),") over absolute domains to simplify dev."]}),e.jsxs("li",{children:["In tests, make sure ",e.jsx(r.InlineCode,{children:"setupTests"})," runs (Jest config) and you're importing from the same ",e.jsx(r.InlineCode,{children:"server"}),"."]})]})]}),e.jsxs(r.Callout,{children:["Summary: MSW intercepts requests in browser and tests, returning realistic responses. Define",e.jsx("i",{children:" handlers"})," for routes, craft responses with ",e.jsx("i",{children:"ctx"}),", and run the worker in dev or the Node server in tests. Keep mocks realistic and centralised for reliable, maintainable UI."]})]});export{n as default};
