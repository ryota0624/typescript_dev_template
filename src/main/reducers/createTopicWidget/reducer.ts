/**
 * Created by ryota on 2017/06/04.
 */
import {Tag, TagName} from "../../syncle/domains/tag/Tag";
import {TopicTitle, TopicDescribe, TopicImageUrl} from "../../syncle/domains/topic/Topic";
import {Reducer} from "redux";
import {CreateTopicWidgetAction, showWidget, hideWidget} from "./actionTypes";
export enum CreateTopicWidgetScene {
  InputTitle,
  Preview,
  EditTag,
  CreateWaiting
}

interface SuggestTags {
  recentlySeeTags: Tag[];
  alreadyTags: Tag[];
}

export interface CreateTopicWidgetState {
  show: boolean;
  scene: CreateTopicWidgetScene;
  userId: number;
  inputFormTopicTitle: TopicTitle;
  inputFormTopicDescribe: TopicDescribe;
  inputFormImageUrl: TopicImageUrl;
  inputFormTagName: TagName;
  selectTags: Tag[];
  suggestTags: SuggestTags;
}

export const reducer: Reducer<CreateTopicWidgetState> = (state: CreateTopicWidgetState, action: CreateTopicWidgetAction) => {
  switch (action.type) {
    case showWidget:
      return {...state, show: true};
    case hideWidget:
      return {...state, show: false};
  }
  return state;
};