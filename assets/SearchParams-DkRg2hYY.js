import{u as t,a as i,j as e,L as c,c as r}from"./index-BRArnZ3i.js";import{S as s}from"./styled-Bzfr3a-s.js";const d=()=>{const a=t();return i(),e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Search Params (URL Query String)"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Search parameters"})," are the ",e.jsx(s.InlineCode,{children:"?key=value"})," pairs in a URL. In React Router, use ",e.jsx(s.InlineCode,{children:"useSearchParams()"})," to ",e.jsx("b",{children:"read"})," and ",e.jsx("b",{children:"update"})," them. This makes UI state shareable via the address bar (great for filters, pagination, tabs, and search)."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary (clear definitions)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"URL"}),": a web address (e.g., ",e.jsx(s.InlineCode,{children:"https://site.com/products?page=2&q=shoes"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Path"}),": the route portion (e.g., ",e.jsx(s.InlineCode,{children:"/products"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Search string"}),": everything after ",e.jsx(s.InlineCode,{children:"?"})," including the question mark (e.g., ",e.jsx(s.InlineCode,{children:"?page=2&q=shoes"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Query string / Search params"}),": the key–value pairs inside the search string (e.g., ",e.jsx(s.InlineCode,{children:"page=2"}),", ",e.jsx(s.InlineCode,{children:"q=shoes"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"URLSearchParams"}),": a web API for reading/writing query pairs, used by React Router under the hood."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Encoding"}),": special characters are percent-encoded (space → ",e.jsx(s.InlineCode,{children:"%20"}),"), handled for you by React Router."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Read search params"}),e.jsx(s.Pre,{children:`// Inside a component:
const [searchParams] = useSearchParams();

const page = Number(searchParams.get("page") ?? 1); // -> number (default 1)
const q = searchParams.get("q") ?? "";              // -> string (default "")
const tags = searchParams.getAll("tag");            // -> ["ui", "react"] if ?tag=ui&tag=react

// Always remember: values come as strings; you must cast (Number, Boolean, JSON.parse) if needed.`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Update search params (replace entire set)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx(s.InlineCode,{children:"setSearchParams(init, options?)"})," ",e.jsx("b",{children:"replaces"})," the current params by default."]}),e.jsxs("li",{children:["Pass an object or ",e.jsx(s.InlineCode,{children:"URLSearchParams"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx(s.InlineCode,{children:"{ replace: true }"})," to avoid pushing a new history entry."]})]}),e.jsx(s.Pre,{children:`// Replace current params with a new set
setSearchParams({ page: "2", q: "react" });                // pushes a new entry
setSearchParams({ page: "2", q: "react" }, { replace: true }); // replaces history (no back step)`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Merge with existing params (safe pattern)"}),e.jsx(s.Small,{children:'By default, updating replaces the entire query. To "merge", read the current params first:'}),e.jsx(s.Pre,{children:`// Merge pattern: read existing, write back updated
setSearchParams(prev => {
  const next = new URLSearchParams(prev);
  next.set("page", String(Number(prev.get("page") ?? 1) + 1));
  if (!next.get("q")) next.set("q", ""); // keep stable keys if you need them
  return next;
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Link to a page with search params"}),e.jsx(s.Pre,{children:`// 1) Hard-code:
<Link to="/routing/search-params?page=2&q=react">Page 2 (React)</Link>

// 2) Build with createSearchParams:
<Link
  to={{
    pathname: "/routing/search-params",
    search: \`?\${createSearchParams({ page: "2", q: "react" })}\`,
  }}
>
  Page 2 (React)
</Link>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Recipe: Sync a simple search form to the URL"}),e.jsx(s.Pre,{children:`function SearchFilters() {
  const [sp, setSp] = useSearchParams();
  const [q, setQ] = React.useState(sp.get("q") ?? "");
  const [page, setPage] = React.useState(Number(sp.get("page") ?? 1));

  // When user submits, write state -> URL
  function onSubmit(e) {
    e.preventDefault();
    const next = new URLSearchParams(sp);
    next.set("q", q);
    next.set("page", String(page));
    setSp(next); // push new entry
  }

  // Optional: whenever URL changes (back/forward), update local inputs
  React.useEffect(() => {
    setQ(sp.get("q") ?? "");
    setPage(Number(sp.get("page") ?? 1));
  }, [sp]);

  return (
    <form onSubmit={onSubmit}>
      <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search..." />
      <button type="button" onClick={() => setPage(p => Math.max(1, p - 1))}>Prev</button>
      <span>Page {page}</span>
      <button type="button" onClick={() => setPage(p => p + 1)}>Next</button>
      <button type="submit">Apply</button>
    </form>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Arrays & multi-select filters"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Repeated keys"}),": ",e.jsx(s.InlineCode,{children:"?tag=ui&tag=react"})," → use ",e.jsx(s.InlineCode,{children:'getAll("tag")'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Comma-separated"}),": ",e.jsx(s.InlineCode,{children:"?tags=ui,react"})," → split/join yourself. Simpler URL, but manual parsing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"JSON"}),": ",e.jsx(s.InlineCode,{children:"?filters=%7B...%7D"})," → powerful but less readable; ensure try/catch on parse."]})]}),e.jsx(s.Pre,{children:`// Repeated keys approach (recommended for filters):
const [sp, setSp] = useSearchParams();

// Read:
const selected = sp.getAll("tag"); // ["ui", "react"]

// Toggle a tag:
function toggle(tag) {
  const next = new URLSearchParams(sp);
  const list = new Set(next.getAll("tag"));
  if (list.has(tag)) list.delete(tag); else list.add(tag);
  next.delete("tag");
  for (const t of list) next.append("tag", t);
  setSp(next);
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"History behavior: push vs replace"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Push (default)"}),": adds a new entry; Back returns to previous filters."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Replace"}),": overwrites current entry; Back skips intermediate changes."]})]}),e.jsx(s.Pre,{children:`// Replace when updating "live" as user types, to avoid polluting history:
setSearchParams({ q: "react" }, { replace: true });`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Validation, defaults, and types"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Query values are ",e.jsx("b",{children:"strings"}),". Convert explicitly: ",e.jsx(s.InlineCode,{children:"Number()"}),", ",e.jsx(s.InlineCode,{children:"Boolean()"}),", custom parsers."]}),e.jsxs("li",{children:["Apply ",e.jsx("b",{children:"defaults"})," when a key is missing or invalid (e.g., page ",e.jsx(s.InlineCode,{children:"< 1"}),")."]}),e.jsxs("li",{children:["Strip ",e.jsx("b",{children:"empty"})," or ",e.jsx("b",{children:"unknown"})," keys when writing to keep URLs clean."]})]}),e.jsx(s.Pre,{children:`function getPage(sp) {
  const n = Number(sp.get("page"));
  return Number.isFinite(n) && n > 0 ? n : 1;
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Troubleshooting"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Nothing changes?"})," Ensure you call ",e.jsx(s.InlineCode,{children:"setSearchParams"})," with a new object or a new ",e.jsx(s.InlineCode,{children:"URLSearchParams"})," instance."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Weird characters?"})," They’re URL-encoded automatically. Log ",e.jsx(s.InlineCode,{children:"searchParams.toString()"})," to inspect."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State out of sync?"})," Either derive directly from ",e.jsx(s.InlineCode,{children:"searchParams"})," or mirror with an effect (see form recipe)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Quick Links (demo navigation)"}),e.jsxs(s.List,{children:[e.jsx("li",{children:e.jsxs(c,{to:{pathname:"/routing/search-params",search:`?${r({q:"react",page:"2"})}`},children:["Open: ",e.jsx(s.InlineCode,{children:"?q=react&page=2"})]})}),e.jsx("li",{children:e.jsx("a",{href:`?${r({tag:"ui",q:"buttons"})}`,onClick:n=>{n.preventDefault(),a({search:`?${r({tag:"ui",q:"buttons"})}`})},rel:"noopener noreferrer",children:"Navigate with tag + q (via navigate)"})})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don’t"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use search params for sharable UI state: filters, pagination, sorting, tabs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep URLs tidy—remove empty keys; use repeated keys for arrays."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," store sensitive data in the URL (tokens, emails, PII)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don’t"})," overuse JSON blobs if simple keys will do."]})]})]}),e.jsxs(s.Callout,{children:["Summary: ",e.jsx("b",{children:"Search params make state shareable"}),". Read with ",e.jsx(s.InlineCode,{children:"useSearchParams()"}),", update with ",e.jsx(s.InlineCode,{children:"setSearchParams()"}),", and choose ",e.jsx("i",{children:"push"})," vs ",e.jsx("i",{children:"replace"})," based on UX. Prefer repeated keys for arrays, validate inputs, and keep the URL clean."]})]})};export{d as default};
