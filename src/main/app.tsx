import * as ReactDOM from "react-dom";
import * as React from "react";
import {app} from "./syncle/routing/index";
import {createStore, combineReducers} from "redux";
import * as FollowTopics from "./reducers/followTopics/reducer";
import * as CreateTopicWidget from "./reducers/createTopicWidget/reducer";
import {ApplicationState} from "./reducers/Application/Application";

const reducer = combineReducers<ApplicationState>({
  followTopics: FollowTopics.reducer,
  createTopicWidget: CreateTopicWidget.reducer
});

function start() {
  const App = app(createStore(reducer));
  const el = document.getElementById("app");
  if (el !== null) {
    ReactDOM.render(<App />, el);
  }
}

start();