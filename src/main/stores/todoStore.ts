import { Store } from "./Store";
import * as I from "immutable";
import Todo from "../models/Todo";
import { AppDispatcher } from "../flux/dispatcher";
import ActionTypes from "../constants/ActionConstants";
import * as React from "react";
import {injectable, inject} from "inversify";
import { isTodoAction } from "../types/TodoAction";

type TodoStoreState = I.OrderedMap<number, Todo>;
type TodoStoreStateType = TodoStoreState | null;

function addTodoStore(state: TodoStoreState, todo: Todo): TodoStoreState {
  return state.set(todo.id, todo);
}

function storeTodoStore(state: TodoStoreStateType, todoList: Todo[]): TodoStoreState {
  return I.OrderedMap<number, Todo>(todoList.map(todo => [todo.id, todo]));
}

function deleteTodoStore(state: TodoStoreState, id: number): TodoStoreState {
  return state.delete(id);
}

@injectable()
export class TodoStore extends Store {
  private todos: TodoStoreStateType;
  constructor(
    @inject(AppDispatcher) dispatcher: AppDispatcher) {
    super();
    dispatcher.register(payload => {
      if (!isTodoAction(payload)) {
        return;
      }
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
        case ActionTypes.DELETE_TODO:
          this.todos = deleteTodoStore(this.todos!, payload.id);
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