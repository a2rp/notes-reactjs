import{j as e}from"./index-t22nWg0v.js";import{S as s}from"./styled-B6nJrukD.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Table (Data Table)"}),e.jsxs(s.Lead,{children:["A ",e.jsx("b",{children:"data table"})," displays structured, row-and-column information so users can scan, compare, and act on records. In React, build tables with ",e.jsx(s.InlineCode,{children:"<table>"})," semantics for accessibility, then add behavior (sorting, pagination) through state and props."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & Purpose"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Data table:"})," a grid with ",e.jsx("em",{children:"columns"})," (fields) and ",e.jsx("em",{children:"rows"})," (records) that supports scanning, comparison, and bulk actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use when:"})," the data is structured, needs column labels, and benefits from features like sort, filter, selection, or pagination."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid when:"})," you only need a simple list, gallery, or timeline-use ",e.jsx(s.InlineCode,{children:"<ul>"}),"/",e.jsx(s.InlineCode,{children:"<ol>"})," or cards instead."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Anatomy (Semantic Structure)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"<caption>"})," - short description of the table's purpose."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<thead><tr><th>"})," - column headers (use ",e.jsx(s.InlineCode,{children:'scope="col"'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<tbody><tr><td>"})," - data rows and cells."]}),e.jsxs("li",{children:[e.jsx("b",{children:"<tfoot>"})," - summary or totals (optional)."]})]}),e.jsx(s.Pre,{children:`function BasicTable({ rows }) {
  return (
    <table>
      <caption>Employees - active headcount (demo)</caption>
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Role</th>
          <th scope="col">Location</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.id}>
            <td>{r.name}</td>
            <td>{r.role}</td>
            <td>{r.city}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Example rows:
// const rows = [
//   { id: 1, name: "Aarav", role: "Frontend Engineer", city: "Bengaluru" },
//   { id: 2, name: "Meera", role: "Designer", city: "Pune" },
// ];`}),e.jsx(s.Small,{children:"Start semantic. Behavior comes next via React state."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Accessibility Essentials"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use real table elements:"})," ",e.jsx(s.InlineCode,{children:"<table>"}),", not divs. Screen readers rely on them."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Header scope:"})," add ",e.jsx(s.InlineCode,{children:'scope="col"'})," on column headers; ",e.jsx(s.InlineCode,{children:'scope="row"'})," if you use row headers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Caption:"})," describe the table's purpose succinctly using ",e.jsx(s.InlineCode,{children:"<caption>"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sortable headers:"})," reflect state with ",e.jsx(s.InlineCode,{children:'aria-sort="ascending|descending|none"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard:"})," ensure focus styles on interactive elements inside cells; don't trap focus."]})]}),e.jsx(s.Pre,{children:`// Example: sortable header with aria-sort
function SortHeader({ label, sortState, onSort }) {
  // sortState: "none" | "ascending" | "descending"
  return (
    <button
      type="button"
      aria-sort={sortState}
      onClick={onSort}
      // Visually show sort icon via CSS; keep button focusable
    >
      {label}
    </button>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Sorting (Controlled State)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Controlled state:"})," keep ",e.jsx("em",{children:"column"})," and ",e.jsx("em",{children:"direction"})," in React state, derive a sorted array via ",e.jsx(s.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable sort:"})," when values tie, preserve original order for predictable UX."]})]}),e.jsx(s.Pre,{children:`function useSort(initial = { column: null, dir: "none" }) {
  const [sort, setSort] = React.useState(initial);
  const toggle = (col) =>
    setSort((s) => {
      const dir = s.column !== col ? "ascending"
                : s.dir === "ascending" ? "descending"
                : s.dir === "descending" ? "none"
                : "ascending";
      return { column: dir === "none" ? null : col, dir };
    });
  return { sort, toggle };
}

function SortedRows({ rows, sort }) {
  return React.useMemo(() => {
    if (!sort.column || sort.dir === "none") return rows;
    const copy = [...rows];
    copy.sort((a, b) => {
      const av = a[sort.column]; const bv = b[sort.column];
      if (av === bv) return 0;
      const asc = av > bv ? 1 : -1;
      return sort.dir === "ascending" ? asc : -asc;
    });
    return copy;
  }, [rows, sort]);
}`}),e.jsxs(s.Small,{children:["Expose sort state to header cells; compute derived rows with ",e.jsx("code",{children:"useMemo"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Pagination (Client-Side)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why paginate:"})," reduce scroll fatigue and improve performance for medium-sized datasets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State:"})," keep ",e.jsx("em",{children:"page"})," and ",e.jsx("em",{children:"pageSize"})," in state; derive ",e.jsx("em",{children:"pageCount"})," and ",e.jsx("em",{children:"slice"}),"."]})]}),e.jsx(s.Pre,{children:`function usePagination(total, initial = { page: 1, pageSize: 10 }) {
  const [page, setPage] = React.useState(initial.page);
  const [pageSize, setPageSize] = React.useState(initial.pageSize);
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  return { page, setPage, pageSize, setPageSize, pageCount, range: [start, end] };
}

function Pager({ page, setPage, pageCount }) {
  return (
    <nav aria-label="Table pagination">
      <button onClick={() => setPage(1)} disabled={page === 1}>First</button>
      <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
      <span>{page} / {pageCount}</span>
      <button onClick={() => setPage(p => Math.min(pageCount, p + 1))} disabled={page === pageCount}>Next</button>
      <button onClick={() => setPage(pageCount)} disabled={page === pageCount}>Last</button>
    </nav>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Putting It Together (Sort + Paginate)"}),e.jsx(s.Pre,{children:`function DataTable({ rows }) {
  const { sort, toggle } = useSort();
  const sorted = SortedRows({ rows, sort });

  const { page, setPage, pageSize, setPageSize, pageCount, range } =
    usePagination(sorted.length, { page: 1, pageSize: 5 });

  const pageRows = sorted.slice(range[0], range[1]);

  return (
    <>
      <table>
        <caption>Employees</caption>
        <thead>
          <tr>
            <th scope="col">
              <button type="button" aria-sort={sort.column === "name" ? sort.dir : "none"} onClick={() => toggle("name")}>
                Name
              </button>
            </th>
            <th scope="col">
              <button type="button" aria-sort={sort.column === "role" ? sort.dir : "none"} onClick={() => toggle("role")}>
                Role
              </button>
            </th>
            <th scope="col">
              <button type="button" aria-sort={sort.column === "city" ? sort.dir : "none"} onClick={() => toggle("city")}>
                Location
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {pageRows.map((r) => (
            <tr key={r.id}>
              <td>{r.name}</td>
              <td>{r.role}</td>
              <td>{r.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 12 }}>
        <label>
          Rows per page{" "}
          <select value={pageSize} onChange={(e) => { const n = Number(e.target.value); setPage(1); setPageSize(n); }}>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>
        </label>
        <Pager page={page} setPage={setPage} pageCount={pageCount} />
      </div>
    </>
  );
}`}),e.jsx(s.Small,{children:"State is centralized in small hooks; the table remains semantic and accessible."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Row Selection (Checkboxes)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Indeterminate:"})," if some, but not all, rows are selected, reflect that on the header checkbox."]}),e.jsxs("li",{children:["Keep a ",e.jsx("em",{children:"Set"})," of selected row ids for O(1) checks."]})]}),e.jsx(s.Pre,{children:`function useSelection(ids = []) {
  const [sel, setSel] = React.useState(() => new Set());
  const allIds = React.useMemo(() => ids, [ids]);

  const toggle = (id) => setSel(s => {
    const n = new Set(s);
    n.has(id) ? n.delete(id) : n.add(id);
    return n;
  });

  const clear = () => setSel(new Set());
  const isAll = sel.size > 0 && sel.size === allIds.length;
  const isNone = sel.size === 0;
  const isIndeterminate = !isNone && !isAll;

  const toggleAll = () => setSel(s => (s.size === allIds.length ? new Set() : new Set(allIds)));
  return { sel, toggle, toggleAll, isAll, isIndeterminate };
}`}),e.jsx(s.Small,{children:"Expose just enough API for a table header and body checkboxes."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Responsive Patterns"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Horizontal scroll:"})," allow ",e.jsx("em",{children:"overflow-x"})," on small screens to preserve columns."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stacked cards:"})," at very small widths, you can present each row as a card where column labels become field labels-only if your use case requires it."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Column priority:"})," hide non-critical columns at narrow widths (if the table still makes sense)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Performance"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Virtualization:"})," for thousands of rows, render only what's visible with a windowing library. Keep the ",e.jsx("em",{children:"semantic"})," table if possible."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derived state:"})," compute sorted/filtered/paginated rows with ",e.jsx(s.InlineCode,{children:"useMemo"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Server features:"})," for very large data, push sorting/filtering/pagination to the server and stream results."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use semantic table elements and captions for context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," expose state (sort, page, selection) as props for reusability."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," reflect sorting in ",e.jsx(s.InlineCode,{children:"aria-sort"})," and visual affordances."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," nest interactive controls without keyboard focus order."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rebuild the world-compose tiny hooks like ",e.jsx(s.InlineCode,{children:"useSort"}),", ",e.jsx(s.InlineCode,{children:"usePagination"}),", ",e.jsx(s.InlineCode,{children:"useSelection"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Row:"})," one record in the dataset."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Column:"})," a field shared by all records (e.g., name, role)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Header Cell (th):"})," labels a column or a row; announces scope to assistive tech."]}),e.jsxs("li",{children:[e.jsx("b",{children:"aria-sort:"})," attribute that communicates the current sort state of a column."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pagination:"})," dividing data into pages to reduce cognitive and rendering load."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Virtualization:"})," rendering only visible rows for performance on large lists."]})]})]}),e.jsx(s.Callout,{children:"Summary: start with semantic HTML, layer controlled state for sort/paginate/select, and keep accessibility and performance in mind. A good table is predictable, keyboard-friendly, and fast."})]});export{i as default};
