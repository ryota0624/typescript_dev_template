import {Action as ActionBase} from 'redux';

export interface Action<T> extends ActionBase {
  type: T
}
