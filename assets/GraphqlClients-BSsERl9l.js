import{j as e}from"./index-Der9nZEc.js";import{S as i}from"./styled-D4jCORSE.js";const t=()=>e.jsxs(i.Page,{children:[e.jsx(i.Title,{children:"GraphQL Clients"}),e.jsxs(i.Lead,{children:["A ",e.jsx("b",{children:"GraphQL client"})," is a library that helps your React app send ",e.jsx("i",{children:"operations"})," (queries, mutations, subscriptions) to a GraphQL ",e.jsx("i",{children:"endpoint"}),", cache results, manage loading/errors, and keep your UI in sync. Popular choices: Apollo Client, Relay, URQL. You can also use a minimal “fetch + TanStack Query” approach."]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Core concepts & definitions"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"GraphQL"}),": a query language where the client asks for exactly the fields it needs."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Schema"}),": the contract of types and fields (written in SDL) that the server exposes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Resolver"}),": server function that resolves a field's data for a query/mutation/subscription."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Operation"}),": a single query, mutation, or subscription document sent to the server."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Endpoint"}),": the HTTP/WS URL that accepts GraphQL operations (often ",e.jsx(i.InlineCode,{children:"/graphql"}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transport"}),": how operations travel—HTTP (POST/GET) for queries/mutations, WebSocket/SSE for subscriptions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Cache"}),": client-side store of results to avoid refetching and keep UI reactive."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Fragment"}),": reusable field selection that can be composed across queries."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Normalization"}),": cache technique that stores entities by ID so multiple queries share the same data."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Why use a GraphQL client?"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Convenience"}),": hooks like ",e.jsx(i.InlineCode,{children:"useQuery"}),", ",e.jsx(i.InlineCode,{children:"useMutation"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Caching"}),": normalized caches update the UI automatically when related data changes."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Pagination"}),": helper patterns for cursor/offset pagination."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic UI"}),": show instant results before the server responds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transport"}),": HTTP + WebSocket support for realtime subscriptions."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Apollo Client — Quick Start"}),e.jsxs(i.Small,{children:["Install: ",e.jsx(i.InlineCode,{children:"npm i @apollo/client graphql"})]}),e.jsx(i.Pre,{children:`// apollo.js
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({ uri: "/graphql", credentials: "include" }), // set your endpoint
  cache: new InMemoryCache(), // normalized by default
});`}),e.jsx(i.Pre,{children:`// main.jsx
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";

<ApolloProvider client={client}>
  <App />
</ApolloProvider>`})]}),e.jsxs(i.Section,{children:[e.jsxs(i.H2,{children:["Query with ",e.jsx("code",{children:"useQuery"})]}),e.jsx(i.Pre,{children:`import { gql, useQuery } from "@apollo/client";

const GET_POSTS = gql\`
  query Posts($first: Int!, $after: String) {
    posts(first: $first, after: $after) {
      edges { node { id title excerpt } cursor }
      pageInfo { endCursor hasNextPage }
    }
  }
\`;

export default function PostsList() {
  const { data, loading, error, fetchMore } = useQuery(GET_POSTS, {
    variables: { first: 10 },
  });

  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error.message}</p>;

  const { edges, pageInfo } = data.posts;

  return (
    <>
      <ul>{edges.map(e => <li key={e.node.id}>{e.node.title}</li>)}</ul>
      {pageInfo.hasNextPage && (
        <button
          onClick={() =>
            fetchMore({ variables: { after: pageInfo.endCursor } })
          }
        >
          Load more
        </button>
      )}
    </>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Cursor pagination"}),": use ",e.jsx(i.InlineCode,{children:"endCursor"})," and"," ",e.jsx(i.InlineCode,{children:"hasNextPage"})," from ",e.jsx("i",{children:"Relay-style"})," connections."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Mutation with optimistic UI & cache update"}),e.jsx(i.Pre,{children:`import { gql, useMutation } from "@apollo/client";

const ADD_POST = gql\`
  mutation AddPost($title: String!) {
    addPost(title: $title) { id title }
  }
\`;

export function AddPostForm() {
  const [title, setTitle] = React.useState("");
  const [addPost] = useMutation(ADD_POST, {
    optimisticResponse: {
      addPost: { __typename: "Post", id: "temp-id", title },
    },
    update(cache, { data }) {
      // optional: merge into list queries, e.g., cache.modify(...)
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addPost({ variables: { title } });
        setTitle("");
      }}
    >
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}`}),e.jsxs(i.Small,{children:[e.jsx("b",{children:"Optimistic response"})," instantly updates UI. Later, the real server result reconciles the cache."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Authentication (headers)"}),e.jsx(i.Pre,{children:`import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from "@apollo/client";

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem("token");
  operation.setContext(({ headers = {} }) => ({
    headers: { ...headers, authorization: token ? \`Bearer \${token}\` : "" },
  }));
  return forward(operation);
});

export const client = new ApolloClient({
  link: authLink.concat(new HttpLink({ uri: "/graphql" })),
  cache: new InMemoryCache(),
});`}),e.jsxs(i.Small,{children:["Add ",e.jsx("b",{children:"Authorization"})," or other headers per request. Prefer secure storage and HTTPS."]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Realtime: Subscriptions"}),e.jsxs(i.Small,{children:["Use WebSockets with ",e.jsx(i.InlineCode,{children:"graphql-ws"}),"."]}),e.jsx(i.Pre,{children:`// npm i graphql-ws
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { split, HttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({ uri: "/graphql" });

const wsLink = new GraphQLWsLink(createClient({ url: "ws://localhost:4000/graphql" }));

const link = split(
  ({ query }) => {
    const def = getMainDefinition(query);
    return def.kind === "OperationDefinition" && def.operation === "subscription";
  },
  wsLink,
  httpLink
);

export const client = new ApolloClient({ link, cache: new InMemoryCache() });`}),e.jsx(i.Pre,{children:`import { gql, useSubscription } from "@apollo/client";

const NEW_POST = gql\`subscription { postAdded { id title } }\`;

function LiveFeed() {
  const { data } = useSubscription(NEW_POST);
  return <div>New: {data?.postAdded?.title}</div>;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"File uploads"}),e.jsxs(i.Small,{children:["Use the ",e.jsx("b",{children:"GraphQL multipart request"})," spec (e.g., ",e.jsx(i.InlineCode,{children:"apollo-upload-client"}),")."]}),e.jsx(i.Pre,{children:`// npm i apollo-upload-client
import { createUploadLink } from "apollo-upload-client";
import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  link: createUploadLink({ uri: "/graphql" }),
  cache: new InMemoryCache(),
});

// Mutation example (server must accept Upload scalar):
// mutation($file: Upload!) { uploadFile(file: $file) { id url } }`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Error handling"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"GraphQL errors"}),": returned in ",e.jsx(i.InlineCode,{children:"errors[]"})," with HTTP 200 (query resolved but had field-level errors)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Network errors"}),": transport failures (4xx/5xx, CORS, offline) surfaced as thrown errors."]}),e.jsxs("li",{children:["Check both ",e.jsx(i.InlineCode,{children:"error.graphQLErrors"})," and ",e.jsx(i.InlineCode,{children:"error.networkError"}),"."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Alternatives & when to choose them"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Relay"}),": powerful normalized cache, ",e.jsx("i",{children:"fragment colocation"}),", compile step, best for large graphs with strict conventions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"URQL"}),": lightweight with pluggable ",e.jsx("i",{children:"exchanges"}),", good balance of features and simplicity."]}),e.jsxs("li",{children:[e.jsx("b",{children:"TanStack Query + fetch"}),": not a GraphQL client, but great for data fetching/caching; pair with a tiny ",e.jsx("i",{children:"fetchGraphQL"})," helper."]})]}),e.jsx(i.Pre,{children:`// URQL example
import { createClient, Provider, useQuery } from "urql";
const client = createClient({ url: "/graphql" });

function Users() {
  const [res] = useQuery({ query: \`{ users { id name } }\` });
  if (res.fetching) return "Loading";
  if (res.error) return res.error.message;
  return res.data.users.map(u => <div key={u.id}>{u.name}</div>);
}

// TanStack Query + fetchGraphQL
async function fetchGraphQL(query, variables) {
  const res = await fetch("/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(json.errors[0].message);
  return json.data;
}`})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Do & Don't"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," model your schema for ",e.jsx("i",{children:"cursor pagination"})," and stable IDs; clients rely on IDs for normalization."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," colocate queries with components or use fragments to keep data needs clear."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," handle ",e.jsx("i",{children:"both"})," GraphQL and network errors in the UI."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," overfetch—ask only for fields you render; keep documents small and focused."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," block the UI while refetching; show loading states or use background updates."]})]})]}),e.jsxs(i.Section,{children:[e.jsx(i.H2,{children:"Glossary"}),e.jsxs(i.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"SDL"}),": Schema Definition Language (",e.jsxs(i.InlineCode,{children:["type Query ","... "]}),")."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Document"}),": text that contains queries/mutations/subscriptions and fragments."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Normalization"}),": storing entities by ID (",e.jsx(i.InlineCode,{children:"{Post: {1: {...}}}"}),") so multiple queries share references."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Optimistic UI"}),": temporary client-side result applied before the server responds."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Exchange/Link"}),": URQL/Apollo plugin stages that modify/route operations."]})]})]}),e.jsx(i.Callout,{children:"Summary: pick a client that fits your app scale. Apollo balances features and ease; Relay excels at large graphs with strict patterns; URQL is lean and flexible. Learn queries, mutations, subscriptions, caching, pagination, and error handling, and you'll be productive with any GraphQL stack."})]});export{t as default};
