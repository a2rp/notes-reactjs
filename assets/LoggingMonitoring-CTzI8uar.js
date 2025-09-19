import{j as e}from"./index-CDxhzYTb.js";import{S as r}from"./styled-BduBoJuN.js";const t=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Logging & Monitoring"}),e.jsxs(r.Lead,{children:[e.jsx("b",{children:"Logging"})," is recording facts about what the app did (events, errors, context).",e.jsx("b",{children:" Monitoring"})," is observing those logs/metrics over time to detect problems early and act. Together they give you visibility into crashes, failed API calls, and user-impacting issues."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Definitions & Goals"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Error:"})," A problem in code or the environment that prevents expected behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Exception:"})," A runtime error object thrown by JavaScript (e.g., ",e.jsx(r.InlineCode,{children:"throw new Error()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Handled error:"})," You anticipated it and responded (UI fallback, retry)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unhandled error:"})," It escaped code paths and bubbles to global handlers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Logging:"})," Persisting structured information about events (message, stack, context)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Monitoring:"})," Tracking rates/trends of errors/latency and alerting on thresholds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Telemetry:"})," Automatic capture of metrics (error rate, API failures, performance)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Observability:"})," Ability to answer “what's wrong?” using logs, metrics, and traces."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Breadcrumbs:"})," A recent trail of user actions/state (e.g., route changes, clicks) captured to give error context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Correlation/Trace ID:"})," An ID you attach to related logs (front-end ↔ back-end) to follow one request end-to-end."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"What should a front-end log?"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Error details:"})," name, message, stack, component/page/route."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Environment:"})," app version/commit, build date, feature flags."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Device:"})," OS, browser, viewport, timezone, locale (safe subset)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Network/API:"})," method, URL (redacted), status, duration, response size (approx)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Breadcrumbs:"})," last N user actions (route changed, clicked X, submitted Y)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"User context:"})," a hashed or anonymous ID (avoid raw PII)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Correlation ID:"})," pass the same ID in ",e.jsx(r.InlineCode,{children:"X-Request-Id"})," headers to backend."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Log levels (when to use what)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"debug"}),": noisy, for local dev or temporary diagnostics."]}),e.jsxs("li",{children:[e.jsx("b",{children:"info"}),": high-level app events (login succeeded, page loaded)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"warn"}),": unexpected but non-fatal (fallback used, retry scheduled)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"error"}),": a failure that impacted the user (unhandled rejection, API 500)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"fatal"}),": app can't continue (boot failed, essential resource missing)."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Structured logging (JSON)"}),e.jsx(r.Pre,{children:`// Keep a consistent schema. Avoid free-form strings only.
const log = {
  ts: new Date().toISOString(),
  level: "error",
  event: "api.request.failed",
  route: "/cart",
  message: "Add to cart failed",
  error: { name: "TypeError", message: "c is not a function", stack },
  http: { method: "POST", url: "/api/cart", status: 500, duration_ms: 812 },
  device: { ua: navigator.userAgent, viewport: [innerWidth, innerHeight] },
  app: { version: APP_VERSION, commit: APP_COMMIT },
  user: { id_anonymous: "6f2c...e9" },        // avoid raw PII
  trace: { id: "c2c5-...-a91" },
  breadcrumbs: [
    { t: -1200, type: "route", path: "/product/123" },
    { t: -800, type: "click", label: "AddToCart" }
  ]
};`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Privacy, Safety & Performance"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"PII redaction:"})," never log emails, phone numbers, addresses in clear text."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sampling:"})," send 100% of ",e.jsx("i",{children:"errors"}),", sample ",e.jsx("i",{children:"info/debug"})," (e.g., 10%)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rate limiting:"})," avoid flooding the server during loops/spikes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Compression/batching:"})," batch logs to reduce network overhead."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consent:"})," honor user consent and regional regulations."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Minimal Logger Utility"}),e.jsx(r.Pre,{children:`// logger.js (example shape)
// Usage: const logger = createLogger({ app: { version, commit } });

export function createLogger({ app, transport, sample = { debug: 0, info: 0.1, warn: 1, error: 1, fatal: 1 } } = {}) {
  const state = {
    app,
    breadcrumbs: [],
    traceId: crypto?.randomUUID?.() ?? String(Math.random()).slice(2),
  };

  function shouldSend(level) {
    const p = sample[level] ?? 1;
    return Math.random() < p;
  }

  function redact(obj) {
    // naive redaction for emails/phones inside strings
    const s = JSON.stringify(obj);
    const redacted = s
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.[A-Z]{2,}/gi, "[email]")
      .replace(/\\b\\+?\\d[\\d\\s()-]{7,}\\b/g, "[phone]");
    return JSON.parse(redacted);
  }

  function base(level, event, payload = {}) {
    return {
      ts: new Date().toISOString(),
      level,
      event,
      app: state.app,
      trace: { id: state.traceId },
      breadcrumbs: [...state.breadcrumbs],
      ...payload,
    };
  }

  async function send(level, event, payload) {
    const entry = redact(base(level, event, payload));
    if (!shouldSend(level)) return;
    try {
      if (transport) await transport(entry);
      else console[level === "debug" ? "log" : level]?.("[log]", entry);
    } catch { /* swallow */ }
  }

  const api = {
    addBreadcrumb(bc) {
      state.breadcrumbs.push({ ...bc, t: Date.now() });
      state.breadcrumbs = state.breadcrumbs.slice(-20);
    },
    setTrace(id) { state.traceId = id; },

    debug: (event, payload) => send("debug", event, payload),
    info:  (event, payload) => send("info",  event, payload),
    warn:  (event, payload) => send("warn",  event, payload),
    error: (event, payload) => send("error", payload?.event || event, payload),
    fatal: (event, payload) => send("fatal", payload?.event || event, payload),
  };

  // Global handlers
  if (typeof window !== "undefined") {
    window.addEventListener("error", (e) => {
      api.error("unhandled.error", {
        message: e?.message, 
        error: { name: e?.error?.name, message: e?.error?.message, stack: e?.error?.stack },
        where: "window.onerror",
      });
    });
    window.addEventListener("unhandledrejection", (e) => {
      const err = e?.reason instanceof Error ? e.reason : new Error(String(e?.reason));
      api.error("unhandled.rejection", {
        message: err.message,
        error: { name: err.name, message: err.message, stack: err.stack },
        where: "unhandledrejection",
      });
    });
  }

  return api;
}`}),e.jsxs(r.Small,{children:[e.jsx("b",{children:"Transport"})," is a function that actually ships the log (e.g., POST to ",e.jsx(r.InlineCode,{children:"/api/logs"}),").",e.jsx("b",{children:" Redaction"})," removes obvious PII patterns. For production, refine with stricter rules."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Transport (send logs to server)"}),e.jsx(r.Pre,{children:`// transport.js
export async function httpTransport(entry) {
  await fetch("/api/logs", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-Request-Id": entry?.trace?.id },
    body: JSON.stringify(entry),
    keepalive: true, // allows send during unload on some browsers
  });
}

// init
// const logger = createLogger({ app: { version: APP_VERSION }, transport: httpTransport });`})]}),e.jsxs(r.Section,{children:[e.jsxs(r.H2,{children:["Instrumenting ",e.jsx("code",{children:"fetch"})," (network breadcrumbs)"]}),e.jsx(r.Pre,{children:`// fetch-instrumentation.js
export function instrumentFetch(logger) {
  if (typeof window === "undefined" || !window.fetch) return;
  const orig = window.fetch;
  window.fetch = async (...args) => {
    const started = Date.now();
    const [input, init] = args;
    const method = (init?.method || "GET").toUpperCase();
    const url = typeof input === "string" ? input : input.url;

    try {
      const res = await orig(...args);
      const duration = Date.now() - started;
      const ev = res.ok ? "api.request.ok" : "api.request.failed";
      logger.info(ev, { http: { method, url, status: res.status, duration_ms: duration } });
      return res;
    } catch (error) {
      const duration = Date.now() - started;
      logger.error("api.request.error", {
        message: error?.message,
        error: { name: error?.name, message: error?.message, stack: error?.stack },
        http: { method, url, duration_ms: duration }
      });
      throw error;
    }
  };
}`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Wiring into a React app"}),e.jsx(r.Pre,{children:`// AppProviders.jsx (example)
import React from "react";
import { createLogger } from "./logger";
import { httpTransport } from "./transport";
import { instrumentFetch } from "./fetch-instrumentation";

export const LoggerContext = React.createContext(null);

export default function AppProviders({ children }) {
  const loggerRef = React.useRef(null);

  if (!loggerRef.current) {
    loggerRef.current = createLogger({
      app: { version: APP_VERSION, commit: APP_COMMIT },
      transport: httpTransport,
      sample: { debug: 0, info: 0.1, warn: 1, error: 1, fatal: 1 },
    });
    instrumentFetch(loggerRef.current);
  }

  // Example breadcrumbs: route changes, interactions
  React.useEffect(() => {
    function onClick(e) {
      const btn = e.target.closest("button, a");
      if (btn?.textContent) {
        loggerRef.current.addBreadcrumb({ type: "click", label: btn.textContent.trim() });
      }
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, []);

  return (
    <LoggerContext.Provider value={loggerRef.current}>
      {children}
    </LoggerContext.Provider>
  );
}`}),e.jsxs(r.Small,{children:["In pages/components you can call ",e.jsx(r.InlineCode,{children:"const logger = React.useContext(LoggerContext)"})," then",e.jsxs(r.InlineCode,{children:['logger.error("ui.failed", ',"{{message, error}}",")"]}),"."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Monitoring: what to watch & alert on"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"JS exception rate:"})," errors per 1,000 sessions (spikes mean new bug)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"API failure rate:"})," 4xx/5xx ratio per endpoint; alert on sustained 5xx > 2%."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cold start/boot failures:"})," bundle load errors, feature-flag misconfig."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retry storms:"})," repeated retry loops indicate user pain and server strain."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Geography/version skew:"})," errors isolated to one country/browser/app version."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," log errors with stack, route, and correlation ID."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," redact PII and sample non-critical logs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," batch/compress to save user bandwidth."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," log entire responses/bodies unless essential (and never raw secrets)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," rely on console alone; ship to a backend."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"PII:"})," Personally Identifiable Information (e.g., email, phone). Avoid logging raw PII."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sampling:"})," Sending only a fraction of certain log levels to control volume."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rate limiting:"})," Capping how many logs are sent per time window."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keepalive:"})," Allows requests to continue during page unload on some browsers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"RUM:"})," Real User Monitoring—metrics gathered from real user sessions, not lab tests."]})]})]}),e.jsx(r.Callout,{children:"Summary: capture errors with context, ship structured logs safely, and watch rates over time. Redact PII, sample non-critical logs, and correlate front-end ↔ back-end with a trace ID."})]});export{t as default};
