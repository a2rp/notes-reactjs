import{j as e}from"./index-DUO2rjrc.js";import{S as n}from"./styled-Bb1So4I1.js";const l=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Internationalization (i18n) — Basics"}),e.jsxs(n.Lead,{children:[e.jsx("b",{children:"Internationalization (i18n)"})," is preparing your app so it can be ",e.jsx("i",{children:"localized"})," into different languages and regions without code changes. You externalize UI text, format dates/numbers correctly, handle plural forms, and respect direction (LTR/RTL)."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Internationalization (i18n):"})," Engineering work that makes an app ready for multiple locales (extract strings, use proper formatters, no hard-coded culture)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Localization (l10n):"})," Adapting content for a specific ",e.jsx("em",{children:"locale"})," (translations, formats, images, examples)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Locale:"})," A language+region identifier such as ",e.jsx(n.InlineCode,{children:"en-US"})," or ",e.jsx(n.InlineCode,{children:"hi-IN"})," (BCP 47 tag). It influences text, number, date/time formats, etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Translation key:"})," A stable ID like ",e.jsx(n.InlineCode,{children:'"home.title"'})," that maps to a localized message string."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ICU MessageFormat:"})," A syntax for messages with variables, plural/gender rules (",e.jsx(n.InlineCode,{children:"{count, plural, one {...} other {...}}"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CLDR:"})," A community-maintained dataset of locale rules used by modern formatters (the ",e.jsx(n.InlineCode,{children:"Intl"})," APIs rely on it)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Right-to-Left (RTL):"})," Scripts like Arabic/Hebrew. UI must support ",e.jsx(n.InlineCode,{children:'dir="rtl"'})," and logical CSS properties."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pseudo-localization:"})," Fake translations that lengthen and accent characters to reveal truncation/missing i18n."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Why i18n?"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Reach users in their language and conventions."}),e.jsx("li",{children:"Prevent bugs from hard-coded formats (e.g., month/day order, decimal separators)."}),e.jsx("li",{children:"Scale: add new locales without touching component logic."})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Minimal “Dictionary” Approach (No Library)"}),e.jsx(n.Pre,{children:`// messages.js
export const MESSAGES = {
  "en": {
    "hello.name": "Hello, {name}!",
    "cart.zero": "Your cart is empty",
    "cart.one": "1 item in cart",
    "cart.other": "{count} items in cart",
    "date.example": "Today is {date}",
    "price.example": "Price: {price}"
  },
  "hi": {
    "hello.name": "नमस्ते, {name}!",
    "cart.zero": "आपकी कार्ट खाली है",
    "cart.one": "कार्ट में 1 वस्तु",
    "cart.other": "कार्ट में {count} वस्तुएँ",
    "date.example": "आज {date} है",
    "price.example": "कीमत: {price}"
  }
};`}),e.jsx(n.Pre,{children:`// i18n-lite.js
import { MESSAGES } from "./messages";

export function formatMessage(locale, key, vars = {}, fallbackLocale = "en") {
  const table = MESSAGES[locale] || {};
  const fallback = MESSAGES[fallbackLocale] || {};
  const template = table[key] ?? fallback[key] ?? key;
  return template.replace(/\\{(\\w+)\\}/g, (_, k) => String(vars[k] ?? ""));
}`}),e.jsx(n.Small,{children:"This is the simplest possible approach: keys + string templates. Real projects use libraries to handle plurals, ICU syntax, async loading, and interpolation safely."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Plural Rules"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Plural forms:"})," Languages don't share the same plural logic (some have 2, others 3+). Don't concatenate strings; select the right message per rule."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Intl.PluralRules:"})," Picks a category (",e.jsx(n.InlineCode,{children:"zero/one/two/few/many/other"}),") for a number in a locale."]})]}),e.jsx(n.Pre,{children:`// plural-lite.js
export function pluralize(locale, count) {
  const pr = new Intl.PluralRules(locale);
  return pr.select(count); // e.g. "one" | "other" (en), could be "few"/"many" for other locales
}

export function formatCartCount(locale, count) {
  const category = pluralize(locale, count);
  const key =
    category === "one" ? "cart.one" :
    category === "zero" ? "cart.zero" :
    "cart.other";
  return formatMessage(locale, key, { count });
}`}),e.jsx(n.Small,{children:"ICU MessageFormat (covered later) solves this more elegantly in one string."})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Formatting Dates & Numbers (Intl APIs)"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Intl.DateTimeFormat:"})," Localized date/time output."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Intl.NumberFormat:"})," Thousands separators, decimals, currency, percent."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Locale vs Time zone:"})," The locale chooses formatting conventions; time zone chooses the clock."]})]}),e.jsx(n.Pre,{children:`const locale = "hi-IN";

// Date
const today = new Date();
const dateText = new Intl.DateTimeFormat(locale, { dateStyle: "long" }).format(today);

// Currency
const priceText = new Intl.NumberFormat(locale, { style: "currency", currency: "INR" })
  .format(1234567.89);

// Compose into a message (with our lite formatter)
const out1 = formatMessage(locale, "date.example", { date: dateText });
const out2 = formatMessage(locale, "price.example", { price: priceText });`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Locales & BCP 47 Language Tags"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Structure:"})," ",e.jsx(n.InlineCode,{children:"language[-Script][-REGION]"})," (e.g., ",e.jsx(n.InlineCode,{children:"zh-Hant-TW"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Examples:"})," ",e.jsx(n.InlineCode,{children:"en-GB"})," (English, UK), ",e.jsx(n.InlineCode,{children:"hi-IN"})," (Hindi, India), ",e.jsx(n.InlineCode,{children:"ar-EG"})," (Arabic, Egypt)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallbacks:"})," If ",e.jsx(n.InlineCode,{children:"pt-BR"})," is missing, fall back to ",e.jsx(n.InlineCode,{children:"pt"}),", then default (e.g., ",e.jsx(n.InlineCode,{children:"en"}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Right-to-Left (RTL) Support"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Set ",e.jsx(n.InlineCode,{children:'<html dir="rtl" lang="ar">'})," or on a container."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"logical CSS"})," (e.g., ",e.jsx(n.InlineCode,{children:"margin-inline-start"})," instead of ",e.jsx(n.InlineCode,{children:"margin-left"}),")."]}),e.jsxs("li",{children:["Avoid directional icons hard-coded for LTR; flip chevrons when ",e.jsx(n.InlineCode,{children:'[dir="rtl"]'}),"."]})]}),e.jsx(n.Pre,{children:`/* Example: logical properties */
.card {
  padding-inline: 16px;
  margin-inline-start: 12px; /* flips automatically in RTL-capable engines */
}

/* Example: icon flip */
[dir="rtl"] .chevron { transform: scaleX(-1); }`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Pseudo-localization (Testing Trick)"}),e.jsxs(n.List,{children:[e.jsx("li",{children:"Expand and accent characters to reveal truncation and missing keys."}),e.jsx("li",{children:"Helps check if UI breaks with longer translations."})]}),e.jsx(n.Pre,{children:`function pseudo(text) {
  const map = { a:"á", e:"é", i:"í", o:"ó", u:"ú", A:"Â", E:"Ê", I:"Î", O:"Ô", U:"Û" };
  return "［" + text.replace(/[aeiouAEIOU]/g, c => map[c] || c) + "］";
}
// pseudo("Your cart is empty") -> ［Yóúr cárt ís émpty］`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," externalize every user-visible string to keys (no hard-coded English in components)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(n.InlineCode,{children:"Intl"})," for dates/numbers; don't hand-roll separators."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," design for text expansion (≈30-50%) and line wrapping."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," concatenate sentence fragments (grammar differs across languages)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," embed HTML in translations unless your tooling sanitizes safely."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," assume plural means just “add an s”; use plural rules."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"BCP 47:"})," Standard for locale tags (",e.jsx(n.InlineCode,{children:"en-US"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ICU:"})," International Components for Unicode—libraries and MessageFormat spec."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Message catalog:"})," A file (JSON, PO, etc.) with key→translation entries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fallback locale:"})," The locale used if a translation is missing."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Translatable string:"})," Any user-visible text extracted for translators."]})]})]}),e.jsxs(n.Callout,{children:["Summary: prepare your UI by extracting strings, using proper formatters, supporting plurals, and respecting locale/RTL. In the next topics, we'll use libraries like ",e.jsx("i",{children:"react-i18next"}),"and ",e.jsx("i",{children:"FormatJS"})," to scale this."]})]});export{l as default};
