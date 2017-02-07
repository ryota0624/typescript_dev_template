import { Router, hashHistory, IndexRoute, Route } from "react-router";
import * as React from "react";
import Top from "./Top";
import TodoPage from "./todo/TodoContainer";

export default function () {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={(props) => props.children }>  
        <IndexRoute component={Top} />
        <Route path={"todos"} component={TodoPage} />
      </Route>
    </Router>
  );
}
