import actionTypes, {Action} from "../ActionConstants";
import Todo from "../../models/Todo";

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