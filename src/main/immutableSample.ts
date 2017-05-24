/**
 * Created by ryota on 2017/05/24.
 */

import * as I from "immutable";

class A extends I.Record({a: 1, b: "", c: []}) {

}

export function start() {
  const list1 = I.List([new A(), new A({a: 2, c: 1})]);
  const list2 = I.List([new A({a: 2})]);
  const list3 = I.List([new A(), new A({a: 2, c: 1})]);
  const list4 = I.List([new A(), new A({a: 4})]);


  console.log(list1.equals(list2));
  console.log(list1.equals(list3));
  console.log(list3.equals(list4));

}
