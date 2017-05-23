import * as AccountReducer from "./AccountReducer";
import * as TodoReducer from "./TodoReducer";
import {Reducer, combineReducers, createStore} from "redux";

export type Actions = AccountReducer.AccountAction | TodoReducer.TodoAction;

const reducers = {
  account: AccountReducer.accountReducer,
  todo: TodoReducer.todoReducer
};

export const reducer = combineReducers<typeof reducers>(reducers);

const store = createStore(reducer);

const s = store.getState();