/**
 * Created by ryota on 2017/06/04.
 */
import {Tag, TagName} from "../../syncle/domains/tag/Tag";
import {TopicTitle, TopicDescribe, TopicImageUrl} from "../../syncle/domains/topic/Topic";
import {Reducer} from "redux";
import {CreateTopicWidgetAction, ShowWidget, HideWidget, TransitionScene, InputForm, SelectTag} from "./actionTypes";
export enum CreateTopicWidgetScene {
  InputTitle,
  Preview,
  EditTag,
  CreateWaiting
}

export enum CreateTopicWidgetForm {
  TopicTitle,
  TopicDescribe,
  TopicImageUrl,
  TagName,
}

interface SuggestTags {
  recentlySeeTags: Tag[];
  alreadyTags: Tag[];
}

export interface CreateTopicWidgetState {
  show: boolean;
  scene: CreateTopicWidgetScene;
  inputFormTopicTitle: TopicTitle;
  inputFormTopicDescribe: TopicDescribe;
  inputFormImageUrl: TopicImageUrl;
  inputFormTagName: TagName;
  selectTags: Tag[];
  suggestTags: SuggestTags;
}
export const initialState: CreateTopicWidgetState = {
  show: false,
  scene: CreateTopicWidgetScene.InputTitle,
  inputFormTopicTitle: new TopicTitle(""),
  inputFormTopicDescribe: new TopicDescribe(""),
  inputFormImageUrl: new TopicImageUrl(""),
  inputFormTagName: new TagName(""),
  selectTags: [],
  suggestTags: {
    recentlySeeTags: [],
    alreadyTags: []
  }
};

export const reducer: Reducer<CreateTopicWidgetState> = (state: CreateTopicWidgetState = initialState, action: CreateTopicWidgetAction) => {
  switch (action.type) {
    case ShowWidget:
      return {...state, show: true};
    case HideWidget:
      return {...state, show: false};
    case TransitionScene:
      return {...state, scene: action.scene};
    case InputForm:
      switch (action.form) {
        case CreateTopicWidgetForm.TopicTitle:
          return {...state, inputFormTopicTitle: new TopicTitle(action.text)};
        case CreateTopicWidgetForm.TopicDescribe:
          return {...state, inputFormTopicDescribe: new TopicDescribe(action.text)};
        case CreateTopicWidgetForm.TopicImageUrl:
          return {...state, inputFormTopicImageUrl: new TopicImageUrl(action.text)};
        case CreateTopicWidgetForm.TagName:
          return {...state, inputFormTagName: new TagName(action.text)};
        default: {
          throw new Error(`invalid form for input ${action}`);
        }
      }
    case SelectTag:
      return {...state, selectTags: state.selectTags.concat(action.tag)}
  }
  return state;
};