import{j as e}from"./index-BExKNf87.js";import{S as s}from"./styled-DvGndQe2.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Route Params"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Route params"})," are ",e.jsx("em",{children:"dynamic segments"})," in a route path (e.g., ",e.jsx(s.InlineCode,{children:"/users/:userId"}),") that capture values from the URL ",e.jsx("b",{children:"pathname"}),". In React Router, matched values are read with ",e.jsx(s.InlineCode,{children:"useParams()"})," as strings."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Key Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Pathname:"})," the path part of the URL (e.g., ",e.jsx(s.InlineCode,{children:"/users/42"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Segment:"})," a section of the path between slashes (e.g., ",e.jsx(s.InlineCode,{children:"users"}),", ",e.jsx(s.InlineCode,{children:"42"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Route param:"})," a dynamic segment declared with a leading colon (e.g., ",e.jsx(s.InlineCode,{children:":userId"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Query/search params:"})," the ",e.jsx(s.InlineCode,{children:"?key=value"})," part of the URL. ",e.jsx("b",{children:"Not"})," the same as route params; read via ",e.jsx(s.InlineCode,{children:"useSearchParams()"}),"."]}),e.jsxs("li",{children:[e.jsxs("b",{children:["Splat (",e.jsx(s.InlineCode,{children:"*"}),")"]}),": a catch-all segment that matches “the rest” of the path (read from param named ",e.jsx(s.InlineCode,{children:'"*"'}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Declare & Read Route Params"}),e.jsx(s.Pre,{children:`// routes
<Route path="/users/:userId" element={<UserDetail />} />

// component
import { useParams } from "react-router-dom";

function UserDetail() {
  const { userId } = useParams();           // always a string
  const id = Number(userId);                // cast if you need a number

  // Fetch or render with the id...
  return <p>User ID: {id}</p>;
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Note:"})," ",e.jsx(s.InlineCode,{children:"useParams()"})," returns URL-decoded strings. Convert types yourself (",e.jsx(s.InlineCode,{children:"Number()"}),", ",e.jsx(s.InlineCode,{children:"Boolean()"}),", JSON parse, etc.)."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Nested Routes & Multiple Params"}),e.jsx(s.Pre,{children:`// routes
<Route path="/orgs/:orgId" element={<OrgLayout />}>
  <Route path="projects/:projectId" element={<ProjectDetail />} />
</Route>

// child sees both params
import { useParams } from "react-router-dom";
function ProjectDetail() {
  const { orgId, projectId } = useParams();
  return <p>Org: {orgId} · Project: {projectId}</p>;
}`}),e.jsxs(s.Small,{children:["Params from parent routes are ",e.jsx("b",{children:"merged"})," with child params when reading via ",e.jsx(s.InlineCode,{children:"useParams()"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Linking to Routes with Params"}),e.jsx(s.Pre,{children:`import { Link, generatePath } from "react-router-dom";

function UserLink({ id }) {
  const to = generatePath("/users/:userId", { userId: String(id) });
  return <Link to={to}>Open User {id}</Link>;
}

// Or manually:
<Link to={"/users/" + encodeURIComponent(id)}>Open</Link>;`}),e.jsxs(s.Small,{children:[e.jsx(s.InlineCode,{children:"generatePath()"})," reduces typos and keeps paths in sync with your route definitions."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Catch-All (Splat) Params"}),e.jsx(s.Pre,{children:`// routes
<Route path="/files/*" element={<FileViewer />} />

// component
import { useParams } from "react-router-dom";
function FileViewer() {
  const { "*": path } = useParams();   // e.g., "docs/guide/intro.md"
  return <p>Path: {path}</p>;
}`}),e.jsx(s.Small,{children:"The splat captures any remaining segments (including slashes) as a single string."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Validating Params"}),e.jsxs(s.List,{children:[e.jsx("li",{children:"All params are strings—validate and coerce before using."}),e.jsxs("li",{children:["For numbers, check ",e.jsx(s.InlineCode,{children:"Number.isFinite(Number(v))"}),"."]}),e.jsx("li",{children:"For IDs with known shapes (e.g., UUID), validate with a regex and handle invalid cases (redirect or show 404)."})]}),e.jsx(s.Pre,{children:`import { useNavigate, useParams } from "react-router-dom";

function ProductPage() {
  const nav = useNavigate();
  const { productId } = useParams();
  if (!/^[a-z0-9-]+$/i.test(productId)) {
    nav("/not-found", { replace: true });
    return null;
  }
  // ...render valid product
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Route Params vs Search Params"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Route params:"})," part of the ",e.jsx("b",{children:"path"}),"; define ",e.jsx(s.InlineCode,{children:":param"})," in the route."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Search params:"})," part of the ",e.jsx("b",{children:"query string"})," after ",e.jsx(s.InlineCode,{children:"?"}),"; change independently without re-defining routes."]})]}),e.jsx(s.Pre,{children:`// Search params example:
import { useSearchParams } from "react-router-dom";

function Search() {
  const [sp, setSp] = useSearchParams();
  const q = sp.get("q") ?? "";
  return (
    <form onSubmit={(e) => { e.preventDefault(); setSp({ q }); }}>
      <input value={q} onChange={(e) => setSp({ q: e.target.value })} />
    </form>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Assuming numbers:"})," params are strings; always coerce if you need numeric logic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optional segments:"})," React Router doesn’t support optional segments in the path string; define separate routes or restructure."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Encoding:"})," when building URLs manually, ",e.jsx(s.InlineCode,{children:"encodeURIComponent()"})," values to avoid broken paths."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ambiguous routes:"})," design routes to avoid collisions (e.g., ",e.jsx(s.InlineCode,{children:"/users/new"})," vs ",e.jsx(s.InlineCode,{children:"/users/:userId"}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep param names descriptive (",e.jsx(s.InlineCode,{children:":userId"}),", ",e.jsx(s.InlineCode,{children:":slug"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," coerce and validate before using params in logic or network calls."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(s.InlineCode,{children:"generatePath()"})," or helper functions to create URLs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overload a single route with unrelated meanings—create clear routes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," confuse route params (path) with search params (query string)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"useParams():"})," hook to read matched route params as an object of strings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"generatePath():"})," helper that replaces ",e.jsx(s.InlineCode,{children:":param"})," placeholders with actual values to form a URL."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Splat:"})," a ",e.jsx(s.InlineCode,{children:"*"})," catch-all segment that captures the rest of the path."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Path matching:"})," how React Router decides which route best matches the current pathname."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Use ",e.jsx("b",{children:"route params"})," for entity identity (user, product, post). Read them with",e.jsx(s.InlineCode,{children:"useParams()"}),", validate/coerce types, and build links via",e.jsx(s.InlineCode,{children:"generatePath()"}),". Use ",e.jsx("b",{children:"search params"})," for user-controlled options (filters, sort, pagination)."]})]});export{i as default};
