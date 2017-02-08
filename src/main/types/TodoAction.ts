import actionTypes, {Action} from "../constants/ActionConstants";
import Todo from "../models/Todo";

export interface TodoListAction extends Action<typeof actionTypes.LIST_TODO> {
  todos: Todo[];
}

export interface TodoAddAction extends Action<typeof actionTypes.ADD_TODO> {
  todo: Todo;
}

export interface TodoDeleteAction extends Action<typeof actionTypes.DELETE_TODO> {
  id: number;
}

export type TodoAction = TodoListAction | TodoAddAction | TodoDeleteAction;

export function isTodoAction(action: Action<string>): action is TodoAction {
  return [actionTypes.ADD_TODO, actionTypes.DELETE_TODO, actionTypes.LIST_TODO]
    .some(todoActionType => todoActionType === action.actionType);
}