import { Router, hashHistory, IndexRoute, Route } from "react-router";
import * as React from "react";

import Top from "./Top";
import TodoPage from "./todo/TodoContainer";
import { inject } from "../utils/injectUtils";
import { injectTodoStore } from "../stores/todoStore";
import { injectTodoActionCreator } from "../actionCreators/todoActionCreators";

export default function () {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={(props) => props.children }>  
        <IndexRoute component={Top} />
        <Route path={"todos"} component={injectTodoActionCreator(injectTodoStore(TodoPage))} />
      </Route>
    </Router>
  );
}
