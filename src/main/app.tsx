import * as ReactDOM from "react-dom";
import * as React from "react";
import Hello from "./component/Hello";
import {Value, valueObject} from "./modelingSupport/ValueObject";
import * as a from "./immutableSample";
import {start} from "./reducers/TodoReducer";
import {App} from "./syncle/routing/index";

start();
a.start();
class ID extends Value<string> {}
class Name extends Value<string> {}

const defaultAccount = {
  id: new ID(""),
  name: new Name("")
};
class Account extends valueObject(defaultAccount) {
  hello() {
  }
}

class Admin extends Account {
  readonly age: number = 20;
  hello() {
    super.hello();
  }
}

const acc = new Account({id: new ID("suzuki"), name: new Name("")});

const cpAcc: Account = acc.copy<Account>({id: new ID("ryota")});

acc.hello();
cpAcc.hello();

const admin = new Admin({id: new ID("suzuki"), name: new Name("")});
const cppAdmin = (admin.copy<Admin>({}));
cppAdmin.hello();
admin.hello();

const app = document.getElementById("app");
if (app !== null) {
  ReactDOM.render(<App str={"Hello World"} />, app);
}
