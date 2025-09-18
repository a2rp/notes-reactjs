import{j as e}from"./index-CLbx3UkF.js";import{S as s}from"./styled-BueYwuBy.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"FormatJS (react-intl)"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"FormatJS"})," is a collection of internationalization libraries for JavaScript. In React, we typically use ",e.jsx("b",{children:"react-intl"})," to format messages, numbers, dates, and relative time using the ",e.jsx("b",{children:"ICU Message"})," syntax. It provides components like"," ",e.jsx(s.InlineCode,{children:"IntlProvider"}),","," ",e.jsx(s.InlineCode,{children:"FormattedMessage"}),","," ",e.jsx(s.InlineCode,{children:"FormattedNumber"}),", etc., and the"," ",e.jsx(s.InlineCode,{children:"useIntl()"})," hook."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Terms & Definitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"i18n (Internationalization):"})," Preparing your app to support multiple"," ",e.jsx("em",{children:"locales"})," (languages + region formats) without code changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"l10n (Localization):"})," Supplying the ",e.jsx("em",{children:"content"})," per locale (translations, date/number formats, plural rules, RTL layout)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Locale:"})," A language/region tag like ",e.jsx(s.InlineCode,{children:"en"}),","," ",e.jsx(s.InlineCode,{children:"en-GB"}),","," ",e.jsx(s.InlineCode,{children:"hi-IN"})," that determines formatting rules."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ICU Message syntax:"})," A standard string format for variables, plurals, gender selects, and rich text placeholders, e.g."," ",e.jsx(s.InlineCode,{children:'"{count, plural, one {# item} other {# items}}"'}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Message Descriptor:"})," An object describing a message:"," ",e.jsx(s.InlineCode,{children:"{ id, defaultMessage, description? }"}),". IDs must be ",e.jsx("em",{children:"stable"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Extraction:"})," Process of scanning source code to collect messages for translators (e.g., with ",e.jsx(s.InlineCode,{children:"@formatjs/cli"})," or Babel plugin)."]})]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Setup: ",e.jsx("code",{children:"IntlProvider"})]}),e.jsx(s.Pre,{children:`// index.jsx (simplified)
import { createRoot } from "react-dom/client";
import { IntlProvider } from "react-intl";
import App from "./App";
import en from "./locales/en.json";

createRoot(document.getElementById("root")).render(
  <IntlProvider locale="en" messages={en}>
    <App />
  </IntlProvider>
);`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"IntlProvider"})," supplies locale + messages to your React tree. Messages is a flat map of ",e.jsx(s.InlineCode,{children:"id → translation"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Defining & Using Messages"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Message Descriptor:"})," ",e.jsx(s.InlineCode,{children:'{ id: "home.greeting", defaultMessage: "Hello, {name}!", description: "Greet user by name" }'})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Values:"})," Named placeholders supplied at render time,"," ",e.jsx(s.InlineCode,{children:'{ name: "Ashish" }'}),"."]})]}),e.jsx(s.Pre,{children:`import { FormattedMessage, useIntl } from "react-intl";

// Component usage with <FormattedMessage />
function Greeting() {
  return (
    <p>
      <FormattedMessage
        id="home.greeting"
        defaultMessage="Hello, {name}!"
        values={{ name: "Ashish" }}
      />
    </p>
  );
}

// Or with useIntl()
function Greeting2({ name }) {
  const intl = useIntl();
  const text = intl.formatMessage(
    { id: "home.greeting", defaultMessage: "Hello, {name}!" },
    { name }
  );
  return <p>{text}</p>;
}`})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["ICU Message Syntax: Variables, ",e.jsx("code",{children:"select"}),", ",e.jsx("code",{children:"plural"})]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Variable:"})," ",e.jsx(s.InlineCode,{children:'"Hi, {name}"'})," →"," ",e.jsx(s.InlineCode,{children:'values={{ name: "Ashish" }}'})]}),e.jsxs("li",{children:[e.jsx("b",{children:"select:"})," Choose a branch based on a token (e.g., gender/role)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"plural:"})," Language-aware pluralization. Use ",e.jsx(s.InlineCode,{children:"#"})," ","to insert the count."]})]}),e.jsx(s.Pre,{children:`// select (gender example)
<FormattedMessage
  id="profile.pronoun"
  defaultMessage="{gender, select, male {He} female {She} other {They}} updated the profile."
  values={{ gender: "male" }}
/>

// plural
<FormattedMessage
  id="cart.items"
  defaultMessage="{count, plural,
    =0 {No items}
    one {# item}
    other {# items}
  } in your cart."
  values={{ count: 3 }}
/>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Rich Text in Messages (Safe Markup)"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Define ",e.jsx("b",{children:"element placeholders"})," and pass ",e.jsx("b",{children:"functions"})," to render elements. Avoid hard-coded HTML in translations."]})}),e.jsx(s.Pre,{children:`// Translator sees <bold>...</bold> and can move it as needed
<FormattedMessage
  id="auth.confirm"
  defaultMessage="Please <bold>confirm</bold> your email."
  values={{
    bold: (chunks) => <strong>{chunks}</strong>
  }}
/>`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Formatting Dates, Numbers, Relative Time"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Numbers:"})," ",e.jsx(s.InlineCode,{children:"<FormattedNumber value={12345.678} />"})," with"," ",e.jsx(s.InlineCode,{children:'style="currency"'}),","," ",e.jsx(s.InlineCode,{children:"percent"}),","," ",e.jsx(s.InlineCode,{children:"unit"})," options."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dates/Times:"})," ",e.jsx(s.InlineCode,{children:"<FormattedDate />"}),","," ",e.jsx(s.InlineCode,{children:"<FormattedTime />"}),","," ",e.jsx(s.InlineCode,{children:"<FormattedDateTimeRange />"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Relative:"})," ",e.jsx(s.InlineCode,{children:'<FormattedRelativeTime value={-5} unit="minute" />'})," ","→ “5 minutes ago”."]})]}),e.jsx(s.Pre,{children:`import {
  FormattedNumber,
  FormattedDate,
  FormattedTime,
  FormattedRelativeTime
} from "react-intl";

function Examples() {
  return (
    <>
      <p>
        Price:{" "}
        <FormattedNumber value={1499.99} style="currency" currency="INR" currencyDisplay="symbol" />
      </p>

      <p>
        Launch: <FormattedDate value={new Date()} year="numeric" month="short" day="2-digit" />{" "}
        at <FormattedTime value={new Date()} hour="2-digit" minute="2-digit" />
      </p>

      <p>
        Updated: <FormattedRelativeTime value={-90} unit="second" />
      </p>
    </>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Loading Messages Per Locale (Code-Split)"}),e.jsx(s.List,{children:e.jsxs("li",{children:["Dynamically import the ",e.jsx(s.InlineCode,{children:"messages"})," bundle for the current locale to keep initial JS small."]})}),e.jsx(s.Pre,{children:`// pseudo: LocaleProvider.jsx
import React from "react";
import { IntlProvider } from "react-intl";

export function LocaleProvider({ locale, children }) {
  const [messages, setMessages] = React.useState({});

  React.useEffect(() => {
    let cancelled = false;
    import(\`../locales/\${locale}.json\`).then((mod) => {
      if (!cancelled) setMessages(mod.default || mod);
    });
    return () => { cancelled = true; };
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages} onError={(err) => {
      // Optionally silence missing translation warnings in dev or handle gracefully
      if (err.code === "MISSING_TRANSLATION") return;
      console.warn(err);
    }}>
      {children}
    </IntlProvider>
  );
}`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Extraction & Translation Workflow"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["Keep ",e.jsx("b",{children:"IDs stable"})," across releases (don't auto-generate IDs that change often)."]}),e.jsxs("li",{children:["Add ",e.jsx("b",{children:"description"})," to give translators context (who/where/intent)."]}),e.jsxs("li",{children:["Use an extractor (CLI/Babel) to collect all"," ",e.jsx(s.InlineCode,{children:"defaultMessage"})," + IDs into JSON for translation."]})]}),e.jsx(s.Pre,{children:`// Example CLI (conceptual)
// npx @formatjs/cli extract "src/**/*.{js,jsx,ts,tsx}" \\
   --out-file i18n/extracted/en.json --format simple

// Translators produce hi-IN.json, fr-FR.json, etc.
// At runtime, pick the user's locale and load that JSON.`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Polyfills (Older Browsers)"}),e.jsx(s.List,{children:e.jsxs("li",{children:["If targeting older environments, include"," ",e.jsx(s.InlineCode,{children:"@formatjs/intl-*"})," polyfills (e.g.,"," ",e.jsx(s.InlineCode,{children:"pluralrules"}),","," ",e.jsx(s.InlineCode,{children:"relativetimeformat"}),")."]})}),e.jsx(s.Pre,{children:`// At app entry (on demand)
if (!Intl.PluralRules) await import("@formatjs/intl-pluralrules/polyfill");
if (!Intl.RelativeTimeFormat) await import("@formatjs/intl-relativetimeformat/polyfill");`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use full, stable IDs (e.g., ",e.jsx(s.InlineCode,{children:"home.greeting"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," give translators context via ",e.jsx(s.InlineCode,{children:"description"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ICU plural/select; avoid manual ",e.jsx(s.InlineCode,{children:"if/else"})," for language rules."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use rich-text placeholders for bold/links; avoid embedding raw HTML."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," concatenate strings like ",e.jsx(s.InlineCode,{children:"'Hello ' + name"}),"—always use variables in messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," hide text inside images; translators can't change it."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Message:"})," A localizable string with placeholders and rules."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Descriptor:"})," The ",e.jsx(s.InlineCode,{children:"{ id, defaultMessage, description }"})," for a message."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ICU:"})," Industry standard syntax for localization logic in strings."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Extraction:"})," Build-time step to collect messages for translators."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback:"})," Using ",e.jsx(s.InlineCode,{children:"defaultMessage"})," when a translation is missing."]})]})]}),e.jsxs(s.Callout,{children:["Summary: Use ",e.jsx("b",{children:"IntlProvider"})," to set locale/messages, author text with ",e.jsx("b",{children:"ICU"}),", and render via ",e.jsx("b",{children:"Formatted*"})," components or ",e.jsx("b",{children:"useIntl()"}),". Keep IDs stable, give context, and load per-locale JSON to scale globally."]})]});export{i as default};
