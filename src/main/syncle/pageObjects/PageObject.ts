import {Repository} from "../domains/Repository";
import {EventEmitter} from "events";
export interface PageObject {
  [key: string]: number|string|string[]|number[]|boolean[]|boolean|PageObject[]|PageObject;
}

export abstract class PageObjectStream<T> extends EventEmitter {
  constructor(private repositories: Repository[]) {
    super();
  }
  protected abstract getPageObject(): Promise<T>

  subscribe(fn: (model: T) => void): () => void {
    this.getPageObject().then((pageObject: T) => {
      fn(pageObject);
    });
    const unSubscribeFns = this.repositories.map(repo => {
      return repo.subscribe(() => {
        this.getPageObject().then((pageObject: T) => {
          fn(pageObject);
        });
      })
    });
    return () => {
      unSubscribeFns.forEach((fn) => fn());
    }
  }
}