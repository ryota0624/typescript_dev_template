import {Repository} from "../../domains/Repository";
import {TopicRepository} from "../../domains/topic/TopicRepository";
import {Topic, TopicID, TopicTitle, TopicDescribe, TopicImageUrl} from "../../domains/topic/Topic";
import {UserRepositoryOnMem} from "./UserRepositoryOnMem";
import {UserID} from "../../domains/user/User";
/**
 * Created by ryota on 2017/06/03.
 */
let topicsMap: Map<number, Topic> = new Map(
  [
    [1 ,Topic.factory({
      id: new TopicID(1),
      title: new TopicTitle("sample"),
      createdUserId: new UserID(100),
      describe: new TopicDescribe("sample\nsamle"),
      imageUrl: new TopicImageUrl("http://the-rich-secret.com/wp-content/uploads/2014/07/kinnun-gazou.png"),
      followed: false
    }) as Topic]
  ]
);

export class TopicRepositoryOnMem extends Repository implements TopicRepository {
  store(topic: Topic) {
    topicsMap.set(topic.id.value, topic);
    this.emitChange();
    return Promise.resolve();
  }

  findById(id: TopicID) {
    const topic = topicsMap.get(id.value);
    if (topic) {
      return Promise.resolve(topic);
    }
    return Promise.reject(`not find Topic ${JSON.stringify(id)}`);
  }

  findAll() {
    let topics: Topic[] = [];
    topicsMap.forEach(user => {
      topics.push(user);
    });
    return Promise.resolve(topics);
  }

  findUserFollows(userId: UserID) {
    const topicPromises = UserRepositoryOnMem.userFollowTopic.filter(([userIdInt]) => {
      return userIdInt === userId.value;
    }).map(([_, topicId]) => {
      return this.findById(new TopicID(topicId)).then((topic: any) => {
        topic.followed = true;
        return topic as Readonly<Topic>;
      });
    });

    return Promise.all(topicPromises);
  }
}