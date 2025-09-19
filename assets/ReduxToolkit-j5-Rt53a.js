import{j as e}from"./index-Der9nZEc.js";import{S as t}from"./styled-BuOdSR0Z.js";const i=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"Redux Toolkit (RTK)"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"Redux Toolkit (RTK)"})," is the official, batteries-included way to write Redux. It reduces boilerplate, uses ",e.jsx(t.InlineCode,{children:"Immer"})," for immutable updates, configures sensible defaults (DevTools, Thunk), and encourages good patterns."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Why Redux Toolkit?"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Less code:"})," ",e.jsx(t.InlineCode,{children:"createSlice"})," generates actions + reducer together."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Safe updates:"}),' write "mutating" logic; Immer produces immutable state under the hood.']}),e.jsxs("li",{children:[e.jsx("b",{children:"Good defaults:"})," DevTools, Thunk, serializable checks via ",e.jsx(t.InlineCode,{children:"configureStore"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Consistent structure:"})," slices for each domain; simple to scale."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Core Terms"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Redux:"})," a predictable state container using a single state tree and pure reducers."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Store:"})," an object that holds app state and lets you ",e.jsx("i",{children:"dispatch"})," actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State tree:"})," the current snapshot of your app's data inside the store."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action:"})," a plain object that describes “what happened” (at minimum a ",e.jsx(t.InlineCode,{children:"type"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Reducer:"})," a function ",e.jsx(t.InlineCode,{children:"(state, action) ⇒ newState"})," with no side-effects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Slice:"})," a Redux Toolkit unit containing a reducer + its initial state + auto-generated actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Dispatch:"})," the way to send an action (or thunk) to the store to update state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," a function that reads/derives data from the store (e.g., ",e.jsx(t.InlineCode,{children:"state.todos.items"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Middleware:"})," functions that sit between dispatch and reducer (logging, async, analytics)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Thunk:"})," a function returned by an action creator to run async logic, then dispatch real actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Immer:"}),' a library that lets you write "mutating" code while producing immutable updates safely.']}),e.jsxs("li",{children:[e.jsx("b",{children:"createSlice:"})," RTK helper to define a slice and generate action creators + reducer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"configureStore:"})," RTK helper to create the store with good defaults (DevTools + middleware)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"createAsyncThunk:"})," RTK helper to model async flows with ",e.jsx("i",{children:"pending/fulfilled/rejected"})," actions."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Quick Start: A Counter Slice"}),e.jsx(t.Pre,{children:`// src/store/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment(state) {
      // Allowed to "mutate" thanks to Immer
      state.value += 1;
    },
    decrement(state) {
      state.value -= 1;
    },
    addBy(state, action) {
      state.value += action.payload;
    },
    reset() {
      return initialState; // returning a new state object is also fine
    },
  },
});

export const { increment, decrement, addBy, reset } = counterSlice.actions;
export default counterSlice.reducer;
`}),e.jsx(t.Pre,{children:`// src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  // middleware and devTools are on by default; customize if needed
});
`}),e.jsx(t.Pre,{children:`// src/main.jsx - wire <Provider>
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
`}),e.jsx(t.Pre,{children:`// Example component usage
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, addBy, reset } from "../store/counterSlice";

export default function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <>
      <p>Count: {value}</p>
      <button onClick={() => dispatch(increment())}>+1</button>
      <button onClick={() => dispatch(decrement())}>-1</button>
      <button onClick={() => dispatch(addBy(5))}>+5</button>
      <button onClick={() => dispatch(reset())}>Reset</button>
    </>
  );
}
`}),e.jsxs(t.Small,{children:["Note: ",e.jsx(t.InlineCode,{children:"createSlice"})," auto-creates action creators with types like ",e.jsx(t.InlineCode,{children:'"counter/increment"'}),"."]})]}),e.jsxs(t.Section,{children:[e.jsxs(t.H2,{children:["Async with ",e.jsx("code",{children:"createAsyncThunk"})]}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"What:"})," a helper to express async work; it emits ",e.jsx("i",{children:"pending"}),", ",e.jsx("i",{children:"fulfilled"}),", and ",e.jsx("i",{children:"rejected"})," actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Why:"})," standardizes loading/error handling and reduces manual action types."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Where:"})," define thunks near the slice they affect for clarity."]})]}),e.jsx(t.Pre,{children:`// src/store/usersSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Thunk: fetch users
export const fetchUsers = createAsyncThunk("users/fetchAll", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  if (!res.ok) throw new Error("Failed to fetch");
  return await res.json(); // becomes action.payload on fulfilled
});

const usersSlice = createSlice({
  name: "users",
  initialState: { items: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Unknown error";
      });
  },
});

export default usersSlice.reducer;
`}),e.jsx(t.Pre,{children:`// Usage in a component
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../store/usersSlice";

export default function UsersList() {
  const dispatch = useDispatch();
  const { items, status, error } = useSelector((s) => s.users);

  React.useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
  }, [status, dispatch]);

  if (status === "loading") return <p>Loading…</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <ul>
      {items.map(u => <li key={u.id}>{u.name}</li>)}
    </ul>
  );
}
`}),e.jsxs(t.Small,{children:[e.jsx("b",{children:"Tip:"})," avoid duplicating ",e.jsx("i",{children:"loading"})," flags in many places-centralize in the slice. For advanced caching/data fetching, use ",e.jsx(t.InlineCode,{children:"RTK Query"})," (your next topic)."]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Selectors"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Selector:"})," reads/derives data from state. Keeps components simple and testable."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Memoized selectors:"})," with ",e.jsx(t.InlineCode,{children:"reselect"})," to avoid expensive recalculation (optional for basics)."]})]}),e.jsx(t.Pre,{children:`// Basic selector
const selectCount = (state) => state.counter.value;

// With "reselect" (optional)
import { createSelector } from "@reduxjs/toolkit";
const selectItems = (state) => state.users.items;
const selectQuery = (state) => state.search.q;

export const selectFiltered = createSelector(
  [selectItems, selectQuery],
  (items, q) => items.filter(i => i.name.toLowerCase().includes(q.toLowerCase()))
);
`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Middleware & DevTools"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Default middleware:"})," thunk + immutability & serializable checks."]}),e.jsxs("li",{children:[e.jsx("b",{children:"DevTools:"})," enabled by default; time travel and inspect actions/state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Customization:"})," extend or turn off checks for specific cases (e.g., non-serializable payloads like ",e.jsx(t.InlineCode,{children:"File"}),")."]})]}),e.jsx(t.Pre,{children:`// Customize middleware
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import users from "./usersSlice";
import counter from "./counterSlice";

export const store = configureStore({
  reducer: { users, counter },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["upload/started"],
        ignoredPaths: ["upload.file"],
      },
      // immutableCheck: false, // if you need to disable temporarily
    }),
  devTools: process.env.NODE_ENV !== "production",
});
`}),e.jsx(t.Small,{children:"Keep state serializable (plain objects/arrays/numbers/strings/booleans/null). Store non-serializable values (like DOM nodes, class instances) outside Redux or in refs."})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Patterns & Structure"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"One slice per domain:"})," e.g., ",e.jsx(t.InlineCode,{children:"auth"}),", ",e.jsx(t.InlineCode,{children:"todos"}),", ",e.jsx(t.InlineCode,{children:"cart"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keep reducers pure:"})," no side-effects (network, timers) inside reducers-thunks/middleware handle those."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Use Immer correctly:"})," mutate fields on ",e.jsx(t.InlineCode,{children:"state"})," or return a brand new object; don't do both."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Derive vs store:"})," compute values in selectors (e.g., totals), avoid duplicating them in state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Project layout:"})," colocate slice, selectors, and thunks; export a minimal public API."]})]}),e.jsx(t.Pre,{children:`// Example file layout
src/
  store/
    index.js
    counterSlice.js
    usersSlice.js
  features/
    counter/
      Counter.jsx
    users/
      UsersList.jsx
`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," start with RTK - it's the recommended way to write Redux today."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep state minimal and serializable; derive computed data in selectors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," model async with ",e.jsx(t.InlineCode,{children:"createAsyncThunk"})," or adopt RTK Query later."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate function arguments or rely on dates/Math.random inside reducers-keep reducers pure."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overuse Redux; local UI state can stay in component ",e.jsx(t.InlineCode,{children:"useState"}),"."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Serializable:"})," data that can be converted to JSON without loss (no functions, classes, DOM nodes)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pure function:"})," output depends only on input; no side-effects, no mutation of external state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Domain slice:"})," a slice focused on one feature area (auth, cart, users, etc.)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action creator:"})," a function that returns an action; with RTK, generated for you."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Extra reducers:"})," field in ",e.jsx(t.InlineCode,{children:"createSlice"})," to respond to actions not defined in the slice (e.g., thunks)."]})]})]}),e.jsxs(t.Callout,{children:["Summary: RTK streamlines Redux with slices, Immer, good defaults, and standardized async. Start with ",e.jsx("i",{children:"createSlice"}),", wire the store via ",e.jsx("i",{children:"configureStore"}),", and use thunks/selectors for async and derived data."]})]});export{i as default};
