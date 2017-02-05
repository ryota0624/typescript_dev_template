import {EventEmitter} from "eventemitter3";

const changeEvent = "_change_";
export abstract class Store extends EventEmitter {
  addChangeListener(fn: () => void) {
    this.addListener(changeEvent, fn);
  }
  // リソースがapi等通じて読み込まれたことを返す
  abstract isLoaded(): boolean;
  // apiを通じて読み込まれた上で空かどうかを返す
  abstract isEmpty(): boolean;

  removeChangeListener(fn: () => void) {
    this.removeListener(changeEvent, fn);
  }

  emitChange() {
    this.emit(changeEvent);
  }
}
