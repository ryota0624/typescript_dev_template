import * as React from "react";

export default class Hello extends React.Component<{ str: string }, {}> {
  static World() {
    return "World";
  }
  render() {
    return (
      <div>{this.props.str}</div>
    );
  }
}