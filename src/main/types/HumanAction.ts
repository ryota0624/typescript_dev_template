import actionTypes, {Action} from "../constants/ActionConstants";

export interface AddHuman extends Action<typeof actionTypes.ADD_HUMAN> {

}

export type HumanAction = AddHuman;