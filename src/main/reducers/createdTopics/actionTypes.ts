import {Action} from "../common";
import {Topic} from "../../syncle/domains/topic/Topic";
/**
 * Created by ryota on 2017/06/09.
 */

export const ReplaceTopic = "createdTopics-replaceTopic";
export interface ReplaceTopicAction extends Action<typeof ReplaceTopic>{
  topic: Topic
}

export function replaceTopic(topic: Topic): ReplaceTopicAction {
  return {
    type: ReplaceTopic,
    topic
  }
}

export const StoreTopics= "createdTopics-storeTopics";
export interface StoreTopicsAction extends Action<typeof StoreTopics> {
  topics: Topic[]
}

export function storeTopics(topics: Topic[]): StoreTopicsAction {
  return {
    type: StoreTopics,
    topics
  }
}

export type CreatedTopicsAction = ReplaceTopicAction | StoreTopicsAction;