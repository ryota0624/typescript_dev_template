import * as ReactDOM from "react-dom";
import * as React from "react";
import Hello from "./component/Hello";
import {Value, valueObject} from "./modelingSupport/ValueObject";

class ID extends Value<string> {}
class Name extends Value<string> {}

const defaultAccount = {
  id: new ID(""),
  name: new Name("")
};
class Account extends valueObject(defaultAccount) {
  hello() {
    console.log(`iam ${this.id.get()}`);
  }
}

class Admin extends Account {
  readonly age: number = 20;
  hello() {
    console.log("iam Admin" + this.age);
    super.hello();
  }
}

const acc = new Account({id: new ID("suzuki"), name: new Name("")});
console.log(acc.id.get());

const cpAcc: Account = acc.copy<Account>({id: new ID("ryota")});
console.log(cpAcc);
console.log(acc);

console.log(acc instanceof Account);
console.log(cpAcc instanceof Account);
console.log(acc === cpAcc);

acc.hello();
cpAcc.hello();

const admin = new Admin({id: new ID("suzuki"), name: new Name("")});
const cppAdmin = (admin.copy<Admin>({}));
cppAdmin.hello()
admin.hello();

const app = document.getElementById("app");
if (app !== null) {
  ReactDOM.render(<Hello str={"Hello World"} />, app);
}
