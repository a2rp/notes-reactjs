import{j as e}from"./index-CNzueKa1.js";import{S as t}from"./styled-DpwK08su.js";const r=()=>e.jsxs(t.Page,{children:[e.jsx(t.Title,{children:"RTK Query"}),e.jsxs(t.Lead,{children:[e.jsx("b",{children:"RTK Query"})," is a data fetching and caching tool built into"," ",e.jsx(t.InlineCode,{children:"@reduxjs/toolkit"}),". It lets you declare ",e.jsx("i",{children:"endpoints"})," (queries/mutations), auto-generate React hooks, cache server responses, and invalidate/refetch data with minimal code."]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Core Definitions"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Endpoint:"})," a named API operation you define inside"," ",e.jsx(t.InlineCode,{children:"createApi"}),". Endpoints are either"," ",e.jsx("b",{children:"queries"})," (read data) or ",e.jsx("b",{children:"mutations"})," (create/update/delete)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Query:"})," a read-only endpoint that fetches data and caches the result by a ",e.jsx("em",{children:"cache key"})," derived from its arguments."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Mutation:"})," a write endpoint that sends changes to the server and usually"," ",e.jsx("b",{children:"invalidates"})," related caches to trigger refetch."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Base Query:"})," the low-level request function used by all endpoints (e.g., ",e.jsx(t.InlineCode,{children:"fetchBaseQuery"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache / Cache Key:"})," responses are stored in an in-memory cache keyed by the endpoint name + serialized args. Identical args ⇒ same cache entry."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tags & Invalidation:"})," a labeling system (",e.jsx(t.InlineCode,{children:"tagTypes"}),",",e.jsx(t.InlineCode,{children:"providesTags"}),","," ",e.jsx(t.InlineCode,{children:"invalidatesTags"}),") that links responses and mutations so RTK Query knows what to refetch."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Keep Unused Data:"})," ",e.jsx(t.InlineCode,{children:"keepUnusedDataFor"})," determines how long a cache entry stays after the last component unsubscribes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Auto-generated Hooks:"})," for each endpoint, RTK Query gives you a React hook:",e.jsx(t.InlineCode,{children:"useGetSomethingQuery"}),","," ",e.jsx(t.InlineCode,{children:"useUpdateSomethingMutation"}),", etc."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Minimal Setup"}),e.jsx(t.Pre,{children:`// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',                       // where RTKQ stores cache in Redux state
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Post', 'User'],               // declare all tags up-front
  endpoints: (builder) => ({
    // Query: GET /posts
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: (result) =>
        // result might be undefined initially
        result
          ? [
              ...result.map((p) => ({ type: 'Post', id: p.id })),
              { type: 'Post', id: 'LIST' },
            ]
          : [{ type: 'Post', id: 'LIST' }],
    }),

    // Query: GET /posts/:id
    getPost: builder.query({
      query: (id) => \`/posts/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),

    // Mutation: POST /posts
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: [{ type: 'Post', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
} = api;`}),e.jsx(t.Pre,{children:`// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { api } from './features/api/apiSlice';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    // ...your other slices
  },
  middleware: (getDefault) => getDefault().concat(api.middleware),
});`}),e.jsx(t.Pre,{children:`// src/main.jsx (wrap the app with Provider)
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Using the Hooks"}),e.jsx(t.Pre,{children:`// Query example
function PostsList() {
  const { data: posts, isLoading, isError, error, refetch } = useGetPostsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError)   return <p>Error: {error?.status || 'unknown'}</p>;

  return (
    <>
      <button onClick={() => refetch()}>Refetch</button>
      <ul>{posts?.map(p => <li key={p.id}>{p.title}</li>)}</ul>
    </>
  );
}

// Mutation example
function AddPostForm() {
  const [addPost, { isLoading, isSuccess, error }] = useAddPostMutation();

  async function onSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = { title: form.get('title') };
    await addPost(payload); // invalidates 'Post/LIST' → getPosts will refetch
    e.currentTarget.reset();
  }

  return (
    <form onSubmit={onSubmit}>
      <input name="title" placeholder="New title" />
      <button disabled={isLoading}>Create</button>
      {isSuccess && <small>Created!</small>}
      {error && <small>Failed.</small>}
    </form>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Caching, Lifetimes & Refetching"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"keepUnusedDataFor:"})," seconds to keep cached data after last subscriber unmounts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"refetchOnMountOrArgChange:"})," true/number/'always' — refetch when component mounts or when args change (or if cache is older than N seconds)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"refetchOnFocus"})," & ",e.jsx("b",{children:"refetchOnReconnect:"})," auto refetch when window refocuses or network reconnects."]}),e.jsxs("li",{children:[e.jsx("b",{children:"pollingInterval:"})," continuously refetch every N ms while the component is mounted."]})]}),e.jsx(t.Pre,{children:`// Per-endpoint options
getPosts: builder.query({
  query: () => '/posts',
  keepUnusedDataFor: 60,            // cache stays 60s after last use
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchOnMountOrArgChange: 30,    // stale after 30s → refetch on mount
});`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Tags & Invalidation Patterns"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Return a ",e.jsx("b",{children:"LIST"})," tag for collection queries and individual ",e.jsx("b",{children:"{id}"})," tags for per-item queries."]}),e.jsxs("li",{children:["Mutations should ",e.jsx("b",{children:"invalidatesTags"})," for the affected items and/or the LIST to ensure correct refetch."]}),e.jsx("li",{children:"When deleting, invalidate the item's tag and the LIST."})]}),e.jsx(t.Pre,{children:`// Delete pattern
deletePost: builder.mutation({
  query: (id) => ({ url: \`/posts/\${id}\`, method: 'DELETE' }),
  invalidatesTags: (result, error, id) => [
    { type: 'Post', id },
    { type: 'Post', id: 'LIST' },
  ],
});`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Selecting Efficiently (avoid re-renders)"}),e.jsx(t.List,{children:e.jsxs("li",{children:["Use ",e.jsx(t.InlineCode,{children:"selectFromResult"})," to pluck a small slice from a query result, memoized by RTK Query to avoid unnecessary updates."]})}),e.jsx(t.Pre,{children:`// Pick just a single post by id from the posts list
function PostTitle({ id }) {
  const { data: title } = useGetPostsQuery(undefined, {
    selectFromResult: ({ data }) => ({
      data: data?.find(p => p.id === id)?.title
    }),
  });
  return <span>{title ?? '...'}</span>;
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Conditional, Lazy & Prefetch"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Conditional:"})," pass ",e.jsx(t.InlineCode,{children:"skipToken"})," to skip until you have the input."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Lazy queries:"})," ",e.jsx(t.InlineCode,{children:"const [trigger, result] = useLazyGetPostQuery()"})," ","lets you fetch on demand (e.g., button click)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Prefetch:"})," use ",e.jsx(t.InlineCode,{children:"api.util.prefetch"})," to warm the cache."]})]}),e.jsx(t.Pre,{children:`import { skipToken } from '@reduxjs/toolkit/query';

function UserProfile({ userId }) {
  const queryArg = userId ?? skipToken; // don't fetch until userId exists
  const { data } = useGetPostQuery(queryArg);
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

// Lazy
function Lookup() {
  const [trigger, { data, isFetching }] = useLazyGetPostQuery();
  return (
    <>
      <button onClick={() => trigger(42)}>Fetch #42</button>
      {isFetching ? 'Loading...' : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  );
}`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Optimistic Updates (updateQueryData)"}),e.jsx(t.List,{children:e.jsxs("li",{children:["Use ",e.jsx(t.InlineCode,{children:"onQueryStarted"})," to optimistically update cached data and roll back on error."]})}),e.jsx(t.Pre,{children:`// Inside createApi endpoints
toggleLike: builder.mutation({
  query: (id) => ({ url: \`/posts/\${id}/like\`, method: 'POST' }),
  async onQueryStarted(id, { dispatch, queryFulfilled }) {
    // patch cached list
    const patch = dispatch(
      api.util.updateQueryData('getPosts', undefined, (draft) => {
        const post = draft?.find(p => p.id === id);
        if (post) post.liked = !post.liked;
      })
    );
    try {
      await queryFulfilled;           // commit
    } catch {
      patch.undo();                   // rollback on error
    }
  },
  invalidatesTags: (r, e, id) => [{ type: 'Post', id }],
});`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Auth, Headers & Error Handling"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:["Add tokens via ",e.jsx(t.InlineCode,{children:"prepareHeaders"})," in"," ",e.jsx(t.InlineCode,{children:"fetchBaseQuery"}),"."]}),e.jsxs("li",{children:["Read ",e.jsx(t.InlineCode,{children:"error"})," object from hooks for status codes and messages."]}),e.jsxs("li",{children:["You can wrap ",e.jsx(t.InlineCode,{children:"baseQuery"})," to handle refresh tokens globally."]})]}),e.jsx(t.Pre,{children:`const baseQuery = fetchBaseQuery({
  baseUrl: '/api',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) headers.set('authorization', \`Bearer \${token}\`);
    return headers;
  },
});`})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Do & Don't"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," model reads as queries and writes as mutations."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use tags to keep data fresh after writes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," use ",e.jsx(t.InlineCode,{children:"selectFromResult"})," to minimize re-renders."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," manually store fetched data in your own slices unless you have a special reason."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," refetch everything; invalidate only what changed."]})]})]}),e.jsxs(t.Section,{children:[e.jsx(t.H2,{children:"Glossary"}),e.jsxs(t.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"RTK:"})," Redux Toolkit, the official batteries-included Redux package."]}),e.jsxs("li",{children:[e.jsx("b",{children:"RTK Query:"})," RTK's data fetching and caching layer."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Endpoint:"})," a named API operation (query/mutation) defined in ",e.jsx(t.InlineCode,{children:"createApi"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Tag:"})," a label you attach to cached data, used to decide what to refetch."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache key:"})," endpoint + serialized args that identifies a cache entry."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic update:"})," update the UI immediately while the request is in flight, roll back on error."]})]})]}),e.jsxs(t.Callout,{children:["Summary: Define endpoints with ",e.jsx("i",{children:"createApi"}),", use the generated hooks, and let RTK Query handle caching and invalidation. Start simple (queries + mutations), then add tags, conditional/lazy fetching, and optimistic updates as needed."]})]});export{r as default};
