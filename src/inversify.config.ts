import { Container } from "inversify";
import { TodoStore } from "./main/stores/todoStore";
import { TodoActionCreator } from "./main/actionCreators/todoActionCreators";
import { AppDispatcher } from "./main/flux/dispatcher";
import TodoPage from "./main/components/todo/TodoContainer";
import getDecorator from "inversify-inject-decorators";

export const parentContainer = new Container({ defaultScope: 'Singleton' });
parentContainer.bind(AppDispatcher).toSelf();
parentContainer.bind(TodoStore).toSelf();
parentContainer.bind(TodoActionCreator).toSelf();

export const container = parentContainer.createChild();
export const { lazyInject } = getDecorator(container);