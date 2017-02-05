import * as React from "react";
import Todo from "../../models/Todo";
import * as I from "immutable";

interface TodoListProps {
  todos: I.List<Todo>;
  deleteTodo: (id: number) => void;
}

export default class TodoList extends React.Component<TodoListProps, {}> {
  render() {
    const { todos, deleteTodo } = this.props;
    return (
      <table>
        <tbody>
          {todos.map((todo: Todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.id}</td>
                <td>{todo.title}</td>
                <td>{todo.createdDate.toDateString()}</td>
                <td><button onClick={() => deleteTodo(todo.id)}>delete</button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };
}