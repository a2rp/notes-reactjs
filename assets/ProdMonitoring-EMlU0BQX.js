import{j as e}from"./index-BRArnZ3i.js";import{S as r}from"./styled-B0kPaGfM.js";const n=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Production Monitoring (React)"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Production monitoring"})," means continuously observing your live app to catch errors, performance regressions, outages, and UX issues before users are affected. In practice it combines ",e.jsx("i",{children:"logs"}),", ",e.jsx("i",{children:"metrics"}),", ",e.jsx("i",{children:"traces"}),", ",e.jsx("i",{children:"real-user data"}),",",e.jsx("i",{children:"synthetic checks"}),", and ",e.jsx("i",{children:"alerts"})," tied to clear reliability goals."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Why monitor? 3 concrete goals"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Detect"})," problems fast (errors, slow pages, downtime)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Diagnose"})," root cause (which release, which route, which API?)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Decide"})," actions (roll back, hotfix, raise an incident, adjust capacity)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Core concepts (clear definitions)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Log:"}),' timestamped text record of something that happened (e.g., "/api/cart 500").']}),e.jsxs("li",{children:[e.jsx("b",{children:"Metric:"})," a numeric time-series (e.g., error_rate=1.2%, LCP=2.4s)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Trace:"})," a request's path across services with spans/timings (helps find slow hop)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"RUM (Real User Monitoring):"})," data from real users in the field (Core Web Vitals, JS errors, device info)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Synthetic monitoring:"}),' scripted "robots" that visit pages or ping endpoints on a schedule to catch issues even when no users are active.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Uptime check:"}),' simple "is it up?" HTTP check for 200 OK.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Health check:"})," an endpoint that reports service health (e.g., dependencies OK, build info)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Alert:"})," an automated notification when a metric crosses a threshold (e.g., error_rate > 2%)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SLO/SLA:"}),' target reliability (e.g., "99.9% monthly uptime"); SLA is the external promise, SLO is the internal objective.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Core Web Vitals:"})," key UX metrics—",e.jsx("b",{children:"LCP"})," (loading), ",e.jsx("b",{children:"CLS"})," (visual stability), ",e.jsx("b",{children:"INP"})," (interactivity; replaced FID), plus ",e.jsx("b",{children:"TTFB"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Source maps:"})," files that map minified code to your source so stack traces are readable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Release tag:"})," a version label attached to errors/metrics so you can pinpoint which deploy introduced a problem."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"What to monitor in a React app"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"JavaScript errors"}),": runtime errors, unhandled promise rejections, React error boundaries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Performance"}),": Core Web Vitals (LCP/CLS/INP), TTFB, hydration time, route transition times."]}),e.jsxs("li",{children:[e.jsx("b",{children:"API calls"}),": failure rates, latency percentiles (p95/p99), timeouts, bad responses."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Availability"}),": uptime checks for the site and key APIs; status page."]}),e.jsxs("li",{children:[e.jsx("b",{children:"User flows"}),': synthetic checks for "Login → Dashboard," "Add to Cart → Pay," etc.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Releases"}),": which version is live, error rate by release."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Frontend-edge signals"}),": CDN cache hit ratio, 4xx/5xx by path, asset download errors."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Capturing errors (boundaries + global listeners)"}),e.jsx(r.Pre,{children:`// Error Boundary: catches render errors in its child tree
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // send to your logger/monitor here
    navigator.sendBeacon?.("/monitor/error", JSON.stringify({
      type: "render_error",
      message: error?.message,
      stack: error?.stack,
      info
    }));
  }

  render() {
    if (this.state.hasError) {
      return <div role="alert">Something went wrong. Please try again.</div>;
    }
    return this.props.children;
  }
}

// Global listeners: runtime errors & unhandled rejections
window.addEventListener("error", (e) => {
  navigator.sendBeacon?.("/monitor/error", JSON.stringify({
    type: "window_error",
    message: e.error?.message || e.message,
    stack: e.error?.stack,
    source: e.filename, line: e.lineno, col: e.colno
  }));
});

window.addEventListener("unhandledrejection", (e) => {
  navigator.sendBeacon?.("/monitor/error", JSON.stringify({
    type: "unhandled_rejection",
    reason: String(e.reason)
  }));
});`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Error Boundary"})," catches render errors; global listeners catch runtime errors and rejected promises.",e.jsx("b",{children:"sendBeacon"})," ships data reliably even during page unload."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Performance (Core Web Vitals)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"LCP"}),": time to largest element (image/text) becoming visible—keep <2.5s."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CLS"}),": sum of unexpected layout shifts—keep <0.1."]}),e.jsxs("li",{children:[e.jsx("b",{children:"INP"}),": overall interaction latency for clicks/typing—keep <200ms (good)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TTFB"}),": server response start—affects all downstream performance."]})]}),e.jsx(r.Pre,{children:`// Collect Web Vitals (client) and send to your endpoint
// npm i web-vitals
import { onLCP, onCLS, onINP, onTTFB } from "web-vitals";

function report(name, value, id) {
  const body = JSON.stringify({ name, value, id, url: location.href, ts: Date.now(), release: window.__BUILD_ID__ });
  navigator.sendBeacon?.("/monitor/vitals", body) || fetch("/monitor/vitals", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body
  });
}

onLCP((m) => report("LCP", m.value, m.id));
onCLS((m) => report("CLS", m.value, m.id));
onINP((m) => report("INP", m.value, m.id));
onTTFB((m) => report("TTFB", m.value, m.id));`}),e.jsx(r.Small,{children:"Store vitals as time-series (e.g., p50/p75/p95). Alert on regressions per route or per release."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"API monitoring (client-side)"}),e.jsx(r.Pre,{children:`// Wrap fetch to log failures & latency
export async function api(url, opts) {
  const start = performance.now();
  try {
    const res = await fetch(url, opts);
    const ok = res.ok;
    const latency = performance.now() - start;

    if (!ok) {
      navigator.sendBeacon?.("/monitor/api", JSON.stringify({
        url, status: res.status, latency, method: (opts?.method || "GET")
      }));
    }
    return res;
  } catch (err) {
    const latency = performance.now() - start;
    navigator.sendBeacon?.("/monitor/api", JSON.stringify({
      url, status: "network_error", latency, message: err?.message
    }));
    throw err;
  }
}`}),e.jsxs(r.Small,{children:["Record ",e.jsx("b",{children:"status"}),", ",e.jsx("b",{children:"latency"}),", and ",e.jsx("b",{children:"route"}),". Correlate spikes with deploys and traffic."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Releases & Source Maps"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Release tag:"})," embed a build ID (commit hash/CI run) in the page (e.g., ",e.jsx(r.InlineCode,{children:"window.__BUILD_ID__"}),"). Send it with every error/metric."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Source maps:"})," generate during build so stack traces de-minify to readable file/line."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Privacy:"})," upload source maps to your monitoring tool, avoid exposing them publicly."]})]}),e.jsx(r.Pre,{children:`// Vite tip (in build config): generate source maps for error de-minification
// export default defineConfig({ build: { sourcemap: true } })
//
// In index.html (injected by CI):
// <script>window.__BUILD_ID__ = "2025-09-19T12:34:56Z-commit_abcd1234";<\/script>`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Synthetic checks & Health endpoints"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Uptime check:"})," hit your home page and key routes every minute."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Journey checks:"})," script critical flows (login, add-to-cart, checkout) to run every 5-15 min."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Health endpoint:"})," backend route that returns dependency status, build, and time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Status page:"}),' public "current status" + incidents history for transparency.']})]}),e.jsx(r.Pre,{children:`// Example health response (server-side pseudo):
// GET /health -> { ok: true, build: __BUILD_ID__, db: "ok", cache: "ok", time: Date.now() }`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Alerts & SLOs (good defaults)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Error rate"})," > 1% for 5 min (per release) ⇒ alert."]}),e.jsxs("li",{children:[e.jsx("b",{children:"LCP p75"})," > 2.5s for 15 min (per route) ⇒ alert."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Uptime"})," < 99.9% monthly ⇒ incident review."]}),e.jsxs("li",{children:[e.jsx("b",{children:"APIs p95 latency"})," > 800ms for 10 min ⇒ alert."]})]}),e.jsx(r.Small,{children:'Start lenient; tighten after baseline is known. Always link alerts to runbooks ("what to do next").'})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Security & PII (don't leak data)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Scrub"})," emails, tokens, addresses from logs/errors before sending."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rate-limit"})," telemetry endpoints; accept only your domain (CORS)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Batch"})," non-urgent signals; prefer ",e.jsx(r.InlineCode,{children:"sendBeacon"})," to reduce user-visible overhead."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," tag data with release, route, and device; it makes triage 10× faster."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," ship source maps privately; de-minified stacks save hours."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"}),' add an Error Boundary high in the tree and per "risky" areas (editors, 3rd-party widgets).']}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," alert on single events; alert on rates and windows to avoid noise."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," log sensitive user data or full request bodies."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary (quick recap)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"p50/p75/p95/p99:"})," percentiles (e.g., p95 latency = 95% of requests are faster than this)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Anomaly detection:"})," automatic outlier detection versus a learned baseline."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Runbook:"})," documented steps to handle a specific alert (who, what, how)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"On-call:"})," rotation for handling alerts quickly at any hour."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Feature flag:"})," switch features on/off at runtime to mitigate incidents without redeploy."]})]})]}),e.jsxs(r.Callout,{children:[e.jsx("b",{children:"Bottom line:"})," measure what users feel (Web Vitals), catch what breaks (errors), and wire alerts to actions. Tag data with your release, keep source maps private, and use simple synthetic checks to catch issues before your users do."]})]});export{n as default};
