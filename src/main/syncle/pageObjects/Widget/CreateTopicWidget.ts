/**
 * Created by ryota on 2017/06/04.
 */
import {PageObject} from "../PageObject";
import {CreateTopicWidgetScene} from "../../../reducers/createTopicWidget/reducer";

export interface SuggestTags extends PageObject {
  recentlySeeTags: string[];
  alreadyTags: string[]
}

export interface CreateTopicWidgetView extends PageObject {
  show: boolean;
  scene: CreateTopicWidgetScene;
  userId: number;
  inputFormTopicTitle: string;
  inputFormTopicDescribe: string;
  inputFormImageUrl: string;
  inputFormTagName: string;
  selectedTagNames: string[];
  suggestTags: SuggestTags;
}

export interface CreateTopicWidgetEvents {
  sendInputTopicTitle: (title: string) => void;
  sendInputTopicDescribe: (describe: string) => void;
  sendInputFormImageUrl: (url: string) => void;
  sendInputFormTagName: (tagName: string) => void;

  transitionToInputTitle: () => void;
  transitionToPreview: () => void;
  transitionToEditTag: () => void;
  transitionToCreateWaiting: () => void;

  selectTag: (tagName: string) => void;
  createTopic: () => void;
}