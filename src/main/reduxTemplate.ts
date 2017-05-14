import {Action, Reducer, createStore} from 'redux';

interface ActionBase<T> extends Action {
  type: T
}

class Todo {
  id: string;
}

interface TodoState {
  todos: Todo[]
}

const TodoAddActionType = "todoAddActionType";
interface TodoAddAction extends ActionBase<typeof TodoAddActionType> {
  todo: Todo
}

const TodoRemoveActionType = "todoRemoveActionType";
interface TodoRemoveAction extends ActionBase<typeof TodoRemoveActionType>  {
  todoId: string
}

type TodoAction = TodoAddAction | TodoRemoveAction;

const todoReducer: Reducer<TodoState> = (state: TodoState, action: TodoAction) => {
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

const todoStore = createStore(todoReducer);

console.log(todoStore.getState());
