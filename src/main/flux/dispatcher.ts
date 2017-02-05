import { Dispatcher } from "flux";
import { ActionType } from "../constants/types/Action";
import { Constructable } from "../utils/mixinUtils";

export class AppDispatcher extends Dispatcher<ActionType> {
  dispatch(payload: ActionType) {
    super.dispatch(payload);
    console.log(payload);
  }
}

const singleton = new AppDispatcher();
export function injectDispatcher<Target extends Constructable>(base: Target) {
  return class extends base {
    dispatcher: AppDispatcher = singleton;
  };
}

export default singleton;