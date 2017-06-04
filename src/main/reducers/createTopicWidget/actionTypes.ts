import {Action, FormAction} from "../common";
/**
 * Created by ryota on 2017/06/04.
 */
export const showWidget = "CreateTopicWidget-showWidget";
export interface showWidgetAction extends Action<typeof showWidget> {}
export const hideWidget = "CreateTopicWidget-hideWidget";
export interface hideWidgetAction extends Action<typeof hideWidget> {}

export const transitionInputTitleScene = "CreateTopicWidget-transitionInputTitleScene";
export interface transitionInputTitleSceneAction extends Action<typeof transitionInputTitleScene>{}
export const transitionEditTagScene = "CreateTopicWidget-transitionEditTagScene";
export interface transitionEditTagSceneAction extends Action<typeof transitionEditTagScene> {}
export const transitionPreviewScene = "CreateTopicWidget-transitionPreviewScene";
export interface transitionPreviewSceneAction extends Action<typeof transitionPreviewScene>{}
export const transitionCreateWaitScene = "CreateTopicWidget-transitionCreateWaitScene";
export interface transitionCreateWaitSceneAction extends Action<typeof transitionCreateWaitScene>{}


export const InputTopicTitle = "CreateTopicWidget-inputTopicTitle";
export interface InputTopicTitleAction extends FormAction<typeof InputTopicTitle>{}

export const InputTopicDescribe = "CreateTopicWidget-inputTopicDescribe";
export interface InputTopicDescribeAction extends FormAction<typeof InputTopicDescribe>{}

export const InputImageUrl = "CreateTopicWidget-inputTopicImageUrl";
export interface InputImageUrlAction extends FormAction<typeof InputImageUrl>{}

export const InputTagName = "CreateTopicWidget-inputTagName";
export interface InputTagNameAction extends FormAction<typeof InputTagName>{}

export const SelectTag = "CreateTopicWidget-SelectTag";
export interface SelectTagAction extends Action<typeof SelectTag>{}

export type CreateTopicWidgetAction =
  showWidgetAction | hideWidgetAction
  | transitionInputTitleSceneAction | transitionEditTagSceneAction | transitionPreviewSceneAction | transitionCreateWaitSceneAction
  | InputTopicTitleAction | InputTopicDescribeAction | InputImageUrlAction | InputTagNameAction
  | SelectTagAction