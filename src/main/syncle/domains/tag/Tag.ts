/**
 * Created by ryota on 2017/06/03.
 */
import {Entity, EntityObject} from "../../../modelingSupport/Entity";
import {Value} from "../../../modelingSupport/ValueObject";

export class TagName extends Value<string> {}

export class Tag implements Entity<TagName> {
  private constructor(
    public id: TagName,
  ) {}
  static factory({id}: EntityObject<Tag>): Readonly<Tag> {
    return new Tag(name);
  }
  get name(): string {
    return this.id.value;
  }
}