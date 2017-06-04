/**
 * Created by ryota on 2017/06/03.
 */

export abstract class UseCase<I> {
  static execute<I>(args: I, usecase: UseCase<I>) {
    usecase.doCall(args);
  }
  protected abstract doCall(args: I): void;
}