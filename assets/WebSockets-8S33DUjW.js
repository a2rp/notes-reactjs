import{j as e}from"./index-CDxhzYTb.js";import{S as s}from"./styled-Do31Xb5I.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"WebSockets"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"WebSocket"})," is a persistent, full-duplex connection between a client and a server. Unlike HTTP (request → response), WebSockets allow ",e.jsx("i",{children:"both sides"})," to send messages anytime over a single TCP connection (",e.jsx(s.InlineCode,{children:"ws://"})," or",e.jsx(s.InlineCode,{children:"wss://"}),")."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Definition & Use Cases"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"WebSocket:"})," a protocol that upgrades an HTTP connection to a long-lived, two-way channel."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Full-duplex:"})," both client and server can send messages independently at any time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use cases:"})," chats, live dashboards/price feeds, multiplayer games, collaborative editors, notifications."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"How WebSockets Work (Handshake → Messages)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Handshake (HTTP Upgrade):"})," the browser sends an HTTP request with headers like",e.jsx(s.InlineCode,{children:"Upgrade: websocket"})," and",e.jsx(s.InlineCode,{children:"Connection: Upgrade"}),". The server responds with",e.jsx(s.InlineCode,{children:"101 Switching Protocols"}),". After this, it’s no longer HTTP."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Subprotocols:"})," optional application-level protocols (e.g., ",e.jsx(s.InlineCode,{children:"graphql-ws"}),") negotiated via",e.jsx(s.InlineCode,{children:"Sec-WebSocket-Protocol"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Frames & Messages:"})," data flows as frames that form text or binary messages. The browser gives you full messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lifecycle:"})," ",e.jsx(s.InlineCode,{children:"CONNECTING → OPEN → CLOSING → CLOSED"})," (via ",e.jsx(s.InlineCode,{children:"readyState"}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary (Key Terms)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"ws://"})," vs ",e.jsx("b",{children:"wss://"}),": insecure vs TLS-encrypted WebSockets (use ",e.jsx("b",{children:"wss"})," in production)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Full-duplex:"})," both ends can send/receive simultaneously (unlike HTTP request/response)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Subprotocol:"})," a higher-level contract on top of WebSocket (e.g., message shapes, ack rules)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backoff:"})," strategy to gradually delay reconnection attempts to avoid server overload."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Heartbeat:"})," periodic “ping/pong” or app-level “ping” messages to detect dead connections."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Binary type:"})," client setting (",e.jsx(s.InlineCode,{children:"socket.binaryType"}),") to receive blobs/array buffers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Close codes:"})," short numeric reasons for closure (e.g., ",e.jsx(s.InlineCode,{children:"1000"})," normal, ",e.jsx(s.InlineCode,{children:"1001"})," going away, ",e.jsx(s.InlineCode,{children:"1009"})," message too big)."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Basic Client (Connect, Listen, Send)"}),e.jsx(s.Pre,{children:`function BasicFeed() {
  const [log, setLog] = React.useState([]);
  const socketRef = React.useRef(null);

  React.useEffect(() => {
    const url = "wss://example.com/feed";
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.addEventListener("open", () => {
      setLog(l => [...l, "OPEN"]);
      // Example: announce presence
      ws.send(JSON.stringify({ type: "hello", from: "client-123" }));
    });

    ws.addEventListener("message", (e) => {
      // e.data can be string or Blob/ArrayBuffer depending on server & binaryType
      setLog(l => [...l, "MSG: " + e.data]);
    });

    ws.addEventListener("error", () => {
      setLog(l => [...l, "ERROR"]);
    });

    ws.addEventListener("close", (e) => {
      setLog(l => [...l, "CLOSE " + e.code]);
    });

    return () => {
      // Important: clean up when component unmounts
      ws.close(1000, "page change");
    };
  }, []);

  function sendPing() {
    socketRef.current?.readyState === WebSocket.OPEN &&
      socketRef.current.send(JSON.stringify({ type: "ping", t: Date.now() }));
  }

  return (
    <div>
      <button onClick={sendPing}>Send Ping</button>
      <pre>{log.join("\\n")}</pre>
    </div>
  );
}`}),e.jsx(s.Small,{children:"Always close the socket on unmount to avoid leaks and “ghost” connections."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Sending JSON Messages (Type Field)"}),e.jsx(s.Pre,{children:`// A simple convention is to send JSON with a "type" and "payload"
socket.send(JSON.stringify({ type: "chat:send", payload: { text: "Hello" } }));

// Handling incoming:
ws.addEventListener("message", (e) => {
  const msg = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
  // msg = { type: "chat:new", payload: {...} }
});`}),e.jsx(s.Small,{children:"Define a small message schema early (type, payload) to keep clients/servers in sync."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Reconnection Pattern (Exponential Backoff)"}),e.jsx(s.Pre,{children:`function useWebSocketWithRetry(url, { maxDelayMs = 10000 } = {}) {
  const wsRef = React.useRef(null);
  const [status, setStatus] = React.useState("idle");
  const backoffRef = React.useRef(500); // start small

  const connect = React.useCallback(() => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) return;

    setStatus("connecting");
    const ws = new WebSocket(url);
    wsRef.current = ws;

    ws.onopen = () => {
      setStatus("open");
      backoffRef.current = 500; // reset on success
    };
    ws.onmessage = () => {};
    ws.onerror = () => {};
    ws.onclose = () => {
      setStatus("closed");
      // schedule retry
      const delay = Math.min(backoffRef.current, maxDelayMs);
      setTimeout(() => {
        backoffRef.current = Math.min(backoffRef.current * 2, maxDelayMs);
        connect();
      }, delay);
    };
  }, [url, maxDelayMs]);

  React.useEffect(() => {
    connect();
    return () => wsRef.current?.close(1000, "unmount");
  }, [connect]);

  return { status, socket: wsRef.current };
}`}),e.jsx(s.Small,{children:"Backoff prevents “thundering herd” reconnect storms and gives the server breathing room."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Heartbeats & Timeouts"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," detect dead connections (e.g., network drop, sleeping tabs) and trigger reconnects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How (browser):"})," send a periodic app-level ",e.jsx(s.InlineCode,{children:"{ type: 'ping' }"})," and expect a ",e.jsx(s.InlineCode,{children:"{ type: 'pong' }"})," from the server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"How (server):"})," some servers use protocol-level ping/pong frames; browsers don’t expose these, so rely on app-level pings if needed."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Security & Authentication"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Use wss://"})," in production to encrypt traffic."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Auth:"})," typically via cookies (same origin) or a bearer/JWT token sent as a query param or negotiated during handshake; rotate/refresh as needed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Origin checks:"})," servers can enforce allowed ",e.jsx(s.InlineCode,{children:"Origin"})," to mitigate abuse."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Rate limits & message size limits:"})," protect your server from floods and huge payloads."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"WebSockets vs SSE vs Polling"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"WebSockets:"})," two-way, low-latency streams; ideal for chats, games, collaborative apps."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SSE (Server-Sent Events):"})," one-way server→client updates over HTTP; simpler when only pushing updates (news feed, notifications)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Polling/Long-polling:"})," easiest to set up; higher overhead/latency; okay for low-frequency updates."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Common Pitfalls"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Creating multiple sockets per page accidentally (e.g., in each render) — ",e.jsx("b",{children:"always"})," keep the instance in a ref and initialize in ",e.jsx(s.InlineCode,{children:"useEffect"}),"."]}),e.jsx("li",{children:"Forgetting to close on unmount → memory leaks and duplicate messages."}),e.jsxs("li",{children:["Blocking the main thread (heavy work) in ",e.jsx(s.InlineCode,{children:"message"})," handlers; offload parsing or heavy CPU via Web Workers if needed."]}),e.jsxs("li",{children:["Sending raw objects without a schema → versioning hell. Define ",e.jsx(s.InlineCode,{children:"{ type, payload }"})," early."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"For Context: Minimal Node Server (ws)"}),e.jsx(s.Pre,{children:`// npm i ws
// File: server.js
import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (socket) => {
  socket.send(JSON.stringify({ type: "welcome", payload: Date.now() }));

  socket.on("message", (raw) => {
    let msg = null;
    try { msg = JSON.parse(raw); } catch {}
    if (msg?.type === "ping") {
      socket.send(JSON.stringify({ type: "pong", t: Date.now() }));
    }
    // Echo chat
    if (msg?.type === "chat:send") {
      const out = JSON.stringify({ type: "chat:new", payload: msg.payload });
      wss.clients.forEach(c => c.readyState === 1 && c.send(out));
    }
  });
});`}),e.jsx(s.Small,{children:"This is only to visualize server behavior; your React notes app remains front-end."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Subprotocols (Optional)"}),e.jsx(s.Pre,{children:`// Client requesting a specific subprotocol:
const ws = new WebSocket("wss://example.com/realtime", "chat-v1");
// Server should accept or reject it during the handshake.`})]}),e.jsxs(s.Callout,{children:[e.jsx("b",{children:"Summary:"})," WebSockets provide real-time, two-way communication. Learn the handshake, lifecycle, JSON message schema, reconnection with backoff, and heartbeats. Prefer",e.jsx("b",{children:" wss://"})," in production, close sockets on unmount, and document your message types."]})]});export{i as default};
