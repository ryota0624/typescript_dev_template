import { Dispatcher } from "flux";
import { ActionType } from "../constants/types/Action";

export class AppDispatcher extends Dispatcher<ActionType> {
  dispatch(payload: ActionType) {
    super.dispatch(payload);
    console.log(payload);
  }
}

export default new AppDispatcher();