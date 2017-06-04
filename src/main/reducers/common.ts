import {Action as ActionBase} from 'redux';

export interface Action<T> extends ActionBase {
  type: T
}

export interface FormAction<T> extends Action<T> {
  text: string
}