import * as Flux from "flux";
import ActionConstants from "../constants/ActionConstants";
import Todo from "../models/Todo";
import { ActionType } from "../constants/types/Action";
import Dispather, {AppDispatcher} from "../flux/dispatcher";
//
import { sampleTodosData } from "../data";
import * as React from "react";

export class TodoActionCreator {
  constructor(private dispatcher: AppDispatcher) {
  }
  list() {
    this.dispatcher.dispatch({
      actionType: ActionConstants.LIST_TODO,
      todos: sampleTodosData.toArray()
    });
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
    })
  }
}

const singleton = new TodoActionCreator(Dispather);

export interface TodoActionComponentProps {}
export class TodoActionComponent extends React.Component<TodoActionComponentProps, any> {
  todoActionCreator(): TodoActionCreator {
    return singleton;
  }
}