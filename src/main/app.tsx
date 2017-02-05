if (typeof (window as any).Reflectdelete) (window as any).Reflect;
import "reflect-metadata";
import * as ReactDOM from "react-dom";
import * as React from "react";
import App from "./components/appRoute";
import "../inversify.config";

const app = document.getElementById("app");
if (app !== null) {
  ReactDOM.render(<App />, app);
}
