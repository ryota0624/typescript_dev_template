import {Reducer, createStore} from "redux";
import {Action} from "./common";


export class Todo {
  id: string;
}

export interface TodoState {
  todos: Todo[];
}

export const TodoAddActionType = "todoAddActionType";
export interface TodoAddAction extends Action<typeof TodoAddActionType> {
  todo: Todo;
}

export const TodoRemoveActionType = "todoRemoveActionType";
export interface TodoRemoveAction extends Action<typeof TodoRemoveActionType> {
  todoId: string;
}

export type TodoAction = TodoAddAction | TodoRemoveAction;

export const todoReducer: Reducer<TodoState> = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case TodoAddActionType: {
      state.todos.push(action.todo);
      return state;
    }
    case TodoRemoveActionType: {
      state.todos = state.todos.filter(todo => !(todo.id === action.todoId));
      return state;
    }
  }
  return state;
};

type CaseReducer<MsgType extends string, Msg extends Action<MsgType>, State> = {
  [key in MsgType]: <Action>(msg: Action, state: State) => State;
  };


function caseReducer<MsgType extends string, Msg extends Action<MsgType>, S>(matcher: CaseReducer<MsgType, Msg, S>) {
  return (msg: Msg, state: S) => matcher[msg.type](msg, state);
}

type TodoMsgType = typeof TodoAddActionType | typeof TodoRemoveActionType;


function matchWithDefault<ReturnType>(defaultState: ReturnType) {
  return (...cases: OneCase<any, ReturnType>[]) => {
    return function (msg: any, state: ReturnType = defaultState): ReturnType {
      const oneCase = cases.find((kase) => msg instanceof kase.klass);
      if (oneCase) {
        return oneCase.fn(msg, state);
      } else {
        throw new Error(`missing case ${msg}`);
      }
    };
  };
}

function match<ReturnType>(...cases: OneCase<any, ReturnType>[]) {
  return function (msg: any, state: ReturnType): ReturnType {
    const oneCase = cases.find((kase) => msg instanceof kase.klass);
    if (oneCase) {
      return oneCase.fn(msg, state);
    } else {
      throw new Error(`missing case ${msg}`);
    }
  };
}



interface OneCase<Klass, ReturnType> {
  fn: (instance: Klass, state: ReturnType) => ReturnType;
  klass: Klass;
}

function caseOf<Klass>(klassConstructor: new(...args: any[]) => Klass) {
  return <ReturnType>(fnction: (instance: Klass, state: ReturnType) => ReturnType) => {
    return {
      fn: fnction,
      klass: klassConstructor
    };
  };
}


class Head {
  constructor(public headStr: string) {
  }
}

class Tail {
  constructor(public tailStr: string) {
  }
}

export function start() {
  const reducer = match<string>(
    caseOf(Head)(({headStr}, state: string) => headStr + state),
    caseOf(Tail)((msg, state: string) => state + msg.tailStr)
  );

  const state = reducer(new Head("head"), "hello");
  const updated = reducer(new Tail("ass"), state);

  console.log("reducer", updated === "headhelloass");
}
// match([
//   caseOf(TodoAction)(msg, state => state),
// ]);
