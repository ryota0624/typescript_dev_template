import * as React from "react";
import TodoList from "./TodoList";
import Todo from "../../models/Todo";
import * as I from "immutable";
import { Link } from "react-router";
import { TodoActionCreator } from "../../actionCreators/todoActionCreators";
import { TodoStore } from "../../stores/todoStore";
import { inject, injectable } from "inversify";

import { container } from "../../../inversify.config";

interface TodoContainerState {
}

interface TodoContainerProps {
}

export default class TodoContainer extends React.Component<TodoContainerProps, TodoContainerState> {
  todoActionCreator: TodoActionCreator = container.get(TodoActionCreator);
  todoStore: TodoStore = container.get(TodoStore);
  constructor(props: TodoContainerProps) {
    super(props);
    this.deleteTodo = this.deleteTodo.bind(this);
  }

  componentDidMount() {
    this.todoStore.addChangeListener(() => {
      this.forceUpdate();
    });
    this.todoActionCreator.list();
  }

  deleteTodo(id: number) {
    this.todoActionCreator.delete(id);
  }

  render() {
    const todos = this.todoStore.getAll();

    if (todos) {
    return (
        <div>
          <Link to="/">top</Link>
          <TodoList todos={todos} deleteTodo={this.deleteTodo}/>
        </div>
      );
    } else {
      return (<div>loading</div>);
    }
  }
}