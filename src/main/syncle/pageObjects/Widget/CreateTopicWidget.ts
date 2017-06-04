/**
 * Created by ryota on 2017/06/04.
 */
import {PageObject} from "../PageObject";
import {CreateTopicWidgetScene} from "../../../reducers/createTopicWidget/reducer";



export interface SuggestTags extends PageObject {
  recentlySeeTags: string[];
  alreadyTags: string[]
}

export interface CreateTopicWidget extends PageObject {
  show: boolean;
  scene: CreateTopicWidgetScene;
  userId: number;
  inputFormTopicTitle: string;
  inputFormTopicDescribe: string;
  inputFormImageUrl: string;
  inputFormTagName: string;
  inputTagNames: string[];
  suggestTags: SuggestTags;
}