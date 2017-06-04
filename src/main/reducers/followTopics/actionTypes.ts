import {Action} from "../common";
import {Topic, TopicID} from "../../syncle/domains/topic/Topic";
import {Dispatch} from "react-redux";
export const StoreFollowTopics = "followTopics-storeTopics";
export interface StoreTopicsAction extends Action<typeof StoreFollowTopics> {
  topics: Topic[];
}

export const storeFollowTopicsCreator = (dispatch: Dispatch<StoreTopicsAction>) => (topics: Topic[]) => {
  dispatch({
    type: StoreFollowTopics,
    topics: topics
  });
};

export const StartStoreTopics = "followTopics-startStoreTopics";
export interface StartStoreTopicsAction extends Action<typeof StartStoreTopics> {}
export const startStoreFollowTopicsCreator = (dispath: Dispatch<StartStoreTopicsAction>) => () => {
  dispath({
    type: StartStoreTopics
  });
};

export const FollowTopic = "followTopics-followTopic";
export interface FollowTopicAction extends Action<typeof FollowTopic> {
  topicId: TopicID;
}
export const followTopicCreator = (dispatch: Dispatch<FollowTopicAction>) => (topicId: TopicID) => {
  dispatch({
    type: FollowTopic,
    topicId: topicId
  });
};

export const UnFollowTopic = "followTopic-unFollowTopic";
export interface UnFollowTopicAction extends Action<typeof UnFollowTopic> {
  topicId: TopicID;
}

export const unFollowTopicCreator = (dispatch: Dispatch<FollowTopicAction>) => (topicId: TopicID) => {
  dispatch({
    type: UnFollowTopic,
    topicId: topicId
  });
};

export type FollowTopicsAction =
  StoreTopicsAction | FollowTopicAction | UnFollowTopicAction | StartStoreTopicsAction;