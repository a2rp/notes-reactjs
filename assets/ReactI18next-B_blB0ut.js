import{j as e}from"./index-CAccbg1x.js";import{S as n}from"./styled-v1JgH-fP.js";const t=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"React i18next"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"react-i18next"})," is the official React binding for ",e.jsx("b",{children:"i18next"})," — a popular internationalization (i18n) library. It lets you translate UI text, handle plurals, interpolate variables, switch languages at runtime, and organize translations by locale and namespace."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Terms (Clear Definitions)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Internationalization (i18n):"})," Preparing your app to support multiple languages and formats without hard-coding one language."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Localization (l10n):"})," Supplying language-specific content (translations, date/number formats) for a specific audience or region."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Language code / Locale:"})," A BCP-47 tag like ",e.jsx(n.InlineCode,{children:"en"}),", ",e.jsx(n.InlineCode,{children:"en-US"}),", ",e.jsx(n.InlineCode,{children:"hi-IN"})," describing language (and optionally region/script)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Resource bundle:"})," A JSON/object containing translation ",e.jsx("i",{children:"keys"})," and ",e.jsx("i",{children:"values"})," for a given locale and namespace."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Namespace:"})," A named group of keys (e.g., ",e.jsx(n.InlineCode,{children:'"common"'}),", ",e.jsx(n.InlineCode,{children:'"auth"'}),") to keep translations organized."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Interpolation:"})," Injecting dynamic values into translation strings (e.g., ",e.jsxs(n.InlineCode,{children:['"Hello, ',"{ name }",'"']}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pluralization:"})," Choosing the right grammatical form based on ",e.jsx(n.InlineCode,{children:"count"})," (e.g., ",e.jsx("i",{children:"1 item"})," vs ",e.jsx("i",{children:"2 items"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback language:"})," The language used if a key is missing in the active language."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Detector:"})," A plugin that guesses the user's language (browser, path, cookie, etc.)."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Minimal Setup (Inline Resources)"}),e.jsx(n.Pre,{children:`// i18n.js (example)
// Install: npm i i18next react-i18next
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    common: {
      greeting: "Hello, {{name}}!",
      cart: {
        items_one: "1 item in your cart",
        items_other: "{{count}} items in your cart"
      }
    }
  },
  hi: {
    common: {
      greeting: "नमस्ते, {{name}}!",
      cart: {
        items_one: "आपकी कार्ट में 1 आइटम",
        items_other: "आपकी कार्ट में {{count}} आइटम"
      }
    }
  }
};

i18n
  .use(initReactI18next) // connect i18next to React
  .init({
    resources,
    lng: "en",                 // initial language
    fallbackLng: "en",         // fallback if key missing
    ns: ["common"],            // namespaces available
    defaultNS: "common",
    interpolation: { escapeValue: false }, // React already escapes
  });

export default i18n;`}),e.jsx(n.Small,{children:"In real apps you'll usually load JSON files per language/namespace (HTTP or bundler). This inline example keeps the setup easy to read."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Using in React Components"}),e.jsx(n.Pre,{children:`// main.jsx (example)
import "./i18n"; // import once before your app renders
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.getElementById("root")).render(<App />);

// AnyComponent.jsx
import React from "react";
import { useTranslation, Trans } from "react-i18next";

export default function AnyComponent() {
  const { t, i18n } = useTranslation("common"); // use the "common" namespace

  return (
    <>
      <p>{t("greeting", { name: "Ashish" })}</p>

      {/* Pluralization uses the 'count' option */}
      <p>{t("cart.items", { count: 1 })}</p>
      <p>{t("cart.items", { count: 3 })}</p>

      {/* Switch language at runtime */}
      <button onClick={() => i18n.changeLanguage("hi")}>Hindi</button>
      <button onClick={() => i18n.changeLanguage("en")}>English</button>

      {/* Rich text with <Trans> */}
      <p>
        <Trans i18nKey="rich">
          This is <strong>bold</strong> text from <em>translations</em>.
        </Trans>
      </p>
    </>
  );
}`}),e.jsxs(n.Small,{children:[e.jsxs("b",{children:[e.jsx(n.InlineCode,{children:"t(key, options)"}),":"]})," returns a translated string.",e.jsxs("b",{children:[" ",e.jsx(n.InlineCode,{children:"Trans"})]})," lets you safely mix translated text with React elements."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Interpolation, Plurals & Context"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Interpolation:"})," Provide values via ",e.jsx(n.InlineCode,{children:'{ name: "Ashish" }'})," → ",e.jsx("i",{children:"Hello, Ashish!"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Plurals:"})," Supply ",e.jsx(n.InlineCode,{children:"count"}),". i18next picks the correct rule for the locale."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," Use grammatical variants (e.g., gender) with ",e.jsx(n.InlineCode,{children:"context"}),"."]})]}),e.jsx(n.Pre,{children:`// translations (en/common)
{
  "user": {
    "online_male": "He is online",
    "online_female": "She is online"
  }
}

// usage
t("user.online", { context: "male" })   // -> "He is online"
t("user.online", { context: "female" }) // -> "She is online"`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Namespaces & Organization"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Split translations into namespaces like ",e.jsx(n.InlineCode,{children:"common"}),", ",e.jsx(n.InlineCode,{children:"auth"}),", ",e.jsx(n.InlineCode,{children:"dashboard"})," for clarity and performance."]}),e.jsx("li",{children:"Load namespaces per page or feature to avoid shipping everything up front."}),e.jsxs("li",{children:["Keep keys flat and descriptive (e.g., ",e.jsx(n.InlineCode,{children:"nav.home"}),", ",e.jsx(n.InlineCode,{children:"errors.required"}),")."]})]}),e.jsx(n.Pre,{children:`// Using multiple namespaces
const { t } = useTranslation(["common", "auth"]);
t("common:greeting");
t("auth:signIn");`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Language Detection & Lazy Loading"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Detection:"})," A detector plugin can read browser language, URL, or cookies to pick the initial language."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lazy loading:"})," Load only the needed language/namespace at runtime (via HTTP backend or dynamic imports)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Suspense:"})," react-i18next can use React ",e.jsx(n.InlineCode,{children:"Suspense"})," to wait for loaded translations."]})]}),e.jsx(n.Pre,{children:`// Install: npm i i18next-browser-languagedetector i18next-http-backend
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpBackend from "i18next-http-backend";

i18n
  .use(HttpBackend)        // load /locales/{lng}/{ns}.json at runtime
  .use(LanguageDetector)   // detect initial language
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    ns: ["common", "auth"],
    interpolation: { escapeValue: false },
  });`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Formatting Dates & Numbers (Quick Intro)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use the built-in ",e.jsx(n.InlineCode,{children:"Intl.DateTimeFormat"})," and ",e.jsx(n.InlineCode,{children:"Intl.NumberFormat"})," to format according to the active locale."]}),e.jsxs("li",{children:["You can create a small helper that reads the current ",e.jsx(n.InlineCode,{children:"i18n.language"})," and formats values consistently."]})]}),e.jsx(n.Pre,{children:`// inside a component
const { i18n } = useTranslation();
const price = new Intl.NumberFormat(i18n.language, { style: "currency", currency: "INR" }).format(1299.5);
const date  = new Intl.DateTimeFormat(i18n.language, { dateStyle: "medium" }).format(new Date());
// result looks right for each locale (e.g., en-US vs hi-IN)`}),e.jsxs(n.Small,{children:["For ICU-style message formatting or advanced rules, add an i18next ICU plugin; otherwise the native ",e.jsx(n.InlineCode,{children:"Intl"})," APIs cover most needs."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep English (or your base language) in ",e.jsx("i",{children:"keys"}),", not inlined UI; translate via ",e.jsx(n.InlineCode,{children:"t()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," organize keys by namespace and feature; keep names descriptive and stable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," test plurals and variables for each language (especially non-English rules)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," concatenate strings to build sentences; let translators reorder segments via full sentence keys."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," bake punctuation/emoji into many keys; prefer a single translated sentence."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"BCP-47:"})," Standard for language tags (e.g., ",e.jsx(n.InlineCode,{children:"fr-CA"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CLDR:"})," Locale data repository that powers pluralization rules in many libs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ICU MessageFormat:"})," A syntax for complex messages (select, plural, ordinal)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Namespace:"})," A logical group of translation keys (easier loading and maintenance)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Detector:"})," Plugin that auto-detects the user's preferred language."]})]})]}),e.jsxs(n.Callout,{children:["Summary: With react-i18next you call ",e.jsx("b",{children:"t()"})," to translate strings, use ",e.jsx("b",{children:"count"})," for plurals,",e.jsx("b",{children:" Trans"})," for rich content, organize strings by ",e.jsx("b",{children:"namespaces"}),", and switch languages at runtime. Start simple with inline resources, then scale out to JSON files and lazy loading."]})]});export{t as default};
