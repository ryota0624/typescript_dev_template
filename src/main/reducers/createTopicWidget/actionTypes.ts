import {Action, FormAction} from "../common";
import {CreateTopicWidgetScene, CreateTopicWidgetForm} from "./reducer";
import {Tag} from "../../syncle/domains/tag/Tag";
/**
 * Created by ryota on 2017/06/04.
 */
export const ShowWidget = "CreateTopicWidget-showWidget";
export interface ShowWidgetAction extends Action<typeof ShowWidget> {
}
export const HideWidget = "CreateTopicWidget-hideWidget";
export interface HideWidgetAction extends Action<typeof HideWidget> {
}

export const TransitionScene = "CreateTopicWidget-transitionScene";
export interface TransitionSceneAction extends Action<typeof TransitionScene> {
  scene: CreateTopicWidgetScene
}

export function transitionToScene(scene: CreateTopicWidgetScene): TransitionSceneAction {
  return {
    type: TransitionScene,
    scene
  }
}

export const InputForm = "CreateTopicWidget-inputForm";
export interface InputFormAction extends FormAction<typeof InputForm> {
  form: CreateTopicWidgetForm
}
export function inputFormCreator(form: CreateTopicWidgetForm) {
  return function(text: string): InputFormAction {
    return {
      form,
      text,
      type: InputForm
    }
  }
}

export const SelectTag = "CreateTopicWidget-SelectTag";
export interface SelectTagAction extends Action<typeof SelectTag> {
  tag: Tag
}

export type CreateTopicWidgetAction =
  ShowWidgetAction|HideWidgetAction
    | TransitionSceneAction|InputFormAction
    | SelectTagAction