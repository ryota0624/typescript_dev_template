import { Container } from "inversify";
import { TodoStore } from "./main/stores/todoStore";
import { TodoActionCreator } from "./main/actionCreators/todoActionCreators";
import { AppDispatcher } from "./main/flux/dispatcher";
import TodoPage from "./main/components/todo/TodoContainer";
export const container = new Container({ defaultScope: 'Singleton' });

container.bind(AppDispatcher).toSelf();
container.bind(TodoStore).toSelf();
container.bind(TodoActionCreator).toSelf();
