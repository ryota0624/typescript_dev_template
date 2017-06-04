import {Entity, EntityObject, Validation, ValidationResult} from "../../../modelingSupport/Entity";
import {Value} from "../../../modelingSupport/ValueObject";
import {UserID} from "../user/User";
/**
 * Created by ryota on 2017/06/03.
 */

export class TopicID extends Value<number> {}
export class TopicTitle extends Value<string> {}
export class TopicDescribe extends Value<string> {}
export class TopicImageUrl extends Value<string> {}

export class Topic implements Entity<TopicID> {
  private constructor(
    public id: TopicID,
    public title: TopicTitle,
    public createdUserId: UserID,
    public describe: TopicDescribe,
    public imageUrl: TopicImageUrl,
    public followed: boolean
  ) {}

  static factory({id, title, createdUserId, describe, imageUrl}: EntityObject<Topic>): ValidationResult<Readonly<Topic>> {
    const topic = new Topic(id, title, createdUserId, describe, imageUrl, false);
    return Validation.doCall(topic, new ValidationTopicDescribe(), new ValidationTopicTitle());
  }
}



export class ValidationTopicTitle extends Validation<Topic> {
  doCall(topic: Topic): ValidationResult<Topic> {
    if (topic.title.value.length > 0 && topic.title.value.length <= 20) {
      return topic;
    }
    return this.fail("invalid topic title length");
  }
}

export class ValidationTopicDescribe extends Validation<Topic> {
  doCall(topic: Topic): ValidationResult<Topic> {
    if (topic.describe.value.length > 0 && topic.describe.value.length <= 100) {
      return topic;
    }
    return this.fail("invalid topic describe length");
  }
}