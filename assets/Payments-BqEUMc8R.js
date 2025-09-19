import{j as e}from"./index-BRArnZ3i.js";import{S as r}from"./styled-JpMxu384.js";const n=()=>e.jsxs(r.Page,{children:[e.jsx(r.Title,{children:"Payments (External Integrations)"}),e.jsxs(r.Lead,{children:["Web payments connect your app to a ",e.jsx("b",{children:"Payment Service Provider (PSP)"})," like Stripe, Razorpay, or PayPal. React handles the UI and calls your backend; the backend talks to the PSP securely. The golden rule:",e.jsx("b",{children:" never put secret keys in the frontend"}),"."]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"What is a “payment” in web apps?"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Payment Intent / Order:"})," a record that says “we plan to charge X amount in Y currency”. It tracks status like ",e.jsx("i",{children:"requires_action"}),", ",e.jsx("i",{children:"succeeded"}),", or ",e.jsx("i",{children:"failed"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Payment Method:"})," how the customer pays — card, UPI, netbanking, wallet, etc. A PSP standardizes these."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Capture:"})," actually taking the money (some flows ",e.jsx("i",{children:"authorize"})," first, then ",e.jsx("i",{children:"capture"})," later)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Refund/Void:"})," returning funds. Void cancels an uncaptured authorization; refund returns captured funds."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Core concepts & definitions"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"PSP (Payment Service Provider):"})," a platform that processes payments and abstracts banks/card networks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tokenization:"})," sensitive card/UPI details are exchanged for a temporary ",e.jsx("i",{children:"token"}),". Your app uses the token, not raw card numbers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"PCI DSS:"})," security standard for handling card data. Using PSP SDKs + tokenization helps you avoid storing card data yourself."]}),e.jsxs("li",{children:[e.jsx("b",{children:"3-D Secure / SCA:"})," extra authentication step (OTP/challenge) to reduce fraud. PSPs handle this in their UIs/SKDs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Idempotency:"})," sending the same request key twice should only charge once. Backends use an ",e.jsx("i",{children:"Idempotency-Key"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Webhook:"})," a secure callback from the PSP to your backend with final truth of payment status."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Minor units:"})," store money in the smallest unit (e.g., INR paise, USD cents) as integers to avoid float errors."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Who does what? (Frontend vs Backend)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Frontend (React):"})," gathers amount/currency, collects payment method via PSP's SDK/Elements, displays statuses/errors, and calls your backend endpoints."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Backend (Server):"})," holds ",e.jsx("i",{children:"secret keys"}),", creates ",e.jsx("i",{children:"payment intents/orders"}),", verifies signatures, listens to ",e.jsx("i",{children:"webhooks"}),", handles ",e.jsx("i",{children:"idempotency"}),", and updates your database."]})]}),e.jsx(r.Pre,{children:`// Typical sequence:
// 1) Client -> POST /api/payments/create-intent {amount, currency}
// 2) Server -> PSP: create intent/order; return client_secret/order_id
// 3) Client -> PSP SDK: confirm/authorize with client_secret/order_id
// 4) PSP -> Webhook -> Server: "payment.succeeded" (source of truth)
// 5) Server -> DB: mark order paid; Client polls or receives status`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Amounts & currency"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Always calculate on the server"})," to prevent tampering (e.g., price from DB × quantity, plus taxes/shipping)."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"minor units"})," (e.g., ₹1.00 = 100 paise) stored as integers; convert to human format for display only."]}),e.jsxs("li",{children:["Keep a ",e.jsx("b",{children:"currency"})," column; PSPs require currency (e.g., ",e.jsx("code",{children:"INR"}),", ",e.jsx("code",{children:"USD"}),") for every charge."]})]}),e.jsx(r.Pre,{children:`// Example (display vs store):
const pricePaise = 49900; // ₹499.00 stored as 49900
const display = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })
  .format(pricePaise / 100); // "₹499.00"`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Minimal React flow (generic)"}),e.jsx(r.Pre,{children:`function PayButton({ cartTotalPaise }) {
  const [status, setStatus] = React.useState("idle");
  async function handlePay() {
    setStatus("creating");
    // Create intent/order on your server (never in the client)
    const res = await fetch("/api/payments/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: cartTotalPaise, currency: "INR" }),
    }).then(r => r.json());

    // res: { clientSecret | orderId, provider: "stripe" | "razorpay" | ... }

    setStatus("confirming");
    // Next step depends on provider SDK (see examples below)
  }
  return (
    <button disabled={status !== "idle"} onClick={handlePay}>
      {status === "idle" ? "Pay Now" : "Processing..."}
    </button>
  );
}`}),e.jsx(r.Small,{children:"The client fetches a short-lived token/secret from your backend, then hands control to the provider's SDK."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Stripe (Elements & Payment Intents)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Elements:"})," prebuilt UI fields that handle card entry and tokenization securely in the browser."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Payment Intent:"})," server-created object that represents the charge attempt and its state."]})]}),e.jsx(r.Pre,{children:`// Client (React) — minimal sketch (pseudocode):
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ amountPaise }) {
  const stripe = useStripe();
  const elements = useElements();
  const [msg, setMsg] = React.useState("");

  async function onSubmit(e) {
    e.preventDefault();
    // 1) Create PaymentIntent on your server
    const { clientSecret } = await fetch("/api/payments/create-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountPaise, currency: "INR" }),
    }).then(r => r.json());

    // 2) Confirm card payment (handles 3DS if required)
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card: elements.getElement(CardElement) }
    });

    if (result.error) setMsg(result.error.message);
    else if (result.paymentIntent?.status === "succeeded") setMsg("Payment successful!");
  }

  return (
    <form onSubmit={onSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
      <p>{msg}</p>
    </form>
  );
}

export default function StripeCheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amountPaise={49900} />
    </Elements>
  );
}

// Server (sketch):
// POST /api/payments/create-intent {amount, currency}
// -> create PaymentIntent with secret key, return clientSecret
// Use idempotency keys when creating to avoid duplicates`}),e.jsxs(r.Small,{children:["Stripe handles the challenge step (OTP/3DS) inside ",e.jsx("code",{children:"confirmCardPayment"}),". The final status should be verified by your backend via a webhook before delivering goods."]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Example: Razorpay (Order & Checkout)"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Order:"})," server-created object with ",e.jsx("code",{children:"amount"}),", ",e.jsx("code",{children:"currency"}),", and ",e.jsx("code",{children:"order_id"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Checkout:"})," Razorpay's UI popup handles card/UPI/wallet and returns a payment signature to verify on the server."]})]}),e.jsx(r.Pre,{children:`// Client (React) — minimal sketch (pseudocode):
function RazorpayButton({ amountPaise }) {
  async function openRzp() {
    // 1) Create Order on server
    const order = await fetch("/api/payments/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: amountPaise, currency: "INR" }),
    }).then(r => r.json()); // { id: order_id, amount, currency }

    // 2) Open Checkout
    const rzp = new window.Razorpay({
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      order_id: order.id,
      name: "Your Brand",
      handler: function (response) {
        // response: { razorpay_payment_id, razorpay_order_id, razorpay_signature }
        // 3) Verify on server
        fetch("/api/payments/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        }).then(() => alert("Payment verified!"));
      },
      modal: { ondismiss: () => console.log("Checkout closed") },
      prefill: { name: "Test User", email: "test@example.com" }
    });
    rzp.open();
  }

  return <button onClick={openRzp}>Pay with Razorpay</button>;
}

// Server routes (sketch):
// POST /create-order -> Razorpay Orders API (secret key) -> return {id, amount, currency}
// POST /verify -> validate signature using secret -> mark order paid in DB`}),e.jsx(r.Small,{children:"UPI and netbanking support are built-in. Always verify the signature server-side and trust webhooks for final status."})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Webhooks: the source of truth"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Webhook:"})," PSP's POST request to your backend about events (e.g., ",e.jsx("i",{children:"payment.succeeded"}),")."]}),e.jsx("li",{children:"Your server verifies the webhook signature, updates the order status, and triggers fulfillment."}),e.jsx("li",{children:"The frontend should reflect the server's status; don't ship goods solely on a client-side “success”."})]}),e.jsx(r.Pre,{children:`// Express pseudo-code:
app.post("/webhooks/psp", verifySignature, async (req, res) => {
  const event = req.body; // payment.succeeded / payment.failed / refund.created ...
  // 1) Find your Order by event.data.reference
  // 2) Update DB status accordingly
  // 3) Trigger email/fulfillment
  res.sendStatus(200);
});`})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Testing, sandbox, and errors"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Sandbox/Test mode:"})," PSPs provide test keys and test payment methods. Keep test and live keys separate."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Retry & idempotency:"})," if network fails while creating intents/orders, retry with the same idempotency key."]}),e.jsxs("li",{children:[e.jsx("b",{children:"User feedback:"})," show clear states—",e.jsx("i",{children:"processing"}),", ",e.jsx("i",{children:"action required"}),", ",e.jsx("i",{children:"failed"}),"—and allow retry."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Security & compliance checklist"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:["Never expose ",e.jsx("b",{children:"secret keys"})," in the client or commit them to Git."]}),e.jsx("li",{children:"Validate amounts on the server, not from client input."}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"HTTPS"})," everywhere; enable ",e.jsx("b",{children:"HSTS"})," and secure cookies for sessions."]}),e.jsxs("li",{children:["Verify ",e.jsx("b",{children:"webhook signatures"})," before trusting payloads."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"idempotency keys"})," for create/charge operations to avoid duplicate charges."]}),e.jsxs("li",{children:["Store ",e.jsx("b",{children:"only tokens"})," or PSP IDs; never store raw card PAN/expiry/CVV."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Do & Don't"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," calculate prices and discounts on the server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," depend on webhook-confirmed status before fulfillment."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep currency and minor units consistent in DB."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," charge directly from React using secret keys."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," trust client-side “success” without server verification."]})]})]}),e.jsxs(r.Section,{children:[e.jsx(r.H2,{children:"Glossary"}),e.jsxs(r.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Authorization:"})," hold funds on a card without completing the capture yet."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Capture:"})," finalize the charge so money moves."]}),e.jsxs("li",{children:[e.jsx("b",{children:"SCA/3DS:"})," additional customer authentication (OTP/challenge) required by banks/regulations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Chargeback:"})," customer disputes a charge with their bank; handle via PSP dashboards/flows."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Settlement:"})," PSP pays out collected funds to your bank account on a schedule."]})]})]}),e.jsxs(r.Callout,{children:["Summary: React builds clean payment UIs, but your ",e.jsx("b",{children:"backend"})," is where secrets live, orders are created, webhooks are verified, and truth is stored. Start with a single PSP, keep amounts server-driven, and commit to webhook-based fulfillment."]})]});export{n as default};
