import actionTypes, {Action} from "../constants/ActionConstants";

export interface AddHuman extends Action<typeof actionTypes.ADD_HUMAN> {

}

export interface ListHuman extends Action<typeof actionTypes.LIST_HUMAN> {

}

export type HumanAction = AddHuman | ListHuman;

export function isHumanAction(action: Action<string>): action is HumanAction {
  return [actionTypes.ADD_HUMAN]
    .some(todoActionType => todoActionType === action.actionType);
}