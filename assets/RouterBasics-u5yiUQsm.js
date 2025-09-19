import{j as e}from"./index-Der9nZEc.js";import{S as s}from"./styled-CFZiLP7f.js";const r=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Router Basics"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"router"})," keeps the UI in sync with the URL. In React Router v6, you declare a",e.jsx("b",{children:" route tree"})," and use ",e.jsx(s.InlineCode,{children:"<Link/>"}),",",e.jsx(s.InlineCode,{children:"<NavLink/>"}),", and hooks to navigate—without full page reloads."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Ideas"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SPA (Single-Page App):"})," the browser loads one HTML document; navigation swaps views on the client (no full reload)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Router:"})," watches the URL and picks a matching ",e.jsx("em",{children:"route element"})," to render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Route:"})," a path pattern (e.g. ",e.jsx(s.InlineCode,{children:'"/about"'}),") with an element to render."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Segment:"})," a part of a path separated by slashes (e.g."," ",e.jsx(s.InlineCode,{children:'"/users/42"'})," has segments"," ",e.jsx(s.InlineCode,{children:'"users"'})," and ",e.jsx(s.InlineCode,{children:'"42"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dynamic segment (param):"})," ",e.jsx(s.InlineCode,{children:'":id"'})," captures a value from the URL, e.g. ",e.jsx(s.InlineCode,{children:'"/users/:id"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Location:"})," the current URL broken into ",e.jsx("em",{children:"pathname"}),", ",e.jsx("em",{children:"search"})," (query string), and ",e.jsx("em",{children:"hash"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"History:"})," the browser’s session stack (back/forward). The router pushes/replace entries instead of reloading pages."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Minimal Setup"}),e.jsxs(s.Small,{children:["Use ",e.jsx(s.InlineCode,{children:"BrowserRouter"})," for clean URLs. On GitHub Pages, set ",e.jsx(s.InlineCode,{children:"basename"})," (you already use"," ",e.jsx(s.InlineCode,{children:'"/notes-reactjs"'}),")."]}),e.jsx(s.Pre,{children:`// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/notes-reactjs">
    <App />
  </BrowserRouter>
);`}),e.jsx(s.Pre,{children:`// src/App.jsx (skeleton)
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* more routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Linking vs Programmatic Navigation"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"<Link>"}),": renders an accessible anchor; updates URL without reload."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<NavLink>"}),": like Link, but adds an ",e.jsx(s.InlineCode,{children:"active"})," ","class (or lets you compute one) when the link matches the current location."]}),e.jsxs("li",{children:[e.jsx("b",{children:"useNavigate()"}),": navigate from code (e.g., after submit)."]})]}),e.jsx(s.Pre,{children:`import { Link, NavLink, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  function onLogoClick() {
    navigate("/", { replace: false }); // push a new history entry
  }

  return (
    <nav>
      <button type="button" onClick={onLogoClick}>MySite</button>

      {/* Declarative links */}
      <Link to="/about">About</Link>

      {/* Active styling */}
      <NavLink
        to="/docs"
        className={({ isActive }) => (isActive ? "active" : undefined)}
        title="Docs"
      >
        Docs
      </NavLink>
    </nav>
  );
}`}),e.jsxs(s.Small,{children:["Use ",e.jsx("b",{children:"buttons"})," for actions and ",e.jsx("b",{children:"links"})," for navigation. Avoid clickable"," ",e.jsx(s.InlineCode,{children:"<div>"}),"s."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Route Params (Basics)"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Define params with ",e.jsx(s.InlineCode,{children:'":id"'}),", then read them via"," ",e.jsx(s.InlineCode,{children:"useParams()"}),"."]})}),e.jsx(s.Pre,{children:`// route: <Route path="/users/:id" element={<UserProfile />} />
import { useParams } from "react-router-dom";

function UserProfile() {
  const { id } = useParams(); // "42"
  return <p>User ID: {id}</p>;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Relative vs Absolute Links"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["A path starting with ",e.jsx(s.InlineCode,{children:'"/"'})," is ",e.jsx("b",{children:"absolute"}),"."]}),e.jsxs("li",{children:["Otherwise, the link is ",e.jsx("b",{children:"relative"})," to the current route. Use this inside nested routes."]})]}),e.jsx(s.Pre,{children:`// If you're currently at /settings
<Link to="profile">Profile</Link>   // -> /settings/profile  (relative)
<Link to="/profile">Profile</Link>  // -> /profile          (absolute)`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Index Routes & 404"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Index route:"})," the default child UI for a parent path (no extra segment)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Not Found:"})," a catch-all route ",e.jsx(s.InlineCode,{children:'path="*"'}),"."]})]}),e.jsx(s.Pre,{children:`// Nested example with an index route
<Route path="/docs" element={<DocsLayout />}>
  <Route index element={<DocsHome />} />       {/* renders at /docs */}
  <Route path="getting-started" element={<GettingStarted />} />
</Route>

// 404 (basic)
<Route path="*" element={<NotFound />} />`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"BrowserRouter vs HashRouter"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"BrowserRouter:"})," clean paths (e.g., ",e.jsx(s.InlineCode,{children:"/users/42"}),"). Needs server/host to serve ",e.jsx(s.InlineCode,{children:"index.html"})," for any unknown path (you handle this via GH Pages fallback)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"HashRouter:"})," URLs like ",e.jsx(s.InlineCode,{children:"#/users/42"}),". Doesn’t require server rewrite rules, but less pretty."]}),e.jsxs("li",{children:[e.jsx("b",{children:"basename:"})," prefix for all routes when app is not at domain root (e.g.,"," ",e.jsx(s.InlineCode,{children:'"/notes-reactjs"'}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer ",e.jsx(s.InlineCode,{children:"<Link/>"})," over manual history calls."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(s.InlineCode,{children:"<NavLink/>"})," for active states."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep routes ",e.jsx("em",{children:"kebab-case"})," and predictable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," reload the page for internal navigation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," make non-semantic elements clickable for navigation."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Path"}),": the pathname portion of the URL (no query/hash)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Param"}),": a dynamic portion of a path (",e.jsx(s.InlineCode,{children:":id"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Search params"}),": query string (e.g., ",e.jsx(s.InlineCode,{children:"?q=react"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hash"}),": in-page fragment (e.g., ",e.jsx(s.InlineCode,{children:"#section-2"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Navigate"}),": programmatic route change via ",e.jsx(s.InlineCode,{children:"useNavigate"}),"."]})]})]}),e.jsxs(s.Callout,{children:["Summary: declare routes, link with ",e.jsx("i",{children:"Link/NavLink"}),", read params with ",e.jsx("i",{children:"useParams"}),", and use ",e.jsx("i",{children:"useNavigate"})," when you must redirect from code. Keep URLs clean and semantic."]})]});export{r as default};
