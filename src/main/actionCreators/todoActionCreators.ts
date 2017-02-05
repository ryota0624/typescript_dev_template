import * as Flux from "flux";
import ActionConstants from "../constants/ActionConstants";
import Todo from "../models/Todo";
import { ActionType } from "../constants/types/Action";
import Dispather, {AppDispatcher, injectDispatcher} from "../flux/dispatcher";
import { Constructable } from "../utils/mixinUtils";
import { sampleTodosData } from "../data";
import * as React from "react";

export class TodoActionCreator {
  dispatcher: AppDispatcher;
  list() {
    setTimeout(() => 
    this.dispatcher.dispatch({
      actionType: ActionConstants.LIST_TODO,
      todos: sampleTodosData.toArray()
    }), 1000);
  }

  add(todo: Todo) {
    this.dispatcher.dispatch({
      actionType: ActionConstants.ADD_TODO,
      todo
    });
  }

  delete(id: number) {
    this.dispatcher.dispatch({
      actionType: ActionConstants.DELETE_TODO,
      id
    });
  }
}

const InjectedClass = injectDispatcher(TodoActionCreator);
const singleton = new InjectedClass();

export type TodoActionCreatorType = new (...args: any[]) => object & { todoActionCreator: TodoActionCreator};

export function injectTodoActionCreator(target: React.ComponentClass<any>) {
  return class extends target {
    todoActionCreator: TodoActionCreator = singleton;
  }
}
