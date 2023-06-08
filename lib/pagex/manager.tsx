import { ComponentType, useEffect, useReducer, useState } from "react";
import { useMachine } from "@xstate/react";
import { createMachine, assign } from "xstate";

interface PageManagerContext {
  current: { route: string; component: ComponentType<any> | null } | null;
  next: { route: string; component: ComponentType<any> | null } | null;
  nextNext: { route: string; component: ComponentType<any> | null } | null;
}

const machine = createMachine<PageManagerContext>(
  {
    id: "machine",
    initial: "stationary",
    context: {
      current: null,
      next: null,
      nextNext: null,
    },
    states: {
      stationary: {
        always: [
          {
            target: "transitioning.exiting",
            cond: "isNextReady",
          },
        ],
        on: {
          ROUTE_CHANGE: {
            target: "stationary",
            actions: assign({
              next: (context, event) => {
                if (event.route !== context.current?.route) {
                  return {
                    route: event.route,
                    component: event.component,
                  };
                }
                return context.next;
              },
            }),
          },
        },
      },
      transitioning: {
        type: "compound",
        initial: "exiting",
        on: {
          ROUTE_CHANGE: {
            actions: assign({
              nextNext: (context, event) => {
                if (event.route !== context.next?.route) {
                  return {
                    route: event.route,
                    component: event.component,
                  };
                }
                return context.nextNext;
              },
            }),
          },
        },
        states: {
          exiting: {
            always: {
              target: "entering",
              cond: "isCurrentNull",
            },
            on: {
              EXIT_COMPLETE: "entering",
            },
          },
          entering: {
            on: {
              ENTER_COMPLETE: {
                target: "#machine.stationary",
                actions: assign({
                  current: (context, event) => {
                    return context.next;
                  },
                  next: (context, event) => {
                    return context.nextNext;
                  },
                  nextNext: (context, event) => null,
                }),
              },
            },
          },
        },
      },
    },
  },
  {
    guards: {
      isNextReady: (context) => !!context.next?.component,
      isCurrentNull: (context) => context.current === null,
    },
  }
);

// export enum LoadStatus {
//   Loading = "loading",
//   Success = "success",
//   Error = "error",
// }

// interface Action {
//   type: string;
// }

// export interface RouteChangeAction extends Action {
//   type: "RouteChange";
//   payload: {
//     route: string;
//   };
// }

// export interface RouteEnterAnimationCompleteAction extends Action {
//   type: "RouteEnterAnimationComplete";
//   payload: {
//     route: string;
//   };
// }

// export interface RouteExitAnimationCompleteAction extends Action {
//   type: "RouteExitAnimationComplete";
//   payload: {
//     route: string;
//   };
// }

export type PageState = {
  route: string;
  component: ComponentType<any> | null;
};

export type PageManagerState = {
  current: PageState | null;
  next: PageState | null;
  nextNext: PageState | null;
};

export const usePageManager = () => {
  const [state, dispatch] = useMachine(machine);
  return {
    state,
    dispatch,
  };
};
