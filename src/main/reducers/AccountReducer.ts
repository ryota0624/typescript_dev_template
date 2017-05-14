import {Reducer, createStore} from 'redux';
import {Action} from './common';

export const AddAccountType = "addUserType";
export class Account {}
export interface AddAccountAction extends Action<typeof AddAccountType> {
  account: Account
}

export interface AccountState {
  accounts: Account[]
}

export type AccountAction = AddAccountAction
export const accountReducer: Reducer<AccountState> = (state: AccountState, action: AccountAction) => {
  switch (action.type) {
    case AddAccountType: {
      state.accounts = state.accounts.concat(action.account);
      return state;
    }
  }
  return state;
};