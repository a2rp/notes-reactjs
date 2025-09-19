import{j as e}from"./index-Der9nZEc.js";import{S as a}from"./styled-aAUh9la2.js";const i=()=>e.jsxs(a.Page,{children:[e.jsx(a.Title,{children:"Pagination"}),e.jsxs(a.Lead,{children:[e.jsx("b",{children:"Pagination"})," is the technique of splitting a long list of items into smaller, numbered pages, with controls to navigate between them. It improves performance, reduces clutter, and gives users a sense of position and progress."]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Key Definitions"}),e.jsxs(a.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Page:"})," A numbered slice of the total results. Often 1-based for users (page 1, 2, 3...)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Page size (pageSize):"})," How many items to show per page (e.g., 10, 20, 50)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Current page (page):"})," Which page the user is viewing right now."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Total items (total):"})," How many items exist in the full list."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Total pages:"})," ",e.jsx(a.InlineCode,{children:"Math.ceil(total / pageSize)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Offset pagination:"})," Use ",e.jsx(a.InlineCode,{children:"offset = (page - 1) * pageSize"})," to fetch a slice (SQL ",e.jsx("code",{children:"LIMIT"}),"/",e.jsx("code",{children:"OFFSET"})," style)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cursor pagination:"})," Use a ",e.jsx("i",{children:"cursor"})," (e.g., last item ID) to fetch the next slice—stable for live/large data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Client pagination:"})," Paginate in the browser after loading all data (simple, but memory-heavy)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Server pagination:"})," Ask the server for each page (scalable, common for real apps)."]})]})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Basic Math & State"}),e.jsx(a.Pre,{children:`// Given total, pageSize, page (1-based)
const totalPages = Math.max(1, Math.ceil(total / pageSize));
const canPrev = page > 1;
const canNext = page < totalPages;`}),e.jsxs(a.Small,{children:["Keep the page number ",e.jsx("b",{children:"1-based"})," for users. Internally you can map to 0-based if needed, but be consistent."]})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Minimum Viable Pagination (Client-side)"}),e.jsx(a.Pre,{children:`function usePagination({ total, pageSize = 10, initialPage = 1 } = {}) {
  const [page, setPage] = React.useState(initialPage);
  const totalPages = Math.max(1, Math.ceil((total ?? 0) / pageSize));

  const next = React.useCallback(() => setPage(p => Math.min(p + 1, totalPages)), [totalPages]);
  const prev = React.useCallback(() => setPage(p => Math.max(p - 1, 1)), []);
  const goto = React.useCallback((n) => setPage(() => Math.min(Math.max(1, n), totalPages)), [totalPages]);

  return { page, pageSize, totalPages, next, prev, goto };
}

function PaginatedList({ items = [], pageSize = 5 }) {
  const total = items.length;
  const { page, totalPages, next, prev, goto } = usePagination({ total, pageSize, initialPage: 1 });

  const start = (page - 1) * pageSize;
  const pageItems = items.slice(start, start + pageSize);

  return (
    <>
      <ul>{pageItems.map((it) => <li key={it.id}>{it.name}</li>)}</ul>
      <nav aria-label="Pagination" className="pagination">
        <button onClick={prev} disabled={page === 1} aria-label="Previous page">Prev</button>
        {Array.from({ length: totalPages }, (_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              onClick={() => goto(n)}
              aria-current={page === n ? "page" : undefined}
            >
              {n}
            </button>
          );
        })}
        <button onClick={next} disabled={page === totalPages} aria-label="Next page">Next</button>
      </nav>
      <p>Page {page} of {totalPages}</p>
    </>
  );
}`}),e.jsx(a.Small,{children:"This is a client-side example. For real data, prefer server pagination to avoid loading everything at once."})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Server Pagination Pattern"}),e.jsxs(a.List,{children:[e.jsxs("li",{children:["Send ",e.jsx("b",{children:"page"})," and ",e.jsx("b",{children:"pageSize"})," (or ",e.jsx("b",{children:"cursor"}),") to the server."]}),e.jsxs("li",{children:["Server returns items plus ",e.jsx("b",{children:"total"})," (for offset) or a ",e.jsx("b",{children:"nextCursor"})," (for cursor)."]}),e.jsxs("li",{children:["Render items; enable/disable controls based on ",e.jsx("b",{children:"totalPages"})," or presence of ",e.jsx("b",{children:"nextCursor"}),"."]})]}),e.jsx(a.Pre,{children:`// Offset-based fetcher (simplified)
async function fetchPage({ page, pageSize }) {
  const params = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
  const res = await fetch(\`/api/items?\${params}\`);
  if (!res.ok) throw new Error("Failed");
  return res.json(); // { items, total }
}

function ServerPaginatedList({ pageSize = 10 }) {
  const [page, setPage] = React.useState(1);
  const [data, setData] = React.useState({ items: [], total: 0, loading: false, error: null });

  React.useEffect(() => {
    let cancelled = false;
    setData((d) => ({ ...d, loading: true, error: null }));
    fetchPage({ page, pageSize })
      .then((r) => !cancelled && setData({ items: r.items, total: r.total, loading: false, error: null }))
      .catch((e) => !cancelled && setData((d) => ({ ...d, loading: false, error: e })));
    return () => { cancelled = true; };
  }, [page, pageSize]);

  const totalPages = Math.max(1, Math.ceil(data.total / pageSize));

  return (
    <>
      {data.loading && <p>Loading…</p>}
      {data.error && <p role="alert">Error: {String(data.error)}</p>}
      <ul>{data.items.map((it) => <li key={it.id}>{it.name}</li>)}</ul>
      <nav aria-label="Pagination">
        <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
        <span aria-live="polite">Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
      </nav>
    </>
  );
}`}),e.jsxs(a.Small,{children:["For fast-moving data (feeds), use ",e.jsx("b",{children:"cursor pagination"})," instead of offsets to avoid duplicates/missing rows."]})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Page Size Selector"}),e.jsx(a.Pre,{children:`function PageSizeSelect({ value, onChange, options = [5, 10, 20, 50] }) {
  return (
    <label>
      Page size:
      <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map((n) => <option key={n} value={n}>{n}</option>)}
      </select>
    </label>
  );
}`}),e.jsx(a.Small,{children:"When the page size changes, reset to page 1 (or recalc to keep the first item visible)."})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Sync With URL (Query Params)"}),e.jsxs(a.List,{children:[e.jsxs("li",{children:["Keep ",e.jsx("b",{children:"page"})," and ",e.jsx("b",{children:"pageSize"})," in the URL so refresh/share preserves state."]}),e.jsx("li",{children:"Read on mount → write on change."})]}),e.jsx(a.Pre,{children:`import { useSearchParams } from "react-router-dom";

function usePageParams({ defaultPage = 1, defaultSize = 10 } = {}) {
  const [params, setParams] = useSearchParams();
  const page = Number(params.get("page") || defaultPage);
  const pageSize = Number(params.get("size") || defaultSize);

  const setPage = (p) => setParams(prev => { prev.set("page", String(p)); prev.set("size", String(pageSize)); return prev; });
  const setPageSize = (s) => setParams(prev => { prev.set("page", String(1)); prev.set("size", String(s)); return prev; });

  return { page, pageSize, setPage, setPageSize };
}`})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Accessibility & UX"}),e.jsxs(a.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:'Use a <nav aria-label="Pagination">'})," wrapper for controls."]}),e.jsxs("li",{children:[e.jsx("b",{children:'Use aria-current="page"'})," on the active page button/link."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard:"})," Ensure buttons are focusable; support Enter/Space on clickables."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Visible state:"})," Disable Prev on page 1 and Next on last page; provide live region updates for screen readers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hit targets:"})," Keep buttons large enough (at least ~40px tap area)."]})]})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Patterns & Tips"}),e.jsxs(a.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Windowed pagination:"})," Show a few numbers around the current page (e.g., 1 … 8 9 ",e.jsx("u",{children:"10"})," 11 12 … 42)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Persist user choice:"})," Save last selected ",e.jsx("i",{children:"pageSize"})," in localStorage."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Empty states:"})," If total=0, hide controls and show a friendly “No results”."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Loading states:"})," Disable controls while loading to prevent double fetches."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Error states:"})," Keep the current page visible; allow retry."]})]}),e.jsx(a.Pre,{children:`function pageWindow({ page, totalPages, radius = 2 }) {
  const pages = [];
  const start = Math.max(1, page - radius);
  const end = Math.min(totalPages, page + radius);
  for (let n = start; n <= end; n++) pages.push(n);
  return pages;
}`})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Do & Don't"}),e.jsxs(a.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep state in URL for shareability."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," reset page to 1 when filters or search change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," prefer cursor pagination for endless feeds/real-time lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," fetch all data just to paginate on the client for large datasets."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mix 0-based and 1-based indexing—pick one and stick to it."]})]})]}),e.jsxs(a.Section,{children:[e.jsx(a.H2,{children:"Glossary"}),e.jsxs(a.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Offset:"})," Number of items to skip before returning results."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cursor:"})," Token/identifier pointing to a position in the dataset (stable across inserts/deletes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Windowed page numbers:"})," Showing only a subset of pages around the current page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Endless scrolling:"})," Load more on scroll; a cousin of pagination (often cursor-based under the hood)."]})]})]}),e.jsxs(a.Callout,{children:["Summary: choose ",e.jsx("b",{children:"client"})," pagination for tiny datasets and demos; choose ",e.jsx("b",{children:"server"})," or ",e.jsx("b",{children:"cursor"})," pagination for real apps. Keep state in the URL, handle loading/error/empty states, and make navigation accessible."]})]});export{i as default};
