import{j as e}from"./index-ikndkUkk.js";import{S as i}from"./styled-DVYLSvwo.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Virtualization (Windowing)"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Virtualization"}),"-also called ",e.jsx("b",{children:"windowing"}),"-is a rendering technique where only the",e.jsx("i",{children:"visible"})," items (plus a small buffer) are mounted to the DOM. Instead of creating thousands of DOM nodes, you render just a “window” around the viewport. This drastically reduces memory and improves scroll performance for large lists, tables, and grids."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Concepts"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Viewport:"})," the currently visible scrollable area of a list or grid (what the user can see without scrolling)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Window (render window):"})," a set of items around the viewport that are rendered. Usually includes a small ",e.jsx("i",{children:"overscan"})," buffer above/below to avoid blank gaps while scrolling quickly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Overscan:"})," extra rows/columns rendered just outside the viewport to keep scrolling smooth. Larger overscan = smoother scroll but slightly more work."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cell measurement:"})," determining each item's size (fixed or dynamic). Accurate measurement avoids layout jumps during scroll."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Item key:"})," a stable identifier for each row/cell. Stable keys prevent expensive mounts/unmounts as the user scrolls."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Recycling:"})," reusing DOM nodes for scrolled-out items (handled internally by libs)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"When Should You Virtualize?"}),e.jsxs(i.List,{children:[e.jsx("li",{children:"Long lists/tables (hundreds to 100k+ items)."}),e.jsx("li",{children:"Grids with many cells (photo galleries, dashboards)."}),e.jsx("li",{children:"Any UI where full render causes sluggish scroll, high memory, or long TTI."})]}),e.jsx(i.Small,{children:"For small lists (e.g., < 100 items), plain rendering is usually simpler and fast enough."})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Example: Fixed-height List with ",e.jsx("code",{children:"react-window"})]}),e.jsx(i.Pre,{children:`// Install: npm i react-window
import { FixedSizeList as List } from "react-window";

const Row = React.memo(({ index, style, data }) => {
  // style is required: it positions the row for virtualization
  const item = data.items[index];
  return (
    <div style={style} data-index={index}>
      #{index} - {item.title}
    </div>
  );
});

export default function Messages({ items }) {
  return (
    <List
      height={480}          // viewport height
      itemCount={items.length}
      itemSize={44}         // fixed row height (px)
      width={"100%"}
      overscanCount={6}     // buffer above/below viewport
      itemData={{ items }}  // pass data to Row
    >
      {Row}
    </List>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Why this is fast:"})," Only ~20-40 rows exist in the DOM at once instead of thousands."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example: Variable-height Rows"}),e.jsx(i.List,{children:e.jsxs("li",{children:["Use ",e.jsx(i.InlineCode,{children:"VariableSizeList"})," when row heights differ (e.g., chat messages). You must provide a ",e.jsx("i",{children:"height getter"})," or measure rows and update sizes."]})}),e.jsx(i.Pre,{children:`import { VariableSizeList as List } from "react-window";

export function Chat({ messages }) {
  const listRef = React.useRef(null);
  const getSize = React.useCallback(
    (index) => Math.min(200, 24 + messages[index].text.length * 0.6), // naive estimate
    [messages]
  );

  return (
    <List
      ref={listRef}
      height={520}
      width={"100%"}
      itemCount={messages.length}
      itemSize={getSize}     // function: (index) => number
      overscanCount={8}
      itemKey={(index) => messages[index].id} // stable keys!
      itemData={{ messages }}
    >
      {({ index, style, data }) => (
        <div style={style}><b>{data.messages[index].author}:</b> {data.messages[index].text}</div>
      )}
    </List>
  );
}`}),e.jsxs(i.Small,{children:["For precise sizing, measure with ",e.jsx("b",{children:"ResizeObserver"})," or a library helper, then call"," ",e.jsx(i.InlineCode,{children:"listRef.current.resetAfterIndex(index)"})," when a row's height changes."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Example: Grid (Photos, Cards)"}),e.jsx(i.Pre,{children:`import { FixedSizeGrid as Grid } from "react-window";

export function PhotoGrid({ items, columnWidth = 220, rowHeight = 180 }) {
  const columns = Math.max(1, Math.floor(window.innerWidth / columnWidth));
  const rows = Math.ceil(items.length / columns);

  return (
    <Grid
      columnCount={columns}
      columnWidth={columnWidth}
      height={560}
      rowCount={rows}
      rowHeight={rowHeight}
      width={Math.min(window.innerWidth, columns * columnWidth)}
      overscanRowCount={3}
      overscanColumnCount={1}
      itemData={{ items, columns }}
    >
      {({ columnIndex, rowIndex, style, data }) => {
        const index = rowIndex * data.columns + columnIndex;
        const item = data.items[index];
        if (!item) return <div style={style} />;
        return (
          <div style={style}>
            <img src={item.src} alt={item.alt} loading="lazy" />
          </div>
        );
      }}
    </Grid>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Tip:"})," Combine virtualization with ",e.jsx("b",{children:"lazy-loaded images"})," (",e.jsx("i",{children:'loading="lazy"'}),") to minimize network + decode cost."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Pattern: Infinite Loading"}),e.jsx(i.List,{children:e.jsxs("li",{children:["Load the next page when the user scrolls near the end. With ",e.jsx("code",{children:"react-window"}),", you can use the companion ",e.jsx("code",{children:"react-window-infinite-loader"})," or your own logic via"," ",e.jsx("code",{children:"onItemsRendered"}),"."]})}),e.jsx(i.Pre,{children:`// npm i react-window react-window-infinite-loader
import { FixedSizeList as List } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

function Mailbox({ items, loadMore, hasNextPage }) {
  const itemCount = hasNextPage ? items.length + 1 : items.length;
  const isItemLoaded = (index) => index < items.length;

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMore}
      threshold={6} // start prefetching when 6 rows from the end
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={520}
          itemCount={itemCount}
          itemSize={48}
          width={"100%"}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {({ index, style }) =>
            isItemLoaded(index) ? (
              <div style={style}>Message {index}</div>
            ) : (
              <div style={style}>Loading…</div>
            )
          }
        </List>
      )}
    </InfiniteLoader>
  );
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Accessibility & UX"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Find-in-page:"})," browser search (",e.jsx("kbd",{children:"Ctrl/Cmd+F"}),") won't search items not in the DOM. Provide in-app search/filter or server-side search."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ARIA roles:"})," for listbox/table patterns, set proper roles and"," ",e.jsx(i.InlineCode,{children:"aria-rowcount"}),"/",e.jsx(i.InlineCode,{children:"aria-colcount"})," ","if needed so assistive tech knows the total size."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keyboard nav:"})," keep a stable tab order; maintain focus on item change. Scroll the active item into view programmatically when needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sticky headers/footers:"})," render outside the virtualized body; if inside, use the component's ",e.jsx(i.InlineCode,{children:"outerElementType"})," + CSS to pin."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Performance Tips"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Prefer fixed sizes"})," when possible (simpler math, fewer reflows). If variable, cache measurements and call reset methods when heights change."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoize rows/cells"})," (",e.jsx(i.InlineCode,{children:"React.memo"}),") and avoid recreating handlers; pass data via ",e.jsx(i.InlineCode,{children:"itemData"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Right-size overscan"}),": too small = blanking; too big = more work. Tune based on device and row size."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stable item keys"}),": use an ID, not the array index, especially with insertions/deletions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Avoid heavy content"})," in each row (e.g., big images, complex charts). Defer or progressively enhance."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," virtualize large collections; ",e.jsx("b",{children:"don't"})," virtualize tiny lists."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," combine with lazy images and request batching."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," expose in-app search; ",e.jsx("b",{children:"don't"})," rely on browser find for hidden items."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep keys stable; ",e.jsx("b",{children:"don't"})," mutate arrays without rekeying."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," test on low-end devices and long data sets."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Virtualization / Windowing:"})," render a subset of items near the viewport."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Viewport:"})," the visible scroll region of a list/grid."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Overscan:"})," buffer of off-screen items to prevent blanking during fast scroll."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cell measurement:"})," determining item size (fixed or dynamic) for layout."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Recycling:"})," reusing DOM nodes for scrolled-out items, reducing mounts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TTI (Time to Interactive):"})," how quickly the UI becomes usable after load."]})]})]}),e.jsx(i.Callout,{children:"Summary: Virtualization keeps UIs fast by rendering only what's visible. Use fixed sizes when you can, measure when you must, tune overscan, keep keys stable, and design with accessibility in mind (search, roles, focus)."})]});export{t as default};
