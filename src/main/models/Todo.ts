import * as I from "immutable";
import { mixin } from "../utils/mixinUtils";

const initialTodo = {
  id: -1,
  title: "",
  text: "",
  createdDate: Date,
};

export default class Todo extends I.Record(initialTodo) {
  readonly id: number;
  readonly title: string;
  readonly text: string;
  readonly createdDate: Date;
  constructor(props: Partial<typeof initialTodo>) {
    super(props);
  }

  set(key: keyof (typeof initialTodo), value: any): Todo {
    return super.set(key, value) as any;
  }
}