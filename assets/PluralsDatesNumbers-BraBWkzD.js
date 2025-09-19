import{j as e}from"./index-BRArnZ3i.js";import{S as n}from"./styled-CZzY_Wt5.js";const r=()=>e.jsxs(n.Page,{children:[e.jsx(n.Title,{children:"Plurals, Dates & Numbers"}),e.jsxs(n.Lead,{children:["Localizing ",e.jsx("b",{children:"quantities"}),", ",e.jsx("b",{children:"numbers"}),", ",e.jsx("b",{children:"currencies"}),", and ",e.jsx("b",{children:"dates/times"})," is essential for i18n. Use the browser's ",e.jsx(n.InlineCode,{children:"Intl"})," APIs for correct rules per ",e.jsx("b",{children:"locale"}),", not manual string math or concatenation."]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Core Definitions"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Locale:"})," a language + region preference (e.g.,"," ",e.jsx(n.InlineCode,{children:"en-US"}),","," ",e.jsx(n.InlineCode,{children:"hi-IN"}),","," ",e.jsx(n.InlineCode,{children:"ar-EG"}),") that drives formatting rules."]}),e.jsxs("li",{children:[e.jsx("b",{children:"BCP 47 tag:"})," the standardized string for a locale (e.g.,"," ",e.jsx(n.InlineCode,{children:"pt-BR"}),","," ",e.jsx(n.InlineCode,{children:"zh-Hant-TW"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"CLDR:"})," Unicode's Common Locale Data Repository—reference data for plural rules, calendars, number systems, names, etc."]}),e.jsxs("li",{children:[e.jsx("b",{children:"ICU MessageFormat:"})," a message syntax for variables, plurals, genders, and select-cases, used by libraries like FormatJS and i18next."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Plural categories:"})," language-dependent buckets like"," ",e.jsx(n.InlineCode,{children:"zero"}),", ",e.jsx(n.InlineCode,{children:"one"}),","," ",e.jsx(n.InlineCode,{children:"two"}),","," ",e.jsx(n.InlineCode,{children:"few"}),","," ",e.jsx(n.InlineCode,{children:"many"}),","," ",e.jsx(n.InlineCode,{children:"other"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Numbering system:"})," set of digits used by a locale (e.g., Latin"," ",e.jsx(n.InlineCode,{children:"0-9"})," vs Eastern Arabic"," ",e.jsx(n.InlineCode,{children:"۰-۹"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Calendar:"})," civil calendar used to display date (e.g., Gregorian, Buddhist, Islamic)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Time zone:"})," a geographical region's clock rules including DST (e.g.,",e.jsx(n.InlineCode,{children:"Asia/Kolkata"}),","," ",e.jsx(n.InlineCode,{children:"America/New_York"}),")."]})]})]}),e.jsxs(n.Section,{children:[e.jsxs(n.H2,{children:["Pluralization with ",e.jsx("code",{children:"Intl.PluralRules"})]}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What it does:"})," classifies a ",e.jsx("em",{children:"number"})," into a locale's plural category."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why it matters:"})," English mostly uses ",e.jsx("i",{children:"one/other"}),", but many languages have 3-6 categories with complex rules. Never hard-code English assumptions."]})]}),e.jsx(n.Pre,{children:`// Classify counts for a given locale
const en = new Intl.PluralRules('en');      // English
en.select(0); // "other"
en.select(1); // "one"
en.select(2); // "other"

const ru = new Intl.PluralRules('ru');      // Russian
ru.select(1); // "one"
ru.select(2); // "few"
ru.select(5); // "many"
ru.select(11); // "many"
ru.select(22); // "few"

// Use the category to pick a message:
function formatItemCount(n, locale = 'en') {
  const pr = new Intl.PluralRules(locale);
  const cat = pr.select(n);
  const messages = {
    one:   \`\${n} item\`,
    few:   \`\${n} items\`,   // used in some locales
    many:  \`\${n} items\`,
    other: \`\${n} items\`
  };
  return messages[cat] ?? messages.other;
}
// formatItemCount(1, 'en') -> "1 item"
// formatItemCount(2, 'ru') -> "2 items" (category "few")`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Tip:"})," Libraries (i18next, FormatJS) hide this mapping—just supply the count and the library selects the correct plural form per locale."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Numbers, Currency, Percent & Units"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"Intl.NumberFormat"})," for locale-aware digits, separators, currency symbols, and rounding."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Key options:"})," ",e.jsx(n.InlineCode,{children:"style"})," (",e.jsx("i",{children:"decimal | currency | percent | unit"}),"),"," ",e.jsx(n.InlineCode,{children:"currency"}),","," ",e.jsx(n.InlineCode,{children:"unit"}),","," ",e.jsx(n.InlineCode,{children:"notation"})," (",e.jsx("i",{children:"standard | compact"}),"),"," ",e.jsx(n.InlineCode,{children:"maximumFractionDigits"}),","," ",e.jsx(n.InlineCode,{children:"signDisplay"}),"."]})]}),e.jsx(n.Pre,{children:`// Basic decimal
new Intl.NumberFormat('en-IN').format(1234567.89)   // "12,34,567.89" (Indian grouping)

// Currency (INR) — never build currency strings manually
new Intl.NumberFormat('hi-IN', { style: 'currency', currency: 'INR' })
  .format(2599.5)                                   // "₹ 2,599.50" (Hindi, India)

// Percent
new Intl.NumberFormat('en-US', { style: 'percent', maximumFractionDigits: 1 })
  .format(0.1234)                                   // "12.3%"

// Units (requires a sanctioned unit identifier, e.g., 'kilometer', 'byte', 'celsius')
new Intl.NumberFormat('en-GB', { style: 'unit', unit: 'kilometer' })
  .format(5)                                        // "5 km"

// Compact notation (K, M)
new Intl.NumberFormat('en', { notation: 'compact' }).format(12500) // "13K"

// Control digits
new Intl.NumberFormat('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  .format(9)                                        // "9.00"

// Sign display
new Intl.NumberFormat('en', { signDisplay: 'exceptZero' }).format(5) // "+5"
new Intl.NumberFormat('en', { signDisplay: 'exceptZero' }).format(0) // "0"`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Rounding:"})," prefer ",e.jsx("i",{children:"fraction digits"})," (currency) or ",e.jsx("i",{children:"significant digits"})," (scientific values) instead of manual rounding and string concatenation."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Dates & Times"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"Intl.DateTimeFormat"})," with a ",e.jsx("b",{children:"time zone"})," for predictable output across users."]}),e.jsxs("li",{children:[e.jsx("b",{children:"dateStyle/timeStyle:"})," high-level presets (",e.jsx("i",{children:"short | medium | long | full"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"hourCycle:"})," 12-hour vs 24-hour (",e.jsx(n.InlineCode,{children:"h12"}),","," ",e.jsx(n.InlineCode,{children:"h23"}),")."]})]}),e.jsx(n.Pre,{children:`const d = new Date('2025-09-18T17:30:00Z'); // UTC time

// India time (IST)
new Intl.DateTimeFormat('en-IN', {
  dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Kolkata'
}).format(d) // e.g., "Sep 18, 2025, 11:00 PM"

// U.S. East
new Intl.DateTimeFormat('en-US', {
  dateStyle: 'full', timeStyle: 'short', timeZone: 'America/New_York', hourCycle: 'h12'
}).format(d) // e.g., "Thursday, September 18, 2025 at 1:30 PM"

// Custom fields
new Intl.DateTimeFormat('en-GB', {
  year: 'numeric', month: 'long', day: '2-digit', weekday: 'short'
}).format(d) // e.g., "Thu, 18 September 2025"`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Tip:"})," Always decide the ",e.jsx("i",{children:"source"})," of truth (UTC? server time?) and specify"," ",e.jsx(n.InlineCode,{children:"timeZone"})," for display. Don't assume the viewer's local time is acceptable."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:'Relative Time (e.g., "in 3 days")'}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["Use ",e.jsx(n.InlineCode,{children:"Intl.RelativeTimeFormat"})," for phrases like"," ",'"yesterday", "in 5 minutes", "3 days ago".']}),e.jsxs("li",{children:[e.jsx("b",{children:"Unit:"})," ",e.jsx(n.InlineCode,{children:"'second'|'minute'|'hour'|'day'|'week'|'month'|'year'"}),"."]})]}),e.jsx(n.Pre,{children:`const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
rtf.format(-1, 'day'); // "yesterday"
rtf.format(3, 'day');  // "in 3 days"`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Numbering Systems & Calendars"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:["You can request digits/calendars via ",e.jsx("b",{children:"Unicode extensions"})," in the locale tag or via options. Example: ",e.jsx(n.InlineCode,{children:"ar-EG-u-nu-arab"})," (Arabic digits)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Calendar:"})," choose with ",e.jsx(n.InlineCode,{children:"calendar"})," option or locale extension (e.g., ",e.jsx(n.InlineCode,{children:"u-ca-buddhist"}),")."]})]}),e.jsx(n.Pre,{children:`// Eastern Arabic digits
new Intl.NumberFormat('ar-EG-u-nu-arab').format(2025) // "٢٠٢٥"

// Buddhist calendar
new Intl.DateTimeFormat('th-TH-u-ca-buddhist', { dateStyle: 'medium' })
  .format(new Date('2025-09-18')) // year differs from Gregorian`})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Libraries: Quick Recipes"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"FormatJS (react-intl):"})," declarative components & helpers for ICU messages."]}),e.jsxs("li",{children:[e.jsx("b",{children:"i18next:"})," translation keys with pluralization—pass ",e.jsx(n.InlineCode,{children:"count"}),"."]})]}),e.jsx(n.Pre,{children:`// react-intl (FormatJS) examples
// <FormattedNumber value={2599.5} style="currency" currency="INR" />
// <FormattedDate value={new Date()} dateStyle="medium" timeStyle="short" timeZone="Asia/Kolkata" />
// <FormattedMessage id="cart.items" defaultMessage="{count, plural, one {# item} other {# items}}" values={{ count }} />

// i18next pluralization
// en/translation.json
// { "cart": { "item_one": "{{count}} item", "item_other": "{{count}} items" } }
// t('cart.item', { count: 1 }) -> "1 item"
// t('cart.item', { count: 3 }) -> "3 items"`}),e.jsxs(n.Small,{children:[e.jsx("b",{children:"Note:"})," Libraries pick plural forms per locale automatically; you maintain only the translations for each form."]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Do & Don't"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(n.InlineCode,{children:"Intl.NumberFormat"})," for currency/percent—never build strings manually."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," pass an explicit ",e.jsx(n.InlineCode,{children:"timeZone"})," when rendering cross-region times."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use plural APIs/libraries; avoid ",e.jsx("i",{children:"if (n === 1)"})," logic in app code."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"}),' concatenate raw numbers and symbols (e.g., "₹" + 1000) — formatting varies by locale.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," assume 12-hour or 24-hour clocks; respect locale or set ",e.jsx(n.InlineCode,{children:"hourCycle"}),"."]})]})]}),e.jsxs(n.Section,{children:[e.jsx(n.H2,{children:"Glossary"}),e.jsxs(n.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Notation:"})," number shortening style (",e.jsx(n.InlineCode,{children:"standard"})," vs ",e.jsx(n.InlineCode,{children:"compact"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Sign display:"})," how to show plus/minus (e.g., ",e.jsx(n.InlineCode,{children:"always"}),", ",e.jsx(n.InlineCode,{children:"exceptZero"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Hour cycle:"})," 12 vs 24-hour clock (",e.jsx(n.InlineCode,{children:"h12"}),", ",e.jsx(n.InlineCode,{children:"h23"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Numeric/Auto (RelativeTime):"}),' show words like "yesterday" (',e.jsx("i",{children:"auto"}),') vs "in 1 day" (',e.jsx("i",{children:"numeric"}),")."]})]})]}),e.jsxs(n.Callout,{children:["Summary: Use the ",e.jsx("i",{children:"Intl"})," APIs (PluralRules, NumberFormat, DateTimeFormat, RelativeTimeFormat) to express locale-correct plurals, numbers, money, and times. Specify locales and time zones, let libraries handle ICU messages, and avoid manual formatting."]})]});export{r as default};
