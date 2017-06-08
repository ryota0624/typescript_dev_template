import {Topic} from "../../syncle/domains/topic/Topic";
import {Resource} from "../../syncle/stateHalper";
import {Reducer} from "redux";
import {CreatedTopicsAction, StoreTopics, ReplaceTopic} from "./actionTypes";
/**
 * Created by ryota on 2017/06/09.
 */

export const InitialCreatedTopicsType = "initialCreatedTopicsType";
export interface InitialCreatedTopicsState {
  type: typeof InitialCreatedTopicsType;
}

export const LoadedCreatedTopicsType =  "loadedCreatedTopicsType";
export interface LoadedCreatedTopicsState {
  type: typeof LoadedCreatedTopicsType;
  topics: Topic[];
}

export type CreatedTopicsState = InitialCreatedTopicsState | LoadedCreatedTopicsState;

const initialState: InitialCreatedTopicsState = {
  type: InitialCreatedTopicsType
};

function storeTopics(topics: Topic[], state: CreatedTopicsState): LoadedCreatedTopicsState {
  return {
    ...state,
    topics,
    type: LoadedCreatedTopicsType
  }
}

function replaceTopic(updatedTopic: Topic, state: LoadedCreatedTopicsState): CreatedTopicsState {
  const topics = state.topics.map(topic => {
    if (topic.id.equals(updatedTopic.id)) {
      return updatedTopic;
    }
    return topic;
  });
  return {
    ...state,
    topics
  }
}

export const reducer: Reducer<CreatedTopicsState> = (state: CreatedTopicsState = initialState, msg: CreatedTopicsAction) => {
  switch (msg.type) {
    case StoreTopics:
      return storeTopics(msg.topics, state);
    case ReplaceTopic:
      switch (state.type) {
        case LoadedCreatedTopicsType:
          return replaceTopic(msg.topic, state);
        case InitialCreatedTopicsType:
          throw new Error(`invalid State transition ${msg} -> ${state}`)
      }
      return state;
  }

  return state;
};