import {Reducer, createStore} from 'redux';
import {Action} from './common';


export class Todo {
  id: string;
}

export interface TodoState {
  todos: Todo[]
}

export const TodoAddActionType = "todoAddActionType";
export interface TodoAddAction extends Action<typeof TodoAddActionType> {
  todo: Todo
}

export const TodoRemoveActionType = "todoRemoveActionType";
export interface TodoRemoveAction extends Action<typeof TodoRemoveActionType>  {
  todoId: string
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
      return state
    }
  }
  return state;
};
