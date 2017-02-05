import { Store } from "./Store";
import * as I from "immutable";
import Todo from "../models/Todo";
import Dispatcher, { AppDispatcher } from "../flux/dispatcher";
import ActionTypes from "../constants/ActionConstants";

type TodoStoreState = I.OrderedMap<number, Todo>;
type TodoStoreStateType = TodoStoreState | null;

function addTodoStore(state: TodoStoreState, todo: Todo): TodoStoreState {
  return state.set(todo.id, todo);
}

function storeTodoStore(state: TodoStoreStateType, todoList: Todo[]): TodoStoreState {
  return I.OrderedMap<number, Todo>(todoList.map(todo => [todo.id, todo]));
}

export class TodoStore extends Store {
  constructor(private todos: TodoStoreStateType, dispatcher: AppDispatcher) {
    super();
    dispatcher.register(payload => {
      switch (payload.actionType) {
        case ActionTypes.ADD_TODO:
          if (this.todos) {
            this.todos = addTodoStore(this.todos, payload.todo);
            this.emitChange();
          }
          break;
        case ActionTypes.LIST_TODO:
          this.todos = storeTodoStore(this.todos, payload.todos);
          this.emitChange();
          break;
      }
    });
  }

  isLoaded() {
    return true;
  }

  isEmpty() {
    if (this.todos !== null) {
      return this.todos.isEmpty();
    } else {
      return false;
    }
  }

  getAll(): I.List<Todo> | null {
    if (this.todos) {
      return this.todos.toList();
    } else {
      return null;
    }
  }
}

export type TodoStoreType = typeof TodoStore;

let singleton: TodoStore = new TodoStore(null, Dispatcher);

export default singleton;
