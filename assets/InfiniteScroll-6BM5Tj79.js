import{j as e}from"./index-BUVRD3Bm.js";import{S as t}from"./styled-fEcCvENa.js";const n=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Infinite Scroll"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Infinite scroll"}),' is a pattern where new items are fetched and appended as the user nears the end of a list—no manual pagination UI. It reduces clicks and keeps users "in flow," but requires careful ',e.jsx("i",{children:"fetching, caching, performance"}),", and ",e.jsx("i",{children:"accessibility"}),"."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Key Definitions (Read First)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Pagination"}),": Loading lists in parts (pages) instead of everything at once."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Offset pagination"}),": The server takes ",e.jsx(t.InlineCode,{children:"?page=3&limit=20"})," or"," ",e.jsx(t.InlineCode,{children:"?offset=60"}),". Simple but can miss or duplicate items if new data arrives between requests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cursor pagination"}),": The server returns a ",e.jsx("i",{children:"cursor"})," (e.g.,"," ",e.jsx(t.InlineCode,{children:"nextCursor"}),") to fetch the next slice. More reliable for real-time feeds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sentinel"}),": A tiny, invisible element at the list's end that, when visible in the viewport, triggers fetching more items."]}),e.jsxs("li",{children:[e.jsx("b",{children:"IntersectionObserver (IO)"}),": Browser API that tells you when an element enters/leaves the viewport—great for sentinels. Doesn't run every scroll tick (efficient)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Virtualization / Windowing"}),": Rendering only the visible rows (e.g., via ",e.jsx("i",{children:"react-window"}),") to keep the DOM small and fast."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backpressure"}),": Preventing overlapping or too-frequent loads (don't fetch page 4 while page 3 is still loading)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dedupe"}),": Avoid adding the same item twice across pages (use stable ",e.jsx(t.InlineCode,{children:"id"})," keys)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache key"}),": The string/tuple that identifies a request in a cache layer (e.g., ",e.jsx(t.InlineCode,{children:'["posts", page]'}),")."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pattern A — IntersectionObserver (Preferred)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Attach an IO to a bottom ",e.jsx("b",{children:"sentinel"}),"."]}),e.jsxs("li",{children:["When the sentinel intersects and you have ",e.jsx("b",{children:"more"})," data, fetch the next page."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"AbortController"})," to cancel stale requests when triggers overlap."]}),e.jsxs("li",{children:["Guard against multiple triggers while a page is loading (",e.jsx("b",{children:"backpressure"}),")."]})]}),e.jsx(t.Pre,{children:`function useInfiniteList({ pageSize = 20 } = {}) {
  const [items, setItems] = React.useState([]);
  const [page, setPage] = React.useState(0);          // 0-based page index
  const [hasMore, setHasMore] = React.useState(true); // becomes false on last page
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const abortRef = React.useRef(null);

  const fetchPage = React.useCallback(async (nextPage) => {
    if (loading || !hasMore) return;          // backpressure
    setLoading(true); setError(null);

    // cancel any in-flight request
    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const res = await fetch(
        \`/api/posts?page=\${nextPage}&limit=\${pageSize}\`,
        { signal: ac.signal }
      );
      if (!res.ok) throw new Error(\`HTTP \${res.status}\`);
      const data = await res.json();          // { items: [], total: 123 } or { items: [], hasMore: true }
      
      // Basic last-page detection:
      const newItems = data.items ?? [];
      setItems(prev => {
        // optional dedupe by id:
        const map = new Map(prev.map(x => [x.id, x]));
        newItems.forEach(x => map.set(x.id, x));
        return Array.from(map.values());
      });

      setPage(nextPage);
      const reachedEnd = newItems.length < pageSize || data.hasMore === false;
      setHasMore(!reachedEnd);
    } catch (err) {
      if (err.name !== "AbortError") setError(err);
    } finally {
      setLoading(false);
    }
  }, [pageSize, loading, hasMore]);

  React.useEffect(() => {
    // initial load
    if (items.length === 0) fetchPage(0);
    return () => abortRef.current?.abort();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { items, page, hasMore, loading, error, fetchNext: () => fetchPage(page + 1) };
}

function Feed() {
  const { items, hasMore, loading, error, fetchNext } = useInfiniteList({ pageSize: 20 });
  const sentinelRef = React.useRef(null);

  React.useEffect(() => {
    if (!hasMore || loading) return;
    if (!("IntersectionObserver" in window)) return; // let fallback handle it

    const node = sentinelRef.current;
    if (!node) return;

    const io = new IntersectionObserver((entries) => {
      const first = entries[0];
      if (first.isIntersecting) fetchNext();
    }, { root: null, rootMargin: "300px 0px", threshold: 0 }); // prefetch ~300px early

    io.observe(node);
    return () => io.disconnect();
  }, [hasMore, loading, fetchNext]);

  return (
    <div>
      <ul>
        {items.map(post => <li key={post.id}>{post.title}</li>)}
      </ul>

      {/* Load status / retry */}
      {error && <p role="alert">Failed to load. <button onClick={fetchNext}>Retry</button></p>}
      {loading && <p aria-live="polite">Loading…</p>}

      {/* Sentinel: only render when more to load */}
      {hasMore && <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />}
    </div>
  );
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Tip:"})," Use a generous ",e.jsx(t.InlineCode,{children:"rootMargin"})," (e.g.,"," ",e.jsx(t.InlineCode,{children:'"300px"'}),") to prefetch before the user hits the end."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pattern B — Window Scroll Fallback"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Works when ",e.jsx(t.InlineCode,{children:"IntersectionObserver"})," isn't available."]}),e.jsx("li",{children:"Throttle to ~200ms to avoid running on every pixel of scroll."}),e.jsxs("li",{children:['Check "distance to bottom ≤ threshold" to trigger ',e.jsx("i",{children:"fetchNext"}),"."]})]}),e.jsx(t.Pre,{children:`function useNearBottom(threshold = 300) {
  const [near, setNear] = React.useState(false);

  React.useEffect(() => {
    let ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        const distFromBottom = scrollHeight - (scrollTop + clientHeight);
        setNear(distFromBottom <= threshold);
        ticking = false;
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return near;
}

function FeedFallback() {
  const { items, hasMore, loading, error, fetchNext } = useInfiniteList({ pageSize: 20 });
  const nearBottom = useNearBottom(300);

  React.useEffect(() => {
    if (nearBottom && hasMore && !loading) fetchNext();
  }, [nearBottom, hasMore, loading, fetchNext]);

  return /* ...same list as above... */;
}`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Note:"})," The IO pattern is more efficient and accurate; use the scroll fallback only when needed."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Cursor-Based Pagination (Recommended for Feeds)"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Server returns ",e.jsx(t.InlineCode,{children:"{ items, nextCursor }"}),". If"," ",e.jsx(t.InlineCode,{children:"nextCursor"})," is ",e.jsx("i",{children:"null"}),", you're at the end."]}),e.jsx("li",{children:"More robust than offsets when new items are inserted on the server between requests."})]}),e.jsx(t.Pre,{children:`async function fetchByCursor(cursor) {
  const url = cursor ? \`/api/posts?cursor=\${cursor}\` : "/api/posts";
  const res = await fetch(url);
  if (!res.ok) throw new Error("HTTP " + res.status);
  return res.json(); // { items: [...], nextCursor: "abc" | null }
}

function useCursorFeed() {
  const [state, setState] = React.useState({ items: [], cursor: null, done: false, loading: false, error: null });

  const loadMore = React.useCallback(async () => {
    if (state.loading || state.done) return;
    setState(s => ({ ...s, loading: true, error: null }));
    try {
      const data = await fetchByCursor(state.cursor);
      setState(s => ({
        items: [...s.items, ...data.items],
        cursor: data.nextCursor,
        done: data.nextCursor == null,
        loading: false,
        error: null
      }));
    } catch (e) {
      setState(s => ({ ...s, loading: false, error: e }));
    }
  }, [state.cursor, state.loading, state.done]);

  React.useEffect(() => { if (state.items.length === 0) loadMore(); }, []); // initial
  return { ...state, loadMore };
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"UX & Accessibility"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Show ",e.jsx("b",{children:"skeletons/spinners"})," for the new page, not the entire list."]}),e.jsxs("li",{children:["Use ",e.jsx(t.InlineCode,{children:'aria-live="polite"'}),' near the list to announce "Loading…" and "Loaded N items".']}),e.jsx("li",{children:`Keep focus stable. Don't steal focus when new items mount; use anchors or a "Back to top" button.`}),e.jsxs("li",{children:["Provide an alternate ",e.jsx("b",{children:'"Load more"'})," button for keyboard/screen-reader users (or when autoscan fails)."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Performance"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Virtualize"})," long lists (e.g., react-window) to render only visible rows."]}),e.jsxs("li",{children:["Avoid heavy per-item components; memoize row components by ",e.jsx(t.InlineCode,{children:"id"}),"."]}),e.jsxs("li",{children:["Batch state updates (React already batches in events). Keep ",e.jsx("i",{children:"items"})," immutable."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"rootMargin"})," to prefetch early; keep ",e.jsx("b",{children:"threshold"})," at 0 for simple triggers."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Pitfalls & How to Avoid Them"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Duplicate items"}),": dedupe by ",e.jsx(t.InlineCode,{children:"id"})," when merging pages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Endless refetch loop"}),": don't call ",e.jsx("i",{children:"fetchNext"})," while ",e.jsx("i",{children:"loading"})," or when ",e.jsx("i",{children:"hasMore"})," is false."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Races & cancelled pages"}),": use ",e.jsx("b",{children:"AbortController"})," and ignore ",e.jsx("b",{children:"AbortError"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scroll jump on refresh"}),": preserve scroll position or use virtualization with stable item heights."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SEO"}),": infinite scroll is JS-driven; provide paginated routes or server rendering for crawlable archives."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Peek: Infinite Scroll with TanStack Query"}),e.jsxs(t.Small,{children:["You'll cover this deeply in ",e.jsx("i",{children:"tanstack-query"}),", but here's the shape:"]}),e.jsx(t.Pre,{children:`// queryFn returns { items, nextCursor }
function usePostsInfinite() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam }) => fetchByCursor(pageParam),
    initialPageParam: null, // start cursor
    getNextPageParam: (lastPage) => lastPage.nextCursor, // null => done
  });
}

// In component:
// const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = usePostsInfinite();
// const items = data?.pages.flatMap(p => p.items) ?? [];`})]}),e.jsxs(t.Callout,{children:[e.jsx("b",{children:"Summary:"}),' Prefer IntersectionObserver with a sentinel, use cursor pagination if possible, guard against overlapping loads, and virtualize long lists. Add accessible status messages and a fallback "Load more" button for a resilient UX.']})]});export{n as default};
