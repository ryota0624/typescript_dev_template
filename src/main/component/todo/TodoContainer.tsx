import * as React from "react";
import TodoList from "./TodoList";
import Todo from "../../models/Todo";
import * as I from "immutable";
import { Link } from "react-router";
import { TodoActionComponent, TodoActionCreator, TodoActionComponentProps } from "../../actionCreators/todoActionCreators";
import TodoStore, { TodoStoreType } from "../../store/todoStore";

interface TodoContainerState {
}

interface TodoContainerProps extends TodoActionComponentProps {
}

export default class TodoContainer extends React.Component<TodoContainerProps, TodoContainerState>
  implements TodoActionComponent {
  todoActionCreator: () => TodoActionCreator;
  constructor(props: TodoContainerProps) {
    super(props);
    this.deleteTodo = this.deleteTodo.bind(this);
  }
  componentDidMount() {
    TodoStore.addChangeListener(() => {
      this.forceUpdate();
    });
    this.todoActionCreator().list();
  }

  deleteTodo(id: number) {
    this.todoActionCreator().delete(id);
  }

  render() {
    const todos = TodoStore.getAll();

    if (todos) {
    return (
        <div>
          <Link to="/">top</Link>
          <TodoList todos={todos} deleteTodo={(n) => {}}/>
        </div>
      );
    } else {
      return (<div>loading</div>);
    }
  }
}