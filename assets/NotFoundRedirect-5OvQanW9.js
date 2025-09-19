import{j as e}from"./index-t22nWg0v.js";import{S as t}from"./styled-CP1txJxN.js";const s=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"NotFound & Redirect"}),e.jsxs(t.Lead,{children:["In routing, a ",e.jsx("b",{children:"Not Found (404)"})," page appears when no route matches the URL. A ",e.jsx("b",{children:"redirect"})," programmatically sends users from one URL to another. In React Router, we implement these with a catch-all ",e.jsx(t.InlineCode,{children:'Route path="*"'}),", the ",e.jsx(t.InlineCode,{children:"<Navigate />"})," component, and the",e.jsx(t.InlineCode,{children:"useNavigate()"})," hook."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"404 (Not Found):"})," The requested path doesn’t match any route. In SPAs we show a friendly page instead of the browser’s default error page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Redirect:"})," Sending users to another path. In SPAs this is a ",e.jsx("em",{children:"client-side"})," navigation (no full page reload)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<Navigate to ... />:"})," A declarative component that immediately navigates to"," ",e.jsx(t.InlineCode,{children:"to"}),". Use ",e.jsx(t.InlineCode,{children:"replace"})," to avoid pushing a new history entry."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useNavigate():"})," An imperative hook to navigate from event handlers or effects. Accepts options like"," ",e.jsx(t.InlineCode,{children:"{ replace: true, state: { ... } }"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"replace vs push:"})," ",e.jsx("i",{children:"replace"})," swaps the current history entry (no back button to previous URL);",e.jsx("i",{children:"push"})," adds a new entry (default)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"state:"})," An optional object you can pass during navigation (e.g.,"," ",e.jsxs(t.InlineCode,{children:['navigate("/login", ','state: {from: "/settings" } ',")"]}),"). Read it with"," ",e.jsx(t.InlineCode,{children:"useLocation().state"}),"."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pattern 1 — A friendly 404 page (no auto-redirect)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Use a catch-all route (",e.jsx(t.InlineCode,{children:'path="*"'}),")."]}),e.jsx("li",{children:"Show the unknown path, helpful links, and a button to go Home."}),e.jsxs("li",{children:["Do ",e.jsx("em",{children:"not"})," auto-redirect if users might be trying a deep link or a typo—they should decide."]})]}),e.jsx(t.Pre,{children:`// src/pages/system/NotFound.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFound() {
  const location = useLocation();
  return (
    <div role="region" aria-labelledby="nf-title">
      <h1 id="nf-title">Page not found</h1>
      <p>We couldn't find: <code>{location.pathname}</code></p>
      <ul>
        <li><Link to="/home">Go to Home</Link></li>
        <li><Link to="/routing/router-basics">Read Router Basics</Link></li>
      </ul>
    </div>
  );
}`}),e.jsxs(t.Small,{children:["Add a route: ",e.jsx(t.InlineCode,{children:'<Route path="*" element={<NotFound />} />'}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pattern 2 — 404 with delayed redirect"}),e.jsxs(t.List,{children:[e.jsx("li",{children:"Useful when you want to inform the user but still guide them away after a few seconds."}),e.jsxs("li",{children:["Pass ",e.jsx(t.InlineCode,{children:"replace: true"})," to avoid cluttering history."]})]}),e.jsx(t.Pre,{children:`// src/pages/system/NotFoundRedirect.jsx
import React from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

export default function NotFoundRedirect({ to = "/home", seconds = 5 }) {
  const nav = useNavigate();
  const loc = useLocation();

  React.useEffect(() => {
    const id = setTimeout(() => {
      nav(to, { replace: true, state: { from: loc.pathname } });
    }, seconds * 1000);
    return () => clearTimeout(id);
  }, [to, seconds, nav, loc.pathname]);

  return (
    <div role="region" aria-labelledby="nf-redirect-title">
      <h1 id="nf-redirect-title">Page not found</h1>
      <p>
        Redirecting to <code>{to}</code> in {seconds} seconds…
        {" "}
        <Link to={to} replace>Go now</Link>
      </p>
      <p><small>Tried: <code>{loc.pathname}</code></small></p>
    </div>
  );
}`}),e.jsxs(t.Small,{children:["Route: ",e.jsx(t.InlineCode,{children:'<Route path="*" element={<NotFoundRedirect to="/home" seconds={3} />} />'})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pattern 3 — Immediate redirect (legacy → new URL)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(t.InlineCode,{children:"<Navigate />"})," when an old path should instantly map to a new one."]}),e.jsxs("li",{children:["Keep ",e.jsx(t.InlineCode,{children:"replace"})," to avoid leaving dead entries in history."]})]}),e.jsx(t.Pre,{children:`// Example: /docs/* moved to /guide/*
import { Navigate } from "react-router-dom";
<Route path="/docs/*" element={<Navigate to="/guide" replace />} />`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Nested routes: local 404s"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Inside a nested segment, use ",e.jsx(t.InlineCode,{children:'path="*"'})," to show a ",e.jsx("em",{children:"section-specific"})," 404."]}),e.jsx("li",{children:"This avoids sending users away from a section if only the sub-page is wrong."})]}),e.jsx(t.Pre,{children:`// In the /guide parent route:
<Route path="/guide" element={<GuideLayout />}>
  <Route index element={<Intro />} />
  <Route path="getting-started" element={<GettingStarted />} />
  <Route path="*" element={<GuideNotFound />} />  {/* local 404 */}
</Route>`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Hosting note: 404 on static hosts"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Static hosts (e.g., GitHub Pages) may serve a static 404 page when the user refreshes a deep link (",e.jsx("i",{children:"server doesn’t know your SPA routes"}),")."]}),e.jsxs("li",{children:["Fix: add a ",e.jsx("b",{children:"SPA fallback"})," 404 that rewrites to ",e.jsx(t.InlineCode,{children:"index.html"}),", or use",e.jsx(t.InlineCode,{children:"HashRouter"}),". With GitHub Pages + BrowserRouter, ship a"," ",e.jsx(t.InlineCode,{children:"public/404.html"})," that client-redirects to your app (keeps path)."]}),e.jsxs("li",{children:["Also set ",e.jsx(t.InlineCode,{children:"basename"})," (you’ve done this) so links resolve under"," ",e.jsx(t.InlineCode,{children:"/notes-reactjs"}),"."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use a friendly 404 page with helpful links."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(t.InlineCode,{children:"replace"})," for redirects that shouldn’t remain in history."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep ",e.jsx("i",{children:"nested"})," 404s local to a section when appropriate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," auto-redirect users so fast they can’t read the message (2–5s is reasonable)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," create redirect loops—double-check source and target paths."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Catch-all route:"})," a route with ",e.jsx(t.InlineCode,{children:'path="*"'})," that matches any unmatched URL."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Navigate:"})," React Router component to redirect declaratively."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useNavigate:"})," Hook to navigate imperatively in event handlers/effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"replace:"})," Navigation option to overwrite current history entry."]}),e.jsxs("li",{children:[e.jsx("b",{children:"state:"})," Arbitrary data carried along with navigation, read via ",e.jsx(t.InlineCode,{children:"useLocation()"}),"."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Use a catch-all route for unknown paths, decide between a friendly 404 page, a delayed redirect, or an immediate redirect for legacy URLs. Prefer ",e.jsx("i",{children:"replace"})," for cleanup, keep nested 404s local, and configure your host to support SPA deep links."]})]});export{s as default};
