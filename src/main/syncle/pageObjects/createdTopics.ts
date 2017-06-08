import {PageObject} from "./PageObject";
import {Resource} from "../stateHalper";
/**
 * Created by ryota on 2017/06/09.
 */

export interface TopicDto extends PageObject {
  id: number;
  followed: boolean;
  title: string;
  imageUrl: string;
}

export interface CreatedTopicsView extends PageObject {
  topics: TopicDto[]
  resource: Resource
}

export interface CreatedTopicsEvent {
  getCreatedTopics: () => void;
}