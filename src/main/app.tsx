import * as ReactDOM from "react-dom";
import * as React from "react";
import Hello from "./component/Hello";

const app = document.getElementById("app");
if (app !== null) {
  ReactDOM.render(<Hello str={"Hello World"} />, app);
}
