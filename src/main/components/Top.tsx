import * as React from "react";
import { Link } from "react-router";

export default class Hello extends React.Component<{ str: string }, {}> {
  static World() {
    return "World";
  }
  render() {
    return (
      <ul>
        <li>hello! {this.props.str}</li>
        <li><Link to={"/todos"}>todos</Link></li>
      </ul>
    );
  };
}