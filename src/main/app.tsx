import * as ReactDOM from "react-dom";
import * as React from "react";
import {app} from "./syncle/routing/index";
import {createStore} from "redux";
import {reducer} from "./reducers/followTopics/reducer";



function start() {
  const App = app(createStore(reducer));
  const el = document.getElementById("app");
  if (el !== null) {
    ReactDOM.render(<App />, el);
  }
}

start();