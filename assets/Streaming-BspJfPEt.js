import{j as e}from"./index-Der9nZEc.js";import{S as s}from"./styled-DH55dXYf.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Streaming (SSR & RSC)"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Streaming"})," sends HTML to the browser ",e.jsx("i",{children:"in chunks"})," as soon as parts are ready, instead of waiting for the entire page to render on the server. This improves perceived speed by lowering ",e.jsx(s.InlineCode,{children:"TTFB"})," and letting the browser start painting earlier—especially when parts of the page depend on slow data."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SSR (Server-Side Rendering):"})," HTML is rendered on the server and sent to the browser."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hydration:"})," the process where React attaches event handlers to already-rendered HTML so it becomes interactive."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Streaming SSR:"})," send the page HTML in ",e.jsx("i",{children:"chunks"})," (pieces) as different parts finish rendering on the server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense boundary:"})," a React component that declares “this part may wait.” With streaming, sections inside Suspense can arrive later."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TTFB (Time To First Byte):"})," how quickly the first bytes of the response reach the browser. Lower is better."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Progressive Hydration:"})," the browser hydrates parts of the page as they arrive/become ready, not all at once."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backpressure:"})," when the network or client can't consume data as fast as the server produces it; streaming APIs handle this gracefully."]}),e.jsxs("li",{children:[e.jsx("b",{children:"RSC (React Server Components):"})," components that run only on the server and can be streamed to the client with zero client JS for that part's rendering logic."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why Streaming Helps"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Faster first paint:"})," the browser can start parsing HTML/CSS earlier."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't block on slow bits:"})," expensive/slow data areas can appear later within a ",e.jsx("code",{children:"<Suspense>"})," boundary."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Smoother hydration:"})," break the work into islands so the main thread isn't jammed by a huge hydrate step."]})]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Example: React 18 Streaming SSR (Node, ",e.jsx("code",{children:"renderToPipeableStream"}),")"]}),e.jsx(s.Pre,{children:`// server.js (Express-style, Node streams)
// npm: react-dom/server
import express from "express";
import { renderToPipeableStream } from "react-dom/server";
import App from "./App.js";

const app = express();

app.get("*", (req, res) => {
  let didError = false;

  // Kick off streaming render
  const { pipe, abort } = renderToPipeableStream(
    <html>
      <head><title>Streaming Demo</title></head>
      <body>
        <div id="root">
          <App url={req.url} />
        </div>
        <script src="/client.js" defer><\/script>
      </body>
    </html>,
    {
      onShellReady() {
        // Shell = HTML up to the first Suspense boundaries is ready
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-Type", "text/html");
        pipe(res); // start streaming bytes to the client now
      },
      onShellError(err) {
        didError = true;
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/html");
        res.end("<!doctype html><p>Something went wrong</p>");
      },
      onAllReady() {
        // Everything (including all Suspense content) is ready
        // Optional: if you prefer to wait and send at once, you could end here.
      },
      onError(err) {
        didError = true;
        console.error("SSR error:", err);
      },
    }
  );

  // Safety timeout: if data is too slow, abort streaming
  setTimeout(() => abort(), 10000);
});

app.listen(3000);`}),e.jsxs(s.Small,{children:["The server sends an initial ",e.jsx("b",{children:"shell"})," quickly, then progressively streams in the slow sections. The client hydrates as chunks arrive, so parts become interactive sooner."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Suspense Boundaries & Progressive Rendering"}),e.jsx(s.Pre,{children:`// App.jsx (conceptual)
// Areas that fetch data can be wrapped in Suspense
import React, { Suspense } from "react";
import { ProductsGrid } from "./ProductsGrid"; // may suspend on data

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero /> {/* static, renders immediately */}
        <Suspense fallback={<SkeletonGrid />}>
          <ProductsGrid /> {/* streams in when ready */}
        </Suspense>
        <Suspense fallback={<ReviewsSkeleton />}>
          <Reviews /> {/* can stream later, independently */}
        </Suspense>
      </main>
      <Footer />
    </>
  );
}`}),e.jsxs(s.Small,{children:["Each ",e.jsx("code",{children:"<Suspense>"})," area can stream later without blocking the rest of the page."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Edge Environments (Web Streams, ",e.jsx("code",{children:"renderToReadableStream"}),")"]}),e.jsx(s.Pre,{children:`// Edge-style handler (e.g., Cloudflare/Workers), Web Streams API
import { renderToReadableStream } from "react-dom/server";
import App from "./App.js";

export default async function handleRequest(request) {
  const stream = await renderToReadableStream(<App url={new URL(request.url).pathname} />);
  // Wait for shell to be ready before returning (optional)
  await stream.allReady;
  return new Response(stream, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}`}),e.jsx(s.Small,{children:"Many edge runtimes prefer Web Streams. The concept is the same—send chunks as they're ready."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"SEO & Streaming (Quick Note)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SSR + streaming"})," still emits HTML. Search bots can index content that is present in the streamed HTML."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Critical content"})," should be server-rendered so it exists in the initial HTML stream. Avoid hiding essential text behind client-only code."]}),e.jsx("li",{children:"Meta tags should be in the initial shell (title, description, OG tags)."})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Streaming with RSC (React Server Components)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What it is:"})," RSC moves data-heavy rendering to the server and streams a lightweight “component payload” to the client."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Benefit:"})," zero client-side JS for server components, less bundle size, and faster interaction for heavy data UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How it streams:"})," frameworks (e.g., Next.js) use a protocol (often called “Flight”) to stream the RSC tree while the client hydrates client components."]})]}),e.jsx(s.Small,{children:"You can mix: stream the SSR shell, stream RSC payloads, then progressively hydrate client components."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," wrap slow sections in ",e.jsx(s.InlineCode,{children:"<Suspense>"})," with good skeleton fallbacks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," send a fast shell (header, hero, layout) so users see useful UI quickly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep critical meta tags in the shell for SEO and social previews."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block the whole page on a single slow query; split into multiple boundaries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," delay the first byte by doing all data first—stream what you can."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Single giant Suspense boundary:"})," if everything is inside one boundary, you lose granularity."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Client-only fallbacks that shift layout:"})," use skeletons with realistic dimensions to avoid CLS."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Forgetting error boundaries:"})," pair Suspense with error boundaries so failures don't blank the page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Large hydrate burst:"})," too many client components can still cause a big main-thread spike; consider more server components (RSC) or reduce client work."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Shell:"})," initial HTML frame that can be streamed quickly (header, layout, placeholders)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chunked transfer:"})," sending data in pieces over HTTP/1.1 or HTTP/2."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CLS (Cumulative Layout Shift):"})," visual movement while the page is loading; minimized with stable skeletons."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Island/partial hydration:"})," hydrating page regions independently as they arrive or become visible."]})]})]}),e.jsx(s.Callout,{children:"Summary: Streaming SSR lets users see and use parts of your app sooner. Combine Suspense boundaries, a fast shell, and thoughtful fallbacks. For even leaner bundles, blend streaming with React Server Components where appropriate."})]});export{n as default};
