import {UserID} from "../domains/user/User";
import {UserRepository} from "../domains/user/UserRepository";
import {TopicRepository} from "../domains/topic/TopicRepository";
import {TopicID} from "../domains/topic/Topic";
import {UseCase} from "./UseCase";

/**
 * Created by ryota on 2017/06/03.
 */
export interface UserFollowTopicArgs {
  userId: number;
  topicId: number;
}

export class UserUnFollowTopic extends UseCase<UserFollowTopicArgs> {
  constructor(private topicRepository: TopicRepository, private userRepository: UserRepository) {
    super();
  }

  doCall({userId, topicId}: UserFollowTopicArgs) {
    Promise.all(
      [
        this.topicRepository.findById(new TopicID(topicId)),
        this.userRepository.findById(new UserID(userId))
      ])
      .then(([topic, user]) => this.userRepository.store(user, topic.id));
  }
}

export interface UseUserUnFollowTopic {
  userUnFollowTopic: UserUnFollowTopic;
}