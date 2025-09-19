import{j as e}from"./index-CAccbg1x.js";import{S as s}from"./styled-CMPY0PYy.js";const t=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"WebSockets & Server-Sent Events (SSE)"}),e.jsxs(s.Lead,{children:["Real-time UIs need updates ",e.jsx("i",{children:"without"})," manual refresh. Two browser-native options:",e.jsx("b",{children:" WebSockets"})," (two-way, full-duplex) and ",e.jsx("b",{children:"SSE"})," (one-way, server ➜ client). Choose based on whether the browser must ",e.jsx("em",{children:"send"})," live messages or only ",e.jsx("em",{children:"receive"})," them."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"WebSocket:"})," a persistent, full-duplex connection between browser and server. After an HTTP",e.jsx(s.InlineCode,{children:"Upgrade"})," handshake, both sides can send messages anytime."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Full-duplex:"})," both directions can transmit simultaneously (browser ⇄ server)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSE (Server-Sent Events):"})," a long-lived HTTP response (MIME:"," ",e.jsx(s.InlineCode,{children:"text/event-stream"}),") where the ",e.jsx("em",{children:"server pushes"})," messages to the browser using the ",e.jsx(s.InlineCode,{children:"EventSource"})," API."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unidirectional:"})," with SSE, traffic is server ➜ client only. The browser cannot send messages on the same stream (use ",e.jsx(s.InlineCode,{children:"fetch"})," or another channel for client ➜ server)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Heartbeat:"})," low-cost “ping” messages that keep connections alive and detect disconnects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reconnection / Backoff:"})," reconnecting after drops using delays that grow (e.g., 1s, 2s, 4s…)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Last-Event-ID:"})," SSE field that lets the server resume from the last delivered event on reconnect."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Subprotocol:"})," an agreed message protocol on WebSocket (e.g., ",e.jsx(s.InlineCode,{children:"json"}),",",e.jsx(s.InlineCode,{children:"graphql-ws"}),") negotiated via ",e.jsx(s.InlineCode,{children:"Sec-WebSocket-Protocol"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"When to Use WebSockets vs. SSE"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use WebSockets"})," for chats, collaborative editors, multiplayer games, or anything needing",e.jsx("em",{children:"client ➜ server"})," messages in real time (typing, presence, acks)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use SSE"})," for one-way streams: live dashboards, notifications, log/metrics feeds, server progress, or LLM streaming tokens. It's simpler and auto-reconnects with built-in browser support."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Binary data?"})," WebSockets support binary frames. SSE is text-only (UTF-8)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Proxies/CDN:"})," SSE uses standard HTTP and often plays nicer with intermediaries; WebSockets need proxy/CDN support for the Upgrade path."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"WebSocket - Browser Client"}),e.jsx(s.Pre,{children:`// Minimal WebSocket client with safe reconnection and heartbeat
function connect({ url, protocols, onMessage, onOpen, onClose, onError }) {
  let ws;
  let attempts = 0;
  let heartbeat;

  function start() {
    ws = new WebSocket(url, protocols);
    ws.addEventListener("open", () => {
      attempts = 0;
      onOpen?.();
      // Heartbeat: ping every 25s (server should reply or echo)
      heartbeat = setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify({ type: "ping" }));
      }, 25000);
    });

    ws.addEventListener("message", (e) => {
      // Messages are strings or ArrayBuffer/Blob
      try { onMessage?.(JSON.parse(e.data)); }
      catch { onMessage?.(e.data); }
    });

    ws.addEventListener("close", (e) => {
      clearInterval(heartbeat);
      onClose?.(e);
      // Exponential backoff, max 10s
      const delay = Math.min(10000, 1000 * 2 ** attempts++);
      setTimeout(start, delay);
    });

    ws.addEventListener("error", (err) => onError?.(err));
  }

  start();
  return {
    send(data) {
      if (ws?.readyState === WebSocket.OPEN) ws.send(JSON.stringify(data));
    },
    close() { clearInterval(heartbeat); ws?.close(); },
  };
}

// Usage:
const socket = connect({
  url: "wss://example.com/chat",
  protocols: ["json"], // optional
  onMessage: (msg) => console.log("server:", msg),
});`}),e.jsxs(s.Small,{children:["You can't set custom headers in browser ",e.jsx(s.InlineCode,{children:"WebSocket"}),". Send tokens via cookies, query params, or a prior authenticated fetch that issues a signed URL."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"WebSocket Message Design"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Envelope:"})," send objects like"," ",e.jsx(s.InlineCode,{children:'{ type: "chat.message", payload: {...} }'})," to route logic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Ordering & idempotency:"})," include ",e.jsx(s.InlineCode,{children:"id"})," and timestamps; handle duplicates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Acks:"})," confirm receipt for at-least-once delivery semantics if needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backpressure:"})," if sending too fast, buffer and drop old updates (e.g., keep last state snapshot)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"SSE - Browser Client"}),e.jsx(s.Pre,{children:`// EventSource automatically reconnects and supports Last-Event-ID
const es = new EventSource("https://example.com/events"); // cookies are sent by default
es.onmessage = (e) => {
  // default "message" event
  const data = JSON.parse(e.data);
  console.log("update:", data);
};
// Custom event type
es.addEventListener("price-tick", (e) => {
  const tick = JSON.parse(e.data);
  console.log("tick:", tick);
});
es.onerror = (err) => {
  // Temporary errors trigger auto reconnect; server can include "retry:" to control delay
  console.warn("sse error", err);
};
// Close when no longer needed
// es.close();`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"Headers:"})," you can't add custom headers in ",e.jsx(s.InlineCode,{children:"EventSource"}),". Use cookies or query params for auth. The server can read ",e.jsx(s.InlineCode,{children:"Last-Event-ID"})," to resume."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Server Sketches (for Understanding)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"WebSocket server:"})," accepts the HTTP Upgrade and emits/broadcasts messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSE endpoint:"})," keeps an HTTP response open and sends lines prefixed with"," ",e.jsx(s.InlineCode,{children:"data:"}),", ending each event with a blank line."]})]}),e.jsx(s.Pre,{children:`// Node (Express) + ws: extremely simplified
import express from "express";
import { WebSocketServer } from "ws";
const app = express();
const server = app.listen(8080);
const wss = new WebSocketServer({ server });

wss.on("connection", (socket, req) => {
  socket.on("message", (raw) => {
    const msg = JSON.parse(raw.toString());
    // Echo or broadcast:
    wss.clients.forEach(c => c.readyState === 1 && c.send(JSON.stringify(msg)));
  });
  // heartbeat
  const ping = setInterval(() => socket.readyState === 1 && socket.send(JSON.stringify({ type: "ping" })), 25000);
  socket.on("close", () => clearInterval(ping));
});

// SSE: Express endpoint
app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders?.();

  const send = (event, data, id) => {
    if (id) res.write(\`id: \${id}\\n\`);
    if (event !== "message") res.write(\`event: \${event}\\n\`);
    res.write(\`data: \${JSON.stringify(data)}\\n\\n\`);
  };

  // heartbeat every 15s
  const hb = setInterval(() => res.write(": keep-alive\\n\\n"), 15000);

  // example stream
  let n = 0;
  const iv = setInterval(() => send("price-tick", { price: 100 + ++n }, String(n)), 1000);

  req.on("close", () => { clearInterval(iv); clearInterval(hb); });
});`}),e.jsx(s.Small,{children:"These are learning snippets-don't paste into your app as-is. In production, add auth, limits, and resiliency (see below)."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Reliability, Auth & Production Notes"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Auth:"})," browsers can't set custom headers for WS/SSE. Use cookies, query params, or a signed URL. Validate the ",e.jsx(s.InlineCode,{children:"Origin"})," header on the server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reconnect:"})," implement exponential backoff (WebSockets). SSE auto-reconnects and supports"," ",e.jsx(s.InlineCode,{children:"retry:"})," and ",e.jsx(s.InlineCode,{children:"Last-Event-ID"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Heartbeat:"})," ping/pong (WS) or comments (",e.jsx(s.InlineCode,{children:":"})," lines in SSE) to keep intermediaries from timing out."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fan-out:"})," for many clients, publish events to a broker (Redis Pub/Sub, NATS, Kafka) and broadcast from there."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Serialization:"})," prefer JSON for readability; consider binary (WS) or compressed payloads for heavy streams."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mobile & flaky networks:"})," keep messages small; make updates idempotent so duplicates don't break state."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pick SSE if you only need server ➜ client updates-simpler, built-in reconnect."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use WebSockets when the client must push events instantly (chat, cursor, presence)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," design a clear message envelope with ",e.jsx(s.InlineCode,{children:"type"})," + ",e.jsx(s.InlineCode,{children:"payload"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block the main thread in message handlers; update state efficiently."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," forget heartbeats and reconnect logic (for WS)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Handshake (WS):"})," initial HTTP Upgrade that switches to the WebSocket protocol."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Event stream (SSE):"})," a continuous HTTP response containing ",e.jsx(s.InlineCode,{children:"id"}),", ",e.jsx(s.InlineCode,{children:"event"}),", and ",e.jsx(s.InlineCode,{children:"data"})," lines."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Broadcast:"})," send the same message to many clients."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backoff:"})," progressively increasing delay between reconnect attempts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotent:"})," performing the same update multiple times yields the same final state."]})]})]}),e.jsxs(s.Callout,{children:["Summary: ",e.jsx("b",{children:"WebSockets"})," = two-way, low-latency streams; requires your own reconnection strategy.",e.jsx("b",{children:" SSE"})," = one-way, simpler, auto-reconnect with resume via ",e.jsx("i",{children:"Last-Event-ID"}),". Pick the lightest tool that satisfies your directionality and reliability needs."]})]});export{t as default};
