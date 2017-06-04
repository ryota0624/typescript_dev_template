import {Reducer, createStore} from 'redux';
import {Action} from '../common';
import {Topic, TopicID, followTopic, unFollowTopic} from "../../syncle/domains/topic/Topic";
import {TopicDto} from "../../syncle/pageObjects/followTopics";
import {PageObject} from "../../syncle/pageObjects/PageObject";
import {
  StoreFollowTopics, FollowTopicsAction, FollowTopic, UnFollowTopic,
  StartStoreTopics
} from "./actionTypes";
import {Resource} from "../../syncle/stateHalper";

export interface FollowTopicsState {
  topics: Topic[];
  resource: Resource
}

const initialState = {topics: [], resource: Resource.Initial};

export const reducer: Reducer<FollowTopicsState> = (state: FollowTopicsState = initialState, action: FollowTopicsAction) => {
  switch (action.type) {
    case StoreFollowTopics: {
      state.topics = action.topics;
      return {...state, resource: Resource.Fulfill };
    }
    case StartStoreTopics: {
      return {...state, resource: Resource.Loading };
    }
    case FollowTopic: {
      const topics = state.topics.map(followTopic(action.topicId));
      return {...state, topics};
    }
    case UnFollowTopic: {
      const topics = state.topics.map(unFollowTopic(action.topicId));
      return {...state, topics};
    }
  }
  return state;
};