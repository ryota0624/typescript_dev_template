import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./components/appRoute";

const app = document.getElementById("app");
if (app !== null) {
  ReactDOM.render(<App />, app);
}
