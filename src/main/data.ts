import * as I from "immutable";
import Todo from "./models/Todo";

export const sampleTodosData = I.List(Array.from({ length: 20 }).map((_, key) => {
  const text = (id: string) => `${id}-text
    text;
    ${id}-text;
  `;

  const id = key + 1;
  const date: any = new Date();
  return new Todo({ id, title: `${id}-title`, createdDate: date, text: text(id.toString()) });
}));