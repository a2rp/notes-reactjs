import{j as e}from"./index-DqLKwkYK.js";import{S as i}from"./styled-cQbamht2.js";const n=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"Push Notifications (Web Push)"}),e.jsxs(i.Lead,{children:[e.jsx("b",{children:"Web Push"})," lets a website send timely notifications to a user's device even when the page is not open. It relies on a ",e.jsx("b",{children:"Service Worker"}),", the",e.jsx("b",{children:" Push API"})," (subscribe), and the ",e.jsx("b",{children:"Notifications API"})," (show UI)."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core Definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Service Worker (SW):"})," a background script that runs independently of pages. Needed to receive push messages and display notifications."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Notifications API:"})," browser API to display system-level notifications (",e.jsx(i.InlineCode,{children:"new Notification()"})," or ",e.jsx(i.InlineCode,{children:"registration.showNotification()"})," in SW)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Push API:"})," lets the SW subscribe to a push service and receive messages from your server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Subscription:"})," a JSON object (endpoint + keys) that uniquely identifies a user's device/browser for push delivery."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Push Service:"})," infra run by the browser vendor (e.g., FCM for Chrome) that receives your server's push request and delivers it to the device."]}),e.jsxs("li",{children:[e.jsx("b",{children:"VAPID (Voluntary Application Server Identification):"})," public/private key pair used to authenticate your server with browser push services."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Permission states:"})," ",e.jsx("i",{children:"default"})," (not asked), ",e.jsx("i",{children:"granted"}),", ",e.jsx("i",{children:"denied"}),". You can only show notifications if ",e.jsx("i",{children:"granted"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Payload:"})," the data your server sends to the push service to be delivered to the SW (e.g., title, body, icon URL, actions)."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Requirements & Constraints"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"HTTPS required:"})," push + service workers work only on secure origins (localhost is OK for dev)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"User gesture:"})," request permission only in response to an explicit user action (e.g., a button click)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Background delivery:"})," messages arrive to the SW even when no tab is open (subject to OS/browser limits, battery saver, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Platform support:"}),' most modern browsers support Web Push; iOS Safari supports it via "Web Push for PWAs." Behavior may still vary by platform.']})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"End-to-End Flow"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:["Register a ",e.jsx("b",{children:"Service Worker"}),"."]}),e.jsxs("li",{children:["Ask user for ",e.jsx("b",{children:"Notification Permission"})," (on a user action)."]}),e.jsxs("li",{children:["Create/refresh a ",e.jsx("b",{children:"Push Subscription"})," in the SW registration (needs your ",e.jsx("b",{children:"VAPID public key"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Send subscription"})," JSON to your server and store it (DB)."]}),e.jsxs("li",{children:["From server, use ",e.jsx("b",{children:"web-push"})," (or similar) with your ",e.jsx("b",{children:"VAPID private key"})," to send a payload to the subscription's ",e.jsx("b",{children:"endpoint"}),"."]}),e.jsxs("li",{children:["SW receives the ",e.jsx("b",{children:"push"})," event, and shows a ",e.jsx("b",{children:"notification"})," via ",e.jsx(i.InlineCode,{children:"showNotification()"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Requesting Permission (UI Thread)"}),e.jsx(i.Pre,{children:`// Trigger this from a user gesture (e.g., button click)
async function askNotificationPermission() {
  if (!("Notification" in window)) {
    alert("This browser does not support notifications.");
    return "denied";
  }
  const current = Notification.permission; // "default" | "granted" | "denied"
  if (current === "granted" || current === "denied") return current;

  const result = await Notification.requestPermission();
  // result: "granted" | "denied"
  return result;
}`}),e.jsxs(i.Small,{children:["Only call ",e.jsx(i.InlineCode,{children:"Notification.requestPermission()"})," after a user clicks a button; otherwise many browsers will auto-deny."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Register Service Worker & Subscribe to Push"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"applicationServerKey:"})," your ",e.jsx("i",{children:"VAPID public key"})," (URL-safe base64) converted to ",e.jsx(i.InlineCode,{children:"Uint8Array"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"userVisibleOnly: true"})," is required; every push must show a notification."]})]}),e.jsx(i.Pre,{children:`// Convert base64 (URL-safe) VAPID key to Uint8Array
function base64UrlToUint8Array(base64Url) {
  const padding = "=".repeat((4 - (base64Url.length % 4)) % 4);
  const base64 = (base64Url + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

async function registerAndSubscribe(vapidPublicKey) {
  if (!("serviceWorker" in navigator) || !("PushManager" in window)) {
    throw new Error("Service Worker / Push not supported in this browser.");
  }

  // 1) Register your service worker (e.g., /sw.js at site root)
  const reg = await navigator.serviceWorker.register("/sw.js");

  // 2) Subscribe (creates or returns existing subscription)
  let sub = await reg.pushManager.getSubscription();
  if (!sub) {
    sub = await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64UrlToUint8Array(vapidPublicKey),
    });
  }

  // 3) Send subscription JSON to your server to store it
  await fetch("/api/save-subscription", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(sub),
  });

  return sub;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Service Worker: Receive & Show Notification"}),e.jsx(i.Pre,{children:`// /sw.js (must be served from the site origin or scope-matched)
// self is the ServiceWorkerGlobalScope
self.addEventListener("push", (event) => {
  // Event may not always contain data; handle both cases
  let payload = {};
  try { payload = event.data ? event.data.json() : {}; } catch {}
  const title = payload.title || "Hello!";
  const options = {
    body: payload.body || "You have a new message.",
    icon: payload.icon || "/icons/icon-192.png",
    badge: payload.badge || "/icons/badge-72.png",
    data: payload.data || { url: "/" },
    tag: payload.tag,              // avoid stacking dupes if desired
    renotify: !!payload.renotify,  // whether to re-alert on same tag
    actions: payload.actions || [  // buttons in the notification
      { action: "open", title: "Open" },
      { action: "dismiss", title: "Dismiss" }
    ]
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// Handle clicks on the notification or its actions
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";

  if (event.action === "dismiss") return;

  event.waitUntil((async () => {
    // Focus an existing client tab if available, otherwise open a new one
    const allClients = await clients.matchAll({ type: "window", includeUncontrolled: true });
    const hadClient = allClients.some((client) => {
      if (client.url.includes(self.location.origin) && "focus" in client) {
        client.focus();
        return true;
      }
      return false;
    });
    if (!hadClient) await clients.openWindow(url);
  })());
});`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Note:"})," Service workers can't show modal UI; they use ",e.jsx(i.InlineCode,{children:"showNotification()"}),". Use ",e.jsx(i.InlineCode,{children:"notificationclick"})," to navigate or focus a tab."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Backend: Store Subscription & Send Push"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Store subscriptions:"})," Save each subscription JSON (one per device/browser) in your DB."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Send:"})," Use a library like ",e.jsx(i.InlineCode,{children:"web-push"})," with your VAPID keys to POST a payload to the browser's push service."]})]}),e.jsx(i.Pre,{children:`// Node/Express (example): save subscription & send push
// 1) Setup web-push with VAPID keys (generate once and keep private key secret)
const webpush = require("web-push");
webpush.setVapidDetails(
  "mailto:you@example.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// 2) Save subscriptions (simplified; use a DB in production)
const subs = new Set();
app.post("/api/save-subscription", express.json(), (req, res) => {
  subs.add(req.body); // req.body is the subscription JSON from the client
  res.json({ ok: true });
});

// 3) Send a push to all subscribers
app.post("/api/push", express.json(), async (req, res) => {
  const payload = JSON.stringify({
    title: req.body.title || "New alert",
    body: req.body.body || "Something happened!",
    data: { url: req.body.url || "/" }
  });

  const results = [];
  for (const sub of subs) {
    try {
      await webpush.sendNotification(sub, payload, { TTL: 60 });
      results.push({ ok: true });
    } catch (err) {
      results.push({ ok: false, error: String(err) });
      // If 410 Gone, the subscription is invalid; remove from DB
    }
  }
  res.json({ ok: true, results });
});`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"TTL:"})," time-to-live (seconds) the push service should retain the message if the device is offline. If you get ",e.jsx("i",{children:"410 Gone"}),", remove that subscription from your DB (it's expired/invalid)."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"UX & Best Practices"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Ask thoughtfully:"})," explain the value before showing the permission prompt."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Granular topics:"}),' let users opt in to specific categories (e.g., "Deals", "Breaking news").']}),e.jsxs("li",{children:[e.jsx("b",{children:"Respect quiet hours:"})," avoid late-night pings; consider local time."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Actionable:"})," include buttons (actions) that lead the user to a relevant screen."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unsubscribe path:"})," provide a clear way to turn off notifications."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Security & Privacy"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Keys:"})," keep the VAPID ",e.jsx("i",{children:"private"})," key on the server only."]}),e.jsxs("li",{children:[e.jsx("b",{children:"HTTPS:"})," required to prevent tampering and protect subscriptions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Data minimization:"})," send only what's necessary; avoid sensitive data in payloads."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Troubleshooting"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:'Permission is "denied":'})," you cannot prompt again; provide UI that explains how to re-enable in browser settings."]}),e.jsxs("li",{children:[e.jsx("b",{children:'"NotAllowedError" on subscribe:'})," permission not granted, or called without a user gesture."]}),e.jsxs("li",{children:[e.jsx("b",{children:"No notification shown:"})," verify SW scope, ",e.jsx(i.InlineCode,{children:"push"})," handler, and that the payload reaches ",e.jsx(i.InlineCode,{children:"showNotification()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"410 Gone from push service:"})," remove that subscription from your DB (stale)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"iOS oddities:"})," ensure the site is installed as a PWA and notifications are enabled in iOS settings."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Endpoint:"})," URL on the browser's push service where your server sends the push."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keys (p256dh/auth):"})," per-subscription public keys used to encrypt the payload end-to-end."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Scope:"})," URL path range the SW controls (affects which pages it can handle)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tag:"})," identifier to group/replace notifications to prevent duplicates."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Actions:"})," buttons shown on a notification for quick responses."]})]})]}),e.jsx(i.Callout,{children:"Summary: Web Push = Permission + Subscription + Server Push + SW display. Keep requests user-initiated, store subscriptions securely, send meaningful, actionable messages, and always offer an easy opt-out."})]});export{n as default};
