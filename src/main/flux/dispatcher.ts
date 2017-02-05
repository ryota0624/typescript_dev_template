import { Dispatcher } from "flux";
import { ActionType } from "../constants/types/Action";
import { Constructable } from "../utils/mixinUtils";
import { injectable } from "inversify";

injectable()(Dispatcher);
@injectable()
export class AppDispatcher extends Dispatcher<ActionType> {
  dispatch(payload: ActionType) {
    super.dispatch(payload);
    console.log(payload);
  }
}