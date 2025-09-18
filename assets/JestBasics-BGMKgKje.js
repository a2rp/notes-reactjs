import{j as e}from"./index-CEhT6f_w.js";import{S as s}from"./styled-CrvFt-_J.js";const i=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"Jest Basics"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"Jest"})," is a JavaScript testing framework that bundles a ",e.jsx("i",{children:"test runner"}),", an ",e.jsx("i",{children:"assertion library"}),", a ",e.jsx("i",{children:"mocking"})," system, and ",e.jsx("i",{children:"coverage"})," in one tool. You write tests in files like"," ",e.jsx(s.InlineCode,{children:"*.test.js"})," or ",e.jsx(s.InlineCode,{children:"*.spec.js"}),", and run them with a single command."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"What is testing? Why Jest?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Testing"}),": writing small programs (",e.jsx("i",{children:"tests"}),") that automatically verify your code's behavior."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Unit test"}),": checks one function/component in isolation."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Integration test"}),": checks how multiple units work together."]}),e.jsxs("li",{children:[e.jsx("b",{children:"End-to-End (E2E)"}),": drives the app like a user (usually via a browser) to validate real flows."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Jest"}),": all-in-one tool: ",e.jsx("i",{children:"runner"})," (discovers/executes tests), ",e.jsx("i",{children:"assertions"})," (e.g., ",e.jsx(s.InlineCode,{children:"expect()"}),"), ",e.jsx("i",{children:"mocks"}),", and ",e.jsx("i",{children:"coverage"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core Terms (learn these first)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Test file"}),": any file named ",e.jsx(s.InlineCode,{children:"*.test.js"})," or ",e.jsx(s.InlineCode,{children:"*.spec.js"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Test suite"}),": a group of tests in a file or inside ",e.jsx(s.InlineCode,{children:"describe()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Test case"}),": an individual ",e.jsx(s.InlineCode,{children:"test()"})," (alias ",e.jsx(s.InlineCode,{children:"it()"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Assertion"}),": a check like ",e.jsx(s.InlineCode,{children:"expect(value).toBe(42)"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Matcher"}),": the method after ",e.jsx(s.InlineCode,{children:"expect()"})," (e.g., ",e.jsx(s.InlineCode,{children:"toBe"}),", ",e.jsx(s.InlineCode,{children:"toEqual"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Test environment"}),": the runtime for tests — usually ",e.jsx(s.InlineCode,{children:"jsdom"})," (browser-like) or ",e.jsx(s.InlineCode,{children:"node"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mock"}),": a fake function/module you control during tests (created with ",e.jsx(s.InlineCode,{children:"jest.fn"}),", ",e.jsx(s.InlineCode,{children:"jest.spyOn"}),", or ",e.jsx(s.InlineCode,{children:"jest.mock"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Spy"}),": a special mock that wraps a real function to record calls (",e.jsx(s.InlineCode,{children:'jest.spyOn(obj, "method")'}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Stub"}),": a mock that returns canned values (a preprogrammed fake)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fake timers"}),": simulated time so you can test timers instantly (",e.jsx(s.InlineCode,{children:"jest.useFakeTimers()"}),")."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"First Test (arrange → act → assert)"}),e.jsx(s.Pre,{children:`// src/utils/sum.js
export function sum(a, b) {
  return a + b;
}

// src/utils/sum.test.js
import { sum } from "./sum";

describe("sum()", () => {
  test("adds two numbers", () => {
    // arrange
    const a = 2, b = 3;
    // act
    const result = sum(a, b);
    // assert
    expect(result).toBe(5);
  });
});`}),e.jsxs(s.Small,{children:["Run with ",e.jsx(s.InlineCode,{children:"npx jest"})," (or ",e.jsx(s.InlineCode,{children:"npm test"})," if configured). In watch mode, Jest reruns tests on file changes."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Essential Matchers"}),e.jsx(s.Pre,{children:`test("primitive equality", () => {
  expect(2 + 2).toBe(4);                  // strict === for primitives
});

test("deep equality", () => {
  expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });    // deep equal
  expect([1, 2, 3]).toEqual([1, 2, 3]);
});

test("strict deep equality", () => {
  expect({ a: 1 }).toStrictEqual({ a: 1 }); // like toEqual but stricter (no extra props, respects undefined)
});

test("truthiness", () => {
  expect(true).toBeTruthy();
  expect(0).toBeFalsy();
  expect(null).toBeNull();
  expect(undefined).toBeUndefined();
});

test("numbers", () => {
  expect(10).toBeGreaterThan(5);
  expect(0.1 + 0.2).toBeCloseTo(0.3); // avoid floating point pitfalls
});

test("strings/regex", () => {
  expect("Hello Jest").toMatch(/jest/i);
});

test("arrays/iterables", () => {
  expect(["a", "b", "c"]).toContain("b");
});

test("objects", () => {
  expect({ user: { id: 1 } }).toHaveProperty("user.id", 1);
});

test("errors", () => {
  function willThrow() { throw new Error("boom"); }
  expect(willThrow).toThrow("boom");
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Async Tests (Promises & async/await)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Return/await the Promise"})," so Jest knows when the test finishes."]}),e.jsxs("li",{children:["Use ",e.jsx(s.InlineCode,{children:"resolves"})," / ",e.jsx(s.InlineCode,{children:"rejects"})," helpers for concise assertions."]})]}),e.jsx(s.Pre,{children:`// Function under test
export async function fetchUser(id, fetcher = fetch) {
  const res = await fetcher(\`/api/users/\${id}\`);
  if (!res.ok) throw new Error("Network error");
  return res.json();
}

// Test
test("fetchUser resolves with data", async () => {
  // stub 'fetch' with a controllable mock
  const fakeFetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: 1, name: "Ada" })
  });

  await expect(fetchUser(1, fakeFetch)).resolves.toEqual({ id: 1, name: "Ada" });
  expect(fakeFetch).toHaveBeenCalledWith("/api/users/1");
});

test("fetchUser rejects on HTTP error", async () => {
  const fakeFetch = jest.fn().mockResolvedValue({ ok: false });
  await expect(fetchUser(1, fakeFetch)).rejects.toThrow("Network error");
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Setup & Teardown"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx(s.InlineCode,{children:"beforeAll/afterAll"}),": run once per suite (e.g., open/close DB)."]}),e.jsxs("li",{children:[e.jsx(s.InlineCode,{children:"beforeEach/afterEach"}),": run around every test (e.g., reset state)."]})]}),e.jsx(s.Pre,{children:`describe("with timers", () => {
  let arr;
  beforeAll(() => { /* connect or init once */ });
  beforeEach(() => { arr = []; });
  afterEach(() => { arr = null; });
  afterAll(() => { /* teardown once */ });

  test("pushes values", () => {
    arr.push(1);
    expect(arr).toHaveLength(1);
  });
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Mocks & Spies"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:e.jsx(s.InlineCode,{children:"jest.fn()"})}),": create a stand-alone mock function."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx(s.InlineCode,{children:'jest.spyOn(obj, "method")'})}),": wrap and observe a real method, optionally mock its implementation."]}),e.jsxs("li",{children:[e.jsx("b",{children:e.jsx(s.InlineCode,{children:'jest.mock("module")'})}),": replace an entire module with mocks during the test."]})]}),e.jsx(s.Pre,{children:`// jest.fn()
const log = jest.fn();
log("hello");
expect(log).toHaveBeenCalledWith("hello");

// jest.spyOn()
const api = { get: (id) => ({ id, ok: true }) };
const spy = jest.spyOn(api, "get").mockReturnValue({ id: 1, ok: false });
expect(api.get(1)).toEqual({ id: 1, ok: false });
expect(spy).toHaveBeenCalledTimes(1);
spy.mockRestore();

// jest.mock() — mock a module
// userService.js
export async function getUserName(fetcher, id) {
  const r = await fetcher(\`/u/\${id}\`);
  return (await r.json()).name;
}

// userService.test.js
jest.mock("./userService"); // if you provide __mocks__/userService.js, Jest will use it
import { getUserName } from "./userService";
getUserName.mockResolvedValue("Grace"); // override in test
await expect(getUserName(jest.fn(), 1)).resolves.toBe("Grace");`}),e.jsxs(s.Small,{children:["Tip: Prefer dependency injection (pass collaborators as params) so you can mock ",e.jsx("i",{children:"at the call site"})," without heavy module mocking."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Fake Timers (testing debounce/throttle)"}),e.jsx(s.Pre,{children:`function debounce(fn, wait = 200) {
  let id;
  return (...args) => {
    clearTimeout(id);
    id = setTimeout(() => fn(...args), wait);
  };
}

jest.useFakeTimers();

test("debounce delays calls", () => {
  const fn = jest.fn();
  const d = debounce(fn, 300);

  d("A");
  d("B"); // only the last call should fire after 300ms

  // fast-forward time
  jest.advanceTimersByTime(299);
  expect(fn).not.toHaveBeenCalled();

  jest.advanceTimersByTime(1);
  expect(fn).toHaveBeenCalledWith("B");
});`}),e.jsxs(s.Small,{children:["Remember to switch back with ",e.jsx(s.InlineCode,{children:"jest.useRealTimers()"})," if needed."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Test Environment (jsdom vs node)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"jsdom"}),": simulates a browser DOM in Node. Use for DOM-related tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"node"}),": pure Node environment. Use for server-side or logic-only tests."]})]}),e.jsx(s.Pre,{children:`/**
 * @jest-environment jsdom
 */
// put this docblock at the top of a test file to force jsdom

/**
 * @jest-environment node
 */
// ...or node, depending on the test's needs`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Running Tests & Coverage"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Run all:"})," ",e.jsx(s.InlineCode,{children:"npx jest"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Watch:"})," ",e.jsx(s.InlineCode,{children:"npx jest --watch"})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Filter by name:"})," ",e.jsx(s.InlineCode,{children:'npx jest -t "sum"'})]}),e.jsxs("li",{children:[e.jsx("b",{children:"Coverage:"})," ",e.jsx(s.InlineCode,{children:"npx jest --coverage"})," (creates a coverage report)"]})]}),e.jsx(s.Pre,{children:`// jest.config.js (example)
module.exports = {
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
};`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," name tests clearly: what behavior is validated?"]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," test ",e.jsx("i",{children:"observables"})," (outputs, DOM, calls), not implementation details."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," await/return Promises in async tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," test private internals; refactor to expose behavior through public APIs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," over-mock; prefer small real collaborators when possible."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Runner"}),": program that finds and executes tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Assertion"}),": an expectation you claim must be true."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Matcher"}),": assertion helper (e.g., ",e.jsx(s.InlineCode,{children:"toBe"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fixture"}),": reusable sample data or setup for tests."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Test double"}),": any fake used in tests (mock/spy/stub/fake)."]})]})]}),e.jsxs(s.Callout,{children:["Summary: With Jest you write readable tests using ",e.jsx("i",{children:"describe"}),"/",e.jsx("i",{children:"test"})," and ",e.jsx("i",{children:"expect"}),". Learn the essential matchers, handle async correctly, mock dependencies thoughtfully, and use fake timers for timing code. Keep tests focused on behavior, not internals."]})]});export{i as default};
