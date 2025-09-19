import{j as e}from"./index-BrPsnAZM.js";import{S as t}from"./styled-ZMhke1T7.js";const s=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Nested Routes"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Nested routes"})," let your URL structure mirror your UI hierarchy. A parent route renders shared UI (nav, chrome, sidebars) and a placeholder called an ",e.jsx("b",{children:"Outlet"}),"; child routes render inside that outlet. This keeps layouts DRY and URLs predictable."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"What & Why"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Route tree:"})," a hierarchy of routes where children render within their parent’s UI. It models “pages within pages” (e.g., ",e.jsx("code",{children:"/dashboard/reports"})," lives under ",e.jsx("code",{children:"/dashboard"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Layout route:"})," a route whose element provides shared structure (header/sidebar) and renders"," ",e.jsx(t.InlineCode,{children:"<Outlet />"})," where children appear."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Outlet:"})," a placeholder component from React Router; the matching child route renders here."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Index route:"})," a child with no ",e.jsx("code",{children:"path"})," that renders when the parent path matches exactly (e.g., ",e.jsx("code",{children:"/dashboard"})," shows “Overview”)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Relative paths/links:"})," child ",e.jsx("code",{children:"path"})," values (no leading slash) and"," ",e.jsx(t.InlineCode,{children:'<Link to="child">'})," resolve relative to the parent."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dynamic segment:"})," a path token like ",e.jsx(t.InlineCode,{children:":reportId"})," that captures a piece of the URL (use ",e.jsx(t.InlineCode,{children:"useParams()"})," to read it)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pathless route:"})," a parent without a ",e.jsx("code",{children:"path"})," used to share layout/guards across a group."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Minimal Example"}),e.jsx(t.Pre,{children:`import { Routes, Route, Outlet, NavLink } from "react-router-dom";

function DashboardLayout() {
  return (
    <div className="layout">
      <aside className="sidebar">
        <NavLink to="" end>Overview</NavLink>
        <NavLink to="reports">Reports</NavLink>
      </aside>

      <main className="content">
        {/* Children render here */}
        <Outlet />
      </main>
    </div>
  );
}

function Overview() { return <h2>Overview</h2>; }
function ReportsList() { return <h2>Reports list</h2>; }

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Index child renders at /dashboard */}
        <Route index element={<Overview />} />
        {/* Child renders at /dashboard/reports */}
        <Route path="reports" element={<ReportsList />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<h2>Not Found</h2>} />
    </Routes>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Note:"})," the ",e.jsx(t.InlineCode,{children:"index"})," child has no ",e.jsx("code",{children:"path"}),"; it’s the default content for its parent."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Dynamic Segments & Detail Pages"}),e.jsx(t.Pre,{children:`import { useParams } from "react-router-dom";

function ReportsList() {
  const data = [{ id: "r-101", name: "Q1" }, { id: "r-102", name: "Q2" }];
  return (
    <ul>
      {data.map(r => (
        <li key={r.id}>
          {/* Relative link: resolves to /dashboard/reports/:id */}
          <NavLink to={r.id}>{r.name}</NavLink>
        </li>
      ))}
    </ul>
  );
}

function ReportDetail() {
  const { reportId } = useParams(); // "r-101"
  return <h3>Report: {reportId}</h3>;
}

// Route tree (excerpt)
<Route path="/dashboard" element={<DashboardLayout />}>
  <Route index element={<Overview />} />
  <Route path="reports" element={<ReportsLayout />}>
    <Route index element={<ReportsList />} />
    <Route path=":reportId" element={<ReportDetail />} />
  </Route>
</Route>

// Layout for nested "reports" section
function ReportsLayout() {
  return (
    <>
      <h2>Reports</h2>
      <Outlet />
    </>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Relative links:"})," ",e.jsxs(t.InlineCode,{children:["<NavLink to=","{r.id}"," />"]})," keeps URLs tidy and avoids hard-coding ",e.jsx("code",{children:"/dashboard/reports/..."}),"."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Index vs. Child Path"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Index route"})," = the default child for ",e.jsx("b",{children:"exact"})," parent match (no ",e.jsx("code",{children:"path"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Child path"})," = renders when URL continues past the parent (e.g.,"," ",e.jsx(t.InlineCode,{children:"/dashboard/reports"}),")."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"one"})," index route per parent; it should be the “landing” content of that section."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Navigation Patterns (Relative)"}),e.jsx(t.Pre,{children:`import { useNavigate } from "react-router-dom";

function ReportsToolbar() {
  const navigate = useNavigate();

  function openFirst() {
    // Push a child route relative to the current parent
    navigate("r-101");
  }

  function backToList() {
    // ".." goes up one level (from /dashboard/reports/r-101 -> /dashboard/reports)
    navigate("..");
  }

  return (
    <div>
      <button onClick={openFirst}>Open first</button>
      <button onClick={backToList}>Back</button>
    </div>
  );
}`}),e.jsxs(t.Small,{children:["Prefer relative ",e.jsx(t.InlineCode,{children:"to"}),"/",e.jsx(t.InlineCode,{children:"navigate()"})," to keep routes portable when parents move."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Sharing Data with Children (",e.jsx("code",{children:"useOutletContext"}),")"]}),e.jsx(t.Pre,{children:`import { Outlet, useOutletContext } from "react-router-dom";

function DashboardLayout() {
  const user = { name: "Ashish", role: "admin" };
  return (
    <div className="layout">
      {/* Provide context to descendants rendered by <Outlet /> */}
      <Outlet context={{ user }} />
    </div>
  );
}

function Overview() {
  const { user } = useOutletContext(); // { name, role }
  return <h2>Welcome, {user.name}</h2>;
}`}),e.jsxs(t.Small,{children:[e.jsx(t.InlineCode,{children:"useOutletContext"})," avoids prop drilling from a layout to its nested children in the same route branch."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pathless Parents & Guards"}),e.jsx(t.Pre,{children:`function RequireAuth() {
  const isAuthed = true; // replace with real auth check
  return isAuthed ? <Outlet /> : <p>Please sign in</p>;
}

<Routes>
  {/* Pathless parent groups protected routes without adding a segment */}
  <Route element={<RequireAuth />}>
    <Route path="/settings" element={<SettingsLayout />}>
      <Route index element={<Profile />} />
      <Route path="billing" element={<Billing />} />
    </Route>
  </Route>
</Routes>`}),e.jsxs(t.Small,{children:["A ",e.jsx("b",{children:"pathless route"})," wraps children with layout/guards but doesn’t change the URL."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don’t"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep URLs parallel to your UI hierarchy (predictable paths)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use an ",e.jsx(t.InlineCode,{children:"index"})," for default content at each section."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer relative ",e.jsx(t.InlineCode,{children:"to"})," and child ",e.jsx("code",{children:"path"})," (no leading slash)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," sprinkle duplicate nav/header across pages—use a layout route + ",e.jsx(t.InlineCode,{children:"Outlet"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," mix absolute and relative child paths arbitrarily; it’s a common source of 404s."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Common Pitfalls"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Adding a leading slash to a child ",e.jsx("code",{children:"path"})," (",e.jsx("b",{children:"absolute"}),"), which breaks nesting (it no longer renders inside the parent)."]}),e.jsxs("li",{children:["Forgetting ",e.jsx(t.InlineCode,{children:"<Outlet />"})," in the layout, so children never appear."]}),e.jsxs("li",{children:["Omitting a good ",e.jsx("b",{children:"index route"}),", leaving the parent path blank/awkward."]}),e.jsxs("li",{children:["Hard-coding full URLs in links; use ",e.jsx("b",{children:"relative"})," links so sections are portable."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Layout route:"})," shared UI wrapper for a branch that renders an ",e.jsx(t.InlineCode,{children:"Outlet"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Outlet:"})," placeholder where the matched child route renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Index route:"})," default child for the exact parent match."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dynamic segment:"})," a ",e.jsx(t.InlineCode,{children:":param"})," token in a path."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pathless route:"})," parent with no ",e.jsx("code",{children:"path"})," used to group/guard children."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Relative link:"})," a link or navigate call that resolves against the current route."]})]})]}),e.jsxs(t.Callout,{children:["Summary: build a clean route tree, put shared UI in a layout route, render children via",e.jsx(t.InlineCode,{children:" <Outlet />"}),", and use index routes + relative links to keep things portable and predictable."]})]});export{s as default};
