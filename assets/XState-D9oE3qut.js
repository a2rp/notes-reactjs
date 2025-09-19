import{j as e}from"./index-DqLKwkYK.js";import{S as s}from"./styled-Cqpx3hES.js";const n=()=>e.jsxs(s.Page,{children:[e.jsx(s.Title,{children:"XState (State Machines & Statecharts)"}),e.jsxs(s.Lead,{children:[e.jsx("b",{children:"XState"})," lets you model UI logic as a ",e.jsx("i",{children:"state machine/statechart"}),"—a graph of",e.jsx("b",{children:" states"})," and ",e.jsx("b",{children:"events"})," with strict, predictable transitions. Instead of “if/else soup,” you enumerate valid states and how the app moves between them."]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Why use XState?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Clarity:"})," You list allowed states and transitions explicitly."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Predictability:"})," No “impossible” states (e.g., ",e.jsx("code",{children:"loading & success"})," at once)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Async made sane:"})," Model loading, success, error, and retries as first-class states."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Composition:"})," Nest machines, run them in parallel, and spawn child actors."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Testability:"})," You can unit-test transitions without rendering UI."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Core vocabulary (precise definitions)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"State machine:"})," A finite set of ",e.jsx("i",{children:"states"})," and ",e.jsx("i",{children:"events"})," with rules (transitions) for moving between states."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Statechart:"})," A richer machine supporting ",e.jsx("i",{children:"hierarchical"})," (nested) and ",e.jsx("i",{children:"parallel"})," states, entry/exit actions, and history."]}),e.jsxs("li",{children:[e.jsx("b",{children:"State:"})," A named mode like ",e.jsx("code",{children:"idle"}),", ",e.jsx("code",{children:"loading"}),", ",e.jsx("code",{children:"success"}),", ",e.jsx("code",{children:"failure"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Event:"})," A signal that something happened, e.g. ",e.jsx("code",{children:"{ type: 'SUBMIT' }"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Transition:"})," How a state reacts to an event (target state + optional guard/actions)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Guard:"})," A boolean condition that decides whether a transition is allowed."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Action:"})," Synchronous effect (e.g., log, assign to context) performed during a transition."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Context:"})," Extended data carried by the machine (e.g., form values, fetched data)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Service / Invocation:"})," An async task the machine runs (e.g., fetch). Handles ",e.jsx("code",{children:"onDone/onError"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Entry / Exit:"})," Actions that run when a state is ",e.jsx("i",{children:"entered"})," or ",e.jsx("i",{children:"exited"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Actor:"})," A running unit (machine or promise/observable/callback). Actors can ",e.jsx("i",{children:"spawn"})," other actors."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Minimal machine (toggle)"}),e.jsx(s.Pre,{children:`// xstate-style pseudo (works with createMachine from 'xstate')
import { createMachine } from 'xstate';

export const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active:   { on: { TOGGLE: 'inactive' } }
  }
});`}),e.jsx(s.Small,{children:"A machine is just a config object. No UI here—pure behavior you can test."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Using a machine in React"}),e.jsx(s.Pre,{children:`import { useMachine } from '@xstate/react';
import { toggleMachine } from './machines/toggleMachine';

function ToggleButton() {
  const [state, send] = useMachine(toggleMachine);
  const isActive = state.matches('active');

  return (
    <button onClick={() => send({ type: 'TOGGLE' })}>
      {isActive ? 'On' : 'Off'}
    </button>
  );
}`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"state.matches('active')"})," checks the current state by name. ",e.jsx("b",{children:"send(event)"})," dispatches events."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Guards, actions, context (extended state)"}),e.jsx(s.Pre,{children:`import { createMachine, assign } from 'xstate';

export const counterMachine = createMachine({
  id: 'counter',
  context: { count: 0, min: 0, max: 5 },        // extended data
  initial: 'ready',
  states: {
    ready: {
      on: {
        INC: { guard: 'canInc', actions: 'inc' },
        DEC: { guard: 'canDec', actions: 'dec' },
        SET: { actions: 'setTo' }
      }
    }
  }
}, {
  guards: {
    canInc: (ctx) => ctx.count < ctx.max,
    canDec: (ctx) => ctx.count > ctx.min
  },
  actions: {
    inc: assign({ count: (ctx) => ctx.count + 1 }),
    dec: assign({ count: (ctx) => ctx.count - 1 }),
    setTo: assign({ count: (ctx, evt) => Number(evt.value) ?? ctx.count })
  }
});`}),e.jsxs(s.Small,{children:[e.jsx("b",{children:"assign"})," updates context immutably. ",e.jsx("b",{children:"guards"})," control whether a transition is allowed."]})]}),e.jsxs(s.Section,{children:[e.jsxs(s.H2,{children:["Async work with ",e.jsx("code",{children:"invoke"})]}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"invoke:"})," attach an async service to a state. It runs when the state is entered and can transition on success/error."]}),e.jsxs("li",{children:[e.jsx("b",{children:"onDone/onError:"})," handle completion using data from the promise."]})]}),e.jsx(s.Pre,{children:`import { createMachine, assign } from 'xstate';

export const userMachine = createMachine({
  id: 'user',
  context: { user: null, error: null },
  initial: 'idle',
  states: {
    idle:    { on: { FETCH: 'loading' } },
    loading: {
      invoke: {
        src: 'fetchUser',                 // a function that returns a Promise
        onDone: {
          target: 'success',
          actions: assign({ user: (_, e) => e.data })
        },
        onError: {
          target: 'failure',
          actions: assign({ error: (_, e) => e.data ?? e.message })
        }
      }
    },
    success: { on: { REFRESH: 'loading' } },
    failure: { on: { RETRY: 'loading' } }
  }
}, {
  services: {
    fetchUser: () => fetch('/api/user').then(r => r.json())
  }
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Hierarchical (nested) states"}),e.jsx(s.Pre,{children:`const authMachine = createMachine({
  id: 'auth',
  initial: 'signedOut',
  states: {
    signedOut: { on: { LOGIN: 'signingIn' } },
    signingIn: {
      initial: 'form',
      states: {
        form:    { on: { SUBMIT: 'verifying' } },
        verifying: {
          invoke: { src: 'verify', onDone: '#auth.signedIn', onError: 'form' }
        }
      }
    },
    signedIn: { id: 'signedIn', on: { LOGOUT: 'signedOut' } }
  }
});`}),e.jsxs(s.Small,{children:["Nested states organize complex flows. Note the absolute target ",e.jsx("code",{children:"#auth.signedIn"}),"."]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Parallel states"}),e.jsx(s.Pre,{children:`const editorMachine = createMachine({
  type: 'parallel',                 // run child states simultaneously
  states: {
    network: { initial: 'idle', states: { idle: {}, saving: {}, error: {} }},
    ui:      { initial: 'clean', states: { clean: {}, dirty: {} }},
    panel:   { initial: 'preview', states: { preview: {}, code: {} }}
  }
});`}),e.jsx(s.Small,{children:"Useful when independent concerns (network, UI dirtiness, active panel) evolve separately."})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Actors & spawn (multiple concurrent tasks)"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Actor:"})," a running process (machine/service) you can send events to."]}),e.jsxs("li",{children:[e.jsx("b",{children:"spawn:"})," start a child actor from a parent to manage many items (e.g., a list of upload tasks)."]})]}),e.jsx(s.Pre,{children:`// Concept: a parent machine that spawns a child per upload
const uploadsMachine = createMachine({
  context: { items: [] },
  on: {
    ADD_UPLOAD: { actions: 'spawnUpload' }
  }
}, {
  actions: {
    spawnUpload: assign({
      items: (ctx, evt) => [
        ...ctx.items,
        /* spawn(uploadMachine.withContext({ file: evt.file })) */
      ]
    })
  }
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Time, delays, transient transitions"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"after:"})," send an event/transition after a delay."]}),e.jsxs("li",{children:[e.jsx("b",{children:"transient:"})," immediate transition based on a guard (event type ",e.jsx("code",{children:"''"}),")."]})]}),e.jsx(s.Pre,{children:`const splashMachine = createMachine({
  initial: 'show',
  states: {
    show: {
      after: { 1500: 'go' }     // move after 1.5s
    },
    go: {}
  }
});

const routeGuard = createMachine({
  initial: 'check',
  states: {
    check: {
      // transient transition (no event) based on a guard
      on: { '': [{ target: 'auth', guard: 'isAuthed' }, { target: 'login' }] }
    },
    auth: {}, login: {}
  }
});`})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Do & Don't"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," name states clearly; avoid overloaded “flags” in context."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," keep async work in ",e.jsx("code",{children:"invoke"}),", not inside actions."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Do"})," test transitions without rendering UI—machines are pure data."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," duplicate UI state in context that can be derived from ",e.jsx("code",{children:"state.matches()"}),"."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Don't"})," mutate context directly—use ",e.jsx("code",{children:"assign"}),"."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"When should I use XState?"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Great fit:"})," multi-step flows (auth, checkout), complex async (retry/cancel), multi-pane editors, complex toggles."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Maybe overkill:"})," very small local UI where a simple ",e.jsx("code",{children:"useReducer"})," or ",e.jsx("code",{children:"useState"})," is enough."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Quick checklist"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:["List the ",e.jsx("b",{children:"states"})," of your feature first."]}),e.jsxs("li",{children:["List the ",e.jsx("b",{children:"events"})," that can happen."]}),e.jsxs("li",{children:["Draw transitions; add ",e.jsx("b",{children:"guards"})," where needed."]}),e.jsxs("li",{children:["Move side effects to ",e.jsx("b",{children:"invoke"})," or explicit ",e.jsx("b",{children:"actions"}),"."]}),e.jsxs("li",{children:["Use ",e.jsx("b",{children:"state.matches()"})," in components to render intent-based UI."]})]})]}),e.jsxs(s.Section,{children:[e.jsx(s.H2,{children:"Glossary"}),e.jsxs(s.List,{children:[e.jsxs("li",{children:[e.jsx("b",{children:"Initial state:"})," the first state when the machine starts."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Final state:"})," a terminal state (the machine/branch stops when reached)."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Entry/Exit action:"})," code that runs when entering/leaving a state."]}),e.jsxs("li",{children:[e.jsx("b",{children:"History state:"})," pseudo-state that remembers the last sub-state in a region."]}),e.jsxs("li",{children:[e.jsx("b",{children:"Parallel state:"})," a node where multiple child states are active together."]})]})]}),e.jsxs(s.Callout,{children:["Summary: XState helps you ",e.jsx("b",{children:"model before you code"}),". By enumerating states and events, you get a predictable system that's easier to test, discuss, and evolve."]})]});export{n as default};
