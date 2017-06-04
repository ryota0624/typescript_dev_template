import {PageObject} from "./PageObject";
import {Resource} from "../stateHalper";
/**
 * Created by ryota on 2017/06/04.
 */

export interface TopicDto extends PageObject {
  id: number;
  followed: boolean;
  title: string;
  imageUrl: string;
}

export interface FollowTopicsView extends PageObject {
  userId: number;
  topics: TopicDto[];
  resource: Resource;
}

export interface FollowTopicsViewActions {
  unFollowTopic: (topicId: number) => void;
  getFollowTopics: () => void;
  followTopic: (topicId: number) => void;
}